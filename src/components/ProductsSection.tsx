import React, { useState } from 'react';
import { 
  Bot, 
  ExternalLink, 
  ShieldCheck, 
  Terminal, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  Cpu, 
  Lock, 
  X, 
  Maximize2, 
  Minimize2,
  TrendingUp,
  Activity,
  Globe,
  Layers,
  ArrowRight,
  Radio,
  Building2,
  Coins,
  ShieldAlert,
  RefreshCw,
  MapPin,
  Scale
} from 'lucide-react';
import { MULTI_TRILLION_ENGINES, EngineItem } from '../data/enginesData';

interface ProductsSectionProps {
  onNavigateSection: (sectionId: string) => void;
  onNavigateNexusCloud?: () => void;
  onNavigateCreditCheckout?: () => void;
  onNavigateFleet?: () => void;
  onNavigateEngine?: (engineNumber: number) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onNavigateSection,
  onNavigateNexusCloud,
  onNavigateCreditCheckout,
  onNavigateFleet,
  onNavigateEngine
}) => {
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Hidden target URL for AfriTreasury OS BOT
  const AFRI_TREASURY_BOT_TARGET = "https://afritreasury-os-africa-capital-markets-treasury-b.ai.studio/";

  const handleLaunchAfriTreasury = () => {
    setTerminalModalOpen(true);
  };

  const handleDirectSessionLaunch = () => {
    window.open(AFRI_TREASURY_BOT_TARGET, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="products" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Featured Products & Autonomous Intelligence Systems</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Featured Products
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Autonomous software engines, legal intelligence bots, and cross-border orchestration systems designed for sovereign institutions, commercial banks, and enterprises.
          </p>
        </div>

        {/* ============================================================== */}
        {/* FLAGSHIP HERO PRODUCT: AFRI-TREASURY OS BOT */}
        {/* ============================================================== */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-950 border border-amber-400/40 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>AUTONOMOUS INTELLIGENCE BOT</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE CAPITAL MARKETS TERMINAL</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                  AfriTreasury OS — Africa Capital Markets & Treasury BOT
                </h3>
                <p className="mt-3 text-base text-slate-200 leading-relaxed font-medium">
                  Autonomous, legal capital markets and treasury intelligence system for Africa. Live public API monitors, FX & sovereign yield arbitrage, EIP-4337 smart treasury, and port risk monitoring.
                </p>
              </div>

              {/* 4 Feature Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <Activity className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">Live Public API Monitors</span>
                    <span className="text-[11px] text-slate-400">Continuous central bank feeds, FX spot rates, and commodity oracles</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">FX & Sovereign Yield Arbitrage</span>
                    <span className="text-[11px] text-slate-400">Algorithmic basis point spread capture across Eurobonds and local debt</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">EIP-4337 Smart Treasury</span>
                    <span className="text-[11px] text-slate-400">Zero-gas account abstraction paymaster and automated liquidity sweeping</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">Port Risk Monitoring</span>
                    <span className="text-[11px] text-slate-400">Satellite AIS vessel positioning, demurrage alerts, and parametric escrows</span>
                  </div>
                </div>
              </div>

              {/* Actions & Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleLaunchAfriTreasury}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-indigo-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
                >
                  <Bot className="w-4 h-4 text-indigo-950" />
                  <span>Launch AfriTreasury OS BOT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDirectSessionLaunch}
                  className="w-full sm:w-auto px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  title="Launch BOT in New Window"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open Dedicated Session</span>
                </button>
              </div>

            </div>

            {/* Right Visual Console Preview (5 Cols) */}
            <div className="lg:col-span-5">
              <div 
                onClick={handleLaunchAfriTreasury}
                className="cursor-pointer rounded-2xl bg-slate-950 border border-indigo-900/80 p-5 space-y-4 shadow-xl hover:border-amber-400/60 transition-all group/card relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-slate-400 ml-2">afritreasury-os.bot</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                    SECURED
                  </span>
                </div>

                {/* Simulated Terminal Readout */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-emerald-400 flex items-center gap-1.5">
                    <span className="text-slate-500">&gt;</span>
                    <span>AFRI_TREASURY_OS.INITIALIZE()</span>
                  </div>
                  <div className="text-slate-300 pl-3">
                    ✔ 54 African Sovereign Yield Curves Synchronized
                  </div>
                  <div className="text-slate-300 pl-3">
                    ✔ Paystack Core African Rails Active (GHS/NGN/KES/ZAR)
                  </div>
                  <div className="text-slate-300 pl-3">
                    ✔ ERC-4337 Sponsored Paymaster Online (Gas = GH₵0)
                  </div>
                  <div className="text-amber-300 pl-3">
                    ⚡ Yield Arbitrage Scan: +385 bps spread captured
                  </div>
                </div>

                {/* Telemetry Bar */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] font-mono space-y-1.5">
                  <div className="text-slate-400 flex justify-between">
                    <span>SOVEREIGN ARBITRAGE:</span>
                    <span className="text-emerald-400">+14.2% NET YIELD</span>
                  </div>
                  <div className="text-slate-400 flex justify-between">
                    <span>MARITIME PORT FEED:</span>
                    <span className="text-sky-300">TEMA BERTH 3 • LEKKI TERMINAL 1</span>
                  </div>
                  <div className="text-slate-400 flex justify-between">
                    <span>LEGAL COMPLIANCE:</span>
                    <span className="text-emerald-400">BANK OF GHANA ACT 612 / SEC REG</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Sub-second API telemetry</span>
                  <span className="text-amber-400 font-bold group-hover/card:translate-x-1 transition-transform flex items-center gap-1">
                    Click to Launch <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* COMPLEMENTARY ENTERPRISE SUITE */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Product 1: Nexus Cloud */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">CORE BANKING OS</span>
              <h4 className="text-base font-bold text-white">Nexus Cloud — The OS of Global Finance</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Integrated with Finastra Fusion core infrastructure. Enterprise-grade open banking, liquidity aggregation, and sovereign-grade security.
              </p>
            </div>
            <button
              onClick={onNavigateNexusCloud}
              className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1.5 pt-3 border-t border-slate-800 transition-colors"
            >
              <span>Explore Nexus Cloud OS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product 2: Global Financial Orchestration Fleet */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">10-ENGINE PLATFORM</span>
              <h4 className="text-base font-bold text-white">Global Financial Orchestration Fleet</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Connects Paystack, Mono, Okra, Stitch, and Shopify into a unified multi-currency ledger with automated FX sweeps and mass payouts.
              </p>
            </div>
            <button
              onClick={onNavigateFleet}
              className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1.5 pt-3 border-t border-slate-800 transition-colors"
            >
              <span>Launch Fleet Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product 3: Credit-Sponsored Checkout */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">EIP-4337 EMBEDDED CHECKOUT</span>
              <h4 className="text-base font-bold text-white">Credit-Sponsored Checkout</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Zero-gas paymaster credit sponsorship embedded with Curacel Grow transit cargo and warranty protection for digital stores.
              </p>
            </div>
            <button
              onClick={onNavigateCreditCheckout}
              className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1.5 pt-3 border-t border-slate-800 transition-colors"
            >
              <span>Open Credit Checkout Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* ============================================================== */}
        {/* ALL 10 AUTONOMOUS SOVEREIGN & INSTITUTIONAL MARKET ENGINES */}
        {/* Each with a direct link to open its dedicated page */}
        {/* ============================================================== */}
        <div className="pt-8 space-y-6 border-t border-slate-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Featured Sovereign Fleet • 10 Dedicated Standalone Engines</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Autonomous Sovereign & Institutional Market Engines
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
                Fully automated institutional architectures powered by free, public, live endpoints. Each engine features its own dedicated interactive page with real-time Fetch → Monitor → Update loops.
              </p>
            </div>

            <button
              onClick={() => {
                if (onNavigateEngine) {
                  onNavigateEngine(1);
                } else {
                  onNavigateSection('multi-trillion-engines');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold flex items-center gap-2 transition-colors shrink-0"
            >
              <span>Explore Engine 01 Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 10 Engines Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {MULTI_TRILLION_ENGINES.map((eng) => (
              <div
                key={eng.id}
                onClick={() => onNavigateEngine ? onNavigateEngine(eng.number) : onNavigateSection('multi-trillion-engines')}
                className="cursor-pointer p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/60 transition-all flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${eng.badgeBg} ${eng.badgeColor}`}>
                      {eng.tag}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {eng.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {eng.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[10px] font-mono text-amber-300/90 font-medium">
                    Scale: {eng.marketSize.split('(')[0].trim()}
                  </div>
                  <div className="text-[11px] font-bold text-amber-400 group-hover:text-white flex items-center justify-between">
                    <span>Open Engine Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* IN-APP EMBEDDED MODAL TERMINAL (URL HIDDEN) */}
      {/* ============================================================== */}
      {terminalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
          <div className={`w-full bg-slate-900 border border-amber-400/50 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all ${
            isFullscreen ? 'h-full max-w-full' : 'max-w-6xl h-[88vh]'
          }`}>
            
            {/* Modal Terminal Header (URL Hidden) */}
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white">AfriTreasury OS Terminal</h3>
                    <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                      AUTONOMOUS SESSION
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Africa Capital Markets & Treasury Intelligence System • EIP-4337 & Sovereign Telemetry
                  </span>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDirectSessionLaunch}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1 transition-colors"
                  title="Open Dedicated Window"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dedicated Window</span>
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title={isFullscreen ? "Restore size" : "Maximize"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setTerminalModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/30 text-slate-300 hover:text-white transition-colors"
                  title="Close Terminal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded Frame Workspace */}
            <div className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
              <iframe
                src={AFRI_TREASURY_BOT_TARGET}
                title="AfriTreasury OS Autonomous Intelligence System"
                className="w-full h-full border-none flex-1"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                loading="lazy"
              />
            </div>

            {/* Terminal Status Footer */}
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Autonomous Sovereign Yield & Port Risk Feeds Online</span>
              </div>
              <span className="text-amber-400">Encrypted Institutional Session</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
