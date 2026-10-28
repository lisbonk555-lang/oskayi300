import React from 'react';
import { 
  Building2, 
  Cpu, 
  TrendingUp, 
  FileCheck2, 
  Briefcase, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Landmark,
  Scale
} from 'lucide-react';

interface OskayiProductsHubProps {
  onNavigateToOil: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const OskayiProductsHub: React.FC<OskayiProductsHubProps> = ({
  onNavigateToOil,
  onNavigateToSection
}) => {
  const products = [
    {
      id: 'oil',
      badge: 'Live • Real-Time Decision',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      title: 'Oskayi Instant Loan (OIL)',
      subtitle: 'Discover Funding. Apply with Confidence - Real-time decision',
      description: 'AI-powered credit scoring and instant loan discovery engine aggregating licensed commercial banks, savings & loans, and micro-credit providers across Ghana. 90-second scoring using Mobile Money & bank statements.',
      cta: 'Apply Instant → /oil',
      isPrimary: true,
      onClick: onNavigateToOil,
      features: [
        '90-Second MoMo & Bank Scoring Brain (300-850)',
        'Bank of Ghana 45% DTI Ceiling Enforcement',
        'Transparent Reducing Balance APRs (No Flat Rates)',
        'Paystack Verified Dossier Routing'
      ]
    },
    {
      id: 'bakocredit',
      badge: 'Agro & SME Credit',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      title: 'BAKOCREDIT',
      subtitle: 'Agricultural Value Chain & Micro-SME Financing',
      description: 'Specialized working-capital lines for smallholders, input suppliers, aggregators, and commercial food processors in Ghana and West Africa.',
      cta: 'Explore BAKOCREDIT',
      isPrimary: false,
      onClick: onNavigateToOil,
      features: [
        'Harvest-Cycle Aligned Repayment Windows',
        'Warehouse Receipt Collateralization',
        'Mobile Money Instant Agro-Disbursements',
        'Weather & Yield Index Risk Hedging'
      ]
    },
    {
      id: 'consult',
      badge: 'Corporate Advisory',
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      title: 'Oskayi Consult',
      subtitle: 'Project Development, Management & Financial Consultancy',
      description: 'Institutional-grade corporate advisory, financial engineering, feasibility studies, capital structuring, and ICT deployment for private and public sector initiatives.',
      cta: 'Engage Oskayi Consult',
      isPrimary: false,
      onClick: () => onNavigateToSection('about'),
      features: [
        'Infrastructure Feasibility & Financial Modeling',
        'Turnkey ICT Systems & ERP Integration',
        'Public-Private Partnership (PPP) Structuring',
        'Cross-Border Trade Financing Advisory'
      ]
    },
    {
      id: 'tax',
      badge: 'Statutory Compliance',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      title: 'Tax Advisory & GRA Compliance',
      subtitle: 'Domestic Tax Filing, TIN Generation & Withholding Audits',
      description: 'Streamlined Ghana Revenue Authority (GRA) tax compliance, automated withholding tax schedules, VAT returns, and corporate income tax computations.',
      cta: 'Request Tax Consultation',
      isPrimary: false,
      onClick: () => onNavigateToSection('contact'),
      features: [
        'GRA TIN Creation & Verification Support',
        'Monthly VAT & NHIL / GETFund Reconciliation',
        'WHT Exemption Applications & Filing',
        'Corporate Tax Clearance Certificate (TCC)'
      ]
    },
    {
      id: 'cac',
      badge: 'Registrar-General',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      title: 'Corporate Registration & Governance',
      subtitle: 'Registrar-General / CAC Entity Formation & Filing',
      description: 'Expedited registration of Sole Proprietorships, Limited Liability Companies (LLCs), External Companies, and Annual Returns filing with the Office of the Registrar of Companies, Ghana.',
      cta: 'Begin Business Registration',
      isPrimary: false,
      onClick: () => onNavigateToSection('contact'),
      features: [
        'Business Name / Form A Sole Proprietorships',
        'Companies Act 2019 (Act 992) Incorporation',
        'Annual Returns & Renewal Filing (Act 151)',
        'Statutory Books & Company Secretarial Support'
      ]
    },
    {
      id: 'treasury',
      badge: 'Fintech Infrastructure',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      title: 'AfriTreasury OS & Financial Tech',
      subtitle: 'Multi-Currency Liquidity & Cross-Border Rails',
      description: 'Enterprise treasury automation connecting Paystack, Mono, Okra, and Central Bank RTGS rails for real-time FX auto-sweeps and supplier mass disbursements.',
      cta: 'View Treasury OS Suite',
      isPrimary: false,
      onClick: () => onNavigateToSection('about'),
      features: [
        'Normalized Multi-Currency Unified Ledger',
        'Automated FX Auto-Sweeps to Base Currency',
        'Bulk Mobile Money & NUBAN Payout Engines',
        '2-Way Accounting Software Synchronization'
      ]
    }
  ];

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial-gradient from-teal-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold tracking-wide uppercase">
            <Building2 className="w-4 h-4 text-teal-400" />
            Oskayi Consult • Products & Services Hub
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Institutional Fintech, Financial Advisory & Project Development
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Registered under the Registration of Business Names Act, 1962 (No. 151) as <strong>OSKAYI CONSULT</strong> (Reg No: <span className="text-teal-300 font-mono font-bold">BN248851025</span>, TIN: <span className="text-teal-300 font-mono font-bold">P0000590118</span>). Delivering verified financial solutions for businesses, individuals, and global capital corridors.
          </p>

          {/* Quick Stats / Registration pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
            <div className="bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Office of Registrar of Companies, Ghana</span>
            </div>
            <div className="bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>Bank of Ghana Intermediary Protocol</span>
            </div>
            <div className="bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Data Protection Act 2012 (Act 843)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Primary Callout: Oskayi Instant Loan (OIL) */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border-2 border-teal-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE AT /oil • INSTANT CREDIT SCORING BRAIN
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Oskayi Instant Loan (OIL)
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Discover funding and apply with confidence. Our real-time Master Decision Brain analyzes your Mobile Money (MTN MoMo, Telecel) and Open Banking statements in 90 seconds, matching you with licensed commercial banks and micro-lenders.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Processing Speed</span>
                <span className="font-bold text-white">90 Seconds</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Loan Limits</span>
                <span className="font-bold text-teal-400">GHS 500 - 50k</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">BoG DTI Limit</span>
                <span className="font-bold text-amber-400">&le; 45% Rule</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Repayment Model</span>
                <span className="font-bold text-emerald-400">Reducing APR</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center gap-3">
            <button
              onClick={onNavigateToOil}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-teal-500/25 transition-all flex items-center justify-center gap-3 group-hover:scale-105 cursor-pointer"
            >
              <Cpu className="w-5 h-5 text-slate-950" />
              <span>Apply Instant &rarr; /oil</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-slate-400">
              Aggregator Model • Zero Fake Approvals
            </span>
          </div>
        </div>
      </div>

      {/* Products & Services Grid Cards */}
      <div className="space-y-6">
        <div>
          <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">
            Complete Institutional Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
            Our Enterprise Products & Advisory Services
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Integrated technology platforms, statutory compliance services, and corporate financial advisory operated by Oskayi Consult.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              className={`bg-slate-900 border rounded-2xl p-6 transition-all flex flex-col justify-between shadow-xl ${
                prod.isPrimary 
                  ? 'border-teal-500/50 shadow-teal-500/5 hover:border-teal-400' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                {/* Card Header Badge */}
                <div className="flex items-start justify-between gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${prod.badgeColor}`}>
                    {prod.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg leading-snug">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-teal-300 font-medium mt-0.5">
                    {prod.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {prod.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {prod.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={prod.onClick}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    prod.isPrimary
                      ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-black shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{prod.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Oskayi Consult Section */}
      <div id="about" className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">
            Corporate Profile
          </span>
          <h2 className="text-2xl font-bold font-serif text-white">
            About Oskayi Consult
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            OSKAYI CONSULT is a multi-disciplinary Ghanaian enterprise registered under the Registration of Business Names Act, 1962 (Act 151) on 01-Oct-2025 by the Office of the Registrar of Companies, Republic of Ghana.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our authorized objects encompass <strong>Information and Communication Technology Services, Project Development, Management, and Financial Consultancy Services</strong>. We operate at the intersection of modern African financial technology, regulatory compliance, and sovereign infrastructure advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 block text-[11px]">Principal Place of Business</span>
            <span className="font-semibold text-slate-200 mt-1 block">
              House No. 352, McCarthy Hill, GA South, Greater Accra, Ghana
            </span>
            <span className="text-[10px] text-teal-400 font-mono mt-1 block">GPS: GA-183-8165</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 block text-[11px]">Postal Address</span>
            <span className="font-semibold text-slate-200 mt-1 block">
              P.O. Box 119989, Accra North, Ghana
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block">ISIC: Other Business Support Services n.e.c.</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 block text-[11px]">Official Communication</span>
            <span className="font-semibold text-slate-200 mt-1 block">
              info@oskayi.com
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block">+233 24 490 5505 / 0244905505</span>
          </div>
        </div>
      </div>
    </div>
  );
};
