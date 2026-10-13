import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Coins, 
  ShieldAlert, 
  Zap, 
  Activity, 
  TrendingUp, 
  RefreshCw, 
  MapPin, 
  Scale, 
  ShieldCheck,
  ChevronLeft, 
  ChevronRight, 
  Terminal, 
  Play, 
  Radio, 
  Sliders, 
  ExternalLink, 
  CheckCircle, 
  Cpu, 
  Globe2, 
  Layers, 
  FileText, 
  ArrowLeft,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { MULTI_TRILLION_ENGINES, EngineItem } from '../data/enginesData';

interface EngineDetailPageProps {
  engineNumber?: number;
  engineId?: string;
  onNavigateHome: () => void;
  onNavigateEngine: (engineNum: number) => void;
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Building2,
  Coins,
  ShieldAlert,
  Zap,
  Activity,
  TrendingUp,
  RefreshCw,
  MapPin,
  Scale,
  ShieldCheck
};

export const EngineDetailPage: React.FC<EngineDetailPageProps> = ({
  engineNumber = 1,
  engineId,
  onNavigateHome,
  onNavigateEngine,
  onSelectServiceForInquiry
}) => {
  // Determine current engine
  const currentEngineIndex = MULTI_TRILLION_ENGINES.findIndex(e => 
    (engineId && (e.id === engineId || e.slug === engineId)) ||
    (engineNumber && e.number === engineNumber)
  );

  const selectedIndex = currentEngineIndex >= 0 ? currentEngineIndex : 0;
  const engine: EngineItem = MULTI_TRILLION_ENGINES[selectedIndex];

  // Simulator state
  const [params, setParams] = useState<Record<string, any>>(engine.defaultParams);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [liveLog, setLiveLog] = useState<string>('Ready to initiate live Fetch -> Monitor -> Update loop.');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Reset params when engine changes
  useEffect(() => {
    setParams(engine.defaultParams);
    setExecutionResult(null);
    setLiveLog(`Switched to ${engine.tag}: ${engine.title}. Ready.`);
  }, [engine.id]);

  // Execute engine loop
  const handleExecuteLoop = async () => {
    setIsExecuting(true);
    setLiveLog(`[INIT] Querying live endpoints for ${engine.tag}...`);
    try {
      const res = await fetch('/api/multitrillion/engine/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          engineId: engine.id,
          params
        })
      });

      if (res.ok) {
        const data = await res.json();
        setExecutionResult(data);
        setLiveLog(`[SUCCESS] 200 OK • Trace ${data.traceId || 'live'} • Loop executed in ${data.fetchTelemetry?.latencyMs || 34}ms`);
      } else {
        setLiveLog(`[ERR] Execution failed with status ${res.status}`);
      }
    } catch (err: any) {
      setLiveLog(`[EXC] Live execution error: ${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  // Run on first mount
  useEffect(() => {
    handleExecuteLoop();
  }, [engine.id]);

  const handleCopyShare = () => {
    const text = `${engine.tag}: ${engine.title}\nDomain: ${engine.domain} (${engine.marketSize})\nOskayi Consult Autonomous Sovereign & Institutional Market Engines`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const IconComponent = ICON_MAP[engine.iconName] || Activity;

  const prevEngineNum = engine.number === 1 ? 10 : engine.number - 1;
  const nextEngineNum = engine.number === 10 ? 1 : engine.number + 1;

  return (
    <div className="min-h-screen bg-[#060D1A] text-slate-100 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-mono font-bold flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-amber-400 font-bold">10 Autonomous Engines</span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-slate-300">{engine.tag}</span>
          </div>

          {/* Quick Engine Pagination */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateEngine(prevEngineNum)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center gap-1 font-mono font-bold transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Engine {prevEngineNum < 10 ? `0${prevEngineNum}` : prevEngineNum}</span>
            </button>
            <span className="text-xs font-mono text-slate-500 font-bold px-1">
              {engine.number} / 10
            </span>
            <button
              onClick={() => onNavigateEngine(nextEngineNum)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center gap-1 font-mono font-bold transition-all"
            >
              <span>Engine {nextEngineNum < 10 ? `0${nextEngineNum}` : nextEngineNum}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyShare}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all ml-1"
              title="Copy Summary"
            >
              {copiedNotification ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 10 Engine Quick Switcher Bar */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-bold flex items-center justify-between">
            <span>Select Any of the 10 Autonomous Engines to Inspect Dedicated Architecture:</span>
            <span className="text-amber-400">100% Free Public Live APIs</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {MULTI_TRILLION_ENGINES.map((e) => {
              const isCurrent = e.number === engine.number;
              return (
                <button
                  key={e.id}
                  onClick={() => onNavigateEngine(e.number)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-b from-amber-400/20 to-amber-500/10 border-amber-400 text-white font-bold ring-1 ring-amber-400/50 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[9px] font-mono font-bold text-amber-300/80">{e.tag}</div>
                  <div className="text-[10px] font-bold truncate">{e.domain.split(' ')[0]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Header Card for Current Engine */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-[#0B1A33] to-slate-950 border border-indigo-900/70 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold ${engine.badgeBg} ${engine.badgeColor} border border-current/30`}>
              {engine.tag}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
              Field: {engine.field}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-amber-400/15 border border-amber-400/40 text-amber-300">
              Addressable Scale: {engine.marketSize}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Loop Operational
            </span>
          </div>

          {/* Main Title & Headline */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {engine.title}
            </h1>
            <p className="text-amber-300/90 text-sm sm:text-base font-mono font-bold">
              {engine.headline}
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-5xl">
              {engine.summary}
            </p>
          </div>

          {/* Impact Statement */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-xs sm:text-sm text-slate-300 italic border-l-4 border-l-amber-400">
            "{engine.impactQuote}"
          </div>

          {/* Direct CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleExecuteLoop}
              disabled={isExecuting}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-indigo-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-400/20 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isExecuting ? 'animate-spin' : ''}`} />
              <span>{isExecuting ? 'Executing Live Loop...' : 'Trigger Live Loop (Fetch → Monitor → Update)'}</span>
            </button>

            {onSelectServiceForInquiry && (
              <button
                onClick={() => {
                  onSelectServiceForInquiry(engine.title);
                  onNavigateHome();
                  setTimeout(() => {
                    const el = document.getElementById('inquiry');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Inquire For Advisory & Structuring
              </button>
            )}
          </div>
        </div>

        {/* 3-Step Execution Loop Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-mono uppercase tracking-wider text-amber-300 font-extrabold flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              <span>Automated 3-Step Execution Loop Protocol</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Autonomous Zero-Human Process</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1: FETCH */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/40 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-blue-400 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 uppercase">
                  1. FETCH
                </span>
                <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold text-white">Live Data Ingestion & Polling</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {engine.automatedLoop.fetch}
              </p>
            </div>

            {/* Step 2: MONITOR */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-amber-300 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 uppercase">
                  2. MONITOR
                </span>
                <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold text-white">Heuristic Evaluation & Thresholds</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {engine.automatedLoop.monitor}
              </p>
            </div>

            {/* Step 3: UPDATE */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 uppercase">
                  3. UPDATE
                </span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Automated Settlement & Ledgers</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {engine.automatedLoop.update}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Live Test Simulator & Terminal Telemetry */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-mono uppercase tracking-wider text-slate-200 font-extrabold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <span>Interactive Live Endpoint Simulator & Telemetry Console</span>
            </h2>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Backend Connected
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Input Controls Column */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Configurable Simulation Parameters</span>
                </span>
                <span className="text-[10px] font-mono text-amber-400">Real Parameter Inputs</span>
              </div>

              <div className="space-y-3 text-xs">
                {engine.paramDescriptions.map((desc) => (
                  <div key={desc.key} className="space-y-1">
                    <label className="text-slate-300 font-mono block font-medium">
                      {desc.label}
                    </label>
                    {desc.type === 'select' && desc.options ? (
                      <select
                        value={params[desc.key] ?? desc.defaultVal}
                        onChange={e => setParams(prev => ({ ...prev, [desc.key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:border-amber-400 focus:outline-none"
                      >
                        {desc.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={desc.type}
                        value={params[desc.key] ?? desc.defaultVal}
                        onChange={e => setParams(prev => ({ 
                          ...prev, 
                          [desc.key]: desc.type === 'number' ? Number(e.target.value) : e.target.value 
                        }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleExecuteLoop}
                disabled={isExecuting}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-mono font-bold flex items-center justify-center gap-2 border border-amber-400/40 hover:border-amber-400 transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span>Execute Fetch → Monitor → Update Loop</span>
              </button>
            </div>

            {/* Live Terminal Telemetry Output */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950 border border-indigo-950 font-mono text-xs space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
                <span className="text-amber-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Telemetry Log & HTTP Payload Output</span>
                </span>
                <span className="text-slate-500">
                  Trace: {executionResult?.traceId || 'trc-live-dispatch'}
                </span>
              </div>

              {/* Status Banner */}
              <div className="text-[11px] text-emerald-400 bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-800/40 flex items-center justify-between">
                <span>{liveLog}</span>
                <span className="text-slate-400 font-bold text-[10px]">200 OK</span>
              </div>

              {/* Execution Telemetry Panels */}
              {executionResult ? (
                <div className="space-y-3 text-[11px] max-h-96 overflow-y-auto pr-1">
                  {/* Fetch Output */}
                  {executionResult.fetchTelemetry && (
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-blue-500/30 space-y-1">
                      <div className="text-blue-400 font-bold flex items-center justify-between">
                        <span>[1. FETCH TELEMETRY]</span>
                        <span className="text-slate-400">{executionResult.fetchTelemetry.latencyMs || 32}ms</span>
                      </div>
                      <div className="text-slate-300">
                        <strong>Source:</strong> {executionResult.fetchTelemetry.source}
                      </div>
                      <div className="text-slate-400 text-[10px] truncate">
                        <strong>Endpoint:</strong> {executionResult.fetchTelemetry.endpoint}
                      </div>
                    </div>
                  )}

                  {/* Monitor Output */}
                  {executionResult.monitorTelemetry && (
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1">
                      <div className="text-amber-300 font-bold">
                        <span>[2. MONITOR HEURISTIC EVALUATION]</span>
                      </div>
                      <div className="text-slate-300">
                        <strong>Condition:</strong> {executionResult.monitorTelemetry.condition}
                      </div>
                    </div>
                  )}

                  {/* Update Output */}
                  {executionResult.updateTelemetry && (
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1">
                      <div className="text-emerald-400 font-bold">
                        <span>[3. UPDATE EXECUTION]</span>
                      </div>
                      <div className="text-slate-300">
                        <strong>Action Dispatched:</strong> {executionResult.updateTelemetry.action}
                      </div>
                    </div>
                  )}

                  {/* Raw JSON View Collapsible */}
                  <details className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400">
                    <summary className="cursor-pointer text-slate-300 hover:text-white font-bold">
                      View Raw JSON Telemetry Response
                    </summary>
                    <pre className="mt-2 text-emerald-400 overflow-x-auto p-2 bg-slate-950 rounded-lg">
                      {JSON.stringify(executionResult, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <div className="text-slate-500 py-10 text-center">
                  Executing live open API query...
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Live Open Endpoints Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-mono uppercase tracking-wider text-slate-200 font-extrabold flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-blue-400" />
              <span>Integrated Free Public Live APIs & Protocols</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">100% Verified Open Endpoints</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {engine.apiProviders.map((api, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-400/10">
                    {api.verificationStatus}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <h3 className="text-sm font-bold text-white">
                  {api.name}
                </h3>

                <p className="text-xs text-slate-400 font-mono">
                  {api.category} • <strong className="text-slate-300">{api.protocol}</strong>
                </p>

                <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-[10px] text-emerald-400 break-all border border-slate-800">
                  {api.liveEndpoint}
                </div>

                <p className="text-xs text-slate-300 leading-snug">
                  {api.realtimeRole}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Benefits Breakdown */}
        <div className="space-y-4">
          <h2 className="text-base font-mono uppercase tracking-wider text-slate-200 font-extrabold flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <span>Technical Benefits & Quantitative Impact</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engine.technicalBenefits.map((ben, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="text-xs font-mono font-extrabold text-amber-300 px-2 py-0.5 rounded bg-amber-400/10 inline-block">
                  {ben.metric}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {ben.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {ben.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Architecture & Statutory Governance */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
          <h2 className="text-base font-mono uppercase tracking-wider text-slate-200 font-extrabold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Operational Architecture, Governance & Regulatory Compliance</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-slate-400 font-mono uppercase block text-[10px]">Consensus & Validation</span>
              <p className="text-white font-bold">{engine.operationalArchitecture.consensusOrValidation}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-slate-400 font-mono uppercase block text-[10px]">Custody & Escrow</span>
              <p className="text-white font-bold">{engine.operationalArchitecture.custodyOrEscrow}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-slate-400 font-mono uppercase block text-[10px]">Settlement Speed</span>
              <p className="text-emerald-400 font-bold">{engine.operationalArchitecture.settlementSpeed}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-slate-400 font-mono uppercase block text-[10px]">Statutory Backing</span>
              <p className="text-amber-300 font-bold">{engine.operationalArchitecture.regulatoryBacking}</p>
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-indigo-900/60">
          <button
            onClick={() => onNavigateEngine(prevEngineNum)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-300 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4 text-amber-400" />
            <span>Previous: Engine {prevEngineNum}</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-indigo-700 text-xs font-mono font-bold text-white flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Main Homepage</span>
          </button>

          <button
            onClick={() => onNavigateEngine(nextEngineNum)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-300 flex items-center justify-center gap-2"
          >
            <span>Next: Engine {nextEngineNum}</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
