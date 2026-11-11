import React, { useState, useEffect } from 'react';
import { 
  PiggyBank, 
  TrendingUp, 
  ShieldCheck, 
  Sliders, 
  PieChart, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  Calendar, 
  Zap, 
  Scale, 
  Coins, 
  Compass,
  FileCheck2
} from 'lucide-react';
import { InvestorProfile, WealthPortfolioRecommendation } from '../../server/oskayiWealthService';

export const OskayiWealth: React.FC = () => {
  const [age, setAge] = useState<number>(32);
  const [riskProfile, setRiskProfile] = useState<InvestorProfile['risk_profile']>('growth');
  const [goal, setGoal] = useState<InvestorProfile['goal']>('wealth_accumulation');
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [timeHorizon, setTimeHorizon] = useState<number>(20);
  
  const [portfolio, setPortfolio] = useState<WealthPortfolioRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);

  const fetchPortfolio = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/wealth/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age,
          risk_profile: riskProfile,
          goal,
          initial_amount_usd: initialAmount,
          monthly_contribution_usd: monthlyContribution,
          time_horizon_years: timeHorizon
        })
      });
      if (res.ok) {
        setPortfolio(await res.json());
      }
    } catch (e) {
      console.error('Failed to load portfolio:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [age, riskProfile, goal, initialAmount, monthlyContribution, timeHorizon]);

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col font-sans">
      {/* Top Wealth Ribbon */}
      <div className="bg-[#0D182B] border-b border-teal-500/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-700 p-0.5 flex items-center justify-center shadow-lg shadow-teal-950">
            <PiggyBank className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-wider">
                OSKAYI WEALTH
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
                GLOBAL ROBO-ADVISOR & TAX-LOSS HARVESTING
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Institutional Automated Asset Management • 0.25% Annual Advisory Fee
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCheckoutModal(true)}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open Account</span>
        </button>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: 5 Questions Onboarding Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0D182B]/90 rounded-2xl border border-teal-900/40 p-5 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Investor Profiling (5 Questions)
              </span>
              <span className="text-slate-400 text-[11px] font-mono">Dynamic Rebalancing</span>
            </div>

            {/* Q1: Age */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-slate-300 font-bold">1. Current Age</label>
                <span className="font-mono font-bold text-teal-400">{age} years old</span>
              </div>
              <input
                type="range"
                min="18"
                max="80"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-teal-400"
              />
            </div>

            {/* Q2: Risk Tolerance */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold text-xs block">2. Risk Tolerance Profile</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'conservative', label: 'Conservative', desc: 'Preserve capital (bonds focus)' },
                  { id: 'moderate', label: 'Moderate', desc: 'Balanced 50/50 equity/bond' },
                  { id: 'growth', label: 'Growth', desc: '60% MSCI World + Gold' },
                  { id: 'aggressive', label: 'Aggressive', desc: 'Maximum 90%+ equity beta' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRiskProfile(r.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      riskProfile === r.id
                        ? 'bg-teal-950/60 border-teal-400 text-white shadow-sm'
                        : 'bg-[#08101E] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs capitalize">{r.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Financial Goal */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold text-xs block">3. Primary Financial Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as any)}
                className="w-full bg-[#08101E] border border-slate-800 rounded-xl p-2.5 text-white text-xs font-sans"
              >
                <option value="wealth_accumulation">Global Wealth Accumulation & Compound Growth</option>
                <option value="retirement">Retirement Financial Independence (FIRE)</option>
                <option value="home_purchase">Major Real Estate / Home Purchase</option>
                <option value="education">Children University & Educational Endowment</option>
              </select>
            </div>

            {/* Q4: Initial Investment */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-slate-300 font-bold">4. Initial Deposit Amount ($)</label>
                <span className="font-mono font-bold text-emerald-400">${initialAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-full accent-teal-400"
              />
            </div>

            {/* Q5: Monthly Contribution & Horizon */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-slate-300 font-bold">5. Monthly Contribution ($)</label>
                  <span className="font-mono font-bold text-teal-400">${monthlyContribution.toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-teal-400"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-slate-300 font-bold">Investment Horizon (Years)</label>
                  <span className="font-mono font-bold text-white">{timeHorizon} Years</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(Number(e.target.value))}
                  className="w-full accent-teal-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Portfolio Recommendation & Compounding Projections (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {portfolio ? (
            <div className="space-y-4">
              {/* Portfolio Header Card */}
              <div className="bg-[#0D182B]/90 rounded-2xl border border-teal-900/40 p-5 shadow-2xl space-y-4">
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold block">
                      RECOMMENDED ALLOCATION STRATEGY
                    </span>
                    <h2 className="text-lg font-black text-white mt-0.5">{portfolio.portfolio_name}</h2>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-black font-mono text-emerald-400 leading-tight">
                      +{portfolio.annualized_expected_return_pct}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block">Annual Expected Return</span>
                  </div>
                </div>

                {/* Asset Allocation Breakdown Table */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
                    Institutional ETF Weights (Live Rebalanced):
                  </span>
                  <div className="space-y-1.5">
                    {portfolio.assets.map(asset => (
                      <div
                        key={asset.ticker}
                        className="p-2.5 rounded-xl bg-[#08101E] border border-slate-800 flex items-center justify-between text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-black text-[11px]">
                            {asset.ticker}
                          </span>
                          <div>
                            <span className="font-bold text-white text-xs">{asset.name}</span>
                            <span className="text-[10px] text-slate-400 block">{asset.asset_type}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-white text-sm">{asset.weight_pct}%</span>
                          <span className="text-[10px] text-slate-500 block">Exp: {asset.expense_ratio_pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Value Add Metrics (Tax-Loss Harvesting + Low Fee) */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#08101E] border border-teal-500/30">
                    <span className="text-slate-400 text-[10px] block uppercase">Est. Tax-Loss Harvesting Savings</span>
                    <span className="font-black text-emerald-400 text-sm mt-0.5 block">
                      +${portfolio.estimated_tax_loss_harvesting_savings_annual_usd.toLocaleString()} / year
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#08101E] border border-slate-800">
                    <span className="text-slate-400 text-[10px] block uppercase">Oskayi Advisory Fee</span>
                    <span className="font-black text-white text-sm mt-0.5 block">
                      0.25% AUM ($25 / $10k)
                    </span>
                  </div>
                </div>
              </div>

              {/* 20-Year Compounding Projection Trajectory */}
              <div className="bg-[#0D182B]/90 rounded-2xl border border-teal-900/40 p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Projected Wealth Growth ({timeHorizon} Years)
                  </span>
                  <span className="text-slate-400">Monthly Contribution: ${monthlyContribution}</span>
                </div>

                <div className="space-y-2">
                  {portfolio.projections.map(proj => (
                    <div
                      key={proj.year}
                      className="p-3 rounded-xl bg-[#08101E] border border-slate-800 flex items-center justify-between text-xs font-mono"
                    >
                      <div>
                        <span className="font-bold text-white text-sm">Year {proj.year}</span>
                        <span className="text-[10px] text-slate-400 block">
                          Contributed: ${proj.total_contributed_usd.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-emerald-400 text-base block">
                          ${proj.expected_balance_usd.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Range: ${proj.conservative_balance_usd.toLocaleString()} – ${proj.bull_balance_usd.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 font-mono text-xs">
              Calculating portfolio allocation...
            </div>
          )}
        </div>
      </div>

      {/* Account Opening Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0D182B] border border-teal-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">Open Oskayi Wealth Account</h3>
              </div>
              <button onClick={() => setShowCheckoutModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300">
              Complete your institutional brokerage onboarding under SIPC / regulatory custodian accounts. Initial funding of ${initialAmount.toLocaleString()} USD ready for deployment.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">Annual Advisory Fee:</span>
              <span className="text-emerald-400 font-bold">0.25% (First $5,000 Managed Free)</span>
            </div>
            <button
              onClick={() => {
                alert(`Oskayi Wealth custodial account initialization confirmed for $${initialAmount.toLocaleString()} initial funding.`);
                setShowCheckoutModal(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg"
            >
              Confirm Account Onboarding
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
