import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Award, Globe } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onOpenVerification: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVerification, onNavigateSection }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Executive Identification */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center font-serif font-bold text-amber-400 text-lg">
                  O
                </div>
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-wide">
                OSKAYI CONSULT
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Oskayi Consult is incorporated in Ghana and provides vast business operations, financial consultancy, and technology solutions through our international integrated partner networks.
            </p>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
              <div className="text-amber-400 font-bold">Listowel Sarsah Adentwi-Edzii</div>
              <div className="text-slate-400">Founder & CEO</div>
            </div>
          </div>

          {/* Col 2: Practice Areas */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Practice Pillars
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors">
                  Fintech Solutions for Banks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('calculator')} className="hover:text-amber-300 transition-colors">
                  Project Financing & Advisory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors">
                  Insurance & Multi-currency Payments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('web3')} className="hover:text-amber-300 transition-colors">
                  Custom Web3 Applications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors">
                  Instant Loan Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors">
                  ICT Consultancy (ISIC 8299)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory Credentials */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Statutory Accreditation
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">Registration Number</div>
                <div className="text-amber-400 font-bold">{OFFICIAL_COMPANY_INFO.registrationNumber}</div>
                <div className="text-[10px] text-slate-500">ROC Republic of Ghana</div>
              </div>

              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">Taxpayer Identification (TIN)</div>
                <div className="text-slate-200 font-bold">{OFFICIAL_COMPANY_INFO.tin}</div>
              </div>

              <button
                onClick={onOpenVerification}
                className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold rounded text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verify ROC Certificate</span>
              </button>
            </div>
          </div>

          {/* Col 4: Contact & GPS Address */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Accra Headquarters
            </h4>

            <div className="space-y-2 text-slate-300 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>McCarthy Hill, House No. 352, Accra, Ghana</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-amber-300">
                <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Ghana Post: {OFFICIAL_COMPANY_INFO.digitalAddress}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${OFFICIAL_COMPANY_INFO.contactPhone}`} className="hover:text-amber-300 font-mono">
                  {OFFICIAL_COMPANY_INFO.contactPhone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${OFFICIAL_COMPANY_INFO.primaryEmail}`} className="hover:text-amber-300 font-mono truncate">
                  {OFFICIAL_COMPANY_INFO.primaryEmail}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Statutory Line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div>
            © {new Date().getFullYear()} OSKAYI CONSULT. All Rights Reserved. Republic of Ghana Act 151.
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span>Reg No: {OFFICIAL_COMPANY_INFO.registrationNumber}</span>
            <span>•</span>
            <span>TIN: {OFFICIAL_COMPANY_INFO.tin}</span>
            <span>•</span>
            <button onClick={onOpenVerification} className="text-amber-400 hover:underline">
              Official Registry Verification
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
