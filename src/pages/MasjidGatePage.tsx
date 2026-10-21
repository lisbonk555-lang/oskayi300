import React, { useState, useRef } from 'react';
import { Sparkles, ArrowLeft, Volume2, ShieldCheck, Phone, MapPin, Compass } from 'lucide-react';

interface MasjidGatePageProps {
  onEnter: () => void;
  onNavigateHome: () => void;
  onNavigateIgpd: () => void;
}

export const MasjidGatePage: React.FC<MasjidGatePageProps> = ({
  onEnter,
  onNavigateHome,
  onNavigateIgpd
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [hasStartedTransition, setHasStartedTransition] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnterClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play gentle Adhan echo audio
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('https://cdn.aladhan.com/audio/adhans/a1.mp3');
        audioRef.current.volume = 0.65;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Fallback Web Audio synth chime if browser prevents external autoplay
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(432, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(864, ctx.currentTime + 1.2);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 2);
        } catch (e) {
          // Silent fallback
        }
      });
    } catch (e) {
      // Audio fallback
    }

    // After door swing & light burst animation (1.8s), fade and redirect
    setTimeout(() => {
      setHasStartedTransition(true);
      setTimeout(() => {
        onEnter();
      }, 400);
    }, 1800);
  };

  return (
    <div className={`relative min-h-screen w-full bg-[#03070E] text-slate-100 overflow-x-hidden flex flex-col justify-between font-sans selection:bg-[#D4AF37] selection:text-[#0A1931] transition-opacity duration-500 ${
      hasStartedTransition ? 'opacity-0 scale-105' : 'opacity-100'
    }`}>
      
      {/* ============================================================== */}
      {/* BACKGROUND: Subtle Kaaba & Mosque Silhouette Pattern          */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Deep Midnight & Black Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0A1931_0%,_#040914_60%,_#000000_100%)]" />

        {/* Golden Constellation Stars */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px]" />

        {/* Subtle Kaaba and Mosque Silhouettes SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Skyline Minarets & Domes */}
          <path
            d="M0 900V750L40 730V620L60 600L80 620V730L120 750V900H0Z"
            fill="#D4AF37"
          />
          <path
            d="M1440 900V750L1400 730V620L1380 600L1360 620V730L1320 750V900H1440Z"
            fill="#D4AF37"
          />
          {/* Center Subtle Kaaba Cube Silhouette with Golden Kiswah band */}
          <rect x="670" y="700" width="100" height="110" rx="4" fill="#000000" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="670" y1="735" x2="770" y2="735" stroke="#D4AF37" strokeWidth="3" />
          {/* Mosque Dome Curves */}
          <path
            d="M320 900V780C320 740 370 710 430 710C490 710 540 740 540 780V900H320Z"
            fill="#0A1931"
            stroke="#D4AF37"
            strokeWidth="0.8"
          />
          <path
            d="M900 900V780C900 740 950 710 1010 710C1070 710 1120 740 1120 780V900H900Z"
            fill="#0A1931"
            stroke="#D4AF37"
            strokeWidth="0.8"
          />
        </svg>

        {/* Soft Golden Fog on Floor */}
        <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-black via-[#0A1931]/40 to-transparent" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-30 p-4 sm:p-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateIgpd}
            className="px-3.5 py-1.5 rounded-xl bg-[#0A1931]/80 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono font-bold flex items-center gap-2 transition-all backdrop-blur-md shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>IGPD Global Declaration</span>
          </button>
          <button
            onClick={onNavigateHome}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-[#0A1931]/60 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition-all backdrop-blur-md"
          >
            Oskayi Portal
          </button>
        </div>

        {/* Quranic Foundations Badge */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931]/90 border border-[#D4AF37]/50 text-xs font-mono text-[#FFF3B0] backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Quran 72:18 "The places of worship are for Allah" • Quran 15:46</span>
        </div>
      </header>

      {/* ============================================================== */}
      {/* CENTER STAGE: 3D GOLDEN ISLAMIC GATE (BAB AL-NOOR)              */}
      {/* ============================================================== */}
      <main className="relative z-20 max-w-5xl mx-auto px-4 text-center my-auto py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Top Center: Bismillah in Arabic Calligraphy Gold */}
        <div className="space-y-2 animate-in fade-in">
          <div className="inline-block px-6 py-2 rounded-full bg-[#0A1931]/90 border border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.3)] backdrop-blur-md">
            <span 
              className="font-serif text-2xl sm:text-4xl text-[#FFF3B0] font-black tracking-widest drop-shadow-[0_2px_12px_rgba(212,175,55,0.7)]"
              dir="rtl"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>

          {/* Glowing Arch Inscription */}
          <div className="text-xs sm:text-sm font-serif italic text-[#D4AF37] tracking-widest uppercase drop-shadow">
            ادْخُلُوا بِسَلَامٍ آمِنِينَ — "Enter in peace and safety" (Quran 15:46)
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3D DOUBLE GOLDEN DOORS (BAB AL-NOOR) WITH AYAT AL-KURSI        */}
        {/* ============================================================== */}
        <div className="relative max-w-xl mx-auto [perspective:1400px]">
          
          {/* Behind the doors: Radiant Celestial Light Burst */}
          <div className={`absolute inset-0 rounded-t-[140px] flex items-center justify-center transition-all duration-1000 overflow-hidden ${
            isOpening 
              ? 'opacity-100 scale-105 shadow-[0_0_120px_rgba(255,243,176,0.9)]' 
              : 'opacity-0 scale-95'
          }`}>
            <div className="w-full h-full bg-gradient-to-t from-[#FFF3B0] via-[#D4AF37] to-white flex flex-col items-center justify-center text-[#0A1931] p-6 animate-pulse">
              <Sparkles className="w-16 h-16 text-[#0A1931] animate-spin" />
              <div className="font-serif font-black text-2xl tracking-wider uppercase pt-3">
                Entering Virtual Sanctuary...
              </div>
            </div>
          </div>

          {/* Outer Gate Arch Ornate Frame */}
          <div className="relative p-3.5 sm:p-5 rounded-t-[160px] bg-gradient-to-b from-[#241A08] via-[#100D05] to-[#0A0802] border-4 border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.35)]">
            
            {/* Top Keystones & Ghana Kente Gold Accent Trim */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[#0A1931] border border-[#D4AF37] text-[10px] font-mono text-[#D4AF37] font-bold tracking-widest uppercase">
              BAB AL-NOOR • باب النور
            </div>

            {/* Double Doors Container with 3D Transform */}
            <div className="relative h-[340px] sm:h-[420px] w-full grid grid-cols-2 gap-1 rounded-t-[135px] overflow-hidden [transform-style:preserve-3d]">
              
              {/* LEFT DOOR - Opens Outwards to Left (rotateY: -80deg) */}
              <div
                style={{
                  transformOrigin: 'left center',
                  transform: isOpening ? 'rotateY(-85deg)' : 'rotateY(0deg)',
                  transition: 'transform 1.6s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                className="relative h-full w-full bg-gradient-to-br from-[#E5C158] via-[#B8860B] to-[#5C4308] border-r border-[#3A2A04] shadow-[inset_0_0_35px_rgba(0,0,0,0.8)] p-3 sm:p-4 flex flex-col justify-between text-left rounded-tl-[135px] overflow-hidden"
              >
                {/* Islamic Arabesque Geometric Watermark */}
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#0A1931_2px,transparent_2px)] [background-size:16px_16px]" />

                {/* Left Door Upper Arch Engraving: Ayat Al-Kursi Part 1 */}
                <div className="relative z-10 pt-8 sm:pt-12 text-right">
                  <div className="text-[10px] sm:text-xs font-serif text-[#0A1931] font-black leading-relaxed tracking-wide drop-shadow-sm select-none" dir="rtl">
                    اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ
                  </div>
                </div>

                {/* Left Door Center Knob / Ornate Islamic Brass Knocker */}
                <div className="relative z-10 self-end my-auto pr-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFF3B0] via-[#D4AF37] to-[#8C6D1F] border-2 border-[#0A1931] shadow-[0_4px_15px_rgba(0,0,0,0.7)] flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#0A1931]" />
                  </div>
                </div>

                {/* Left Door Base Inscription */}
                <div className="relative z-10 text-[9px] font-mono text-[#0A1931] font-black tracking-wider uppercase">
                  AYAT AL-KURSI • آية الكرسي
                </div>
              </div>

              {/* RIGHT DOOR - Opens Outwards to Right (rotateY: 80deg) */}
              <div
                style={{
                  transformOrigin: 'right center',
                  transform: isOpening ? 'rotateY(85deg)' : 'rotateY(0deg)',
                  transition: 'transform 1.6s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                className="relative h-full w-full bg-gradient-to-bl from-[#E5C158] via-[#B8860B] to-[#5C4308] border-l border-[#3A2A04] shadow-[inset_0_0_35px_rgba(0,0,0,0.8)] p-3 sm:p-4 flex flex-col justify-between text-right rounded-tr-[135px] overflow-hidden"
              >
                {/* Islamic Arabesque Geometric Watermark */}
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#0A1931_2px,transparent_2px)] [background-size:16px_16px]" />

                {/* Right Door Upper Arch Engraving: Ayat Al-Kursi Part 2 */}
                <div className="relative z-10 pt-8 sm:pt-12 text-left">
                  <div className="text-[10px] sm:text-xs font-serif text-[#0A1931] font-black leading-relaxed tracking-wide drop-shadow-sm select-none" dir="rtl">
                    مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ
                  </div>
                </div>

                {/* Right Door Center Knob / Ornate Islamic Brass Knocker */}
                <div className="relative z-10 self-start my-auto pl-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFF3B0] via-[#D4AF37] to-[#8C6D1F] border-2 border-[#0A1931] shadow-[0_4px_15px_rgba(0,0,0,0.7)] flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#0A1931]" />
                  </div>
                </div>

                {/* Right Door Base Inscription */}
                <div className="relative z-10 text-[9px] font-mono text-[#0A1931] font-black tracking-wider uppercase">
                  SURAH AL-BAQARAH 2:255
                </div>
              </div>

            </div>

          </div>

          {/* Center Floating Button: [ ENTER — ادخل ] */}
          <div className="absolute -bottom-7 sm:-bottom-8 inset-x-0 z-30 flex justify-center">
            <button
              onClick={handleEnterClick}
              disabled={isOpening}
              className={`px-8 py-4 sm:px-12 sm:py-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] text-[#0A1931] font-serif font-black text-base sm:text-2xl uppercase tracking-wider shadow-[0_0_45px_rgba(212,175,55,0.8)] border-2 border-white hover:scale-105 active:scale-95 transition-all group flex items-center gap-3 disabled:opacity-80 ${
                isOpening ? 'animate-pulse' : 'animate-bounce-subtle'
              }`}
            >
              <Sparkles className="w-5 h-5 text-[#0A1931] animate-spin-slow" />
              <span>{isOpening ? 'OPENING SANCTUARY...' : 'ENTER — ادخل'}</span>
              <Volume2 className="w-5 h-5 text-[#0A1931]" />
            </button>
          </div>

        </div>

        {/* Title Below Gate & Subtitle */}
        <div className="space-y-3 pt-10 sm:pt-12">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            The 24/7 Global Virtual Mosque
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight drop-shadow-xl">
            Masjid Al-Noor Al-Alami - مسجد النور العالمي
          </h1>

          <p className="text-sm sm:text-lg font-serif italic text-[#FFF3B0] max-w-3xl mx-auto drop-shadow leading-relaxed">
            Institute for Global Peace & Dignity - IGPD
          </p>

          <div className="p-3.5 max-w-2xl mx-auto rounded-2xl bg-[#0A1931]/80 border border-[#D4AF37]/50 backdrop-blur-md text-xs sm:text-sm text-slate-200">
            A Global Community for All People — Muslims and Non-Muslims Seeking Peace, Knowledge & Compassion | <strong>24/7 Universal Open Access</strong>
          </div>
        </div>

      </main>

      {/* ============================================================== */}
      {/* FOOTER: Patron & Leadership SO HELP ME ALLAH                    */}
      {/* ============================================================== */}
      <footer className="relative z-30 p-4 sm:p-6 border-t border-[#D4AF37]/30 bg-[#040914]/95 backdrop-blur-md text-xs font-mono text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          <div className="space-y-1">
            <div className="text-[#D4AF37] font-serif font-bold tracking-wider text-sm sm:text-base">
              SO HELP ME ALLAH - Patron ABDUL-BARI (Al-Bari)
            </div>
            <div className="text-[11px] text-slate-300">
              The Evolver, The Maker — Servant of The Creator • Qur'an 59:24 | IGPD • Listowel Sarsah (Contact: 0244905505)
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              Dubai: DIFC Gate District
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              Ghana: Apam Coastal Sanctuary
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};
