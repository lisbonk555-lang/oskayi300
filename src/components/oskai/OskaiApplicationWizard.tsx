import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Landmark, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Smartphone, 
  Lock, 
  Upload, 
  Coins 
} from 'lucide-react';
import { LoanProduct, LoanApplication } from '../../server/oskaiLoanService';

interface OskaiApplicationWizardProps {
  product: LoanProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onApplicationCreated: (app: LoanApplication) => void;
}

export function OskaiApplicationWizard({
  product,
  isOpen,
  onClose,
  onApplicationCreated
}: OskaiApplicationWizardProps) {
  if (!isOpen || !product) return null;

  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Fields
  const [borrowerName, setBorrowerName] = useState<string>('Kwame Mensah');
  const [borrowerEmail, setBorrowerEmail] = useState<string>('kwame.mensah@gmail.com');
  const [borrowerPhone, setBorrowerPhone] = useState<string>('+233 24 490 5505');
  const [country, setCountry] = useState<string>('Ghana');
  const [region, setRegion] = useState<string>('Greater Accra');
  const [requestedAmount, setRequestedAmount] = useState<number>(product.minAmount || 2000);
  const [tenureMonths, setTenureMonths] = useState<number>(product.minTenureMonths || 6);
  const [purpose, setPurpose] = useState<string>('Working capital for shop inventory and seasonal stock replenishment.');

  // Employment
  const [employmentType, setEmploymentType] = useState<
    'Salaried Formal' | 'Self-Employed / SME' | 'Informal Sector' | 'Professional / Consultant'
  >('Salaried Formal');
  const [employerOrBusinessName, setEmployerOrBusinessName] = useState<string>('Apex Logistics Ltd');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(3500);

  // Disbursal
  const [disbursalDestination, setDisbursalDestination] = useState<'Mobile Money' | 'Bank Account'>('Mobile Money');
  const [momoNetworkOrBankName, setMomoNetworkOrBankName] = useState<string>('MTN Mobile Money');
  const [accountOrMomoNumber, setAccountOrMomoNumber] = useState<string>('0244905505');

  // Documents Checklist
  const [submittedDocuments, setSubmittedDocuments] = useState<string[]>([
    'Ghana Card (National ID Verified)',
    'Proof of Address (Digital Address GA-183-8165)',
    '3 Months Inflow Statement'
  ]);

  // Statutory Consent
  const [consentAccepted, setConsentAccepted] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAccepted) {
      setErrorMsg('Mandatory legal consent is required to process this application.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/oskai/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          borrowerName,
          borrowerEmail,
          borrowerPhone,
          country,
          region,
          requestedAmount: Number(requestedAmount),
          currency: product.currency,
          tenureMonths: Number(tenureMonths),
          purpose,
          employmentType,
          employerOrBusinessName,
          monthlyIncome: Number(monthlyIncome),
          disbursalDestination,
          momoNetworkOrBankName,
          accountOrMomoNumber,
          submittedDocuments,
          consentAccepted
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.application) {
        onApplicationCreated(data.application);
        onClose();
      } else {
        setErrorMsg(data.error || 'Failed to submit application to platform.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error submitting application.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-teal-700 font-bold">
              Step {step} of 3 · Standardized Application Engine
            </div>
            <h3 className="text-base font-bold text-slate-950 mt-0.5">
              Apply for {product.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          
          {/* Lender Disclosure Badge */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-slate-400 uppercase text-[10px] block">Target Financial Institution:</span>
              <strong className="text-slate-900 text-sm">{product.lenderName}</strong>
            </div>
            <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 font-bold">
              {product.currency} {product.minAmount.toLocaleString()} - {product.maxAmount.toLocaleString()}
            </span>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Step 1: Personal & Facility Parameters */}
            {step === 1 && (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-600 uppercase mb-1">Full Legal Name (as per Ghana Card)</label>
                  <input
                    type="text"
                    value={borrowerName}
                    onChange={(e) => setBorrowerName(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-sans text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 uppercase mb-1">Email Address (for status updates)</label>
                    <input
                      type="email"
                      value={borrowerEmail}
                      onChange={(e) => setBorrowerEmail(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-sans text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 uppercase mb-1">Mobile Phone (Ghana)</label>
                    <input
                      type="tel"
                      value={borrowerPhone}
                      onChange={(e) => setBorrowerPhone(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-sans text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 uppercase mb-1">Requested Facility ({product.currency})</label>
                    <input
                      type="number"
                      min={product.minAmount}
                      max={product.maxAmount}
                      value={requestedAmount}
                      onChange={(e) => setRequestedAmount(Number(e.target.value))}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold text-base focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 uppercase mb-1">Preferred Tenure (Months)</label>
                    <input
                      type="number"
                      min={product.minTenureMonths}
                      max={product.maxTenureMonths}
                      value={tenureMonths}
                      onChange={(e) => setTenureMonths(Number(e.target.value))}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold text-base focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 uppercase mb-1">Borrowing Purpose</label>
                  <textarea
                    rows={2}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                    placeholder="Briefly state intended use of funds..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-sans text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Employment, Cash Flow & Disbursal Channel */}
            {step === 2 && (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-600 uppercase mb-1">Employment / Business Classification</label>
                  <select
                    value={employmentType}
                    onChange={(e: any) => setEmploymentType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                  >
                    <option value="Salaried Formal">Salaried Formal (Public or Private Corporate)</option>
                    <option value="Self-Employed / SME">Self-Employed / Registered Small Business Owner</option>
                    <option value="Informal Sector">Informal Sector Trader / Artisan</option>
                    <option value="Professional / Consultant">Independent Professional / Consultant</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 uppercase mb-1">Employer or Business Name</label>
                    <input
                      type="text"
                      value={employerOrBusinessName}
                      onChange={(e) => setEmployerOrBusinessName(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-sans text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 uppercase mb-1">Average Monthly Net Income ({product.currency})</label>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold text-base"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-slate-600 uppercase mb-2">Preferred Disbursal Destination</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={disbursalDestination === 'Mobile Money'}
                        onChange={() => {
                          setDisbursalDestination('Mobile Money');
                          setMomoNetworkOrBankName('MTN Mobile Money');
                        }}
                        className="accent-teal-600"
                      />
                      <span>Mobile Money (MTN / Telecel / AT)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={disbursalDestination === 'Bank Account'}
                        onChange={() => {
                          setDisbursalDestination('Bank Account');
                          setMomoNetworkOrBankName('GCB Bank');
                        }}
                        className="accent-teal-600"
                      />
                      <span>Commercial Bank Direct</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 uppercase mb-1">Provider or Bank Name</label>
                    <input
                      type="text"
                      value={momoNetworkOrBankName}
                      onChange={(e) => setMomoNetworkOrBankName(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 uppercase mb-1">Account or MoMo Number</label>
                    <input
                      type="text"
                      value={accountOrMomoNumber}
                      onChange={(e) => setAccountOrMomoNumber(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Document Checklist & Statutory Consent */}
            {step === 3 && (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-slate-600 uppercase block mb-2 font-bold">
                    Required Supporting Documents Dossier:
                  </span>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    {submittedDocuments.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Documents are encrypted and delivered exclusively to {product.lenderName} compliance officers.
                  </div>
                </div>

                {/* Statutory Consent Checkbox under Act 843 */}
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-950">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="mt-0.5 accent-teal-600"
                    />
                    <span className="text-xs leading-relaxed">
                      <strong>Statutory Borrower Consent:</strong> I hereby explicitly authorize Oskai Instant Loan to transmit this application package to <strong>{product.lenderName}</strong> for legitimate credit assessment in compliance with the Data Protection Act, 2012 (Act 843). I understand that Oskai Instant Loan is an application intermediary and that loan approval is solely at the lender's discretion.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step Controls */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-mono text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Step</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting || !consentAccepted}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase font-mono tracking-wider shadow-lg shadow-teal-500/20 flex items-center gap-1.5 transition-all"
                >
                  {submitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Application to {product.lenderName}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
