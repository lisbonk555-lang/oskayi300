import React from 'react';
import { X, Scale, Check, Landmark, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { LoanProduct } from '../../server/oskaiLoanService';

interface OskaiLoanCompareModalProps {
  products: LoanProduct[];
  isOpen: boolean;
  onClose: () => void;
  onApplyForProduct: (product: LoanProduct) => void;
}

export function OskaiLoanCompareModal({ products, isOpen, onClose, onApplyForProduct }: OskaiLoanCompareModalProps) {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-bold text-slate-950">Side-by-Side Loan Product Comparison</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {products.map((product) => (
              <div key={product.id} className="pt-4 md:pt-0 md:px-4 flex flex-col justify-between first:pl-0 last:pr-0">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-teal-700 font-bold mb-1">
                    {product.category}
                  </div>
                  <h4 className="text-base font-bold text-slate-950 mb-1 leading-snug">
                    {product.title}
                  </h4>
                  <div className="text-xs font-mono text-slate-500 mb-4">
                    {product.lenderName}
                  </div>

                  {/* Comparison Rows */}
                  <div className="space-y-3 text-xs divide-y divide-slate-100">
                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Facility Range</span>
                      <span className="font-bold font-mono text-slate-900 text-sm">
                        {product.currency} {product.minAmount.toLocaleString()} – {product.maxAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Published Interest Rate</span>
                      <span className="font-bold text-teal-700">
                        {product.publishedInterestRate}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Estimated APR Range</span>
                      <span className="font-mono text-slate-800 font-semibold">
                        {product.aprRange}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Duration / Tenure</span>
                      <span className="font-mono text-slate-800">
                        {product.minTenureMonths} – {product.maxTenureMonths} Months ({product.repaymentFrequency})
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Processing Speed Evidence</span>
                      <span className="text-slate-700 leading-tight">
                        {product.processingTimeEvidence}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Required Documentation</span>
                      <ul className="space-y-1 mt-1 text-[11px] text-slate-600">
                        {product.requiredDocuments.slice(0, 3).map((d, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Integration Label</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold inline-block mt-0.5">
                        {product.integrationLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Apply or View Action */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onClose();
                      onApplyForProduct(product);
                    }}
                    className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-teal-400 font-bold text-xs uppercase font-mono tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Apply for this Loan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
