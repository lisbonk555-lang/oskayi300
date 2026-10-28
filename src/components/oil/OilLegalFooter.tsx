import React from 'react';
import { ShieldCheck, Scale, Landmark, ExternalLink, Globe } from 'lucide-react';
import { OilLogo } from './OilLogo';

export function OilLegalFooter() {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-300 text-xs border-t border-neutral-800 pt-12 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Statutory Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-8 border-b border-neutral-800 gap-4">
          <div className="flex items-center gap-3">
            <OilLogo showText={false} size={36} />
            <div>
              <span className="text-base font-black text-white tracking-tight">
                OIL — Oskayi Instant Loan
              </span>
              <span className="text-neutral-400 text-xs block font-mono">
                One Bank Auth · One AI Score · One Instant Loan
              </span>
            </div>
          </div>

          <div className="text-xs font-mono text-amber-400 font-bold bg-neutral-800/80 px-3 py-1.5 rounded-xl border border-neutral-700/80">
            Powered by Oskayi Consult • Global Fintech Infrastructure • Worldwide - 195 Countries
          </div>
        </div>

        {/* Mandatory Statutory Legal Disclaimer as verbatim in prompt */}
        <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 text-neutral-400 leading-relaxed space-y-4 font-mono text-[11px] mb-8">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Regulatory & Market Conduct Disclosure (Mandatory)</span>
          </div>

          <p>
            <strong>OIL - Oskayi Instant Loan is a credit intelligence marketplace. We do not lend.</strong> We are a 
            data-blind conduit like an Account Aggregator. Funds are disbursed directly from licensed partners and 
            open protocols (Aave $14.4B TVL, Kiva $1.6B, LendingClub $100B, Private Credit $1.8T).
          </p>

          <p>
            We provide AI scoring for a 10% fee collected via Paystack (PSP licensed by the Bank of Ghana) and Plaid 
            (12,000+ connected financial institutions across the US, Canada, UK, and Europe). No lending license is needed 
            by OIL as all credit risk is borne by the third-party lender, with smart escrow mandatory.
          </p>

          <p>
            <strong>Predisbursement Architecture:</strong> Field Partners give loans sometimes before the loan is even 
            posted to Kiva. This is called predisbursing. Essential for instant disbursement: APIs and Account Aggregators, 
            consent-based data sharing, and regulated financial rails. Plaid supports over 12,000 financial institutions 
            across the US, Canada, UK, and Europe. Deutsche Bank reduced corporate loan decisions from weeks to minutes, 
            and multinational loans from months to weeks. RapidData compressed loan decisioning from nine days to fourteen minutes.
          </p>
        </div>

        {/* Operating Corridors & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} Oskayi Consult (Registration No: BN248851025). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Paystack PSP Compliant</span>
            <span>·</span>
            <span>Plaid Open Banking Partner</span>
            <span>·</span>
            <span>Aave v3 Protocol Conduit</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
