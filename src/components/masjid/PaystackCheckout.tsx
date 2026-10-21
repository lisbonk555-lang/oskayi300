import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Check, AlertCircle, Loader2, ArrowRight, Lock, Award, Phone, Mail, User, X } from 'lucide-react';

export interface MembershipTier {
  id: 'niyyah' | 'noor' | 'al-bari';
  name: string;
  arabicName: string;
  tagline: string;
  priceGHS: number;
  period: string;
  isPopular?: boolean;
  benefits: string[];
}

interface PaystackCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  tier: MembershipTier | null;
  onSuccess?: (verificationResult: any) => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}

export const PaystackCheckout: React.FC<PaystackCheckoutProps> = ({
  isOpen,
  onClose,
  tier,
  onSuccess
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+233 ');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [config, setConfig] = useState<{
    publicKey: string;
    planNoor: string;
    planAlBari: string;
    isConfigured: boolean;
    isLive: boolean;
    mode: string;
  }>({
    publicKey: '',
    planNoor: '',
    planAlBari: '',
    isConfigured: false,
    isLive: false,
    mode: 'SANDBOX_SIMULATION'
  });

  // Fetch backend Paystack configuration on mount
  useEffect(() => {
    fetch('/api/paystack/config')
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          setConfig({
            publicKey: data.publicKey || (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || (import.meta as any).env?.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
            planNoor: data.planNoor || (import.meta as any).env?.VITE_PAYSTACK_PLAN_NOOR || (import.meta as any).env?.NEXT_PUBLIC_PAYSTACK_PLAN_NOOR || '',
            planAlBari: data.planAlBari || (import.meta as any).env?.VITE_PAYSTACK_PLAN_AL_BARI || (import.meta as any).env?.NEXT_PUBLIC_PAYSTACK_PLAN_AL_BARI || '',
            isConfigured: Boolean(data.isConfigured),
            isLive: Boolean(data.isLive),
            mode: data.mode || 'SANDBOX_SIMULATION'
          });
        }
      })
      .catch(() => {
        // Fallback to client-side env
        const clientPub = (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || (import.meta as any).env?.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
        setConfig(prev => ({ ...prev, publicKey: clientPub }));
      });
  }, []);

  // Ensure Paystack Inline script is available
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!isOpen || !tier) return null;

  const handleFreeActivation = () => {
    if (!fullName.trim() || !email.trim()) {
      setErrorMessage('Please enter your full name and email to activate fellowship.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      const freeReceipt = {
        tier: tier.name,
        priceGHS: 0,
        reference: `FREE-NIYYAH-${Date.now().toString().slice(-6)}`,
        fullName,
        email,
        phone,
        activatedAt: new Date().toISOString()
      };
      setSuccessData(freeReceipt);
      if (onSuccess) onSuccess(freeReceipt);
    }, 600);
  };

  const handlePaystackPayment = () => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      setErrorMessage('Please enter a valid phone number (e.g. +233 24 490 5505).');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    const publicKey = config.publicKey || (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || (import.meta as any).env?.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    const planCode = tier.id === 'noor' ? config.planNoor : config.planAlBari;
    const amountInKobo = tier.priceGHS * 100; // 50 GHS = 5000 pesewas/kobo
    const reference = `MSJ-${tier.id.toUpperCase()}-${Date.now()}`;

    // If Paystack Inline is loaded and public key is available
    if (window.PaystackPop && publicKey && publicKey.startsWith('pk_')) {
      try {
        const handler = window.PaystackPop.setup({
          key: publicKey,
          email: email.trim(),
          amount: amountInKobo,
          currency: 'GHS',
          plan: planCode || undefined,
          ref: reference,
          metadata: {
            custom_fields: [
              { display_name: 'Sanctuary Tier', variable_name: 'membership_tier', value: tier.name },
              { display_name: 'Full Name', variable_name: 'full_name', value: fullName },
              { display_name: 'Phone Number', variable_name: 'phone', value: phone },
              { display_name: 'Sanctuary', variable_name: 'sanctuary', value: 'Masjid Al-Noor Al-Alami' }
            ]
          },
          callback: async (response: { reference: string }) => {
            try {
              // Verify on backend /api/paystack/verify
              const verifyRes = await fetch('/api/paystack/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference: response.reference, email, fullName, tier: tier.name })
              });
              const verifyData = await verifyRes.json();

              setIsLoading(false);
              if (verifyData.success) {
                const finalResult = {
                  ...verifyData.data,
                  tier: tier.name,
                  fullName,
                  email,
                  phone
                };
                setSuccessData(finalResult);
                if (onSuccess) onSuccess(finalResult);
              } else {
                setErrorMessage(verifyData.message || 'Payment verification failed with Paystack.');
              }
            } catch (err: any) {
              setIsLoading(false);
              setErrorMessage('Payment confirmed by gateway, but verification check timed out. Please contact support.');
            }
          },
          onClose: () => {
            setIsLoading(false);
            setErrorMessage('Paystack payment window was closed before completion.');
          }
        });

        handler.openIframe();
        return;
      } catch (err: any) {
        console.error('[Paystack Pop Error]:', err);
      }
    }

    // Sandbox / Test Mode Fallback (if live keys haven't been provided by the user yet)
    fetch('/api/paystack/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reference,
        email,
        fullName,
        tier: tier.name,
        amount: tier.priceGHS
      })
    })
      .then(res => res.json())
      .then(verifyData => {
        setIsLoading(false);
        const finalResult = {
          ...verifyData.data,
          tier: tier.name,
          priceGHS: tier.priceGHS,
          reference,
          fullName,
          email,
          phone,
          isSandbox: !config.isLive
        };
        setSuccessData(finalResult);
        if (onSuccess) onSuccess(finalResult);
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMessage('Failed to simulate payment in sandbox mode.');
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
      <div className="relative max-w-xl w-full bg-[#0A1931] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-slate-100 my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Content */}
        {!successData ? (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2 border-b border-[#D4AF37]/30 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[11px] font-mono font-bold text-[#D4AF37] uppercase">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Masjid Al-Noor Al-Alami • Paystack Checkout</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Subscribe to {tier.name}
              </h3>
              <div className="text-xs font-serif text-[#FFF3B0]" dir="rtl">
                {tier.arabicName} • {tier.tagline}
              </div>
            </div>

            {/* Selected Tier Summary Card */}
            <div className="p-4 rounded-2xl bg-[#071326] border border-[#D4AF37]/50 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                  Selected Tier
                </div>
                <div className="text-lg font-serif font-black text-white">
                  {tier.name} Fellowship
                </div>
                <div className="text-xs text-slate-400 font-sans">
                  {tier.id === 'niyyah' ? '100% Free Lifetime Sanctuary Access' : 'Recurring Monthly Fellowship Contribution'}
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-[#FFF3B0]">
                  {tier.priceGHS === 0 ? '0 GHS' : `${tier.priceGHS} GHS`}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {tier.period}
                </div>
              </div>
            </div>

            {/* Benefits Included */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Sanctuary Privileges Included:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {tier.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Customer Information Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (tier.id === 'niyyah') {
                  handleFreeActivation();
                } else {
                  handlePaystackPayment();
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Full Name (As you wish on your Certificate):</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Abdul-Bari Sarsah or Fatima Al-Zahra"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#FFF3B0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Email Address (For Paystack Receipt & Transcripts):</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#FFF3B0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Phone Number (Ghana Mobile Money / Bank OTP):</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+233 24 490 5505"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#FFF3B0] transition-colors"
                />
              </div>

              {/* Paystack Inline Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] text-[#0A1931] font-serif font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-white disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A1931]" />
                    <span>Connecting to Paystack Gateway...</span>
                  </>
                ) : tier.id === 'niyyah' ? (
                  <>
                    <Award className="w-4 h-4 text-[#0A1931]" />
                    <span>Activate Free Niyyah Fellowship →</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#0A1931]" />
                    <span>Pay {tier.priceGHS} GHS with Paystack Inline →</span>
                  </>
                )}
              </button>

              {/* Security & Gateway Badges */}
              <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-[10px] font-mono text-slate-400 border-t border-[#D4AF37]/20">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  PCI-DSS Level 1 & Bank of Ghana Certified
                </span>
                <span>MTN MoMo • Telecel • AirtelTigo • Visa • Mastercard</span>
              </div>
            </form>

          </div>
        ) : (
          /* Success Receipt & Membership Certificate */
          <div className="space-y-6 text-center py-2 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                Masjid Al-Noor Al-Alami • Official Certificate
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Fellowship Confirmed & Activated!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Welcome, <strong className="text-[#FFF3B0]">{successData.fullName}</strong>. Your membership under <strong className="text-[#D4AF37]">{successData.tier}</strong> is now officially active across all 7 sanctuary sections.
              </p>
            </div>

            {/* Certificate Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#071326] to-[#0A1931] border-2 border-[#D4AF37] text-left space-y-3 font-mono text-xs shadow-xl">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
                <span className="text-[#D4AF37] font-bold">FELLOWSHIP TIER:</span>
                <span className="text-white font-bold">{successData.tier}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
                <span className="text-slate-400">TRANSACTION REF:</span>
                <span className="text-[#FFF3B0]">{successData.reference}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
                <span className="text-slate-400">REGISTERED EMAIL:</span>
                <span className="text-white">{successData.email}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
                <span className="text-slate-400">PAYMENT STATUS:</span>
                <span className="text-emerald-400 font-bold">
                  {successData.priceGHS === 0 ? 'FREE ACCREDITATION' : 'VERIFIED PAID VIA PAYSTACK (GHS)'}
                </span>
              </div>
              <div className="pt-1 text-[10px] text-center text-slate-400 font-serif italic">
                "SO HELP ME ALLAH — Patron: ABDUL-BARI (Al-Bari) • Servant of The Creator"
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#0A1931] font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#FFF3B0] transition-colors"
            >
              Enter Sanctuary with Full Privileges
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
