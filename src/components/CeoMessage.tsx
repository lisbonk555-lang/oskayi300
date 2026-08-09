import React from 'react';
import { Award, ShieldCheck, Phone, Mail, Building2, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface CeoMessageProps {
  onOpenVerification?: () => void;
  onNavigateContact?: () => void;
}

export const CeoMessage: React.FC<CeoMessageProps> = ({
  onOpenVerification,
  onNavigateContact
}) => {
  return (
    <section id="ceo-message" className="py-20 bg-slate-50 text-slate-900 px-4 sm:px-8 border-b border-slate-200 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-50/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider border border-indigo-200 shadow-sm">
            <Award className="w-3.5 h-3.5 text-indigo-700" />
            <span>Executive Governance & Vision</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-indigo-950">
            Message from the Founder & CEO
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Leading Oskayi Consult with unyielding commitment to capital integrity, regulatory governance, and transformative financial engineering across Africa and global markets.
          </p>
        </div>

        {/* Executive Card Grid */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid lg:grid-cols-12 gap-0">
          
          {/* Left Column: Executive Portrait & Statutory Credentials */}
          <div className="lg:col-span-5 bg-indigo-950 text-white p-8 sm:p-10 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              
              {/* Executive Tag */}
              <div className="flex items-center justify-between border-b border-indigo-800/80 pb-4">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                  Executive Office
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-indigo-950 uppercase tracking-wider shadow-sm">
                  ROC Ghana Registered
                </span>
              </div>

              {/* Founder Details */}
              <div className="space-y-3">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-indigo-600 p-0.5 shadow-lg">
                  <div className="w-full h-full bg-indigo-950 rounded-[14px] flex items-center justify-center font-serif font-extrabold text-amber-300 text-3xl border border-indigo-500/30">
                    LA
                  </div>
                </div>

                <div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {OFFICIAL_COMPANY_INFO.founderAndCEO}
                  </h3>
                  <p className="text-amber-300 font-semibold text-sm tracking-wide mt-0.5">
                    Founder & Chief Executive Officer
                  </p>
                  <p className="text-indigo-200 text-xs font-mono mt-1">
                    Oskayi Consult • Republic of Ghana (BN248851025)
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-900/60 border border-indigo-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-indigo-100">
                  <span className="text-indigo-300">Statutory Tax ID (TIN):</span>
                  <strong className="font-mono text-white">{OFFICIAL_COMPANY_INFO.tin}</strong>
                </div>
                <div className="flex items-center justify-between text-indigo-100">
                  <span className="text-indigo-300">ISIC Classification:</span>
                  <strong className="font-mono text-amber-300">{OFFICIAL_COMPANY_INFO.isicCode} (Business Support)</strong>
                </div>
                <div className="flex items-center justify-between text-indigo-100">
                  <span className="text-indigo-300">HQ Location:</span>
                  <strong className="text-white">McCarthy Hill, Accra, Ghana</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs text-indigo-200">
                <a href={`tel:${OFFICIAL_COMPANY_INFO.contactPhone}`} className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>{OFFICIAL_COMPANY_INFO.contactPhone}</span>
                </a>
                <a href={`mailto:${OFFICIAL_COMPANY_INFO.primaryEmail}`} className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-amber-300" />
                  <span>{OFFICIAL_COMPANY_INFO.primaryEmail}</span>
                </a>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-8 border-t border-indigo-800/80 flex items-center justify-between text-xs text-indigo-200 relative z-10">
              <span className="font-mono text-[11px]">Act 151 Compliant</span>
              {onOpenVerification && (
                <button
                  onClick={onOpenVerification}
                  className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 group transition-colors"
                >
                  <span>Verify Registry Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Inspired CEO Statement & Principles */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-white">
            
            {/* Big Quote Symbol */}
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <Quote className="w-6 h-6 text-indigo-600" />
              </div>

              <div className="space-y-4">
                <h4 className="text-xl sm:text-2xl font-extrabold text-indigo-950 leading-snug">
                  "Empowering Global Institutional Growth, Infrastructure Financing & Frontier Technology."
                </h4>
                
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  At Oskayi Consult, our founding mandate is clear: to bridge capital gaps and accelerate institutional growth across Ghana, Africa, and global emerging markets by engineering world-class financial technology, project financing structures, and enterprise Web3 solutions.
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  We do not rely on standard conventional approaches. By orchestrating a global network of certified integrated partners across banking, capital syndication, reinsurance, and blockchain architecture, Oskayi Consult delivers institutional solutions with uncompromised regulatory compliance and execution precision.
                </p>
              </div>

              {/* Core Executive Commitments */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs text-indigo-950 uppercase tracking-wide">Institutional Governance</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Strict adherence to Bank of Ghana, GRA, and Registrar of Companies standards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs text-indigo-950 uppercase tracking-wide">Integrated Global Network</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Connecting local infrastructure opportunities directly to global capital consortia.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature & Consultation Action */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-serif font-bold text-indigo-950 text-lg tracking-wide">
                  Listowel Sarsah Adentwi-Edzii
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Founder & CEO, Oskayi Consult
                </div>
              </div>

              {onNavigateContact && (
                <button
                  onClick={onNavigateContact}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Request Executive Consultation</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
