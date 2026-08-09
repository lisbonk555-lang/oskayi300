import React, { useState, useEffect } from 'react';
import { SHOWCASE_SLIDES, SlideItem } from '../data/slidesData';
import { ChevronLeft, ChevronRight, Play, Pause, Layers, CheckCircle2, ArrowRight, Sparkles, Filter } from 'lucide-react';

interface ShowcaseCarouselProps {
  onSelectServiceForInquiry: (title: string) => void;
}

export const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({
  onSelectServiceForInquiry
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Filter slides by category
  const filteredSlides = SHOWCASE_SLIDES.filter(slide => {
    if (activeCategory === 'All') return true;
    return slide.category === activeCategory;
  });

  // Ensure current index is within bounds when filtering changes
  useEffect(() => {
    if (currentIndex >= filteredSlides.length) {
      setCurrentIndex(0);
    }
  }, [activeCategory, filteredSlides.length]);

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && filteredSlides.length > 1) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredSlides.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, filteredSlides.length]);

  const currentSlide: SlideItem = filteredSlides[currentIndex] || SHOWCASE_SLIDES[0];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredSlides.length) % filteredSlides.length);
  };

  const categories = ['All', 'Project Financing', 'Fintech', 'Web3 & Digital Assets', 'Infrastructure & Trade'];

  return (
    <section id="showcase-slides" className="py-20 bg-slate-100 text-slate-900 px-4 sm:px-8 border-b border-slate-200 relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider border border-indigo-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
            <span>Interactive Portfolio & Case Studies</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-indigo-950">
            20 Strategic Solutions Showcase
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Explore 20 curated institutional practice notes and solution frameworks engineered across Fintech, Project Finance, Reinsurance, and Enterprise Web3.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border ${
                activeCategory === cat
                  ? 'bg-indigo-950 text-white border-indigo-900 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:text-indigo-950 shadow-sm'
              }`}
            >
              {cat === 'All' ? `All 20 Solutions` : cat}
            </button>
          ))}
        </div>

        {/* Main Interactive Slide Display Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden grid lg:grid-cols-12 gap-0 transition-all duration-500">
          
          {/* Left Visual Column: Image & Badges */}
          <div className="lg:col-span-6 relative bg-slate-950 min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden group">
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/30 to-transparent" />

            {/* Top Badge Overlays */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-950/90 text-amber-300 font-mono text-xs font-bold border border-indigo-700/60 shadow-lg">
                Slide {String(currentSlide.id).padStart(2, '0')} / 20
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-indigo-950 font-bold text-xs uppercase tracking-wider shadow-lg">
                {currentSlide.badge}
              </span>
            </div>

            {/* Bottom Highlight Overlay on Image */}
            <div className="absolute bottom-4 left-4 right-4 bg-indigo-950/95 backdrop-blur-md p-4 rounded-2xl border border-indigo-800 text-white space-y-1 shadow-xl">
              <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase tracking-widest block">
                Primary Impact Metric
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-amber-300 font-mono">
                  {currentSlide.metric}
                </span>
                <span className="text-xs text-indigo-100 font-medium">
                  {currentSlide.metricLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Text Column: Notes & Delivery Framework */}
          <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white">
            
            <div className="space-y-5">
              
              {/* Category & Title */}
              <div className="space-y-1.5 border-b border-slate-100 pb-4">
                <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider block">
                  {currentSlide.category} Practice Note
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-indigo-950 leading-snug">
                  {currentSlide.title}
                </h3>
              </div>

              {/* Executive Note Text */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Executive Note & Scope
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  "{currentSlide.executiveNote}"
                </p>
              </div>

              {/* Delivery Framework Capabilities */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  Key Delivery Pillars
                </h4>
                <div className="space-y-2">
                  {currentSlide.deliveryFramework.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Navigation & Action Footer */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Slides Navigation Controls */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-slate-100 hover:bg-indigo-950 hover:text-white text-slate-800 rounded-xl transition-all shadow-sm border border-slate-200"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all border border-slate-200 flex items-center gap-1.5"
                  title={isPlaying ? "Pause Auto-play" : "Start Auto-play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-amber-600" /> : <Play className="w-4 h-4 text-indigo-600" />}
                  <span>{isPlaying ? 'Pause' : 'Auto'}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 bg-slate-100 hover:bg-indigo-950 hover:text-white text-slate-800 rounded-xl transition-all shadow-sm border border-slate-200"
                  title="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => onSelectServiceForInquiry(currentSlide.title)}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <span>Inquire About This Note</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

        {/* 20-Slide Thumbnail Quick Jump Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              Quick Jump Grid (Slide {currentIndex + 1} of {filteredSlides.length})
            </span>
            <span>Click any slide to view details</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
            {filteredSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative rounded-xl overflow-hidden h-20 text-left border transition-all group ${
                    isActive
                      ? 'border-indigo-600 ring-2 ring-indigo-500/40 scale-105 shadow-md'
                      : 'border-slate-200 hover:border-indigo-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 ${isActive ? 'bg-indigo-950/40' : 'bg-slate-950/60'}`} />
                  <div className="absolute top-1 left-1.5 text-[10px] font-mono font-bold text-white">
                    #{String(slide.id).padStart(2, '0')}
                  </div>
                  <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-bold text-white truncate leading-tight">
                    {slide.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
