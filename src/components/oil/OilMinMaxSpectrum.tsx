import React from 'react';
import { Smartphone, Layers, ShieldAlert, Building2, ArrowRight } from 'lucide-react';

interface OilMinMaxSpectrumProps {
  onSelectTier: (minAmount: number, isCollateral: boolean) => void;
}

export function OilMinMaxSpectrum({ onSelectTier }: OilMinMaxSpectrumProps) {
  const tiers = [
    {
      id: 'zero-dollar',
      badge: 'Uncollateralized Micro-Credit',
      title: 'Zero Dollar Users (MoMo / Bank History)',
      range: '$50 – $15,000 USD',
      source: 'Kiva Field Partner Rail',
      sourceDetail: '$1.6B Open Community Pool · 96.9% Repayment Rate',
      collateral: 'Zero Upfront Collateral Required',
      requirement: 'MoMo transaction history (500 txs/yr or GHS 200/wk) or Bank cash flow.',
      speed: 'Predisbursed TODAY before Kiva public funding campaign closes.',
      isCollateral: false,
      amountTarget: 1500,
      color: 'border-emerald-500/40 bg-emerald-50/20'
    },
    {
      id: 'aave-standard',
      badge: 'DeFi Overcollateralized (80% LTV)',
      title: 'Crypto & Stable Asset Collateral',
      range: '$1,000 – $100,000 USD',
      source: 'Aave v3 Liquidity Pools',
      sourceDetail: '$30.46B Supplied · $12.14B Borrowed · 61.5% Market Share',
      collateral: '$1,000 Deposit → $800 Borrow (80% LTV)',
      requirement: 'Net worth stays $1,000 not $1,980. Debt balance is $800.',
      speed: 'Instant smart contract execution via multi-chain bridges.',
      isCollateral: true,
      amountTarget: 800,
      color: 'border-purple-500/40 bg-purple-50/20'
    },
    {
      id: 'aave-emode',
      badge: 'High LTV E-Mode (93% LTV)',
      title: 'Aave High Efficiency Mode',
      range: 'Up to $21,000,000 USD',
      source: 'Aave Correlated E-Mode Pools',
      sourceDetail: '$32M Supply Cap · $21M Borrow Cap per Specific Pool',
      collateral: '$1,000 Deposit → $930 Borrow (93% LTV)',
      requirement: 'Narrow volatility buffer! 95% liquidation threshold.',
      speed: 'Algorithmic liquidation protected by automated peg monitoring.',
      isCollateral: true,
      amountTarget: 15000,
      color: 'border-amber-500/40 bg-amber-50/20'
    },
    {
      id: 'private-credit',
      badge: 'Institutional & Sovereign Debt',
      title: 'Corporate Balance Sheet & Private Credit',
      range: '$50,000 – $1,000,000,000+',
      source: 'Private Credit $1.8T + LendingClub $100B',
      sourceDetail: 'Apollo ($940B AUM), Morpho Bespoke Vaults & Syndicates',
      collateral: 'Audited Financials, Invoices, Contracts or Bank Auth',
      requirement: 'AI cuts corporate loans from weeks to minutes, multinationals months to weeks.',
      speed: 'Automated syndicated credit agreement & Plaid / Swift wire.',
      isCollateral: true,
      amountTarget: 100000,
      color: 'border-neutral-800 bg-neutral-900 text-white'
    }
  ];

  return (
    <div className="w-full mb-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
          Credit Spectrum Matrix
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mt-1">
          Minimum & Maximum Credit Across All Tiers
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-mono">
          From uncollateralized $50 micro-advances to $1B sovereign credit facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tiers.map((t) => (
          <div
            key={t.id}
            className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${t.color}`}
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider font-bold mb-2">
                {t.badge}
              </div>

              <div className="text-xl font-black font-mono tracking-tight mb-1">
                {t.range}
              </div>

              <h3 className="text-sm font-bold leading-snug mb-3">
                {t.title}
              </h3>

              <div className="space-y-2 text-xs mb-4">
                <div className="p-2.5 rounded-lg bg-white/70 border border-neutral-200/80 text-neutral-800">
                  <div className="text-[10px] font-mono uppercase text-neutral-500">Capital Source</div>
                  <div className="font-semibold">{t.source}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">{t.sourceDetail}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/70 border border-neutral-200/80 text-neutral-800">
                  <div className="text-[10px] font-mono uppercase text-neutral-500">Underwriting Requirement</div>
                  <div className="text-[11px] leading-relaxed">{t.requirement}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-500">
                10% Fee Applied
              </span>
              <button
                onClick={() => onSelectTier(t.amountTarget, t.isCollateral)}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold text-xs font-mono transition-colors flex items-center gap-1"
              >
                <span>Select Tier</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
