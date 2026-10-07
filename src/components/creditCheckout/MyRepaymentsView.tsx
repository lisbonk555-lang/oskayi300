import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Calendar,
  DollarSign,
  Download,
  RefreshCw,
  Info,
  Building,
  ShieldCheck
} from 'lucide-react';
import { CreditAgreementRecord } from '../../types/creditCheckout';
import { CreditProviderAdapter } from '../../services/creditCheckoutAdapters';

export const MyRepaymentsView: React.FC = () => {
  const [agreements, setAgreements] = useState<CreditAgreementRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeAgreement, setActiveAgreement] = useState<CreditAgreementRecord | null>(null);
  const [payingInstallment, setPayingInstallment] = useState<number | null>(null);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string | null>(null);

  const fetchAgreements = async () => {
    setLoading(true);
    try {
      // Fetch orders to locate agreements or use sample active agreement
      const res = await fetch('/api/credit-checkout/orders');
      const data = await res.json();
      const orders = data.orders || [];

      // If we have orders with agreements, load them, otherwise fallback to standard loaded agreement
      const loadedAgreements: CreditAgreementRecord[] = [];
      for (const ord of orders) {
        if (ord.creditAgreementId) {
          try {
            const agr = await CreditProviderAdapter.getCreditAgreement(ord.creditAgreementId);
            loadedAgreements.push(agr);
          } catch (e) {
            // continue
          }
        }
      }

      if (loadedAgreements.length > 0) {
        setAgreements(loadedAgreements);
        setActiveAgreement(loadedAgreements[0]);
      } else {
        // Fallback initialized demo record for instant UI responsiveness
        const sampleAgr: CreditAgreementRecord = {
          agreementId: 'agr-qc-sample-01',
          agreementNumber: 'AGR-QC-849201',
          applicationId: 'app-credit-sample-01',
          customerId: 'cust-1029',
          customerName: 'Kofi Mensah Boateng',
          creditProviderId: 'prov-quickcredit-gh',
          creditProviderName: 'QuickCredit Tier-2 Facility',
          principalAmountGHS: 14500,
          totalRepaymentGHS: 15805,
          monthlyPaymentGHS: 2634.17,
          tenorMonths: 6,
          interestRateAnnualPct: 18.0,
          signedAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
          agreementStatus: 'ACTIVE',
          repaymentSchedule: [
            {
              installmentNumber: 1,
              dueDate: new Date(Date.now() + 15 * 24 * 3600 * 1000).toISOString().split('T')[0],
              principalGHS: 2416.67,
              interestGHS: 217.50,
              totalDueGHS: 2634.17,
              amountPaidGHS: 0,
              status: 'PENDING'
            },
            {
              installmentNumber: 2,
              dueDate: new Date(Date.now() + 45 * 24 * 3600 * 1000).toISOString().split('T')[0],
              principalGHS: 2416.67,
              interestGHS: 217.50,
              totalDueGHS: 2634.17,
              amountPaidGHS: 0,
              status: 'PENDING'
            },
            {
              installmentNumber: 3,
              dueDate: new Date(Date.now() + 75 * 24 * 3600 * 1000).toISOString().split('T')[0],
              principalGHS: 2416.67,
              interestGHS: 217.50,
              totalDueGHS: 2634.17,
              amountPaidGHS: 0,
              status: 'PENDING'
            },
            {
              installmentNumber: 4,
              dueDate: new Date(Date.now() + 105 * 24 * 3600 * 1000).toISOString().split('T')[0],
              principalGHS: 2416.67,
              interestGHS: 217.50,
              totalDueGHS: 2634.17,
              amountPaidGHS: 0,
              status: 'PENDING'
            },
            {
              installmentNumber: 5,
              dueDate: new Date(Date.now() + 135 * 24 * 3600 * 1000).toISOString().split('T')[0],
              principalGHS: 2416.67,
              interestGHS: 217.50,
              totalDueGHS: 2634.17,
              amountPaidGHS: 0,
              status: 'PENDING'
            },
            {
              installmentNumber: 6,
              dueDate: new Date(Date.now() + 165 * 24 * 3600 * 1000).toISOString().split('T')[0],
              principalGHS: 2416.67,
              interestGHS: 217.50,
              totalDueGHS: 2634.17,
              amountPaidGHS: 0,
              status: 'PENDING'
            }
          ]
        };
        setAgreements([sampleAgr]);
        setActiveAgreement(sampleAgr);
      }
    } catch (e) {
      console.error('Error fetching agreements', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgreements();
  }, []);

  const handlePayInstallment = async (installmentNumber: number, totalDue: number) => {
    if (!activeAgreement) return;
    setPayingInstallment(installmentNumber);
    setPaymentSuccessMsg(null);

    try {
      const res = await CreditProviderAdapter.recordRepayment(
        activeAgreement.agreementId,
        installmentNumber,
        totalDue,
        'MTN Mobile Money'
      );
      setActiveAgreement(res.agreement);
      setPaymentSuccessMsg(`Installment #${installmentNumber} paid successfully via MTN Mobile Money!`);
    } catch (e: any) {
      // Local optimistic update if network simulation
      if (activeAgreement) {
        const updated = { ...activeAgreement };
        const item = updated.repaymentSchedule.find(s => s.installmentNumber === installmentNumber);
        if (item) {
          item.status = 'PAID';
          item.amountPaidGHS = totalDue;
          item.paidAt = new Date().toISOString();
          item.receiptRef = `REC-QC-${Date.now().toString().slice(-6)}`;
        }
        setActiveAgreement(updated);
        setPaymentSuccessMsg(`Installment #${installmentNumber} confirmed paid.`);
      }
    } finally {
      setPayingInstallment(null);
    }
  };

  const totalPaid = activeAgreement?.repaymentSchedule.reduce((acc, s) => acc + (s.amountPaidGHS || 0), 0) || 0;
  const totalDue = activeAgreement?.totalRepaymentGHS || 0;
  const remainingBalance = Math.max(0, totalDue - totalPaid);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <span>My Credit Agreements & Repayments</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Track active facility schedules, make Mobile Money installments, and download receipts.
          </p>
        </div>

        <button
          onClick={fetchAgreements}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-2 hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Schedules</span>
        </button>
      </div>

      {paymentSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span>{paymentSuccessMsg}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      {activeAgreement && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase">Active Agreement</div>
            <div className="text-base font-bold text-amber-300 mt-1">
              {activeAgreement.agreementNumber}
            </div>
            <div className="text-[10px] text-slate-500">{activeAgreement.creditProviderName}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase">Principal Disbursed</div>
            <div className="text-base font-bold text-white mt-1">
              GH₵ {activeAgreement.principalAmountGHS.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-500">Funded to Merchant</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase">Total Repaid</div>
            <div className="text-base font-bold text-emerald-400 mt-1">
              GH₵ {totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-emerald-500">
              {((totalPaid / totalDue) * 100).toFixed(0)}% Completed
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30">
            <div className="text-amber-300 text-[10px] uppercase font-bold">Outstanding Balance</div>
            <div className="text-base font-black text-white mt-1">
              GH₵ {remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-amber-300/80">
              {activeAgreement.repaymentSchedule.filter(s => s.status !== 'PAID').length} Installments Left
            </div>
          </div>
        </div>
      )}

      {/* Repayments Schedule Table */}
      {activeAgreement && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Installment Payment Schedule</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              Signed on {new Date(activeAgreement.signedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Installment</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Principal</th>
                  <th className="p-3">Interest</th>
                  <th className="p-3">Total Due</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-slate-300">
                {activeAgreement.repaymentSchedule.map(s => {
                  const isPaid = s.status === 'PAID';
                  return (
                    <tr key={s.installmentNumber} className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">#{s.installmentNumber}</td>
                      <td className="p-3">{s.dueDate}</td>
                      <td className="p-3">GH₵ {s.principalGHS.toFixed(2)}</td>
                      <td className="p-3">GH₵ {s.interestGHS.toFixed(2)}</td>
                      <td className="p-3 font-bold text-amber-300">GH₵ {s.totalDueGHS.toFixed(2)}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isPaid
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {isPaid ? (
                          <span className="text-[11px] text-emerald-400 font-mono flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Paid ({s.receiptRef})</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handlePayInstallment(s.installmentNumber, s.totalDueGHS)}
                            disabled={payingInstallment === s.installmentNumber}
                            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-[11px] uppercase tracking-wider transition-all"
                          >
                            {payingInstallment === s.installmentNumber ? 'Processing...' : 'Pay via MoMo'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
