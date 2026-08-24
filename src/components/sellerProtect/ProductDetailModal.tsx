import React, { useState } from 'react';
import { X, ShieldCheck, ShieldAlert, Truck, CheckCircle2, Store, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/sellerProtect';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedProtection: boolean) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [includeProtection, setIncludeProtection] = useState<boolean>(true);

  if (!isOpen || !product) return null;

  const isEligible = product.protectionEligibility === 'ELIGIBLE';
  const protectionFee = isEligible ? Math.round(product.price * (product.protectionRatePct / 100)) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Image & Protection Visual Card */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-900/90 border border-slate-700 text-amber-300">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Merchant Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Verified Independent Merchant</div>
                  <div className="text-sm font-bold text-white">{product.merchantName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{product.merchantCountry} • Fast Dispatch</div>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                APPROVED
              </span>
            </div>
          </div>

          {/* Right Column: Title, Price, Protection Terms, and CTA */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">SKU: {product.sku}</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 leading-tight">
                  {product.title}
                </h2>
              </div>

              {/* Price Row */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400">Product Price</div>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    GH₵ {product.price.toLocaleString()}
                  </div>
                </div>
                {product.priceUsd && (
                  <div className="text-xs font-mono text-slate-400">
                    ≈ ${product.priceUsd.toLocaleString()} USD
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Shipping Information */}
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-300">
                <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{product.shippingInfo}</span>
              </div>

              {/* Curacel Purchase Protection Module */}
              <div className={`p-4 rounded-2xl border transition-all ${
                isEligible 
                  ? 'bg-amber-950/20 border-amber-400/40' 
                  : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isEligible ? (
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-slate-500" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-white font-mono">
                        {isEligible ? 'Curacel Grow Purchase Protection' : 'Protection Not Applicable'}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {isEligible 
                          ? `Optional transit & damage insurance (+GH₵ ${protectionFee})`
                          : 'Not applicable to services or digital goods'
                        }
                      </div>
                    </div>
                  </div>

                  {isEligible && (
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeProtection}
                        onChange={(e) => setIncludeProtection(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-400 focus:ring-amber-400"
                      />
                      <span className="text-xs font-mono font-bold text-amber-300">Add</span>
                    </label>
                  )}
                </div>

                {isEligible && (
                  <div className="mt-3 pt-3 border-t border-amber-400/20 space-y-2 text-[11px] font-mono text-slate-300">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Covers: Total courier loss, in-transit physical damage & DOA defects.</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>30-Day automated claim processing via Curacel Grow integrated underwriting desk.</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div className="text-xs font-mono">
                <span className="text-slate-400">Subtotal: </span>
                <span className="text-white font-bold font-mono">
                  GH₵ {(product.price + (isEligible && includeProtection ? protectionFee : 0)).toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product, isEligible && includeProtection);
                  onClose();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs shadow-lg shadow-amber-500/10 transition-transform active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
