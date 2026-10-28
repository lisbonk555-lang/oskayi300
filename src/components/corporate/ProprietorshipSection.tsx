import React from 'react';
import { UserCheck, Shield, Award, Landmark, Quote, ArrowRight, Mail } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../../data/companyData';

interface ProprietorshipSectionProps {
  onNavigateContact: () => void;
}

export function ProprietorshipSection({ onNavigateContact }: ProprietorshipSectionProps) {
  return (
    <section id="proprietor" className="py-20 lg:py-28 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            <span>Executive Governance & Proprietorship · Part IV & Part X</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proprietor & Principal Leadership
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Statutory ownership, executive stewardship, and institutional vision guiding Oskayi Consult's 
            advisory and technology mandates across West Africa.
          </p>
        </div>

        {/* 2-Column Split: Executive Portrait & Statutory Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Executive Boardroom Photograph */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden relative">
                <img
                  src="/src/assets/images/oskayi_executive_consulting_1793148101883.jpg"
                  alt="Listowel Sarsah Adentwi-Edzii Executive Consulting Session"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              </div>

              {/* Caption Card */}
              <div className="p-6 bg-slate-950/95 border-t border-slate-800">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                  FOUNDER, PROPRIETOR & PRINCIPAL CONSULTANT
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  Listowel Sarsah Adentwi-Edzii
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  TIN: {OFFICIAL_COMPANY_INFO.tin} · Ghanaian · Accra, Ghana
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Statement & Governance Matrix */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Quote Block */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 relative mb-8">
              <Quote className="w-10 h-10 text-amber-500/20 absolute top-6 right-6" />
              
              <div className="text-base sm:text-lg text-slate-200 leading-relaxed font-serif italic mb-6">
                “Economic and technological sovereignty in Africa requires more than aspiration—it demands 
                rigorous statutory discipline, robust financial engineering, and enterprise ICT architectures 
                built to institutional standards. At Oskayi Consult, every mandate is grounded in transparency, 
                regulatory adherence, and measurable real-world impact.”
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono">
                <span className="text-amber-400 font-bold">Listowel Sarsah Adentwi-Edzii</span>
                <span className="text-slate-400">Proprietor Attestation · Act 151</span>
              </div>
            </div>

            {/* Statutory Leadership Credentials (Unboxed) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono mb-8">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 uppercase block mb-1">Registration Authority</span>
                <span className="text-white font-bold">Office of the Registrar of Companies</span>
                <span className="text-slate-400 block mt-0.5 text-[11px]">Republic of Ghana</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 uppercase block mb-1">Statutory Certificate No</span>
                <span className="text-amber-400 font-bold text-sm">{OFFICIAL_COMPANY_INFO.registrationNumber}</span>
                <span className="text-slate-400 block mt-0.5 text-[11px]">Sole Proprietorship</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 uppercase block mb-1">Principal Executive Desk</span>
                <span className="text-white font-bold">McCarthy Hill, Accra</span>
                <span className="text-slate-400 block mt-0.5 text-[11px]">Digital Address: GA-183-8165</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-400 uppercase block mb-1">Direct Executive Directives</span>
                <span className="text-white font-bold">info@oskayi.com</span>
                <span className="text-slate-400 block mt-0.5 text-[11px]">Mobile: +233 24 490 5505</span>
              </div>
            </div>

            {/* Direct Contact Action */}
            <div className="flex items-center gap-4">
              <button
                onClick={onNavigateContact}
                className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Request Executive Engagement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:info@oskayi.com?subject=Attention%20Proprietor%20Listowel%20Sarsah"
                className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>info@oskayi.com</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
