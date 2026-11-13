import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Download,
  Lock,
  Upload,
  TrendingDown,
  CheckCircle2,
  ShieldAlert,
  Hammer,
} from "lucide-react";
import { PaystackUsdModal } from "../common/PaystackUsdModal";
import { FeatureSlidesAndBenefits } from "../common/FeatureSlidesAndBenefits";
import { downloadCostKillerPdf } from "../../utils/pdfGenerator";

const COST_KILLER_SLIDES = [
  {
    slideNumber: "01",
    headline: "Expose Hidden Contractor & Middleman Markups",
    subheadline:
      "Hardware resellers and site foremen routinely mark up cement, iron rods, and porcelain tiles by 22–34%. Catch every inflated invoice line before paying a cent.",
    metricLabel: "Average Build Savings",
    metricValue: "24.8%",
    highlights: [
      "Live benchmarking across 6 structural categories",
      "Flags overcharging on cement, iron & tiles",
      "Direct comparison with factory wholesale rates",
      "Zero middlemen commissions",
    ],
  },
  {
    slideNumber: "02",
    headline: "Upload Any BOQ Photo Or Select Materials",
    subheadline:
      "Snap a picture of your contractor's handwritten or printed Bill of Quantities, or input quantities directly to locate verified cheapest wholesale yards.",
    metricLabel: "Audit Turnaround",
    metricValue: "15 Secs",
    highlights: [
      "Multimodal BOQ photo recognition",
      "Direct factory names & locations disclosed",
      "Dynamic quantity and USD unit-price adjuster",
      "Downloadable Savings Report PDF",
    ],
  },
  {
    slideNumber: "03",
    headline: "Success-Aligned Pricing: Only 2% of Savings",
    subheadline:
      "Pay strictly 2% of verified procurement savings in USD via Paystack—saving $1,960 net for every $2,000 identified on cement and steel.",
    metricLabel: "Audit Fee",
    metricValue: "2% Fee",
    highlights: [
      "Transparent Paystack USD verification",
      "Supplier direct factory locations revealed",
      "Export audit dossier for diaspora family review",
      "Stops mid-project budget overruns",
    ],
  },
];

const COST_KILLER_BENEFITS = [
  {
    stat: "$6,700+",
    title: "Average Build Cash Preserved",
    description:
      "Typical 3-bedroom and 4-bedroom homebuilders reclaim $4,500–$9,000 USD on cement, iron rods, and porcelain tiles alone.",
  },
  {
    stat: "Direct Yard",
    title: "Factory Gate Wholesale Contacts",
    description:
      "Bypass 3 layers of retail brokers by buying directly from Tema clinker depots, steel mills, and ceramic factory outlets.",
  },
  {
    stat: "PDF Audit",
    title: "Verifiable Diaspora Oversight",
    description:
      "Share an independent material cost report PDF with your family or project manager before releasing milestone cash.",
  },
];

const DEMO_MATERIALS = [
  {
    key: "cement",
    material: "Cement (800 Bags)",
    alertText: "You are overpaying $2,000 on cement",
    quotedUsd: 7840,
    directUsd: 5840,
    buildStagePct: 35,
  },
  {
    key: "iron",
    material: "Iron Rods (12 Tons)",
    alertText: "You are overpaying $2,760 on iron rods",
    quotedUsd: 12600,
    directUsd: 9840,
    buildStagePct: 68,
  },
  {
    key: "tiles",
    material: "Porcelain Tiles (320 sqm)",
    alertText: "You are overpaying $1,952 on tiles",
    quotedUsd: 5920,
    directUsd: 3968,
    buildStagePct: 92,
  },
];

export const OskayiCostKillerApp: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  const [tickingPriceUsd, setTickingPriceUsd] = useState(14200);

  // Real After Payment State
  const [catalog, setCatalog] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<
    Record<string, { selected: boolean; quantity: number; userQuotedUnitPriceUsd: number }>
  >({});
  const [boqPhotoPreview, setBoqPhotoPreview] = useState<string | null>(null);
  const [boqPhotoBase64, setBoqPhotoBase64] = useState<string | undefined>(undefined);
  const [analysisReport, setAnalysisReport] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Demo Auto-Play: House building animation + price counter climbing + red alert every 4s
  useEffect(() => {
    if (unlocked) return;
    const matTimer = setInterval(() => {
      setDemoIdx((prev) => (prev + 1) % DEMO_MATERIALS.length);
    }, 4000);
    const priceTimer = setInterval(() => {
      setTickingPriceUsd((prev) => (prev >= 48000 ? 14200 : prev + 340));
    }, 350);
    return () => {
      clearInterval(matTimer);
      clearInterval(priceTimer);
    };
  }, [unlocked]);

  useEffect(() => {
    fetch("/api/cost-killer/materials")
      .then((r) => r.json())
      .then((list) => {
        setCatalog(list);
        const init: Record<string, any> = {};
        list.forEach((m: any) => {
          init[m.id] = {
            selected: true,
            quantity: m.defaultQty,
            userQuotedUnitPriceUsd: m.typicalMarketUsd,
          };
        });
        setSelectedItems(init);
      })
      .catch(console.error);
  }, []);

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const entries = Object.entries(selectedItems) as [
        string,
        { selected: boolean; quantity: number; userQuotedUnitPriceUsd: number }
      ][];
      const payload = entries
        .filter(([, v]) => v.selected)
        .map(([id, v]) => ({
          id,
          quantity: v.quantity,
          userQuotedUnitPriceUsd: v.userQuotedUnitPriceUsd,
        }));

      const res = await fetch("/api/cost-killer/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedMaterials: payload,
          boqImageBase64: boqPhotoBase64,
        }),
      });
      const data = await res.json();
      if (data.success && data.report) {
        setAnalysisReport(data.report);
      }
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    if (unlocked && catalog.length > 0 && !analysisReport) {
      runAnalysis();
    }
  }, [unlocked, catalog]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBoqPhotoPreview(result);
      setBoqPhotoBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const activeDemo = DEMO_MATERIALS[demoIdx];
  // 2% of demo total savings ($6,712 * 2% = $134.24 or $40 on $2,000 cement savings)
  const demoPaystackFeeUsd = 40;

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-slate-950">
      {/* DEMO MODE: RED + WHITE WARNING AUTO-PLAY (NO TYPING) */}
      {!unlocked ? (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Animated Construction & Red Alert Stage */}
            <div className="lg:col-span-7 bg-red-50/60 border border-red-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Live Overpricing Audit</span>
                </div>
                <span className="text-xs font-mono-data text-slate-600">
                  Material Focus: {activeDemo.material}
                </span>
              </div>

              {/* Flashing Red Warning Box */}
              <div className="my-6 p-5 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20 flex items-center gap-4 transition-all">
                <AlertTriangle className="w-9 h-9 text-white shrink-0 animate-bounce" />
                <div>
                  <p className="text-xs uppercase font-bold text-red-100">Red Alert Detected</p>
                  <p className="text-xl sm:text-2xl font-extrabold leading-snug">
                    {activeDemo.alertText}
                  </p>
                </div>
              </div>

              {/* Animated House Construction Progress Visual */}
              <div className="bg-white border border-red-200 rounded-2xl p-6 space-y-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Contractor Spend Counter</p>
                    <p className="text-3xl sm:text-4xl font-extrabold font-mono-data text-red-600">
                      ${tickingPriceUsd.toLocaleString()} USD
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Build Progress</p>
                    <p className="text-lg font-bold font-mono-data text-slate-900">
                      {activeDemo.buildStagePct}%
                    </p>
                  </div>
                </div>

                {/* Animated Structural SVG House Rising */}
                <div className="h-40 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-4">
                  <svg viewBox="0 0 220 110" className="w-full h-full max-w-xs">
                    {/* Foundation */}
                    <rect x="25" y="92" width="170" height="8" fill="#DC2626" rx="2" />
                    {/* Walls rising */}
                    <rect
                      x="35"
                      y={92 - Math.round((activeDemo.buildStagePct / 100) * 48)}
                      width="150"
                      height={Math.round((activeDemo.buildStagePct / 100) * 48)}
                      fill="#FEE2E2"
                      stroke="#DC2626"
                      strokeWidth="2"
                    />
                    {/* Roof */}
                    {activeDemo.buildStagePct > 60 && (
                      <polygon
                        points="24,44 110,12 196,44"
                        fill="#B91C1C"
                        opacity={activeDemo.buildStagePct > 85 ? 1 : 0.45}
                      />
                    )}
                    {/* Windows */}
                    <rect x="52" y="56" width="26" height="22" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.5" />
                    <rect x="142" y="56" width="26" height="22" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.5" />
                    <rect x="98" y="60" width="24" height="32" fill="#DC2626" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-500 block">Contractor Quote</span>
                    <span className="font-mono-data font-bold text-base text-red-600">
                      ${activeDemo.quotedUsd.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block">Direct Factory Price</span>
                    <span className="font-mono-data font-bold text-base text-emerald-700">
                      ${activeDemo.directUsd.toLocaleString()} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Paywall Column */}
            <div className="lg:col-span-5 bg-white border border-red-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div className="space-y-5">
                <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Oskayi House Cost Killer
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight text-balance">
                  Stop Overpaying Suppliers and Contractors by 25%
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Watch how inflated cement, iron rod, and tile invoices drain thousands of dollars per build. Unlock our live supplier database and BOQ photo scanner to cut material spend immediately.
                </p>

                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2 text-xs text-slate-800">
                  <div className="flex items-center gap-2 font-bold text-red-700">
                    <Hammer className="w-4 h-4" />
                    <span>Included After Unlock</span>
                  </div>
                  <p>• Upload your Bill of Quantities (BOQ) photo for instant audit</p>
                  <p>• Select cement, iron rods, tiles & roofing directly</p>
                  <p>• Reveal verified cheapest factory suppliers & download PDF</p>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => setPaywallOpen(true)}
                  className="w-full min-h-[54px] px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-red-600/25 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Unlock YOUR Savings Report - 2% of savings via Paystack USD</span>
                </button>
                <p className="text-xs text-center text-slate-500 font-mono-data">
                  Audit Fee Example: ${demoPaystackFeeUsd}.00 USD (2% of $2,000 Verified Cement Savings)
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* REAL AFTER PAYMENT WORKSPACE */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-red-600 text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">Oskayi House Cost Killer — Active Audit</h1>
              <p className="text-xs text-red-100 mt-1">
                Upload a BOQ photo or adjust material quantities below to find the cheapest verified suppliers in USD.
              </p>
            </div>
            {analysisReport && (
              <button
                type="button"
                onClick={() => downloadCostKillerPdf(analysisReport)}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-bold text-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download Savings Report PDF</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Upload BOQ Photo & Material Selector */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-red-700 mb-2">
                  Option A: Upload BOQ Photo / Contractor Quote
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-red-300 rounded-xl p-5 bg-red-50/40 hover:bg-red-50 cursor-pointer transition">
                  <Upload className="w-6 h-6 text-red-600 mb-2" />
                  <span className="text-xs font-semibold text-slate-800">
                    Click to Upload BOQ Image (JPG / PNG)
                  </span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                {boqPhotoPreview && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 h-32">
                    <img src={boqPhotoPreview} alt="Uploaded BOQ document" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase text-red-700">
                  Option B: Select Construction Materials & Quoted Prices
                </p>
                {catalog.map((m) => {
                  const state = selectedItems[m.id] || {
                    selected: true,
                    quantity: m.defaultQty,
                    userQuotedUnitPriceUsd: m.typicalMarketUsd,
                  };
                  return (
                    <div key={m.id} className="p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <label className="flex items-center justify-between text-xs font-bold text-slate-900 cursor-pointer">
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={state.selected}
                            onChange={(e) =>
                              setSelectedItems((prev) => ({
                                ...prev,
                                [m.id]: { ...state, selected: e.target.checked },
                              }))
                            }
                            className="w-4 h-4 accent-red-600"
                          />
                          {m.name}
                        </span>
                      </label>
                      {state.selected && (
                        <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                          <div>
                            <span className="text-slate-500 block mb-1">Qty ({m.unit})</span>
                            <input
                              type="number"
                              min={1}
                              value={state.quantity}
                              onChange={(e) =>
                                setSelectedItems((prev) => ({
                                  ...prev,
                                  [m.id]: { ...state, quantity: Number(e.target.value) || 1 },
                                }))
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono-data"
                            />
                          </div>
                          <div>
                            <span className="text-slate-500 block mb-1">Your Quote ($/{m.unit})</span>
                            <input
                              type="number"
                              step="0.1"
                              value={state.userQuotedUnitPriceUsd}
                              onChange={(e) =>
                                setSelectedItems((prev) => ({
                                  ...prev,
                                  [m.id]: { ...state, userQuotedUnitPriceUsd: Number(e.target.value) || 1 },
                                }))
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono-data"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={runAnalysis}
                disabled={analyzing}
                className="w-full min-h-[48px] rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm cursor-pointer disabled:opacity-60"
              >
                {analyzing ? "Comparing Verified Suppliers..." : "Find Cheapest Suppliers & Savings"}
              </button>
            </div>

            {/* Right: Savings Report Output */}
            <div className="lg:col-span-7 space-y-6">
              {analysisReport && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                      <p className="text-xs text-slate-500">Market Quote Total</p>
                      <p className="text-2xl font-bold font-mono-data text-slate-900 mt-1">
                        ${analysisReport.totalQuotedUsd.toLocaleString()} USD
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50">
                      <p className="text-xs text-emerald-700">Cheapest Direct Total</p>
                      <p className="text-2xl font-bold font-mono-data text-emerald-800 mt-1">
                        ${analysisReport.totalCheapestUsd.toLocaleString()} USD
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl border border-red-200 bg-red-50">
                      <p className="text-xs text-red-700 font-bold">Total Net Savings</p>
                      <p className="text-2xl font-extrabold font-mono-data text-red-600 mt-1 flex items-center gap-1">
                        <TrendingDown className="w-5 h-5" />
                        ${analysisReport.totalSavingsUsd.toLocaleString()} USD
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-950">Verified Cheapest Supplier Directory</h3>
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        {analysisReport.savingsPct}% Cost Reduction
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">{analysisReport.extractedNotes}</p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500">
                            <th className="py-2">Material</th>
                            <th className="py-2">Cheapest Supplier</th>
                            <th className="py-2 text-right">Quoted</th>
                            <th className="py-2 text-right">Best Price</th>
                            <th className="py-2 text-right">Savings</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {analysisReport.lineComparisons.map((line: any) => (
                            <tr key={line.id}>
                              <td className="py-3 font-semibold text-slate-900">
                                {line.materialName}
                                <span className="block text-[11px] font-normal text-slate-500">
                                  {line.quantity} {line.unit}
                                </span>
                              </td>
                              <td className="py-3 text-slate-700">
                                {line.cheapestSupplierName}
                                <span className="block text-[11px] text-slate-400">
                                  {line.supplierLocation}
                                </span>
                              </td>
                              <td className="py-3 text-right font-mono-data text-slate-600">
                                ${line.quotedTotalUsd.toLocaleString()}
                              </td>
                              <td className="py-3 text-right font-mono-data font-bold text-emerald-700">
                                ${line.cheapestTotalUsd.toLocaleString()}
                              </td>
                              <td className="py-3 text-right font-mono-data font-bold text-red-600">
                                -${line.savingsUsd.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <FeatureSlidesAndBenefits
        sectionTitle="Oskayi House Cost Killer"
        slides={COST_KILLER_SLIDES}
        benefits={COST_KILLER_BENEFITS}
        theme="red-light"
      />

      <PaystackUsdModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        appName="Oskayi House Cost Killer"
        productTitle="Verified Cheapest Suppliers & Savings Report (2% Fee)"
        amountUsd={demoPaystackFeeUsd}
        accentClass="bg-red-600 hover:bg-red-700 text-white"
        onSuccess={() => {
          setPaywallOpen(false);
          setUnlocked(true);
        }}
      />
    </div>
  );
};
