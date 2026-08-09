import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PublicTickerBar } from './components/PublicTickerBar';
import { Hero } from './components/Hero';
import { CompanyOverview } from './components/CompanyOverview';
import { ServicesPillars } from './components/ServicesPillars';
import { FinancingCalculator } from './components/FinancingCalculator';
import { Web3ArchitectureExplorer } from './components/Web3ArchitectureExplorer';
import { NodeDiagnostics } from './components/NodeDiagnostics';
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

  const handleApplyForFinancing = (principalUSD: number, summaryText: string) => {
    setSelectedServiceForInquiry('Project Financing & Advisory');
    setInquiryInitialMessage(summaryText);
    handleNavigateSection('contact');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        onOpenVerification={() => setIsVerificationModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
      />

      {/* Live Market & RPC Status Bar */}
      <PublicTickerBar />

      {/* Main Content Sections */}
      <main>
        {/* Executive Hero */}
        <Hero
          onOpenVerification={() => setIsVerificationModalOpen(true)}
          onNavigateSection={handleNavigateSection}
        />

        {/* Corporate Profile & Leadership (Listowel Sarsah Adentwi-Edzii, Founder & CEO) */}
        <CompanyOverview
          onOpenVerification={() => setIsVerificationModalOpen(true)}
        />

        {/* Core Practice Pillars & Partner Delivery */}
        <ServicesPillars
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* Interactive Institutional Project Financing Feasibility Calculator */}
        <FinancingCalculator
          onApplyForFinancing={handleApplyForFinancing}
        />

        {/* Custom Industry Web3 Architecture Explorer */}
        <Web3ArchitectureExplorer />

        {/* Direct Public Node Diagnostics Ping */}
        <NodeDiagnostics />

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
