import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Building2, 
  Layers, 
  Zap, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Sparkles, 
  Database, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Copy, 
  Check, 
  Play, 
  Server, 
  Activity, 
  Award,
  ChevronRight,
  RefreshCw,
  Home
} from 'lucide-react';
import { 
  NEXUS_CORE_METRICS, 
  NEXUS_3_LAYER_STACK, 
  NEXUS_8_APPS, 
  NEXUS_API_FLOWS, 
  NEXUS_ROADMAP 
} from '../data/nexusData';
import { GTBankLogo, StandardCharteredLogo, InstitutionalBankersCard } from '../components/BankerLogos';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface NexusCloudPageProps {
  onNavigateHome: () => void;
  onOpenVerification: () => void;
  onInitiateInquiry: (serviceTitle: string) => void;
}

export const NexusCloudPage: React.FC<NexusCloudPageProps> = ({
  onNavigateHome,
  onOpenVerification,
  onInitiateInquiry
}) => {
  const [activeApiStep, setActiveApiStep] = useState<number>(0);
  const [copiedEndpoint, setCopiedEndpoint] = useState<boolean>(false);
  const [simulatedExecution, setSimulatedExecution] = useState<boolean>(false);
  const [calcCitiesCount, setCalcCitiesCount] = useState<number>(193);

  const currentEndpoint = NEXUS_API_FLOWS[activeApiStep];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  const handleRunSimulatedApi = () => {
    setSimulatedExecution(true);
    setTimeout(() => {
      setSimulatedExecution(false);
    }, 1200);
  };

  // Math metrics for comparison
  const calculatedPortfolioBillions = calcCitiesCount * 10;
  const calculatedFeeOver2YearsBillions = (calculatedPortfolioBillions * 0.20);
  const calculatedAvgDailyMovement = (calculatedPortfolioBillions / (2 * 365)).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Breadcrumb & Executive Identity Bar */}
      <div className="bg-indigo-950/90 border-b border-indigo-800/60 sticky top-0 z-30 backdrop-blur-md px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-indigo-700/60 text-xs font-bold text-slate-200 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span>Back to Home</span>
            </button>

            <span className="text-slate-500 text-xs hidden sm:inline">/</span>
            
            <span className="text-amber-300 text-xs font-mono font-bold uppercase tracking-wider hidden sm:inline">
              NEXUS CLOUD MASTER BASE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Core Rails: Online</span>
            </div>

            <button
              onClick={() => onInitiateInquiry('NEXUS CLOUD Platform Integration')}
              className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-amber-400/20"
            >
              Schedule Institutional Integration
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-8 border-b border-indigo-900/60 overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950/40 to-slate-950">
        
        {/* Glow Spheres */}
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          
          {/* Top Capacity Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30 shadow-xl">
              <Cpu className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Capacity: $1T+/day movement | $1.93T under management</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Insured Settlement</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 text-xs font-mono font-bold border border-sky-500/30">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>5,000+ Global Banks</span>
            </div>
          </div>

          {/* Hero Headlines */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              NEXUS CLOUD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Master Base for All Future Finance
              </span>
            </h1>

            <p className="text-slate-200 text-lg sm:text-xl leading-relaxed font-sans font-medium">
              Not a project. The platform that builds projects. Built on 15+ global banking rails with 100% insured settlement.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Oskayi Consult's proprietary master base provides the intelligence layer that syndicates multi-billion dollar municipal and sovereign facilities, wraps them in zero-risk institutional reinsurance, and releases tranches via cryptographic milestone verification.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-900/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Capacity</span>
              <div className="font-sans font-extrabold text-lg text-amber-300">{NEXUS_CORE_METRICS.capacity}</div>
              <span className="text-[10px] text-slate-500 block">Movement Engine</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-900/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Pipeline</span>
              <div className="font-sans font-extrabold text-lg text-white">{NEXUS_CORE_METRICS.underManagement}</div>
              <span className="text-[10px] text-slate-500 block">193 Smart Cities</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-900/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Interconnected</span>
              <div className="font-sans font-extrabold text-lg text-sky-300">{NEXUS_CORE_METRICS.connectedBanks}</div>
              <span className="text-[10px] text-slate-500 block">Global Banks</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-900/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Risk Wrap</span>
              <div className="font-sans font-extrabold text-lg text-emerald-400">0% Bank Risk</div>
              <span className="text-[10px] text-slate-500 block">100% Reinsured</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-900/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Coverage</span>
              <div className="font-sans font-extrabold text-lg text-purple-300">{NEXUS_CORE_METRICS.countriesServed}</div>
              <span className="text-[10px] text-slate-500 block">35+ African Mkts</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-900/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Redundancy</span>
              <div className="font-sans font-extrabold text-lg text-amber-400">15 Rails</div>
              <span className="text-[10px] text-slate-500 block">Auto Failover</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#architecture-stack"
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-400/20 flex items-center gap-2"
            >
              <span>Explore 3-Layer Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#api-flow"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Inspect 4 API Flow</span>
            </a>

            <button
              onClick={() => onInitiateInquiry('NEXUS CLOUD Master Base')}
              className="px-6 py-3.5 rounded-xl bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-600 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Request Institutional Onboarding
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 1: 3-LAYER STACK INFOGRAPHIC DIAGRAM */}
      <section id="architecture-stack" className="py-20 px-4 sm:px-8 border-b border-indigo-900/60 bg-slate-950 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Architectural Blueprint</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              The 3-Layer NEXUS Stack
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              How Oskayi Consult bridges global banking rails with zero-risk sovereign project execution.
            </p>
          </div>

          {/* Interactive Stack Diagram (Top-Down Flow) */}
          <div className="space-y-6 max-w-5xl mx-auto">
            
            {NEXUS_3_LAYER_STACK.map((layer, index) => {
              const isBrain = layer.id === "layer-2-nexus-brain";
              const isShield = layer.id === "layer-3-insurance-shield";
              const isRails = layer.id === "layer-1-foundation-rails";

              return (
                <div key={layer.id} className="relative">
                  
                  {/* Visual Connection Link between Layers */}
                  {index > 0 && (
                    <div className="flex justify-center -my-3 relative z-20">
                      <div className="px-4 py-1 rounded-full bg-slate-900 border border-indigo-800 text-[10px] font-mono text-amber-400 flex items-center gap-1.5 shadow-md">
                        <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                        <span>High-Speed Cryptographic Sync & Liquidity Protocol</span>
                      </div>
                    </div>
                  )}

                  <div 
                    className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${layer.bgGradient} border ${layer.borderColor} shadow-2xl transition-all space-y-6 relative overflow-hidden ${
                      isBrain ? 'ring-2 ring-amber-400/40' : ''
                    }`}
                  >
                    {/* Background Accent Highlight */}
                    {isBrain && (
                      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
                    )}

                    {/* Layer Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            isBrain ? 'bg-amber-400 text-indigo-950' : isShield ? 'bg-emerald-400 text-indigo-950' : 'bg-sky-400 text-indigo-950'
                          }`}>
                            {layer.layerNumber}
                          </span>
                          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                            {layer.role}
                          </span>
                        </div>

                        <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">
                          {layer.name}
                        </h3>
                        <p className={`text-xs sm:text-sm font-medium ${layer.accentColor}`}>
                          {layer.tagline}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {isShield && <ShieldCheck className="w-8 h-8 text-emerald-400" />}
                        {isBrain && <Cpu className="w-8 h-8 text-amber-400" />}
                        {isRails && <Database className="w-8 h-8 text-sky-400" />}
                      </div>
                    </div>

                    {/* Layer Features Bullets */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {layer.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isBrain ? 'text-amber-400' : isShield ? 'text-emerald-400' : 'text-sky-400'
                          }`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Architectural Summary Note */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs font-sans text-slate-300 italic flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{layer.summaryNote}</span>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* SECTION 2: WHY BIGGER THAN MONEY MOVERS */}
      <section className="py-20 px-4 sm:px-8 border-b border-indigo-900/60 bg-slate-900 relative">
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Economic Model Superiority</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Why NEXUS Is Bigger Than Money Movers
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Normal platforms MOVE $1T/day. We ORIGINATE + INSURE + MANAGE $1.93T.
            </p>
          </div>

          {/* Comparative Cards Breakdown */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Traditional Money Movers (e.g. Card Networks / Rails) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">Standard Model</span>
                  <span className="px-2.5 py-0.5 rounded bg-slate-900 text-slate-400 text-xs font-mono">
                    Transaction Rails Only
                  </span>
                </div>

                <h3 className="font-sans text-2xl font-extrabold text-slate-300">
                  Pure Money Movers (Card & Settlement Rails)
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Standard settlement rails merely route packets of payment data between existing bank accounts. They take a micro-slice of payment volume without touching project origination, underwriting, or governance.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                    <span className="text-slate-400 block">Daily Transaction Movement</span>
                    <div className="text-lg font-bold text-white">$1 Trillion / Day</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                    <span className="text-slate-400 block">Average Platform Fee</span>
                    <div className="text-lg font-bold text-amber-400">~0.20% Take Rate ($2 Billion)</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                    <span className="text-slate-400 block">Asset Creation & Management</span>
                    <div className="text-lg font-bold text-rose-400">$0 Under Management (Zero Asset Creation)</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 italic">
                Result: High volume, but zero asset ownership, no syndicate governance, and commodity pricing pressure.
              </div>
            </div>

            {/* Right: NEXUS CLOUD Master Base (Originator + Insurer + Manager) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-950 border-2 border-amber-400/80 shadow-2xl shadow-amber-400/10 space-y-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-indigo-800/80 pb-3">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                    Oskayi Consult Master Architecture
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-amber-400 text-indigo-950 text-xs font-mono font-extrabold">
                    NEXUS CLOUD MASTER BASE
                  </span>
                </div>

                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">
                  Originate + Insure + Escrow + Manage ($1.93T)
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  NEXUS does not just move money — it creates and syndicates the entire $10B facility per smart city, wraps it in 100% reinsurance, manages construction escrow release, and monitors governance.
                </p>

                {/* Mathematical Formula Grid */}
                <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-400/40 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">193 Smart Cities</span>
                    <div className="text-xl font-extrabold text-amber-300">$10B / City</div>
                    <span className="text-[10px] text-slate-400">$1.93 Trillion Total</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-400/40 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">NEXUS Fee (2 Years)</span>
                    <div className="text-xl font-extrabold text-emerald-400">20% Value Share</div>
                    <span className="text-[10px] text-slate-400">$2B Fee / City</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-400/40 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Daily Movement</span>
                    <div className="text-xl font-extrabold text-sky-300">~$2.65B / Day</div>
                    <span className="text-[10px] text-slate-400">Active Managed Capital</span>
                  </div>
                </div>

                {/* Interactive Dynamic Portfolio Slider */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-300">Simulate City Pipeline:</span>
                    <span className="font-mono font-bold text-amber-300">{calcCitiesCount} Smart Cities</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="193"
                    value={calcCitiesCount}
                    onChange={(e) => setCalcCitiesCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-indigo-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>1 City ($10B)</span>
                    <span>50 Cities ($500B)</span>
                    <span>193 Cities ($1.93T Full Rollout)</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div>
                      <span className="text-slate-400">Managed Capital: </span>
                      <strong className="text-white">${calculatedPortfolioBillions} Billion USD</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Platform Value Capture: </span>
                      <strong className="text-amber-300">${calculatedFeeOver2YearsBillions} Billion USD</strong>
                    </div>
                  </div>
                </div>

              </div>

              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 font-sans font-semibold">
                NEXUS captures sovereign-level economics because it solves the core credit bottleneck that banks and money movers cannot touch: 0% bank risk via 100% reinsurance shield.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: 8 APPS THAT PLUG INTO MASTER BASE */}
      <section className="py-20 px-4 sm:px-8 border-b border-indigo-900/60 bg-slate-950 relative">
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Unified Ecosystem Architecture</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              8 Apps That Plug Into Master Base
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              All applications inherit the same 5,000+ bank rails, 100% reinsurance wrap, and milestone escrow through a single integration.
            </p>
          </div>

          {/* 8 Apps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEXUS_8_APPS.map((app) => (
              <div
                key={app.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-indigo-800/80 hover:border-amber-400/70 transition-all shadow-xl space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  
                  {/* Top Number & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-black text-amber-400/80 group-hover:text-amber-300 transition-colors">
                      {app.number}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-amber-300 border border-indigo-800">
                      {app.badge}
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-base text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {app.name}
                  </h3>

                  <div className="text-xs font-mono font-semibold text-emerald-400">
                    {app.valuation}
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {app.description}
                  </p>

                  {/* Key Capabilities */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                      Core Protocol Features:
                    </span>
                    {app.capabilities.slice(0, 2).map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom Callout */}
                <div className="pt-3 border-t border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-950 text-[10px] font-mono text-slate-400 truncate border border-slate-800">
                    {app.integrationCall}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS - 4 API FLOW */}
      <section id="api-flow" className="py-20 px-4 sm:px-8 border-b border-indigo-900/60 bg-slate-900 relative">
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Developer & Institutional Interface</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              How It Works: 4 API Flow
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Standardized, institutional endpoints that orchestrate syndication, reinsurance binding, milestone escrow release, and sovereign compliance.
            </p>
          </div>

          {/* Interactive API Terminal & Inspector */}
          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Step Selection Tabs (Left 4-Col) */}
            <div className="lg:col-span-4 space-y-3">
              {NEXUS_API_FLOWS.map((flow, index) => {
                const isActive = activeApiStep === index;
                return (
                  <button
                    key={flow.id}
                    onClick={() => setActiveApiStep(index)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                      isActive 
                        ? 'bg-indigo-950 border-amber-400 shadow-lg shadow-amber-400/10 ring-1 ring-amber-400' 
                        : 'bg-slate-950/80 border-indigo-900/60 hover:border-indigo-700 text-slate-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isActive ? 'bg-amber-400 text-indigo-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {flow.stepNumber}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          flow.method === 'POST' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-sky-500/20 text-sky-300'
                        }`}>
                          {flow.method}
                        </span>
                        <span className="font-mono font-bold text-xs text-white">
                          {flow.action}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-slate-300 leading-snug">
                        {flow.summary}
                      </p>
                    </div>
                  </button>
                );
              })}

              <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-900/60 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Integration Standard:
                </span>
                <p className="text-xs text-slate-300 font-sans">
                  All requests authenticated via mutual TLS (mTLS), ISO 20022 schema validation, and multi-signature sovereign keypairs.
                </p>
              </div>
            </div>

            {/* Live Terminal & Payload Viewer (Right 8-Col) */}
            <div className="lg:col-span-8 rounded-3xl bg-slate-950 border border-indigo-700/80 shadow-2xl overflow-hidden">
              
              {/* Terminal Window Header */}
              <div className="bg-slate-900 px-6 py-4 border-b border-indigo-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    nexus-core-api • {currentEndpoint.action}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(JSON.stringify(currentEndpoint.requestPayload || currentEndpoint.responsePayload, null, 2))}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                  >
                    {copiedEndpoint ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px] font-mono">{copiedEndpoint ? 'Copied' : 'Copy JSON'}</span>
                  </button>

                  <button
                    onClick={handleRunSimulatedApi}
                    disabled={simulatedExecution}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-indigo-950 text-xs font-bold font-mono uppercase flex items-center gap-1.5 transition-all shadow-md"
                  >
                    {simulatedExecution ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{simulatedExecution ? 'Executing...' : 'Run Simulation'}</span>
                  </button>
                </div>
              </div>

              {/* Endpoint Path Line */}
              <div className="px-6 py-3 bg-indigo-950/60 border-b border-indigo-900/60 flex items-center gap-2 font-mono text-xs text-slate-200">
                <span className={`px-2 py-0.5 rounded font-bold ${
                  currentEndpoint.method === 'POST' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-sky-500/20 text-sky-300'
                }`}>
                  {currentEndpoint.method}
                </span>
                <span className="text-amber-300 font-bold">{currentEndpoint.path}</span>
              </div>

              {/* Terminal Content Body */}
              <div className="p-6 space-y-5 font-mono text-xs">
                
                <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                  {currentEndpoint.description}
                </p>

                {currentEndpoint.requestPayload && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-amber-400 font-bold block uppercase tracking-wider">
                      Request Payload (JSON):
                    </span>
                    <pre className="p-4 rounded-xl bg-slate-900 border border-indigo-900/80 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed">
                      {JSON.stringify(currentEndpoint.requestPayload, null, 2)}
                    </pre>
                  </div>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-sky-400 font-bold block uppercase tracking-wider">
                      Live Response Schema (HTTP 200 OK):
                    </span>
                    <span className="text-[10px] text-slate-400">Latency: 12ms • ISO 20022</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-indigo-900/80 text-amber-200 overflow-x-auto text-[11px] leading-relaxed">
                    {JSON.stringify(currentEndpoint.responsePayload, null, 2)}
                  </pre>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: TIMELINE & ROLLOUT ROADMAP */}
      <section className="py-20 px-4 sm:px-8 border-b border-indigo-900/60 bg-slate-950 relative">
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Strategic Implementation</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              NEXUS Execution Roadmap
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              From the Ghana Sovereign Pilot to a $500B multi-continental master base portfolio.
            </p>
          </div>

          {/* 3-Stage Timeline Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {NEXUS_ROADMAP.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/90 border border-indigo-800/80 hover:border-amber-400/60 transition-all shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {item.period}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-sans font-extrabold text-xl text-white">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono font-semibold text-emerald-400">
                      Target Scale: {item.targetScale}
                    </div>
                    <div className="text-xs font-mono font-semibold text-amber-300">
                      Economics: {item.revenueOrFee}
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    {item.milestones.map((m, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: OUR INSTITUTIONAL BANKERS */}
      <section className="py-20 px-4 sm:px-8 border-b border-indigo-900/60 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto space-y-10">
          <InstitutionalBankersCard />
        </div>
      </section>

      {/* SECTION 7: BOTTOM CTA FOR INSTITUTIONS */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-t from-slate-950 via-indigo-950/60 to-slate-950 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/40">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Empower Your Sovereign or Corporate Mandate</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Connect Your Mandate to NEXUS CLOUD?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            Engage our executive leadership to structure syndicated debt, attach zero-risk reinsurance shields, or deploy customized fintech applications on the master base.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onInitiateInquiry('NEXUS CLOUD Sovereign & Enterprise Onboarding')}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-2xl shadow-amber-400/30 transition-all flex items-center gap-2"
            >
              <span>Schedule Executive Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateHome}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              <span>Return to OSKAYI Home</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
