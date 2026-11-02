import { Question, Language, Difficulty } from "../types";
import { getFallbackQuestions } from "./fallbackQuestions";

export const fetchQuestions = async (
  language: Language,
  difficulty: Difficulty,
  count: number,
  isDaily: boolean = false
): Promise<Question[]> => {
  try {
    const response = await fetch("/api/gemini/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        difficulty,
        count,
        isDaily,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();
    const validQuestions: Question[] = (data.questions || []).filter(
      (q: any) => q.text && Array.isArray(q.options) && q.options.length === 4
    );

    if (validQuestions.length >= count) {
      return validQuestions.slice(0, count);
    }

    // If server returned fewer than needed, backfill with curated fallback questions
    const needed = count - validQuestions.length;
    const backfill = getFallbackQuestions(language, needed, difficulty);
    return [...validQuestions, ...backfill];
  } catch (error) {
    console.warn("Server generation unavailable, using verified fallback questions:", error);
    // Guarantees reliable return of authentic questions
    return getFallbackQuestions(language, count, difficulty);
  }
};
