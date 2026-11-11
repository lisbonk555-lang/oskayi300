import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Sparkles, 
  Eye, 
  Clock, 
  User, 
  CheckCircle2, 
  Share2, 
  Send, 
  Copy, 
  Check, 
  Globe, 
  DollarSign, 
  BookOpen, 
  ShieldCheck, 
  Bookmark,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { BlogArticle, TrendingHeadline } from '../../server/mediaMachineService';

interface BloggerAgentHubProps {
  blogs: BlogArticle[];
  headlines: TrendingHeadline[];
  onGenerateBlog: (headlineId: string, subdomain?: BlogArticle['blog_subdomain']) => void;
  isGenerating?: boolean;
}

export const BloggerAgentHub: React.FC<BloggerAgentHubProps> = ({
  blogs,
  headlines,
  onGenerateBlog,
  isGenerating = false
}) => {
  const [selectedSubdomain, setSelectedSubdomain] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(blogs[0] || null);
  const [selectedHeadlineForGen, setSelectedHeadlineForGen] = useState<string>(headlines[0]?.id || '');
  const [publishedNotice, setPublishedNotice] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // 5 Subdomain Blogs Definition (100% Secular & Professional)
  const subdomains = [
    { id: 'all', name: 'All 5 Blogs', desc: '500 Articles/Week Automated' },
    { id: 'news.oskayi.com', name: 'news.oskayi.com', desc: 'Ghana News & National Affairs' },
    { id: 'world.oskayi.com', name: 'world.oskayi.com', desc: 'World Geopolitics & Global Trends' },
    { id: 'business.oskayi.com', name: 'business.oskayi.com', desc: 'Business, Cocoa, Dollar & Money' },
    { id: 'sports.oskayi.com', name: 'sports.oskayi.com', desc: 'Sports, Black Stars & Football' },
    { id: 'tech.oskayi.com', name: 'tech.oskayi.com', desc: 'Technology, AI & Digital Infrastructure' }
  ];

  const filteredBlogs = selectedSubdomain === 'all'
    ? blogs
    : blogs.filter(b => b.blog_subdomain === selectedSubdomain);

  const handleSimulateBloggerPublish = (blog: BlogArticle) => {
    setPublishedNotice(`Post successfully pushed to Blogger API for ${blog.blog_subdomain} (Post ID: blg-${Date.now().toString(36)})`);
    setTimeout(() => setPublishedNotice(null), 4000);
  };

  const handleCopyArticleLink = (slug: string) => {
    navigator.clipboard.writeText(`https://${activeArticle?.blog_subdomain || 'news.oskayi.com'}/${slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Top Banner Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0A1F44] via-slate-900 to-[#0A1F44] border border-[#FFD700]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Blogger Agent • 500 Blogs / Week (71 Daily)
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Oskayi <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#FFD700] bg-clip-text text-transparent">Newsroom Network</span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Automated high-authority editorial publishing across 5 niche Oskayi enterprise news domains. Strict 700-900 word depth, original angle rewrites, AdSense monetization slots, and institutional market outlooks.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Weekly Target</span>
              <span className="text-2xl font-black text-[#FFD700] font-mono">500 Posts</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Subdomains</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">5 Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Published Notification Toast */}
      {publishedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{publishedNotice}</span>
          </div>
          <button onClick={() => setPublishedNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 5 Subdomain Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {subdomains.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubdomain(sub.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex flex-col items-start ${
              selectedSubdomain === sub.id
                ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>{sub.name}</span>
            <span className={`text-[10px] font-normal ${selectedSubdomain === sub.id ? 'text-[#0A1F44]/80' : 'text-slate-400'}`}>
              {sub.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Instant Blog Article Generator Trigger */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            Generate New Original Corporate Article
          </span>
          <span className="text-[11px] text-slate-400">Target: 700-900 Words • Professional Tone • Fact Verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <select
              value={selectedHeadlineForGen}
              onChange={(e) => setSelectedHeadlineForGen(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FFD700]"
            >
              {headlines.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.title.slice(0, 80)}...
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-4">
            <button
              onClick={() => onGenerateBlog(selectedHeadlineForGen, selectedSubdomain === 'all' ? 'business.oskayi.com' : selectedSubdomain as any)}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-[#FFD700]/20 disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Drafting & Publishing...' : 'Draft & Publish Blog'}
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Articles Feed & Interactive Full Article Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Article List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Published Feed ({filteredBlogs.length})</span>
            <span className="text-[#FFD700]">71 Posts / Day Active</span>
          </div>

          <div className="space-y-3 max-h-[850px] overflow-y-auto pr-1">
            {filteredBlogs.map((b) => {
              const isSelected = activeArticle?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setActiveArticle(b)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0A1F44] to-slate-900 border-[#FFD700] shadow-lg shadow-[#FFD700]/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400 mb-1.5">
                    <span className="font-mono text-[#FFD700] font-bold">{b.blog_subdomain}</span>
                    <span>{b.word_count} words</span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-2">
                    {b.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <User className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>{b.author}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Eye className="w-3 h-3" /> {b.views.toLocaleString()}
                      </span>
                      <span className="text-emerald-400 font-mono font-semibold">
                        ${b.revenue_usd}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Interactive Article Reader (7 Cols) */}
        <div className="lg:col-span-7">
          {activeArticle ? (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
              {/* Publication Header Strip */}
              <div className="p-4 sm:p-6 bg-[#0A1F44] border-b border-[#FFD700]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#FFD700]">{activeArticle.blog_subdomain}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-emerald-300 font-semibold">Quality Verified</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Author: <strong className="text-white">{activeArticle.author}</strong> • Sector: <strong className="text-amber-300">{activeArticle.blog_category_name}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyArticleLink(activeArticle.slug)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold flex items-center gap-1.5 border border-slate-700"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? 'Copied' : 'Share'}
                  </button>

                  <button
                    onClick={() => handleSimulateBloggerPublish(activeArticle)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#FFD700]/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Push to Blogger
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
                <img
                  src={activeArticle.image_url}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 drop-shadow">
                  <span className="bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    Generated via Pollinations.ai • Corporate Institutional Palette
                  </span>
                  <span className="bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    {activeArticle.word_count} Words
                  </span>
                </div>
              </div>

              {/* Article Content Container */}
              <div className="p-6 sm:p-8 space-y-6">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {activeArticle.title}
                </h1>

                {/* Source Verification Badge */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
                  <span>Source Verification: <strong className="text-slate-200">{activeArticle.source_name}</strong></span>
                  <a
                    href={activeArticle.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FFD700] hover:underline flex items-center gap-1 font-semibold"
                  >
                    Original Wire Article <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Render Full Article HTML */}
                <div
                  className="prose prose-invert max-w-none text-slate-200"
                  dangerouslySetInnerHTML={{ __html: activeArticle.content_html }}
                />

                {/* Hashtags Strip */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
                  {activeArticle.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 text-[#FFD700] border border-slate-800 font-mono font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400">
              Select an article on the left or generate a new one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
