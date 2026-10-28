import React, { useState } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  DollarSign, 
  BookOpen, 
  AlertCircle 
} from 'lucide-react';

export function OskaiAiAssistant() {
  const [calcAmount, setCalcAmount] = useState<number>(10000);
  const [calcApr, setCalcApr] = useState<number>(28);
  const [calcMonths, setCalcMonths] = useState<number>(12);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(3000);
  const [calculation, setCalculation] = useState<any>({
    monthlyPayment: 965.13,
    totalRepayment: 11581.56,
    totalInterest: 1581.56,
    tenureMonths: 12,
    annualInterestRatePct: 28,
    principal: 10000
  });

  const [activeTab, setActiveTab] = useState<'calculator' | 'apr-vs-flat' | 'scam-detector' | 'dti'>('calculator');

  // Interactive Amortization Calculator
  const handleRecalculate = (amt: number, apr: number, mos: number) => {
    setCalcAmount(amt);
    setCalcApr(apr);
    setCalcMonths(mos);

    const monthlyRate = (apr / 100) / 12;
    let payment = 0;
    if (monthlyRate === 0) {
      payment = amt / mos;
    } else {
      payment = (amt * monthlyRate * Math.pow(1 + monthlyRate, mos)) / (Math.pow(1 + monthlyRate, mos) - 1);
    }

    const totalRepay = payment * mos;
    setCalculation({
      monthlyPayment: Math.round(payment * 100) / 100,
      totalRepayment: Math.round(totalRepay * 100) / 100,
      totalInterest: Math.round((totalRepay - amt) * 100) / 100,
      tenureMonths: mos,
      annualInterestRatePct: apr,
      principal: amt
    });
  };

  // Debt-to-Income calculation
  const dtiRatio = monthlyIncome > 0 ? Math.round((calculation.monthlyPayment / monthlyIncome) * 100) : 0;

  return (
    <section id="assistant" className="py-12 lg:py-16 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-mono font-bold uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-teal-600" />
            <span>AI Loan Terms & Financial Health Advisor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Understand Loan Terms. Calculate Real Costs.
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Distinguish between flat interest and reducing APR, estimate monthly burden, and verify that borrowing terms fit your genuine budget before applying.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs mb-8">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'calculator'
                ? 'bg-slate-950 text-teal-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Amortization Estimator
          </button>
          <button
            onClick={() => setActiveTab('apr-vs-flat')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'apr-vs-flat'
                ? 'bg-slate-950 text-teal-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            APR vs. Flat Rate Guide
          </button>
          <button
            onClick={() => setActiveTab('dti')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'dti'
                ? 'bg-slate-950 text-teal-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Debt-to-Income (DTI) Check
          </button>
          <button
            onClick={() => setActiveTab('scam-detector')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'scam-detector'
                ? 'bg-slate-950 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Predatory Scam Scanner</span>
          </button>
        </div>

        {/* Tab 1: Amortization Estimator */}
        {activeTab === 'calculator' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Sliders & Inputs */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-500 uppercase">Loan Principal:</span>
                    <span className="text-base font-bold text-slate-950">GH₵ {calcAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={100000}
                    step={500}
                    value={calcAmount}
                    onChange={(e) => handleRecalculate(Number(e.target.value), calcApr, calcMonths)}
                    className="w-full accent-teal-500"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>GH₵ 500</span>
                    <span>GH₵ 100,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-500 uppercase">Annual Interest Rate (APR):</span>
                    <span className="text-base font-bold text-teal-700">{calcApr}% per annum</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={48}
                    step={0.5}
                    value={calcApr}
                    onChange={(e) => handleRecalculate(calcAmount, Number(e.target.value), calcMonths)}
                    className="w-full accent-teal-500"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>10% (Prime Bank)</span>
                    <span>48% (Micro-Credit Max)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-500 uppercase">Tenure (Months):</span>
                    <span className="text-base font-bold text-slate-950">{calcMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={48}
                    step={1}
                    value={calcMonths}
                    onChange={(e) => handleRecalculate(calcAmount, calcApr, Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>1 Month</span>
                    <span>48 Months</span>
                  </div>
                </div>
              </div>

              {/* Output Result Card */}
              <div className="md:col-span-5">
                <div className="p-6 rounded-2xl bg-slate-950 text-white shadow-xl relative overflow-hidden">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-teal-400 mb-2 font-bold">
                    Standard Amortization Breakdown
                  </div>

                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block">Estimated Monthly Payment</span>
                    <span className="text-3xl font-black font-mono text-amber-400">
                      GH₵ {calculation.monthlyPayment.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                      for {calculation.tenureMonths} consecutive months
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono pt-4 border-t border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Principal Borrowed:</span>
                      <span className="font-bold">GH₵ {calculation.principal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-teal-300">
                      <span>Total Interest Cost:</span>
                      <span className="font-bold">GH₵ {calculation.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-800 text-sm">
                      <span>Total Repayment:</span>
                      <span>GH₵ {calculation.totalRepayment.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-5 p-3 rounded-xl bg-slate-900 text-[10px] text-slate-400 font-mono leading-relaxed">
                    Disclaimer: Calculations use standard monthly reducing-balance formulas. Actual lender schedules may include loan origination fees, insurance, or statutory taxes.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: APR vs. Flat Rate Guide */}
        {activeTab === 'apr-vs-flat' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-950">
              Why "3% per month" is Not 36% APR: The Flat vs. Reducing Trap
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="text-sm font-bold text-amber-950 mb-2">Flat Rate (Often Misleading)</div>
                <p className="text-amber-900 mb-3">
                  Interest is calculated on the original principal for the entire loan life, even though you are steadily paying it down each month.
                </p>
                <div className="font-mono text-[11px] text-amber-950 bg-white/70 p-3 rounded-lg border border-amber-200">
                  Example: GH₵ 10,000 at 3% monthly flat for 12 months = GH₵ 3,600 total interest.<br/>
                  <strong>True Effective APR: ~58.2%!</strong>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200">
                <div className="text-sm font-bold text-teal-950 mb-2">Reducing Balance / True APR (Transparent)</div>
                <p className="text-teal-900 mb-3">
                  Interest is only charged on the outstanding balance remaining each month. As you pay down debt, your interest charges decrease.
                </p>
                <div className="font-mono text-[11px] text-teal-950 bg-white/70 p-3 rounded-lg border border-teal-200">
                  Example: GH₵ 10,000 at 30% APR reducing for 12 months = GH₵ 1,698 total interest.<br/>
                  <strong>Saves you over GH₵ 1,900 in total cost!</strong>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <strong>Oskai Standard:</strong> We require all listed lenders to disclose true annual percentage rates (APR) alongside raw nominal monthly rates so you never pay hidden surcharges.
            </div>
          </div>
        )}

        {/* Tab 3: Debt-to-Income (DTI) Check */}
        {activeTab === 'dti' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950 mb-2">
              Debt-to-Income (DTI) Health Check
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Responsible lending benchmarks suggest your total monthly debt repayments should generally not exceed <strong>35% - 40%</strong> of your verifiable net monthly income.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-500 mb-1">
                  Your Net Monthly Income (GH₵):
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full p-3 border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-none focus:border-teal-500"
                />
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  Estimated loan installment: GH₵ {calculation.monthlyPayment.toLocaleString()}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs font-mono uppercase text-slate-500">Your Calculated DTI Ratio</div>
                <div className={`text-3xl font-black font-mono mt-1 ${
                  dtiRatio <= 35 ? 'text-emerald-600' : dtiRatio <= 45 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {dtiRatio}%
                </div>
                <div className="text-xs font-medium mt-1">
                  {dtiRatio <= 35 ? (
                    <span className="text-emerald-700">Healthy debt load. Eligible for bank assessment.</span>
                  ) : dtiRatio <= 45 ? (
                    <span className="text-amber-700">Moderate burden. Consider longer tenure to reduce installment.</span>
                  ) : (
                    <span className="text-red-700">High debt risk. Lender approval probability is very low.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Predatory Scam Scanner */}
        {activeTab === 'scam-detector' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>How to Spot Fraudulent & Unlicensed Loan Scams</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Oskai protects users by enforcing statutory standards. Beware of fraudulent operators on social media using these common scam indicators:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                <strong className="block text-red-950 font-bold">❌ Advance "Loan Release" Fee Scam</strong>
                <p>Scammers ask you to send GHS 100 - GHS 500 via personal MoMo before they "release" a GHS 10,000 loan. <strong>No legitimate bank will ever ask for a cash deposit to unlock funds.</strong></p>
              </div>

              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                <strong className="block text-red-950 font-bold">❌ "100% Guaranteed Approval" Promise</strong>
                <p>Every genuine lender is legally required to assess creditworthiness. Anyone promising guaranteed approval without checking income is running a scam.</p>
              </div>

              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                <strong className="block text-red-950 font-bold">❌ WhatsApp-Only Operators with No Office</strong>
                <p>Always verify the lender is licensed by the Bank of Ghana with a physical registered address and official corporate domain.</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <strong className="block text-emerald-950 font-bold">✅ The Oskai Standard</strong>
                <p>We only list regulated institutions, provide verifiable application tracking codes, and use Bank of Ghana licensed payment channels (Paystack).</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
