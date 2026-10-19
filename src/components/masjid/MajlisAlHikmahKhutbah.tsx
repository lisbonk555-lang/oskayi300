import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Search, 
  Download, 
  Upload, 
  Languages, 
  FileText, 
  Tag, 
  Sparkles, 
  Share2, 
  Check, 
  BookOpen, 
  ChevronRight,
  Clock,
  UserCheck
} from 'lucide-react';
import { KHUTBAH_LIBRARY, Khutbah } from '../../data/masjidData';

export const MajlisAlHikmahKhutbah: React.FC = () => {
  const [activeKhutbah, setActiveKhutbah] = useState<Khutbah>(KHUTBAH_LIBRARY[0]);
  const [currentLang, setCurrentLang] = useState<'en' | 'ar' | 'fr' | 'tw'>('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSpeaker, setNewSpeaker] = useState('');
  const [newAudioLink, setNewAudioLink] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(activeKhutbah.audioUrl);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTimeIndex(0);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.src = activeKhutbah.audioUrl;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleDownloadTranscript = () => {
    const transcriptList = activeKhutbah.transcripts[currentLang];
    const textContent = `MASJID AL-NOOR AL-ALAMI — MAJLIS AL-HIKMAH KHUTBAH ARCHIVE\n` +
      `Title: ${activeKhutbah.title}\n` +
      `Speaker: ${activeKhutbah.speaker}\n` +
      `Date: ${activeKhutbah.date}\n` +
      `Language: ${currentLang.toUpperCase()}\n\n` +
      `SUMMARY:\n${activeKhutbah.summary}\n\n` +
      `TRANSCRIPT:\n` +
      transcriptList.map(item => `[${item.time}] ${item.text}`).join('\n\n') +
      `\n\nQURAN VERSES EXTRACTED:\n${activeKhutbah.keyVerses.join('\n')}\n\n` +
      `HADITH CITATIONS:\n${activeKhutbah.keyHadiths.join('\n')}`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Khutbah_${activeKhutbah.id}_${currentLang}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const text = `Listen to Khutbah: "${activeKhutbah.title}" at Masjid Al-Noor Al-Alami\nhttp://www.oskayi.com/igpd/masjid/main#majlis`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setNewTitle('');
      setNewSpeaker('');
      setNewAudioLink('');
    }, 2000);
  };

  const currentTranscript = activeKhutbah.transcripts[currentLang] || activeKhutbah.transcripts.en;
  const filteredTranscript = searchQuery.trim() 
    ? currentTranscript.filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentTranscript;

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية (Arabic)', flag: '🇦🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'tw', label: 'Twi (Akan Ghana)', flag: '🇬🇭' }
  ];

  return (
    <section id="majlis" className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>SECTION 02 • MAJLIS AL-HIKMAH</span>
            <span className="text-slate-500">|</span>
            <span className="text-white">Khutbah & Auto Transcription</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Majlis Al-Hikmah — Khutbah & Halaqah Archive
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Sovereign Khutbahs automatically transcribed via OpenAI Whisper API, with multi-lingual translations in English, Arabic, French, and Ghanaian Twi.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#0A1931] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0A1931] border border-[#D4AF37]/60 text-xs font-mono font-bold flex items-center gap-2 transition-all shrink-0 shadow-md"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Khutbah (Admin)</span>
        </button>
      </div>

      {/* Main Player & Interactive Synchronized Transcript Window */}
      <div className="rounded-3xl bg-[#071326] border-2 border-[#D4AF37]/80 shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Spotify-style Media Player & Metadata (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-b from-[#0F274D] to-[#0A1931] border-b lg:border-b-0 lg:border-r border-[#D4AF37]/40 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            {/* Visual Cover Art / Calligraphy Accent */}
            <div className="relative aspect-video w-full rounded-2xl bg-[#071326] border border-[#D4AF37]/50 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-inner group">
              <div className="text-[#D4AF37] font-serif text-2xl font-bold tracking-widest" dir="rtl">
                {activeKhutbah.arabicTitle}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-2">
                Masjid Al-Noor Sovereign Discourse
              </div>
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0A1931]/80 border border-[#D4AF37]/40 text-[10px] font-mono text-[#D4AF37]">
                Duration: {activeKhutbah.duration}
              </div>
            </div>

            {/* Title & Speaker */}
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-serif font-black text-white leading-snug">
                {activeKhutbah.title}
              </h3>
              <div className="text-xs font-mono text-[#D4AF37] flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{activeKhutbah.speaker}</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {activeKhutbah.date}
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="p-3.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/30 text-xs text-slate-300 leading-relaxed">
              <strong className="text-[#FFF3B0] block mb-1 font-mono uppercase text-[10px]">
                ✦ AI-Generated Executive Summary:
              </strong>
              {activeKhutbah.summary}
            </div>

            {/* Extracted Quran Verses & Hadith Tags */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                Auto-Extracted Sacred Citations:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeKhutbah.keyVerses.map((verse, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[10px] font-mono text-[#D4AF37]">
                    {verse}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Player Controls Deck */}
          <div className="pt-4 border-t border-[#D4AF37]/30 space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlayback}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] text-[#0A1931] font-mono font-black text-xs flex items-center gap-2 shadow-lg hover:from-[#FFF3B0] transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pause Sermon' : 'Play Sermon Audio'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadTranscript}
                  className="p-2 rounded-xl bg-[#071326] text-slate-300 hover:text-white border border-[#D4AF37]/40"
                  title="Download Transcript (Text/PDF)"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-[#071326] text-[#D4AF37] hover:text-white border border-[#D4AF37]/40"
                  title="Share Khutbah Link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Multi-lingual Synced Transcript & Search (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#071326]">
          
          {/* Top Bar: Language Tabs & Search Input */}
          <div className="space-y-4">
            
            {/* 4 Translation Tabs: English, Arabic, French, Twi */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#D4AF37]/30 pb-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                      currentLang === lang.code
                        ? 'bg-[#D4AF37] text-[#0A1931] shadow-md'
                        : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>

              <span className="text-[10px] font-mono text-[#D4AF37]">
                Whisper Auto-Sync
              </span>
            </div>

            {/* Search within transcript */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search keywords inside transcript (e.g. nature, interest, compassion)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0A1931] border border-[#D4AF37]/40 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

          </div>

          {/* Synchronized Scrolling Transcript Feed */}
          <div className="flex-1 max-h-[380px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-[#D4AF37]/40">
            {filteredTranscript.map((line, idx) => {
              const isActive = idx === currentTimeIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentTimeIndex(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                    isActive
                      ? 'bg-[#0F274D] border-[#D4AF37] ring-1 ring-[#D4AF37]/50 text-white'
                      : 'bg-[#0A1931]/60 border-slate-800/80 hover:border-[#D4AF37]/40 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#D4AF37]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{line.time}</span>
                    </span>
                    {isActive && (
                      <span className="px-1.5 py-0.2 rounded bg-[#D4AF37] text-[#0A1931] font-black text-[9px]">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-xs sm:text-sm leading-relaxed ${currentLang === 'ar' ? 'font-serif text-right text-base leading-loose' : 'font-sans'}`}>
                    {line.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Transcript Footer Status */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>{filteredTranscript.length} verses & passages indexed</span>
            <span className="text-[#D4AF37]">Full AI Audio-Text Alignment</span>
          </div>

        </div>

      </div>

      {/* Admin Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-lg w-full bg-[#0A1931] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <h3 className="text-lg font-serif font-black text-white">
                Admin: Upload New Khutbah / Halaqah
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            {uploadSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-center space-y-2">
                <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white font-mono">Khutbah Dispatched to Whisper Pipeline</h4>
                <p className="text-xs text-emerald-200">
                  Audio queued for auto-transcription and 4-language translation (EN, AR, FR, TW).
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-slate-300 block mb-1">Khutbah Title:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Environmental Justice & Zero-Interest Economics"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Speaker / Khatib:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abdul-Bari (Al-Bari) or Visiting Scholar"
                    value={newSpeaker}
                    onChange={(e) => setNewSpeaker(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Audio/Video Stream URL (or MP3/WAV):</label>
                  <input
                    type="url"
                    placeholder="https://cdn.example.com/khutbah.mp3"
                    value={newAudioLink}
                    onChange={(e) => setNewAudioLink(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#071326] border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                  Automatic AI Pipeline: Once submitted, OpenAI Whisper automatically transcribes the recording, extracts Quran/Hadith citations, and creates Twi, Arabic, and French translations.
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0A1931] font-bold shadow-lg"
                  >
                    Start AI Transcription
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
