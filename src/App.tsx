import React, { useState } from 'react';
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

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('Fintech Solutions for Banks');
  const [inquiryInitialMessage, setInquiryInitialMessage] = useState<string>('');

  const handleNavigateSection = (sectionId: string) => {
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
    handleNavigateSection('contact');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        onOpenVerification={() => setIsVerificationModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Executive Hero */}
        <Hero
          onOpenVerification={() => setIsVerificationModalOpen(true)}
          onNavigateSection={handleNavigateSection}
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
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
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

      {/* Official Certificate Verification Modal */}
      <ComplianceModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenVerification={() => setIsVerificationModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

    </div>
  );
}
