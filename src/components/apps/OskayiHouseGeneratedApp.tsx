import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  Download,
  Lock,
  CheckCircle2,
  Layers,
  FileSpreadsheet,
  DollarSign,
  Home,
  Users,
  Compass,
  SlidersHorizontal,
} from "lucide-react";
import type { GeneratedHousePlan } from "../../server/oskayiSuiteService";
import { PaystackUsdModal } from "../common/PaystackUsdModal";
import { FeatureSlidesAndBenefits } from "../common/FeatureSlidesAndBenefits";
import { downloadHousePlanPdf } from "../../utils/pdfGenerator";

const HOUSE_SLIDES = [
  {
    slideNumber: "01",
    headline: "3D Luxury Residences & Blueprints On Demand",
    subheadline:
      "Select exact bedroom count, land parcel square footage, and USD budget ceiling. Watch your custom villa update immediately in 3D and 2D CAD floor plans.",
    metricLabel: "Architect Delay Saved",
    metricValue: "45 Days",
    highlights: [
      "Real-time WebGL 3D architectural rotation",
      "Cross-ventilated West African luxury layouts",
      "Automatic single-level vs duplex switching",
      "Instant room dimension schedule",
    ],
  },
  {
    slideNumber: "02",
    headline: "Precision Bill of Quantities (BOQ) & Cement Counts",
    subheadline:
      "Eliminate guesswork before buying blocks or iron rods. Every generated plan computes substructure, reinforcement steel, roofing, MEP, and finishes in USD.",
    metricLabel: "Cost Accuracy",
    metricValue: "±4% BOQ",
    highlights: [
      "Exact bag count for Portland 42.5R cement",
      "High-yield iron rod tonnage calculations",
      "Solar inverter readiness built into MEP cost",
      "Transparent labor and material estimates",
    ],
  },
  {
    slideNumber: "03",
    headline: "Unified Dashboard: My Plans, BOQ, Cost & PDF",
    subheadline:
      "Keep all your residential concepts saved in your project hub and export clean PDF dossiers ready for builders and mortgage lenders.",
    metricLabel: "One-Time Unlock",
    metricValue: "$35 USD",
    highlights: [
      "Unlimited slider regenerations after unlock",
      "One-click architectural PDF dossier export",
      "Mobile-first controls for site inspections",
      "Backed by Oskayi Consult engineering standards",
    ],
  },
];

const HOUSE_BENEFITS = [
  {
    stat: "$1,800+",
    title: "Save on Draftsman Retainers",
    description:
      "Get preliminary 3D massing, room layout blueprints, and itemized BOQs without waiting weeks or paying $2,000 upfront design fees.",
  },
  {
    stat: "Instant",
    title: "Real-Time Budget Alignment",
    description:
      "Prevent starting an unfinishable shell by matching exact bedroom count and footprint directly against your USD construction budget.",
  },
  {
    stat: "PDF + 3D",
    title: "Site-Ready Construction Dossier",
    description:
      "Take your exported PDF and itemized BOQ straight to hardware yards, quantity surveyors, and construction loan officers.",
  },
];

const DEMO_HOUSES = [
  {
    id: "2bed",
    name: "2 Bedroom Pavilion",
    rooms: 2,
    sizeSqft: 1450,
    priceUsd: 42000,
    floors: 1,
    wingScale: 0.85,
    style: "Modern Gold & Travertine Villa",
  },
  {
    id: "3bed",
    name: "3 Bedroom Signature",
    rooms: 3,
    sizeSqft: 2150,
    priceUsd: 68500,
    floors: 1,
    wingScale: 1.05,
    style: "Contemporary Courtyard Residence",
  },
  {
    id: "4bed",
    name: "4 Bedroom Executive",
    rooms: 4,
    sizeSqft: 2950,
    priceUsd: 96000,
    floors: 1,
    wingScale: 1.28,
    style: "Cantilevered Limestone Estate",
  },
  {
    id: "duplex",
    name: "Contemporary Grand Duplex",
    rooms: 5,
    sizeSqft: 4200,
    priceUsd: 148000,
    floors: 2,
    wingScale: 1.22,
    style: "Two-Story Penthouse Villa",
  },
];

interface ThreeHouseViewportProps {
  rooms: number;
  floors: number;
  wingScale: number;
  autoRotate?: boolean;
}

const ThreeHouseViewport: React.FC<ThreeHouseViewportProps> = ({
  rooms,
  floors,
  wingScale,
  autoRotate = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId = 0;

    try {
      const width = container.clientWidth || 640;
      const height = container.clientHeight || 360;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xfaf8f3);
      scene.fog = new THREE.FogExp2(0xfaf8f3, 0.018);

      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(11, 7.5, 12);
      camera.lookAt(0, 1.2, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;

      const canvas = renderer.domElement;
      canvas.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        setWebglFailed(true);
      });
      canvas.addEventListener("webglcontextrestored", () => {
        setWebglFailed(false);
      });

      container.innerHTML = "";
      container.appendChild(canvas);

      // Three-Point Studio Lighting
      const ambient = new THREE.AmbientLight(0xfffbeb, 0.75);
      scene.add(ambient);

      const keyLight = new THREE.DirectionalLight(0xfff5d6, 1.45);
      keyLight.position.set(10, 16, 12);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xe2e8f0, 0.6);
      rimLight.position.set(-10, 8, -10);
      scene.add(rimLight);

      // Architectural Base Plinth
      const plinthMat = new THREE.MeshStandardMaterial({ color: 0xe7e2d5, roughness: 0.7 });
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(10 * wingScale, 0.4, 7.5), plinthMat);
      plinth.position.y = -0.2;
      plinth.receiveShadow = true;
      scene.add(plinth);

      // Limestone Walls Material
      const whiteWallMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.35,
        metalness: 0.05,
      });
      const goldTrimMat = new THREE.MeshStandardMaterial({
        color: 0xc59b27,
        roughness: 0.25,
        metalness: 0.85,
      });
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x334155,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.78,
      });
      const roofMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.5,
        metalness: 0.3,
      });

      const houseGroup = new THREE.Group();

      // Main Ground Pavilion
      const mainWidth = 5.4 * wingScale;
      const mainBody = new THREE.Mesh(new THREE.BoxGeometry(mainWidth, 2.2, 4.2), whiteWallMat);
      mainBody.position.set(-0.6, 1.1, 0);
      mainBody.castShadow = true;
      houseGroup.add(mainBody);

      // Gold Canopy Fascia Band
      const fascia1 = new THREE.Mesh(new THREE.BoxGeometry(mainWidth + 0.5, 0.18, 4.6), goldTrimMat);
      fascia1.position.set(-0.6, 2.25, 0);
      houseGroup.add(fascia1);

      // Panoramic Glass Front Wall
      const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(mainWidth * 0.65, 1.55, 0.15), glassMat);
      frontGlass.position.set(-0.6, 1.05, 2.12);
      houseGroup.add(frontGlass);

      // Bedroom Wing Extension (scales with rooms)
      const wingWidth = Math.min(4.2, 1.6 + rooms * 0.45);
      const sideWing = new THREE.Mesh(new THREE.BoxGeometry(wingWidth, 2.0, 3.2), whiteWallMat);
      sideWing.position.set(mainWidth * 0.45 + 0.6, 1.0, -0.4);
      sideWing.castShadow = true;
      houseGroup.add(sideWing);

      const wingTrim = new THREE.Mesh(new THREE.BoxGeometry(wingWidth + 0.3, 0.15, 3.5), goldTrimMat);
      wingTrim.position.set(mainWidth * 0.45 + 0.6, 2.05, -0.4);
      houseGroup.add(wingTrim);

      // Second Floor for Duplex / 4+ Bedroom Estates
      if (floors >= 2) {
        const upperWidth = mainWidth * 0.85;
        const upperBody = new THREE.Mesh(new THREE.BoxGeometry(upperWidth, 2.1, 3.8), whiteWallMat);
        upperBody.position.set(-0.3, 3.35, -0.15);
        upperBody.castShadow = true;
        houseGroup.add(upperBody);

        const upperGlass = new THREE.Mesh(new THREE.BoxGeometry(upperWidth * 0.72, 1.5, 0.15), glassMat);
        upperGlass.position.set(-0.3, 3.35, 1.78);
        houseGroup.add(upperGlass);

        const balconyGlass = new THREE.Mesh(new THREE.BoxGeometry(upperWidth * 0.8, 0.55, 0.08), glassMat);
        balconyGlass.position.set(-0.3, 2.6, 2.25);
        houseGroup.add(balconyGlass);

        const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(upperWidth + 0.7, 0.22, 4.3), roofMat);
        roofSlab.position.set(-0.3, 4.5, -0.15);
        houseGroup.add(roofSlab);

        const upperGold = new THREE.Mesh(new THREE.BoxGeometry(upperWidth + 0.75, 0.12, 4.35), goldTrimMat);
        upperGold.position.set(-0.3, 4.38, -0.15);
        houseGroup.add(upperGold);
      } else {
        const flatRoof = new THREE.Mesh(new THREE.BoxGeometry(mainWidth + 0.6, 0.2, 4.7), roofMat);
        flatRoof.position.set(-0.6, 2.42, 0);
        houseGroup.add(flatRoof);
      }

      // Courtyard Pool Water Feature
      const poolMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        roughness: 0.1,
        metalness: 0.3,
      });
      const pool = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 1.6), poolMat);
      pool.position.set(1.8, 0.06, 2.6);
      houseGroup.add(pool);

      scene.add(houseGroup);

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 640;
        const h = container.clientHeight || 360;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      let angle = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        if (autoRotate) {
          angle += 0.006;
          houseGroup.rotation.y = Math.sin(angle) * 0.85 + angle * 0.25;
        }
        renderer?.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
        renderer?.dispose();
      };
    } catch {
      setWebglFailed(true);
    }
  }, [rooms, floors, wingScale, autoRotate]);

  if (webglFailed) {
    return (
      <img
        src="/src/assets/images/luxury_duplex_exterior_1794542137950.jpg"
        alt="Luxury gold and white residential architectural villa"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
      />
    );
  }

  return <div ref={mountRef} className="w-full h-full" />;
};

export const OskayiHouseGeneratedApp: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);
  const [watchersCount, setWatchersCount] = useState(2450);

  // Unlocked Sliders & Dashboard Tabs
  const [activeDashboardTab, setActiveDashboardTab] = useState<"STUDIO" | "MY_PLANS" | "BOQ" | "COST" | "PDF">("STUDIO");
  const [rooms, setRooms] = useState(3);
  const [plotSizeSqft, setPlotSizeSqft] = useState(3600);
  const [budgetUsd, setBudgetUsd] = useState(85000);
  const [currentPlan, setCurrentPlan] = useState<GeneratedHousePlan | null>(null);
  const [myPlans, setMyPlans] = useState<GeneratedHousePlan[]>([]);
  const [generating, setGenerating] = useState(false);

  // Auto-play 5s rotation in Demo mode (NO typing, NO inputs)
  useEffect(() => {
    if (unlocked) return;
    const houseTimer = setInterval(() => {
      setDemoIndex((prev) => (prev + 1) % DEMO_HOUSES.length);
    }, 5000);
    const watcherTimer = setInterval(() => {
      setWatchersCount((prev) => {
        const delta = Math.random() > 0.45 ? 1 : -1;
        return Math.max(2442, Math.min(2468, prev + delta));
      });
    }, 2600);
    return () => {
      clearInterval(houseTimer);
      clearInterval(watcherTimer);
    };
  }, [unlocked]);

  const loadMyPlans = async () => {
    try {
      const res = await fetch("/api/house-plans/my-plans");
      if (res.ok) {
        const data = await res.json();
        setMyPlans(data);
        if (!currentPlan && data.length > 0) setCurrentPlan(data[0]);
      }
    } catch {
      // Ignore network hiccup
    }
  };

  useEffect(() => {
    if (unlocked) {
      loadMyPlans();
    }
  }, [unlocked]);

  const handleGenerateCustomPlan = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/house-plans/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rooms, plotSizeSqft, budgetUsd }),
      });
      const data = await res.json();
      if (data.success && data.plan) {
        setCurrentPlan(data.plan);
        setMyPlans((prev) => [data.plan, ...prev]);
      }
    } finally {
      setGenerating(false);
    }
  };

  const activeDemo = DEMO_HOUSES[demoIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF7] via-[#FBF3E2] to-[#FFFDF7] text-slate-900">
      {/* DEMO MODE: GOLD + WHITE LUXURY AUTO-PLAY (NO INPUT FIELDS) */}
      {!unlocked ? (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row items-stretch gap-8">
            {/* Left Showcase: Rotating 3D House */}
            <div className="lg:w-7/12 flex flex-col justify-between bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
              <div className="relative h-[320px] sm:h-[420px] w-full bg-[#FAF8F3]">
                <ThreeHouseViewport
                  rooms={activeDemo.rooms}
                  floors={activeDemo.floors}
                  wingScale={activeDemo.wingScale}
                  autoRotate={true}
                />

                {/* Top Overlay Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-[#E5DEC9] text-xs font-semibold text-slate-800 whitespace-nowrap">
                    3D Model {demoIndex + 1} / {DEMO_HOUSES.length}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-950/90 text-[#F4D06F] text-xs font-mono-data font-semibold flex items-center gap-1.5 whitespace-nowrap">
                    <Users className="w-3.5 h-3.5" />
                    <span>{watchersCount.toLocaleString()} people watching houses</span>
                  </span>
                </div>

                {/* Progress Indicator Strip */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 pointer-events-none">
                  {DEMO_HOUSES.map((h, i) => (
                    <div
                      key={h.id}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i === demoIndex ? "bg-[#C59B27]" : "bg-slate-300/70"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Automatic House Spec Bar */}
              <div className="p-6 bg-white border-t border-[#E5DEC9] grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Estimated Build</p>
                  <p className="text-xl sm:text-2xl font-bold font-mono-data text-[#9A7414] mt-0.5">
                    ${activeDemo.priceUsd.toLocaleString()} USD
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Configuration</p>
                  <p className="text-xl sm:text-2xl font-bold font-mono-data text-slate-900 mt-0.5">
                    {activeDemo.rooms} Rooms
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Floor Area</p>
                  <p className="text-xl sm:text-2xl font-bold font-mono-data text-slate-900 mt-0.5">
                    {activeDemo.sizeSqft.toLocaleString()} sq.ft
                  </p>
                </div>
              </div>
            </div>

            {/* Right Editorial Column + Paystack USD Paywall */}
            <div className="lg:w-5/12 flex flex-col justify-between bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="space-y-5">
                <div className="text-xs font-semibold text-[#9A7414] tracking-wide">
                  Oskayi House Generated · Architectural Suite
                </div>
                <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-slate-950 leading-[1.08] text-balance">
                  Luxury Architectural Plans Ready in Seconds
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Currently previewing: <strong className="text-slate-950">{activeDemo.name}</strong> ({activeDemo.style}). Watch our 3D architectural models rotate automatically every 5 seconds before unlocking your custom studio.
                </p>

                <div className="pt-4 border-t border-[#EAE4D3] space-y-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Interactive sliders for rooms, plot size & USD budget</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Complete 2D floor plan & live orbitable 3D villa model</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Itemized Bill of Quantities (BOQ) & exportable PDF</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => setPaywallOpen(true)}
                  className="w-full min-h-[54px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C59B27] to-[#A67C14] hover:from-[#B58C1F] hover:to-[#916B0E] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#C59B27]/25 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Unlock YOUR House Plan - $35 via Paystack USD</span>
                </button>
                <p className="text-xs text-center text-slate-500">
                  One-time fee in USD · Instant access to My Plans, BOQ, Cost & PDF
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* REAL INTERACTIVE MODE AFTER PAYMENT */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Header + Dashboard Tabs */}
          <div className="bg-white border border-[#E5DEC9] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-950">
                Oskayi House Generated Studio
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Paystack USD Verified · Interactive Architectural & BOQ Workspace
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl overflow-x-auto">
              {[
                { id: "STUDIO", label: "3D & Sliders", icon: SlidersHorizontal },
                { id: "MY_PLANS", label: `My Plans (${myPlans.length})`, icon: Home },
                { id: "BOQ", label: "BOQ", icon: FileSpreadsheet },
                { id: "COST", label: "Cost", icon: DollarSign },
                { id: "PDF", label: "PDF", icon: Download },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveDashboardTab(t.id as any)}
                    className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition ${
                      activeDashboardTab === t.id
                        ? "bg-[#C59B27] text-white shadow-sm"
                        : "text-slate-700 hover:bg-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeDashboardTab === "STUDIO" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Sliders Control Panel */}
              <div className="lg:col-span-4 bg-white border border-[#E5DEC9] rounded-2xl p-6 space-y-6">
                <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C59B27]" />
                  <span>Configure Architectural Parameters</span>
                </h2>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-600">Bedrooms</span>
                    <span className="font-mono-data text-[#9A7414]">{rooms} Bedrooms</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={7}
                    step={1}
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-600">Plot Size (sq.ft)</span>
                    <span className="font-mono-data text-[#9A7414]">{plotSizeSqft.toLocaleString()} sq.ft</span>
                  </div>
                  <input
                    type="range"
                    min={1500}
                    max={12000}
                    step={250}
                    value={plotSizeSqft}
                    onChange={(e) => setPlotSizeSqft(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-600">Target Construction Budget (USD)</span>
                    <span className="font-mono-data text-[#9A7414]">${budgetUsd.toLocaleString()} USD</span>
                  </div>
                  <input
                    type="range"
                    min={35000}
                    max={350000}
                    step={5000}
                    value={budgetUsd}
                    onChange={(e) => setBudgetUsd(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleGenerateCustomPlan}
                  disabled={generating}
                  className="w-full min-h-[48px] rounded-xl bg-[#C59B27] hover:bg-[#B0871D] text-white font-bold text-sm transition cursor-pointer disabled:opacity-60"
                >
                  {generating ? "Generating Floor Plan & BOQ..." : "Generate New Custom House Plan"}
                </button>
              </div>

              {/* Live 3D View + 2D Floor Plan */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white border border-[#E5DEC9] rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-[#E5DEC9] flex items-center justify-between text-xs font-semibold">
                    <span>Live 3D Architectural Preview ({rooms >= 4 || budgetUsd >= 110000 ? "2-Story Duplex" : "Single-Level Villa"})</span>
                    <span className="font-mono-data text-[#9A7414]">Est. Build: ${(currentPlan?.estimatedCostUsd || budgetUsd).toLocaleString()} USD</span>
                  </div>
                  <div className="h-[320px] w-full bg-[#FAF8F3]">
                    <ThreeHouseViewport
                      rooms={rooms}
                      floors={rooms >= 4 || budgetUsd >= 110000 ? 2 : 1}
                      wingScale={0.85 + rooms * 0.08}
                      autoRotate={true}
                    />
                  </div>
                </div>

                {/* 2D Floor Plan Blueprint */}
                {currentPlan && (
                  <div className="bg-white border border-[#E5DEC9] rounded-2xl p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-950">2D Floor Plan Layout — {currentPlan.title}</h3>
                        <p className="text-xs text-slate-500">
                          Built Area: {currentPlan.builtAreaSqft.toLocaleString()} sq.ft · Plot: {currentPlan.plotSizeSqft.toLocaleString()} sq.ft
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => downloadHousePlanPdf(currentPlan)}
                        className="min-h-[40px] px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5 text-[#F4D06F]" />
                        <span>Download PDF</span>
                      </button>
                    </div>

                    <div className="bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl p-4">
                      <svg viewBox="0 0 100 100" className="w-full h-64">
                        <rect x="2" y="2" width="96" height="96" fill="#FFFFFF" stroke="#C59B27" strokeWidth="1.2" />
                        {currentPlan.roomLayout.map((r, idx) => (
                          <g key={idx}>
                            <rect
                              x={r.x}
                              y={r.y}
                              width={r.w}
                              height={r.h}
                              fill={idx % 2 === 0 ? "#FBF7EC" : "#F8FAFC"}
                              stroke="#94A3B8"
                              strokeWidth="0.6"
                            />
                            <text
                              x={r.x + r.w / 2}
                              y={r.y + r.h / 2 - 1}
                              textAnchor="middle"
                              fontSize="3.1"
                              fontWeight="bold"
                              fill="#0F172A"
                            >
                              {r.name}
                            </text>
                            <text
                              x={r.x + r.w / 2}
                              y={r.y + r.h / 2 + 4}
                              textAnchor="middle"
                              fontSize="2.5"
                              fill="#64748B"
                            >
                              {r.dimensionsFt}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeDashboardTab === "MY_PLANS" && (
            <div className="bg-white border border-[#E5DEC9] rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-950">My Saved House Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myPlans.map((p) => (
                  <div
                    key={p.id}
                    className={`p-5 rounded-xl border transition ${
                      currentPlan?.id === p.id ? "border-[#C59B27] bg-[#FBF7EC]" : "border-slate-200 bg-white"
                    }`}
                  >
                    <p className="text-xs font-mono-data text-[#9A7414]">{p.id}</p>
                    <h3 className="font-bold text-slate-950 mt-1">{p.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      {p.rooms} Rooms · {p.builtAreaSqft.toLocaleString()} sq.ft
                    </p>
                    <p className="text-lg font-bold font-mono-data text-slate-950 mt-3">
                      ${p.estimatedCostUsd.toLocaleString()} USD
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentPlan(p);
                          setActiveDashboardTab("BOQ");
                        }}
                        className="flex-1 min-h-[38px] rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                      >
                        Inspect BOQ
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadHousePlanPdf(p)}
                        className="flex-1 min-h-[38px] rounded-lg bg-[#C59B27] text-white text-xs font-semibold hover:bg-[#B0871D] cursor-pointer"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeDashboardTab === "BOQ" || activeDashboardTab === "COST" || activeDashboardTab === "PDF") && currentPlan && (
            <div className="bg-white border border-[#E5DEC9] rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DEC9] pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    {activeDashboardTab === "BOQ"
                      ? `Bill of Quantities (BOQ) — ${currentPlan.title}`
                      : activeDashboardTab === "COST"
                      ? `Cost Breakdown (USD) — ${currentPlan.title}`
                      : `Architectural PDF Export — ${currentPlan.title}`}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{currentPlan.architecturalNotes}</p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadHousePlanPdf(currentPlan)}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#B0871D] text-white text-xs font-bold flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Architectural PDF</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2.5">Category</th>
                      <th className="py-2.5">Work Description & Materials</th>
                      <th className="py-2.5 text-right">Quantity</th>
                      <th className="py-2.5 text-right">Total (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentPlan.boq.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F3]">
                        <td className="py-3 font-semibold text-[#9A7414]">{row.category}</td>
                        <td className="py-3 text-slate-800">{row.item}</td>
                        <td className="py-3 text-right font-mono-data text-slate-600">{row.quantity}</td>
                        <td className="py-3 text-right font-mono-data font-bold text-slate-950">
                          ${row.totalUsd.toLocaleString()} USD
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[#C59B27]/40 font-bold text-sm">
                      <td colSpan={3} className="py-3 text-right text-slate-900">
                        Total Estimated Construction Cost:
                      </td>
                      <td className="py-3 text-right font-mono-data text-[#9A7414]">
                        ${currentPlan.estimatedCostUsd.toLocaleString()} USD
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      <FeatureSlidesAndBenefits
        sectionTitle="Oskayi House Generated"
        slides={HOUSE_SLIDES}
        benefits={HOUSE_BENEFITS}
        theme="gold-light"
      />

      <PaystackUsdModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        appName="Oskayi House Generated"
        productTitle="Custom Architectural Plan, 3D View, BOQ & PDF"
        amountUsd={35}
        accentClass="bg-[#C59B27] hover:bg-[#B0871D] text-white"
        onSuccess={() => {
          setPaywallOpen(false);
          setUnlocked(true);
        }}
      />
    </div>
  );
};
