import React from 'react';
import { ShieldCheck, ChevronRight, Calculator, Globe, Building2, Layers, Award, Sparkles, Cpu, ArrowRight } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';
import { GTBankLogo, StandardCharteredLogo } from './BankerLogos';

interface HeroProps {
  onOpenVerification?: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateNexusCloud?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVerification, onNavigateSection, onNavigateNexusCloud }) => {
  const fleetSolutions = [
    {
      title: "Credit Facility Provision ($100 to Billions)",
      badge: "Instant to 3 Months",
      color: "from-amber-400/20 via-amber-500/10 to-transparent border-amber-500/30 text-amber-300",
      iconBg: "bg-amber-400 text-indigo-950",
      description: "Provision of credit facilities ($100 to $Billions). Syndicated across global banks in 1 call, 0% bank risk via insurance wrap, milestone-based release with disbursal timelines from instant approval, 24 hours, 7 days, 1 month, to 3 months for individuals, groups, companies, municipalities, and sovereign blocks.",
      icon: Globe
    },
    {
      title: "Exclusive Insurance for Individuals, Homes, Auto, Projects & Travel",
      badge: "Comprehensive Coverage",
      color: "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30 text-emerald-300",
      iconBg: "bg-emerald-400 text-indigo-950",
      description: "Exclusive insurance policies for Individuals, Homes, Auto/Fleet, Infrastructure Projects, Commercial Loans, and International Travel underwritten by International Licensed Partners.",
      icon: ShieldCheck
    },
    {
      title: "Fleet of Fintech Applications & Custom Software Development",
      badge: "Custom Industry Solutions",
      color: "from-sky-500/20 via-indigo-500/10 to-transparent border-sky-500/30 text-sky-300",
      iconBg: "bg-sky-400 text-indigo-950",
      description: "Custom software solutions tailored to suit your specific industry across Telecom, Healthcare, Education, Banking & Finance, Agriculture, and Public Sectors.",
      icon: Layers
    },
    {
      title: "Sovereign & Corporate Project Financing",
      badge: "Concessionary Debt",
      color: "from-purple-500/20 via-indigo-500/10 to-transparent border-purple-500/30 text-purple-300",
      iconBg: "bg-purple-400 text-indigo-950",
      description: "Structuring multi-million dollar concessionary loan facilities, PPP concessions, and green bonds through our network of International Licensed Integrated Partners.",
      icon: Building2
    }
  ];

  return (
    <section id="hero" className="relative bg-slate-950 text-white pt-12 pb-20 px-4 sm:px-8 border-b border-indigo-900/60 overflow-hidden">
      
      {/* Radiant Colorful Background Mesh Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/25 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Main Hero Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Message */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Statutory Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-amber-300 text-xs font-bold tracking-wide shadow-lg">
              <Award className="w-4 h-4 text-amber-400" />
              <span>OFFICIALLY REGISTERED IN GHANA • BN248851025</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Reframed Hero Headline */}
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Empowering African & Global Growth Through <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Infrastructure Financing, Modern Fintech & Technology
              </span>
            </h1>

            {/* NEXUS CLOUD Master Base Sub-Badge */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-amber-400/50 shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider block">
                  Core Enterprise Platform
                </span>
                <p className="text-xs font-mono font-bold text-white tracking-tight">
                  Powered by NEXUS CLOUD - Master Base | $1T+ Capacity | 100% Insured | 5,000+ Banks
                </p>
              </div>
            </div>

            {/* Sub-sentence under headline */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
              Oskayi Consult is a Ghanaian advisory and financial technology firm. Through our network of licensed international partners, we provide loan liquidity, project financing, custom fintech software, exclusive insurance, and Web3 solutions for governments, banks, businesses, and individuals.
            </p>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 flex-wrap">
              {/* Primary NEXUS CLOUD Explore CTA */}
              <button
                onClick={() => {
                  if (onNavigateNexusCloud) {
                    onNavigateNexusCloud();
                  } else {
                    onNavigateSection('nexus-cloud');
                  }
                }}
                className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-indigo-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-amber-400/25 transition-all flex items-center justify-center gap-2 group"
              >
                <Cpu className="w-4 h-4 text-indigo-950" />
                <span>NEXUS CLOUD → /nexus-cloud</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* SELLER PROTECT Product CTA */}
              <button
                onClick={() => onNavigateSection('seller-protect')}
                className="w-full sm:w-auto px-5 py-4 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-400/40 hover:border-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>SELLER PROTECT (Buy • Pay • Protect)</span>
              </button>

              <button
                onClick={() => onNavigateSection('showcase-slides')}
                className="w-full sm:w-auto px-5 py-4 bg-indigo-900/70 hover:bg-indigo-800 text-white border border-indigo-700/80 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>10 Showcase Slides</span>
              </button>
            </div>

            {/* Corporate Reg Quick Specs */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left text-xs font-mono">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-indigo-900/80 space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">ROC Reg No.</span>
                <div className="font-bold text-amber-300">{OFFICIAL_COMPANY_INFO.registrationNumber}</div>
                <div className="text-[10px] text-slate-400 truncate">Republic of Ghana</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-indigo-900/80 space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">TIN Tax ID</span>
                <div className="font-bold text-white">{OFFICIAL_COMPANY_INFO.tin}</div>
                <div className="text-[10px] text-slate-400 truncate">GRA Tax Identification</div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-slate-900/90 p-3 rounded-xl border border-indigo-900/80 space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Ghana Post GPS</span>
                <div className="font-bold text-sky-300">{OFFICIAL_COMPANY_INFO.digitalAddress}</div>
                <div className="text-[10px] text-slate-400 truncate">McCarthy Hill, Accra</div>
              </div>
            </div>

            {/* Institutional Bankers Bar */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                  Our Bankers:
                </span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <GTBankLogo className="scale-90 origin-left" />
                <span className="text-slate-700 hidden sm:inline">|</span>
                <StandardCharteredLogo className="scale-90 origin-left" />
              </div>
            </div>

          </div>

          {/* Right Hero Image Card featuring President & CEO */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-indigo-700/60 shadow-2xl bg-slate-950 group">
              <img
                src="https://i.postimg.cc/sgnfk289/IMG-20260809-WA0040.jpg"
                alt="Listowel Sarsah Adentwi-Edzii - President & CEO of Oskayi Consult"
                className="w-full h-[500px] sm:h-[520px] object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Status Ribbon */}
              <div className="absolute top-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-indigo-700/60 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-slate-100">President & CEO - Oskayi Consult</span>
                </div>
                <span className="text-amber-300 font-mono text-[10px] uppercase bg-amber-400/20 px-2.5 py-0.5 rounded-full font-bold border border-amber-400/40">
                  Global Leadership
                </span>
              </div>

              {/* President & CEO Opening Message Overlay Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-md p-4 rounded-2xl border border-amber-400/50 text-xs space-y-2.5 shadow-2xl">
                <div className="flex items-center justify-between text-white font-bold border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 text-amber-300 font-sans text-xs">
                    <Award className="w-4 h-4 text-amber-400" />
                    Message from the President & CEO
                  </span>
                  <span className="text-[10px] bg-amber-400 text-indigo-950 font-extrabold px-2 py-0.5 rounded font-mono uppercase">
                    Executive Statement
                  </span>
                </div>

                <p className="text-[11px] text-slate-200 leading-relaxed font-sans italic">
                  "At Oskayi Consult, we empower African and global clients with credit facilities from $100 to Billions, custom industry software, and project financing tailored to your exact industry."
                </p>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold">Listowel Sarsah Adentwi-Edzii</span>
                  <button
                    onClick={() => {
                      const element = document.getElementById('ceo-message');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        onNavigateSection('ceo-message');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-md group/btn"
                  >
                    <span>Read Full Message</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* EXPLICIT SECTION: OUR FLEET OF SOLUTIONS INCLUDES */}
        <div className="space-y-8 pt-8 border-t border-indigo-900/60">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 inline-block">
              Institutional Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Fleet of Solutions Includes
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Tailored institutional financial engineering and custom software architectures designed for governments, banks, enterprises, and individual clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fleetSolutions.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl bg-gradient-to-b ${item.color} bg-slate-900/90 border backdrop-blur-sm space-y-4 hover:scale-[1.02] transition-all duration-300 shadow-xl flex flex-col justify-between group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl ${item.iconBg} shadow-md group-hover:rotate-6 transition-transform`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-sans text-base font-extrabold text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigateSection('services')}
                    className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-amber-200 transition-colors"
                  >
                    <span>View Framework</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
