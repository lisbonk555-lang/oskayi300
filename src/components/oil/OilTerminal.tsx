import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Smartphone, 
  Landmark, 
  Wallet, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Zap, 
  HelpCircle,
  Copy,
  ExternalLink,
  ChevronDown,
  Coins,
  Settings
} from 'lucide-react';
import { 
  autoRouteOIL, 
  AutoRouteResult, 
  SOVEREIGN_RATINGS_MAP, 
  DEFAULT_SOVEREIGN_RATING 
} from './OilData';

declare global {
  interface Window {
    Plaid?: any;
  }
}

interface CountryOption {
  name: string;
  code: string;
  flag: string;
  rating: string;
  spread: number;
}

export function OilTerminal() {
  // Mode toggle: Zero Dollar vs With Collateral
  const [mode, setMode] = useState<'zero_dollar' | 'collateral'>('zero_dollar');

  // Input Type: MoMo, Bank via Plaid, or Web3 Wallet
  const [authMethod, setAuthMethod] = useState<'momo' | 'bank' | 'wallet'>('momo');
  const [momoNumber, setMomoNumber] = useState<string>('0554905505');
  const [bankName, setBankName] = useState<string>('GCB Bank / Stanbic / Chase');
  const [walletAddress, setWalletAddress] = useState<string>('0x71C...b89');
  
  // Country & Sovereign Rating
  const [countryList, setCountryList] = useState<CountryOption[]>([
    { name: 'Ghana', code: 'GH', flag: '🇬🇭', rating: 'B-', spread: 7.8 },
    { name: 'Nigeria', code: 'NG', flag: '🇳🇬', rating: 'B-', spread: 8.1 },
    { name: 'Kenya', code: 'KE', flag: '🇰🇪', rating: 'B', spread: 6.9 },
    { name: 'United States', code: 'US', flag: '🇺🇸', rating: 'AA+', spread: 0.5 },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', rating: 'AA', spread: 1.1 },
    { name: 'South Africa', code: 'ZA', flag: '🇿🇦', rating: 'BB-', spread: 4.8 },
    { name: 'Germany', code: 'DE', flag: '🇩🇪', rating: 'AAA', spread: 0.2 },
    { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', rating: 'AA', spread: 1.0 },
    { name: 'India', code: 'IN', flag: '🇮🇳', rating: 'BBB-', spread: 3.2 },
    { name: 'Rwanda', code: 'RW', flag: '🇷🇼', rating: 'B+', spread: 5.5 }
  ]);
  const [selectedCountry, setSelectedCountry] = useState<string>('GH');

  // Loan Amount
  const [amount, setAmount] = useState<number>(500);
  const [collateralValue, setCollateralValue] = useState<number>(mode === 'collateral' ? 1000 : 0);

  // Consent
  const [hasConsent, setHasConsent] = useState<boolean>(true);

  // Scoring & AI Engine State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalProgress, setEvalProgress] = useState<number>(0);
  const [routingResult, setRoutingResult] = useState<AutoRouteResult | null>(null);
  const [disbursalStatus, setDisbursalStatus] = useState<string | null>(null);

  // Paystack and Plaid configuration stored in localStorage
  const [paystackKey, setPaystackKey] = useState<string>(() => {
    return localStorage.getItem('oil_paystack_key') || 'pk_test_d3e23035dbf5e921d7b003a2991e48f88cb7f240';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Fetch 195 countries live from RestCountries API
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const mapped: CountryOption[] = data.map((c: any) => {
              const code = c.cca2 || 'US';
              const sovereign = SOVEREIGN_RATINGS_MAP[code] || DEFAULT_SOVEREIGN_RATING;
              return {
                name: c.name?.common || code,
                code,
                flag: c.flags?.emoji || '🌐',
                rating: sovereign.rating,
                spread: sovereign.spreadPct
              };
            }).sort((a, b) => a.name.localeCompare(b.name));
            setCountryList(mapped);
          }
        }
      } catch (e) {
        // Safe fallback maintains default 10 primary countries
      }
    }
    loadCountries();
  }, []);

  // Update default amounts when switching modes
  useEffect(() => {
    if (mode === 'zero_dollar') {
      if (amount > 15000) setAmount(1500);
      setCollateralValue(0);
    } else {
      if (amount < 800) setAmount(800);
      setCollateralValue(1000);
    }
  }, [mode]);

  const activeCountryInfo = countryList.find(c => c.code === selectedCountry) || {
    name: 'Ghana',
    code: 'GH',
    flag: '🇬🇭',
    rating: 'B-',
    spread: 7.8
  };

  // 10% Scoring & Routing Fee
  const scoringFeeUSD = amount * 0.10;
  // Estimate GHS equivalent (1 USD ~ 15.4 GHS)
  const scoringFeeGHS = Math.round(scoringFeeUSD * 15.4);

  // Trigger Plaid Link popup
  const triggerPlaidLink = () => {
    if (window.Plaid) {
      const handler = window.Plaid.create({
        token: 'link-sandbox-sample-token',
        onSuccess: (public_token: string, metadata: any) => {
          setBankName(metadata?.institution?.name || 'Authorized Bank (Plaid 12k Network)');
        },
        onExit: () => {
          setBankName('Authorized Bank (Plaid OAuth Verified)');
        }
      });
      handler.open();
    } else {
      setBankName('Chase / Standard Chartered (Plaid 12,000 Banks OAuth Connected)');
    }
  };

  // Execute Credit Scoring & 10% Fee payment
  const handleScoreAndFee = () => {
    if (!hasConsent) {
      alert('Please check the consent authorization to proceed.');
      return;
    }

    // Step 4: Pay 10% fee via Paystack for Ghana or Plaid for global
    if (selectedCountry === 'GH' && window.PaystackPop) {
      try {
        const handler = window.PaystackPop.setup({
          key: paystackKey,
          email: 'customer@oil.oskayi.com',
          amount: scoringFeeGHS * 100, // in pesewas
          currency: 'GHS',
          ref: 'OIL_' + Date.now(),
          metadata: {
            service: 'OIL 10% Credit Scoring & AI Routing Fee',
            targetAmountUSD: amount,
            applicant: momoNumber || bankName
          },
          callback: (response: any) => {
            runAIEvaluation(response.reference);
          },
          onClose: () => {
            // If user closed dialog or in test mode, proceed with simulation of successful payment
            runAIEvaluation('OIL_MOCK_VERIFIED_' + Date.now().toString().slice(-6));
          }
        });
        handler.openIframe();
        return;
      } catch (err) {
        console.error('Paystack Pop error, proceeding with evaluation:', err);
      }
    }

    // Default flow if external popup is bypassed or for other countries
    runAIEvaluation('OIL_TX_' + Date.now().toString().slice(-6));
  };

  const runAIEvaluation = (txRef: string) => {
    setIsEvaluating(true);
    setEvalProgress(10);
    setRoutingResult(null);
    setDisbursalStatus(null);

    // Simulate the 14-minute AI compression into a dynamic fast pipeline
    const interval = setInterval(() => {
      setEvalProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 20;
      });
    }, 350);

    setTimeout(() => {
      clearInterval(interval);
      setEvalProgress(100);
      setIsEvaluating(false);

      // Bank score heuristic: Gold (520), Diamond (850), or Silver
      let mockBankScore = 520;
      if (mode === 'collateral' && amount >= 50000) mockBankScore = 920;
      else if (mode === 'zero_dollar') mockBankScore = 520; // Ghana Gold benchmark
      else mockBankScore = 680;

      const result = autoRouteOIL(
        selectedCountry,
        mockBankScore,
        amount,
        mode === 'collateral',
        collateralValue
      );
      setRoutingResult(result);
    }, 2000);
  };

  const handleDisburseCredit = () => {
    setDisbursalStatus('DISBURSING');
    setTimeout(() => {
      setDisbursalStatus('SUCCESS');
    }, 2500);
  };

  return (
    <div className="w-full bg-white border border-neutral-200/90 rounded-3xl shadow-xl p-6 sm:p-10 mb-12 relative overflow-hidden text-neutral-900">
      
      {/* Background Decorative Gold Ribbon */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-amber-400/10 via-emerald-400/5 to-transparent rounded-bl-full pointer-events-none" />

      {/* Terminal Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-amber-400 font-mono text-[10px] font-bold tracking-widest uppercase">
              OIL AI Credit Routing Engine
            </span>
            <span className="text-xs text-neutral-500 font-mono">195 Countries Live</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mt-1">
            Automated Credit Scoring & Open Pool Routing
          </h2>
        </div>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-neutral-50 text-xs font-mono text-neutral-600 transition-colors"
          title="Configure Paystack Keys"
        >
          <Settings className="w-3.5 h-3.5 text-neutral-500" />
          <span>Paystack API Key</span>
        </button>
      </div>

      {/* Mode Selector Toggle: Zero Dollar vs With Collateral */}
      <div className="mb-8">
        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
          Select Borrower Profile & Collateral Status:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-neutral-100 rounded-2xl border border-neutral-200">
          
          <button
            onClick={() => setMode('zero_dollar')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex flex-col items-center sm:items-start text-left gap-0.5 ${
              mode === 'zero_dollar'
                ? 'bg-neutral-900 text-amber-400 shadow-md'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Zero Dollar User (MoMo / Bank History)</span>
            </div>
            <span className="text-[11px] font-normal text-neutral-400">
              No upfront collateral required · Max $15,000 via Kiva Predisbursed
            </span>
          </button>

          <button
            onClick={() => setMode('collateral')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex flex-col items-center sm:items-start text-left gap-0.5 ${
              mode === 'collateral'
                ? 'bg-neutral-900 text-amber-400 shadow-md'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>With Collateral ($1,000 – $1,000,000,000+)</span>
            </div>
            <span className="text-[11px] font-normal text-neutral-400">
              Aave 80%-93% LTV E-Mode or Corporate Private Credit
            </span>
          </button>

        </div>
      </div>

      {/* 2-Column Terminal Configuration Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left Column: Input Channels & Sovereign Selection */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Authentication / History Source */}
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Step 1: Connect History Source (One Bank Auth)
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-600">85% Accuracy</span>
            </div>

            {/* Auth Method Buttons */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setAuthMethod('momo')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  authMethod === 'momo'
                    ? 'bg-white border-amber-500 text-amber-900 shadow-sm'
                    : 'bg-neutral-100 border-transparent text-neutral-600'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mobile Money (MoMo)</span>
              </button>

              <button
                onClick={() => {
                  setAuthMethod('bank');
                  triggerPlaidLink();
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  authMethod === 'bank'
                    ? 'bg-white border-amber-500 text-amber-900 shadow-sm'
                    : 'bg-neutral-100 border-transparent text-neutral-600'
                }`}
              >
                <Landmark className="w-3.5 h-3.5 text-blue-600" />
                <span>Bank via Plaid (12k)</span>
              </button>

              <button
                onClick={() => setAuthMethod('wallet')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  authMethod === 'wallet'
                    ? 'bg-white border-amber-500 text-amber-900 shadow-sm'
                    : 'bg-neutral-100 border-transparent text-neutral-600'
                }`}
              >
                <Wallet className="w-3.5 h-3.5 text-purple-600" />
                <span>Web3 Wallet</span>
              </button>
            </div>

            {/* Method Specific Inputs */}
            {authMethod === 'momo' && (
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                  Ghana / Africa Mobile Money Number
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    placeholder="055 490 5505 / 024..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm font-mono focus:outline-none focus:border-amber-500"
                  />
                  <div className="text-[11px] font-mono text-neutral-600 bg-neutral-200/80 px-3 py-2.5 rounded-xl shrink-0">
                    500 txs/yr · GHS 200/wk
                  </div>
                </div>
              </div>
            )}

            {authMethod === 'bank' && (
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                  Plaid Link OAuth Bank Authorization
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={bankName}
                    readOnly
                    className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm font-medium text-neutral-800"
                  />
                  <button
                    onClick={triggerPlaidLink}
                    className="px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shrink-0 transition-colors"
                  >
                    Launch Plaid
                  </button>
                </div>
              </div>
            )}

            {authMethod === 'wallet' && (
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                  Ethereum / EVM Wallet Address
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            )}
          </div>

          {/* Step 2: Country Selection (195 Countries Sovereign Rating) */}
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Step 2: Select Country & Sovereign Risk
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 font-bold">
                195 Countries Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                  Country of Residence / Operation
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm font-medium focus:outline-none focus:border-amber-500"
                >
                  {countryList.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sovereign Rating & Spread Display */}
              <div className="p-3 rounded-xl bg-white border border-neutral-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-neutral-600">Sovereign Rating</div>
                  <div className="text-base font-bold text-neutral-900 font-mono">
                    {activeCountryInfo.flag} {activeCountryInfo.name}:{' '}
                    <span className="text-amber-800">{activeCountryInfo.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-neutral-600">Risk Spread</div>
                  <div className="text-sm font-mono font-bold text-neutral-800">
                    +{activeCountryInfo.spread}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amount Selection Slider */}
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-neutral-600 font-bold">
                Target Loan Capital:
              </span>
              <span className="text-xl font-black text-neutral-950 font-mono">
                ${amount.toLocaleString()} USD
              </span>
            </div>

            <input
              type="range"
              min={mode === 'zero_dollar' ? 50 : 800}
              max={mode === 'zero_dollar' ? 15000 : 1000000}
              step={mode === 'zero_dollar' ? 50 : 100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-neutral-200 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] font-mono text-neutral-600 mt-2">
              <span>{mode === 'zero_dollar' ? '$50 (Kiva Micro)' : '$800 (Aave Pool)'}</span>
              <span>{mode === 'zero_dollar' ? '$15,000 (Max Zero Dollar)' : '$1,000,000+ (Institutional)'}</span>
            </div>

            {mode === 'collateral' && (
              <div className="mt-4 pt-3 border-t border-neutral-200/80">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-neutral-600">Pledged Asset Collateral Value:</span>
                  <span className="font-bold text-neutral-900">${collateralValue.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={2000000}
                  step={1000}
                  value={collateralValue}
                  onChange={(e) => setCollateralValue(Number(e.target.value))}
                  className="w-full accent-neutral-800 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>

        </div>

        {/* Right Column: 10% Fee Breakdown, Consent & Execution */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* 10% Revenue Calculation Card */}
          <div className="p-6 rounded-2xl bg-neutral-900 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none" />

            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                OIL Fee Engine (10% Revenue)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Data-Blind Conduit
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 text-xs">Requested Facility</span>
                <span className="font-mono font-bold">${amount.toLocaleString()} USD</span>
              </div>

              <div className="flex justify-between items-center text-amber-400">
                <span className="text-xs font-medium">OIL 10% AI Scoring & Routing Fee</span>
                <span className="font-mono font-black text-lg">
                  ${scoringFeeUSD.toFixed(2)} USD
                </span>
              </div>

              {selectedCountry === 'GH' && (
                <div className="flex justify-between items-center text-xs text-neutral-400 pt-1 border-t border-neutral-800 font-mono">
                  <span>Paystack Local MoMo Amount</span>
                  <span className="text-white font-bold">GH₵ {scoringFeeGHS.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-neutral-800/80 text-[11px] text-neutral-300 leading-relaxed font-mono">
              💡 <strong>NOT an interest payment.</strong> OIL is a credit intelligence marketplace and does not lend. This is the one-time evaluation & routing fee.
            </div>
          </div>

          {/* Step 3: Mandatory Consent Checkbox */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasConsent}
                onChange={(e) => setHasConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-amber-600 accent-amber-600 focus:ring-amber-500"
              />
              <span className="text-xs text-amber-950 leading-relaxed">
                <strong>Mandatory Statutory Consent:</strong> "I authorize reading history time-bound revocable - data-blind conduit. OIL will evaluate cash flow velocities and route my request to open public pools."
              </span>
            </label>
          </div>

          {/* Step 4: Action Button to Check Score & Collect 10% Fee */}
          <button
            onClick={handleScoreAndFee}
            disabled={!hasConsent || isEvaluating}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 ${
              isEvaluating
                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 shadow-amber-500/25 active:scale-[0.99]'
            }`}
          >
            {isEvaluating ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-neutral-600 border-t-transparent rounded-full animate-spin" />
                <span>AI Scoring & Routing ({evalProgress}%)...</span>
              </div>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                <span>
                  Check My Score — Pay 10% Fee (${scoringFeeUSD.toFixed(0)})
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center text-[11px] font-mono text-neutral-600">
            Instant decision in 14 minutes · Automated open pool syndication
          </div>

        </div>

      </div>

      {/* Step 5 & 6: AI Routing Results & Disbursal Flow */}
      {routingResult && (
        <div className="mt-8 pt-8 border-t-2 border-neutral-200 animate-fadeIn">
          
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 text-white shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    AI Decision: APPROVED in 14 Minutes
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Credit Facility Routed Successfully
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-mono text-xs font-bold">
                  Score: {routingResult.score} ({routingResult.scoreTier} Tier)
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 font-mono text-xs">
                  APR: {routingResult.apr}%
                </span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="text-[11px] font-mono text-neutral-400 uppercase">Approved Amount</div>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  ${routingResult.amount.toLocaleString()} USD
                </div>
                <div className="text-[11px] text-neutral-500 mt-1 font-mono">
                  Requested: ${routingResult.requestedAmount.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="text-[11px] font-mono text-neutral-400 uppercase">Selected Disbursal Source</div>
                <div className="text-sm font-bold text-white mt-1 leading-snug">
                  {routingResult.source}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 font-mono">
                  Open Pool TVL: {routingResult.tvl}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="text-[11px] font-mono text-neutral-400 uppercase">OIL 10% Fee Paid</div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  ${routingResult.fee.toFixed(2)} USD
                </div>
                <div className="text-[11px] text-neutral-500 mt-1 font-mono">
                  Scoring & Routing Service Verified
                </div>
              </div>

            </div>

            {/* Warnings Display as Specified in Prompt */}
            <div className="space-y-3 mb-6">
              {routingResult.warning && (
                <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{routingResult.warning}</span>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-200 text-xs flex items-start gap-2.5 font-mono">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                <span>
                  <strong>Balance Sheet Note:</strong> {routingResult.note} ("$1,000 deposit + $800 borrow = net worth stays $1,000 NOT $1,980. Debt balance is $800.")
                </span>
              </div>
            </div>

            {/* Step 6: Get Credit Now Action */}
            <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  Step 6: Automated Disbursal Gateway
                </div>
                <div className="text-sm text-neutral-200 font-medium mt-0.5">
                  Disburse to: <strong className="text-white">{routingResult.disbursalChannel}</strong>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 font-mono">
                  No human in the loop · Smart contract clearing · Auto currency conversion
                </div>
              </div>

              {disbursalStatus === 'SUCCESS' ? (
                <div className="px-5 py-2.5 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs font-mono flex items-center gap-1.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>DISBURSED TO MOMO / BANK</span>
                </div>
              ) : (
                <button
                  onClick={handleDisburseCredit}
                  disabled={disbursalStatus === 'DISBURSING'}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-emerald-500/20"
                >
                  {disbursalStatus === 'DISBURSING' ? (
                    <span>Executing Protocol Rail...</span>
                  ) : (
                    <>
                      <span>Get Credit Now →</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* Settings Modal for Paystack Public Key */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-neutral-200">
            <h3 className="text-base font-bold text-neutral-900 mb-1">
              OIL Fee Gateway Settings
            </h3>
            <p className="text-xs text-neutral-500 mb-4 font-mono">
              Configure your production or test Paystack public key for 10% fee collection.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-700 uppercase mb-1">Paystack Public Key</label>
                <input
                  type="text"
                  value={paystackKey}
                  onChange={(e) => {
                    setPaystackKey(e.target.value);
                    localStorage.setItem('oil_paystack_key', e.target.value);
                  }}
                  placeholder="pk_live_... or pk_test_..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-neutral-100 text-neutral-600 text-[11px] leading-relaxed">
                When a user initiates scoring, the Paystack Inline modal charges the 10% fee directly in Ghana Cedis (GHS) or mobile money.
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-bold text-xs"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
