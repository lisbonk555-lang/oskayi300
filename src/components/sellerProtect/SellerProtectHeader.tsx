import React from 'react';
import { ShieldCheck, ShoppingCart, Package, Store, Lock, ArrowLeft, Layers, Shield } from 'lucide-react';

interface SellerProtectHeaderProps {
  activeTab: 'marketplace' | 'orders' | 'merchant' | 'admin' | 'health';
  onSelectTab: (tab: 'marketplace' | 'orders' | 'merchant' | 'admin' | 'health') => void;
  cartCount: number;
  onOpenCart: () => void;
  onNavigateHome: () => void;
  onOpenBecomeSeller: () => void;
}

export const SellerProtectHeader: React.FC<SellerProtectHeaderProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onNavigateHome,
  onOpenBecomeSeller
}) => {
  return (
    <header className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Logo, Tagline, and Actions */}
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Product Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 font-mono transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Oskayi Main</span>
            </button>

            <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/10">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    OSKAYI <span className="text-amber-400">SELLER PROTECT</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold hidden md:inline-block">
                    V1 Marketplace
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono hidden sm:block">
                  Buy. Pay. Protect. — Oskayi Seller Protect
                </p>
              </div>
            </div>
          </div>

          {/* Right Action: Become Seller CTA & Cart Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onOpenBecomeSeller}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-all shadow-sm active:scale-95"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Become a Seller</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono shadow-md transition-all active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-[11px] font-extrabold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Bottom Tier: Sub-Tabs Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-slate-800/80 pt-1 pb-2">
          
          <button
            onClick={() => onSelectTab('marketplace')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'marketplace'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Marketplace Catalog</span>
          </button>

          <button
            onClick={() => onSelectTab('orders')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Orders & Claims</span>
          </button>

          <button
            onClick={() => onSelectTab('merchant')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'merchant'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Merchant Center</span>
          </button>

          <button
            onClick={() => onSelectTab('admin')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin & Governance</span>
          </button>

          <button
            onClick={() => onSelectTab('health')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'health'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Integration Health</span>
          </button>

        </div>

      </div>
    </header>
  );
};
