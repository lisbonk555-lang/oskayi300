export type UserRole = 'BUYER' | 'MERCHANT' | 'ADMIN' | 'SUPPORT' | 'INSURANCE_PROVIDER';

export type ProductType = 'PHYSICAL' | 'DIGITAL' | 'SERVICE';

export type ProtectionEligibility = 'ELIGIBLE' | 'INELIGIBLE' | 'REQUIRES_INSPECTION';

export type MerchantStatus = 'PENDING_REVIEW' | 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'SUSPENDED' | 'REJECTED';

export type OrderStatus = 
  | 'PENDING_PAYMENT' 
  | 'PAID' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'COMPLETED' 
  | 'CANCELLED' 
  | 'REFUND_REQUESTED' 
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
  | 'CLAIM_PROCESSING' 
  | 'CLAIM_RESOLVED';

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
  | 'ELIGIBILITY_CHECK' 
  | 'EVIDENCE_REQUIRED' 
  | 'SENT_TO_PROVIDER' 
  | 'UNDER_REVIEW' 
  | 'APPROVED' 
  | 'PARTIALLY_APPROVED' 
  | 'REJECTED' 
  | 'SETTLEMENT_PENDING' 
  | 'SETTLED' 
  | 'CLOSED';

export type RiskLevel = 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK';

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
  buyerEmail: string;
  buyerName: string;
  merchantId: string;
  productId: string;
  productTitle: string;
  provider: 'Curacel Grow' | 'Integrated Underwriter';
  providerPolicyRef?: string;
  premiumAmount: number;
  currency: string;
  coverageDetails: {
    maxCoverage: number;
    terms: string;
    durationDays: number;
    exclusions: string[];
  };
  policyStatus: ProtectionStatus;
  startDate?: string;
  endDate?: string;
  claimId?: string;
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
  deliveryFee: number;
  protectionTotal: number;
  totalAmount: number;
  currency: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
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
  buyerName: string;
  buyerEmail: string;
  merchantId: string;
  productTitle: string;
  claimType: ClaimType;
  description: string;
  incidentDate: string;
  evidenceNotes: string;
  evidenceAttachments: string[];
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
  paystack: {
    configured: boolean;
    mode: 'PRODUCTION' | 'DEVELOPMENT_SANDBOX';
    publicKeyConfigured: boolean;
    secretKeyConfigured: boolean;
    lastPing?: string;
  };
  curacel: {
    configured: boolean;
    mode: 'PRODUCTION' | 'DEVELOPMENT_SANDBOX';
    clientIdConfigured: boolean;
    clientSecretConfigured: boolean;
    lastPing?: string;
  };
  database: {
    status: 'CONNECTED' | 'ERROR';
    activeEntities: number;
  };
  storage: {
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
