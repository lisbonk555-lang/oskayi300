import React from 'react';
import { Globe, ShieldCheck, Cpu, Building2, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface IntegratedGlobalCapabilitiesProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export const IntegratedGlobalCapabilities: React.FC<IntegratedGlobalCapabilitiesProps> = ({
  onSelectServiceForInquiry
}) => {
  const capabilities = [
    {
      id: "multi-jurisdiction-capital",
      number: "01",
      title: "MULTI-JURISDICTION CAPITAL FACILITATION",
      subtitle: "Access to regulated liquidity pools across Africa, Europe, Middle East, and Asia-Pacific.",
      icon: Globe,
      accentColor: "border-amber-400/80 bg-amber-400/10 text-amber-300",
      capabilities: [
        "Instant micro-facilities to sovereign-scale credit lines ($100 to $Billions)",
        "Disbursal in local currencies including GHS, NGN, KES, ZAR, USD, EUR & GBP",
        "Direct-to-wallet and direct-to-bank settlement rails across 35+ African markets",
        "Shariah-compliant and concessionary financing structures"
      ]
    },
    {
      id: "embedded-risk-insurance",
      number: "02",
      title: "EMBEDDED RISK & INSURANCE UNDERWRITING",
      subtitle: "Exclusive coverage programs underwritten by international licensed syndicates.",
      icon: ShieldCheck,
      accentColor: "border-emerald-400/80 bg-emerald-400/10 text-emerald-300",
      capabilities: [
        "Loan protection, credit life, and default risk coverage embedded at source",
        "Asset insurance for homes, auto fleets, infrastructure and international trade",
        "International travel and health coverage for corporate staff and diaspora",
        "Claims processing and reinsurance backing in London and Zurich markets"
      ]
    },
    {
      id: "enterprise-fintech",
      number: "03",
      title: "ENTERPRISE-GRADE FINANCIAL TECHNOLOGY",
      subtitle: "White-label platforms and core rails deployed for banks, telcos, and governments.",
      icon: Cpu,
      accentColor: "border-sky-400/80 bg-sky-400/10 text-sky-300",
      capabilities: [
        "Instant lending engines with automated credit assessment algorithms",
        "Cross-border payment orchestration and mobile money aggregation",
        "RegTech and compliance ledgers for KYC, AML, and audit trails",
        "Custom software for Telecom, Health, Education, Agriculture and Public Sector"
      ]
    },
    {
      id: "project-finance-infra",
      number: "04",
      title: "PROJECT FINANCE & INFRASTRUCTURE",
      subtitle: "Structuring and syndication of large-scale development capital.",
      icon: Building2,
      accentColor: "border-purple-400/80 bg-purple-400/10 text-purple-300",
      capabilities: [
        "Sovereign and corporate concessionary debt from $10M to $Billions",
        "PPP frameworks, green bonds, and climate finance vehicles",
        "Maritime, energy, telecom backbone, and logistics infrastructure funding",
        "Due diligence and treasury management via tier-1 international consortia"
      ]
    },
    {
      id: "digital-assets-web3",
      number: "05",
      title: "DIGITAL ASSETS & WEB3 INFRASTRUCTURE",
      subtitle: "Secure enterprise blockchain systems for real-world asset tokenization.",
      icon: Layers,
      accentColor: "border-indigo-400/80 bg-indigo-400/10 text-indigo-300",
      capabilities: [
        "Supply chain and commodity tokenization protocols",
        "Smart contract deployment with institutional-grade security audits",
        "Central Bank Digital Currency (CBDC) integration frameworks",
        "Digital identity and verifiable credential systems"
      ]
    }
  ];

  return (
    <section id="capabilities" className="py-20 bg-slate-950 text-white px-4 sm:px-8 border-b border-indigo-900/60 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30 shadow-lg">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Delivered Through Regulated International Partner Networks</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            OUR INTEGRATED GLOBAL CAPABILITIES
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Delivered through regulated international partner networks across Africa, Europe, the Middle East, and Asia-Pacific.
          </p>
        </div>

        {/* Core Gateway Statement Banner */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-indigo-700/80 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-indigo-950 font-extrabold text-[10px] uppercase font-mono tracking-wider">
              Gateway Architecture
            </span>
            <span className="text-xs text-amber-300 font-mono font-bold">
              Integrated Regulated Network
            </span>
          </div>

          <p className="text-slate-200 text-sm sm:text-base font-sans font-medium leading-relaxed">
            "Oskayi Consult serves as the master interface between African institutions and global regulated capital, risk, and technology providers. We do not hold the licenses directly. We orchestrate them. <strong className="text-amber-300 font-bold">We are not a lender. We are the institutional gateway to all lenders, insurers, and fintech rails across Africa and globally.</strong>"
          </p>
        </div>

        {/* Capabilities 5-Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-900/90 rounded-2xl border border-indigo-800/80 p-6 space-y-4 hover:border-amber-400/60 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border ${item.accentColor} shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-mono font-extrabold text-slate-600 group-hover:text-amber-400 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-sans text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-amber-300 font-medium leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Capabilities Bulleted List */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Key Capabilities:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {item.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {onSelectServiceForInquiry && (
                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={() => onSelectServiceForInquiry(item.title)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-amber-400 hover:text-indigo-950 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-800 hover:border-amber-300 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Inquire Strategy</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
