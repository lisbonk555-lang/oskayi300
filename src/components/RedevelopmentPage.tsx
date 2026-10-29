import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  Send, 
  Copy, 
  Check, 
  AlertCircle, 
  Layers, 
  ChevronRight,
  ExternalLink,
  Cpu,
  TrendingUp,
  FileText
} from 'lucide-react';

export const RedevelopmentPage: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    serviceInterest: 'Financial Consultancy Services',
    message: ''
  });

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Institutional Compliance Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-950/40 border border-teal-400/30">
              <Building2 className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">OSKAYI CONSULT</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  REPUBLIC OF GHANA
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official Corporate Portal • Reg: <span className="text-slate-200 font-mono">BN248851025</span>
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-medium text-amber-300">System Upgrade in Progress</span>
            </span>
            <a 
              href="mailto:info@oskayi.com" 
              className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              info@oskayi.com
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Status Hero Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 p-8 sm:p-12 shadow-2xl mb-12">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Clock className="w-3.5 h-3.5 animate-spin text-amber-400" />
              Notice to Clients & Public
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Website Under <span className="bg-gradient-to-r from-amber-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Redevelopment</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 font-normal">
              Our official online portal is currently undergoing scheduled architecture enhancements and institutional service upgrades. Active client consulting engagements, project development contracts, and financial advisory services remain fully operational through direct administrative channels.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href="mailto:info@oskayi.com" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-500/20 active:scale-95"
              >
                <Mail className="w-4 h-4" />
                Email Direct: info@oskayi.com
              </a>

              <a 
                href="tel:+233244905505" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-sm transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                Call: +233 24 490 5505
              </a>

              <button
                onClick={() => copyToClipboard('info@oskayi.com', 'email_btn')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-sm font-medium transition-colors"
                title="Copy official email"
              >
                {copiedField === 'email_btn' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Official Registration Registry Card & Direct Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Statutory Registration & Corporate Identity Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white uppercase tracking-wider">
                      Statutory Corporate Details
                    </h2>
                    <p className="text-xs text-slate-400">
                      Office of the Registrar of Companies, Republic of Ghana
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Verified Active
                </span>
              </div>

              {/* Document Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Registered Business Name</span>
                    <button 
                      onClick={() => copyToClipboard('OSKAYI CONSULT', 'name')}
                      className="hover:text-teal-400 transition-colors"
                    >
                      {copiedField === 'name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-sm font-black text-white tracking-wide">
                    OSKAYI CONSULT
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Business Registration No.</span>
                    <button 
                      onClick={() => copyToClipboard('BN248851025', 'reg')}
                      className="hover:text-teal-400 transition-colors"
                    >
                      {copiedField === 'reg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-sm font-black text-amber-300 font-mono tracking-wider">
                    BN248851025
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Taxpayer ID Number (TIN)</span>
                    <button 
                      onClick={() => copyToClipboard('P0000590118', 'tin')}
                      className="hover:text-teal-400 transition-colors"
                    >
                      {copiedField === 'tin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-sm font-black text-teal-300 font-mono tracking-wider">
                    P0000590118
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Governing Legislation</span>
                  <div className="text-sm font-semibold text-slate-200">
                    Registration of Business Names Act, 1962 (Act 151)
                  </div>
                </div>
              </div>

              {/* Objects of the Company / Registered Scope */}
              <div className="space-y-3 border-t border-slate-800/80 pt-5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Registered Objects & Sector Mandate
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <Cpu className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200 block">ICT Services</span>
                      <span className="text-[11px] text-slate-400">Information & Communications Technology Systems & Infrastructure</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <Layers className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200 block">Project Development</span>
                      <span className="text-[11px] text-slate-400">Institutional, Commercial & Enterprise Project Structuring</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200 block">Financial Consultancy</span>
                      <span className="text-[11px] text-slate-400">Advisory, Structuring & Strategic Financing Solutions</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200 block">Management Services</span>
                      <span className="text-[11px] text-slate-400">Operational & Business Support Activities (ISIC n.e.c.)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical & Postal Address Box */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-2">
                <div className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Principal Place of Business:</span>
                    <span>House No. 352, McCarthy Hill, GA South Municipal District, Accra, Greater Accra Region, Republic of Ghana</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-1 text-[11px] text-slate-400">
                  <span>Postal: P.O. Box 110/FMB/DTB</span>
                  <span>ISIC: Other Business Support Service Activities n.e.c.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Inquiry & Priority Contact Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white uppercase tracking-wider">
                      Executive Inquiries
                    </h2>
                    <p className="text-xs text-slate-400">
                      Direct contact with the consultancy team
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  During our website redevelopment, inquiries for financial consultancy, project management, or official documentation may be sent directly below or emailed to <strong className="text-teal-400 font-mono">info@oskayi.com</strong>.
                </p>

                {formSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base">Inquiry Dispatched</h3>
                    <p className="text-xs text-emerald-300 leading-relaxed">
                      Thank you. Your message has been routed to our corporate correspondence desk (<span className="font-mono">info@oskayi.com</span>). A consultant will reply within 24 business hours.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline pt-2 block mx-auto"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Full Name / Representative *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Kwame Mensah"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1 font-medium">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1 font-medium">Phone / WhatsApp</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+233..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Service of Interest</label>
                      <select 
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-teal-500 text-xs"
                      >
                        <option value="Financial Consultancy Services">Financial Consultancy Services</option>
                        <option value="Project Development & Structuring">Project Development & Structuring</option>
                        <option value="ICT & Technical Services">ICT & Technical Services</option>
                        <option value="Management Consultancy">Management Consultancy</option>
                        <option value="General Corporate Inquiries">General Corporate Inquiries</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Message / Brief Scope</label>
                      <textarea 
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Please describe your consultation requirements..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 text-xs resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-900/30 active:scale-[0.99]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Formal Inquiry
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Reach Card Footer */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Direct Corporate Email:</span>
                  <a href="mailto:info@oskayi.com" className="font-mono text-teal-400 hover:underline">info@oskayi.com</a>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Telephone / WhatsApp:</span>
                  <a href="tel:+233244905505" className="font-mono text-slate-200 hover:text-teal-400">+233 24 490 5505</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Notice & Certification Strip */}
        <div className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
            <span>
              <strong className="text-white">Statutory Registration Notice:</strong> OSKAYI CONSULT is legally registered under the Registration of Business Names Act, 1962 (Act 151) as No. <strong className="text-slate-200">BN248851025</strong> with Taxpayer Identification Number <strong className="text-slate-200">P0000590118</strong>.
            </span>
          </div>
          <div className="text-[11px] text-slate-500 shrink-0">
            Accra, Republic of Ghana
          </div>
        </div>
      </main>

      {/* Corporate Institutional Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 mt-auto text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-300">OSKAYI CONSULT</span> • Reg No. BN248851025 • TIN: P0000590118
            <p className="text-[11px] text-slate-600 mt-0.5">
              McCarthy Hill, Accra, Ghana • All rights reserved &copy; {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="mailto:info@oskayi.com" className="hover:text-teal-400 transition-colors">
              info@oskayi.com
            </a>
            <span>•</span>
            <a href="tel:+233244905505" className="hover:text-teal-400 transition-colors">
              +233 24 490 5505
            </a>
            <span>•</span>
            <span className="text-amber-400/90 font-medium">Under Redevelopment</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
