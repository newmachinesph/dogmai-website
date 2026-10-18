'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'DOGM-video-promo-dismissed';
const VIDEO_URL = 'https://www.facebook.com/share/v/1ANTYBEGcd/';

export default function VideoPromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleWatchVideo = () => {
    window.open(VIDEO_URL, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-in fade-in duration-300">
      <div className="bg-gradient-to-b from-[#0d0906] to-[#060503] border border-[#2e2e2e] rounded-xl sm:rounded-2xl max-w-lg w-full p-5 sm:p-8 relative shadow-2xl shadow-orange-500/10">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-500 hover:text-white transition-colors duration-200 p-1"
          aria-label="Close popup"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Play icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/40 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-orange-500/20">
          <span className="text-orange-400 text-3xl sm:text-4xl">▶</span>
        </div>

        {/* Content */}
        <div className="text-center">
          <span className="inline-block px-2 sm:px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-[10px] sm:text-xs font-mono mb-3 sm:mb-4">
            // INFO SESSION
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 font-sans">
            Everything You Need to Know
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm mb-5 sm:mb-6 leading-relaxed px-1">
            Everyone's using AI to code. But without fundamentals, AI replaces you. Learn how we teach you to build WITH AI, not depend on it.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleWatchVideo}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:from-orange-400 hover:to-orange-500 transition-all duration-300 font-sans text-base sm:text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            Watch Info Session
          </button>

          {/* Secondary action */}
          <button
            onClick={handleClose}
            className="mt-3 sm:mt-4 text-slate-500 hover:text-slate-300 transition-colors duration-200 font-mono text-xs sm:text-sm"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
