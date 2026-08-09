import React, { useState } from 'react';
import { ShieldCheck, Phone, Mail, FileText, Menu, X, Globe, ChevronRight } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenVerification: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVerification,
  onNavigateSection,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Corporate Overview' },
    { id: 'services', label: 'Services & Pillars' },
    { id: 'calculator', label: 'Project Finance Calculator' },
    { id: 'web3', label: 'Web3 Architecture' },
    { id: 'diagnostics', label: 'RPC Diagnostics' },
    { id: 'contact', label: 'Contact & Location' }
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-indigo-950/95 backdrop-blur-md border-b border-indigo-800/40 text-slate-100 shadow-xl">
      {/* Top Statutory Header Bar */}
      <div className="bg-slate-950 border-b border-indigo-900/60 text-xs py-1.5 px-4 sm:px-8 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              ROC Ghana Registered: <strong className="text-slate-100">{OFFICIAL_COMPANY_INFO.registrationNumber}</strong>
            </span>
            <span className="hidden md:inline text-indigo-800">|</span>
            <span className="hidden md:inline text-slate-300">
              TIN: <strong className="text-slate-100">{OFFICIAL_COMPANY_INFO.tin}</strong>
            </span>
            <span className="hidden lg:inline text-indigo-800">|</span>
            <span className="hidden lg:inline text-slate-300">
              Ghana Post GPS: <strong className="text-amber-300">{OFFICIAL_COMPANY_INFO.digitalAddress}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href={`tel:${OFFICIAL_COMPANY_INFO.contactPhone}`} 
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{OFFICIAL_COMPANY_INFO.contactPhone}</span>
            </a>
            <span className="text-indigo-800">|</span>
            <a 
              href={`mailto:${OFFICIAL_COMPANY_INFO.primaryEmail}`} 
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span className="truncate max-w-[160px] sm:max-w-none">{OFFICIAL_COMPANY_INFO.primaryEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Statutory Subtitle */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-900 p-0.5 shadow-md shadow-indigo-900/50 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-indigo-950 rounded-[7px] flex items-center justify-center font-serif font-bold text-white text-xl border border-indigo-500/30">
              O
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-extrabold text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                OSKAYI CONSULT
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 rounded-full">
                Global Integrated
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-semibold">
              Fintech • Project Financing • Web3 Solutions
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 relative ${
                  isActive 
                    ? 'text-amber-300 font-bold border-b-2 border-amber-400 pb-1' 
                    : 'text-slate-200 hover:text-amber-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Executive Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenVerification}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-amber-300 bg-indigo-900/80 hover:bg-indigo-900 border border-amber-400/30 rounded-lg transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Verify Credentials</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-indigo-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-400/20 uppercase tracking-wider"
          >
            <span>Consult Advisor</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-200 hover:text-amber-300 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-indigo-950 border-b border-indigo-800 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 text-xs uppercase tracking-wider font-bold rounded-lg transition-colors ${
                  activeSection === item.id 
                    ? 'bg-indigo-800 text-amber-300' 
                    : 'text-slate-200 hover:bg-indigo-900 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-indigo-900 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenVerification();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-amber-300 bg-indigo-900 border border-amber-400/30 rounded-lg"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Verify Registration (BN248851025)</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold uppercase text-indigo-950 bg-amber-400 rounded-lg"
            >
              <span>Schedule Advisor Consultation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
