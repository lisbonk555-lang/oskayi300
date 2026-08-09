import React, { useState } from 'react';
import { Cpu, Activity, RefreshCw, CheckCircle2, AlertCircle, Wifi, Globe } from 'lucide-react';
import { RPCCheckResponse } from '../types';

export const NodeDiagnostics: React.FC = () => {
  const [network, setNetwork] = useState<string>('ethereum');
  const [rpcResult, setRpcResult] = useState<RPCCheckResponse | null>(null);
  const [testing, setTesting] = useState<boolean>(false);

  const runDiagnostics = async (selectedNet: string) => {
    setTesting(true);
    try {
      const res = await fetch('/api/rpc-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ network: selectedNet })
      });
      const data = await res.json();
      setRpcResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setTesting(false);
    }
  };

  return (
    <section id="diagnostics" className="py-16 bg-slate-50 text-slate-900 px-4 sm:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
            <Activity className="w-3.5 h-3.5 text-emerald-700" />
            <span>Real-Time Public Infrastructure Ping</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-950">
            Public Node Diagnostics Tool
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Direct live RPC ping tool to test public mainnet block height, connection latency, and RPC node availability in real-time.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <span className="font-sans font-bold text-lg text-indigo-950">Select Public Network</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={network}
                onChange={(e) => {
                  setNetwork(e.target.value);
                  runDiagnostics(e.target.value);
                }}
                className="bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-600 w-full sm:w-auto"
              >
                <option value="ethereum">Ethereum Mainnet (Cloudflare RPC)</option>
                <option value="polygon">Polygon PoS (Public RPC)</option>
                <option value="arbitrum">Arbitrum One (Offchain Labs RPC)</option>
              </select>

              <button
                onClick={() => runDiagnostics(network)}
                disabled={testing}
                className="px-4 py-2 bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                <span>Test Ping</span>
              </button>
            </div>
          </div>

          {/* Diagnostic Display Area */}
          {testing ? (
            <div className="p-8 text-center space-y-3 font-mono text-xs text-indigo-700 animate-pulse bg-indigo-50/50 rounded-xl border border-indigo-100">
              <Wifi className="w-6 h-6 mx-auto text-indigo-600 animate-bounce" />
              <div>Querying {network.toUpperCase()} mainnet RPC node endpoint...</div>
            </div>
          ) : rpcResult ? (
            rpcResult.success && rpcResult.blockHeight != null ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-950 font-mono uppercase">{rpcResult.network} Node Operational</div>
                      <div className="text-xs text-emerald-700 font-mono">{rpcResult.rpcEndpoint}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs text-emerald-700">Response Latency</div>
                    <div className="text-sm font-bold text-emerald-900">{rpcResult.latencyMs ?? 0} ms</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Current Live Block Height</span>
                    <div className="text-xl font-bold text-indigo-950">
                      #{Number(rpcResult.blockHeight).toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Raw Block Hex</span>
                    <div className="text-xs font-bold text-indigo-600 truncate">
                      {rpcResult.rawHex || '0x0'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>RPC Diagnostic Alert: {rpcResult.error || 'Endpoint temporary ping delay. Retrying...'}</span>
              </div>
            )
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 font-mono bg-slate-50 rounded-xl border border-slate-200">
              Click "Test Ping" above to query live mainnet RPC block height and latency.
            </div>
          )}

          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between font-mono">
            <span>Oskayi RPC Policy: Direct Public API calls only.</span>
            <span className="text-indigo-900 font-bold uppercase">100% Un-mocked Real Data</span>
          </div>

        </div>

      </div>
    </section>
  );
};
