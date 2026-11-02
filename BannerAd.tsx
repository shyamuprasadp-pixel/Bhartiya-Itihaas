import React, { useEffect, useRef, useState } from 'react';

interface BannerAdProps {
  darkMode?: boolean;
  adUnitId?: string;
  className?: string;
  onOpenNotes?: () => void;
  onStartQuiz?: () => void;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

// High-value educational campaigns tailored for Indian history competitive exam aspirants
const EDUCATIONAL_CAMPAIGNS = [
  {
    id: 'upsc_pcs',
    tag: 'UPSC & State PCS 2025',
    title: 'संपूर्ण भारतीय इतिहास 10,000+ PYQ टेस्ट सीरीज़',
    subtitle: 'विस्तृत NCERT व्याख्या व All India Ranking के साथ',
    badge: 'मुफ़्त मॉक टेस्ट',
    icon: '🏛️',
    gradient: 'from-amber-500 to-orange-600',
    ctaText: 'टेस्ट दें',
    actionType: 'quiz' as const
  },
  {
    id: 'ncert_notes',
    tag: 'NCERT कक्षा 6-12 मास्टर नोट्स',
    title: 'प्राचीन, मध्यकालीन व आधुनिक भारत माइंड-मैप्स',
    subtitle: 'क्विज़ से पहले त्वरित दोहराव वाले उच्च-अंक बिंदु',
    badge: 'रिवीजन नोट्स',
    icon: '📖',
    gradient: 'from-blue-600 to-indigo-600',
    ctaText: 'नोट्स खोलें',
    actionType: 'notes' as const
  },
  {
    id: 'ssc_railway',
    tag: 'SSC CGL / Railway RRB 2025',
    title: 'इतिहास टॉपर्स 5000+ हल प्रश्न बैंक',
    subtitle: 'पिछले 15 वर्षों की परीक्षाओं में बार-बार पूछे गए सवाल',
    badge: 'टॉपर्स चॉइस',
    icon: '🎯',
    gradient: 'from-emerald-500 to-teal-600',
    ctaText: 'हल करें',
    actionType: 'quiz' as const
  },
  {
    id: 'sunday_live',
    tag: 'रविवार ऑल इंडिया महा-क्विज़',
    title: 'अखिल भारतीय लाइव इतिहास स्कॉलरशिप टेस्ट',
    subtitle: 'प्रत्येक रविवार सुबह 11:00 बजे • लाइव लीडरबोर्ड',
    badge: 'लाइव मुकाबला',
    icon: '🏆',
    gradient: 'from-purple-600 to-pink-600',
    ctaText: 'रजिस्टर करें',
    actionType: 'quiz' as const
  }
];

export const BannerAd: React.FC<BannerAdProps> = ({
  darkMode = false,
  adUnitId = "ca-app-pub-3940256099942544/6300978111",
  className = "",
  onOpenNotes,
  onStartQuiz
}) => {
  const [activeCampaignIdx, setActiveCampaignIdx] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const adRef = useRef<HTMLModElement | null>(null);

  // Parse client and slot from the provided AdMob banner ad unit ID
  // Format: ca-app-pub-3940256099942544/6300978111
  const [adClient, adSlot] = adUnitId.includes('/')
    ? adUnitId.split('/')
    : ['ca-app-pub-3940256099942544', '6300978111'];

  // Rotate educational creatives every 7 seconds like mobile gaming ads
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCampaignIdx((prev) => (prev + 1) % EDUCATIONAL_CAMPAIGNS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Attempt to initialize Google adsbygoogle if the script is loaded
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (e) {
      // Test environment or ad-blocker: fallback educational gaming banner shows
      setAdLoaded(false);
    }
  }, [adUnitId]);

  const currentCampaign = EDUCATIONAL_CAMPAIGNS[activeCampaignIdx];

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentCampaign.actionType === 'notes' && onOpenNotes) {
      onOpenNotes();
    } else if (currentCampaign.actionType === 'quiz' && onStartQuiz) {
      onStartQuiz();
    } else {
      setShowDetailModal(true);
    }
  };

  return (
    <>
      {/* Educational Ad Detail / Future AdMob Integration Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 pointer-events-auto">
          <div
            className={`relative max-w-md w-full rounded-3xl p-6 border-4 shadow-2xl text-left animate-fade-in ${
              darkMode ? 'bg-slate-900 border-amber-800 text-slate-100' : 'bg-white border-orange-100 text-gray-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4 border-b pb-3 border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentCampaign.icon}</span>
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    शिक्षा प्रायोजक • Educational Ad
                  </span>
                  <h3 className="text-base font-black text-orange-600 dark:text-orange-400 leading-tight mt-1">
                    {currentCampaign.tag}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-400 hover:text-gray-700 dark:hover:text-white bg-gray-100 dark:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-lg font-black leading-snug">
                {currentCampaign.title}
              </h4>
              <p className="text-xs font-semibold opacity-80 leading-relaxed">
                {currentCampaign.subtitle}
              </p>

              <div className={`p-3.5 rounded-2xl text-xs space-y-1.5 border ${
                darkMode ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}>
                <div className="font-bold flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <span>💡</span> AdMob एकीकरण जानकारी:
                </div>
                <p className="font-mono text-[11px] opacity-90 break-all">
                  Ad Unit ID: <span className="font-bold text-orange-600 dark:text-orange-400">{adUnitId}</span>
                </p>
                <p className="text-[10px] opacity-75">
                  यह बैनर गेमिंग ऐप्स की तरह बॉटम-डॉक्ड है। जैसे ही आपका AdMob अकाउंट लाइव अप्रूव्ड होगा, यहाँ गूगल के लाइव विज्ञापन अपने आप प्रदर्शित होने लगेंगे।
                </p>
              </div>
            </div>

            <div className="flex gap-2.5">
              {onOpenNotes && (
                <button
                  onClick={() => { setShowDetailModal(false); onOpenNotes(); }}
                  className="flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase bg-amber-600 hover:bg-amber-700 text-white shadow-md active:scale-95 transition-transform"
                >
                  📖 नोट्स पढ़ें
                </button>
              )}
              {onStartQuiz && (
                <button
                  onClick={() => { setShowDetailModal(false); onStartQuiz(); }}
                  className="flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase bg-orange-600 hover:bg-orange-700 text-white shadow-md active:scale-95 transition-transform"
                >
                  ⚡ टेस्ट शुरू करें
                </button>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className={`py-3 px-4 rounded-xl font-black text-xs uppercase border ${
                  darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gaming Style Bottom Docked Banner Container */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 flex justify-center px-2 sm:px-4 pb-1 sm:pb-2 pointer-events-none transition-all duration-300 ${className}`}
        role="region"
        aria-label="Educational Advertisement Banner"
      >
        <div
          className={`pointer-events-auto w-full max-w-2xl relative rounded-2xl overflow-hidden border-2 shadow-[0_-8px_30px_rgba(0,0,0,0.18)] transition-all ${
            darkMode
              ? 'bg-slate-900/95 border-amber-600/40 text-slate-100 backdrop-blur-md shadow-black/70'
              : 'bg-white/95 border-amber-400 text-gray-900 backdrop-blur-md shadow-orange-950/15'
          }`}
        >
          {/* Subtle Top Glowing Gamer Strip */}
          <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 animate-pulse"></div>

          {/* AdMob Hidden/Passive Tag for real ads loading */}
          <ins
            ref={adRef}
            className="adsbygoogle hidden"
            style={{ display: 'none' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />

          {/* Gaming-Style Bottom Banner Content Bar */}
          <div
            onClick={() => setShowDetailModal(true)}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between gap-2 sm:gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors select-none"
          >
            {/* Left: Gaming Icon Box with Glow */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr ${currentCampaign.gradient} text-white flex items-center justify-center text-xl shadow-md border-2 border-white/20`}
              >
                <span>{currentCampaign.icon}</span>
              </div>
              <span className="absolute -bottom-1 -right-1 text-[8px] font-black uppercase px-1 py-0.2 rounded bg-black/80 text-amber-300 border border-amber-400/40 leading-tight">
                PRO
              </span>
            </div>

            {/* Center: Educational Copy & Ad Tag */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[8px] font-black tracking-wider uppercase bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  Ad • विज्ञापन
                </span>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight text-orange-600 dark:text-orange-400 truncate">
                  {currentCampaign.tag}
                </span>
                <span className="hidden md:inline-block text-[8px] opacity-50 font-mono">
                  • {currentCampaign.badge}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-black truncate leading-tight tracking-tight">
                {currentCampaign.title}
              </h4>
              <p className="text-[10px] sm:text-xs opacity-70 truncate leading-tight hidden sm:block">
                {currentCampaign.subtitle}
              </p>
            </div>

            {/* Right: Gaming CTA Button & Close Button */}
            <div className="shrink-0 flex items-center">
              <button
                onClick={handleCtaClick}
                className="relative group overflow-hidden px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-black text-[11px] sm:text-xs uppercase text-white shadow-md transition-all active:scale-95 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 border border-amber-300/40"
              >
                <span className="relative z-10 flex items-center gap-1">
                  <span>{currentCampaign.ctaText}</span>
                  <span className="text-[10px] sm:text-xs">➔</span>
                </span>
                {/* Shiny reflex gaming animation */}
                <span className="absolute top-0 -left-full w-full h-full bg-white/20 skew-x-12 group-hover:left-full transition-all duration-700"></span>
              </button>
            </div>
          </div>

          {/* Dots Indicator for 4 Rotating Educational Campaigns */}
          <div className="flex justify-center items-center gap-1.5 pb-1">
            {EDUCATIONAL_CAMPAIGNS.map((c, idx) => (
              <button
                key={c.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCampaignIdx(idx);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeCampaignIdx === idx
                    ? 'w-5 bg-orange-600 dark:bg-amber-400'
                    : 'w-1.5 bg-gray-300 dark:bg-slate-700 hover:bg-gray-400'
                }`}
                title={c.tag}
                aria-label={`Campaign ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerAd;
