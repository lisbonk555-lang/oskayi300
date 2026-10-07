import React, { useState, useEffect } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  CreditCard,
  Layers,
  ArrowUpRight,
  RefreshCw,
  Search,
  Filter,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { CreditOrderRecord } from '../../types/creditCheckout';
import { CreditOrderEngine } from '../../services/creditCheckoutAdapters';

export const MerchantPortalView: React.FC = () => {
  const [orders, setOrders] = useState<CreditOrderRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<CreditOrderRecord | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await CreditOrderEngine.getOrders();
      if (data.length > 0) {
        setOrders(data);
        setSelectedOrder(data[0]);
      } else {
        // Sample merchant seed orders
        const sampleOrders: CreditOrderRecord[] = [
          {
            orderId: 'ord-cc-849201',
            orderNumber: 'ORD-CC-849201',
            customerId: 'cust-1029',
            customerName: 'Kofi Mensah Boateng',
            customerEmail: 'kofi.boateng@enterprise.gh',
            customerPhone: '+233 24 490 5505',
            merchantId: 'm-volta-solar-gh',
            merchantName: 'Volta Energy & Solar Systems Ghana',
            productId: 'prod-solar-5kw',
            productTitle: 'Volta Pro 5kW Commercial Solar Hybrid Inverter + LiFePO4 Battery',
            productPriceGHS: 14500,
            paymentMode: 'BUY_WITH_CREDIT',
            lifecycleState: 'REPAYMENT_ACTIVE',
            moneyBreakdown: {
              currency: 'GHS',
              productAmount: 14500,
              creditAmount: 14500,
              insurancePremium: 326.25,
              gasSponsorshipAmount: 0.15,
              merchantSettlementAmount: 14500,
              oskayiTechFee: 217.50,
              totalCustomerObligation: 15805.00,
              monthlyRepayment: 2634.17,
              repaymentTermMonths: 6,
              interestRateAnnualPct: 18.0
            },
            creditProviderId: 'prov-quickcredit-gh',
            creditAgreementId: 'agr-qc-849201',
            gasSponsorshipId: 'gas-spons-849201',
            insurancePolicyId: 'pol-cl-849201',
            blockchainTxHash: '0x8f27e4810948bfae3981029384719028471928374918237491827341b8f27e48',
            merchantSettlementStatus: 'SETTLED',
            merchantSettlementRef: 'SETTLE-MTN-MOMO-918273',
            settledAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            timeline: [
              { state: 'APPLICATION_STARTED', timestamp: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(), description: 'Customer initiated credit checkout.' },
              { state: 'CREDIT_APPROVED', timestamp: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(), description: 'QuickCredit Tier-2 evaluated and approved facility.' },
              { state: 'MERCHANT_SETTLED', timestamp: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(), description: 'Merchant received 100% full payout GH₵14,500.00 via MTN MoMo.' },
              { state: 'REPAYMENT_ACTIVE', timestamp: new Date().toISOString(), description: 'Customer in active installment schedule.' }
            ]
          },
          {
            orderId: 'ord-cc-739102',
            orderNumber: 'ORD-CC-739102',
            customerId: 'cust-2091',
            customerName: 'Abena Serwaa Osei',
            customerEmail: 'abena.osei@retailventures.gh',
            customerPhone: '+233 20 819 2201',
            merchantId: 'm-volta-solar-gh',
            merchantName: 'Volta Energy & Solar Systems Ghana',
            productId: 'prod-pos-terminals',
            productTitle: 'Smart Dual-Screen Merchant POS & Thermal Inventory Terminals',
            productPriceGHS: 4800,
            paymentMode: 'BUY_WITH_CREDIT',
            lifecycleState: 'MERCHANT_SETTLED',
            moneyBreakdown: {
              currency: 'GHS',
              productAmount: 4800,
              creditAmount: 4800,
              insurancePremium: 108.00,
              gasSponsorshipAmount: 0.15,
              merchantSettlementAmount: 4800,
              oskayiTechFee: 72.00,
              totalCustomerObligation: 5124.00,
              monthlyRepayment: 1708.00,
              repaymentTermMonths: 3,
              interestRateAnnualPct: 18.0
            },
            creditProviderId: 'prov-stanbic-capital-gh',
            creditAgreementId: 'agr-st-739102',
            gasSponsorshipId: 'gas-spons-739102',
            insurancePolicyId: 'pol-cl-739102',
            blockchainTxHash: '0x192837491827341b8f27e4810948bfae39810293847190284719283749182734',
            merchantSettlementStatus: 'SETTLED',
            merchantSettlementRef: 'SETTLE-BOG-ACH-481920',
            settledAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            timeline: [
              { state: 'APPLICATION_STARTED', timestamp: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), description: 'Stanbic consumer credit evaluated.' },
              { state: 'MERCHANT_SETTLED', timestamp: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), description: 'Full settlement disbursed to merchant bank account.' }
            ]
          }
        ];
        setOrders(sampleOrders);
        setSelectedOrder(sampleOrders[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalVolume = orders.reduce((sum, o) => sum + (o.productPriceGHS || 0), 0);
  const totalSettled = orders.filter(o => o.merchantSettlementStatus === 'SETTLED').reduce((sum, o) => sum + (o.moneyBreakdown?.merchantSettlementAmount || o.productPriceGHS), 0);

  const filteredOrders = filterType === 'ALL'
    ? orders
    : filterType === 'CREDIT'
    ? orders.filter(o => o.paymentMode === 'BUY_WITH_CREDIT')
    : orders.filter(o => o.paymentMode === 'PAY_NOW');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-amber-400" />
            <span>Merchant Orders &amp; Settlement Ledger</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Merchants receive 100% upfront settlement while buyers enjoy sponsored credit.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-2 hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync Orders</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">Total Orders</div>
          <div className="text-xl font-bold text-white mt-1">{orders.length} Orders</div>
          <div className="text-[10px] text-emerald-400">100% Guaranteed Payout</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">Gross Merchandising Value</div>
          <div className="text-xl font-bold text-amber-300 mt-1">
            GH₵ {totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500">Total Asset Flow</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800">
          <div className="text-emerald-300 text-[10px] uppercase font-bold">Disbursed to Merchant</div>
          <div className="text-xl font-black text-white mt-1">
            GH₵ {totalSettled.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-emerald-400">Paid via MoMo / BoG ACH</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase">Merchant Default Risk</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">0% (Zero Risk)</div>
          <div className="text-[10px] text-slate-500">Borne by Credit Provider</div>
        </div>
      </div>

      {/* Orders List & Selected Detail */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Orders Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Recent Customer Transactions
            </h3>
            <div className="flex gap-1 text-xs font-mono">
              {['ALL', 'CREDIT', 'PAY_NOW'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`px-2.5 py-1 rounded-lg ${
                    filterType === f
                      ? 'bg-amber-400 text-indigo-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredOrders.map(o => {
              const isSelected = selectedOrder?.orderId === o.orderId;
              return (
                <div
                  key={o.orderId}
                  onClick={() => setSelectedOrder(o)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/30'
                      : 'bg-slate-950 border-slate-800 hover:border-indigo-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-xs">{o.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-950 text-amber-300 border border-indigo-800">
                        {o.paymentMode}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-black text-amber-300">
                      GH₵ {o.productPriceGHS.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-200 line-clamp-1">{o.productTitle}</p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-slate-900">
                    <span>Buyer: {o.customerName}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{o.merchantSettlementStatus}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Order Detailed Ledger Breakdown */}
        <div className="lg:col-span-5">
          {selectedOrder ? (
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 sticky top-24 font-mono text-xs">
              <div className="border-b border-slate-800 pb-3">
                <div className="text-[10px] text-slate-400 uppercase">Selected Order Breakdown</div>
                <h4 className="text-sm font-bold text-white mt-0.5">{selectedOrder.orderNumber}</h4>
                <p className="text-[11px] text-slate-400">{selectedOrder.productTitle}</p>
              </div>

              {/* Line item ledger separation */}
              <div className="space-y-3">
                <div className="text-[10px] uppercase font-bold text-amber-300">Transparent Money Flow</div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span>Product Retail Price:</span>
                    <span className="font-bold text-white">GH₵ {selectedOrder.moneyBreakdown.productAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Credit Principal (Funded):</span>
                    <span className="font-bold text-white">GH₵ {selectedOrder.moneyBreakdown.creditAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Insurance Premium (Curacel):</span>
                    <span className="font-bold">GH₵ {selectedOrder.moneyBreakdown.insurancePremium.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-400">
                    <span>Gas Sponsorship (Paymaster):</span>
                    <span className="font-bold">GH₵ 0.00 (Customer Free)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Oskayi Tech Facilitation:</span>
                    <span>GH₵ {selectedOrder.moneyBreakdown.oskayiTechFee.toFixed(2)}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-bold text-emerald-300">
                    <span>Merchant Full Payout:</span>
                    <span>GH₵ {selectedOrder.moneyBreakdown.merchantSettlementAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Settlement reference */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                <div className="text-slate-400 text-[10px] uppercase">Settlement Reference</div>
                <div className="text-white font-bold">{selectedOrder.merchantSettlementRef || 'SETTLE-MTN-MOMO-LIVE'}</div>
                <div className="text-slate-400 text-[10px]">
                  Disbursed via automated Bank of Ghana instant payment switch.
                </div>
              </div>

              {selectedOrder.blockchainTxHash && (
                <div className="text-[10px] text-slate-500 truncate">
                  TxHash: <span className="text-indigo-400">{selectedOrder.blockchainTxHash}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center text-slate-400 font-mono text-xs">
              Select an order to view the full ledger separation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
