import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../../data/companyData';

interface CorporateFooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export function CorporateFooter({ onNavigateSection }: CorporateFooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      
      {/* Upper Footer: Core Directories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Statutory Authority (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-base">
                O
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                OSKAYI <span className="text-amber-400">CONSULT</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Registered under The Registration of Business Names Act, 1962 (Act 151) by the Office of the Registrar 
              of Companies, Republic of Ghana. Specialized in ICT Services, Project Development, Management, and Financial Consultancy.
            </p>

            <div className="font-mono text-[11px] text-slate-500 space-y-1">
              <div>REG NO: <strong className="text-amber-400 font-bold">{OFFICIAL_COMPANY_INFO.registrationNumber}</strong></div>
              <div>TIN: <strong className="text-slate-300">{OFFICIAL_COMPANY_INFO.tin}</strong></div>
              <div>ISIC: <strong className="text-slate-300">{OFFICIAL_COMPANY_INFO.isicCode}</strong> (Other business support n.e.c.)</div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <div className="text-white font-semibold uppercase font-mono tracking-wider text-xs mb-4">
              Practice Areas
            </div>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  ICT & Systems Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Project Development & PPPs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Management Consultancy (8299)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Financial Structuring & Capital
                </button>
              </li>
            </ul>
          </div>

          {/* Statutory Verification Links */}
          <div>
            <div className="text-white font-semibold uppercase font-mono tracking-wider text-xs mb-4">
              Governance & Proof
            </div>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigateSection('statutory-verification')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Certificate of Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('statutory-verification')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Form A Statutory Filing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('statutory-verification')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  KYC Due Diligence Packet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('proprietor')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Proprietor Attestation
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Desks */}
          <div>
            <div className="text-white font-semibold uppercase font-mono tracking-wider text-xs mb-4">
              Official Desks
            </div>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <a href="mailto:info@oskayi.com" className="text-amber-400 hover:underline block">
                  info@oskayi.com
                </a>
              </li>
              <li>
                <a href="mailto:oskayi@giideatg.com" className="hover:text-white block">
                  oskayi@giideatg.com
                </a>
              </li>
              <li>
                <a href="tel:0244905505" className="hover:text-white block">
                  0244905505
                </a>
              </li>
              <li className="text-slate-500 pt-1">
                GA-183-8165 · McCarthy Hill, Accra
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Notice Bar */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} OSKAYI CONSULT. Registered in the Republic of Ghana (BN248851025). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Proprietor: Listowel Sarsah Adentwi-Edzii</span>
            <span>·</span>
            <a href="mailto:info@oskayi.com" className="hover:text-slate-300">
              Legal & Compliance: info@oskayi.com
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
