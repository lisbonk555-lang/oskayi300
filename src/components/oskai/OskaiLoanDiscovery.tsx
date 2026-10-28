import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Landmark, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  FileText, 
  Clock, 
  ShieldCheck, 
  SlidersHorizontal,
  Scale,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { LoanProduct } from '../../server/oskaiLoanService';

interface OskaiLoanDiscoveryProps {
  initialCategory?: string;
  initialAmount?: number;
  onApplyForProduct: (product: LoanProduct) => void;
  onCompareProducts: (products: LoanProduct[]) => void;
}

export function OskaiLoanDiscovery({
  initialCategory = 'All',
  initialAmount,
  onApplyForProduct,
  onCompareProducts
}: OskaiLoanDiscoveryProps) {
  const [products, setProducts] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory || 'All');
  const [countryFilter, setCountryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxAmountFilter, setMaxAmountFilter] = useState<number>(initialAmount || 500000);
  const [integrationFilter, setIntegrationFilter] = useState<string>('All');

  // Selected products for side-by-side comparison
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const categories = [
    'All',
    'Personal loans',
    'Salary advances',
    'Small-business loans',
    'Working-capital loans',
    'Mobile-money credit',
    'Emergency loans',
    'Asset and equipment finance',
    'Invoice financing',
    'Secured loans'
  ];

  const integrationLabels = [
    'All',
    'Live lender application integration',
    'External lender referral',
    'Partner-authorized funding integration',
    'Public product data'
  ];

  // Fetch verified products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== 'All') params.append('category', categoryFilter);
      if (countryFilter !== 'All') params.append('country', countryFilter);
      if (searchQuery) params.append('search', searchQuery);
      if (integrationFilter !== 'All') params.append('integrationLabel', integrationFilter);

      const res = await fetch(`/api/oskai/products?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
        }
      }
    } catch (e) {
      console.error('Failed to fetch loan products:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, countryFilter, integrationFilter]);

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const toggleCompare = (productId: string) => {
    if (selectedForCompare.includes(productId)) {
      setSelectedForCompare(selectedForCompare.filter(id => id !== productId));
    } else {
      if (selectedForCompare.length >= 3) {
        alert('You can compare a maximum of 3 loan products simultaneously.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, productId]);
    }
  };

  const handleTriggerCompare = () => {
    const toCompare = products.filter(p => selectedForCompare.includes(p.id));
    onCompareProducts(toCompare);
  };

  return (
    <section id="discovery" className="py-12 lg:py-16 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-bold uppercase tracking-wider mb-1">
              <Search className="w-3.5 h-3.5" />
              <span>Verified Loan Discovery Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Compare Lending Options & Published Rates
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Published product details, interest schedules, and eligibility criteria from recognized banking and micro-credit institutions.
            </p>
          </div>

          {/* Compare Toolbar */}
          {selectedForCompare.length > 0 && (
            <div className="flex items-center gap-3 p-2 bg-slate-950 text-white rounded-xl shadow-lg shrink-0">
              <span className="text-xs font-mono text-amber-400 font-bold px-2">
                {selectedForCompare.length}/3 Selected
              </span>
              <button
                onClick={handleTriggerCompare}
                className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Now</span>
              </button>
              <button
                onClick={() => setSelectedForCompare([])}
                className="text-xs text-slate-400 hover:text-white px-2"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8 space-y-4">
          
          {/* Top Search Line */}
          <form onSubmit={handleSearchClick} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by lender name (e.g. Stanbic, Ecobank), keyword, or purpose..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider font-mono transition-colors shrink-0"
            >
              Apply Filter
            </button>
          </form>

          {/* Category Chips (Zero-Pill Tab buttons with active states) */}
          <div className="pt-2">
            <label className="block text-[11px] font-mono uppercase text-slate-500 mb-2 font-bold">
              Loan Category Filter:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-slate-950 text-teal-400 font-bold shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Selectors (Country & Integration Type) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100 text-xs font-mono">
            <div>
              <label className="block text-slate-500 uppercase mb-1">Geographic Country</label>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
              >
                <option value="All">All Jurisdictions (Ghana & Global)</option>
                <option value="Ghana">🇬🇭 Ghana (Bank of Ghana Regulated)</option>
                <option value="Global">🌐 International & Cross-Border</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 uppercase mb-1">Integration Status Label</label>
              <select
                value={integrationFilter}
                onChange={(e) => setIntegrationFilter(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
              >
                {integrationLabels.map((lbl) => (
                  <option key={lbl} value={lbl}>
                    {lbl}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end justify-between sm:justify-end pb-1 text-slate-500">
              <span>{products.length} verified products found</span>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <div className="text-xs font-mono text-slate-500">Loading verified loan listings from registry...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-950">No Loan Products Found</h3>
            <p className="text-xs text-slate-600 mt-1">
              No products matched your exact filter combination. Try clearing filters or searching for "Stanbic", "Ecobank", or "Salary".
            </p>
            <button
              onClick={() => {
                setCategoryFilter('All');
                setCountryFilter('All');
                setIntegrationFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-teal-400 rounded-lg font-mono text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.map((product) => {
              const isComparing = selectedForCompare.includes(product.id);
              return (
                <div
                  key={product.id}
                  className={`bg-white border rounded-2xl p-6 sm:p-7 shadow-sm transition-all flex flex-col justify-between relative overflow-hidden ${
                    isComparing ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Lender & Integration Label Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <Landmark className="w-4 h-4 text-slate-600" />
                          <span>{product.lenderName}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                          {product.category} · {product.geographicScope.join(', ')}
                        </span>
                      </div>

                      {/* Integration Type Label (Prompt required labels) */}
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md font-bold uppercase shrink-0 ${
                        product.integrationLabel === 'Live lender application integration'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : product.integrationLabel === 'Partner-authorized funding integration'
                          ? 'bg-purple-50 text-purple-800 border border-purple-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {product.integrationLabel}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-xl font-bold text-slate-950 tracking-tight mb-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-5">
                      {product.description}
                    </p>

                    {/* Key Terms Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-5 text-xs font-mono">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 block">Facility Range</span>
                        <span className="font-bold text-slate-950">
                          {product.currency} {product.minAmount.toLocaleString()} – {product.maxAmount.toLocaleString()}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase text-slate-400 block">Published Rate</span>
                        <span className="font-bold text-teal-700">
                          {product.publishedInterestRate}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase text-slate-400 block">Duration / Tenure</span>
                        <span className="font-bold text-slate-950">
                          {product.minTenureMonths} – {product.maxTenureMonths} Months
                        </span>
                      </div>

                      <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Processing Time Evidence:</span>
                        <span className="font-semibold text-slate-800">{product.processingTimeEvidence}</span>
                      </div>
                    </div>

                    {/* Eligibility & Required Docs */}
                    <div className="space-y-3 mb-6 text-xs">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block mb-1 font-bold">
                          Key Eligibility Requirements:
                        </span>
                        <ul className="space-y-1 text-slate-700">
                          {product.eligibilityCriteria.map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block mb-1 font-bold">
                          Required Documentation:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.requiredDocuments.map((doc, i) => (
                            <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    
                    {/* Compare Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-600 self-start sm:self-center">
                      <input
                        type="checkbox"
                        checked={isComparing}
                        onChange={() => toggleCompare(product.id)}
                        className="rounded accent-teal-600"
                      />
                      <span>Compare Side-by-Side</span>
                    </label>

                    {/* Apply Button or Official Referral */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href={product.officialLenderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-900 transition-colors"
                        title="View Official Lender Portal"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      {product.integrationLabel === 'Live lender application integration' || product.integrationLabel === 'Partner-authorized funding integration' ? (
                        <button
                          onClick={() => onApplyForProduct(product)}
                          className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-teal-400 font-bold text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span>Apply via Standardized Form</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <a
                          href={product.officialLenderLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>Official Lender Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
