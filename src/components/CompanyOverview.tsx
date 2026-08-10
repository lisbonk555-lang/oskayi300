import React from 'react';
import { Building2, ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO, INTEGRATED_PARTNERS_NETWORK } from '../data/companyData';

interface CompanyOverviewProps {
  onOpenVerification: () => void;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ onOpenVerification }) => {
  return (
    <section id="overview" className="py-20 bg-slate-950 text-white px-4 sm:px-8 border-b border-indigo-900/60 relative overflow-hidden">
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-900/80 text-amber-300 text-xs font-bold uppercase tracking-wider border border-indigo-700/60 shadow-lg">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Statutory Profile & Mission</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            About Oskayi Consult
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Incorporated in Ghana under the Office of the Registrar of Companies, Oskayi Consult combines deep local market insights with international integrated partner capabilities to deliver institutional financial technology, infrastructure funding, and Web3 innovations.
          </p>
        </div>

        {/* Grid: Corporate Story & Founder & CEO Profile */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Executive Leadership Spotlight */}
          <div className="lg:col-span-5 bg-slate-900 p-8 rounded-3xl text-white shadow-2xl flex flex-col justify-between border border-indigo-800 relative overflow-hidden min-h-[380px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest font-mono">Executive Leadership</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-indigo-950 uppercase">Ghana Executive</span>
              </div>

              <div className="space-y-4">
                <div className="relative group rounded-2xl overflow-hidden border border-amber-400/70 shadow-xl bg-slate-950 w-full h-52 sm:h-60">
                  <img
                    src="https://i.postimg.cc/sgnfk289/IMG-20260809-WA0040.jpg"
                    alt="Listowel Sarsah Adentwi-Edzii - Founder & CEO"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono font-bold text-amber-300">
                    Listowel Sarsah Adentwi-Edzii
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans text-2xl font-bold text-white tracking-wide">
                    Listowel Sarsah Adentwi-Edzii
                  </h3>
                  <p className="text-amber-300 font-semibold text-sm">
                    Founder & Chief Executive Officer
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                Under the strategic vision of Founder and CEO Listowel Sarsah Adentwi-Edzii, Oskayi Consult was established to bridge emerging market capital gaps by structuring institutional partnerships with global financial consortia, Web3 protocol architects, and reinsurance syndicates.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Executive Designation:</span>
                  <strong className="text-amber-300 font-semibold">Founder & CEO</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Citizenship / Nationality:</span>
                  <strong className="text-white">Ghanaian</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Contact Number:</span>
                  <strong className="text-amber-300 font-mono">{OFFICIAL_COMPANY_INFO.contactPhone}</strong>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Republic of Ghana Certified</span>
              <button
                onClick={onOpenVerification}
                className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 group"
              >
                <span>View Full Certificate</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Statutory Registration Details & Integrated Model */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-900/80 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-sans text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                  Statutory Incorporation Credentials
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold uppercase">
                  VERIFIED REGISTERED
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium uppercase text-[10px]">Business Name</span>
                  <div className="text-sm font-bold text-amber-300">{OFFICIAL_COMPANY_INFO.companyName}</div>
                  <div className="text-[10px] text-slate-400">Act 151 Registered</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium uppercase text-[10px]">Registration Number</span>
                  <div className="text-sm font-bold text-white font-mono">{OFFICIAL_COMPANY_INFO.registrationNumber}</div>
                  <div className="text-[10px] text-slate-400">ROC Republic of Ghana</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium uppercase text-[10px]">Taxpayer ID (TIN)</span>
                  <div className="text-sm font-bold text-white font-mono">{OFFICIAL_COMPANY_INFO.tin}</div>
                  <div className="text-[10px] text-slate-400">Ghana Revenue Authority</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium uppercase text-[10px]">ISIC Classification</span>
                  <div className="text-sm font-bold text-sky-300 font-mono">{OFFICIAL_COMPANY_INFO.isicCode}</div>
                  <div className="text-[10px] text-slate-400 truncate">{OFFICIAL_COMPANY_INFO.isicDescription}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-300" />
                  Principal Registered Business Activity & Objects:
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">
                  "{OFFICIAL_COMPANY_INFO.principalActivity}"
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1 text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-amber-300" />
                  Digital Address: <strong className="text-amber-300 font-mono ml-1">{OFFICIAL_COMPANY_INFO.digitalAddress}</strong>
                </span>
                <span className="text-slate-400 font-medium">
                  McCarthy Hill, Accra, Ghana
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* International Integrated Partners Network Model */}
        <div className="bg-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-900/80 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
                <Globe className="w-4 h-4 text-amber-400" />
                Global Architecture
              </div>
              <h3 className="font-sans text-2xl font-extrabold text-white">
                International Integrated Partners Network
              </h3>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Oskayi Consult operates as an integrated master consultancy. We channel institutional capabilities into Ghana and international markets by orchestrating specialist partners across four key global sectors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTEGRATED_PARTNERS_NETWORK.map((partner, index) => (
              <div 
                key={index}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-indigo-600 transition-colors space-y-3 group"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-900/60 text-amber-300 border border-indigo-700/80 flex items-center justify-center font-bold text-xs font-mono">
                  0{index + 1}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide block">{partner.type}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5 group-hover:text-amber-300 transition-colors">
                    {partner.name}
                  </h4>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">{partner.region}</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
