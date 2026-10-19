import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Volume2, ShieldCheck, Phone, MapPin } from 'lucide-react';

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

  const handleEnterClick = () => {
    setIsOpening(true);

    // Play gentle Adhan chime / audio
    try {
      const audio = new Audio('https://cdn.aladhan.com/audio/adhans/a1.mp3');
      audio.volume = 0.6;
      audio.play().catch(() => {
        // Fallback if browser autoplay policies restrict
      });
    } catch (e) {
      // Audio fallback
    }

    // Delay slightly for majestic door swing & light burst animation
    setTimeout(() => {
      onEnter();
    }, 1800);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#060D1A] text-slate-100 overflow-hidden flex flex-col justify-between font-sans selection:bg-[#D4AF37] selection:text-[#0A1931]">
      
      {/* Background Night Sky & Mosque Gate Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/masjid_gate_doors_1792374532422.jpg"
          alt="Masjid Al-Noor Al-Alami Grand Gate Entrance"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center filter brightness-95 transition-all duration-1000 ${
            isOpening ? 'scale-110 filter brightness-125 blur-[1px]' : 'scale-100'
          }`}
        />
        
        {/* Night sky vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-transparent to-[#060D1A]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#060D1A_90%)]" />
      </div>

      {/* Radiant Divine Light Burst during door opening */}
      {isOpening && (
        <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-[#FFF3B0]/60 via-[#D4AF37]/40 to-white/70 animate-pulse duration-700 backdrop-blur-sm" />
      )}

      {/* Top Bar Navigation */}
      <header className="relative z-20 p-4 sm:p-6 flex items-center justify-between flex-wrap gap-4">
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
            Oskayi Consult
          </button>
        </div>

        {/* Quranic Foundations Badge */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931]/80 border border-[#D4AF37]/40 text-xs font-mono text-[#FFF3B0] backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Quran 72:18 "The places of worship are for Allah" • Quran 15:46</span>
        </div>
      </header>

      {/* Center 3D Grand Portal Entrance & Calligraphy */}
      <main className="relative z-20 max-w-4xl mx-auto px-4 text-center my-auto space-y-6">
        
        {/* Glowing Arabic Calligraphy Above Door */}
        {/* ادْخُلُوا بِسَلَامٍ آمِنِينَ (Enter in peace and safety) */}
        <div className="space-y-2">
          <div className="inline-block px-6 py-2.5 rounded-2xl bg-[#0A1931]/85 border-2 border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.4)] backdrop-blur-md">
            <span 
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FFF3B0] tracking-widest font-black drop-shadow-[0_2px_15px_rgba(212,175,55,0.8)]"
              dir="rtl"
            >
              ادْخُلُوا بِسَلَامٍ آمِنِينَ
            </span>
          </div>

          <div className="text-xs sm:text-sm font-serif italic text-[#D4AF37] tracking-wider uppercase drop-shadow">
            "Enter ye here in peace and security" — Surah Al-Hijr (Quran 15:46)
          </div>
        </div>

        {/* Official Name & Arabic */}
        <div className="space-y-2 pt-2">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            المسجد النور العالمي • 24/7 Virtual Sanctuary
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight drop-shadow-xl">
            MASJID AL-NOOR AL-ALAMI
          </h1>
          <p className="text-sm sm:text-lg font-serif italic text-[#FFF3B0] max-w-2xl mx-auto drop-shadow">
            "A 24/7 House for All Humanity — For Muslims and Seekers of Peace"
          </p>
        </div>

        {/* 3D Gate Doors Opening Visualizer */}
        <div className="relative max-w-md mx-auto my-6 perspective-1000">
          <div className="flex items-center justify-center relative">
            
            {/* Center Pulsing ENTER Button */}
            <div className="relative z-20">
              <button
                onClick={handleEnterClick}
                disabled={isOpening}
                className={`relative px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] text-[#0A1931] font-serif font-black text-lg sm:text-2xl uppercase tracking-wider shadow-[0_0_50px_rgba(212,175,55,0.7)] border-2 border-white hover:scale-105 active:scale-95 transition-all group flex items-center gap-3 mx-auto ${
                  isOpening ? 'animate-pulse' : 'animate-bounce-subtle'
                }`}
              >
                <Sparkles className="w-5 h-5 text-[#0A1931] animate-spin-slow" />
                <span>{isOpening ? 'OPENING SANCTUARY...' : 'ENTER — ادخل'}</span>
                <Volume2 className="w-5 h-5 text-[#0A1931]" />
              </button>
            </div>

          </div>
        </div>

        {/* Description Below Button */}
        <div className="max-w-2xl mx-auto">
          <div className="p-4 rounded-2xl bg-[#0A1931]/80 border border-[#D4AF37]/50 backdrop-blur-md shadow-xl text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            A Global Community for All People — Muslims and Non-Muslims Seeking Peace, Knowledge & Compassion | <strong>24/7 Open • Free Universal Access</strong>
          </div>
        </div>

        {/* Founder & Sovereign Patron Attribution */}
        <div className="pt-2 text-[11px] font-mono text-[#D4AF37] space-y-1">
          <div>
            ABDUL-BARI (Al-Bari) - The Evolver, The Maker - Servant of The Creator - Qur'an 59:24
          </div>
          <div className="text-slate-400">
            IGPD - Islam for Global Peace and Development • Listowel Sarsah • Contact: 0244905505
          </div>
        </div>

      </main>

      {/* Footer Sovereign Oath & Offices */}
      <footer className="relative z-20 p-4 sm:p-6 border-t border-[#D4AF37]/30 bg-[#060D1A]/90 backdrop-blur-md text-xs font-mono text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-[#D4AF37] font-serif font-bold tracking-wider">
            SO HELP ME ALLAH (Prophet Muhammad Peace Be Upon Him)
          </div>
          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              Dubai Office: DIFC Gate District, UAE
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              Ghana Office: Apam Coastal Office, Central Region
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};
