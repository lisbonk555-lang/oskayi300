import React from 'react';
import { Building2, UserCheck, ShieldCheck, Globe, CheckCircle2, FileText, ArrowUpRight, Award, Lock } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO, INTEGRATED_PARTNERS_NETWORK } from '../data/companyData';

interface CompanyOverviewProps {
  onOpenVerification: () => void;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ onOpenVerification }) => {
  return (
    <section id="overview" className="py-16 bg-slate-50 text-slate-900 px-4 sm:px-8 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider border border-indigo-200">
            <Building2 className="w-3.5 h-3.5 text-indigo-700" />
            <span>Statutory Profile & Mission</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-950">
            About Oskayi Consult
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Incorporated in Ghana under the Office of the Registrar of Companies, Oskayi Consult combines deep local market insights with international integrated partner capabilities to deliver institutional financial technology, infrastructure funding, and Web3 innovations.
          </p>
        </div>

        {/* Grid: Corporate Story & Founder & CEO Profile */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Executive Leadership Spotlight - Deep Indigo Card */}
          <div className="lg:col-span-5 bg-indigo-950 p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between border border-indigo-900 relative overflow-hidden min-h-[380px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-indigo-800/80 pb-4">
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Executive Leadership</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-indigo-950 uppercase">Ghana Executive</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-sans text-2xl font-bold text-white tracking-wide">
                  Listowel Sarsah Adentwi-Edzii
                </h3>
                <p className="text-amber-300 font-semibold text-sm">
                  Founder & CEO
                </p>
              </div>

              <p className="text-indigo-100/90 text-sm leading-relaxed font-sans">
                Under the strategic vision of Founder and CEO Listowel Sarsah Adentwi-Edzii, Oskayi Consult was established to bridge emerging market capital gaps by structuring institutional partnerships with global financial consortia, Web3 protocol architects, and reinsurance syndicates.
              </p>

              <div className="p-4 rounded-xl bg-indigo-900/60 border border-indigo-800 text-xs space-y-2">
                <div className="flex items-center justify-between text-indigo-200">
                  <span>Executive Designation:</span>
                  <strong className="text-amber-300 font-semibold">Founder & CEO</strong>
                </div>
                <div className="flex items-center justify-between text-indigo-200">
                  <span>Citizenship / Nationality:</span>
                  <strong className="text-white">Ghanaian</strong>
                </div>
                <div className="flex items-center justify-between text-indigo-200">
                  <span>Contact Number:</span>
                  <strong className="text-amber-300 font-mono">{OFFICIAL_COMPANY_INFO.contactPhone}</strong>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-indigo-800/80 flex items-center justify-between text-xs text-indigo-300">
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

          {/* Statutory Registration Details & Integrated Model - Crisp White Cards */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-sans text-xl font-bold text-indigo-950 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  Statutory Incorporation Credentials
                </h3>
                <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold uppercase">
                  VERIFIED REGISTERED
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium uppercase text-[10px]">Business Name</span>
                  <div className="text-sm font-bold text-indigo-950">{OFFICIAL_COMPANY_INFO.companyName}</div>
                  <div className="text-[10px] text-slate-500">Act 151 Registered</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium uppercase text-[10px]">Registration Number</span>
                  <div className="text-sm font-bold text-slate-900 font-mono">{OFFICIAL_COMPANY_INFO.registrationNumber}</div>
                  <div className="text-[10px] text-slate-500">ROC Republic of Ghana</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium uppercase text-[10px]">Taxpayer ID (TIN)</span>
                  <div className="text-sm font-bold text-slate-900 font-mono">{OFFICIAL_COMPANY_INFO.tin}</div>
                  <div className="text-[10px] text-slate-500">Ghana Revenue Authority</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium uppercase text-[10px]">ISIC Classification</span>
                  <div className="text-sm font-bold text-indigo-600 font-mono">{OFFICIAL_COMPANY_INFO.isicCode}</div>
                  <div className="text-[10px] text-slate-600 truncate">{OFFICIAL_COMPANY_INFO.isicDescription}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-semibold text-indigo-950 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  Principal Registered Business Activity & Objects:
                </div>
                <p className="text-slate-700 leading-relaxed font-sans">
                  "{OFFICIAL_COMPANY_INFO.principalActivity}"
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 text-slate-700">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  Digital Address: <strong className="text-indigo-950 font-mono ml-1">{OFFICIAL_COMPANY_INFO.digitalAddress}</strong>
                </span>
                <span className="text-slate-600 font-medium">
                  McCarthy Hill, Accra, Ghana
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* International Integrated Partners Network Model */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
                <Globe className="w-4 h-4" />
                Global Architecture
              </div>
              <h3 className="font-sans text-2xl font-extrabold text-indigo-950">
                International Integrated Partners Network
              </h3>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              Oskayi Consult operates as an integrated master consultancy. We channel institutional capabilities into Ghana and international markets by orchestrating specialist partners across four key global sectors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTEGRATED_PARTNERS_NETWORK.map((partner, index) => (
              <div 
                key={index}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors space-y-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center justify-center font-bold text-xs">
                  0{index + 1}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide block">{partner.type}</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-indigo-600 transition-colors">
                    {partner.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">{partner.region}</div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
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
