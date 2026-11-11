import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  ExternalLink, 
  FileText, 
  Video, 
  LayoutGrid, 
  Search, 
  Clock, 
  Globe, 
  TrendingUp, 
  CheckCircle2, 
  Send, 
  ArrowUpRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { TrendingHeadline } from '../../server/mediaMachineService';

interface HunterAgentConsoleProps {
  headlines: TrendingHeadline[];
  lastHunterRun: string;
  onRunHunter: () => void;
  isHunting: boolean;
  onSendToBlogger: (headlineId: string) => void;
  onSendToVideo: (headlineId: string) => void;
  onSendToApp: (headlineId: string) => void;
}

export const HunterAgentConsole: React.FC<HunterAgentConsoleProps> = ({
  headlines,
  lastHunterRun,
  onRunHunter,
  isHunting,
  onSendToBlogger,
  onSendToVideo,
  onSendToApp
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const topHeadline = headlines[0];

  const filteredHeadlines = headlines.filter(h => {
    const matchesCategory = selectedCategory === 'all' || h.category === selectedCategory;
    const matchesSearch = h.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          h.source_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDispatch = (type: 'blog' | 'video' | 'app', headline: TrendingHeadline) => {
    if (type === 'blog') {
      onSendToBlogger(headline.id);
      setActionNotice(`Dispatched headline to Blogger Agent: "${headline.title.slice(0, 45)}..."`);
    } else if (type === 'video') {
      onSendToVideo(headline.id);
      setActionNotice(`Dispatched headline to Video Agent: "${headline.title.slice(0, 45)}..."`);
    } else {
      onSendToApp(headline.id);
      setActionNotice(`Dispatched headline to App Builder Agent: "${headline.title.slice(0, 45)}..."`);
    }
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Top Banner Status Box */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0A1F44] via-slate-900 to-[#0A1F44] border border-[#FFD700]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Hunter Agent • Continuous 1-Hour Automated Wire Polling
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Hunter found <span className="text-[#FFD700]">100 headlines</span> at {new Date(lastHunterRun || Date.now()).toLocaleTimeString()}
            </h1>
            
            {topHeadline && (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-[#FFD700] uppercase tracking-wider block mb-0.5">Top Trending Wire:</span>
                <span className="font-medium text-white">{topHeadline.title}</span>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-3">
                  <span>Score: <strong className="text-[#FFD700] font-mono">{topHeadline.score}/100</strong></span>
                  <span>Source: {topHeadline.source_name}</span>
                  <span className="text-emerald-400">✓ Deduplicated & Verified</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onRunHunter}
              disabled={isHunting}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#FFD700]/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isHunting ? 'animate-spin' : ''}`} />
              {isHunting ? 'Hunting News Wires...' : 'Run Hunter Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="p-4 rounded-2xl bg-[#0A1F44] border border-[#FFD700]/60 text-[#FFD700] text-xs flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-thin">
          {['all', 'business', 'ghana', 'sports', 'energy', 'tech', 'world'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All 100 Headlines' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search headlines, commodities, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
          />
        </div>
      </div>

      {/* Top 100 Headlines Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Ranked by Proprietary Algorithmic Score (Showing {filteredHeadlines.length})</span>
          <span className="text-[#FFD700]">Supabase Table: trending_news</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHeadlines.map((h, index) => (
            <div
              key={h.id}
              className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-300">
                      #{index + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-[#FFD700]">
                      {h.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {h.source_name}
                    </span>
                  </div>

                  <div className="px-2.5 py-1 rounded-xl bg-[#0A1F44] border border-[#FFD700]/50 text-[#FFD700] text-xs font-black font-mono flex items-center gap-1 shrink-0">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>{h.score}/100</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors leading-snug mb-2">
                  {h.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {h.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {h.scoring_factors.map((f, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <a
                  href={h.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  Source <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDispatch('blog', h)}
                    className="px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[11px] font-bold flex items-center gap-1 transition-colors"
                    title="Write original 800-word corporate blog article"
                  >
                    <FileText className="w-3 h-3" />
                    Blog
                  </button>

                  <button
                    onClick={() => handleDispatch('video', h)}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold flex items-center gap-1 transition-colors"
                    title="Render 60s 9:16 vertical Short"
                  >
                    <Video className="w-3 h-3" />
                    Video
                  </button>

                  <button
                    onClick={() => handleDispatch('app', h)}
                    className="px-2.5 py-1 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 text-[11px] font-bold flex items-center gap-1 transition-colors"
                    title="Build live utility tool web app"
                  >
                    <LayoutGrid className="w-3 h-3" />
                    App
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
