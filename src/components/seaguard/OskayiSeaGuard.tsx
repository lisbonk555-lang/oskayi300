import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Ship, 
  AlertTriangle, 
  Compass, 
  FileText, 
  Send, 
  Download, 
  Satellite, 
  Waves, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Droplet, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { MaritimeVessel, MaritimeAnomalyEvent, SatelliteLayerData } from '../../server/oskayiSeaGuardService';

export const OskayiSeaGuard: React.FC = () => {
  const [vessels, setVessels] = useState<MaritimeVessel[]>([]);
  const [anomalies, setAnomalies] = useState<MaritimeAnomalyEvent[]>([]);
  const [satelliteLayers, setSatelliteLayers] = useState<SatelliteLayerData[]>([]);
  const [selectedVessel, setSelectedVessel] = useState<MaritimeVessel | null>(null);
  const [selectedAnomaly, setSelectedAnomaly] = useState<MaritimeAnomalyEvent | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'dark' | 'fishing' | 'loitering' | 'piracy'>('all');
  const [dossierData, setDossierData] = useState<any | null>(null);
  const [alertDispatchMessage, setAlertDispatchMessage] = useState<string | null>(null);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);

  const fetchSeaGuardData = async () => {
    try {
      const [vRes, aRes, sRes] = await Promise.all([
        fetch('/api/seaguard/vessels'),
        fetch('/api/seaguard/anomalies'),
        fetch('/api/seaguard/satellite-layers')
      ]);
      if (vRes.ok) {
        const vList = await vRes.json();
        setVessels(vList);
        if (!selectedVessel && vList.length > 0) setSelectedVessel(vList[0]);
      }
      if (aRes.ok) {
        const aList = await aRes.json();
        setAnomalies(aList);
        if (!selectedAnomaly && aList.length > 0) setSelectedAnomaly(aList[0]);
      }
      if (sRes.ok) setSatelliteLayers(await sRes.json());
    } catch (e) {
      console.error('Failed to load Sea Guard telemetry:', e);
    }
  };

  useEffect(() => {
    fetchSeaGuardData();
    const interval = setInterval(fetchSeaGuardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDispatchAlert = async (anomalyId: string) => {
    try {
      setIsDispatching(true);
      const res = await fetch('/api/seaguard/alert/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anomalyId, recipientEmail: 'operations@gpha.gov.gh' })
      });
      if (res.ok) {
        const data = await res.json();
        setAlertDispatchMessage(data.message);
        await fetchSeaGuardData();
      }
    } catch (e) {
      console.error('Dispatch alert error:', e);
    } finally {
      setIsDispatching(false);
    }
  };

  const handleGenerateDossier = async (mmsi: string) => {
    try {
      const res = await fetch(`/api/seaguard/dossier/${mmsi}`);
      if (res.ok) {
        const data = await res.json();
        setDossierData(data);
      }
    } catch (e) {
      console.error('Failed to load dossier:', e);
    }
  };

  const filteredVessels = vessels.filter(v => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'dark') return v.anomaly_flag === 'dark_ship_6h';
    if (activeFilter === 'fishing') return v.anomaly_flag === 'protected_zone_fishing';
    if (activeFilter === 'loitering') return v.anomaly_flag === 'loitering_no_dest';
    if (activeFilter === 'piracy') return v.anomaly_flag === 'piracy_risk';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030B1C] text-slate-100 flex flex-col font-sans">
      {/* Top Maritime Ribbon */}
      <div className="bg-[#061533] border-b border-cyan-500/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-900/40">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-wider">
                OSKAYI SEA GUARD GLOBAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                AISSTREAM + SENTINEL-2 SAR FUSION
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Global Maritime Domain Awareness, Dark Ship Interception & Environmental Surveillance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-900/60 text-cyan-400 flex items-center gap-1.5">
            <Satellite className="w-3.5 h-3.5 text-cyan-400" />
            <span>Copernicus Sentinel-2 Active</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 flex items-center gap-1.5 font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>{anomalies.length} Critical Maritime Alerts</span>
          </span>
        </div>
      </div>

      {/* Alert Banner if dispatched */}
      {alertDispatchMessage && (
        <div className="bg-emerald-950 border-b border-emerald-500/40 px-4 py-2 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{alertDispatchMessage}</span>
          </div>
          <button onClick={() => setAlertDispatchMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Tactical Grid */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: Vessel Directory & Anomaly Filter (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Anomaly Filter Badges */}
          <div className="bg-[#07193D] p-3 rounded-2xl border border-cyan-900/50 flex flex-wrap gap-1.5 text-xs font-bold">
            {[
              { id: 'all', label: 'All AIS Vessels' },
              { id: 'dark', label: 'Dark Ships (>6h)' },
              { id: 'fishing', label: 'Illegal Fishing' },
              { id: 'loitering', label: 'Loitering' },
              { id: 'piracy', label: 'Piracy Risk' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeFilter === tab.id
                    ? 'bg-cyan-500 text-[#030B1C] shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tracked Vessels List */}
          <div className="bg-[#07193D]/90 rounded-2xl border border-cyan-900/50 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Ship className="w-4 h-4" />
                Vessels in Sector ({filteredVessels.length})
              </span>
              <span className="text-slate-400">Live 10-sec Feed</span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {filteredVessels.map(v => (
                <div
                  key={v.mmsi}
                  onClick={() => {
                    setSelectedVessel(v);
                    handleGenerateDossier(v.mmsi);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedVessel?.mmsi === v.mmsi
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-md shadow-cyan-950'
                      : 'bg-[#040E26]/80 border-slate-800 hover:border-cyan-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-white">{v.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                          {v.flag_iso}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono">
                        <span>MMSI: {v.mmsi}</span>
                        <span> • </span>
                        <span>{v.vessel_type}</span>
                      </div>
                    </div>

                    {v.anomaly_flag !== 'none' && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono tracking-wider ${
                        v.anomaly_flag === 'dark_ship_6h' ? 'bg-red-500/20 text-red-300 border border-red-500/50 animate-pulse' :
                        v.anomaly_flag === 'protected_zone_fishing' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' :
                        'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                      }`}>
                        {v.anomaly_flag === 'dark_ship_6h' ? 'DARK 8.4H' : 
                         v.anomaly_flag === 'protected_zone_fishing' ? 'MPA FISH' : 
                         v.anomaly_flag.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between font-mono pt-1.5 border-t border-slate-800/80">
                    <span>{v.speed_knots} kts • Hdg {v.heading_deg}°</span>
                    <span className="truncate max-w-[130px]">{v.destination}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Tactical Ocean Map Simulator & Radar HUD (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#07193D]/90 rounded-2xl border border-cyan-900/50 p-4 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                Gulf of Guinea Tactical Radar & Ocean Grid
              </span>
              <span className="text-emerald-400">Sweep Rate: 12 RPM</span>
            </div>

            {/* Tactical Ocean Map Canvas Representation */}
            <div className="relative w-full h-[360px] bg-gradient-to-b from-[#020A1A] via-[#041433] to-[#020D24] rounded-xl border border-cyan-900/60 overflow-hidden flex items-center justify-center">
              
              {/* Radar Rings Grid */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-80 h-80 rounded-full border border-cyan-400" />
                <div className="w-60 h-60 rounded-full border border-cyan-400 absolute" />
                <div className="w-40 h-40 rounded-full border border-cyan-400 absolute" />
                <div className="w-20 h-20 rounded-full border border-cyan-400 absolute" />
                <div className="w-full h-px bg-cyan-400 absolute" />
                <div className="h-full w-px bg-cyan-400 absolute" />
              </div>

              {/* Coastal Landmass Graphic Simulation (Ghana / Ivory Coast Coastline) */}
              <div className="absolute top-0 inset-x-0 h-16 bg-slate-900/60 border-b border-cyan-800/40 flex items-center justify-around text-[10px] font-mono text-cyan-400/80">
                <span>TAKORADI HARBOUR</span>
                <span>CAPE THREE POINTS (SANCTUARY)</span>
                <span>TEMA CONTAINER PORT</span>
              </div>

              {/* Interactive Vessel Tactical Markers */}
              {filteredVessels.map((v, i) => {
                const isSelected = selectedVessel?.mmsi === v.mmsi;
                // Position based on lat/lng in Gulf of Guinea
                const xPct = Math.min(Math.max((v.lng + 2.0) * 30 + 10, 10), 90);
                const yPct = Math.min(Math.max((6.0 - v.lat) * 60 + 20, 20), 85);

                return (
                  <div
                    key={v.mmsi}
                    onClick={() => {
                      setSelectedVessel(v);
                      handleGenerateDossier(v.mmsi);
                    }}
                    style={{ left: `${xPct}%`, top: `${yPct}%` }}
                    className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group z-20"
                  >
                    <div className={`relative flex items-center justify-center transition-transform ${isSelected ? 'scale-125' : 'hover:scale-110'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        v.anomaly_flag === 'dark_ship_6h' ? 'bg-red-600 animate-ping' :
                        v.anomaly_flag === 'protected_zone_fishing' ? 'bg-amber-500' :
                        'bg-cyan-500'
                      }`} />
                      <div className={`w-3 h-3 rounded-full absolute ${
                        v.anomaly_flag === 'dark_ship_6h' ? 'bg-red-500' :
                        v.anomaly_flag === 'protected_zone_fishing' ? 'bg-amber-400' :
                        'bg-cyan-300'
                      }`} />
                    </div>
                    <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      {v.name} ({v.speed_knots} kts)
                    </span>
                  </div>
                );
              })}

              {/* Protected Zone Shaded Overlay */}
              <div className="absolute top-16 left-12 w-36 h-28 border border-amber-500/60 bg-amber-500/10 rounded-lg pointer-events-none flex items-center justify-center">
                <span className="text-[9px] font-mono font-bold text-amber-300/80 text-center uppercase">
                  Cape Three Points Marine Reserve (No Trawl Zone)
                </span>
              </div>
            </div>

            {/* Satellite Pass Telemetry Footer */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#040E26] border border-cyan-900/40">
                <span className="text-slate-400 text-[10px] block">Copernicus Sentinel-2 MSI</span>
                <span className="text-white font-bold">Optical Pass: 4h ago</span>
                <span className="text-cyan-400 text-[10px] block">10m Ground Resolution</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#040E26] border border-cyan-900/40">
                <span className="text-slate-400 text-[10px] block">Sentinel-1 C-SAR Radar</span>
                <span className="text-white font-bold">Synthetic Aperture Radar</span>
                <span className="text-emerald-400 text-[10px] block">All-Weather Night Penetration</span>
              </div>
            </div>
          </div>

          {/* Anomaly Dispatch Action Panel */}
          {selectedAnomaly && (
            <div className="bg-[#07193D]/90 rounded-2xl border border-rose-500/30 p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-400 font-bold uppercase flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  Port Authority Enforcement Action
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-black">
                  {selectedAnomaly.severity.toUpperCase()}
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-300">
                <div className="font-bold text-white text-sm">
                  {selectedAnomaly.vessel_name} ({selectedAnomaly.vessel_type})
                </div>
                <p className="text-slate-400">{selectedAnomaly.evidence_summary}</p>
                <div className="text-[11px] font-mono text-cyan-400 pt-1">
                  Location: {selectedAnomaly.zone_name} [{selectedAnomaly.coordinates.lat.toFixed(4)}, {selectedAnomaly.coordinates.lng.toFixed(4)}]
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => handleDispatchAlert(selectedAnomaly.id)}
                  disabled={isDispatching}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider font-mono shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isDispatching ? 'Transmitting Notice...' : 'Dispatch Alert to Port & Navy'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Automated Dossier & Evidence Sheet (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#07193D]/90 rounded-2xl border border-cyan-900/50 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Vessel Dossier
              </span>
              <button
                onClick={() => selectedVessel && handleGenerateDossier(selectedVessel.mmsi)}
                className="text-cyan-400 hover:text-white"
                title="Refresh Dossier"
              >
                Inspect
              </button>
            </div>

            {dossierData ? (
              <div className="space-y-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#040E26] border border-cyan-900/40 space-y-1">
                  <span className="text-[10px] text-slate-400 block">DOSSIER IDENTIFIER</span>
                  <span className="font-bold text-white text-[11px] break-all">{dossierData.dossier_id}</span>
                </div>

                <div className="space-y-1 text-slate-300 text-[11px]">
                  <div>Target: <strong className="text-white">{dossierData.vessel_profile.name}</strong></div>
                  <div>MMSI: <span className="text-cyan-300">{dossierData.vessel_profile.mmsi}</span></div>
                  <div>IMO: {dossierData.vessel_profile.imo}</div>
                  <div>Flag: {dossierData.vessel_profile.flag}</div>
                  <div>Speed: {dossierData.vessel_profile.speed_knots} knots</div>
                  <div>Heading: {dossierData.vessel_profile.heading}°</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold block uppercase">Satellite Evidence</span>
                  <div className="text-[11px] text-slate-400">
                    Oil Slick: <strong className="text-white">{dossierData.satellite_evidence.oil_slick_observed}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Confidence: <span className="text-emerald-400">{dossierData.satellite_evidence.spectral_confidence_score}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-[11px] text-rose-300">
                  <span className="font-black text-rose-400 block mb-0.5">RECOMMENDED STATUTORY DIRECTIVE:</span>
                  {dossierData.recommended_action}
                </div>

                <button
                  onClick={() => alert(`Official Maritime Dossier ${dossierData.dossier_id} prepared for print / certified PDF download.`)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Certified PDF</span>
                </button>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs">
                Select a vessel on the radar map to inspect its verified AIS dossier and satellite evidence.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
