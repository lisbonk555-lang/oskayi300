import React from 'react';
import {
  CreditCard,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  FileText,
  Building2,
  Cpu,
  Info,
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { SystemEnvironmentMode } from '../../types/creditCheckout';
import { MANDATORY_LEGAL_DISCLOSURES } from '../../data/creditCheckoutData';

interface CreditCheckoutHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  environmentMode: SystemEnvironmentMode;
  setEnvironmentMode: (mode: SystemEnvironmentMode) => void;
  onOpenExplainer: () => void;
  onBackToMain: () => void;
}

export const CreditCheckoutHeader: React.FC<CreditCheckoutHeaderProps> = ({
  activeTab,
  setActiveTab,
  environmentMode,
  setEnvironmentMode,
  onOpenExplainer,
  onBackToMain
}) => {
  const tabs = [
    { id: 'checkout', label: 'Credit Checkout', icon: CreditCard },
    { id: 'repayments', label: 'My Repayments', icon: FileText },
    { id: 'protection', label: 'My Protection & Claims', icon: ShieldCheck },
    { id: 'merchant', label: 'Merchant Portal', icon: Building2 },
    { id: 'governance', label: 'Provider Governance', icon: Layers },
    { id: 'health', label: 'Integration Health', icon: Activity },
    { id: 'architecture', label: 'Zero-Gas Rails', icon: Cpu }
  ];

  return (
    <div className="bg-slate-950 border-b border-indigo-900/60 sticky top-0 z-40">
      {/* Top Banner: Mandatory Regulatory Disclaimer */}
      <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-amber-300">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold text-amber-200">
              {MANDATORY_LEGAL_DISCLOSURES.orchestrationNotice}
            </span>
          </div>
          <button
            onClick={onOpenExplainer}
            className="text-amber-400 hover:text-amber-300 underline text-[11px] font-mono flex items-center gap-1"
          >
            How Zero-Gas Credit Checkout Works <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToMain}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-600 text-slate-300 hover:text-white transition-all text-xs font-mono"
            title="Return to Oskayi Main"
          >
            ← Main
          </button>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-indigo-900/80 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-700/60 font-mono">
                FLAGSHIP SUITE
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                OSKAYI CREDIT SPONSORED CHECKOUT
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
              Get credit. Get protected. Transact without holding blockchain gas.
            </p>
          </div>
        </div>

        {/* Status Indicators & Mode Toggle */}
        <div className="flex items-center gap-3">
          {/* Live Paymaster Gas Shield */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>Paymaster Active (ERC-4337)</span>
          </div>

          {/* Environment Mode Switcher */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setEnvironmentMode('PRODUCTION')}
              className={`px-3 py-1 text-xs font-bold font-mono rounded-lg transition-all ${
                environmentMode === 'PRODUCTION'
                  ? 'bg-amber-400 text-indigo-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LIVE PRODUCTION
            </button>
            <button
              onClick={() => setEnvironmentMode('SANDBOX')}
              className={`px-3 py-1 text-xs font-bold font-mono rounded-lg transition-all ${
                environmentMode === 'SANDBOX'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SANDBOX
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-slate-900 pt-1 pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 font-mono ${
                isActive
                  ? 'bg-amber-400/10 text-amber-300 border border-amber-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
