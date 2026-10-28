import React, { useState, useEffect } from 'react';
import { OskaiNavbar } from './components/oskai/OskaiNavbar';
import { OskayiProductsHub } from './components/home/OskayiProductsHub';
import { OilPage } from './pages/OilPage';
import { OilDecisionBrain } from './components/oil/OilDecisionBrain';
import { OskaiLoanDiscovery } from './components/oskai/OskaiLoanDiscovery';
import { OskaiLoanCompareModal } from './components/oskai/OskaiLoanCompareModal';
import { OskaiApplicationWizard } from './components/oskai/OskaiApplicationWizard';
import { OskaiBorrowerDashboard } from './components/oskai/OskaiBorrowerDashboard';
import { OskaiAiAssistant } from './components/oskai/OskaiAiAssistant';
import { OskaiPaystackModal } from './components/oskai/OskaiPaystackModal';
import { OskaiLenderDirectory } from './components/oskai/OskaiLenderDirectory';
import { OskaiAdminDashboard } from './components/oskai/OskaiAdminDashboard';
import { OskaiFooter } from './components/oskai/OskaiFooter';
import { 
  LoanProduct, 
  Lender, 
  LoanApplication, 
  ServiceFeeInvoice 
} from './server/oskaiLoanService';

export default function App() {
  // Primary Route: 'home' (Oskayi Products Hub) or 'oil' (Oskayi Instant Loan Platform)
  const [currentRoute, setCurrentRoute] = useState<'home' | 'oil'>('home');
  
  // Sub-tabs when on OIL route: 'marketplace' | 'brain' | 'discovery' | 'lenders' | 'assistant' | 'applications' | 'admin'
  const [oilActiveTab, setOilActiveTab] = useState<string>('marketplace');

  const [products, setProducts] = useState<LoanProduct[]>([]);
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [applicationsCount, setApplicationsCount] = useState<number>(0);

  // Application & Comparison Modals
  const [selectedProductForApply, setSelectedProductForApply] = useState<LoanProduct | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [comparisonProducts, setComparisonProducts] = useState<LoanProduct[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Paystack Modal State
  const [activeInvoiceRef, setActiveInvoiceRef] = useState<string | null>(null);
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  // URL Path Detection (/oil vs /)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/oil') || hash.includes('oil')) {
        setCurrentRoute('oil');
      } else {
        setCurrentRoute('home');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateToRoute = (route: 'home' | 'oil') => {
    setCurrentRoute(route);
    const targetPath = route === 'oil' ? '/oil' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load Lenders, Products, and Applications
  const loadPlatformData = async () => {
    try {
      const [prodRes, lendRes, appRes] = await Promise.all([
        fetch('/api/oskai/products'),
        fetch('/api/oskai/lenders'),
        fetch('/api/oskai/applications')
      ]);

      if (prodRes.ok) {
        const p = await prodRes.json();
        setProducts(p);
      }
      if (lendRes.ok) {
        const l = await lendRes.json();
        setLenders(l);
      }
      if (appRes.ok) {
        const a = await appRes.json();
        setApplicationsCount(a.length || 0);
      }
    } catch (err) {
      console.error('Error loading Oskai data:', err);
    }
  };

  useEffect(() => {
    loadPlatformData();
  }, []);

  const handleApplyForProduct = (product: LoanProduct, prefilled?: any) => {
    setSelectedProductForApply(product);
    setIsApplicationModalOpen(true);
  };

  const handleCompareProducts = (prods: LoanProduct[]) => {
    setComparisonProducts(prods);
    setIsCompareModalOpen(true);
  };

  const handleApplicationCreated = (app: LoanApplication) => {
    setIsApplicationModalOpen(false);
    setApplicationsCount(prev => prev + 1);
    
    if (app.serviceFeeInvoiceRef) {
      setActiveInvoiceRef(app.serviceFeeInvoiceRef);
      setIsPaystackOpen(true);
    }
    setOilActiveTab('applications');
  };

  const handleOpenPaystack = (invoiceRef: string) => {
    setActiveInvoiceRef(invoiceRef);
    setIsPaystackOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative selection:bg-teal-500 selection:text-slate-950">
      
      {/* Universal Institutional Navbar */}
      <OskaiNavbar
        currentRoute={currentRoute}
        oilActiveTab={oilActiveTab}
        onNavigateRoute={navigateToRoute}
        onSelectOilTab={(tab) => {
          setOilActiveTab(tab);
          navigateToRoute('oil');
        }}
        applicationsCount={applicationsCount}
      />

      {/* Main View Area */}
      <main className="flex-grow w-full">
        {/* ROUTE 1: OSKAYI PRODUCTS HUB (oskayi.com Homepage at "/") */}
        {currentRoute === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <OskayiProductsHub
              onNavigateToOil={() => navigateToRoute('oil')}
              onNavigateToSection={(secId) => {
                const el = document.getElementById(secId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* ROUTE 2: OIL - MASTER INSTANT LENDING DECISION BRAIN (at "/oil") */}
        {currentRoute === 'oil' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            
            {/* Sub-Tabs Selector Bar for OIL */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 overflow-x-auto gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[
                  { id: 'marketplace', label: 'Oil Marketplace (Live Feed)' },
                  { id: 'brain', label: 'Decision Brain (90s Scoring)' },
                  { id: 'discovery', label: 'Loan Discovery Catalog' },
                  { id: 'lenders', label: 'Lender Directory' },
                  { id: 'assistant', label: 'AI Credit Advisor' },
                  { id: 'applications', label: `My Applications (${applicationsCount})` },
                  { id: 'admin', label: 'Compliance & APIs' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setOilActiveTab(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      oilActiveTab === tab.id
                        ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                        : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <span className="text-[11px] text-emerald-400 font-mono hidden md:inline-flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Aggregator Core • Live Decisioning
              </span>
            </div>

            {/* Sub-Tab 0: Oil Marketplace with Live Kiva Feed & Paystack GHS 50 MoMo Score */}
            {oilActiveTab === 'marketplace' && (
              <OilPage />
            )}

            {/* Sub-Tab 1: Master Decision Brain */}
            {oilActiveTab === 'brain' && (
              <OilDecisionBrain
                onApplyForMatchedProduct={handleApplyForProduct}
                availableProducts={products}
              />
            )}

            {/* Sub-Tab 2: Loan Discovery Catalog */}
            {oilActiveTab === 'discovery' && (
              <div className="space-y-6">
                <div>
                  <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">
                    Marketplace Index
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                    Verified Loan Products in Ghana
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                    Compare verified loan limits, annual percentage rates (APR), required documentation, and processing speeds across licensed banks and microfinance networks.
                  </p>
                </div>

                <OskaiLoanDiscovery
                  onApplyForProduct={handleApplyForProduct}
                  onCompareProducts={handleCompareProducts}
                />
              </div>
            )}

            {/* Sub-Tab 3: Lenders Directory */}
            {oilActiveTab === 'lenders' && (
              <OskaiLenderDirectory
                lenders={lenders}
                products={products}
                onSelectProduct={handleApplyForProduct}
              />
            )}

            {/* Sub-Tab 4: AI Assistant & Calculator */}
            {oilActiveTab === 'assistant' && (
              <div className="space-y-6">
                <div>
                  <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">
                    Financial Advisory Suite
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                    AI Credit Advisor & Amortization Engine
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                    Calculate monthly installments using reducing balance amortization, evaluate Debt-to-Income (DTI), compare Flat vs APR rates, and run anti-predatory scam checks.
                  </p>
                </div>

                <OskaiAiAssistant />
              </div>
            )}

            {/* Sub-Tab 5: Borrower Applications Tracker */}
            {oilActiveTab === 'applications' && (
              <OskaiBorrowerDashboard
                onOpenPaystackInvoice={handleOpenPaystack}
                onExploreMoreLoans={() => {
                  setOilActiveTab('discovery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Sub-Tab 6: Compliance & Administration Console */}
            {oilActiveTab === 'admin' && (
              <OskaiAdminDashboard
                onRefreshData={() => {
                  loadPlatformData();
                }}
              />
            )}

          </div>
        )}
      </main>

      {/* Side-by-Side Comparison Modal */}
      <OskaiLoanCompareModal
        products={comparisonProducts}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onApplyForProduct={(p) => {
          setIsCompareModalOpen(false);
          handleApplyForProduct(p);
        }}
      />

      {/* Standardized Application Wizard Modal */}
      <OskaiApplicationWizard
        product={selectedProductForApply}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onApplicationCreated={handleApplicationCreated}
      />

      {/* Paystack Checkout Modal */}
      <OskaiPaystackModal
        invoiceReference={activeInvoiceRef}
        isOpen={isPaystackOpen}
        onClose={() => setIsPaystackOpen(false)}
        onPaymentCompleted={() => {
          setIsPaystackOpen(false);
          loadPlatformData();
        }}
      />

      {/* Universal Statutory Compliance Footer */}
      <OskaiFooter onNavigateTab={(tab) => {
        if (tab === 'marketplace') {
          navigateToRoute('oil');
          setOilActiveTab('discovery');
        } else if (tab === 'calculator') {
          navigateToRoute('oil');
          setOilActiveTab('assistant');
        } else if (tab === 'lenders' || tab === 'applications' || tab === 'admin') {
          navigateToRoute('oil');
          setOilActiveTab(tab);
        } else {
          navigateToRoute('home');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
