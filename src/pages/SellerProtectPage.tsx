import React, { useState, useEffect } from 'react';
import { SellerProtectHeader } from '../components/sellerProtect/SellerProtectHeader';
import { IntegrationHealthBanner } from '../components/sellerProtect/IntegrationHealthBanner';
import { MarketplaceView } from '../components/sellerProtect/MarketplaceView';
import { ProductDetailModal } from '../components/sellerProtect/ProductDetailModal';
import { CartAndCheckoutModal } from '../components/sellerProtect/CartAndCheckoutModal';
import { BuyerOrdersAndClaimsView } from '../components/sellerProtect/BuyerOrdersAndClaimsView';
import { MerchantPortalView } from '../components/sellerProtect/MerchantPortalView';
import { AdminPortalView } from '../components/sellerProtect/AdminPortalView';
import { MerchantOnboardingModal } from '../components/sellerProtect/MerchantOnboardingModal';
import { Product, Merchant, Order, Claim, CartItem, IntegrationHealthStatus } from '../types/sellerProtect';
import { sellerProtectApi } from '../services/sellerProtectApi';

interface SellerProtectPageProps {
  onNavigateHome: () => void;
  onOpenVerification?: () => void;
}

export const SellerProtectPage: React.FC<SellerProtectPageProps> = ({
  onNavigateHome,
  onOpenVerification
}) => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'orders' | 'merchant' | 'admin' | 'health'>('marketplace');
  const [products, setProducts] = useState<Product[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [health, setHealth] = useState<IntegrationHealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Cart & Modal states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // Fetch all initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, merchRes, orderRes, claimRes, healthRes] = await Promise.all([
        sellerProtectApi.getProducts(),
        sellerProtectApi.getMerchants(),
        sellerProtectApi.getOrders(),
        sellerProtectApi.getClaims(),
        sellerProtectApi.getIntegrationHealth()
      ]);

      setProducts(prodRes.products || []);
      setMerchants(merchRes.merchants || []);
      setOrders(orderRes.orders || []);
      setClaims(claimRes.claims || []);
      setHealth(healthRes);
    } catch (err) {
      console.error('Error loading Seller Protect data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Cart Handlers
  const handleAddToCart = (product: Product, selectedProtection: boolean) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, selectedProtection }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedProtection,
          calculatedProtectionFee: product.protectionEligibility === 'ELIGIBLE' ? Math.round(product.price * (product.protectionRatePct / 100)) : 0
        }
      ];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const handleToggleProtection = (productId: string, enabled: boolean) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, selectedProtection: enabled } : item));
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    fetchData();
  };

  const [activeMerchantId, setActiveMerchantId] = useState<string>('');

  const handleMerchantOnboarded = (newMerchant: Merchant, newProduct?: Product) => {
    setIsOnboardingOpen(false);
    setActiveMerchantId(newMerchant.id);
    fetchData();
    setActiveTab('merchant');
  };

  const cartItemsCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Header with Sub-Tabs & Become Seller CTA */}
      <SellerProtectHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        cartCount={cartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateHome={onNavigateHome}
        onOpenBecomeSeller={() => setIsOnboardingOpen(true)}
      />

      {/* Integration Health & Environment Mode Banner */}
      <IntegrationHealthBanner
        health={health}
        loading={loading}
        onRefresh={fetchData}
      />

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'marketplace' && (
          <MarketplaceView
            products={products}
            loading={loading}
            onSelectProduct={(prod) => setSelectedProductForDetail(prod)}
            onQuickAddToCart={(prod) => handleAddToCart(prod, prod.protectionEligibility === 'ELIGIBLE')}
            onOpenBecomeSeller={() => setIsOnboardingOpen(true)}
          />
        )}

        {activeTab === 'orders' && (
          <BuyerOrdersAndClaimsView
            orders={orders}
            claims={claims}
            loading={loading}
            onRefresh={fetchData}
            onOpenMarketplace={() => setActiveTab('marketplace')}
          />
        )}

        {activeTab === 'merchant' && (
          <MerchantPortalView
            merchants={merchants}
            products={products}
            orders={orders}
            claims={claims}
            loading={loading}
            onRefresh={fetchData}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            currentMerchantId={activeMerchantId}
            onSelectMerchant={setActiveMerchantId}
          />
        )}

        {(activeTab === 'admin' || activeTab === 'health') && (
          <AdminPortalView
            merchants={merchants}
            orders={orders}
            claims={claims}
            health={health}
            onRefresh={fetchData}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={Boolean(selectedProductForDetail)}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Paystack 5-Step Checkout Modal */}
      <CartAndCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleProtection={handleToggleProtection}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Simple 3-Step Merchant Onboarding Modal */}
      <MerchantOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onMerchantCreated={handleMerchantOnboarded}
      />

    </div>
  );
};
