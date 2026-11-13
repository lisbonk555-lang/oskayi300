import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export interface FeatureSlide {
  slideNumber: string;
  headline: string;
  subheadline: string;
  metricLabel: string;
  metricValue: string;
  highlights: string[];
}

export interface FeatureBenefit {
  title: string;
  description: string;
  stat: string;
}

interface FeatureSlidesAndBenefitsProps {
  sectionTitle: string;
  slides: FeatureSlide[];
  benefits: FeatureBenefit[];
  theme: "gold-light" | "red-light" | "black-gold" | "blue-gov" | "pink-dark";
}

export const FeatureSlidesAndBenefits: React.FC<FeatureSlidesAndBenefitsProps> = ({
  sectionTitle,
  slides,
  benefits,
  theme,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const isDark = theme === "black-gold" || theme === "pink-dark";

  const themeTokens = {
    "gold-light": {
      cardBg: "bg-white border-[#E5DEC9]",
      accentText: "text-[#9A7414]",
      accentBg: "bg-[#C59B27] text-white",
      dotActive: "bg-[#C59B27]",
      dotIdle: "bg-[#E5DEC9]",
      benefitBg: "bg-[#FFFDF7] border-[#EAE1C8]",
      heading: "text-slate-950",
      subtext: "text-slate-600",
    },
    "red-light": {
      cardBg: "bg-white border-red-200",
      accentText: "text-red-600",
      accentBg: "bg-red-600 text-white",
      dotActive: "bg-red-600",
      dotIdle: "bg-red-200",
      benefitBg: "bg-[#FFF8F8] border-red-200",
      heading: "text-slate-950",
      subtext: "text-slate-600",
    },
    "black-gold": {
      cardBg: "bg-[#111318] border-amber-500/30",
      accentText: "text-amber-400",
      accentBg: "bg-amber-400 text-black",
      dotActive: "bg-amber-400",
      dotIdle: "bg-zinc-700",
      benefitBg: "bg-[#14171F] border-amber-500/20",
      heading: "text-white",
      subtext: "text-zinc-300",
    },
    "blue-gov": {
      cardBg: "bg-white border-blue-200",
      accentText: "text-blue-700",
      accentBg: "bg-blue-700 text-white",
      dotActive: "bg-blue-700",
      dotIdle: "bg-blue-200",
      benefitBg: "bg-[#F5F9FF] border-blue-200",
      heading: "text-slate-950",
      subtext: "text-slate-600",
    },
    "pink-dark": {
      cardBg: "bg-[#140B14] border-pink-500/30",
      accentText: "text-pink-400",
      accentBg: "bg-pink-500 text-white",
      dotActive: "bg-pink-500",
      dotIdle: "bg-zinc-700",
      benefitBg: "bg-[#180D18] border-pink-500/20",
      heading: "text-white",
      subtext: "text-zinc-300",
    },
  }[theme];

  const slide = slides[activeSlide];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Interactive Presentation Slideshow */}
      <div className={`rounded-3xl border p-6 sm:p-8 shadow-sm transition-colors ${themeTokens.cardBg}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-current/10">
          <div>
            <p className={`text-xs font-bold uppercase tracking-wider ${themeTokens.accentText}`}>
              {sectionTitle} · Presentation Slide {slide.slideNumber}
            </p>
            <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 text-balance ${themeTokens.heading}`}>
              {slide.headline}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
              className={`min-h-[40px] min-w-[40px] rounded-xl border flex items-center justify-center cursor-pointer transition ${
                isDark
                  ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
              aria-label="Next slide"
              className={`min-h-[40px] min-w-[40px] rounded-xl border flex items-center justify-center cursor-pointer transition ${
                isDark
                  ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className={`text-sm sm:text-base leading-relaxed ${themeTokens.subtext}`}>
              {slide.subheadline}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slide.highlights.map((h, i) => (
                <div key={i} className={`flex items-start gap-2 text-xs sm:text-sm ${themeTokens.heading}`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${themeTokens.accentText}`} />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-4 rounded-2xl p-6 text-center ${themeTokens.accentBg}`}>
            <p className="text-xs font-semibold opacity-85 uppercase tracking-wide">
              {slide.metricLabel}
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold font-mono-data mt-2">
              {slide.metricValue}
            </p>
          </div>
        </div>

        {/* Slide Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((s, idx) => (
            <button
              key={s.slideNumber}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === activeSlide ? `w-8 ${themeTokens.dotActive}` : `w-2.5 ${themeTokens.dotIdle}`
              }`}
            />
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {benefits.map((b, i) => (
          <div key={i} className={`rounded-2xl border p-6 space-y-2 ${themeTokens.benefitBg}`}>
            <p className={`text-lg font-extrabold font-mono-data ${themeTokens.accentText}`}>
              {b.stat}
            </p>
            <h3 className={`text-base font-bold ${themeTokens.heading}`}>{b.title}</h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${themeTokens.subtext}`}>
              {b.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
