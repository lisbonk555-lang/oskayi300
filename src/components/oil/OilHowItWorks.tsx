import React from 'react';
import { ArrowRight, Smartphone, Cpu, CreditCard, Send } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from './OilData';

export function OilHowItWorks() {
  const icons = [Smartphone, Cpu, CreditCard, Send];

  return (
    <div className="w-full mb-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
          Underwriting Architecture
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mt-1">
          How It Works: 4 Transparent Steps
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-mono">
          Compressing 9 days of legacy bank paperwork into a 14-minute algorithmic flow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HOW_IT_WORKS_STEPS.map((step, idx) => {
          const Icon = icons[idx];
          return (
            <div
              key={step.step}
              className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-amber-400 font-mono font-black text-sm flex items-center justify-center shadow-md">
                    {step.step}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {step.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                  <h3 className="text-sm font-bold text-neutral-900">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 text-[10px] font-mono text-neutral-400">
                Phase {idx + 1} of 4 Automated
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
