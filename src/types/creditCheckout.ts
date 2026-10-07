export type SystemEnvironmentMode = 'SANDBOX' | 'PRODUCTION';

export type CreditCheckoutTab =
  | 'CHECKOUT'
  | 'REPAYMENTS'
  | 'PROTECTION_CLAIMS'
  | 'MERCHANT_PORTAL'
  | 'GOVERNANCE'
  | 'HEALTH'
  | 'ZERO_GAS_RAILS';

export type ProviderConnectionStatus = 'CONNECTED' | 'LIVE' | 'DEGRADED' | 'OFFLINE' | 'NOT_CONFIGURED';

export type TransactionLifecycleState =
  | 'APPLICATION_STARTED'
  | 'CREDIT_PENDING'
  | 'CREDIT_APPROVED'
  | 'CREDIT_DECLINED'
  | 'INSURANCE_QUOTED'
  | 'INSURANCE_PURCHASED'
  | 'GAS_SPONSORSHIP_REQUESTED'
  | 'GAS_SPONSORSHIP_APPROVED'
  | 'TRANSACTION_SIGNING_REQUIRED'
  | 'TRANSACTION_SUBMITTED'
  | 'TRANSACTION_CONFIRMED'
  | 'MERCHANT_SETTLEMENT_PENDING'
  | 'MERCHANT_SETTLED'
  | 'REPAYMENT_ACTIVE';

export type ClaimStatus =
  | 'CLAIM_SUBMITTED'
  | 'CLAIM_UNDER_REVIEW'
  | 'MORE_INFORMATION_REQUIRED'
  | 'APPROVED'
  | 'DECLINED'
  | 'SETTLED';

export interface MoneyBreakdown {
  currency: string;
  productAmount: number;
  creditAmount: number;
  insurancePremium: number;
  gasSponsorshipAmount: number;
  merchantSettlementAmount: number;
  oskayiTechFee: number;
  totalCustomerObligation: number;
  monthlyRepayment: number;
  repaymentTermMonths: number;
  interestRateAnnualPct: number;
}

export interface CreditProviderModel {
  providerId: string;
  legalName: string;
  brandName: string;
  supportedCountry: string;
  supportedCurrency: string;
  regulatoryStatus: string;
  regulatorName: string;
  licenseNumber: string;
  apiStatus: ProviderConnectionStatus;
  supportedCreditProducts: Array<{
    productCode: string;
    productName: string;
    minCreditGHS: number;
    maxCreditGHS: number;
    minDurationMonths: number;
    maxDurationMonths: number;
    interestRateAnnualPct: number;
    originationFeePct: number;
    underwritingRequirements: string[];
  }>;
  underwritingModel: string;
  endpointUrl: string;
  lastHealthCheck?: string;
  lastLatencyMs?: number;
}

export interface GasSponsorModel {
  sponsorId: string;
  sponsorName: string;
  sponsorType: 'PAYMASTER' | 'ERC4337_BUNDLER' | 'INSTITUTIONAL_SPONSOR';
  supportedChain: string;
  chainId: number;
  supportedTokens: string[];
  maxSponsorshipPerTxGHS: number;
  dailyLimitGHS: number;
  spentTodayGHS: number;
  sponsorshipStatus: ProviderConnectionStatus;
  paymasterContractAddress: string;
  sponsorSettlementMethod: string;
  legalDisclosure: string;
  lastHealthCheck?: string;
}

export interface InsuranceProviderModel {
  providerId: string;
  legalName: string;
  brandName: string;
  regulatoryStatus: string;
  licenseNumber: string;
  supportedCountry: string;
  apiStatus: ProviderConnectionStatus;
  products: Array<{
    productCode: string;
    productName: string;
    productType: 'CREDIT_LIFE' | 'PAYMENT_PROTECTION' | 'JOB_LOSS_DISABILITY';
    premiumRatePct: number;
    insuredEventTypes: Array<{
      eventCode: string;
      label: string;
      description: string;
      requiredDocuments: string[];
    }>;
    exclusions: string[];
    waitingPeriodDays: number;
    claimProcedure: string;
    termsSummary: string;
  }>;
}

export interface CreditApplicationRecord {
  id: string;
  applicationNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  nationalIdNumber: string;
  merchantId: string;
  merchantName: string;
  productId: string;
  productTitle: string;
  productPriceGHS: number;
  requestedCreditAmountGHS: number;
  requestedTenorMonths: number;
  creditProviderId: string;
  creditProviderName: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'DECLINED' | 'AGREEMENT_ACCEPTED';
  createdAt: string;
  reviewedAt?: string;
  declineReason?: string;
  approvedOffer?: {
    offerId: string;
    approvedPrincipalGHS: number;
    interestRateAnnualPct: number;
    monthlyInstallmentGHS: number;
    totalPayableGHS: number;
    tenorMonths: number;
    originationFeeGHS: number;
    firstDueDate: string;
    agreementDocumentUrl: string;
  };
}

export interface CreditAgreementRecord {
  agreementId: string;
  agreementNumber: string;
  applicationId: string;
  customerId: string;
  customerName: string;
  creditProviderId: string;
  creditProviderName: string;
  principalAmountGHS: number;
  totalRepaymentGHS: number;
  monthlyPaymentGHS: number;
  tenorMonths: number;
  interestRateAnnualPct: number;
  signedAt: string;
  agreementStatus: 'ACTIVE' | 'SETTLED' | 'DEFAULTED' | 'DISCHARGED';
  repaymentSchedule: Array<{
    installmentNumber: number;
    dueDate: string;
    principalGHS: number;
    interestGHS: number;
    totalDueGHS: number;
    amountPaidGHS: number;
    status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CLAIM_SETTLED';
    paidAt?: string;
    receiptRef?: string;
  }>;
}

export interface GasSponsorshipRecord {
  sponsorshipId: string;
  sponsorId: string;
  sponsorName: string;
  orderId: string;
  walletAddress: string;
  chain: string;
  chainId: number;
  estimatedGasWei: string;
  gasSponsoredGHS: number;
  gasSponsoredUSD: number;
  paymasterAddress: string;
  userOpHash?: string;
  txHash?: string;
  status: 'REQUESTED' | 'APPROVED' | 'SUBMITTED' | 'CONFIRMED' | 'FAILED';
  requestedAt: string;
  confirmedAt?: string;
  legalNotice: string;
}

export interface InsurancePolicyRecord {
  policyId: string;
  policyNumber: string;
  insurerId: string;
  insurerName: string;
  productCode: string;
  productName: string;
  orderId: string;
  creditAgreementId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  insuredAmountGHS: number;
  premiumAmountGHS: number;
  startDate: string;
  endDate: string;
  policyStatus: 'ACTIVE' | 'EXPIRED' | 'CLAIM_SUBMITTED' | 'CLAIM_PAID' | 'CANCELLED';
  coveredEvents: string[];
  exclusions: string[];
  claimInstructions: string;
  createdAt: string;
}

export interface InsuranceClaimRecord {
  claimId: string;
  claimNumber: string;
  policyId: string;
  policyNumber: string;
  insurerId: string;
  insurerName: string;
  claimantName: string;
  claimantContact: string;
  eventType: string;
  incidentDate: string;
  description: string;
  evidenceFiles: string[];
  claimedAmountGHS: number;
  status: ClaimStatus;
  submittedAt: string;
  updatedAt: string;
  reviewNotes?: string;
  settlementDetails?: {
    settlementAmountGHS: number;
    settledToCreditProvider: string;
    settlementDate: string;
    referenceCode: string;
  };
  timeline: Array<{
    timestamp: string;
    status: ClaimStatus;
    note: string;
  }>;
}

export interface CreditOrderRecord {
  orderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  merchantId: string;
  merchantName: string;
  productId: string;
  productTitle: string;
  productPriceGHS: number;
  paymentMode: 'BUY_WITH_CREDIT' | 'PAY_NOW';
  lifecycleState: TransactionLifecycleState;
  moneyBreakdown: MoneyBreakdown;
  creditProviderId?: string;
  creditAgreementId?: string;
  gasSponsorshipId?: string;
  insurancePolicyId?: string;
  blockchainTxHash?: string;
  merchantSettlementStatus: 'PENDING' | 'INITIATED' | 'SETTLED' | 'FAILED';
  merchantSettlementRef?: string;
  settledAt?: string;
  createdAt: string;
  updatedAt: string;
  timeline: Array<{
    state: TransactionLifecycleState;
    timestamp: string;
    description: string;
  }>;
}

export interface WebhookEventRecord {
  id: string;
  source: 'CREDIT_PROVIDER' | 'INSURANCE_PROVIDER' | 'GAS_SPONSOR' | 'PAYMENT_GATEWAY' | 'BLOCKCHAIN_RPC';
  eventType: string;
  eventReference: string;
  signatureVerified: boolean;
  processingStatus: 'PROCESSED' | 'DUPLICATE_IGNORED' | 'FAILED' | 'UNAUTHORIZED';
  payloadSummary: string;
  receivedAt: string;
  processedAt?: string;
}

export interface IntegrationHealthReport {
  timestamp: string;
  environmentMode: SystemEnvironmentMode;
  services: {
    database: {
      name: string;
      status: ProviderConnectionStatus;
      latencyMs: number;
      recordsCount: number;
      details: string;
    };
    creditProviders: {
      name: string;
      status: ProviderConnectionStatus;
      connectedProvidersCount: number;
      activeProviders: string[];
      lastPingMs: number;
    };
    gasSponsors: {
      name: string;
      status: ProviderConnectionStatus;
      activePaymastersCount: number;
      chainsSupported: string[];
      lastPingMs: number;
    };
    insuranceProviders: {
      name: string;
      status: ProviderConnectionStatus;
      activeUnderwritersCount: number;
      productsAvailableCount: number;
      lastPingMs: number;
    };
    paymentGateways: {
      name: string;
      status: ProviderConnectionStatus;
      currency: string;
      mode: string;
      lastPingMs: number;
    };
    blockchainRpc: {
      name: string;
      status: ProviderConnectionStatus;
      blockHeight: number;
      chain: string;
      lastPingMs: number;
    };
    walletAccountAbstraction: {
      name: string;
      status: ProviderConnectionStatus;
      bundlerOperational: boolean;
      lastPingMs: number;
    };
  };
}
