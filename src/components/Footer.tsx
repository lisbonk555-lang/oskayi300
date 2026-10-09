import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Award, Globe, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';
import { GTBankLogo, StandardCharteredLogo } from './BankerLogos';
import { FinastraLogo } from './FinastraLogo';

interface FooterProps {
  onOpenVerification: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateNexusCloud?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVerification, onNavigateSection, onNavigateNexusCloud }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Enterprise Partner Spotlight: Powered by Finastra Fusion */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <FinastraLogo variant="icon" className="w-10 h-10" />
            <div className="space-y-0.5 text-left">
              <div className="flex items-center gap-2">
                <span className="font-sans font-black text-sm text-white tracking-wider">
                  FINASTRA FUSION
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                  CORE INFRASTRUCTURE
                </span>
              </div>
              <p className="text-xs text-purple-200/90 font-mono">
                Powered by Finastra Fusion - The OS of Global Finance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400 hidden md:inline">
              Powering 70% of World's Syndicated Loans
            </span>
            <button
              onClick={() => {
                if (onNavigateNexusCloud) {
                  onNavigateNexusCloud();
                } else {
                  onNavigateSection('nexus-cloud');
                }
              }}
              className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <span>Explore Nexus OS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

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
              <div className="text-slate-400">President & CEO</div>
            </div>

            {/* NEXUS CLOUD Fast Access Badge */}
            <button
              onClick={() => {
                if (onNavigateNexusCloud) {
                  onNavigateNexusCloud();
                } else {
                  onNavigateSection('nexus-cloud');
                }
              }}
              className="w-full p-2.5 rounded-xl bg-purple-950/70 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-mono font-bold flex items-center justify-between transition-all group"
            >
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-45 transition-transform" />
                <span className="text-white">NEXUS CLOUD — The OS of Global Finance</span>
              </span>
              <span className="text-[10px] bg-purple-500/30 text-purple-200 px-1.5 py-0.5 rounded font-extrabold border border-purple-400/30">
                LIVE
              </span>
            </button>

            {/* FREE GLOBAL DEVELOPMENT Fast Access Badge */}
            <button
              onClick={() => onNavigateSection('free-global-development')}
              className="w-full p-2.5 rounded-xl bg-[#0A1931] hover:bg-[#132746] border border-[#D4AF37]/50 text-[#D4AF37] hover:text-white text-xs font-mono font-bold flex items-center justify-between transition-all group"
            >
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
                <span>FREE GLOBAL DEVELOPMENT ($1.5B+)</span>
              </span>
              <span className="text-[10px] bg-[#D4AF37] text-[#0A1931] px-1.5 py-0.5 rounded font-black">
                FREE
              </span>
            </button>
          </div>

          {/* Col 2: Practice Areas */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Practice Pillars
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors text-left">
                  Liquidity & Loans for Banks & Financial Institutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors text-left">
                  Sovereign & Corporate Project Financing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors text-left">
                  Exclusive Insurance (Individuals, Auto, Home, Travel)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors text-left">
                  Fleet of Fintech & Web3 App Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors text-left">
                  Cross-Industry Digital Growth Solutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-amber-300 transition-colors text-left">
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

        {/* Bankers Highlights Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Official Corporate Bankers:
            </span>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <GTBankLogo className="scale-95" />
            <span className="text-slate-700 hidden md:inline">|</span>
            <StandardCharteredLogo className="scale-95" />
          </div>
        </div>

        {/* Bottom Statutory Line */}
        <div className="pt-8 border-t border-slate-900 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
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

          {/* Institutional Serving & Coverage Trust Badges */}
          <div className="pt-4 border-t border-slate-900/80 grid sm:grid-cols-2 gap-3 text-[11px] font-mono text-slate-400">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <span className="text-amber-400 font-bold shrink-0">Serving:</span>
              <span className="text-slate-300 truncate">Governments • Central Banks • Commercial Banks • Telcos • DFIs • Enterprises • Individuals</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <span className="text-sky-400 font-bold shrink-0">Coverage:</span>
              <span className="text-slate-300 truncate">West Africa • East Africa • Southern Africa • Global Partner Network</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
