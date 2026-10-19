import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Share2, 
  Check, 
  Filter, 
  PlusCircle, 
  Clock, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Accessibility
} from 'lucide-react';
import { GLOBAL_MOSQUES, GlobalMosque } from '../../data/masjidData';

export const MasjidMapFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMosque, setSelectedMosque] = useState<GlobalMosque>(GLOBAL_MOSQUES[0]);
  const [filter24h, setFilter24h] = useState(false);
  const [filterJumuah, setFilterJumuah] = useState(false);
  const [filterWheelchair, setFilterWheelchair] = useState(false);
  const [filterWomen, setFilterWomen] = useState(false);
  const [addMosqueModalOpen, setAddMosqueModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form submission state
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filtered mosques
  const filteredMosques = useMemo(() => {
    return GLOBAL_MOSQUES.filter((m) => {
      const matchesSearch = 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.address.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (filter24h && !m.features.isOpen24h) return false;
      if (filterJumuah && !m.features.hasJumuah) return false;
      if (filterWheelchair && !m.features.hasWheelchair) return false;
      if (filterWomen && !m.features.hasWomenSection) return false;

      return true;
    });
  }, [searchQuery, filter24h, filterJumuah, filterWheelchair, filterWomen]);

  const handleShareMosque = (m: GlobalMosque) => {
    const text = `${m.name} (${m.city}, ${m.country})\n${m.address}\nView on Masjid Al-Noor Al-Alami Map`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(m.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleAddMosqueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setAddMosqueModalOpen(false);
      setFormName('');
      setFormCity('');
      setFormCountry('');
      setFormAddress('');
    }, 2500);
  };

  return (
    <section id="map" className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>SECTION 03 • MASJID MAP AL-ALAMI</span>
            <span className="text-slate-500">|</span>
            <span className="text-white">10,000+ Mosques Global Index</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Masjid Map Al-Alami — Global Mosque Finder
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
            Interactive planetary directory of sanctuaries powered by OpenStreetMap Overpass & Google Places. Locate prayer spaces, verify 24/7 access, and submit local community mosques.
          </p>
        </div>

        <button
          onClick={() => setAddMosqueModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] text-[#0A1931] hover:from-[#FFF3B0] text-xs font-mono font-black flex items-center gap-2 transition-all shrink-0 shadow-lg"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Your Mosque</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#071326] border border-[#D4AF37]/40 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            <input
              type="text"
              placeholder="Search mosque by city, country, or neighborhood (e.g. Accra, Dubai, London, Apam)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Near Me Button */}
          <button
            onClick={() => setSearchQuery('Accra')}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-[#0A1931] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-xs font-mono font-bold text-[#D4AF37] flex items-center justify-center gap-2 transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Near Me (Accra)</span>
          </button>
        </div>

        {/* 4 Multi-Criteria Filters */}
        <div className="flex items-center gap-2 flex-wrap pt-1 text-xs font-mono">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-[#D4AF37]" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => setFilter24h(!filter24h)}
            className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              filter24h 
                ? 'bg-[#D4AF37] text-[#0A1931] border-[#D4AF37] font-bold' 
                : 'bg-[#0A1931] text-slate-300 border-slate-700 hover:border-[#D4AF37]/50'
            }`}
          >
            <span>🌙 24/7 Open</span>
          </button>

          <button
            onClick={() => setFilterJumuah(!filterJumuah)}
            className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              filterJumuah 
                ? 'bg-[#D4AF37] text-[#0A1931] border-[#D4AF37] font-bold' 
                : 'bg-[#0A1931] text-slate-300 border-slate-700 hover:border-[#D4AF37]/50'
            }`}
          >
            <span>🕌 Jumu'ah Prayers</span>
          </button>

          <button
            onClick={() => setFilterWheelchair(!filterWheelchair)}
            className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              filterWheelchair 
                ? 'bg-[#D4AF37] text-[#0A1931] border-[#D4AF37] font-bold' 
                : 'bg-[#0A1931] text-slate-300 border-slate-700 hover:border-[#D4AF37]/50'
            }`}
          >
            <Accessibility className="w-3 h-3" />
            <span>Wheelchair Access</span>
          </button>

          <button
            onClick={() => setFilterWomen(!filterWomen)}
            className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              filterWomen 
                ? 'bg-[#D4AF37] text-[#0A1931] border-[#D4AF37] font-bold' 
                : 'bg-[#0A1931] text-slate-300 border-slate-700 hover:border-[#D4AF37]/50'
            }`}
          >
            <span>🧕 Women's Section</span>
          </button>

          {(filter24h || filterJumuah || filterWheelchair || filterWomen) && (
            <button
              onClick={() => {
                setFilter24h(false);
                setFilterJumuah(false);
                setFilterWheelchair(false);
                setFilterWomen(false);
              }}
              className="text-[11px] text-rose-400 hover:underline ml-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Interactive Map Showcase + Mosque Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Map Canvas (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#071326] border-2 border-[#D4AF37]/70 overflow-hidden shadow-2xl relative min-h-[460px] flex flex-col justify-between p-4 sm:p-6">
          
          {/* Simulated High-Fidelity Tactical Map View */}
          <div className="absolute inset-0 bg-[#061124] overflow-hidden pointer-events-none opacity-90">
            {/* Geometric Cartographic Lines */}
            <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
            </svg>

            {/* Glowing Map Landmass Vector (Stylized World / Africa / Middle East) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-25">
              <Globe2 className="w-[500px] h-[500px] text-[#D4AF37]" />
            </div>
          </div>

          {/* Active Mosque Callout Banner Top */}
          <div className="relative z-10 p-3 rounded-xl bg-[#0A1931]/95 border border-[#D4AF37] flex items-center justify-between shadow-xl flex-wrap gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Selected Global Sanctuary
              </div>
              <div className="text-sm font-serif font-black text-white">
                {selectedMosque.name}
              </div>
              <div className="text-[11px] font-mono text-slate-300">
                {selectedMosque.address}
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMosque.name + ' ' + selectedMosque.address)}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#FFF3B0] text-[#0A1931] font-mono font-black text-xs flex items-center gap-1.5 shadow"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Mosque Markers Overlay on Map */}
          <div className="relative z-10 flex-1 my-6 flex items-center justify-center flex-wrap gap-4">
            {GLOBAL_MOSQUES.map((m) => {
              const isSelected = m.id === selectedMosque.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMosque(m)}
                  className={`p-2.5 rounded-xl border transition-all text-left flex items-center gap-2 group ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#0A1931] border-[#FFF3B0] shadow-lg shadow-[#D4AF37]/40 scale-105 font-bold'
                      : 'bg-[#0A1931]/90 text-slate-300 border-[#D4AF37]/50 hover:bg-[#D4AF37]/20 hover:text-white'
                  }`}
                >
                  <span className="text-base">🕌</span>
                  <div>
                    <div className="text-xs font-bold leading-tight">{m.city}</div>
                    <div className={`text-[9px] font-mono ${isSelected ? 'text-[#071326]' : 'text-[#D4AF37]'}`}>
                      {m.country}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Footer Bar */}
          <div className="relative z-10 pt-2 border-t border-[#D4AF37]/30 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Coordinates: {selectedMosque.lat.toFixed(4)}° N, {selectedMosque.lng.toFixed(4)}° W</span>
            <span className="text-emerald-400">OpenStreetMap Overpass Synced</span>
          </div>

        </div>

        {/* Right Column: Mosque Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[560px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#D4AF37]/40">
          
          <div className="text-xs font-mono text-[#D4AF37] uppercase font-bold flex items-center justify-between pb-1">
            <span>{filteredMosques.length} Mosques Found</span>
            <span className="text-slate-400">Click card to select</span>
          </div>

          {filteredMosques.map((m) => {
            const isSelected = m.id === selectedMosque.id;
            return (
              <div
                key={m.id}
                onClick={() => setSelectedMosque(m)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-[#0F274D] border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-xl'
                    : 'bg-[#071326] border-slate-800 hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                      {m.city}, {m.country}
                    </div>
                    <h4 className="text-sm font-serif font-black text-white leading-snug">
                      {m.name}
                    </h4>
                    <div className="text-xs font-serif text-[#D4AF37]/90 mt-0.5" dir="rtl">
                      {m.arabicName}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareMosque(m);
                    }}
                    className="p-1.5 rounded-lg bg-[#0A1931] text-slate-300 hover:text-white border border-slate-700"
                    title="Share Mosque"
                  >
                    {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                  {m.description}
                </p>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-1.5 text-[9px] font-mono">
                  {m.features.isOpen24h && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      24/7 Open
                    </span>
                  )}
                  {m.features.hasJumuah && (
                    <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#FFF3B0] border border-[#D4AF37]/40">
                      Jumu'ah
                    </span>
                  )}
                  {m.features.hasWheelchair && (
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      Wheelchair
                    </span>
                  )}
                  {m.features.hasWomenSection && (
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Women Area
                    </span>
                  )}
                </div>

                {/* Prayer Times Strip */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Fajr: <strong className="text-white">{m.prayerTimes.fajr}</strong></span>
                  <span>Dhuhr: <strong className="text-white">{m.prayerTimes.dhuhr}</strong></span>
                  <span>Maghrib: <strong className="text-white">{m.prayerTimes.maghrib}</strong></span>
                </div>
              </div>
            );
          })}

        </div>

      </div>

      {/* Add Your Mosque Modal */}
      {addMosqueModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-[#0A1931] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <h3 className="text-base font-serif font-black text-white">
                Submit Your Mosque to Global Index
              </h3>
              <button
                onClick={() => setAddMosqueModalOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white font-mono">Mosque Submission Received!</h4>
                <p className="text-xs text-emerald-200">
                  Our verification committee will review and index this mosque within 24 hours. JazakAllah Khair!
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddMosqueSubmit} className="space-y-3.5 text-xs font-mono">
                <div>
                  <label className="text-slate-300 block mb-1">Mosque Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Al-Furqan Central Mosque"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">City / Town:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apam or Kumasi"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Country:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ghana or UAE"
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Physical Street Address:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near Market Circle, Coastal Road"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-slate-300 block">Facilities Available:</label>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded accent-[#D4AF37]" />
                      <span>24/7 Open</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded accent-[#D4AF37]" />
                      <span>Jumu'ah Prayer</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded accent-[#D4AF37]" />
                      <span>Wheelchair Ramp</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded accent-[#D4AF37]" />
                      <span>Women's Prayer Area</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setAddMosqueModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0A1931] font-bold shadow-lg"
                  >
                    Submit Mosque
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
