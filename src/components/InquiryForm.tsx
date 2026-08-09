import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, Building, Sparkles, AlertCircle } from 'lucide-react';
import { ContactSubmissionState } from '../types';
import { OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface InquiryFormProps {
  initialServiceTitle?: string;
  initialMessage?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ initialServiceTitle = '', initialMessage = '' }) => {
  const [formData, setFormData] = useState<ContactSubmissionState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: initialServiceTitle || 'Fintech Solutions for Banks',
    projectBudget: '$1M - $5M USD',
    message: initialMessage || ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceId: string;
    timestamp: string;
    message: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please enter your name, email, and project message.");
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Failed to transmit consultation request");
      }

      const data = await res.json();
      setSubmissionResult({
        referenceId: data.referenceId,
        timestamp: data.timestamp,
        message: data.message
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again or contact integrationpartners@oskayi.com");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-slate-100 px-4 sm:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
            <Mail className="w-3.5 h-3.5" />
            <span>Executive Engagement</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Schedule an Advisor Consultation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Connect directly with Oskayi Consult senior management and our international integrated partner leads to structure your project requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Credentials & Direct Info */}
          <div className="lg:col-span-5 bg-slate-950 p-8 rounded-2xl border border-amber-500/30 space-y-6 shadow-2xl">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                Direct Contact Channels
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Oskayi Consult Ghana
              </h3>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium uppercase text-[10px] block">Primary Inquiry Email</span>
                <a href={`mailto:${OFFICIAL_COMPANY_INFO.primaryEmail}`} className="text-sm font-bold text-amber-300 hover:underline">
                  {OFFICIAL_COMPANY_INFO.primaryEmail}
                </a>
                <div className="text-[10px] text-slate-500">For International Partners & Project Inquiries</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium uppercase text-[10px] block">Direct Contact Telephone</span>
                <a href={`tel:${OFFICIAL_COMPANY_INFO.contactPhone}`} className="text-sm font-bold text-slate-100 font-mono hover:text-amber-400">
                  {OFFICIAL_COMPANY_INFO.contactPhone}
                </a>
                <div className="text-[10px] text-slate-500">Official Mobile & WhatsApp Contact</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium uppercase text-[10px] block">Secondary Technical Email</span>
                <a href={`mailto:${OFFICIAL_COMPANY_INFO.secondaryEmail}`} className="text-xs font-medium text-slate-300 hover:underline">
                  {OFFICIAL_COMPANY_INFO.secondaryEmail}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Statutory Identification:
              </div>
              <div className="text-slate-300 font-mono space-y-1 text-[11px]">
                <div>ROC Registration No: <strong>{OFFICIAL_COMPANY_INFO.registrationNumber}</strong></div>
                <div>TIN Identification: <strong>{OFFICIAL_COMPANY_INFO.tin}</strong></div>
                <div>Digital Address: <strong>{OFFICIAL_COMPANY_INFO.digitalAddress}</strong></div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 font-mono">
              Founder & CEO: <strong className="text-white">{OFFICIAL_COMPANY_INFO.founderAndCEO}</strong>
            </div>
          </div>

          {/* Right Side: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-2xl">
            
            {submissionResult ? (
              <div className="p-8 rounded-xl bg-slate-900 border border-emerald-500/40 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Consultation Request Confirmed
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-lg mx-auto">
                    {submissionResult.message}
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 inline-block font-mono text-xs text-left space-y-1">
                  <div>Reference Number: <strong className="text-amber-400">{submissionResult.referenceId}</strong></div>
                  <div>Timestamp: <span className="text-slate-400">{submissionResult.timestamp ? new Date(submissionResult.timestamp).toLocaleString() : new Date().toLocaleString()}</span></div>
                  <div>Primary Channel: <span className="text-amber-300">{OFFICIAL_COMPANY_INFO.primaryEmail}</span></div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setSubmissionResult(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        serviceType: 'Fintech Solutions for Banks',
                        projectBudget: '$1M - $5M USD',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-serif text-xl font-bold text-white">
                    Project & Consultation Inquiry
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Provide your details to initiate an executive consultation with Oskayi Consult.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 bg-red-950/80 border border-red-800 rounded-lg text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Kwame Mensah"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. kmensah@institution.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Telephone / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +233 24 000 0000"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Company / Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Commercial Bank of West Africa"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Service Area</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    >
                      <option value="Fintech Solutions for Banks">Fintech Solutions for Banks</option>
                      <option value="Project Financing & Advisory">Project Financing & Advisory</option>
                      <option value="Insurance & Multi-currency Payments">Insurance & Multi-currency Payments</option>
                      <option value="Web3 & Blockchain Application Development">Web3 & Blockchain Application Development</option>
                      <option value="Instant Loan & Credit Infrastructure">Instant Loan & Credit Infrastructure</option>
                      <option value="ICT Services & Management">ICT Services & Management (ISIC 8299)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Estimated Project Size</label>
                    <select
                      name="projectBudget"
                      value={formData.projectBudget}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    >
                      <option value="< $1M USD">&lt; $1M USD</option>
                      <option value="$1M - $5M USD">$1M - $5M USD</option>
                      <option value="$5M - $25M USD">$5M - $25M USD</option>
                      <option value="$25M+ USD">$25M+ USD (Sovereign/Infrastructure)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Project Overview & Requirements *</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project goals, technical specifications, or financing terms..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Send className={`w-4 h-4 ${submitting ? 'animate-bounce' : ''}`} />
                    <span>{submitting ? 'Transmitting Request...' : 'Transmit Consultation Request'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
