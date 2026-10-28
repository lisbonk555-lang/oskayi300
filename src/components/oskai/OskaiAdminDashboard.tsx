import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Eye, 
  FileCheck,
  Building,
  UserCheck,
  DollarSign,
  ArrowRight,
  Database
} from 'lucide-react';
import { 
  OskaiApplication, 
  OskaiLoanProduct, 
  OskaiApplicationStatus,
  OskaiAuditLog 
} from '../../server/oskaiLoanService';

interface OskaiAdminDashboardProps {
  onRefreshData?: () => void;
}

export const OskaiAdminDashboard: React.FC<OskaiAdminDashboardProps> = ({ onRefreshData }) => {
  const [applications, setApplications] = useState<OskaiApplication[]>([]);
  const [auditLogs, setAuditLogs] = useState<OskaiAuditLog[]>([]);
  const [apiHealth, setApiHealth] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Updating status modal
  const [selectedApp, setSelectedApp] = useState<OskaiApplication | null>(null);
  const [newStatus, setNewStatus] = useState<OskaiApplicationStatus>('Awaiting lender review');
  const [statusReason, setStatusReason] = useState('');
  const [lenderRef, setLenderRef] = useState('');
  const [disbursementEvidence, setDisbursementEvidence] = useState('');
  const [updating, setUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appsRes, logsRes, healthRes] = await Promise.all([
        fetch('/api/oskai/applications'),
        fetch('/api/oskai/audit-logs'),
        fetch('/api/oskai/api-health')
      ]);

      if (appsRes.ok) {
        const apps = await appsRes.json();
        setApplications(apps);
      }
      if (logsRes.ok) {
        const logs = await logsRes.json();
        setAuditLogs(logs);
      }
      if (healthRes.ok) {
        const health = await healthRes.json();
        setApiHealth(health);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    if (!statusReason.trim()) {
      setErrorMsg('A detailed audit explanation is legally required for status changes.');
      return;
    }

    if (newStatus === 'Disbursed' && (!lenderRef.trim() || !disbursementEvidence.trim())) {
      setErrorMsg('CRITICAL ANTI-FRAUD RULE: Status cannot be marked as "Disbursed" without a genuine verified lender reference number and disbursement confirmation evidence.');
      return;
    }

    setUpdating(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/oskai/applications/${selectedApp.reference}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          changedBy: 'Oskayi Compliance & Verification Officer',
          reason: statusReason,
          lenderReference: lenderRef || undefined,
          disbursementEvidence: disbursementEvidence || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      setSuccessMsg(`Application ${selectedApp.reference} status successfully updated to "${newStatus}".`);
      setSelectedApp(null);
      setStatusReason('');
      setLenderRef('');
      setDisbursementEvidence('');
      fetchData();
      if (onRefreshData) onRefreshData();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update application');
    } finally {
      setUpdating(false);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.borrowerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.borrowerPhone.includes(searchTerm) ||
      (app.accountOrMomoNumber && app.accountOrMomoNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && app.status === statusFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Admin Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              Lender Integration & Application Oversight
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Compliance & Application Management Console
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real-time audit log, statutory anti-fraud compliance, verified lender status updates, and live API connectivity health checks.
            </p>
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            className="self-start sm:self-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Global Statistics Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block">Total Applications</span>
            <span className="text-xl sm:text-2xl font-bold text-white mt-0.5 block">{applications.length}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Under Lender Review</span>
            <span className="text-xl sm:text-2xl font-bold text-amber-400 mt-0.5 block">
              {applications.filter(a => a.status === 'Awaiting lender review' || a.status === 'Submitted').length}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Approved by Lenders</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 mt-0.5 block">
              {applications.filter(a => a.status === 'Approved by lender' || a.status === 'Offer available').length}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Verified Disbursed</span>
            <span className="text-xl sm:text-2xl font-bold text-teal-400 mt-0.5 block">
              {applications.filter(a => a.status === 'Disbursed').length}
            </span>
          </div>
        </div>
      </div>

      {/* API Health Checks Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Live External API Integration Status
            </h3>
          </div>
          <span className="text-xs text-slate-500">Continuous 60s health pulse</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {apiHealth.map((api, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-xs text-slate-800">{api.name || api.provider}</div>
                <div className="text-[11px] text-slate-500">{api.endpoint}</div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded ${
                  api.status === 'HEALTHY' || api.status === 'online' || api.status === 'configured' || api.status === 'live'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {api.status}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">{api.latencyMs}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success/Error Alerts */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Applications Table Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Borrower Applications ({filteredApps.length})
            </h3>
            <p className="text-xs text-slate-500">
              Audit status, verify Ghana Card KYC, and process formal lender decisions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ref, name, card..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="all">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Awaiting lender review">Awaiting Review</option>
              <option value="Approved by lender">Approved</option>
              <option value="Declined by lender">Declined</option>
              <option value="Disbursed">Disbursed (Verified)</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Reference</th>
                <th className="p-3.5">Applicant & Account</th>
                <th className="p-3.5">Loan Request</th>
                <th className="p-3.5">Target Lender Product</th>
                <th className="p-3.5">Platform Fee</th>
                <th className="p-3.5">Current Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No applications found matching the search criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map(app => (
                  <tr key={app.reference} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-medium text-slate-800">
                      {app.reference}
                      <span className="block text-[10px] text-slate-400 font-sans">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{app.borrowerName}</div>
                      <div className="text-[11px] text-slate-500">{app.borrowerEmail}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{app.momoNetworkOrBankName}: {app.accountOrMomoNumber}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">
                        {app.currency} {app.requestedAmount.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {app.tenureMonths} Months • {app.purpose}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-800 block truncate max-w-[150px]">
                        {app.productTitle || app.productId}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Monthly Income: {app.currency} {app.monthlyIncome.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                        app.serviceFeePaid 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {app.serviceFeePaid ? 'Paid via Paystack' : 'Unpaid (GHS 50)'}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        app.status === 'Disbursed'
                          ? 'bg-teal-100 text-teal-800'
                          : app.status === 'Approved by lender' || app.status === 'Offer available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Declined by lender'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setNewStatus(app.status);
                          setStatusReason('');
                          setLenderRef(app.disbursementProof?.reference || '');
                          setDisbursementEvidence(app.disbursementProof?.evidenceNotes || '');
                          setErrorMsg('');
                          setSuccessMsg('');
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-xs shadow-sm transition-colors"
                      >
                        Review / Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scaleUp">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base">
                  Update Application Status: {selectedApp.reference}
                </h4>
                <p className="text-xs text-slate-400">
                  Applicant: {selectedApp.borrowerName} ({selectedApp.borrowerEmail})
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Status Selection *
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OskaiApplicationStatus)}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Awaiting lender review">Awaiting lender review</option>
                  <option value="Additional information required">Additional information required</option>
                  <option value="Approved by lender">Approved by lender</option>
                  <option value="Declined by lender">Declined by lender</option>
                  <option value="Offer available">Offer available</option>
                  <option value="Accepted by borrower">Accepted by borrower</option>
                  <option value="Disbursement pending">Disbursement pending</option>
                  <option value="Disbursed">Disbursed (Requires Verified Evidence)</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              {/* Anti-Fraud Warning for Disbursed */}
              {newStatus === 'Disbursed' && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-rose-950">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Mandatory Lender Evidence Requirement
                  </p>
                  <p>
                    Under Oskai Anti-Fraud Governance, an application CANNOT be marked as Disbursed without real verification from the partner bank or credit network. You must enter the official lender credit confirmation ID below.
                  </p>
                </div>
              )}

              {newStatus === 'Disbursed' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Lender Confirmation Reference Number *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. STANBIC-DISB-998242-ACC"
                      value={lenderRef}
                      onChange={(e) => setLenderRef(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Disbursement Audit Evidence Details *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cleared via Ghana Interbank Payment and Settlement Systems (GhIPSS) Batch #4812"
                      value={disbursementEvidence}
                      onChange={(e) => setDisbursementEvidence(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Audit Reason / Underwriter Note *
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail the reason for this status change (e.g., 'Applicant verified with Credit Bureau Ghana; passed 33% DTI threshold; dossier transmitted to Stanbic retail desk')..."
                  value={statusReason}
                  onChange={(e) => setStatusReason(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none text-slate-900"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
                >
                  {updating && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  Confirm Status Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit Log Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-sm">
              Statutory Audit Trail (Last {auditLogs.length} Events)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Immutable ledger representation</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs max-h-80 overflow-y-auto">
          {auditLogs.length === 0 ? (
            <div className="py-6 text-center text-slate-400">No audit events recorded yet.</div>
          ) : (
            auditLogs.slice(0, 15).map(log => (
              <div key={log.id} className="py-2.5 flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{log.action}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                      {log.targetEntity}: {log.targetId}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">{log.details}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-[10px] font-medium text-slate-600 block">
                    {log.actor}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
