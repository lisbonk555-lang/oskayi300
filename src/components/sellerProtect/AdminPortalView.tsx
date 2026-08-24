import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, FileText, Database, Activity, RefreshCw } from 'lucide-react';
import { Merchant, Order, Claim, AuditLog, IntegrationHealthStatus } from '../../types/sellerProtect';
import { sellerProtectApi } from '../../services/sellerProtectApi';

interface AdminPortalViewProps {
  merchants: Merchant[];
  orders: Order[];
  claims: Claim[];
  health: IntegrationHealthStatus | null;
  onRefresh: () => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  merchants,
  orders,
  claims,
  health,
  onRefresh
}) => {
  const [adminSubTab, setAdminSubTab] = useState<'metrics' | 'merchants' | 'claims' | 'audit' | 'integrations'>('metrics');
  const [metrics, setMetrics] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loadingMetrics, setLoadingMetrics] = useState<boolean>(false);

  // Settlement Resolution State
  const [selectedClaimForResolution, setSelectedClaimForResolution] = useState<Claim | null>(null);
  const [resolutionStatus, setResolutionStatus] = useState<string>('APPROVED');
  const [settlementAmount, setSettlementAmount] = useState<number>(0);
  const [resolutionNote, setResolutionNote] = useState<string>('Claim verified by underwriter. Full cargo replacement authorized.');
  const [isResolving, setIsResolving] = useState<boolean>(false);

  // Ping Test States
  const [pingingPaystack, setPingingPaystack] = useState<boolean>(false);
  const [paystackPingResult, setPaystackPingResult] = useState<any>(null);
  const [pingingCuracel, setPingingCuracel] = useState<boolean>(false);
  const [curacelPingResult, setCuracelPingResult] = useState<any>(null);

  // Webhook Events
  const [webhookEvents, setWebhookEvents] = useState<any[]>([]);
  const [loadingWebhooks, setLoadingWebhooks] = useState<boolean>(false);

  // Fetch admin metrics, logs, and webhook events
  const loadAdminData = async () => {
    setLoadingMetrics(true);
    try {
      const [mRes, logsRes, whRes] = await Promise.all([
        sellerProtectApi.getAdminMetrics(),
        sellerProtectApi.getAuditLogs(),
        sellerProtectApi.getWebhookEvents()
      ]);
      setMetrics(mRes);
      setAuditLogs(logsRes.logs || []);
      setWebhookEvents(whRes.events || []);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  const handlePingPayment = async () => {
    setPingingPaystack(true);
    try {
      const res = await sellerProtectApi.pingPaymentGateway();
      setPaystackPingResult(res);
    } catch (err: any) {
      setPaystackPingResult({ success: false, message: err.message, latencyMs: 0 });
    } finally {
      setPingingPaystack(false);
    }
  };

  const handlePingInsurance = async () => {
    setPingingCuracel(true);
    try {
      const res = await sellerProtectApi.pingInsuranceGateway();
      setCuracelPingResult(res);
    } catch (err: any) {
      setCuracelPingResult({ success: false, message: err.message, latencyMs: 0 });
    } finally {
      setPingingCuracel(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Update Merchant Status
  const handleUpdateMerchant = async (merchantId: string, status: string) => {
    try {
      await sellerProtectApi.updateMerchantStatus(merchantId, status);
      onRefresh();
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to update merchant status');
    }
  };

  // Resolve Claim
  const handleResolveClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClaimForResolution) return;

    setIsResolving(true);
    try {
      await sellerProtectApi.updateClaimStatus(selectedClaimForResolution.id, {
        status: resolutionStatus,
        approvedAmount: resolutionStatus === 'APPROVED' ? settlementAmount : undefined,
        note: resolutionNote,
        rejectionReason: resolutionStatus === 'REJECTED' ? resolutionNote : undefined
      });

      setSelectedClaimForResolution(null);
      onRefresh();
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to resolve claim');
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <span>Platform Governance & Claims Assessment Desk</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real database metrics only (0 is 0; no fake data). Complete audit trail and underwriting decisions.
          </p>
        </div>

        <button
          onClick={() => {
            onRefresh();
            loadAdminData();
          }}
          disabled={loadingMetrics}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingMetrics ? 'animate-spin' : ''}`} />
          <span>Refresh Governance</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setAdminSubTab('metrics')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            adminSubTab === 'metrics' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Real Ledger Metrics
        </button>

        <button
          onClick={() => setAdminSubTab('merchants')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            adminSubTab === 'merchants' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Merchant Moderation ({merchants.length})
        </button>

        <button
          onClick={() => setAdminSubTab('claims')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            adminSubTab === 'claims' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Curacel Claims Desk ({claims.length})
        </button>

        <button
          onClick={() => setAdminSubTab('audit')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            adminSubTab === 'audit' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Immutable Audit Logs ({auditLogs.length})
        </button>

        <button
          onClick={() => setAdminSubTab('integrations')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            adminSubTab === 'integrations' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Integration Diagnostics
        </button>
      </div>

      {/* SUBTAB 1: REAL METRICS */}
      {adminSubTab === 'metrics' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 font-mono">
            <div className="text-[11px] text-slate-400">Total Merchants</div>
            <div className="text-2xl font-bold text-white">{metrics?.totalMerchants ?? merchants.length}</div>
            <div className="text-[10px] text-emerald-400">Approved: {metrics?.approvedMerchants ?? merchants.filter(m => m.status === 'APPROVED').length}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 font-mono">
            <div className="text-[11px] text-slate-400">Total Orders Placed</div>
            <div className="text-2xl font-bold text-white">{metrics?.totalOrders ?? orders.length}</div>
            <div className="text-[10px] text-emerald-400">Paid: {metrics?.successfulPayments ?? orders.filter(o => o.paymentStatus === 'PAYMENT_SUCCESS').length}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 font-mono">
            <div className="text-[11px] text-slate-400">Total GMV Volume (GHS)</div>
            <div className="text-2xl font-bold text-amber-400">
              GH₵ {metrics?.totalVolumeGHS ? Number(metrics.totalVolumeGHS).toLocaleString() : '0'}
            </div>
            <div className="text-[10px] text-slate-400">Live transaction sum</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 font-mono">
            <div className="text-[11px] text-slate-400">Curacel Policies Active</div>
            <div className="text-2xl font-bold text-indigo-400">{metrics?.protectionPoliciesCount ?? 0}</div>
            <div className="text-[10px] text-indigo-300">Underwritten by Curacel</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 font-mono">
            <div className="text-[11px] text-slate-400">Open Claims</div>
            <div className="text-2xl font-bold text-rose-400">{metrics?.openClaimsCount ?? claims.length}</div>
            <div className="text-[10px] text-slate-400">Awaiting settlement</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 font-mono">
            <div className="text-[11px] text-slate-400">Platform Revenue (2.5%)</div>
            <div className="text-2xl font-bold text-emerald-400">
              GH₵ {metrics?.platformRevenueGHS ?? '0.00'}
            </div>
            <div className="text-[10px] text-slate-400">Net commission ledger</div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MERCHANT MODERATION */}
      {adminSubTab === 'merchants' && (
        <div className="space-y-4">
          
          {/* Review status notice */}
          {merchants.some(m => m.status === 'PENDING_REVIEW' || m.status === 'PENDING') && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-400/50 text-xs font-mono text-amber-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {merchants.filter(m => m.status === 'PENDING_REVIEW' || m.status === 'PENDING').length} new merchant store(s) awaiting review. Approved stores will have their product listings published to the public marketplace.
                </span>
              </div>
            </div>
          )}

          {merchants.map((merchant) => (
            <div
              key={merchant.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-bold text-white">{merchant.storeName}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    merchant.status === 'APPROVED' 
                      ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
                      : merchant.status === 'PENDING_REVIEW' || merchant.status === 'PENDING'
                      ? 'bg-amber-950 border-amber-400/50 text-amber-300'
                      : 'bg-rose-950 border-rose-500/40 text-rose-300'
                  }`}>
                    {merchant.status}
                  </span>
                </div>
                <div className="text-slate-400">
                  Owner: <strong className="text-slate-200">{merchant.ownerName}</strong> • Phone/WhatsApp: <strong className="text-slate-200">{merchant.phone}</strong> • Email: <strong className="text-slate-200">{merchant.email}</strong>
                </div>
                <div className="text-slate-400 text-[11px]">
                  Category: <span className="text-amber-300">{merchant.category}</span> • Location: {merchant.city || 'Accra'}, {merchant.country} • Payout: {merchant.payoutAccount}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {merchant.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleUpdateMerchant(merchant.id, 'APPROVED')}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow transition-all active:scale-95 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Store</span>
                  </button>
                )}
                {merchant.status !== 'PENDING_REVIEW' && merchant.status !== 'PENDING' && (
                  <button
                    onClick={() => handleUpdateMerchant(merchant.id, 'PENDING_REVIEW')}
                    className="px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-900 transition-colors"
                  >
                    Mark Under Review
                  </button>
                )}
                {merchant.status !== 'SUSPENDED' && (
                  <button
                    onClick={() => handleUpdateMerchant(merchant.id, 'SUSPENDED')}
                    className="px-3 py-1.5 rounded-lg bg-rose-950 border border-rose-500/40 text-rose-300 font-bold hover:bg-rose-900 transition-colors"
                  >
                    Suspend
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 3: CLAIMS RESOLUTION DESK */}
      {adminSubTab === 'claims' && (
        <div className="space-y-4">
          {claims.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-xs font-mono text-slate-400">
              No claims currently filed on platform.
            </div>
          ) : (
            <div className="space-y-4">
              {claims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs"
                >
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-amber-400 font-bold">{claim.claimNumber}</span>
                      <span className="text-slate-500 ml-2">(Order: {claim.orderNumber})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold">
                      {claim.status}
                    </span>
                  </div>

                  <div className="text-slate-300">
                    <div><span className="text-slate-400">Claimant:</span> {claim.buyerName} ({claim.buyerEmail})</div>
                    <div><span className="text-slate-400">Incident:</span> {claim.claimType} — {claim.description}</div>
                    <div><span className="text-slate-400">Requested Amount:</span> GH₵ {claim.requestedAmount.toLocaleString()}</div>
                  </div>

                  {claim.status !== 'SETTLED' && claim.status !== 'REJECTED' && (
                    <div className="pt-2 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() => {
                          setSelectedClaimForResolution(claim);
                          setSettlementAmount(claim.requestedAmount);
                        }}
                        className="px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
                      >
                        Authorize Underwriter Resolution
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 4: AUDIT LOGS */}
      {adminSubTab === 'audit' && (
        <div className="space-y-2">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
            <h4 className="text-slate-400 font-bold uppercase tracking-wider mb-2">
              Immutable Platform Transaction & Policy Ledger
            </h4>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-2 rounded bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="text-slate-300">
                      <span className="text-amber-400 font-bold">[{log.action}]</span> by {log.actor} on {log.resource} ({log.resourceId})
                    </div>
                    {log.metadata && (
                      <div className="text-[10px] text-slate-500 truncate max-w-xl">
                        {JSON.stringify(log.metadata)}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: INTEGRATION DIAGNOSTICS & WEBHOOK MONITOR */}
      {adminSubTab === 'integrations' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Paystack Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">Paystack Gateway (GHS)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-bold">
                  {health?.payment?.mode || health?.paystack?.mode || 'DEVELOPMENT_SANDBOX'}
                </span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Live Status:</span>
                  <span className="text-white font-bold">{health?.payment?.status === 'CONFIGURED' ? 'Production Live' : 'Sandbox Active'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Public Key:</span>
                  <span className="text-slate-200">{health?.payment?.publicKeyConfigured ? 'pk_live_*** (Injected)' : 'pk_test (Injected)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Secret Key:</span>
                  <span className="text-slate-200">{health?.payment?.secretKeyConfigured ? 'sk_live_*** (Protected)' : 'Not set in .env'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Webhook Handler:</span>
                  <span className="text-amber-400">/api/webhooks/payment</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={handlePingPayment}
                  disabled={pingingPaystack}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold disabled:opacity-50"
                >
                  {pingingPaystack ? 'Pinging Gateway...' : 'Ping Gateway API'}
                </button>
                {paystackPingResult && (
                  <span className="text-[11px] text-emerald-400">
                    {paystackPingResult.status} ({paystackPingResult.latencyMs}ms)
                  </span>
                )}
              </div>
            </div>

            {/* Curacel Grow Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">Curacel Grow Underwriting</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-bold">
                  {health?.insurance?.mode || health?.curacel?.mode || 'DEVELOPMENT_SANDBOX'}
                </span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Underwriting Desk:</span>
                  <span className="text-white font-bold">{health?.insurance?.status === 'CONFIGURED' ? 'Production Live' : 'Embedded Sandbox'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Client ID:</span>
                  <span className="text-slate-200">{health?.insurance?.clientIdConfigured ? 'Injected' : 'Not set in .env'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Client Secret:</span>
                  <span className="text-slate-200">{health?.insurance?.clientSecretConfigured ? 'Injected (Protected)' : 'Not set in .env'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Webhook Handler:</span>
                  <span className="text-amber-400">/api/webhooks/insurance</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={handlePingInsurance}
                  disabled={pingingCuracel}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold disabled:opacity-50"
                >
                  {pingingCuracel ? 'Pinging Provider...' : 'Ping Insurance API'}
                </button>
                {curacelPingResult && (
                  <span className="text-[11px] text-emerald-400">
                    {curacelPingResult.status} ({curacelPingResult.latencyMs}ms)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Webhook Events Monitor */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white text-sm">Idempotent Webhook Ingestion Log</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {webhookEvents.length} events received
              </span>
            </div>

            {webhookEvents.length === 0 ? (
              <div className="text-center py-6 text-slate-500">
                No external webhook callbacks received yet. Webhooks are ingested idempotently with SHA-512 signature validation.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {webhookEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-white">
                        <span className="text-amber-400">[{evt.provider}]</span> {evt.eventType}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Ref: {evt.eventReference} • Hash: {evt.payloadHash?.slice(0, 12)}...
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
                      {evt.processingStatus}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CLAIM RESOLUTION MODAL */}
      {selectedClaimForResolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-white font-mono text-xs">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Resolve Curacel Claim #{selectedClaimForResolution.claimNumber}
            </h3>

            <form onSubmit={handleResolveClaim} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Decision</label>
                <select
                  value={resolutionStatus}
                  onChange={(e) => setResolutionStatus(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option value="APPROVED">APPROVED (Authorize Payout)</option>
                  <option value="SETTLED">SETTLED (Disbursed to Bank)</option>
                  <option value="EVIDENCE_REQUIRED">EVIDENCE REQUIRED (Request More Proof)</option>
                  <option value="REJECTED">REJECTED (Outside Policy Terms)</option>
                </select>
              </div>

              {resolutionStatus === 'APPROVED' && (
                <div>
                  <label className="text-slate-400 block mb-1">Settlement Amount (GHS)</label>
                  <input
                    type="number"
                    value={settlementAmount}
                    onChange={(e) => setSettlementAmount(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              )}

              <div>
                <label className="text-slate-400 block mb-1">Underwriter / Admin Notes</label>
                <textarea
                  rows={3}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedClaimForResolution(null)}
                  className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isResolving}
                  className="px-5 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg"
                >
                  {isResolving ? 'Updating...' : 'Confirm Decision'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
