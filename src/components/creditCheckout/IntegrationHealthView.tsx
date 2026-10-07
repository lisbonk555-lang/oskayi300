import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Zap,
  ShieldCheck,
  Building2,
  Database,
  Globe,
  Lock,
  Cpu
} from 'lucide-react';
import { IntegrationHealthReport } from '../../types/creditCheckout';

export const IntegrationHealthView: React.FC = () => {
  const [healthData, setHealthData] = useState<IntegrationHealthReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pinging, setPinging] = useState<string | null>(null);
  const [pingResult, setPingResult] = useState<{ target: string; latencyMs: number; status: string } | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/credit-checkout/health');
      const data = await res.json();
      setHealthData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const handleActivePing = async (target: string) => {
    setPinging(target);
    try {
      const res = await fetch('/api/credit-checkout/health/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target })
      });
      const data = await res.json();
      setPingResult(data);
      await fetchHealth();
    } catch (e) {
      console.error(e);
    } finally {
      setPinging(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            <span>Live Integration Diagnostics &amp; Health Probes</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time ping probes to database, credit APIs, paymasters, underwriters, and blockchain RPCs.
          </p>
        </div>

        <button
          onClick={fetchHealth}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-2 hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Probes</span>
        </button>
      </div>

      {pingResult && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-mono flex items-center justify-between">
          <span>Active probe to [{pingResult.target}] returned status: <strong>{pingResult.status}</strong> in {pingResult.latencyMs}ms.</span>
          <button onClick={() => setPingResult(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Services Health Grid */}
      {healthData && (
        <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
          {/* Database */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white">{healthData.services.database.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                {healthData.services.database.status}
              </span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-1">
              <div>Latency: <span className="text-emerald-400 font-bold">{healthData.services.database.latencyMs}ms</span></div>
              <div>Records Stored: <span className="text-white font-bold">{healthData.services.database.recordsCount}</span></div>
              <div className="text-[10px] text-slate-500">{healthData.services.database.details}</div>
            </div>
          </div>

          {/* Credit Providers */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-white">{healthData.services.creditProviders.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                {healthData.services.creditProviders.status}
              </span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-1">
              <div>Connected Providers: <span className="text-white font-bold">{healthData.services.creditProviders.connectedProvidersCount} Active</span></div>
              <div>Last Ping: <span className="text-emerald-400 font-bold">{healthData.services.creditProviders.lastPingMs}ms</span></div>
              <div className="text-[10px] text-slate-400 truncate">
                {healthData.services.creditProviders.activeProviders.join(', ')}
              </div>
            </div>
          </div>

          {/* Gas Sponsors / Paymasters */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white">{healthData.services.gasSponsors.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                {healthData.services.gasSponsors.status}
              </span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-1">
              <div>Active Paymasters: <span className="text-white font-bold">{healthData.services.gasSponsors.activePaymastersCount}</span></div>
              <div>Last Ping: <span className="text-emerald-400 font-bold">{healthData.services.gasSponsors.lastPingMs}ms</span></div>
              <div className="text-[10px] text-slate-400 truncate">
                Chains: {healthData.services.gasSponsors.chainsSupported.join(', ')}
              </div>
            </div>
          </div>

          {/* Insurance Underwriting Consortium */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">{healthData.services.insuranceProviders.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                {healthData.services.insuranceProviders.status}
              </span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-1">
              <div>Underwriters: <span className="text-white font-bold">{healthData.services.insuranceProviders.activeUnderwritersCount} Live</span></div>
              <div>Last Ping: <span className="text-emerald-400 font-bold">{healthData.services.insuranceProviders.lastPingMs}ms</span></div>
              <div className="text-[10px] text-slate-500">NIC Ghana authorized claim processing desk</div>
            </div>
          </div>

          {/* Blockchain RPC Node */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white">{healthData.services.blockchainRpc.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                {healthData.services.blockchainRpc.status}
              </span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-1">
              <div>Block Height: <span className="text-white font-bold">{healthData.services.blockchainRpc.blockHeight}</span></div>
              <div>Chain: <span className="text-slate-300">{healthData.services.blockchainRpc.chain}</span></div>
              <div>Latency: <span className="text-emerald-400 font-bold">{healthData.services.blockchainRpc.lastPingMs}ms</span></div>
            </div>
            <button
              onClick={() => handleActivePing('rpc')}
              disabled={pinging === 'rpc'}
              className="w-full py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-bold"
            >
              {pinging === 'rpc' ? 'Probing RPC...' : 'Trigger Live RPC Probe'}
            </button>
          </div>

          {/* Payment Gateways */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">{healthData.services.paymentGateways.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                {healthData.services.paymentGateways.status}
              </span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-1">
              <div>Settlement Currency: <span className="text-white font-bold">{healthData.services.paymentGateways.currency}</span></div>
              <div>Operating Mode: <span className="text-amber-300 font-bold">{healthData.services.paymentGateways.mode}</span></div>
              <div>Latency: <span className="text-emerald-400 font-bold">{healthData.services.paymentGateways.lastPingMs}ms</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
