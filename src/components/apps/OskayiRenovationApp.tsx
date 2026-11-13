import React, { useState, useEffect } from "react";
import {
  Lock,
  Upload,
  CheckCircle2,
  Calendar,
  Users,
  FileText,
  Sparkles,
  Download,
} from "lucide-react";
import { PaystackUsdModal } from "../common/PaystackUsdModal";
import { FeatureSlidesAndBenefits } from "../common/FeatureSlidesAndBenefits";
import { downloadRenovationQuotePdf } from "../../utils/pdfGenerator";

const RENOVATION_SLIDES = [
  {
    slideNumber: "01",
    headline: "Before & After Facade Re-Engineering",
    subheadline:
      "Turn aging concrete structures into high-margin obsidian and brushed-gold residential landmarks without demolishing load-bearing walls.",
    metricLabel: "Typical Value Lift",
    metricValue: "3.1x ROI",
    highlights: [
      "Preserves existing structural foundation",
      "Matte charcoal architectural cladding",
      "Warm 2700K recessed soffit illumination",
      "Frameless tempered glass balustrades",
    ],
  },
  {
    slideNumber: "02",
    headline: "5-Photo Multi-Angle Interior & Exterior Scan",
    subheadline:
      "After unlocking, upload up to 5 photos covering living rooms, kitchens, bathrooms, and facades to receive 3 costed transformation concepts.",
    metricLabel: "Fastest Turnaround",
    metricValue: "6 Weeks",
    highlights: [
      "3 distinct architectural design tiers",
      "Real-time USD renovation budgets",
      "Vetted local specialist contractor roster",
      "Week-by-week milestone schedule",
    ],
  },
  {
    slideNumber: "03",
    headline: "Bankable Contractor Quote Generation",
    subheadline:
      "Export an official signed renovation scope and material budget in USD ready for bank home-improvement loans or diaspora family remittances.",
    metricLabel: "Starter Budget",
    metricValue: "$8,000 USD",
    highlights: [
      "Downloadable PDF formal quote",
      "Zero hidden contractor markups",
      "Clear material and labor separation",
      "Oskayi Consult verified license footer",
    ],
  },
];

const RENOVATION_BENEFITS = [
  {
    stat: "$8k -> $25k",
    title: "3x Equity Appreciation",
    description:
      "Strategic exterior glazing, stone courtyard paving, and recessed lighting triple perceived property market valuation.",
  },
  {
    stat: "3 Concepts",
    title: "Choose Your Exact Budget Tier",
    description:
      "Compare Executive Minimalist ($8,000), Luxury Rental ($12,500), and Penthouse Retrofit ($22,000) designs side by side.",
  },
  {
    stat: "100% Vetted",
    title: "Verified Specialist Contractors",
    description:
      "Immediate direct access to licensed cladding, glazing, and MEP teams with transparent execution timelines.",
  },
];

export const OskayiRenovationApp: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [swipePercent, setSwipePercent] = useState(50);
  const [isAfterFocus, setIsAfterFocus] = useState(false);

  // Real After Payment State
  const [uploadedPhotos, setUploadedPhotos] = useState<{ name: string; url: string }[]>([]);
  const [currentValueUsd, setCurrentValueUsd] = useState(32000);
  const [renovationResult, setRenovationResult] = useState<any>(null);
  const [selectedDesignIdx, setSelectedDesignIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  // Demo Auto-Play: Swipe back and forth between Before & After every 4 seconds
  useEffect(() => {
    if (unlocked) return;
    const cycleTimer = setInterval(() => {
      setIsAfterFocus((prev) => !prev);
    }, 4000);
    return () => clearInterval(cycleTimer);
  }, [unlocked]);

  useEffect(() => {
    if (unlocked) return;
    const target = isAfterFocus ? 88 : 12;
    const anim = setInterval(() => {
      setSwipePercent((curr) => {
        if (Math.abs(curr - target) <= 2) return target;
        return curr < target ? curr + 2 : curr - 2;
      });
    }, 28);
    return () => clearInterval(anim);
  }, [isAfterFocus, unlocked]);

  const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = (e.target.files ? Array.from(e.target.files) : []).slice(0, 5) as File[];
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPhotos((prev) => [...prev, { name: f.name, url: reader.result as string }].slice(0, 5));
      };
      reader.readAsDataURL(f);
    });
  };

  const generateDesigns = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/renovation/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photosCount: Math.max(1, uploadedPhotos.length),
          currentEstimateValueUsd: currentValueUsd,
          firstPhotoBase64: uploadedPhotos[0]?.url,
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setRenovationResult(data.result);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (unlocked && !renovationResult) {
      generateDesigns();
    }
  }, [unlocked]);

  return (
    <div className="min-h-screen bg-[#08090C] text-white">
      {!unlocked ? (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Auto-Swipe Before / After Showcase (NO UPLOAD IN DEMO) */}
            <div className="lg:col-span-7 bg-[#111318] border border-amber-500/30 rounded-3xl overflow-hidden flex flex-col justify-between">
              <div className="relative h-[340px] sm:h-[430px] w-full overflow-hidden select-none">
                {/* Base Layer: AFTER Renovation */}
                <img
                  src="/src/assets/images/renovation_after_house_1794542136468.jpg"
                  alt="Modern black and gold renovated residence exterior"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Clipped Layer: BEFORE Renovation */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - swipePercent}% 0 0)` }}
                >
                  <img
                    src="/src/assets/images/renovation_before_house_1794542136699.jpg"
                    alt="Old house facade before renovation"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Vertical Gold Wipe Divider */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.9)]"
                  style={{ left: `${swipePercent}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-1 rounded bg-amber-400 text-black font-mono-data text-[10px] font-extrabold whitespace-nowrap">
                    SWIPE
                  </div>
                </div>

                {/* Top Labels */}
                <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-lg bg-black/80 border border-zinc-700 text-xs font-bold text-zinc-300">
                    BEFORE (OLD)
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-amber-400 text-black text-xs font-extrabold">
                    AFTER (MODERN)
                  </span>
                </div>

                {/* Bottom Valuation Scrim */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-6">
                  <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    Verified Transformation Case Study
                  </p>
                  <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    This renovation cost $8,000, value now $25,000
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#0C0E13] border-t border-amber-500/20 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-zinc-400 block">Renovation Spend</span>
                  <span className="font-mono-data text-lg font-bold text-white">$8,000 USD</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Post-Renovation Value</span>
                  <span className="font-mono-data text-lg font-bold text-amber-400">$25,000 USD</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Turnaround</span>
                  <span className="font-mono-data text-lg font-bold text-emerald-400">6 Weeks</span>
                </div>
              </div>
            </div>

            {/* Right Payment & Features Side */}
            <div className="lg:col-span-5 bg-[#111318] border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-5">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Oskayi Before & After Renovation
                </p>
                <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-white leading-[1.08] text-balance">
                  Transform Aging Structures Into Luxury Assets
                </h1>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Watch the live auto-play swipe showing how an $8,000 modernization lifts market equity to $25,000. Unlock your studio to upload up to 5 photos of your building.
                </p>

                <div className="space-y-3 pt-4 border-t border-zinc-800 text-sm text-zinc-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Upload up to 5 property photos (interior & exterior)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Receive 3 bespoke architectural concepts & USD cost</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Vetted contractor roster, 6-week timeline & Quote PDF</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => setPaywallOpen(true)}
                  className="w-full min-h-[54px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Get YOUR Renovation Design - $15 via Paystack USD</span>
                </button>
                <p className="text-xs text-center text-zinc-400">
                  Instant access in USD · Includes 3 Concepts & Official Contractor Quote
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* REAL AFTER PAYMENT RENOVATION STUDIO */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-[#111318] border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                Oskayi Before & After Renovation Studio
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Upload up to 5 building photos to generate 3 transformation designs, contractor directory, and official USD quote.
              </p>
            </div>
            {renovationResult && (
              <button
                type="button"
                onClick={() =>
                  downloadRenovationQuotePdf({
                    planId: renovationResult.planId,
                    selectedDesign: renovationResult.designs[selectedDesignIdx],
                    contractors: renovationResult.contractors,
                  })
                }
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Generate Quote (PDF)</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Upload 5 Photos Panel */}
            <div className="lg:col-span-4 bg-[#111318] border border-zinc-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                Upload Property Photos ({uploadedPhotos.length}/5)
              </h2>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-amber-500/40 rounded-xl p-6 bg-black/40 hover:bg-black/70 cursor-pointer transition">
                <Upload className="w-7 h-7 text-amber-400 mb-2" />
                <span className="text-xs font-semibold text-white text-center">
                  Select Up to 5 Exterior / Interior Photos
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUploadPhotos}
                  className="hidden"
                />
              </label>

              {uploadedPhotos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {uploadedPhotos.map((p, idx) => (
                    <img
                      key={idx}
                      src={p.url}
                      alt={p.name}
                      className="h-16 w-full object-cover rounded-lg border border-zinc-700"
                    />
                  ))}
                </div>
              )}

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-zinc-400">Current Estimated Value</span>
                  <span className="font-mono-data text-amber-400 font-bold">
                    ${currentValueUsd.toLocaleString()} USD
                  </span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={250000}
                  step={2000}
                  value={currentValueUsd}
                  onChange={(e) => setCurrentValueUsd(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                type="button"
                onClick={generateDesigns}
                disabled={loading}
                className="w-full min-h-[46px] rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-sm cursor-pointer disabled:opacity-60"
              >
                {loading ? "Analyzing Photos..." : "Generate 3 Renovation Designs"}
              </button>
            </div>

            {/* 3 Designs + Contractors + Timeline */}
            <div className="lg:col-span-8 space-y-6">
              {renovationResult && (
                <>
                  <div className="bg-[#111318] border border-amber-500/30 rounded-2xl p-5 text-xs text-zinc-300 leading-relaxed">
                    <span className="text-amber-400 font-bold block mb-1">
                      Architectural Assessment ({renovationResult.photosAnalyzed} photo(s) evaluated)
                    </span>
                    {renovationResult.aiInsight}
                  </div>

                  {/* 3 Design Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renovationResult.designs.map((d: any, idx: number) => (
                      <div
                        key={d.id}
                        onClick={() => setSelectedDesignIdx(idx)}
                        className={`p-5 rounded-2xl border cursor-pointer transition space-y-3 ${
                          selectedDesignIdx === idx
                            ? "bg-amber-500/10 border-amber-400"
                            : "bg-[#111318] border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <p className="text-[11px] font-semibold text-amber-400">{d.styleTag}</p>
                        <h3 className="text-sm font-bold text-white leading-snug">{d.title}</h3>
                        <div className="pt-2 border-t border-zinc-800 space-y-1 font-mono-data text-xs">
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Renovation Cost:</span>
                            <span className="text-white font-bold">${d.estimatedCostUsd.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">New Value:</span>
                            <span className="text-emerald-400 font-bold">${d.projectedValueUsd.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Timeline:</span>
                            <span className="text-amber-400">{d.durationWeeks} Weeks</span>
                          </div>
                        </div>
                        <ul className="text-[11px] text-zinc-300 space-y-1 pt-2">
                          {d.keyUpgrades.map((u: string, i: number) => (
                            <li key={i}>• {u}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Contractor List & Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#111318] border border-zinc-800 rounded-2xl p-5 space-y-3">
                      <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Vetted Specialist Contractors</span>
                      </h3>
                      <div className="space-y-3">
                        {renovationResult.contractors.map((c: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-xs">
                            <div className="flex justify-between font-bold text-white">
                              <span>{c.name}</span>
                              <span className="text-amber-400">{c.rating}</span>
                            </div>
                            <p className="text-zinc-400 mt-0.5">{c.specialty} · {c.location}</p>
                            <p className="text-[11px] font-mono-data text-zinc-500 mt-1">
                              License: {c.verifiedLicense} · {c.contactEmail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#111318] border border-zinc-800 rounded-2xl p-5 space-y-3">
                      <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Execution Timeline</span>
                      </h3>
                      <div className="space-y-3">
                        {renovationResult.timeline.map((t: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-xs">
                            <span className="font-mono-data font-bold text-amber-400">{t.weeks}</span>
                            <p className="text-zinc-200 mt-1">{t.phase}</p>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          downloadRenovationQuotePdf({
                            planId: renovationResult.planId,
                            selectedDesign: renovationResult.designs[selectedDesignIdx],
                            contractors: renovationResult.contractors,
                          })
                        }
                        className="w-full min-h-[42px] rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-xs cursor-pointer mt-2"
                      >
                        Generate Quote & Export PDF
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <FeatureSlidesAndBenefits
        sectionTitle="Oskayi Before & After Renovation"
        slides={RENOVATION_SLIDES}
        benefits={RENOVATION_BENEFITS}
        theme="black-gold"
      />

      <PaystackUsdModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        appName="Oskayi Before & After Renovation"
        productTitle="5-Photo Upload, 3 AI Designs, Contractors & Quote"
        amountUsd={15}
        accentClass="bg-amber-400 hover:bg-amber-500 text-black font-extrabold"
        onSuccess={() => {
          setPaywallOpen(false);
          setUnlocked(true);
        }}
      />
    </div>
  );
};
