import React, { useState } from "react";
import { Home, AlertTriangle, Sparkles, Building2, Video } from "lucide-react";
import { OskayiHouseGeneratedApp } from "./components/apps/OskayiHouseGeneratedApp";
import { OskayiCostKillerApp } from "./components/apps/OskayiCostKillerApp";
import { OskayiRenovationApp } from "./components/apps/OskayiRenovationApp";
import { SmartCityPlannerApp } from "./components/apps/SmartCityPlannerApp";
import { AiInfluencerCloneApp } from "./components/apps/AiInfluencerCloneApp";
import { CorporateKycFooter } from "./components/common/CorporateKycFooter";

export type AppKey =
  | "house-generated"
  | "cost-killer"
  | "renovation"
  | "smart-city"
  | "ai-influencer";

const APPS: {
  id: AppKey;
  navLabel: string;
  fullTitle: string;
  priceTag: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "house-generated",
    navLabel: "House Plans",
    fullTitle: "Oskayi House Generated",
    priceTag: "$35 USD",
    icon: Home,
  },
  {
    id: "cost-killer",
    navLabel: "Cost Killer",
    fullTitle: "Oskayi House Cost Killer",
    priceTag: "2% Savings",
    icon: AlertTriangle,
  },
  {
    id: "renovation",
    navLabel: "Renovation AI",
    fullTitle: "Oskayi Before & After Renovation",
    priceTag: "$15 USD",
    icon: Sparkles,
  },
  {
    id: "smart-city",
    navLabel: "Smart City",
    fullTitle: "Smart City Planner",
    priceTag: "$500 USD",
    icon: Building2,
  },
  {
    id: "ai-influencer",
    navLabel: "AI Influencer",
    fullTitle: "AI Influencer Clone",
    priceTag: "$30/mo USD",
    icon: Video,
  },
];

export default function App() {
  const [activeApp, setActiveApp] = useState<AppKey>("house-generated");

  const isDarkTheme = activeApp === "renovation" || activeApp === "ai-influencer";

  const headerThemeClass = {
    "house-generated": "bg-[#FFFBF0]/95 border-[#E5DEC9] text-slate-950",
    "cost-killer": "bg-white/95 border-red-200 text-slate-950",
    renovation: "bg-[#08090C]/95 border-amber-500/30 text-white",
    "smart-city": "bg-[#0B1E3D]/95 border-blue-800 text-white",
    "ai-influencer": "bg-[#09050A]/95 border-pink-500/30 text-white",
  }[activeApp];

  const activeLinkUnderlineClass = {
    "house-generated": "text-[#9A7414] border-b-2 border-[#C59B27]",
    "cost-killer": "text-red-600 border-b-2 border-red-600",
    renovation: "text-amber-400 border-b-2 border-amber-400",
    "smart-city": "text-sky-300 border-b-2 border-sky-400",
    "ai-influencer": "text-pink-400 border-b-2 border-pink-500",
  }[activeApp];

  const idleLinkClass =
    isDarkTheme || activeApp === "smart-city"
      ? "text-slate-300 hover:text-white"
      : "text-slate-600 hover:text-slate-950";

  const primaryActionClass = {
    "house-generated": "bg-[#C59B27] text-white hover:bg-[#B0871D]",
    "cost-killer": "bg-red-600 text-white hover:bg-red-700",
    renovation: "bg-amber-400 text-black hover:bg-amber-500",
    "smart-city": "bg-white text-[#0B1E3D] hover:bg-blue-50",
    "ai-influencer": "bg-pink-600 text-white hover:bg-pink-700",
  }[activeApp];

  const scrollToKyc = () => {
    const el = document.getElementById("oskayi-kyc-footer");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Three-Zone Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 h-14 border-b backdrop-blur-md transition-colors ${headerThemeClass}`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveApp("house-generated")}
            className="text-lg font-extrabold tracking-tight whitespace-nowrap shrink-0 cursor-pointer"
          >
            OSKAYI
          </button>

          {/* Zone 2: 5 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            {APPS.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => setActiveApp(app.id)}
                className={`py-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeApp === app.id ? activeLinkUnderlineClass : idleLinkClass
                }`}
              >
                {app.navLabel}
              </button>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={scrollToKyc}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition ${primaryActionClass}`}
            >
              Company KYC
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeApp === "house-generated" && <OskayiHouseGeneratedApp />}
        {activeApp === "cost-killer" && <OskayiCostKillerApp />}
        {activeApp === "renovation" && <OskayiRenovationApp />}
        {activeApp === "smart-city" && <SmartCityPlannerApp />}
        {activeApp === "ai-influencer" && <AiInfluencerCloneApp />}
      </main>

      {/* Mobile Bottom Thumb-Zone Navigation (5 Apps) */}
      <nav
        aria-label="Mobile App Switcher"
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t backdrop-blur-md grid grid-cols-5 items-center ${
          isDarkTheme
            ? "bg-black/95 border-zinc-800 text-zinc-300"
            : "bg-white/95 border-slate-200 text-slate-700"
        }`}
      >
        {APPS.map((app) => {
          const Icon = app.icon;
          const isActive = activeApp === app.id;
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => setActiveApp(app.id)}
              className={`h-full flex flex-col items-center justify-center gap-1 text-[10px] font-semibold cursor-pointer ${
                isActive
                  ? activeApp === "cost-killer"
                    ? "text-red-600"
                    : activeApp === "smart-city"
                    ? "text-blue-700"
                    : activeApp === "ai-influencer"
                    ? "text-pink-500"
                    : "text-[#C59B27]"
                  : ""
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="truncate max-w-[68px]">{app.navLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* Official Statutory KYC Footer at the bottom of every page */}
      <div id="oskayi-kyc-footer">
        <CorporateKycFooter />
      </div>
    </div>
  );
}
