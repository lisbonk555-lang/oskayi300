import React from 'react';
import { Database, ExternalLink, ShieldCheck, CheckCircle2, Lock, Coins } from 'lucide-react';
import { SOURCES_OF_FUNDS_METRICS } from './OilData';

export function OilSourcesOfFunds() {
  return (
    <div className="w-full mb-12">
      
      {/* Section Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono mb-3">
            <Coins className="w-3.5 h-3.5" />
            <span>DISBURSED FROM OPEN LIQUIDITY POOLS · NOT OUR MONEY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sources of Funds: Zero Balance Sheet Lending
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
            OIL acts purely as a <strong>data-blind intelligence conduit and scoring gateway</strong>. 
            We never lend our own capital or take credit risk. Loans are auto-routed and funded directly from 
            licensed, open global pools and third-party institutional protocols.
          </p>
        </div>
      </div>

      {/* Grid of the 6 Open Pools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SOURCES_OF_FUNDS_METRICS.map((pool, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-neutral-200/90 hover:border-amber-400/80 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  {pool.type}
                </span>
                <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                  {pool.tvlBadge}
                </span>
              </div>

              <h3 className="text-base font-bold text-neutral-950 mt-1">
                {pool.name}
              </h3>

              <div className="text-xs font-mono font-bold text-neutral-800 mt-0.5 mb-2">
                {pool.headline}
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {pool.description}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-500">
                Collateral: <strong className="text-neutral-700">{pool.collateralType}</strong>
              </span>
              <a
                href={pool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-bold"
              >
                <span>Verify Pool</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
