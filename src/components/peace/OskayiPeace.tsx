import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  Plane, 
  Radio, 
  Globe, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  Mail, 
  CheckCircle2, 
  Download, 
  DollarSign, 
  Compass, 
  Activity, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ConflictTheater, OsintSignalFeed, PeaceWeeklyBriefing } from '../../server/oskayiPeaceService';

export const OskayiPeace: React.FC = () => {
  const [theaters, setTheaters] = useState<ConflictTheater[]>([]);
  const [signals, setSignals] = useState<OsintSignalFeed[]>([]);
  const [briefing, setBriefing] = useState<PeaceWeeklyBriefing | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<ConflictTheater | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [orgInput, setOrgInput] = useState('');
  const [alertSubscribedMessage, setAlertSubscribedMessage] = useState<string | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const fetchPeaceData = async () => {
    try {
      const [tRes, sRes, bRes] = await Promise.all([
        fetch('/api/peace/theaters'),
        fetch('/api/peace/signals'),
        fetch('/api/peace/briefing')
      ]);
      if (tRes.ok) {
        const tList: ConflictTheater[] = await tRes.json();
        setTheaters(tList);
        if (!selectedTheater && tList.length > 0) setSelectedTheater(tList[0]);
      }
      if (sRes.ok) setSignals(await sRes.json());
      if (bRes.ok) setBriefing(await bRes.json());
    } catch (e) {
      console.error('Peace data load error:', e);
    }
  };

  useEffect(() => {
    fetchPeaceData();
    const interval = setInterval(fetchPeaceData, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribeAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    try {
      const res = await fetch('/api/peace/alert/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, orgName: orgInput || 'Humanitarian Org' })
      });
      if (res.ok) {
        const data = await res.json();
        setAlertSubscribedMessage(data.message);
        setEmailInput('');
        setOrgInput('');
      }
    } catch (e) {
      console.error('Subscribe alert error:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans">
      {/* Top Geopolitical Intelligence Ribbon */}
      <div className="bg-[#0D1526] border-b border-amber-500/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-700 p-0.5 flex items-center justify-center shadow-lg shadow-amber-900/40">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-wider">
                OSKAYI PEACE GLOBAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                OSINT FUSION • GDACS • NASA FIRMS
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
                Zero Classified Data • 100% Verified Public Feeds
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Global Conflict Early Warning Platform for NGOs, UN Agencies, Airlines & War-Risk Insurers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Enterprise Access ($999/mo)</span>
          </button>
        </div>
      </div>

      {alertSubscribedMessage && (
        <div className="bg-emerald-950 border-b border-emerald-500/40 px-4 py-2 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{alertSubscribedMessage}</span>
          </div>
          <button onClick={() => setAlertSubscribedMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Grid Dashboard */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: Conflict Theaters Directory (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0C1527]/90 rounded-2xl border border-amber-900/40 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Monitored Conflict Theaters ({theaters.length})
              </span>
              <span className="text-rose-400 font-bold">24h Surge Index</span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {theaters.map(t => {
                const isSelected = selectedTheater?.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTheater(t)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-500 shadow-md shadow-amber-950'
                        : 'bg-[#080E1C] border-slate-800 hover:border-amber-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{t.country}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-black uppercase font-mono ${
                            t.risk_level === 'EXTREME' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {t.risk_level}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">{t.region_theater}</span>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black font-mono text-white leading-tight">
                          {t.risk_score}<span className="text-[10px] text-slate-500">/100</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold ${t.trend_24h_pct >= 25 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
                          +{t.trend_24h_pct}% (24h)
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 font-sans">
                      {t.primary_rationale}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="flex items-center gap-1 text-amber-300/80">
                        <Flame className="w-3 h-3 text-red-400" />
                        {t.signal_summary.firms_thermal_fires} fires
                      </span>
                      <span className="flex items-center gap-1 text-blue-300/80">
                        <Plane className="w-3 h-3 text-blue-400" />
                        {t.signal_summary.military_flight_sorties} flights
                      </span>
                      <span>{new Date(t.last_updated).toLocaleTimeString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: Geopolitical Situation Room & Rationale Deep Dive (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedTheater ? (
            <div className="bg-[#0C1527]/90 rounded-2xl border border-amber-900/40 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-white">{selectedTheater.country}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 font-bold">
                      RISK INDEX: {selectedTheater.risk_score} / 100
                    </span>
                  </div>
                  <span className="text-xs font-mono text-amber-400">{selectedTheater.region_theater}</span>
                </div>
                <div className="text-right text-xs font-mono text-slate-400">
                  <div>Coords: {selectedTheater.coordinates.lat}° N, {selectedTheater.coordinates.lng}° E</div>
                  <div className="text-emerald-400">Fused from 4 OSINT Feeds</div>
                </div>
              </div>

              {/* Rationale Breakdown Box */}
              <div className="p-4 rounded-xl bg-[#080E1C] border border-amber-500/30 space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  AI Multi-Signal Fusion Rationale:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {selectedTheater.primary_rationale}
                </p>
              </div>

              {/* Multi-Signal Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">NASA FIRMS Fires</span>
                  <span className="font-bold text-red-400 text-sm mt-0.5 block">
                    {selectedTheater.signal_summary.firms_thermal_fires}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Military Sorties</span>
                  <span className="font-bold text-blue-400 text-sm mt-0.5 block">
                    {selectedTheater.signal_summary.military_flight_sorties}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">News Surge</span>
                  <span className="font-bold text-amber-400 text-sm mt-0.5 block">
                    +{selectedTheater.signal_summary.news_spike_pct}%
                  </span>
                </div>
              </div>

              {/* Civil Aviation NOTAM Risk Warning */}
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs font-mono text-rose-200 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase text-[11px]">
                  <Plane className="w-3.5 h-3.5" />
                  <span>Aviation Airspace Risk / NOTAM Directive</span>
                </div>
                <p className="text-[11px]">{selectedTheater.airspace_risk_notam}</p>
              </div>

              {/* Verified Sources Transparency */}
              <div className="text-xs font-mono space-y-1.5 pt-2">
                <span className="text-[10px] text-slate-500 uppercase block">Verified Public Primary Sources:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTheater.verified_sources.map(src => (
                    <span key={src} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 font-mono text-xs">
              Select a conflict theater to view fused OSINT telemetry and risk scores.
            </div>
          )}

          {/* Real-time Public OSINT Signal Ticker */}
          <div className="bg-[#0C1527]/90 rounded-2xl border border-amber-900/40 p-4 shadow-xl space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Live Incoming OSINT Signal Stream ({signals.length})
            </span>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {signals.map(s => (
                <div key={s.id} className="p-2 rounded-lg bg-[#080E1C] border border-slate-800 text-[11px] font-mono space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span className="text-amber-300 font-bold">{s.source_name}</span>
                    <span>{new Date(s.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-white font-sans">{s.headline}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Briefing PDF Generator & Rapid Jump Email Alerts (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Rapid Jump Email Alerts Card */}
          <div className="bg-[#0C1527]/90 rounded-2xl border border-amber-900/40 p-4 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
              <Mail className="w-4 h-4" />
              <span>24h Rapid Surge Alerts</span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Automated webhook and email alert dispatched whenever country risk jumps &gt;30% in 24 hours.
            </p>

            <form onSubmit={handleSubscribeAlert} className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Organization (e.g. ICRC / UNHCR)"
                value={orgInput}
                onChange={(e) => setOrgInput(e.target.value)}
                className="w-full bg-[#080E1C] border border-slate-800 rounded-xl p-2.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <input
                type="email"
                required
                placeholder="security-desk@organization.org"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#080E1C] border border-slate-800 rounded-xl p-2.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider"
              >
                Activate Surge Alerts
              </button>
            </form>
          </div>

          {/* Weekly PDF Briefing Export Card */}
          {briefing && (
            <div className="bg-[#0C1527]/90 rounded-2xl border border-amber-900/40 p-4 shadow-xl space-y-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase">
                <FileText className="w-4 h-4" />
                <span>Weekly OSINT Briefing</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#080E1C] border border-slate-800 space-y-1">
                <div className="font-bold text-white text-[11px]">{briefing.title}</div>
                <div className="text-slate-400 text-[10px]">{briefing.period} • {briefing.high_risk_theaters_count} High-Risk Zones</div>
              </div>

              <p className="text-slate-400 text-[11px] font-sans line-clamp-3">
                {briefing.executive_summary}
              </p>

              <button
                onClick={() => alert(`OSINT Intelligence Briefing (${briefing.briefing_id}) prepared for print / certified PDF export.`)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Executive Briefing (PDF)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enterprise Subscription Modal ($999/mo) */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0C1527] border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Oskayi Peace Global Enterprise</h3>
              </div>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-[#080E1C] border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Institutional Security License</span>
                  <span className="font-mono font-black text-amber-400 text-base">$999/mo</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Designed for Humanitarian NGOs (Red Cross, UN), global news networks, commercial aviation operations desks, and maritime war-risk underwriters.
                </p>
              </div>

              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Real-time webhook triggers on 24h risk jumps &gt;30%</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full access to weekly confidential PDF situation briefings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Custom geofenced theater monitoring & airport NOTAM alerts</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  alert("Enterprise subscription intent ($999/mo) initialized. Payment processed via Stripe or institutional SWIFT wire transfer under OSKAYI CONSULT.");
                  setShowSubscriptionModal(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                <span>Subscribe via Stripe ($999/mo)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
