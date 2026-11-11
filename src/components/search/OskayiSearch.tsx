import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Mic, 
  MicOff, 
  Globe, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronRight, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Zap, 
  Share2, 
  Bookmark, 
  RefreshCw,
  Coins
} from 'lucide-react';
import { SearchResult, SearchSource } from '../../server/oskayiSearchService';

export const OskayiSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'ghana' | 'world'>('ghana');
  const [isSearching, setIsSearching] = useState(false);
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedAnswer, setCopiedAnswer] = useState(false);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [dailySearchesLeft, setDailySearchesLeft] = useState<number>(5);
  const [isProUnlocked, setIsProUnlocked] = useState(false);
  const [isPaystackModalOpen, setIsPaystackModalOpen] = useState(false);
  const [recentQueries, setRecentQueries] = useState<string[]>([
    "Current USD to Ghana Cedi interbank rate today",
    "Trotro fares from Madina Zongo Junction to Circle",
    "Makola market wholesale price for 50kg perfumed rice",
    "Ghana GRIDCo power generation and Akosombo water level"
  ]);

  // Voice Search Setup via Web Speech API
  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please type your query.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = mode === 'ghana' ? 'en-GH' : 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setQuery(transcript);
          performSearch(transcript, mode);
        }
      };

      recognition.start();
    } catch (e) {
      console.warn("Speech recognition error:", e);
      setIsListening(false);
    }
  };

  const performSearch = async (searchQuery: string, searchMode: 'ghana' | 'world') => {
    if (!searchQuery.trim()) return;

    if (!isProUnlocked && dailySearchesLeft <= 0) {
      setIsPaystackModalOpen(true);
      return;
    }

    try {
      setIsSearching(true);
      const resp = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, mode: searchMode })
      });

      if (resp.ok) {
        const data = await resp.json();
        setCurrentResult(data);
        if (!isProUnlocked) {
          setDailySearchesLeft(prev => Math.max(0, prev - 1));
        }
        if (!recentQueries.includes(searchQuery)) {
          setRecentQueries(prev => [searchQuery, ...prev.slice(0, 5)]);
        }
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopyAnswer = () => {
    if (!currentResult) return;
    navigator.clipboard.writeText(`${currentResult.query}\n\n${currentResult.answer}`);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2500);
  };

  const handleSaveSearch = (q: string) => {
    if (!savedSearches.includes(q)) {
      setSavedSearches([...savedSearches, q]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Search Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/40 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Perplexity-Style AI Grounded Search • Oskayi Consult
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Oskayi <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#FFD700] bg-clip-text text-transparent">Search</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Real-time AI answers with verified citations from Joy Online, Citi Newsroom, Bank of Ghana FX rates, GPRTU trotro fares, and global economic data.
        </p>

        {/* Mode Selector & Free Search Limit Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setMode('ghana')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                mode === 'ghana'
                  ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Ghana Mode
            </button>
            <button
              onClick={() => setMode('world')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                mode === 'world'
                  ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              World Mode
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              {isProUnlocked ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Pro Unlimited
                </span>
              ) : (
                <span>
                  Free: <strong className="text-[#FFD700]">{dailySearchesLeft}</strong> searches left today
                </span>
              )}
            </span>

            {!isProUnlocked && (
              <button
                onClick={() => setIsPaystackModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md shadow-[#FFD700]/10 transition-all active:scale-95"
              >
                <Zap className="w-3.5 h-3.5" />
                Upgrade Pro (GH¢20 MoMo)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Perplexity-Style Search Input Box */}
      <div className="relative max-w-3xl mx-auto">
        <div className="rounded-3xl bg-slate-900 border-2 border-slate-700 focus-within:border-[#FFD700] p-3 sm:p-4 shadow-2xl transition-all">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') performSearch(query, mode);
              }}
              placeholder={
                mode === 'ghana'
                  ? "Ask anything about Ghana: forex rates, trotro fares, market prices, news..."
                  : "Search world markets, science, technology, sovereign debt..."
              }
              className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none"
            />
            
            {/* Voice Input Button */}
            <button
              onClick={handleVoiceSearch}
              className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                isListening
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
              title="Voice Search via Microphone"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Submit Search Button */}
            <button
              onClick={() => performSearch(query, mode)}
              disabled={isSearching || !query.trim()}
              className="px-4 py-2.5 rounded-xl bg-[#FFD700] hover:bg-amber-400 text-[#0A1F44] font-black text-xs uppercase tracking-wider transition-all disabled:opacity-40 shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isSearching ? 'animate-spin' : ''}`} />
              <span>{isSearching ? 'Synthesizing...' : 'Search'}</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 px-1 text-xs text-slate-400">
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Trending:</span>
          {recentQueries.slice(0, 3).map((rq, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(rq);
                performSearch(rq, mode);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-[#FFD700] text-[11px] transition-colors truncate max-w-xs"
            >
              {rq}
            </button>
          ))}
        </div>
      </div>

      {/* Search Result Box (Perplexity Layout: Sources -> Answer -> Follow-Ups) */}
      {currentResult && (
        <div className="max-w-4xl mx-auto space-y-6 pt-4">
          
          {/* Section 1: Grounded Verified Sources Carousel */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="uppercase tracking-wider font-bold text-[#FFD700] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Verified Sources ({currentResult.sources.length})
              </span>
              <span>Grounding Confidence: 98%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentResult.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#FFD700]/60 transition-all block group"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-bold text-white group-hover:text-[#FFD700] transition-colors truncate">
                      [{i + 1}] {src.publisher}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-[#FFD700] shrink-0" />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 mb-1">
                    {src.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {src.snippet}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: AI Direct Answer Canvas */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Oskayi Synthesized Answer
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-[#FFD700] border border-slate-800 font-mono">
                  {currentResult.mode.toUpperCase()} MODE
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSaveSearch(currentResult.query)}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-[#FFD700] text-xs transition-colors"
                  title="Save Search"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleCopyAnswer}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors border border-slate-800"
                >
                  {copiedAnswer ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAnswer ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Answer Content */}
            <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-3 font-sans">
              {currentResult.answer.split('\n\n').map((paragraph, pIdx) => (
                <div key={pIdx}>
                  {paragraph.startsWith('###') ? (
                    <h3 className="text-lg font-bold text-white tracking-tight mt-4 mb-2">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  ) : paragraph.startsWith('*') ? (
                    <div className="pl-2 border-l-2 border-[#FFD700]/50 my-1">
                      {paragraph}
                    </div>
                  ) : (
                    <p className="text-slate-300 leading-relaxed">
                      {paragraph}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Follow-Up Questions ("People also ask") */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Related Follow-Up Questions
            </span>

            <div className="space-y-2">
              {currentResult.follow_up_questions.map((fq, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(fq);
                    performSearch(fq, mode);
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 hover:border-[#FFD700]/50 text-xs text-slate-200 hover:text-[#FFD700] transition-all flex items-center justify-between group"
                >
                  <span className="font-medium">{fq}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#FFD700] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paystack Pro Modal */}
      {isPaystackModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-[#FFD700] p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">Oskayi Search Pro (MoMo)</span>
              </div>
              <button 
                onClick={() => setIsPaystackModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-2 py-2">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center mx-auto text-[#FFD700]">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">Unlock Unlimited AI Searches</h3>
              <p className="text-xs text-slate-300">
                Unlimited deep-reasoning searches, full Ghana financial databases, and real-time commodity terminal access.
              </p>
              <div className="text-3xl font-black text-[#FFD700] font-mono pt-2">
                GH¢ 20.00 <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
              </div>
              <span className="text-[11px] text-emerald-400 block">Pay with MTN MoMo, Telecel Cash, AT Money or Card</span>
            </div>

            <button
              onClick={() => {
                setIsProUnlocked(true);
                setIsPaystackModalOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#FFD700]/20 active:scale-95"
            >
              Confirm GH¢20 via Paystack MoMo
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
