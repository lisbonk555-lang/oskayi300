import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  Lock,
  CheckCircle2,
  Download,
  Building2,
  Sun,
  Map,
  Compass,
} from "lucide-react";
import { PaystackUsdModal } from "../common/PaystackUsdModal";
import { FeatureSlidesAndBenefits } from "../common/FeatureSlidesAndBenefits";
import { downloadSmartCityPdf } from "../../utils/pdfGenerator";
import type { SmartCityPlanResult } from "../../server/oskayiSuiteService";

const SMART_CITY_SLIDES = [
  {
    slideNumber: "01",
    headline: "Autonomous Drone Corridor & Zoning Engine",
    subheadline:
      "Transform raw acreage into government-ready municipal layouts complete with paved highways, storm drainage, schools, hospitals, and clean solar microgrids.",
    metricLabel: "Standard Road & Drain Ratio",
    metricValue: "18% Civic",
    highlights: [
      "Conforms to Town & Country setback codes",
      "Integrated concrete storm-drainage routing",
      "6.5 serviced plots calculated per net acre",
      "Clean 24/7 solar microgrid load balancing",
    ],
  },
  {
    slideNumber: "02",
    headline: "One-Slider Land Parcel Subdivision",
    subheadline:
      "Simply slide from 5 to 500 acres. Our urban civil engineering calculator sizes every residential plot, commercial market plaza, and emergency clinic instantly.",
    metricLabel: "Scale Capacity",
    metricValue: "5 – 500 Acres",
    highlights: [
      "Automatic residential vs commercial zoning",
      "Primary STEM schools and regional hospitals",
      "Municipal market & transit hub placement",
      "Instant civil infrastructure cost budget (USD)",
    ],
  },
  {
    slideNumber: "03",
    headline: "Government Approval Master Plan PDF",
    subheadline:
      "Export a signed engineering land-use dossier structured for Regional Coordinating Councils, Lands Commission filings, and international infrastructure lenders.",
    metricLabel: "Approval Readiness",
    metricValue: "Instant PDF",
    highlights: [
      "Complete square-meter & acreage breakdown",
      "Statutory drainage & solar grid specifications",
      "Clean government blue-and-white blueprint style",
      "Includes Oskayi Consult corporate registration",
    ],
  },
];

const SMART_CITY_BENEFITS = [
  {
    stat: "90% Faster",
    title: "Master Plan Drafting",
    description:
      "Generate comprehensive subdivision layouts and road-drainage ratios in minutes instead of waiting 4 months for manual survey revisions.",
  },
  {
    stat: "0% Flooding",
    title: "Engineered Drainage Corridors",
    description:
      "Every road network automatically reserves perimeter storm-drainage channels protecting plot values year-round.",
  },
  {
    stat: "Gov Ready",
    title: "Permitting & Lender Dossier",
    description:
      "Download a clear Master Plan PDF with zoning percentages, school/hospital ratios, and civil cost estimates in USD.",
  },
];

interface SmartCityDroneCanvasProps {
  litStage: number; // 0: Roads, 1: Schools, 2: Hospitals, 3: Solar, 4: All illuminated
  landAcres: number;
}

const SmartCityDroneCanvas: React.FC<SmartCityDroneCanvasProps> = ({ litStage, landAcres }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId = 0;

    try {
      const width = container.clientWidth || 640;
      const height = container.clientHeight || 380;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0b1e3d);
      scene.fog = new THREE.FogExp2(0x0b1e3d, 0.024);

      const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 150);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      renderer.domElement.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        setWebglFailed(true);
      });

      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xdbeafe, 0.65));
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.15);
      dirLight.position.set(14, 22, 16);
      scene.add(dirLight);

      // Ground Base
      const ground = new THREE.Mesh(
        new THREE.BoxGeometry(22, 0.3, 22),
        new THREE.MeshStandardMaterial({ color: 0x0f294f, roughness: 0.85 })
      );
      ground.position.y = -0.15;
      scene.add(ground);

      // Illuminated Roads Grid
      const roadMat = new THREE.MeshStandardMaterial({
        color: litStage >= 0 ? 0x60a5fa : 0x1e3a8a,
        emissive: litStage >= 0 ? 0x1d4ed8 : 0x000000,
        emissiveIntensity: 0.65,
      });
      [-6, -2, 2, 6].forEach((pos) => {
        const hRoad = new THREE.Mesh(new THREE.BoxGeometry(20, 0.06, 0.45), roadMat);
        hRoad.position.set(0, 0.03, pos);
        scene.add(hRoad);
        const vRoad = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 20), roadMat);
        vRoad.position.set(pos, 0.03, 0);
        scene.add(vRoad);
      });

      // Residential Towers
      const towerCount = Math.min(28, 12 + Math.floor(landAcres / 30));
      for (let i = 0; i < towerCount; i++) {
        const gx = ((i % 4) - 1.5) * 4;
        const gz = (Math.floor(i / 4) - 2) * 3.5;
        const h = 1.2 + ((i * 7) % 5) * 0.65;
        const mat = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          emissive: i % 3 === 0 ? 0x3b82f6 : 0x000000,
          emissiveIntensity: 0.25,
        });
        const b = new THREE.Mesh(new THREE.BoxGeometry(1.4, h, 1.4), mat);
        b.position.set(gx, h / 2, gz);
        scene.add(b);
      }

      // Civic School Campus (Lights up at stage >= 1)
      const schoolMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: litStage >= 1 ? 0x38bdf8 : 0x000000,
        emissiveIntensity: litStage >= 1 ? 0.85 : 0.1,
      });
      const school = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 2.2), schoolMat);
      school.position.set(-4.2, 0.7, 4.2);
      scene.add(school);

      // Regional Hospital (Lights up at stage >= 2)
      const hospMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        emissive: litStage >= 2 ? 0xf43f5e : 0x000000,
        emissiveIntensity: litStage >= 2 ? 0.75 : 0.1,
      });
      const hospital = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.4, 2.6), hospMat);
      hospital.position.set(4.2, 1.2, 4.2);
      scene.add(hospital);

      // Solar Microgrid Farm (Lights up at stage >= 3)
      const solarMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: litStage >= 3 ? 0xfacc15 : 0x000000,
        emissiveIntensity: litStage >= 3 ? 0.7 : 0.05,
        metalness: 0.8,
        roughness: 0.2,
      });
      for (let s = 0; s < 4; s++) {
        const panel = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 1.0), solarMat);
        panel.position.set(-4 + s * 2.5, 0.2, -7.8);
        panel.rotation.x = 0.25;
        scene.add(panel);
      }

      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.005;
        camera.position.x = Math.cos(t) * 16;
        camera.position.z = Math.sin(t) * 16;
        camera.position.y = 9.5 + Math.sin(t * 2) * 1.6;
        camera.lookAt(0, 0.6, 0);
        renderer?.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 640;
        const h = container.clientHeight || 380;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
        renderer?.dispose();
      };
    } catch {
      setWebglFailed(true);
    }
  }, [litStage, landAcres]);

  if (webglFailed) {
    return (
      <div className="w-full h-full bg-[#0B1E3D] flex flex-col items-center justify-center text-white p-6 text-center">
        <Building2 className="w-10 h-10 text-sky-400 mb-2" />
        <p className="font-bold">Smart City Municipal Zoning Grid</p>
        <p className="text-xs text-sky-200 mt-1">Roads, Schools, Hospitals & Solar Microgrid Active</p>
      </div>
    );
  }

  return <div ref={mountRef} className="w-full h-full" />;
};

const DRONE_ZONES = [
  { name: "Highway & Storm Drainage Grid", detail: "18% right-of-way corridor active" },
  { name: "Civic STEM School Campus", detail: "Dedicated 4.5-acre learning cluster" },
  { name: "Municipal Medical & Trauma Center", detail: "Central 120-bed healthcare hub" },
  { name: "Clean Solar Microgrid Array", detail: "4.25 MW grid independence active" },
];

export const SmartCityPlannerApp: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [litStage, setLitStage] = useState(0);

  // Real After Payment
  const [landAcres, setLandAcres] = useState(65);
  const [masterPlan, setMasterPlan] = useState<SmartCityPlanResult | null>(null);
  const [generating, setGenerating] = useState(false);

  // Demo Auto-Play: Drone flyover lights up blocks automatically every 3.5s (NO INPUT)
  useEffect(() => {
    if (unlocked) return;
    const timer = setInterval(() => {
      setLitStage((prev) => (prev + 1) % DRONE_ZONES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [unlocked]);

  const generateMasterPlan = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/smart-city/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ landAcres }),
      });
      const data = await res.json();
      if (data.success && data.plan) {
        setMasterPlan(data.plan);
      }
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (unlocked && !masterPlan) {
      generateMasterPlan();
    }
  }, [unlocked]);

  return (
    <div className="min-h-screen bg-[#EFF6FF] text-slate-950">
      {!unlocked ? (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 3D Drone Flyover Viewport (NO INPUT IN DEMO) */}
            <div className="lg:col-span-7 bg-[#0B1E3D] border border-blue-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg">
              <div className="relative h-[340px] sm:h-[430px] w-full">
                <SmartCityDroneCanvas litStage={litStage} landAcres={120} />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1.5 rounded-lg bg-blue-950/90 border border-blue-400/40 text-xs font-semibold text-sky-200">
                    Autonomous Drone Flyover
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white text-blue-950 text-xs font-extrabold">
                    50 Acres Demo Parcel
                  </span>
                </div>

                {/* Live Block Lighting Indicators */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pointer-events-none">
                  {DRONE_ZONES.map((z, idx) => (
                    <div
                      key={z.name}
                      className={`p-2.5 rounded-xl border text-[11px] transition-all ${
                        idx === litStage
                          ? "bg-blue-600 border-sky-300 text-white shadow-lg"
                          : "bg-blue-950/80 border-blue-800 text-sky-200/80"
                      }`}
                    >
                      <p className="font-bold truncate">{z.name}</p>
                      <p className="text-[10px] opacity-85 truncate">{z.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-white border-t border-blue-200 grid grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Roads</span>
                  <span className="font-mono-data font-bold text-blue-900 text-base">4.4 km</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Schools</span>
                  <span className="font-mono-data font-bold text-blue-900 text-base">2 Campuses</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Hospital</span>
                  <span className="font-mono-data font-bold text-blue-900 text-base">1 Regional</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Solar Grid</span>
                  <span className="font-mono-data font-bold text-blue-900 text-base">4.25 MW</span>
                </div>
              </div>
            </div>

            {/* Right Municipal Paywall Panel */}
            <div className="lg:col-span-5 bg-white border border-blue-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div className="space-y-5">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Smart City Planner · Government Civil Suite
                </p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight text-balance">
                  Master Plan Your Land For Municipal Approval
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Watch the autonomous aerial drone map light up roads, schools, hospitals, and solar arrays automatically. Unlock to input your exact parcel acreage and download an official Master Plan PDF.
                </p>

                <div className="space-y-3 pt-4 border-t border-blue-100 text-sm text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Interactive land acreage slider (5 to 1,000 acres)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Engineered roads, storm drainage, plots, school & market</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Download Master Plan PDF structured for government filing</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => setPaywallOpen(true)}
                  className="w-full min-h-[54px] px-6 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-700/20 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Get Master Plan For YOUR Land - $500 via Paystack USD</span>
                </button>
                <p className="text-xs text-center text-slate-500">
                  Municipal & Estate Developer License · USD Only
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* REAL AFTER PAYMENT SMART CITY WORKSPACE */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-[#0B1E3D] text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                Smart City Master Plan Generator — Government Edition
              </h1>
              <p className="text-xs text-sky-200 mt-1">
                Slide your parcel acreage to compute statutory zoning, roads, storm drainage, schools, markets, and solar arrays.
              </p>
            </div>
            {masterPlan && (
              <button
                type="button"
                onClick={() => downloadSmartCityPdf(masterPlan)}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white text-blue-950 hover:bg-blue-50 font-extrabold text-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download Master Plan PDF</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Slider Panel */}
            <div className="lg:col-span-4 bg-white border border-blue-200 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-700" />
                <span>Land Parcel Configuration</span>
              </h2>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-600">Total Land Size (Acres)</span>
                  <span className="font-mono-data text-blue-700 font-bold">{landAcres} Acres</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={landAcres}
                  onChange={(e) => setLandAcres(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-slate-500 mt-1 font-mono-data">
                  Equivalent: {(landAcres * 4046.86).toLocaleString(undefined, { maximumFractionDigits: 0 })} sq.m
                </p>
              </div>

              <button
                type="button"
                onClick={generateMasterPlan}
                disabled={generating}
                className="w-full min-h-[48px] rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm cursor-pointer disabled:opacity-60"
              >
                {generating ? "Recomputing Civil Grid..." : "Compute Municipal Master Plan"}
              </button>

              <div className="h-52 rounded-xl overflow-hidden border border-blue-200">
                <SmartCityDroneCanvas litStage={4} landAcres={landAcres} />
              </div>
            </div>

            {/* Zoning & Approval Schedule */}
            <div className="lg:col-span-8 space-y-6">
              {masterPlan && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white border border-blue-200 rounded-2xl p-4">
                      <p className="text-xs text-slate-500">Serviced Plots</p>
                      <p className="text-2xl font-extrabold font-mono-data text-blue-900 mt-1">
                        {masterPlan.residentialPlotsCount}
                      </p>
                    </div>
                    <div className="bg-white border border-blue-200 rounded-2xl p-4">
                      <p className="text-xs text-slate-500">Paved Roads</p>
                      <p className="text-2xl font-extrabold font-mono-data text-blue-900 mt-1">
                        {masterPlan.roadNetworkKm} km
                      </p>
                    </div>
                    <div className="bg-white border border-blue-200 rounded-2xl p-4">
                      <p className="text-xs text-slate-500">Storm Drainage</p>
                      <p className="text-2xl font-extrabold font-mono-data text-blue-900 mt-1">
                        {masterPlan.drainageChannelsKm} km
                      </p>
                    </div>
                    <div className="bg-white border border-blue-200 rounded-2xl p-4">
                      <p className="text-xs text-slate-500">Solar Microgrid</p>
                      <p className="text-2xl font-extrabold font-mono-data text-blue-900 mt-1">
                        {masterPlan.solarGridMw} MW
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-blue-200 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                      <h3 className="font-bold text-slate-950 flex items-center gap-2">
                        <Map className="w-4 h-4 text-blue-700" />
                        <span>Town & Country Zoning Schedule ({masterPlan.id})</span>
                      </h3>
                      <span className="font-mono-data text-xs font-bold text-blue-700">
                        Civil Budget: ${masterPlan.estimatedInfraCostUsd.toLocaleString()} USD
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {masterPlan.approvalReadinessSummary}
                    </p>

                    <div className="space-y-3">
                      {masterPlan.zoningBlocks.map((b) => (
                        <div key={b.zone} className="p-4 rounded-xl bg-[#F5F9FF] border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <p className="font-bold text-sm text-slate-900">{b.zone}</p>
                            <p className="text-xs text-slate-600">{b.details}</p>
                          </div>
                          <div className="text-right font-mono-data">
                            <span className="text-sm font-extrabold text-blue-800">{b.allocationPct}%</span>
                            <span className="block text-xs text-slate-500">{b.acres} Acres</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <FeatureSlidesAndBenefits
        sectionTitle="Smart City Planner"
        slides={SMART_CITY_SLIDES}
        benefits={SMART_CITY_BENEFITS}
        theme="blue-gov"
      />

      <PaystackUsdModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        appName="Smart City Planner"
        productTitle="Custom Land Zoning, Civic Infrastructure & Government Master Plan PDF"
        amountUsd={500}
        accentClass="bg-blue-700 hover:bg-blue-800 text-white"
        onSuccess={() => {
          setPaywallOpen(false);
          setUnlocked(true);
        }}
      />
    </div>
  );
};
