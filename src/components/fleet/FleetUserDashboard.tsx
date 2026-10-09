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
  ShoppingBag,
  CreditCard,
  LineChart,
  BadgeDollarSign,
  Users,
  Wallet,
  Clock,
  Briefcase,
  FileText,
  DollarSign,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  Key,
  ShieldCheck,
  UserPlus,
  Sliders,
  Download,
  AlertCircle,
  Check,
  X,
  ExternalLink
} from 'lucide-react';
import { ORCHESTRATION_MODULES, ORG_ROLES, FLEET_CONNECTORS_CONFIG } from '../../data/orchestrationModules';

interface FleetUserDashboardProps {
  initialTenantId?: string;
  onOpenAdminConsole?: () => void;
  onStartNewApplication?: () => void;
}

export const FleetUserDashboard: React.FC<FleetUserDashboardProps> = ({
  initialTenantId = 'tenant-savanna-001',
  onOpenAdminConsole,
  onStartNewApplication
}) => {
  const [activeTab, setActiveTab] = useState<'modules' | 'ledger' | 'connectors' | 'team' | 'security'>('modules');
  const [currentRole, setCurrentRole] = useState<'owner_admin' | 'finance_manager' | 'viewer_analyst'>('owner_admin');
  
  // Tenant & Data state
  const [tenant, setTenant] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [ledgerSummary, setLedgerSummary] = useState<any>(null);
  const [ledgerEntries, setLedgerEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Ledger Filters
  const [ledgerCurrencyFilter, setLedgerCurrencyFilter] = useState<string>('ALL');
  const [ledgerTypeFilter, setLedgerTypeFilter] = useState<string>('ALL');

  // Quick Action execution state
  const [actionExecuting, setActionExecuting] = useState<string | null>(null);
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

  // Invite member modal
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [inviteName, setInviteName] = useState<string>('');
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [inviteRole, setInviteRole] = useState<string>('finance_manager');

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true);
  const [totpSimulatedCode, setTotpSimulatedCode] = useState<string>('592 104');

  const fetchTenantData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fleet/tenants/${initialTenantId}`);
      if (res.ok) {
        const json = await res.json();
        setTenant(json.tenant);
        setMembers(json.members || []);
        setLedgerSummary(json.ledgerSummary || {});
      }
    } catch (e) {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const fetchLedger = async () => {
    try {
      const url = `/api/fleet/tenants/${initialTenantId}/ledger?currency=${ledgerCurrencyFilter}&type=${ledgerTypeFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setLedgerEntries(json.entries || []);
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    fetchTenantData();
  }, [initialTenantId]);

  useEffect(() => {
    fetchLedger();
  }, [initialTenantId, ledgerCurrencyFilter, ledgerTypeFilter]);

  // Execute Quick Action per Module
  const handleExecuteAction = async (actionType: string, payload: any = {}) => {
    if (currentRole === 'viewer_analyst') {
      alert('Action Denied: Viewer / Analyst accounts have read-only permissions.');
      return;
    }

    setActionExecuting(actionType);
    setActionSuccessNotice(null);

    try {
      const res = await fetch(`/api/fleet/tenants/${initialTenantId}/actions/${actionType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessNotice(`Execution Confirmed (${data.reference}): ${actionType.replace('_', ' ').toUpperCase()} settled successfully.`);
        fetchTenantData();
        fetchLedger();
      }
    } catch (e) {
      setActionSuccessNotice(`Execution processed locally (${actionType}).`);
    } finally {
      setActionExecuting(null);
    }
  };

  // Invite Team Member
  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    try {
      const res = await fetch(`/api/fleet/tenants/${initialTenantId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inviteName,
          email: inviteEmail,
          role: inviteRole
        })
      });
      const data = await res.json();
      if (data.success) {
        setMembers(prev => [...prev, data.member]);
        setShowInviteModal(false);
        setInviteName('');
        setInviteEmail('');
      }
    } catch (e) {
      // fallback
    }
  };

  const roleConfig = ORG_ROLES.find(r => r.id === currentRole) || ORG_ROLES[0];
  const enabledModuleIds: string[] = tenant?.enabledModules || ['sme-treasury', 'marketplace-payouts', 'digital-treasury'];

  return (
    <div className="space-y-8">
      
      {/* Executive Workspace Header & Role Switcher Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                {tenant?.id || 'TENANT-SAVANNA-001'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Production Fleet Active</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Base Currency: <strong className="text-white">{tenant?.baseCurrency || 'USD'}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {tenant?.name || 'Savanna Trade Logistics & E-Commerce Ltd'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Active Unified Operations Console • {enabledModuleIds.length} Orchestration Engines Running
            </p>
          </div>

          {/* Role Switcher Toolbar */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 self-start lg:self-auto">
            <div className="flex items-center justify-between gap-3 text-[11px]">
              <span className="text-slate-400 font-medium">Simulate User Role:</span>
              <span className={`px-2 py-0.5 rounded font-bold border text-[10px] ${roleConfig.badgeColor}`}>
                {roleConfig.label}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              {ORG_ROLES.map(r => (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentRole === r.id
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {r.label.split('/')[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Primary Top Metrics */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Total Normalized Liquidity</span>
            <span className="text-xl font-bold text-white block mt-1 font-mono">
              ${(ledgerSummary?.netBalanceUsd || 168920.45).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Paystack + Mono Net</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Active Operating Engines</span>
            <span className="text-xl font-bold text-amber-300 block mt-1">
              {enabledModuleIds.length} Active Modules
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Zero Intermediary Delay</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Connected Rails</span>
            <span className="text-xl font-bold text-emerald-300 block mt-1">
              8 / 8 Live Probes
            </span>
            <span className="text-[10px] text-emerald-400/80 font-mono">Sub-150ms Latency</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">30-Day Automated Volume</span>
            <span className="text-xl font-bold text-cyan-300 block mt-1 font-mono">
              $184,500.00
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">100% Reconciled</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'modules', label: 'Enabled Modules & Controls', count: enabledModuleIds.length },
            { id: 'ledger', label: 'Unified Multi-Currency Ledger', count: ledgerEntries.length },
            { id: 'connectors', label: 'Live Connectors Health', count: 8 },
            { id: 'team', label: 'Team & RBAC Permissions', count: members.length },
            { id: 'security', label: 'Security & 2FA / API Keys', count: null }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action Execution Feedback Notice */}
      {actionSuccessNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionSuccessNotice}</span>
          </div>
          <button onClick={() => setActionSuccessNotice(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 1: Enabled Modules & Interactive Quick Controls */}
      {/* ============================================================ */}
      {activeTab === 'modules' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span>Active Financial Orchestration Modules</span>
              </h2>
              <p className="text-xs text-slate-400">
                Execute operational sweeps, payout batches, working capital advances, and claims in real-time.
              </p>
            </div>

            {onStartNewApplication && (
              <button
                onClick={onStartNewApplication}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 border border-slate-700 transition-colors"
              >
                + Request Additional Modules
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enabledModuleIds.map(modId => {
              const mod = ORCHESTRATION_MODULES.find(m => m.id === modId);
              if (!mod) return null;
              const IconComp = mod.icon;

              return (
                <div 
                  key={modId}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-5"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${mod.accentColor}`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-amber-400 font-bold">ENGINE #{mod.number}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                              ONLINE
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-white mt-0.5">{mod.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {mod.simpleExplanation}
                    </p>

                    {/* Operational Controls by Module */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                        Operational Controls:
                      </span>

                      {/* SME Treasury Controls */}
                      {modId === 'sme-treasury' && (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleExecuteAction('auto_sweep', { sourceCurrency: 'GHS', targetCurrency: 'USD', amount: 15000 })}
                            disabled={actionExecuting === 'auto_sweep'}
                            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <Play className="w-3 h-3 fill-slate-950" />
                            <span>Run Auto-Sweep ($15k Netting)</span>
                          </button>

                          <button
                            onClick={() => handleExecuteAction('request_working_capital', { amount: 35000 })}
                            disabled={actionExecuting === 'request_working_capital'}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
                          >
                            <DollarSign className="w-3 h-3 text-emerald-400" />
                            <span>Request Capital Pack</span>
                          </button>
                        </div>
                      )}

                      {/* Marketplace Payouts Controls */}
                      {modId === 'marketplace-payouts' && (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleExecuteAction('trigger_payout', { amount: 48500, recipientCount: 24 })}
                            disabled={actionExecuting === 'trigger_payout'}
                            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                          >
                            <Play className="w-3 h-3 fill-slate-950" />
                            <span>Trigger Daily Seller Batch (24 Vendors)</span>
                          </button>
                        </div>
                      )}

                      {/* Other engines default trigger */}
                      {modId !== 'sme-treasury' && modId !== 'marketplace-payouts' && (
                        <button
                          onClick={() => handleExecuteAction(`run_${modId}`)}
                          disabled={Boolean(actionExecuting)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
                        >
                          <Play className="w-3 h-3 text-amber-400" />
                          <span>Execute Scheduled Rule</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Rails Tag */}
                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Active Rails: {mod.coreRails.slice(0, 3).join(', ')}</span>
                    <span className="font-mono text-emerald-400">99.98% Uptime</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: Normalized Unified Ledger */}
      {/* ============================================================ */}
      {activeTab === 'ledger' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Unified Multi-Currency Operating Ledger</span>
              </h2>
              <p className="text-xs text-slate-400">
                Single-pane-of-glass accounting across Paystack, Mono, Stitch, and Shopify sales.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2">
              <select
                value={ledgerCurrencyFilter}
                onChange={(e) => setLedgerCurrencyFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="ALL">All Currencies</option>
                <option value="USD">USD</option>
                <option value="GHS">GHS</option>
                <option value="NGN">NGN</option>
                <option value="ZAR">ZAR</option>
              </select>

              <select
                value={ledgerTypeFilter}
                onChange={(e) => setLedgerTypeFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="ALL">All Types</option>
                <option value="INFLOW">Inflows</option>
                <option value="OUTFLOW">Outflows</option>
                <option value="AUTO_SWEEP">Auto-Sweeps</option>
              </select>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                  <tr>
                    <th className="px-5 py-3">Timestamp / Ref</th>
                    <th className="px-4 py-3">Connector Rail</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3 text-right">Native Amount</th>
                    <th className="px-5 py-3 text-right">Normalized (USD)</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {ledgerEntries.map((tx: any) => (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-3 font-mono text-[11px]">
                        <span className="text-white block">{tx.reference}</span>
                        <span className="text-slate-500 text-[10px]">{new Date(tx.timestamp).toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-200">
                        {tx.connector}
                      </td>
                      <td className="px-4 py-3 text-white">
                        {tx.description}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tx.type === 'INFLOW' 
                            ? 'bg-emerald-500/10 text-emerald-300' 
                            : tx.type === 'AUTO_SWEEP'
                            ? 'bg-amber-500/10 text-amber-300'
                            : 'bg-rose-500/10 text-rose-300'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-white">
                        {tx.currency} {Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-5 py-3 text-right font-mono font-bold text-amber-300">
                        ${Number(tx.normalizedUsd).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: Connectors Health */}
      {/* ============================================================ */}
      {activeTab === 'connectors' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Real-Time Connector Probes & Health Status</span>
            </h2>
            <p className="text-xs text-slate-400">
              Continuous heartbeat monitoring and automated failover across open endpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FLEET_CONNECTORS_CONFIG.map(conn => (
              <div key={conn.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{conn.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {conn.description}
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span className="text-emerald-400">ONLINE</span>
                  <span>Avg 120ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: Team & Role-Based Access Control (RBAC) */}
      {/* ============================================================ */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Organization Team Members & Permission Matrix</span>
              </h2>
              <p className="text-xs text-slate-400">
                Grant role-based access for Owners, Finance Managers, and Read-Only Analysts.
              </p>
            </div>

            {currentRole === 'owner_admin' ? (
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-400/20"
              >
                <UserPlus className="w-4 h-4" />
                <span>Invite Team Member</span>
              </button>
            ) : (
              <span className="text-xs text-slate-500">
                Only Owners can invite new members.
              </span>
            )}
          </div>

          {/* Members List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Organization Users ({members.length})
              </h3>
            </div>
            <div className="divide-y divide-slate-800">
              {members.map(m => {
                const rInfo = ORG_ROLES.find(r => r.id === m.role) || ORG_ROLES[0];
                return (
                  <div key={m.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-300 text-xs">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{m.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{m.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${rInfo.badgeColor}`}>
                        {rInfo.label}
                      </span>
                      {m.twoFactorEnabled && (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>2FA On</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RBAC Matrix Explainer */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block">
              Role Authority Matrix:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {ORG_ROLES.map(r => (
                <div key={r.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">{r.label}</span>
                  <p className="text-[11px] text-slate-400">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: Security & 2FA */}
      {/* ============================================================ */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              <span>Security Protocols, 2FA & API Key Governance</span>
            </h2>
            <p className="text-xs text-slate-400">
              Institutional cryptographic protection for treasury movements and programmatic API access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 2FA Card */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  twoFactorEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {twoFactorEnabled ? 'ACTIVE (TOTP)' : 'DISABLED'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Requires a 6-digit one-time code for every high-value sweep exceeding $25,000 or new connector linking.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Current Code:</span>
                <span className="font-mono font-bold text-amber-300 text-sm tracking-widest">{totpSimulatedCode}</span>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
              >
                {twoFactorEnabled ? 'Re-Configure 2FA Authenticator' : 'Enable Two-Factor Authentication'}
              </button>
            </div>

            {/* API Keys Card */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Fleet Secret API Keys</span>
                <span className="text-[10px] font-mono text-amber-400">PROD KEYS</span>
              </div>
              <p className="text-xs text-slate-400">
                Programmatic REST API keys to trigger payouts and ledger exports from your ERP/accounting system.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500">fl_sec_live_9921••••••••••</span>
                <button className="text-amber-400 hover:underline text-[11px]">Copy</button>
              </div>
              <button
                onClick={() => alert('New key generated. Previous key will expire in 24 hours.')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
              >
                Rotate API Keys
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-400" />
                <span>Invite Organization User</span>
              </h3>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  placeholder="e.g. Amara Diallo"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  placeholder="e.g. amara@company.com"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Assigned Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  <option value="owner_admin">Owner / Admin (Full Access)</option>
                  <option value="finance_manager">Finance Manager (Execute Sweeps & Payouts)</option>
                  <option value="viewer_analyst">Viewer / Analyst (Read-Only Ledger & Reports)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-amber-400/20"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
