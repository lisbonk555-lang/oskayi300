import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Check, 
  Copy, 
  Sparkles, 
  Globe, 
  Heart, 
  BookOpen, 
  Sun, 
  Home, 
  Utensils, 
  Activity, 
  Zap, 
  Wifi, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

interface IgpdPageProps {
  onNavigateHome: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onNavigateMasjid?: () => void;
}

export const IgpdPage: React.FC<IgpdPageProps> = ({ onNavigateHome, onNavigateSection, onNavigateMasjid }) => {
  const [copied, setCopied] = useState(false);
  const [posterModalOpen, setPosterModalOpen] = useState(false);

  // SEO Management for /igpd
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Islam for Global Peace and Development - Nature as Benchmark for Global Financial System";

    const metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Global declaration by Abdul-Bari - Provision of basic needs for billions free through nature-based financial system.'
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        'Islam for Global Peace and Development - Nature as Benchmark for Global Financial System'
      );
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Global declaration by Abdul-Bari - Provision of basic needs for billions free through nature-based financial system.'
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
    const shareUrl = "http://www.oskayi.com/igpd";
    const shareText = "IGPD - Islam for Global Peace and Development | Global Declaration by Abdul-Bari: Nature as Benchmark for Global Financial Systems";
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const supportingQuotes = [
    {
      source: "Qur'an 55:10",
      quote: "And the earth He laid out for all living creatures.",
      tradition: "Islamic Revelation",
      icon: "☪"
    },
    {
      source: "Bible Genesis 1:29 & Acts 2:44-45",
      quote: "All share the provision; they held all things in common.",
      tradition: "Judeo-Christian Scripture",
      icon: "✝"
    },
    {
      source: "Bhagavad Gita 3:12 & 3:14",
      quote: "Sacrifice sustains; from food come all beings.",
      tradition: "Vedic Wisdom",
      icon: "ॐ"
    },
    {
      source: "Guru Granth Sahib",
      quote: "Share with others, serve all humanity.",
      tradition: "Sikh Scripture",
      icon: "ੴ"
    },
    {
      source: "Hadith Qudsi",
      quote: "My mercy prevails over My justice; care for the creation.",
      tradition: "Prophetic Tradition",
      icon: "✦"
    },
    {
      source: "Ubuntu",
      quote: "I am because we are; humanity to all.",
      tradition: "African Philosophy",
      icon: "🌍"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1931] text-slate-100 selection:bg-[#D4AF37] selection:text-[#0A1931] relative overflow-hidden font-sans">
      
      {/* Ornate Islamic Background Watermark & Geometry Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-geom-bg" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M60 0 L120 60 L60 120 L0 60 Z" fill="none" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="60" cy="60" r="38" fill="none" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="60" cy="60" r="18" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
              <path d="M60 22 L98 60 L60 98 L22 60 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
              <path d="M0 0 L120 120 M120 0 L0 120" stroke="#D4AF37" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geom-bg)" />
        </svg>
      </div>

      {/* Radiant Golden Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-gradient-to-t from-[#D4AF37]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Main Container with Ornate Gold Islamic Border */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 relative z-10">

        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#D4AF37]/30 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#071326] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono font-bold transition-all shadow-md group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Return to Oskayi Home</span>
            </button>

            {onNavigateMasjid && (
              <button
                onClick={onNavigateMasjid}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] hover:from-[#FFF3B0] text-[#0A1931] text-xs font-mono font-black transition-all shadow-lg"
              >
                <span>🕌 Enter Masjid Al-Noor (24/7 Virtual Mosque)</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#071326] text-[#D4AF37] hover:bg-[#0E2447] border border-[#D4AF37]/40 text-xs font-mono font-bold transition-all"
              title="Share Global Declaration"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Declaration</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OUTER GRAND ISLAMIC BORDER FRAME WRAPPER                       */}
        {/* ============================================================== */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0D2140] via-[#0A1931] to-[#071326] border-2 sm:border-[3px] border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.25)] p-5 sm:p-12 space-y-12">

          {/* Decorative Ornate Gold Corner Pieces (Pure Vector Islamic Knotwork) */}
          <div className="absolute top-2 left-2 w-12 h-12 pointer-events-none text-[#D4AF37]">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 24 L2 2 L24 2 M6 6 L6 18 M6 6 L18 6 M10 10 L10 14 M10 10 L14 10" />
              <circle cx="12" cy="12" r="3" fill="#D4AF37" />
            </svg>
          </div>
          <div className="absolute top-2 right-2 w-12 h-12 pointer-events-none text-[#D4AF37] rotate-90">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 24 L2 2 L24 2 M6 6 L6 18 M6 6 L18 6 M10 10 L10 14 M10 10 L14 10" />
              <circle cx="12" cy="12" r="3" fill="#D4AF37" />
            </svg>
          </div>
          <div className="absolute bottom-2 left-2 w-12 h-12 pointer-events-none text-[#D4AF37] -rotate-90">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 24 L2 2 L24 2 M6 6 L6 18 M6 6 L18 6 M10 10 L10 14 M10 10 L14 10" />
              <circle cx="12" cy="12" r="3" fill="#D4AF37" />
            </svg>
          </div>
          <div className="absolute bottom-2 right-2 w-12 h-12 pointer-events-none text-[#D4AF37] rotate-180">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 24 L2 2 L24 2 M6 6 L6 18 M6 6 L18 6 M10 10 L10 14 M10 10 L14 10" />
              <circle cx="12" cy="12" r="3" fill="#D4AF37" />
            </svg>
          </div>

          {/* Bismillah Sacred Arabic Calligraphy Banner */}
          <div className="text-center pt-2">
            <div className="inline-block px-6 py-2 rounded-full bg-[#0A1931]/80 border border-[#D4AF37]/50 shadow-inner">
              <span className="font-serif text-lg sm:text-2xl text-[#D4AF37] tracking-widest font-normal" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-[#D4AF37]/80 tracking-[0.25em] uppercase font-mono mt-1.5">
              In the Name of God, The Most Compassionate, The Most Merciful
            </p>
          </div>

          {/* ============================================================== */}
          {/* HEADER: CIRCULAR GOLD ORNATE FRAME & PORTRAIT                  */}
          {/* ============================================================== */}
          <header className="flex flex-col items-center text-center space-y-6">
            
            {/* Top circular gold ornate frame with portrait */}
            <div className="relative group">
              {/* Outer Glowing Halo */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] opacity-60 blur-md group-hover:opacity-90 transition-opacity" />

              {/* Ornate Gold Border SVG Ring */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-b from-[#FFF3B0] via-[#D4AF37] to-[#8C6D1F] shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-center">
                
                {/* Secondary Decorative Filigree Rim */}
                <div className="w-full h-full rounded-full p-1.5 bg-[#0A1931] border-2 border-dashed border-[#D4AF37] flex items-center justify-center overflow-hidden">
                  
                  {/* Portrait in white thobe/ghutra with gold bisht smiling */}
                  <img
                    src="/src/assets/images/abdul_bari_portrait_1792373116330.jpg"
                    alt="Abdul-Bari smiling in white thobe, ghutra, and gold bisht"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full filter contrast-105 shadow-inner"
                  />
                </div>

                {/* 4 Cardinal Golden Star Studs */}
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[#FFF3B0] text-sm">✦</span>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[#FFF3B0] text-sm">✦</span>
                <span className="absolute top-1/2 -left-1 -translate-y-1/2 text-[#FFF3B0] text-sm">✦</span>
                <span className="absolute top-1/2 -right-1 -translate-y-1/2 text-[#FFF3B0] text-sm">✦</span>
              </div>
            </div>

            {/* Below it gold ribbon banner text */}
            {/* "ABDUL-BARI (Al-Bari) - The Evolver, The Maker - Servant of The Creator - Qur'an 59:24" */}
            <div className="relative max-w-2xl mx-auto w-full px-2">
              {/* Gold Ribbon Body */}
              <div className="relative z-10 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8C6D1F] via-[#D4AF37] to-[#8C6D1F] text-[#0A1931] shadow-[0_6px_20px_rgba(212,175,55,0.4)] border border-[#FFF3B0]">
                <div className="text-xs sm:text-sm font-extrabold tracking-wide uppercase font-serif leading-tight">
                  ABDUL-BARI (Al-Bari)
                </div>
                <div className="text-[11px] sm:text-xs font-bold tracking-wider text-[#071326] mt-0.5">
                  The Evolver, The Maker — Servant of The Creator — Qur'an 59:24
                </div>
              </div>

              {/* 3D Ribbon Tails for Grand Declaration Aesthetic */}
              <div className="hidden sm:block absolute -left-3 top-2 w-5 h-8 bg-[#664D12] rounded-l-md -z-0 -skew-y-12" />
              <div className="hidden sm:block absolute -right-3 top-2 w-5 h-8 bg-[#664D12] rounded-r-md -z-0 skew-y-12" />
            </div>
          </header>

          {/* ============================================================== */}
          {/* SECTION 1 - TITLE & SUBTITLE                                   */}
          {/* Large gold text: IGPD - Islam for Global Peace and Development */}
          {/* Subtitle: GLOBAL DECLARATION                                   */}
          {/* ============================================================== */}
          <section className="text-center space-y-3 pt-4 border-t border-[#D4AF37]/30">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#071326] border border-[#D4AF37]/60 shadow-lg text-[#D4AF37] text-xs sm:text-sm font-mono uppercase tracking-[0.3em] font-extrabold">
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span>GLOBAL DECLARATION</span>
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-serif">
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-md">
                IGPD - Islam for Global Peace and Development
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              A Sacred Covenant for Universal Economic Equilibrium, Ecological Benchmark Architecture, and the Free Guarantee of Human Dignity.
            </p>
          </section>

          {/* ============================================================== */}
          {/* HERO POSTER DISPLAY (EXACT POSTER DESIGN EMBED)                */}
          {/* ============================================================== */}
          <section className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/70 shadow-[0_15px_40px_rgba(0,0,0,0.7)] group">
            <div className="relative aspect-[16/9] w-full bg-[#071326] overflow-hidden flex items-center justify-center">
              <img
                src="/src/assets/images/igpd_hero_poster_1792373117462.jpg"
                alt="Islam for Global Peace and Development Official Poster"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Poster Overlay Banner */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white z-10 flex-wrap gap-2">
                <span className="px-3 py-1 rounded-md bg-[#0A1931]/90 border border-[#D4AF37]/60 text-[#D4AF37] font-mono font-bold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Official IGPD Global Poster
                </span>
                
                <button
                  onClick={() => setPosterModalOpen(true)}
                  className="px-3 py-1 rounded-md bg-[#D4AF37] text-[#0A1931] font-mono font-black flex items-center gap-1.5 shadow-md hover:bg-[#FFF3B0] transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  View Fullscreen
                </button>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION 2 - CORE VISION (KEEP WORD FOR WORD)                   */}
          {/* ============================================================== */}
          <section className="space-y-6 pt-4">
            <div className="text-center">
              <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                Covenant & Economic Foundation
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
            </div>

            {/* Core Vision Statement 1: Nature as Benchmark */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0F274D] via-[#0A1931] to-[#071326] border-2 border-[#D4AF37] shadow-xl text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-[#D4AF37] pointer-events-none">
                <Sun className="w-28 h-28" />
              </div>

              <div className="inline-flex p-3 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]">
                <Globe className="w-6 h-6 animate-spin-slow" />
              </div>

              <blockquote className="text-xl sm:text-3xl font-serif font-bold text-white tracking-wide leading-relaxed">
                "Nature will be the Benchmark, the backbone of Global Financial Systems — not money..."
              </blockquote>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-mono uppercase tracking-wider">
                — Abdul-Bari • Benchmark of Global Financial Sovereignty
              </p>
            </div>

            {/* Core Vision Statement 2: Provision of Basic Needs for Billions */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#08152B] border border-[#D4AF37]/70 shadow-lg text-center space-y-6">
              <div className="text-lg sm:text-2xl font-serif font-bold text-[#FFF3B0] leading-snug">
                "Provision of Basic needs for Billions — free..."
              </div>

              {/* 5 Core Free Pillars Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
                <div className="p-3.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/40 flex flex-col items-center gap-2 group hover:border-[#D4AF37] transition-all">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Home className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Housing</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/40 flex flex-col items-center gap-2 group hover:border-[#D4AF37] transition-all">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Food</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/40 flex flex-col items-center gap-2 group hover:border-[#D4AF37] transition-all">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Health</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/40 flex flex-col items-center gap-2 group hover:border-[#D4AF37] transition-all">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Electricity</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/40 flex flex-col items-center gap-2 group hover:border-[#D4AF37] transition-all">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Internet</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                </div>
              </div>

              {/* Quote in gold italics (keep word for word) */}
              <div className="pt-4 border-t border-[#D4AF37]/30">
                <blockquote className="text-lg sm:text-2xl font-serif italic text-[#D4AF37] font-semibold tracking-wide">
                  "I don't have money — but it will be done... investors will be profiting."
                </blockquote>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION 3 - UNITED IN SACRED GUIDANCE                          */}
          {/* ============================================================== */}
          <section className="space-y-4 pt-6 border-t border-[#D4AF37]/30 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-mono uppercase tracking-widest font-bold">
              <span>Omnipresent Truth</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif uppercase">
              UNITED IN SACRED GUIDANCE
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              Across millennia and across every divine revelation, the mandate of human stewardship is uniform: the Earth and its fruits belong to the Creator, entrusted to humanity for equitable sharing without monopolization.
            </p>
          </section>

          {/* ============================================================== */}
          {/* SECTION 4 - SUPPORTING QUOTES & PRINCIPLES                     */}
          {/* (Create 2-column gold box)                                     */}
          {/* ============================================================== */}
          <section className="p-6 sm:p-10 rounded-3xl bg-[#071326]/95 border-2 border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.2)] relative space-y-6">
            
            {/* Header of the 2-Column Gold Box */}
            <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#D4AF37]">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>Sacred Canonical Principles & Universal Mandates</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Universal Harmony Across Faiths</span>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {supportingQuotes.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0A1931] border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all space-y-2 relative group hover:shadow-lg hover:shadow-[#D4AF37]/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#D4AF37] flex items-center gap-1.5">
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.source}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {item.tradition}
                    </span>
                  </div>

                  <blockquote className="text-sm sm:text-base font-serif italic text-white group-hover:text-[#FFF3B0] transition-colors leading-relaxed">
                    "{item.quote}"
                  </blockquote>
                </div>
              ))}
            </div>

            {/* Interfaith Unity Note */}
            <div className="text-center pt-2 text-[11px] text-[#D4AF37]/90 font-mono">
              ✦ Qur'an • Bible • Bhagavad Gita • Guru Granth Sahib • Hadith Qudsi • Ubuntu ✦
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION 5 - MISSION                                            */}
          {/* "MISSION: Restoring balance through compassion, stewardship of  */}
          {/* nature, and equitable provision for all humanity."             */}
          {/* ============================================================== */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0F274D] via-[#122E5C] to-[#0F274D] border-2 border-[#D4AF37] text-center space-y-4 shadow-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37] text-[#0A1931] text-xs font-mono font-black tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE SACRED MISSION</span>
            </div>

            <p className="text-xl sm:text-3xl font-serif font-extrabold text-white leading-relaxed max-w-4xl mx-auto">
              MISSION: Restoring balance through compassion, stewardship of nature, and equitable provision for all humanity.
            </p>
          </section>

          {/* ============================================================== */}
          {/* SECTION 6 - FOOTER CTA                                         */}
          {/* Large gold bar with http://www.oskayi.com/igpd and small text: */}
          {/* "IGPD • Islam for Global Peace and Development •               */}
          {/* For the benefit of all people, all faiths, all creation"       */}
          {/* ============================================================== */}
          <section className="space-y-4 pt-4">
            
            {/* Large Gold Bar */}
            <div className="w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#8C6D1F] via-[#D4AF37] to-[#8C6D1F] text-[#0A1931] shadow-[0_10px_35px_rgba(212,175,55,0.4)] border-2 border-[#FFF3B0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest font-black text-[#0A1931]/80">
                  Official Global Declaration Portal
                </div>
                <div className="text-xl sm:text-3xl font-mono font-black text-[#071326] tracking-tight mt-1">
                  http://www.oskayi.com/igpd
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="px-5 py-3 rounded-xl bg-[#0A1931] hover:bg-[#071326] text-[#D4AF37] hover:text-[#FFF3B0] text-xs font-mono font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg border border-[#D4AF37]"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "Link Copied" : "Copy Declaration URL"}</span>
                </button>
              </div>
            </div>

            {/* Small text below gold bar */}
            <div className="text-center text-xs sm:text-sm font-serif font-medium text-[#D4AF37] tracking-wide pt-2">
              IGPD • Islam for Global Peace and Development • For the benefit of all people, all faiths, all creation
            </div>
          </section>

          {/* Bottom Corporate Anchor & Return Link */}
          <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <span>
              Published under auspices of <strong className="text-slate-200">Oskayi Consult Limited</strong> (ROC Ghana Act 151)
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={onNavigateHome}
                className="text-[#D4AF37] hover:underline font-mono"
              >
                Return to Oskayi Consult Home
              </button>
              <span>•</span>
              <a
                href="mailto:contact@oskayi.com?subject=IGPD%20Global%20Declaration%20Inquiry"
                className="text-slate-300 hover:text-white font-mono"
              >
                Inquiries: contact@oskayi.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Poster Modal */}
      {posterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-[#0A1931] rounded-2xl border-2 border-[#D4AF37] p-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#D4AF37]/40 mb-3">
              <span className="text-xs font-mono font-bold text-[#D4AF37]">
                IGPD Global Declaration Poster — Full Resolution
              </span>
              <button
                onClick={() => setPosterModalOpen(false)}
                className="px-3 py-1 rounded-lg bg-[#D4AF37] text-[#0A1931] text-xs font-mono font-bold hover:bg-[#FFF3B0]"
              >
                Close (ESC)
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] w-full flex items-center justify-center">
              <img
                src="/src/assets/images/igpd_hero_poster_1792373117462.jpg"
                alt="IGPD Poster Fullscreen"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[72vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
