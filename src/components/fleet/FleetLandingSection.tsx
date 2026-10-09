import React, { useState } from 'react';
import { 
  Building2, 
  Coins, 
  ShieldAlert, 
  Zap, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Cpu, 
  Lock, 
  Globe2, 
  TrendingUp, 
  Layers, 
  Radio, 
  Terminal, 
  Sparkles,
  ShoppingBag,
  CreditCard,
  LineChart,
  BadgeDollarSign,
  Users,
  Wallet,
  Clock,
  Briefcase,
  FileText,
  Search,
  Check,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Play
} from 'lucide-react';
import { ORCHESTRATION_MODULES, USER_TYPES, FLEET_CONNECTORS_CONFIG, OrchestrationModule } from '../../data/orchestrationModules';

interface FleetLandingSectionProps {
  onStartOnboarding: (selectedModuleIds: string[]) => void;
  onOpenAdminConsole: () => void;
  onOpenUserDashboard: () => void;
}

export const FleetLandingSection: React.FC<FleetLandingSectionProps> = ({
  onStartOnboarding,
  onOpenAdminConsole,
  onOpenUserDashboard
}) => {
  const [selectedModules, setSelectedModules] = useState<string[]>(['sme-treasury', 'marketplace-payouts']);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>('sme-treasury');

  const categories = ['ALL', 'Treasury & Liquidity', 'Marketplaces & Payouts', 'InsurTech & Protection', 'WealthTech & Savings', 'Alternative Lending', 'Clearing & Settlements'];

  const filteredModules = ORCHESTRATION_MODULES.filter(m => {
    const matchesCategory = categoryFilter === 'ALL' || m.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.coreRails.some(rail => rail.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleSelectModule = (id: string) => {
    if (selectedModules.includes(id)) {
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter(m => m !== id));
      }
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const selectAll = () => {
    setSelectedModules(ORCHESTRATION_MODULES.map(m => m.id));
  };

  return (
    <div className="space-y-12">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Global Financial Orchestration Fleet • 10 Core Engines</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            One Unified Architecture. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500">
              10 Financial Orchestration Engines.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Powering cross-border SMEs, digital marketplaces, underwriters, and investment platforms with shared live connectors (Paystack, Mono, Okra, Stitch, Shopify, CoinGecko), a single normalized multi-currency ledger, and enterprise admin governance.
          </p>

          {/* Quick CTA Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onStartOnboarding(selectedModules)}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2.5 text-sm uppercase tracking-wider group"
            >
              <span>Start Guided Onboarding ({selectedModules.length} Selected)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenUserDashboard}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Launch Live Workspace (Demo Tenant)</span>
            </button>

            <button
              onClick={onOpenAdminConsole}
              className="px-4 py-3.5 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-200 font-medium rounded-xl transition-all flex items-center gap-2 text-xs"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Internal Admin Review Console</span>
            </button>
          </div>
        </div>

        {/* Live Connectors Strip */}
        <div className="mt-10 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Shared Enterprise Connectors Ecosystem:
              </span>
              <p className="text-xs text-slate-500">Live API probes running continuously across all 10 orchestration modules</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {FLEET_CONNECTORS_CONFIG.map(conn => (
                <div key={conn.id} className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{conn.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Target User Types Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span>Designed for 6 High-Impact Organization Profiles</span>
            </h2>
            <p className="text-xs text-slate-400">Choose your operational archetype to match optimized module combinations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {USER_TYPES.map(ut => (
            <div 
              key={ut.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block mb-1">
                  {ut.title}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {ut.description}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  {ut.recommendedModules.length} Recommended Modules
                </span>
                <button
                  onClick={() => {
                    setSelectedModules(Array.from(new Set([...selectedModules, ...ut.recommendedModules])));
                  }}
                  className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Select Suite</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10 Modules Explorer with Filter and Multi-Selection */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Explore the 10 Orchestration Modules
            </h2>
            <p className="text-xs text-slate-400">
              Select one or multiple modules to configure during your guided onboarding. Each module operates on shared rails.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={selectAll}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700"
            >
              Select All 10
            </button>
            <div className="text-xs text-amber-400 font-bold bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/30">
              {selectedModules.length} of 10 Selected
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by module name, explanation, or payment rail (e.g., Paystack, Mono, Shopify)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredModules.map((module) => {
            const isSelected = selectedModules.includes(module.id);
            const isExpanded = expandedModuleId === module.id;
            const IconComponent = module.icon;

            return (
              <div
                key={module.id}
                className={`rounded-2xl transition-all border ${
                  isSelected 
                    ? 'bg-slate-900/90 border-amber-400/50 shadow-xl shadow-amber-400/5 ring-1 ring-amber-400/30' 
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                } p-6 flex flex-col justify-between`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${module.accentColor}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-amber-400 font-bold">
                            ENGINE #{module.number}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${module.badgeBg}`}>
                            {module.category}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white mt-0.5">
                          {module.title}
                        </h3>
                      </div>
                    </div>

                    {/* Selection Checkbox */}
                    <button
                      onClick={() => toggleSelectModule(module.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20' 
                          : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-amber-400/50'
                      }`}
                      title={isSelected ? "Selected for onboarding" : "Click to select"}
                    >
                      {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="text-xs">+</span>}
                    </button>
                  </div>

                  {/* Plain Language Summary */}
                  <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                    {module.simpleExplanation}
                  </p>

                  {/* Why it matters */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs">
                    <span className="text-amber-300 font-bold block mb-0.5">Why Orchestration Wins:</span>
                    <span className="text-slate-400">{module.whyItMatters}</span>
                  </div>

                  {/* Core Rails Tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase text-slate-500 mr-1">Core Rails:</span>
                    {module.coreRails.map(rail => (
                      <span key={rail} className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-medium text-slate-300">
                        {rail}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Technical Details & Benefits */}
                  {isExpanded && (
                    <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Core Operational Capabilities:
                        </span>
                        <ul className="space-y-1.5">
                          {module.keyFeatures.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sample Telemetry Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {module.sampleMetrics.map((met, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                            <span className="text-[10px] text-slate-400 block">{met.label}</span>
                            <span className="text-xs font-bold text-white block mt-0.5">{met.value}</span>
                            <span className="text-[9px] font-mono text-emerald-400">{met.change}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}
                    className="text-xs font-medium text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Specs' : 'View Detailed Specs & Telemetry'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  <button
                    onClick={() => {
                      if (!isSelected) toggleSelectModule(module.id);
                      onStartOnboarding([module.id]);
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Deploy This Engine</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-30 p-4 rounded-2xl bg-indigo-950/95 backdrop-blur-xl border border-indigo-700/60 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <span className="text-xs font-bold text-white">
              {selectedModules.length} Modules Selected for Your Organization
            </span>
            <p className="text-[11px] text-indigo-300">
              Shared Paystack core rails, open-banking connectors, and unified ledger configured automatically.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onStartOnboarding(selectedModules)}
            className="w-full sm:w-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-md shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to 6-Step Onboarding</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
