import React, { useState, useEffect } from 'react';
import { 
  Satellite, 
  Search, 
  MapPin, 
  Layers, 
  Sparkles, 
  Maximize2, 
  DollarSign, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  Calendar, 
  Cloud, 
  Compass, 
  Cpu, 
  ExternalLink,
  ChevronRight,
  Eye,
  Sliders
} from 'lucide-react';
import { SatLocationResult, CommercialSatOrder, AiSatAnalysisResult } from '../../server/oskayiSatService';

export const OskayiSat: React.FC = () => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<SatLocationResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SatLocationResult | null>(null);
  const [activeAnalysisType, setActiveAnalysisType] = useState<AiSatAnalysisResult['analysis_type']>('ndvi_crop_health');
  const [analysisResult, setAnalysisResult] = useState<AiSatAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [spectralMode, setSpectralMode] = useState<'rgb' | 'ndvi' | 'swir'>('rgb');
  
  // SkyFi Commercial Tasking Modal
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedConstellation, setSelectedConstellation] = useState<CommercialSatOrder['constellation']>('PlanetScope SuperDove (50cm)');
  const [taskingSqKm, setTaskingSqKm] = useState<number>(25);
  const [orders, setOrders] = useState<CommercialSatOrder[]>([]);
  const [orderSuccessMessage, setOrderSuccessMessage] = useState<string | null>(null);

  const fetchFeatured = async () => {
    try {
      const [featRes, ordRes] = await Promise.all([
        fetch('/api/sat/featured'),
        fetch('/api/sat/orders')
      ]);
      if (featRes.ok) {
        const data: SatLocationResult[] = await featRes.json();
        setLocations(data);
        if (!selectedLocation && data.length > 0) setSelectedLocation(data[0]);
      }
      if (ordRes.ok) setOrders(await ordRes.json());
    } catch (e) {
      console.error('Sat load error:', e);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const res = await fetch('/api/sat/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) {
        const results = await res.json();
        setLocations(results);
        if (results.length > 0) setSelectedLocation(results[0]);
      }
    } catch (e) {
      console.error('Search error:', e);
    }
  };

  const handleRunAiAnalysis = async (type: AiSatAnalysisResult['analysis_type']) => {
    if (!selectedLocation) return;
    setActiveAnalysisType(type);
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/sat/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationName: selectedLocation.name,
          lat: selectedLocation.coordinates.lat,
          lng: selectedLocation.coordinates.lng,
          analysisType: type
        })
      });
      if (res.ok) {
        setAnalysisResult(await res.json());
      }
    } catch (e) {
      console.error('Analysis error:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOrderCommercial = async () => {
    if (!selectedLocation) return;
    try {
      const res = await fetch('/api/sat/order/commercial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationName: selectedLocation.name,
          lat: selectedLocation.coordinates.lat,
          lng: selectedLocation.coordinates.lng,
          constellation: selectedConstellation,
          areaSqKm: taskingSqKm
        })
      });
      if (res.ok) {
        const data = await res.json();
        setOrderSuccessMessage(`SkyFi Tasking Order ${data.order.order_id} generated ($${data.order.estimated_price_usd} USD). Stripe payment intent initialized.`);
        setShowOrderModal(false);
        fetchFeatured();
      }
    } catch (e) {
      console.error('Order error:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#060D17] text-slate-100 flex flex-col font-sans">
      {/* Top Sat Intelligence Ribbon */}
      <div className="bg-[#0A1626] border-b border-indigo-500/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-900/40">
            <Satellite className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-wider">
                OSKAYI SAT GLOBAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                COPERNICUS SENTINEL-2 + SKYFI API
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Global Earth Observation Marketplace • 10m Free Sentinel Multispectral & 30cm Commercial Tasking
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOrderModal(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Order High-Res (SkyFi)</span>
          </button>
        </div>
      </div>

      {orderSuccessMessage && (
        <div className="bg-emerald-950 border-b border-emerald-500/40 px-4 py-2 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{orderSuccessMessage}</span>
          </div>
          <button onClick={() => setOrderSuccessMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: Search & Location Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Universal Geo Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any mine, port, farm, city on Earth..."
              className="w-full bg-[#0D1C30] border border-indigo-900/60 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <button
              type="submit"
              className="absolute right-2 top-2 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold"
            >
              Scan
            </button>
          </form>

          {/* Location Results List */}
          <div className="bg-[#0D1C30]/90 rounded-2xl border border-indigo-900/50 p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-indigo-400 font-bold mb-2">
              <span>TARGETS & CONCESSIONS ({locations.length})</span>
              <span className="text-slate-400 text-[10px]">Copernicus 5-Day Free</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {locations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setAnalysisResult(null);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedLocation?.id === loc.id
                      ? 'bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-950'
                      : 'bg-[#091424] border-slate-800 hover:border-indigo-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-sm text-white block">{loc.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{loc.country}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 font-mono">
                      {loc.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5">
                    {loc.description}
                  </p>

                  <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {new Date(loc.sentinel2_pass_date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Cloud className="w-3 h-3 text-slate-500" />
                      {loc.cloud_cover_pct}% cloud
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: High-Res Satellite Viewer & Spectral Band Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0D1C30]/90 rounded-2xl border border-indigo-900/50 p-4 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Satellite className="w-4 h-4 text-indigo-400" />
                Copernicus Sentinel-2 Tile Viewer
              </span>
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                {(['rgb', 'ndvi', 'swir'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setSpectralMode(mode)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                      spectralMode === mode
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Satellite Image Frame */}
            {selectedLocation ? (
              <div className="relative w-full h-[360px] rounded-xl overflow-hidden border border-indigo-900/60 shadow-inner group">
                <img
                  src={selectedLocation.preview_thumbnail}
                  alt={selectedLocation.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    spectralMode === 'ndvi' ? 'hue-rotate-90 saturate-200' :
                    spectralMode === 'swir' ? 'invert contrast-150' : ''
                  }`}
                />
                
                {/* HUD Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white">
                    <span className="bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                      {selectedLocation.coordinates.lat.toFixed(4)}° N, {selectedLocation.coordinates.lng.toFixed(4)}° W
                    </span>
                    <span className="bg-indigo-600/80 px-2 py-1 rounded font-bold uppercase">
                      {spectralMode.toUpperCase()} BAND COMPOSITE
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-300 space-y-0.5">
                    <div className="font-bold text-white text-sm">{selectedLocation.name}</div>
                    <div className="text-indigo-300">Ground Resolution: 10m/pixel (Sentinel-2 MSI)</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-[360px] bg-slate-950 rounded-xl flex items-center justify-center text-slate-500 text-xs font-mono">
                Select a target location to stream earth observation tiles
              </div>
            )}

            {/* AI Computer Vision Analysis Trigger Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 block mb-2">
                Run AI Computer Vision Extraction:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'ndvi_crop_health', label: 'NDVI Crop Health' },
                  { id: 'illegal_mining_galamsey', label: 'Illegal Mining Pits' },
                  { id: 'building_change', label: 'Building Changes' },
                  { id: 'land_measurement', label: 'Measure Land Size' },
                  { id: 'oil_spill', label: 'Detect Oil Spill' }
                ].map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => handleRunAiAnalysis(tool.id as any)}
                    disabled={isAnalyzing}
                    className={`p-2 rounded-xl border text-[11px] font-bold text-left transition-all ${
                      activeAnalysisType === tool.id && analysisResult
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-[#091424] text-slate-300 border-slate-800 hover:border-indigo-700'
                    }`}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction Insights & Commercial Tasking Status (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#0D1C30]/90 rounded-2xl border border-indigo-900/50 p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-indigo-400 font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                AI Vision Report
              </span>
              {isAnalyzing && (
                <span className="text-amber-400 animate-pulse text-[10px]">Processing...</span>
              )}
            </div>

            {analysisResult ? (
              <div className="space-y-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#091424] border border-indigo-900/40">
                  <span className="text-[10px] text-slate-400 uppercase block">PRIMARY EXTRACTION</span>
                  <span className="font-bold text-emerald-400 text-sm block mt-0.5">
                    {analysisResult.score_or_value}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Confidence: {analysisResult.confidence_pct}%
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Key Observations:</span>
                  <ul className="space-y-1 text-[11px] text-slate-300 font-sans">
                    {analysisResult.findings.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-indigo-400 shrink-0">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 text-[11px] text-indigo-200">
                  <span className="font-bold text-indigo-400 block mb-0.5 uppercase text-[10px]">RECOMMENDATION:</span>
                  {analysisResult.recommendation}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500 text-xs font-mono">
                Click any AI vision extraction tool above to analyze multispectral Sentinel-2 tile data for this location.
              </div>
            )}
          </div>

          {/* SkyFi Commercial Orders History */}
          <div className="bg-[#0D1C30]/90 rounded-2xl border border-indigo-900/50 p-4 shadow-xl space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
              SkyFi Tasked Concessions ({orders.length})
            </span>
            {orders.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {orders.map(ord => (
                  <div key={ord.order_id} className="p-2 rounded-lg bg-[#091424] border border-slate-800 text-[11px] font-mono">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{ord.order_id}</span>
                      <span className="text-emerald-400">${ord.estimated_price_usd}</span>
                    </div>
                    <div className="text-slate-400 text-[10px] truncate">{ord.location_name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">No commercial satellite orders yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* SkyFi Commercial Imagery Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0D1C30] border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Satellite className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">SkyFi Commercial Tasking Pass</h3>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Target Concession</label>
                <input
                  type="text"
                  disabled
                  value={selectedLocation?.name || 'Selected Location'}
                  className="w-full bg-[#091424] border border-slate-800 rounded-xl p-2.5 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Commercial Constellation & Resolution</label>
                <select
                  value={selectedConstellation}
                  onChange={(e) => setSelectedConstellation(e.target.value as any)}
                  className="w-full bg-[#091424] border border-slate-800 rounded-xl p-2.5 text-white text-xs font-mono"
                >
                  <option value="WorldView-3 (30cm)">WorldView-3 Maxar (30cm Ultra-Res) • $24/km²</option>
                  <option value="PlanetScope SuperDove (50cm)">PlanetScope SuperDove (50cm High-Res) • $16/km²</option>
                  <option value="Satellogic Aleph-1 (70cm)">Satellogic Aleph-1 (70cm Multispectral) • $10/km²</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Area of Interest (km²): {taskingSqKm} sq km</label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={taskingSqKm}
                  onChange={(e) => setTaskingSqKm(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono">
                <span className="text-slate-400">Estimated Total Cost:</span>
                <span className="font-black text-emerald-400 text-base">
                  ${Math.max(taskingSqKm * (selectedConstellation.includes('30cm') ? 24 : selectedConstellation.includes('50cm') ? 16 : 10), 150)} USD
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleOrderCommercial}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                <span>Confirm Tasking via Stripe</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
