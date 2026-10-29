import React, { useState } from 'react';
import { 
  Cpu, 
  Smartphone, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  ExternalLink, 
  Lock, 
  Zap, 
  TrendingUp, 
  Scale, 
  Landmark, 
  Building2, 
  Check, 
  Layers, 
  BarChart3,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { LoanProduct, LoanApplication } from '../../server/oskaiLoanService';

interface OilDecisionBrainProps {
  onApplyForMatchedProduct: (product: LoanProduct, prefilledData?: any) => void;
  availableProducts: LoanProduct[];
}

export const OilDecisionBrain: React.FC<OilDecisionBrainProps> = ({
  onApplyForMatchedProduct,
  availableProducts
}) => {
  const [intakeMode, setIntakeMode] = useState<'link' | 'upload'>('link');
  
  // Form State
  const [fullName, setFullName] = useState('Kwame Asante');
  const [email, setEmail] = useState('kwame.asante@gmail.com');
  const [phone, setPhone] = useState('+233 24 490 5505');
  const [employmentType, setEmploymentType] = useState('Salaried Formal');
  const [monthlyIncome, setMonthlyIncome] = useState(4500);
  const [fixedExpenses, setFixedExpenses] = useState(1600);
  const [existingDebts, setExistingDebts] = useState(250);
  const [requestedAmount, setRequestedAmount] = useState(8000);
  const [requestedTenure, setRequestedTenure] = useState(12);
  
  // Link / Open Banking State
  const [selectedProvider, setSelectedProvider] = useState<'MTN_MOMO' | 'TELECEL' | 'DIRECT_GCB' | 'DIRECT_ECOBANK'>('MTN_MOMO');
  
  // Statement upload / USSD paste
  const [pastedUssdText, setPastedUssdText] = useState(
    'Cash Out GHS 450 to Agent 29104. Balance: GHS 2,840.40. Ref: 89104812.\nReceived GHS 4,500.00 from K-Tech Payroll. Balance: GHS 4,950.00.\nPayment to ECG Prepaid GHS 120.00. Balance: GHS 4,830.00.\nAirtime Purchase GHS 50.00. Balance: GHS 4,780.00.'
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Alternative Ghana Data Toggles
  const [hasSsnit, setHasSsnit] = useState(true);
  const [hasBusinessReg, setHasBusinessReg] = useState(false);
  const [hasUtilityConsistency, setHasUtilityConsistency] = useState(true);

  // Scoring Engine Lifecycle
  const [scoringStep, setScoringStep] = useState<'idle' | 'analyzing' | 'scored'>('idle');
  const [progressMsg, setProgressMsg] = useState('');
  const [scoreResult, setScoreResult] = useState<any>(null);
  const [matchedLenders, setMatchedLenders] = useState<any[]>([]);

  const handleRunBrainDecision = async (e: React.FormEvent) => {
    e.preventDefault();
    setScoringStep('analyzing');
    setProgressMsg('Connecting to Direct Open Banking API & MoMo telemetry parser...');

    try {
      // Step animation sequence
      setTimeout(() => {
        setProgressMsg('Executing MoMo Cash-Velocity & Behavioral Character Matrix...');
      }, 700);

      setTimeout(() => {
        setProgressMsg('Evaluating Bank of Ghana 45% DTI ceiling & net disposable cash-flow...');
      }, 1500);

      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          country: 'Ghana',
          employmentType,
          monthlyIncome: Number(monthlyIncome),
          fixedMonthlyExpenses: Number(fixedExpenses),
          existingDebtPayments: Number(existingDebts),
          requestedAmount: Number(requestedAmount),
          requestedTenureMonths: Number(requestedTenure),
          dataSourceType: intakeMode === 'link' ? 'OPEN_BANKING_DAT' : 'USSD_SMS_HISTORY',
          momoNetwork: selectedProvider.includes('MTN') ? 'MTN MoMo' : 'Telecel Cash',
          hasSsnitContribution: hasSsnit,
          hasBusinessRegistration: hasBusinessReg,
          hasUtilityBillConsistency: hasUtilityConsistency,
          momoMonthlyTransactionCount: 48,
          rawStatementOrUssdText: pastedUssdText
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Scoring engine failed');
      }

      setScoreResult(data.decision);

      // Now query Live Matching Engine
      setProgressMsg('Querying real-time open lending APIs for optimal reducing APRs...');
      const matchRes = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scoreResult: data.decision,
          requestedAmount: Number(requestedAmount),
          requestedTenureMonths: Number(requestedTenure)
        })
      });

      const matchData = await matchRes.json();
      if (matchRes.ok && matchData.topMatches) {
        setMatchedLenders(matchData.topMatches);
      }

      setScoringStep('scored');
    } catch (err: any) {
      alert(err.message || 'Error executing scoring brain');
      setScoringStep('idle');
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero: Master Brain Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial-gradient from-teal-500/10 via-amber-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold tracking-wide uppercase">
            <Cpu className="w-4 h-4 text-teal-400 animate-pulse" />
            Master Instant Lending Decision Brain • Real-Time Open APIs
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            OIL - Oskayi Instant Loan
          </h1>

          <p className="text-lg sm:text-xl text-teal-200 font-medium">
            Get instant algorithmic decision in 90 seconds based on your Mobile Money & Bank history.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            We are not a lender. Oskayi Consult is a licensed credit scoring and digital dossier preparation intermediary. We aggregate real-time loan offers directly from licensed commercial banks, savings & loans, and global microfinance partners under the <strong>Data Protection Act 2012 (Act 843)</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Bank of Ghana Regulated Partners
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Lock className="w-4 h-4 text-teal-400" />
              256-Bit Encrypted Open Banking
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Zap className="w-4 h-4 text-amber-400" />
              Zero Simulated Approvals
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Scoring Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        {/* Toggle Mode: Link vs Statement */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              1. Choose Verification & Scoring Intake
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select how you wish the Master Brain to analyze your verifiable cash-flow.
            </p>
          </div>

          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setIntakeMode('link')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                intakeMode === 'link'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Link Bank / MoMo (Direct Open Auth)
            </button>
            <button
              onClick={() => setIntakeMode('upload')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                intakeMode === 'upload'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Upload Statement / Paste *170#
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleRunBrainDecision} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Applicant Profile */}
            <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
              <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Applicant Details
              </h3>
              
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Mobile Phone (Ghana) *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Employment Structure</label>
                <select
                  value={employmentType}
                  onChange={e => setEmploymentType(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Salaried Formal">Salaried Formal (CAGD / Corporate)</option>
                  <option value="Self-Employed / SME">Self-Employed / SME Business Owner</option>
                  <option value="Informal Sector">Informal Sector / Trader</option>
                  <option value="Professional / Consultant">Independent Consultant / Contractor</option>
                </select>
              </div>
            </div>

            {/* Financial Telemetry */}
            <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                Monthly Cash Flow (GHS)
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Net Monthly Inflow / Income (GHS) *
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={e => setMonthlyIncome(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Fixed Monthly Expenses (Rent, Food, Utilities)
                </label>
                <input
                  type="number"
                  value={fixedExpenses}
                  onChange={e => setFixedExpenses(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Existing Monthly Debt Deductions (GHS)
                </label>
                <input
                  type="number"
                  value={existingDebts}
                  onChange={e => setExistingDebts(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Provisional Disposable Income:</span>
                  <span className="font-bold text-emerald-400">
                    GHS {Math.max(0, monthlyIncome - fixedExpenses - existingDebts).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Desired Financing & Open Banking Telemetry */}
            <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
              <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                Target Loan Request
              </h3>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                  <span>Requested Amount:</span>
                  <span className="text-teal-400 font-mono font-bold">GHS {requestedAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={requestedAmount}
                  onChange={e => setRequestedAmount(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>GHS 500</span>
                  <span>GHS 50,000</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Repayment Tenure</label>
                <select
                  value={requestedTenure}
                  onChange={e => setRequestedTenure(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value={3}>3 Months (Short-term advance)</option>
                  <option value={6}>6 Months (Working capital)</option>
                  <option value={12}>12 Months (1 Year Standard)</option>
                  <option value={24}>24 Months (Medium-term investment)</option>
                  <option value={36}>36 Months (3 Years)</option>
                </select>
              </div>

              {/* Alternative Data Badges */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Alternative Data Boosters (Ghana Model)
                </span>
                <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSsnit}
                    onChange={e => setHasSsnit(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>SSNIT Monthly Contribution Active</span>
                </label>
                <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasUtilityConsistency}
                    onChange={e => setHasUtilityConsistency(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Regular Utility Payments (ECG / Water)</span>
                </label>
                <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBusinessReg}
                    onChange={e => setHasBusinessReg(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Registrar-General Business Certificate</span>
                </label>
              </div>
            </div>
          </div>

          {/* Intake Details: Link Mode vs Upload Mode */}
          {intakeMode === 'link' ? (
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Select Direct Open Banking / Mobile Money Connector
                </span>
                <span className="text-[11px] text-teal-400 font-mono">Direct Open Protocol Rail</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'MTN_MOMO', label: 'MTN MoMo Rail', desc: 'MoMo cash velocity & limits' },
                  { id: 'TELECEL', label: 'Telecel Cash', desc: 'National Interoperable feed' },
                  { id: 'DIRECT_GCB', label: 'GCB Bank Direct', desc: 'Direct NUBAN/IBAN auth' },
                  { id: 'DIRECT_ECOBANK', label: 'Ecobank Direct', desc: 'Direct corporate telemetry' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedProvider(opt.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedProvider === opt.id
                        ? 'bg-teal-500/10 border-teal-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs">{opt.label}</div>
                    <div className="text-[10px] text-slate-500">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-400" />
                Paste USSD *170# History or Upload MoMo Statement CSV
              </span>
              <textarea
                rows={3}
                value={pastedUssdText}
                onChange={e => setPastedUssdText(e.target.value)}
                placeholder="Paste your recent mobile money SMS or USSD statement here..."
                className="w-full text-xs p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
              />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Auto-parses transaction inflow frequency, cash velocity, and fixed charges.</span>
                <span className="text-[10px] text-slate-500">GDPR & Act 843 compliant • Auto-cleared in 24h</span>
              </div>
            </div>
          )}

          {/* Submit Trigger Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={scoringStep === 'analyzing'}
              className="w-full py-4 bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-teal-500/10 hover:shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {scoringStep === 'analyzing' ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>{progressMsg}</span>
                </>
              ) : (
                <>
                  <Cpu className="w-5 h-5" />
                  <span>Execute Master Brain Scoring & Match Live Lenders in 90 Seconds &rarr;</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Scored Results Section */}
      {scoreResult && (
        <div className="space-y-8 animate-scaleUp">
          {/* Live Score Gauge & Metrics Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Score Gauge Circle */}
              <div className="flex flex-col items-center text-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="88"
                      cy="88"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-slate-800"
                      fill="transparent"
                    />
                    <circle
                      cx="88"
                      cy="88"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      className={
                        scoreResult.oilScore >= 700 ? 'text-emerald-400' :
                        scoreResult.oilScore >= 600 ? 'text-teal-400' : 'text-amber-400'
                      }
                      fill="transparent"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * ((scoreResult.oilScore - 300) / 550))}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black font-mono text-white">
                      {scoreResult.oilScore}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      OIL Score (300-850)
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full mt-1 ${
                      scoreResult.tier === 'EXCELLENT' || scoreResult.tier === 'VERY_GOOD' 
                        ? 'bg-emerald-500/20 text-emerald-300' 
                        : 'bg-teal-500/20 text-teal-300'
                    }`}>
                      {scoreResult.tier}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 mt-2">
                  Decision Ref: <strong className="text-slate-200 font-mono">{scoreResult.decisionId}</strong>
                </span>
              </div>

              {/* Sub-scores Breakdown & DTI meter */}
              <div className="flex-1 w-full space-y-4">
                <h3 className="font-bold text-white text-base">
                  Multi-Model Scoring Telemetry Breakdown
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Income Stability</span>
                    <span className="text-lg font-bold text-white mt-0.5 block">
                      {scoreResult.subScores.incomeStability}/100
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Affordability & DTI</span>
                    <span className="text-lg font-bold text-teal-400 mt-0.5 block">
                      {scoreResult.subScores.affordabilityScore}/100
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">MoMo / Tala Velocity</span>
                    <span className="text-lg font-bold text-amber-400 mt-0.5 block">
                      {scoreResult.subScores.alternativeDataScore}/100
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Repayment Behavior</span>
                    <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
                      {scoreResult.subScores.repaymentBehavior}/100
                    </span>
                  </div>
                </div>

                {/* BoG DTI Gauge */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">
                      Bank of Ghana Debt-to-Income (DTI) Benchmark:
                    </span>
                    <span className={`font-mono font-bold ${
                      scoreResult.financialMetrics.dtiRatioPct <= 45 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {scoreResult.financialMetrics.dtiRatioPct}% (Ceiling is 45%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        scoreResult.financialMetrics.dtiRatioPct <= 45 ? 'bg-emerald-400' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, scoreResult.financialMetrics.dtiRatioPct * 1.5)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Safe (&le;35%)</span>
                    <span>BoG Limit (45%)</span>
                    <span>High Risk (&gt;50%)</span>
                  </div>
                </div>

                {/* Transparent Factors */}
                <div className="space-y-1 text-xs">
                  {scoreResult.positiveFactors.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {scoreResult.negativeFactors.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Matched Lenders (Top 3 Side-by-Side Cards) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold font-serif text-white">
                  Live Matched Lenders ({matchedLenders.length} Best Direct Offers)
                </h3>
                <p className="text-xs text-slate-400">
                  Queried directly through live open APIs. Transparent reducing balance APRs—never flat rates.
                </p>
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live API Response Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedLenders.map((m, idx) => {
                const targetProduct = availableProducts.find(p => p.id === m.productId);

                return (
                  <div 
                    key={idx}
                    className="bg-slate-900 border border-slate-800 hover:border-teal-500/60 rounded-2xl p-6 transition-all flex flex-col justify-between shadow-xl group"
                  >
                    <div className="space-y-4">
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                            {m.licenseType}
                          </span>
                          <h4 className="font-bold text-white text-base leading-snug">
                            {m.lenderName}
                          </h4>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {m.apiStatus}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 font-semibold">
                        {m.productTitle}
                      </div>

                      {/* Repayment Numbers */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Benchmark APR:</span>
                          <span className="font-bold text-amber-400 font-mono">{m.aprBenchmark}% APR</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Est. Monthly Installment:</span>
                          <span className="font-bold text-white font-mono">
                            GHS {m.repaymentSummary.monthlyInstallment.toLocaleString()} /mo
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Repayment ({m.repaymentSummary.tenureMonths} mo):</span>
                          <span className="font-mono text-slate-300">
                            GHS {m.repaymentSummary.totalRepayment.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Processing Speed Evidence:</span>
                          <span className="text-teal-300 font-medium">{m.processingTimeEvidence}</span>
                        </div>
                      </div>

                      {/* Required Documents Checklist */}
                      <div className="space-y-1 text-[11px] text-slate-400">
                        <span className="font-bold text-slate-300 block">Required for Disbursal:</span>
                        {m.requiredDocuments.slice(0, 3).map((doc: string, dIdx: number) => (
                          <div key={dIdx} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-teal-400 shrink-0" />
                            <span className="truncate">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-5 mt-5 border-t border-slate-800">
                      <button
                        onClick={() => {
                          if (targetProduct) {
                            onApplyForMatchedProduct(targetProduct, {
                              fullName,
                              email,
                              phone,
                              requestedAmount,
                              requestedTenure
                            });
                          }
                        }}
                        className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-teal-500/20"
                      >
                        <span>Apply Instantly via Standardized Packet</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Statutory Intermediary & Anti-Fraud Notice */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-xs text-slate-400 space-y-2 leading-relaxed">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Info className="w-4 h-4 text-teal-400" />
          Mandatory Intermediary Disclosure & Anti-Fraud Notice:
        </div>
        <p>
          Oskayi Instant Loan (OIL) is an algorithmic loan discovery, credit scoring, and standardized application dossier routing engine operated by Oskayi Consult (Reg. BN248851025). <strong>We are NOT a bank and do NOT lend directly.</strong> All credit underwriting, risk evaluation, and fund disbursements are executed solely by licensed financial institutions (Stanbic Bank Ghana, Ecobank Ghana, Absa Bank, GCB Bank PLC, Fidelity Bank, Opportunity International, Kiva micro-credit partners) under the supervision of the Bank of Ghana.
        </p>
        <p>
          The optional GHS 50 advisory fee is exclusively for KYC verification, data formatting, and encrypted transmission via Paystack. It is non-reimbursable, is strictly NOT a loan deposit or collateral, and DOES NOT guarantee loan approval. No application is marked as &ldquo;Disbursed&rdquo; without verified settlement evidence from the partner lender.
        </p>
      </div>
    </div>
  );
};
