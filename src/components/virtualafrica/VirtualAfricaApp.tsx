import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, ShieldCheck, DollarSign, Globe, Award, 
  MapPin, Landmark, Sparkles, AlertTriangle, FileText, CheckCircle2, 
  ShoppingBag, Video, Users, ArrowUpRight, Lock, Eye, ChevronRight, Zap
} from 'lucide-react';

interface ContinentStats {
  app_name: string;
  sub_title: string;
  tagline: string;
  currency: {
    symbol: string;
    name: string;
    total_supply: number;
    circulating_supply: number;
    price_usd: number;
    reserve_fund_usd: number;
    annual_staking_yield_pct: number;
    central_bank_savings_rate_pct: number;
    tx_burn_rate_pct: number;
    max_weekly_sell_cap_pct: number;
  };
  citizens_count: number;
  land_sold_plots: number;
  total_land_plots: number;
  countries_represented: number;
  ministries_count: number;
  paystack_pricing_usd: Record<string, any>;
}

interface LandPlot {
  id: string;
  plot_number: string;
  country: string;
  region: string;
  zone_type: string;
  coordinates: string;
  price_usd: number;
  owner_id: string | null;
  owner_name: string | null;
  status: string;
}

interface MinistryItem {
  id: string;
  code: string;
  name: string;
  minister_name: string;
  badge: string;
  description: string;
  active_citizens_served: number;
  service_fee_usd: number;
  key_action_label: string;
}

export const VirtualAfricaApp: React.FC = () => {
  const [stats, setStats] = useState<ContinentStats | null>(null);
  const [ministries, setMinistries] = useState<MinistryItem[]>([]);
  const [landPlots, setLandPlots] = useState<LandPlot[]>([]);
  const [cyberAlerts, setCyberAlerts] = useState<any[]>([]);

  // DEMO MODE VS UNLOCKED INTERACTIVE MODE
  // Rule 1: DEMO = NO TYPING, AUTO-PLAY!
  // Unpaid user only watches auto-panning map, rising charts, ticking numbers, video broadcast.
  // After payment or clicking become citizen, interactive mode unlocks.
  const [hasPaidCitizenship, setHasPaidCitizenship] = useState(false);
  const [demoTimeElapsed, setDemoTimeElapsed] = useState(0);

  // Auto-play cities sequence: Accra -> Lagos -> Nairobi -> Johannesburg -> Cairo -> Dubai
  const demoCities = [
    { name: 'Accra, Ghana', coords: '5.6037° N, 0.1870° W', highlight: 'Black Star Financial Spire • Virtual Presidency HQ', metric: 'GDP: $1.2B RD' },
    { name: 'Lagos, Nigeria', coords: '6.4281° N, 3.4219° E', highlight: 'Eko Atlantic Digital Port • AfCFTA Logistics Hub', metric: 'Trade: $2.8B RD' },
    { name: 'Nairobi, Kenya', coords: '1.2921° S, 36.8219° E', highlight: 'Silicon Savannah AI Datacenter • Solar Grid Node', metric: 'Tech: 420 Startups' },
    { name: 'Johannesburg, South Africa', coords: '26.2041° S, 28.0473° E', highlight: 'Sandton Gold Reserve Vault • High Court of Africa', metric: 'Reserve: $7.2M USD' },
    { name: 'Cairo, Egypt', coords: '30.0444° N, 31.2357° E', highlight: 'New Nile Innovation Axis • Quantum Computing Lab', metric: 'AI Nodes: 1,024' },
    { name: 'Dubai, UAE (Diaspora Gateway)', coords: '25.2048° N, 55.2708° E', highlight: 'Virtual Continental Sovereign Embassy • RD Forex Desk', metric: 'Forex: $450M RD/day' }
  ];

  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [liveRdPrice, setLiveRdPrice] = useState(1.00);
  const [liveCitizens, setLiveCitizens] = useState(125400);
  const [liveLandSold, setLiveLandSold] = useState(45000);
  const [liveReserve, setLiveReserve] = useState(7200000);

  // Auto-play video stream channel
  const [currentVideoChannel, setCurrentVideoChannel] = useState<'PRESIDENT' | 'FARM' | 'MARKET'>('PRESIDENT');

  // Interactive dashboard states (after unlock)
  const [activeRoleView, setActiveRoleView] = useState<'CITIZEN' | 'PRESIDENT' | 'MINISTER' | 'BUSINESS' | 'ADMIN'>('CITIZEN');
  const [activeFeatureTab, setActiveFeatureTab] = useState<'MAP' | 'ROYAL_DOLLAR' | 'MINISTRIES' | 'LAND' | 'PASSPORT' | 'CYBER_POLICE' | 'ROYAL_TV'>('MAP');

  // Paystack checkout modal state
  const [showPaystackModal, setShowPaystackModal] = useState(false);
  const [paystackAction, setPaystackAction] = useState<{ item: string; amountUsd: number }>({
    item: 'Virtual Citizenship Credential',
    amountUsd: 10
  });

  // Fetch initial data
  useEffect(() => {
    fetch('/api/virtual-africa/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        if (data.currency) setLiveRdPrice(data.currency.price_usd);
      })
      .catch(console.error);

    fetch('/api/virtual-africa/ministries')
      .then(res => res.json())
      .then(data => setMinistries(data || []))
      .catch(console.error);

    fetch('/api/virtual-africa/land-plots')
      .then(res => res.json())
      .then(data => setLandPlots(data || []))
      .catch(console.error);

    fetch('/api/virtual-africa/cyber-police')
      .then(res => res.json())
      .then(data => setCyberAlerts(data || []))
      .catch(console.error);
  }, []);

  // Demo Auto-Play Loop: No typing, automatic city pan, price rise, ticking counters, video rotation
  useEffect(() => {
    if (hasPaidCitizenship) return;

    const timer = setInterval(() => {
      setDemoTimeElapsed(prev => prev + 1);

      // Rotate city every 5 seconds
      setCurrentCityIndex(prev => (prev + 1) % demoCities.length);

      // Ticking counters
      setLiveCitizens(prev => prev + Math.floor(Math.random() * 3) + 1);
      setLiveLandSold(prev => prev + (Math.random() > 0.6 ? 1 : 0));
      setLiveReserve(prev => prev + (Math.random() > 0.5 ? 25 : 0));

      // Royal dollar climbs gradually: $1.00 -> $1.20 -> $1.50
      setLiveRdPrice(prev => {
        if (prev >= 1.50) return 1.50;
        return parseFloat((prev + 0.01).toFixed(2));
      });
    }, 4000);

    // Rotate video channel every 8 seconds
    const videoTimer = setInterval(() => {
      setCurrentVideoChannel(prev => {
        if (prev === 'PRESIDENT') return 'FARM';
        if (prev === 'FARM') return 'MARKET';
        return 'PRESIDENT';
      });
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(videoTimer);
    };
  }, [hasPaidCitizenship]);

  const handleSimulatePayment = () => {
    // Paystack inline USD simulation
    setHasPaidCitizenship(true);
    setShowPaystackModal(false);
    alert(`Payment of $${paystackAction.amountUsd} USD received via Paystack Inline USD! Virtual Africa Interactive ID VA-GH-784910-GOLD generated.`);
  };

  const handleOpenPaystack = (item: string, amountUsd: number) => {
    setPaystackAction({ item, amountUsd });
    setShowPaystackModal(true);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans pb-24 selection:bg-amber-400 selection:text-black">
      {/* Continental Top Navigation Bar */}
      <div className="bg-[#0A0F1D] border-b border-amber-500/30 px-4 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-sm shadow-md shadow-amber-500/20">
            VA
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-white tracking-wider text-sm">VIRTUAL AFRICA</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                LIVE CONTINENT
              </span>
            </div>
            <div className="text-[10px] text-amber-400/90 hidden sm:block">
              One Continent • One Government • One Currency • One People
            </div>
          </div>
        </div>

        {/* Live Counters & Paystack USD CTA */}
        <div className="flex items-center space-x-3 sm:space-x-6 text-xs">
          <div className="hidden md:flex items-center space-x-4 font-mono text-slate-300">
            <span>Citizens: <strong className="text-white">{liveCitizens.toLocaleString()}</strong></span>
            <span>Land Sold: <strong className="text-amber-400">{liveLandSold.toLocaleString()}</strong></span>
            <span>Reserve: <strong className="text-emerald-400">${(liveReserve / 1000000).toFixed(2)}M USD</strong></span>
            <span>Royal Dollar: <strong className="text-amber-400 font-bold">${liveRdPrice.toFixed(2)} USD</strong></span>
          </div>

          {!hasPaidCitizenship ? (
            <button
              onClick={() => handleOpenPaystack('Virtual African Citizenship', 10)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 hover:from-amber-500 hover:to-emerald-600 text-black font-black text-xs shadow-lg shadow-amber-400/30 animate-pulse flex items-center space-x-1.5"
            >
              <Award className="w-4 h-4" />
              <span>BECOME CITIZEN - $10 USD</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CITIZEN VERIFIED</span>
              </span>
              <button
                onClick={() => setHasPaidCitizenship(false)}
                className="text-[11px] text-slate-400 underline hover:text-white"
              >
                Watch Auto-Demo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================== */}
      {/* RULE 1: DEMO MODE (NO TYPING, AUTO-PLAY LIKE TIKTOK/TV)   */}
      {/* ========================================================== */}
      {!hasPaidCitizenship && (
        <div className="relative">
          {/* Top Banner Notice */}
          <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border-b border-amber-500/30 py-2.5 px-4 text-center text-xs text-amber-300 font-medium flex items-center justify-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span><strong>DEMO AUTO-PLAY ACTIVE:</strong> Sit back and watch the continent auto-pan. No typing required. Click &quot;BECOME CITIZEN&quot; to unlock full interactive voting, land buying, and banking.</span>
          </div>

          {/* Full Screen Auto-Pan Map Container */}
          <div className="relative h-[480px] sm:h-[560px] bg-[#0A0E1A] overflow-hidden border-b border-slate-800">
            {/* Ambient Map Grid & SVG Continent Graphic */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:24px_24px]"></div>

            {/* Simulated 3D Satellite Map Texture */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-[500px] h-[500px] sm:w-[680px] sm:h-[680px] rounded-full border border-amber-500/20 bg-gradient-to-b from-emerald-950/40 via-amber-950/20 to-slate-950/60 shadow-2xl shadow-emerald-500/10 flex items-center justify-center">
                {/* Orbital concentric rings */}
                <div className="w-[380px] h-[380px] rounded-full border border-emerald-500/20 animate-spin" style={{ animationDuration: '60s' }}></div>
                <div className="w-[240px] h-[240px] rounded-full border border-dashed border-amber-400/30 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
                
                {/* Center Continental Emblem */}
                <div className="absolute flex flex-col items-center justify-center text-center p-6">
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 font-mono tracking-tight">
                    AFRICA
                  </div>
                  <div className="text-xs text-amber-300/80 mt-1 uppercase tracking-widest font-semibold">
                    54 Sovereign Virtual States
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Auto-Panning City Node Card */}
            <div className="absolute top-6 left-6 right-6 sm:right-auto sm:max-w-md bg-[#0D1424]/90 backdrop-blur-md border border-amber-500/40 rounded-2xl p-5 shadow-2xl shadow-black z-20 transition-all duration-700">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-amber-400 font-mono">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>AUTOPAN NODE #{currentCityIndex + 1} / {demoCities.length}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                  ACTIVE SCAN
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-2xl font-black text-white">
                  {demoCities[currentCityIndex].name}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  Coordinates: {demoCities[currentCityIndex].coords}
                </div>
                <div className="text-xs text-emerald-300 mt-2 font-medium">
                  {demoCities[currentCityIndex].highlight}
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Regional Telemetry:</span>
                  <span className="text-amber-400 font-bold">{demoCities[currentCityIndex].metric}</span>
                </div>
              </div>
            </div>

            {/* Rising Royal Dollar Price Chart HUD */}
            <div className="absolute bottom-6 left-6 hidden sm:block bg-[#0D1424]/90 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-4 shadow-2xl z-20 font-mono text-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <ArrowUpRight className="w-4 h-4" />
                <span>ROYAL DOLLAR (RD) ALGORITHMIC VALUE</span>
              </div>
              <div className="text-3xl font-black text-amber-400 mt-1">
                ${liveRdPrice.toFixed(2)} USD
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Reserve: ${liveReserve.toLocaleString()} USD | Supply: 5.6M RD
              </div>
              <div className="w-48 bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full animate-pulse" style={{ width: `${(liveRdPrice / 2.0) * 100}%` }}></div>
              </div>
            </div>

            {/* Video Stream Auto-Player HUD (Right Side) */}
            <div className="absolute bottom-6 right-6 w-72 sm:w-80 bg-[#0D1424]/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 shadow-2xl z-20">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <div className="flex items-center space-x-1.5 text-amber-400 font-bold font-mono">
                  <Video className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span>ROYAL CONTINENTAL TV</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">24/7 BROADCAST</span>
              </div>

              {/* Simulated Auto-Play Stream Display */}
              <div className="mt-3 relative h-36 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-end p-3">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                
                {/* Background visual simulated scene */}
                {currentVideoChannel === 'PRESIDENT' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl font-bold text-amber-400">
                        VA
                      </div>
                      <div className="text-[11px] text-slate-300 font-semibold mt-1">State of Continent Address</div>
                    </div>
                  </div>
                )}
                {currentVideoChannel === 'FARM' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-xl">
                        🌾
                      </div>
                      <div className="text-[11px] text-slate-300 font-semibold mt-1">Virtual Harvest Telemetry</div>
                    </div>
                  </div>
                )}
                {currentVideoChannel === 'MARKET' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-slate-900 to-amber-950 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-xl">
                        🚢
                      </div>
                      <div className="text-[11px] text-slate-300 font-semibold mt-1">AfCFTA Digital Cargo Escrow</div>
                    </div>
                  </div>
                )}

                <div className="relative z-20 text-xs">
                  <div className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                    {currentVideoChannel === 'PRESIDENT' ? 'Presidential Telecast' : currentVideoChannel === 'FARM' ? 'Agriculture Sensor Stream' : 'Trade Escrow Clearing'}
                  </div>
                  <div className="text-white font-medium text-xs truncate">
                    {currentVideoChannel === 'PRESIDENT' ? 'Expanding Reserve Fund to $10M USD' : currentVideoChannel === 'FARM' ? 'Satellite Rain Forecaster +14% Crop Yield' : 'Zero-Fee Intra-Continental RD Clearing'}
                  </div>
                </div>
              </div>

              {/* Ticking Time */}
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Auto-Rotating Live Feeds</span>
                <span>Demo Watch: {demoTimeElapsed}s</span>
              </div>
            </div>

            {/* Central Prominent CTA Button after 10s */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 text-center">
              <button
                onClick={() => handleOpenPaystack('Virtual African Citizenship', 10)}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-black font-black text-sm sm:text-base shadow-2xl shadow-amber-500/50 flex items-center space-x-2 transition transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                <span>BECOME VIRTUAL CITIZEN - $10 via Paystack USD</span>
              </button>
              <div className="text-[11px] text-amber-200/90 font-mono mt-1.5 drop-shadow">
                Includes Digital ID Card + 50 RD Welcome Dividend + 0% Forex
              </div>
            </div>
          </div>

          {/* Quick Preview of What Unlocks Upon Citizenship */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase font-mono font-bold text-amber-400 tracking-widest">
                CIVIC SOVEREIGNTY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                The Complete Virtual Continent Architecture
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                All prices strictly in USD ($) via Paystack. Watch the demo above or purchase citizenship to interact with all 16 ministries, buy land plots, and join the continental parliament.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#0E172A] border border-amber-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">🏦</div>
                <div className="font-bold text-white text-sm">Royal Dollar (RD)</div>
                <div className="text-xs text-amber-400 mt-1">Fixed 1B Supply • 8% Staking</div>
              </div>
              <div className="bg-[#0E172A] border border-emerald-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">🏛️</div>
                <div className="font-bold text-white text-sm">16 Ministries</div>
                <div className="text-xs text-emerald-400 mt-1">Health AI, Virtual Court, Grid</div>
              </div>
              <div className="bg-[#0E172A] border border-amber-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">📜</div>
                <div className="font-bold text-white text-sm">Land Registry</div>
                <div className="text-xs text-amber-400 mt-1">100M Plots • $50 USD Each</div>
              </div>
              <div className="bg-[#0E172A] border border-emerald-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">🛂</div>
                <div className="font-bold text-white text-sm">Passport & ID</div>
                <div className="text-xs text-emerald-400 mt-1">Visa-Free 54 Countries</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* UNLOCKED INTERACTIVE MODE (AFTER CITIZENSHIP PAYMENT)      */}
      {/* ========================================================== */}
      {hasPaidCitizenship && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Unlocked Citizen Header Badge */}
          <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border border-amber-500/40 rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20 font-mono">
                ID
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-black text-white">Kwame Mensah</h2>
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-mono font-bold text-[10px]">
                    CITIZEN #VA-GH-784910-GOLD
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Civic Status: Active Citizen • Land: 0 Plots • Reputation: 80/100 • Origin: Ghana
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
                <div className="text-[10px] text-slate-400">Royal Dollar Wallet</div>
                <div className="text-xl font-bold text-amber-400">50.00 RD ($64.00 USD)</div>
              </div>
              <button
                onClick={() => handleOpenPaystack('Buy Royal Dollars', 100)}
                className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                + Buy RD
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex space-x-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-thin">
            {[
              { id: 'MAP', label: '54 States Map', icon: Globe },
              { id: 'ROYAL_DOLLAR', label: 'Royal Dollar & Reserve', icon: DollarSign },
              { id: 'MINISTRIES', label: '16 Ministries', icon: Landmark },
              { id: 'LAND', label: 'Land Registry ($50)', icon: MapPin },
              { id: 'PASSPORT', label: 'ID Card & Passport', icon: Award },
              { id: 'CYBER_POLICE', label: 'Cyber Police', icon: ShieldCheck },
              { id: 'ROYAL_TV', label: 'Royal TV & Social', icon: Video },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeatureTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 ${
                    activeFeatureTab === tab.id
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Tab 1: 54 States Map */}
          {activeFeatureTab === 'MAP' && (
            <div className="mt-6 space-y-6">
              <div className="bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-lg font-bold text-white">54 Virtual Sovereign Territories</h3>
                  <span className="text-xs text-amber-400 font-mono">AfCFTA Digital Territory</span>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs">
                  {['Ghana', 'Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Ethiopia', 'Senegal', 'Rwanda', 'Morocco', 'Uganda', 'Tanzania', 'Cote d\'Ivoire'].map(c => (
                    <div key={c} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center hover:border-amber-400 transition cursor-pointer">
                      <div className="text-sm font-bold text-white">{c}</div>
                      <div className="text-[10px] text-emerald-400 mt-1">Visa-Free Travel</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Gov Node Active</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Royal Dollar (RD) & Central Bank */}
          {activeFeatureTab === 'ROYAL_DOLLAR' && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-[#0E172A] border border-amber-500/30 rounded-2xl p-6">
                <div className="text-xs text-amber-400 font-mono uppercase font-bold tracking-wider">
                  Continental Monetary Authority
                </div>
                <h3 className="text-2xl font-black text-white mt-1">Royal Dollar (RD) Reserve Vault</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fixed supply of 1,000,000,000 RD backed by a transparent audited $7.2M USD reserve fund. 1% transaction burn and 8% annual staking yield.
                </p>

                <div className="grid grid-cols-3 gap-4 mt-6 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Current RD Price</div>
                    <div className="text-xl font-bold text-amber-400 mt-1">${liveRdPrice.toFixed(2)} USD</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Reserve Fund</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">${(liveReserve / 1000000).toFixed(2)}M USD</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Staking APY</div>
                    <div className="text-xl font-bold text-white mt-1">8.0% APY</div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Central Bank 500 RD Micro-Loan</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Available for citizens with 30-day verified civic standing. 5% annual interest.</div>
                  </div>
                  <button
                    onClick={() => alert('Micro-loan application submitted to Central Bank of Virtual Africa.')}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    Apply for 500 RD
                  </button>
                </div>
              </div>

              {/* Buy / Sell Card */}
              <div className="bg-[#0E172A] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h4 className="text-base font-bold text-white">Paystack USD Exchange</h4>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Weekly Sell Cap:</span>
                    <span className="text-white">Max 20% of balance</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Forex Fee:</span>
                    <span className="text-emerald-400">0% (Intra-Continental)</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenPaystack('Buy 100 Royal Dollars', 100)}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition"
                >
                  Buy RD ($100 USD)
                </button>

                <button
                  onClick={() => alert('Sell request queued for Paystack USD payout within 20% weekly liquidity rules.')}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                >
                  Sell RD to USD
                </button>
              </div>
            </div>
          )}

          {/* Sub-Tab 3: 16 Ministries */}
          {activeFeatureTab === 'MINISTRIES' && (
            <div className="mt-6 space-y-4">
              <div className="text-xs text-slate-400">
                16 Autonomous Ministries operating on AI models and citizen councils.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ministries.map(m => (
                  <div key={m.id} className="bg-[#0E172A] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="text-2xl mb-1">{m.badge}</div>
                      <h4 className="font-bold text-white text-sm">{m.name}</h4>
                      <div className="text-[11px] text-amber-400 mt-0.5">Minister: {m.minister_name}</div>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3">{m.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400">${m.service_fee_usd} USD</span>
                      <button
                        onClick={() => handleOpenPaystack(`${m.name} Fee`, m.service_fee_usd)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 font-bold text-xs transition"
                      >
                        {m.key_action_label}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Tab 4: Land Registry */}
          {activeFeatureTab === 'LAND' && (
            <div className="mt-6 space-y-6">
              <div className="bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white">Virtual Land Registry (100,000,000 Plots)</h3>
                    <p className="text-xs text-slate-400 mt-0.5">$50 USD per plot via Paystack. Buyer receives GPS-anchored Title Deed PDF with QR code.</p>
                  </div>
                  <span className="text-xs text-amber-400 font-mono font-bold">45,180 PLOTS SOLD</span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {landPlots.map(plot => (
                    <div key={plot.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-amber-400 font-bold">{plot.plot_number}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          plot.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {plot.status === 'AVAILABLE' ? 'AVAILABLE' : 'DEED ISSUED'}
                        </span>
                      </div>
                      <div className="font-bold text-white text-sm mt-2">{plot.country} • {plot.region}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">{plot.coordinates}</div>
                      
                      <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-sm font-bold text-emerald-400 font-mono">${plot.price_usd} USD</span>
                        {plot.status === 'AVAILABLE' ? (
                          <button
                            onClick={() => handleOpenPaystack(`Land Plot ${plot.plot_number}`, 50)}
                            className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs"
                          >
                            Buy Plot ($50)
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500">Owned by {plot.owner_name}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 5: ID Card & Passport */}
          {activeFeatureTab === 'PASSPORT' && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* ID Card */}
              <div className="bg-gradient-to-br from-[#0D152A] via-[#0E172A] to-[#0A101D] border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-mono text-amber-400 font-bold">REPUBLIC OF VIRTUAL AFRICA</div>
                    <div className="text-lg font-black text-white mt-1">NATIONAL CITIZEN IDENTIFICATION</div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 font-mono font-bold flex items-center justify-center text-xs">
                    VA
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <div className="w-20 h-24 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 text-xs font-mono">
                    PHOTO
                  </div>
                  <div className="text-xs font-mono space-y-1">
                    <div>Name: <strong className="text-white">Kwame Mensah</strong></div>
                    <div>Citizen ID: <strong className="text-amber-400">VA-GH-784910-GOLD</strong></div>
                    <div>Origin: <strong className="text-white">Ghana</strong></div>
                    <div>Issued: <strong className="text-slate-300">2026-03-09</strong></div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>Cryptographic QR Authenticated</span>
                  <span className="text-emerald-400">STATUS: VALID</span>
                </div>
              </div>

              {/* Passport Card */}
              <div className="bg-[#0E172A] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="text-xs text-amber-400 font-mono uppercase font-bold">
                  Diplomatic & Freedom of Movement
                </div>
                <h3 className="text-xl font-bold text-white">Continental Passport ($20 USD)</h3>
                <p className="text-xs text-slate-400">
                  Grants visa-free digital transit through all 54 sovereign virtual territories, customs waiver on digital goods, and priority embassy access.
                </p>

                <button
                  onClick={() => handleOpenPaystack('Continental Passport', 20)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs"
                >
                  Order Continental Passport ($20 USD via Paystack)
                </button>
              </div>
            </div>
          )}

          {/* Sub-Tab 6: Cyber Police */}
          {activeFeatureTab === 'CYBER_POLICE' && (
            <div className="mt-6 bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Continental Cyber Defense Command</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono">AUTONOMOUS MONITOR ACTIVE</span>
              </div>

              <div className="mt-4 space-y-3 font-mono text-xs">
                {cyberAlerts.map(alert => (
                  <div key={alert.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-rose-400 font-bold">[{alert.severity}]</span>
                        <span className="text-white">{alert.description}</span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-1 font-sans">{alert.action_taken}</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] self-start sm:self-auto">
                      {alert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Tab 7: Royal TV & Social */}
          {activeFeatureTab === 'ROYAL_TV' && (
            <div className="mt-6 bg-[#0E172A] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Royal TV 24/7 Channel & Citizen Social Feed</h3>
                <span className="text-xs text-rose-500 font-bold font-mono">● LIVE NOW</span>
              </div>

              <div className="mt-4 p-6 rounded-xl bg-black border border-slate-800 text-center">
                <div className="text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
                  Special Broadcast
                </div>
                <h4 className="text-xl font-bold text-white mt-1">Continental Economic Summit from Accra HQ</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Streaming discussions on zero-fee intra-continental payments in Royal Dollar and pan-African AI medical records.
                </p>
                <div className="mt-4 inline-flex items-center space-x-2 text-xs text-emerald-400 font-mono">
                  <span>14,290 Citizens Watching</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Paystack Inline USD Checkout Modal */}
      {showPaystackModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E172A] border border-amber-500/40 rounded-2xl max-w-md w-full p-6 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Paystack Inline USD Checkout</h3>
              </div>
              <button
                onClick={() => setShowPaystackModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 font-sans text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Item / Credential:</span>
                  <span className="text-white font-bold">{paystackAction.item}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Due (USD):</span>
                  <span className="text-amber-400 font-black text-sm">${paystackAction.amountUsd}.00 USD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Gateway:</span>
                  <span className="text-slate-200">Paystack USD Merchant API</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Currency Rule:</span>
                  <span className="text-emerald-400">USD Only (Zero FX Conversion Loss)</span>
                </div>
              </div>

              <div className="text-slate-400 leading-relaxed text-[11px]">
                Upon confirmation, your digital credential will be cryptographically registered in the Virtual Africa Continental Ledger.
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPaystackModal(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-400/20"
                >
                  Confirm Paystack ${paystackAction.amountUsd} USD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
