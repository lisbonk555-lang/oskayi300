import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  FileText, 
  ShieldCheck, 
  DollarSign, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  Ship, 
  Compass, 
  Layers, 
  Plus, 
  Search, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { LetterOfCredit, BankGuarantee, InvoiceAdvance, TradeDocumentCheckResult } from '../../server/oskayiTradeService';

export const OskayiTrade: React.FC = () => {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [lcs, setLcs] = useState<LetterOfCredit[]>([]);
  const [guarantees, setGuarantees] = useState<BankGuarantee[]>([]);
  const [invoices, setInvoices] = useState<InvoiceAdvance[]>([]);
  const [activeTab, setActiveTab] = useState<'lcs' | 'guarantees' | 'invoices' | 'checker'>('lcs');
  
  // Apply LC Modal
  const [showLcModal, setShowLcModal] = useState<boolean>(false);
  const [importerName, setImporterName] = useState<string>('Accra Agro Commodities Export Ltd');
  const [exporterName, setExporterName] = useState<string>('Rotterdam Port Logistics BV');
  const [lcAmount, setLcAmount] = useState<number>(500000);
  const [portLoading, setPortLoading] = useState<string>('Rotterdam (NLRTM)');
  const [portDischarge, setPortDischarge] = useState<string>('Tema Port (GHTEM)');
  const [goodsDesc, setGoodsDesc] = useState<string>('Containerized Agricultural Processing Spares');

  // Document Checker Form
  const [checkInvoiceAmount, setCheckInvoiceAmount] = useState<number>(550000);
  const [checkLcAmount, setCheckLcAmount] = useState<number>(500000);
  const [checkInvoiceIncoterm, setCheckInvoiceIncoterm] = useState<string>('FOB');
  const [checkLcIncoterm, setCheckLcIncoterm] = useState<string>('CIF');
  const [checkResult, setCheckResult] = useState<TradeDocumentCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  // Invoice Advance Modal
  const [showAdvanceModal, setShowAdvanceModal] = useState<boolean>(false);
  const [invoiceFaceValue, setInvoiceFaceValue] = useState<number>(250000);
  const [buyerName, setBuyerName] = useState<string>('Nestle International AG');

  const fetchTradeData = async () => {
    try {
      const [mRes, lRes, gRes, iRes] = await Promise.all([
        fetch('/api/trade/metrics'),
        fetch('/api/trade/lcs'),
        fetch('/api/trade/guarantees'),
        fetch('/api/trade/invoices')
      ]);
      if (mRes.ok) setMetrics(await mRes.json());
      if (lRes.ok) setLcs(await lRes.json());
      if (gRes.ok) setGuarantees(await gRes.json());
      if (iRes.ok) setInvoices(await iRes.json());
    } catch (e) {
      console.error('Failed to load trade data:', e);
    }
  };

  useEffect(() => {
    fetchTradeData();
  }, []);

  const handleApplyLc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/trade/apply-lc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantImporter: importerName,
          beneficiaryExporter: exporterName,
          amountUsd: lcAmount,
          issuingBank: 'Ecobank Ghana PLC',
          portOfLoading: portLoading,
          portOfDischarge: portDischarge,
          goodsDescription: goodsDesc,
          incoterms: 'CIF'
        })
      });
      if (res.ok) {
        setShowLcModal(false);
        await fetchTradeData();
      }
    } catch (e) {
      console.error('Apply LC error:', e);
    }
  };

  const handleRunDocChecker = async () => {
    setIsChecking(true);
    try {
      const res = await fetch('/api/trade/check-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceData: { amount: checkInvoiceAmount, incoterms: checkInvoiceIncoterm },
          lcData: { amount: checkLcAmount, incoterms: checkLcIncoterm }
        })
      });
      if (res.ok) {
        setCheckResult(await res.json());
      }
    } catch (e) {
      console.error('Checker error:', e);
    } finally {
      setIsChecking(false);
    }
  };

  const handleRequestAdvance = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/trade/invoice-advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber: `INV-${Date.now().toString(36).toUpperCase()}`,
          buyerName,
          supplierName: 'Oskayi Global Trade Partner',
          faceValueUsd: invoiceFaceValue
        })
      });
      if (res.ok) {
        setShowAdvanceModal(false);
        await fetchTradeData();
      }
    } catch (e) {
      console.error('Invoice advance error:', e);
    }
  };

  const formatUsd = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-[#080D1A] text-slate-100 flex flex-col font-sans">
      {/* Top Trade Ribbon */}
      <div className="bg-[#0F182E] border-b border-blue-500/30 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-0.5 flex items-center justify-center shadow-lg shadow-blue-950">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-wider">
                OSKAYI TRADE GLOBAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40">
                ICC UCP 600 • SWIFT MT700 / MT760
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Enterprise Trade Finance Platform for Importers, Exporters & Tier-1 Global Banks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLcModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply for LC (5 min)</span>
          </button>
          <button
            onClick={() => setShowAdvanceModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Invoice Advance (80%)</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6 flex-1">
        
        {/* Top 4 Macro Volume Metrics */}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#0F182E]/90 border border-blue-900/40 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Trade Financed</span>
              <span className="font-mono font-black text-xl text-white block">
                {formatUsd(metrics.total_trade_volume_usd)}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">100% Backed by ICC Standard</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0F182E]/90 border border-blue-900/40 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Active Letters of Credit</span>
              <span className="font-mono font-black text-xl text-blue-400 block">
                {metrics.active_lcs_count} LCs
              </span>
              <span className="text-[10px] text-slate-400 font-mono">UCP 600 Irrevocable</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0F182E]/90 border border-blue-900/40 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Bank Guarantees (MT760)</span>
              <span className="font-mono font-black text-xl text-teal-400 block">
                {metrics.active_guarantees_count} Active
              </span>
              <span className="text-[10px] text-slate-400 font-mono">URDG 758 Performance Bonds</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0F182E]/90 border border-blue-900/40 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">24h Factored Invoices</span>
              <span className="font-mono font-black text-xl text-emerald-400 block">
                {metrics.financed_invoices_count} Funded
              </span>
              <span className="text-[10px] text-slate-400 font-mono">80% Instant Liquidity</span>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-bold font-mono">
          <button
            onClick={() => setActiveTab('lcs')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'lcs' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Letters of Credit (LCs)
          </button>
          <button
            onClick={() => setActiveTab('guarantees')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'guarantees' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bank Guarantees (MT760)
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'invoices' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Invoice Factoring (80%)
          </button>
          <button
            onClick={() => setActiveTab('checker')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'checker' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Document Discrepancy Checker
          </button>
        </div>

        {/* TAB 1: Letters of Credit */}
        {activeTab === 'lcs' && (
          <div className="space-y-3">
            {lcs.map(lc => (
              <div
                key={lc.id}
                className="p-4 rounded-2xl bg-[#0F182E]/90 border border-blue-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{lc.id}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase text-[10px]">
                      {lc.status}
                    </span>
                    <span className="text-slate-500 text-[10px]">{lc.swift_reference}</span>
                  </div>
                  <div className="text-slate-300 font-sans">
                    <strong>Applicant (Importer):</strong> {lc.applicant_importer} → <strong>Beneficiary:</strong> {lc.beneficiary_exporter}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Cargo: {lc.goods_description} • Corridor: {lc.port_of_loading} → {lc.port_of_discharge} ({lc.incoterms})
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-lg font-black text-white font-mono">{formatUsd(lc.amount_usd)}</div>
                  <div className="text-[10px] text-slate-500">Expiry Date: {lc.expiry_date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Bank Guarantees */}
        {activeTab === 'guarantees' && (
          <div className="space-y-3">
            {guarantees.map(bg => (
              <div
                key={bg.id}
                className="p-4 rounded-2xl bg-[#0F182E]/90 border border-blue-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{bg.id}</span>
                    <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold uppercase text-[10px]">
                      {bg.type.replace(/_/g, ' ')}
                    </span>
                    <span className="text-emerald-400 text-[10px]">URDG 758 VERIFIED</span>
                  </div>
                  <div className="text-slate-300 font-sans">
                    <strong>Applicant:</strong> {bg.applicant} • <strong>Beneficiary:</strong> {bg.beneficiary}
                  </div>
                  <div className="text-slate-400 text-[10px]">SWIFT Reference: {bg.swift_mt760_ref}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-lg font-black text-teal-400 font-mono">{formatUsd(bg.amount_usd)}</div>
                  <div className="text-[10px] text-slate-500">Valid Until: {bg.expiry_date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Invoice Advance */}
        {activeTab === 'invoices' && (
          <div className="space-y-3">
            {invoices.map(inv => (
              <div
                key={inv.id}
                className="p-4 rounded-2xl bg-[#0F182E]/90 border border-blue-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{inv.invoice_number}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase text-[10px]">
                      {inv.status} (Disbursed in {inv.disbursement_time_hours}h)
                    </span>
                  </div>
                  <div className="text-slate-300 font-sans">
                    <strong>Debtor Buyer:</strong> {inv.buyer_name} • <strong>Supplier:</strong> {inv.supplier_name}
                  </div>
                  <div className="text-slate-400 text-[10px]">Tenor: {inv.tenor_days} Days • Transaction Fee: {inv.fee_pct}%</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-lg font-black text-emerald-400 font-mono">
                    Advance: {formatUsd(inv.advance_amount_usd)}
                  </div>
                  <div className="text-[10px] text-slate-400">Face Value: {formatUsd(inv.invoice_face_value_usd)} (80%)</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: AI Document Discrepancy Checker */}
        {activeTab === 'checker' && (
          <div className="bg-[#0F182E]/90 rounded-2xl border border-blue-900/40 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                AI Trade Document Consistency Engine (Invoice vs LC)
              </span>
              <span className="text-slate-400 text-[10px] font-mono">Article 14 UCP 600 Standard</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#080D1A] border border-slate-800 space-y-3">
                <span className="font-bold text-white block uppercase">Commercial Invoice Parameters:</span>
                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">Invoice Face Value ($)</label>
                  <input
                    type="number"
                    value={checkInvoiceAmount}
                    onChange={(e) => setCheckInvoiceAmount(Number(e.target.value))}
                    className="w-full bg-[#0F182E] border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">Invoice Incoterm</label>
                  <select
                    value={checkInvoiceIncoterm}
                    onChange={(e) => setCheckInvoiceIncoterm(e.target.value)}
                    className="w-full bg-[#0F182E] border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="FOB">FOB (Free on Board)</option>
                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#080D1A] border border-slate-800 space-y-3">
                <span className="font-bold text-white block uppercase">Letter of Credit (MT700) Limits:</span>
                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">LC Maximum Amount ($)</label>
                  <input
                    type="number"
                    value={checkLcAmount}
                    onChange={(e) => setCheckLcAmount(Number(e.target.value))}
                    className="w-full bg-[#0F182E] border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">LC Mandated Incoterm</label>
                  <select
                    value={checkLcIncoterm}
                    onChange={(e) => setCheckLcIncoterm(e.target.value)}
                    className="w-full bg-[#0F182E] border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                    <option value="FOB">FOB (Free on Board)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleRunDocChecker}
              disabled={isChecking}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md"
            >
              {isChecking ? 'Verifying Consistency...' : 'Run Automated UCP 600 Document Audit'}
            </button>

            {checkResult && (
              <div className={`p-4 rounded-xl border text-xs font-mono space-y-2 ${
                checkResult.is_clean ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-red-950/40 border-red-500/40 text-red-200'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span>AUDIT RESULT: {checkResult.is_clean ? 'CLEAN PRESENTATION (PASSED)' : 'DISCREPANCY FLAGGED'}</span>
                  <span>Compliance Score: {checkResult.compliance_score_pct}%</span>
                </div>
                <p className="font-sans text-[11px]">{checkResult.ai_recommendation}</p>
                {checkResult.discrepancies_found.length > 0 && (
                  <ul className="space-y-1 text-red-300 text-[11px]">
                    {checkResult.discrepancies_found.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Apply for LC Modal */}
      {showLcModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleApplyLc} className="max-w-md w-full bg-[#0F182E] border border-blue-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">5-Minute Digital LC Application</h3>
              <button type="button" onClick={() => setShowLcModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Applicant Importer (Company Name)</label>
              <input
                type="text"
                required
                value={importerName}
                onChange={(e) => setImporterName(e.target.value)}
                className="w-full bg-[#080D1A] border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Beneficiary Exporter</label>
              <input
                type="text"
                required
                value={exporterName}
                onChange={(e) => setExporterName(e.target.value)}
                className="w-full bg-[#080D1A] border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Letter of Credit Amount ($ USD)</label>
              <input
                type="number"
                required
                value={lcAmount}
                onChange={(e) => setLcAmount(Number(e.target.value))}
                className="w-full bg-[#080D1A] border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Port of Loading</label>
                <input
                  type="text"
                  value={portLoading}
                  onChange={(e) => setPortLoading(e.target.value)}
                  className="w-full bg-[#080D1A] border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Port of Discharge</label>
                <input
                  type="text"
                  value={portDischarge}
                  onChange={(e) => setPortDischarge(e.target.value)}
                  className="w-full bg-[#080D1A] border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider"
            >
              Issue Digital Letter of Credit (MT700)
            </button>
          </form>
        </div>
      )}

      {/* Invoice Advance Modal */}
      {showAdvanceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleRequestAdvance} className="max-w-md w-full bg-[#0F182E] border border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Instant Invoice Advance (80%)</h3>
              <button type="button" onClick={() => setShowAdvanceModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Buyer / Offtaker Name</label>
              <input
                type="text"
                required
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-[#080D1A] border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Commercial Invoice Face Value ($ USD)</label>
              <input
                type="number"
                required
                value={invoiceFaceValue}
                onChange={(e) => setInvoiceFaceValue(Number(e.target.value))}
                className="w-full bg-[#080D1A] border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div className="p-3 rounded-xl bg-[#080D1A] border border-slate-800 flex items-center justify-between font-mono">
              <span className="text-slate-400">Instant 80% Advance:</span>
              <span className="font-bold text-emerald-400 text-base">{formatUsd(invoiceFaceValue * 0.8)}</span>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider"
            >
              Confirm 24-Hour Factoring Advance
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
