import React, { useState, useEffect } from 'react';
import { 
  Store, 
  PlusCircle, 
  Package, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw, 
  Truck, 
  DollarSign,
  Clock,
  Shield,
  CreditCard,
  Settings,
  FileText,
  Eye,
  AlertTriangle,
  Info,
  MapPin,
  Phone,
  Mail,
  User,
  Sparkles,
  Trash2,
  Edit2
} from 'lucide-react';
import { Merchant, Product, Order, Claim } from '../../types/sellerProtect';
import { MARKETPLACE_CONFIG, PRESET_CATEGORY_IMAGES } from '../../data/sellerProtectData';
import { sellerProtectApi } from '../../services/sellerProtectApi';

interface MerchantPortalViewProps {
  merchants: Merchant[];
  products: Product[];
  orders: Order[];
  claims: Claim[];
  loading: boolean;
  onRefresh: () => void;
  onOpenOnboarding: () => void;
  currentMerchantId?: string;
  onSelectMerchant?: (id: string) => void;
}

export const MerchantPortalView: React.FC<MerchantPortalViewProps> = ({
  merchants,
  products,
  orders,
  claims,
  loading,
  onRefresh,
  onOpenOnboarding,
  currentMerchantId,
  onSelectMerchant
}) => {
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>(
    currentMerchantId || merchants[0]?.id || ''
  );

  useEffect(() => {
    if (currentMerchantId && currentMerchantId !== selectedMerchantId) {
      setSelectedMerchantId(currentMerchantId);
    } else if (!selectedMerchantId && merchants.length > 0) {
      setSelectedMerchantId(merchants[0].id);
    }
  }, [currentMerchantId, merchants]);

  const handleMerchantChange = (id: string) => {
    setSelectedMerchantId(id);
    if (onSelectMerchant) onSelectMerchant(id);
  };
  
  // 7 simple tabs: Store, Products, Orders, Payments, Protection, Claims, Settings
  const [activeTab, setActiveTab] = useState<'store' | 'products' | 'orders' | 'payments' | 'protection' | 'claims' | 'settings'>('store');

  // New Product Form Modal State
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
  const [productTitle, setProductTitle] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>(MARKETPLACE_CONFIG.enabledCategories[0]);
  const [productPrice, setProductPrice] = useState<number | string>(150);
  const [productCurrency, setProductCurrency] = useState<string>('GHS');
  const [productStock, setProductStock] = useState<number>(10);
  const [productSku, setProductSku] = useState<string>('');
  const [productDesc, setProductDesc] = useState<string>('');
  const [productShipping, setProductShipping] = useState<string>('Standard dispatch within 1-2 business days.');
  const [productType, setProductType] = useState<'PHYSICAL' | 'SERVICE' | 'DIGITAL'>('PHYSICAL');
  const [productImage, setProductImage] = useState<string>(PRESET_CATEGORY_IMAGES[MARKETPLACE_CONFIG.enabledCategories[0]] || '');
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Store Settings Edit State
  const [editPayout, setEditPayout] = useState<string>('');
  const [editPhone, setEditPhone] = useState<string>('');
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState<boolean>(false);

  const currentMerchant = merchants.find(m => m.id === selectedMerchantId) || merchants[0];
  const merchantProducts = products.filter(p => p.merchantId === (currentMerchant?.id || ''));
  const merchantOrders = orders.filter(o => o.merchantId === (currentMerchant?.id || ''));
  const merchantClaims = claims.filter(c => c.merchantId === (currentMerchant?.id || ''));

  // Calculate real balance from paid orders (0 if none)
  const paidOrders = merchantOrders.filter(o => o.paymentStatus === 'PAYMENT_SUCCESS' || o.orderStatus === 'PAID' || o.orderStatus === 'SHIPPED' || o.orderStatus === 'DELIVERED');
  const totalGrossRevenue = paidOrders.reduce((sum, o) => sum + (o.subtotal || 0), 0);
  const netAvailableBalance = Math.round(totalGrossRevenue * 0.975 * 100) / 100; // Net after 2.5% platform fee

  // Handle Add Product Submit
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMerchant) return;

    const numPrice = Number(productPrice);
    if (isNaN(numPrice) || numPrice < 20) {
      alert("Minimum listing price is GH₵20 as per marketplace rules.");
      return;
    }

    setIsAddingProduct(true);
    try {
      const chosenImage = productImage.trim() || PRESET_CATEGORY_IMAGES[productCategory] || PRESET_CATEGORY_IMAGES['Electronics'];

      await sellerProtectApi.createProduct({
        merchantId: currentMerchant.id,
        title: productTitle.trim(),
        description: productDesc.trim() || `Authentic ${productTitle.trim()} from ${currentMerchant.storeName}.`,
        category: productCategory,
        productType,
        price: numPrice,
        currency: productCurrency || 'GHS',
        stock: Number(productStock) > 0 ? Number(productStock) : 1,
        sku: productSku.trim() || `SKU-${Date.now().toString().slice(-6)}`,
        shippingInfo: productShipping.trim() || `${currentMerchant.city || 'Accra'}, Ghana delivery`,
        country: currentMerchant.country,
        protectionEligibility: productType === 'PHYSICAL' ? 'ELIGIBLE' : 'INELIGIBLE',
        protectionRatePct: productType === 'PHYSICAL' ? 3.5 : 0,
        images: [chosenImage]
      });

      setShowAddProductModal(false);
      setProductTitle('');
      setProductDesc('');
      setProductImage(PRESET_CATEGORY_IMAGES[productCategory] || '');
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Failed to create product listing');
    } finally {
      setIsAddingProduct(false);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to remove this product listing from the marketplace?')) return;
    setDeletingProductId(productId);
    try {
      await sellerProtectApi.deleteProduct(productId);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    } finally {
      setDeletingProductId(null);
    }
  };

  // Handle Order Status update (Ship / Deliver)
  const handleUpdateOrderStatus = async (orderId: string, status: string, note: string) => {
    try {
      await sellerProtectApi.updateOrderStatus(orderId, status, note);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Failed to update order status');
    }
  };

  // Render status badge with contextual description
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>APPROVED — Live on Marketplace</span>
          </span>
        );
      case 'PENDING_REVIEW':
      case 'PENDING':
      case 'UNDER_REVIEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/80 border border-amber-400/50 text-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>PENDING REVIEW</span>
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 border border-rose-500/40 text-rose-300">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>SUSPENDED</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 border border-rose-500/40 text-rose-300">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>REJECTED</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header: Your Store & Quick Stats */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Your Store
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {currentMerchant?.storeName || 'Merchant Store'}
                </h1>
                {currentMerchant && renderStatusBadge(currentMerchant.status)}
              </div>
            </div>
          </div>

          {/* Store Switcher & Become Seller Action */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {merchants.length > 1 && (
              <select
                value={selectedMerchantId}
                onChange={(e) => setSelectedMerchantId(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
              >
                {merchants.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.storeName} ({m.status})
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={onOpenOnboarding}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow transition-all active:scale-95 whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-950" />
              <span>Become a Seller</span>
            </button>
          </div>
        </div>

        {/* Top KPIs Row: Total Products, Orders, Available Balance */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 font-mono">
          
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <div className="text-[11px] text-slate-400">Total Products</div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {merchantProducts.length}
            </div>
            <div className="text-[10px] text-slate-500">Prepared in catalog</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <div className="text-[11px] text-slate-400">Orders Received</div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {merchantOrders.length}
            </div>
            <div className="text-[10px] text-slate-500">Paid: {paidOrders.length}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <div className="text-[11px] text-slate-400">Available Balance</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-400">
              GH₵ {netAvailableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-500">Live payment settlement</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <div className="text-[11px] text-slate-400">Active Protection</div>
            <div className="text-xl sm:text-2xl font-bold text-indigo-400">
              {merchantOrders.filter(o => o.hasProtection).length}
            </div>
            <div className="text-[10px] text-indigo-300">Underwritten shipments</div>
          </div>

        </div>

        {/* Pending Review Notice Banner */}
        {currentMerchant && (currentMerchant.status === 'PENDING_REVIEW' || currentMerchant.status === 'PENDING') && (
          <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-400/40 text-xs font-mono text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                Your store is currently <strong>PENDING REVIEW</strong>. You can prepare product listings and manage store settings. Products will become publicly searchable once approved by platform moderators.
              </span>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold self-start sm:self-auto whitespace-nowrap">
              Review in Progress
            </span>
          </div>
        )}

      </div>

      {/* 7 Clean Sub-Tabs: Store, Products, Orders, Payments, Protection, Claims, Settings */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-slate-800 pb-2 text-xs font-mono">
        
        <button
          onClick={() => setActiveTab('store')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'store' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Store</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'products' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Products ({merchantProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'orders' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Orders ({merchantOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'payments' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Payments</span>
        </button>

        <button
          onClick={() => setActiveTab('protection')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'protection' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Protection</span>
        </button>

        <button
          onClick={() => setActiveTab('claims')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'claims' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Claims ({merchantClaims.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'settings' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>

      </div>

      {/* TAB 1: STORE OVERVIEW */}
      {activeTab === 'store' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
          
          {/* Store Profile Card */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-400" />
                <span>Store Profile & Operations</span>
              </h3>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Primary Contact</span>
                </div>
                <div className="font-bold text-white">{currentMerchant?.ownerName}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>WhatsApp / Phone</span>
                </div>
                <div className="font-bold text-white">{currentMerchant?.phone}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email</span>
                </div>
                <div className="font-bold text-white">{currentMerchant?.email}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Location</span>
                </div>
                <div className="font-bold text-white">{currentMerchant?.city || 'Accra'}, {currentMerchant?.country}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400 font-bold">Store Description</div>
              <p className="text-slate-300 font-sans leading-relaxed">
                {currentMerchant?.description || 'No description provided.'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Protection Summary */}
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <h3 className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Oskayi Protection Overview</span>
              </h3>
              <p className="text-slate-300 font-sans leading-relaxed text-[11px]">
                Eligible physical cargo shipped by your store can be insured through integrated Curacel Grow underwriting.
              </p>
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-400/30 text-[10px] text-amber-300 font-sans">
                Protection availability depends on product, location, insurance provider and eligibility.
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs">
              <h3 className="font-bold text-white">Quick Shortcuts</h3>
              <button
                onClick={() => setActiveTab('products')}
                className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-left text-slate-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>View Products Catalog</span>
                <span className="text-amber-400 font-bold">→</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-left text-slate-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>Process Customer Orders</span>
                <span className="text-amber-400 font-bold">→</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                Store Inventory ({merchantProducts.length} items)
              </h3>
              <p className="text-slate-400 text-[11px]">
                Default minimum marketplace listing price is GH₵20.
              </p>
            </div>

            <button
              onClick={() => {
                setProductCategory(MARKETPLACE_CONFIG.enabledCategories[0]);
                setProductImage(PRESET_CATEGORY_IMAGES[MARKETPLACE_CONFIG.enabledCategories[0]] || '');
                setShowAddProductModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1.5 shadow active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add New Product</span>
            </button>
          </div>

          {merchantProducts.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
              <Package className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No products listed yet</h4>
              <p className="text-slate-400 text-xs max-w-sm mx-auto">
                Add your products or services to start receiving orders through Oskayi.
              </p>
              <button
                onClick={() => {
                  setProductCategory(MARKETPLACE_CONFIG.enabledCategories[0]);
                  setProductImage(PRESET_CATEGORY_IMAGES[MARKETPLACE_CONFIG.enabledCategories[0]] || '');
                  setShowAddProductModal(true);
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-all active:scale-95"
              >
                + Create First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {merchantProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="aspect-video rounded-xl bg-slate-950 relative overflow-hidden">
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 border border-slate-700 text-slate-300">
                        {prod.category}
                      </span>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/90 border border-emerald-500/60 text-emerald-300">
                        Live
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm line-clamp-1">{prod.title}</h4>
                    <p className="text-slate-400 text-[11px] line-clamp-2 font-sans">{prod.description}</p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-extrabold text-sm">
                        GH₵ {prod.price.toLocaleString()}
                      </span>
                      <span className="text-slate-400 text-[10px]">Stock: {prod.stock}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Protection:</span>
                      <span className={prod.protectionEligibility === 'ELIGIBLE' ? 'text-amber-300 font-bold' : 'text-slate-500'}>
                        {prod.protectionEligibility === 'ELIGIBLE' ? 'Eligible (3.5%)' : 'Ineligible'}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-[11px]">
                      <span className="text-slate-500 text-[10px]">SKU: {prod.sku}</span>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        disabled={deletingProductId === prod.id}
                        className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-[10px] p-1 rounded hover:bg-rose-950/40 transition-colors disabled:opacity-50"
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{deletingProductId === prod.id ? 'Removing...' : 'Delete'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-white">
            Customer Orders Received ({merchantOrders.length})
          </h3>

          {merchantOrders.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-2 text-slate-400">
              <Truck className="w-10 h-10 text-slate-600 mx-auto" />
              <p>No customer orders placed for this store yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {merchantOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                    <div>
                      <span className="text-slate-400">Order: </span>
                      <span className="text-amber-400 font-bold">{order.orderNumber}</span>
                      <span className="text-slate-500 ml-2">Customer: {order.buyerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  <div className="text-slate-300 space-y-1">
                    <div>Address: <span className="text-white font-bold">{order.shippingAddress.street}, {order.shippingAddress.city}</span></div>
                    <div>Amount: <span className="text-amber-400 font-bold">GH₵ {order.totalAmount.toLocaleString()}</span></div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <span className="text-slate-400">Actions:</span>
                    {order.orderStatus === 'PAID' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'SHIPPED', 'Dispatched with local courier.')}
                        className="px-3 py-1 bg-indigo-900 hover:bg-indigo-800 text-indigo-200 rounded-lg font-bold"
                      >
                        Mark Shipped
                      </button>
                    )}
                    {order.orderStatus === 'SHIPPED' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'DELIVERED', 'Delivered to customer.')}
                        className="px-3 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded-lg font-bold"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PAYMENTS */}
      {activeTab === 'payments' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Payment Architecture & Payout Ledger</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Gross Sales Volume</div>
                <div className="text-xl font-bold text-white">GH₵ {totalGrossRevenue.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Platform Commission (2.5%)</div>
                <div className="text-xl font-bold text-slate-400">GH₵ {(Math.round(totalGrossRevenue * 0.025 * 100) / 100).toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Net Available Payout</div>
                <div className="text-xl font-bold text-amber-400">GH₵ {netAvailableBalance.toLocaleString()}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 space-y-1">
              <div className="font-bold text-slate-300">Registered Payout Method</div>
              <div>{currentMerchant?.payoutAccount || 'Pending Payout Setup (Configure in Settings)'}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROTECTION */}
      {activeTab === 'protection' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 font-mono text-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Curacel Grow Purchase Protection Policy</span>
          </div>

          <div className="space-y-3 text-slate-300 font-sans leading-relaxed text-xs">
            <p>
              Oskayi Seller Protect integrates Curacel Grow embedded insurance to underwrite transit and damage risks on eligible marketplace orders.
            </p>
            
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-400/30 text-amber-300 font-mono text-xs">
              <strong>Coverage Notice:</strong> Protection availability depends on product, location, insurance provider and eligibility.
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-white font-bold">Standard Policy Scope:</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>30-day coverage from date of payment dispatch</li>
                <li>Full replacement value in event of courier transit damage or loss</li>
                <li>Direct claims adjudication through Curacel claims desk</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CLAIMS */}
      {activeTab === 'claims' && (
        <div className="space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-white">
            Curacel Insurance Claims ({merchantClaims.length})
          </h3>

          {merchantClaims.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-2 text-slate-400">
              <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto" />
              <p>No insurance claims lodged against your store.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {merchantClaims.map((claim) => (
                <div key={claim.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-amber-400 font-bold">{claim.claimNumber}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold">{claim.status}</span>
                  </div>
                  <p className="text-slate-300">{claim.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 7: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 font-mono text-xs">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Settings className="w-4 h-4 text-amber-400" />
            <span>Store Configuration & Payout Settings</span>
          </h3>

          {settingsSavedMsg && (
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300">
              Settings updated successfully!
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1">Store Name</label>
              <input
                type="text"
                disabled
                value={currentMerchant?.storeName || ''}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Bank Account / MoMo Payout Details</label>
              <input
                type="text"
                value={editPayout || currentMerchant?.payoutAccount || ''}
                onChange={(e) => setEditPayout(e.target.value)}
                placeholder="e.g. MTN MoMo (+233 24 123 4567) or GTBank (014/88921/01)"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">WhatsApp / Phone Number</label>
              <input
                type="text"
                value={editPhone || currentMerchant?.phone || ''}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              onClick={() => {
                setSettingsSavedMsg(true);
                setTimeout(() => setSettingsSavedMsg(false), 2000);
              }}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-5 sm:p-6 space-y-4 shadow-2xl text-white font-mono text-xs my-auto max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Add Product to Store</h3>
                  <p className="text-[11px] text-slate-400">{currentMerchant?.storeName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3.5">
              <div>
                <label className="text-slate-300 block mb-1 font-bold">Product / Service Name *</label>
                <input
                  type="text"
                  required
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="e.g. 5.5kW Pure Sine Wave Hybrid Solar Inverter"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Listing Type Selection */}
              <div>
                <label className="text-slate-300 block mb-1 font-bold">Listing Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProductType('PHYSICAL')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      productType === 'PHYSICAL'
                        ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    📦 Physical Goods (Cargo Protected)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductType('SERVICE')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      productType === 'SERVICE'
                        ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    💼 Services (SLA Terms)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-bold">Price (Min GH₵20) *</label>
                  <input
                    type="number"
                    min="20"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-bold focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-bold">Stock Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={productStock}
                    onChange={(e) => setProductStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Category</label>
                <select
                  value={productCategory}
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                    setProductImage(PRESET_CATEGORY_IMAGES[e.target.value] || PRESET_CATEGORY_IMAGES['Electronics']);
                  }}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                >
                  {MARKETPLACE_CONFIG.enabledCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Description</label>
                <textarea
                  rows={2}
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  placeholder="Key features, specifications, and warranty details..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Product Image (Category Photo or Custom URL)</label>
                <div className="flex items-center gap-2.5">
                  <img
                    src={productImage || PRESET_CATEGORY_IMAGES[productCategory] || PRESET_CATEGORY_IMAGES['Electronics']}
                    alt="Preview"
                    className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <input
                    type="url"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAddingProduct || !productTitle}
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl disabled:opacity-50 transition-all active:scale-95 shadow"
                >
                  {isAddingProduct ? 'Adding...' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
