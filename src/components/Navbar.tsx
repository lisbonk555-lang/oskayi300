import React, { useState } from 'react';
import { ShieldCheck, Phone, Mail, Menu, X, ChevronRight, Award } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenVerification?: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateSection,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'nexus-cloud', label: 'NEXUS CLOUD', isSpecial: true },
    { id: 'seller-protect', label: 'SELLER PROTECT', isSpecial: true, isNew: true },
    { id: 'ceo-message', label: 'President & CEO Vision' },
    { id: 'showcase-slides', label: '10 Showcase Slides' },
    { id: 'services', label: 'Solutions & Services' },
    { id: 'capabilities', label: 'Global Capabilities' },
    { id: 'why-oskayi', label: 'Why Oskayi' },
    { id: 'overview', label: 'About Oskayi' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-indigo-950/95 backdrop-blur-md border-b border-indigo-800/40 text-slate-100 shadow-xl">
      
      {/* Top Corporate Registry Bar */}
      <div className="bg-slate-950 border-b border-indigo-900/60 text-xs py-1.5 px-4 sm:px-8 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              ROC Ghana Act 151 Registered: <strong className="text-slate-100">{OFFICIAL_COMPANY_INFO.registrationNumber}</strong>
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
        
        {/* Stunning Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="cursor-pointer flex items-center gap-3.5 group"
        >
          {/* Custom Stunning Emblem Logo */}
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-indigo-600 p-0.5 shadow-lg shadow-amber-400/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-indigo-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
              {/* Geometric Ring & Diamond Glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-400/20 to-indigo-500/30 rounded-full blur-sm" />
              
              <div className="relative z-10 flex items-center justify-center font-serif font-black text-amber-300 text-2xl tracking-tighter">
                <span>O</span>
                <span className="text-xs text-white font-sans -ml-0.5 font-bold">C</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-extrabold text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                OSKAYI CONSULT
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full">
                Integrated
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-medium">
              Empowering Global Institutional Growth
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3.5 text-[11px] font-bold uppercase tracking-wider">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            if (item.id === 'nexus-cloud') {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-400 text-indigo-950 shadow-md shadow-amber-400/20'
                      : 'bg-amber-400/15 text-amber-300 border border-amber-400/40 hover:bg-amber-400/25'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>{item.label}</span>
                </button>
              );
            }

            if (item.id === 'seller-protect') {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-indigo-900/60 text-amber-300 border border-amber-400/40 hover:bg-amber-400/20'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.label}</span>
                  <span className="px-1.5 py-0.2 text-[9px] bg-amber-400 text-slate-950 rounded font-black">NEW</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-all py-1 relative ${
                  isActive 
                    ? 'text-amber-300 font-extrabold border-b-2 border-amber-400 pb-1' 
                    : 'text-slate-200 hover:text-amber-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Executive Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-indigo-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-400/20 uppercase tracking-wider"
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

          <div className="pt-3 border-t border-indigo-900">
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold uppercase text-indigo-950 bg-amber-400 rounded-xl"
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
