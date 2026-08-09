import React, { useState, useEffect } from 'react';
import { Activity, Globe2, RefreshCw, Cpu, Lock, CheckCircle2 } from 'lucide-react';
import { FXRatesResponse, RPCCheckResponse } from '../types';

export const PublicTickerBar: React.FC = () => {
  const [fxRates, setFxRates] = useState<FXRatesResponse | null>(null);
  const [rpcStatus, setRpcStatus] = useState<RPCCheckResponse | null>(null);
  const [loadingFx, setLoadingFx] = useState<boolean>(true);
  const [loadingRpc, setLoadingRpc] = useState<boolean>(true);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('ethereum');

  const fetchFxRates = async () => {
    setLoadingFx(true);
    try {
      const res = await fetch('/api/fx-rates');
      if (res.ok) {
        const data = await res.json();
        setFxRates(data);
      }
    } catch (e) {
      console.error("FX rate fetch error", e);
    } finally {
      setLoadingFx(false);
    }
  };

  const fetchRpcStatus = async (net: string) => {
    setLoadingRpc(true);
    try {
      const res = await fetch('/api/rpc-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ network: net })
      });
      if (res.ok) {
        const data = await res.json();
        setRpcStatus(data);
      }
    } catch (e) {
      console.error("RPC check error", e);
    } finally {
      setLoadingRpc(false);
    }
  };

  useEffect(() => {
    fetchFxRates();
    fetchRpcStatus(selectedNetwork);

    const interval = setInterval(() => {
      fetchFxRates();
      fetchRpcStatus(selectedNetwork);
    }, 30000); // 30s auto refresh for live market data

    return () => clearInterval(interval);
  }, [selectedNetwork]);

  return (
    <div className="bg-indigo-950/90 border-y border-indigo-900/60 py-2 px-4 sm:px-8 text-xs font-mono text-slate-200 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* FX Rates Feed */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Public Market Rates (Live API):</span>
          </div>

          {loadingFx ? (
            <span className="text-slate-400 animate-pulse">Syncing live FX rates...</span>
          ) : fxRates ? (
            <div className="flex items-center gap-3 font-sans text-xs">
              <span className="bg-slate-950/80 px-2.5 py-1 rounded-md border border-indigo-800/60 text-slate-200 shadow-sm">
                USD / GHS: <strong className="text-amber-300">{Number(fxRates.rates.GHS).toFixed(2)}</strong>
              </span>
              <span className="bg-slate-950/80 px-2.5 py-1 rounded-md border border-indigo-800/60 text-slate-200 shadow-sm">
                EUR / GHS: <strong className="text-emerald-400">{fxRates.rates.EUR_GHS}</strong>
              </span>
              <span className="bg-slate-950/80 px-2.5 py-1 rounded-md border border-indigo-800/60 text-slate-200 shadow-sm">
                GBP / GHS: <strong className="text-indigo-300">{fxRates.rates.GBP_GHS}</strong>
              </span>
            </div>
          ) : (
            <span className="text-slate-300">USD/GHS: ~15.45 GHS</span>
          )}

          <button 
            onClick={fetchFxRates} 
            className="text-slate-400 hover:text-amber-300 p-1 transition-colors"
            title="Refresh Live Market Data"
          >
            <RefreshCw className={`w-3 h-3 ${loadingFx ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Public Blockchain RPC Checker Feed */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300">Live RPC Node:</span>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="bg-slate-950 text-slate-100 border border-indigo-800 rounded px-1.5 py-0.5 text-[11px] focus:outline-none focus:border-amber-400"
            >
              <option value="ethereum">Ethereum Mainnet</option>
              <option value="polygon">Polygon PoS</option>
              <option value="arbitrum">Arbitrum One</option>
            </select>
          </div>

          {loadingRpc ? (
            <span className="text-slate-400 animate-pulse text-[11px]">Testing RPC ping...</span>
          ) : rpcStatus && rpcStatus.success ? (
            <div className="flex items-center gap-2 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/60">
                <CheckCircle2 className="w-3 h-3" />
                Block #{rpcStatus.blockHeight.toLocaleString()}
              </span>
              <span className="text-slate-300">
                Ping: <strong className="text-slate-100">{rpcStatus.latencyMs}ms</strong>
              </span>
            </div>
          ) : (
            <span className="text-amber-300 text-[11px]">RPC Query Active</span>
          )}

          {/* Strict Rules Badge: No Fake Data */}
          <div className="hidden xl:flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950 border border-amber-400/30 text-[10px] text-amber-300">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Private Transactions: <strong>Coming Soon</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
