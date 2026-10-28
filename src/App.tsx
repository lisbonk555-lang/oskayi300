import React, { useState, useEffect } from 'react';
import { OskaiNavbar } from './components/oskai/OskaiNavbar';
import { OskaiHero } from './components/oskai/OskaiHero';
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
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [products, setProducts] = useState<LoanProduct[]>([]);
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [applicationsCount, setApplicationsCount] = useState<number>(0);

  // Selected Discovery Filters
  const [discoveryCategory, setDiscoveryCategory] = useState<string>('All');
  const [discoveryAmount, setDiscoveryAmount] = useState<number>(5000);

  // Application Modal state
  const [selectedProductForApply, setSelectedProductForApply] = useState<LoanProduct | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // Comparison Modal state
  const [comparisonProducts, setComparisonProducts] = useState<LoanProduct[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Paystack Modal state
  const [activeInvoiceRef, setActiveInvoiceRef] = useState<string | null>(null);
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  // Load Lenders & Products
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

  // Handlers
  const handleStartDiscovery = (category?: string, amount?: number) => {
    if (category) setDiscoveryCategory(category);
    if (amount) setDiscoveryAmount(amount);
    setActiveTab('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyForProduct = (product: LoanProduct) => {
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
    
    // If invoice created, prompt Paystack option
    if (app.serviceFeeInvoiceRef) {
      setActiveInvoiceRef(app.serviceFeeInvoiceRef);
      setIsPaystackOpen(true);
    }
    setActiveTab('applications');
  };

  const handleOpenPaystack = (invoiceRef: string) => {
    setActiveInvoiceRef(invoiceRef);
    setIsPaystackOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative selection:bg-teal-500 selection:text-slate-950">
      {/* Top Navbar */}
      <OskaiNavbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        applicationsCount={applicationsCount}
      />

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        {/* Landing View */}
        {activeTab === 'landing' && (
          <div className="space-y-16">
            <OskaiHero
              onStartDiscovery={handleStartDiscovery}
              onOpenAssistant={() => {
                setActiveTab('assistant');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">
                    Marketplace Preview
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white mt-1">
                    Verified Credit Products in Ghana
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('discovery')}
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 underline"
                >
                  View All Products &rarr;
                </button>
              </div>

              <OskaiLoanDiscovery
                initialCategory={discoveryCategory}
                initialAmount={discoveryAmount}
                onApplyForProduct={handleApplyForProduct}
                onCompareProducts={handleCompareProducts}
              />
            </div>
          </div>
        )}

        {/* Discovery Marketplace View */}
        {activeTab === 'discovery' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div>
              <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">
                Marketplace Index
              </span>
              <h2 className="text-3xl font-bold font-serif text-white mt-1">
                Loan Discovery & Comparison Engine
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Compare verified loan terms, annual percentage rates (APR), required documentation, and processing speeds across licensed banks and microfinance networks.
              </p>
            </div>

            <OskaiLoanDiscovery
              initialCategory={discoveryCategory}
              initialAmount={discoveryAmount}
              onApplyForProduct={handleApplyForProduct}
              onCompareProducts={handleCompareProducts}
            />
          </div>
        )}

        {/* Lenders Directory View */}
        {activeTab === 'lenders' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <OskaiLenderDirectory
              lenders={lenders}
              products={products}
              onSelectProduct={handleApplyForProduct}
            />
          </div>
        )}

        {/* AI Financial Tools & Amortization Calculator */}
        {activeTab === 'assistant' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">
                Financial Advisory Suite
              </span>
              <h2 className="text-3xl font-bold font-serif text-white mt-1">
                AI Credit Advisor & Amortization Engine
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Model exact monthly installments using reducing balance amortization, evaluate your Debt-to-Income (DTI) ratio, compare Flat vs. APR rates, and run anti-predatory scam checks.
              </p>
            </div>

            <OskaiAiAssistant />
          </div>
        )}

        {/* Borrower Applications Tracking Console */}
        {activeTab === 'applications' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <OskaiBorrowerDashboard
              onOpenPaystackInvoice={handleOpenPaystack}
              onExploreMoreLoans={() => {
                setActiveTab('discovery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Compliance & Administration Console */}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <OskaiAdminDashboard
              onRefreshData={() => {
                loadPlatformData();
              }}
            />
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
        onPaymentCompleted={(inv) => {
          setIsPaystackOpen(false);
          loadPlatformData();
        }}
      />

      {/* Statutory Legal & Intermediary Footer */}
      <OskaiFooter onNavigateTab={(tab) => {
        if (tab === 'marketplace') setActiveTab('discovery');
        else if (tab === 'calculator') setActiveTab('assistant');
        else setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
