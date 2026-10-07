import React, { useState } from 'react';
import { CreditCheckoutHeader } from '../components/creditCheckout/CreditCheckoutHeader';
import { CheckoutFlow } from '../components/creditCheckout/CheckoutFlow';
import { MyRepaymentsView } from '../components/creditCheckout/MyRepaymentsView';
import { MyProtectionClaimsView } from '../components/creditCheckout/MyProtectionClaimsView';
import { MerchantPortalView } from '../components/creditCheckout/MerchantPortalView';
import { ProviderGovernanceView } from '../components/creditCheckout/ProviderGovernanceView';
import { IntegrationHealthView } from '../components/creditCheckout/IntegrationHealthView';
import { ZeroGasRailsView } from '../components/creditCheckout/ZeroGasRailsView';
import { ZeroGasExplainerModal } from '../components/creditCheckout/ZeroGasExplainerModal';
import { CreditCheckoutTab, SystemEnvironmentMode } from '../types/creditCheckout';

export const CreditCheckoutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CreditCheckoutTab>('CHECKOUT');
  const [environmentMode, setEnvironmentMode] = useState<SystemEnvironmentMode>('SANDBOX');
  const [showExplainer, setShowExplainer] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Suite Header & Controls */}
      <CreditCheckoutHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        environmentMode={environmentMode}
        setEnvironmentMode={setEnvironmentMode}
        onOpenExplainer={() => setShowExplainer(true)}
      />

      {/* Main Tab Content */}
      <main className="transition-all duration-300">
        {activeTab === 'CHECKOUT' && (
          <CheckoutFlow
            environmentMode={environmentMode}
            onViewRepayments={() => setActiveTab('REPAYMENTS')}
            onViewClaims={() => setActiveTab('PROTECTION_CLAIMS')}
          />
        )}

        {activeTab === 'REPAYMENTS' && <MyRepaymentsView />}

        {activeTab === 'PROTECTION_CLAIMS' && <MyProtectionClaimsView />}

        {activeTab === 'MERCHANT_PORTAL' && <MerchantPortalView />}

        {activeTab === 'GOVERNANCE' && <ProviderGovernanceView />}

        {activeTab === 'HEALTH' && <IntegrationHealthView />}

        {activeTab === 'ZERO_GAS_RAILS' && <ZeroGasRailsView />}
      </main>

      {/* Explainer Modal */}
      <ZeroGasExplainerModal
        isOpen={showExplainer}
        onClose={() => setShowExplainer(false)}
      />
    </div>
  );
};
