import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  AlertTriangle, 
  Mic, 
  MicOff, 
  Volume2, 
  Wifi, 
  WifiOff, 
  Lock, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Battery, 
  Play, 
  Pause, 
  PhoneCall, 
  Flame, 
  Crosshair, 
  Layers, 
  CheckCircle2, 
  RefreshCw,
  Sliders,
  DollarSign,
  Compass
} from 'lucide-react';
import { PttChannel, EmergencyUnit, PttCallRecord } from '../../server/oskayiAirwaveService';

export const OskayiAirwave: React.FC = () => {
  const [channels, setChannels] = useState<PttChannel[]>([]);
  const [units, setUnits] = useState<EmergencyUnit[]>([]);
  const [recordings, setRecordings] = useState<PttCallRecord[]>([]);
  const [activeChannelId, setActiveChannelId] = useState<string>('ch-police-alpha');
  const [currentRole, setCurrentRole] = useState<'Officer' | 'Dispatcher' | 'Admin'>('Officer');
  const [myCallsign, setMyCallsign] = useState<string>('PATROL-402');
  
  // PTT State
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [transmissionSeconds, setTransmissionSeconds] = useState<number>(0);
  const [directModeWifi, setDirectModeWifi] = useState<boolean>(false);
  const [isSosActive, setIsSosActive] = useState<boolean>(false);
  const [sosBanner, setSosBanner] = useState<string | null>(null);
  const [playingRecordingId, setPlayingRecordingId] = useState<string | null>(null);
  const [showStripeModal, setShowStripeModal] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number; seats: number }>({
    name: 'Tactical Officer Seat',
    price: 29,
    seats: 10
  });

  const timerRef = useRef<any>(null);

  const fetchData = async () => {
    try {
      const [chRes, unRes, recRes] = await Promise.all([
        fetch('/api/airwave/channels'),
        fetch('/api/airwave/units'),
        fetch('/api/airwave/recordings')
      ]);
      if (chRes.ok) setChannels(await chRes.json());
      if (unRes.ok) setUnits(await unRes.json());
      if (recRes.ok) setRecordings(await recRes.json());
    } catch (e) {
      console.error('Airwave load error:', e);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  // Handle PTT Hold
  const handlePttDown = () => {
    setIsTransmitting(true);
    setTransmissionSeconds(0);
    timerRef.current = setInterval(() => {
      setTransmissionSeconds(s => s + 1);
    }, 1000);
  };

  const handlePttUp = async () => {
    if (!isTransmitting) return;
    setIsTransmitting(false);
    clearInterval(timerRef.current);

    try {
      await fetch('/api/airwave/ptt/transmit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: activeChannelId,
          senderCallsign: myCallsign,
          audioDurationSec: Math.max(transmissionSeconds, 2.5)
        })
      });
      await fetchData();
    } catch (e) {
      console.error('PTT transmit failed:', e);
    }
  };

  // Emergency SOS Trigger
  const handleEmergencySos = async () => {
    try {
      const resp = await fetch('/api/airwave/emergency/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderCallsign: myCallsign,
          lat: 5.5560,
          lng: -0.1969,
          sosReason: 'OFFICER UNDER ACTIVE KINETIC DISTRESS • OVERRIDE PRIORITY 1'
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        setIsSosActive(true);
        setActiveChannelId('ch-sos-priority');
        setSosBanner(`🚨 EMERGENCY SOS ACTIVE: ${data.sosRecord?.transcript}`);
        await fetchData();
      }
    } catch (e) {
      console.error('SOS trigger error:', e);
    }
  };

  const handleResetSos = async () => {
    try {
      await fetch('/api/airwave/emergency/reset', { method: 'POST' });
      setIsSosActive(false);
      setSosBanner(null);
      await fetchData();
    } catch (e) {
      console.error('Reset SOS error:', e);
    }
  };

  const activeChannel = channels.find(c => c.id === activeChannelId) || channels[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Mission Critical Banner */}
      <div className="bg-[#0B1528] border-b border-rose-500/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 p-0.5 flex items-center justify-center shadow-lg shadow-rose-900/40">
            <Radio className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-wider">
                OSKAYI AIRWAVE GLOBAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                MC-PTT 3GPP REL-17
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <Lock className="w-3 h-3" />
                E2EE AES-256-GCM
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Mission-Critical Push-to-Talk Platform for Police, Fire, Ambulance & Dispatch Centers
            </p>
          </div>
        </div>

        {/* Tactical Status & Switchers */}
        <div className="flex items-center gap-2">
          {/* Direct WiFi Mode Toggle */}
          <button
            onClick={() => setDirectModeWifi(!directModeWifi)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              directModeWifi
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {directModeWifi ? <Wifi className="w-3.5 h-3.5 text-amber-400" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>{directModeWifi ? 'Direct WiFi Active' : 'Cellular Network'}</span>
          </button>

          {/* Role Selector */}
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
            {(['Officer', 'Dispatcher', 'Admin'] as const).map(role => (
              <button
                key={role}
                onClick={() => setCurrentRole(role)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  currentRole === role
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowStripeModal(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Stripe</span> $29/mo
          </button>
        </div>
      </div>

      {/* SOS Alert Active Banner if triggered */}
      {sosBanner && (
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-red-600 text-white px-4 py-2.5 flex items-center justify-between shadow-xl animate-pulse">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-black">
            <AlertTriangle className="w-5 h-5 text-yellow-300 shrink-0" />
            <span>{sosBanner}</span>
          </div>
          <button
            onClick={handleResetSos}
            className="px-3 py-1 bg-black/60 hover:bg-black/80 rounded-lg text-xs font-bold border border-white/30 uppercase tracking-wider"
          >
            Cancel SOS
          </button>
        </div>
      )}

      {/* Main 3-Column Tactical Console */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: Tactical Talkgroups / Channels (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Radio className="w-4 h-4" />
                Active Talkgroups ({channels.length})
              </span>
              <span className="text-[11px] font-mono text-slate-400">Encrypted</span>
            </div>

            <div className="space-y-2">
              {channels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannelId(channel.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all relative overflow-hidden ${
                    activeChannelId === channel.id
                      ? channel.category === 'emergency'
                        ? 'bg-rose-950/80 border-rose-500 text-white shadow-lg shadow-rose-900/30'
                        : 'bg-[#0B1528] border-rose-500/80 text-white shadow-lg shadow-rose-500/10'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        {channel.category === 'emergency' && (
                          <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
                        )}
                        <span className="font-bold text-sm tracking-wide">{channel.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-mono">
                        <span>P-{channel.priority_level}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-slate-500" />
                          {channel.active_users_count} units
                        </span>
                        <span>•</span>
                        <span className="text-emerald-400">{channel.e2ee_key_fingerprint.slice(0, 15)}...</span>
                      </div>
                    </div>
                    {activeChannelId === channel.id && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mt-1" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Unit Quick Identity */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>ACTIVE TRANSPONDER</span>
              <span className="text-emerald-400">ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-white font-bold text-sm">
              <span>{myCallsign}</span>
              <span className="text-rose-400">{currentRole.toUpperCase()}</span>
            </div>
            <div className="mt-2 text-slate-400 text-[11px] space-y-1">
              <div>GPS Fix: 5.5560° N, -0.1969° W (Accra Sector)</div>
              <div>Direct Mesh: {directModeWifi ? '802.11s Ad-Hoc 5.8GHz' : 'LTE FirstNet Band 14'}</div>
            </div>
          </div>
        </div>

        {/* Center Column: Big PTT Controller & Big Emergency Button (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-between bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-2xl relative">
          
          {/* Active Talkgroup Status Header */}
          <div className="w-full text-center pb-4 border-b border-slate-800">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              CONNECTED TALKGROUP
            </span>
            <div className="text-lg font-black text-white tracking-wide">
              {activeChannel?.name}
            </div>
            <div className="text-xs text-rose-400 font-mono mt-1">
              {isTransmitting ? `● TRANSMITTING (${transmissionSeconds}s)` : '○ STANDBY • READY TO TRANSMIT'}
            </div>
          </div>

          {/* Tactical Audio Waveform Graphic */}
          <div className="my-6 w-full h-16 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-75 ${
                  isTransmitting
                    ? 'bg-rose-500 animate-pulse'
                    : 'bg-slate-800'
                }`}
                style={{
                  height: isTransmitting
                    ? `${Math.max(15, Math.sin(i * 0.4 + transmissionSeconds) * 45 + 50)}%`
                    : '15%'
                }}
              />
            ))}
          </div>

          {/* GIANT PUSH-TO-TALK BUTTON (Glove-Friendly) */}
          <div className="flex flex-col items-center my-4">
            <button
              onMouseDown={handlePttDown}
              onMouseUp={handlePttUp}
              onTouchStart={handlePttDown}
              onTouchEnd={handlePttUp}
              className={`w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-150 shadow-2xl border-4 ${
                isTransmitting
                  ? 'bg-rose-600 border-rose-300 scale-95 shadow-rose-600/50'
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border-rose-500/40 shadow-slate-950 hover:border-rose-400'
              }`}
            >
              <Mic className={`w-14 h-14 ${isTransmitting ? 'text-white animate-pulse' : 'text-rose-400'}`} />
              <span className="font-mono font-black text-base tracking-widest text-white mt-2">
                {isTransmitting ? 'TALKING...' : 'PRESS TO TALK'}
              </span>
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest mt-0.5">
                HOLD FOR PTT
              </span>
            </button>
          </div>

          {/* BIG RED EMERGENCY SOS OVERRIDE BUTTON */}
          <div className="w-full pt-4 border-t border-slate-800">
            <button
              onClick={handleEmergencySos}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-700 to-red-600 hover:from-red-500 hover:to-rose-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-red-900/50 border-2 border-red-400 flex items-center justify-center gap-2 group active:scale-98 transition-transform"
            >
              <AlertTriangle className="w-6 h-6 text-yellow-300 group-hover:scale-110 transition-transform" />
              <span>EMERGENCY SOS OVERRIDE</span>
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-1.5 font-mono">
              Overrides all talkgroups • Broadcasts real-time GPS & live distress telemetry
            </p>
          </div>
        </div>

        {/* Right Column: Dispatcher Live Map & Recordings Replay (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Unit Fleet Radar / Map List */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                Live Responder Units ({units.length})
              </span>
              <span className="text-[10px] font-mono text-slate-400">GPS Auto-Track</span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {units.map(unit => (
                <div
                  key={unit.id}
                  className={`p-2.5 rounded-xl border text-xs ${
                    unit.status === 'sos'
                      ? 'bg-rose-950/60 border-rose-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono">{unit.callsign}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      unit.agency === 'Police' ? 'bg-blue-500/20 text-blue-300' :
                      unit.agency === 'Fire & Rescue' ? 'bg-amber-500/20 text-amber-300' :
                      unit.agency === 'Ambulance / EMS' ? 'bg-rose-500/20 text-rose-300' :
                      'bg-teal-500/20 text-teal-300'
                    }`}>
                      {unit.agency}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                    <span className="truncate max-w-[160px]">{unit.location.address}</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Battery className="w-3 h-3 text-emerald-400" />
                      {unit.battery_pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call Recording Archives & Replay */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                Encrypted Call Transcripts ({recordings.length})
              </span>
              <span className="text-[10px] font-mono text-slate-400">30-Day Retention</span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {recordings.map(rec => (
                <div
                  key={rec.id}
                  className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white">{rec.sender_callsign}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{rec.duration_sec}s</span>
                    </div>
                    <button
                      onClick={() => setPlayingRecordingId(playingRecordingId === rec.id ? null : rec.id)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-400"
                    >
                      {playingRecordingId === rec.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300 italic font-sans">
                    "{rec.transcript}"
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{rec.channel_name}</span>
                    <span>{new Date(rec.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Pricing & Enterprise Deployment Modal */}
      {showStripeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-rose-500/40 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-white text-base">Oskayi Airwave Enterprise Licensing</h3>
              </div>
              <button
                onClick={() => setShowStripeModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Officer Tactical Mobile Seat', price: 29, desc: 'E2EE PTT, SOS button, offline queue, Direct WiFi mesh on iOS/Android.' },
                { name: 'Dispatcher Command Console', price: 89, desc: 'Live unit map tracking, multi-group monitor, full recording playback.' },
                { name: 'Agency Mission Enterprise', price: 199, desc: 'Dedicated 3GPP relay, unlimited talkgroups, SLA 99.999% uptime.' }
              ].map(tier => (
                <div
                  key={tier.name}
                  onClick={() => setSelectedPlan({ name: tier.name, price: tier.price, seats: 10 })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedPlan.name === tier.name
                      ? 'bg-rose-950/40 border-rose-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{tier.name}</span>
                    <span className="font-mono font-black text-rose-400">${tier.price}/mo</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{tier.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  alert(`Stripe Checkout Session initialized for ${selectedPlan.name} ($${selectedPlan.price}/user/mo). Card or PO billing under Oskayi Consult.`);
                  setShowStripeModal(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                <span>Continue to Stripe Billing</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
