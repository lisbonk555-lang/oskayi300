import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  TrendingUp, 
  Zap, 
  Building2, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter, 
  CheckCircle2, 
  X, 
  Sparkles, 
  RefreshCw, 
  Share2, 
  FileText, 
  BookOpen, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Activity,
  Layers,
  Award
} from 'lucide-react';
import { generateHourlyNewsArticles, NewsArticle } from '../data/newsData';

interface NewsAndArticlesSectionProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export const NewsAndArticlesSection: React.FC<NewsAndArticlesSectionProps> = ({
  onSelectServiceForInquiry
}) => {
  const [newsData, setNewsData] = useState<{
    articles: NewsArticle[];
    currentHourNumber: number;
    nextHourlyRefreshSeconds: number;
  }>(() => generateHourlyNewsArticles());

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(newsData.nextHourlyRefreshSeconds);

  // Hourly countdown timer and automatic dynamic hourly updates
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          // Hourly boundary reached: refresh with new batch of 10 hourly updates
          const fresh = generateHourlyNewsArticles();
          setNewsData(fresh);
          return fresh.nextHourlyRefreshSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleManualRefresh = () => {
    const fresh = generateHourlyNewsArticles();
    setNewsData(fresh);
    setSecondsRemaining(fresh.nextHourlyRefreshSeconds);
  };

  const handleCopyBrief = (article: NewsArticle) => {
    const text = `${article.title}\n\n${article.summary}\n\nCategory: ${article.category}\nPublished: ${article.publishedAt}\nOskayi Consult Intelligence Desk`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const categories = [
    'ALL',
    'Infrastructure Financing',
    'Modern Fintech Solutions',
    'Global & African Growth',
    'Sovereign Markets & Yields'
  ];

  const filteredArticles = newsData.articles.filter(art => {
    const matchesCategory = selectedCategory === 'ALL' || art.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="news-articles" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Automated Institutional Intelligence Desk</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              News & Strategic Updates: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500">
                Empowering African & Global Growth
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time research, syndicated debt disclosures, and analytical breakdowns on infrastructure financing and modern fintech solutions across African and global corridors.
            </p>
          </div>

          {/* Live Hourly Ticker Badge & Refresh Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 self-start md:self-auto min-w-[280px]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">Live Hourly Feed Active</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Hour {newsData.currentHourNumber}:00 UTC
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
              <span>Next 10 Updates in:</span>
              <span className="text-white font-bold text-sm tracking-wider">
                {formatCountdown(secondsRemaining)}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">10 New Dispatches / Hour</span>
              <button
                onClick={handleManualRefresh}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                title="Poll Latest Real-Time Feed"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Poll Feed</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'All Updates (10)' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, topics, rails..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => {
            const isFeatured = idx === 0 && selectedCategory === 'ALL';
            return (
              <div
                key={article.id}
                className={`rounded-3xl transition-all border flex flex-col justify-between ${
                  isFeatured
                    ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border-amber-400/50 p-7 shadow-xl ring-1 ring-amber-400/20'
                    : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700 p-6 shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Card Meta Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      article.category === 'Infrastructure Financing'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : article.category === 'Modern Fintech Solutions'
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                        : article.category === 'Global & African Growth'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                    }`}>
                      {article.category}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{article.publishedAt.split('(')[0]}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors ${
                    isFeatured ? 'text-xl sm:text-2xl' : 'text-base'
                  }`}>
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Telemetry Preview Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {article.fullContent.telemetry.map((t, tidx) => (
                      <div key={tidx} className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[10px]">
                        <span className="text-slate-500 block truncate">{t.label}</span>
                        <span className="font-mono font-bold text-white block mt-0.5">{t.value}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Footer with Author and Read More Action */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 text-[10px]">
                      {article.author.avatarInitials}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-200 block truncate max-w-[140px]">
                        {article.author.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-mono">
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Read More Trigger */}
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 font-bold text-xs border border-amber-400/30 transition-all flex items-center gap-1 group/btn shadow-sm"
                  >
                    <span>Read In-Depth</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ============================================================== */}
      {/* IN-DEPTH ARTICLE READER MODAL (FULL ANALYSIS & TAKEAWAYS) */}
      {/* ============================================================== */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 font-mono">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  Published: {selectedArticle.publishedAt}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyBrief(selectedArticle)}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedNotification ? 'Copied!' : 'Share Brief'}</span>
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/30 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Article Content */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans">
              
              {/* Title & Author Info */}
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  {selectedArticle.title}
                </h1>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <div className="w-9 h-9 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center font-bold text-xs">
                    {selectedArticle.author.avatarInitials}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{selectedArticle.author.name}</span>
                    <span className="text-[11px] text-slate-400">{selectedArticle.author.role}</span>
                  </div>
                  <span className="text-slate-600 ml-auto hidden sm:inline">•</span>
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">{selectedArticle.readTime}</span>
                </div>
              </div>

              {/* Lead Paragraph */}
              <div className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/20 text-sm text-slate-200 leading-relaxed font-medium">
                {selectedArticle.fullContent.lead}
              </div>

              {/* In-Depth Investigative Sections */}
              <div className="space-y-6">
                {selectedArticle.fullContent.sections.map((sec, sidx) => (
                  <div key={sidx} className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-amber-400" />
                      <span>{sec.heading}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Market Impact & Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 rounded-2xl bg-slate-950 border border-slate-800">
                {selectedArticle.fullContent.telemetry.map((t, idx) => (
                  <div key={idx} className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
                    <span className="text-[11px] text-slate-400 block">{t.label}</span>
                    <span className="text-base font-bold text-white font-mono block mt-1">{t.value}</span>
                    <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">{t.trend}</span>
                  </div>
                ))}
              </div>

              {/* Key Takeaways Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Key Institutional Takeaways</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedArticle.fullContent.keyTakeaways.map((takeaway, kidx) => (
                    <li key={kidx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Macro Impact Note */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                <strong className="text-slate-200 block">Macroeconomic & Strategic Impact:</strong>
                <p>{selectedArticle.fullContent.marketImpact}</p>
              </div>

              {/* Sources Attribution */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
                <span>Verified Sources: {selectedArticle.fullContent.sources.join(' • ')}</span>
                <span>Oskayi Consult Global Research Desk</span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Inquiring about institutional debt structuring or autonomous treasury implementation?
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {onSelectServiceForInquiry && (
                  <button
                    onClick={() => {
                      onSelectServiceForInquiry(selectedArticle.title);
                      setSelectedArticle(null);
                    }}
                    className="w-full sm:w-auto px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-amber-400/20 transition-all"
                  >
                    Consult Advisory Team
                  </button>
                )}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white font-bold text-xs rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
