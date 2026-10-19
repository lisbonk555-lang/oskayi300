import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CeoMessage } from './components/CeoMessage';
import { CompanyOverview } from './components/CompanyOverview';
import { ProductsSection } from './components/ProductsSection';
import { MultiTrillionFintechSection } from './components/MultiTrillionFintechSection';
import { NewsAndArticlesSection } from './components/NewsAndArticlesSection';
import { WhyInstitutionsChoose } from './components/WhyInstitutionsChoose';
import { ComplianceModal } from './components/ComplianceModal';
import { InquiryForm } from './components/InquiryForm';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { GlobalTreasuryFintechSection } from './components/GlobalTreasuryFintechSection';
import { CrossBorderSmeTreasurySection } from './components/CrossBorderSmeTreasurySection';
import { NexusCloudPage } from './pages/NexusCloudPage';
import { CreditCheckoutPage } from './pages/CreditCheckoutPage';
import { FreeGlobalDevelopmentPage } from './pages/FreeGlobalDevelopmentPage';
import { FleetOrchestrationPortalPage } from './pages/FleetOrchestrationPortalPage';
import { EngineDetailPage } from './pages/EngineDetailPage';
import { IgpdPage } from './pages/IgpdPage';
import { MasjidGatePage } from './pages/MasjidGatePage';
import { MasjidMainPage } from './pages/MasjidMainPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'nexus-cloud' | 'credit-checkout' | 'free-global-development' | 'fleet-orchestration' | 'engine-detail' | 'igpd' | 'masjid-gate' | 'masjid-main'>('main');
  const [selectedEngineNumber, setSelectedEngineNumber] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('Fintech Solutions for Banks');
  const [inquiryInitialMessage, setInquiryInitialMessage] = useState<string>('');

  // Handle URL navigation on mount and history changes
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === '/igpd/masjid/main' || hash === '#igpd/masjid/main' || hash === '#masjid-main') {
        setCurrentView('masjid-main');
        setActiveSection('masjid-main');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (path === '/igpd/masjid' || hash === '#igpd/masjid' || hash === '#masjid-gate' || hash === '#masjid') {
        setCurrentView('masjid-gate');
        setActiveSection('masjid-gate');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (path === '/igpd' || hash === '#igpd') {
        setCurrentView('igpd');
        setActiveSection('igpd');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const engineMatch = path.match(/^\/engine\/(\d+)/) || hash.match(/^#engine-?(\d+)/);
      if (engineMatch) {
        const num = parseInt(engineMatch[1], 10);
        if (num >= 1 && num <= 10) {
          setSelectedEngineNumber(num);
          setCurrentView('engine-detail');
          setActiveSection('multi-trillion-engines');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      if (path === '/fleet' || hash === '#fleet' || path === '/fleet-orchestration' || hash === '#fleet-orchestration') {
        setCurrentView('fleet-orchestration');
        setActiveSection('fleet-orchestration');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/free-global-development' || hash === '#free-global-development') {
        setCurrentView('free-global-development');
        setActiveSection('free-global-development');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/credit-checkout' || hash === '#credit-checkout') {
        setCurrentView('credit-checkout');
        setActiveSection('credit-checkout');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/nexus-cloud' || hash === '#nexus-cloud') {
        setCurrentView('nexus-cloud');
        setActiveSection('nexus-cloud');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('main');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleNavigateFreeGlobalDev = () => {
    setCurrentView('free-global-development');
    setActiveSection('free-global-development');
    window.history.pushState({}, '', '/free-global-development');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCreditCheckout = () => {
    setCurrentView('credit-checkout');
    setActiveSection('credit-checkout');
    window.history.pushState({}, '', '/credit-checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateNexusCloud = () => {
    setCurrentView('nexus-cloud');
    setActiveSection('nexus-cloud');
    window.history.pushState({}, '', '/nexus-cloud');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateFleetOrchestration = () => {
    setCurrentView('fleet-orchestration');
    setActiveSection('fleet-orchestration');
    window.history.pushState({}, '', '/fleet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateIgpd = () => {
    setCurrentView('igpd');
    setActiveSection('igpd');
    window.history.pushState({}, '', '/igpd');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateMasjidGate = () => {
    setCurrentView('masjid-gate');
    setActiveSection('masjid-gate');
    window.history.pushState({}, '', '/igpd/masjid');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateMasjidMain = () => {
    setCurrentView('masjid-main');
    setActiveSection('masjid-main');
    window.history.pushState({}, '', '/igpd/masjid/main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateEngine = (engineNum: number) => {
    const validNum = Math.max(1, Math.min(10, engineNum));
    setSelectedEngineNumber(validNum);
    setCurrentView('engine-detail');
    setActiveSection('multi-trillion-engines');
    window.history.pushState({}, '', `/engine/${validNum}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('main');
    setActiveSection('hero');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'masjid' || sectionId === 'masjid-gate' || sectionId === 'igpd-masjid') {
      handleNavigateMasjidGate();
      return;
    }

    if (sectionId === 'masjid-main' || sectionId === 'igpd-masjid-main') {
      handleNavigateMasjidMain();
      return;
    }

    if (sectionId === 'igpd') {
      handleNavigateIgpd();
      return;
    }

    if (sectionId.startsWith('engine-')) {
      const num = parseInt(sectionId.replace('engine-', ''), 10);
      if (num >= 1 && num <= 10) {
        handleNavigateEngine(num);
        return;
      }
    }

    if (sectionId === 'fleet' || sectionId === 'fleet-orchestration') {
      handleNavigateFleetOrchestration();
      return;
    }

    if (sectionId === 'free-global-development') {
      handleNavigateFreeGlobalDev();
      return;
    }

    if (sectionId === 'credit-checkout') {
      handleNavigateCreditCheckout();
      return;
    }

    if (sectionId === 'nexus-cloud') {
      handleNavigateNexusCloud();
      return;
    }

    if (currentView !== 'main') {
      setCurrentView('main');
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
    setInquiryInitialMessage(`Inquiry regarding ${serviceTitle} implementation for our organization.`);
    if (currentView !== 'main') {
      setCurrentView('main');
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      handleNavigateSection('contact');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        onOpenVerification={() => setIsVerificationModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
      />

      {/* View routing */}
      {currentView === 'masjid-gate' ? (
        <MasjidGatePage
          onEnter={handleNavigateMasjidMain}
          onNavigateHome={handleNavigateHome}
          onNavigateIgpd={handleNavigateIgpd}
        />
      ) : currentView === 'masjid-main' ? (
        <MasjidMainPage
          onNavigateGate={handleNavigateMasjidGate}
          onNavigateHome={handleNavigateHome}
          onNavigateIgpd={handleNavigateIgpd}
        />
      ) : currentView === 'igpd' ? (
        <IgpdPage
          onNavigateHome={handleNavigateHome}
          onNavigateSection={handleNavigateSection}
          onNavigateMasjid={handleNavigateMasjidGate}
        />
      ) : currentView === 'engine-detail' ? (
        <EngineDetailPage
          engineNumber={selectedEngineNumber}
          onNavigateHome={handleNavigateHome}
          onNavigateEngine={handleNavigateEngine}
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />
      ) : currentView === 'fleet-orchestration' ? (
        <FleetOrchestrationPortalPage
          onNavigateHome={handleNavigateHome}
          onOpenVerification={() => setIsVerificationModalOpen(true)}
        />
      ) : currentView === 'free-global-development' ? (
        <FreeGlobalDevelopmentPage
          onNavigateHome={handleNavigateHome}
          onOpenVerification={() => setIsVerificationModalOpen(true)}
        />
      ) : currentView === 'credit-checkout' ? (
        <CreditCheckoutPage />
      ) : currentView === 'nexus-cloud' ? (
        <NexusCloudPage
          onNavigateHome={handleNavigateHome}
          onOpenVerification={() => setIsVerificationModalOpen(true)}
          onInitiateInquiry={handleSelectServiceForInquiry}
        />
      ) : (
        <>
          {/* Main Content Sections */}
          <main>
            {/* Executive Hero */}
            <Hero
              onOpenVerification={() => setIsVerificationModalOpen(true)}
              onNavigateSection={handleNavigateSection}
              onNavigateNexusCloud={handleNavigateNexusCloud}
            />

            {/* Executive CEO Message Section (Placed High at Top) */}
            <CeoMessage
              onOpenVerification={() => setIsVerificationModalOpen(true)}
              onNavigateContact={() => handleNavigateSection('contact')}
            />

            {/* Featured Software Products & Autonomous Intelligence BOTs */}
            <ProductsSection
              onNavigateSection={handleNavigateSection}
              onNavigateNexusCloud={handleNavigateNexusCloud}
              onNavigateCreditCheckout={handleNavigateCreditCheckout}
              onNavigateFleet={handleNavigateFleetOrchestration}
              onNavigateEngine={handleNavigateEngine}
            />

            {/* Autonomous Sovereign & Institutional Market Engines */}
            <MultiTrillionFintechSection
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
              onNavigateEngine={handleNavigateEngine}
            />

            {/* Statutory Profile & Mission */}
            <CompanyOverview
              onOpenVerification={() => setIsVerificationModalOpen(true)}
            />

            {/* Global Treasury & Cash Management Orchestration Service + Core Fintech Engines */}
            <GlobalTreasuryFintechSection
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
            />

            {/* Cross-Border SME Treasury Orchestration Service */}
            <CrossBorderSmeTreasurySection
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
            />

            {/* Automated News & Articles: Empowering African & Global Growth */}
            <NewsAndArticlesSection
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
            />

            {/* Why Institutions Choose Oskayi Consult */}
            <WhyInstitutionsChoose
              onNavigateContact={() => handleNavigateSection('contact')}
            />

            {/* Executive Consultation & Inquiry Form */}
            <InquiryForm
              initialServiceTitle={selectedServiceForInquiry}
              initialMessage={inquiryInitialMessage}
            />

            {/* Location & GPS Map Hub */}
            <ContactAndLocation />
          </main>

          {/* Footer */}
          <Footer
            onOpenVerification={() => setIsVerificationModalOpen(true)}
            onNavigateSection={handleNavigateSection}
            onNavigateNexusCloud={handleNavigateNexusCloud}
          />
        </>
      )}

      {/* Official Certificate Verification Modal */}
      <ComplianceModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />

    </div>
  );
}
