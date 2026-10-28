import React from 'react';
import { ShieldCheck, Zap, Globe, ArrowRight, Lock, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface OilHeroProps {
  onScrollToTerminal: () => void;
}

export function OilHero({ onScrollToTerminal }: OilHeroProps) {
  return (
    <div className="w-full text-center relative pt-4 pb-8 sm:pb-12 max-w-4xl mx-auto">
      
      {/* Official Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-300/80 text-neutral-800 text-xs font-mono mb-4 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="font-bold">ONE BANK AUTH · ONE AI SCORE · ONE INSTANT LOAN</span>
      </div>

      {/* Primary Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-neutral-950 tracking-tight leading-[1.1] mb-5">
        Instant Credit Scoring & <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600">
          Global Pool Disbursal
        </span>
      </h1>

      <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
        OIL is a live credit intelligence marketplace, <strong>NOT a lender</strong>. We charge a 10% AI scoring fee. 
        Funds auto-disburse from open global pools (<span className="text-neutral-900 font-semibold">Aave $30B</span>,{' '}
        <span className="text-neutral-900 font-semibold">Kiva $1.6B</span>,{' '}
        <span className="text-neutral-900 font-semibold">Private Credit $1.8T</span>) — not our money. 
        Decisions in <strong>14 minutes</strong> down from 9 days.
      </p>

      {/* Comparison Callout: 9 Days vs 14 Minutes */}
      <div className="max-w-xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white shadow-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-neutral-800">
        <div className="text-left">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
            Speed Compression Benchmark
          </div>
          <div className="text-sm font-semibold text-neutral-200 mt-0.5">
            Legacy Banks: <span className="text-neutral-400 line-through">9 Days</span> → OIL AI:{' '}
            <span className="text-emerald-400 font-bold font-mono">14 Minutes</span>
          </div>
        </div>
        <button
          onClick={onScrollToTerminal}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-400/20 whitespace-nowrap flex items-center gap-1.5"
        >
          <span>Get Scored Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Trust Signals Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-neutral-600 max-w-3xl mx-auto">
        <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>195 Countries</span>
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Data-Blind Conduit</span>
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>12,000 Banks (Plaid)</span>
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span>MoMo & Zero Dollar</span>
        </div>
      </div>

    </div>
  );
}
