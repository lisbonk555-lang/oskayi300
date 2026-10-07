import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowcaseCarousel } from './components/ShowcaseCarousel';
import { ServicesPillars } from './components/ServicesPillars';
import { CeoMessage } from './components/CeoMessage';
import { CompanyOverview } from './components/CompanyOverview';
import { IntegratedGlobalCapabilities } from './components/IntegratedGlobalCapabilities';
import { WhyInstitutionsChoose } from './components/WhyInstitutionsChoose';
import { ComplianceModal } from './components/ComplianceModal';
import { InquiryForm } from './components/InquiryForm';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { NexusCloudPage } from './pages/NexusCloudPage';
import { SellerProtectPage } from './pages/SellerProtectPage';
import { CreditCheckoutPage } from './pages/CreditCheckoutPage';
import { FreeGlobalDevelopmentPage } from './pages/FreeGlobalDevelopmentPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'nexus-cloud' | 'seller-protect' | 'credit-checkout' | 'free-global-development'>('main');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('Fintech Solutions for Banks');
  const [inquiryInitialMessage, setInquiryInitialMessage] = useState<string>('');

  // Handle URL navigation on mount and history changes
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/free-global-development' || hash === '#free-global-development') {
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
      } else if (path === '/seller-protect' || hash === '#seller-protect') {
        setCurrentView('seller-protect');
        setActiveSection('seller-protect');
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

  const handleNavigateSellerProtect = () => {
    setCurrentView('seller-protect');
    setActiveSection('seller-protect');
    window.history.pushState({}, '', '/seller-protect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('main');
    setActiveSection('hero');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
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

    if (sectionId === 'seller-protect') {
      handleNavigateSellerProtect();
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
      {currentView === 'free-global-development' ? (
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
      ) : currentView === 'seller-protect' ? (
        <SellerProtectPage
          onNavigateHome={handleNavigateHome}
          onOpenVerification={() => setIsVerificationModalOpen(true)}
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

            {/* 10 Strategic Showcase Slides */}
            <ShowcaseCarousel
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
            />

            {/* Practice Pillars & Solutions */}
            <ServicesPillars
              onSelectServiceForInquiry={(title) => {
                if (title.toLowerCase().includes('credit sponsored checkout')) {
                  handleNavigateCreditCheckout();
                } else {
                  handleSelectServiceForInquiry(title);
                }
              }}
            />

            {/* Statutory Profile & Mission */}
            <CompanyOverview
              onOpenVerification={() => setIsVerificationModalOpen(true)}
            />

            {/* Our Integrated Global Capabilities */}
            <IntegratedGlobalCapabilities
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
