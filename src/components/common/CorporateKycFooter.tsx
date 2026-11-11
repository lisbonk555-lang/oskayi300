import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck2, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  ExternalLink,
  Layers,
  Cpu,
  TrendingUp,
  FileText
} from 'lucide-react';

export const CorporateKycFooter: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <footer className="border-t-2 border-[#FFD700]/40 bg-[#071329] text-slate-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-auto font-sans relative z-20">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Gold Verification Badge Ribbon */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0A1F44] to-slate-900 border border-[#FFD700]/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-amber-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#071329] rounded-[10px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#FFD700]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-white text-base tracking-wider">
                  OSKAYI CONSULT
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 uppercase">
                  Republic of Ghana • Official KYC
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Registered under the Registration of Business Names Act, 1962 (Act 151) • Office of the Registrar of Companies
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Statutory KYC Verified Active
            </span>
          </div>
        </div>

        {/* 4-Column Corporate Information & Legal Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          
          {/* Col 1: Statutory Registration & Tax Details */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-[#FFD700] font-bold uppercase tracking-wider text-[11px]">
              <FileCheck2 className="w-4 h-4" />
              Corporate Identity & TIN
            </div>

            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Registration Number</span>
                  <span className="font-mono font-black text-white text-sm">BN248851025</span>
                </div>
                <button
                  onClick={() => copyToClipboard('BN248851025', 'reg')}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-[#FFD700] transition-colors"
                  title="Copy Registration Number"
                >
                  {copiedKey === 'reg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Tax Identification Number (TIN)</span>
                  <span className="font-mono font-black text-[#FFD700] text-sm">P0000590118</span>
                </div>
                <button
                  onClick={() => copyToClipboard('P0000590118', 'tin')}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-[#FFD700] transition-colors"
                  title="Copy Tax Identification Number"
                >
                  {copiedKey === 'tin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="text-[11px] text-slate-400 pt-1">
                Registrar: <strong className="text-slate-200">Office of the Registrar of Companies (ORC)</strong>, Accra, Ghana.
              </div>
            </div>
          </div>

          {/* Col 2: Registered Objects & Sectors */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-[11px]">
              <Layers className="w-4 h-4" />
              Registered Objects & Mandate
            </div>

            <ul className="space-y-2 text-[11px] text-slate-300">
              <li className="flex items-start gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Information & Communication Technology (ICT) Services</span>
              </li>
              <li className="flex items-start gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Project Development & Infrastructure Management</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Financial Consultancy & Enterprise Advisory</span>
              </li>
              <li className="flex items-start gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>ISIC: Other Business Support Service Activities n.e.c.</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Physical Address & Location Details */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider text-[11px]">
              <MapPin className="w-4 h-4" />
              Principal Place of Business
            </div>

            <div className="text-[11px] text-slate-300 space-y-2 leading-relaxed">
              <p>
                <strong className="text-white block">Building / Street Address:</strong>
                House No. 352, McCarthy Hill, GA South Municipal District, Accra, Greater Accra Region, Republic of Ghana
              </p>
              <p>
                <strong className="text-white block">Postal Address:</strong>
                P.O. Box 110/FMB/DTB, Accra, Ghana
              </p>
              <div className="text-[10px] text-slate-500 pt-1">
                Data Protection Act 2012 (Act 843) Compliant
              </div>
            </div>
          </div>

          {/* Col 4: Corporate Communications & Direct Reach */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              <Mail className="w-4 h-4" />
              Executive Contact Desk
            </div>

            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Official Corporate Email</span>
                <a 
                  href="mailto:info@oskayi.com" 
                  className="font-mono text-[#FFD700] hover:underline font-semibold flex items-center gap-1 mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  info@oskayi.com
                </a>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Direct Telephone / WhatsApp</span>
                <a 
                  href="tel:+233244905505" 
                  className="font-mono text-white hover:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  +233 24 490 5505 / 0244905505
                </a>
              </div>

              <div className="pt-2 border-t border-slate-800 flex flex-col gap-1 text-[10px] text-slate-400">
                <a 
                  href="https://bundlezonegh.com/store/oskayi" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#FFD700] transition-colors flex items-center gap-1"
                >
                  Cheap Data: bundlezonegh.com/store/oskayi <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a 
                  href="https://oskatel.telzivo.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                  eSIM Store: oskatel.telzivo.com <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Statutory Bottom Signoff Strip */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-slate-300">OSKAYI CONSULT</strong>. All statutory business rights reserved under Act 151.
          </div>
          <div className="flex items-center gap-4">
            <span>Registration: <strong>BN248851025</strong></span>
            <span>•</span>
            <span>TIN: <strong>P0000590118</strong></span>
            <span>•</span>
            <span>Accra, Ghana</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
