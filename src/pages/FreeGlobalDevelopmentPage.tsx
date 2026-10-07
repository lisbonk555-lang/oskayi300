import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Layers, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Building2, 
  Briefcase, 
  Cpu, 
  Anchor, 
  SunMedium, 
  MapPin, 
  Clock, 
  Scale, 
  Lock, 
  DollarSign, 
  Send, 
  Check, 
  AlertCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface FreeGlobalDevelopmentPageProps {
  onNavigateHome?: () => void;
  onOpenVerification?: () => void;
}

interface ApplicationFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  sector: string;
  size: string;
  brief: string;
  sponsorType: string;
}

interface RegionDetail {
  id: string;
  name: string;
  coords: { x: number; y: number }; // percentage on map
  projectsCount: string;
  flag: string;
  featuredSector: string;
  keyProjects: { name: string; size: string; status: string; focus: string }[];
}

export const FreeGlobalDevelopmentPage: React.FC<FreeGlobalDevelopmentPageProps> = ({
  onNavigateHome,
  onOpenVerification
}) => {
  // Sync page SEO title
  useEffect(() => {
    document.title = "Free Global Project Development Service | Oskayi Consult | $1B+ Value";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Live queued applications stats from backend
  const [queuedThisWeek, setQueuedThisWeek] = useState<number>(38);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [activeRegionId, setActiveRegionId] = useState<string>('gulf');

  // Form handling
  const [formData, setFormData] = useState<ApplicationFormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: 'Kenya',
    sector: 'Infrastructure & Port Terminals',
    size: '$1.5B - $2.5B',
    brief: '',
    sponsorType: 'Sovereign / State Corporation'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Fetch live stats from API
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/applications');
      if (res.ok) {
        const data = await res.json();
        if (data.queuedThisWeek) setQueuedThisWeek(data.queuedThisWeek);
        if (data.applications) setRecentApplications(data.applications);
      }
    } catch {
      // Keep initial fallback
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionSuccess(data.application);
        if (data.queuedThisWeek) setQueuedThisWeek(data.queuedThisWeek);
        fetchStats();
      } else {
        setErrorMessage(data.error || 'Failed to submit application. Please verify details.');
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToApply = () => {
    const el = document.getElementById('apply-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Regions dataset for Global Coverage
  const regions: RegionDetail[] = [
    {
      id: 'east-africa',
      name: 'East & West Africa (Kenya & Ghana)',
      coords: { x: 55, y: 55 },
      projectsCount: '34 Projects',
      flag: '🇰🇪 🇬🇭',
      featuredSector: 'Clean Energy & Regional Heavy Rail',
      keyProjects: [
        { name: 'Mombasa Clean Energy Port Grid', size: '$1.85B', status: 'Syndication Pack Ready', focus: '100 SBLC aggregation via insured escrow' },
        { name: 'Accra-Kumasi Industrial Logistics Spine', size: '$2.10B', status: 'Tri-Jurisdictional SPV', focus: 'Mauritius/Ghana IP structuring' }
      ]
    },
    {
      id: 'gulf',
      name: 'Middle East & GCC (Saudi Arabia & UAE)',
      coords: { x: 62, y: 38 },
      projectsCount: '28 Projects',
      flag: '🇸🇦 🇦🇪',
      featuredSector: 'Desalination & Sovereign Megastructures',
      keyProjects: [
        { name: 'Red Sea Industrial Desalination & Solar Farm', size: '$2.40B', status: 'Insurance Wrap Bound', focus: '$1.155B contractor milestone reserve' },
        { name: 'Gulf Sustainable Logistics City', size: '$1.95B', status: 'Underwriting Approved', focus: 'MT760 Bottomline Swift pipeline' }
      ]
    },
    {
      id: 'uk-europe',
      name: 'UK & Western Europe',
      coords: { x: 48, y: 26 },
      projectsCount: '19 Projects',
      flag: '🇬🇧 🇩🇪',
      featuredSector: 'Offshore Wind & Green Hydrogen Storage',
      keyProjects: [
        { name: 'North Sea Hydrogen Offshore Complex', size: '$2.80B', status: 'Due Diligence Cleared', focus: 'Multi-bank syndication with EPC wrap' },
        { name: 'Celtic Sea Deep-Water Floating Wind Array', size: '$1.65B', status: 'Turnkey Procurement Stage', focus: 'Certified 4-milestone engineering disbursement' }
      ]
    },
    {
      id: 'latam',
      name: 'Latin America (Brazil & Chile)',
      coords: { x: 32, y: 72 },
      projectsCount: '22 Projects',
      flag: '🇧🇷 🇨🇱',
      featuredSector: 'Agricultural Rail Corridors & Critical Minerals',
      keyProjects: [
        { name: 'Cerrado Agrologistics Freight Intermodal', size: '$1.75B', status: 'Feasibility Structuring', focus: 'Full bankable pack ESG alignment' },
        { name: 'Atacama Lithium Refining Eco-Terminal', size: '$2.20B', status: 'Insured Facility Structuring', focus: '100% turnkey contractor reserve' }
      ]
    },
    {
      id: 'north-america',
      name: 'North America (USA & Canada)',
      coords: { x: 22, y: 32 },
      projectsCount: '16 Projects',
      flag: '🇺🇸 🇨🇦',
      featuredSector: 'Next-Gen Power Grids & Semiconductor Megafabs',
      keyProjects: [
        { name: 'Appalachian Microgrid Industrial Cluster', size: '$1.90B', status: 'SBLC Platform Aggregated', focus: 'Bottomline Swift gpi tracking' },
        { name: 'Ontario Clean Biofuel Refining Complex', size: '$1.55B', status: 'Bankable Pack Finalized', focus: 'Zero upfront developer cost' }
      ]
    },
    {
      id: 'asia-pacific',
      name: 'Asia-Pacific (Singapore, India, Australia)',
      coords: { x: 78, y: 56 },
      projectsCount: '25 Projects',
      flag: '🇸🇬 🇮🇳 🇦🇺',
      featuredSector: 'Subsea Interconnectors & Smart Megacities',
      keyProjects: [
        { name: 'Indo-Pacific Subsea Energy Cable Array', size: '$3.20B', status: 'In Review Pipeline', focus: 'Escrow reserved for certified EPC builder' },
        { name: 'Western Australia Green Ammonia Terminal', size: '$2.60B', status: 'Insurance Assessment', focus: 'Risk cover structured before syndication' }
      ]
    }
  ];

  const activeRegion = regions.find(r => r.id === activeRegionId) || regions[1];

  return (
    <div className="min-h-screen bg-[#070E1E] text-slate-100 selection:bg-[#D4AF37] selection:text-[#0A1931]">
      
      {/* SECTION ANCHOR NAV */}
      <div className="sticky top-[69px] z-30 bg-[#0A1931]/95 backdrop-blur-md border-b border-[#D4AF37]/20 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4 no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0 text-[#D4AF37] font-semibold">
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>FREE GLOBAL DEVELOPMENT</span>
          </div>

          <div className="flex items-center gap-6 shrink-0 text-slate-300 font-medium text-[11px]">
            <button onClick={() => scrollToSection('overview-section')} className="hover:text-[#D4AF37] transition-colors">Overview</button>
            <button onClick={() => scrollToSection('how-it-works-section')} className="hover:text-[#D4AF37] transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('value-stack-section')} className="hover:text-[#D4AF37] transition-colors">Included Free ($1B+)</button>
            <button onClick={() => scrollToSection('sectors-section')} className="hover:text-[#D4AF37] transition-colors">Sectors</button>
            <button onClick={() => scrollToSection('coverage-section')} className="hover:text-[#D4AF37] transition-colors">Global Coverage</button>
            <button onClick={() => scrollToSection('why-free-section')} className="hover:text-[#D4AF37] transition-colors">Why Free?</button>
            <button onClick={() => scrollToSection('case-studies-section')} className="hover:text-[#D4AF37] transition-colors">Pipeline Proof</button>
          </div>

          <button
            onClick={scrollToApply}
            className="shrink-0 px-3 py-1 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0A1931] font-bold rounded-md hover:brightness-110 transition-all text-[11px] shadow-sm shadow-[#D4AF37]/20"
          >
            Apply Free
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section id="overview-section" className="relative pt-16 pb-24 px-4 sm:px-8 overflow-hidden border-b border-[#D4AF37]/15">
        {/* Background Visual Map & Luxury Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#D4AF37]/15 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top Badge: 1000+ Projects Capacity Over Time | 20 Per Week | 4 Per Day | Rest Queued */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] shadow-lg shadow-[#D4AF37]/10">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span>1000+ Projects Capacity Over Time</span>
              <span className="text-slate-500">|</span>
              <span className="text-white">20 Per Week</span>
              <span className="text-slate-500">|</span>
              <span className="text-white">4 Per Day</span>
              <span className="text-slate-500">|</span>
              <span className="text-amber-300">Rest Queued</span>
            </div>
          </div>

          {/* Main Headline & Subheadline */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              We Develop Your <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent">$1.5B+ Project Free</span> — Globally
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              <strong className="text-white font-semibold">$1B+ in end-to-end advisory, structuring, syndication, and risk coverage</strong> — Included free when your project qualifies for our Insured Syndicated Loan Platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={scrollToApply}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#0A1931] font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-[#D4AF37]/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#FFF3B0]/60"
              >
                <span>Apply Your Project Free</span>
                <ArrowRight className="w-4 h-4 text-[#0A1931]" />
              </button>

              <button
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto px-7 py-4 bg-[#0A1931] hover:bg-[#132746] text-slate-200 border border-[#D4AF37]/40 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>See How It Works</span>
              </button>
            </div>

            {/* Live Queue Counter Metric */}
            <div className="pt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2 bg-[#0A1931]/80 px-4 py-2 rounded-lg border border-[#D4AF37]/20">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300">Live Intake Queue:</span>
                <strong className="text-[#D4AF37] font-bold text-sm">{queuedThisWeek} Projects Queued This Week</strong>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Eligibility Decision: <strong className="text-white">48 Hours</strong></span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* METRICS BAR */}
      <section className="bg-[#0A1931] border-b border-[#D4AF37]/20 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37]">1,000+</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Pipeline Capacity Over Time</div>
          </div>
          <div className="space-y-1 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">20 Projects/Wk</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Intake Processing Target</div>
          </div>
          <div className="space-y-1 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">4 Per Day</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Underwriting Slots</div>
          </div>
          <div className="space-y-1 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37]">$1.5T</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Total Capacity Ready</div>
          </div>
        </div>
      </section>

      {/* 3. VALUE STACK - WHAT'S INCLUDED FREE (6 cards - icons - gold borders) */}
      <section id="value-stack-section" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Included At Zero Upfront Cost</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            $1B+ Value Delivered Free To Qualified Projects
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Traditional investment banks and developer houses invoice tens of millions in non-refundable retainers. We invest our complete institutional engine upfront.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#0A1931]/90 rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] mb-1">VALUE PILLAR 01</div>
              <h3 className="text-xl font-bold text-white mb-3">Project Structuring & Feasibility</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Full-scope financial model, bankable feasibility documentation, cashflow waterfall sensitivity, and international Equator Principles / ESG compliance.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Market Cost: $5M - $12M</span>
              <strong className="text-[#D4AF37]">INCLUDED FREE</strong>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0A1931]/90 rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] mb-1">VALUE PILLAR 02</div>
              <h3 className="text-xl font-bold text-white mb-3">Global Syndication</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Aggregation of 100 institutional banks x $15M MT760 SBLC via our insured syndicated platform, eliminating single-funder concentration bottlenecks.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Market Cost: 2-3% Syndication Fee</span>
              <strong className="text-[#D4AF37]">INCLUDED FREE</strong>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0A1931]/90 rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] mb-1">VALUE PILLAR 03</div>
              <h3 className="text-xl font-bold text-white mb-3">Legal & Compliance</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Tri-jurisdictional legal structuring (Ghana IP holding, Mauritius tax-treaty neutrality, and Dubai DIFC capital security), paired with master institutional escrow agreements.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Market Cost: $3M - $8M</span>
              <strong className="text-[#D4AF37]">INCLUDED FREE</strong>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0A1931]/90 rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] mb-1">VALUE PILLAR 04</div>
              <h3 className="text-xl font-bold text-white mb-3">Insurance & Risk Cover</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                $1.155B per project comprehensive insurance wrap policy plus ring-fenced escrow account specifically reserved for the certified turnkey contractor.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Market Cost: Tens of Millions</span>
              <strong className="text-[#D4AF37]">INCLUDED FREE</strong>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-[#0A1931]/90 rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] mb-1">VALUE PILLAR 05</div>
              <h3 className="text-xl font-bold text-white mb-3">Turnkey Contractor Procurement</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                4-milestone certified engineering procurement structure (25% Mobilization, 25% Substructure, 25% Systems, 25% Commissioning) ensuring EPC performance warranties.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Market Cost: $4M - $9M</span>
              <strong className="text-[#D4AF37]">INCLUDED FREE</strong>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-[#0A1931]/90 rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] mb-1">VALUE PILLAR 06</div>
              <h3 className="text-xl font-bold text-white mb-3">Swift & Tracking</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Direct integration with Bottomline Business Connect, real-time Swift gpi disbursement tracking, cryptographic milestone logs, and transparent bank confirmation.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Market Cost: Enterprise Integration</span>
              <strong className="text-[#D4AF37]">INCLUDED FREE</strong>
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS - 4 STEPS (Timeline - Simple English) */}
      <section id="how-it-works-section" className="py-20 px-4 sm:px-8 bg-[#09152B] border-y border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Transparent Execution Protocol</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How It Works in 4 Clear Steps</h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Simple English, no ambiguity. A predictable sequence from your initial brief to concrete milestone disbursement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-[#0A1931] p-6 rounded-2xl border border-[#D4AF37]/25 relative">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0A1931] font-black flex items-center justify-center text-base mb-4 shadow-md shadow-[#D4AF37]/30">
                1
              </div>
              <div className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-1">Step 1</div>
              <h3 className="text-lg font-bold text-white mb-2">Apply</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Submit your project brief through our intake terminal. Takes less than 10 minutes. No retainer fees or application charges.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Time: &lt;10 mins</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0A1931] p-6 rounded-2xl border border-[#D4AF37]/25 relative">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0A1931] font-black flex items-center justify-center text-base mb-4 shadow-md shadow-[#D4AF37]/30">
                2
              </div>
              <div className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-1">Step 2</div>
              <h3 className="text-lg font-bold text-white mb-2">Qualify</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our quantitative risk team assesses your project against bankability, ESG compliance, and institutional insurance eligibility criteria.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Turnaround: 48 Hours</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0A1931] p-6 rounded-2xl border border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/40 relative bg-gradient-to-b from-[#0A1931] to-[#122340]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] text-[#0A1931] font-black flex items-center justify-center text-base mb-4 shadow-md shadow-[#D4AF37]/40">
                3
              </div>
              <div className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-1">Step 3</div>
              <h3 className="text-lg font-bold text-white mb-2">Develop Free</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We develop the entire bankable pack free of charge: financial model, legal SPV, syndication architecture, and insurance wrap policy.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-amber-300 flex items-center gap-1.5 font-semibold">
                <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>$0 Invoiced to Sponsor</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0A1931] p-6 rounded-2xl border border-[#D4AF37]/25 relative">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0A1931] font-black flex items-center justify-center text-base mb-4 shadow-md shadow-[#D4AF37]/30">
                4
              </div>
              <div className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-1">Step 4</div>
              <h3 className="text-lg font-bold text-white mb-2">Syndicate & Build</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                $1.5B syndicated loan is funded via our banking network, with $1.155B escrow reserved for the builder across 4 certified engineering milestones.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>4-Milestone Construction</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. GLOBAL COVERAGE MAP & INTERACTIVE REGIONS */}
      <section id="coverage-section" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Worldwide Institutional Reach</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Any Country — Any Sector Over $1.5B
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From African sovereign corridors to Middle Eastern megastructures and European offshore arrays, our platform operates cross-border with universal bankability.
          </p>
        </div>

        {/* Interactive World Map Deck */}
        <div className="bg-[#0A1931] rounded-2xl border border-[#D4AF37]/30 overflow-hidden shadow-2xl">
          
          {/* Top Region Selector Bar */}
          <div className="p-4 bg-[#070E1E] border-b border-[#D4AF37]/20 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs text-slate-400 font-semibold px-2 shrink-0">SELECT REGION:</span>
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRegionId(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                  activeRegionId === r.id
                    ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20 font-bold'
                    : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span>{r.flag}</span>
                <span>{r.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${activeRegionId === r.id ? 'bg-[#0A1931] text-[#D4AF37]' : 'bg-slate-800 text-slate-400'}`}>
                  {r.projectsCount}
                </span>
              </button>
            ))}
          </div>

          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Schematic World Map with Pulsing Pins */}
            <div className="lg:col-span-7 bg-[#070E1E] rounded-xl border border-slate-800 p-6 relative overflow-hidden min-h-[340px] flex flex-col justify-between">
              
              {/* Abstract luxury world grid background */}
              <div className="absolute inset-0 opacity-25">
                <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Latitude and Longitude lines */}
                  <line x1="0" y1="125" x2="1000" y2="125" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="0" y1="250" x2="1000" y2="250" stroke="#D4AF37" strokeWidth="0.8" />
                  <line x1="0" y1="375" x2="1000" y2="375" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
                  
                  <line x1="200" y1="0" x2="200" y2="500" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="400" y1="0" x2="400" y2="500" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="600" y1="0" x2="600" y2="500" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="800" y1="0" x2="800" y2="500" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />

                  {/* Continent schematic outlines */}
                  <path d="M150 120 Q 220 100 280 140 T 260 260 T 170 200 Z" fill="#132746" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
                  <path d="M280 290 Q 340 310 320 420 T 250 380 Z" fill="#132746" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
                  <path d="M460 110 Q 520 90 560 130 T 490 200 Z" fill="#132746" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
                  <path d="M470 210 Q 560 230 540 370 T 460 300 Z" fill="#132746" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
                  <path d="M570 120 Q 750 90 820 180 T 700 290 T 590 220 Z" fill="#132746" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
                  <path d="M760 330 Q 860 340 840 430 T 750 390 Z" fill="#132746" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
                </svg>
              </div>

              {/* Dynamic Region Pins on Map */}
              <div className="absolute inset-0">
                {regions.map((r) => {
                  const isCurrent = r.id === activeRegionId;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setActiveRegionId(r.id)}
                      style={{ left: `${r.coords.x}%`, top: `${r.coords.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                    >
                      <div className="relative flex items-center justify-center">
                        {isCurrent && (
                          <span className="absolute w-8 h-8 rounded-full bg-[#D4AF37]/30 animate-ping pointer-events-none" />
                        )}
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                          isCurrent 
                            ? 'bg-[#D4AF37] text-[#0A1931] scale-125 ring-2 ring-white' 
                            : 'bg-[#0A1931] text-[#D4AF37] border border-[#D4AF37]/60 group-hover:scale-110'
                        }`}>
                          <MapPin className="w-3 h-3" />
                        </div>
                        <span className={`absolute top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] whitespace-nowrap font-bold shadow-md ${
                          isCurrent ? 'bg-[#D4AF37] text-[#0A1931]' : 'bg-[#0A1931]/90 text-slate-300 border border-slate-700'
                        }`}>
                          {r.name.split(' ')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Info */}
              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span>Verified Hubs: Nairobi • Riyadh • London • Dubai • Accra • São Paulo</span>
                </span>
                <span className="font-mono text-[#D4AF37]">GLOBAL PROTOCOL ACTIVE</span>
              </div>
            </div>

            {/* Region Detail Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl mr-2">{activeRegion.flag}</span>
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">REGION DOSSIER</span>
                  <h3 className="text-xl font-bold text-white mt-1">{activeRegion.name}</h3>
                </div>
                <div className="px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-lg text-xs font-mono text-[#D4AF37] font-bold">
                  {activeRegion.projectsCount} Queued
                </div>
              </div>

              <div className="bg-[#070E1E] p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="text-slate-400">Sector Specialization:</div>
                <div className="text-white font-semibold text-sm flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#D4AF37]" />
                  <span>{activeRegion.featuredSector}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Featured Qualifying Projects In This Jurisdiction:
                </div>
                {activeRegion.keyProjects.map((p, idx) => (
                  <div key={idx} className="bg-[#070E1E] p-3.5 rounded-xl border border-slate-800 hover:border-[#D4AF37]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-xs">{p.name}</span>
                      <span className="font-mono text-xs font-bold text-[#D4AF37]">{p.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Status: <strong className="text-emerald-400">{p.status}</strong></span>
                      <span className="truncate max-w-[170px] text-slate-400">{p.focus}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={scrollToApply}
                className="w-full py-3 bg-[#0A1931] hover:bg-[#132746] text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Submit {activeRegion.name.split(' ')[0]} Project for Free Development</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* SECTORS CAROUSEL / GRID */}
      <section id="sectors-section" className="py-16 px-4 sm:px-8 bg-[#09152B] border-y border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Eligible Industries</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sectors We Develop Over $1.5B</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            <div className="bg-[#0A1931] p-5 rounded-xl border border-slate-800 text-center hover:border-[#D4AF37]/40 transition-all">
              <SunMedium className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">Energy Transition</h4>
              <p className="text-[11px] text-slate-400">Solar utility parks, hydrogen, nuclear micro-SMRs</p>
            </div>

            <div className="bg-[#0A1931] p-5 rounded-xl border border-slate-800 text-center hover:border-[#D4AF37]/40 transition-all">
              <Anchor className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">Ports & Maritime</h4>
              <p className="text-[11px] text-slate-400">Deep sea container hubs, dry docks, logistics quays</p>
            </div>

            <div className="bg-[#0A1931] p-5 rounded-xl border border-slate-800 text-center hover:border-[#D4AF37]/40 transition-all">
              <TrendingUp className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">Transport Corridors</h4>
              <p className="text-[11px] text-slate-400">Heavy freight railways, toll highways, transit links</p>
            </div>

            <div className="bg-[#0A1931] p-5 rounded-xl border border-slate-800 text-center hover:border-[#D4AF37]/40 transition-all">
              <Cpu className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">Digital & AI Fabs</h4>
              <p className="text-[11px] text-slate-400">Subsea cable hubs, hyper-scale tier 4 AI datacenters</p>
            </div>

            <div className="bg-[#0A1931] p-5 rounded-xl border border-slate-800 text-center hover:border-[#D4AF37]/40 transition-all">
              <Building2 className="w-8 h-8 text-[#D4AF37] mx-auto mb-1" />
              <h4 className="text-sm font-bold text-white mb-1">Sovereign Cities</h4>
              <p className="text-[11px] text-slate-400">Special economic zones, smart industrial districts</p>
            </div>

            <div className="bg-[#0A1931] p-5 rounded-xl border border-slate-800 text-center hover:border-[#D4AF37]/40 transition-all">
              <Layers className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">Critical Metals</h4>
              <p className="text-[11px] text-slate-400">Lithium, copper, cobalt value-add processing mills</p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. WHY FREE? - PROFESSIONAL EXPLANATION (Not salesy) */}
      <section id="why-free-section" className="py-20 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#0A1931] via-[#0E203E] to-[#0A1931] p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/40 shadow-2xl relative">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#D4AF37]">COMMERCIAL ALIGNMENT ARCHITECTURE</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why Is Development Provided Free?</h2>
            </div>
          </div>

          <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
            <p>
              Traditional developers charge 5-10% upfront. We don't. Our platform fee (15% platform + 5% award = 20%) is only earned when your $1.5B facility closes and funds via insured syndication.
            </p>
            <p>
              So we invest $5M-$10M of advisory value upfront free — aligned with your success. <strong className="text-[#D4AF37]">No close, no fee.</strong>
            </p>
          </div>

          {/* Compliance Note Small */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-start gap-3 bg-[#070E1E]/60 p-4 rounded-xl border border-slate-800/80">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-400 leading-normal">
              <strong>Regulatory & Compliance Notice:</strong> Free development refers to advisory and structuring value — Third-party costs (e.g., local statutory permits, Environmental Impact Assessments (EIA), site topographical surveys) remain client responsibility — All fees subject to definitive agreements and bank underwriting approvals.
            </p>
          </div>

        </div>
      </section>

      {/* 7. PIPELINE / CASE STUDIES PROOF */}
      <section id="case-studies-section" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Demonstrated Bankability</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Live Pipeline Case Studies</h2>
          </div>
          <div className="text-xs text-slate-400">
            Current capacity queue status: <span className="text-[#D4AF37] font-bold">20 projects weekly / 4 daily slots</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#0A1931] p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[#D4AF37] font-bold">CASE-AFR-01</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                Structuring Complete
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">East African Clean Energy Port Hub</h3>
              <div className="text-xs text-slate-400 mt-1">Kenya Sovereign Corridor • $1.85B Facility</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Synthesized 100-bank MT760 SBLC aggregation with a $1.155B escrow reserve dedicated to the international EPC contractor. Upfront client developer invoice: $0.
            </p>
            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Risk Cover: $1.155B Wrap</span>
              <span className="text-emerald-400 font-medium">Ready for Close</span>
            </div>
          </div>

          <div className="bg-[#0A1931] p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[#D4AF37] font-bold">CASE-GCC-02</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                Syndication Phase
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Red Sea Industrial Desalination Grid</h3>
              <div className="text-xs text-slate-400 mt-1">Saudi Arabia & GCC • $2.40B Facility</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Established tri-jurisdictional legal SPV with Dubai DIFC capital security and full Equator Principles ESG modeling. Connected through Bottomline Business Connect Swift pipeline.
            </p>
            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Swift: gpi Real-time</span>
              <span className="text-emerald-400 font-medium">Active Syndicate</span>
            </div>
          </div>

          <div className="bg-[#0A1931] p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[#D4AF37] font-bold">CASE-EUR-03</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold text-[10px]">
                Underwriting Assessment
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">North Sea Green Hydrogen Storage</h3>
              <div className="text-xs text-slate-400 mt-1">UK & Western Europe • $2.80B Facility</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Underwriting assessment passed in 48 hours. Certified 4-milestone engineering disbursement model deployed with full performance bond guarantee.
            </p>
            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Turnkey Contractor: Tier-1 EPC</span>
              <span className="text-blue-400 font-medium">In Queue</span>
            </div>
          </div>

        </div>
      </section>

      {/* 8. CTA INTAKE TERMINAL (FORM) */}
      <section id="apply-section" className="py-20 px-4 sm:px-8 bg-[#09152B] border-t border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>48-Hour Assessment Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Build?</h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Join 1,000+ projects queued globally. Submit your initial brief below for our senior structuring committee.
            </p>
          </div>

          {submissionSuccess ? (
            <div className="bg-[#0A1931] rounded-2xl border border-emerald-500/40 p-8 text-center space-y-5 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Project Brief Successfully Queued</h3>
                <p className="text-slate-300 text-sm max-w-lg mx-auto">
                  Your project dossier has been assigned official tracking reference ID:
                </p>
                <div className="inline-block px-4 py-2 bg-[#070E1E] rounded-lg font-mono text-[#D4AF37] text-lg font-bold border border-[#D4AF37]/30">
                  {submissionSuccess.project_id}
                </div>
              </div>

              <div className="bg-[#070E1E] p-4 rounded-xl border border-slate-800 text-left max-w-md mx-auto text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Queue Position:</span>
                  <strong className="text-white">#{submissionSuccess.queue_position || 42} (Review within 48h)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jurisdiction:</span>
                  <strong className="text-white">{submissionSuccess.country}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sector:</span>
                  <strong className="text-white">{submissionSuccess.sector}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Facility Size:</span>
                  <strong className="text-[#D4AF37]">{submissionSuccess.size}</strong>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Our structuring committee will review bankability and respond to <strong className="text-white">{submissionSuccess.email || 'your contact address'}</strong> within 48 hours.
              </p>

              <button
                onClick={() => setSubmissionSuccess(null)}
                className="px-6 py-2.5 bg-[#0A1931] text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#132746] transition-all"
              >
                Submit Another Project
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#0A1931] rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-6">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Lead Principal / Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Dr. Kwame Asante or Lord Alistair Vance"
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., principal@infrastructurecorp.com"
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+233 ... / +44 ... / +966 ..."
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Project Country / Jurisdiction *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="Kenya">Kenya (East Africa)</option>
                    <option value="Ghana">Ghana (West Africa)</option>
                    <option value="Saudi Arabia">Saudi Arabia (GCC / Middle East)</option>
                    <option value="United Arab Emirates">United Arab Emirates (Dubai / Abu Dhabi)</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Brazil">Brazil (Latin America)</option>
                    <option value="Chile">Chile</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Singapore">Singapore / ASEAN</option>
                    <option value="Other Global Jurisdiction">Other Sovereign Jurisdiction (Over $1.5B)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Sector Category *
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="Infrastructure & Port Terminals">Infrastructure & Port Terminals</option>
                    <option value="Energy & Power Transition">Energy & Power Transition</option>
                    <option value="Rail & Transport Corridors">Rail & Heavy Transport Corridors</option>
                    <option value="AI Datacenters & Subsea Cables">AI Datacenters & Subsea Cables</option>
                    <option value="Mining & Refining Mills">Mining & Critical Minerals Processing</option>
                    <option value="Smart Sovereign Districts">Special Economic Zones / Smart Cities</option>
                    <option value="Desalination & Water Utility">Desalination & Water Utility</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Target Facility Size (Minimum $1.5B) *
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="$1.5B - $2.0B">$1.5 Billion - $2.0 Billion</option>
                    <option value="$2.0B - $3.0B">$2.0 Billion - $3.0 Billion</option>
                    <option value="$3.0B - $5.0B">$3.0 Billion - $5.0 Billion</option>
                    <option value="$5.0B+ Mega-Corridor">$5.0 Billion+ Mega-Corridor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Sponsoring Entity Type
                  </label>
                  <select
                    value={formData.sponsorType}
                    onChange={(e) => setFormData({ ...formData, sponsorType: e.target.value })}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="Sovereign / State Corporation">Sovereign / State Corporation / Ministry</option>
                    <option value="Tier-1 EPC Contractor">Tier-1 EPC Contractor / Builder</option>
                    <option value="Institutional Developer Consortium">Institutional Developer Consortium</option>
                    <option value="Private Infrastructure Holding">Private Infrastructure Holding Company</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Project Brief & Current Development Status
                </label>
                <textarea
                  rows={4}
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder="Outline key project specs: land concession status, offtake agreements, sovereign backing, or contractor pre-selection..."
                  className="w-full bg-[#070E1E] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-slate-400">
                  <span>Current Intake Queue: </span>
                  <strong className="text-[#D4AF37]">{queuedThisWeek} Projects Queued This Week</strong>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] text-[#0A1931] font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-[#D4AF37]/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#FFF3B0]/60 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Queueing Project...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#0A1931]" />
                        <span>Apply Free (48h Decision)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* Bottom Security & Verification Badge */}
          <div className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-[#D4AF37] font-semibold">Enterprise-Grade</span>
            <span>•</span>
            <span className="text-white font-medium">Secure</span>
            <span>•</span>
            <span className="text-white font-medium">Global</span>
            <span>•</span>
            <span className="text-[#D4AF37] font-semibold">Insured</span>
            <span>•</span>
            <span className="text-white font-medium">Escrow Reserved</span>
          </div>

        </div>
      </section>

    </div>
  );
};
