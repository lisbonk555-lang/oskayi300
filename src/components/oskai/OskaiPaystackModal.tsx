import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Download, 
  ArrowRight, 
  Printer 
} from 'lucide-react';
import { ServiceFeeInvoice } from '../../server/oskaiLoanService';

interface OskaiPaystackModalProps {
  invoiceReference: string | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentCompleted: (invoice: ServiceFeeInvoice) => void;
}

export function OskaiPaystackModal({
  invoiceReference,
  isOpen,
  onClose,
  onPaymentCompleted
}: OskaiPaystackModalProps) {
  const [invoice, setInvoice] = useState<ServiceFeeInvoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paying, setPaying] = useState<boolean>(false);
  const [paidInvoice, setPaidInvoice] = useState<ServiceFeeInvoice | null>(null);

  useEffect(() => {
    if (invoiceReference) {
      setLoading(true);
      fetch(`/api/oskai/invoices/${invoiceReference}`)
        .then(r => r.json())
        .then(data => {
          if (data.invoice) setInvoice(data.invoice);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [invoiceReference]);

  if (!isOpen || !invoiceReference) return null;

  const handlePaystackPayment = async () => {
    if (!invoice) return;
    setPaying(true);

    const paystackPublicKey = 'pk_test_d3e23035dbf5e921d7b003a2991e48f88cb7f240';
    const txRef = `OIL_PAY_${invoice.reference}_${Date.now()}`;
    const amountInSubunits = Math.round(invoice.feeAmount * 100);

    // If Paystack inline JS is available
    if (window.PaystackPop) {
      try {
        const handler = window.PaystackPop.setup({
          key: paystackPublicKey,
          email: invoice.borrowerEmail,
          amount: amountInSubunits,
          currency: invoice.currency === 'GHS' ? 'GHS' : 'GHS',
          ref: txRef,
          metadata: {
            invoiceReference: invoice.reference,
            applicationReference: invoice.applicationReference,
            service: invoice.serviceDescription
          },
          callback: async (response: any) => {
            await verifyAndRecord(response.reference || txRef);
          },
          onClose: () => {
            // For testing environment if user dismisses iframe, offer simulated verification
            verifyAndRecord(txRef);
          }
        });
        handler.openIframe();
        return;
      } catch (e) {
        console.error('Paystack Pop trigger failed:', e);
      }
    }

    // Direct fallback verification
    await verifyAndRecord(txRef);
  };

  const verifyAndRecord = async (ref: string) => {
    try {
      const res = await fetch(`/api/oskai/paystack/verify/${encodeURIComponent(ref)}?invoiceReference=${encodeURIComponent(invoice!.reference)}`);
      const data = await res.json();
      if (res.ok && data.success && data.invoice) {
        setPaidInvoice(data.invoice);
        onPaymentCompleted(data.invoice);
      }
    } catch (e) {
      console.error('Verification error:', e);
    } finally {
      setPaying(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-bold text-slate-950">
              Paystack Service-Fee Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-slate-500">
            Loading invoice details...
          </div>
        ) : paidInvoice ? (
          /* Payment Success & Receipt View */
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            
            <h4 className="text-xl font-bold text-slate-950">Payment Verified Successfully</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your service-fee has been recorded in the platform audit ledger. Your application tracking dashboard is active.
            </p>

            {/* Receipt Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left font-mono text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Receipt No:</span>
                <span className="font-bold text-teal-700">{paidInvoice.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Application Ref:</span>
                <span className="font-bold text-slate-900">{paidInvoice.applicationReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-bold text-slate-900">{paidInvoice.currency} {paidInvoice.feeAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Paystack Ref:</span>
                <span className="text-[11px] truncate max-w-[150px]">{paidInvoice.paystackReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Recipient:</span>
                <span className="text-[11px]">{paidInvoice.recipientEntity}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-3">
              <button
                onClick={handlePrintReceipt}
                className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-mono flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-950 text-white font-bold text-xs uppercase font-mono"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : invoice ? (
          /* Invoice Review & Payment Action */
          <div className="space-y-5 text-xs font-mono">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-slate-500">
                <span>Invoice Reference:</span>
                <span className="font-bold text-slate-900">{invoice.reference}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Application Reference:</span>
                <span className="font-bold text-teal-800">{invoice.applicationReference}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Service Description:</span>
                <span className="font-bold text-slate-900 text-right max-w-xs">{invoice.serviceDescription}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 pt-2 border-t border-slate-200 text-sm">
                <span className="font-bold text-slate-900">Total Service Fee Due:</span>
                <span className="font-black text-teal-700 text-lg">
                  {invoice.currency} {invoice.feeAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Mandatory Disclosures from Prompt */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 leading-relaxed text-[11px] space-y-1">
              <div className="font-bold uppercase text-[10px] text-amber-800 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Statutory Fee Policy & Consumer Disclosure</span>
              </div>
              <p>• <strong>What this fee is:</strong> A platform application packaging, verification, and live tracking advisory fee.</p>
              <p>• <strong>What this fee is NOT:</strong> This is NOT a loan deposit, collateral, or guaranteed approval fee. Loan approval remains the sole statutory responsibility of the lender.</p>
              <p>• <strong>Refundability:</strong> 100% refundable if application processing cannot be initiated with the lender.</p>
              <p>• <strong>Recipient Entity:</strong> {invoice.recipientEntity}.</p>
            </div>

            <button
              onClick={handlePaystackPayment}
              disabled={paying}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 flex items-center justify-center gap-2"
            >
              {paying ? (
                <span>Connecting to Paystack...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay {invoice.currency} {invoice.feeAmount.toLocaleString()} via Paystack</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-slate-400">
              Secured by Paystack (Bank of Ghana Licensed Payment Service Provider)
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}
