import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Scale, Building2, Globe, FileText, 
  ArrowRight, CheckCircle2, TrendingUp, AlertTriangle, Briefcase, Plus, Gavel
} from 'lucide-react';

interface DefaultedDebtCase {
  id: string;
  debtor_name: string;
  debtor_type: 'SOVEREIGN' | 'STATE_OWNED_ENTERPRISE' | 'CORPORATE' | 'SUB_NATIONAL';
  country: string;
  face_value_usd: number;
  original_currency: string;
  maturity_year: number;
  coupon_rate_pct: number;
  governing_law: string;
  creditor_institution: string;
  status: string;
  recovery_target_pct: number;
  estimated_recovery_value_usd: number;
  created_at: string;
  world_bank_ids_risk_rating: string;
  imf_article_iv_summary: string;
  recommended_pathway: string;
  pathway_reasoning: string;
  action_plan_steps: string[];
}

interface DistressedMarketListing {
  id: string;
  case_id: string;
  title: string;
  country: string;
  debtor_type: string;
  face_value_usd: number;
  asking_price_cents_on_dollar: number;
  total_asking_price_usd: number;
  accrued_interest_usd: number;
  lma_lsta_standard: boolean;
  kyc_verified_buyer_only: boolean;
  success_fee_pct: number;
  bids_count: number;
  highest_bid_cents: number;
}

export const OskayiDebtCollector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CASES' | 'MARKETPLACE' | 'NEW_CLAIM'>('CASES');
  const [cases, setCases] = useState<DefaultedDebtCase[]>([]);
  const [marketplace, setMarketplace] = useState<DistressedMarketListing[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [selectedCase, setSelectedCase] = useState<DefaultedDebtCase | null>(null);

  // New Claim Form
  const [debtorName, setDebtorName] = useState('');
  const [debtorType, setDebtorType] = useState<'SOVEREIGN' | 'STATE_OWNED_ENTERPRISE' | 'CORPORATE' | 'SUB_NATIONAL'>('SOVEREIGN');
  const [country, setCountry] = useState('Ghana');
  const [faceValueUsd, setFaceValueUsd] = useState(25000000);
  const [maturityYear, setMaturityYear] = useState(2027);
  const [couponRate, setCouponRate] = useState(8.5);
  const [governingLaw, setGoverningLaw] = useState<'NEW_YORK' | 'ENGLISH_LAW' | 'OHADA_AFRICA' | 'SINGAPORE_ICMA'>('ENGLISH_LAW');
  const [creditorInstitution, setCreditorInstitution] = useState('');
  const [claimSuccessMsg, setClaimSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/debt-collector/cases')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCases(data);
          if (data.length > 0) setSelectedCase(data[0]);
        }
      })
      .catch(console.error);

    fetch('/api/debt-collector/marketplace')
      .then(res => res.json())
      .then(data => setMarketplace(data || []))
      .catch(console.error);

    fetch('/api/debt-collector/metrics')
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(console.error);
  }, []);

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtorName || !creditorInstitution) return;

    try {
      const res = await fetch('/api/debt-collector/submit-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          debtor_name: debtorName,
          debtor_type: debtorType,
          country,
          face_value_usd: faceValueUsd,
          original_currency: 'USD',
          maturity_year: maturityYear,
          coupon_rate_pct: couponRate,
          governing_law: governingLaw,
          creditor_institution: creditorInstitution
        })
      });
      const data = await res.json();
      if (data.success && data.case) {
        setCases(prev => [data.case, ...prev]);
        setSelectedCase(data.case);
        setActiveTab('CASES');
        setClaimSuccessMsg(`Claim registered successfully under case ID ${data.case.id}. AI legal triage initiated.`);
        setTimeout(() => setClaimSuccessMsg(null), 6000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#060A13] text-slate-100 font-sans pb-20">
      {/* Institutional Top Bar */}
      <div className="bg-[#0B1220] border-b border-indigo-500/20 px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-400 text-indigo-400 font-bold uppercase tracking-wider">
            OSKAYI INSTITUTIONAL DEBT RECOVERY
          </span>
          <span className="text-slate-400">Legal Sovereign & High-Value Distressed Claims Resolution</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-300">
          <span>Standards: <strong className="text-white">LMA / LSTA Distressed Trading</strong></span>
          <span>Success Fee: <strong className="text-emerald-400">5.0% Institutional Cap</strong></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
              <Scale className="w-4 h-4" />
              <span>Institutional Legal Finance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Oskayi Debt Collector AI
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Legal global recovery platform for commercial banks, private debt funds, and sovereign bondholders. Integrates World Bank IDS and IMF macro data across 4 structured recovery pathways.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('NEW_CLAIM')}
              className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 flex items-center space-x-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Register Defaulted Claim</span>
            </button>
          </div>
        </div>

        {/* Global Metrics Bar */}
        {metrics && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Managed Face Value</div>
              <div className="text-2xl font-black text-white mt-1 font-mono">
                ${(metrics.total_managed_face_value_usd / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-slate-400 mt-1">Across 4 Legal Jurisdictions</div>
            </div>

            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Projected Net Recovery</div>
              <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                ${(metrics.total_projected_recovery_usd / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-emerald-400 mt-1 font-semibold">
                Recovery Rate: {metrics.overall_recovery_rate_pct}%
              </div>
            </div>

            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Active Legal Cases</div>
              <div className="text-2xl font-black text-indigo-400 mt-1 font-mono">
                {metrics.active_cases_count} Dossiers
              </div>
              <div className="text-xs text-slate-400 mt-1">SDNY, London, OHADA</div>
            </div>

            <div className="bg-[#0E172A] border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 uppercase">Marketplace Volume</div>
              <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
                {metrics.marketplace_listings_count} Live Listings
              </div>
              <div className="text-xs text-slate-400 mt-1">Secondary Debt Transfers</div>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="mt-8 flex space-x-3 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('CASES')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'CASES'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active Recovery Cases ({cases.length})
          </button>
          <button
            onClick={() => setActiveTab('MARKETPLACE')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'MARKETPLACE'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Distressed Debt Marketplace ({marketplace.length})
          </button>
          <button
            onClick={() => setActiveTab('NEW_CLAIM')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'NEW_CLAIM'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            + Register New Claim
          </button>
        </div>

        {claimSuccessMsg && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center space-x-2 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{claimSuccessMsg}</span>
          </div>
        )}

        {/* Tab 1: Cases View */}
        {activeTab === 'CASES' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List of cases */}
            <div className="space-y-3">
              {cases.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedCase?.id === c.id
                      ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                      : 'bg-[#0E172A] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-400 font-mono font-bold">
                      {c.debtor_type}
                    </span>
                    <span className="text-slate-400 font-mono">${(c.face_value_usd / 1000000).toFixed(1)}M USD</span>
                  </div>
                  <h4 className="font-bold text-sm mt-2 text-white">{c.debtor_name}</h4>
                  <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                    <span>{c.country} • {c.governing_law.replace(/_/g, ' ')}</span>
                    <span className="text-emerald-400 font-semibold">{c.recovery_target_pct}% Target</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Case Details View */}
            {selectedCase && (
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <div className="text-xs text-indigo-400 font-mono font-bold">{selectedCase.id}</div>
                      <h3 className="text-xl font-black text-white mt-0.5">{selectedCase.debtor_name}</h3>
                      <div className="text-xs text-slate-400 mt-1">
                        Creditor: <strong className="text-slate-200">{selectedCase.creditor_institution}</strong>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Recovery Pathway</div>
                      <span className="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                        {selectedCase.recommended_pathway.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Financial Metrics */}
                  <div className="grid grid-cols-3 gap-4 mt-6 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">Face Value</div>
                      <div className="text-lg font-bold text-white mt-1">${selectedCase.face_value_usd.toLocaleString()}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">Target Recovery</div>
                      <div className="text-lg font-bold text-emerald-400 mt-1">${selectedCase.estimated_recovery_value_usd.toLocaleString()}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">World Bank IDS Risk</div>
                      <div className="text-sm font-bold text-amber-400 mt-1">{selectedCase.world_bank_ids_risk_rating}</div>
                    </div>
                  </div>

                  {/* IMF & Macro Analysis */}
                  <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                      <FileText className="w-4 h-4" />
                      <span>IMF Article IV & Macro Debt Sustainability Audit</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {selectedCase.imf_article_iv_summary}
                    </p>
                    <div className="mt-3 text-xs text-slate-400">
                      <strong className="text-white">AI Strategy:</strong> {selectedCase.pathway_reasoning}
                    </div>
                  </div>

                  {/* Action Steps */}
                  <div className="mt-6">
                    <h4 className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-3">
                      Institutional Execution Plan (UNCITRAL / ICMA Protocol)
                    </h4>
                    <div className="space-y-2">
                      {selectedCase.action_plan_steps.map((step, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start space-x-3 text-xs">
                          <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold font-mono flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-slate-200">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Secondary Marketplace */}
        {activeTab === 'MARKETPLACE' && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <strong>Notice:</strong> The secondary distressed debt marketplace is restricted to KYC-vetted institutional buyers. Trades settle under LMA (Loan Market Association) or LSTA standard assignment documentation.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplace.map(item => (
                <div key={item.id} className="bg-[#0E172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono font-bold">
                        {item.debtor_type}
                      </span>
                      <span className="text-slate-400">{item.country}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm mt-2">{item.title}</h4>

                    <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
                      <div className="flex justify-between text-slate-400">
                        <span>Face Value:</span>
                        <span className="text-white">${item.face_value_usd.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Asking Price:</span>
                        <span className="text-amber-400 font-bold">{item.asking_price_cents_on_dollar}¢ on the dollar</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Total Cash Price:</span>
                        <span className="text-emerald-400 font-bold">${item.total_asking_price_usd.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Accrued Interest:</span>
                        <span className="text-slate-300">${item.accrued_interest_usd.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Highest Bid: <strong className="text-white font-mono">{item.highest_bid_cents}¢</strong> ({item.bids_count} bids)
                    </div>
                    <button
                      onClick={() => alert(`Submitting institutional bid for ${item.title}. An Oskayi debt recovery officer will contact your legal counsel.`)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition"
                    >
                      Place Bid
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Register New Claim Form */}
        {activeTab === 'NEW_CLAIM' && (
          <div className="mt-6 max-w-2xl mx-auto bg-[#0E172A] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Gavel className="w-4 h-4" />
              <span>Institutional Onboarding</span>
            </div>
            <h3 className="text-2xl font-black text-white mt-1">Register Defaulted Loan or Bond Claim</h3>
            <p className="text-xs text-slate-400 mt-1">
              Provide instrument particulars. Our legal AI will cross-reference World Bank and IMF debt records to recommend an optimal recovery plan.
            </p>

            <form onSubmit={handleSubmitClaim} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Debtor Entity Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Republic of Zambia 2024 Eurobond or African Port Logistics SOE"
                  value={debtorName}
                  onChange={e => setDebtorName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Debtor Type</label>
                  <select
                    value={debtorType}
                    onChange={e => setDebtorType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="SOVEREIGN">Sovereign State</option>
                    <option value="STATE_OWNED_ENTERPRISE">State-Owned Enterprise (SOE)</option>
                    <option value="CORPORATE">Private High-Yield Corporate</option>
                    <option value="SUB_NATIONAL">Sub-national / Municipal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Jurisdiction / Country</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Face Value (USD)</label>
                  <input
                    type="number"
                    required
                    value={faceValueUsd}
                    onChange={e => setFaceValueUsd(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Governing Law</label>
                  <select
                    value={governingLaw}
                    onChange={e => setGoverningLaw(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="ENGLISH_LAW">English Law (ICMA Standard)</option>
                    <option value="NEW_YORK">New York Law (SDNY Jurisdiction)</option>
                    <option value="OHADA_AFRICA">OHADA Uniform Commercial Act (West/Central Africa)</option>
                    <option value="SINGAPORE_ICMA">Singapore Arbitration (SIAC)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Claimant Institution / Fund Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Emerging Market Credit Fund"
                  value={creditorInstitution}
                  onChange={e => setCreditorInstitution(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
                Oskayi charges a standard <strong>5.0% success fee</strong> upon fund recovery or secondary debt assignment settlement.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition flex items-center justify-center space-x-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Submit Claim for AI Legal Triage</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
