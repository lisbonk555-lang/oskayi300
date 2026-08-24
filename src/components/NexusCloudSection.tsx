import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Globe, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Database, 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Terminal,
  FileCheck,
  Building2,
  ExternalLink,
  ChevronRight,
  X,
  Copy,
  Check
} from 'lucide-react';
import { FinastraLogo } from './FinastraLogo';

interface NexusCloudSectionProps {
  onNavigateNexusCloud: () => void;
  onInitiateInquiry: (serviceTitle: string) => void;
}

export const NexusCloudSection: React.FC<NexusCloudSectionProps> = ({
  onNavigateNexusCloud,
  onInitiateInquiry
}) => {
  const [activeModal, setActiveModal] = useState<'apis' | 'dashboard' | null>(null);
  const [selectedApiCategory, setSelectedApiCategory] = useState<string>('Loan IQ');
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const finastraEndpoints = [
    {
      module: "Loan IQ",
      name: "Syndicated Loan Servicing & Book Building",
      path: "POST /v2/finastra/loan-iq/syndicate/book-build",
      description: "Automated multi-bank book-building, lender commitment aggregation, and pro-rata tranche structuring.",
      payload: {
        facility_name: "Ghana Housing Finance Syndicate 01",
        syndicate_lead: "Oskayi Consult x Finastra Fusion",
        facility_amount_usd: 500000000,
        currency: "USD",
        participating_institutions: 12,
        tenor_months: 120,
        margin_spread_bps: 275,
        reinsurance_shield_status: "ACTIVE_100_PERCENT"
      },
      response: {
        loan_iq_deal_id: "LIQ_DEAL_99841_ACCRA",
        syndication_status: "OVERSUBSCRIBED_142_PCT",
        allocated_commitments_usd: 500000000,
        settlement_engine: "NEXUS_SETTLEMENT_RAIL_V2",
        auto_compliance_pass: true
      }
    },
    {
      module: "LenderComm",
      name: "Real-Time Agent-to-Lender Position Management",
      path: "GET /v2/finastra/lendercomm/positions?facility=LIQ_DEAL_99841",
      description: "Eliminates fax/email lag by streaming real-time position notices, interest calculations, and rollover notices across all syndicating banks.",
      payload: null,
      response: {
        active_lenders: 12,
        total_facility_drawn: "$120,000,000 USD",
        next_rollover_date: "2026-09-15",
        verified_notices_broadcast: 48,
        data_reconciliation_lag_ms: 4
      }
    },
    {
      module: "CreditQuest",
      name: "Automated Commercial Credit & Risk Scoring",
      path: "POST /v2/finastra/creditquest/evaluate-mandate",
      description: "Financial statement analysis, probability of default (PD) modeling, and regulatory risk categorization.",
      payload: {
        borrower_type: "MUNICIPAL_DEVELOPMENT_AUTHORITY",
        underlying_cashflow_model: "HOUSING_REVENUE_ESCROW",
        debt_service_coverage_ratio: 2.84,
        jurisdiction: "GHANA"
      },
      response: {
        risk_grade: "AAA_WRAPPED",
        credit_approval_status: "PRE_APPROVED",
        max_facility_capacity_usd: 2500000000,
        required_reinsurance_wrap_bps: 45
      }
    },
    {
      module: "Payments To Go",
      name: "High-Volume Cross-Border Clearing & Settlement",
      path: "POST /v2/finastra/payments-to-go/disburse-tranche",
      description: "Cloud-native ISO 20022 payments engine executing sub-second cross-border disbursements into local African RTGS and global SWIFT rails.",
      payload: {
        disbursement_id: "TRN_DISB_004",
        amount_usd: 25000000,
        target_currency: "GHS",
        fx_rate_locked: 15.42,
        milestone_proof_hash: "0x9812fec...331a"
      },
      response: {
        payment_status: "SETTLED_INSTANT",
        routing_path: "FINASTRA_FUSION_GLOBAL_RAILS",
        settlement_timestamp: "2026-08-23T21:28:00Z"
      }
    },
    {
      module: "Trade Finance",
      name: "Letters of Credit & Sovereign Guarantee Escrow",
      path: "POST /v2/finastra/trade/guarantee-wrap",
      description: "Digitized letters of credit, performance bonds, and collateral management for large-scale infrastructure procurement.",
      payload: {
        instrument_type: "STANDBY_LETTER_OF_CREDIT",
        beneficiary: "MINISTRY_WORKS_HOUSING",
        validity_years: 5
      },
      response: {
        guarantee_reference: "SBLC_OSKAYI_FINASTRA_8891",
        status: "ISSUED_AND_BOUND"
      }
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section 
      id="nexus-cloud-section" 
      className="relative bg-slate-950 text-white pt-20 pb-24 px-4 sm:px-8 border-b border-indigo-900/60 overflow-hidden font-sans"
    >
      {/* Dynamic Purple/Violet Ambient Glows (Finastra Signature) */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Top Header & Finastra Integration Banner */}
        <div className="space-y-6 max-w-4xl">
          
          <div className="flex flex-wrap items-center gap-3">
            <FinastraLogo variant="badge" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Finastra-Powered Core</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Insured Settlement</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              NEXUS CLOUD
            </h2>
            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-amber-300">
              The OS of Global Finance
            </div>
            <p className="text-amber-300/90 font-mono text-sm sm:text-base font-bold">
              The Operating System Powering Syndicated Lending Across Ghana, Africa & The World
            </p>
          </div>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
            NEXUS CLOUD is not a lending platform. It is the Operating System for global syndicated finance. Built on Finastra's world-leading infrastructure that powers 70% of the world's syndicated loans, NEXUS unifies origination, syndication, payments, and compliance into one end-to-end API.
          </p>

          {/* Built For Highlights */}
          <div className="pt-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block mb-2.5">
              Architected & Built For:
            </span>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 transition-colors space-y-1">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Ghana's Housing Revolution</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Unlocking scalable mortgage & municipal construction syndication with zero credit risk.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 transition-colors space-y-1">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Africa's Commercial Lending Gap</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Bridging the $330B SME and commercial trade financing deficit through multi-bank liquidity.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 transition-colors space-y-1">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Global Syndicated Loan Market</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Direct API integration with the $5.4 Trillion global syndicated lending and book-building market.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Enterprise Features Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Core Enterprise Pillars (Finastra Fusion Architecture)
            </span>
            <span className="text-xs font-mono text-purple-300">
              200+ Endpoints Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Feature 1: End-to-End Finastra APIs */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 hover:border-purple-400 transition-all space-y-3 group hover:shadow-xl hover:shadow-purple-950/50">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                End-to-End Finastra APIs
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                200+ endpoints across Loan IQ, LenderComm, CreditQuest, Payments To Go, and Trade Finance unified into one single integration.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/60 text-purple-200 border border-purple-500/30">
                  Loan IQ
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/60 text-purple-200 border border-purple-500/30">
                  LenderComm
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/60 text-purple-200 border border-purple-500/30">
                  CreditQuest
                </span>
              </div>
            </div>

            {/* Feature 2: Syndication OS */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 hover:border-purple-400 transition-all space-y-3 group hover:shadow-xl hover:shadow-purple-950/50">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                Syndication OS
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Multi-bank book-building, automated lender position management, and real-time deal data sharing between agents and participant banks.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-900/40 text-amber-200 border border-amber-500/30">
                  Book Building
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-900/40 text-amber-200 border border-amber-500/30">
                  Sub-second Positions
                </span>
              </div>
            </div>

            {/* Feature 3: Global Payments Rail */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 hover:border-purple-400 transition-all space-y-3 group hover:shadow-xl hover:shadow-purple-950/50">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-sky-300 transition-colors">
                Global Payments Rail
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Cross-border disbursements, collections, and settlement across 180+ countries with deep African mobile money and RTGS routing.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-900/40 text-sky-200 border border-sky-500/30">
                  ISO 20022
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-900/40 text-sky-200 border border-sky-500/30">
                  35+ African Currencies
                </span>
              </div>
            </div>

            {/* Feature 4: Embedded Compliance */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 hover:border-purple-400 transition-all space-y-3 group hover:shadow-xl hover:shadow-purple-950/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                Embedded Compliance
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Automated KYC, AML sanction screening, cryptographic eSign, and probability-of-default risk scoring built directly for institutional banks.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-900/40 text-emerald-200 border border-emerald-500/30">
                  Bank of Ghana / FATF
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-900/40 text-emerald-200 border border-emerald-500/30">
                  100% Reinsurance
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Stats Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-400/50 flex items-center justify-center shrink-0 text-purple-300">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                Finastra Global Market Power
              </span>
              <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                70% of World Syndicated Loans Powered
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-purple-500/30 hidden md:block" />

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              Unified Endpoints
            </span>
            <div className="text-lg sm:text-xl font-black text-white tracking-tight">
              200+ APIs Active
            </div>
          </div>

          <div className="h-8 w-px bg-purple-500/30 hidden md:block" />

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Sovereign Execution Corridor
            </span>
            <div className="text-lg sm:text-xl font-black text-white tracking-tight">
              Ghana → Africa → Global
            </div>
          </div>
        </div>

        {/* CTA Buttons Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-indigo-900/60 pt-8">
          
          <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
            {/* Button 1: Explore APIs */}
            <button
              onClick={() => setActiveModal('apis')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 active:scale-95"
            >
              <Code2 className="w-4 h-4 text-purple-200" />
              <span>Explore APIs</span>
            </button>

            {/* Button 2: View Live Dashboard - Finastra Fusion */}
            <button
              onClick={() => setActiveModal('dashboard')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/40 hover:border-purple-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Activity className="w-4 h-4 text-purple-400" />
              <span>View Live Dashboard - Finastra Fusion</span>
            </button>

            {/* Button 3: Request Global Access */}
            <button
              onClick={() => onInitiateInquiry('NEXUS CLOUD Global Access & Mandate Registration')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 active:scale-95"
            >
              <Zap className="w-4 h-4 text-indigo-950" />
              <span>Request Global Access</span>
            </button>
          </div>

          <button
            onClick={onNavigateNexusCloud}
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 group transition-colors"
          >
            <span>Open Dedicated Nexus Cloud Portal</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Modal 1: Interactive Finastra API Explorer */}
      {activeModal === 'apis' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl w-full max-w-4xl p-5 sm:p-7 space-y-5 shadow-2xl text-white font-mono text-xs my-auto max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-sans">
                    NEXUS CLOUD • 200+ Finastra Fusion APIs
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Unified OpenAPI Specification for Global Syndicated Lending & Payments
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {finastraEndpoints.map((ep) => (
                <button
                  key={ep.module}
                  onClick={() => setSelectedApiCategory(ep.module)}
                  className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all ${
                    selectedApiCategory === ep.module
                      ? 'bg-purple-600 text-white font-bold shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {ep.module}
                </button>
              ))}
            </div>

            {/* Active API Details */}
            {(() => {
              const activeEp = finastraEndpoints.find(e => e.module === selectedApiCategory) || finastraEndpoints[0];
              return (
                <div className="space-y-4">
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-purple-400">
                        {activeEp.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                        REST / JSON
                      </span>
                    </div>
                    <div className="text-amber-300 font-bold text-sm select-all">
                      {activeEp.path}
                    </div>
                    <p className="text-slate-400 text-xs font-sans pt-1">
                      {activeEp.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    {/* Request Payload */}
                    {activeEp.payload && (
                      <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 uppercase font-bold">Request Payload</span>
                          <button
                            onClick={() => handleCopy(JSON.stringify(activeEp.payload, null, 2))}
                            className="text-slate-400 hover:text-amber-300 flex items-center gap-1 text-[10px]"
                          >
                            {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <pre className="text-[11px] text-purple-200 bg-slate-900/80 p-2.5 rounded-xl overflow-x-auto max-h-56">
                          {JSON.stringify(activeEp.payload, null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* Response Payload */}
                    <div className={`p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 ${!activeEp.payload ? 'md:col-span-2' : ''}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-emerald-400 uppercase font-bold">Synchronous Response (200 OK)</span>
                        <button
                          onClick={() => handleCopy(JSON.stringify(activeEp.response, null, 2))}
                          className="text-slate-400 hover:text-emerald-300 flex items-center gap-1 text-[10px]"
                        >
                          {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="text-[11px] text-emerald-300 bg-slate-900/80 p-2.5 rounded-xl overflow-x-auto max-h-56">
                        {JSON.stringify(activeEp.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setActiveModal(null);
                  onNavigateNexusCloud();
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                View Full API Architecture on Nexus Portal →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal 2: Live Dashboard - Finastra Fusion */}
      {activeModal === 'dashboard' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl w-full max-w-4xl p-5 sm:p-7 space-y-6 shadow-2xl text-white font-mono text-xs my-auto max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <FinastraLogo variant="icon" className="w-9 h-9" />
                <div>
                  <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                    <span>Finastra Fusion • Live Syndication OS Dashboard</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                      LIVE TELEMETRY
                    </span>
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Multi-Bank Book Building, Lender Positions & Milestone Escrow Monitor
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dashboard Telemetry Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Syndicated Book</span>
                <div className="text-lg font-bold text-white font-sans">$5.4 Trillion</div>
                <div className="text-[10px] text-purple-400">70% Market Reach</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Active Facilities</span>
                <div className="text-lg font-bold text-amber-300 font-sans">193 Cities</div>
                <div className="text-[10px] text-slate-400">$1.93T Pipeline</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Reinsurance Shield</span>
                <div className="text-lg font-bold text-emerald-400 font-sans">100% Wrapped</div>
                <div className="text-[10px] text-emerald-300">0% Bank Loss Exposure</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">LenderComm Latency</span>
                <div className="text-lg font-bold text-sky-400 font-sans">4.2 ms</div>
                <div className="text-[10px] text-sky-300">Real-time Syndication</div>
              </div>
            </div>

            {/* Live Syndication Book Build Table */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase font-sans">
                  Active Syndication Deal Book: Accra Metropolitan Smart City Phase 1
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Target: $10,000,000,000 USD • Filled: 100%
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Lender Institution Tier</th>
                      <th className="py-2 px-3">Loan IQ Ref</th>
                      <th className="py-2 px-3">Commitment (USD)</th>
                      <th className="py-2 px-3">Reinsurance Status</th>
                      <th className="py-2 px-3">Position State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">Global Tier-1 Syndicate Desk A</td>
                      <td className="py-2.5 px-3 text-purple-300 font-mono">LIQ-TR-01A</td>
                      <td className="py-2.5 px-3 text-amber-300 font-bold">$2,000,000,000</td>
                      <td className="py-2.5 px-3 text-emerald-400">100% Bound</td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded text-[10px]">COMMITTED</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">European Infrastructure DFI Consortium</td>
                      <td className="py-2.5 px-3 text-purple-300 font-mono">LIQ-TR-02B</td>
                      <td className="py-2.5 px-3 text-amber-300 font-bold">$1,500,000,000</td>
                      <td className="py-2.5 px-3 text-emerald-400">100% Bound</td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded text-[10px]">COMMITTED</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">Pan-African Commercial Bank Group</td>
                      <td className="py-2.5 px-3 text-purple-300 font-mono">LIQ-TR-03C</td>
                      <td className="py-2.5 px-3 text-amber-300 font-bold">$6,500,000,000</td>
                      <td className="py-2.5 px-3 text-emerald-400">100% Bound</td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded text-[10px]">COMMITTED</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setActiveModal(null);
                  onInitiateInquiry('Finastra Fusion Live Institutional Integration');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-xs"
              >
                Schedule Live Finastra Fusion Demo Session →
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
