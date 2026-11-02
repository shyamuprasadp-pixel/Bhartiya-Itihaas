import React, { useState } from 'react';
import { Language, Difficulty } from './types';
import { REVISION_NOTES } from './services/revisionNotesData';

interface RevisionNotesViewProps {
  language: Language;
  darkMode: boolean;
  onBack: () => void;
  onStartQuiz: (difficulty: Difficulty) => void;
}

export const RevisionNotesView: React.FC<RevisionNotesViewProps> = ({
  language,
  darkMode,
  onBack,
  onStartQuiz
}) => {
  const [selectedEraId, setSelectedEraId] = useState<string>('ancient');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const isHindi = language === Language.HINDI;
  const currentEra = REVISION_NOTES.find(e => e.id === selectedEraId) || REVISION_NOTES[0];

  // Filter topics based on search query
  const filteredTopics = currentEra.topics.filter(topic => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const title = (isHindi ? topic.titleHi : topic.titleEn).toLowerCase();
    const summary = (isHindi ? topic.summaryHi : topic.summaryEn).toLowerCase();
    const points = (isHindi ? topic.keyPointsHi : topic.keyPointsEn).join(' ').toLowerCase();
    return title.includes(q) || summary.includes(q) || points.includes(q);
  });

  return (
    <div className="w-full animate-fade-in space-y-6 max-w-2xl mx-auto pb-12">
      {/* Top Bar with Title and Back button */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">📖</span>
            <h2 className={`text-2xl md:text-3xl font-black ${darkMode ? 'text-white' : 'text-orange-950'}`}>
              {isHindi ? 'इतिहास सारांश' : 'Revision Notes'}
            </h2>
          </div>
          <p className={`text-xs md:text-sm font-bold opacity-75 mt-0.5 ${darkMode ? 'text-slate-400' : 'text-orange-900'}`}>
            {isHindi ? 'क्विज़ से पहले महत्वपूर्ण परीक्षा बिंदुओं का त्वरित दोहराव' : 'Quick revision of high-yield exam milestones before quiz'}
          </p>
        </div>
        <button
          onClick={onBack}
          className="p-2.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-black rounded-2xl shadow-md transition-all shrink-0"
          title={isHindi ? "वापस जाएं" : "Back"}
        >
          ✖
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isHindi ? "विषय या तथ्य खोजें (जैसे: हड़प्पा, अशोक, अकबर, 1857)..." : "Search facts (e.g., Harappa, Ashoka, Akbar, 1857)..."}
          className={`w-full py-3.5 pl-11 pr-4 rounded-2xl border-2 text-sm font-bold outline-none transition-all ${
            darkMode 
              ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-orange-500' 
              : 'bg-white border-orange-100 text-orange-950 placeholder-orange-300 focus:border-orange-500 shadow-sm'
          }`}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base opacity-50">🔍</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black p-1 opacity-50 hover:opacity-100"
          >
            ✕
          </button>
        )}
      </div>

      {/* Era / Subject Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {REVISION_NOTES.map(era => {
          const isSelected = era.id === selectedEraId;
          return (
            <button
              key={era.id}
              onClick={() => {
                setSelectedEraId(era.id);
                setExpandedTopicId(null);
              }}
              className={`p-3 rounded-2xl border-2 text-xs md:text-sm font-black transition-all flex flex-col items-center justify-center gap-1 text-center ${
                isSelected
                  ? 'bg-orange-600 border-orange-700 text-white shadow-md scale-[1.02]'
                  : darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-orange-500/50'
                    : 'bg-white border-orange-100 text-orange-950 hover:border-orange-300 shadow-sm'
              }`}
            >
              <span className="text-xl">{era.icon}</span>
              <span className="line-clamp-1">{isHindi ? era.eraHi.split(' ')[0] : era.eraEn}</span>
            </button>
          );
        })}
      </div>

      {/* Era Brief Banner */}
      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-orange-50/70 border-orange-100 text-orange-900'}`}>
        <p className="text-xs font-bold leading-relaxed">
          <span className="font-black mr-1.5">{currentEra.icon} {isHindi ? currentEra.eraHi : currentEra.eraEn}:</span>
          {isHindi ? currentEra.descriptionHi : currentEra.descriptionEn}
        </p>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <div className={`p-8 text-center rounded-3xl border-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-50'}`}>
            <p className="text-sm font-bold opacity-75">
              {isHindi ? 'कोई विषय नहीं मिला। कृपया दूसरा शब्द खोजें।' : 'No topics matched your search.'}
            </p>
          </div>
        ) : (
          filteredTopics.map(topic => {
            const isExpanded = expandedTopicId === topic.id || Boolean(searchQuery.trim());
            return (
              <div
                key={topic.id}
                className={`rounded-[2rem] border-2 transition-all overflow-hidden ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-orange-100 shadow-sm'
                }`}
              >
                {/* Topic Header Clickable */}
                <div
                  onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                  className="p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-orange-500/5 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0 mt-0.5">{topic.icon}</span>
                    <div>
                      <h3 className={`text-base md:text-lg font-black leading-snug ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {isHindi ? topic.titleHi : topic.titleEn}
                      </h3>
                      <p className={`text-xs mt-1 font-semibold leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {isHindi ? topic.summaryHi : topic.summaryEn}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-transform ${
                      darkMode ? 'bg-slate-800 text-slate-300' : 'bg-orange-100 text-orange-700'
                    } ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </button>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`px-5 pb-5 pt-2 border-t space-y-4 ${darkMode ? 'border-slate-800/80' : 'border-orange-50'}`}>
                    {/* Bullet Points */}
                    <div className="space-y-2">
                      <h4 className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                        📌 {isHindi ? 'मुख्य परीक्षा बिंदु (Key Milestones):' : 'Key Milestones:'}
                      </h4>
                      <ul className="space-y-2 text-xs md:text-sm">
                        {(isHindi ? topic.keyPointsHi : topic.keyPointsEn).map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-orange-600 font-black shrink-0 mt-0.5">•</span>
                            <span className={darkMode ? 'text-slate-200 font-medium' : 'text-gray-800 font-medium'}>
                              {pt}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exam Tip Box */}
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold leading-relaxed">
                      💡 {isHindi ? topic.examTipsHi : topic.examTipsEn}
                    </div>

                    {/* Action button: Start quiz on this topic */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => onStartQuiz(Difficulty.QUICK_TEST)}
                        className="flex-1 py-3 px-4 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-black rounded-xl text-xs uppercase shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        ⚡ {isHindi ? 'त्वरित टेस्ट दें (20 प्रश्न)' : 'Quick Test (20 Qs)'}
                      </button>
                      <button
                        onClick={() => onStartQuiz(Difficulty.PYQ_MOCK)}
                        className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-black rounded-xl text-xs uppercase shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        🏛️ {isHindi ? 'विगत वर्ष प्रश्न (PYQ)' : 'PYQ Mock Test'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating Bottom Quick Action */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => onStartQuiz(Difficulty.PYQ_MOCK)}
          className="w-full py-4 px-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:scale-98 text-white font-black text-base rounded-2xl shadow-xl uppercase transition-all flex items-center justify-center gap-2"
        >
          <span>🎯</span>
          <span>{isHindi ? 'दोहराव पूर्ण! अब क्विज़ शुरू करें' : 'Revision Done! Start Quiz Now'}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
