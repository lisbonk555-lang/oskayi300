import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  FileCheck,
  Building,
  UserCheck,
  DollarSign,
  Lock,
  ChevronRight,
  Info,
  ExternalLink,
  Wallet
} from 'lucide-react';
import {
  CreditProviderAdapter,
  GasSponsorAdapter,
  InsuranceProviderAdapter,
  CreditOrderEngine
} from '../../services/creditCheckoutAdapters';
import {
  CreditApplicationRecord,
  CreditAgreementRecord,
  GasSponsorshipRecord,
  InsurancePolicyRecord,
  CreditOrderRecord,
  MoneyBreakdown,
  SystemEnvironmentMode
} from '../../types/creditCheckout';
import {
  OFFICIAL_CREDIT_PROVIDERS,
  OFFICIAL_GAS_SPONSORS,
  OFFICIAL_INSURANCE_PROVIDERS,
  MANDATORY_LEGAL_DISCLOSURES
} from '../../data/creditCheckoutData';

interface CheckoutFlowProps {
  environmentMode: SystemEnvironmentMode;
  onViewRepayments: () => void;
  onViewClaims: () => void;
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({
  environmentMode,
  onViewRepayments,
  onViewClaims
}) => {
  // Step state: 1 to 5 (UI multi-stage wizard)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [paymentMode, setPaymentMode] = useState<'BUY_WITH_CREDIT' | 'PAY_NOW'>('BUY_WITH_CREDIT');

  // Customer selected merchandise
  const sampleProducts = [
    {
      id: 'prod-solar-5kw',
      title: 'Volta Pro 5kW Commercial Solar Hybrid Inverter + LiFePO4 Battery',
      merchantName: 'Volta Energy & Solar Systems Ghana',
      priceGHS: 14500,
      category: 'Renewable Energy',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'prod-pos-terminals',
      title: 'Smart Dual-Screen Merchant POS & Thermal Inventory Terminals (Pack of 3)',
      merchantName: 'Accra Retail Systems & Tech',
      priceGHS: 4800,
      category: 'Point of Sale',
      image: 'https://images.unsplash.com/photo-1556742049-0a67e55722c6?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'prod-agri-pump',
      title: 'Precision Drip Irrigation System & Solar Water Pump 3HP',
      merchantName: 'AfriAgri Equipment Consortia',
      priceGHS: 9200,
      category: 'Agribusiness',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState(sampleProducts[0]);
  const [customAmountGHS, setCustomAmountGHS] = useState<number>(14500);
  const [tenorMonths, setTenorMonths] = useState<number>(6);
  const [selectedProviderId, setSelectedProviderId] = useState<string>(OFFICIAL_CREDIT_PROVIDERS[0].providerId);
  const [selectedSponsorId, setSelectedSponsorId] = useState<string>(OFFICIAL_GAS_SPONSORS[0].sponsorId);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);

  // Customer Form Data
  const [customerName, setCustomerName] = useState<string>('Kofi Mensah Boateng');
  const [customerPhone, setCustomerPhone] = useState<string>('+233 24 490 5505');
  const [customerEmail, setCustomerEmail] = useState<string>('kofi.boateng@enterprise.gh');
  const [nationalIdNumber, setNationalIdNumber] = useState<string>('GHA-729183049-2');
  const [digitalAddress, setDigitalAddress] = useState<string>('GA-183-8165');
  const [employerName, setEmployerName] = useState<string>('Boateng Agribusiness Logistics');
  const [monthlyIncomeGHS, setMonthlyIncomeGHS] = useState<number>(8500);

  // Execution States
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Results from Backend
  const [application, setApplication] = useState<CreditApplicationRecord | null>(null);
  const [agreement, setAgreement] = useState<CreditAgreementRecord | null>(null);
  const [sponsorship, setSponsorship] = useState<GasSponsorshipRecord | null>(null);
  const [policy, setPolicy] = useState<InsurancePolicyRecord | null>(null);
  const [orchestratedOrder, setOrchestratedOrder] = useState<CreditOrderRecord | null>(null);
  const [zeroGasTxHash, setZeroGasTxHash] = useState<string | null>(null);

  // Calculated Money Breakdown
  const calculateBreakdown = (): MoneyBreakdown => {
    const principal = customAmountGHS;
    const ratePct = 18.0;
    const insuranceRatePct = includeInsurance ? 2.25 : 0;
    const insurancePremium = includeInsurance ? Math.round(principal * (insuranceRatePct / 100) * 100) / 100 : 0;
    const gasSponsorshipAmount = 0.15; // paid by Paymaster
    const oskayiTechFee = Math.round(principal * 0.015 * 100) / 100;
    const totalInterest = Math.round(principal * (ratePct / 100) * (tenorMonths / 12) * 100) / 100;
    const totalCustomerObligation = principal + totalInterest + insurancePremium;
    const monthlyRepayment = Math.round((totalCustomerObligation / tenorMonths) * 100) / 100;

    return {
      currency: 'GHS',
      productAmount: principal,
      creditAmount: principal,
      insurancePremium,
      gasSponsorshipAmount,
      merchantSettlementAmount: principal,
      oskayiTechFee,
      totalCustomerObligation,
      monthlyRepayment,
      repaymentTermMonths: tenorMonths,
      interestRateAnnualPct: ratePct
    };
  };

  const breakdown = calculateBreakdown();

  const handleProductSelect = (p: typeof sampleProducts[0]) => {
    setSelectedProduct(p);
    setCustomAmountGHS(p.priceGHS);
  };

  // Step 1 -> Step 2: Submit Application to Credit Provider
  const handleStartApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await CreditProviderAdapter.submitApplication({
        customerId: `cust-${Date.now().toString().slice(-4)}`,
        customerName,
        customerPhone,
        customerEmail,
        nationalIdNumber,
        merchantId: 'm-volta-solar-gh',
        productId: selectedProduct.id,
        requestedAmountGHS: customAmountGHS,
        tenorMonths,
        providerId: selectedProviderId,
        mode: environmentMode
      });

      setApplication(result.application);
      setCurrentStep(2); // Review Approved Offer
    } catch (err: any) {
      setErrorMessage(err.message || 'Credit Provider application failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 -> Step 3: Accept Offer & Sign Agreement
  const handleAcceptOffer = async () => {
    if (!application || !application.approvedOffer) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await CreditProviderAdapter.acceptOffer(application.id, application.approvedOffer.offerId);
      setAgreement(res.agreement);

      // Now request insurance quote / binding if enabled
      if (includeInsurance) {
        const polRes = await InsuranceProviderAdapter.purchasePolicy({
          productCode: 'CURACEL_CREDIT_LIFE_GHS',
          orderId: `ord-cc-${Date.now()}`,
          creditAgreementId: res.agreement.agreementId,
          buyerName: customerName,
          buyerEmail: customerEmail,
          buyerPhone: customerPhone,
          insuredAmountGHS: customAmountGHS,
          premiumAmountGHS: breakdown.insurancePremium
        });
        setPolicy(polRes.policy);
      }

      setCurrentStep(3); // Gas Sponsorship & Zero-Balance Paymaster Authorization
    } catch (err: any) {
      setErrorMessage(err.message || 'Agreement acceptance failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3 -> Step 4: Request ERC-4337 Paymaster Gas Sponsorship & Sign
  const handleRequestGasAndSign = async () => {
    if (!agreement) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Request gas sponsorship from independent Paymaster
      const sponsorRes = await GasSponsorAdapter.requestSponsorship({
        sponsorId: selectedSponsorId,
        orderId: `ord-cc-${Date.now()}`,
        walletAddress: '0x4337bC9189008819aDcE21D33E019aDb59DC96Ad2',
        chain: 'Polygon POS (ChainId: 137)',
        chainId: 137
      });
      setSponsorship(sponsorRes.sponsorship);

      // 2. Submit signed sponsored transaction (Customer has 0 native gas)
      const txRes = await GasSponsorAdapter.submitSponsoredTransaction({
        sponsorshipId: sponsorRes.sponsorship.sponsorshipId,
        userOpSignature: '0x3891048bcae9817290184bfaec981729384719028471928374918237491827341b'
      });
      setZeroGasTxHash(txRes.txHash);

      // 3. Finalize complete orchestrated order & merchant settlement
      const orderRes = await CreditOrderEngine.createOrder({
        customerName,
        customerEmail,
        customerPhone,
        merchantId: 'm-volta-solar-gh',
        merchantName: selectedProduct.merchantName,
        productId: selectedProduct.id,
        productTitle: selectedProduct.title,
        productPriceGHS: customAmountGHS,
        paymentMode: 'BUY_WITH_CREDIT',
        lifecycleState: 'REPAYMENT_ACTIVE',
        moneyBreakdown: breakdown,
        creditProviderId: selectedProviderId,
        creditAgreementId: agreement.agreementId,
        gasSponsorshipId: sponsorRes.sponsorship.sponsorshipId,
        insurancePolicyId: policy?.policyId,
        blockchainTxHash: txRes.txHash
      });

      setOrchestratedOrder(orderRes.order);
      setCurrentStep(4); // Success & Repayment Ledger
    } catch (err: any) {
      setErrorMessage(err.message || 'Sponsored transaction execution failed.');
    } finally {
      setLoading(false);
    }
  };

  const selectedProvider = OFFICIAL_CREDIT_PROVIDERS.find(p => p.providerId === selectedProviderId) || OFFICIAL_CREDIT_PROVIDERS[0];
  const selectedSponsor = OFFICIAL_GAS_SPONSORS.find(s => s.sponsorId === selectedSponsorId) || OFFICIAL_GAS_SPONSORS[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Zero-Balance Hero Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-amber-300 text-xs font-mono border border-indigo-800 font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Zero-Balance Customer Flow Supported</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Instant Checkout with Regulated Credit & Sponsored Gas
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Customers can checkout with <strong className="text-amber-300">GH₵0 in bank</strong>,{' '}
              <strong className="text-amber-300">GH₵0 in crypto wallet</strong>, and{' '}
              <strong className="text-amber-300">0 blockchain gas tokens</strong>. Third-party licensed credit providers fund the purchase, independent paymasters sponsor transaction gas, and Curacel covers credit life.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-900/60 font-mono text-xs space-y-1.5 min-w-[240px]">
            <div className="text-slate-400 font-semibold uppercase text-[10px]">Customer Balance Profile</div>
            <div className="flex justify-between text-slate-300">
              <span>Bank Balance:</span>
              <span className="text-emerald-400 font-bold">GH₵ 0.00 (Ready)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Crypto Wallet:</span>
              <span className="text-emerald-400 font-bold">0.00 USDT</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Blockchain Gas:</span>
              <span className="text-amber-400 font-bold">0.00 MATIC / POL</span>
            </div>
            <div className="pt-1.5 border-t border-slate-800 text-[11px] text-indigo-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sponsored via ERC-4337</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Progress Stepper */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
        <div className={`p-3 rounded-2xl border transition-all ${
          currentStep === 1
            ? 'bg-amber-400/10 border-amber-400 text-amber-300'
            : currentStep > 1
            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
            : 'bg-slate-900 border-slate-800 text-slate-500'
        }`}>
          <div className="font-bold">Step 1</div>
          <div className="text-[11px] truncate">1. Credit Application</div>
        </div>
        <div className={`p-3 rounded-2xl border transition-all ${
          currentStep === 2
            ? 'bg-amber-400/10 border-amber-400 text-amber-300'
            : currentStep > 2
            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
            : 'bg-slate-900 border-slate-800 text-slate-500'
        }`}>
          <div className="font-bold">Step 2</div>
          <div className="text-[11px] truncate">2. Offer & Insurance</div>
        </div>
        <div className={`p-3 rounded-2xl border transition-all ${
          currentStep === 3
            ? 'bg-amber-400/10 border-amber-400 text-amber-300'
            : currentStep > 3
            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
            : 'bg-slate-900 border-slate-800 text-slate-500'
        }`}>
          <div className="font-bold">Step 3</div>
          <div className="text-[11px] truncate">3. Sponsored Gas & Sign</div>
        </div>
        <div className={`p-3 rounded-2xl border transition-all ${
          currentStep === 4
            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
            : 'bg-slate-900 border-slate-800 text-slate-500'
        }`}>
          <div className="font-bold">Step 4</div>
          <div className="text-[11px] truncate">4. Settled & Schedule</div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: Product Selection, Terms, and KYC Form */}
      {currentStep === 1 && (
        <form onSubmit={handleStartApplication} className="space-y-8">
          {/* Select Product */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <span>1. Choose Product or Enter Invoice Amount</span>
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              {sampleProducts.map(p => {
                const isSelected = selectedProduct.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleProductSelect(p)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-slate-950 border-slate-800 hover:border-indigo-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="h-28 w-full rounded-xl overflow-hidden bg-slate-900 mb-2">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">
                        {p.category}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-2">{p.title}</h4>
                      <p className="text-[11px] text-slate-400">{p.merchantName}</p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">Price:</span>
                      <span className="text-sm font-black text-amber-300 font-mono">
                        GH₵ {p.priceGHS.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Amount input */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 font-mono">
                  Custom Order / Invoice Amount (GH₵)
                </label>
                <p className="text-[11px] text-slate-400">
                  Denominated in Ghanaian Cedi (GHS).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono font-bold">GH₵</span>
                <input
                  type="number"
                  min="50"
                  max="500000"
                  value={customAmountGHS}
                  onChange={e => setCustomAmountGHS(Number(e.target.value))}
                  className="w-36 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold text-right focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Mode Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase font-mono tracking-wider">
              2. Select Payment Option
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMode('BUY_WITH_CREDIT')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMode === 'BUY_WITH_CREDIT'
                    ? 'bg-amber-400/10 border-amber-400 ring-2 ring-amber-400/30'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <span>BUY WITH CREDIT</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono border border-emerald-800 font-bold">
                    ZERO GAS REQUIRED
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Third-party credit provider funds your order. Zero native gas tokens needed. Flexible 1 to 12 month repayment plan.
                </p>
              </div>

              <div
                onClick={() => setPaymentMode('PAY_NOW')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all opacity-75 hover:opacity-100 ${
                  paymentMode === 'PAY_NOW'
                    ? 'bg-indigo-950/60 border-indigo-400 ring-2 ring-indigo-400/30'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <DollarSign className="w-5 h-5 text-indigo-400" />
                    <span>PAY NOW (FULL SETTLEMENT)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 text-[10px] font-mono">
                    Direct MoMo / Card
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instant full settlement via Mobile Money (MTN/Telecel) or Universal Bank Card.
                </p>
              </div>
            </div>
          </div>

          {/* Credit & Gas Provider Configuration */}
          <div className="grid md:grid-cols-2 gap-6 p-6 rounded-3xl bg-slate-950 border border-slate-800">
            {/* Credit Provider Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center justify-between">
                <span>Select Licensed Credit Provider</span>
                <span className="text-[10px] text-emerald-400">BoG Regulated</span>
              </label>
              <select
                value={selectedProviderId}
                onChange={e => setSelectedProviderId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
              >
                {OFFICIAL_CREDIT_PROVIDERS.map(p => (
                  <option key={p.providerId} value={p.providerId}>
                    {p.brandName} ({p.regulatoryStatus.replace(/_/g, ' ')})
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <div className="text-slate-300 font-semibold">{selectedProvider.legalName}</div>
                <div>Regulator: <span className="text-amber-300">{selectedProvider.regulatorName}</span></div>
                <div>License: <span className="text-slate-300 font-mono">{selectedProvider.licenseNumber}</span></div>
                <div className="text-[10px] text-slate-500 italic pt-1">
                  Oskayi orchestrates API requests to this licensed provider. Oskayi is not the lender.
                </div>
              </div>
            </div>

            {/* Repayment Tenor Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
                Repayment Duration (Tenor)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 6, 12].map(m => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setTenorMonths(m)}
                    className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                      tenorMonths === m
                        ? 'bg-amber-400 text-indigo-950 border-amber-300 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {m} {m === 1 ? 'Month' : 'Months'}
                  </button>
                ))}
              </div>

              {/* Insurance Toggle */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Curacel Credit Life Protection</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Covers loan in event of death, permanent disability, or critical hospitalization.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={e => setIncludeInsurance(e.target.checked)}
                  className="w-5 h-5 rounded accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Transparent Money Breakdown Ledger */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-indigo-900/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                Transparent Line-Item Ledger Separation
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono">
                Ghanaian Cedi (GHS)
              </span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">1. Product Amount</div>
                <div className="text-base font-bold text-white mt-1">
                  GH₵ {breakdown.productAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-slate-500">To Merchant</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">2. Insurance Premium</div>
                <div className="text-base font-bold text-emerald-400 mt-1">
                  GH₵ {breakdown.insurancePremium.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-500">To Curacel Underwriting</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">3. Gas Sponsorship</div>
                <div className="text-base font-bold text-amber-400 mt-1">
                  GH₵ 0.00 (Customer)
                </div>
                <div className="text-[10px] text-slate-400">GH₵ 0.15 paid by Paymaster</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">4. Interest (18% p.a.)</div>
                <div className="text-base font-bold text-slate-200 mt-1">
                  GH₵ {(breakdown.totalCustomerObligation - breakdown.productAmount - breakdown.insurancePremium).toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-500">To Credit Provider</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">5. Monthly Installment</div>
                <div className="text-base font-black text-amber-300 mt-1">
                  GH₵ {breakdown.monthlyRepayment.toFixed(2)} / mo
                </div>
                <div className="text-[10px] text-slate-500">{tenorMonths} Monthly Payments</div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/40">
                <div className="text-amber-300 text-[10px] uppercase font-bold">Total Customer Obligation</div>
                <div className="text-base font-black text-white mt-1">
                  GH₵ {breakdown.totalCustomerObligation.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-amber-300/80">Full repayment over {tenorMonths} mo</div>
              </div>
            </div>
          </div>

          {/* Customer KYC Application Form */}
          <div className="space-y-4 p-6 rounded-3xl bg-slate-950 border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>3. Applicant Information (KYC & Credit Evaluation)</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Ghana Card PIN (NIA Number)</label>
                <input
                  type="text"
                  required
                  placeholder="GHA-XXXXXXXXX-X"
                  value={nationalIdNumber}
                  onChange={e => setNationalIdNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Mobile Money / Phone Number</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Residential Digital Address (GhanaPost GPS)</label>
                <input
                  type="text"
                  value={digitalAddress}
                  onChange={e => setDigitalAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Monthly Verifiable Income (GH₵)</label>
                <input
                  type="number"
                  value={monthlyIncomeGHS}
                  onChange={e => setMonthlyIncomeGHS(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Application Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 max-w-lg">
              By clicking <strong>Submit to Credit Provider</strong>, you authorize {selectedProvider.brandName} to query your credit history with licensed Ghanaian credit reference bureaus.
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Application...</span>
                </>
              ) : (
                <>
                  <span>Submit to Credit Provider</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Review Approved Offer & Credit Agreement */}
      {currentStep === 2 && application && application.approvedOffer && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-900/60 text-emerald-300">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono">
                  Official Credit Offer Approved
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  {application.creditProviderName} Approved Your Credit Facility
                </h3>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Approved Principal</div>
                <div className="text-lg font-bold text-white mt-1">
                  GH₵ {application.approvedOffer.approvedPrincipalGHS.toLocaleString()}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Monthly Installment</div>
                <div className="text-lg font-bold text-amber-300 mt-1">
                  GH₵ {application.approvedOffer.monthlyInstallmentGHS.toFixed(2)}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Interest Rate (Annual)</div>
                <div className="text-lg font-bold text-slate-200 mt-1">
                  {application.approvedOffer.interestRateAnnualPct}%
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Tenor Duration</div>
                <div className="text-lg font-bold text-slate-200 mt-1">
                  {application.approvedOffer.tenorMonths} Months
                </div>
              </div>
            </div>
          </div>

          {/* Formal Agreement Document Box */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white font-mono flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>Credit Facility Agreement Terms</span>
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">
                App Ref: {application.applicationNumber}
              </span>
            </div>

            <div className="max-h-48 overflow-y-auto p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 space-y-2 text-[11px] leading-relaxed">
              <p>
                <strong>CREDIT PROVIDER:</strong> {selectedProvider.legalName} ({selectedProvider.regulatoryStatus})
              </p>
              <p>
                <strong>BORROWER:</strong> {customerName} (National ID: {nationalIdNumber})
              </p>
              <p>
                <strong>DISBURSEMENT PURPOSE:</strong> Purchase of commercial merchandise: {selectedProduct.title} from merchant {selectedProduct.merchantName}.
              </p>
              <p>
                <strong>OBLIGATION:</strong> The borrower undertakes to repay the total sum of GH₵ {application.approvedOffer.totalPayableGHS.toFixed(2)} in {application.approvedOffer.tenorMonths} consecutive monthly installments of GH₵ {application.approvedOffer.monthlyInstallmentGHS.toFixed(2)}.
              </p>
              <p className="text-amber-300">
                <strong>INSURANCE:</strong> Underwritten by Curacel Grow Underwriting Consortium. If a covered event occurs, the insurer assesses the claim according to policy terms. Insurance does not pay automatically without a covered event.
              </p>
              <p className="text-slate-400">
                <strong>ORCHESTRATION NOTICE:</strong> Oskayi is the technology orchestrator and is not a lender, insurer, or payment provider.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
              >
                ← Back / Modify Application
              </button>
              <button
                type="button"
                onClick={handleAcceptOffer}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black font-mono text-xs uppercase tracking-wider flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing Agreement...</span>
                  </>
                ) : (
                  <>
                    <span>Accept Agreement & Bind Insurance</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: ERC-4337 Account Abstraction Gas Sponsorship & Zero-Gas Signing */}
      {currentStep === 3 && agreement && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-indigo-900/60 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/30">
                <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">
                  ERC-4337 Account Abstraction Paymaster
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Sponsored Blockchain Transaction (Zero Native Gas Needed)
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your transaction will be signed with your smart account key. The gas fee of{' '}
              <strong className="text-amber-300">GH₵ 0.15 (~0.0035 MATIC)</strong> is sponsored directly by{' '}
              <strong>{selectedSponsor.sponsorName}</strong>. You do not need to hold any cryptocurrency.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Customer Gas Required</div>
                <div className="text-base font-bold text-emerald-400 mt-1">0.00 GHS (FREE)</div>
                <div className="text-[10px] text-slate-500">Sponsored by Paymaster</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Active Paymaster Contract</div>
                <div className="text-xs font-bold text-slate-300 mt-1 truncate">
                  {selectedSponsor.paymasterContractAddress}
                </div>
                <div className="text-[10px] text-slate-500">{selectedSponsor.supportedChain}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Legal Disclosure</div>
                <div className="text-[10px] text-amber-300 mt-1 leading-snug">
                  {selectedSponsor.legalDisclosure}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Ready to Execute Sponsored Order
            </h4>
            <div className="text-xs text-slate-400 space-y-1 font-mono">
              <div>Customer: <span className="text-white">{customerName}</span></div>
              <div>Merchant Settlement: <span className="text-white">GH₵ {breakdown.merchantSettlementAmount.toLocaleString()}</span> (Disbursing to {selectedProduct.merchantName})</div>
              <div>Credit Agreement: <span className="text-amber-400">{agreement.agreementNumber}</span></div>
              {policy && (
                <div>Insurance Policy: <span className="text-emerald-400">{policy.policyNumber}</span></div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleRequestGasAndSign}
                disabled={loading}
                className="px-8 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black font-mono text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-emerald-400/20"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Sponsored Transaction...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign & Transact (Zero Gas)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Success, Repayment Schedule & Claims Link */}
      {currentStep === 4 && agreement && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">
              Order Orchestrated & Settled Successfully!
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              The merchant has been paid in full by your connected Credit Provider. Your transaction gas was sponsored, and your credit life protection is active.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                Agreement: <span className="text-amber-400 font-bold">{agreement.agreementNumber}</span>
              </div>
              {policy && (
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  Insurance: <span className="text-emerald-400 font-bold">{policy.policyNumber}</span>
                </div>
              )}
              {zeroGasTxHash && (
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  Tx: <span className="text-indigo-300">{zeroGasTxHash.slice(0, 16)}...</span>
                </div>
              )}
            </div>
          </div>

          {/* Repayment Schedule Table */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>Your Official Repayment Schedule</span>
              </h4>
              <button
                onClick={onViewRepayments}
                className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
              >
                Manage in Repayments Tab →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Principal (GHS)</th>
                    <th className="p-3">Interest (GHS)</th>
                    <th className="p-3">Total Installment</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-300">
                  {agreement.repaymentSchedule.map(s => (
                    <tr key={s.installmentNumber} className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">#{s.installmentNumber}</td>
                      <td className="p-3">{s.dueDate}</td>
                      <td className="p-3">GH₵ {s.principalGHS.toFixed(2)}</td>
                      <td className="p-3">GH₵ {s.interestGHS.toFixed(2)}</td>
                      <td className="p-3 font-bold text-amber-300">GH₵ {s.totalDueGHS.toFixed(2)}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Next Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onViewRepayments}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold font-mono text-xs uppercase tracking-wider"
            >
              Go to My Repayments
            </button>
            <button
              onClick={onViewClaims}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>View Protection & File Claim</span>
            </button>
            <button
              onClick={() => {
                setCurrentStep(1);
                setApplication(null);
                setAgreement(null);
                setPolicy(null);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-950 text-slate-400 hover:text-white font-mono text-xs"
            >
              Start Another Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
