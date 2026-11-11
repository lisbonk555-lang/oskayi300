import React from 'react';
import { 
  Cpu, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Play, 
  Pause, 
  Key, 
  Server, 
  Zap, 
  Layers, 
  RefreshCw 
} from 'lucide-react';
import { SchedulerLog } from '../../server/mediaMachineService';

interface AutomationSchedulerConsoleProps {
  logs: SchedulerLog[];
  isRunning: boolean;
  onToggleRunning: () => void;
  onRunNow: () => void;
}

export const AutomationSchedulerConsole: React.FC<AutomationSchedulerConsoleProps> = ({
  logs,
  isRunning,
  onToggleRunning,
  onRunNow
}) => {
  const schedulers = [
    {
      name: 'Hunter Agent',
      frequency: 'Every 1 Hour',
      nextRun: 'In 18 minutes',
      target: '100 Headlines Scored & Deduplicated',
      status: 'ACTIVE_24_7',
      rail: 'Google Cloud Scheduler -> Worker'
    },
    {
      name: 'Blogger Agent',
      frequency: 'Every 20 Minutes',
      nextRun: 'In 6 minutes',
      target: '71 Posts / Day (500 / Week across 5 Blogs)',
      status: 'ACTIVE_24_7',
      rail: 'Blogger API v3 + Pollinations.ai'
    },
    {
      name: 'Video Agent',
      frequency: 'Every 15 Minutes',
      nextRun: 'In 4 minutes',
      target: '100 Shorts / Day (10 YouTube & TikTok Channels)',
      status: 'ACTIVE_24_7',
      rail: 'Edge TTS + FFmpeg Pipeline'
    },
    {
      name: 'App Builder Agent',
      frequency: 'Daily at 2:00 AM UTC',
      nextRun: 'Tonight at 02:00',
      target: '14 Web Apps / Day (100 / Week on apps.oskayi.com)',
      status: 'ACTIVE_24_7',
      rail: 'Vercel API + GitHub Automation'
    },
    {
      name: 'Portal Dashboard Telemetry',
      frequency: 'Every 5 Minutes',
      nextRun: 'In 1 minute',
      target: 'Supabase Sync & AdSense Ledger Audit',
      status: 'ACTIVE_24_7',
      rail: 'Supabase PostgreSQL Client'
    }
  ];

  const envKeys = [
    { key: 'GEMINI_API_KEY', status: 'Active (Built-in @google/genai SDK)' },
    { key: 'GNEWS_API_KEY', status: 'Configured / Multi-Wire Fallback' },
    { key: 'NEWSDATA_KEY', status: 'Configured / Wire Verified' },
    { key: 'BLOGGER_CLIENT_ID', status: 'Active OAuth Endpoint' },
    { key: 'YOUTUBE_API_KEY', status: 'YouTube Data API v3 Active' },
    { key: 'PAYSTACK_PUBLIC_KEY', status: 'Live GhIPSS & MoMo Gateway' },
    { key: 'ELEVENLABS_KEY', status: 'Studio Voice Synthesis Pipeline' },
    { key: 'SUPABASE_URL', status: 'Active PostgreSQL Storage' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0A1F44] via-slate-900 to-[#0A1F44] border border-[#FFD700]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              24/7 Autonomous Cron & Cloud Run Architecture
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Scheduler & <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#FFD700] bg-clip-text text-transparent">Automation Engine</span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Self-healing multi-agent pipeline designed to execute continuously offline. Automated quality checks, retry logic, and zero-downtime multi-platform syndication.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleRunning}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-rose-950/80 border-rose-500/50 text-rose-300 hover:bg-rose-900'
                  : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Emergency Pause All' : 'Resume 24/7 Scheduling'}
            </button>
            <button
              onClick={onRunNow}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-[#FFD700] text-[#0A1F44] font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#FFD700]/20"
            >
              <Zap className="w-4 h-4" />
              Run Tick Now
            </button>
          </div>
        </div>
      </div>

      {/* Schedulers Matrix Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider">
          Scheduled Agent Intervals & Pipeline Health
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedulers.map((sch, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{sch.name}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {sch.status}
                </span>
              </div>
              <div className="text-xs space-y-1 text-slate-400">
                <div>Frequency: <strong className="text-slate-200">{sch.frequency}</strong></div>
                <div>Next Trigger: <strong className="text-[#FFD700]">{sch.nextRun}</strong></div>
                <div>Target Output: <span className="text-slate-300">{sch.target}</span></div>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                {sch.rail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Keys & Safety Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Environment Security Status */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-[#FFD700] font-bold text-sm uppercase tracking-wider">
            <Key className="w-4 h-4" />
            Environment API Security Credentials
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All API tokens and credentials are securely loaded into isolated server environment memory. Frontend never exposes private service keys.
          </p>

          <div className="space-y-2 text-xs">
            {envKeys.map((ek, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="font-mono text-slate-300">{ek.key}</span>
                <span className="text-emerald-400 font-semibold">{ek.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Safety & Cost Architecture */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Operational Safety & Compliance Rules
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">1. Always Include Source Links</strong>
              Every blog and video description includes the original news wire attribution and external URL.
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">2. Mandatory Synthetic Content Disclosure</strong>
              All YouTube Shorts generated with AI narration have the `Altered or synthetic content` flag set to YES automatically.
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">3. Royalty-Free Soundtrack Rotation</strong>
              Uses vetted audio libraries (Pixabay & orchestral corporate themes) with continuous rotation so no two consecutive videos share music.
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">4. Scalable Cost Optimization</strong>
              Runs with Gemini Free Tier, Vercel Hobby, and Pollinations.ai. Scales cleanly to €49/mo for dedicated enterprise throughput.
            </div>
          </div>
        </div>

      </div>

      {/* Execution Logs Terminal */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Scheduler Telemetry Feed ({logs.length} Events)
          </span>
          <span className="text-[11px] text-slate-500 font-mono">Continuous event log</span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-2 font-mono text-xs">
          {logs.map((log) => (
            <div key={log.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  log.agent === 'HUNTER' ? 'bg-amber-500/20 text-amber-300' :
                  log.agent === 'BLOGGER' ? 'bg-teal-500/20 text-teal-300' :
                  log.agent === 'VIDEO' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  [{log.agent}]
                </span>
                <span className="text-slate-300">{log.message}</span>
              </div>
              <span className="text-slate-500 text-[11px] shrink-0">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
