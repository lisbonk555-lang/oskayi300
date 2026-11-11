import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Battery, 
  BatteryCharging, 
  Activity, 
  Globe, 
  Plus, 
  Play, 
  Pause, 
  ShieldCheck, 
  ArrowUpRight, 
  TrendingUp, 
  CheckCircle2, 
  DollarSign, 
  Sliders, 
  Server,
  Sparkles,
  RefreshCw,
  Cpu,
  Layers,
  MapPin
} from 'lucide-react';
import { GridNodeTelemetry, ConnectedBatteryAsset, GridBalanceDecision } from '../../server/oskayiGridService';

export const OskayiGrid: React.FC = () => {
  const [telemetry, setTelemetry] = useState<GridNodeTelemetry[]>([]);
  const [assets, setAssets] = useState<ConnectedBatteryAsset[]>([]);
  const [balanceLogs, setBalanceLogs] = useState<GridBalanceDecision[]>([]);
  const [selectedNode, setSelectedNode] = useState<string>('GHANA');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // New Battery Connection Form State
  const [newAsset, setNewAsset] = useState({
    asset_name: '',
    owner_name: '',
    location: '',
    capacity_kwh: 2000,
    max_power_kw: 1000,
    grid_node: 'Ghana GRIDCo NITS (Accra-Tema)'
  });

  const fetchGridData = async () => {
    try {
      setIsLoading(true);
      const [telRes, astRes, logRes] = await Promise.all([
        fetch('/api/grid/telemetry'),
        fetch('/api/grid/assets'),
        fetch('/api/grid/logs')
      ]);

      if (telRes.ok) setTelemetry(await telRes.json());
      if (astRes.ok) setAssets(await astRes.json());
      if (logRes.ok) setBalanceLogs(await logRes.json());
    } catch (e) {
      console.error("Failed to load grid data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGridData();
    const interval = setInterval(fetchGridData, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAuto = async (assetId: string) => {
    try {
      const resp = await fetch('/api/grid/battery/toggle-auto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetId })
      });
      if (resp.ok) {
        fetchGridData();
      }
    } catch (e) {
      console.error("Failed to toggle asset auto:", e);
    }
  };

  const handleConnectAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.asset_name || !newAsset.owner_name) return;

    try {
      const resp = await fetch('/api/grid/battery/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAsset)
      });
      if (resp.ok) {
        setIsConnectModalOpen(false);
        setNewAsset({
          asset_name: '',
          owner_name: '',
          location: '',
          capacity_kwh: 2000,
          max_power_kw: 1000,
          grid_node: 'Ghana GRIDCo NITS (Accra-Tema)'
        });
        fetchGridData();
      }
    } catch (e) {
      console.error("Failed to connect asset:", e);
    }
  };

  const activeNodeData = telemetry.find(t => t.region === selectedNode) || telemetry[0];

  const totalConnectedCapacityMwh = (assets.reduce((sum, a) => sum + a.capacity_kwh, 0) / 1000).toFixed(1);
  const totalArbitrageGhs = assets.reduce((sum, a) => sum + a.total_arbitrage_earnings_ghs, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0A1F44] via-slate-900 to-[#0A1F44] border border-[#FFD700]/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700] text-xs font-black uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                Global Virtual Power Plant (VPP) & Grid Arbitrage
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Crusoe Energy Alternative Infrastructure
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Oskayi <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#FFD700] bg-clip-text text-transparent">Grid</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Autonomous energy balancer aggregating commercial battery storage, offgrid solar microgrids, and utility interconnects across ENTSO-E (Europe), Elexon BMRS (UK), EIA (US), and Ghana GRIDCo.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span>Arbitrage Rail: <strong className="text-white">Low-Rate Charge &rarr; Peak Discharge</strong></span>
              <span>•</span>
              <span className="text-[#FFD700] font-semibold">Settlement via Paystack MoMo & Bulk Power Offtake</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setIsConnectModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#FFD700]/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Connect Battery / Solar Asset
            </button>
            <button
              onClick={fetchGridData}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Telemetry
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Performance Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">VPP Total Capacity</span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {totalConnectedCapacityMwh} <span className="text-xs font-sans text-slate-400 font-normal">MWh</span>
          </div>
          <span className="text-xs text-emerald-400 font-semibold block">
            {assets.length} Active Connected Units
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Arbitrage Yield</span>
          <div className="text-2xl sm:text-3xl font-black text-[#FFD700] font-mono">
            GH¢ {totalArbitrageGhs.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 block">
            Settled to asset owners via MoMo / Bank
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Ghana Grid Frequency</span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center gap-2">
            <span>50.04</span> <span className="text-xs font-sans text-slate-400 font-normal">Hz</span>
          </div>
          <span className="text-xs text-emerald-400 font-semibold block">
            Optimal (49.80 – 50.20 Hz tolerance)
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Autonomous AI Status</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            ACTIVE
          </div>
          <span className="text-xs text-slate-400 block">
            Dynamic Peak Shaving Active
          </span>
        </div>

      </div>

      {/* Grid Region Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {['GHANA', 'EUROPE', 'UNITED KINGDOM', 'UNITED STATES'].map(region => (
          <button
            key={region}
            onClick={() => setSelectedNode(region)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedNode === region
                ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {region} GRID
          </button>
        ))}
      </div>

      {/* Live Region Node Telemetry Display */}
      {activeNodeData && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#FFD700] font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" />
                Live Grid Node Telemetry Feed
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {activeNodeData.name}
              </h2>
              <span className="text-xs text-slate-400">{activeNodeData.market_operator}</span>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block uppercase">Real-Time Spot Price</span>
              <div className="text-2xl font-black text-[#FFD700] font-mono">
                {activeNodeData.spot_price_local}
              </div>
              <span className="text-xs text-slate-400 font-mono">(${activeNodeData.spot_price_usd_mwh} / MWh)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">System Frequency</span>
              <div className="text-xl font-black text-white font-mono">{activeNodeData.frequency_hz} Hz</div>
              <span className="text-[10px] text-emerald-400 uppercase font-semibold">Synchronized</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">System Demand</span>
              <div className="text-xl font-black text-white font-mono">{activeNodeData.total_demand_mw.toLocaleString()} MW</div>
              <span className="text-[10px] text-slate-400">Total Baseload + Peak</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">Renewables Penetration</span>
              <div className="text-xl font-black text-emerald-400 font-mono">{activeNodeData.renewable_share_pct}%</div>
              <span className="text-[10px] text-slate-400">Hydro, Solar & Wind Mix</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">Curtailment / Waste</span>
              <div className="text-xl font-black text-amber-400 font-mono">{activeNodeData.curtailment_mw.toLocaleString()} MW</div>
              <span className="text-[10px] text-amber-300">Arbitrage Opportunity</span>
            </div>
          </div>
        </div>
      )}

      {/* Connected Virtual Power Plant Battery Assets Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Connected Virtual Power Plant Assets ({assets.length})
            </h3>
            <p className="text-xs text-slate-400">
              Commercial batteries & off-grid solar arrays auto-balanced by Oskayi AI
            </p>
          </div>

          <button
            onClick={() => setIsConnectModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 border border-slate-700"
          >
            <Plus className="w-3.5 h-3.5 text-[#FFD700]" />
            Add New Asset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Asset & Location</th>
                <th className="py-3 px-3">Capacity & Max Power</th>
                <th className="py-3 px-3">State of Charge (SoC)</th>
                <th className="py-3 px-3">Operating Mode</th>
                <th className="py-3 px-3 text-right">Arbitrage Yield</th>
                <th className="py-3 px-3 text-center">Autonomous AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-bold text-white block">{asset.asset_name}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" /> {asset.location}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className="text-white font-bold">{asset.capacity_kwh.toLocaleString()} kWh</span>
                    <span className="text-slate-400 block text-[10px]">Max: {asset.max_power_kw} kW</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full ${asset.current_soc_pct > 50 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                          style={{ width: `${asset.current_soc_pct}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-white">{asset.current_soc_pct}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      asset.current_status === 'charging' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                      asset.current_status === 'discharging' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {asset.current_status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className="text-[#FFD700] font-bold text-sm block">GH¢ {asset.total_arbitrage_earnings_ghs.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500">{asset.total_mwh_dispatched} MWh dispatched</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleToggleAuto(asset.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        asset.autonomous_balancing_active
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {asset.autonomous_balancing_active ? 'ON (Auto)' : 'Manual'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Autonomous Dispatch & Arbitrage Decision Stream */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" />
          Autonomous Dispatch & Arbitrage Execution Ledger
        </span>

        <div className="space-y-2">
          {balanceLogs.map((log, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    log.action === 'CHARGE_SURPLUS' ? 'bg-blue-500/20 text-blue-300' :
                    log.action === 'DISCHARGE_PEAK' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {log.action}
                  </span>
                  <span className="font-bold text-white">{log.node}</span>
                  <span className="text-slate-500 text-[11px] font-mono">Trigger: ${log.price_trigger_usd}/MWh</span>
                </div>
                <p className="text-slate-300 text-[11px]">{log.reason}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-emerald-400 font-bold font-mono text-sm block">
                  +GH¢ {log.estimated_profit_ghs.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect Battery Asset Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-3xl bg-slate-900 border border-[#FFD700] p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-[#FFD700]" />
                <span className="font-bold text-white text-base">Onboard Battery / Solar Asset</span>
              </div>
              <button 
                onClick={() => setIsConnectModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConnectAsset} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Asset Name / Installation Tag *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tema Cold Store 2MWh Battery Array"
                  value={newAsset.asset_name}
                  onChange={(e) => setNewAsset({ ...newAsset, asset_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Owner / Corporate Entity *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Volta Agro Foods Ltd"
                  value={newAsset.owner_name}
                  onChange={(e) => setNewAsset({ ...newAsset, owner_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Installation Physical Location</label>
                <input
                  type="text"
                  placeholder="e.g. Plot 42, Heavy Industrial Area, Tema, Ghana"
                  value={newAsset.location}
                  onChange={(e) => setNewAsset({ ...newAsset, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Storage Capacity (kWh)</label>
                  <input
                    type="number"
                    value={newAsset.capacity_kwh}
                    onChange={(e) => setNewAsset({ ...newAsset, capacity_kwh: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Inverter Power (kW)</label>
                  <input
                    type="number"
                    value={newAsset.max_power_kw}
                    onChange={(e) => setNewAsset({ ...newAsset, max_power_kw: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Interconnect Node</label>
                <select
                  value={newAsset.grid_node}
                  onChange={(e) => setNewAsset({ ...newAsset, grid_node: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#FFD700]"
                >
                  <option value="Ghana GRIDCo NITS (Accra-Tema)">Ghana GRIDCo NITS (Accra-Tema Industrial)</option>
                  <option value="Ghana GRIDCo NITS (Middle Belt)">Ghana GRIDCo NITS (Middle Belt - Kumasi/Sunyani)</option>
                  <option value="ENTSO-E Central Western European Grid">ENTSO-E Central Western Europe</option>
                  <option value="Elexon BMRS National Grid ESO (UK)">Elexon BMRS National Grid (UK)</option>
                  <option value="US EIA CAISO / ERCOT">US EIA CAISO / ERCOT Grid</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#FFD700]/20 active:scale-95"
              >
                Register & Activate AI Balancing
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
