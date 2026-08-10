import React, { useState } from 'react';
import { X, ShieldCheck, Award, Building2, CheckCircle2, Copy, Check, FileText, ExternalLink, Printer } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCredentials = () => {
    const text = `OSKAYI CONSULT\nROC Ghana Registration No: ${OFFICIAL_COMPANY_INFO.registrationNumber}\nTIN: ${OFFICIAL_COMPANY_INFO.tin}\nPresident & CEO: ${OFFICIAL_COMPANY_INFO.founderAndCEO}\nDigital Address: ${OFFICIAL_COMPANY_INFO.digitalAddress}\nAccra, Ghana`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  Certificate of Registration Verification
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  OFFICIALLY REGISTERED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Office of the Registrar of Companies • Republic of Ghana (Act 151)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Replica Certificate View */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Certificate Frame Display */}
          <div className="bg-slate-950 p-6 sm:p-8 rounded-xl border-2 border-amber-500/30 space-y-6 relative overflow-hidden shadow-inner">
            
            <div className="text-center space-y-2 border-b border-slate-800 pb-6">
              <div className="flex justify-center items-center gap-2 text-amber-400 font-serif font-bold text-sm tracking-widest uppercase">
                <Award className="w-5 h-5" />
                <span>Republic of Ghana</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                Office of the Registrar of Companies
              </h4>
              <p className="text-xs text-slate-400 font-serif italic">
                The Registration of Business Names Act, 1962 (Act 151)
              </p>
              <div className="pt-2 font-serif text-2xl font-bold text-amber-300 uppercase tracking-widest">
                Certificate of Registration
              </div>
            </div>

            {/* Official Registration Number & TIN Bar */}
            <div className="grid sm:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Registration Number</span>
                <div className="text-base font-bold text-amber-400">{OFFICIAL_COMPANY_INFO.registrationNumber}</div>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Tax Identification Number (TIN)</span>
                <div className="text-base font-bold text-slate-200">{OFFICIAL_COMPANY_INFO.tin}</div>
              </div>
            </div>

            {/* Main Certificate Declaration */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              <p>
                I hereby certify that the following Business Name has been registered under the above-mentioned Act as No. <strong className="text-amber-300 font-mono">{OFFICIAL_COMPANY_INFO.registrationNumber}</strong>, viz:
              </p>
              
              <div className="p-4 bg-slate-900 rounded-lg text-center border border-amber-500/20">
                <span className="font-serif text-2xl font-extrabold text-white tracking-widest">
                  {OFFICIAL_COMPANY_INFO.companyName}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">Date of Registration:</span>
                  <strong className="text-slate-200">{OFFICIAL_COMPANY_INFO.registrationDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Commencement Date:</span>
                  <strong className="text-slate-200">{OFFICIAL_COMPANY_INFO.startDate}</strong>
                </div>
              </div>
            </div>

            {/* Executive & Address Details (Form A Verification) */}
            <div className="border-t border-slate-800 pt-6 space-y-4 text-xs font-sans">
              <h5 className="font-bold text-amber-400 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                Form A Statutory Details (Republic of Ghana ROC)
              </h5>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px]">Executive Leadership</span>
                  <div className="font-bold text-white">{OFFICIAL_COMPANY_INFO.founderAndCEO}</div>
                  <div className="text-[10px] text-amber-400">President & CEO</div>
                </div>

                <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px]">ISIC Code 8299 Classification</span>
                  <div className="font-bold text-slate-200">{OFFICIAL_COMPANY_INFO.isicDescription}</div>
                  <div className="text-[10px] text-slate-400">Primary Business Activity</div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1 text-xs">
                <span className="text-slate-400 text-[10px] uppercase font-mono">Principal Place of Business & Digital Address</span>
                <div className="font-semibold text-slate-200">{OFFICIAL_COMPANY_INFO.physicalAddress}</div>
                <div className="text-amber-300 font-mono text-[11px] pt-1">
                  Ghana Post Digital Address: {OFFICIAL_COMPANY_INFO.digitalAddress} (Postal Digital: {OFFICIAL_COMPANY_INFO.postalDigitalAddress})
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-950 p-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Verified with Office of Registrar of Companies, Ghana</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyCredentials}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'Copied' : 'Copy Registration Info'}</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
