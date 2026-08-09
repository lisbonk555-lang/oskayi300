import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Mail, Copy, Check, ExternalLink, Building2, Globe } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

export const ContactAndLocation: React.FC = () => {
  const [copiedGps, setCopiedGps] = useState(false);

  const handleCopyGps = () => {
    navigator.clipboard.writeText(OFFICIAL_COMPANY_INFO.digitalAddress);
    setCopiedGps(true);
    setTimeout(() => setCopiedGps(false), 2000);
  };

  return (
    <section className="py-20 bg-slate-950 text-slate-100 px-4 sm:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>Headquarters & Digital Address</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Principal Place of Business
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Located in Accra, Ghana, servicing international partners and clients across West Africa and globally.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Location Cards */}
          <div className="lg:col-span-6 bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif font-bold text-xl text-white">
                    McCarthy Hill Headquarters
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  ACCRA, GHANA
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-mono">Ghana Post Digital Address</span>
                  <div className="text-lg font-bold text-amber-300 font-mono flex items-center justify-between">
                    <span>{OFFICIAL_COMPANY_INFO.digitalAddress}</span>
                    <button
                      onClick={handleCopyGps}
                      className="text-xs px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded border border-slate-700 flex items-center gap-1 transition-colors"
                    >
                      {copiedGps ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                      <span>{copiedGps ? 'Copied' : 'Copy GPS'}</span>
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Postal Digital Address: {OFFICIAL_COMPANY_INFO.postalDigitalAddress}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-mono">Physical Building Location</span>
                  <div className="text-sm font-semibold text-slate-200">
                    {OFFICIAL_COMPANY_INFO.physicalAddress}
                  </div>
                  <div className="text-[10px] text-slate-500">District: Ga South • Region: Greater Accra, Ghana</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-mono">Postal Address</span>
                  <div className="text-sm font-semibold text-slate-200 font-mono">
                    {OFFICIAL_COMPANY_INFO.postalAddress}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <a
                href={`tel:${OFFICIAL_COMPANY_INFO.contactPhone}`}
                className="flex items-center gap-1.5 text-amber-400 hover:underline font-mono font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +233 24 490 5505</span>
              </a>

              <a
                href={`mailto:${OFFICIAL_COMPANY_INFO.primaryEmail}`}
                className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{OFFICIAL_COMPANY_INFO.primaryEmail}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Representation Box */}
          <div className="lg:col-span-6 bg-slate-900 p-8 rounded-2xl border border-amber-500/30 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-sky-400" />
                  <h3 className="font-serif font-bold text-lg text-white">
                    Geographic Location Coordinates
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  5.5684° N, 0.2891° W (McCarthy Hill)
                </span>
              </div>

              {/* Map Preview Illustration Box */}
              <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 p-4 relative flex flex-col items-center justify-center text-center space-y-3 overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                
                {/* Glowing Location Pin */}
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-amber-400 animate-bounce" />
                </div>

                <div className="space-y-1 relative z-10">
                  <div className="font-serif font-bold text-sm text-white">
                    OSKAYI CONSULT HEADQUARTERS
                  </div>
                  <div className="text-xs text-amber-300 font-mono font-semibold">
                    GA-183-8165 • McCarthy Hill, Accra
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Near Presby Church, House No. 352
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("McCarthy Hill, Accra, Ghana")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex justify-between items-center">
              <span>Jurisdiction: Republic of Ghana</span>
              <span className="text-amber-400 font-bold">Act 151 Registered</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
