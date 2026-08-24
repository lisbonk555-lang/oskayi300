import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, ShieldAlert, ArrowRight, Eye, ShoppingCart, Sparkles, Check } from 'lucide-react';
import { Product } from '../../types/sellerProtect';
import { MARKETPLACE_CONFIG } from '../../data/sellerProtectData';

interface MarketplaceViewProps {
  products: Product[];
  loading: boolean;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  onOpenBecomeSeller: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  products,
  loading,
  onSelectProduct,
  onQuickAddToCart,
  onOpenBecomeSeller
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [protectionOnly, setProtectionOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filter products locally
  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (selectedCountry !== 'All' && product.country !== selectedCountry) return false;
    if (protectionOnly && product.protectionEligibility !== 'ELIGIBLE') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        product.title.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.merchantName.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Marketplace Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>GLOBAL COMMERCE WITH BUILT-IN PURCHASE PROTECTION</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Buy. Pay. <span className="text-amber-400">Protect.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Discover verified enterprise equipment, IT hardware, clean energy microgrids, and professional services from vetted independent merchants. Powered by Paystack secure payments with optional Curacel Grow purchase protection.
          </p>

          <div className="pt-2 flex items-center gap-3 flex-wrap font-mono text-xs">
            <button
              onClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md transition-all active:scale-95"
            >
              Shop Marketplace
            </button>

            <button
              onClick={onOpenBecomeSeller}
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-medium transition-all"
            >
              Become a Verified Seller
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div id="catalog-section" className="space-y-4 bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-800">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified products, servers, inverters, SKUs, or merchant stores..."
            className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm font-sans placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4 flex-wrap text-xs font-mono">
          
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Categories</option>
              {MARKETPLACE_CONFIG.enabledCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Protection Toggle */}
          <label className="flex items-center gap-2 cursor-pointer bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 select-none">
            <input
              type="checkbox"
              checked={protectionOnly}
              onChange={(e) => setProtectionOnly(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-amber-400 focus:ring-amber-400"
            />
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Protected Only</span>
            </span>
          </label>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="featured">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Showing {filteredProducts.length} Verified Products</span>
          <span>Base Currency: GHS (Ghanaian Cedis)</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-slate-400 font-mono text-sm">No products found matching your search or filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setProtectionOnly(false);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono text-amber-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isEligible = product.protectionEligibility === 'ELIGIBLE';
              const protectionFee = isEligible ? Math.round(product.price * (product.protectionRatePct / 100)) : 0;

              return (
                <div
                  key={product.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all overflow-hidden flex flex-col justify-between group shadow-lg"
                >
                  
                  {/* Top Image Section */}
                  <div>
                    <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 border border-slate-700 text-slate-300">
                          {product.category}
                        </span>
                      </div>

                      {/* Protection Badge */}
                      <div className="absolute bottom-2.5 left-2.5">
                        {isEligible ? (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/90 border border-amber-400/50 text-amber-300">
                            <ShieldCheck className="w-3 h-3 text-amber-400" />
                            <span>Protection Available</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 border border-slate-700 text-slate-400">
                            <ShieldAlert className="w-3 h-3 text-slate-500" />
                            <span>Uninsured (Service)</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-2">
                      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                        <span>{product.merchantName}</span>
                        <span>{product.merchantCountry}</span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="text-sm font-bold text-white line-clamp-2 hover:text-amber-400 cursor-pointer transition-colors"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 font-sans">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Price & Action Footer */}
                  <div className="p-4 pt-2 border-t border-slate-800/80 space-y-3">
                    
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-slate-400">Price</div>
                        <div className="text-base font-extrabold text-amber-400 font-mono">
                          GH₵ {product.price.toLocaleString()}
                        </div>
                      </div>
                      {product.priceUsd && (
                        <div className="text-[11px] font-mono text-slate-400">
                          ≈ ${product.priceUsd.toLocaleString()} USD
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => onQuickAddToCart(product)}
                        className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow transition-colors active:scale-95"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
