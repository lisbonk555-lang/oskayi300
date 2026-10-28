import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  UserCheck, 
  Settings, 
  Landmark, 
  HelpCircle, 
  Menu, 
  X, 
  ArrowUpRight, 
  Calculator,
  Cpu,
  Building2,
  Sparkles,
  Phone,
  Layers
} from 'lucide-react';

interface OskaiNavbarProps {
  currentRoute: 'home' | 'oil';
  oilActiveTab: string;
  onNavigateRoute: (route: 'home' | 'oil') => void;
  onSelectOilTab: (tab: string) => void;
  applicationsCount: number;
}

export function OskaiNavbar({ 
  currentRoute,
  oilActiveTab, 
  onNavigateRoute,
  onSelectOilTab, 
  applicationsCount 
}: OskaiNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRouteClick = (route: 'home' | 'oil') => {
    onNavigateRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOilTabClick = (tab: string) => {
    onNavigateRoute('oil');
    onSelectOilTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => handleRouteClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              O
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 leading-none">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-teal-300 transition-colors">
                  OSKAYI
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
                  CONSULT
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mt-0.5">
                Reg No: BN248851025 • TIN: P0000590118
              </span>
            </div>
          </div>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold">
            {/* [Home] */}
            <button
              onClick={() => handleRouteClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                currentRoute === 'home' 
                  ? 'bg-slate-900 text-teal-300 font-bold border border-teal-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Home
            </button>

            {/* [Oil Financing] with Live badge */}
            <button
              onClick={() => handleRouteClick('oil')}
              className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                currentRoute === 'oil' 
                  ? 'bg-teal-500/15 text-teal-300 font-bold border border-teal-500/50 shadow-sm shadow-teal-500/20' 
                  : 'text-slate-200 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Cpu className="w-4 h-4 text-teal-400" />
              <span>Oil Financing</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </button>

            {/* [Products] */}
            <button
              onClick={() => {
                handleRouteClick('home');
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-lg transition-colors whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-900/60"
            >
              Products Hub
            </button>

            {/* [About] */}
            <button
              onClick={() => {
                handleRouteClick('home');
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-lg transition-colors whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-900/60"
            >
              About
            </button>

            {/* [Contact] */}
            <a
              href="mailto:info@oskayi.com"
              className="px-3 py-2 rounded-lg transition-colors whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-900/60"
            >
              Contact
            </a>

            {/* If on OIL route, show sub-tabs separator */}
            {currentRoute === 'oil' && (
              <div className="h-5 w-px bg-slate-800 mx-2" />
            )}

            {/* OIL Sub-navigation links */}
            {currentRoute === 'oil' && (
              <>
                <button
                  onClick={() => handleOilTabClick('brain')}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] transition-colors whitespace-nowrap flex items-center gap-1 ${
                    oilActiveTab === 'brain' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>Decision Brain</span>
                </button>
                <button
                  onClick={() => handleOilTabClick('discovery')}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] transition-colors whitespace-nowrap flex items-center gap-1 ${
                    oilActiveTab === 'discovery' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Search className="w-3 h-3" />
                  <span>Discover</span>
                </button>
                <button
                  onClick={() => handleOilTabClick('lenders')}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] transition-colors whitespace-nowrap flex items-center gap-1 ${
                    oilActiveTab === 'lenders' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Landmark className="w-3 h-3" />
                  <span>Lenders</span>
                </button>
                <button
                  onClick={() => handleOilTabClick('assistant')}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] transition-colors whitespace-nowrap flex items-center gap-1 ${
                    oilActiveTab === 'assistant' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Calculator className="w-3 h-3 text-amber-400" />
                  <span>Calculator</span>
                </button>
                <button
                  onClick={() => handleOilTabClick('applications')}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] transition-colors whitespace-nowrap flex items-center gap-1 relative ${
                    oilActiveTab === 'applications' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>My Applications</span>
                  {applicationsCount > 0 && (
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black flex items-center justify-center">
                      {applicationsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleOilTabClick('admin')}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] transition-colors whitespace-nowrap flex items-center gap-1 ${
                    oilActiveTab === 'admin' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Settings className="w-3 h-3" />
                  <span>Compliance</span>
                </button>
              </>
            )}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentRoute === 'home' ? (
              <button
                onClick={() => handleRouteClick('oil')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4" />
                <span>Apply Instant &rarr; /oil</span>
              </button>
            ) : (
              <button
                onClick={() => handleOilTabClick('brain')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Instant 90s Scoring</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
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
            onClick={() => handleRouteClick('home')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold ${
              currentRoute === 'home' ? 'bg-slate-900 text-teal-400' : 'text-slate-200 hover:bg-slate-900'
            }`}
          >
            Home (Products Hub)
          </button>
          <button
            onClick={() => handleRouteClick('oil')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold flex items-center justify-between ${
              currentRoute === 'oil' ? 'bg-teal-500/20 text-teal-300' : 'text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-teal-400" />
              Oil Financing (/oil)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              Live
            </span>
          </button>
          
          {currentRoute === 'oil' && (
            <div className="pl-4 space-y-1 border-l-2 border-teal-500/40 my-2">
              <button
                onClick={() => handleOilTabClick('brain')}
                className="w-full text-left py-2 px-2 text-xs text-slate-300 hover:text-white"
              >
                Decision Brain (Instant 90s Scoring)
              </button>
              <button
                onClick={() => handleOilTabClick('discovery')}
                className="w-full text-left py-2 px-2 text-xs text-slate-300 hover:text-white"
              >
                Discover Verified Loans
              </button>
              <button
                onClick={() => handleOilTabClick('lenders')}
                className="w-full text-left py-2 px-2 text-xs text-slate-300 hover:text-white"
              >
                Licensed Lenders Directory
              </button>
              <button
                onClick={() => handleOilTabClick('assistant')}
                className="w-full text-left py-2 px-2 text-xs text-slate-300 hover:text-white"
              >
                AI Amortization Calculator
              </button>
              <button
                onClick={() => handleOilTabClick('applications')}
                className="w-full text-left py-2 px-2 text-xs text-slate-300 hover:text-white flex items-center justify-between"
              >
                <span>My Applications</span>
                {applicationsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                    {applicationsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleOilTabClick('admin')}
                className="w-full text-left py-2 px-2 text-xs text-slate-400 hover:text-white"
              >
                Compliance & API Health
              </button>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => handleRouteClick('oil')}
              className="w-full py-3 bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl text-center"
            >
              Apply Instant &rarr; /oil
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
