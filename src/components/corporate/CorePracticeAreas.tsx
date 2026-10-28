import React from 'react';
import { 
  Cpu, 
  Layers, 
  LineChart, 
  Briefcase, 
  ArrowUpRight, 
  Check, 
  ShieldAlert, 
  Server, 
  Coins, 
  FileSpreadsheet
} from 'lucide-react';

interface CorePracticeAreasProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export function CorePracticeAreas({ onSelectServiceForInquiry }: CorePracticeAreasProps) {
  const practices = [
    {
      id: 'ict-services',
      number: '01',
      title: 'Information and Communication Technology (ICT) Services',
      tagline: 'Enterprise Digital Systems, Cloud Infrastructure & Secure Financial Technology Rails',
      description:
        'Architecting robust, fault-tolerant digital systems, mobile money aggregations, and high-performance corporate software. From ISO-compliant banking integration gateways to sovereign digital registers, we engineer the technical backbone of modern institutions.',
      keyCapabilities: [
        'Enterprise Cloud & High-Availability API Architectures',
        'Mobile Money & Banking Rail Integrations (MTN, Telecel, M-Pesa, Swift)',
        'Distributed Ledger Protocols & Smart Contract Engineering',
        'Cybersecurity Audits, Threat Modeling & ISO27001 Preparedness',
        'Scalable Database & Cross-Border Payment Orchestration'
      ],
      deliverables: 'Production Source Code, API Documentation, Security Certification & SLA Operations'
    },
    {
      id: 'project-development',
      number: '02',
      title: 'Project Development',
      tagline: 'Turnkey Technical Feasibility, Master Planning & Strategic Infrastructure Structuring',
      description:
        'Transforming conceptual mandates into bankable, construction-ready projects. We coordinate technical feasibility studies, regulatory environmental clearances, engineering specifications, and multi-stakeholder delivery models for energy, transport, and technology facilities.',
      keyCapabilities: [
        'Bankable Technical & Economic Feasibility Modeling',
        'Public-Private Partnership (PPP) Technical Frameworks',
        'Regulatory Compliance, EPA & Municipal Permitting',
        'Vendor Procurement & Engineering Oversight (EPC / EPCM)',
        'Milestone Risk Allocation & Independent Engineering Verification'
      ],
      deliverables: 'Bankable Feasibility Dossiers, Tender Documentation & Program Oversight'
    },
    {
      id: 'management-consultancy',
      number: '03',
      title: 'Management Consultancy Services',
      tagline: 'Corporate Governance, Operational Workflows & ISIC 8299 Support Service Activities',
      description:
        'Operating under our official ISIC 8299 registration to provide end-to-end business support, operational restructuring, and organizational governance. We design lean execution frameworks that empower corporations and public agencies to scale reliably.',
      keyCapabilities: [
        'Institutional Operating Model & Process Engineering',
        'Anti-Money Laundering (AML) & KYC Corporate Policy Systems',
        'Executive Workflow Automation & Cross-Departmental Auditing',
        'Change Management & Sovereign Agency Modernization',
        'Strategic Expansion Roadmaps across ECOWAS & AfCFTA'
      ],
      deliverables: 'Standard Operating Procedures (SOPs), Policy Handbooks & Governance Charters'
    },
    {
      id: 'financial-consultancy',
      number: '04',
      title: 'Financial Consultancy Services',
      tagline: 'Capital Structuring, Debt/Equity Syndication & Risk-Mitigated Financial Engineering',
      description:
        'Advising sovereign entities, corporations, and institutional projects on capital allocation, loan guarantee structuring, and cross-border treasury management. We bridge African commercial initiatives with global institutional liquidity pools.',
      keyCapabilities: [
        'Concessionary Debt & Structured Project Finance Advisory',
        'Commercial Loan Guarantees & Trade Credit Protection',
        'Multi-Currency Treasury Management & Foreign Exchange Hedging',
        'Credit Facility Feasibility ($100 to Large-Scale Concessions)',
        'Parametric Insurance & Infrastructure Risk Syndication'
      ],
      deliverables: 'Financial Models, Term Sheet Analysis, Information Memoranda & Treasury Blueprints'
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-800 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Official Registered Practice Areas · Part I Objects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Institutional Practice Areas & Advisory
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Mandated by our statutory registration under Act 151, Oskayi Consult delivers specialized expertise
              across four foundational pillars of economic and technological transformation.
            </p>
          </div>
          <div className="shrink-0 text-xs font-mono text-slate-400">
            ISIC Classification: <span className="text-amber-400 font-bold">8299</span>
          </div>
        </div>

        {/* 4 Pillars Grid (Asymmetric Bento Hierarchy) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {practices.map((practice) => (
            <div
              key={practice.id}
              className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              {/* Subtle Ambient Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

              <div>
                {/* Number & Tagline */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-amber-400 tracking-wider">
                    {practice.number} · CORE PRACTICE
                  </span>
                  <span className="text-xs font-mono text-slate-500">Act 151 Registered</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-amber-300 transition-colors">
                  {practice.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-6">
                  {practice.tagline}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {practice.description}
                </p>

                {/* Key Capabilities */}
                <div className="space-y-2.5 mb-8">
                  <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3">
                    Institutional Capabilities:
                  </div>
                  {practice.keyCapabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action & Deliverable */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-[11px] font-mono text-slate-400">
                  Deliverable: <span className="text-slate-200">{practice.deliverables}</span>
                </div>
                <button
                  onClick={() => onSelectServiceForInquiry(practice.title)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-amber-400 text-slate-200 hover:text-slate-950 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Engage Practice</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
