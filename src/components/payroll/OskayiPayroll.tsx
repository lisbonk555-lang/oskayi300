import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, Globe, ShieldCheck, CheckCircle2, 
  AlertTriangle, Play, RefreshCw, Briefcase, FileCheck, Landmark
} from 'lucide-react';

interface PayrollEmployee {
  id: string;
  name: string;
  role: string;
  country: string;
  type: 'CONTRACTOR' | 'FULL_TIME_EMPLOYEE';
  salary_base_usd: number;
  local_currency: string;
  exchange_rate_to_usd: number;
  tax_statutory_deduction_pct: number;
  net_payout_local: number;
  last_paid_date: string;
  compliance_status: string;
}

interface TreasuryBalance {
  currency: 'USD' | 'EUR' | 'GBP';
  balance: number;
  allocated_to_payroll: number;
  available: number;
}

export const OskayiPayroll: React.FC = () => {
  const [employees, setEmployees] = useState<PayrollEmployee[]>([]);
  const [treasury, setTreasury] = useState<TreasuryBalance[]>([]);
  const [overview, setOverview] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'TEAM' | 'TREASURY' | 'AUDIT'>('TEAM');
  const [batchNotice, setBatchNotice] = useState<string | null>(null);

  // Compliance Audit Form
  const [auditWorkerName, setAuditWorkerName] = useState('Kwaku Darko');
  const [auditCountry, setAuditCountry] = useState('Ghana');
  const [auditHours, setAuditHours] = useState(40);
  const [auditExclusivity, setAuditExclusivity] = useState(true);
  const [auditHardware, setAuditHardware] = useState(true);
  const [auditRetainer, setAuditRetainer] = useState(true);
  const [auditResult, setAuditResult] = useState<any>(null);

  useEffect(() => {
    fetch('/api/payroll/employees')
      .then(res => res.json())
      .then(data => setEmployees(data || []))
      .catch(console.error);

    fetch('/api/payroll/treasury')
      .then(res => res.json())
      .then(data => setTreasury(data || []))
      .catch(console.error);

    fetch('/api/payroll/overview')
      .then(res => res.json())
      .then(data => setOverview(data))
      .catch(console.error);
  }, []);

  const handleExecuteBatch = async () => {
    try {
      const res = await fetch('/api/payroll/execute-batch', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setBatchNotice(`Global payroll batch ${data.batch_id} successfully dispatched to local clearing rails (ACH / SEPA / GhIPSS)!`);
        setTimeout(() => setBatchNotice(null), 8000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/payroll/audit-compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worker_name: auditWorkerName,
          country: auditCountry,
          hours_per_week: auditHours,
          exclusive_working_relationship: auditExclusivity,
          company_provides_equipment: auditHardware,
          fixed_monthly_retainer: auditRetainer
        })
      });
      const data = await res.json();
      if (data.success && data.audit) {
        setAuditResult(data.audit);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans pb-20">
      {/* Top Banner */}
      <div className="bg-[#0D1527] border-b border-emerald-500/20 px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-400 text-emerald-400 font-bold uppercase tracking-wider">
            OSKAYI GLOBAL PAYROLL & TREASURY
          </span>
          <span className="text-slate-400">100-Country Remote Workforce Clearing & Tax Compliance</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-300">
          <span>Fee: <strong className="text-emerald-400">$10 / Worker / Month</strong></span>
          <span>Settlement: <strong className="text-white">T+0 Local Rails</strong></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold tracking-wide uppercase">
              <Users className="w-4 h-4" />
              <span>International Remote Workforce Infrastructure</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Oskayi Payroll Global
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Pay remote developers and contractors across 100 countries in local currencies (GHS, NGN, KES, ZAR, EUR, GBP) with automatic statutory tax withholding and contractor misclassification risk auditing.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExecuteBatch}
              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center space-x-2 transition"
            >
              <Play className="w-4 h-4" />
              <span>1-Click Pay Entire Team</span>
            </button>
          </div>
        </div>

        {batchNotice && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center space-x-3 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{batchNotice}</span>
          </div>
        )}

        {/* Global Overview Cards */}
        {overview && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Supported Countries</div>
              <div className="text-2xl font-black text-white mt-1 font-mono">
                {overview.supported_countries} Nations
              </div>
              <div className="text-xs text-slate-400 mt-1">Global Employment Coverage</div>
            </div>

            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Monthly Payroll Run</div>
              <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                ${overview.monthly_payroll_run_usd.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">{overview.active_headcount} Workers Active</div>
            </div>

            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Compliance Audit Score</div>
              <div className="text-2xl font-black text-cyan-400 mt-1 font-mono">
                {overview.compliance_score_pct}%
              </div>
              <div className="text-xs text-slate-400 mt-1">IRS & IR35 Compliant</div>
            </div>

            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Pricing Tier</div>
              <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
                ${overview.pricing_per_worker_monthly_usd}/mo
              </div>
              <div className="text-xs text-slate-400 mt-1">Per Employee / Contractor</div>
            </div>
          </div>
        )}

        {/* Tab Controls */}
        <div className="mt-8 flex space-x-3 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('TEAM')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'TEAM'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Team & Local Payroll Roster ({employees.length})
          </button>
          <button
            onClick={() => setActiveTab('TREASURY')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'TREASURY'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Multi-Currency Treasury
          </button>
          <button
            onClick={() => setActiveTab('AUDIT')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'AUDIT'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Contractor vs Employee Compliance Auditor
          </button>
        </div>

        {/* Tab 1: Team & Payroll */}
        {activeTab === 'TEAM' && (
          <div className="mt-6 bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Active Global Workforce Roster</h3>
              <span className="text-xs text-slate-400">ExchangeRate.host Institutional Feed</span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 font-sans">Name & Role</th>
                    <th className="py-2.5 font-sans">Country</th>
                    <th className="py-2.5 font-sans">Status</th>
                    <th className="py-2.5 text-right font-sans">Base (USD)</th>
                    <th className="py-2.5 text-right font-sans">Tax Withheld</th>
                    <th className="py-2.5 text-right font-sans">Net Local Payout</th>
                    <th className="py-2.5 text-right font-sans">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {employees.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-800/30">
                      <td className="py-3 font-sans">
                        <div className="font-bold text-white">{emp.name}</div>
                        <div className="text-slate-400 text-xs">{emp.role}</div>
                      </td>

                      <td className="py-3 font-sans text-slate-300">
                        {emp.country}
                      </td>

                      <td className="py-3 font-sans">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          emp.type === 'FULL_TIME_EMPLOYEE'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {emp.type.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="py-3 text-right font-bold text-white">
                        ${emp.salary_base_usd.toLocaleString()}
                      </td>

                      <td className="py-3 text-right text-slate-400">
                        {emp.tax_statutory_deduction_pct}%
                      </td>

                      <td className="py-3 text-right font-bold text-emerald-400">
                        {emp.local_currency} {emp.net_payout_local.toLocaleString()}
                      </td>

                      <td className="py-3 text-right font-sans">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          emp.compliance_status === 'COMPLIANT'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {emp.compliance_status.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Multi-Currency Treasury */}
        {activeTab === 'TREASURY' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {treasury.map(t => (
              <div key={t.currency} className="bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold font-mono">
                    {t.currency} Treasury Vault
                  </span>
                  <Landmark className="w-4 h-4 text-slate-400" />
                </div>

                <div className="text-3xl font-black text-white mt-4 font-mono">
                  {t.currency === 'USD' ? '$' : t.currency === 'EUR' ? '€' : '£'}{t.balance.toLocaleString()}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Allocated for Payroll:</span>
                    <span className="text-amber-400">{t.currency === 'USD' ? '$' : t.currency === 'EUR' ? '€' : '£'}{t.allocated_to_payroll.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Available Liquidity:</span>
                    <span className="text-emerald-400 font-bold">{t.currency === 'USD' ? '$' : t.currency === 'EUR' ? '€' : '£'}{t.available.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Fund deposit gateway for ${t.currency} institutional wire account opened.`)}
                  className="mt-4 w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                >
                  Deposit {t.currency} Funds
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Compliance Auditor */}
        {activeTab === 'AUDIT' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>Statutory Risk Engine</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Contractor Misclassification Audit</h3>
              <p className="text-xs text-slate-400 mt-1">
                Evaluates worker engagement parameters against IRS 20-factor test, UK IR35, and local labor legislation.
              </p>

              <form onSubmit={handleRunAudit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Worker Name</label>
                  <input
                    type="text"
                    required
                    value={auditWorkerName}
                    onChange={e => setAuditWorkerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Worker Country</label>
                    <input
                      type="text"
                      required
                      value={auditCountry}
                      onChange={e => setAuditCountry(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hours / Week</label>
                    <input
                      type="number"
                      required
                      value={auditHours}
                      onChange={e => setAuditHours(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={auditExclusivity}
                      onChange={e => setAuditExclusivity(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <span>Exclusive working relationship (worker cannot take other clients)</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={auditHardware}
                      onChange={e => setAuditHardware(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <span>Company provides laptop and equipment</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={auditRetainer}
                      onChange={e => setAuditRetainer(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <span>Fixed monthly retainer paid regardless of deliverables</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition"
                >
                  Run Compliance Analysis
                </button>
              </form>
            </div>

            {/* Audit Output */}
            {auditResult && (
              <div className="bg-[#0E172A] border border-cyan-500/30 rounded-2xl p-6 space-y-4">
                <div className="text-xs text-cyan-400 font-mono uppercase font-bold tracking-wider">
                  Audit Findings
                </div>
                <h4 className="text-xl font-bold text-white">
                  Risk Assessment: {auditResult.audit_status.replace(/_/g, ' ')}
                </h4>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Misclassification Exposure:</span>
                    <span className="text-lg font-bold font-mono text-rose-400">{auditResult.risk_score_0_to_100} / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full ${auditResult.risk_score_0_to_100 >= 50 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                      style={{ width: `${auditResult.risk_score_0_to_100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-xs space-y-2">
                  <strong className="text-slate-300 block">Identified Exposure Factors:</strong>
                  {auditResult.statutory_flags.map((flag: string, idx: number) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-cyan-400">Remediation:</strong> {auditResult.remediation_recommendation}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
