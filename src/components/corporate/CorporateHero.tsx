import React, { useState } from 'react';
import { ShieldCheck, Copy, CheckCircle2, ArrowRight, FileCheck, Building, Landmark } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../../data/companyData';

interface CorporateHeroProps {
  onNavigateSection: (sectionId: string) => void;
}

export function CorporateHero({ onNavigateSection }: CorporateHeroProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  return (
    <section id="overview" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-slate-950">
      
      {/* Background Lighting Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none blur-3xl" />
      <div className="absolute -top-32 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unboxed Editorial Kicker (Zero-Pill compliant) */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-400/90 mb-4">
          <Landmark className="w-4 h-4 text-amber-400" />
          <span>REPUBLIC OF GHANA</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>OFFICE OF THE REGISTRAR OF COMPANIES</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>ACT 151 (1962)</span>
        </div>

        {/* Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.12] mb-6 text-balance">
                Information Technology, Strategic Project Development & Financial Consultancy
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                Registered under the Registration of Business Names Act, 1962 (Act 151) as{' '}
                <strong className="text-white font-semibold">OSKAYI CONSULT</strong>. We deliver institutional ICT
                architecture, capital development advisory, and sovereign-grade financial structuring for corporations,
                public sector partners, and international development consortia.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => onNavigateSection('services')}
                  className="px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-400/15 flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Explore Practice Areas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigateSection('statutory-verification')}
                  className="px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <FileCheck className="w-4 h-4 text-amber-400" />
                  <span>Verify Registration & Form A</span>
                </button>
              </div>
            </div>

            {/* Statutory Credential Micro-Strip (Unboxed, Tabular numerals) */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400">Registration No</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                    {OFFICIAL_COMPANY_INFO.registrationNumber}
                  </span>
                  <button
                    onClick={() => copyToClipboard(OFFICIAL_COMPANY_INFO.registrationNumber, 'reg')}
                    className="text-slate-400 hover:text-white"
                    title="Copy Registration Number"
                  >
                    {copiedField === 'reg' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400">Tax ID (TIN)</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">
                    {OFFICIAL_COMPANY_INFO.tin}
                  </span>
                  <button
                    onClick={() => copyToClipboard(OFFICIAL_COMPANY_INFO.tin, 'tin')}
                    className="text-slate-400 hover:text-white"
                    title="Copy TIN"
                  >
                    {copiedField === 'tin' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400">ISIC Activity</div>
                <div className="mt-1 font-mono text-sm font-bold text-slate-200 tabular-nums">
                  {OFFICIAL_COMPANY_INFO.isicCode} (N.E.C.)
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400">Digital Address</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">
                    {OFFICIAL_COMPANY_INFO.digitalAddress}
                  </span>
                  <button
                    onClick={() => copyToClipboard(OFFICIAL_COMPANY_INFO.digitalAddress, 'dig')}
                    className="text-slate-400 hover:text-white"
                    title="Copy Digital Address"
                  >
                    {copiedField === 'dig' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Focal Carrier with Institutional Credential Frame */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              
              {/* High-fidelity generated architectural image */}
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src="/src/assets/images/oskayi_corporate_headquarters_1793148101135.jpg"
                  alt="Oskayi Consult Corporate Architecture"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>

              {/* Institutional Statutory Plaque */}
              <div className="p-6 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>STATUTORY REGISTRATION SUMMARY</span>
                    </div>
                    <div className="text-base font-bold text-white tracking-wide">
                      OSKAYI CONSULT
                    </div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Sole Proprietorship registered under Act 151 · Office of the Registrar of Companies · Greater Accra, Ghana.
                    </div>
                  </div>
                  <div className="shrink-0 p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-wider">STATUS</div>
                    <div className="text-xs font-bold font-mono">ACTIVE</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Registered: 01-Oct-2025</span>
                  <span className="text-amber-400 font-medium">Head Office: McCarthy Hill</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
