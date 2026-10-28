import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Landmark, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  HelpCircle, 
  Calculator,
  Lock,
  Layers,
  FileCheck
} from 'lucide-react';

interface OskaiHeroProps {
  onStartDiscovery: (category?: string, amount?: number) => void;
  onOpenAssistant: () => void;
}

export function OskaiHero({ onStartDiscovery, onOpenAssistant }: OskaiHeroProps) {
  const [targetAmount, setTargetAmount] = useState<number>(5000);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredCategories = [
    { name: 'Salary advances', icon: Clock, desc: 'Payroll advances repaid on subsequent salary cycle' },
    { name: 'Small-business loans', icon: Landmark, desc: 'Working capital and inventory growth finance' },
    { name: 'Personal loans', icon: FileCheck, desc: 'Medium-term credit for planned life expenditures' },
    { name: 'Mobile-money credit', icon: Layers, desc: 'Digital wallet facilities with automated underwriting' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartDiscovery(selectedCategory, targetAmount);
  };

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800">
        
        {/* Subtle Ambient Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Trust Banner */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-teal-400 mb-6 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>GENUINE LOAN DISCOVERY & APPLICATION PLATFORM</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-slate-300">Bank of Ghana Regulated Lenders</span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-slate-300">Data Protection Act 2012 (Act 843)</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] mb-5">
              Discover Funding.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-amber-400">
                Apply with Confidence.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Compare published loan terms from genuine registered lenders in Ghana, understand full APR costs, 
              and submit standardized applications with transparent status tracking. 
              <strong> Zero simulated approvals. Zero fabricated lenders.</strong>
            </p>
          </div>

          {/* Interactive Loan Search & Filter Box */}
          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md mb-12">
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              
              {/* Category & Search Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    What Type of Loan Are You Looking For?
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm font-medium text-white focus:outline-none focus:border-teal-400"
                  >
                    <option value="All">All 10 Verified Loan Categories</option>
                    <option value="Personal loans">Personal loans</option>
                    <option value="Salary advances">Salary advances</option>
                    <option value="Small-business loans">Small-business loans</option>
                    <option value="Working-capital loans">Working-capital loans</option>
                    <option value="Mobile-money credit">Mobile-money credit</option>
                    <option value="Emergency loans">Emergency loans</option>
                    <option value="Asset and equipment finance">Asset and equipment finance</option>
                    <option value="Invoice financing">Invoice financing</option>
                    <option value="Secured loans">Secured loans</option>
                  </select>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Target Amount: <span className="text-amber-400 font-bold font-mono">GH₵ {targetAmount.toLocaleString()}</span>
                  </label>
                  <div className="pt-2">
                    <input
                      type="range"
                      min={100}
                      max={150000}
                      step={500}
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(Number(e.target.value))}
                      className="w-full accent-teal-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                      <span>GH₵ 100</span>
                      <span>GH₵ 150,000+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>No passwords or PINs requested · Time-bound revocable consent</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onOpenAssistant}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold font-mono transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calculator className="w-4 h-4 text-amber-400" />
                    <span>AI Loan Advisor</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:from-teal-300 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Verified Loans</span>
                  </button>
                </div>
              </div>

            </form>
          </div>

          {/* Responsible Lending Clarification Notice (Mandatory from prompt) */}
          <div className="max-w-3xl mx-auto p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-amber-300">Consumer Notice & Transparency Disclosure:</strong> Oskai Instant Loan is an independent loan discovery and application facilitation platform. We are <strong>not a direct lender</strong>. Actual loan approval, interest rate assignment, and fund disbursement are determined exclusively by the participating licensed lender based on their statutory underwriting and credit criteria.
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars: How the Platform Works */}
      <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold">
              Transparent Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
              How Oskai Instant Loan Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A clear, 4-step path to finding legitimate financing without false promises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-teal-400 font-mono font-black text-sm flex items-center justify-center mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-1">
                  Discover & Compare
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Browse published products from regulated banks and micro-lenders. Compare real APRs, fees, tenures, and eligibility requirements.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-teal-700 font-semibold">
                Verified Lender Feeds
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-teal-400 font-mono font-black text-sm flex items-center justify-center mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-1">
                  AI Terms & Cost Advisory
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use our interactive AI Assistant to understand total repayment amounts, verify your Debt-to-Income (DTI) ratio, and avoid predatory charges.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-teal-700 font-semibold">
                Zero Discrimination
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-teal-400 font-mono font-black text-sm flex items-center justify-center mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-1">
                  Standardized Application
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit required documentation with explicit consent. Your data is routed directly to the selected lender with a unique tracking code.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-teal-700 font-semibold">
                Act 843 Compliant
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-teal-400 font-mono font-black text-sm flex items-center justify-center mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-1">
                  Live Application Tracking
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Follow genuine review stages on your dashboard. Statuses update only upon verifiable lender actions. Disbursal confirmed by transaction reference.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-teal-700 font-semibold">
                No Fake Approvals
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Loan Categories */}
      <section className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold">
                Tailored Financing
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
                Loan Categories Available on Oskai
              </h2>
            </div>
            <button
              onClick={() => onStartDiscovery('All')}
              className="text-xs font-mono font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>View All 10 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onStartDiscovery(cat.name)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-950 group-hover:text-teal-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-teal-700 font-semibold">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Transparent Service-Fee Policy Section */}
      <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-bl-full pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-2">
                Fair & Lawful Fintech Operations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                Our Transparent Service-Fee Policy
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                To maintain our independent platform, research verified tariffs, and facilitate standardized application tracking, Oskai charges a clearly disclosed service fee paid through <strong>Paystack</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono mb-6">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-slate-400 uppercase text-[10px]">What the fee covers</div>
                  <div className="text-white font-semibold mt-0.5">Application packaging, document validation & tracking dashboard.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-slate-400 uppercase text-[10px]">What the fee is NOT</div>
                  <div className="text-amber-400 font-semibold mt-0.5">NOT a loan deposit, collateral, or guaranteed approval fee.</div>
                </div>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed space-y-1.5 border-t border-slate-800 pt-4">
                <p>• Service fees are separate from lender interest, facility charges, and statutory duties.</p>
                <p>• Payment of a service fee does not influence the lender's credit assessment.</p>
                <p>• If platform application processing cannot be initiated, fees are refundable under our refund policy.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
