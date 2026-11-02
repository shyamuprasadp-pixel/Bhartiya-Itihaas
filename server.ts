import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Type, Modality } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization with required telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const getDifficultyInstruction = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY':
      return "Focus on fundamental well-known historical milestones: 1947 independence, Ashoka's edicts, Indus Valley, Maurya, Gupta, and freedom fighters.";
    case 'MEDIUM':
      return "Focus on administrative reforms, battles, constitutional developments, and notable architecture (Cholas, Guptas, Mughals, Marathas).";
    case 'HARD':
    case 'EXAM':
      return "Focus on specific inscriptions, historical treaties, administrative acts, regional dynasties, and prominent freedom movement events.";
    case 'CHALLENGE':
      return "Provide a rapid mix of questions across Ancient, Medieval, and Modern Indian history.";
    case 'QUICK_TEST':
    case 'CUSTOM_TEST':
      return "Provide a balanced, high-yield mix of Indian history questions across all eras.";
    case 'PYQ_MOCK':
      return "CRITICAL: Generate AUTHENTIC Previous Years Questions (PYQ) asked in competitive examinations like UPSC Civil Services (Prelims), SSC CGL, State PSC (UPPSC, BPSC, MPPSC, RAS), CDS, NDA, and RRB. Provide the exact exam tag in 'examTag' (e.g., 'UPSC CSE 2021', 'SSC CGL 2022', 'UPPSC 2020', 'BPSC 66th', 'RRB NTPC 2021').";
    default:
      return '';
  }
};

// 1. Question Generation Endpoint (Server-Side Gemini API)
app.post('/api/gemini/questions', async (req, res) => {
  try {
    const { language = 'HINDI', difficulty = 'MEDIUM', count = 10, isDaily = false } = req.body;
    const eras = ['Ancient', 'Medieval', 'Modern'];
    const randomEra = eras[Math.floor(Math.random() * eras.length)];
    const todayStr = new Date().toISOString().split('T')[0];

    const contextInstruction = isDaily
      ? `Generate a CURATED daily set of ${count} questions on Indian History. Today's theme seed is ${todayStr}. Balanced mix of eras.`
      : `Generate ${count} UNIQUE and HISTORICALLY ACCURATE objective questions on Indian History. Focus Era: ${randomEra}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${contextInstruction}
Language: ${language}.
Difficulty Level: ${difficulty}. ${getDifficultyInstruction(difficulty)}.
Verification: Use Google Search to cross-reference multiple historical sources.
Output: Return a JSON array of question objects.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4,
              },
              correctAnswer: { type: Type.INTEGER, minimum: 0, maximum: 3 },
              explanation: { type: Type.STRING },
              era: { type: Type.STRING, enum: ['Ancient', 'Medieval', 'Modern'] },
              examTag: { type: Type.STRING },
            },
            required: ['id', 'text', 'options', 'correctAnswer', 'explanation', 'era'],
          },
        },
      },
    });

    const rawParsed = JSON.parse(response.text || '[]');
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources =
      groundingChunks
        ?.map((chunk: any) => ({
          title: chunk.web?.title || 'Historical Reference',
          uri: chunk.web?.uri || '',
        }))
        .filter((s: any) => s.uri !== '') || [];

    const validQuestions = rawParsed
      .filter((q: any) => q.text && Array.isArray(q.options) && q.options.length === 4)
      .map((q: any) => ({
        ...q,
        id: q.id || Math.random().toString(36).substr(2, 9),
        sources: sources.length > 0 ? sources.slice(0, 2) : undefined,
      }));

    res.json({ questions: validQuestions });
  } catch (error: any) {
    console.error('Gemini questions generation error on server:', error);
    res.status(500).json({ error: error.message || 'Failed to generate questions' });
  }
});

// 2. Server-side Streaming Endpoint
app.post('/api/gemini/stream', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: systemInstruction ? { systemInstruction } : undefined,
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Streaming error on server:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

const server = http.createServer(app);

// 3. Server-side Live API WebSocket endpoint
const wss = new WebSocketServer({ server, path: '/api/live' });

wss.on('connection', async (clientWs: WebSocket) => {
  let session: any = null;
  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction: 'You are an expert tutor on Indian History.',
      },
      callbacks: {
        onmessage: (message: any) => {
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ audio }));
          }
          if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
        onclose: () => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.close();
          }
        },
      },
    });

    clientWs.on('message', (data) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio && session) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        }
      } catch (err) {
        console.error('Error processing websocket message in Live API:', err);
      }
    });

    clientWs.on('close', () => {
      if (session) {
        try {
          session.close();
        } catch (e) {}
      }
    });
  } catch (err) {
    console.error('Failed to establish server Live API session:', err);
    clientWs.close();
  }
});

// Setup Vite dev middleware in development or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
