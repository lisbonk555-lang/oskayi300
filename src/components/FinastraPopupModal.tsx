import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X, Layers, CheckCircle2 } from 'lucide-react';
import { FinastraLogo } from './FinastraLogo';

interface FinastraPopupModalProps {
  onExploreNexusCloud: () => void;
}

const STORAGE_KEY = 'oskayi_finastra_popup_dismissed_until';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const FinastraPopupModal: React.FC<FinastraPopupModalProps> = ({
  onExploreNexusCloud
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => {
    // Check if dismissed within the last 7 days
    try {
      const dismissedUntil = localStorage.getItem(STORAGE_KEY);
      if (dismissedUntil) {
        const timestamp = parseInt(dismissedUntil, 10);
        if (!isNaN(timestamp) && Date.now() < timestamp) {
          return; // Still in 7-day cooldown
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    // Trigger 3 seconds after page loads
    const timer = setTimeout(() => {
      setIsRendered(true);
      // Small tick for CSS animation trigger
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    try {
      const expiry = Date.now() + SEVEN_DAYS_MS;
      localStorage.setItem(STORAGE_KEY, expiry.toString());
    } catch {
      // Ignore
    }
    setTimeout(() => {
      setIsRendered(false);
    }, 400);
  };

  const handleExplore = () => {
    handleClose();
    onExploreNexusCloud();
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-500 ease-out 
        /* Mobile: Bottom Sheet */
        bottom-0 left-0 right-0 p-3 sm:p-0
        /* Desktop: Bottom-Right floating box */
        sm:bottom-6 sm:right-6 sm:left-auto sm:w-[380px]
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 sm:translate-y-8 opacity-0 scale-95 pointer-events-none'}
      `}
      role="dialog"
      aria-label="Finastra x Nexus Cloud Announcement"
    >
      <div 
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/50 shadow-2xl shadow-purple-950/80 text-white font-sans p-4 sm:p-5 flex flex-col justify-between sm:min-h-[220px] backdrop-blur-xl"
        style={{
          boxShadow: '0 20px 40px -15px rgba(124, 58, 237, 0.35), 0 0 0 1px rgba(168, 85, 247, 0.25)'
        }}
      >
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header with Finastra Branding & Close button */}
        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-400/50 flex items-center justify-center shrink-0 shadow-inner">
              <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#7C3AED" />
                <path d="M12 12L28 12L20 28Z" fill="white" />
                <path d="M20 16L28 28L12 28Z" fill="#E9D5FF" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-purple-300">
                  FINASTRA x NEXUS CLOUD
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h4 className="font-sans font-bold text-sm text-white leading-tight">
                The OS of Global Finance is Live
              </h4>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Text */}
        <div className="relative z-10 my-2 space-y-1.5">
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            We are now <span className="text-purple-300 font-bold">100% Finastra-powered</span>. Unifying multi-bank syndication, origination, payments, and compliance into one end-to-end OS.
          </p>

          {/* Small metrics tag */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-900/60 border border-purple-400/30 text-[10px] font-mono text-purple-200">
            <span className="text-amber-400 font-bold">APIs:</span>
            <span>19 → 200+</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-300">Building Blocks Active</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 flex items-center gap-2 pt-1 border-t border-purple-500/20">
          <button
            onClick={handleExplore}
            className="flex-1 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-900/50 transition-all active:scale-95 group"
          >
            <span>Explore Nexus Cloud</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleClose}
            className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 text-slate-300 text-xs font-mono transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
