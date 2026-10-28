import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Mail, Globe, Copy, CheckCircle2, ExternalLink } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../../data/companyData';

export function OperatingOfficesSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Headquarters & Jurisdiction · Part II Address Filing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Principal Place of Business & Operating Hubs
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Officially verified premises under Act 151, serving clients and institutional stakeholders locally 
            in Ghana and across international financial corridors.
          </p>
        </div>

        {/* 2-Column Split: Detailed Physical Hubs & Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Statutory Address Cards */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            
            {/* Primary Physical Location Card */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                  Principal Place of Business
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ROC Registered</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                McCarthy Hill Executive Suite
              </h3>

              <div className="text-sm text-slate-300 space-y-1 mb-6">
                <p>House Number 352, McCarthy Hill</p>
                <p>Unknown Street, near the Presby Church</p>
                <p>Accra, Ga South District, Greater Accra Region, Ghana</p>
              </div>

              {/* Digital Address Strip */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">GhanaPost Digital Address</div>
                  <div className="text-lg font-mono font-bold text-amber-400 mt-0.5">
                    {OFFICIAL_COMPANY_INFO.digitalAddress}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(OFFICIAL_COMPANY_INFO.digitalAddress, 'dig-addr')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors flex items-center gap-1"
                >
                  {copiedKey === 'dig-addr' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'dig-addr' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Postal & Regional Desks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono uppercase text-slate-400 mb-2">Postal Registry</div>
                <div className="text-sm font-semibold text-white">{OFFICIAL_COMPANY_INFO.postalAddress}</div>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Secondary: P.O. Box 119988, Accra North
                </div>
                <div className="text-xs font-mono text-amber-400 mt-2">
                  Digital: {OFFICIAL_COMPANY_INFO.postalDigitalAddress}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono uppercase text-slate-400 mb-2">Jurisdiction</div>
                <div className="text-sm font-semibold text-white">Republic of Ghana</div>
                <div className="text-xs text-slate-400 mt-1">
                  District: {OFFICIAL_COMPANY_INFO.district}
                </div>
                <div className="text-xs font-mono text-emerald-400 mt-2">
                  Region: {OFFICIAL_COMPANY_INFO.region}
                </div>
              </div>

            </div>

            {/* Communications Bar */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400" />
                <a href="tel:0244905505" className="hover:text-white font-bold">
                  {OFFICIAL_COMPANY_INFO.mobileNo} / {OFFICIAL_COMPANY_INFO.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400" />
                <a href="mailto:info@oskayi.com" className="hover:text-amber-400 font-bold">
                  info@oskayi.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Globe className="w-4 h-4 text-slate-500" />
                <span>www.oskayi.com</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Spatial Map & Directions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl h-full flex flex-col">
              
              {/* Map Preview Graphic */}
              <div className="relative flex-grow min-h-[300px] bg-slate-900 flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
                
                {/* Visual Radar / Location Beacon */}
                <div className="relative text-center z-10">
                  <div className="w-16 h-16 rounded-full bg-amber-400/10 border-2 border-amber-400/40 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <MapPin className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="text-base font-bold text-white">
                    McCarthy Hill · Accra
                  </div>
                  <div className="text-xs font-mono text-amber-400 mt-1">
                    Digital Address: {OFFICIAL_COMPANY_INFO.digitalAddress}
                  </div>
                  <div className="text-xs text-slate-400 max-w-xs mx-auto mt-2">
                    Near Presbyterian Church of Ghana · Ga South Municipal Jurisdiction
                  </div>
                </div>

                {/* Coordinates Graphic Watermark */}
                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-600">
                  LAT: 5.5781° N · LON: -0.3015° W · GREATER ACCRA
                </div>
              </div>

              {/* Map Actions */}
              <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-white">Navigate to Office</div>
                  <div className="text-[11px] text-slate-400">Available during standard business hours (8AM - 5PM GMT)</div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('McCarthy Hill Accra Ghana')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold font-mono transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
