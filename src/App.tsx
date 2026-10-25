import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  FileText, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Send, 
  MapPin, 
  ArrowRight,
  MessageSquare,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from './data/companyData';

export default function App() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail && !inquiryPhone) return;
    
    // Create mailto link for direct submission to info@oskayi.com
    const subject = encodeURIComponent(`Executive Inquiry during Redevelopment - from ${inquiryName || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${inquiryName}\n` +
      `Email: ${inquiryEmail}\n` +
      `Phone: ${inquiryPhone}\n\n` +
      `Message:\n${inquiryMessage}\n\n` +
      `Sent via Oskayi Consult Redevelopment Gateway`
    );
    
    window.location.href = `mailto:info@oskayi.com?subject=${subject}&body=${body}`;
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Decorative Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]"></div>
      </div>

      {/* Top Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold text-xl tracking-wider">
              O
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                OSKAYI<span className="text-amber-400"> CONSULT</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 block -mt-1 font-mono">
                Reg: {OFFICIAL_COMPANY_INFO.registrationNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>System Redevelopment</span>
            </div>
            <a
              href="mailto:info@oskayi.com"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-md shadow-amber-500/20"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@oskayi.com</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center">
        
        {/* Redevelopment Status Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Notice of Scheduled Upgrades & Platform Transformation</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-center text-white mb-6 leading-tight">
          Website Under <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Redevelopment</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg text-center max-w-2xl mb-12 leading-relaxed">
          We are upgrading our enterprise digital platform, fintech infrastructure, and client advisory portals. 
          Our team remains fully operational and accessible via our official corporate communication channels below.
        </p>

        {/* Statutory & Official Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
          
          {/* Card 1: Official Corporate Identification */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
            
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">Statutory Registration</h2>
                <p className="text-xs text-slate-400 font-mono">Government of Ghana • ROC Verified</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-800/80 pb-3">
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">Registered Business Entity</span>
                <span className="text-base font-bold text-white tracking-wide">{OFFICIAL_COMPANY_INFO.companyName}</span>
              </div>

              <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">Business Registration Number</span>
                  <span className="text-lg font-mono font-bold text-amber-400 tracking-wider">
                    {OFFICIAL_COMPANY_INFO.registrationNumber}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(OFFICIAL_COMPANY_INFO.registrationNumber, 'regNum')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy Registration Number"
                >
                  {copiedField === 'regNum' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="border-b border-slate-800/80 pb-3">
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">Governing Statutory Act</span>
                <span className="text-slate-200">{OFFICIAL_COMPANY_INFO.act}</span>
              </div>

              <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">Taxpayer Identification Number (TIN)</span>
                  <span className="font-mono text-slate-200">{OFFICIAL_COMPANY_INFO.tin}</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  ACTIVE
                </span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">Issuing Authority</span>
                <span className="text-slate-300 text-xs">{OFFICIAL_COMPANY_INFO.issuingAuthority}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Official Contact & Communication */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none"></div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">Direct Corporate Contact</h2>
                  <p className="text-xs text-slate-400 font-mono">24/7 Executive Inquiries & Support</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                {/* Primary info@oskayi.com */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block font-mono">
                      Primary Official Corporate Email
                    </span>
                    <a
                      href="mailto:info@oskayi.com"
                      className="text-base font-semibold text-white hover:text-amber-300 transition-colors"
                    >
                      info@oskayi.com
                    </a>
                  </div>
                  <div className="flex space-x-1.5">
                    <button
                      onClick={() => copyToClipboard('info@oskayi.com', 'infoEmail')}
                      className="p-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 transition-colors"
                      title="Copy email"
                    >
                      {copiedField === 'infoEmail' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href="mailto:info@oskayi.com"
                      className="p-2 rounded-lg bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors"
                      title="Send mail to info@oskayi.com"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Contact Phone Numbers */}
                <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">
                      Primary Contact Phone (Call & WhatsApp)
                    </span>
                    <a
                      href="tel:+233244905505"
                      className="text-base font-mono font-bold text-slate-100 hover:text-amber-400 transition-colors"
                    >
                      +233 24 490 5505
                    </a>
                    <span className="text-xs text-slate-400 block font-mono">Local: 0244905505</span>
                  </div>
                  <div className="flex space-x-1.5">
                    <button
                      onClick={() => copyToClipboard('+233244905505', 'phone')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copy Phone"
                    >
                      {copiedField === 'phone' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href="tel:+233244905505"
                      className="p-2 rounded-lg bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/40 transition-colors"
                      title="Call Now"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Secondary Email & Phones */}
                <div className="border-b border-slate-800/80 pb-3">
                  <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">
                    Alternative Corporate Inquiries
                  </span>
                  <div className="text-slate-300 flex flex-wrap gap-x-4 gap-y-1 text-xs mt-1 font-mono">
                    <a href="mailto:contact@oskayi.com" className="hover:text-amber-400 underline">contact@oskayi.com</a>
                    <a href="mailto:oskayiconsult@gmail.com" className="hover:text-amber-400 underline">oskayiconsult@gmail.com</a>
                  </div>
                </div>

                {/* Physical & Digital Address */}
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">
                    Office & Digital Address
                  </span>
                  <p className="text-xs text-slate-300 mt-0.5 flex items-start space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>House 352, McCarthy Hill, Accra, Ghana • Digital Address: <strong className="text-slate-200 font-mono">GA-183-8165</strong></span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-800">
              <a
                href="mailto:info@oskayi.com?subject=Inquiry%20to%20Oskayi%20Consult"
                className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-amber-500/10 text-center"
              >
                <Mail className="w-4 h-4" />
                <span>Email Us Directly</span>
              </a>
              <a
                href="https://wa.me/233244905505?text=Hello%20Oskayi%20Consult,%20I%20am%20reaching%20out%20regarding%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all text-center shadow-md shadow-emerald-600/10"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Rapid Message / Inquiry Box */}
        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Leave an Executive Message</h3>
              <p className="text-xs text-slate-400">Directly dispatched to the leadership desk at info@oskayi.com</p>
            </div>
          </div>

          {inquirySubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Thank you! Your email client has been opened to dispatch your message to <strong>info@oskayi.com</strong>.</span>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Kwame Mensah"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Your Email</label>
                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="e.g. name@company.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="+233..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Message / Project Inquiry</label>
                <textarea
                  rows={3}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Describe your inquiry, institutional requirement, or project scope..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500 font-mono">
                  Official Recipient: <span className="text-amber-400">info@oskayi.com</span>
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-2"
                >
                  <span>Transmit to info@oskayi.com</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-200">OSKAYI CONSULT</span>
            <span className="text-slate-600">•</span>
            <span>Registration No: <strong className="text-amber-400 font-mono">{OFFICIAL_COMPANY_INFO.registrationNumber}</strong></span>
            <span className="text-slate-600">•</span>
            <span>Act 151</span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="mailto:info@oskayi.com" className="text-amber-400 hover:underline font-mono">
              info@oskayi.com
            </a>
            <span className="text-slate-600">•</span>
            <a href="tel:+233244905505" className="hover:text-slate-200 font-mono">
              +233 24 490 5505
            </a>
            <span className="text-slate-600">•</span>
            <span>© 2025–2026 All Rights Reserved</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
