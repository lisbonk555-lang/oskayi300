import React from 'react';
import { Award, Quote, ArrowRight, CheckCircle2, Clock, DollarSign, Layers, Globe } from 'lucide-react';
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
    <section id="ceo-message" className="py-20 bg-gradient-to-b from-slate-950 via-indigo-950/90 to-slate-950 text-white px-4 sm:px-8 border-b border-indigo-900/60 relative overflow-hidden">
      
      {/* Background Glows & Ambient Luxury Accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30 shadow-lg">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Executive Leadership & Vision</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Message from the President & CEO
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Connecting African and Global clientele to bespoke credit facilities, infrastructure capital, custom industry software, and licensed underwriting.
          </p>
        </div>

        {/* Executive Card Grid */}
        <div className="bg-slate-900/95 rounded-3xl border border-indigo-700/60 shadow-2xl overflow-hidden grid lg:grid-cols-12 gap-0 text-white backdrop-blur-xl">
          
          {/* Left Column: Executive Portrait & Identity */}
          <div className="lg:col-span-5 bg-slate-950 p-8 sm:p-10 flex flex-col justify-between relative border-r border-indigo-900/60">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              
              {/* Executive Tag */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                  Executive Office
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-indigo-950 uppercase tracking-wider shadow-sm">
                  Ghana Executive
                </span>
              </div>

              {/* President & CEO Details & Portrait */}
              <div className="space-y-4">
                <div className="relative group rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-slate-900 w-full sm:w-80 h-72 sm:h-80 mx-auto sm:mx-0">
                  <img
                    src="https://i.postimg.cc/sgnfk289/IMG-20260809-WA0040.jpg"
                    alt="Listowel Sarsah Adentwi-Edzii - President & CEO of Oskayi Consult"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-indigo-700/60 text-xs font-mono font-bold text-amber-300 flex items-center justify-between">
                    <span>President & CEO</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {OFFICIAL_COMPANY_INFO.founderAndCEO}
                  </h3>
                  <p className="text-amber-300 font-semibold text-sm tracking-wide">
                    President & Chief Executive Officer
                  </p>
                  <p className="text-slate-400 text-xs font-sans">
                    Oskayi Consult • Republic of Ghana
                  </p>
                </div>
              </div>

              {/* Compact Key Highlights */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Strategic Focus:</span>
                  <strong className="text-amber-300">Fintech, Credit & Infrastructure</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Headquarters:</span>
                  <strong className="text-white">McCarthy Hill, Accra, Ghana</strong>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 relative z-10">
              <span className="font-sans font-medium text-slate-300">Certified Leadership</span>
              {onOpenVerification && (
                <button
                  onClick={onOpenVerification}
                  className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 group transition-colors"
                >
                  <span>Company Credentials</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Elaborated CEO Message in Plain English */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-slate-900/90">
            
            <div className="space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-amber-300 shadow-lg">
                  <Quote className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">CEO Statement</span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white">
                    Empowering African & Global Clients With Bespoke Solutions
                  </h4>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  "At Oskayi Consult, our mission is to empower individuals, businesses, institutions, and governments across Africa and globally with high-impact financial and technological tools. Through our regulated international partners, we deliver custom solutions tailored specifically to suit your industry."
                </p>

                {/* Highlight Boxes */}
                <div className="space-y-3 pt-2">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-amber-300 font-mono">
                    Our Core Offerings & Disbursal Capabilities:
                  </h5>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    
                    {/* Credit Facilities Box */}
                    <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-800/80 space-y-2">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-300">Credit Facility Provision</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        Facilitating credit facilities with disbursement timelines from <strong className="text-white">Instant Approval</strong>, <strong className="text-white">24 Hours</strong>, <strong className="text-white">7 Days</strong>, <strong className="text-white">1 Month</strong>, to <strong className="text-white">3 Months</strong>.
                      </p>
                      <div className="pt-1 border-t border-indigo-900 flex items-center justify-between text-[10px] text-amber-300 font-mono">
                        <span>Amounts: $100 to $Billions</span>
                        <span className="text-emerald-400 font-bold">Regulated Partners</span>
                      </div>
                    </div>

                    {/* Inclusive Client Scale */}
                    <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-800/80 space-y-2">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Globe className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-300">Serving All Client Levels</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        Tailored for <strong className="text-white">Individuals, Groups, Organizations, Municipalities, Governments, Companies</strong>, and <strong className="text-white">Continental Development Blocks</strong>.
                      </p>
                      <div className="pt-1 border-t border-indigo-900 flex items-center justify-between text-[10px] text-amber-300 font-mono">
                        <span>Africa & Global Scope</span>
                        <span className="text-sky-300 font-bold">100% Custom</span>
                      </div>
                    </div>

                    {/* Custom Industry Software */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>Custom Industry Solutions</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-[11px]">
                        Custom software applications built to suit Telecom, Health, Education, Banking & Finance, Agriculture, and Public Sectors.
                      </p>
                    </div>

                    {/* Exclusive Insurance */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        <span>Exclusive Underwriting</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-[11px]">
                        Comprehensive policies for Individuals, Homes, Auto/Fleet, Projects, Loans, and Travel underwritten by international partners.
                      </p>
                    </div>

                  </div>
                </div>

                <p className="pt-2 text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                  "Whether you require a $100 instant micro-loan, an exclusive home or auto insurance policy, custom fintech software, or a multi-billion dollar project loan, Oskayi Consult is built to deliver with speed, trust, and excellence. <strong className="text-amber-300 font-semibold">Our role is to de-risk and accelerate. We bring the capital, the coverage, and the technology. You bring the mandate.</strong>"
                </p>
              </div>
            </div>

            {/* Signature & Action */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-white text-lg tracking-wide">
                  Listowel Sarsah Adentwi-Edzii
                </div>
                <div className="text-xs text-amber-300 font-semibold">
                  President & CEO • Oskayi Consult
                </div>
              </div>

              {onNavigateContact && (
                <button
                  onClick={onNavigateContact}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-indigo-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2"
                >
                  <span>Get In Touch With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
