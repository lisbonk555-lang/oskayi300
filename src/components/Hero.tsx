import React from 'react';
import { ShieldCheck, ChevronRight, Calculator, Globe, Building2, Layers, Award, Sparkles } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface HeroProps {
  onOpenVerification?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVerification, onNavigateSection }) => {
  const fleetSolutions = [
    {
      title: "Project Financing",
      badge: "Sovereign & Infrastructure",
      color: "from-amber-400/20 via-amber-500/10 to-transparent border-amber-500/30 text-amber-300",
      iconBg: "bg-amber-400 text-indigo-950",
      description: "Concessionary capital, PPP models, municipal bonds, and multi-decade sovereign loan engineering for national projects.",
      icon: Globe
    },
    {
      title: "Fintech Solutions & App Development",
      badge: "Core Banking & Interbank",
      color: "from-sky-500/20 via-indigo-500/10 to-transparent border-sky-500/30 text-sky-300",
      iconBg: "bg-sky-400 text-indigo-950",
      description: "ISO 20022 payment engines, high-throughput interbank clearing, automated SWIFT bridges, and enterprise financial portals.",
      icon: Layers
    },
    {
      title: "Instant Lending & Insurance for Individuals, Companies & Organisations",
      badge: "Credit Pools & Risk Escrow",
      color: "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30 text-emerald-300",
      iconBg: "bg-emerald-400 text-indigo-950",
      description: "Algorithmic automated micro & macro lending pools, credit scoring webhooks, and syndicate insurance underwriting.",
      icon: Building2
    },
    {
      title: "Web 3 Applications & Fintech App Development",
      badge: "RWA & Smart Contracts",
      color: "from-purple-500/20 via-indigo-500/10 to-transparent border-purple-500/30 text-purple-300",
      iconBg: "bg-purple-400 text-indigo-950",
      description: "Real-world asset (RWA) commodity tokenization, multi-sig cold storage vaults, and decentralized escrow protocols.",
      icon: ShieldCheck
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

            {/* Requested Hero Headline */}
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Empowering Global Institutional Growth, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Infrastructure Financing & Frontier Technology
              </span>
            </h1>

            {/* Sub-sentence under name */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
              Oskayi Consult is a premier Ghanaian advisory and technology engineering firm specializing in capital syndication, core interbank fintech rails, automated credit platforms, and enterprise Web3 solutions.
            </p>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigateSection('showcase-slides')}
                className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-indigo-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-indigo-950" />
                <span>Explore 20 Interactive Showcase Slides</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateSection('services')}
                className="w-full sm:w-auto px-6 py-4 bg-indigo-900/80 hover:bg-indigo-800 text-white border border-indigo-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Solutions & Services</span>
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

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-indigo-700/60 shadow-2xl bg-indigo-950 group">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Oskayi Consult Infrastructure & Fintech"
                className="w-full h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Status Ribbon */}
              <div className="absolute top-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-indigo-700/60 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-slate-100">Global Integrated Advisory Network</span>
                </div>
                <span className="text-amber-300 font-mono text-[10px] uppercase bg-amber-400/20 px-2.5 py-0.5 rounded-full font-bold border border-amber-400/40">
                  Act 151
                </span>
              </div>

              {/* Overlay Stat Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-md p-4 rounded-2xl border border-indigo-800 text-xs space-y-2 shadow-xl">
                <div className="flex items-center justify-between text-white font-bold border-b border-indigo-800/80 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-300" />
                    Official ISIC Classification
                  </span>
                  <span className="text-[10px] bg-amber-400 text-indigo-950 font-bold px-2 py-0.5 rounded font-mono">
                    8299
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Specialized Information & Communication Technology, Project Development & Financial Consultancy Services.
                </p>
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
