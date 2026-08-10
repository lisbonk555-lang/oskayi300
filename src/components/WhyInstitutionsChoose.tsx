import React from 'react';
import { ShieldCheck, Zap, Globe2, ShieldAlert, Award, ArrowRight } from 'lucide-react';

interface WhyInstitutionsChooseProps {
  onNavigateContact?: () => void;
}

export const WhyInstitutionsChoose: React.FC<WhyInstitutionsChooseProps> = ({ onNavigateContact }) => {
  const reasons = [
    {
      number: "1",
      title: "Single Point of Access",
      subtitle: "One Engagement, Infinite Capital & Rails",
      icon: ShieldCheck,
      description: "One engagement with Oskayi Consult unlocks multiple regulated capital and insurance providers across Africa and globally. Eliminates fragmented vendor management.",
      badge: "Master Interface"
    },
    {
      number: "2",
      title: "Speed to Market",
      subtitle: "Instant to 90-Day Disbursal Timelines",
      icon: Zap,
      description: "Credit facilities structured from instant approval to 90 days. Technology deployment in weeks, not years. Backed by pre-certified compliance frameworks.",
      badge: "Rapid Execution"
    },
    {
      number: "3",
      title: "Africa-First, Globally Connected",
      subtitle: "Accra HQ • 35+ African Markets Served",
      icon: Globe2,
      description: "Headquartered in Ghana under Act 151. Serving 35+ African markets with local settlement, disbursement, and regulatory alignment connected directly to global treasury centers.",
      badge: "Pan-African Reach"
    },
    {
      number: "4",
      title: "Risk-Shared Model",
      subtitle: "Embedded Insurance & Compliance at Source",
      icon: ShieldAlert,
      description: "We embed insurance and compliance at the point of origination. This significantly reduces institutional risk and increases approval rates for end users and developers.",
      badge: "De-Risked Capital"
    },
    {
      number: "5",
      title: "Statutory & Regulated",
      subtitle: "Act 151 Registered • Licensed Partners",
      icon: Award,
      description: "Republic of Ghana Act 151 Registered. Operating under strict corporate governance alongside internationally licensed partners in banking, insurance, and technology.",
      badge: "100% Compliant"
    }
  ];

  return (
    <section id="why-oskayi" className="py-20 bg-slate-900 text-white px-4 sm:px-8 border-b border-indigo-900/60 relative overflow-hidden">
      
      {/* Background Mesh Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30 shadow-lg">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Institutional Competitive Advantage</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            WHY INSTITUTIONS CHOOSE OSKAYI CONSULT
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Positioned as the master gateway connecting governments, banks, enterprises, and individuals with global capital, risk coverage, and software rails.
          </p>
        </div>

        {/* 5 Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.number}
                className="p-6 rounded-3xl bg-slate-950 border border-indigo-800/80 hover:border-amber-400/70 transition-all shadow-xl space-y-4 relative flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-amber-300 font-mono font-bold border border-indigo-800">
                      {reason.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-mono font-extrabold text-sm">
                        0{reason.number}.
                      </span>
                      <h3 className="font-sans font-extrabold text-lg text-white group-hover:text-amber-300 transition-colors">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-slate-400 font-semibold">
                      {reason.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans pt-2 border-t border-slate-900">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Call to Action Card in the 6th Slot */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-950 border border-amber-400/60 shadow-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-indigo-950 font-extrabold text-[10px] uppercase font-mono tracking-wider">
                Get Started
              </span>
              <h3 className="font-sans font-extrabold text-xl text-white">
                Ready to Structure Your Facility or Solution?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Engage our executive leadership team directly to discuss custom credit lines, insurance underwriting, or software development.
              </p>
            </div>

            {onNavigateContact && (
              <button
                onClick={onNavigateContact}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <span>Initiate Executive Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
