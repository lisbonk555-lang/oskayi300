export type UserRole = 'BUYER' | 'MERCHANT' | 'ADMIN' | 'SUPPORT' | 'INSURANCE_PROVIDER';

export type ProductType = 'PHYSICAL' | 'DIGITAL' | 'SERVICE';

export type ProtectionEligibility = 'ELIGIBLE' | 'INELIGIBLE' | 'REQUIRES_INSPECTION';

export type MerchantStatus = 'PENDING_REVIEW' | 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'SUSPENDED' | 'REJECTED';

export type OrderStatus = 
  | 'CREATED'
  | 'PAYMENT_PENDING' 
  | 'PAID' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'COMPLETED' 
  | 'CANCELLED' 
  | 'REFUND_PENDING'
  | 'REFUNDED' 
  | 'DISPUTED' 
  | 'CLAIM_OPEN' 
  | 'CLAIM_RESOLVED';

export type PaymentStatus = 
  | 'ORDER_CREATED' 
  | 'PAYMENT_INITIALIZED' 
  | 'PAYMENT_PENDING' 
  | 'PAYMENT_SUCCESS' 
  | 'PAYMENT_FAILED' 
  | 'PAYMENT_ABANDONED' 
  | 'REFUNDED' 
  | 'PARTIALLY_REFUNDED';

export type ProtectionStatus = 
  | 'PROTECTION_REQUESTED'
  | 'POLICY_PENDING'
  | 'ACTIVE'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'CLAIM_IN_PROGRESS'
  | 'CLAIM_RESOLVED'
  | 'ELIGIBILITY_CHECK' 
  | 'QUOTE_REQUESTED' 
  | 'QUOTE_RECEIVED' 
  | 'CUSTOMER_DECLINED' 
  | 'PURCHASE_PENDING' 
  | 'POLICY_REQUESTED' 
  | 'POLICY_ACTIVE' 
  | 'POLICY_FAILED' 
  | 'POLICY_CANCELLED' 
  | 'CLAIM_OPEN' 
  | 'CLAIM_PROCESSING';

export type ClaimType = 
  | 'ITEM_NOT_RECEIVED' 
  | 'ITEM_DAMAGED' 
  | 'WRONG_ITEM' 
  | 'MATERIALLY_DIFFERENT' 
  | 'DELIVERY_INCIDENT' 
  | 'OTHER_ELIGIBLE_EVENT';

export type ClaimStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'PROCESSING'
  | 'EVIDENCE_REQUIRED' 
  | 'OFFERED'
  | 'APPROVED' 
  | 'REJECTED' 
  | 'SETTLED' 
  | 'CLOSED'
  | 'ELIGIBILITY_CHECK' 
  | 'SENT_TO_PROVIDER' 
  | 'UNDER_REVIEW' 
  | 'PARTIALLY_APPROVED' 
  | 'SETTLEMENT_PENDING';

export type RiskLevel = 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK';

export interface SettlementAccount {
  type: 'MOBILE_MONEY' | 'BANK_ACCOUNT';
  networkOrBank: string; // e.g. MTN MoMo, Telecel Cash, AT Money, GCB, Ecobank
  accountNumber: string;
  accountName: string;
}

export interface DischargeVoucher {
  id: string;
  claimId: string;
  voucherNumber: string;
  amountRequested: number;
  amountOffered: number;
  currency: string;
  status: 'PENDING_BUYER_ACCEPTANCE' | 'ACCEPTED' | 'REJECTED' | 'DISBURSED';
  issuedAt: string;
  underwriterTerms: string;
  responseNote?: string;
}

export interface WebhookEventRecord {
  id: string;
  provider: 'PAYSTACK' | 'CURACEL' | 'DELIVERY';
  eventType: string;
  eventReference: string;
  payloadHash: string;
  receivedAt: string;
  processedAt?: string;
  processingStatus: 'RECEIVED' | 'PROCESSED' | 'FAILED' | 'DUPLICATE_IGNORED';
  errorMessage?: string;
  rawSummary?: string;
}

export interface InsuranceProduct {
  providerProductCode: string;
  productName: string;
  productType: string;
  coverageDescription: string;
  premiumRatePct: number;
  currency: string;
  minimumAssetValueGHS: number;
  maximumAssetValueGHS: number;
  terms: string;
  exclusions: string[];
  eligibility: string;
  insurer: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastSyncedAt: string;
}

export interface MerchantLedger {
  merchantId: string;
  currency: string;
  grossSalesPesewas: number;
  grossSalesGHS: number;
  refundsPesewas: number;
  refundsGHS: number;
  marketplaceFeesPesewas: number;
  marketplaceFeesGHS: number;
  netMerchantPesewas: number;
  netMerchantGHS: number;
  pendingPayoutPesewas: number;
  pendingPayoutGHS: number;
  paidPayoutPesewas: number;
  paidPayoutGHS: number;
  verifiedOrdersCount: number;
}

export interface Merchant {
  id: string;
  storeName: string;
  slug: string;
  ownerName: string;
  email: string;
  phone: string;
  country: string;
  city?: string;
  sellType?: 'Products' | 'Services' | 'Both' | string;
  businessType?: string;
  address?: string;
  category: string;
  description?: string;
  payoutAccount?: string;
  status: MerchantStatus;
  verifiedAt?: string;
  createdAt: string;
  rating?: number;
  totalSalesCount?: number;
  ledger?: MerchantLedger;
}

export interface Product {
  id: string;
  merchantId: string;
  merchantName: string;
  merchantCountry: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  productType: ProductType;
  price: number; // in GHS
  pricePesewas?: number; // stored in smallest unit: 1 GHS = 100 pesewas
  priceUsd?: number;
  currency: 'GHS' | 'USD' | 'NGN' | 'KES' | string;
  stock: number;
  sku: string;
  images: string[];
  shippingInfo: string;
  deliveryLocation?: string;
  country: string;
  protectionEligibility: ProtectionEligibility;
  protectionRatePct: number; // e.g. 3.5% of product price
  protectionTermsSummary?: string;
  providerProductCode?: string;
  canMakeClaimExplainer?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedProtection: boolean;
  calculatedProtectionFee: number;
}

export interface ProtectionRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  buyerEmail: string;
  buyerName: string;
  merchantId: string;
  productId: string;
  productTitle: string;
  provider: 'Curacel Grow' | 'Integrated Underwriter' | string;
  insurerName: string;
  providerPolicyRef?: string;
  providerProductCode?: string;
  premiumAmount: number;
  premiumPesewas?: number;
  insuredValue: number;
  insuredValuePesewas?: number;
  currency: string;
  coverageDetails: {
    maxCoverage: number;
    terms: string;
    durationDays: number;
    exclusions: string[];
    insurerIdentity: string;
    regulatoryNotice: string;
  };
  policyStatus: ProtectionStatus;
  startDate?: string;
  endDate?: string;
  claimId?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  price: number;
  quantity: number;
  hasProtection: boolean;
  protectionFee: number;
  sku: string;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    region: string;
    country: string;
    postalCode?: string;
  };
  merchantId: string;
  merchantName: string;
  items: OrderItem[];
  subtotal: number;
  subtotalPesewas?: number;
  deliveryFee: number;
  deliveryFeePesewas?: number;
  protectionTotal: number;
  protectionTotalPesewas?: number;
  totalAmount: number;
  totalAmountPesewas?: number;
  currency: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  paymentChannel?: string;
  protectionRecordId?: string;
  hasProtection: boolean;
  createdAt: string;
  updatedAt: string;
  riskLevel: RiskLevel;
  auditTimeline: {
    timestamp: string;
    status: string;
    note: string;
  }[];
}

export interface Claim {
  id: string;
  claimNumber: string;
  orderId: string;
  orderNumber: string;
  protectionId: string;
  policyNumber?: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  merchantId: string;
  productTitle: string;
  claimType: ClaimType;
  description: string;
  incidentDate: string;
  evidenceNotes: string;
  evidenceAttachments: string[];
  settlementAccount?: SettlementAccount;
  dischargeVoucher?: DischargeVoucher;
  status: ClaimStatus;
  providerClaimRef?: string;
  requestedAmount: number;
  approvedSettlementAmount?: number;
  rejectionReason?: string;
  merchantResponse?: string;
  createdAt: string;
  updatedAt: string;
  timeline: {
    timestamp: string;
    status: string;
    note: string;
  }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  resourceId: string;
  metadata?: Record<string, any>;
}

export interface IntegrationHealthStatus {
  payment: {
    provider: string;
    status: 'CONFIGURED' | 'NOT_CONFIGURED' | 'ERROR';
    mode: 'PRODUCTION' | 'DEVELOPMENT_SANDBOX';
    publicKeyConfigured: boolean;
    secretKeyConfigured: boolean;
    webhookSecretConfigured: boolean;
    lastPingStatus?: 'SUCCESS' | 'FAILED' | 'PENDING';
    lastPingLatencyMs?: number;
    lastPingTime?: string;
  };
  insurance: {
    provider: string;
    status: 'CONFIGURED' | 'NOT_CONFIGURED' | 'ERROR';
    mode: 'PRODUCTION' | 'DEVELOPMENT_SANDBOX';
    clientIdConfigured: boolean;
    clientSecretConfigured: boolean;
    webhookSecretConfigured: boolean;
    lastPingStatus?: 'SUCCESS' | 'FAILED' | 'PENDING';
    lastPingLatencyMs?: number;
    lastPingTime?: string;
  };
  database: {
    status: 'CONNECTED' | 'ERROR';
    activeEntities: {
      merchants: number;
      products: number;
      orders: number;
      claims: number;
      protectionPolicies: number;
      webhookEvents: number;
    };
  };
  webhooks: {
    paymentUrl: string;
    insuranceUrl: string;
    claimsUrl: string;
    deliveryUrl: string;
    totalReceived: number;
    successful: number;
    failed: number;
    duplicatesIgnored: number;
    lastReceivedAt?: string;
  };
  paystack?: any;
  curacel?: any;
  storage?: {
    status: 'CONFIGURED' | 'LOCAL_OBJECT_ADAPTER';
  };
}

export interface MarketplaceConfig {
  minimumListingPriceGHS: number;
  defaultPlatformFeePct: number;
  defaultProtectionRatePct: number;
  supportedCurrencies: string[];
  supportedCountries: string[];
  enabledCategories: string[];
}

