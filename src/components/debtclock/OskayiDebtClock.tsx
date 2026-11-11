import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Globe, 
  BarChart3, 
  Copy, 
  Check, 
  Code, 
  ArrowRight, 
  Clock, 
  Scale, 
  Layers, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CountryDebtMetric } from '../../server/oskayiDebtClockService';

export const OskayiDebtClock: React.FC = () => {
  const [globalDebt, setGlobalDebt] = useState<number>(315482910450000);
  const [growthPerSec, setGrowthPerSec] = useState<number>(642850);
  const [countries, setCountries] = useState<CountryDebtMetric[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryDebtMetric | null>(null);
  const [compareA, setCompareA] = useState<string>('USA');
  const [compareB, setCompareB] = useState<string>('CHN');
  const [compareResult, setCompareResult] = useState<any | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showApiModal, setShowApiModal] = useState<boolean>(false);

  // Fetch initial telemetry
  const fetchClockData = async () => {
    try {
      const [liveRes, cRes] = await Promise.all([
        fetch('/api/debtclock/live'),
        fetch('/api/debtclock/countries')
      ]);
      if (liveRes.ok) {
        const data = await liveRes.json();
        setGlobalDebt(data.current_global_debt_usd);
        setGrowthPerSec(data.growth_per_second_usd);
      }
      if (cRes.ok) {
        const cList: CountryDebtMetric[] = await cRes.json();
        setCountries(cList);
        if (!selectedCountry && cList.length > 0) setSelectedCountry(cList[0]);
      }
    } catch (e) {
      console.error('Debt clock error:', e);
    }
  };

  useEffect(() => {
    fetchClockData();
    // Live ticking: update global debt counter every 100ms
    const timer = setInterval(() => {
      setGlobalDebt(prev => prev + Math.round(growthPerSec / 10));
    }, 100);
    return () => clearInterval(timer);
  }, [growthPerSec]);

  const handleRunCompare = async (a: string, b: string) => {
    try {
      const res = await fetch(`/api/debtclock/compare?a=${a}&b=${b}`);
      if (res.ok) {
        setCompareResult(await res.json());
      }
    } catch (e) {
      console.error('Compare error:', e);
    }
  };

  useEffect(() => {
    handleRunCompare(compareA, compareB);
  }, [compareA, compareB]);

  const formatUsd = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col font-sans select-none">
      {/* Top Ticker Ribbon */}
      <div className="bg-[#0C101F] border-b border-red-500/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-900 p-0.5 flex items-center justify-center shadow-lg shadow-red-950">
            <Clock className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-wider">
                OSKAYI DEBT CLOCK GLOBAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40">
                WORLD BANK API + GLOBAL TICKER
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live Macroeconomic Sovereign Debt & Fiscal Deficit Surveillance Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEmbedModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-red-500/60 text-xs font-mono text-slate-300 flex items-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5 text-red-400" />
            <span>Embed Widget</span>
          </button>
          <button
            onClick={() => setShowApiModal(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md font-mono"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Pro API ($99/mo)</span>
          </button>
        </div>
      </div>

      {/* GIANT LIVE GLOBAL DEBT TICKING BANNER */}
      <div className="bg-gradient-to-b from-[#0C101F] via-[#090D1A] to-[#06080F] border-b border-red-900/40 py-8 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold block">
            TOTAL ESTIMATED GLOBAL PUBLIC & PRIVATE DEBT (USD)
          </span>

          {/* ODOMETER / DIGITAL COUNTER */}
          <div className="font-mono font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">
            <span className="text-red-500">$</span>
            {globalDebt.toLocaleString('en-US')}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Growing by ~${growthPerSec.toLocaleString()} / second
            </span>
            <span>•</span>
            <span>Global Debt-to-GDP: <strong className="text-white">~300.4%</strong></span>
            <span>•</span>
            <span>World Population: <strong>8.1 Billion</strong></span>
            <span>•</span>
            <span>Debt Per Human: <strong className="text-amber-400">~$38,940 USD</strong></span>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: Top Sovereign Debtors Table (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0C101F]/90 rounded-2xl border border-red-900/40 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                Sovereigns By Gross Debt ({countries.length})
              </span>
              <span className="text-slate-500">World Bank / IMF</span>
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {countries.map(c => {
                const isSelected = selectedCountry?.code === c.code;
                const isOver100 = c.debt_to_gdp_pct >= 100;

                return (
                  <div
                    key={c.code}
                    onClick={() => setSelectedCountry(c)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-red-950/60 border-red-500 shadow-md shadow-red-950'
                        : 'bg-[#080B17] border-slate-800 hover:border-red-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{c.flag_emoji}</span>
                        <div>
                          <span className="font-bold text-sm text-white block">{c.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Pop: {(c.population / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-white block">
                          ${(c.total_debt_usd / 1000000000000).toFixed(2)}T
                        </span>
                        <span className={`text-[10px] font-mono font-black px-1.5 py-0.2 rounded ${
                          isOver100 ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'text-slate-400'
                        }`}>
                          {c.debt_to_gdp_pct}% GDP
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: Country In-Depth Fiscal Ledger & Maturity Schedule (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedCountry ? (
            <div className="bg-[#0C101F]/90 rounded-2xl border border-red-900/40 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{selectedCountry.flag_emoji}</span>
                  <div>
                    <h2 className="text-lg font-black text-white">{selectedCountry.name}</h2>
                    <span className="text-xs font-mono text-slate-400">Currency: {selectedCountry.currency}</span>
                  </div>
                </div>

                {selectedCountry.debt_to_gdp_pct >= 100 && (
                  <span className="px-2.5 py-1 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-black font-mono flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    &gt;100% GDP WARNING
                  </span>
                )}
              </div>

              {/* 4 Macro Key Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#080B17] border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase">Gross Public Debt</span>
                  <span className="font-bold text-white text-base block font-mono">
                    {formatUsd(selectedCountry.total_debt_usd)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#080B17] border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase">Nominal GDP</span>
                  <span className="font-bold text-white text-base block font-mono">
                    {formatUsd(selectedCountry.gdp_usd)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#080B17] border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase">Debt Per Citizen</span>
                  <span className="font-bold text-amber-400 text-base block font-mono">
                    {formatUsd(selectedCountry.debt_per_citizen_usd)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#080B17] border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block uppercase">Annual Interest Payments</span>
                  <span className="font-bold text-red-400 text-base block font-mono">
                    {formatUsd(selectedCountry.interest_payments_annual_usd)}
                  </span>
                </div>
              </div>

              {/* Debt Maturity Profile */}
              <div className="p-4 rounded-xl bg-[#080B17] border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-300 uppercase">Maturity Schedule Profile:</span>
                  <span className="text-slate-400">Avg Rate: {selectedCountry.average_interest_rate_pct}%</span>
                </div>

                <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden flex">
                  <div style={{ width: `${selectedCountry.maturity_schedule.within_1y_pct}%` }} className="bg-red-500" title="< 1 Year" />
                  <div style={{ width: `${selectedCountry.maturity_schedule.from_1_to_5y_pct}%` }} className="bg-amber-500" title="1-5 Years" />
                  <div style={{ width: `${selectedCountry.maturity_schedule.from_5_to_10y_pct}%` }} className="bg-blue-500" title="5-10 Years" />
                  <div style={{ width: `${selectedCountry.maturity_schedule.over_10y_pct}%` }} className="bg-emerald-500" title="> 10 Years" />
                </div>

                <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-slate-400 text-center">
                  <div><span className="inline-block w-2 h-2 rounded bg-red-500 mr-1" />&lt;1y: {selectedCountry.maturity_schedule.within_1y_pct}%</div>
                  <div><span className="inline-block w-2 h-2 rounded bg-amber-500 mr-1" />1-5y: {selectedCountry.maturity_schedule.from_1_to_5y_pct}%</div>
                  <div><span className="inline-block w-2 h-2 rounded bg-blue-500 mr-1" />5-10y: {selectedCountry.maturity_schedule.from_5_to_10y_pct}%</div>
                  <div><span className="inline-block w-2 h-2 rounded bg-emerald-500 mr-1" />&gt;10y: {selectedCountry.maturity_schedule.over_10y_pct}%</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              Select a sovereign nation from the left directory to inspect its full fiscal debt ledger.
            </div>
          )}

          {/* Side-by-Side Comparison Tool */}
          <div className="bg-[#0C101F]/90 rounded-2xl border border-red-900/40 p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-red-400" />
                Sovereign Comparison Tool
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <select
                value={compareA}
                onChange={(e) => setCompareA(e.target.value)}
                className="bg-[#080B17] border border-slate-800 rounded-xl p-2 text-white"
              >
                {countries.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
              </select>
              <select
                value={compareB}
                onChange={(e) => setCompareB(e.target.value)}
                className="bg-[#080B17] border border-slate-800 rounded-xl p-2 text-white"
              >
                {countries.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
              </select>
            </div>

            {compareResult && (
              <div className="p-3 rounded-xl bg-[#080B17] border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span>Gross Debt Spread:</span>
                  <span className="font-bold text-white">{formatUsd(compareResult.debt_difference_usd)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Debt/GDP Spread:</span>
                  <span className="font-bold text-amber-400">{compareResult.debt_to_gdp_spread_pct}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Higher Debt Per Citizen:</span>
                  <span className="font-bold text-red-400">{compareResult.higher_per_citizen}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Newsroom Widget & Real-Time Alert Stream (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#0C101F]/90 rounded-2xl border border-red-900/40 p-4 shadow-xl space-y-3 text-xs font-mono">
            <span className="font-bold text-red-400 uppercase tracking-wider block">
              Embeddable Widget for Newsrooms
            </span>
            <p className="text-slate-400 text-[11px] font-sans">
              Embed live ticking debt clocks directly on Reuters, Bloomberg, or national news sites with zero latency.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-300 break-all select-all font-mono">
              &lt;iframe src="https://oskayi.com/embed/debt-clock" width="400" height="200" /&gt;
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('<iframe src="https://oskayi.com/embed/debt-clock" width="400" height="200" frameborder="0"></iframe>');
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2000);
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied HTML' : 'Copy Embed Code'}</span>
            </button>
          </div>

          {/* 100% Debt/GDP Alert Roster */}
          <div className="bg-[#0C101F]/90 rounded-2xl border border-red-900/40 p-4 shadow-xl space-y-2">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block">
              100%+ Debt Threshold Alert
            </span>
            <div className="space-y-1.5">
              {countries.filter(c => c.debt_to_gdp_pct >= 100).map(c => (
                <div key={c.code} className="p-2 rounded-lg bg-[#080B17] border border-red-900/30 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5">
                    <span>{c.flag_emoji}</span>
                    <span className="text-white font-bold">{c.name}</span>
                  </span>
                  <span className="text-red-400 font-bold">{c.debt_to_gdp_pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pro API Modal ($99/mo) */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0C101F] border border-red-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-white text-base">Oskayi Debt Clock Pro API Access</h3>
              </div>
              <button onClick={() => setShowApiModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300">
              Access programmatic JSON endpoints, sub-second streaming WebSockets, and 200+ sovereign fiscal datasets for algorithmic research and fintech dashboards.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono">
              <span className="text-slate-400 text-xs">Monthly Subscription:</span>
              <span className="text-red-400 font-black text-lg">$99 / month</span>
            </div>
            <button
              onClick={() => {
                alert("Pro API Token checkout ($99/mo) initialized with Stripe.");
                setShowApiModal(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider"
            >
              Subscribe via Stripe ($99/mo)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
