import React, { useState, useEffect } from 'react';
import { 
  X, 
  Store, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Package, 
  Briefcase, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Info,
  DollarSign,
  Image as ImageIcon
} from 'lucide-react';
import { Merchant, Product } from '../../types/sellerProtect';
import { sellerProtectApi } from '../../services/sellerProtectApi';
import { MARKETPLACE_CONFIG } from '../../data/sellerProtectData';

interface MerchantOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMerchantCreated: (merchant: Merchant, firstProduct?: Product) => void;
}

const ONBOARDING_DRAFT_KEY = 'oskayi_seller_onboarding_draft';

const CATEGORY_OPTIONS = [
  'Fashion',
  'Electronics',
  'Beauty',
  'Food',
  'Home',
  'Automotive',
  'Health & Wellness',
  'Digital Products',
  'Professional Services',
  'Solar & Clean Energy Systems',
  'Industrial & Agro Equipment',
  'Other'
];

const PRESET_IMAGES: Record<string, string> = {
  'Electronics': 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80',
  'Fashion': 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80',
  'Beauty': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
  'Food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
  'Home': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
  'Automotive': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
  'Health & Wellness': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
  'Digital Products': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  'Professional Services': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
  'Solar & Clean Energy Systems': 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
  'Industrial & Agro Equipment': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  'Other': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80'
};

export const MerchantOnboardingModal: React.FC<MerchantOnboardingModalProps> = ({
  isOpen,
  onClose,
  onMerchantCreated
}) => {
  // Step tracker: 1 = Account, 2 = Store, 3 = First Listing, 4 = Success
  const [step, setStep] = useState<number>(1);

  // Step 1: Basic Information
  const [ownerName, setOwnerName] = useState<string>('');
  const [storeName, setStoreName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [country, setCountry] = useState<string>('Ghana');
  const [city, setCity] = useState<string>('Accra');

  // Step 2: What do you sell
  const [sellType, setSellType] = useState<'Products' | 'Services' | 'Both'>('Products');
  const [category, setCategory] = useState<string>('Electronics');

  // Step 3: First Listing
  const [productTitle, setProductTitle] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number | string>(120);
  const [productCurrency, setProductCurrency] = useState<string>('GHS');
  const [productCategory, setProductCategory] = useState<string>('Electronics');
  const [productImage, setProductImage] = useState<string>('');
  const [productStock, setProductStock] = useState<number>(10);
  const [deliveryLocation, setDeliveryLocation] = useState<string>('Accra & Nationwide Delivery');

  // Loading & Error States
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [createdMerchant, setCreatedMerchant] = useState<Merchant | null>(null);

  // Load draft from localStorage on open
  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem(ONBOARDING_DRAFT_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          if (data.ownerName) setOwnerName(data.ownerName);
          if (data.storeName) setStoreName(data.storeName);
          if (data.phone) setPhone(data.phone);
          if (data.email) setEmail(data.email);
          if (data.country) setCountry(data.country);
          if (data.city) setCity(data.city);
          if (data.sellType) setSellType(data.sellType);
          if (data.category) {
            setCategory(data.category);
            setProductCategory(data.category);
          }
          if (data.productTitle) setProductTitle(data.productTitle);
          if (data.productDescription) setProductDescription(data.productDescription);
          if (data.productPrice) setProductPrice(data.productPrice);
          if (data.deliveryLocation) setDeliveryLocation(data.deliveryLocation);
          if (data.step && data.step >= 1 && data.step <= 3) setStep(data.step);
        }
      } catch (e) {
        console.error('Error loading onboarding draft', e);
      }
    }
  }, [isOpen]);

  // Sync draft to localStorage on changes
  const saveDraft = (currentStep = step) => {
    try {
      localStorage.setItem(ONBOARDING_DRAFT_KEY, JSON.stringify({
        step: currentStep,
        ownerName,
        storeName,
        phone,
        email,
        country,
        city,
        sellType,
        category,
        productTitle,
        productDescription,
        productPrice,
        deliveryLocation
      }));
    } catch (e) {
      console.error('Error saving onboarding draft', e);
    }
  };

  if (!isOpen) return null;

  // Handle Step 1 -> Step 2
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!ownerName.trim() || !storeName.trim() || !phone.trim() || !email.trim() || !city.trim()) {
      setErrorMsg('Please complete all basic information fields.');
      return;
    }

    // Set default category image
    if (!productImage) {
      setProductImage(PRESET_IMAGES[category] || PRESET_IMAGES['Electronics']);
    }

    setStep(2);
    saveDraft(2);
  };

  // Handle Step 2 -> Step 3
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setProductCategory(category);
    if (!productImage || productImage === PRESET_IMAGES['Electronics']) {
      setProductImage(PRESET_IMAGES[category] || PRESET_IMAGES['Electronics']);
    }
    setStep(3);
    saveDraft(3);
  };

  // Complete onboarding (with or without first listing)
  const handleFinishOnboarding = async (includeProduct: boolean) => {
    setErrorMsg('');
    setSubmitting(true);

    try {
      // 1. Create Merchant Account (Status: PENDING_REVIEW)
      const merchantPayload: Partial<Merchant> = {
        ownerName: ownerName.trim(),
        storeName: storeName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        country: country || 'Ghana',
        city: city.trim() || 'Accra',
        sellType,
        category,
        businessType: 'Independent Seller / Enterprise',
        address: `${city.trim()}, ${country || 'Ghana'}`,
        description: `Verified merchant ${storeName.trim()} offering quality ${category.toLowerCase()} on Oskayi Seller Protect.`
      };

      const merchantRes = await sellerProtectApi.registerMerchant(merchantPayload);
      const newMerchant = merchantRes.merchant;
      setCreatedMerchant(newMerchant);

      let newProduct: Product | undefined = undefined;

      // 2. Optionally Create First Listing
      if (includeProduct && productTitle.trim()) {
        const numPrice = Number(productPrice);
        if (numPrice < 20) {
          throw new Error('Minimum listing price is GH₵20 as per marketplace rules.');
        }

        const chosenImage = productImage.trim() || PRESET_IMAGES[productCategory] || PRESET_IMAGES['Electronics'];

        const productRes = await sellerProtectApi.createProduct({
          merchantId: newMerchant.id,
          title: productTitle.trim(),
          description: productDescription.trim() || `Authentic ${productTitle.trim()} from ${newMerchant.storeName}.`,
          category: productCategory || category,
          productType: sellType === 'Services' ? 'SERVICE' : 'PHYSICAL',
          price: numPrice,
          currency: productCurrency || 'GHS',
          stock: Number(productStock) > 0 ? Number(productStock) : 10,
          shippingInfo: deliveryLocation.trim() || `${city}, Ghana delivery`,
          deliveryLocation: deliveryLocation.trim() || `${city}, Ghana`,
          country: newMerchant.country,
          images: [chosenImage]
        });

        newProduct = productRes.product;
      }

      // Clear draft
      localStorage.removeItem(ONBOARDING_DRAFT_KEY);

      setStep(4); // Success screen
      setTimeout(() => {
        onMerchantCreated(newMerchant, newProduct);
      }, 1800);

    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to complete merchant onboarding. Please check your details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-white my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  Become a Verified Seller
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/10 border border-amber-400/30 text-amber-300">
                  Fast Onboarding
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Start selling across Ghana & West Africa with integrated protection.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Indicator */}
        {step <= 3 && (
          <div className="px-6 pt-4 pb-2 bg-slate-950/40 border-b border-slate-800/60">
            <div className="flex items-center justify-between text-xs font-mono">
              
              {/* Step 1 */}
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold ${
                  step > 1 ? 'bg-amber-400 text-slate-950' : step === 1 ? 'bg-amber-400/20 text-amber-300 border border-amber-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {step > 1 ? '✓' : '1'}
                </span>
                <span>Account</span>
              </div>

              <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-amber-400/60' : 'bg-slate-800'}`}></div>

              {/* Step 2 */}
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold ${
                  step > 2 ? 'bg-amber-400 text-slate-950' : step === 2 ? 'bg-amber-400/20 text-amber-300 border border-amber-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {step > 2 ? '✓' : '2'}
                </span>
                <span>Store</span>
              </div>

              <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-amber-400/60' : 'bg-slate-800'}`}></div>

              {/* Step 3 */}
              <div className={`flex items-center gap-2 ${step === 3 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold ${
                  step === 3 ? 'bg-amber-400/20 text-amber-300 border border-amber-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  3
                </span>
                <span>First Listing</span>
              </div>

            </div>
          </div>
        )}

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 font-mono text-xs">
          
          {/* Seller Protect Explanation Box */}
          {step <= 3 && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-400/30 space-y-2 text-slate-300">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sell with Oskayi Seller Protect</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                List your products or services, receive payments through Oskayi, and offer eligible buyers optional purchase protection.
              </p>
              <div className="text-[10px] text-amber-400/90 font-mono flex items-center gap-1.5 pt-1 border-t border-amber-400/20">
                <Info className="w-3 h-3 shrink-0" />
                <span>Protection availability depends on product, location, insurance provider and eligibility.</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: BASIC INFORMATION */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Step 1 — Basic Information</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Quick details to get your merchant store set up. No bank details or tax documents required at this stage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Full Name */}
                <div>
                  <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Kwame Mensah"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Store Name */}
                <div>
                  <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                    Store / Business Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="e.g. Accra Tech Hub"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                    WhatsApp / Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+233 24 123 4567"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="merchant@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                    Country <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option value="Ghana">Ghana</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                    City <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Accra, Kumasi, Takoradi"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Create Seller Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: WHAT DO YOU SELL? */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>Step 2 — What Do You Sell?</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Select whether you offer physical products, professional services, or both.
                </p>
              </div>

              {/* Sell Type Selection */}
              <div className="space-y-2">
                <label className="text-slate-300 block text-[11px] font-bold">
                  What do you want to sell?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  
                  <button
                    type="button"
                    onClick={() => setSellType('Products')}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      sellType === 'Products'
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    <span className="font-bold text-xs">Products</span>
                    <span className="text-[10px] text-slate-500">Physical goods</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSellType('Services')}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      sellType === 'Services'
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                    <span className="font-bold text-xs">Services</span>
                    <span className="text-[10px] text-slate-500">Expertise / ICT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSellType('Both')}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      sellType === 'Both'
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Layers className="w-5 h-5" />
                    <span className="font-bold text-xs">Both</span>
                    <span className="text-[10px] text-slate-500">Goods & Services</span>
                  </button>

                </div>
              </div>

              {/* Main Category */}
              <div className="space-y-2">
                <label className="text-slate-300 block text-[11px] font-bold">
                  Main Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        category === cat
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate block text-xs">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>Continue to First Listing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: CREATE FIRST LISTING */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Step 3 — Add Your First Product</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Publish your initial product or service. Default minimum marketplace listing price is GH₵20.
                </p>
              </div>

              <div className="space-y-3.5">
                
                {/* Product Name */}
                <div>
                  <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                    Product / Service Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    placeholder="e.g. 5kW Pure Sine Wave Hybrid Solar Inverter"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Key specifications, warranty details, dimensions, or deliverables..."
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Price, Currency & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <div>
                    <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                      Price (Min GH₵20) <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">GH₵</span>
                      <input
                        type="number"
                        min="20"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="20"
                        className="w-full pl-12 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                      Currency
                    </label>
                    <select
                      value={productCurrency}
                      onChange={(e) => setProductCurrency(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option value="GHS">GHS (GH₵)</option>
                      <option value="USD">USD ($)</option>
                      <option value="NGN">NGN (₦)</option>
                      <option value="KES">KES (KSh)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                      Quantity / Stock
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={productStock}
                      onChange={(e) => setProductStock(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                </div>

                {/* Category & Delivery Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                      Product/Service Category
                    </label>
                    <select
                      value={productCategory}
                      onChange={(e) => {
                        setProductCategory(e.target.value);
                        setProductImage(PRESET_IMAGES[e.target.value] || PRESET_IMAGES['Electronics']);
                      }}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                      Delivery Location / Coverage
                    </label>
                    <input
                      type="text"
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="e.g. Accra, Greater Accra & Nationwide"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Product Image Preview & URL */}
                <div>
                  <label className="text-slate-300 block mb-1 text-[11px] font-bold">
                    Product Image (Photo URL or Category Auto-Match)
                  </label>
                  <div className="flex items-center gap-3">
                    <img
                      src={productImage || PRESET_IMAGES[productCategory] || PRESET_IMAGES['Electronics']}
                      alt="Preview"
                      className="w-14 h-14 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <input
                      type="url"
                      value={productImage}
                      onChange={(e) => setProductImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleFinishOnboarding(false)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-colors"
                  >
                    Finish Store Later
                  </button>
                </div>

                <button
                  type="button"
                  disabled={submitting || !productTitle.trim()}
                  onClick={() => handleFinishOnboarding(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>{submitting ? 'Creating Store & Listing...' : 'Publish First Listing'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-white">
                  Welcome, {createdMerchant?.storeName}!
                </h3>
                <p className="text-xs text-slate-300 font-sans max-w-md mx-auto">
                  Your seller account is registered and <span className="text-emerald-400 font-bold">APPROVED & LIVE</span> on Oskayi Seller Protect.
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Your store and products are now available for purchase across Ghana and West Africa.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
