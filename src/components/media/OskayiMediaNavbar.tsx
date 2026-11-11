import React from 'react';
import { 
  Radio, 
  Building2, 
  Search, 
  Zap, 
  MessageSquare, 
  Flame, 
  FileText, 
  Video, 
  LayoutGrid, 
  Cpu, 
  ShieldCheck,
  ChevronDown,
  Anchor,
  Satellite,
  Globe,
  AlertTriangle,
  Clock,
  PiggyBank,
  Scale,
  Sparkles,
  BarChart3,
  Landmark,
  Users,
  ShieldAlert
} from 'lucide-react';

export type NavigationTab = 
  | 'virtualafrica'
  | 'debtclock' 
  | 'sovereign' 
  | 'restructure' 
  | 'debtcollector'
  | 'centralbank'
  | 'indexfund'
  | 'payroll'
  | 'trade' 
  | 'wealth' 
  | 'grid' 
  | 'airwave' 
  | 'seaguard' 
  | 'sat' 
  | 'peace' 
  | 'search' 
  | 'chat' 
  | 'dashboard' 
  | 'hunter' 
  | 'blogger' 
  | 'video' 
  | 'apps' 
  | 'automation' 
  | 'corporate';

interface OskayiMediaNavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isRunning?: boolean;
}

export const OskayiMediaNavbar: React.FC<OskayiMediaNavbarProps> = ({
  activeTab,
  onSelectTab
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0A1F44] border-b border-[#FFD700]/30 shadow-2xl backdrop-blur-md">
      {/* Top Corporate Institutional Ribbon */}
      <div className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#FFD700] text-[#0A1F44] px-4 py-1 text-xs font-bold flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#0A1F44] animate-ping" />
          <span className="tracking-wider uppercase font-black">
            OSKAYI CONSULT • GLOBAL FINTECH, SOVEREIGN DEBT, ENERGY & DEFENSE INTELLIGENCE
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[11px] font-semibold">
          <span>Reg: <strong>BN248851025</strong></span>
          <span>•</span>
          <span>TIN: <strong>P0000590118</strong></span>
          <span>•</span>
          <span>Accra, Republic of Ghana</span>
          <span>•</span>
          <span className="bg-[#0A1F44] text-[#FFD700] px-2 py-0.5 rounded text-[10px]">
            Debt Clock • Sovereign AI • Trade Finance • Airwave PTT • Sea Guard • Sat Global
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold">"Institutional Insight. Digital Transformation."</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => onSelectTab('debtclock')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFD700] to-amber-500 p-0.5 shadow-lg shadow-[#FFD700]/20 flex items-center justify-center border border-[#FFD700]/80 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0A1F44] rounded-[14px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#FFD700]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white tracking-wider font-serif">OSKAYI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 font-bold uppercase tracking-wider">
                GLOBAL
              </span>
            </div>
            <p className="text-[10px] text-[#FFD700]/80 font-medium tracking-wide">
              Sovereign • Trade • Defense • Intelligence
            </p>
          </div>
        </div>

        {/* Global Products Category Horizontal Nav */}
        <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">

          {/* FLAGSHIP: VIRTUAL AFRICA */}
          <button
            onClick={() => onSelectTab('virtualafrica')}
            className={`px-3.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'virtualafrica'
                ? 'bg-gradient-to-r from-amber-400 to-emerald-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-amber-300 hover:text-white hover:bg-slate-800 border border-amber-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Virtual Africa
          </button>

          {/* PRODUCT: OSKAYI INDEX */}
          <button
            onClick={() => onSelectTab('indexfund')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'indexfund'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            Index Fund
          </button>

          {/* PRODUCT: DEBT COLLECTOR AI */}
          <button
            onClick={() => onSelectTab('debtcollector')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'debtcollector'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
            Debt Collector
          </button>

          {/* PRODUCT: CENTRAL BANK */}
          <button
            onClick={() => onSelectTab('centralbank')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'centralbank'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-cyan-400" />
            Central Bank
          </button>

          {/* PRODUCT: PAYROLL GLOBAL */}
          <button
            onClick={() => onSelectTab('payroll')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'payroll'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            Payroll Global
          </button>
          
          {/* PRODUCT 1: DEBT CLOCK */}
          <button
            onClick={() => onSelectTab('debtclock')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'debtclock'
                ? 'bg-red-600 text-white shadow-md shadow-red-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-red-400" />
            Debt Clock
          </button>

          {/* PRODUCT 2: SOVEREIGN AI */}
          <button
            onClick={() => onSelectTab('sovereign')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'sovereign'
                ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-500" />
            Sovereign AI
          </button>

          {/* PRODUCT 3: DEBT RESTRUCTURE */}
          <button
            onClick={() => onSelectTab('restructure')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'restructure'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-300" />
            Debt Restructure
          </button>

          {/* PRODUCT 4: TRADE FINANCE */}
          <button
            onClick={() => onSelectTab('trade')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'trade'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            Trade Finance
          </button>

          {/* PRODUCT 5: WEALTH ROBO-ADVISOR */}
          <button
            onClick={() => onSelectTab('wealth')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'wealth'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PiggyBank className="w-3.5 h-3.5 text-teal-300" />
            Wealth (Robo)
          </button>

          {/* PRODUCT 6: ENERGY GRID */}
          <button
            onClick={() => onSelectTab('grid')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'grid'
                ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            Grid VPP
          </button>

          {/* PRODUCT 7: AIRWAVE PTT */}
          <button
            onClick={() => onSelectTab('airwave')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'airwave'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-400" />
            Airwave PTT
          </button>

          {/* PRODUCT 8: SEA GUARD AIS */}
          <button
            onClick={() => onSelectTab('seaguard')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'seaguard'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Anchor className="w-3.5 h-3.5 text-cyan-400" />
            Sea Guard
          </button>

          {/* PRODUCT 9: SAT GLOBAL */}
          <button
            onClick={() => onSelectTab('sat')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'sat'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Satellite className="w-3.5 h-3.5 text-indigo-400" />
            Sat Global
          </button>

          {/* PRODUCT 10: PEACE OSINT */}
          <button
            onClick={() => onSelectTab('peace')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'peace'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            Peace OSINT
          </button>

          {/* PRODUCT 11: OSKAYI SEARCH */}
          <button
            onClick={() => onSelectTab('search')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'search'
                ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-amber-500" />
            Search
          </button>

          {/* PRODUCT 12: OSKAYI CHAT */}
          <button
            onClick={() => onSelectTab('chat')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'chat'
                ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            Chat
          </button>

          {/* TAB 13: MEDIA MACHINE */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              ['dashboard', 'hunter', 'blogger', 'video', 'apps', 'automation'].includes(activeTab)
                ? 'bg-[#0A1F44] text-[#FFD700] border border-[#FFD700]/50'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-purple-400" />
            Media
          </button>

          {/* TAB 14: KYC REGISTRY */}
          <button
            onClick={() => onSelectTab('corporate')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'corporate'
                ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFD700]" />
            KYC
          </button>
        </nav>
      </div>

      {/* Sub-Navbar for Media Machine child views when in Media Machine */}
      {['dashboard', 'hunter', 'blogger', 'video', 'apps', 'automation'].includes(activeTab) && (
        <div className="bg-[#071329] border-t border-slate-800 px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">Media Suite:</span>
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'dashboard' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              Overview
            </button>
            <button
              onClick={() => onSelectTab('hunter')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'hunter' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              Hunter (100)
            </button>
            <button
              onClick={() => onSelectTab('blogger')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'blogger' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              5 Blogs
            </button>
            <button
              onClick={() => onSelectTab('video')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'video' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              10 Channels
            </button>
            <button
              onClick={() => onSelectTab('apps')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'apps' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              Apps Hub
            </button>
            <button
              onClick={() => onSelectTab('automation')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'automation' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              24/7 Scheduler
            </button>
          </div>
        </div>
      )}

      {/* Mobile Horizontal Scrollable Tab Bar */}
      <div className="xl:hidden flex items-center px-4 py-2 border-t border-slate-800 bg-[#0A1F44]/95 overflow-x-auto gap-2 text-xs scrollbar-none">
        <button
          onClick={() => onSelectTab('virtualafrica')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'virtualafrica' ? 'bg-gradient-to-r from-amber-400 to-emerald-500 text-black font-black' : 'text-amber-300 border border-amber-500/30'}`}
        >
          Virtual Africa
        </button>
        <button
          onClick={() => onSelectTab('indexfund')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'indexfund' ? 'bg-amber-500 text-black font-bold' : 'text-slate-300'}`}
        >
          Index Fund
        </button>
        <button
          onClick={() => onSelectTab('debtcollector')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'debtcollector' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Debt Collector
        </button>
        <button
          onClick={() => onSelectTab('centralbank')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'centralbank' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Central Bank
        </button>
        <button
          onClick={() => onSelectTab('payroll')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'payroll' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Payroll Global
        </button>
        <button
          onClick={() => onSelectTab('debtclock')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'debtclock' ? 'bg-red-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Debt Clock
        </button>
        <button
          onClick={() => onSelectTab('sovereign')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'sovereign' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300'}`}
        >
          Sovereign AI
        </button>
        <button
          onClick={() => onSelectTab('restructure')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'restructure' ? 'bg-amber-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Debt Restructure
        </button>
        <button
          onClick={() => onSelectTab('trade')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'trade' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Trade Finance
        </button>
        <button
          onClick={() => onSelectTab('wealth')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'wealth' ? 'bg-teal-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Wealth Robo
        </button>
        <button
          onClick={() => onSelectTab('search')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'search' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300'}`}
        >
          Search
        </button>
        <button
          onClick={() => onSelectTab('grid')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'grid' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300'}`}
        >
          Grid
        </button>
        <button
          onClick={() => onSelectTab('chat')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'chat' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300'}`}
        >
          Chat
        </button>
        <button
          onClick={() => onSelectTab('airwave')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'airwave' ? 'bg-rose-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Airwave PTT
        </button>
        <button
          onClick={() => onSelectTab('seaguard')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'seaguard' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Sea Guard
        </button>
        <button
          onClick={() => onSelectTab('sat')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'sat' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Sat Global
        </button>
        <button
          onClick={() => onSelectTab('peace')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'peace' ? 'bg-amber-600 text-white font-bold' : 'text-slate-300'}`}
        >
          Peace OSINT
        </button>
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${['dashboard', 'hunter', 'blogger', 'video', 'apps', 'automation'].includes(activeTab) ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300'}`}
        >
          Media
        </button>
        <button
          onClick={() => onSelectTab('corporate')}
          className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'corporate' ? 'bg-[#FFD700] text-[#0A1F44] font-bold' : 'text-slate-300'}`}
        >
          KYC
        </button>
      </div>
    </header>
  );
};
