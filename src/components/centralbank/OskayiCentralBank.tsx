import React, { useState, useEffect } from 'react';
import { 
  Building, Calendar, TrendingDown, TrendingUp, Clock, 
  ShieldCheck, ArrowUpRight, ArrowDownRight, Globe, Lock, CheckCircle2, Zap
} from 'lucide-react';

interface CentralBankPolicyRate {
  id: string;
  country: string;
  bank_name: string;
  acronym: string;
  currency: string;
  current_policy_rate_pct: number;
  previous_policy_rate_pct: number;
  change_bps: number;
  inflation_rate_pct: number;
  inflation_target_pct: number;
  real_interest_rate_pct: number;
  last_decision_date: string;
  next_decision_date: string;
  next_decision_countdown_days: number;
  ai_next_move: string;
  ai_probability_pct: number;
  hawkish_dovish_score: number;
  historical_rates: { year: number; rate_pct: number }[];
  tier: 'FREE' | 'PRO';
}

export const OskayiCentralBank: React.FC = () => {
  const [rates, setRates] = useState<CentralBankPolicyRate[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [selectedBank, setSelectedBank] = useState<CentralBankPolicyRate | null>(null);
  const [isProUser, setIsProUser] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  useEffect(() => {
    fetchRates();
    fetch('/api/central-bank/summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(console.error);
  }, [isProUser]);

  const fetchRates = () => {
    fetch(`/api/central-bank/rates?pro=${isProUser}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRates(data);
          if (data.length > 0 && !selectedBank) setSelectedBank(data[0]);
        }
      })
      .catch(console.error);
  };

  const handleUpgradePro = () => {
    setIsProUser(true);
    setUpgradeSuccess(true);
    setTimeout(() => setUpgradeSuccess(false), 6000);
  };

  return (
    <div className="min-h-screen bg-[#070C18] text-slate-100 font-sans pb-20">
      {/* Top Banner */}
      <div className="bg-[#0B152B] border-b border-cyan-500/20 px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider">
            GLOBAL CENTRAL BANK TERMINAL
          </span>
          <span className="text-slate-400">FRED • BIS • ECB Statistical Data Warehouse • Bank of Ghana</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-300">
          <span>Cycle: <strong className="text-cyan-400 font-mono">GLOBAL EASING</strong></span>
          <span>Coverage: <strong className="text-white">50 Central Banks</strong></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-sm font-semibold tracking-wide uppercase">
              <Building className="w-4 h-4" />
              <span>Monetary Policy & Rate Decision Tracker</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Oskayi Central Bank Tracker
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Real-time policy rates for 50 world central banks, FOMC countdown clock, and proprietary AI rate hike/cut probability engine based on inflation trajectory & Taylor rule divergence.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {!isProUser ? (
              <button
                onClick={handleUpgradePro}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition"
              >
                <Zap className="w-4 h-4" />
                <span>Upgrade to Pro ($29/mo)</span>
              </button>
            ) : (
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>PRO SUBSCRIBER (50 BANKS UNLOCKED)</span>
              </div>
            )}
          </div>
        </div>

        {upgradeSuccess && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center space-x-3 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Pro subscription activated! All 50 central banks, historical 2000–2026 data series, and webhook rate alerts unlocked.</span>
          </div>
        )}

        {/* Global Summary Stats */}
        {summary && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Average Global Policy Rate</div>
              <div className="text-2xl font-black text-white mt-1 font-mono">
                {summary.average_policy_rate_pct}%
              </div>
              <div className="text-xs text-slate-400 mt-1">Across Monitored Jurisdictions</div>
            </div>

            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Rate Cuts Projected</div>
              <div className="text-2xl font-black text-cyan-400 mt-1 font-mono flex items-center">
                <TrendingDown className="w-5 h-5 mr-1" />
                {summary.cuts_projected} Central Banks
              </div>
              <div className="text-xs text-cyan-400/80 mt-1">Global Monetary Easing</div>
            </div>

            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Next Key Decision</div>
              <div className="text-sm font-bold text-amber-400 mt-1 line-clamp-2">
                {summary.next_key_event}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center">
                <Clock className="w-3 h-3 mr-1 text-slate-400" />
                <span>Live Countdown</span>
              </div>
            </div>

            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Coverage</div>
              <div className="text-2xl font-black text-white mt-1 font-mono">
                50 Nations
              </div>
              <div className="text-xs text-slate-400 mt-1">G10, EM & African Central Banks</div>
            </div>
          </div>
        )}

        {/* Main Grid: Rates Table & Bank Deep Dive */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table */}
          <div className="lg:col-span-2 bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Central Bank Rates & AI Forecast</h3>
              <span className="text-xs text-slate-400 font-mono">FRED & BIS Live</span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5">Central Bank</th>
                    <th className="py-2.5 text-right">Policy Rate</th>
                    <th className="py-2.5 text-right">Inflation</th>
                    <th className="py-2.5 text-right">Real Rate</th>
                    <th className="py-2.5 text-center">Next Meeting</th>
                    <th className="py-2.5 text-right">AI Predictor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {rates.map(bank => {
                    const isSelected = selectedBank?.id === bank.id;
                    return (
                      <tr
                        key={bank.id}
                        onClick={() => setSelectedBank(bank)}
                        className={`cursor-pointer transition ${
                          isSelected ? 'bg-cyan-500/10 text-white' : 'hover:bg-slate-800/30 text-slate-300'
                        }`}
                      >
                        <td className="py-3 font-sans">
                          <div className="font-bold text-white flex items-center space-x-1.5">
                            <span>{bank.country}</span>
                            <span className="text-xs text-cyan-400 font-mono">({bank.acronym})</span>
                          </div>
                          <div className="text-slate-400 text-xs">{bank.currency}</div>
                        </td>

                        <td className="py-3 text-right font-bold text-white">
                          <span className="text-sm">{bank.current_policy_rate_pct.toFixed(2)}%</span>
                          {bank.change_bps !== 0 && (
                            <div className={`text-xs ${bank.change_bps > 0 ? 'text-rose-400' : 'text-cyan-400'}`}>
                              {bank.change_bps > 0 ? `+${bank.change_bps} bps` : `${bank.change_bps} bps`}
                            </div>
                          )}
                        </td>

                        <td className="py-3 text-right">
                          <div className="text-white">{bank.inflation_rate_pct}%</div>
                          <div className="text-slate-500 text-[10px]">Target {bank.inflation_target_pct}%</div>
                        </td>

                        <td className="py-3 text-right font-semibold">
                          <span className={bank.real_interest_rate_pct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                            {bank.real_interest_rate_pct > 0 ? `+${bank.real_interest_rate_pct}%` : `${bank.real_interest_rate_pct}%`}
                          </span>
                        </td>

                        <td className="py-3 text-center">
                          <div className="text-slate-200 font-semibold">{bank.next_decision_date}</div>
                          <div className="text-amber-400 text-xs">{bank.next_decision_countdown_days} days left</div>
                        </td>

                        <td className="py-3 text-right">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                            bank.ai_next_move.startsWith('CUT') 
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                              : bank.ai_next_move.startsWith('HIKE')
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {bank.ai_next_move.replace(/_/g, ' ')} ({bank.ai_probability_pct}%)
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {!isProUser && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Showing top 10 central banks. Upgrade to Pro to track all 50 global central banks.</span>
                </div>
                <button
                  onClick={handleUpgradePro}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs"
                >
                  Unlock Pro ($29/mo)
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Selected Bank Analysis */}
          {selectedBank && (
            <div className="space-y-6">
              <div className="bg-[#0E172A] border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
                <div className="text-xs text-cyan-400 font-mono uppercase font-bold tracking-wider">
                  Central Bank Dossier
                </div>
                <h3 className="text-2xl font-black text-white mt-1">
                  {selectedBank.bank_name}
                </h3>
                <div className="text-xs text-slate-400 mt-1">
                  Jurisdiction: <strong className="text-white">{selectedBank.country}</strong> ({selectedBank.currency})
                </div>

                {/* AI Hike/Cut Predictor Gauge */}
                <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 uppercase font-semibold">
                    Proprietary AI Next Move Predictor
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xl font-black text-cyan-400">
                      {selectedBank.ai_next_move.replace(/_/g, ' ')}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs">
                      {selectedBank.ai_probability_pct}% Confidence
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-slate-400">
                    Hawkish / Dovish Bias Score: <strong className="text-white font-mono">{selectedBank.hawkish_dovish_score}</strong> (-10 = Dovish, +10 = Hawkish)
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className={`h-full ${selectedBank.hawkish_dovish_score < 0 ? 'bg-cyan-400' : 'bg-rose-400'}`}
                      style={{ width: `${Math.min(100, Math.max(10, Math.abs(selectedBank.hawkish_dovish_score) * 10))}%` }}
                    ></div>
                  </div>
                </div>

                {/* Historical Rate Table 2000-2026 */}
                <div className="mt-6">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">
                    Historical Policy Rate (2000 – 2026)
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 max-h-48 overflow-y-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-1">Year</th>
                          <th className="py-1 text-right">Policy Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {selectedBank.historical_rates.map(hr => (
                          <tr key={hr.year}>
                            <td className="py-1 text-slate-300">{hr.year}</td>
                            <td className="py-1 text-right font-bold text-cyan-400">{hr.rate_pct.toFixed(2)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                  <div>Last Rate Decision: <strong className="text-white">{selectedBank.last_decision_date}</strong></div>
                  <div>Next MPC Meeting: <strong className="text-amber-400">{selectedBank.next_decision_date} ({selectedBank.next_decision_countdown_days} days)</strong></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
