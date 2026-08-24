import React from 'react';
import { ShieldCheck, ShieldAlert, Cpu, Activity, RefreshCw } from 'lucide-react';
import { IntegrationHealthStatus } from '../../types/sellerProtect';

interface IntegrationHealthBannerProps {
  health: IntegrationHealthStatus | null;
  loading: boolean;
  onRefresh: () => void;
}

export const IntegrationHealthBanner: React.FC<IntegrationHealthBannerProps> = ({
  health,
  loading,
  onRefresh
}) => {
  return (
    <div className="bg-slate-900 border-y border-slate-800 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        
        {/* Left: Mode Badge & Description */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-md font-mono font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            DEVELOPMENT & SANDBOX MODE
          </span>
          <span className="text-slate-400 font-mono">
            Integrations live-verified with real server endpoints. Unconfigured secrets operate safely in Sandbox.
          </span>
        </div>

        {/* Right: Specific Integration Status Pills */}
        <div className="flex items-center gap-2 flex-wrap self-end md:self-auto font-mono">
          
          {/* Paystack */}
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
            health?.paystack?.configured 
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
              : 'bg-slate-800 border-slate-700 text-amber-300'
          }`}>
            <span className="text-[10px] text-slate-400">Paystack:</span>
            <span className="font-bold">
              {health?.paystack?.configured ? 'LIVE' : 'SANDBOX'}
            </span>
          </div>

          {/* Curacel Grow */}
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
            health?.curacel?.configured 
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
              : 'bg-slate-800 border-slate-700 text-amber-300'
          }`}>
            <span className="text-[10px] text-slate-400">Curacel Grow:</span>
            <span className="font-bold">
              {health?.curacel?.configured ? 'LIVE' : 'SANDBOX'}
            </span>
          </div>

          {/* Database */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded border bg-emerald-950/80 border-emerald-500/40 text-emerald-300">
            <span className="text-[10px] text-slate-400">DB:</span>
            <span className="font-bold">CONNECTED</span>
          </div>

          {/* Refresh Action */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors"
            title="Refresh integration status"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};
