import React, { useState } from 'react';
import { ShieldCheck, Search, FileText, UserCheck, Settings, Landmark, HelpCircle, Menu, X, ArrowUpRight, Calculator } from 'lucide-react';

interface OskaiNavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  applicationsCount: number;
}

export function OskaiNavbar({ activeTab, onSelectTab, applicationsCount }: OskaiNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => handleTabClick('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              O
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-teal-300 transition-colors">
                  OSKAI
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Instant Loan
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
                Discover Funding · Apply with Confidence
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium">
            <button
              onClick={() => handleTabClick('landing')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'landing' ? 'bg-slate-900 text-teal-400 font-bold border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabClick('discovery')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'discovery' ? 'bg-slate-900 text-teal-400 font-bold border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Discover Loans</span>
            </button>
            <button
              onClick={() => handleTabClick('assistant')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'assistant' ? 'bg-slate-900 text-teal-400 font-bold border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Loan Assistant</span>
            </button>
            <button
              onClick={() => handleTabClick('dashboard')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 relative ${
                activeTab === 'dashboard' ? 'bg-slate-900 text-teal-400 font-bold border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Borrower Dashboard</span>
              {applicationsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {applicationsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleTabClick('lenders')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'lenders' ? 'bg-slate-900 text-teal-400 font-bold border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Lender Directory</span>
            </button>
            <button
              onClick={() => handleTabClick('admin')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 text-slate-400 hover:text-slate-200 ${
                activeTab === 'admin' ? 'bg-slate-900 text-teal-400 font-bold border border-teal-500/30' : 'hover:bg-slate-900/60'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin & APIs</span>
            </button>
          </nav>

          {/* Primary CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleTabClick('discovery')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Explore Verified Loans</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleTabClick('landing')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900"
          >
            Overview
          </button>
          <button
            onClick={() => handleTabClick('discovery')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 flex items-center justify-between"
          >
            <span>Discover Loans</span>
            <Search className="w-4 h-4 text-teal-400" />
          </button>
          <button
            onClick={() => handleTabClick('assistant')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 flex items-center justify-between"
          >
            <span>AI Loan Assistant & Calculator</span>
            <Calculator className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => handleTabClick('dashboard')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900 flex items-center justify-between"
          >
            <span>Borrower Dashboard</span>
            {applicationsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
                {applicationsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleTabClick('lenders')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900"
          >
            Lender Directory & Regulatory Scope
          </button>
          <button
            onClick={() => handleTabClick('admin')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-slate-400 hover:bg-slate-900 flex items-center justify-between"
          >
            <span>Admin, Status & API Health</span>
            <Settings className="w-4 h-4 text-slate-500" />
          </button>
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => handleTabClick('discovery')}
              className="w-full py-3 bg-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl text-center"
            >
              Start Loan Discovery
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
