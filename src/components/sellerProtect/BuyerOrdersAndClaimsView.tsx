import React, { useState } from 'react';
import { Package, ShieldCheck, ShieldAlert, AlertCircle, FileText, CheckCircle2, Clock, Upload, ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { Order, Claim, ClaimType } from '../../types/sellerProtect';
import { sellerProtectApi } from '../../services/sellerProtectApi';

interface BuyerOrdersAndClaimsViewProps {
  orders: Order[];
  claims: Claim[];
  loading: boolean;
  onRefresh: () => void;
  onOpenMarketplace: () => void;
}

export const BuyerOrdersAndClaimsView: React.FC<BuyerOrdersAndClaimsViewProps> = ({
  orders,
  claims,
  loading,
  onRefresh,
  onOpenMarketplace
}) => {
  const [selectedOrderForClaim, setSelectedOrderForClaim] = useState<Order | null>(null);
  const [claimType, setClaimType] = useState<ClaimType>('ITEM_DAMAGED');
  const [claimDescription, setClaimDescription] = useState<string>('');
  const [incidentDate, setIncidentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [evidenceNotes, setEvidenceNotes] = useState<string>('Discovered physical casing fracture upon unboxing courier parcel.');
  const [isSubmittingClaim, setIsSubmittingClaim] = useState<boolean>(false);
  const [claimSubmitSuccess, setClaimSubmitSuccess] = useState<boolean>(false);

  // Submit Claim Handler
  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForClaim) return;

    setIsSubmittingClaim(true);
    try {
      await sellerProtectApi.submitClaim({
        orderId: selectedOrderForClaim.id,
        claimType,
        description: claimDescription,
        incidentDate,
        evidenceNotes,
        evidenceAttachments: [
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
        ]
      });

      setClaimSubmitSuccess(true);
      setTimeout(() => {
        setClaimSubmitSuccess(false);
        setSelectedOrderForClaim(null);
        setClaimDescription('');
        onRefresh();
      }, 1800);
    } catch (err: any) {
      alert(err.message || 'Failed to submit claim');
    } finally {
      setIsSubmittingClaim(false);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            <span>Buyer Orders & Insurance Claims Center</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Track real-time order deliveries, Curacel protection coverage, and lodge insurance claims with 1-click filing.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 font-bold"
        >
          Refresh Orders & Claims
        </button>
      </div>

      {/* SECTION 1: MY ORDERS */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
          <span>Active & Historical Orders ({orders.length})</span>
        </h3>

        {orders.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3 font-mono">
            <p className="text-slate-400 text-xs">You haven't placed any orders yet.</p>
            <button
              onClick={onOpenMarketplace}
              className="px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Order: </span>
                    <span className="text-amber-400 font-bold">{order.orderNumber}</span>
                    <span className="text-slate-500 ml-2">({new Date(order.createdAt).toLocaleDateString()})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                      {order.orderStatus}
                    </span>
                    {order.hasProtection && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950 border border-amber-400/40 text-amber-300 font-bold">
                        <ShieldCheck className="w-3 h-3 text-amber-400" />
                        <span>Curacel Policy #{order.protectionRecordId}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Items in Order */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <span className="text-white font-medium">{item.productTitle}</span>
                        <span className="text-slate-400 font-mono">x{item.quantity}</span>
                      </div>
                      <span className="text-amber-400 font-mono font-bold">
                        GH₵ {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Status Timeline Bar */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    Fulfillment & Protection Timeline:
                  </div>
                  <div className="space-y-1">
                    {order.auditTimeline.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-slate-300">
                          <span className="text-amber-300 font-bold">[{step.status}]</span> {step.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
                  <div className="text-slate-400">
                    Total Paid: <span className="text-white font-bold">GH₵ {order.totalAmount.toLocaleString()}</span>
                  </div>

                  {order.hasProtection && order.orderStatus !== 'CLAIM_OPEN' && order.orderStatus !== 'CLAIM_RESOLVED' && (
                    <button
                      onClick={() => setSelectedOrderForClaim(order)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      <span>File Curacel Claim</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: CLAIMS DASHBOARD */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
          <span>Curacel Insurance Claims Assessment Desk ({claims.length})</span>
        </h3>

        {claims.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/30 rounded-2xl border border-slate-800 text-xs font-mono text-slate-400">
            No claims filed. Any damaged cargo or missing deliveries with active Curacel protection can be claimed directly from the order card above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-slate-400">Claim: </span>
                    <span className="text-amber-400 font-bold">{claim.claimNumber}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-bold">
                    {claim.status}
                  </span>
                </div>

                <div className="space-y-1 text-slate-300">
                  <div>
                    <span className="text-slate-400">Target Item: </span>
                    <span className="font-bold text-white">{claim.productTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Incident Type: </span>
                    <span className="text-amber-300">{claim.claimType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Curacel Ref: </span>
                    <span className="text-slate-200">{claim.providerClaimRef || 'Processing'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Claimed Amount: </span>
                    <span className="text-white font-bold">GH₵ {claim.requestedAmount.toLocaleString()}</span>
                  </div>
                  {claim.approvedSettlementAmount && (
                    <div className="text-emerald-400 font-bold">
                      Settlement Approved: GH₵ {claim.approvedSettlementAmount.toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Claim Timeline */}
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold">LATEST STATUS:</div>
                  {claim.timeline.map((t, i) => (
                    <div key={i} className="text-[11px] text-slate-300">
                      • <span className="text-amber-300 font-bold">[{t.status}]</span> {t.note}
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* CLAIM SUBMISSION MODAL */}
      {selectedOrderForClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl text-white">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Submit Curacel Insurance Claim</span>
              </h3>
              <button
                onClick={() => setSelectedOrderForClaim(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {claimSubmitSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <div className="text-base font-bold text-white">Claim Submitted Successfully</div>
                <p className="text-xs text-slate-400 font-mono">
                  Routed to Curacel Grow Claims Assessment Desk. Reference generated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitClaim} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Target Order & Policy</label>
                  <input
                    type="text"
                    disabled
                    value={`${selectedOrderForClaim.orderNumber} (Curacel Policy: ${selectedOrderForClaim.protectionRecordId})`}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Claim Type</label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-400"
                  >
                    <option value="ITEM_DAMAGED">Item Damaged in Transit</option>
                    <option value="ITEM_NOT_RECEIVED">Item Not Received / Lost in Transit</option>
                    <option value="WRONG_ITEM">Wrong Item Delivered</option>
                    <option value="MATERIALLY_DIFFERENT">Materially Different from Specs</option>
                    <option value="DELIVERY_INCIDENT">Delivery Incident / Courier Breach</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Incident Date</label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Detailed Incident Description</label>
                  <textarea
                    rows={3}
                    value={claimDescription}
                    onChange={(e) => setClaimDescription(e.target.value)}
                    placeholder="Describe what occurred with the cargo shipment upon receipt..."
                    required
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForClaim(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingClaim || !claimDescription}
                    className="px-6 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold disabled:opacity-50"
                  >
                    {isSubmittingClaim ? 'Filing Claim...' : 'Submit Claim to Curacel'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
