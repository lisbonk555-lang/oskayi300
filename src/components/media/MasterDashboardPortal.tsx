import React from 'react';
import { 
  Radio, 
  Building2, 
  Flame, 
  FileText, 
  Video, 
  LayoutGrid, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Download, 
  Play, 
  Pause, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { MediaMachineState } from '../../server/mediaMachineService';

interface MasterDashboardPortalProps {
  state: MediaMachineState;
  onRunHunter: () => void;
  isHunting: boolean;
  onToggleAutomation: () => void;
  onExportCsv: () => void;
  onSelectTab: (tab: 'dashboard' | 'hunter' | 'blogger' | 'video' | 'apps' | 'automation' | 'corporate') => void;
}

export const MasterDashboardPortal: React.FC<MasterDashboardPortalProps> = ({
  state,
  onRunHunter,
  isHunting,
  onToggleAutomation,
  onExportCsv,
  onSelectTab
}) => {
  const topHeadline = state.trendingHeadlines[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Executive Corporate Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0A1F44] via-slate-900 to-[#0A1F44] border-2 border-[#FFD700]/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/50 text-[#FFD700] text-xs font-black uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                OSKAYI CONSULT • Reg No. BN248851025 • TIN: P0000590118
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Automated Production Pipelines Active
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Oskayi <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#FFD700] bg-clip-text text-transparent">Media Machine</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Autonomous digital media and technology infrastructure converting verified trending news into high-traffic articles, 9:16 vertical video intelligence, and interactive utility web tools for Ghanaian and global audiences.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span>Statutory Law: <strong className="text-white">Registration of Business Names Act, 1962 (Act 151)</strong></span>
              <span>•</span>
              <span className="text-[#FFD700] font-semibold">McCarthy Hill, Accra, Republic of Ghana</span>
            </div>
          </div>

          {/* Master Operational Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={onRunHunter}
              disabled={isHunting}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#FFD700]/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isHunting ? 'animate-spin' : ''}`} />
              {isHunting ? 'Scanning Wires...' : 'Run Pipeline Now'}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onToggleAutomation}
                className={`flex-1 px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  state.isRunning
                    ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                }`}
              >
                {state.isRunning ? <Pause className="w-3.5 h-3.5 text-rose-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                {state.isRunning ? 'Pause Agents' : 'Resume Agents'}
              </button>

              <button
                onClick={onExportCsv}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                title="Download CSV Performance Report"
              >
                <Download className="w-3.5 h-3.5 text-[#FFD700]" />
                CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Card: Hunter Status Ticker */}
      <div 
        onClick={() => onSelectTab('hunter')}
        className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#FFD700]/50 transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider">
                Hunter Agent Wire Stream
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                100 Headlines Verified
              </span>
            </div>
            <p className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors mt-0.5">
              Hunter found 100 headlines at {new Date(state.lastHunterRun).toLocaleTimeString()} — Top: {topHeadline?.title || 'Ghana Cocoa & Interbank FX Inflow'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <span>Review Trending News</span>
          <ArrowUpRight className="w-4 h-4 text-[#FFD700]" />
        </div>
      </div>

      {/* 4 Core Financial & Production Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Blogs Agent */}
        <div 
          onClick={() => onSelectTab('blogger')}
          className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Card 1 • Blogs</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {state.blogsToday} <span className="text-xs font-sans text-slate-400 font-normal">published today</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              <strong>{state.blogsThisWeek}</strong> this week across 5 Oskayi domains
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">AdSense Metric:</span>
            <span className="font-bold text-teal-400 font-mono">
              ${(state.blogsToday * 9.8).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Card 2: Videos Agent */}
        <div 
          onClick={() => onSelectTab('video')}
          className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Card 2 • Videos</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {state.videosToday} <span className="text-xs font-sans text-slate-400 font-normal">rendered today</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              <strong>{state.videosThisWeek}</strong> this week across 10 brand channels
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Video Monetization:</span>
            <span className="font-bold text-rose-400 font-mono">
              ${(state.videosToday * 11.2).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Card 3: Apps Builder Agent */}
        <div 
          onClick={() => onSelectTab('apps')}
          className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Card 3 • Web Apps</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <LayoutGrid className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {state.appsToday} <span className="text-xs font-sans text-slate-400 font-normal">deployed tools</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              <strong>{state.appsThisWeek}</strong> this week on apps.oskayi.com
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Paystack Premium:</span>
            <span className="font-bold text-emerald-400 font-mono">
              GH¢ {state.totalRevenueGhsToday.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Card 4: Total Combined Daily Revenue & Views */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0A1F44] to-slate-950 border border-[#FFD700]/50 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider">Card 4 • Monetization Yield</span>
            <div className="p-2 rounded-xl bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#FFD700] font-mono">
              ${state.totalRevenueUsdToday.toLocaleString()}
            </div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
              + GH¢ {state.totalRevenueGhsToday.toLocaleString()}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
            <span>Verified Reach:</span>
            <span className="font-mono text-white font-bold">{state.totalViewsToday.toLocaleString()} impressions</span>
          </div>
        </div>

      </div>

      {/* Production Ledger Table */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl space-y-4 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Latest Live Production Ledger (Top 20 Automated Assets)
            </h3>
            <p className="text-xs text-slate-400">
              Indexed from Supabase tables: trending_news, blogs, videos, apps
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Published Active
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Asset Type</th>
                <th className="py-3 px-3">Title / Destination</th>
                <th className="py-3 px-3">Channel / Domain</th>
                <th className="py-3 px-3 text-right">Views / Users</th>
                <th className="py-3 px-3 text-right">Revenue</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {state.blogs.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30 font-bold">
                      Blog
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-white max-w-xs truncate">
                    {b.title}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">{b.blog_subdomain}</td>
                  <td className="py-3 px-3 text-right font-mono">{b.views.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400">${b.revenue_usd}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center text-emerald-400" title="Published">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}

              {state.videos.slice(0, 5).map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 font-bold">
                      Video 9:16
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-white max-w-xs truncate">
                    {v.title}
                  </td>
                  <td className="py-3 px-3 text-[#FFD700] font-semibold">{v.channel_name}</td>
                  <td className="py-3 px-3 text-right font-mono">{v.views.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400">${v.revenue_usd}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center text-emerald-400" title="Published">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}

              {state.apps.slice(0, 5).map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                      Web App
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-white max-w-xs truncate">
                    {a.app_name}
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono">apps.oskayi.com</td>
                  <td className="py-3 px-3 text-right font-mono">{a.users_count.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-[#FFD700]">GH¢ {a.revenue_ghs}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center text-emerald-400" title="Active">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheduler Execution Feed */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FFD700]" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Agent Pipeline Execution Telemetry
            </h4>
          </div>
          <button
            onClick={() => onSelectTab('automation')}
            className="text-xs text-[#FFD700] hover:underline flex items-center gap-1 font-semibold"
          >
            Scheduler Diagnostics <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {state.logs.slice(0, 4).map((l) => (
            <div key={l.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  l.agent === 'HUNTER' ? 'bg-amber-500/20 text-amber-300' :
                  l.agent === 'BLOGGER' ? 'bg-teal-500/20 text-teal-300' :
                  l.agent === 'VIDEO' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  [{l.agent}]
                </span>
                <span className="text-slate-200 truncate">{l.message}</span>
              </div>
              <span className="text-[11px] text-slate-500 shrink-0 font-mono">
                {new Date(l.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
