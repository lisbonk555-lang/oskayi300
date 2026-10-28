import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { OFFICIAL_COMPANY_INFO } from '../../data/companyData';

interface CorporateInquirySectionProps {
  initialService?: string;
}

export function CorporateInquirySection({ initialService }: CorporateInquirySectionProps) {
  const [selectedPractice, setSelectedPractice] = useState(
    initialService || 'Information and Communication Technology (ICT) Services'
  );
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [scope, setScope] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const practiceOptions = [
    'Information and Communication Technology (ICT) Services',
    'Project Development',
    'Management Consultancy Services',
    'Financial Consultancy Services',
    'Integrated Multi-Sector Advisory'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) return;

    const subject = encodeURIComponent(
      `Institutional Engagement Request: [${selectedPractice}] - ${organization || name || 'Client'}`
    );
    const body = encodeURIComponent(
      `PROSPECTIVE CLIENT INQUIRY:\n\n` +
      `Organization / Institution: ${organization || 'N/A'}\n` +
      `Representative Name: ${name || 'N/A'}\n` +
      `Official Email: ${email}\n` +
      `Contact Phone / WhatsApp: ${phone || 'N/A'}\n` +
      `Selected Practice Area: ${selectedPractice}\n\n` +
      `Project Brief / Scope of Work:\n${scope || 'Consultation request'}\n\n` +
      `Dispatched to Oskayi Consult (BN248851025) Executive Desk.`
    );

    window.location.href = `mailto:info@oskayi.com?cc=oskayi@giideatg.com&subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <section id="inquiry" className="py-20 lg:py-28 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Context & Direct Desks */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>Executive Engagement Protocol</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Initiate Institutional Consultation
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                Connect directly with our senior advisory team and the principal executive desk for confidential 
                mandate evaluations, feasibility assessments, and technical proposals.
              </p>

              {/* Direct Channels */}
              <div className="mt-8 space-y-4 text-xs font-mono">
                
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 uppercase text-[10px] mb-1">Primary Official Email Desk</div>
                  <a
                    href="mailto:info@oskayi.com"
                    className="text-amber-400 font-bold text-sm hover:underline block"
                  >
                    info@oskayi.com
                  </a>
                  <span className="text-slate-400 text-[11px] block mt-0.5">
                    CC: oskayi@giideatg.com (Official Form A email)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 uppercase text-[10px] mb-1">Executive Direct Telephone</div>
                  <a
                    href="tel:0244905505"
                    className="text-white font-bold text-sm hover:text-amber-400 block font-mono"
                  >
                    +233 24 490 5505 (0244905505)
                  </a>
                  <span className="text-slate-400 text-[11px] block mt-0.5">
                    Direct call & encrypted WhatsApp communications
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 uppercase text-[10px]">Instant WhatsApp Consultation</div>
                    <div className="text-slate-200 text-xs mt-0.5">Connect with the Proprietor Desk</div>
                  </div>
                  <a
                    href="https://wa.me/233244905505?text=Hello%20Oskayi%20Consult,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>

            <div className="pt-8 text-xs font-mono text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Full confidentiality and non-disclosure guaranteed under Ghanaian law.</span>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl relative">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inquiry Initialized</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Your email client has been prepared to dispatch your brief directly to{' '}
                    <strong className="text-amber-400 font-mono">info@oskayi.com</strong> and{' '}
                    <strong className="text-slate-200 font-mono">oskayi@giideatg.com</strong>.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Practice Area Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                      Target Practice Area
                    </label>
                    <select
                      value={selectedPractice}
                      onChange={(e) => setSelectedPractice(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                    >
                      {practiceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2-Column Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Client / Organization Name
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. Apex Minerals Ltd / Ministry"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Representative Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. Kwame Mensah"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Official Work Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. k.mensah@organization.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Telephone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +233 24 000 0000"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                  </div>

                  {/* Scope of Work */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Mandate Overview / Project Scope
                    </label>
                    <textarea
                      rows={4}
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      placeholder="Outline key project objectives, timelines, estimated capital requirement, or institutional technical specifications..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-[11px] font-mono text-slate-400">
                      Dispatched to: <strong className="text-amber-400">info@oskayi.com</strong>
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2"
                    >
                      <span>Transmit Mandate Brief</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
