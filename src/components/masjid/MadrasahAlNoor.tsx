import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  Play, 
  Pause, 
  Volume2, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Heart, 
  Calendar, 
  HelpCircle,
  Bookmark,
  Share2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { DAILY_MADRASAH } from '../../data/masjidData';

export const MadrasahAlNoor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ayah' | 'hadith' | 'name' | 'seerah' | 'fiqh' | 'quiz'>('ayah');
  const [isPlayingRecitation, setIsPlayingRecitation] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [savedLessons, setSavedLessons] = useState<string[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAyahAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(DAILY_MADRASAH.ayahOfTheDay.audioUrl);
      audioRef.current.onended = () => setIsPlayingRecitation(false);
    }

    if (isPlayingRecitation) {
      audioRef.current.pause();
      setIsPlayingRecitation(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingRecitation(true);
      }).catch(() => {
        setIsPlayingRecitation(false);
      });
    }
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleGradeQuiz = () => {
    let score = 0;
    DAILY_MADRASAH.dailyQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 100;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const toggleBookmark = (lessonTitle: string) => {
    if (savedLessons.includes(lessonTitle)) {
      setSavedLessons(savedLessons.filter(l => l !== lessonTitle));
    } else {
      setSavedLessons([...savedLessons, lessonTitle]);
    }
  };

  return (
    <section id="madrasah" className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>SECTION 04 • MADRASAH AL-NOOR</span>
            <span className="text-slate-500">|</span>
            <span className="text-white">Daily Automated Sacred Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Madrasah Al-Noor — Automated Islamic Teaching
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
            Automated daily lessons refreshing every midnight GMT: Ayah recitation with Ibn Kathir commentary, Sahih Hadith, 99 Names of Allah, Seerah story, practical Fiqh, and interactive knowledge quiz.
          </p>
        </div>

        {/* Progress Tracker Pill */}
        <div className="p-3 rounded-2xl bg-[#071326] border border-[#D4AF37]/50 flex items-center gap-3 text-xs font-mono shrink-0 shadow-md">
          <Award className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Knowledge Points</div>
            <div className="text-sm font-bold text-white">
              {quizScore} XP <span className="text-emerald-400 text-xs">({savedLessons.length} Saved)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Curriculum Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('ayah')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'ayah'
              ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 font-black'
              : 'bg-[#071326] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <span>📖 Ayah of the Day</span>
        </button>

        <button
          onClick={() => setActiveTab('hadith')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'hadith'
              ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 font-black'
              : 'bg-[#071326] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <span>📜 Hadith of the Day</span>
        </button>

        <button
          onClick={() => setActiveTab('name')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'name'
              ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 font-black'
              : 'bg-[#071326] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <span>✨ 99 Names: Al-Bāri’</span>
        </button>

        <button
          onClick={() => setActiveTab('seerah')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'seerah'
              ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 font-black'
              : 'bg-[#071326] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <span>🌟 Seerah Chronicle</span>
        </button>

        <button
          onClick={() => setActiveTab('fiqh')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'fiqh'
              ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 font-black'
              : 'bg-[#071326] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <span>⚖️ Practical Fiqh Tip</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 font-black'
              : 'bg-[#071326] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <span>🎯 Daily Quiz (3 Qs)</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0F274D] via-[#0A1931] to-[#071326] border-2 border-[#D4AF37] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* TAB 1: AYAH OF THE DAY */}
        {activeTab === 'ayah' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4 flex-wrap gap-2">
              <div>
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                  Daily Quran Revelation • Quran.com API Synced
                </div>
                <h3 className="text-lg font-serif font-black text-white">
                  {DAILY_MADRASAH.ayahOfTheDay.surahNameEnglish} ({DAILY_MADRASAH.ayahOfTheDay.surahNumber}:{DAILY_MADRASAH.ayahOfTheDay.ayahNumber})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAyahAudio}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] text-[#0A1931] font-mono font-black text-xs flex items-center gap-2 shadow"
                >
                  {isPlayingRecitation ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlayingRecitation ? 'Pause Recitation' : 'Play Recitation (Sheikh AbdulBaset)'}</span>
                </button>

                <button
                  onClick={() => toggleBookmark('Ayah 59:24')}
                  className="p-2 rounded-xl bg-[#071326] text-[#D4AF37] border border-[#D4AF37]/40"
                  title="Bookmark Ayah"
                >
                  <Bookmark className={`w-4 h-4 ${savedLessons.includes('Ayah 59:24') ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Arabic Verse Display */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#071326] border border-[#D4AF37]/50 text-right space-y-3 shadow-inner">
              <div className="font-serif text-xl sm:text-3xl text-[#FFF3B0] leading-loose sm:leading-[2.5]" dir="rtl">
                {DAILY_MADRASAH.ayahOfTheDay.arabicText}
              </div>
              <div className="text-xs font-mono text-[#D4AF37]/70">
                — {DAILY_MADRASAH.ayahOfTheDay.surahNameArabic}
              </div>
            </div>

            {/* English Translation */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                Authoritative English Meaning:
              </div>
              <blockquote className="text-sm sm:text-base font-serif italic text-white leading-relaxed p-4 rounded-xl bg-[#0A1931] border border-slate-800">
                "{DAILY_MADRASAH.ayahOfTheDay.englishTranslation}"
              </blockquote>
            </div>

            {/* Tafsir Ibn Kathir Short Commentary */}
            <div className="p-5 rounded-2xl bg-[#08152B] border border-[#D4AF37]/40 space-y-2">
              <div className="text-xs font-mono uppercase text-[#D4AF37] font-bold flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Tafsir Ibn Kathir Commentary:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {DAILY_MADRASAH.ayahOfTheDay.tafsirIbnKathir}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: HADITH OF THE DAY */}
        {activeTab === 'hadith' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
              <div>
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                  {DAILY_MADRASAH.hadithOfTheDay.source}
                </div>
                <h3 className="text-lg font-serif font-black text-white">
                  {DAILY_MADRASAH.hadithOfTheDay.narrator}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                Sahih (Authentic)
              </span>
            </div>

            {/* Arabic Hadith */}
            <div className="p-6 rounded-2xl bg-[#071326] border border-[#D4AF37]/50 text-right space-y-2">
              <div className="font-serif text-lg sm:text-2xl text-[#FFF3B0] leading-loose" dir="rtl">
                {DAILY_MADRASAH.hadithOfTheDay.arabicText}
              </div>
            </div>

            {/* English Translation */}
            <div className="p-4 rounded-xl bg-[#0A1931] border border-slate-800 space-y-2">
              <div className="text-xs font-mono uppercase text-[#D4AF37] font-bold">
                Translation:
              </div>
              <p className="text-sm sm:text-base font-serif italic text-white leading-relaxed">
                {DAILY_MADRASAH.hadithOfTheDay.englishText}
              </p>
            </div>

            {/* Practical Daily Life Lesson */}
            <div className="p-5 rounded-2xl bg-[#08152B] border border-[#D4AF37]/40 space-y-2">
              <div className="text-xs font-mono uppercase text-[#D4AF37] font-bold">
                ✦ Practical Modern Lesson:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {DAILY_MADRASAH.hadithOfTheDay.practicalLesson}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: 99 NAMES OF ALLAH (AL-BARI) */}
        {activeTab === 'name' && (
          <div className="space-y-6">
            <div className="text-center space-y-3 pb-6 border-b border-[#D4AF37]/30">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold uppercase">
                Asma’ul Husna • Name #{DAILY_MADRASAH.nameOfAllah.number}
              </span>
              <div className="text-5xl sm:text-6xl font-serif text-[#FFF3B0] font-black" dir="rtl">
                {DAILY_MADRASAH.nameOfAllah.arabic}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                {DAILY_MADRASAH.nameOfAllah.transliteration}
              </h3>
              <p className="text-sm sm:text-base font-serif italic text-[#D4AF37]">
                "{DAILY_MADRASAH.nameOfAllah.meaning}"
              </p>
            </div>

            {/* Philosophical & Theological Explanation */}
            <div className="p-5 rounded-2xl bg-[#08152B] border border-[#D4AF37]/40 space-y-2">
              <div className="text-xs font-mono uppercase text-[#D4AF37] font-bold">
                Spiritual Essence & Cosmological Role:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {DAILY_MADRASAH.nameOfAllah.explanation}
              </p>
            </div>

            {/* Du'a Formulation */}
            <div className="p-5 rounded-2xl bg-[#071326] border border-emerald-500/40 text-emerald-200 space-y-2">
              <div className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                <span>Recommended Contemplative Du’a:</span>
              </div>
              <p className="text-xs sm:text-sm italic font-serif">
                "{DAILY_MADRASAH.nameOfAllah.duaSuggestion}"
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: SEERAH CHRONICLE */}
        {activeTab === 'seerah' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
              <div>
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                  Chronicle #{DAILY_MADRASAH.seerahStory.episode} • {DAILY_MADRASAH.seerahStory.period}
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-black text-white">
                  {DAILY_MADRASAH.seerahStory.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#071326] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono">
                Historical Blueprint
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed p-5 rounded-2xl bg-[#071326] border border-slate-800">
              {DAILY_MADRASAH.seerahStory.narrative}
            </p>

            <div className="p-5 rounded-2xl bg-[#08152B] border border-[#D4AF37]/50 space-y-2">
              <div className="text-xs font-mono uppercase text-[#D4AF37] font-bold">
                ✦ Leadership & Civilization Takeaway:
              </div>
              <p className="text-xs sm:text-sm text-white font-serif italic">
                "{DAILY_MADRASAH.seerahStory.moralTakeaway}"
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: PRACTICAL FIQH TIP */}
        {activeTab === 'fiqh' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
              <div>
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                  Contemporary Legal Jurisprudence • {DAILY_MADRASAH.fiqhTip.category}
                </div>
                <h3 className="text-lg font-serif font-black text-white">
                  {DAILY_MADRASAH.fiqhTip.question}
                </h3>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#08152B] border border-[#D4AF37]/50 space-y-3">
              <div className="text-xs font-mono uppercase text-[#D4AF37] font-bold">
                Legal Ruling & Economic Standard:
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {DAILY_MADRASAH.fiqhTip.ruling}
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                Primary Dalil (Evidence): {DAILY_MADRASAH.fiqhTip.dalil}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: INTERACTIVE DAILY QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
              <div>
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                  Daily Knowledge Check • 300 Max Points
                </div>
                <h3 className="text-lg font-serif font-black text-white">
                  Test Your Comprehension on Today's Madrasah
                </h3>
              </div>

              {quizSubmitted && (
                <button
                  onClick={handleResetQuiz}
                  className="px-3 py-1.5 rounded-lg bg-[#071326] text-xs font-mono text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {DAILY_MADRASAH.dailyQuiz.questions.map((q, qIdx) => {
                const userSelected = selectedAnswers[qIdx];
                const isAnswered = userSelected !== undefined;
                const isCorrect = userSelected === q.correctIndex;

                return (
                  <div key={qIdx} className="p-5 rounded-2xl bg-[#071326] border border-slate-800 space-y-3">
                    <div className="text-xs sm:text-sm font-bold text-white flex items-start gap-2">
                      <span className="text-[#D4AF37] font-mono">Q{qIdx + 1}.</span>
                      <span>{q.question}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userSelected === optIdx;
                        let btnStyle = 'bg-[#0A1931] border-slate-700 text-slate-300 hover:border-[#D4AF37]';
                        
                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold';
                          } else if (isChosen) {
                            btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-300 line-through';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-[#D4AF37] text-[#0A1931] border-[#D4AF37] font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {quizSubmitted && isChosen && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 rounded-xl bg-[#0A1931] border border-slate-800 text-[11px] font-mono text-slate-300">
                        <strong className="text-[#D4AF37]">Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!quizSubmitted ? (
                <button
                  onClick={handleGradeQuiz}
                  disabled={Object.keys(selectedAnswers).length < DAILY_MADRASAH.dailyQuiz.questions.length}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] text-[#0A1931] font-mono font-black text-xs uppercase tracking-wider shadow-lg hover:from-[#FFF3B0] disabled:opacity-50 transition-all"
                >
                  Submit & Calculate Knowledge Points
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-300">
                    Your Score: <strong className="text-xl text-[#FFF3B0]">{quizScore} / 300 XP</strong>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                    {quizScore === 300 ? '✦ Perfect Distinction' : '✦ Lesson Completed'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
