import {
  CreditProviderModel,
  GasSponsorModel,
  InsuranceProviderModel,
  CreditApplicationRecord,
  CreditAgreementRecord,
  GasSponsorshipRecord,
  InsurancePolicyRecord,
  InsuranceClaimRecord,
  CreditOrderRecord,
  MoneyBreakdown,
  SystemEnvironmentMode
} from '../types/creditCheckout';
import {
  OFFICIAL_CREDIT_PROVIDERS,
  OFFICIAL_GAS_SPONSORS,
  OFFICIAL_INSURANCE_PROVIDERS
} from '../data/creditCheckoutData';

/**
 * 1. CreditProviderAdapter
 * Abstraction layer for regulated third-party credit providers.
 */
export class CreditProviderAdapter {
  static async submitApplication(data: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    nationalIdNumber: string;
    merchantId: string;
    productId: string;
    requestedAmountGHS: number;
    tenorMonths: number;
    providerId: string;
    mode: SystemEnvironmentMode;
  }): Promise<{ success: boolean; application: CreditApplicationRecord; message: string }> {
    const res = await fetch('/api/credit-checkout/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to submit application' }));
      throw new Error(err.error || 'Credit provider application failed.');
    }
    return res.json();
  }

  static async getApplicationStatus(applicationId: string): Promise<CreditApplicationRecord> {
    const res = await fetch(`/api/credit-checkout/applications/${encodeURIComponent(applicationId)}`);
    if (!res.ok) throw new Error('Application status lookup failed.');
    const data = await res.json();
    return data.application;
  }

  static async acceptOffer(applicationId: string, offerId: string): Promise<{ success: boolean; agreement: CreditAgreementRecord }> {
    const res = await fetch(`/api/credit-checkout/applications/${encodeURIComponent(applicationId)}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offerId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to accept offer' }));
      throw new Error(err.error || 'Offer acceptance failed.');
    }
    return res.json();
  }

  static async getCreditAgreement(agreementId: string): Promise<CreditAgreementRecord> {
    const res = await fetch(`/api/credit-checkout/agreements/${encodeURIComponent(agreementId)}`);
    if (!res.ok) throw new Error('Agreement lookup failed.');
    const data = await res.json();
    return data.agreement;
  }

  static async recordRepayment(agreementId: string, installmentNumber: number, amountGHS: number, paymentMethod: string): Promise<any> {
    const res = await fetch(`/api/credit-checkout/agreements/${encodeURIComponent(agreementId)}/repay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ installmentNumber, amountGHS, paymentMethod })
    });
    if (!res.ok) throw new Error('Repayment processing failed.');
    return res.json();
  }
}

/**
 * 2. GasSponsorAdapter
 * Abstraction for ERC-4337 / Paymaster independent gas sponsorship.
 */
export class GasSponsorAdapter {
  static async estimateGas(params: {
    chain: string;
    walletAddress: string;
    txType: string;
  }): Promise<{ estimatedGasWei: string; estimatedGasGHS: number; estimatedGasUSD: number }> {
    const res = await fetch('/api/credit-checkout/gas/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error('Gas estimation failed.');
    return res.json();
  }

  static async requestSponsorship(params: {
    sponsorId: string;
    orderId: string;
    walletAddress: string;
    chain: string;
    chainId: number;
  }): Promise<{ success: boolean; sponsorship: GasSponsorshipRecord; message: string }> {
    const res = await fetch('/api/credit-checkout/gas/sponsor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Gas sponsorship request failed' }));
      throw new Error(err.error || 'Gas sponsor unavailable.');
    }
    return res.json();
  }

  static async submitSponsoredTransaction(params: {
    sponsorshipId: string;
    userOpSignature: string;
  }): Promise<{ success: boolean; txHash: string; status: string; blockNumber: number }> {
    const res = await fetch('/api/credit-checkout/gas/submit-tx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Sponsored transaction execution failed' }));
      throw new Error(err.error || 'Sponsored transaction execution failed.');
    }
    return res.json();
  }
}

/**
 * 3. InsuranceProviderAdapter
 * Abstraction for licensed Underwriters (Curacel / Sanlam).
 */
export class InsuranceProviderAdapter {
  static async getProducts(): Promise<{ products: any[] }> {
    const res = await fetch('/api/credit-checkout/insurance/products');
    if (!res.ok) throw new Error('Failed to retrieve insurance products.');
    return res.json();
  }

  static async getQuote(params: {
    productCode: string;
    insuredAmountGHS: number;
    tenorMonths: number;
  }): Promise<{ premiumAmountGHS: number; ratePct: number; terms: any }> {
    const res = await fetch('/api/credit-checkout/insurance/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error('Insurance quote calculation failed.');
    return res.json();
  }

  static async purchasePolicy(params: {
    productCode: string;
    orderId: string;
    creditAgreementId: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    insuredAmountGHS: number;
    premiumAmountGHS: number;
  }): Promise<{ success: boolean; policy: InsurancePolicyRecord }> {
    const res = await fetch('/api/credit-checkout/insurance/policies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error('Policy binding failed.');
    return res.json();
  }

  static async submitClaim(formData: {
    policyNumber: string;
    claimantName: string;
    claimantContact: string;
    eventType: string;
    incidentDate: string;
    description: string;
    evidenceFiles: string[];
    claimedAmountGHS: number;
  }): Promise<{ success: boolean; claim: InsuranceClaimRecord; message: string }> {
    const res = await fetch('/api/credit-checkout/insurance/claims', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Claim submission failed' }));
      throw new Error(err.error || 'Failed to submit claim to underwriter.');
    }
    return res.json();
  }

  static async getClaimStatus(claimNumber: string): Promise<InsuranceClaimRecord> {
    const res = await fetch(`/api/credit-checkout/insurance/claims/${encodeURIComponent(claimNumber)}`);
    if (!res.ok) throw new Error('Claim record not found.');
    const data = await res.json();
    return data.claim;
  }
}

/**
 * 4. Payment & Order Settlement Engine
 */
export class CreditOrderEngine {
  static async createOrder(orderPayload: Partial<CreditOrderRecord>): Promise<{ success: boolean; order: CreditOrderRecord }> {
    const res = await fetch('/api/credit-checkout/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) throw new Error('Order creation failed.');
    return res.json();
  }

  static async getOrders(query?: { customerEmail?: string; merchantId?: string }): Promise<CreditOrderRecord[]> {
    let url = '/api/credit-checkout/orders';
    const params = new URLSearchParams();
    if (query?.customerEmail) params.append('customerEmail', query.customerEmail);
    if (query?.merchantId) params.append('merchantId', query.merchantId);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Orders query failed.');
    const data = await res.json();
    return data.orders || [];
  }

  static async getOrderDetails(orderId: string): Promise<CreditOrderRecord> {
    const res = await fetch(`/api/credit-checkout/orders/${encodeURIComponent(orderId)}`);
    if (!res.ok) throw new Error('Order not found.');
    const data = await res.json();
    return data.order;
  }
}
