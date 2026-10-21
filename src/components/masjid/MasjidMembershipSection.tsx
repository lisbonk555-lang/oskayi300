import React, { useState } from 'react';
import { Sparkles, Check, ShieldCheck, Heart, Crown, ArrowRight, Lock, Award, Star } from 'lucide-react';
import { PaystackCheckout, MembershipTier } from './PaystackCheckout';

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'niyyah',
    name: 'Niyyah (Intention)',
    arabicName: 'النية — الإخلاص',
    tagline: 'Seeker of Peace & Universal Truth',
    priceGHS: 0,
    period: 'Free Lifetime Access',
    benefits: [
      'Madrasah Al-Noor limited daily Ayah & Hadith reflection',
      'Masjid Map global index view & directions',
      'Diwan Al-Alami community read-only access',
      'Daily live prayer times countdown (Aladhan)',
      'Digital certificate of sanctuary participation'
    ]
  },
  {
    id: 'noor',
    name: 'Noor (Light)',
    arabicName: 'النور — الهداية',
    tagline: 'Dedicated Sanctuary Supporter',
    priceGHS: 50,
    period: '50 GHS / Month Recurring',
    isPopular: true,
    benefits: [
      'Full Madrasah curriculum with Whisper AI transcripts download',
      'Full Global Mosque Map search, filtering & custom submissions',
      'Active posting & discussion in Diwan Al-Alami peace forum',
      'Digital Qibla compass & Sharia Zakat calculator unlocked',
      'Al-Mizan 10,000 news engine daily editorial digest in your inbox',
      'Auto-Adhan player with all 5 famous Muezzin recordings'
    ]
  },
  {
    id: 'al-bari',
    name: 'Al-Bari (The Evolver)',
    arabicName: 'البارئ — التطور والعدالة',
    tagline: 'Sovereign Benefactor & Patron Fellowship',
    priceGHS: 150,
    period: '150 GHS / Month Recurring',
    benefits: [
      'All privileges included in Noor tier',
      'Direct Al-Mizan 10,000 news engine article submission & curation',
      'Direct spiritual & strategic collaboration channels with Patron ABDUL-BARI',
      'Universal Zakat Fund community governance voting rights',
      '24/7 Priority support & private halaqah audio invitations',
      'Official Gold-Embossed Fellowship Parchment Certificate (Signed by Patron)'
    ]
  }
];

interface MasjidMembershipSectionProps {
  onOpenTier?: (tier: MembershipTier) => void;
}

export const MasjidMembershipSection: React.FC<MasjidMembershipSectionProps> = ({
  onOpenTier
}) => {
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleSelectTier = (tier: MembershipTier) => {
    setSelectedTier(tier);
    setCheckoutOpen(true);
    if (onOpenTier) onOpenTier(tier);
  };

  return (
    <section id="membership" className="relative space-y-8 scroll-mt-24 font-sans">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/60 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>SECTION 06.5 • SANCTUARY FELLOWSHIP & TIERS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
          Join the Global Fellowship
        </h2>

        <div className="text-sm sm:text-base font-serif italic text-[#FFF3B0]" dir="rtl">
          وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ — "Cooperate in righteousness and piety" (Quran 5:2)
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Support the operations of Masjid Al-Noor Al-Alami, free educational Madrasah resources, automated prayer servers, and the IGPD global initiative through automated Paystack inline contributions in Ghana Cedis (GHS).
        </p>
      </div>

      {/* 3 Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-4">
        {MEMBERSHIP_TIERS.map((tier) => {
          const isNoor = tier.id === 'noor';
          const isAlBari = tier.id === 'al-bari';

          return (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border-2 backdrop-blur-md ${
                isNoor
                  ? 'bg-gradient-to-b from-[#0F274D] via-[#0A1931] to-[#071326] border-[#D4AF37] shadow-[0_15px_45px_rgba(212,175,55,0.25)] scale-[1.02]'
                  : isAlBari
                  ? 'bg-[#0A1931] border-[#D4AF37]/60 hover:border-[#D4AF37] shadow-xl'
                  : 'bg-[#0A1931]/80 border-slate-700/60 hover:border-[#D4AF37]/50 shadow-md'
              }`}
            >
              {/* Popular / Sovereign Badge */}
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] text-[#0A1931] text-[10px] font-mono font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>MOST REVERED CHOICE</span>
                </div>
              )}

              {isAlBari && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0A1931] border border-[#D4AF37] text-[#FFF3B0] text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Crown className="w-3 h-3 text-[#D4AF37]" />
                  <span>PATRON & GOVERNANCE</span>
                </div>
              )}

              {/* Card Top: Name & Price */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                    Tier {tier.id === 'niyyah' ? '01' : tier.id === 'noor' ? '02' : '03'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                    {tier.name}
                  </h3>
                  <div className="text-xs font-serif text-[#FFF3B0]" dir="rtl">
                    {tier.arabicName}
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    {tier.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-[#071326] border border-[#D4AF37]/30 text-center space-y-1">
                  <div className="text-3xl sm:text-4xl font-serif font-black text-[#FFF3B0]">
                    {tier.priceGHS === 0 ? '0 GHS' : `${tier.priceGHS} GHS`}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {tier.period}
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Privileges:
                  </div>
                  <ul className="space-y-2 text-xs">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => handleSelectTier(tier)}
                  className={`w-full py-3.5 rounded-2xl font-serif font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                    isNoor
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] text-[#0A1931] hover:brightness-110 border border-white'
                      : isAlBari
                      ? 'bg-[#D4AF37] text-[#0A1931] hover:bg-[#FFF3B0]'
                      : 'bg-[#071326] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1931] border border-[#D4AF37]/50'
                  }`}
                >
                  {tier.priceGHS === 0 ? (
                    <>
                      <Award className="w-4 h-4" />
                      <span>Join Free — Niyyah</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Subscribe — {tier.id === 'noor' ? 'Noor 50 GHS' : 'Al-Bari 150 GHS'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Paystack Inline Modal Component */}
      <PaystackCheckout
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        tier={selectedTier}
        onSuccess={() => {
          // Success handled inside modal with Certificate preview
        }}
      />

    </section>
  );
};
