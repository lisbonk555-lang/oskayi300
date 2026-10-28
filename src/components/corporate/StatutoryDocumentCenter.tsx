import React, { useState } from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Building2, 
  UserCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Stamp,
  Download,
  Printer
} from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../../data/companyData';

export function StatutoryDocumentCenter() {
  const [activeTab, setActiveTab] = useState<'certificate' | 'form-a' | 'compliance-summary'>('certificate');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="statutory-verification" className="py-20 lg:py-28 bg-slate-900/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Government Registration & Statutory Filing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Statutory Document & Certificate Verification
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Direct transcription and institutional proof from the official Form A filing and Certificate of Registration 
            issued by the Office of the Registrar of Companies (ROC), Republic of Ghana.
          </p>
        </div>

        {/* Interactive Document Mode Switcher (Clean Segmented Tab Controls) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl max-w-xl mb-8">
          <button
            onClick={() => setActiveTab('certificate')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'certificate'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Stamp className="w-3.5 h-3.5" />
            <span>Certificate of Registration</span>
          </button>
          
          <button
            onClick={() => setActiveTab('form-a')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'form-a'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Form A Statutory Filing</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance-summary')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'compliance-summary'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Due Diligence Digest</span>
          </button>
        </div>

        {/* Tab 1: Authentic Certificate of Registration */}
        {activeTab === 'certificate' && (
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl bg-gradient-to-b from-stone-900/90 to-slate-950 border-2 border-amber-500/40 p-8 sm:p-12 shadow-2xl overflow-hidden print:border-black print:text-black print:bg-white">
              
              {/* Subtle Gold Watermark Seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-[12px] border-amber-500/5 pointer-events-none flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border border-amber-500/10 flex items-center justify-center">
                  <span className="text-amber-500/5 font-serif font-bold text-4xl uppercase tracking-widest text-center px-4">
                    Republic of Ghana
                  </span>
                </div>
              </div>

              {/* Certificate Header */}
              <div className="text-center relative z-10 border-b border-amber-500/20 pb-8 mb-8">
                <div className="inline-block mb-3 p-3 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-400">
                  <Stamp className="w-8 h-8 mx-auto" />
                </div>
                <div className="text-xs uppercase tracking-widest font-mono text-slate-400">
                  REPUBLIC OF GHANA
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide mt-1">
                  OFFICE OF THE REGISTRAR OF COMPANIES
                </h3>
                <div className="text-xs font-mono text-amber-400 mt-1">
                  The Registration of Business Names Act, 1962 (No. 151)
                </div>
                <div className="text-sm font-semibold uppercase tracking-widest text-amber-300 mt-3 underline decoration-amber-500/50 underline-offset-4">
                  CERTIFICATE OF REGISTRATION
                </div>
              </div>

              {/* Certificate Main Text */}
              <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto py-4">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  I hereby certify that the following Business Name has been registered under the above-mentioned Act as No.
                </p>

                <div className="py-2">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-widest">
                    BN248851025
                  </span>
                  <div className="text-[11px] font-mono text-slate-400 uppercase mt-1">viz:</div>
                </div>

                <div className="p-6 rounded-xl bg-amber-400/5 border border-amber-500/30">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wider text-white">
                    OSKAYI CONSULT
                  </span>
                </div>

                <div className="pt-4 text-slate-300 text-sm">
                  Dated this <strong className="text-white">1st day of October 2025</strong>
                </div>

                <div className="pt-6 flex flex-col items-center justify-center">
                  <div className="w-48 border-b border-slate-600 mb-2"></div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    For: Registrar of Business Names
                  </div>
                  <div className="text-[11px] font-mono text-amber-400/80 mt-1">
                    Taxpayer Identification Number (TIN): {OFFICIAL_COMPANY_INFO.tin}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 relative z-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Officially Verified with Registrar of Companies</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => copyToClipboard(OFFICIAL_COMPANY_INFO.registrationNumber, 'cert-reg')}
                    className="hover:text-amber-400 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedKey === 'cert-reg' ? 'Copied Number!' : 'Copy Reg No'}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="hover:text-amber-400 flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Document</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Full Form A Statutory Filing Breakdown (Part I to Part X) */}
        {activeTab === 'form-a' && (
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Form A Heading Banner */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-amber-400">FORM A — STATUTORY REGISTRATION FILING</div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  The Registration of Business Names Act, 1962 (Act 151)
                </h3>
                <div className="text-xs text-slate-400 mt-1">
                  Sole Proprietorship Registration Document Transcription
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">REG NO:</span>{' '}
                  <strong className="text-amber-400">{OFFICIAL_COMPANY_INFO.registrationNumber}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">TIN:</span>{' '}
                  <strong className="text-slate-200">{OFFICIAL_COMPANY_INFO.tin}</strong>
                </div>
              </div>
            </div>

            {/* Part I: Business Details & Objects */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono uppercase text-amber-400 mb-3 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Part I — Business Details</span>
                <span className="text-slate-400">Sole Proprietorship</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block uppercase">Nature of Business / Sector(s)</span>
                  <p className="text-white font-sans text-sm font-semibold mt-1">
                    {OFFICIAL_COMPANY_INFO.principalActivity}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Objects of the Company</span>
                  <p className="text-slate-200 font-sans text-sm mt-1">
                    {OFFICIAL_COMPANY_INFO.objectsOfCompany}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Commencement Date</span>
                  <span className="text-slate-200 font-bold">{OFFICIAL_COMPANY_INFO.startDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Registration Date</span>
                  <span className="text-amber-400 font-bold">{OFFICIAL_COMPANY_INFO.registrationDate}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-slate-400 block uppercase">ISIC Classification Description</span>
                  <span className="text-slate-200">
                    {OFFICIAL_COMPANY_INFO.isicCode} — {OFFICIAL_COMPANY_INFO.isicDescription}
                  </span>
                </div>
              </div>
            </div>

            {/* Part II & Part III: Address Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono uppercase text-amber-400 mb-3 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Part II — Address Details</span>
                <span className="text-slate-400">Principal Place of Business</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block uppercase">Digital Property Address</span>
                  <span className="text-base font-bold text-amber-400">{OFFICIAL_COMPANY_INFO.digitalAddress}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Postal Digital Address</span>
                  <span className="text-slate-200">{OFFICIAL_COMPANY_INFO.postalDigitalAddress}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">House / Building No & Street</span>
                  <span className="text-slate-200">
                    House Number 352, McCarthy Hill, Unknown Street near the Presby Church
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Jurisdiction & City</span>
                  <span className="text-slate-200">
                    Accra, Ga South District, Greater Accra Region, Ghana
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Postal Address</span>
                  <span className="text-slate-200">{OFFICIAL_COMPANY_INFO.postalAddress}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Country</span>
                  <span className="text-slate-200">{OFFICIAL_COMPANY_INFO.jurisdiction}</span>
                </div>
              </div>
            </div>

            {/* Part IV & Part V: Proprietor / Owner Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono uppercase text-amber-400 mb-3 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Part IV & V — Proprietor Details & Residential Address</span>
                <span className="text-slate-400">Proprietorship</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block uppercase">Full Legal Name</span>
                  <span className="text-sm font-bold text-white font-sans">{OFFICIAL_COMPANY_INFO.founderAndCEO}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Proprietor TIN</span>
                  <span className="text-slate-200 font-bold">{OFFICIAL_COMPANY_INFO.tin}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Date of Birth</span>
                  <span className="text-slate-200">{OFFICIAL_COMPANY_INFO.ownerDob}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Nationality & Gender</span>
                  <span className="text-slate-200">{OFFICIAL_COMPANY_INFO.ownerNationality} · Male</span>
                </div>
                <div className="sm:col-span-2 md:col-span-4 pt-2">
                  <span className="text-slate-400 block uppercase">Residential Address</span>
                  <span className="text-slate-300">
                    House Number 352, McCarthy Hill, near Presby Church, Accra, Ga South District, Greater Accra, Ghana (Digital: {OFFICIAL_COMPANY_INFO.digitalAddress})
                  </span>
                </div>
              </div>
            </div>

            {/* Part VIII, IX & X: Contacts, SME Envisaged & Owner Signature */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono uppercase text-amber-400 mb-3 pb-2 border-b border-slate-800">
                  Part VIII — Contacts
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block">Mobile No:</span>
                    <a href="tel:0244905505" className="text-white hover:text-amber-400 font-bold">
                      {OFFICIAL_COMPANY_INFO.mobileNo} ({OFFICIAL_COMPANY_INFO.contactPhone})
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Official Emails:</span>
                    <a href="mailto:info@oskayi.com" className="text-amber-400 hover:underline block">
                      info@oskayi.com
                    </a>
                    <a href="mailto:oskayi@giideatg.com" className="text-slate-300 hover:underline block">
                      oskayi@giideatg.com
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Websites:</span>
                    <span className="text-slate-200 block">www.oskayi.com</span>
                    <span className="text-slate-400 block">www.giideatg.com</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono uppercase text-amber-400 mb-3 pb-2 border-b border-slate-800">
                  Part IX — SME Details
                </div>
                <div className="space-y-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block">Envisaged Employees:</span>
                    <span className="text-lg font-bold text-white">{OFFICIAL_COMPANY_INFO.envisagedEmployees}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Initial Envisaged Revenue / Capital:</span>
                    <span className="text-base font-bold text-amber-400">{OFFICIAL_COMPANY_INFO.envisagedRevenue}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Statutory declaration as per ROC Act 151 filing schedule.
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase text-amber-400 mb-3 pb-2 border-b border-slate-800">
                    Part X — Owner Attestation
                  </div>
                  <div className="text-xs text-slate-300">
                    Owner’s name: <strong className="text-white font-sans block mt-1">{OFFICIAL_COMPANY_INFO.founderAndCEO}</strong>
                  </div>
                  <div className="mt-3 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Statutory Signed & Filed</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                  Filed with Office of the Registrar of Companies, Accra
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 3: Institutional Due Diligence Digest (For Banks, KYC Officers & International Partners) */}
        {activeTab === 'compliance-summary' && (
          <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Institutional KYC & Due Diligence Matrix</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pre-compiled compliance parameters for cross-border banking, vendor onboarding, and audit verification.
                </p>
              </div>
              <button
                onClick={() => {
                  const dataText = `COMPANY: OSKAYI CONSULT\nREG NO: ${OFFICIAL_COMPANY_INFO.registrationNumber}\nACT: Act 151 (1962)\nTIN: ${OFFICIAL_COMPANY_INFO.tin}\nPROPRIETOR: ${OFFICIAL_COMPANY_INFO.founderAndCEO}\nDIGITAL ADDRESS: ${OFFICIAL_COMPANY_INFO.digitalAddress}\nPHONE: ${OFFICIAL_COMPANY_INFO.contactPhone}\nEMAIL: info@oskayi.com`;
                  copyToClipboard(dataText, 'all-kyc');
                }}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-400 flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'all-kyc' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'all-kyc' ? 'KYC Text Copied!' : 'Copy Complete KYC Packet'}</span>
              </button>
            </div>

            <div className="divide-y divide-slate-800/80 text-sm">
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Entity Legal Name</span>
                <span className="font-semibold text-white">{OFFICIAL_COMPANY_INFO.companyName}</span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Business Registration Number</span>
                <span className="font-mono text-amber-400 font-bold">{OFFICIAL_COMPANY_INFO.registrationNumber}</span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Taxpayer Identification Number (TIN)</span>
                <span className="font-mono text-slate-200">{OFFICIAL_COMPANY_INFO.tin}</span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Governing Statutory Legislation</span>
                <span className="text-slate-200">{OFFICIAL_COMPANY_INFO.act}</span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Supervising Authority</span>
                <span className="text-slate-200">{OFFICIAL_COMPANY_INFO.issuingAuthority}</span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Principal Activity & ISIC</span>
                <span className="text-slate-200 text-right sm:max-w-md">
                  {OFFICIAL_COMPANY_INFO.isicCode} — {OFFICIAL_COMPANY_INFO.principalActivity}
                </span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Registered Digital Address</span>
                <span className="font-mono text-amber-400">{OFFICIAL_COMPANY_INFO.digitalAddress}</span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Proprietor & Principal Officer</span>
                <span className="font-semibold text-white">{OFFICIAL_COMPANY_INFO.founderAndCEO}</span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Primary Verification Contact</span>
                <span className="font-mono text-slate-200">info@oskayi.com · 0244905505</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
