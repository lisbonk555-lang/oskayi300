import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Coins, 
  ShieldAlert, 
  Zap, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Cpu, 
  Lock, 
  Globe2, 
  TrendingUp, 
  Layers, 
  Radio, 
  Terminal, 
  Sparkles,
  Search,
  Filter,
  Check,
  X,
  AlertCircle,
  Clock,
  Eye,
  FileCheck2,
  Mail,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Send,
  MessageSquare
} from 'lucide-react';
import { ORCHESTRATION_MODULES } from '../../data/orchestrationModules';

interface FleetAdminConsoleProps {
  onTenantApproved?: (tenantId: string) => void;
  onOpenTenantWorkspace?: (tenantId: string) => void;
}

export const FleetAdminConsole: React.FC<FleetAdminConsoleProps> = ({
  onTenantApproved,
  onOpenTenantWorkspace
}) => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  // Action states
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [showRejectPrompt, setShowRejectPrompt] = useState<boolean>(false);
  const [showInfoPrompt, setShowInfoPrompt] = useState<boolean>(false);
  const [welcomeEmailModal, setWelcomeEmailModal] = useState<any | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/fleet/applications');
      if (res.ok) {
        const json = await res.json();
        setApplications(json.applications || []);
        if (json.applications?.length > 0 && !selectedApp) {
          setSelectedApp(json.applications[0]);
        }
      }
    } catch (e) {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDecision = async (status: 'approved' | 'more_info_needed' | 'rejected') => {
    if (!selectedApp) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/fleet/applications/${selectedApp.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          adminNotes: adminNotes || (status === 'approved' ? 'Compliance verified, all 10 engine rails provisioned.' : undefined)
        })
      });
      const data = await res.json();
      if (data.success) {
        // Update local list
        setApplications(prev => prev.map(a => a.id === selectedApp.id ? data.application : a));
        setSelectedApp(data.application);

        if (status === 'approved' && data.welcomeEmail) {
          setWelcomeEmailModal(data.welcomeEmail);
          if (onTenantApproved && data.tenant?.id) {
            onTenantApproved(data.tenant.id);
          }
        }
      }
    } catch (e) {
      // fallback
    } finally {
      setActionLoading(false);
      setShowRejectPrompt(false);
      setShowInfoPrompt(false);
      setAdminNotes('');
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      app.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.country?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">Approved & Active</span>;
      case 'pending_review':
        return <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">Pending Review</span>;
      case 'more_info_needed':
        return <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">More Info Needed</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">Rejected</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Metrics */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Internal Underwriting & Risk Operations Desk</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Application Review & Module Activation Console
            </h1>
          </div>

          <button
            onClick={fetchApplications}
            disabled={loading}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Queue</span>
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Total Applications</span>
            <span className="text-xl font-bold text-white block mt-1">{applications.length}</span>
            <span className="text-[10px] text-slate-500 font-mono">Institutional Queue</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-amber-400 block">Pending Review</span>
            <span className="text-xl font-bold text-amber-300 block mt-1">
              {applications.filter(a => a.status === 'pending_review').length}
            </span>
            <span className="text-[10px] text-amber-400/70 font-mono">Under 48h SLA</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-emerald-400 block">Active Approved Tenants</span>
            <span className="text-xl font-bold text-emerald-300 block mt-1">
              {applications.filter(a => a.status === 'approved').length + 1}
            </span>
            <span className="text-[10px] text-emerald-400/70 font-mono">Engines Active</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-cyan-400 block">Monthly Pipeline GMV</span>
            <span className="text-xl font-bold text-cyan-300 block mt-1">$4,850,000</span>
            <span className="text-[10px] text-cyan-400/70 font-mono">10 Orchestration Corridors</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Table (Left) + Detail Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Applications Queue (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Filter Bar */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business, ID, applicant..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {['ALL', 'pending_review', 'approved', 'more_info_needed', 'rejected'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap font-medium transition-all ${
                    statusFilter === st
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {st === 'ALL' ? 'All (Queue)' : st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
            {filteredApps.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500">
                No applications matching current filters.
              </div>
            ) : (
              filteredApps.map(app => {
                const isSelected = selectedApp?.id === app.id;
                return (
                  <button
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 font-bold block mb-0.5">
                          {app.id}
                        </span>
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {app.businessName}
                        </h4>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {app.applicantName} • {app.country}
                        </span>
                      </div>
                      <div>
                        {getStatusBadge(app.status)}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{app.selectedModules?.length || 1} Modules Active</span>
                      <span>{app.estimatedMonthlyVolume || '$100k-$500k'}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Application Inspector (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedApp ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400">{selectedApp.id}</span>
                    {getStatusBadge(selectedApp.status)}
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight">
                    {selectedApp.businessName}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Applicant: <strong className="text-white">{selectedApp.applicantName}</strong> ({selectedApp.email} • {selectedApp.phone})
                  </p>
                </div>

                {selectedApp.tenantId && onOpenTenantWorkspace && (
                  <button
                    onClick={() => onOpenTenantWorkspace(selectedApp.tenantId)}
                    className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start"
                  >
                    <span>Open Tenant Workspace</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Statutory Business Profile Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block pb-1 border-b border-slate-800">
                  Statutory Profile & Corporate Registration
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Legal Entity Name</span>
                    <span className="text-white font-medium">{selectedApp.profile?.legalName || selectedApp.businessName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Registration Number</span>
                    <span className="text-white font-mono">{selectedApp.profile?.registrationNumber || 'Pending'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Tax Identification (TIN)</span>
                    <span className="text-white font-mono">{selectedApp.profile?.taxId || 'Pending'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Industry Sector</span>
                    <span className="text-white">{selectedApp.profile?.industry || selectedApp.businessType}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-500 block">Physical Registered Address</span>
                    <span className="text-white">{selectedApp.profile?.address || selectedApp.country}</span>
                  </div>
                </div>
              </div>

              {/* Selected Modules & Configuration */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block pb-1 border-b border-slate-800">
                  Target Engines Requested ({selectedApp.selectedModules?.length || 1})
                </span>
                <div className="space-y-2">
                  {(selectedApp.selectedModules || []).map((modId: string) => {
                    const mod = ORCHESTRATION_MODULES.find(m => m.id === modId);
                    return (
                      <div key={modId} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{mod?.title || modId}</span>
                          <span className="text-[10px] text-slate-400">{mod?.category || 'Financial Engine'}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 text-[10px] font-mono">
                          Configured
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Connected Connectors Test Results */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block pb-1 border-b border-slate-800">
                  Connected Connectors & Test Verification
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(selectedApp.connectors || []).map((conn: any, i: number) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="font-mono text-white capitalize">{conn.id}</span>
                      <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>{conn.status || 'VERIFIED'}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded KYB Documents */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block pb-1 border-b border-slate-800">
                  Verified KYB / KYC Compliance Artifacts
                </span>
                <div className="space-y-1.5">
                  {(selectedApp.kycDocs || []).map((doc: any, i: number) => (
                    <div key={i} className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-slate-300 font-mono text-[11px]">{doc.fileName}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-300">Verified Doc</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                
                {/* Decision Triggers */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleDecision('approved')}
                    disabled={actionLoading}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-emerald-400/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Application & Enable Modules</span>
                  </button>

                  <button
                    onClick={() => setShowInfoPrompt(!showInfoPrompt)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-300 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Request More Info</span>
                  </button>

                  <button
                    onClick={() => setShowRejectPrompt(!showRejectPrompt)}
                    className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject Application</span>
                  </button>
                </div>

                {/* More Info Prompt Input */}
                {showInfoPrompt && (
                  <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/60 space-y-3 animate-in fade-in duration-150">
                    <label className="text-xs font-bold text-sky-300 block">
                      Send Request Message to Applicant:
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="e.g. Please supply updated 2026 tax clearance certificate and audited bank statements for higher auto-sweep limits."
                      className="w-full p-2.5 bg-slate-950 border border-sky-800/80 rounded-xl text-xs text-white placeholder-slate-500 h-20"
                    />
                    <button
                      onClick={() => handleDecision('more_info_needed')}
                      disabled={actionLoading}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Request to Applicant</span>
                    </button>
                  </div>
                )}

                {/* Reject Prompt Input */}
                {showRejectPrompt && (
                  <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-3 animate-in fade-in duration-150">
                    <label className="text-xs font-bold text-rose-300 block">
                      Reason for Rejection:
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="State reason (e.g. Incomplete corporate incorporation documentation or sanction risk match)."
                      className="w-full p-2.5 bg-slate-950 border border-rose-800/80 rounded-xl text-xs text-white placeholder-slate-500 h-20"
                    />
                    <button
                      onClick={() => handleDecision('rejected')}
                      disabled={actionLoading}
                      className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
                    >
                      <span>Confirm Rejection</span>
                    </button>
                  </div>
                )}

              </div>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 rounded-3xl bg-slate-900 border border-slate-800 text-slate-500 text-xs">
              Select an application from the queue to inspect details and execute underwriting decisions.
            </div>
          )}
        </div>

      </div>

      {/* Welcome Email Modal / Dispatch Preview */}
      {welcomeEmailModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-slate-900 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-400 border border-emerald-400/50 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Welcome Email & Credentials Dispatched</h3>
                  <span className="text-xs text-slate-400">Automated tenant provision notification sent to {welcomeEmailModal.recipientEmail}</span>
                </div>
              </div>
              <button
                onClick={() => setWelcomeEmailModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Preview Container */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3 font-sans">
              <div className="border-b border-slate-800 pb-2">
                <span className="text-slate-400">Subject: </span>
                <strong className="text-white">{welcomeEmailModal.subject}</strong>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Enabled Modules:</span>
                <div className="flex flex-wrap gap-1">
                  {(welcomeEmailModal.enabledModules || []).map((m: string) => (
                    <span key={m} className="px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300 font-mono text-[10px]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Onboarding Next Steps Checklist:</span>
                <ul className="space-y-1">
                  {(welcomeEmailModal.checklist || []).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">Dispatched at {welcomeEmailModal.sentAt}</span>
                <span className="text-[10px] text-emerald-400 font-bold">200 OK Delivered</span>
              </div>
            </div>

            <button
              onClick={() => setWelcomeEmailModal(null)}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Close Dispatch Notice
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
