import React from 'react';

export const GTBankLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Iconic GTBank Orange Square with Monogram */}
      <div className="w-9 h-9 rounded-lg bg-[#dd4f05] flex items-center justify-center shadow-md p-1 shrink-0 border border-orange-400/40">
        <div className="w-full h-full border-2 border-white flex items-center justify-center">
          <span className="font-sans font-black text-white text-[13px] tracking-tight leading-none">
            GT
          </span>
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span className="font-sans font-black text-sm tracking-tight text-white leading-tight">
          Guaranty Trust Bank
        </span>
        <span className="text-[10px] font-mono text-orange-400 font-semibold uppercase tracking-wider">
          GTBank Ghana Ltd
        </span>
      </div>
    </div>
  );
};

export const StandardCharteredLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Standard Chartered Emblem Ribbon */}
      <div className="w-9 h-9 rounded-lg bg-slate-900 border border-sky-500/50 flex items-center justify-center shadow-md p-1 shrink-0">
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
          <path
            d="M8 20C8 13.3726 13.3726 8 20 8C22.2091 8 24.2647 8.59784 26.0355 9.64213C24.2647 10.6864 22.2091 11.2843 20 11.2843C15.1866 11.2843 11.2843 15.1866 11.2843 20C11.2843 22.2091 11.8822 24.2647 12.9264 26.0355C10.0298 24.5807 8 22.5029 8 20Z"
            fill="#0099FF"
          />
          <path
            d="M24 12C24 18.6274 18.6274 24 12 24C9.79086 24 7.73527 23.4022 5.96447 22.3579C7.73527 21.3136 9.79086 20.7157 12 20.7157C16.8134 20.7157 20.7157 16.8134 20.7157 12C20.7157 9.79086 20.1178 7.73527 19.0736 5.96447C21.9702 7.41933 24 9.49714 24 12Z"
            fill="#00B140"
          />
        </svg>
      </div>
      <div className="flex flex-col text-left">
        <span className="font-sans font-black text-sm tracking-tight text-white leading-tight">
          Standard Chartered
        </span>
        <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
          Standard Chartered Ghana PLC
        </span>
      </div>
    </div>
  );
};

export const InstitutionalBankersCard: React.FC<{
  className?: string;
  variant?: 'compact' | 'full';
}> = ({ className = "", variant = 'full' }) => {
  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 border border-indigo-700/70 shadow-2xl space-y-6 ${className}`}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30 mb-2">
            <span>Corporate Settlement & Institutional Custody</span>
          </div>
          <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white">
            Our Institutional Bankers
          </h3>
          <p className="text-xs text-slate-300">
            Primary corporate banking and international correspondent clearing partners for Oskayi Consult.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 font-mono text-[10px] font-bold">
            SWIFT / RTGS Verified
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* GTBank Card */}
        <div className="p-5 rounded-2xl bg-slate-950/90 border border-orange-500/30 hover:border-orange-500/60 transition-all space-y-3.5 shadow-lg">
          <div className="flex items-center justify-between">
            <GTBankLogo />
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
              Settlement Bank
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Guaranty Trust Bank (Ghana) Ltd powers Oskayi Consult's corporate liquidity pooling, multi-currency collections, and domestic/regional real-time clearing.
          </p>
          <div className="pt-2 border-t border-slate-900 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">Corporate Accounts</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">Multi-Currency (GHS/USD/EUR/GBP)</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">Instant Clearing</span>
          </div>
        </div>

        {/* Standard Chartered Card */}
        <div className="p-5 rounded-2xl bg-slate-950/90 border border-sky-500/30 hover:border-sky-500/60 transition-all space-y-3.5 shadow-lg">
          <div className="flex items-center justify-between">
            <StandardCharteredLogo />
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
              International Bank
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Standard Chartered Bank (Ghana) PLC supports global institutional custody, cross-border correspondent clearance, and interbank trade financing.
          </p>
          <div className="pt-2 border-t border-slate-900 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">Global Custody</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">Trade Finance</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">Correspondent Clearance</span>
          </div>
        </div>
      </div>

    </div>
  );
};
