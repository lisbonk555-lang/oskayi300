import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, ShieldAlert, ArrowRight, ArrowLeft, CheckCircle2, Lock, CreditCard, AlertCircle, ShoppingCart } from 'lucide-react';
import { CartItem, Product, Order } from '../../types/sellerProtect';
import { sellerProtectApi } from '../../services/sellerProtectApi';

interface CartAndCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onToggleProtection: (productId: string, enabled: boolean) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderCompleted: (order: Order) => void;
}

export const CartAndCheckoutModal: React.FC<CartAndCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onToggleProtection,
  onRemoveItem,
  onClearCart,
  onOrderCompleted
}) => {
  const [checkoutStep, setCheckoutStep] = useState<number>(1); // 1: Cart, 2: Info & Delivery, 3: Protection, 4: Paystack, 5: Confirmed
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [buyerName, setBuyerName] = useState<string>('David Ansah');
  const [buyerEmail, setBuyerEmail] = useState<string>('david.ansah@enterprise.com.gh');
  const [buyerPhone, setBuyerPhone] = useState<string>('+233244905505');
  const [deliveryStreet, setDeliveryStreet] = useState<string>('House 44, Independence Avenue');
  const [deliveryCity, setDeliveryCity] = useState<string>('Accra');
  const [deliveryRegion, setDeliveryRegion] = useState<string>('Greater Accra');
  const [deliveryCountry, setDeliveryCountry] = useState<string>('Ghana');

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 80 : 0;
  const protectionTotal = cart.reduce((sum, item) => {
    if (item.selectedProtection && item.product.protectionEligibility === 'ELIGIBLE') {
      return sum + Math.round(item.product.price * (item.product.protectionRatePct / 100)) * item.quantity;
    }
    return sum;
  }, 0);
  const grandTotal = subtotal + deliveryFee + protectionTotal;
  const hasAnyProtection = protectionTotal > 0;

  // Step 4: Paystack Initialization & Order Finalization
  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Initialize Paystack Transaction
      const paymentInit = await sellerProtectApi.initializePayment({
        email: buyerEmail,
        amount: grandTotal,
        currency: 'GHS',
        orderDetails: {
          itemsCount: cart.length,
          subtotal,
          protectionTotal
        }
      });

      const ref = paymentInit.reference;
      setPaymentReference(ref);

      // 2. In Development/Sandbox mode, verify immediately server-side
      const verifyRes = await sellerProtectApi.verifyPayment(ref);

      // 3. Create real Order in DB with optional Curacel Protection Record
      const orderPayload = {
        buyerName,
        buyerEmail,
        buyerPhone,
        shippingAddress: {
          street: deliveryStreet,
          city: deliveryCity,
          region: deliveryRegion,
          country: deliveryCountry
        },
        items: cart.map(item => ({
          productId: item.product.id,
          productTitle: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          hasProtection: item.selectedProtection && item.product.protectionEligibility === 'ELIGIBLE',
          protectionFee: item.selectedProtection && item.product.protectionEligibility === 'ELIGIBLE' 
            ? Math.round(item.product.price * (item.product.protectionRatePct / 100)) * item.quantity 
            : 0,
          sku: item.product.sku,
          image: item.product.images[0]
        })),
        subtotal,
        deliveryFee,
        protectionTotal,
        totalAmount: grandTotal,
        currency: 'GHS',
        paymentReference: ref,
        hasProtection: hasAnyProtection
      };

      const orderRes = await sellerProtectApi.createOrder(orderPayload);
      setCompletedOrder(orderRes.order);
      onOrderCompleted(orderRes.order);
      onClearCart();
      setCheckoutStep(5); // Move to confirmation
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-white">
        
        {/* Header & Step Indicator */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <span>
                {checkoutStep === 1 && 'Your Marketplace Cart'}
                {checkoutStep === 2 && 'Step 1 of 3: Customer & Delivery Info'}
                {checkoutStep === 3 && 'Step 2 of 3: Curacel Purchase Protection'}
                {checkoutStep === 4 && 'Step 3 of 3: Paystack Secure Checkout'}
                {checkoutStep === 5 && 'Order Confirmation & Protection Receipt'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Oskayi Seller Protect • Verified Real-Time Transaction
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Content Body based on Step */}
        <div className="p-6 space-y-6">

          {/* STEP 1: CART OVERVIEW */}
          {checkoutStep === 1 && (
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-3 font-mono">
                  <p>Your shopping cart is currently empty.</p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Browse Marketplace
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {cart.map((item) => {
                      const isEligible = item.product.protectionEligibility === 'ELIGIBLE';
                      const itemProtFee = isEligible ? Math.round(item.product.price * (item.product.protectionRatePct / 100)) * item.quantity : 0;

                      return (
                        <div
                          key={item.product.id}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.title}
                              className="w-14 h-14 rounded-lg object-cover bg-slate-900"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.title}</h4>
                              <div className="text-xs text-amber-400 font-mono font-bold mt-0.5">
                                GH₵ {item.product.price.toLocaleString()}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                Seller: {item.product.merchantName}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs font-mono">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="text-slate-400 hover:text-white"
                              >
                                -
                              </button>
                              <span className="font-bold">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="text-slate-400 hover:text-white"
                              >
                                +
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Breakdown */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Product Subtotal:</span>
                      <span className="text-white font-bold">GH₵ {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Express Delivery:</span>
                      <span className="text-white font-bold">GH₵ {deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
                      <span className="text-slate-200">Total:</span>
                      <span className="text-amber-400">GH₵ {(subtotal + deliveryFee).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          )}

          {/* STEP 2: CUSTOMER & DELIVERY INFO */}
          {checkoutStep === 2 && (
            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Phone Number (Ghana / Int.)</label>
                  <input
                    type="tel"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">City / Town</label>
                  <input
                    type="text"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-400 block mb-1">Street Address / GPS Code</label>
                  <input
                    type="text"
                    value={deliveryStreet}
                    onChange={(e) => setDeliveryStreet(e.target.value)}
                    placeholder="e.g. GA-183-8165, Spintex Road, Accra"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCheckoutStep(1)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Cart</span>
                </button>
                <button
                  onClick={() => setCheckoutStep(3)}
                  disabled={!buyerName || !buyerEmail || !deliveryStreet}
                  className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span>Continue to Protection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: OPTIONAL PURCHASE PROTECTION (CURACEL GROW) */}
          {checkoutStep === 3 && (
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-400/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Curacel Grow Embedded Purchase Protection</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-xs">
                  Insure your physical cargo against courier transit loss, handling shock damage, water ingress, and DOA defects for 30 days. Underwritten by Curacel Grow integrated underwriting desk.
                </p>
              </div>

              {/* Items Protection Toggles */}
              <div className="space-y-3">
                {cart.map((item) => {
                  const isEligible = item.product.protectionEligibility === 'ELIGIBLE';
                  const fee = isEligible ? Math.round(item.product.price * (item.product.protectionRatePct / 100)) * item.quantity : 0;

                  return (
                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-white line-clamp-1">{item.product.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {isEligible ? (
                            <span className="text-amber-300">
                              Curacel 30-Day Coverage (+GH₵ {fee.toLocaleString()})
                            </span>
                          ) : (
                            <span className="text-slate-500">Not eligible for cargo insurance (Services/Digital)</span>
                          )}
                        </div>
                      </div>

                      {isEligible ? (
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={item.selectedProtection}
                            onChange={(e) => onToggleProtection(item.product.id, e.target.checked)}
                            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-400 focus:ring-amber-400"
                          />
                          <span className="text-xs font-bold text-amber-300">
                            {item.selectedProtection ? 'Covered' : 'Decline'}
                          </span>
                        </label>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">N/A</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Real-time calculated price breakdown */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span>Product Subtotal:</span>
                  <span>GH₵ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>GH₵ {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-amber-300 font-bold">
                  <span>Curacel Protection Premium:</span>
                  <span>GH₵ {protectionTotal.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-white font-extrabold text-sm">
                  <span>Grand Total:</span>
                  <span className="text-amber-400">GH₵ {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCheckoutStep(2)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCheckoutStep(4)}
                  className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1.5"
                >
                  <span>Review & Pay (Paystack)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYSTACK CHECKOUT */}
          {checkoutStep === 4 && (
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white">Paystack Official Payment Gateway</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                    256-BIT ENCRYPTED
                  </span>
                </div>

                <div className="space-y-1.5 text-slate-400 pt-2 border-t border-slate-900">
                  <div className="flex justify-between">
                    <span>Payee:</span>
                    <span className="text-white">{buyerName} ({buyerEmail})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery To:</span>
                    <span className="text-white">{deliveryStreet}, {deliveryCity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Curacel Protection:</span>
                    <span className={hasAnyProtection ? 'text-amber-300 font-bold' : 'text-slate-500'}>
                      {hasAnyProtection ? 'ACTIVE (Transit & Damage)' : 'DECLINED'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                    <span>Total Charge:</span>
                    <span className="text-amber-400">GH₵ {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-[11px] text-slate-400 font-mono">
                <CreditCard className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Supports Mobile Money (MTN, Vodafone/Telecel, AirtelTigo), Visa, Mastercard, and Direct Bank Debit.
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCheckoutStep(3)}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleProceedToPayment}
                  disabled={isProcessing}
                  className="px-8 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Verifying with Paystack...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay GH₵ {grandTotal.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: ORDER CONFIRMATION & PROTECTION RECEIPT */}
          {checkoutStep === 5 && completedOrder && (
            <div className="space-y-5 text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Payment Confirmed & Order Placed</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Order Reference: <span className="text-amber-400 font-bold">{completedOrder.orderNumber}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Paystack Reference:</span>
                  <span className="text-slate-200 font-bold">{completedOrder.paymentReference}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Payment Status:</span>
                  <span className="text-emerald-400 font-bold">{completedOrder.paymentStatus}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Curacel Protection Policy:</span>
                  <span className="text-amber-300 font-bold">
                    {completedOrder.protectionRecordId ? completedOrder.protectionRecordId : 'None'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Address:</span>
                  <span className="text-slate-200">{completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 font-mono text-xs">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold"
                >
                  View My Orders & Claims
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
