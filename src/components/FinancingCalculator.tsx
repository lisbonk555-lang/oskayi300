import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Percent, Shield, FileSpreadsheet, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { FinancingCalculationResult } from '../types';

interface FinancingCalculatorProps {
  onApplyForFinancing: (principal: number, summaryText: string) => void;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({ onApplyForFinancing }) => {
  const [principalUSD, setPrincipalUSD] = useState<number>(5000000); // $5M USD default
  const [termYears, setTermYears] = useState<number>(10);
  const [annualRate, setAnnualRate] = useState<number>(6.5);
  const [graceMonths, setGraceMonths] = useState<number>(12);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);

  // Compute Amortization Mathematics
  const calculateFeasibility = (): FinancingCalculationResult => {
    const r = annualRate / 100 / 12;
    const totalPayments = termYears * 12;
    const amortizationPayments = Math.max(1, totalPayments - graceMonths);

    // Monthly payment during amortization period
    let monthlyPaymentUSD = 0;
    if (r > 0) {
      monthlyPaymentUSD = (principalUSD * r * Math.pow(1 + r, amortizationPayments)) / (Math.pow(1 + r, amortizationPayments) - 1);
    } else {
      monthlyPaymentUSD = principalUSD / amortizationPayments;
    }

    // Add 0.5% project insurance underwriting fee if toggled
    if (includeInsurance) {
      monthlyPaymentUSD += (principalUSD * 0.005) / 12;
    }

    const totalRepaymentUSD = (monthlyPaymentUSD * amortizationPayments) + (principalUSD * r * graceMonths);
    const totalInterestUSD = Math.max(0, totalRepaymentUSD - principalUSD);

    let structureRecommendation = "Standard Institutional Commercial Debt";
    if (principalUSD >= 10000000) {
      structureRecommendation = "Sovereign/PPP Multi-Tranche Syndicated Loan with Reinsurance Escrow";
    } else if (principalUSD >= 2000000) {
      structureRecommendation = "Structured Development Debt with Grace Period Escrow & Project Insurance";
    } else {
      structureRecommendation = "Commercial Bank Co-Financing & Instant Facility Guarantee";
    }

    // Generate concise amortization schedule preview (First 6 months + final summary)
    const schedule = [];
    let currentBalance = principalUSD;
    for (let month = 1; month <= Math.min(12, totalPayments); month++) {
      let interest = currentBalance * r;
      let principalPaid = 0;
      let payment = 0;

      if (month <= graceMonths) {
        payment = interest;
        principalPaid = 0;
      } else {
        payment = monthlyPaymentUSD;
        principalPaid = Math.min(currentBalance, payment - interest);
        currentBalance = Math.max(0, currentBalance - principalPaid);
      }

      schedule.push({
        periodMonth: month,
        paymentUSD: payment,
        principalPaidUSD: principalPaid,
        interestPaidUSD: interest,
        remainingBalanceUSD: currentBalance
      });
    }

    return {
      principalUSD,
      loanTermYears: termYears,
      interestRateAnnual: annualRate,
      gracePeriodMonths: graceMonths,
      monthlyPaymentUSD,
      totalInterestUSD,
      totalRepaymentUSD,
      structureRecommendation,
      schedule
    };
  };

  const result = calculateFeasibility();

  const handleProceedToInquiry = () => {
    const summary = `${(principalUSD / 1000000).toFixed(2)}M USD Project Loan over ${termYears} years at ${annualRate}% interest (${graceMonths}m grace period). Recommended Structure: ${result.structureRecommendation}`;
    onApplyForFinancing(principalUSD, summary);
  };

  return (
    <section id="calculator" className="py-16 bg-slate-50 text-slate-900 px-4 sm:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider border border-indigo-200">
            <Calculator className="w-3.5 h-3.5 text-indigo-700" />
            <span>Interactive Financial Engineering</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-950">
            Project Financing Feasibility Estimator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Estimate structured debt service, grace periods, and project insurance parameters for large-scale development financing coordinated via Oskayi Consult international capital partners.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column - White Card */}
          <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-sans text-xl font-bold text-indigo-950 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                Capital Parameters
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Adjust project loan size, tenure, and grace terms to calculate debt coverage.
              </p>
            </div>

            {/* Principal Slider & Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700">Project Principal Request (USD)</label>
                <span className="font-mono font-bold text-indigo-600 text-base">
                  ${principalUSD.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min={250000}
                max={50000000}
                step={250000}
                value={principalUSD}
                onChange={(e) => setPrincipalUSD(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$250k USD</span>
                <span>$10M USD</span>
                <span>$50M USD</span>
              </div>
            </div>

            {/* Loan Tenure & Interest Rate */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  Loan Term (Years)
                </label>
                <select
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
                >
                  <option value={3}>3 Years (Short-Term Facility)</option>
                  <option value={5}>5 Years (Medium Development)</option>
                  <option value={10}>10 Years (Infrastructure Debt)</option>
                  <option value={15}>15 Years (Sovereign/PPP Debt)</option>
                  <option value={20}>20 Years (Major Asset Finance)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-indigo-600" />
                  Estimated Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="18.0"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Grace Period & Insurance Toggles */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Grace Period (Months)</label>
                <select
                  value={graceMonths}
                  onChange={(e) => setGraceMonths(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
                >
                  <option value={0}>0 Months (Immediate Repayment)</option>
                  <option value={6}>6 Months (Construction Period)</option>
                  <option value={12}>12 Months (Standard Infrastructure)</option>
                  <option value={24}>24 Months (Extended Commissioning)</option>
                </select>
              </div>

              <div className="space-y-2 flex flex-col justify-end">
                <label className="inline-flex items-center gap-2 cursor-pointer p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-600 bg-white border-slate-300"
                  />
                  <span className="text-xs font-medium text-slate-700">Include Project Reinsurance (0.5% p.a.)</span>
                </label>
              </div>
            </div>

          </div>

          {/* Results Display Panel - Deep Indigo Card */}
          <div className="lg:col-span-6 bg-indigo-950 p-8 rounded-2xl border border-indigo-900 text-white space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-indigo-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Financial Projection</span>
                <h3 className="font-sans text-xl font-bold text-white mt-0.5">Estimated Debt Service</h3>
              </div>
              <div className="p-2.5 bg-indigo-900 border border-indigo-700 rounded-xl">
                <TrendingUp className="w-5 h-5 text-amber-300" />
              </div>
            </div>

            {/* Key Output Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-indigo-900/60 border border-indigo-800 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">Monthly Debt Payment</span>
                <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono">
                  ${Math.round(result.monthlyPaymentUSD).toLocaleString()} <span className="text-xs text-indigo-200 font-normal">USD/mo</span>
                </div>
                <div className="text-[10px] text-indigo-200/80">
                  Approx ~GHS {(Math.round(result.monthlyPaymentUSD) * 15.45).toLocaleString()} / month
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-900/60 border border-indigo-800 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">Total Interest & Underwriting</span>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  ${Math.round(result.totalInterestUSD).toLocaleString()} <span className="text-xs text-indigo-200 font-normal">USD</span>
                </div>
                <div className="text-[10px] text-indigo-200/80">Over {termYears} years tenure</div>
              </div>
            </div>

            {/* Recommended Advisory Structure */}
            <div className="p-4 rounded-xl bg-indigo-900/80 border border-indigo-800 space-y-2">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                Recommended Capital Advisory Structure:
              </div>
              <div className="text-sm font-bold text-white font-sans">
                {result.structureRecommendation}
              </div>
              <p className="text-xs text-indigo-100/80 leading-relaxed font-sans">
                This structure incorporates international integrated partner underwriting, escrow accounts in Ghana/international banks, and compliance with Central Bank & Ministries standards.
              </p>
            </div>

            {/* Amortization Schedule Preview */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-indigo-200 flex items-center justify-between">
                <span>First 6 Months Repayment Schedule Preview</span>
                <span className="text-[10px] text-indigo-300 font-mono">Principal: ${principalUSD.toLocaleString()} USD</span>
              </div>
              
              <div className="overflow-x-auto rounded-xl border border-indigo-800">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="bg-indigo-900 text-indigo-300 border-b border-indigo-800">
                    <tr>
                      <th className="p-2.5">Month</th>
                      <th className="p-2.5">Payment</th>
                      <th className="p-2.5">Interest</th>
                      <th className="p-2.5">Remaining Principal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-900 bg-indigo-950/80 text-indigo-100">
                    {result.schedule.slice(0, 6).map((item) => (
                      <tr key={item.periodMonth}>
                        <td className="p-2.5 font-bold text-amber-300">Month {item.periodMonth}</td>
                        <td className="p-2.5">${Math.round(item.paymentUSD).toLocaleString()}</td>
                        <td className="p-2.5 text-indigo-300">${Math.round(item.interestPaidUSD).toLocaleString()}</td>
                        <td className="p-2.5 text-white">${Math.round(item.remainingBalanceUSD).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={handleProceedToInquiry}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <span>Submit Feasibility Request To Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
