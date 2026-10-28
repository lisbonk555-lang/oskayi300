import React, { useState } from 'react';
import { 
  Building2, 
  ExternalLink, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  Search, 
  Info,
  BadgeAlert
} from 'lucide-react';
import { OskaiLender, OskaiLoanProduct } from '../../server/oskaiLoanService';

interface OskaiLenderDirectoryProps {
  lenders: OskaiLender[];
  products: OskaiLoanProduct[];
  onSelectProduct: (product: OskaiLoanProduct) => void;
}

export const OskaiLenderDirectory: React.FC<OskaiLenderDirectoryProps> = ({
  lenders,
  products,
  onSelectProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedLender, setSelectedLender] = useState<OskaiLender | null>(null);

  const filteredLenders = lenders.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.regulatoryAuthority && l.regulatoryAuthority.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.country && l.country.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'commercial') return matchesSearch && l.licenseType.toLowerCase().includes('universal bank');
    if (filterType === 'savings') return matchesSearch && l.licenseType.toLowerCase().includes('savings');
    if (filterType === 'microfinance') return matchesSearch && (l.licenseType.toLowerCase().includes('non-profit') || l.licenseType.toLowerCase().includes('micro'));
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-teal-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Financial Institutions Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white mb-2">
            Participating Lenders & Licensed Credit Providers
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            All lending institutions indexed on Oskai Instant Loan hold active regulatory licenses from the Bank of Ghana (BoG) or are accredited global microfinance networks. We index official terms, public APRs, and direct customer care channels.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by bank name, license..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Lenders' },
            { id: 'commercial', label: 'Commercial Banks' },
            { id: 'savings', label: 'Savings & Loans' },
            { id: 'microfinance', label: 'Microfinance & Global' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterType === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lenders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLenders.map(lender => {
          const lenderProducts = products.filter(p => p.lenderId === lender.id);

          return (
            <div 
              key={lender.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5 space-y-4">
                {/* Top Row: Institution Name & Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-bold text-lg shrink-0">
                      {lender.shortName.substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {lender.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {lender.licenseType}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Regulated
                  </span>
                </div>

                {/* Regulator and License Info */}
                <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1.5 text-slate-600 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Regulator:</span>
                    <span className="font-semibold text-slate-800">{lender.regulatoryAuthority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">HQ Location:</span>
                    <span className="font-medium text-slate-700">{lender.headOfficeAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Products:</span>
                    <span className="font-semibold text-teal-700">{lenderProducts.length} published</span>
                  </div>
                </div>

                {/* Contacts */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{lender.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{lender.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a 
                      href={lender.officialWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700 underline truncate inline-flex items-center gap-1"
                    >
                      Official Website <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Products Preview */}
                {lenderProducts.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Available Loan Products
                    </div>
                    <div className="space-y-1.5">
                      {lenderProducts.map(p => (
                        <button
                          key={p.id}
                          onClick={() => onSelectProduct(p)}
                          className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 transition-colors flex items-center justify-between group"
                        >
                          <div className="truncate pr-2">
                            <span className="text-xs font-semibold text-slate-800 group-hover:text-teal-900 block truncate">
                              {p.title}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              APR {p.aprRange} • {p.maxTenureMonths} mo
                            </span>
                          </div>
                          <span className="text-[11px] text-teal-600 font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform">
                            Apply &rarr;
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Direct Lender Portal</span>
                <a
                  href={lender.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-700 hover:text-teal-600 inline-flex items-center gap-1"
                >
                  Visit Portal <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regulatory Notice Banner */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <p className="font-semibold text-amber-950">
            Notice Regarding Lender Relationships & Bank of Ghana Licensure:
          </p>
          <p>
            Oskai Instant Loan is an independent loan comparison and application preparation platform operated by Oskayi Consult. We are not a deposit-taking financial institution and do not issue loans directly. Credit underwriting, risk scoring, and loan disbursements are executed solely by each respective licensed lender subject to their internal risk assessments and credit bureau verification.
          </p>
        </div>
      </div>
    </div>
  );
};
