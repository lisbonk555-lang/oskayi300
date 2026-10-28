import React from 'react';
import { Smartphone, Zap, Coins, ShieldCheck } from 'lucide-react';

export function OilBenefits() {
  const benefits = [
    {
      icon: Smartphone,
      title: 'Zero Dollar Inclusion',
      subtitle: 'MoMo & Cash Flow Cadence',
      description:
        'No upfront collateral required for qualified zero-dollar applicants. Our AI evaluates regular transaction cadence (500 txs/year or GHS 200/week) to unlock up to $15,000 from Kiva predisbursed partner pools.'
    },
    {
      icon: Zap,
      title: '14-Minute Decisioning',
      subtitle: 'Compressed Down from 9 Days',
      description:
        'Eliminating bureaucratic loan committees and paper statements. Our data-blind algorithms benchmark sovereign risk spreads and cash flow velocities in 14 minutes flat.'
    },
    {
      icon: Coins,
      title: 'Open Global Liquidity',
      subtitle: '$30.46B Aave + $1.6B Kiva + $1.8T Private Debt',
      description:
        'OIL never lends from its own balance sheet. Your approved facility is auto-routed to decentralized protocols and institutional credit syndicates with automated multi-currency disbursal.'
    },
    {
      icon: ShieldCheck,
      title: 'Transparent 10% Model',
      subtitle: 'Licensed Bank of Ghana PSP & Plaid',
      description:
        'We charge a clear 10% evaluation & routing fee via Paystack or Plaid. Zero hidden compounding fees, zero balance sheet exposure, and full escrow protection.'
    }
  ];

  return (
    <div className="w-full mb-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
          Marketplace Advantages
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mt-1">
          Why Borrowers & Enterprises Use OIL
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-amber-400 flex items-center justify-center mb-3 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-950">
                  {b.title}
                </h3>
                <div className="text-xs font-mono text-amber-700 font-semibold mb-2">
                  {b.subtitle}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 text-[10px] font-mono text-neutral-400">
                OIL Guarantee · 195 Countries
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
