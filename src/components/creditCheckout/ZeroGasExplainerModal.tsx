import React from 'react';
import { Zap, ShieldCheck, Landmark, CheckCircle2, HelpCircle, X, ArrowRight } from 'lucide-react';

interface ZeroGasExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZeroGasExplainerModal: React.FC<ZeroGasExplainerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-indigo-900/80 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/30">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                Zero-Gas &amp; Credit Sponsored Checkout Explained
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                How Oskayi orchestrates purchases with GH₵0 in bank and 0 crypto gas.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              <span>1. Licensed Credit Underwriting</span>
            </h4>
            <p className="text-slate-400 text-[11px]">
              When you apply, Bank of Ghana regulated lenders (such as QuickCredit Tier-2 or Stanbic Bank) evaluate your application in real-time. If approved, the credit provider disburses 100% of the purchase funds directly to the merchant.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>2. Curacel Credit Life Protection</span>
            </h4>
            <p className="text-slate-400 text-[11px]">
              Underwritten by Curacel Grow Consortium, credit life covers the loan if unexpected covered events occur (hospitalization, permanent disability, involuntary job loss).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>3. ERC-4337 Sponsored Blockchain Gas</span>
            </h4>
            <p className="text-slate-400 text-[11px]">
              You don&apos;t need to hold MATIC, ETH, or USDT to transact. Independent Paymasters sponsor the on-chain network transaction fees directly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>4. Oskayi Orchestration Role</span>
            </h4>
            <p className="text-slate-400 text-[11px]">
              Oskayi is an infrastructure provider connecting you, the credit provider, the insurer, the paymaster, and the merchant. Oskayi is not the lender or insurer.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold font-mono text-xs uppercase tracking-wider"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
