import React from 'react';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Heart, Moon } from 'lucide-react';

interface MasjidHeroSection00Props {
  onNavigateMasjidGate: () => void;
}

export const MasjidHeroSection00: React.FC<MasjidHeroSection00Props> = ({
  onNavigateMasjidGate
}) => {
  return (
    <section className="relative w-full bg-[#050B14] border-b-2 border-[#D4AF37]/50 overflow-hidden font-sans">
      
      {/* Background Islamic Watermark and Night Sky Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/masjid_gate_doors_1792374532422.jpg"
          alt="Golden Gate of Masjid Al-Noor Al-Alami"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B14] via-[#050B14]/85 to-[#050B14]/90 lg:to-[#050B14]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-[#050B14]/80" />
      </div>

      {/* Decorative Golden Ambient Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Text, Calligraphy & Button (8 cols) */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            
            {/* Top Badge: SECTION 00 Official Sanctuary */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931]/90 border border-[#D4AF37] text-xs font-mono font-bold text-[#D4AF37] shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>SECTION 00 • SPECIAL GLOBAL SANCTUARY INITIATIVE</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                24/7 Virtual Mosque Live
              </span>
            </div>

            {/* Bismillah in Arabic Calligraphy */}
            <div className="text-sm sm:text-base font-serif text-[#D4AF37] tracking-widest" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • ادْخُلُوا بِسَلَامٍ آمِنِينَ
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight drop-shadow-xl">
                MASJID AL-NOOR AL-ALAMI
              </h2>
              <div className="text-base sm:text-xl font-serif text-[#FFF3B0] tracking-wide" dir="rtl">
                المسجد النور العالمي — The 24/7 Global Virtual Mosque
              </div>
            </div>

            {/* Mandatory Subtitle Text (exact from brief) */}
            <p className="text-sm sm:text-lg text-slate-200 max-w-2xl font-light leading-relaxed drop-shadow">
              A Global Digital Mosque for Billions — Qibla, Zakat, Madrasah, Al-Mizan Engine, Diwan Community
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono text-slate-300 pt-1">
              <span className="px-3 py-1 rounded-lg bg-[#0A1931]/80 border border-[#D4AF37]/40 text-[#FFF3B0] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                Live Aladhan & Qibla
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#0A1931]/80 border border-[#D4AF37]/40 text-[#FFF3B0] flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                Zakat & Sadaqah Sanctuary
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#0A1931]/80 border border-[#D4AF37]/40 text-[#FFF3B0] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Al-Mizan 10,000 News
              </span>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onNavigateMasjidGate}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] text-[#0A1931] font-serif font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border border-white group"
              >
                <span>Enter Masjid Al-Noor Al-Alami →</span>
                <ArrowRight className="w-4 h-4 text-[#0A1931] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-xs font-mono text-slate-400 text-center lg:text-left">
                Free & Open to All Humanity • Muslims & Seekers of Peace
              </div>
            </div>

          </div>

          {/* Right Column: Visual Golden Gate Teaser Card (4 cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <div 
              onClick={onNavigateMasjidGate}
              className="cursor-pointer relative w-full max-w-sm rounded-3xl bg-[#0A1931]/90 border-2 border-[#D4AF37] shadow-[0_15px_45px_rgba(0,0,0,0.8)] p-5 text-center space-y-4 hover:border-[#FFF3B0] transition-all group backdrop-blur-md"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/60">
                <img
                  src="/src/assets/images/masjid_gate_doors_1792374532422.jpg"
                  alt="Bab Al-Noor Golden Gate"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-2 right-2 text-center text-xs font-serif font-bold text-[#FFF3B0] drop-shadow">
                  Bab Al-Noor (The Golden Gate)
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono uppercase text-[#D4AF37] font-bold">
                  Ayat Al-Kursi Engraved Portal
                </div>
                <div className="text-xs text-slate-300">
                  Click to experience the full 3D opening animation with Adhan echo and enter the global virtual sanctuary.
                </div>
              </div>

              <div className="text-xs font-mono font-bold text-[#D4AF37] group-hover:text-white flex items-center justify-center gap-1">
                <span>Proceed to Gate /igpd/masjid</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
