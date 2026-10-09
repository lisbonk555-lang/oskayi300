import React, { useState } from 'react';
import { ShieldCheck, Phone, Mail, Menu, X, ChevronRight, Award, Zap, Globe, FileCode, ChevronDown } from 'lucide-react';
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
  const [globalDropdownOpen, setGlobalDropdownOpen] = useState(false);

  const globalDevSubItems = [
    { id: 'overview-section', label: 'Overview', desc: 'We develop your $1.5B+ project free globally' },
    { id: 'how-it-works-section', label: 'How It Works', desc: '4-step bankable structuring & syndication' },
    { id: 'value-stack-section', label: "What's Included Free", desc: '$1B+ advisory, legal SPV, and $1.155B wrap' },
    { id: 'sectors-section', label: 'Sectors', desc: 'Ports, rail, power transition, and AI fabs' },
    { id: 'coverage-section', label: 'Global Coverage', desc: 'Interactive map across 6 sovereign regions' },
    { id: 'why-free-section', label: 'Why Free?', desc: 'Aligned 20% success fee: No close, no fee' },
    { id: 'case-studies-section', label: 'Case Studies', desc: 'Demonstrated bankability & pipeline proof' },
    { id: 'apply-section', label: 'Apply Free', desc: 'Submit project brief for 48h qualification' }
  ];

  const navItems = [
    { id: 'credit-checkout', label: 'CREDIT CHECKOUT', isSpecial: true, isNew: true },
    { id: 'nexus-cloud', label: 'NEXUS CLOUD', isSpecial: true },
    { id: 'free-global-development', label: 'Free Global Development', isGlobalDev: true },
    { id: 'treasury-orchestration', label: 'Global Treasury' },
    { id: 'sme-treasury', label: 'SME Treasury' },
    { id: 'ceo-message', label: 'President & CEO Vision' },
    { id: 'showcase-slides', label: '10 Showcase Slides' },
    { id: 'services', label: 'Solutions & Services' },
    { id: 'capabilities', label: 'Global Capabilities' },
    { id: 'why-oskayi', label: 'Why Oskayi' },
    { id: 'overview', label: 'About Oskayi' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id: string, subSectionId?: string) => {
    if (id === 'free-global-development' && subSectionId) {
      onNavigateSection('free-global-development');
      setTimeout(() => {
        const el = document.getElementById(subSectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      onNavigateSection(id);
    }
    setMobileMenuOpen(false);
    setGlobalDropdownOpen(false);
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
            if (item.id === 'credit-checkout') {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-400 text-indigo-950 shadow-md shadow-amber-400/30 ring-2 ring-amber-300'
                      : 'bg-amber-400/20 text-amber-300 border border-amber-400/50 hover:bg-amber-400/30'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{item.label}</span>
                  <span className="px-1.5 py-0.2 text-[9px] bg-amber-400 text-indigo-950 rounded font-black">ZERO GAS</span>
                </button>
              );
            }

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

            if (item.id === 'free-global-development') {
              return (
                <div 
                  key={item.id} 
                  className="relative group"
                  onMouseEnter={() => setGlobalDropdownOpen(true)}
                  onMouseLeave={() => setGlobalDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`transition-all py-1.5 px-2.5 rounded-lg flex items-center gap-1.5 relative ${
                      isActive
                        ? 'text-amber-300 font-extrabold bg-[#0A1931] border border-[#D4AF37]/50 shadow-md shadow-[#D4AF37]/10'
                        : 'text-slate-100 hover:text-amber-300 hover:bg-[#0A1931]/60'
                    }`}
                  >
                    {/* Gold Highlight Dot */}
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-sm shadow-[#D4AF37] animate-pulse" />
                    <span className="tracking-wide">{item.label}</span>
                    <ChevronDown className={`w-3 h-3 text-[#D4AF37] transition-transform duration-200 ${globalDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* On hover dropdown: Overview | How It Works | Sectors | Global Coverage | Case Studies | Apply */}
                  {globalDropdownOpen && (
                    <div className="absolute top-full left-0 w-72 mt-1 bg-[#0A1931] border border-[#D4AF37]/40 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-bold text-[#D4AF37] flex items-center justify-between">
                        <span>Free $1.5B+ Development</span>
                        <span className="text-white">$0 Upfront</span>
                      </div>
                      <div className="py-1 space-y-0.5">
                        {globalDevSubItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleNavClick('free-global-development', sub.id)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#132746] hover:text-[#D4AF37] transition-colors flex flex-col group/sub"
                          >
                            <span className="text-xs font-bold text-white group-hover/sub:text-[#D4AF37]">
                              {sub.label}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate">
                              {sub.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
            {navItems.map((item) => {
              if (item.id === 'free-global-development') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-2.5 text-xs uppercase tracking-wider font-bold rounded-lg transition-colors flex items-center justify-between ${
                      activeSection === item.id 
                        ? 'bg-[#0A1931] text-[#D4AF37] border border-[#D4AF37]/50' 
                        : 'text-[#D4AF37] bg-[#0A1931]/40 hover:bg-[#132746]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {/* Globe + Blueprint Icon */}
                      <span className="flex items-center text-[#D4AF37]">
                        <Globe className="w-3.5 h-3.5 mr-0.5" />
                        <FileCode className="w-3.5 h-3.5 text-amber-300" />
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <span className="px-1.5 py-0.2 text-[9px] bg-[#D4AF37] text-[#0A1931] font-black rounded">
                      FREE $1.5B+
                    </span>
                  </button>
                );
              }

              return (
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
              );
            })}
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
