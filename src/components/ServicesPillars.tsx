import React, { useState } from 'react';
import { Layers, Landmark, ShieldCheck, Cpu, CheckCircle2, ArrowRight, Sparkles, Building } from 'lucide-react';
import { SERVICE_PILLARS } from '../data/companyData';
import { ServicePillar } from '../types';

interface ServicesPillarsProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesPillars: React.FC<ServicesPillarsProps> = ({ onSelectServiceForInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPillar, setSelectedPillar] = useState<ServicePillar | null>(SERVICE_PILLARS[0]);

  const categories = ['All', 'Fintech', 'Project Financing', 'Insurance', 'Web3 & Blockchain', 'ICT & Advisory'];

  const filteredPillars = activeCategory === 'All' 
    ? SERVICE_PILLARS 
    : SERVICE_PILLARS.filter(p => p.category === activeCategory);

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Fintech': return <Landmark className="w-5 h-5 text-sky-400" />;
      case 'Project Financing': return <Building className="w-5 h-5 text-amber-400" />;
      case 'Insurance': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Web3 & Blockchain': return <Cpu className="w-5 h-5 text-purple-400" />;
      default: return <Layers className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-900 text-white px-4 sm:px-8 border-b border-indigo-900/60 relative overflow-hidden">
      
      {/* Background Subtle Mesh */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-900/80 text-amber-300 text-xs font-bold uppercase tracking-wider border border-indigo-700/60 shadow-lg">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Practice Areas & Institutional Solutions</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Institutional Practice Pillars
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Customized for sovereign entities, banks, corporations, and private sector clients delivered through our network of certified international integrated technology partners.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border ${
                activeCategory === cat
                  ? 'bg-amber-400 text-indigo-950 border-amber-300 shadow-lg shadow-amber-400/20'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-indigo-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Master Grid & Detail Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Pillar Selector Cards Column */}
          <div className="lg:col-span-5 space-y-3">
            {filteredPillars.map((pillar) => {
              const isSelected = selectedPillar?.id === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-950 border-amber-400/80 shadow-xl ring-2 ring-amber-400/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-indigo-700 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        {getIconForCategory(pillar.category)}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 font-mono">
                        {pillar.category}
                      </span>
                    </div>

                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-950 text-slate-200 font-semibold border border-indigo-800">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-white hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed font-sans">
                    {pillar.summary}
                  </p>

                  {isSelected && (
                    <div className="absolute right-4 bottom-4 text-amber-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Pillar Full Detail Display Panel - Deep Slate/Indigo Card */}
          {selectedPillar && (
            <div className="lg:col-span-7 bg-slate-950 p-8 rounded-3xl border border-indigo-800 text-white space-y-6 shadow-2xl sticky top-24">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-900/60 border border-indigo-700/80">
                    {getIconForCategory(selectedPillar.category)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-300 uppercase font-mono tracking-wider">
                      {selectedPillar.category} Solution
                    </span>
                    <h3 className="font-sans text-2xl font-bold text-white mt-0.5">
                      {selectedPillar.title}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/80 uppercase">
                  {selectedPillar.status}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Executive Overview</h4>
                <p className="text-slate-200 text-sm leading-relaxed font-sans bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  {selectedPillar.description}
                </p>
              </div>

              {/* Key Capabilities Bullet Points */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Core Capabilities & Institutional Features
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedPillar.keyCapabilities.map((cap, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Model & Target Audience */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Target Audience</span>
                  <div className="text-white font-semibold">{selectedPillar.targetAudience}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-300 font-medium">Partner Delivery Model</span>
                  <div className="text-white font-semibold">{selectedPillar.partnerDeliveryModel}</div>
                </div>
              </div>

              {/* Request Solution Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400 font-mono">
                  Customized for Ghana & Global Deployment
                </span>

                <button
                  onClick={() => onSelectServiceForInquiry(selectedPillar.title)}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-400/20"
                >
                  <span>Inquire About This Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
