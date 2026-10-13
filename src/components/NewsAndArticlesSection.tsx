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
  Play, 
  Pause,
  Tv,
  ExternalLink,
  ShieldCheck,
  Activity,
  Layers,
  Award,
  Video,
  ChevronRight
} from 'lucide-react';
import { generateHourlyNewsArticles, NewsArticle } from '../data/newsData';

interface NewsAndArticlesSectionProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export const NewsAndArticlesSection: React.FC<NewsAndArticlesSectionProps> = ({
  onSelectServiceForInquiry
}) => {
  const [hourOffset, setHourOffset] = useState<number>(0);
  const [newsData, setNewsData] = useState<{
    articles: NewsArticle[];
    currentHourNumber: number;
    nextHourlyRefreshSeconds: number;
  }>(() => generateHourlyNewsArticles(0));

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeVideoModalId, setActiveVideoModalId] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(newsData.nextHourlyRefreshSeconds);
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false);

  // Hourly countdown timer and automatic dynamic hourly updates (10 new updates every hour)
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          // Hourly threshold reached: automatically trigger new hourly batch
          setHourOffset(curr => {
            const nextOffset = curr + 1;
            const fresh = generateHourlyNewsArticles(nextOffset);
            setNewsData(fresh);
            return nextOffset;
          });
          return 3600;
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

  // Allow instant manual trigger of 10 new additional updates for demonstration
  const handleManualHourlyRefresh = () => {
    const nextOffset = hourOffset + 1;
    setHourOffset(nextOffset);
    const fresh = generateHourlyNewsArticles(nextOffset);
    setNewsData(fresh);
    setSecondsRemaining(3600);
  };

  const handleCopyBrief = (article: NewsArticle) => {
    const text = `${article.title}\n\n${article.summary}\n\nCategory: ${article.category}\nPublished: ${article.publishedAt}\nOskayi Consult News & Strategic Updates`;
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
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* ============================================================== */}
        {/* MANDATORY INSTITUTIONAL STATEMENT HEADER */}
        {/* ============================================================== */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-800/60 shadow-2xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Oskayi Consult Statutory Advisory & Financial Technology</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE HOURLY INTELLIGENCE FEED</span>
            </span>
          </div>

          <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed font-medium">
            Oskayi Consult is a Ghanaian advisory and financial technology firm. Through our network of licensed international partners, we provide loan liquidity, project financing, custom fintech software, exclusive insurance, and Web3 solutions for governments, banks, businesses, and individuals.
          </p>
        </div>

        {/* Section Heading & Hourly Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-800">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>News & Strategic Updates</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Empowering African & Global Growth <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500">
                Through Infrastructure Financing & Modern Fintech Solutions
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300">
              Continuously aggregated hourly institutional dispatches, debt syndications, cross-border clearing telemetry, and capital market insights with embedded video briefings.
            </p>
          </div>

          {/* Real-Time Hourly Controls */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Next 10 Updates:</span>
              </div>
              <span className="font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                {formatCountdown(secondsRemaining)}
              </span>
            </div>

            <button
              onClick={handleManualHourlyRefresh}
              className="px-4 py-2.5 rounded-2xl bg-indigo-900/80 hover:bg-indigo-800 text-white border border-indigo-700/80 text-xs font-bold font-mono flex items-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/20"
              title="Generate next batch of 10 hourly updates immediately"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Fetch 10 New Updates</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CONTINUOUS LEFT-SLIDING TICKER / MARQUEE CAROUSEL */}
        {/* ============================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Continuous Live Stream (Sliding Left — Hover to Pause)</span>
            </span>
            <span className="hidden sm:inline text-slate-500">
              {newsData.articles.length} Strategic Updates in Rotation
            </span>
          </div>

          <div 
            className="w-full overflow-hidden rounded-3xl bg-slate-950/80 border border-slate-800/80 p-3 sm:p-4 relative group"
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
          >
            {/* Sliding Track - Duplicate articles for infinite seamless loop */}
            <div 
              className="animate-slide-left-continuous flex gap-4"
              style={{ animationPlayState: isMarqueePaused ? 'paused' : 'running' }}
            >
              {[...newsData.articles, ...newsData.articles].map((article, idx) => (
                <div
                  key={`${article.id}-slide-${idx}`}
                  className="w-[340px] sm:w-[420px] shrink-0 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 p-4 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-3"
                >
                  {/* Top Thumbnail Image with Video Play Badge */}
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 group/img">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Category & Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-amber-300 border border-slate-800 text-[10px] font-bold font-mono uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold border border-emerald-500/30">
                        {article.readTime}
                      </span>
                    </div>

                    {/* YouTube Video Overlay Trigger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideoModalId(article.youtubeVideoId);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group/play"
                    >
                      <div className="w-12 h-12 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                      <span className="absolute bottom-2 left-3 right-3 text-[10px] font-mono text-white/90 truncate bg-slate-950/80 px-2 py-0.5 rounded">
                        Watch Short Video Brief
                      </span>
                    </button>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <span>{article.publishedAt}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white line-clamp-2 hover:text-amber-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      By {article.author.name}
                    </span>
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 group/btn"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* WELL-ARRANGED HOMEPAGE GRID & FILTER CONTROLS */}
        {/* ============================================================== */}
        <div className="space-y-6 pt-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search updates & topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/80 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Grid of 10 Well-Arranged Homepage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-600/60 p-6 flex flex-col justify-between space-y-4 hover:shadow-2xl transition-all group"
              >
                {/* Media Presentation: Generated Image + Embedded Video Launcher */}
                <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-950 group/thumb">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-amber-300 border border-slate-800 text-[10px] font-bold font-mono uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>

                  {/* YouTube Embed Trigger Button */}
                  <button
                    onClick={() => setActiveVideoModalId(article.youtubeVideoId)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-transform hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Brief</span>
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{article.publishedAt}</span>
                    <span className="text-emerald-400">{article.readTime}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-amber-300 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Author Credentials */}
                  <div className="pt-2 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-indigo-900/80 border border-indigo-700/80 text-amber-300 text-[10px] font-bold flex items-center justify-center font-mono">
                      {article.author.avatarInitials}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white leading-none">{article.author.name}</div>
                      <div className="text-[10px] text-slate-400 leading-none mt-0.5 truncate max-w-[200px]">{article.author.role}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyBrief(article)}
                    className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-amber-400/20 group/read"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-read:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <p className="text-sm text-slate-300 font-mono">No updates found matching your search query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="text-xs text-amber-300 font-bold underline"
              >
                Reset filters
              </button>
            </div>
          )}

        </div>

      </div>

      {/* ============================================================== */}
      {/* FULL READ MORE ARTICLE MODAL (DEEP DIVE READER) */}
      {/* ============================================================== */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-400/40 rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold font-mono uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  {selectedArticle.publishedAt}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyBrief(selectedArticle)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{copiedNotification ? 'Copied!' : 'Share'}</span>
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/30 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-200 font-sans">
              
              {/* Headline */}
              <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Author & Read Time */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-full bg-indigo-900/80 border border-indigo-700/80 text-amber-300 font-bold flex items-center justify-center font-mono text-xs">
                  {selectedArticle.author.avatarInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{selectedArticle.author.name}</div>
                  <div className="text-xs text-slate-400">{selectedArticle.author.role}</div>
                </div>
              </div>

              {/* Embedded Video Player inside Article */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                  <Tv className="w-4 h-4 text-amber-400" />
                  <span>Strategic Briefing Video (Embedded Stream)</span>
                </div>
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedArticle.youtubeVideoId}?rel=0&modestbranding=1`}
                    title={selectedArticle.youtubeTitle}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* High-Resolution Topic Illustration / Imagery */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs text-slate-300 font-mono bg-slate-950/80 px-2.5 py-1 rounded">
                  Field Photography & Telemetry Verification
                </div>
              </div>

              {/* Lead Paragraph */}
              <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-800/60 text-slate-100 font-medium text-sm sm:text-base leading-relaxed">
                {selectedArticle.fullContent.lead}
              </div>

              {/* Telemetry Highlight Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedArticle.fullContent.telemetry.map((tel, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{tel.label}</span>
                    <div className="text-base font-extrabold text-amber-300">{tel.value}</div>
                    <div className="text-[10px] text-emerald-400 font-mono">{tel.trend}</div>
                  </div>
                ))}
              </div>

              {/* In-Depth Analysis Sections */}
              <div className="space-y-4">
                {selectedArticle.fullContent.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-amber-400 rounded-full" />
                      {sec.heading}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Market Impact */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-xs sm:text-sm text-emerald-200 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[11px] font-mono block text-emerald-400">
                  Macroeconomic & Market Impact:
                </span>
                <p className="leading-relaxed">
                  {selectedArticle.fullContent.marketImpact}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Institutional Takeaways:
                </span>
                <div className="space-y-2">
                  {selectedArticle.fullContent.keyTakeaways.map((take, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{take}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex flex-wrap items-center gap-2">
                <span>Verified Sources:</span>
                {selectedArticle.fullContent.sources.map((src, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {src}
                  </span>
                ))}
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-400 font-mono">
                Explore infrastructure financing or custom fintech solutions for this sector:
              </div>

              <button
                onClick={() => {
                  const title = selectedArticle.category === 'Infrastructure Financing' 
                    ? 'Infrastructure Project Financing' 
                    : 'Fintech Solutions for Banks';
                  setSelectedArticle(null);
                  if (onSelectServiceForInquiry) {
                    onSelectServiceForInquiry(title);
                  }
                  const formEl = document.getElementById('inquiry');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2"
              >
                <span>Initiate Advisory Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STANDALONE YOUTUBE VIDEO POPUP PLAYER */}
      {/* ============================================================== */}
      {activeVideoModalId && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-3xl w-full bg-slate-900 border border-rose-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-mono font-bold text-white">Strategic Video Briefing</span>
              </div>
              <button
                onClick={() => setActiveVideoModalId(null)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModalId}?autoplay=1&rel=0`}
                title="Strategic Brief Video"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-3 bg-slate-950 text-right">
              <button
                onClick={() => setActiveVideoModalId(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold"
              >
                Close Video
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
