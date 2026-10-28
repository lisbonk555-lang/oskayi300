import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Landmark, 
  CreditCard, 
  Download, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  Coins,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { LoanApplication, ServiceFeeInvoice } from '../../server/oskaiLoanService';

interface OskaiBorrowerDashboardProps {
  onOpenPaystackInvoice: (invoiceRef: string) => void;
  onExploreMoreLoans: () => void;
}

export function OskaiBorrowerDashboard({
  onOpenPaystackInvoice,
  onExploreMoreLoans
}: OskaiBorrowerDashboardProps) {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeAppReference, setActiveAppReference] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<ServiceFeeInvoice | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/oskai/applications');
      if (res.ok) {
        const data = await res.json();
        if (data.applications) {
          setApplications(data.applications);
          if (data.applications.length > 0 && !activeAppReference) {
            setActiveAppReference(data.applications[0].reference);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load applications:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const activeApp = applications.find(a => a.reference === activeAppReference) || applications[0];

  useEffect(() => {
    if (activeApp?.serviceFeeInvoiceRef) {
      fetch(`/api/oskai/invoices/${activeApp.serviceFeeInvoiceRef}`)
        .then(r => r.json())
        .then(data => {
          if (data.invoice) setSelectedInvoice(data.invoice);
        })
        .catch(() => {});
    }
  }, [activeApp]);

  // Color mapping for strict status labels from prompt
  const getStatusBadge = (status: LoanApplication['status']) => {
    switch (status) {
      case 'Submitted':
      case 'Awaiting lender review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Approved by lender':
      case 'Offer available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Disbursed':
        return 'bg-teal-50 text-teal-800 border-teal-300 font-bold';
      case 'Additional information required':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'Declined by lender':
      case 'Cancelled':
      case 'Expired':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="dashboard" className="py-12 lg:py-16 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-bold uppercase tracking-wider mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Borrower Personal Dashboard</span>
            </div>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">
              My Loan Applications & Status Tracking
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Live status progressions directly from participating lenders. No simulated approvals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchApplications}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Refresh applications"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-teal-600' : ''}`} />
            </button>
            <button
              onClick={onExploreMoreLoans}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 font-bold text-xs uppercase font-mono tracking-wider transition-colors"
            >
              Discover More Loans
            </button>
          </div>
        </div>

        {loading && applications.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <div className="text-xs font-mono text-slate-500">Loading your loan records...</div>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-950">No Loan Applications Submitted Yet</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              You haven't submitted any applications. Search our verified lending marketplace to compare interest rates and submit your first standardized application.
            </p>
            <button
              onClick={onExploreMoreLoans}
              className="mt-6 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider transition-all shadow-md shadow-teal-500/20"
            >
              Start Loan Discovery Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Applications List (Scrollable Cards) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                Submitted Applications ({applications.length})
              </div>

              {applications.map((app) => {
                const isSelected = app.reference === activeApp?.reference;
                return (
                  <div
                    key={app.reference}
                    onClick={() => setActiveAppReference(app.reference)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                        : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-teal-800">
                        {app.reference}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-950 leading-snug">
                      {app.productTitle}
                    </h4>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      {app.lenderName}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-900">
                        {app.currency} {app.requestedAmount.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed Application Status Tracker & Service-Fee Invoices */}
            {activeApp && (
              <div className="lg:col-span-7 space-y-6">
                
                {/* Main Status Detail Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  
                  <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Unique Reference Code</span>
                      <span className="text-xl font-black font-mono text-slate-950">{activeApp.reference}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Current Stage</span>
                      <span className={`text-xs font-mono px-3 py-1 rounded-full border font-bold inline-block mt-0.5 ${getStatusBadge(activeApp.status)}`}>
                        {activeApp.status}
                      </span>
                    </div>
                  </div>

                  {/* Status Timeline Bar */}
                  <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-mono font-bold text-slate-800 mb-2">
                      Lender Evaluation Remarks & Stage Evidence:
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeApp.statusReason || 'Application submitted to platform. Initial document indexing complete.'}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-slate-400">
                      Last Updated: {new Date(activeApp.updatedAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Verified Disbursement Evidence (Prompt required: only after lender evidence) */}
                  {activeApp.disbursementProof && (
                    <div className="mb-6 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs font-mono">
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        <span>CONFIRMED LENDER DISBURSEMENT RECORD</span>
                      </div>
                      <div>Bank/Provider Reference: <strong>{activeApp.disbursementProof.reference}</strong></div>
                      <div>Disbursed At: {new Date(activeApp.disbursementProof.disbursedAt).toLocaleString()}</div>
                      <div className="mt-1 text-teal-800 text-[11px]">{activeApp.disbursementProof.evidenceNotes}</div>
                    </div>
                  )}

                  {/* Key Application Dossier Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono mb-6">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Requested Amount</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {activeApp.currency} {activeApp.requestedAmount.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Tenure</span>
                      <span className="font-bold text-slate-900 text-sm">{activeApp.tenureMonths} Months</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Disbursal Target</span>
                      <span className="font-bold text-slate-900 truncate block">{activeApp.disbursalDestination}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Borrower</span>
                      <span className="text-slate-900 truncate block">{activeApp.borrowerName}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Monthly Income</span>
                      <span className="text-slate-900">{activeApp.currency} {activeApp.monthlyIncome.toLocaleString()}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Account / Number</span>
                      <span className="text-slate-900 truncate block">{activeApp.accountOrMomoNumber}</span>
                    </div>
                  </div>

                  {/* Service-Fee Invoice & Paystack Card */}
                  {selectedInvoice && (
                    <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-teal-600" />
                          <span className="text-xs font-bold font-mono text-slate-950">
                            Service-Fee Invoice ({selectedInvoice.reference})
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          selectedInvoice.paymentStatus === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {selectedInvoice.paymentStatus}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {selectedInvoice.serviceDescription}
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono mb-4 p-3 bg-slate-50 rounded-xl">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Fee Amount (Separate from interest)</span>
                          <span className="text-base font-bold text-slate-950">
                            {selectedInvoice.currency} {selectedInvoice.feeAmount.toLocaleString()}
                          </span>
                        </div>
                        {selectedInvoice.receiptNumber && (
                          <div className="text-right">
                            <span className="text-slate-400 text-[10px] block">Receipt Number</span>
                            <span className="text-teal-700 font-bold">{selectedInvoice.receiptNumber}</span>
                          </div>
                        )}
                      </div>

                      {selectedInvoice.paymentStatus === 'PAID' ? (
                        <div className="text-xs text-emerald-800 font-mono flex items-center gap-1.5 p-2 bg-emerald-50 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Service fee settled via Paystack on {new Date(selectedInvoice.paidAt!).toLocaleDateString()}.</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenPaystackInvoice(selectedInvoice.reference)}
                          className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-teal-400 font-bold text-xs uppercase font-mono tracking-wider transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>Review & Pay Fee via Paystack</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
