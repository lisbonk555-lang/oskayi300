import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../../data/companyData';

interface CorporateNavbarProps {
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export function CorporateNavbar({ onNavigateSection, activeSection }: CorporateNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('overview');
            }}
            className="flex items-center gap-3 text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 text-slate-950 font-black text-lg">
              O
            </div>
            <div className="flex flex-col">
              <span className="leading-tight group-hover:text-amber-400 transition-colors">
                OSKAYI <span className="text-amber-400">CONSULT</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 font-normal">
                ROC Act 151 · BN248851025
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('overview')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeSection === 'overview' ? 'text-amber-400 border-amber-400' : 'border-transparent'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeSection === 'services' ? 'text-amber-400 border-amber-400' : 'border-transparent'
              }`}
            >
              Practice Areas
            </button>
            <button
              onClick={() => handleNavClick('statutory-verification')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeSection === 'statutory-verification' ? 'text-amber-400 border-amber-400' : 'border-transparent'
              }`}
            >
              Statutory Verification
            </button>
            <button
              onClick={() => handleNavClick('proprietor')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeSection === 'proprietor' ? 'text-amber-400 border-amber-400' : 'border-transparent'
              }`}
            >
              Proprietor & Leadership
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeSection === 'contact' ? 'text-amber-400 border-amber-400' : 'border-transparent'
              }`}
            >
              Offices & Contact
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href="tel:0244905505"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>0244905505</span>
            </a>
            <button
              onClick={() => handleNavClick('inquiry')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Corporate Inquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('overview')}
            className="block w-full text-left py-2 text-sm text-slate-200 hover:text-amber-400"
          >
            Overview
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="block w-full text-left py-2 text-sm text-slate-200 hover:text-amber-400"
          >
            Practice Areas (ICT, Project Dev, Finance)
          </button>
          <button
            onClick={() => handleNavClick('statutory-verification')}
            className="block w-full text-left py-2 text-sm text-slate-200 hover:text-amber-400"
          >
            Statutory Verification (Form A & Certificate)
          </button>
          <button
            onClick={() => handleNavClick('proprietor')}
            className="block w-full text-left py-2 text-sm text-slate-200 hover:text-amber-400"
          >
            Proprietor & Leadership
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 text-sm text-slate-200 hover:text-amber-400"
          >
            Offices & Contact
          </button>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="mailto:info@oskayi.com"
              className="text-xs font-mono text-amber-400 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>info@oskayi.com</span>
            </a>
            <button
              onClick={() => handleNavClick('inquiry')}
              className="w-full mt-2 py-2.5 text-center font-bold text-xs bg-amber-400 text-slate-950 rounded-lg"
            >
              Submit Corporate Inquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
