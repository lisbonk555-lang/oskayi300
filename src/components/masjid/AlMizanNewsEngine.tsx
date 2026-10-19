import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Check, 
  BookOpen, 
  TrendingUp, 
  Globe2, 
  ShieldAlert, 
  Settings,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { AL_MIZAN_ARTICLES, AlMizanArticle } from '../../data/masjidData';

export const AlMizanNewsEngine: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [adminViewOpen, setAdminViewOpen] = useState(false);
  const [autoPublishMode, setAutoPublishMode] = useState(true);

  const categories = ['All', 'World', 'Ghana', 'Dubai', 'Business', 'Technology', 'Health', 'Environment', 'Conflict'];
  const countries = ['All', 'Global', 'Ghana', 'Dubai', 'United States'];

  const toggleExpand = (id: string) => {
    setExpandedArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (article: AlMizanArticle) => {
    const text = `Al-Mizan Islamic News Reflection:\n"${article.headline}"\nIslam Says: ${article.islamicMapping.advice}\nRead on Masjid Al-Noor: http://www.oskayi.com/igpd/masjid/main#mizan`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredArticles = useMemo(() => {
    return AL_MIZAN_ARTICLES.filter(a => {
      if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
      if (selectedCountry !== 'All' && a.country !== selectedCountry) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          a.headline.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.islamicMapping.advice.toLowerCase().includes(q) ||
          a.islamicMapping.quranVerse.surah.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedCountry, searchQuery]);

  return (
    <section id="mizan" className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest shadow-md">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>SECTION 05 • AL-MIZAN THE 10,000 ENGINE</span>
            <span className="text-slate-500">|</span>
            <span className="text-white">Islamic Perspective on Global News</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Al-Mizan — Islamic Perspective on Trending Global News
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
            Automated intelligence ingestion every 30 minutes from NewsAPI, GNews, and institutional RSS feeds. Maps world events to exact Quranic verses, compassionate advice, and civilizational wisdom.
          </p>
        </div>

        <button
          onClick={() => setAdminViewOpen(!adminViewOpen)}
          className="px-4 py-2 rounded-xl bg-[#0A1931] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-xs font-mono text-[#D4AF37] flex items-center gap-2 transition-all shrink-0"
        >
          <Settings className="w-4 h-4" />
          <span>{adminViewOpen ? 'Hide Pipeline Controls' : 'Moderator / Ingestion Engine'}</span>
        </button>
      </div>

      {/* Admin / Engine Control Strip */}
      {adminViewOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#071326] border border-[#D4AF37]/60 shadow-xl space-y-3 font-mono text-xs animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2 flex-wrap gap-2">
            <span className="text-[#D4AF37] font-bold">
              ✦ Al-Mizan 10,000 Article Storage & Auto-Pruning Pipeline
            </span>
            <span className="text-slate-400">Target: 10,000 articles | Retention: 30 days</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300 text-[11px]">
            <div className="p-2.5 rounded-xl bg-[#0A1931] border border-slate-800">
              <span className="text-slate-400 block">Cron Job Status:</span>
              <strong className="text-emerald-400">Active (Polls every 30m)</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0A1931] border border-slate-800">
              <span className="text-slate-400 block">AI Reasoning Engine:</span>
              <strong className="text-amber-300">OpenAI GPT-4o Islamic Alignment</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0A1931] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block">Auto-Publish:</span>
                <strong className={autoPublishMode ? 'text-emerald-400' : 'text-amber-400'}>
                  {autoPublishMode ? 'Enabled' : 'Draft Review Required'}
                </strong>
              </div>
              <button
                onClick={() => setAutoPublishMode(!autoPublishMode)}
                className="px-2 py-1 rounded bg-[#071326] border border-[#D4AF37]/40 text-[10px] text-[#D4AF37]"
              >
                Toggle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Scholarly Disclaimer Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#071326] border border-amber-500/40 text-amber-200/90 text-xs font-mono flex items-start gap-3 shadow-md">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-amber-300 block mb-0.5">MANDATORY SCHOLARLY DISCLAIMER:</strong>
          Auto-generated reflection for peace, spiritual literacy & moral understanding, not a formal legal fatwa (sharia ruling). For official religious rulings, consult qualified scholars and local Islamic councils.
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#071326] border border-[#D4AF37]/40 space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Keyword Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            <input
              type="text"
              placeholder="Search trending news, Quran Surah citations, or Islamic advice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Country Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-[11px] font-mono text-slate-400">Region:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="p-2.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono text-white outline-none cursor-pointer"
            >
              {countries.map(c => (
                <option key={c} value={c} className="bg-[#0A1931] text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#0A1931] font-bold shadow'
                  : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Al-Mizan News Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredArticles.map((article) => {
          const isExpanded = expandedArticles[article.id] || false;
          return (
            <div
              key={article.id}
              className="rounded-3xl bg-[#071326] border-2 border-[#D4AF37]/60 overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
            >
              <div>
                
                {/* News Image & Badges Banner */}
                <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.headline}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/40 to-transparent" />

                  {/* Badges Top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#0A1931]/90 border border-[#D4AF37]/60 text-[#D4AF37] font-bold uppercase">
                      {article.category} • {article.country}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-md bg-rose-500/90 text-white font-bold flex items-center gap-1 shadow">
                      <Flame className="w-3 h-3 fill-current" />
                      <span>{article.trendingScore} Trending Score</span>
                    </span>
                  </div>

                  {/* Source Strip Bottom */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span>Source: {article.source}</span>
                    <span>{article.publishedAt}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 sm:p-6 space-y-4">
                  
                  {/* Headline */}
                  <h3 className="text-base sm:text-lg font-serif font-black text-white leading-snug">
                    {article.headline}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* "ISLAM SAYS:" Gold Advice Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 via-[#FFF3B0]/10 to-[#D4AF37]/15 border border-[#D4AF37] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-[#D4AF37]">
                      <span className="flex items-center gap-1.5 uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Islam Says (Quranic Advice):</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-serif italic text-white leading-relaxed">
                      "{article.islamicMapping.advice}"
                    </p>
                  </div>

                  {/* Quran Verse Citation */}
                  <div className="p-4 rounded-xl bg-[#0A1931] border border-slate-800 space-y-2">
                    <div className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold">
                      Relevant Divine Revelation ({article.islamicMapping.quranVerse.surah} {article.islamicMapping.quranVerse.ayah}):
                    </div>

                    <div className="font-serif text-sm sm:text-base text-[#FFF3B0] leading-loose text-right" dir="rtl">
                      {article.islamicMapping.quranVerse.arabic}
                    </div>

                    <p className="text-xs font-serif italic text-slate-300 border-t border-slate-800 pt-2">
                      "{article.islamicMapping.quranVerse.english}"
                    </p>
                  </div>

                  {/* Collapsible "Why This Advice" */}
                  {isExpanded && (
                    <div className="p-4 rounded-xl bg-[#08152B] border border-[#D4AF37]/40 space-y-2 text-xs font-sans leading-relaxed text-slate-300 animate-in fade-in duration-200">
                      <strong className="text-[#FFF3B0] font-mono text-[11px] block uppercase">
                        ✦ The Civilizational & Theological Wisdom:
                      </strong>
                      <p>{article.islamicMapping.whyThisAdvice}</p>
                    </div>
                  )}

                </div>
              </div>

              {/* Card Footer: Collapsible Button + Source Link + Share */}
              <div className="p-5 pt-0 flex items-center justify-between gap-3 text-xs font-mono border-t border-slate-800/80 mt-4">
                <button
                  onClick={() => toggleExpand(article.id)}
                  className="text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Hide Wisdom Analysis' : 'Why This Advice? (Expand)'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700"
                    title="View Original News Article"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleShare(article)}
                    className="p-2 rounded-lg bg-[#0A1931] text-[#D4AF37] hover:text-white border border-slate-700"
                    title="Share Islamic Advice"
                  >
                    {copiedId === article.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
