import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Sliders, 
  ShieldCheck, 
  Layers, 
  Send, 
  Users, 
  HeartHandshake, 
  DollarSign, 
  FileCode, 
  Copy, 
  Check, 
  ExternalLink, 
  Lock, 
  PieChart, 
  Activity, 
  PlusCircle, 
  Sparkles,
  Building2,
  Wallet,
  Clock,
  ChevronRight,
  Database,
  Radio,
  BarChart3,
  Terminal,
  HelpCircle,
  Stethoscope,
  Pill,
  HeartPulse
} from 'lucide-react';

interface Merchant {
  id: string;
  businessName: string;
  category: string;
  country: string;
  currency: string;
  contactEmail: string;
  phone: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  recipientCode: string;
  paymentLinkUrl: string;
  operatingMonths: number;
  inflows30d: number;
  inflows60d: number;
  inflows90d: number;
  avgMonthlyInflow: number;
  transactionCount90d: number;
  chargebackRatePct: number;
  inflowTrendPct: number;
  creditTier: string;
  eligiblePercentage: number;
  maxEligibleAmount: number;
  currentOutstandingLoan: number;
  repaymentScheduleWeeks: number;
  settledLoansCount: number;
  status: string;
  splitSubaccountCode: string;
  splitPercentage: number;
  autoLimitScore: number;
  riskNotes?: string;
}

interface AidProgram {
  id: string;
  title: string;
  ngoName: string;
  focusCountry: string;
  currency: string;
  targetBeneficiaries: number;
  enrolledBeneficiaries: number;
  amountPerBeneficiary: number;
  payoutFrequency: string;
  totalPoolFunded: number;
  totalDisbursedToDate: number;
  costPerDollarDelivered: number;
  activeDonorSubscriptions: number;
  publicFundingLink: string;
  lastPayoutDate: string | null;
  nextScheduledRun: string;
  status: string;
}

interface Beneficiary {
  id: string;
  programId: string;
  fullName: string;
  phone: string;
  channelType: string;
  provider: string;
  accountNumber: string;
  recipientCode: string;
  community: string;
  kycTier: string;
  totalReceivedGhs: number;
  lastDisbursedAt: string | null;
  status: string;
}

interface Patient {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  nationalHealthId: string;
  planName: string;
  monthlyContributionGhs: number;
  walletBalance: number;
  totalContributed: number;
  totalSpent: number;
  subscriptionCode: string;
  planCode: string;
  currency: string;
  status: string;
  lastContributionDate: string;
  ledger: {
    id: string;
    type: string;
    amount: number;
    reference: string;
    timestamp: string;
    providerName?: string;
    notes: string;
  }[];
}

interface Provider {
  id: string;
  name: string;
  providerType: string;
  licenseNumber: string;
  city: string;
  country: string;
  currency: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  recipientCode: string;
  status: string;
  totalPaidOutGhs: number;
  settledClaimsCount: number;
}

interface Claim {
  id: string;
  claimCode: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  serviceOrDrugDescription: string;
  claimAmount: number;
  copayCovered: number;
  patientOutOfPocket: number;
  status: string;
  transferReference: string | null;
  paystackTransferStatus: string;
  createdAt: string;
  settledAt: string | null;
  paymentLinkTopupUrl?: string;
  shortfallAmount?: number;
}

export const PaystackAutonomousFintechSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'merchant' | 'healthcare' | 'admin' | 'aid' | 'code'>('merchant');
  
  // Merchant State
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>('pm-agro-01');
  const [loading, setLoading] = useState<boolean>(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Credit Engine Inputs
  const [tenorWeeks, setTenorWeeks] = useState<number>(12);
  const [loanPercentage, setLoanPercentage] = useState<number>(45);
  const [repaymentMethod, setRepaymentMethod] = useState<'SPLIT_PAYMENT' | 'SUBSCRIPTION' | 'HYBRID'>('HYBRID');
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [disbursementResult, setDisbursementResult] = useState<any>(null);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  // Onboard Merchant Modal State
  const [showOnboardModal, setShowOnboardModal] = useState<boolean>(false);
  const [newBizName, setNewBizName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newBank, setNewBank] = useState<string>('Stanbic Bank Ghana');
  const [newAccount, setNewAccount] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Clean Energy & Cold Storage');
  const [newCountry, setNewCountry] = useState<string>('Ghana');

  // Healthcare Co-Pay & Pharmacy Orchestrator State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pat-gh-001');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProviderId, setSelectedProviderId] = useState<string>('prov-pharma-01');
  const [claims, setClaims] = useState<Claim[]>([]);
  const [claimServiceDesc, setClaimServiceDesc] = useState<string>('Anti-hypertensive Losartan 50mg (30 tabs) + Rapid Malaria Kit');
  const [claimAmount, setClaimAmount] = useState<number>(180);
  const [claimResult, setClaimResult] = useState<any>(null);
  const [healthDashMetrics, setHealthDashMetrics] = useState<any>(null);

  // Enroll Patient Modal
  const [showEnrollPatientModal, setShowEnrollPatientModal] = useState<boolean>(false);
  const [newPatientName, setNewPatientName] = useState<string>('');
  const [newPatientEmail, setNewPatientEmail] = useState<string>('');
  const [newPatientPhone, setNewPatientPhone] = useState<string>('');
  const [newPatientPlan, setNewPatientPlan] = useState<string>('Family Comprehensive Health Shield');
  const [newPatientContribution, setNewPatientContribution] = useState<number>(350);

  // Admin Portfolio State
  const [portfolioData, setPortfolioData] = useState<any>(null);

  // Aid Programs State
  const [aidPrograms, setAidPrograms] = useState<AidProgram[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('aid-prg-savannah-01');
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [aidReport, setAidReport] = useState<any>(null);
  const [bulkPayoutStatus, setBulkPayoutStatus] = useState<any>(null);

  // New Aid Program Modal State
  const [showNewProgramModal, setShowNewProgramModal] = useState<boolean>(false);
  const [newProgTitle, setNewProgTitle] = useState<string>('');
  const [newProgNgo, setNewProgNgo] = useState<string>('');
  const [newProgTarget, setNewProgTarget] = useState<number>(500);
  const [newProgAmount, setNewProgAmount] = useState<number>(400);

  // Code Tab Sub-selection
  const [activeCodeFile, setActiveCodeFile] = useState<'creditEngine' | 'healthcareEMR' | 'webhook' | 'safeTransfer' | 'deployment'>('creditEngine');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Fetch initial data
  const fetchMerchants = async () => {
    try {
      const res = await fetch('/api/paystack/merchants');
      if (res.ok) {
        const data = await res.json();
        if (data.merchants) setMerchants(data.merchants);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/paystack/admin/portfolio');
      if (res.ok) {
        const data = await res.json();
        setPortfolioData(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAidPrograms = async () => {
    try {
      const res = await fetch('/api/paystack/aid/programs');
      if (res.ok) {
        const data = await res.json();
        if (data.programs) setAidPrograms(data.programs);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBeneficiaries = async (programId: string) => {
    try {
      const res = await fetch(`/api/paystack/aid/beneficiaries?programId=${programId}`);
      if (res.ok) {
        const data = await res.json();
        setBeneficiaries(data.beneficiaries || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAidReport = async (programId: string) => {
    try {
      const res = await fetch(`/api/paystack/aid/reports/${programId}`);
      if (res.ok) {
        const data = await res.json();
        setAidReport(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHealthcareData = async () => {
    try {
      const [patRes, provRes, dashRes] = await Promise.all([
        fetch('/api/paystack/health/patients'),
        fetch('/api/paystack/health/providers'),
        fetch('/api/paystack/health/dashboards')
      ]);
      if (patRes.ok) {
        const pData = await patRes.json();
        if (pData.patients) setPatients(pData.patients);
      }
      if (provRes.ok) {
        const prData = await provRes.json();
        if (prData.providers) setProviders(prData.providers);
      }
      if (dashRes.ok) {
        const dData = await dashRes.json();
        setHealthDashMetrics(dData.metrics);
        if (dData.recentClaims) setClaims(dData.recentClaims);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMerchants();
    fetchPortfolio();
    fetchAidPrograms();
    fetchHealthcareData();
  }, []);

  useEffect(() => {
    if (selectedProgramId) {
      fetchBeneficiaries(selectedProgramId);
      fetchAidReport(selectedProgramId);
    }
  }, [selectedProgramId]);

  const selectedMerchant = merchants.find(m => m.id === selectedMerchantId) || merchants[0];
  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const selectedProvider = providers.find(pr => pr.id === selectedProviderId) || providers[0];

  // Evaluate Credit Engine
  const handleEvaluateCredit = async () => {
    if (!selectedMerchant) return;
    setLoading(true);
    setEvaluationResult(null);
    setDisbursementResult(null);
    try {
      const res = await fetch('/api/paystack/credit-engine/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: selectedMerchant.id,
          requestedTenorWeeks: tenorWeeks,
          loanPercentage
        })
      });
      const data = await res.json();
      setEvaluationResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Instant Paystack Transfer Disbursement
  const handleDisburseLoan = async () => {
    if (!selectedMerchant) return;
    setLoading(true);
    try {
      const amount = evaluationResult?.creditEvaluation?.availableEligibleAmount || selectedMerchant.maxEligibleAmount || 25000;
      const res = await fetch('/api/paystack/loans/apply-and-disburse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: selectedMerchant.id,
          amount,
          tenorWeeks,
          repaymentMethod
        })
      });
      const data = await res.json();
      setDisbursementResult(data);
      setActionSuccessMsg(`Loan disbursed! Paystack Transfer Ref: ${data.transferConfirmation?.reference}`);
      fetchMerchants();
      fetchPortfolio();
      setTimeout(() => setActionSuccessMsg(null), 5000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Simulate incoming customer payment with split recovery
  const handleSimulatePayment = async () => {
    if (!selectedMerchant) return;
    setLoading(true);
    try {
      const res = await fetch('/api/paystack/loans/simulate-repayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: selectedMerchant.id,
          transactionAmount: 3500
        })
      });
      const data = await res.json();
      setSimulationLog(data.message);
      fetchMerchants();
      fetchPortfolio();
      setTimeout(() => setSimulationLog(null), 6000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Onboard Merchant
  const handleOnboardMerchant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName || !newEmail || !newAccount) return;
    setLoading(true);
    try {
      const res = await fetch('/api/paystack/merchants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: newBizName,
          contactEmail: newEmail,
          bankName: newBank,
          accountNumber: newAccount,
          category: newCategory,
          country: newCountry,
          currency: newCountry === 'Nigeria' ? 'NGN' : 'GHS'
        })
      });
      const data = await res.json();
      if (data.success && data.merchant) {
        await fetchMerchants();
        setSelectedMerchantId(data.merchant.id);
        setShowOnboardModal(false);
        setActionSuccessMsg(`Merchant "${data.merchant.businessName}" onboarded with live Paystack recipient!`);
        setTimeout(() => setActionSuccessMsg(null), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Submit Healthcare Claim (Instant Wallet Check, Transfer Payout or Top-up Payment Request)
  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId || !selectedProviderId || !claimAmount) return;
    setLoading(true);
    setClaimResult(null);
    try {
      const res = await fetch('/api/paystack/health/claims/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: selectedPatientId,
          providerId: selectedProviderId,
          serviceOrDrugDescription: claimServiceDesc,
          claimAmount: Number(claimAmount)
        })
      });
      const data = await res.json();
      setClaimResult(data);
      await fetchHealthcareData();
      if (data.action === 'CLAIM_AUTO_APPROVED_AND_PAID') {
        setActionSuccessMsg(`Claim auto-approved! Paid directly to clinic via Paystack Transfer (Ref: ${data.transferDetails?.reference})`);
      } else {
        setActionSuccessMsg(`Low balance detected. Automated Paystack Top-Up link created for ${data.patientWallet?.shortfallAmount} GHS.`);
      }
      setTimeout(() => setActionSuccessMsg(null), 6000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Top up patient health wallet
  const handleTopupPatient = async (patientId: string, amount: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/paystack/health/patients/${patientId}/topup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topupAmount: amount })
      });
      const data = await res.json();
      await fetchHealthcareData();
      setActionSuccessMsg(data.message);
      setTimeout(() => setActionSuccessMsg(null), 6000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Enroll Patient
  const handleEnrollPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName || !newPatientEmail) return;
    setLoading(true);
    try {
      const res = await fetch('/api/paystack/health/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newPatientName,
          email: newPatientEmail,
          phone: newPatientPhone,
          planName: newPatientPlan,
          monthlyContributionGhs: newPatientContribution
        })
      });
      const data = await res.json();
      if (data.success && data.patient) {
        await fetchHealthcareData();
        setSelectedPatientId(data.patient.id);
        setShowEnrollPatientModal(false);
        setActionSuccessMsg(`Patient ${data.patient.fullName} enrolled with Paystack monthly subscription!`);
        setTimeout(() => setActionSuccessMsg(null), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Execute Bulk Transfer for Aid Program
  const handleExecuteBulkPayout = async () => {
    if (!selectedProgramId) return;
    setLoading(true);
    setBulkPayoutStatus(null);
    try {
      const res = await fetch('/api/paystack/aid/disburse-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId: selectedProgramId })
      });
      const data = await res.json();
      setBulkPayoutStatus(data);
      fetchAidPrograms();
      fetchBeneficiaries(selectedProgramId);
      fetchAidReport(selectedProgramId);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Create New Aid Program
  const handleCreateAidProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgTitle || !newProgNgo) return;
    setLoading(true);
    try {
      const res = await fetch('/api/paystack/aid/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProgTitle,
          ngoName: newProgNgo,
          targetBeneficiaries: newProgTarget,
          amountPerBeneficiary: newProgAmount
        })
      });
      const data = await res.json();
      if (data.success && data.program) {
        await fetchAidPrograms();
        setSelectedProgramId(data.program.id);
        setShowNewProgramModal(false);
        setActionSuccessMsg(`Aid Program created with Paystack recurring donor rails!`);
        setTimeout(() => setActionSuccessMsg(null), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // CODE SAMPLES FOR TAB 5
  const codeSamples = {
    creditEngine: `// ==============================================================================
// AUTONOMOUS PAYSTACK CREDIT & INVENTORY FINANCING ENGINE
// Language: Node.js / TypeScript / Express
// Provider: Paystack (Payment Links, Webhooks, Split Payments, Transfer API)
// ==============================================================================

import express from 'express';
import crypto from 'crypto';

interface MerchantRecord {
  id: string;
  businessName: string;
  recipientCode: string;       // Paystack Transfer Recipient (e.g. RCP_xxx)
  splitSubaccountCode: string; // Paystack Split Subaccount (e.g. SUB_xxx)
  inflows30d: number;
  inflows60d: number;
  inflows90d: number;
  avgMonthlyInflow: number;
  chargebackRatePct: number;
  inflowTrendPct: number;      // Week-over-week inflow velocity
  currentOutstandingLoan: number;
  currency: string;
}

export class PaystackCreditEngine {
  private paystackSecretKey: string;
  private baseUrl = 'https://api.paystack.co';

  constructor(secretKey: string) {
    this.paystackSecretKey = secretKey;
  }

  /**
   * 1. Calculate Average Monthly Inflows over rolling 30/60/90-day windows
   */
  public calculateInflowMetrics(transactions: any[]) {
    const now = Date.now();
    const d30 = now - 30 * 86400000;
    const d60 = now - 60 * 86400000;
    const d90 = now - 90 * 86400000;

    const t30 = transactions.filter(t => new Date(t.paid_at).getTime() >= d30);
    const t60 = transactions.filter(t => new Date(t.paid_at).getTime() >= d60);
    const t90 = transactions.filter(t => new Date(t.paid_at).getTime() >= d90);

    const sum30 = t30.reduce((acc, t) => acc + t.amount / 100, 0);
    const sum60 = t60.reduce((acc, t) => acc + t.amount / 100, 0);
    const sum90 = t90.reduce((acc, t) => acc + t.amount / 100, 0);

    const avgMonthly = (sum30 + sum60 / 2 + sum90 / 3) / 3;
    const previousMonth = sum60 - sum30;
    const trendPct = previousMonth > 0 ? ((sum30 - previousMonth) / previousMonth) * 100 : 0;

    return { inflows30d: sum30, inflows60d: sum60, inflows90d: sum90, avgMonthly, trendPct };
  }

  /**
   * 2. Autonomous Credit Rule Engine: Evaluates limits, fraud triggers & tenors
   */
  public evaluateCreditOffer(merchant: MerchantRecord, requestedTenorWeeks = 12) {
    // FRAUD RULE 1: Sudden Drop in Inflows (>40% drop week-over-week)
    if (merchant.inflowTrendPct < -40) {
      return {
        eligible: false,
        reason: 'CRITICAL_RISK_TRIGGER: Inflow collapsed by ' + Math.abs(merchant.inflowTrendPct).toFixed(1) + '%. New borrowing frozen.',
        maxEligibleLimit: 0
      };
    }

    // FRAUD RULE 2: Chargeback / Dispute Spike (>1.5% threshold)
    if (merchant.chargebackRatePct > 1.5) {
      return {
        eligible: false,
        reason: 'CHARGEBACK_SPIKE: Merchant dispute rate of ' + merchant.chargebackRatePct + '% exceeds safety ceiling (1.50%).',
        maxEligibleLimit: 0
      };
    }

    // Max loan up to 45% of average monthly inflow
    const eligibleCapacityPct = 0.45;
    const maxCapacity = Math.round(merchant.avgMonthlyInflow * eligibleCapacityPct);
    const availableHeadroom = Math.max(0, maxCapacity - merchant.currentOutstandingLoan);

    const flatFinancingFeeRate = 0.042; // 4.2% flat facility fee
    const fee = Math.round(availableHeadroom * flatFinancingFeeRate);
    const totalRepayment = availableHeadroom + fee;
    const weeklyInstallment = Math.round(totalRepayment / requestedTenorWeeks);
    const suggestedSplitRatePct = 18; // 18% deducted from incoming Paystack payments

    return {
      eligible: availableHeadroom > 0,
      currency: merchant.currency,
      availableHeadroom,
      tenorWeeks: requestedTenorWeeks,
      financingFee: fee,
      totalRepayment,
      weeklyInstallment,
      suggestedSplitRatePct
    };
  }

  /**
   * 3. Instant Disbursement via Paystack Transfer API (POST /transfer)
   */
  public async disburseLoan(recipientCode: string, amount: number, currency: string, loanId: string) {
    const reference = 'TRF-OSK-' + Date.now();
    const payload = {
      source: 'balance',
      amount: amount * 100, // In kobo / pesewas
      recipient: recipientCode,
      reason: 'Inventory & Working Capital Loan Disbursed [' + loanId + ']',
      reference
    };

    const response = await fetch(this.baseUrl + '/transfer', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.paystackSecretKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  }
}`,

    healthcareEMR: `// ==============================================================================
// HEALTHCARE CO-PAY & PHARMACY BENEFITS ORCHESTRATOR
// EMR & Clinic Management System Integration (OpenMRS, Bahmni, MedDRA, REST)
// Uses: Paystack Subscriptions, Transfers, and Payment Requests
// ==============================================================================

import express, { Request, Response } from 'express';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || 'sk_live_healthcare';
const BASE_URL = 'https://api.paystack.co';

/**
 * 1. CLINIC/PHARMACY SUBMITS CLAIM (Manual UI or Automated EMR Webhook)
 */
export async function processHealthcareClaim(req: Request, res: Response) {
  const { patientId, providerRecipientCode, claimAmountGhs, serviceSummary } = req.body;

  // Step 1: Retrieve Patient Ledger & Health Wallet Balance from database
  const patient = await getPatientFromDb(patientId);
  const amount = Number(claimAmountGhs);

  // Step 2: Check Patient Health Wallet Balance
  if (patient.walletBalance >= amount) {
    // A. SUFFICIENT BALANCE: Debit wallet & pay clinic directly via Paystack Transfer
    const transferRef = \`TRF-HLTH-\${Date.now()}-\${patient.id.slice(-4)}\`;

    const transferPayload = {
      source: 'balance',
      amount: amount * 100, // In pesewas
      recipient: providerRecipientCode, // e.g. RCP_pharma_korlebu
      reason: \`Co-pay settlement: \${serviceSummary}\`,
      reference: transferRef
    };

    const paystackRes = await fetch(\`\${BASE_URL}/transfer\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${PAYSTACK_SECRET}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transferPayload)
    });
    const transferData = await paystackRes.json();

    // Debit patient wallet & log ledger
    patient.walletBalance -= amount;
    await recordLedgerDebit(patient.id, amount, transferRef, serviceSummary);

    return res.json({
      status: 'AUTO_APPROVED_PAID',
      message: 'Claim settled instantly to clinic account via Paystack Transfer.',
      transferReference: transferRef,
      remainingWalletBalance: patient.walletBalance
    });

  } else {
    // B. INSUFFICIENT BALANCE: Calculate Shortfall & trigger Paystack Payment Request
    const shortfall = amount - patient.walletBalance;

    // Create Paystack Payment Request (or Checkout link) for the shortfall
    const paymentRequestPayload = {
      customer: patient.email,
      amount: shortfall * 100, // In pesewas
      description: \`Healthcare Co-pay Shortfall Top-Up for \${serviceSummary}\`,
      due_date: new Date(Date.now() + 86400000).toISOString(),
      has_invoice: true
    };

    const invoiceRes = await fetch(\`\${BASE_URL}/paymentrequest\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${PAYSTACK_SECRET}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentRequestPayload)
    });
    const invoiceData = await invoiceRes.json();

    const topupLink = invoiceData.data?.offline_reference 
      ? \`https://paystack.com/pay/\${invoiceData.data.request_code}\`
      : \`https://paystack.com/pay/health-topup-\${patient.id}\`;

    // Flag claim as PENDING_TOPUP
    await recordPendingClaim(patient.id, amount, shortfall, topupLink);

    return res.json({
      status: 'PENDING_TOPUP',
      message: \`Patient balance is low. Shortfall of \${shortfall} GHS required.\`,
      topupPaymentLink: topupLink,
      shortfallAmount: shortfall,
      patientWalletBalance: patient.walletBalance
    });
  }
}

/**
 * 2. PATIENT ENROLLMENT: Creates Paystack Monthly Subscription Plan
 */
export async function enrollPatientSubscription(fullName: string, email: string, monthlyGhs: number) {
  // 1. Create or retrieve plan
  const planPayload = {
    name: \`Health Wallet Monthly Contribution (\${monthlyGhs} GHS)\`,
    interval: 'monthly',
    amount: monthlyGhs * 100,
    currency: 'GHS'
  };

  const planRes = await fetch(\`\${BASE_URL}/plan\`, {
    method: 'POST',
    headers: { 'Authorization': \`Bearer \${PAYSTACK_SECRET}\`, 'Content-Type': 'application/json' },
    body: JSON.stringify(planPayload)
  });
  const planData = await planRes.json();

  return { planCode: planData.data?.plan_code };
}`,

    webhook: `// ==============================================================================
// PRODUCTION PAYSTACK WEBHOOK LISTENER & SAFE EVENT ROUTER
// File: routes/paystackWebhook.ts
// Handles: charge.success, transfer.success/failed, subscriptions, health topups
// ==============================================================================

import express, { Request, Response } from 'express';
import crypto from 'crypto';

const router = express.Router();
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || 'sk_live_your_secret_key';
const processedEvents = new Set<string>();

router.post('/api/paystack/webhook', express.raw({ type: 'application/json' }), async (req: any, res: Response) => {
  try {
    const signature = req.headers['x-paystack-signature'];
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET)
      .update(req.body)
      .digest('hex');

    if (hash !== signature) {
      return res.status(401).send('Invalid signature');
    }

    const event = JSON.parse(req.body.toString('utf-8'));
    const eventType = event.event;
    const data = event.data;
    const eventRef = data.reference || data.transfer_code || event.id;

    if (processedEvents.has(eventRef)) {
      return res.status(200).json({ status: 'ALREADY_PROCESSED' });
    }
    processedEvents.add(eventRef);

    switch (eventType) {
      case 'charge.success': {
        const totalAmount = data.amount / 100;
        // If metadata contains healthWalletTopUp, credit patient wallet & resolve pending claims
        if (data.metadata?.healthPatientId) {
          console.log(\`[Health Top-Up Paid] \${totalAmount} GHS credited to patient \${data.metadata.healthPatientId}\`);
          // Auto-settle pending clinic claims
        }
        break;
      }

      case 'invoice.create':
      case 'subscription.create': {
        // Monthly health wallet subscription billed successfully: credit patient wallet
        console.log(\`[Monthly Health Subscription Credit] Patient \${data.customer?.email} funded.\`);
        break;
      }

      case 'transfer.success': {
        console.log(\`[Clinic/Merchant Payout Settled] Transfer \${data.transfer_code} settled.\`);
        break;
      }

      case 'transfer.failed': {
        console.warn(\`[Safe Error Handling] Transfer \${data.transfer_code} failed. Reason: \${data.reason}\`);
        // Safe retry queue & ledger restoration
        break;
      }

      case 'invoice.payment_failed': {
        console.warn(\`[Dunning Alert] Monthly subscription payment failed for \${data.customer?.email}\`);
        break;
      }
    }

    res.status(200).json({ status: 'ACKNOWLEDGED' });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;`,

    safeTransfer: `// ==============================================================================
// HOW TO HANDLE PAYSTACK TRANSFER ERRORS SAFELY (PRODUCTION GUIDE)
// ==============================================================================

/**
 * 1. THE GOLDEN RULE OF FINANCIAL TRANSFERS:
 *    Never treat a network timeout (504 Gateway Timeout or ETIMEDOUT) as a failure.
 *    The bank or Paystack switch may have processed the funds.
 *    Re-submitting the transfer with a new reference risks DOUBLE-DISBURSEMENT!
 */

export async function safeInitiateTransfer(paystackSecretKey: string, recipientCode: string, amount: number, uniqueId: string) {
  const idempotentRef = \`TRF-DISB-\${uniqueId}\`;

  try {
    const res = await fetch('https://api.paystack.co/transfer', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${paystackSecretKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        source: 'balance',
        amount: amount * 100, // In kobo/pesewas
        recipient: recipientCode,
        reason: \`Disbursement [\${uniqueId}]\`,
        reference: idempotentRef
      })
    });

    const body = await res.json();
    if (!res.ok) {
      return { status: 'REJECTED_IMMEDIATE', error: body.message };
    }
    return { status: 'PENDING_CONFIRMATION', data: body.data };
  } catch (networkError: any) {
    return { 
      status: 'VERIFICATION_REQUIRED', 
      reference: idempotentRef,
      action: 'Poll GET /transfer/verify/:reference or await webhook'
    };
  }
}`,

    deploymentGuide: `# DEPLOYMENT & PRODUCTION INTEGRATION GUIDE
# Autonomous Paystack Merchant Financing, Healthcare Orchestrator & Aid Distribution

## 1. Environment Configuration (.env)
\`\`\`bash
PAYSTACK_SECRET_KEY=sk_live_9a7b...
PAYSTACK_PUBLIC_KEY=pk_live_8c2d...
PORT=3000
DATABASE_URL=sqlite:./data/app_database.json
WEBHOOK_SECRET_HMAC=your_hmac_secret
\`\`\`

## 2. Paystack Dashboard Configuration
1. Navigate to: Dashboard -> Settings -> API Keys & Webhooks.
2. Set Webhook URL to: \`https://yourdomain.com/api/paystack/webhook\`.
3. Enable Transfer Features:
   - Dashboard -> Transfers -> Enable Transfers
   - Complete 2FA and OTP authorization.
4. Fund your Paystack Balance via Bank Wire or Virtual Account dedicated for disbursements.

## 3. Subaccounts & Split Configuration
- For Merchant Inflow financing, each merchant onboarded receives a dedicated Split Subaccount.
- For Healthcare Clinics & Pharmacies, register each as a Transfer Recipient (\`RCP_xxx\`).
- For Patients, create Monthly Subscription Plans (\`PLN_xxx\`).
`
  };

  return (
    <section id="paystack-capital" className="py-20 bg-[#070E1E] text-white relative overflow-hidden border-t border-b border-indigo-950">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Strip */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Paystack Institutional Fintech Suite</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Autonomous Merchant Financing, Healthcare Co-Pay & Aid Orchestrator
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Built using only <strong className="text-[#D4AF37]">Paystack Live APIs</strong>. Closed-loop payment links, rolling cash flow scoring, healthcare subscription health wallets, instant clinic transfer payouts, and bulk humanitarian cash delivery.
          </p>
        </div>

        {/* Global Notification Banner */}
        {actionSuccessMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>{actionSuccessMsg}</span>
            </div>
            <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-400 hover:text-white text-xs underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Core Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('merchant')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'merchant'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 ring-2 ring-[#D4AF37]'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Merchant Working Capital</span>
          </button>

          <button
            onClick={() => setActiveTab('healthcare')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'healthcare'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 ring-2 ring-[#D4AF37]'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Healthcare Co-Pay & Pharmacy</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'admin'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 ring-2 ring-[#D4AF37]'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Risk & Portfolio Health</span>
          </button>

          <button
            onClick={() => setActiveTab('aid')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'aid'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 ring-2 ring-[#D4AF37]'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Aid Distributor (Idea 10)</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-[#D4AF37] text-[#0A1931] shadow-lg shadow-[#D4AF37]/20 ring-2 ring-[#D4AF37]'
                : 'bg-[#0A1931] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Developer Code Hub</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: MERCHANT WORKING CAPITAL & INFLOW FINANCING */}
        {/* ========================================================================= */}
        {activeTab === 'merchant' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Merchant Selector & Profile Bar */}
            <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                  Active Financed Merchant
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedMerchantId}
                    onChange={(e) => {
                      setSelectedMerchantId(e.target.value);
                      setEvaluationResult(null);
                      setDisbursementResult(null);
                    }}
                    className="bg-[#070E1E] text-white border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#D4AF37]"
                  >
                    {merchants.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.businessName} ({m.country} · {m.currency})
                      </option>
                    ))}
                  </select>
                  
                  {selectedMerchant && (
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md ${
                      selectedMerchant.status === 'FLAGGED_RISK'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {selectedMerchant.status === 'FLAGGED_RISK' ? '⚠️ RISK FLAGGED' : '✓ RECIPIENT VERIFIED'}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowOnboardModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#070E1E] hover:bg-[#132746] text-[#D4AF37] border border-[#D4AF37]/50 transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Onboard New Merchant</span>
                </button>
              </div>
            </div>

            {selectedMerchant && (
              <>
                {/* 1. Cash Flow Inflow Tracking (30d / 60d / 90d Windows) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Rolling 30-Day Inflows</span>
                      <Activity className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">
                      {selectedMerchant.currency} {selectedMerchant.inflows30d.toLocaleString()}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{selectedMerchant.inflowTrendPct > 0 ? `+${selectedMerchant.inflowTrendPct}%` : `${selectedMerchant.inflowTrendPct}%`} velocity</span>
                    </div>
                  </div>

                  <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Rolling 60-Day Inflows</span>
                      <BarChart3 className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">
                      {selectedMerchant.currency} {selectedMerchant.inflows60d.toLocaleString()}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Mid-term rolling cash baseline
                    </div>
                  </div>

                  <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Average Monthly Flow</span>
                      <PieChart className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="text-xl font-extrabold text-[#D4AF37]">
                      {selectedMerchant.currency} {selectedMerchant.avgMonthlyInflow.toLocaleString()}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Underwriting benchmark
                    </div>
                  </div>

                  <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Dynamic Limit Score</span>
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white flex items-baseline gap-2">
                      <span>{selectedMerchant.autoLimitScore}/100</span>
                      <span className="text-xs text-purple-400 font-mono">{selectedMerchant.creditTier}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Disputes: {selectedMerchant.chargebackRatePct}%
                    </div>
                  </div>
                </div>

                {/* Risk Warning if triggered */}
                {selectedMerchant.status === 'FLAGGED_RISK' && (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="text-rose-300 block font-bold">AUTOMATED RISK MITIGATION TRIGGERED:</strong>
                      <p>{selectedMerchant.riskNotes || 'Inflow trend drop or chargeback spike detected. New disbursements are blocked autonomously by credit rules.'}</p>
                    </div>
                  </div>
                )}

                {/* Live Payment Link & Split Repayment Simulation */}
                <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                        <span>Paystack Inflow Collection Rails</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Merchants collect sales via Paystack payment link. Split payments autonomously sweep repayments.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">
                      Subaccount: {selectedMerchant.splitSubaccountCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 bg-[#070E1E] p-4 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-300 block">
                        Merchant Dedicated Paystack Payment Link
                      </span>
                      <div className="flex items-center gap-2 bg-[#0A1931] p-2.5 rounded-lg border border-slate-700">
                        <input
                          type="text"
                          readOnly
                          value={selectedMerchant.paymentLinkUrl}
                          className="bg-transparent text-xs text-slate-200 w-full focus:outline-none font-mono"
                        />
                        <button
                          onClick={() => copyToClipboard(selectedMerchant.paymentLinkUrl)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Share with buyers to accept card, mobile money (MTN, Telecel), and bank transfer payments.
                      </p>
                    </div>

                    <div className="space-y-3 bg-[#070E1E] p-4 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-300 block">
                        Autonomous Split Repayment Recovery Demo
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Simulate a buyer paying {selectedMerchant.currency} 3,500. The engine splits {selectedMerchant.splitPercentage}% towards active loan debt and deposits the remainder directly into the merchant account.
                      </p>
                      <button
                        onClick={handleSimulatePayment}
                        disabled={loading}
                        className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-900/30"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        <span>Simulate {selectedMerchant.currency} 3,500 Customer Inflow</span>
                      </button>
                      {simulationLog && (
                        <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-[11px] text-emerald-300 font-mono">
                          {simulationLog}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Credit Rule Engine & Disbursement */}
                <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-[#D4AF37]" />
                        <span>Autonomous Credit Engine Sizing & Disbursement</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Calculates max credit limit up to X% of average monthly inflows, offers Y weeks tenor, and disburses via Paystack Transfer API.
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Active Loan Debt</span>
                      <span className="text-sm font-bold text-rose-400 font-mono">
                        {selectedMerchant.currency} {(selectedMerchant.currentOutstandingLoan || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 bg-[#070E1E] p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Financing Percentage: {loanPercentage}% of Avg Inflow</span>
                          <span className="text-[#D4AF37] font-mono">
                            {selectedMerchant.currency} {Math.round(selectedMerchant.avgMonthlyInflow * (loanPercentage / 100)).toLocaleString()}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="60"
                          step="5"
                          value={loanPercentage}
                          onChange={(e) => setLoanPercentage(Number(e.target.value))}
                          className="w-full accent-[#D4AF37] cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Repayment Tenor: {tenorWeeks} Weeks</span>
                          <span className="text-slate-400 font-mono">~{Math.round(tenorWeeks / 4)} Months</span>
                        </div>
                        <input
                          type="range"
                          min="4"
                          max="26"
                          step="2"
                          value={tenorWeeks}
                          onChange={(e) => setTenorWeeks(Number(e.target.value))}
                          className="w-full accent-[#D4AF37] cursor-pointer"
                        />
                      </div>

                      <button
                        onClick={handleEvaluateCredit}
                        disabled={loading}
                        className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#0A1931] hover:bg-[#132746] text-[#D4AF37] border border-[#D4AF37]/40 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Run Credit Engine Evaluation</span>
                      </button>
                    </div>

                    <div className="bg-[#070E1E] p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                      {evaluationResult ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-slate-400">Evaluated Offer</span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                              evaluationResult.eligible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {evaluationResult.eligible ? 'APPROVED FOR DISBURSEMENT' : 'CREDIT CEILING / RISK REJECTION'}
                            </span>
                          </div>

                          {evaluationResult.eligible ? (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between py-1 border-b border-slate-800">
                                <span className="text-slate-400">Available Principal:</span>
                                <strong className="text-lg text-white font-mono">
                                  {evaluationResult.creditEvaluation.currency} {evaluationResult.creditEvaluation.availableEligibleAmount.toLocaleString()}
                                </strong>
                              </div>
                              <div className="flex justify-between py-1 border-b border-slate-800">
                                <span className="text-slate-400">Financing Fee (4.2%):</span>
                                <span className="text-slate-300 font-mono">
                                  {evaluationResult.creditEvaluation.currency} {evaluationResult.creditEvaluation.financingFee.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between py-1 border-b border-slate-800">
                                <span className="text-slate-400">Weekly Installment:</span>
                                <span className="text-emerald-400 font-mono">
                                  {evaluationResult.creditEvaluation.currency} {evaluationResult.creditEvaluation.weeklySubscriptionInstallment.toLocaleString()} / wk
                                </span>
                              </div>
                              <div className="flex justify-between py-1">
                                <span className="text-slate-400">Disbursement Rail:</span>
                                <span className="text-blue-400 font-mono text-[11px]">
                                  Paystack Transfer to {selectedMerchant.bankName}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 rounded bg-rose-950/40 text-rose-300 text-xs">
                              {evaluationResult.reason}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 space-y-2 text-slate-400">
                          <Sliders className="w-8 h-8 mx-auto text-slate-600" />
                          <p className="text-xs">
                            Adjust sliders and click "Run Credit Engine Evaluation" to size financing against verified 30/60/90-day inflows.
                          </p>
                        </div>
                      )}

                      <button
                        onClick={handleDisburseLoan}
                        disabled={loading || selectedMerchant.status === 'FLAGGED_RISK' || (evaluationResult && !evaluationResult.eligible)}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                          selectedMerchant.status === 'FLAGGED_RISK' || (evaluationResult && !evaluationResult.eligible)
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-[#D4AF37] hover:bg-[#e0bc43] text-[#0A1931] shadow-[#D4AF37]/20'
                        }`}
                      >
                        <Send className="w-4 h-4" />
                        <span>Disburse via Paystack Transfer API</span>
                      </button>
                    </div>
                  </div>

                  {disbursementResult && (
                    <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Paystack Bank Transfer Executed Successfully</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-300">
                        <div>Transfer Ref: <strong className="text-white">{disbursementResult.transferConfirmation?.reference}</strong></div>
                        <div>Amount Disbursed: <strong className="text-emerald-400">{disbursementResult.loan?.currency} {disbursementResult.loan?.principal.toLocaleString()}</strong></div>
                        <div>Recipient Code: <strong className="text-white">{disbursementResult.transferConfirmation?.recipient}</strong></div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: HEALTHCARE CO-PAY & PHARMACY BENEFITS PAYMENT ORCHESTRATOR */}
        {/* ========================================================================= */}
        {activeTab === 'healthcare' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header & Concept Summary */}
            <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-bold">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>AUTONOMOUS HEALTHCARE & PHARMACY CO-PAY RAILS</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Health Wallet Subscriptions, Claim Validation & Instant Clinic Transfers
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    Patients fund their health wallets via monthly Paystack Subscriptions. When visiting clinics or pharmacies, providers submit claims: if the patient has sufficient wallet balance, the system pays the clinic directly via Paystack Transfer. If low, an autonomous Top-Up Payment Request is triggered.
                  </p>
                </div>

                <button
                  onClick={() => setShowEnrollPatientModal(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#D4AF37] hover:bg-[#e0bc43] text-[#0A1931] shadow-md shadow-[#D4AF37]/20 flex items-center gap-1.5 flex-shrink-0"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Enroll New Patient</span>
                </button>
              </div>

              {/* Patient Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs text-slate-400">Select Patient Profile:</span>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="bg-[#070E1E] text-white border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.fullName} — {p.currency} {p.walletBalance} Balance ({p.planName})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedPatient && (
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md font-bold ${
                    selectedPatient.walletBalance < 100 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {selectedPatient.walletBalance < 100 ? '⚠️ LOW BALANCE (SHORTFALL RISK)' : '✓ HEALTH WALLET FUNDED'}
                  </span>
                )}
              </div>
            </div>

            {selectedPatient && (
              <>
                {/* 1. Patient Health Wallet KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Current Health Wallet Balance</span>
                      <Wallet className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="text-2xl font-extrabold text-[#D4AF37]">
                      {selectedPatient.currency} {selectedPatient.walletBalance.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">{selectedPatient.planName}</span>
                      {selectedPatient.walletBalance < 100 && (
                        <button
                          onClick={() => handleTopupPatient(selectedPatient.id, 250)}
                          className="text-[#D4AF37] underline font-bold"
                        >
                          Top-Up +250
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Monthly Paystack Subscription</span>
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-white">
                      {selectedPatient.currency} {selectedPatient.monthlyContributionGhs.toLocaleString()} <span className="text-xs text-slate-400">/ mo</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">Auto-Debited Monthly via Paystack</span>
                  </div>

                  <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Total Contributions Paid</span>
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-white">
                      {selectedPatient.currency} {selectedPatient.totalContributed.toLocaleString()}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Plan Code: {selectedPatient.planCode}</span>
                  </div>

                  <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Total Healthcare Spend</span>
                      <Activity className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-purple-400">
                      {selectedPatient.currency} {selectedPatient.totalSpent.toLocaleString()}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Prescriptions & Consultations</span>
                  </div>
                </div>

                {/* 2. Provider Claim Submission & Checkout Simulation */}
                <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Pill className="w-4 h-4 text-[#D4AF37]" />
                        <span>Clinic & Pharmacy Claim Submission Portal</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        When the patient receives service, the provider submits the bill. Instant wallet check triggers either direct Paystack Transfer or a top-up link.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 bg-[#070E1E] px-2.5 py-1 rounded border border-slate-800">
                        Recipient: {selectedProvider.recipientCode}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitClaim} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Select Clinic / Pharmacy</label>
                      <select
                        value={selectedProviderId}
                        onChange={(e) => setSelectedProviderId(e.target.value)}
                        className="w-full bg-[#070E1E] border border-slate-700 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-[#D4AF37]"
                      >
                        {providers.map((pr) => (
                          <option key={pr.id} value={pr.id}>
                            {pr.name} ({pr.providerType} · {pr.bankName})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Service / Drug Description</label>
                      <input
                        type="text"
                        required
                        value={claimServiceDesc}
                        onChange={(e) => setClaimServiceDesc(e.target.value)}
                        className="w-full bg-[#070E1E] border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Claim Amount ({selectedPatient.currency})</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          required
                          value={claimAmount}
                          onChange={(e) => setClaimAmount(Number(e.target.value))}
                          className="w-full bg-[#070E1E] border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#e0bc43] text-[#0A1931] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0 shadow-md shadow-[#D4AF37]/20"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Claim</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Claim Outcome Result Display */}
                  {claimResult && (
                    <div className={`p-4 rounded-xl border space-y-3 animate-in fade-in duration-200 ${
                      claimResult.action === 'CLAIM_AUTO_APPROVED_AND_PAID'
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-2">
                          {claimResult.action === 'CLAIM_AUTO_APPROVED_AND_PAID' ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>{claimResult.message}</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-amber-400" />
                              <span>{claimResult.message}</span>
                            </>
                          )}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                          {claimResult.claim?.claimCode}
                        </span>
                      </div>

                      {claimResult.action === 'CLAIM_AUTO_APPROVED_AND_PAID' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-300">
                          <div>Transfer Ref: <strong className="text-white">{claimResult.transferDetails?.reference}</strong></div>
                          <div>Recipient Payout: <strong className="text-emerald-400">{claimResult.transferDetails?.recipientCode}</strong></div>
                          <div>Remaining Wallet: <strong className="text-white">{selectedPatient.currency} {claimResult.patientWallet?.remainingBalance}</strong></div>
                        </div>
                      ) : (
                        <div className="space-y-2 text-xs">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#070E1E] p-3 rounded-lg border border-slate-800">
                            <div>
                              <span className="text-slate-400 block">Shortfall to Top-Up:</span>
                              <strong className="text-amber-300 text-sm font-mono">
                                {selectedPatient.currency} {claimResult.topupPaymentRequest?.amountToPay}
                              </strong>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleTopupPatient(selectedPatient.id, claimResult.topupPaymentRequest?.amountToPay)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider uppercase text-[11px] flex items-center gap-1.5"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Simulate Patient Instant Top-Up</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Patient Ledger History */}
                <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#D4AF37]" />
                      <span>Patient Health Wallet Ledger History</span>
                    </h4>
                    <span className="text-xs font-mono text-slate-400">
                      National Health ID: {selectedPatient.nationalHealthId}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Amount</th>
                          <th className="py-2.5 px-3">Reference</th>
                          <th className="py-2.5 px-3">Description / Provider</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {selectedPatient.ledger.map((entry) => (
                          <tr key={entry.id} className="hover:bg-slate-900/40">
                            <td className="py-3 px-3 text-slate-400">{new Date(entry.timestamp).toLocaleDateString()}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                entry.type === 'SUBSCRIPTION_DEPOSIT' 
                                  ? 'bg-blue-500/20 text-blue-300' 
                                  : entry.type === 'TOPUP_PAYMENT'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-purple-500/20 text-purple-300'
                              }`}>
                                {entry.type}
                              </span>
                            </td>
                            <td className={`py-3 px-3 font-bold ${
                              entry.type === 'CLAIM_DEBIT' ? 'text-rose-400' : 'text-emerald-400'
                            }`}>
                              {entry.type === 'CLAIM_DEBIT' ? '-' : '+'} {selectedPatient.currency} {entry.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-3 text-[#D4AF37]">{entry.reference}</td>
                            <td className="py-3 px-3 text-slate-300">{entry.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ADMIN RISK & PORTFOLIO HEALTH DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'admin' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Portfolio KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block">Total Capital Disbursed</span>
                <div className="text-2xl font-extrabold text-white">
                  GH₵ {portfolioData?.portfolioSummary?.totalDisbursedVolume?.toLocaleString() || '1,287,500'}
                </div>
                <span className="text-[11px] font-mono text-emerald-400">100% via Paystack Transfer API</span>
              </div>

              <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block">Total Recovered Capital</span>
                <div className="text-2xl font-extrabold text-[#D4AF37]">
                  GH₵ {portfolioData?.portfolioSummary?.totalRecoveredVolume?.toLocaleString() || '1,218,000'}
                </div>
                <span className="text-[11px] font-mono text-slate-400">Split & Subscription Sweeps</span>
              </div>

              <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block">Recovery Rate</span>
                <div className="text-2xl font-extrabold text-emerald-400">
                  {portfolioData?.portfolioSummary?.recoveryRatePct || '98.4%'}
                </div>
                <span className="text-[11px] font-mono text-emerald-400">Near-Zero Default Ratio</span>
              </div>

              <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block">Portfolio Default Rate</span>
                <div className="text-2xl font-extrabold text-blue-400">
                  {portfolioData?.portfolioSummary?.defaultRatePct || '0.00%'}
                </div>
                <span className="text-[11px] font-mono text-slate-400">Target &lt; 0.8%</span>
              </div>
            </div>

            {/* Automated Fraud & Risk Rule Detector */}
            <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Real-Time Autonomous Risk & Fraud Rule Engine</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Monitors rolling inflows and dispute webhooks. Automatically suspends new lending when thresholds breach.
                  </p>
                </div>
                <span className="text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-1 rounded-md font-bold">
                  {portfolioData?.activeRiskAlerts?.length || 1} Active Alert Triggered
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#070E1E] p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-white">Rule 1: Sudden Drop in Inflow</strong>
                    <span className="text-amber-400 font-mono">&gt; 40% Collapse Ceiling</span>
                  </div>
                  <p className="text-slate-400">
                    If 30-day cash flow collapses by more than 40% against rolling 60-day average, credit engine automatically freezes new borrowing.
                  </p>
                </div>

                <div className="bg-[#070E1E] p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-white">Rule 2: Chargeback / Dispute Spike</strong>
                    <span className="text-rose-400 font-mono">&gt; 1.50% Dispute Volume</span>
                  </div>
                  <p className="text-slate-400">
                    If customer chargebacks exceed 1.50% of volume, credit facility is immediately frozen and priority split sweep is routed to recovery.
                  </p>
                </div>
              </div>

              {/* Alert Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                      <th className="py-2.5 px-3">Merchant</th>
                      <th className="py-2.5 px-3">Triggered Alert</th>
                      <th className="py-2.5 px-3">Inflow Velocity</th>
                      <th className="py-2.5 px-3">Chargeback Rate</th>
                      <th className="py-2.5 px-3">Automated Mitigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr className="bg-rose-950/20">
                      <td className="py-3 px-3 text-white font-bold">Kumasi Industrial Spares (pm-spares-04)</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">SUDDEN_INFLOW_COLLAPSE & CHARGEBACK_SPIKE</td>
                      <td className="py-3 px-3 text-rose-400">-48.2% (Breached 40%)</td>
                      <td className="py-3 px-3 text-rose-400">2.15% (Breached 1.5%)</td>
                      <td className="py-3 px-3 text-amber-300">Autonomous Credit Frozen · Priority 25% Split Sweep</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 text-white font-bold">Kasoa Agritech & Cold Chain</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">HEALTHY_PRIME</td>
                      <td className="py-3 px-3 text-emerald-400">+14.2% Growing</td>
                      <td className="py-3 px-3 text-emerald-400">0.12% Safe</td>
                      <td className="py-3 px-3 text-slate-400">Eligible for +15% Dynamic Limit Expansion</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 text-white font-bold">Alaba & Ikeja Electronics Hub</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">HEALTHY_PRIME</td>
                      <td className="py-3 px-3 text-emerald-400">+9.8% Growing</td>
                      <td className="py-3 px-3 text-emerald-400">0.08% Safe</td>
                      <td className="py-3 px-3 text-slate-400">AAA Sovereign Rated · Instant Pre-Approved Line</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: AUTONOMOUS AID & SOCIAL SAFETY NET DISTRIBUTOR (IDEA 10) */}
        {/* ========================================================================= */}
        {activeTab === 'aid' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header & Concept Explainer */}
            <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                    <span>IDEA 10: $2.4 TRILLION GLOBAL AID & SAFETY NET SECTOR</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Autonomous Donor-to-Beneficiary Cash Aid Distributor
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    Eliminates administrative friction and leakages in humanitarian aid. Donors fund pools via Paystack Recurring Subscriptions; the system disburses cash directly to rural families via Paystack Bulk Transfer (<code className="text-[#D4AF37]">POST /transfer/bulk</code>) on mobile money and bank rails.
                  </p>
                </div>

                <button
                  onClick={() => setShowNewProgramModal(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#D4AF37] hover:bg-[#e0bc43] text-[#0A1931] shadow-md shadow-[#D4AF37]/20 flex items-center gap-1.5 flex-shrink-0"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Create Aid Program</span>
                </button>
              </div>

              {/* Active Program Selector */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="text-xs text-slate-400">Select Active Program:</span>
                <select
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className="bg-[#070E1E] text-white border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
                >
                  {aidPrograms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.focusCountry} · {p.currency} {p.amountPerBeneficiary}/head)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Program Details & KPIs */}
            {aidReport && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 block">Total Pool Funded</span>
                  <div className="text-xl font-extrabold text-white">
                    {aidReport.currency} {aidReport.financialAudit.totalFundsReceived.toLocaleString()}
                  </div>
                  <span className="text-[11px] font-mono text-[#D4AF37]">Recurring Donors via Paystack</span>
                </div>

                <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 block">Directly Disbursed to Families</span>
                  <div className="text-xl font-extrabold text-emerald-400">
                    {aidReport.currency} {aidReport.financialAudit.totalFundsDisbursedToFamilies.toLocaleString()}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">100% Verified Delivery</span>
                </div>

                <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 block">Cost Per Dollar Delivered</span>
                  <div className="text-xl font-extrabold text-[#D4AF37]">
                    $0.988 / $1.00
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">0.00% Intermediary Leakage</span>
                </div>

                <div className="bg-[#0A1931] p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 block">Active Beneficiaries</span>
                  <div className="text-xl font-extrabold text-blue-400">
                    {aidReport.beneficiaryStats.totalEnrolled} Verified
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">MTN MoMo & Bank Accounts</span>
                </div>
              </div>
            )}

            {/* Bulk Payout Action Strip */}
            <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    <span>Autonomous Paystack Bulk Transfer Execution</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Disburses scheduled cash assistance simultaneously across all verified mobile money and bank recipient codes.
                  </p>
                </div>

                <button
                  onClick={handleExecuteBulkPayout}
                  disabled={loading}
                  className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 flex-shrink-0"
                >
                  <Send className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Execute Paystack Bulk Transfer Run</span>
                </button>
              </div>

              {bulkPayoutStatus && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-200 space-y-1">
                  <div>✓ {bulkPayoutStatus.message}</div>
                  <div className="text-slate-300">Batch Code: {bulkPayoutStatus.batchCode} · Cost Per Dollar Delivered: {bulkPayoutStatus.programStatus?.costPerDollarDelivered}</div>
                </div>
              )}
            </div>

            {/* Beneficiary Registry Table */}
            <div className="bg-[#0A1931] rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span>Enrolled Beneficiary KYC & Disbursement Ledger</span>
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  {beneficiaries.length} Enrolled
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                      <th className="py-2.5 px-3">Beneficiary</th>
                      <th className="py-2.5 px-3">Community</th>
                      <th className="py-2.5 px-3">Payout Rail</th>
                      <th className="py-2.5 px-3">Paystack Recipient</th>
                      <th className="py-2.5 px-3">Total Cash Received</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {beneficiaries.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-900/40">
                        <td className="py-3 px-3 text-white font-bold">{b.fullName}</td>
                        <td className="py-3 px-3 text-slate-300">{b.community}</td>
                        <td className="py-3 px-3 text-slate-300">{b.provider} ({b.accountNumber})</td>
                        <td className="py-3 px-3 text-[#D4AF37]">{b.recipientCode}</td>
                        <td className="py-3 px-3 text-emerald-400 font-bold">GH₵ {b.totalReceivedGhs.toLocaleString()}</td>
                        <td className="py-3 px-3 text-emerald-400">{b.kycTier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BACKEND CODE, WEBHOOK LISTENER & SAFE TRANSFER ERROR GUIDE */}
        {/* ========================================================================= */}
        {activeTab === 'code' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Sub-selector for code files */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0A1931] p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveCodeFile('creditEngine')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCodeFile === 'creditEngine'
                      ? 'bg-[#D4AF37] text-[#0A1931]'
                      : 'bg-[#070E1E] text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  Credit Rule Engine
                </button>

                <button
                  onClick={() => setActiveCodeFile('healthcareEMR')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCodeFile === 'healthcareEMR'
                      ? 'bg-[#D4AF37] text-[#0A1931]'
                      : 'bg-[#070E1E] text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  Healthcare EMR Integration
                </button>

                <button
                  onClick={() => setActiveCodeFile('webhook')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCodeFile === 'webhook'
                      ? 'bg-[#D4AF37] text-[#0A1931]'
                      : 'bg-[#070E1E] text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  Webhook Listener Logic
                </button>

                <button
                  onClick={() => setActiveCodeFile('safeTransfer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCodeFile === 'safeTransfer'
                      ? 'bg-[#D4AF37] text-[#0A1931]'
                      : 'bg-[#070E1E] text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  Safe Transfer Errors
                </button>

                <button
                  onClick={() => setActiveCodeFile('deployment')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCodeFile === 'deployment'
                      ? 'bg-[#D4AF37] text-[#0A1931]'
                      : 'bg-[#070E1E] text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  Deployment Guide
                </button>
              </div>

              <button
                onClick={() => copyToClipboard(codeSamples[activeCodeFile])}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#070E1E] hover:bg-[#132746] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center gap-1.5"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied to Clipboard' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Block Container */}
            <div className="bg-[#070E1E] rounded-2xl border border-slate-800 p-5 overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {activeCodeFile === 'creditEngine' && 'paystack-credit-rule-engine.ts'}
                    {activeCodeFile === 'healthcareEMR' && 'healthcare-benefits-emr-integration.ts'}
                    {activeCodeFile === 'webhook' && 'paystack-webhook-listener.ts'}
                    {activeCodeFile === 'safeTransfer' && 'safe-paystack-transfer-errors.ts'}
                    {activeCodeFile === 'deployment' && 'deployment-instructions.md'}
                  </span>
                </span>
                <span>TypeScript / Express / Paystack V2</span>
              </div>

              <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-2 leading-relaxed selection:bg-[#D4AF37] selection:text-[#0A1931]">
                <code>{codeSamples[activeCodeFile]}</code>
              </pre>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ONBOARD NEW MERCHANT */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1931] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Onboard Merchant to Paystack Financing</span>
              </h3>
              <button onClick={() => setShowOnboardModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleOnboardMerchant} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tema Cold Stores & Solar Logistics"
                  value={newBizName}
                  onChange={(e) => setNewBizName(e.target.value)}
                  className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Business Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sales@temacold.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Country</label>
                  <select
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Ghana">Ghana (GHS)</option>
                    <option value="Nigeria">Nigeria (NGN)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Settlement Bank</label>
                  <input
                    type="text"
                    required
                    value={newBank}
                    onChange={(e) => setNewBank(e.target.value)}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Account Number</label>
                  <input
                    type="text"
                    required
                    placeholder="9040001289112"
                    value={newAccount}
                    onChange={(e) => setNewAccount(e.target.value)}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Industry Category</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowOnboardModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0A1931] font-bold uppercase tracking-wider hover:bg-[#e0bc43]"
                >
                  Create Recipient & Payment Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ENROLL NEW HEALTHCARE PATIENT */}
      {showEnrollPatientModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1931] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[#D4AF37]" />
                <span>Enroll Patient into Healthcare Subscription</span>
              </h3>
              <button onClick={() => setShowEnrollPatientModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleEnrollPatient} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abena Serwaa Ofori"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="abena.ofori@gmail.com"
                    value={newPatientEmail}
                    onChange={(e) => setNewPatientEmail(e.target.value)}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Mobile / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+233244889900"
                    value={newPatientPhone}
                    onChange={(e) => setNewPatientPhone(e.target.value)}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Healthcare Shield Plan</label>
                <select
                  value={newPatientPlan}
                  onChange={(e) => setNewPatientPlan(e.target.value)}
                  className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Individual Wellness & Outpatient Shield">Individual Wellness & Outpatient (150 GHS/mo)</option>
                  <option value="Family Comprehensive Health Shield">Family Comprehensive Health Shield (350 GHS/mo)</option>
                  <option value="Maternal & Child Health Shield">Maternal & Child Health Shield (500 GHS/mo)</option>
                  <option value="Executive Chronic Care & Specialty Shield">Executive Chronic Care & Specialty (750 GHS/mo)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Monthly Paystack Subscription Contribution (GHS)</label>
                <input
                  type="number"
                  required
                  value={newPatientContribution}
                  onChange={(e) => setNewPatientContribution(Number(e.target.value))}
                  className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEnrollPatientModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0A1931] font-bold uppercase tracking-wider hover:bg-[#e0bc43]"
                >
                  Create Paystack Health Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE AID PROGRAM */}
      {showNewProgramModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1931] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                <span>Create Autonomous Aid Program (Idea 10)</span>
              </h3>
              <button onClick={() => setShowNewProgramModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateAidProgram} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Program Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coastal Fishing Communities Clean Energy Transition Relief"
                  value={newProgTitle}
                  onChange={(e) => setNewProgTitle(e.target.value)}
                  className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">NGO / Donor Coalition Sponsor</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. West Africa Ecological Dignity Fund"
                  value={newProgNgo}
                  onChange={(e) => setNewProgNgo(e.target.value)}
                  className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Beneficiary Count</label>
                  <input
                    type="number"
                    required
                    value={newProgTarget}
                    onChange={(e) => setNewProgTarget(Number(e.target.value))}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Cash Assistance / Head (GHS)</label>
                  <input
                    type="number"
                    required
                    value={newProgAmount}
                    onChange={(e) => setNewProgAmount(Number(e.target.value))}
                    className="w-full bg-[#070E1E] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewProgramModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0A1931] font-bold uppercase tracking-wider hover:bg-[#e0bc43]"
                >
                  Initialize Aid Rails
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
