
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AppState, Language, Question, QuizState, Difficulty, HistoryEntry } from './types';
import { fetchQuestions } from './services/geminiService';
import { getFallbackQuestions } from './services/fallbackQuestions';
import { RevisionNotesView } from './RevisionNotesView';
import { BannerAd } from './BannerAd';
import { APP_NAME, INTRO_MAIN, INTRO_SUB, TRANSLATIONS, LANGUAGES, DIFFICULTIES, DAILY_QUIZ_COUNT } from './constants';

const BOOKMARKS_KEY = 'history_bookmarks';
const HISTORY_KEY = 'quiz_history_data';
const USER_EMAIL_KEY = 'user_gmail_id';
const USER_PHONE_KEY = 'user_phone_number';
const DARK_MODE_KEY = 'app_dark_mode';
const VOICE_ENABLED_KEY = 'app_voice_enabled';
const APP_LANG_KEY = 'app_selected_language';
const FONT_SIZE_KEY = 'app_font_size';

const HINDI_NAMES = [
  "आदित्य शर्मा", "प्रिया पटेल", "राहुल वर्मा", "अंजली सिंह", "संदीप यादव",
  "नेहा गुप्ता", "विकास मिश्रा", "पूजा तिवारी", "अमित राज", "स्नेहा रेड्डी",
  "मनीष बिष्ट", "कविता जोशी", "रोहित मेहरा", "दीपिका पादुकोण", "ऋषभ पंत",
  "श्रेया घोषाल", "अरुण जेटली", "स्मृति ईरानी", "नितिन गडकरी", "शिवानी सिंह"
];

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/[^a-zA-Z\d\u0900-\u097F]/g, "").trim();
};

type ExamStatus = 'LOCKED' | 'UPCOMING' | 'LIVE' | 'CLOSED';

interface LeaderboardEntry {
  name: string;
  email: string;
  phone: string;
  score: number;
  timeTaken: number;
  rank: number;
  isUser?: boolean;
  isRisingStar?: boolean;
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('LANDING');
  const [language, setLanguage] = useState<Language>(Language.HINDI);
  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [libraryQuestions, setLibraryQuestions] = useState<Question[]>([]);
  const [bookmarks, setBookmarks] = useState<Question[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDifficulty, setLoadingDifficulty] = useState<Difficulty | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isRisingStar, setIsRisingStar] = useState(false);
  const [showExamInfo, setShowExamInfo] = useState(false);
  const [liveStudents, setLiveStudents] = useState(1400 + Math.floor(Math.random() * 500));

  // Security & Live Schedule States
  const [isTabActive, setIsTabActive] = useState(true);
  const [multiTabError, setMultiTabError] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const [examStatus, setExamStatus] = useState<ExamStatus>('LOCKED');
  const [timeToExam, setTimeToExam] = useState(0);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [customTime, setCustomTime] = useState(30);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [fetchingBatch, setFetchingBatch] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [lastResult, setLastResult] = useState<{
    difficulty: Difficulty;
    totalQuestions: number;
    score: number;
    incorrect: number;
    skipped: number;
    correctPercentage: number;
    incorrectPercentage: number;
    timeTaken: number;
    questions: Question[];
    userAnswers: Record<number, number>;
  } | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const sessionRef = useRef(Math.random().toString(36).substring(7));

  // Current translation object
  const t = useMemo(() => TRANSLATIONS[language] || TRANSLATIONS[Language.ENGLISH], [language]);

  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = {
      'HINDI': 'hi-IN', 'ENGLISH': 'en-US', 'SANSKRIT': 'hi-IN', 
      'TAMIL': 'ta-IN', 'TELUGU': 'te-IN', 'MARATHI': 'mr-IN', 
      'BENGALI': 'bn-IN', 'GUJARATI': 'gu-IN'
    };
    utterance.lang = langMap[language] || 'hi-IN';
    window.speechSynthesis.speak(utterance);
  }, [language]);

  const checkExamWindow = useCallback(() => {
    const now = new Date();
    const day = now.getDay();
    const currentTimeInMins = now.getHours() * 60 + now.getMinutes();
    const startMins = 11 * 60;
    const endMins = 12 * 60;
    if (day !== 0) { setExamStatus('LOCKED'); return; }
    if (currentTimeInMins < startMins) {
      setExamStatus('UPCOMING');
      setTimeToExam((startMins - currentTimeInMins) * 60 - now.getSeconds());
    } else if (currentTimeInMins >= startMins && currentTimeInMins < endMins) {
      setExamStatus('LIVE');
      setTimeToExam((endMins - currentTimeInMins) * 60 - now.getSeconds());
    } else {
      setExamStatus('CLOSED');
    }
  }, []);

  useEffect(() => {
    checkExamWindow();
    const interval = setInterval(checkExamWindow, 1000);
    return () => clearInterval(interval);
  }, [checkExamWindow]);

  // Simulate dynamic live student count
  useEffect(() => {
    const liveTimer = setInterval(() => {
      setLiveStudents(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // Fluctuate -3 to +3
        return Math.max(800, prev + change);
      });
    }, 4000);
    return () => clearInterval(liveTimer);
  }, []);

  const generateLeaderboard = useCallback((userScore?: number, totalQuestions: number = 100, userTimeSeconds: number = 0) => {
    const participants: LeaderboardEntry[] = [];
    HINDI_NAMES.forEach((name, i) => {
      let score = totalQuestions - Math.floor(Math.random() * (totalQuestions * 0.4));
      participants.push({ 
        name, email: `student${i}@gmail.com`, phone: `9876543${i}10`,
        score, timeTaken: score * 12 + Math.random() * 120, rank: 0,
        isRisingStar: Math.random() > 0.8
      });
    });
    
    if (userScore !== undefined) {
      participants.push({ 
        name: userEmail?.split('@')[0] || "आप", email: userEmail || "", phone: userPhone || "",
        score: userScore, timeTaken: userTimeSeconds, isUser: true, rank: 0, isRisingStar: isRisingStar 
      });
    }

    const sorted = participants.sort((a, b) => b.score !== a.score ? b.score - a.score : a.timeTaken - b.timeTaken).slice(0, 20);
    setLeaderboard(sorted.map((p, idx) => ({ ...p, rank: idx + 1 })));
  }, [userEmail, userPhone, isRisingStar]);

  useEffect(() => {
    const channel = new BroadcastChannel('quiz_session_sync');
    channel.postMessage({ type: 'NEW_SESSION', id: sessionRef.current });
    channel.onmessage = (event) => {
      if (event.data.type === 'NEW_SESSION') setMultiTabError(true);
    };
    const handleVisibilityChange = () => {
      const active = document.visibilityState === 'visible';
      setIsTabActive(active);
      if (!active && appState === 'QUIZ' && quiz?.isExamMode) {
        setDisqualified(true);
        finishQuiz();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      channel.close();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [appState, quiz?.isExamMode]);

  const playSound = useCallback((type: 'correct' | 'incorrect' | 'nav') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (type === 'correct') {
        osc.frequency.setValueAtTime(523, now); osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      } else if (type === 'incorrect') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      } else {
        osc.frequency.setValueAtTime(800, now); gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      }
      osc.start(now); osc.stop(now + 0.3);
    } catch (e) {}
  }, [soundEnabled]);

  const handleNav = useCallback((state: AppState) => {
    playSound('nav'); setAppState(state);
    if (state !== 'QUIZ' && state !== 'LIBRARY') {
      window.speechSynthesis.cancel();
    }
    if (state === 'LIBRARY' && libraryQuestions.length === 0) {
      loadLibrary();
    }
    if (state === 'LEADERBOARD' && leaderboard.length === 0) {
      generateLeaderboard();
    }
  }, [playSound, libraryQuestions.length, leaderboard.length, generateLeaderboard]);

  const fetchUniqueQuestions = useCallback(async (lang: Language, diff: Difficulty, count: number, isDailyMode: boolean = false): Promise<Question[]> => {
    // Get seen from localStorage to avoid repeats
    const saved = localStorage.getItem('quiz_seen_questions_v2');
    const seenSet = new Set<string>();
    if (saved) {
      try {
        const parsed: string[] = JSON.parse(saved);
        parsed.forEach(t => seenSet.add(normalizeText(t)));
      } catch (e) {}
    }

    let finalQuestions: Question[] = [];
    try {
      const fetched = await fetchQuestions(lang, diff, count + 2, isDailyMode);
      if (fetched && fetched.length > 0) {
        for (const q of fetched) {
          const normalized = normalizeText(q.text);
          if (!seenSet.has(normalized)) {
            seenSet.add(normalized);
            finalQuestions.push(q);
            if (finalQuestions.length >= count) break;
          }
        }
        // If seenSet filtered out too many, backfill from remaining fetched
        if (finalQuestions.length < count) {
          for (const q of fetched) {
            if (!finalQuestions.some(existing => existing.text === q.text)) {
              finalQuestions.push(q);
              if (finalQuestions.length >= count) break;
            }
          }
        }
      }
    } catch (e) {
      console.warn("fetchQuestions error in fetchUniqueQuestions:", e);
    }

    // Always guarantee that finalQuestions has the required count using curated fallback
    if (finalQuestions.length < count) {
      const needed = count - finalQuestions.length;
      const fallback = getFallbackQuestions(lang, needed, diff);
      finalQuestions.push(...fallback);
    }

    // Save newly seen questions (max 1000)
    const currentSeen: string[] = [];
    if (saved) {
      try {
        currentSeen.push(...JSON.parse(saved));
      } catch (e) {}
    }
    finalQuestions.forEach(q => {
      const norm = normalizeText(q.text);
      if (!currentSeen.some(e => normalizeText(e) === norm)) {
        currentSeen.push(q.text);
      }
    });
    localStorage.setItem('quiz_seen_questions_v2', JSON.stringify(currentSeen.slice(-1000)));

    return finalQuestions.slice(0, count);
  }, []);

  const loadLibrary = async () => {
    setLoading(true);
    const qs = await fetchUniqueQuestions(language, Difficulty.MEDIUM, 20);
    setLibraryQuestions(qs);
    setLoading(false);
  };

  const loadMoreLibrary = async () => {
    const qs = await fetchUniqueQuestions(language, Difficulty.HARD, 10);
    setLibraryQuestions(prev => [...prev, ...qs]);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem(USER_EMAIL_KEY);
    const savedPhone = localStorage.getItem(USER_PHONE_KEY);
    if (savedEmail && savedPhone) { setUserEmail(savedEmail); setUserPhone(savedPhone); } else { setShowEmailModal(true); }
    const savedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
    if (savedBookmarks) try { setBookmarks(JSON.parse(savedBookmarks)); } catch (e) {}
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
    const savedVoice = localStorage.getItem(VOICE_ENABLED_KEY);
    if (savedVoice) setVoiceEnabled(savedVoice === 'true');
    const savedLang = localStorage.getItem(APP_LANG_KEY);
    if (savedLang) setLanguage(savedLang as Language);
    const savedFontSize = localStorage.getItem(FONT_SIZE_KEY);
    if (savedFontSize && ['sm', 'md', 'lg'].includes(savedFontSize)) setFontSize(savedFontSize as 'sm' | 'md' | 'lg');
  }, []);

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, darkMode.toString());
    localStorage.setItem(VOICE_ENABLED_KEY, voiceEnabled.toString());
    localStorage.setItem(APP_LANG_KEY, language);
    localStorage.setItem(FONT_SIZE_KEY, fontSize);
  }, [darkMode, voiceEnabled, language, fontSize]);

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@') && phoneInput.length >= 10) {
      localStorage.setItem(USER_EMAIL_KEY, emailInput);
      localStorage.setItem(USER_PHONE_KEY, phoneInput);
      setUserEmail(emailInput); setUserPhone(phoneInput);
      setShowEmailModal(false); playSound('correct');
    }
  };

  useEffect(() => {
    if (appState === 'QUIZ' && quiz && quiz.timeRemaining > 0 && !loading && !disqualified) {
      timerRef.current = window.setInterval(() => {
        setQuiz(prev => {
          if (!prev) return null;
          if (prev.isExamMode && examStatus === 'CLOSED') { clearInterval(timerRef.current!); finishQuiz(); return null; }
          if (prev.timeRemaining <= 1) { clearInterval(timerRef.current!); finishQuiz(); return { ...prev, timeRemaining: 0 }; }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    } else { if (timerRef.current) clearInterval(timerRef.current); }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [appState, loading, quiz?.timeRemaining, disqualified, examStatus]);

  useEffect(() => {
    if (appState === 'QUIZ' && quiz && voiceEnabled && !loading) {
      const q = quiz.questions[quiz.currentIndex];
      if (q) speakText(q.text);
    }
  }, [appState, quiz?.currentIndex, voiceEnabled, loading, speakText]);

  const finishQuiz = useCallback((attempted?: number) => {
    window.speechSynthesis.cancel();
    setQuiz(prev => {
        if (!prev) return null;
        const finalAttempted = attempted ?? (prev.currentIndex + 1);
        const config = DIFFICULTIES.find(d => d.code === prev.difficulty);
        const userTimeTaken = (config?.time || 0) - prev.timeRemaining;
        
        // Record History
        const newEntry: HistoryEntry = {
          id: Date.now().toString(), difficulty: prev.difficulty,
          score: disqualified ? 0 : prev.score, total: finalAttempted, skipped: prev.skippedCount,
          date: new Date().toLocaleString()
        };
        setHistory(h => [newEntry, ...h].slice(0, 50));

        // Save last result for display on the custom RESULT screen
        const finalScore = disqualified ? 0 : prev.score;
        const incorrectCount = finalAttempted - finalScore - prev.skippedCount;
        setLastResult({
          difficulty: prev.difficulty,
          totalQuestions: finalAttempted,
          score: finalScore,
          incorrect: Math.max(0, incorrectCount),
          skipped: prev.skippedCount,
          correctPercentage: finalAttempted > 0 ? Math.round((finalScore / finalAttempted) * 100) : 0,
          incorrectPercentage: finalAttempted > 0 ? Math.round((Math.max(0, incorrectCount) / finalAttempted) * 100) : 0,
          timeTaken: Math.max(0, userTimeTaken),
          questions: prev.questions.slice(0, finalAttempted),
          userAnswers: { ...userAnswers } // capture copy of user selections
        });

        generateLeaderboard(disqualified ? 0 : prev.score, finalAttempted, userTimeTaken);
        setAppState('RESULT');
        return null;
    });
  }, [disqualified, generateLeaderboard, userAnswers]);

  const startQuiz = useCallback(async (difficulty: Difficulty, overrideTime?: number) => {
    if (difficulty === Difficulty.EXAM && examStatus !== 'LIVE') return;
    playSound('nav'); setDisqualified(false); setIsRisingStar(false);
    setUserAnswers({}); // Reset user answers
    const config = DIFFICULTIES.find(d => d.code === difficulty) || DIFFICULTIES[1];
    setLoading(true);
    setLoadingDifficulty(difficulty);
    const initialQuestions = await fetchUniqueQuestions(language, difficulty, 10);
    setQuiz({
      questions: initialQuestions, currentIndex: 0, score: 0, skippedCount: 0, skipsRemaining: config.maxSkips,
      isComplete: false, difficulty, timeRemaining: overrideTime ?? config.time, totalQuestions: config.count,
      isExamMode: difficulty === Difficulty.EXAM
    });
    setLoading(false); 
    setLoadingDifficulty(null);
    setAppState('QUIZ');
  }, [examStatus, playSound, language, fetchUniqueQuestions]);

  const handleAnswer = useCallback((index: number) => {
    if (!quiz || selectedAnswer !== null || disqualified) return;
    setSelectedAnswer(index);
    setUserAnswers(prev => ({
      ...prev,
      [quiz.currentIndex]: index
    }));
    if (quiz.isExamMode) {
      if (index === quiz.questions[quiz.currentIndex].correctAnswer) setQuiz(p => p ? ({ ...p, score: p.score + 1 }) : null);
      setTimeout(() => { setSelectedAnswer(null); if (quiz.currentIndex + 1 < quiz.totalQuestions) setQuiz(p => p ? ({ ...p, currentIndex: p.currentIndex + 1 }) : null); else finishQuiz(); }, 200);
    } else {
      setShowExplanation(true);
      if (voiceEnabled) speakText(quiz.questions[quiz.currentIndex].explanation);
      if (index === quiz.questions[quiz.currentIndex].correctAnswer) { playSound('correct'); setQuiz(p => p ? ({ ...p, score: p.score + 1 }) : null); } else playSound('incorrect');
    }
  }, [quiz, selectedAnswer, disqualified, playSound, finishQuiz, voiceEnabled, speakText]);

  const isNextLoading = useMemo(() => {
    if (!quiz) return false;
    return quiz.currentIndex + 1 >= quiz.questions.length && quiz.currentIndex + 1 < quiz.totalQuestions;
  }, [quiz]);

  const retryLoadingNextBatch = useCallback(async () => {
    if (!quiz || fetchingBatch) return;
    const loadedCount = quiz.questions.length;
    const totalCount = quiz.totalQuestions;
    const fetchCount = Math.min(10, totalCount - loadedCount);
    if (fetchCount <= 0) return;

    setFetchingBatch(true);
    try {
      const nextQuestions = await fetchUniqueQuestions(language, quiz.difficulty, fetchCount);
      if (nextQuestions && nextQuestions.length > 0) {
        setQuiz(prev => {
          if (!prev || prev.questions.length !== loadedCount) return prev;
          return {
            ...prev,
            questions: [...prev.questions, ...nextQuestions]
          };
        });
      }
    } catch (e) {
      console.error("Error retrying load:", e);
    } finally {
      setFetchingBatch(false);
    }
  }, [quiz, language, fetchingBatch, fetchUniqueQuestions]);

  useEffect(() => {
    if (!quiz || fetchingBatch) return;
    const loadedCount = quiz.questions.length;
    const totalCount = quiz.totalQuestions;
    
    if (loadedCount < totalCount && quiz.currentIndex >= loadedCount - 3) {
      const fetchCount = Math.min(10, totalCount - loadedCount);
      if (fetchCount <= 0) return;

      const loadBatch = async () => {
        setFetchingBatch(true);
        try {
          const nextQuestions = await fetchUniqueQuestions(language, quiz.difficulty, fetchCount);
          if (nextQuestions && nextQuestions.length > 0) {
            setQuiz(prev => {
              if (!prev || prev.questions.length !== loadedCount) return prev;
              return {
                ...prev,
                questions: [...prev.questions, ...nextQuestions]
              };
            });
          }
        } catch (e) {
          console.error("Error loading next batch of questions:", e);
        } finally {
          setFetchingBatch(false);
        }
      };

      loadBatch();
    }
  }, [quiz?.currentIndex, quiz?.questions.length, quiz?.totalQuestions, quiz?.difficulty, language, fetchingBatch, fetchUniqueQuestions]);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    setLibraryQuestions([]); // Clear to re-fetch in new language
    playSound('nav');
  };

  const handleGoogleSearch = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    playSound('nav');
  };

  const GoogleSearchButton = ({ query, mini = false }: { query: string, mini?: boolean }) => (
    <button 
      onClick={(e) => { e.stopPropagation(); handleGoogleSearch(query); }} 
      className={`flex items-center gap-2 bg-white text-slate-900 border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all font-black uppercase tracking-tight
      ${mini ? 'px-3 py-1 text-[9px]' : 'px-5 py-2 text-[11px]'}`}
    >
      <svg className={mini ? 'w-3 h-3' : 'w-4 h-4'} viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {t.verify}
    </button>
  );

  return (
    <div className={`min-h-screen flex flex-col items-center transition-all duration-300 select-none pb-24 md:pb-28 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#fffaf0] text-gray-800'} ${!isTabActive ? 'blur-2xl' : ''}`}>
      
      {multiTabError && (
        <div className="fixed inset-0 z-[200] bg-orange-950 flex flex-col items-center justify-center p-8 text-center text-white">
           <h2 className="text-4xl font-black mb-4">सुरक्षा अलर्ट</h2>
           <p className="text-xl opacity-80">कृपया केवल एक टैब में ऐप चलाएं।</p>
        </div>
      )}

      {showEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-orange-100'} rounded-[3rem] p-8 max-w-md w-full shadow-2xl border-4 text-center animate-fade-in`}>
             <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🎓</div>
             <h2 className={`text-3xl font-black mb-2 ${darkMode ? 'text-white' : 'text-orange-900'}`}>{t.registration || "रजिस्ट्रेशन"}</h2>
             <form onSubmit={handleUserSubmit} className="space-y-4">
                <input type="email" required placeholder="Gmail ID..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className={`w-full py-4 px-6 rounded-2xl border-2 focus:border-orange-600 focus:outline-none text-lg font-bold shadow-inner ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-orange-100'}`} />
                <input type="tel" required placeholder="Mobile Number..." value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} className={`w-full py-4 px-6 rounded-2xl border-2 focus:border-orange-600 focus:outline-none text-lg font-bold shadow-inner ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-orange-100'}`} />
                <button type="submit" className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-2xl shadow-xl transition-transform active:scale-95 uppercase tracking-widest">{t.continue || "प्रवेश करें"}</button>
             </form>
          </div>
        </div>
      )}

      {showExamInfo && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 overflow-hidden">
          <div className={`relative max-w-lg w-full rounded-[3.5rem] p-12 text-center border-8 animate-fade-in transform transition-all ${darkMode ? 'bg-slate-900 border-amber-900/50' : 'bg-[#fffdf5] border-amber-100 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'}`}>
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
             <div className="mb-8 text-7xl animate-bounce">📅</div>
             <h2 className={`text-4xl font-black mb-6 leading-tight uppercase tracking-tighter ${darkMode ? 'text-amber-500' : 'text-amber-900'}`}>{t.sundayTitle}</h2>
             <p className={`text-xl font-bold mb-10 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>{t.sundayMsg}</p>
             <div className="flex justify-center gap-4 items-center opacity-60 mb-10">
                <span className="h-px w-12 bg-amber-400"></span>
                <span className="text-xs font-black uppercase tracking-[0.4em]">Every Sunday @ 11 AM</span>
                <span className="h-px w-12 bg-amber-400"></span>
             </div>
             <button onClick={() => setShowExamInfo(false)} className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-3xl shadow-xl transition-transform active:scale-95 uppercase tracking-widest text-lg">ठीक है, समझ गया!</button>
          </div>
        </div>
      )}

      <header className={`w-full p-4 flex justify-between items-center text-white shadow-md z-30 sticky top-0 ${quiz?.isExamMode ? 'bg-slate-800' : 'bg-orange-600'}`}>
        <span className="font-bold text-lg cursor-pointer" onClick={() => handleNav('LANDING')}>
          <span className="bg-white text-orange-600 w-8 h-8 rounded-full flex items-center justify-center font-black">इ</span>
        </span>
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => handleNav('NOTES')} 
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            title={language === Language.HINDI ? "इतिहास सारांश (Revision Notes)" : "Revision Notes"}
          >
            📖
          </button>
          <button onClick={() => handleNav('LEADERBOARD')} className="bg-white/20 p-2 rounded-full">🏆</button>
          <button onClick={() => handleNav('LIBRARY')} className="bg-white/20 p-2 rounded-full">📚</button>
          <button onClick={() => handleNav('SETTINGS')} className="bg-white/20 p-2 rounded-full">⚙️</button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-2xl px-4 py-8 flex flex-col items-center justify-center">
        {loading ? (
          <div className="text-center animate-fade-in w-full max-w-md">
            <div className={`p-10 rounded-[3rem] border-8 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50 shadow-2xl'}`}>
               <div className="relative mb-8 mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-orange-600 rounded-full animate-ping opacity-20"></div>
                  <div className="relative z-10 w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-4xl shadow-xl animate-pulse">🔥</div>
               </div>
               <h2 className={`text-2xl font-black mb-4 leading-snug ${darkMode ? 'text-white' : 'text-orange-950'}`}>
                 {loadingDifficulty === Difficulty.HARD ? t.marathonLoading : t.standardLoading}
               </h2>
               <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
               </div>
            </div>
          </div>
        ) : (
          <>
            {appState === 'LANDING' && (
              <div className="text-center animate-fade-in py-10 w-full">
                <h1 className={`text-7xl md:text-9xl font-black mb-2 hindi-font tracking-tighter ${darkMode ? 'text-orange-500' : 'text-orange-600'}`}>{t.intro || INTRO_MAIN}</h1>
                <p className={`text-xl md:text-3xl font-bold mb-12 italic opacity-80 ${darkMode ? 'text-slate-400' : 'text-orange-800'}`}>"{t.tagline || INTRO_SUB}"</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div 
                    className={`p-6 rounded-[2.5rem] border-4 shadow-xl text-left flex flex-col justify-between h-56 transition-all cursor-pointer group hover:scale-[1.02] ${examStatus === 'LIVE' ? 'border-indigo-400 bg-indigo-900' : darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-100'}`}
                    onClick={() => examStatus === 'LIVE' ? startQuiz(Difficulty.EXAM) : setShowExamInfo(true)}
                  >
                     <div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${examStatus === 'LIVE' ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-700 text-white'}`}>
                           {examStatus === 'LIVE' ? 'LIVE NOW' : 'NEXT SUNDAY'}
                        </span>
                        <h3 className="text-2xl font-black mt-4 text-white group-hover:text-amber-400 transition-colors">{t.examMode || "परीक्षा बोर्ड"}</h3>
                        <p className="text-xs font-bold mt-1 text-slate-400 italic">प्रत्येक रविवार 11:00 AM</p>
                        {examStatus === 'UPCOMING' && <p className="text-[10px] font-mono text-indigo-300 mt-2">प्रारंभ: {formatTime(timeToExam)}</p>}
                     </div>
                     <div className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl uppercase text-center text-sm shadow-inner group-hover:bg-amber-100 transition-colors">
                        {examStatus === 'LIVE' ? t.start : (t.history || "बोर्ड देखें")}
                     </div>
                  </div>

                  <div className="p-6 rounded-[2.5rem] border-4 shadow-xl text-left bg-orange-600 border-orange-700 text-white flex flex-col justify-between h-56 cursor-pointer transform hover:scale-105 transition-all" onClick={() => startQuiz(Difficulty.QUICK_TEST)}>
                     <div>
                        <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-white/20">नया (NEW)</span>
                        <h3 className="text-2xl font-black mt-4">⚡ {t[Difficulty.QUICK_TEST] || "त्वरित टेस्ट"}</h3>
                        <p className="text-xs opacity-70">20 प्रश्न • 10 मिनट</p>
                     </div>
                     <button className="w-full py-4 bg-white text-orange-600 font-black rounded-2xl uppercase text-sm">{t.start}</button>
                  </div>

                  <div className="p-6 rounded-[2.5rem] border-4 shadow-xl text-left bg-gradient-to-br from-amber-700 to-amber-900 border-amber-600 text-white flex flex-col justify-between h-56 cursor-pointer transform hover:scale-105 transition-all" onClick={() => startQuiz(Difficulty.PYQ_MOCK)}>
                     <div>
                        <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-white/20">UPSC • SSC • PSC • RRB</span>
                        <h3 className="text-2xl font-black mt-4">🏛️ {language === Language.HINDI ? "विगत वर्ष प्रश्न (PYQ)" : "Previous Exam Qs"}</h3>
                        <p className="text-xs opacity-80">25 प्रश्न • 20 मिनट • प्रतियोगी परीक्षाओं के प्रश्न</p>
                     </div>
                     <button className="w-full py-4 bg-white text-amber-900 font-black rounded-2xl uppercase text-sm">{t.start}</button>
                  </div>

                  <div className="p-6 rounded-[2.5rem] border-4 shadow-xl text-left bg-slate-800 border-slate-700 text-white flex flex-col justify-between h-56 cursor-pointer transform hover:scale-105 transition-all" onClick={() => startQuiz(Difficulty.HARD)}>
                     <div>
                        <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-white/20">{t.marathon || "मैराथन"}</span>
                        <h3 className="text-2xl font-black mt-4">🔥 2000+ {t.questions}</h3>
                        <p className="text-xs opacity-70">नॉन-स्टॉप इतिहास का अभ्यास</p>
                     </div>
                     <button className="w-full py-4 bg-white text-slate-800 font-black rounded-2xl uppercase text-sm">{t.start}</button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button 
                    onClick={() => handleNav('NOTES')} 
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black text-lg rounded-2xl shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase border-2 border-amber-500/50"
                  >
                    <span>📖</span>
                    <span>{language === Language.HINDI ? "इतिहास सारांश (Revision)" : "Revision Notes"}</span>
                  </button>

                  <button 
                    onClick={() => handleNav('DIFFICULTY_SELECT')} 
                    className="flex-[1.5] py-4 px-8 bg-orange-600 hover:bg-orange-700 text-white font-black text-xl rounded-2xl shadow-xl transform hover:scale-[1.02] transition-all uppercase"
                  >
                    {t.startQuiz || "क्विज़ शुरू करें"} →
                  </button>
                </div>
              </div>
            )}

            {appState === 'NOTES' && (
              <RevisionNotesView
                language={language}
                darkMode={darkMode}
                onBack={() => handleNav('LANDING')}
                onStartQuiz={(diff) => startQuiz(diff)}
              />
            )}

            {appState === 'LEADERBOARD' && (
              <div className="w-full animate-fade-in space-y-8 py-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-black">🏆 {t.history || "परीक्षा बोर्ड"}</h2>
                    <button onClick={() => handleNav('LANDING')} className="p-2 bg-orange-600 text-white rounded-xl">✖</button>
                 </div>
                 
                 <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
                    {leaderboard.length === 0 ? (
                      <div className="text-center py-20 font-bold opacity-50">लोड हो रहा है...</div>
                    ) : (
                      leaderboard.map((p) => (
                        <div key={p.rank} className={`p-5 rounded-3xl border-2 transition-all duration-300 ${p.isUser ? 'bg-orange-600 text-white shadow-xl ring-4 ring-orange-100' : darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50'}`}>
                           <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-3">
                                 <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${p.rank === 1 ? 'bg-yellow-400 text-yellow-900 scale-110 shadow-lg' : p.rank === 2 ? 'bg-slate-300 text-slate-700' : p.rank === 3 ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{p.rank}</span>
                                 <div className="text-left">
                                    <p className="font-black text-xl flex items-center gap-2">
                                       {p.name} {p.isRisingStar && <span className="text-sm animate-bounce">🌟</span>}
                                    </p>
                                    <p className={`text-[10px] font-bold ${p.isUser ? 'text-white/80' : 'text-gray-400'}`}>ID: {p.email.split('@')[0]}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <span className="font-black text-3xl">{p.score}</span>
                                 <p className={`text-[10px] font-bold opacity-60`}>{formatTime(Math.round(p.timeTaken))}</p>
                              </div>
                           </div>
                        </div>
                      ))
                    )}
                 </div>
              </div>
            )}

            {appState === 'LIBRARY' && (
              <div className="w-full animate-fade-in space-y-6">
                <div className="flex justify-between items-center">
                   <h2 className="text-3xl font-black">📚 {t.bookmarks || "लाइब्रेरी"} (2000+)</h2>
                   <button onClick={() => handleNav('LANDING')} className="p-2 bg-orange-600 text-white rounded-xl">✖</button>
                </div>
                <div className="space-y-4">
                  {libraryQuestions.map((q, i) => (
                    <div key={i} className={`p-6 rounded-3xl border-2 transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50'}`}>
                      <div className="flex justify-between mb-3 items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-3 py-1 rounded-full uppercase">{q.era}</span>
                          {q.examTag && (
                            <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-300">🏛️ {q.examTag}</span>
                          )}
                        </div>
                        <GoogleSearchButton query={q.text} mini />
                      </div>
                      <p className="text-xl font-black mb-4">{i + 1}. {q.text}</p>
                      <div className="grid grid-cols-1 gap-2 mb-4">
                         {q.options.map((opt, idx) => (
                           <div key={idx} className={`p-3 rounded-xl border font-bold ${idx === q.correctAnswer ? 'bg-green-100 border-green-300 text-green-900' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
                             {opt} {idx === q.correctAnswer && "✓"}
                           </div>
                         ))}
                      </div>
                      {/* Display Grounding Sources */}
                      {q.sources && q.sources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                          <p className="text-[10px] font-black uppercase opacity-40 mb-2">{t.sources}:</p>
                          <div className="flex flex-wrap gap-2">
                            {q.sources.map((s, idx) => (
                              <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors">
                                🔗 {s.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {appState === 'SETTINGS' && (
              <div className="w-full animate-fade-in py-6">
                 <h2 className="text-4xl font-black mb-8 text-center">{t.customization}</h2>
                 <div className="space-y-6">
                    <div className={`p-6 rounded-[2rem] border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50'}`}>
                       <p className="font-black text-lg mb-6 flex items-center gap-2">🌐 {t.selectLang}</p>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {LANGUAGES.map(lang => (
                            <button 
                              key={lang.code} 
                              onClick={() => changeLanguage(lang.code)} 
                              className={`py-4 px-2 rounded-2xl border-4 font-bold text-sm transition-all shadow-sm ${language === lang.code ? 'border-orange-600 bg-orange-600 text-white' : 'border-transparent bg-gray-100 text-gray-600 hover:border-orange-200'}`}
                            >
                               {lang.name}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className={`p-6 rounded-[2rem] border-2 flex justify-between items-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50'}`}>
                       <div className="flex items-center gap-3">
                          <span className="text-2xl">{darkMode ? '🌙' : '☀️'}</span>
                          <span className="font-bold text-lg">{t.theme} ({darkMode ? t.darkMode : t.lightMode})</span>
                       </div>
                       <button onClick={() => setDarkMode(!darkMode)} className={`w-16 h-10 rounded-full relative transition-colors ${darkMode ? 'bg-orange-600' : 'bg-gray-300'}`}>
                          <div className={`absolute top-1.5 w-7 h-7 bg-white rounded-full shadow-md transition-all ${darkMode ? 'left-8' : 'left-1.5'}`}></div>
                       </button>
                    </div>

                    {/* Font Size Adjustment */}
                    <div className={`p-6 rounded-[2rem] border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50'}`}>
                       <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl">🔤</span>
                          <span className="font-bold text-lg">{language === Language.HINDI ? "फॉन्ट का आकार" : "Font Size"}</span>
                       </div>
                       <div className="grid grid-cols-3 gap-3">
                          {[
                            { key: 'sm', label: language === Language.HINDI ? "छोटा" : "Small", sub: "A-" },
                            { key: 'md', label: language === Language.HINDI ? "सामान्य" : "Normal", sub: "A" },
                            { key: 'lg', label: language === Language.HINDI ? "बड़ा" : "Large", sub: "A+" }
                          ].map(f => (
                            <button
                              key={f.key}
                              onClick={() => { setFontSize(f.key as 'sm' | 'md' | 'lg'); playSound('nav'); }}
                              className={`py-3 px-2 rounded-2xl border-2 font-bold text-sm transition-all flex flex-col items-center gap-0.5 ${fontSize === f.key ? 'border-orange-600 bg-orange-600 text-white shadow-md' : darkMode ? 'bg-slate-800 text-slate-300 border-transparent hover:border-orange-400' : 'bg-gray-100 text-gray-700 border-transparent hover:border-orange-300'}`}
                            >
                              <span className="text-xs opacity-70 font-mono">{f.sub}</span>
                              <span>{f.label}</span>
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className={`p-6 rounded-[2rem] border-2 flex justify-between items-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50'}`}>
                       <div className="flex items-center gap-3">
                          <span className="text-2xl">🔊</span>
                          <span className="font-bold text-lg">{t.voice}</span>
                       </div>
                       <button onClick={() => { setVoiceEnabled(!voiceEnabled); if(voiceEnabled) window.speechSynthesis.cancel(); }} className={`w-16 h-10 rounded-full relative transition-colors ${voiceEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                          <div className={`absolute top-1.5 w-7 h-7 bg-white rounded-full shadow-md transition-all ${voiceEnabled ? 'left-8' : 'left-1.5'}`}></div>
                       </button>
                    </div>
                 </div>
                 <button onClick={() => handleNav('LANDING')} className="mt-12 w-full py-5 bg-orange-600 text-white font-black rounded-3xl shadow-xl uppercase text-xl">{t.finish || "सुरक्षित करें"}</button>
              </div>
            )}

            {appState === 'RESULT' && (
              <div className="w-full animate-fade-in space-y-8 py-6">
                <div className="text-center space-y-2">
                  <span className="text-6xl animate-bounce">📊</span>
                  <h2 className={`text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-orange-900'}`}>
                    {language === Language.HINDI ? "क्विज़ परिणाम" : "Quiz Results"}
                  </h2>
                  <p className="text-sm opacity-60 uppercase tracking-widest font-black">
                    {lastResult ? (lastResult.difficulty === Difficulty.EXAM ? (language === Language.HINDI ? "बोर्ड परीक्षा" : "Board Exam") : (language === Language.HINDI ? "अभ्यास परिणाम" : "Practice Session")) : ""}
                  </p>
                </div>

                {lastResult ? (
                  <div className="space-y-8">
                    {/* Circle Score Card & Centered Stats Row */}
                    <div className={`p-8 rounded-[3rem] border-4 shadow-xl text-center relative overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50'}`}>
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-orange-500 to-red-500"></div>
                      
                      {/* Flex wrapper for percentage meters */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center my-6">
                        
                        {/* Correct Answers block */}
                        <div className="flex flex-col items-center p-6 rounded-3xl bg-green-500/10 border border-green-500/20">
                          <span className="text-sm font-black text-green-600 uppercase tracking-wider mb-2">
                            {language === Language.HINDI ? "सही उत्तर (Correct)" : "Correct Answers"}
                          </span>
                          <div className="text-5xl font-black text-green-600 flex items-baseline gap-1">
                            {lastResult.correctPercentage}%
                          </div>
                          <div className="text-xs font-bold opacity-60 mt-1">
                            {lastResult.score} / {lastResult.totalQuestions} {language === Language.HINDI ? "प्रश्नों में से" : "Questions"}
                          </div>
                          
                          {/* Visual progress bar */}
                          <div className="w-full bg-gray-200 dark:bg-slate-800 h-3 rounded-full mt-4 overflow-hidden">
                            <div className="bg-green-600 h-full rounded-full transition-all duration-1000" style={{ width: `${lastResult.correctPercentage}%` }}></div>
                          </div>
                        </div>

                        {/* Incorrect Answers block */}
                        <div className="flex flex-col items-center p-6 rounded-3xl bg-red-500/10 border border-red-500/20">
                          <span className="text-sm font-black text-red-600 uppercase tracking-wider mb-2">
                            {language === Language.HINDI ? "गलत उत्तर (Incorrect)" : "Incorrect Answers"}
                          </span>
                          <div className="text-5xl font-black text-red-600 flex items-baseline gap-1">
                            {lastResult.incorrectPercentage}%
                          </div>
                          <div className="text-xs font-bold opacity-60 mt-1">
                            {lastResult.incorrect} / {lastResult.totalQuestions} {language === Language.HINDI ? "प्रश्नों में से" : "Questions"}
                          </div>
                          
                          {/* Visual progress bar */}
                          <div className="w-full bg-gray-200 dark:bg-slate-800 h-3 rounded-full mt-4 overflow-hidden">
                            <div className="bg-red-600 h-full rounded-full transition-all duration-1000" style={{ width: `${lastResult.incorrectPercentage}%` }}></div>
                          </div>
                        </div>

                      </div>

                      {/* Summary text */}
                      <div className="border-t border-dashed border-gray-100 dark:border-slate-800 pt-6 flex flex-wrap justify-around items-center gap-4 text-sm font-bold">
                        <div>
                          <span className="opacity-50">{language === Language.HINDI ? "समय लगा:" : "Time Taken:"}</span>{" "}
                          <span className={`font-mono text-lg ${darkMode ? 'text-amber-400' : 'text-orange-900'}`}>
                            {formatTime(lastResult.timeTaken)}
                          </span>
                        </div>
                        {lastResult.skipped > 0 && (
                          <div>
                            <span className="opacity-50 text-amber-600">{language === Language.HINDI ? "छोड़े गए:" : "Skipped:"}</span>{" "}
                            <span className="font-mono text-lg text-amber-600">
                              {lastResult.skipped}
                            </span>
                          </div>
                        )}
                        <div>
                          <span className="opacity-50">{language === Language.HINDI ? "स्तर (Difficulty):" : "Difficulty:"}</span>{" "}
                          <span className="uppercase text-orange-600 px-3 py-1 bg-orange-100 dark:bg-orange-950/40 rounded-full text-xs font-black">
                            {lastResult.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* mistake and review header */}
                    <div className="space-y-4">
                      <h3 className={`text-2xl font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        📝 {language === Language.HINDI ? "प्रश्नोत्तर विश्लेषण और समीक्षा" : "Q&A Analysis & Review"}
                      </h3>
                      <p className="text-xs opacity-60 -mt-2 text-left">
                        {language === Language.HINDI ? "सभी दिए गए प्रश्नों का विस्तृत विवरण और उनके ऐतिहासिक स्रोत" : "Detailed explanation and historical sources for all questions"}
                      </p>

                      <div className="space-y-6">
                        {lastResult.questions.map((q, idx) => {
                          const userSel = lastResult.userAnswers?.[idx];
                          const isCorrect = userSel === q.correctAnswer;
                          const isSkipped = userSel === undefined || userSel === null;

                          return (
                            <div key={idx} className={`p-6 text-left rounded-[2rem] border-4 transition-all ${isCorrect ? (darkMode ? 'bg-green-950/20 border-green-900/40' : 'bg-green-50/50 border-green-100') : isSkipped ? (darkMode ? 'bg-amber-950/20 border-amber-900/40' : 'bg-amber-50/50 border-amber-100') : (darkMode ? 'bg-red-950/20 border-red-900/40' : 'bg-red-50/50 border-red-100')}`}>
                              <div className="flex justify-between items-start gap-4 mb-3">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${isCorrect ? 'bg-green-600 text-white' : isSkipped ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'}`}>
                                    {isCorrect ? (language === Language.HINDI ? "सही उत्तर" : "Correct") : isSkipped ? (language === Language.HINDI ? "छोड़ दिया" : "Skipped") : (language === Language.HINDI ? "गलत उत्तर" : "Incorrect")}
                                  </span>
                                  {q.examTag && (
                                    <span className="text-[10px] font-black bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                                      🏛️ {q.examTag}
                                    </span>
                                  )}
                                </div>
                                <span className="opacity-50 text-xs font-bold font-mono">Q. {idx + 1}</span>
                              </div>

                              <p className={`text-xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{q.text}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                {q.options.map((opt, optIdx) => {
                                  const isThisCorrect = optIdx === q.correctAnswer;
                                  const isThisSelected = optIdx === userSel;

                                  let optionStyle = darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-100 text-gray-700';
                                  if (isThisCorrect) {
                                    optionStyle = 'bg-green-600 text-white border-green-700';
                                  } else if (isThisSelected) {
                                    optionStyle = 'bg-red-600 text-white border-red-700';
                                  }

                                  return (
                                    <div key={optIdx} className={`p-4 rounded-2xl border-2 font-bold flex items-center text-sm ${optionStyle}`}>
                                      <span className="w-6 h-6 rounded-full flex items-center justify-center font-black mr-2 bg-black/10 text-xs">{String.fromCharCode(65 + optIdx)}</span>
                                      <span>{opt}</span>
                                      {isThisCorrect && <span className="ml-auto text-lg leading-none">✓</span>}
                                      {isThisSelected && !isThisCorrect && <span className="ml-auto text-lg leading-none">✗</span>}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Explanation block */}
                              <div className={`p-5 rounded-2xl border-2 text-sm leading-relaxed ${darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white/80 border-gray-100 text-gray-700'}`}>
                                <p className="font-black text-xs uppercase text-orange-600 mb-1">{language === Language.HINDI ? "व्याख्या और इतिहास विश्लेषण:" : "Explanation & Historical Analysis:"}</p>
                                <p className="font-bold">{q.explanation}</p>

                                {/* Background Sources links if any */}
                                {q.sources && q.sources.length > 0 && (
                                  <div className="mt-3 pt-3 border-t border-dashed border-gray-100 dark:border-slate-800">
                                    <p className="text-[10px] font-black uppercase opacity-40 mb-1">{t.sources}:</p>
                                    <div className="flex flex-col gap-1 text-left">
                                      {q.sources.map((s, sIdx) => (
                                        <a key={sIdx} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                                          🔗 {s.title}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action navigation controls */}
                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                      <button 
                        onClick={() => startQuiz(lastResult.difficulty)} 
                        className="flex-1 py-5 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-3xl uppercase text-xl shadow-xl active:scale-[0.98] transition-all"
                      >
                        🔄 {language === Language.HINDI ? "पुनः प्रयास करें" : "Retake Quiz"}
                      </button>
                      <button 
                        onClick={() => handleNav('LEADERBOARD')} 
                        className={`flex-1 py-5 font-black rounded-3xl uppercase text-xl border-4 active:scale-[0.98] transition-all ${darkMode ? 'bg-amber-950/40 border-amber-800 text-amber-300 hover:bg-amber-900/40' : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'}`}
                      >
                        🏆 {language === Language.HINDI ? "परीक्षा बोर्ड" : "Leaderboard"}
                      </button>
                      <button 
                        onClick={() => handleNav('LANDING')} 
                        className={`flex-1 py-5 font-black rounded-3xl uppercase text-xl border-4 active:scale-[0.98] transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-orange-100 text-orange-600 hover:border-orange-200 shadow-sm'}`}
                      >
                        🏠 {language === Language.HINDI ? "मुख्य पृष्ठ" : "Main Menu"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                     <p className="font-bold opacity-60">{language === Language.HINDI ? "कोई परिणाम डेटा उपलब्ध नहीं है।" : "No results data available."}</p>
                     <button onClick={() => handleNav('LANDING')} className="mt-4 px-6 py-3 bg-orange-600 text-white font-bold rounded-2xl uppercase">{language === Language.HINDI ? "होम" : "Home"}</button>
                  </div>
                )}
              </div>
            )}

            {appState === 'QUIZ' && quiz && (
               <div className="w-full pb-16 animate-fade-in relative">
                 {/* Marathon Live Counter Overlay */}
                 {quiz.difficulty === Difficulty.HARD && (
                    <div className="absolute -top-10 left-0 z-10 flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-3 py-1.5 rounded-xl backdrop-blur-sm animate-pulse">
                       <div className="w-2.5 h-2.5 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
                       <span className="text-xs font-black text-red-600 uppercase tracking-wider">
                          {liveStudents.toLocaleString()} छात्र लाइव
                       </span>
                    </div>
                 )}

                 {quiz.currentIndex >= quiz.questions.length ? (
                    <div className="text-center animate-fade-in w-full max-w-md mx-auto my-8">
                      <div className={`p-8 rounded-[2.5rem] border-4 min-h-[14rem] flex flex-col items-center justify-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50 shadow-xl'}`}>
                         <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                         <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-orange-950'}`}>
                           {language === Language.HINDI ? "अगला प्रश्न लोड हो रहा है..." : "Loading next question..."}
                         </h2>
                      </div>
                    </div>
                 ) : (
                    <div className="space-y-4">
                      {/* Top Bar with Question Count, Timer, and Tools */}
                      <div className={`flex justify-between items-center text-xs md:text-sm font-black ${darkMode ? 'text-slate-400' : 'text-orange-900'}`}>
                        <span className="opacity-70 font-mono text-sm">{quiz.currentIndex + 1} / {quiz.totalQuestions}</span>
                        <span className={`text-lg font-mono font-black ${quiz.timeRemaining < 60 ? 'text-red-600 animate-pulse' : ''}`}>⏱️ {formatTime(quiz.timeRemaining)}</span>
                        <div className="flex gap-2">
                           <GoogleSearchButton query={quiz.questions[quiz.currentIndex].text} mini />
                           <button onClick={() => speakText(quiz.questions[quiz.currentIndex].text)} className={`w-9 h-9 rounded-full flex items-center justify-center text-lg ${darkMode ? 'bg-slate-800' : 'bg-white shadow-sm border border-orange-100'}`}>🔊</button>
                        </div>
                      </div>

                      {/* Question Text - Compact and clearly readable */}
                      <div className={`p-5 rounded-2xl border-2 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-orange-100 shadow-sm'}`}>
                        {quiz.questions[quiz.currentIndex].examTag && (
                          <div className="mb-2.5 flex items-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                              🏛️ {quiz.questions[quiz.currentIndex].examTag}
                            </span>
                          </div>
                        )}
                        <h2 className={`font-bold leading-relaxed hindi-font ${fontSize === 'sm' ? 'text-lg' : fontSize === 'lg' ? 'text-2xl' : 'text-xl'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {quiz.questions[quiz.currentIndex].text}
                        </h2>
                      </div>

                      {/* 4 Options - Compact so question and all options fit together on screen */}
                      <div className="grid grid-cols-1 gap-2.5">
                        {quiz.questions[quiz.currentIndex].options.map((option, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => handleAnswer(idx)} 
                            disabled={selectedAnswer !== null} 
                            className={`p-3.5 md:p-4 text-left rounded-2xl border-2 transition-all flex items-center ${selectedAnswer === null ? (darkMode ? 'bg-slate-900 border-slate-800 hover:border-orange-500' : 'border-orange-50 bg-white shadow-sm hover:border-orange-500') : (idx === quiz.questions[quiz.currentIndex].correctAnswer) ? 'border-green-600 bg-green-50 text-green-900 font-black' : (selectedAnswer === idx) ? 'border-red-600 bg-red-50 text-red-900' : 'opacity-40'}`}
                          >
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black mr-3 text-xs shrink-0 ${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-gray-100 text-gray-700'}`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className={`font-bold ${fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : 'text-base'}`}>
                              {option}
                            </span>
                            {selectedAnswer !== null && idx === quiz.questions[quiz.currentIndex].correctAnswer && (
                              <span className="ml-auto text-green-600 font-black text-lg">✓</span>
                            )}
                            {selectedAnswer === idx && idx !== quiz.questions[quiz.currentIndex].correctAnswer && (
                              <span className="ml-auto text-red-600 font-black text-lg">✗</span>
                            )}
                          </button>
                        ))}
                      </div>

                      {showExplanation && (
                        <div className={`p-5 border-2 border-blue-500 rounded-2xl shadow-lg animate-fade-in ${darkMode ? 'bg-slate-900' : 'bg-blue-50/70'}`}>
                          <p className={`text-sm mb-4 font-bold leading-relaxed ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                            💡 {quiz.questions[quiz.currentIndex].explanation}
                          </p>
                          
                          {/* Display Grounding Sources */}
                          {quiz.questions[quiz.currentIndex].sources && quiz.questions[quiz.currentIndex].sources!.length > 0 && (
                            <div className="mb-4 pt-3 border-t border-dashed border-blue-200">
                               <p className="text-[10px] font-black uppercase opacity-50 mb-1">{t.sources}:</p>
                               <div className="flex flex-wrap gap-2">
                                  {quiz.questions[quiz.currentIndex].sources!.map((s, idx) => (
                                     <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline bg-white/70 px-2 py-1 rounded-lg">
                                        🔗 {s.title}
                                     </a>
                                  ))}
                               </div>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="sm:w-1/3">
                               <GoogleSearchButton query={quiz.questions[quiz.currentIndex].text} />
                            </div>
                            <button 
                              onClick={() => { 
                                window.speechSynthesis.cancel(); 
                                setShowExplanation(false); 
                                setSelectedAnswer(null); 
                                if (quiz.currentIndex + 1 < quiz.questions.length) {
                                  setQuiz(p => p ? ({ ...p, currentIndex: p.currentIndex + 1 }) : null); 
                                } else if (quiz.currentIndex + 1 >= quiz.totalQuestions) {
                                  finishQuiz(); 
                                } else {
                                  // Ensure seamless flow without ever halting
                                  const more = getFallbackQuestions(language, 10, quiz.difficulty);
                                  setQuiz(p => p ? ({ ...p, questions: [...p.questions, ...more], currentIndex: p.currentIndex + 1 }) : null);
                                }
                              }} 
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl uppercase text-base shadow-md transition-all active:scale-95"
                            >
                              {t.next} →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                 )}
               </div>
            )}

            {appState === 'DIFFICULTY_SELECT' && (
              <div className="w-full animate-fade-in py-6">
                <h2 className={`text-4xl font-black mb-6 text-center ${darkMode ? 'text-white' : 'text-orange-900'}`}>{t.selectDifficulty}</h2>
                
                <div 
                  onClick={() => handleNav('NOTES')}
                  className={`p-4 rounded-2xl border-2 mb-6 cursor-pointer flex items-center justify-between transition-all hover:scale-[1.01] ${
                    darkMode 
                      ? 'bg-amber-950/30 border-amber-700/50 text-amber-200 hover:bg-amber-950/50' 
                      : 'bg-amber-50 border-amber-200 text-amber-950 hover:bg-amber-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📖</span>
                    <div className="text-left">
                      <h4 className="font-black text-sm md:text-base">
                        {language === Language.HINDI ? "क्विज़ से पहले पढ़ें: इतिहास सारांश (Revision Notes)" : "Pre-Quiz Revision: History Notes"}
                      </h4>
                      <p className="text-xs opacity-75 mt-0.5">
                        {language === Language.HINDI ? "प्राचीन, मध्यकालीन, आधुनिक भारत और परीक्षा के प्रमुख बिंदु" : "Ancient, Medieval, Modern India & High-Yield Exam Points"}
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-xs md:text-sm px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm shrink-0 uppercase">
                    {language === Language.HINDI ? "पढ़ें" : "Read"} →
                  </span>
                </div>
                
                {showTimePicker ? (
                  <div className={`p-8 rounded-[2.5rem] border-4 shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50'}`}>
                    <h3 className="text-2xl font-black mb-6 text-center">{t.customTimeTitle}</h3>
                    <div className="flex flex-col items-center gap-8">
                      <div className="w-full px-4">
                        <input 
                          type="range" 
                          min="1" 
                          max="60" 
                          value={customTime} 
                          onChange={(e) => setCustomTime(parseInt(e.target.value))}
                          className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                        />
                        <div className="flex justify-between mt-2 text-sm font-bold opacity-50">
                          <span>1 min</span>
                          <span>30 min</span>
                          <span>60 min</span>
                        </div>
                      </div>
                      <div className="text-6xl font-black text-orange-600">{customTime} <span className="text-xl">{t.minutes}</span></div>
                      <div className="flex gap-4 w-full">
                        <button onClick={() => setShowTimePicker(false)} className="flex-1 py-4 bg-gray-200 text-gray-700 font-black rounded-2xl uppercase">वापस</button>
                        <button onClick={() => { setShowTimePicker(false); startQuiz(Difficulty.CUSTOM_TEST, customTime * 60); }} className="flex-[2] py-4 bg-orange-600 text-white font-black rounded-2xl uppercase shadow-lg">{t.startCustom}</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {DIFFICULTIES.filter(d => d.code !== Difficulty.EXAM).map(diff => (
                      <button 
                        key={diff.code} 
                        onClick={() => {
                          if (diff.code === Difficulty.CUSTOM_TEST) {
                            setShowTimePicker(true);
                          } else {
                            startQuiz(diff.code as Difficulty);
                          }
                        }} 
                        className={`p-8 text-left rounded-[2.5rem] border-4 transition-all shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50 hover:border-orange-600'}`}
                      >
                        <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-orange-900'}`}>{t[diff.code] || diff.label}</h3>
                        <p className="text-sm font-bold opacity-50 mt-2">
                          {diff.code === Difficulty.CUSTOM_TEST ? t[Difficulty.CUSTOM_TEST] : `${diff.count} ${t.questions} • ${formatTime(diff.time)}`}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Educational Gaming-Style Bottom Docked Banner Ad */}
      <BannerAd 
        darkMode={darkMode} 
        onOpenNotes={() => handleNav('NOTES')} 
        onStartQuiz={() => {
          if (appState !== 'QUIZ') {
            handleNav('DIFFICULTY_SELECT');
          }
        }}
      />

      <footer className="w-full p-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
        &copy; {new Date().getFullYear()} {APP_NAME}
      </footer>
    </div>
  );
};

export default App;
