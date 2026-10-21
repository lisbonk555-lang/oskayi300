import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Compass, 
  Volume2, 
  Sun, 
  Moon, 
  User, 
  LogIn, 
  Share2, 
  Check, 
  MapPin, 
  Phone, 
  Heart, 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  Flame, 
  Users, 
  Building2,
  DollarSign,
  Calculator
} from 'lucide-react';
import { AlMihrabPrayerCenter } from '../components/masjid/AlMihrabPrayerCenter';
import { MajlisAlHikmahKhutbah } from '../components/masjid/MajlisAlHikmahKhutbah';
import { MasjidMapFinder } from '../components/masjid/MasjidMapFinder';
import { MadrasahAlNoor } from '../components/masjid/MadrasahAlNoor';
import { AlMizanNewsEngine } from '../components/masjid/AlMizanNewsEngine';
import { DiwanAlAlamiCommunity } from '../components/masjid/DiwanAlAlamiCommunity';
import { MasjidMembershipSection } from '../components/masjid/MasjidMembershipSection';

interface MasjidMainPageProps {
  onNavigateGate: () => void;
  onNavigateHome: () => void;
  onNavigateIgpd: () => void;
}

export const MasjidMainPage: React.FC<MasjidMainPageProps> = ({
  onNavigateGate,
  onNavigateHome,
  onNavigateIgpd
}) => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [zakatCalculatorOpen, setZakatCalculatorOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Zakat Calculator State
  const [cashSavings, setCashSavings] = useState<number>(0);
  const [goldGrams, setGoldGrams] = useState<number>(0);
  const [silverGrams, setSilverGrams] = useState<number>(0);
  const [businessStock, setBusinessStock] = useState<number>(0);
  const [debtsOwed, setDebtsOwed] = useState<number>(0);

  // SEO Management
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Masjid Al-Noor Al-Alami — The 24/7 Global Virtual Mosque | IGPD";

    const metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Masjid Al-Noor Al-Alami: A 24/7 House for All Humanity. Automated prayer center, Aladhan broadcast, global mosque finder, Madrasah curriculum, and Al-Mizan Islamic news perspective.'
      );
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = previousTitle;
      if (metaDescription && prevDesc) {
        metaDescription.setAttribute('content', prevDesc);
      }
    };
  }, []);

  const handleShare = () => {
    const url = "http://www.oskayi.com/igpd/masjid/main";
    const text = "Masjid Al-Noor Al-Alami — The 24/7 Global Virtual Mosque for Muslims and Seekers of Peace.";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Zakat Calculation (Nisab threshold ~$6,500 USD)
  const totalAssets = (cashSavings || 0) + ((goldGrams || 0) * 85) + ((silverGrams || 0) * 1.1) + (businessStock || 0) - (debtsOwed || 0);
  const zakatDue = totalAssets > 6500 ? (totalAssets * 0.025) : 0;

  return (
    <div className={`min-h-screen font-sans selection:bg-[#D4AF37] selection:text-[#0A1931] transition-colors duration-300 ${
      isLightMode 
        ? 'bg-[#F9F6F0] text-slate-800' 
        : 'bg-[#0A1931] text-slate-100'
    }`}>

      {/* ============================================================== */}
      {/* STICKY LUXURY HEADER                                           */}
      {/* Logo + LIVE 24/7 + Prayer Countdown + Qibla + Join/Login       */}
      {/* ============================================================== */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
        isLightMode
          ? 'bg-[#F9F6F0]/95 border-[#D4AF37]/40 shadow-md'
          : 'bg-[#071326]/95 border-[#D4AF37]/50 shadow-2xl'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
          
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateGate}
              className="p-2 rounded-xl bg-[#0A1931] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0A1931] border border-[#D4AF37]/60 transition-all text-xs font-mono font-bold flex items-center gap-1.5 shadow"
              title="Return to Grand Gate Entrance"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">The Gate</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-lg sm:text-xl text-[#FFF3B0] tracking-tight">
                  MASJID AL-NOOR AL-ALAMI
                </span>
                <span className="hidden md:inline px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-black animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  LIVE 24/7
                </span>
              </div>
              <div className="text-[10px] font-serif text-[#D4AF37] tracking-wider" dir="rtl">
                المسجد النور العالمي • بيت لكل الإنسانية
              </div>
            </div>
          </div>

          {/* Quick Navigation Pills */}
          <nav className="hidden xl:flex items-center gap-2 text-xs font-mono font-bold">
            <button onClick={() => scrollToSection('mihrab')} className="px-2.5 py-1 text-slate-300 hover:text-[#D4AF37]">
              Mihrab
            </button>
            <button onClick={() => scrollToSection('majlis')} className="px-2.5 py-1 text-slate-300 hover:text-[#D4AF37]">
              Khutbah
            </button>
            <button onClick={() => scrollToSection('map')} className="px-2.5 py-1 text-slate-300 hover:text-[#D4AF37]">
              Mosque Map
            </button>
            <button onClick={() => scrollToSection('madrasah')} className="px-2.5 py-1 text-slate-300 hover:text-[#D4AF37]">
              Madrasah
            </button>
            <button onClick={() => scrollToSection('mizan')} className="px-2.5 py-1 text-slate-300 hover:text-[#D4AF37]">
              Al-Mizan News
            </button>
            <button onClick={() => scrollToSection('diwan')} className="px-2.5 py-1 text-slate-300 hover:text-[#D4AF37]">
              Diwan
            </button>
            <button onClick={() => scrollToSection('membership')} className="px-2.5 py-1 text-[#FFF3B0] hover:text-[#D4AF37] font-black">
              Membership
            </button>
          </nav>

          {/* Right Action Controls: Qibla + Zakat + Theme + Login */}
          <div className="flex items-center gap-2.5">
            
            <button
              onClick={() => scrollToSection('mihrab')}
              className="px-3 py-1.5 rounded-xl bg-[#0A1931] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#D4AF37] hover:text-[#0A1931] transition-all shadow-sm"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Qibla</span>
            </button>

            <button
              onClick={() => setZakatCalculatorOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#0A1931] text-[#FFF3B0] border border-[#D4AF37]/50 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#D4AF37] hover:text-[#0A1931] transition-all shadow-sm"
              title="Open Zakat Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Zakat</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setIsLightMode(!isLightMode)}
              className="p-2 rounded-xl bg-[#0A1931] text-[#D4AF37] border border-[#D4AF37]/40 hover:text-white transition-all"
              title="Toggle Light/Dark Theme"
            >
              {isLightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-[#0A1931] text-[#D4AF37] border border-[#D4AF37]/40 hover:text-white transition-all"
              title="Share Virtual Mosque"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setLoginModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] hover:from-[#FFF3B0] text-[#0A1931] text-xs font-mono font-black flex items-center gap-1.5 shadow-md transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Join Free / Login</span>
            </button>

          </div>

        </div>
      </header>

      {/* ============================================================== */}
      {/* LUXURY MOSQUE INTERIOR HERO BANNER                             */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden border-b border-[#D4AF37]/30 bg-[#071326]">
        
        {/* Interior Grand Visual */}
        <div className="relative aspect-[21/9] min-h-[360px] max-h-[500px] w-full overflow-hidden flex items-center justify-center">
          <img
            src="/src/assets/images/masjid_main_interior_1792374532066.jpg"
            alt="Interior of Masjid Al-Noor Al-Alami Grand Virtual Mosque"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931] via-[#0A1931]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1931]/80 via-transparent to-[#0A1931]/80" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-8 space-y-4 max-w-4xl mx-auto z-10">
            
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0A1931]/90 border border-[#D4AF37] text-xs font-mono font-bold text-[#D4AF37] backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE 24/7 GLOBAL VIRTUAL MOSQUE • المسجد النور العالمي</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight drop-shadow-2xl">
              A 24/7 Sanctuary for All Humanity
            </h1>

            <p className="text-sm sm:text-base font-serif italic text-[#FFF3B0] max-w-2xl drop-shadow leading-relaxed">
              "For Muslims and Seekers of Peace — Enter in tranquility, worship, learn, and restore cosmic balance through compassion and divine trusteeship."
            </p>

            <div className="flex items-center gap-3 pt-2 flex-wrap justify-center">
              <button
                onClick={() => scrollToSection('mihrab')}
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0A1931] font-mono font-black text-xs uppercase tracking-wider shadow-xl hover:bg-[#FFF3B0] transition-all"
              >
                Join Prayer / Mihrab Live
              </button>
              
              <button
                onClick={() => scrollToSection('mizan')}
                className="px-6 py-2.5 rounded-xl bg-[#0A1931]/90 text-[#D4AF37] border border-[#D4AF37]/60 font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37]/20 transition-all backdrop-blur-md"
              >
                Al-Mizan 10,000 News Engine
              </button>
            </div>

          </div>

        </div>

        {/* Quick Stats Ticker Below Hero */}
        <div className="bg-[#071326] border-t border-[#D4AF37]/30 py-3 px-4 sm:px-8 text-xs font-mono text-slate-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Current Status: <strong className="text-white">Active 24/7 Across All Continents</strong></span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-[#D4AF37]">
              <span>✦ Aladhan API Live</span>
              <span>✦ Whisper AI Transcription</span>
              <span>✦ 10,000+ Mosques Index</span>
              <span>✦ Free Universal Fellowship</span>
            </div>
          </div>
        </div>

      </section>

      {/* ============================================================== */}
      {/* 7 MEGA SECTIONS CONTAINER                                      */}
      {/* ============================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-24">
        
        {/* SECTION 1: AL-MIHRAB LIVE 24/7 */}
        <AlMihrabPrayerCenter />

        {/* SECTION 2: MAJLIS AL-HIKMAH */}
        <MajlisAlHikmahKhutbah />

        {/* SECTION 3: MASJID MAP AL-ALAMI */}
        <MasjidMapFinder />

        {/* SECTION 4: MADRASAH AL-NOOR */}
        <MadrasahAlNoor />

        {/* SECTION 5: AL-MIZAN THE 10,000 ENGINE */}
        <AlMizanNewsEngine />

        {/* SECTION 6: DIWAN AL-ALAMI */}
        <DiwanAlAlamiCommunity />

        {/* SECTION 06.5: MEMBERSHIP & PAYSTACK TIERS (Niyyah 0 GHS, Noor 50 GHS, Al-Bari 150 GHS) */}
        <MasjidMembershipSection />

        {/* SECTION 7: ZAKAT & HUMANITARIAN SANCTUARY */}
        <section id="zakat" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F274D] via-[#0A1931] to-[#0F274D] border-2 border-[#D4AF37] shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION 07 • SADAQAH & REGENERATIVE EQUILIBRIUM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Zakat & Universal Free Basic Needs Fund
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            In accordance with the IGPD Global Declaration, 100% of voluntary Zakat and Sadaqah channels directly into tangible provision: free housing micro-settlements, clean solar water aquifers in Apam and West Africa, community healthcare, and zero-fee education.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
            <button
              onClick={() => setZakatCalculatorOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] hover:from-[#FFF3B0] text-[#0A1931] font-mono font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate My Zakat Now</span>
            </button>

            <button
              onClick={onNavigateIgpd}
              className="px-6 py-3 rounded-xl bg-[#071326] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#D4AF37] font-mono font-bold text-xs uppercase tracking-wider transition-all"
            >
              Read Full IGPD Declaration
            </button>
          </div>
        </section>

      </main>

      {/* ============================================================== */}
      {/* VIRTUAL MOSQUE GLOBAL FOOTER                                   */}
      {/* ============================================================== */}
      <footer className="border-t border-[#D4AF37]/40 bg-[#071326] text-slate-400 py-12 px-4 sm:px-8 text-xs font-mono space-y-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-black text-white uppercase tracking-wider">
              MASJID AL-NOOR AL-ALAMI
            </h4>
            <div className="text-xs font-serif text-[#D4AF37]" dir="rtl">
              المسجد النور العالمي — 24/7 Global Virtual Mosque
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
              Founded under the auspices of IGPD (Islam for Global Peace and Development) and Oskayi Consult. A home of peace, spiritual knowledge, and universal equity for all humanity.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-serif font-bold text-white uppercase">
              Patron & Leadership
            </h4>
            <div className="text-[#D4AF37] font-bold">
              ABDUL-BARI (Al-Bari) - The Evolver, The Maker
            </div>
            <div className="text-slate-300">
              Servant of The Creator — Qur'an 59:24
            </div>
            <div className="text-slate-400">
              Listowel Sarsah • Contact: <strong className="text-white">0244905505</strong>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-serif font-bold text-white uppercase">
              Global Sanctuaries & Offices
            </h4>
            <div className="text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Dubai Office: DIFC Gate District, Dubai, UAE</span>
            </div>
            <div className="text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Ghana Office: Apam Coastal Sanctuary, Central Region</span>
            </div>
            <div className="text-[#D4AF37] pt-2">
              SO HELP ME ALLAH (Prophet Muhammad Peace Be Upon Him)
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 Masjid Al-Noor Al-Alami • IGPD • Oskayi Consult Limited
          </div>
          <div className="flex items-center gap-4 text-[#D4AF37]">
            <button onClick={onNavigateIgpd} className="hover:underline">IGPD Declaration</button>
            <span>•</span>
            <button onClick={onNavigateHome} className="hover:underline">Oskayi Consult Portal</button>
            <span>•</span>
            <button onClick={onNavigateGate} className="hover:underline">Sanctuary Gate</button>
          </div>
        </div>
      </footer>

      {/* Login / Join Free Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-md w-full bg-[#0A1931] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <h3 className="text-lg font-serif font-black text-white">
                Join Free / Login to Sanctuary
              </h3>
              <button onClick={() => setLoginModalOpen(false)} className="text-slate-400 font-mono text-xs">
                ✕ Close
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Membership in Masjid Al-Noor is 100% free and open to all: track your daily Madrasah progress, save your favorite Khutbahs, and participate in Diwan discussions.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); setLoginModalOpen(false); }} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="text-slate-300 block mb-1">Your Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sister Fatima or John"
                  className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Email or Phone:</label>
                <input
                  type="text"
                  required
                  placeholder="name@example.com or 0244905505"
                  className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Affiliation / Role:</label>
                <select className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none">
                  <option>Friend of Peace (Non-Muslim)</option>
                  <option>Muslim</option>
                  <option>Student of Knowledge</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#D4AF37] text-[#0A1931] font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                Enter Virtual Fellowship
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Zakat Calculator Modal */}
      {zakatCalculatorOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-lg w-full bg-[#0A1931] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <h3 className="text-lg font-serif font-black text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#D4AF37]" />
                <span>Interactive Sharia Zakat Calculator</span>
              </h3>
              <button onClick={() => setZakatCalculatorOpen(false)} className="text-slate-400 font-mono text-xs">
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-slate-300 block mb-1">Cash in Bank & Savings ($ USD):</label>
                <input
                  type="number"
                  value={cashSavings || ''}
                  onChange={(e) => setCashSavings(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/40 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Gold Owned (grams):</label>
                  <input
                    type="number"
                    value={goldGrams || ''}
                    onChange={(e) => setGoldGrams(Number(e.target.value))}
                    placeholder="0"
                    className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/40 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Silver Owned (grams):</label>
                  <input
                    type="number"
                    value={silverGrams || ''}
                    onChange={(e) => setSilverGrams(Number(e.target.value))}
                    placeholder="0"
                    className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/40 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Business Merchandise / Inventory Value ($):</label>
                <input
                  type="number"
                  value={businessStock || ''}
                  onChange={(e) => setBusinessStock(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/40 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Deduct Immediate Debts / Liabilities ($):</label>
                <input
                  type="number"
                  value={debtsOwed || ''}
                  onChange={(e) => setDebtsOwed(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/40 text-white outline-none"
                />
              </div>

              {/* Result Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0F274D] to-[#0A1931] border border-[#D4AF37] space-y-2 text-center">
                <div className="text-[11px] text-slate-400 uppercase">
                  Net Qualifying Wealth: <strong className="text-white">${Math.max(0, totalAssets).toLocaleString()} USD</strong>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#FFF3B0]">
                  Zakat Due (2.5%): ${zakatDue.toFixed(2)} USD
                </div>
                <div className="text-[10px] text-emerald-400">
                  {totalAssets > 6500 ? '✦ Exceeds Nisab threshold — Zakat is obligatory' : 'Below standard Nisab threshold'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setZakatCalculatorOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#0A1931] font-mono font-bold text-xs"
            >
              Done / Return to Sanctuary
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
