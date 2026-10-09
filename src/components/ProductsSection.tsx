import React, { useState } from 'react';
import { 
  Cpu, 
  Terminal, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Anchor, 
  ArrowRight, 
  ExternalLink, 
  X, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Activity,
  CheckCircle2,
  Server,
  Lock,
  Globe2
} from 'lucide-react';

interface ProductsSectionProps {
  onNavigateSection?: (sectionId: string) => void;
  onNavigateNexusCloud?: () => void;
  onNavigateCreditCheckout?: () => void;
  onNavigateFleet?: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onNavigateSection,
  onNavigateNexusCloud,
  onNavigateCreditCheckout,
  onNavigateFleet
}) => {
  const [terminalModalOpen, setTerminalModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Bot target URL kept hidden from user interface labels
  const AFRI_TREASURY_BOT_TARGET = 'https://afritreasury-os-africa-capital-markets-treasury-b.ai.studio/';

  const handleLaunchAfriTreasury = () => {
    // Open in-app terminal modal (hides the raw URL completely from view)
    setTerminalModalOpen(true);
  };

  const handleDirectSessionLaunch = () => {
    // Discreet launch without showing raw link on screen
    window.open(AFRI_TREASURY_BOT_TARGET, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="products" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Institutional Software & Autonomous Capital Systems</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Institutional Products & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500">
              Autonomous Intelligence BOTs
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Proprietary capital markets engines, automated legal treasury intelligence, and multi-rail financial operating systems engineered for African and global institutional scale.
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
                    <span className="text-[11px] text-slate-400">Captures 20%+ T-Bill yield spreads across Ghana, Nigeria, Kenya & SA</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">EIP-4337 Smart Treasury</span>
                    <span className="text-[11px] text-slate-400">Gas-abstracted smart vault custody with multi-sig security</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <Anchor className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">Port & Cargo Risk Monitoring</span>
                    <span className="text-[11px] text-slate-400">Real-time dwell times and logistics telemetry for Tema, Lekki & Durban</span>
                  </div>
                </div>
              </div>

              {/* Launch Trigger */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleLaunchAfriTreasury}
                  className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-xl shadow-amber-400/25 transition-all flex items-center gap-2.5 text-xs uppercase tracking-wider group/btn"
                >
                  <Bot className="w-4 h-4" />
                  <span>Launch AfriTreasury OS Terminal</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleDirectSessionLaunch}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-2 text-xs"
                >
                  <span>Open Dedicated Workspace</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>

            </div>

            {/* Right Telemetry Mock Terminal (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-950/95 border border-slate-800 p-5 font-mono text-xs shadow-2xl space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-bold text-slate-300">AFRITREASURY-KERNEL-V1</span>
                  </div>
                  <span className="text-emerald-400 font-bold">ONLINE</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="text-slate-400 flex justify-between">
                    <span>STATUS:</span>
                    <span className="text-white">AUTONOMOUS_OPERATING</span>
                  </div>
                  <div className="text-slate-400 flex justify-between">
                    <span>SOVEREIGN ARBITRAGE:</span>
                    <span className="text-amber-300">GHS 91-DAY @ 25.8% | NGN @ 19.4%</span>
                  </div>
                  <div className="text-slate-400 flex justify-between">
                    <span>FX SPOT FEED:</span>
                    <span className="text-white">USD/GHS 15.65 | USD/NGN 1,600</span>
                  </div>
                  <div className="text-slate-400 flex justify-between">
                    <span>EIP-4337 PAYMASTER:</span>
                    <span className="text-emerald-400">ACTIVE (0 GAS COST TO USER)</span>
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
                  <span className="text-amber-400 font-bold">Click to Launch</span>
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
