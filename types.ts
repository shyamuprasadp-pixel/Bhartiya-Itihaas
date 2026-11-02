
export enum Language {
  HINDI = 'HINDI',
  ENGLISH = 'ENGLISH',
  SANSKRIT = 'SANSKRIT',
  TAMIL = 'TAMIL',
  TELUGU = 'TELUGU',
  MARATHI = 'MARATHI',
  BENGALI = 'BENGALI',
  GUJARATI = 'GUJARATI'
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  CHALLENGE = 'CHALLENGE',
  EXAM = 'EXAM',
  QUICK_TEST = 'QUICK_TEST',
  CUSTOM_TEST = 'CUSTOM_TEST',
  PYQ_MOCK = 'PYQ_MOCK'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  era: 'Ancient' | 'Medieval' | 'Modern';
  sources?: { title: string; uri: string }[];
  examTag?: string;
}

export interface HistoryEntry {
  id: string;
  difficulty: Difficulty | 'DAILY';
  score: number;
  total: number;
  skipped: number;
  date: string;
  isChallenge?: boolean;
}

export type AppState = 'LANDING' | 'DIFFICULTY_SELECT' | 'QUIZ' | 'SETTINGS' | 'RESULT' | 'BOOKMARKS' | 'HISTORY' | 'COUNTDOWN' | 'LIBRARY' | 'LEADERBOARD' | 'NOTES';

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  skippedCount: number;
  skipsRemaining: number;
  isComplete: boolean;
  difficulty: Difficulty;
  timeRemaining: number;
  totalQuestions: number;
  isChallengeMode?: boolean;
  isDailyMode?: boolean;
  isExamMode?: boolean;
}
