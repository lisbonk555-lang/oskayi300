import React, { useState } from 'react';
import { Layers, Landmark, ShieldCheck, Cpu, CreditCard, Network, CheckCircle2, ArrowRight, Sparkles, Building } from 'lucide-react';
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
      case 'Fintech': return <Landmark className="w-5 h-5 text-indigo-600" />;
      case 'Project Financing': return <Building className="w-5 h-5 text-emerald-600" />;
      case 'Insurance': return <ShieldCheck className="w-5 h-5 text-purple-600" />;
      case 'Web3 & Blockchain': return <Cpu className="w-5 h-5 text-indigo-600" />;
      default: return <Layers className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-slate-50 text-slate-900 px-4 sm:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-semibold uppercase tracking-wider border border-indigo-200">
            <Layers className="w-3.5 h-3.5 text-indigo-700" />
            <span>Practice Areas & Partner Solutions</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-950">
            Institutional Practice Pillars
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Customized for various industries in Ghana and internationally, delivered through our network of integrated partners to maintain institutional excellence.
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
                  ? 'bg-indigo-950 text-white border-indigo-900 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-900'
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
                      ? 'bg-white border-indigo-600 shadow-lg ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                        {getIconForCategory(pillar.category)}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 font-mono">
                        {pillar.category}
                      </span>
                    </div>

                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-slate-900 hover:text-indigo-600 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed font-sans">
                    {pillar.summary}
                  </p>

                  {isSelected && (
                    <div className="absolute right-4 bottom-4 text-indigo-600">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Pillar Full Detail Display Panel - Deep Indigo Card */}
          {selectedPillar && (
            <div className="lg:col-span-7 bg-indigo-950 p-8 rounded-2xl border border-indigo-900 text-white space-y-6 shadow-xl sticky top-24">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-900 border border-indigo-700">
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

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/60 uppercase">
                  {selectedPillar.status}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Executive Overview</h4>
                <p className="text-indigo-100/90 text-sm leading-relaxed font-sans">
                  {selectedPillar.description}
                </p>
              </div>

              {/* Key Capabilities Bullet Points */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Core Capabilities & Features
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedPillar.keyCapabilities.map((cap, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-indigo-900/60 border border-indigo-800/80 text-xs text-indigo-100 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Model & Target Audience */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-indigo-800 text-xs">
                <div className="p-3.5 rounded-xl bg-indigo-900/60 border border-indigo-800 space-y-1">
                  <span className="text-indigo-300 font-medium">Target Audience</span>
                  <div className="text-white font-semibold">{selectedPillar.targetAudience}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-900/60 border border-indigo-800 space-y-1">
                  <span className="text-amber-300 font-medium">Partner Delivery Model</span>
                  <div className="text-white font-semibold">{selectedPillar.partnerDeliveryModel}</div>
                </div>
              </div>

              {/* Request Solution Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-indigo-300 font-mono">
                  Customized for Ghana & Global Deployment
                </span>

                <button
                  onClick={() => onSelectServiceForInquiry(selectedPillar.title)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20"
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
