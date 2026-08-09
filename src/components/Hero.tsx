import React from 'react';
import { ShieldCheck, ChevronRight, Calculator, Globe, Building2, Layers, Award } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface HeroProps {
  onOpenVerification: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVerification, onNavigateSection }) => {
  return (
    <section className="relative bg-slate-950 text-white pt-10 pb-16 px-4 sm:px-8 overflow-hidden border-b border-indigo-900/50">
      {/* Background Decorative Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column / Deep Indigo Hero Card */}
          <div className="lg:col-span-7 space-y-6 bg-indigo-950/90 rounded-2xl p-6 sm:p-8 border border-indigo-800/80 shadow-2xl backdrop-blur-md">
            
            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold tracking-wide shadow-inner">
              <Award className="w-4 h-4 text-amber-300" />
              <span>ESTABLISHED & INCORPORATED • Ghana Reg No. {OFFICIAL_COMPANY_INFO.registrationNumber}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Integrated Global Consultancy & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Fintech Solutions
              </span>
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              Oskayi Consult is a Ghana-incorporated firm delivering premium services through an international network of <strong className="text-amber-300 font-semibold">integrated partners</strong> across Fintech, Insurance, Project Financing, and Enterprise Web3 Development.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigateSection('services')}
                className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateSection('calculator')}
                className="w-full sm:w-auto px-5 py-3 bg-indigo-900/80 hover:bg-indigo-800 text-white border border-indigo-700 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-amber-300" />
                <span>Finance Estimator</span>
              </button>

              <button
                onClick={onOpenVerification}
                className="w-full sm:w-auto px-4 py-3 bg-slate-950/80 hover:bg-slate-900 text-amber-300 border border-indigo-700/50 font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verify Credentials</span>
              </button>
            </div>

            {/* Statutory Identity Row */}
            <div className="pt-6 border-t border-indigo-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-indigo-900">
                <div className="text-[10px] text-indigo-300 font-medium uppercase tracking-wider">Registration No</div>
                <div className="text-xs font-bold text-amber-300 font-mono mt-0.5">{OFFICIAL_COMPANY_INFO.registrationNumber}</div>
                <div className="text-[10px] text-slate-400">ROC Republic of Ghana</div>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-indigo-900">
                <div className="text-[10px] text-indigo-300 font-medium uppercase tracking-wider">TIN Identification</div>
                <div className="text-xs font-bold text-slate-200 font-mono mt-0.5">{OFFICIAL_COMPANY_INFO.tin}</div>
                <div className="text-[10px] text-slate-400">Ghana Revenue Authority</div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-slate-950/60 p-3 rounded-xl border border-indigo-900">
                <div className="text-[10px] text-indigo-300 font-medium uppercase tracking-wider">Ghana Post GPS</div>
                <div className="text-xs font-bold text-sky-300 font-mono mt-0.5">{OFFICIAL_COMPANY_INFO.digitalAddress}</div>
                <div className="text-[10px] text-slate-400">McCarthy Hill, Accra</div>
              </div>
            </div>

          </div>

          {/* Right Visual Image & Architecture Graphic Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-indigo-800/80 shadow-2xl bg-indigo-950 group">
              <img
                src="/src/assets/images/oskayi_hero_banner_1786276653763.jpg"
                alt="Oskayi Consult Corporate Headquarters & Global Network"
                className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/40 to-transparent" />

              {/* Floating Highlight Cards on Image */}
              <div className="absolute top-4 left-4 right-4 bg-indigo-950/90 backdrop-blur-md p-3 rounded-xl border border-indigo-700/60 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-medium text-slate-100">International Integrated Partner Rails</span>
                </div>
                <span className="text-emerald-400 font-mono text-[10px] uppercase bg-emerald-950/80 px-2 py-0.5 rounded font-bold border border-emerald-800/50">ACTIVE</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-indigo-950/95 backdrop-blur-md p-4 rounded-xl border border-indigo-800 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-200 font-semibold border-b border-indigo-800 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-300" />
                    Oskayi Consult Core Pillars
                  </span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded font-mono font-bold">ISIC 8299</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[11px] text-indigo-100/80">
                  <div className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-amber-300" />
                    <span>Fintech Banking Rails</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-sky-300" />
                    <span>Cross-Border Payments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-emerald-300" />
                    <span>Project Financing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-purple-300" />
                    <span>Web3 Custom Apps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
