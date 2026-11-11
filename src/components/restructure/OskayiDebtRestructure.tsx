import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  ShieldCheck, 
  TrendingDown, 
  DollarSign, 
  Layers, 
  Clock, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Vote
} from 'lucide-react';
import { CreditorClaim, RestructuringProposal } from '../../server/oskayiRestructureService';

export const OskayiDebtRestructure: React.FC = () => {
  const [claims, setClaims] = useState<CreditorClaim[]>([]);
  const [proposals, setProposals] = useState<RestructuringProposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<RestructuringProposal | null>(null);
  
  // Custom Proposal Builder Inputs
  const [proposalTitle, setProposalTitle] = useState<string>('G20 Common Framework Comprehensive Relief Plan');
  const [haircutPct, setHaircutPct] = useState<number>(30);
  const [maturityExt, setMaturityExt] = useState<number>(10);
  const [newCoupon, setNewCoupon] = useState<number>(4.5);
  const [gracePeriod, setGracePeriod] = useState<number>(3);
  const [calculatedRelief, setCalculatedRelief] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const fetchRestructureData = async () => {
    try {
      const [cRes, pRes] = await Promise.all([
        fetch('/api/restructure/claims'),
        fetch('/api/restructure/proposals')
      ]);
      if (cRes.ok) setClaims(await cRes.json());
      if (pRes.ok) {
        const pList: RestructuringProposal[] = await pRes.json();
        setProposals(pList);
        if (!selectedProposal && pList.length > 0) setSelectedProposal(pList[0]);
      }
    } catch (e) {
      console.error('Failed to load restructure data:', e);
    }
  };

  useEffect(() => {
    fetchRestructureData();
  }, []);

  const handleRecalculate = async () => {
    try {
      const res = await fetch('/api/restructure/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          haircutPct,
          maturityExtensionYears: maturityExt,
          newCouponPct: newCoupon,
          gracePeriodYears: gracePeriod
        })
      });
      if (res.ok) {
        setCalculatedRelief(await res.json());
      }
    } catch (e) {
      console.error('Recalculate error:', e);
    }
  };

  useEffect(() => {
    handleRecalculate();
  }, [haircutPct, maturityExt, newCoupon, gracePeriod]);

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/restructure/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalTitle,
          proposedBy: 'Official Creditor Committee Co-Chairs (France & China)',
          haircutPct,
          maturityExtensionYears: maturityExt,
          newCouponPct: newCoupon,
          gracePeriodYears: gracePeriod
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSuccessBanner(`Proposal ${data.proposal.id} published to sovereign negotiation ledger. Collective Action Clause (CAC) voting initiated.`);
        await fetchRestructureData();
      }
    } catch (e) {
      console.error('Create proposal error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatUsd = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans">
      {/* Top Sovereign Restructuring Ribbon */}
      <div className="bg-[#0E1326] border-b border-amber-500/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 flex items-center justify-center shadow-lg shadow-amber-950">
            <Scale className="w-6 h-6 text-[#070913]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-wider">
                OSKAYI DEBT RESTRUCTURE GLOBAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                G20 COMMON FRAMEWORK & PARIS CLUB CAC NEGOTIATION DESK
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Multiparty Sovereign Restructuring Room • China Exim, Paris Club, Eurobond Holders & IMF
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          <span>Legally Binding CAC Threshold: 75% Majority</span>
        </span>
      </div>

      {successBanner && (
        <div className="bg-emerald-950 border-b border-emerald-500/40 px-4 py-2 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: All Creditor Claims Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0E1326]/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Creditor Committee Claims ({claims.length})
              </span>
              <span className="text-slate-400">World Bank IDS</span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {claims.map(c => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl bg-[#090D1C] border border-slate-800 text-xs font-mono space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-white text-xs block">{c.creditor_name}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{c.category.replace(/_/g, ' ')}</span>
                    </div>
                    <span className="font-bold text-amber-400 text-sm">
                      {formatUsd(c.principal_outstanding_usd)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Coupon: {c.original_interest_rate_pct}%</span>
                    <span>Maturity: {c.original_maturity_year}</span>
                    <span className="text-emerald-400">Voted: {c.voted_approval_pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Interactive Proposal Modeling Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleCreateProposal} className="bg-[#0E1326]/90 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Sovereign Proposal Modeling Engine
              </span>
              <span className="text-slate-400 text-[10px] font-mono">NPV 5% Discount Benchmark</span>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Proposal Term Sheet Title</label>
              <input
                type="text"
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                className="w-full bg-[#090D1C] border border-slate-800 rounded-xl p-2.5 text-white text-xs font-sans"
              />
            </div>

            {/* Slider 1: Haircut % */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">Principal Haircut:</span>
                <span className="font-bold text-red-400">{haircutPct}% Discount</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={haircutPct}
                onChange={(e) => setHaircutPct(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Slider 2: Maturity Extension */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">Maturity Extension:</span>
                <span className="font-bold text-blue-400">+{maturityExt} Years Extension</span>
              </div>
              <input
                type="range"
                min="3"
                max="20"
                value={maturityExt}
                onChange={(e) => setMaturityExt(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Slider 3: Step-up Coupon Reduction */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">New Restructured Coupon:</span>
                <span className="font-bold text-emerald-400">{newCoupon}% (Reduced from 8.65%)</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="7.0"
                step="0.25"
                value={newCoupon}
                onChange={(e) => setNewCoupon(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Calculated Relief Metrics Box */}
            {calculatedRelief && (
              <div className="p-4 rounded-xl bg-[#090D1C] border border-amber-500/30 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Estimated Debt Relief:</span>
                  <span className="font-black text-emerald-400 text-sm">
                    {formatUsd(calculatedRelief.totalReliefUsd)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Net Present Value (NPV) Relief:</span>
                  <span className="font-black text-amber-400 text-sm">
                    {calculatedRelief.npvDebtReliefPct}%
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800 font-sans">
                  {calculatedRelief.comparabilityScore}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-[#070913] font-black text-xs uppercase tracking-wider font-mono shadow-lg"
            >
              {isSubmitting ? 'Transmitting to Creditors...' : 'Publish Formal Proposal to Creditor Committee'}
            </button>
          </form>
        </div>

        {/* Right Column: Collective Action Clause (CAC) Voting & Transparency Ledger (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#0E1326]/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-3 text-xs font-mono">
            <span className="font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Vote className="w-4 h-4" />
              CAC Voting Threshold Tracker
            </span>
            <p className="text-slate-400 text-[11px] font-sans">
              Under English law collective action clauses (CACs), achieving 75% aggregated approval legally binds 100% of rogue holdout bondholders.
            </p>

            <div className="p-3 rounded-xl bg-[#090D1C] border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Aggregated Vote:</span>
                <span className="font-black text-emerald-400 text-sm">78.4% APPROVAL</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div style={{ width: '78.4%' }} className="h-full bg-emerald-500" />
              </div>
              <div className="text-[10px] text-emerald-300 font-bold text-center">
                ✓ SUPERMAJORITY THRESHOLD PASSED (Binds Holdouts)
              </div>
            </div>

            {/* Active Ratified Proposals */}
            <div className="space-y-2 pt-2">
              <span className="font-bold text-slate-300 uppercase block text-[10px]">
                Ratified Restructuring Terms ({proposals.length}):
              </span>
              {proposals.map(p => (
                <div key={p.id} className="p-2.5 rounded-lg bg-[#090D1C] border border-slate-800 text-[10px] space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>{p.id}</span>
                    <span className="text-emerald-400">{p.npv_debt_relief_pct}% NPV RELIEF</span>
                  </div>
                  <div className="text-slate-400 truncate">{p.proposal_title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
