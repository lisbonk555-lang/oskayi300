import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  Sparkles, 
  Send, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  Scale, 
  FileText, 
  Lock, 
  Compass, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { SovereignMacroBenchmark, SovereignDsaMetric, SovereignAiScenarioResult } from '../../server/oskayiSovereignService';

export const OskayiSovereign: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<SovereignMacroBenchmark | null>(null);
  const [dsaProfile, setDsaProfile] = useState<SovereignDsaMetric | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('GHA');
  const [ministerialQuery, setMinisterialQuery] = useState<string>('Should we issue a 10-year sovereign Eurobond now or wait for upcoming Federal Reserve rate cuts?');
  const [evaluation, setEvaluation] = useState<SovereignAiScenarioResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState<boolean>(false);

  const fetchBenchmarks = async () => {
    try {
      const [bRes, dRes] = await Promise.all([
        fetch('/api/sovereign/benchmarks'),
        fetch(`/api/sovereign/dsa/${selectedCountry}`)
      ]);
      if (bRes.ok) setBenchmarks(await bRes.json());
      if (dRes.ok) setDsaProfile(await dRes.json());
    } catch (e) {
      console.error('Failed to load sovereign data:', e);
    }
  };

  useEffect(() => {
    fetchBenchmarks();
  }, [selectedCountry]);

  const handleEvaluate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ministerialQuery.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/sovereign/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: ministerialQuery, countryCode: selectedCountry })
      });
      if (res.ok) {
        setEvaluation(await res.json());
      }
    } catch (e) {
      console.error('Evaluation error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleEvaluate();
  }, []);

  return (
    <div className="min-h-screen bg-[#050B17] text-slate-100 flex flex-col font-sans">
      {/* Top Sovereign Ribbon */}
      <div className="bg-[#0A162D] border-b border-[#FFD700]/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-amber-600 p-0.5 flex items-center justify-center shadow-lg shadow-amber-950">
            <Building2 className="w-6 h-6 text-[#050B17]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-wider">
                OSKAYI SOVEREIGN AI
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40">
                CONFIDENTIAL MINISTRY ADVISOR
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <Lock className="w-3 h-3" />
                Air-Gapped Sovereign Node
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Macroeconomic Strategy & Debt Sustainability Advisor for Ministers of Finance & Central Banks
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSubscriptionModal(true)}
          className="px-3.5 py-1.5 rounded-xl bg-[#FFD700] hover:bg-amber-400 text-[#050B17] font-black text-xs flex items-center gap-1.5 shadow-md uppercase tracking-wider font-mono"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Sovereign License ($5,000/mo)</span>
        </button>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: Live Benchmarks & DSA Matrix (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Sovereign Country Selector */}
          <div className="bg-[#0A162D]/90 rounded-2xl border border-slate-800 p-4 space-y-3">
            <label className="text-xs font-mono font-bold text-slate-400 uppercase block">
              Member State DMO Context:
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-[#050B17] border border-slate-700 rounded-xl p-2.5 text-white text-xs font-mono font-bold"
            >
              <option value="GHA">Republic of Ghana (Ministry of Finance)</option>
              <option value="KEN">Republic of Kenya (National Treasury)</option>
              <option value="NGA">Federal Republic of Nigeria (Debt Management Office)</option>
            </select>
          </div>

          {/* Real Macro Benchmarks Grid */}
          {benchmarks && (
            <div className="bg-[#0A162D]/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-3">
              <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider block">
                Live Global Capital Market Rates
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#050B17] border border-slate-800">
                  <span className="text-slate-400">US 10-Year Treasury Yield:</span>
                  <span className="font-bold text-white">{benchmarks.us_10y_treasury_yield_pct}%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#050B17] border border-slate-800">
                  <span className="text-slate-400">Fed Funds Target Rate:</span>
                  <span className="font-bold text-white">{benchmarks.fed_funds_rate_pct}%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#050B17] border border-slate-800">
                  <span className="text-slate-400">EMBI Emerging Spread:</span>
                  <span className="font-bold text-amber-400">+{benchmarks.emerging_market_bond_index_spread_bps} bps</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#050B17] border border-slate-800">
                  <span className="text-slate-400">Brent Crude Benchmark:</span>
                  <span className="font-bold text-emerald-400">${benchmarks.brent_crude_usd}/bbl</span>
                </div>
              </div>
            </div>
          )}

          {/* DSA Metric Profile */}
          {dsaProfile && (
            <div className="bg-[#0A162D]/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-2.5 text-xs font-mono">
              <span className="text-xs font-bold text-slate-300 uppercase block">
                Debt Sustainability Profile (IMF/WB)
              </span>
              <div className="space-y-1.5 text-slate-400">
                <div className="flex justify-between">
                  <span>External Debt/GDP:</span>
                  <strong className="text-white">{dsaProfile.external_debt_to_gdp_pct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Debt Service/Revenue:</span>
                  <strong className="text-red-400">{dsaProfile.debt_service_to_government_revenue_pct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Reserves Cover:</span>
                  <strong className="text-white">{dsaProfile.gross_international_reserves_months_import} Months</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800">
                  <span>Distress Rating:</span>
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-black">
                    {dsaProfile.overall_risk_of_debt_distress}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Ministerial Chat & Scenario Comparison (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Query Formulation Input Box */}
          <form onSubmit={handleEvaluate} className="bg-[#0A162D]/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD700] block">
              Ministerial Advisory Prompt & Strategic Inquiries:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={ministerialQuery}
                onChange={(e) => setMinisterialQuery(e.target.value)}
                placeholder="Ask sovereign advice: bond timing, currency hedging, primary deficit gap..."
                className="flex-1 bg-[#050B17] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-[#FFD700] hover:bg-amber-400 text-[#050B17] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isLoading ? 'Modeling...' : 'Run DSA Simulation'}</span>
              </button>
            </div>

            {/* Quick Prompts for Ministers */}
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
              {[
                'Issue 10-year Eurobond now or wait for rate cuts?',
                'Impact of 15% currency depreciation on debt service?',
                'How to structure a Debt-for-Nature swap for biodiversity?'
              ].map(prompt => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setMinisterialQuery(prompt);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#FFD700]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </form>

          {/* AI Decision Scenario Analysis */}
          {evaluation && (
            <div className="bg-[#0A162D]/90 rounded-2xl border border-[#FFD700]/30 p-5 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-black text-white text-base">{evaluation.recommendation_headline}</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  IMF WEO ALIGNED
                </span>
              </div>

              {/* 3 Structured Scenarios Grid */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
                  Sovereign Decision Scenarios Under Probability Weighting:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {evaluation.scenarios.map((sc, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#050B17] border border-slate-800 space-y-2 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-[11px] truncate max-w-[150px]">{sc.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                          {sc.probability_pct}% Prob
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 space-y-1 font-sans">
                        {sc.outcomes.map((o, idx) => (
                          <div key={idx}>• {o}</div>
                        ))}
                      </div>
                      <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-500">
                        Spread: +{sc.interest_cost_spread_bps} bps
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Policy Recommendation Block */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-[#FFD700]/40 space-y-2 text-xs">
                <span className="font-mono font-black text-[#FFD700] uppercase text-[11px] block">
                  ACTIONABLE MINISTERIAL RECOMMENDATION:
                </span>
                <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
                  {evaluation.final_sovereign_recommendation}
                </p>
              </div>

              {/* Cited Public Sources */}
              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex flex-wrap gap-2 items-center">
                <span className="text-slate-500 uppercase">Primary Data Sources:</span>
                {evaluation.cited_sources.map(src => (
                  <span key={src} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    {src}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sovereign License Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0A162D] border border-[#FFD700]/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Sovereign Institutional AI Subscription</h3>
              <button onClick={() => setShowSubscriptionModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-slate-300 text-xs">
              Dedicated, private deployment for Central Banks, Ministries of Finance, and Debt Management Offices (DMO).
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono">
              <span className="text-slate-400">Institutional Licensing:</span>
              <span className="text-[#FFD700] font-black text-base">$5,000 USD / month</span>
            </div>
            <button
              onClick={() => {
                alert("Sovereign subscription initialized via official diplomatic procurement under OSKAYI CONSULT.");
                setShowSubscriptionModal(false);
              }}
              className="w-full py-3 rounded-xl bg-[#FFD700] hover:bg-amber-400 text-[#050B17] font-black text-xs uppercase tracking-wider"
            >
              Confirm Sovereign Procurement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
