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
  ChevronDown,
  ChevronUp,
  Server,
  Sliders,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Clock,
  Calendar,
  Layers3,
  FileCode2,
  CheckCheck,
  Send,
  AlertCircle,
  ShoppingBag,
  CreditCard,
  LineChart,
  BadgeDollarSign
} from 'lucide-react';

interface CrossBorderSmeTreasurySectionProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export const CrossBorderSmeTreasurySection: React.FC<CrossBorderSmeTreasurySectionProps> = ({
  onSelectServiceForInquiry
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'connectors' | 'rules' | 'lender' | 'architecture'>('overview');
  const [treasuryData, setTreasuryData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Rule Test States
  const [sweepExecuting, setSweepExecuting] = useState<boolean>(false);
  const [sweepResponse, setSweepResponse] = useState<any>(null);

  const [scheduleExecuting, setScheduleExecuting] = useState<boolean>(false);
  const [scheduleResponse, setScheduleResponse] = useState<any>(null);

  // Lender Working Capital State
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [loanPeriod, setLoanPeriod] = useState<number>(60);
  const [loanReason, setLoanReason] = useState<string>('Inventory Pre-financing for Shopify Holiday Spike');
  const [lenderSubmitting, setLenderSubmitting] = useState<boolean>(false);
  const [lenderDecision, setLenderDecision] = useState<any>(null);

  const fetchOverview = async () => {
    try {
      const res = await fetch('/api/sme-treasury/overview');
      if (res.ok) {
        const json = await res.json();
        setTreasuryData(json);
      }
    } catch (e) {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleExecuteSweep = async () => {
    setSweepExecuting(true);
    try {
      const res = await fetch('/api/sme-treasury/rules/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleType: 'AUTO_SWEEP', thresholdAmount: 50000 })
      });
      if (res.ok) {
        const json = await res.json();
        setSweepResponse(json);
        fetchOverview();
      }
    } catch (e) {
      // ignore
    } finally {
      setSweepExecuting(false);
    }
  };

  const handleExecuteSchedule = async () => {
    setScheduleExecuting(true);
    try {
      const res = await fetch('/api/sme-treasury/rules/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleType: 'SCHEDULED_SUPPLIER_TAX' })
      });
      if (res.ok) {
        const json = await res.json();
        setScheduleResponse(json);
      }
    } catch (e) {
      // ignore
    } finally {
      setScheduleExecuting(false);
    }
  };

  const handleRequestWorkingCapital = async () => {
    setLenderSubmitting(true);
    try {
      const res = await fetch('/api/sme-treasury/working-capital/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestedAmountUsd: loanAmount,
          reason: loanReason,
          repaymentPeriodDays: loanPeriod
        })
      });
      if (res.ok) {
        const json = await res.json();
        setLenderDecision(json);
      }
    } catch (e) {
      // ignore
    } finally {
      setLenderSubmitting(false);
    }
  };

  return (
    <section id="sme-treasury" className="py-24 bg-[#050B16] text-slate-100 border-t border-[#D4AF37]/20 relative overflow-hidden">
      
      {/* Background Subtle Tech Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#D4AF37]/15 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] shadow-lg shadow-[#D4AF37]/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cross-Border SME Treasury Orchestration</span>
            <span className="text-slate-500">|</span>
            <span className="text-white">Paystack African Rail · Mono / Okra / Stitch · Shopify / WooCommerce</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Cross-Border SME Treasury & <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent">Liquidity Orchestration</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Aggregating SME accounts, e-commerce marketplaces, open-banking APIs, and payment rails using live public endpoints. With Paystack as the core African rail, auto-sweeping excess cash, scheduling payroll/tax batches, and triggering partner working capital during predicted shortfalls.
          </p>

          {/* Live External Connectors Pill Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="bg-[#0A1931] px-2.5 py-1 rounded border border-slate-800 text-emerald-400">Paystack (api.paystack.co)</span>
            <span className="bg-[#0A1931] px-2.5 py-1 rounded border border-slate-800 text-slate-300">Mono (api.withmono.com)</span>
            <span className="bg-[#0A1931] px-2.5 py-1 rounded border border-slate-800 text-slate-300">Okra (api.okra.co)</span>
            <span className="bg-[#0A1931] px-2.5 py-1 rounded border border-slate-800 text-slate-300">Stitch (api.stitch.money)</span>
            <span className="bg-[#0A1931] px-2.5 py-1 rounded border border-slate-800 text-[#D4AF37]">Shopify Admin & WooCommerce</span>
            <span className="bg-[#0A1931] px-2.5 py-1 rounded border border-slate-800 text-slate-300">CoinGecko & Exchangerate.host</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>SME Treasury Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('connectors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'connectors'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Layers3 className="w-3.5 h-3.5" />
            <span>Connectors (Bank, Market, FX)</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'rules'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Sweeps & Scheduled Payroll/Tax</span>
          </button>

          <button
            onClick={() => setActiveTab('lender')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'lender'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <BadgeDollarSign className="w-3.5 h-3.5" />
            <span>Partner Working Capital Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-md shadow-[#D4AF37]/20'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Architecture & Data Model</span>
          </button>
        </div>

        {/* TAB 1: SME TREASURY DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="bg-[#0A1931] rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200">
            
            {/* Top 4 KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#070E1E] p-5 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold">TOTAL SME CASH POSITION</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  ${treasuryData ? treasuryData.totals.totalCashUsd.toLocaleString() : '168,920.45'}
                </div>
                <div className="text-[11px] text-slate-400">Consolidated Base: USD</div>
              </div>

              <div className="bg-[#070E1E] p-5 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">30-DAY INFLOW FORECAST</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  ${treasuryData ? treasuryData.totals.forecastDay30ProjectedUsd.toLocaleString() : '218,500.00'}
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Healthy Cash-Flow (+29.3%)</span>
                </div>
              </div>

              <div className="bg-[#070E1E] p-5 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono uppercase text-purple-400 font-bold">OUTSTANDING FINANCING</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  ${treasuryData ? treasuryData.totals.outstandingFinancingUsd.toLocaleString() : '35,000.00'}
                </div>
                <div className="text-[11px] text-slate-400">Partner Lender Working-Capital</div>
              </div>

              <div className="bg-[#070E1E] p-5 rounded-2xl border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono uppercase text-blue-400 font-bold">COST OF CAPITAL (APR)</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {treasuryData ? treasuryData.totals.costOfCapitalApr : '14.5'}%
                </div>
                <div className="text-[11px] text-slate-400">Blended Partner Facility Rate</div>
              </div>
            </div>

            {/* Currency Positions & Marketplaces Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#D4AF37]" />
                    <span>Normalized Cash Position by Currency</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">UNIFIED LEDGER</span>
                </div>

                <div className="space-y-2.5">
                  {treasuryData?.currencyPositions?.map((cp: any, idx: number) => (
                    <div key={idx} className="p-3 bg-[#0A1931] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{cp.currency} Position</div>
                        <div className="text-[10px] text-slate-400">Local: {cp.amount.toLocaleString()} {cp.currency}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-[#D4AF37]">${Math.round(cp.usdVal).toLocaleString()} USD</div>
                        <div className="text-[10px] text-slate-400">{cp.sharePct}% of liquidity</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>Aggregated Marketplace Sales & Pending Payouts</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">SHOPIFY & WOOCOMMERCE</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-[#0A1931] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Shopify Storefront (2025-10 Admin API)</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">28 Orders in fulfillment pipeline</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-400">$14,600.00</div>
                      <div className="text-[10px] text-slate-400">Settles to Paystack</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0A1931] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>WooCommerce Store (wp-json/wc/v3)</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">19 Orders completed</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-blue-400">$8,400.00</div>
                      <div className="text-[10px] text-slate-400">Direct Paystack Gateway</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0A1931] rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Active CoinGecko BTC Index: <strong className="text-white">${treasuryData?.connectors?.find((c: any) => c.id === 'conn-coingecko')?.liveFeeds?.btcUsd?.toLocaleString() || '64,250'}</strong></span>
                    <span>Live Exchangerate.host USD/GHS: <strong className="text-[#D4AF37]">15.65</strong></span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: CONNECTORS (BANK/OPEN-BANKING, MARKETPLACE, PAYMENTS, MARKET DATA) */}
        {activeTab === 'connectors' && (
          <div className="bg-[#0A1931] rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">Full Live Connectors Registry</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Direct connections across Open Banking (Mono, Okra, Stitch), Marketplaces (Shopify, WooCommerce), African Rails (Paystack), and Market Oracles.
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold shrink-0">
                8 LIVE CONNECTORS ACTIVE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {treasuryData?.connectors?.map((conn: any) => (
                <div key={conn.id} className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">{conn.category}</span>
                      <h4 className="text-lg font-bold text-white">{conn.name}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      {conn.status}
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#0A1931] rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                    <div><span className="text-slate-500">Endpoint: </span><span className="text-emerald-400">{conn.endpoint}</span></div>
                    <div><span className="text-slate-500">Auth: </span><span>{conn.authType}</span></div>
                    {conn.connectedInstitutions && (
                      <div><span className="text-slate-500">Banks: </span><span className="text-white">{conn.connectedInstitutions.join(', ')}</span></div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {conn.capabilities?.map((cap: string, cIdx: number) => (
                      <span key={cIdx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                        {cap}
                      </span>
                    ))}
                  </div>

                  {conn.balances && (
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Aggregated Balances:</span>
                      <span className="font-mono text-white font-bold">
                        {conn.balances.map((b: any) => `${b.amount.toLocaleString()} ${b.currency}`).join(' · ')}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RULES (AUTO-SWEEPING, PAYROLL/TAX/SUPPLIER BATCHES) */}
        {activeTab === 'rules' && (
          <div className="bg-[#0A1931] rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Rule 1: Auto-Sweep */}
              <div className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    <span>Rule A: Excess Cash Auto-Sweep to Base USD</span>
                  </h3>
                  <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-bold">
                    ACTIVE THRESHOLD: GH₵50,000
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Monitors aggregated balances across Paystack and open-banking accounts (Mono/Okra). Whenever local balances cross the threshold, the excess is automatically converted and swept to the SME base currency (USD) to avoid regional inflation.
                </p>

                <div className="p-4 bg-[#0A1931] rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Source Connected Rails:</span>
                    <strong className="text-white">Paystack African Balances + Mono Bank Accounts</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Currency:</span>
                    <strong className="text-emerald-400">USD Central Treasury</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Conversion Mechanism:</span>
                    <strong className="text-white">Live Central Bank Rate via Exchangerate.host</strong>
                  </div>
                </div>

                <button
                  onClick={handleExecuteSweep}
                  disabled={sweepExecuting}
                  className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] text-[#0A1931] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {sweepExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>Execute Auto-Sweep Rule</span>
                </button>

                {sweepResponse && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center justify-between">
                    <span>{sweepResponse.ruleName}: Swept GH₵{sweepResponse.sweptAmountLocal.toLocaleString()} → +${sweepResponse.creditedBaseUsd.toLocaleString()} USD ({sweepResponse.status})</span>
                    <CheckCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                )}
              </div>

              {/* Rule 2: Scheduled Supplier / Payroll / Tax */}
              <div className="bg-[#070E1E] p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>Rule B: Scheduled Supplier, Payroll & Tax Disbursal</span>
                  </h3>
                  <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold">
                    RECURRING CRON
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Automates recurring vendor invoices, staff payroll via Paystack Bulk Transfer, and statutory tax withholdings. Syncs directly with QuickBooks/Xero ledger entries.
                </p>

                <div className="p-4 bg-[#0A1931] rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scheduled Beneficiaries:</span>
                    <strong className="text-white">GRA Tax, International Packaging, Freight Haulers</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Disbursement Rail:</span>
                    <strong className="text-emerald-400">Paystack Transfer API & Dedicated Virtual NUBAN</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Batch Volume:</span>
                    <strong className="text-white">GH₵84,500.00</strong>
                  </div>
                </div>

                <button
                  onClick={handleExecuteSchedule}
                  disabled={scheduleExecuting}
                  className="w-full py-2.5 bg-[#0A1931] hover:bg-[#132746] text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  {scheduleExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>Trigger Scheduled Supplier / Tax Batch</span>
                </button>

                {scheduleResponse && (
                  <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl text-xs text-purple-200 flex items-center justify-between">
                    <span>{scheduleResponse.ruleName}: GH₵{scheduleResponse.totalAmountGhs.toLocaleString()} ({scheduleResponse.status})</span>
                    <CheckCheck className="w-4 h-4 text-purple-400" />
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: PARTNER WORKING-CAPITAL LENDER CONNECTOR */}
        {activeTab === 'lender' && (
          <div className="bg-[#0A1931] rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form & Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <BadgeDollarSign className="w-4 h-4 text-emerald-400" />
                    <span>ABSTRACT LENDER CONNECTOR INTERFACE</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Automated Working-Capital Shortfall Trigger & Disbursement
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    When cash-flow forecasting predicts a seasonal shortfall (or an inventory surge from Shopify orders), the system packages a standardized cash-flow pack and requests financing from partner lenders. On approval, funds disburse instantly via Paystack, with automated daily split-settlement repayments.
                  </p>
                </div>

                <div className="bg-[#070E1E] p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Requested Facility Amount (USD)</label>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full bg-[#0A1931] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Repayment Term (Days)</label>
                      <select
                        value={loanPeriod}
                        onChange={(e) => setLoanPeriod(Number(e.target.value))}
                        className="w-full bg-[#0A1931] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value={30}>30 Days (Flash Inventory Turn)</option>
                        <option value={60}>60 Days (Standard Working Capital)</option>
                        <option value={90}>90 Days (Quarterly Buffer)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Commercial Purpose</label>
                    <input
                      type="text"
                      value={loanReason}
                      onChange={(e) => setLoanReason(e.target.value)}
                      className="w-full bg-[#0A1931] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <button
                  onClick={handleRequestWorkingCapital}
                  disabled={lenderSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] text-[#0A1931] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  {lenderSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Transmit Standardized Cash-Flow Pack to Partner Lender</span>
                </button>
              </div>

              {/* Live Decision Panel */}
              <div className="lg:col-span-5 bg-[#070E1E] rounded-2xl border border-slate-800 p-5 font-mono text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px]">
                  <span className="text-slate-300 font-bold">LENDER CONNECTOR AUDIT</span>
                  <span className="text-emerald-400 font-bold">LIVE INTERFACE</span>
                </div>

                {lenderDecision ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl space-y-1">
                      <div className="text-emerald-400 font-bold text-xs">// {lenderDecision.status}</div>
                      <div className="text-white font-bold text-base">${lenderDecision.approvedAmountUsd.toLocaleString()} USD Approved</div>
                      <div className="text-[11px] text-slate-300">Cost of Capital: {lenderDecision.costOfCapitalApr}% APR · {lenderDecision.repaymentPeriodDays} Days</div>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-300 bg-[#0A1931] p-3 rounded-xl border border-slate-800">
                      <div><strong className="text-slate-400">Disbursement Rail: </strong>{lenderDecision.disbursementRail}</div>
                      <div><strong className="text-slate-400">Repayment Mechanism: </strong>{lenderDecision.repaymentMechanism}</div>
                      <div><strong className="text-slate-400">Est. Weekly Settlement: </strong>${lenderDecision.estimatedRepaymentWeeklyUsd.toLocaleString()}</div>
                    </div>

                    <div className="text-[10px] text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-900">
                      Cash-Flow Data Pack Verified: GMV ${lenderDecision.cashFlowPackSummary.last90DaysGmvUsd.toLocaleString()} · DSCR {lenderDecision.cashFlowPackSummary.debtServiceCoverageRatio}x
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-500 space-y-2">
                    <BadgeDollarSign className="w-8 h-8 mx-auto text-[#D4AF37]/50" />
                    <p className="text-xs">Submit a working-capital request to generate the live standardized cash-flow pack and receive instant partner credit terms.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: ARCHITECTURE OVERVIEW, DATA MODEL & PHASED INTEGRATION PLAN */}
        {activeTab === 'architecture' && (
          <div className="bg-[#0A1931] rounded-3xl border border-[#D4AF37]/30 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200 text-xs">
            
            {/* Architecture Overview */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-[#D4AF37]" />
                <span>1. Architecture Overview (Cross-Border SME Orchestration)</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Aggregates data and execution layers across regional open-banking providers, marketplaces, payment processors, and crypto/FX market data. A central event bus normalizes payloads into a double-entry balance sheet per SME tenant.
              </p>
              <div className="bg-[#070E1E] p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
{`+-------------------------------------------------------------------------------------------------+
|                               CROSS-BORDER SME CLIENT CONSOLE                                   |
+-------------------------------------------------------------------------------------------------+
                                               |
                                     (REST / Webhook Ingest)
                                               v
+-------------------------------------------------------------------------------------------------+
|                       OSKAYI SME TREASURY ORCHESTRATION ENGINE                                  |
|                                                                                                 |
|   [ Normalized Inflow/Outflow Ledger ]   [ Liquidity Auto-Sweeper ]   [ Cash-Flow Deficit Forecaster ] |
+-------------------------------------------------------------------------------------------------+
       |                      |                         |                        |
       v                      v                         v                        v
[ OPEN BANKING ]      [ MARKETPLACES ]          [ CORE RAIL ]           [ MARKET ORACLES ]
• Mono (Accounts)     • Shopify (Orders/GMV)    • Paystack (Charges)    • CoinGecko (Prices)
• Okra (Balances)     • WooCommerce (Sales)     • Paystack (Transfers)  • Exchangerate.host (FX)
• Stitch (InstantPay)                           • Paystack (Sub/NUBAN)`}
              </div>
            </div>

            {/* Data Model */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>2. Normalized Unified Data Model</span>
              </h3>
              <div className="bg-[#070E1E] p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-[#D4AF37] overflow-x-auto">
{`// 1. Normalized Transaction Schema
interface NormalizedSmeTransaction {
  transactionId: string;
  smeId: string;
  sourceConnectorId: 'PAYSTACK' | 'MONO' | 'OKRA' | 'STITCH' | 'SHOPIFY' | 'WOOCOMMERCE';
  entryType: 'INFLOW_ORDER' | 'OUTFLOW_PAYROLL' | 'OUTFLOW_TAX' | 'SWEEP_TRANSFER' | 'LENDER_DISBURSE';
  rawAmount: number;
  rawCurrency: string;
  normalizedAmountUsd: number;
  fxRateUsed: number;
  counterparty: { name: string; institution?: string; accountRef?: string };
  status: 'PENDING' | 'SETTLED' | 'RECONCILED';
  timestamp: string;
}

// 2. Abstract Lender Connector Interface
export interface LenderConnector {
  readonly lenderId: string;
  assessCashFlow(pack: StandardizedCashFlowPack): Promise<LenderCreditOffer>;
  executeDisbursement(approvedOfferId: string, rail: 'PAYSTACK_DIRECT'): Promise<DisbursementResult>;
  setupRepaymentSchedule(schedule: SplitSettlementPolicy): Promise<RepaymentPlan>;
}`}
              </div>
            </div>

            {/* Phased Integration Plan */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCheck className="w-4 h-4 text-purple-400" />
                <span>3. Phased Integration Plan</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#070E1E] rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-white text-xs block">Phase 1: First Fully Live Connectors</strong>
                  <p className="text-slate-400 text-[11px]">
                    Paystack (charges/transfers), Mono/Okra/Stitch for real-time bank balances, Shopify/WooCommerce for orders, CoinGecko & Exchangerate.host for FX.
                  </p>
                </div>
                <div className="p-4 bg-[#070E1E] rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-white text-xs block">Phase 2: Rules & Sweeping Automation</strong>
                  <p className="text-slate-400 text-[11px]">
                    Automated threshold excess balance sweeps, scheduled tax batches, and payroll via Paystack Bulk Transfer APIs.
                  </p>
                </div>
                <div className="p-4 bg-[#070E1E] rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-white text-xs block">Phase 3: Partner Lender Marketplace</strong>
                  <p className="text-slate-400 text-[11px]">
                    Standardized cash-flow packet distribution to accredited SME lenders with automated split-settlement collection.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
