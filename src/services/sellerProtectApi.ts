import { Product, Merchant, Order, Claim, ProtectionRecord, IntegrationHealthStatus } from '../types/sellerProtect';

export const sellerProtectApi = {
  // Products
  async getProducts(params?: { category?: string; search?: string; country?: string; protectionOnly?: boolean; merchantId?: string; admin?: boolean }) {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.country) query.append('country', params.country);
    if (params?.protectionOnly) query.append('protectionOnly', 'true');
    if (params?.merchantId) query.append('merchantId', params.merchantId);
    if (params?.admin) query.append('admin', 'true');

    const res = await fetch(`/api/seller-protect/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async createProduct(productData: Partial<Product>) {
    const res = await fetch('/api/seller-protect/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create product');
    }
    return res.json();
  },

  async updateProduct(productId: string, updates: Partial<Product>) {
    const res = await fetch(`/api/seller-protect/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update product');
    }
    return res.json();
  },

  async deleteProduct(productId: string) {
    const res = await fetch(`/api/seller-protect/products/${productId}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete product');
    }
    return res.json();
  },

  // Merchants
  async getMerchants() {
    const res = await fetch('/api/seller-protect/merchants');
    if (!res.ok) throw new Error('Failed to fetch merchants');
    return res.json();
  },

  async registerMerchant(merchantData: Partial<Merchant>) {
    const res = await fetch('/api/seller-protect/merchants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merchantData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to register merchant');
    }
    return res.json();
  },

  async updateMerchantStatus(merchantId: string, status: string) {
    const res = await fetch(`/api/seller-protect/merchants/${merchantId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update merchant status');
    return res.json();
  },

  // Protection & Insurance Products (Curacel Grow)
  async getInsuranceProducts(): Promise<{ success: boolean; products: any[]; provider: string; status: string }> {
    const res = await fetch('/api/seller-protect/insurance/products');
    if (!res.ok) throw new Error('Failed to fetch insurance products');
    return res.json();
  },

  async getProtectionQuote(items: { productId: string; price: number; quantity: number }[], currency = 'GHS') {
    const res = await fetch('/api/seller-protect/protection/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, currency })
    });
    if (!res.ok) throw new Error('Failed to get protection quotation');
    return res.json();
  },

  async getBuyerProtectionPolicies(buyerEmail?: string) {
    const query = buyerEmail ? `?buyerEmail=${encodeURIComponent(buyerEmail)}` : '';
    const res = await fetch(`/api/seller-protect/protection/policies${query}`);
    if (!res.ok) throw new Error('Failed to fetch protection policies');
    return res.json();
  },

  // Payments (Paystack)
  async initializePayment(payload: { email: string; amount: number; currency?: string; orderDetails?: any }) {
    const res = await fetch('/api/seller-protect/payments/initialize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to initialize payment');
    }
    return res.json();
  },

  async verifyPayment(reference: string) {
    const res = await fetch(`/api/seller-protect/payments/verify/${encodeURIComponent(reference)}`);
    if (!res.ok) throw new Error('Failed to verify payment');
    return res.json();
  },

  // Orders
  async createOrder(orderPayload: any) {
    const res = await fetch('/api/seller-protect/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create order');
    }
    return res.json();
  },

  async getOrders(params?: { buyerEmail?: string; merchantId?: string }) {
    const query = new URLSearchParams();
    if (params?.buyerEmail) query.append('buyerEmail', params.buyerEmail);
    if (params?.merchantId) query.append('merchantId', params.merchantId);

    const res = await fetch(`/api/seller-protect/orders?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  async getOrderById(orderId: string) {
    const res = await fetch(`/api/seller-protect/orders/${orderId}`);
    if (!res.ok) throw new Error('Failed to fetch order details');
    return res.json();
  },

  async updateOrderStatus(orderId: string, orderStatus: string, note?: string) {
    const res = await fetch(`/api/seller-protect/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus, note })
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return res.json();
  },

  // Claims
  async submitClaim(claimPayload: any) {
    const res = await fetch('/api/seller-protect/claims', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(claimPayload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit claim');
    }
    return res.json();
  },

  async getClaims(params?: { buyerEmail?: string; merchantId?: string }) {
    const query = new URLSearchParams();
    if (params?.buyerEmail) query.append('buyerEmail', params.buyerEmail);
    if (params?.merchantId) query.append('merchantId', params.merchantId);

    const res = await fetch(`/api/seller-protect/claims?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch claims');
    return res.json();
  },

  async updateClaimStatus(claimId: string, statusPayload: { status: string; approvedAmount?: number; note?: string; rejectionReason?: string; voucherOffer?: number }) {
    const res = await fetch(`/api/seller-protect/claims/${claimId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statusPayload)
    });
    if (!res.ok) throw new Error('Failed to update claim status');
    return res.json();
  },

  async respondToDischargeVoucher(claimId: string, voucherId: string, response: 'ACCEPT' | 'REJECT', note?: string) {
    const res = await fetch(`/api/seller-protect/claims/${claimId}/voucher-response`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voucherId, response, note })
    });
    if (!res.ok) throw new Error('Failed to respond to discharge voucher');
    return res.json();
  },

  // Merchant Ledger
  async getMerchantLedger(merchantId: string) {
    const res = await fetch(`/api/seller-protect/merchants/${merchantId}/ledger`);
    if (!res.ok) throw new Error('Failed to fetch merchant ledger');
    return res.json();
  },

  // Health, Pings & Admin
  async getIntegrationHealth(): Promise<IntegrationHealthStatus> {
    const res = await fetch('/api/seller-protect/health/integrations');
    if (!res.ok) throw new Error('Failed to fetch integration health');
    return res.json();
  },

  async pingPaymentGateway(): Promise<{ success: boolean; latencyMs: number; status: string; message: string; timestamp: string }> {
    const res = await fetch('/api/seller-protect/health/ping-payment', { method: 'POST' });
    return res.json();
  },

  async pingInsuranceGateway(): Promise<{ success: boolean; latencyMs: number; status: string; message: string; timestamp: string }> {
    const res = await fetch('/api/seller-protect/health/ping-insurance', { method: 'POST' });
    return res.json();
  },

  async getWebhookEvents() {
    const res = await fetch('/api/seller-protect/admin/webhook-events');
    if (!res.ok) throw new Error('Failed to fetch webhook events');
    return res.json();
  },

  async getAdminMetrics() {
    const res = await fetch('/api/seller-protect/admin/metrics');
    if (!res.ok) throw new Error('Failed to fetch admin metrics');
    return res.json();
  },

  async getAuditLogs() {
    const res = await fetch('/api/seller-protect/admin/audit-logs');
    if (!res.ok) throw new Error('Failed to fetch audit logs');
    return res.json();
  }
};
