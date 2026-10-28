import React from 'react';
import { OilLogo } from './OilLogo';
import { Zap, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

interface OilHeaderProps {
  onScrollToTerminal: () => void;
}

export function OilHeader({ onScrollToTerminal }: OilHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <OilLogo size={42} showText={true} />
        </div>

        {/* Global Indicator Strip */}
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-neutral-600">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>Worldwide 195 Countries</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>14-Min AI Engine</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onScrollToTerminal}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold text-xs font-mono tracking-wide transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Apply / Check Score</span>
          </button>
        </div>

      </div>
    </header>
  );
}
