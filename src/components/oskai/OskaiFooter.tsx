import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  HelpCircle, 
  AlertCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface OskaiFooterProps {
  onNavigateTab?: (tab: string) => void;
}

export const OskaiFooter: React.FC<OskaiFooterProps> = ({ onNavigateTab }) => {
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-16 relative z-10">
      {/* Top Banner: Statutory Transparency Notice */}
      <div className="bg-slate-900 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
            <span className="font-semibold text-white tracking-wide">
              Statutory Intermediary Notice:
            </span>
            <span className="text-slate-300 text-xs">
              Oskai Instant Loan is an independent loan discovery & application preparation service. We are not a bank or direct lender.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400 shrink-0">
            <span>Reg No: <strong className="text-slate-200">BN248851025</strong></span>
            <span>TIN: <strong className="text-slate-200">P0000590118</strong></span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-white text-base tracking-tight block">
                  Oskai Instant Loan
                </span>
                <span className="text-[11px] text-teal-400 block font-medium">
                  Discover Funding. Apply with Confidence.
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Providing standardized digital credit discovery, loan comparison, and verified application packet routing for individuals and businesses across Ghana and international funding channels.
            </p>

            <div className="pt-2 text-[11px] space-y-1 text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>House No. 352, McCarthy Hill, GA South, Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href="mailto:info@oskayi.com" className="hover:text-teal-400 underline">info@oskayi.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>+233 24 490 5505 / 0244905505</span>
              </div>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('marketplace')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Loan Discovery Marketplace
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('lenders')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Licensed Lenders Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('calculator')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Loan Amortization Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('applications')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Track My Application
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('admin')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Compliance Console
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setActiveLegalModal('terms')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Terms of Service & Non-Lender Notice
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveLegalModal('privacy')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Privacy Policy & Data Act (Act 843)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveLegalModal('fee_disclosure')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Transparent Fee Policy (Paystack)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveLegalModal('complaints')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Complaints & Dispute Resolution
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveLegalModal('anti_fraud')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Anti-Fraud & Zero Fake Loan Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory Standards */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Governing Statutes
            </h4>
            <div className="space-y-2.5 text-[11px] text-slate-400">
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-slate-200 block">Bank of Ghana</span>
                <span>Banks & Specialised Deposit-Taking Institutions Act, 2016 (Act 930)</span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-slate-200 block">Data Protection Commission</span>
                <span>Data Protection Act, 2012 (Act 843)</span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-slate-200 block">Borrowers & Lenders</span>
                <span>Borrowers and Lenders Act, 2020 (Act 1052)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Disclaimer Card */}
        <div className="mt-10 pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong className="text-slate-300">DISCLOSURE REGARDING LOAN OFFERS & ADVISORY CHARGES:</strong> Oskai Instant Loan is an algorithmic credit comparison engine and digital loan-intake intermediary owned and operated by Oskayi Consult. We are not a direct lender, credit broker, or deposit-taking institution. Any quoted annual percentage rates (APRs) ranging from 18.5% to 36.0%, loan tenures, and monthly repayments represent indicative rates published by licensed commercial banks and accredited microfinance institutions in Ghana. All credit decisions, underwriting, terms, and funds disbursements are made solely at the discretion of the partner lender subject to their verification of your Ghana Card, credit bureau score, and debt-to-income (DTI) ratio.
          </p>
          <p>
            <strong className="text-slate-300">NO ADVANCE DEPOSITS OR GUARANTEED APPROVALS:</strong> The optional GHS 50 platform application preparation and Paystack verification fee covers digital dossier compilation, KYC verification, and encrypted transmission to participating banks. This fee is strictly non-reimbursable for technology processing, is NOT a collateral deposit, and DOES NOT guarantee that a loan will be sanctioned or disbursed. We strictly adhere to the guidelines of the Data Protection Act, 2012 (Act 843).
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Oskayi Consult. All rights reserved. Oskai Instant Loan &trade;.
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by Oskayi Consult</span>
            <span>Paystack Certified Intermediary</span>
            <span>Bank of Ghana Ecosystem Participant</span>
          </div>
        </div>
      </div>

      {/* Modal for Legal Documents */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 text-slate-800 animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 font-serif">
                {activeLegalModal === 'terms' && 'Terms of Service & Non-Lender Notice'}
                {activeLegalModal === 'privacy' && 'Privacy Policy & Act 843 Compliance'}
                {activeLegalModal === 'fee_disclosure' && 'Transparent Fee & Paystack Billing Policy'}
                {activeLegalModal === 'complaints' && 'Complaints & Dispute Resolution Procedure'}
                {activeLegalModal === 'anti_fraud' && 'Anti-Fraud & Zero-Fabrication Mandate'}
              </h3>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-slate-600 leading-relaxed">
              {activeLegalModal === 'terms' && (
                <>
                  <p className="font-semibold text-slate-800">
                    1. Intermediary Scope
                  </p>
                  <p>
                    Oskai Instant Loan provides automated loan search, comparison, and standardized application dossier preparation. Use of the platform does not create a borrower-lender agreement between you and Oskayi Consult.
                  </p>
                  <p className="font-semibold text-slate-800">
                    2. Representation of Loan Information
                  </p>
                  <p>
                    All interest rates, loan limits, and processing timelines reflect publicly published benchmarks by regulated institutions or verified partner feeds. Official loan agreements are executed strictly with the selected licensed financial institution.
                  </p>
                  <p className="font-semibold text-slate-800">
                    3. User Representations
                  </p>
                  <p>
                    By submitting an application, you certify that all information provided, including your Ghana Card number, monthly income, and employment details, is accurate, genuine, and verifiable.
                  </p>
                </>
              )}

              {activeLegalModal === 'privacy' && (
                <>
                  <p className="font-semibold text-slate-800">
                    Compliance with Ghana Data Protection Act, 2012 (Act 843)
                  </p>
                  <p>
                    We collect personal identification data (Full Name, Ghana Card Number, Email, Telephone, and Income bracket) solely for the purpose of compiling your standardized credit application and verifying your identity with accredited credit reporting agencies.
                  </p>
                  <p>
                    Your data is encrypted in transit using 256-bit TLS encryption and stored securely. We will never sell, rent, or trade your personal information to third-party telemarketers.
                  </p>
                </>
              )}

              {activeLegalModal === 'fee_disclosure' && (
                <>
                  <p className="font-semibold text-slate-800">
                    Fee Transparency Notice
                  </p>
                  <p>
                    Browsing, comparing loan products, using the AI Amortization Calculator, and viewing lender directories is 100% free of charge.
                  </p>
                  <p>
                    For standardized digital dossier routing, an advisory and technology fee of GHS 50 is charged securely via Paystack. This fee compensates for system verification and API routing. It is clearly labeled before checkout and is never deducted from any loan principal.
                  </p>
                </>
              )}

              {activeLegalModal === 'complaints' && (
                <>
                  <p className="font-semibold text-slate-800">
                    Complaints Handling Standard Operating Procedure
                  </p>
                  <p>
                    If you encounter an issue with your application submission, Paystack receipt, or lender contact, please email complaints@oskayi.com or info@oskayi.com with your Application Reference Number.
                  </p>
                  <p>
                    Our compliance team acknowledges all submissions within 24 hours and issues a formal resolution within 5 business days. If a dispute relates to a lender's loan underwriting decision, we will direct your dossier to the bank's consumer protection desk.
                  </p>
                </>
              )}

              {activeLegalModal === 'anti_fraud' && (
                <>
                  <p className="font-semibold text-slate-800">
                    Zero-Tolerance Policy on Fake Loans & Simulated Approvals
                  </p>
                  <p>
                    Oskai Instant Loan strictly prohibits and rejects fraudulent lending practices. We will never display fabricated account balances, generate false approval certificates, or falsely claim that funds have been disbursed without written, verifiable evidence from an accredited financial institution.
                  </p>
                  <p>
                    All applications undergo genuine audit checks. Suspicious attempts to obtain credit through forged identity documents will be reported to the Cyber Security Authority (CSA) and law enforcement authorities.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
