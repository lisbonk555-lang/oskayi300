import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FilePlus,
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  RefreshCw,
  Info,
  ExternalLink,
  ChevronRight,
  User,
  Phone,
  AlertCircle
} from 'lucide-react';
import {
  InsurancePolicyRecord,
  InsuranceClaimRecord,
  ClaimStatus
} from '../../types/creditCheckout';
import { InsuranceProviderAdapter } from '../../services/creditCheckoutAdapters';
import { OFFICIAL_INSURANCE_PROVIDERS, MANDATORY_LEGAL_DISCLOSURES } from '../../data/creditCheckoutData';

export const MyProtectionClaimsView: React.FC = () => {
  const [policies, setPolicies] = useState<InsurancePolicyRecord[]>([]);
  const [claims, setClaims] = useState<InsuranceClaimRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false);
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicyRecord | null>(null);

  // Claim Form State
  const [claimantName, setClaimantName] = useState<string>('Kofi Mensah Boateng');
  const [claimantContact, setClaimantContact] = useState<string>('+233 24 490 5505');
  const [eventType, setEventType] = useState<string>('TEMPORARY_INABILITY_TO_WORK');
  const [incidentDate, setIncidentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState<string>('Hospital admission following medical emergency resulting in 18 days medical leave.');
  const [evidenceFileName, setEvidenceFileName] = useState<string>('Korle-Bu-Admission-Certificate.pdf');
  const [submittingClaim, setSubmittingClaim] = useState<boolean>(false);
  const [claimSuccessMessage, setClaimSuccessMessage] = useState<string | null>(null);
  const [claimErrorMessage, setClaimErrorMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load sample or persistent policies
      const samplePolicy: InsurancePolicyRecord = {
        policyId: 'pol-cl-sample-01',
        policyNumber: 'POL-CL-849201',
        insurerId: 'ins-curacel-grow-underwriting',
        insurerName: 'Curacel Credit Life Shield',
        productCode: 'CURACEL_CREDIT_LIFE_GHS',
        productName: 'Curacel Credit Life & Loan Default Protection',
        orderId: 'ord-cc-sample-01',
        creditAgreementId: 'agr-qc-sample-01',
        buyerName: 'Kofi Mensah Boateng',
        buyerEmail: 'kofi.boateng@enterprise.gh',
        buyerPhone: '+233 24 490 5505',
        insuredAmountGHS: 14500,
        premiumAmountGHS: 326.25,
        startDate: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
        endDate: new Date(Date.now() + 350 * 24 * 3600 * 1000).toISOString(),
        policyStatus: 'ACTIVE',
        coveredEvents: [
          'Death of Borrower (Full loan balance payoff)',
          'Permanent & Total Disability (Principal settlement)',
          'Temporary Inability to Work (Hospitalization > 14 days)',
          'Involuntary Retrenchment / Redundancy (Up to 6 mo installments)'
        ],
        exclusions: [
          'Pre-existing conditions within 90 days before policy date',
          'Self-inflicted harm or suicide within 12 months',
          'Voluntary resignation or mutual employment separation',
          'Unreported claims after 60 days of event occurrence'
        ],
        claimInstructions: 'Submit incident documentation via Oskayi Protection Portal. The underwriting desk reviews evidence and settles directly with the credit provider.',
        createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString()
      };

      setPolicies([samplePolicy]);
      setSelectedPolicy(samplePolicy);

      // Check existing claims
      const sampleClaim: InsuranceClaimRecord = {
        claimId: 'claim-cl-849201',
        claimNumber: 'CLM-CL-291840',
        policyId: samplePolicy.policyId,
        policyNumber: samplePolicy.policyNumber,
        insurerId: samplePolicy.insurerId,
        insurerName: samplePolicy.insurerName,
        claimantName: 'Kofi Mensah Boateng',
        claimantContact: '+233 24 490 5505',
        eventType: 'Temporary Inability to Work (Hospitalization > 14 days)',
        incidentDate: '2026-02-10',
        description: 'Certified admission at Korle-Bu Teaching Hospital for acute malaria recovery & surgical observation.',
        evidenceFiles: ['https://oskayi.com/docs/korle-bu-medical-cert.pdf'],
        claimedAmountGHS: 5268.34,
        status: 'CLAIM_UNDER_REVIEW',
        submittedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          {
            timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
            status: 'CLAIM_SUBMITTED',
            note: 'Claim initiated online. Hospital admission certificate uploaded.'
          },
          {
            timestamp: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
            status: 'CLAIM_UNDER_REVIEW',
            note: 'Curacel Underwriting Medical Desk reviewing attending physician report.'
          }
        ]
      };
      setClaims([sampleClaim]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPolicy) return;
    setSubmittingClaim(true);
    setClaimErrorMessage(null);
    setClaimSuccessMessage(null);

    try {
      const res = await InsuranceProviderAdapter.submitClaim({
        policyNumber: selectedPolicy.policyNumber,
        claimantName,
        claimantContact,
        eventType,
        incidentDate,
        description,
        evidenceFiles: [evidenceFileName],
        claimedAmountGHS: selectedPolicy.insuredAmountGHS
      });

      setClaims(prev => [res.claim, ...prev]);
      setClaimSuccessMessage(`Claim #${res.claim.claimNumber} successfully filed. Status: CLAIM UNDER REVIEW.`);
      setShowClaimModal(false);
    } catch (err: any) {
      setClaimErrorMessage(err.message || 'Failed to submit claim to underwriter.');
    } finally {
      setSubmittingClaim(false);
    }
  };

  const getStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'APPROVED':
      case 'SETTLED':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 text-[10px]">APPROVED & SETTLED</span>;
      case 'CLAIM_UNDER_REVIEW':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 font-bold border border-amber-400/30 text-[10px]">UNDER REVIEW</span>;
      case 'MORE_INFORMATION_REQUIRED':
        return <span className="px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 font-bold border border-sky-800 text-[10px]">DOCS REQUIRED</span>;
      case 'DECLINED':
        return <span className="px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 font-bold border border-red-800 text-[10px]">DECLINED</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 font-bold border border-slate-700 text-[10px]">SUBMITTED</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span>My Credit Protection & Insurance Claims</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Underwritten by Curacel Grow Consortium & licensed partners. File and track covered event claims.
          </p>
        </div>

        <button
          onClick={() => setShowClaimModal(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-400/20"
        >
          <FilePlus className="w-4 h-4" />
          <span>Report an Insurance Claim</span>
        </button>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-amber-300 font-mono text-[11px]">
          <Info className="w-4 h-4" />
          <span>IMPORTANT INSURANCE COMPLIANCE NOTICE</span>
        </div>
        <p className="text-slate-400">
          {MANDATORY_LEGAL_DISCLOSURES.insuranceNotice}
        </p>
      </div>

      {claimSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span>{claimSuccessMessage}</span>
        </div>
      )}

      {/* Active Policy Card */}
      {selectedPolicy && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-indigo-900/60 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold font-mono border border-emerald-800">
                  {selectedPolicy.policyStatus}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Policy #{selectedPolicy.policyNumber}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                {selectedPolicy.productName}
              </h3>
              <p className="text-xs text-slate-400">{selectedPolicy.insurerName}</p>
            </div>

            <div className="text-right font-mono">
              <div className="text-xs text-slate-400">Insured Amount</div>
              <div className="text-xl font-black text-amber-300">
                GH₵ {selectedPolicy.insuredAmountGHS.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-emerald-400">Premium Paid: GH₵ {selectedPolicy.premiumAmountGHS.toFixed(2)}</div>
            </div>
          </div>

          {/* Covered Events Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Covered Events & Circumstances
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono">
              {selectedPolicy.coveredEvents.map((evt, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{evt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs font-mono">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Standard Policy Exclusions</span>
            </div>
            <ul className="list-disc list-inside text-slate-400 space-y-1 text-[11px]">
              {selectedPolicy.exclusions.map((exc, idx) => (
                <li key={idx}>{exc}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Submitted Claims Tracker */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          <span>Claims Under Assessment</span>
        </h3>

        {claims.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center text-slate-400 font-mono text-xs">
            No claims filed. All loan obligations are in standard standing.
          </div>
        ) : (
          <div className="space-y-4">
            {claims.map(c => (
              <div key={c.claimId} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Claim #{c.claimNumber}</span>
                      {getStatusBadge(c.status)}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Event: <strong className="text-slate-200">{c.eventType}</strong> • Date of Incident: {c.incidentDate}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Claimed Amount</div>
                    <div className="text-sm font-bold text-amber-300">
                      GH₵ {c.claimedAmountGHS.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800/80">
                  {c.description}
                </p>

                {/* Timeline */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Underwriting Assessment Timeline</div>
                  <div className="space-y-2">
                    {c.timeline.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-[11px]">
                        <div className="w-2 h-2 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="text-slate-400">{new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: </span>
                          <span className="text-slate-200">{step.note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Claim Filing Modal */}
      {showClaimModal && selectedPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-indigo-900/80 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-emerald-400" />
                <span>File Insurance Claim with Underwriter</span>
              </h3>
              <button
                onClick={() => setShowClaimModal(false)}
                className="text-slate-400 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitClaim} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Policy Number</label>
                <input
                  type="text"
                  disabled
                  value={selectedPolicy.policyNumber}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Claimant Full Name</label>
                <input
                  type="text"
                  required
                  value={claimantName}
                  onChange={e => setClaimantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Claimant Phone Number</label>
                <input
                  type="text"
                  required
                  value={claimantContact}
                  onChange={e => setClaimantContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Select Covered Event Type</label>
                <select
                  value={eventType}
                  onChange={e => setEventType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="TEMPORARY_INABILITY_TO_WORK">Temporary Inability to Work (Hospitalization &gt; 14 days)</option>
                  <option value="PERMANENT_DISABILITY">Total &amp; Permanent Disability</option>
                  <option value="DEATH">Death of Borrower</option>
                  <option value="RETRENCHMENT_INVOLUNTARY_JOB_LOSS">Involuntary Retrenchment / Downsizing</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Incident / Admission Date</label>
                <input
                  type="date"
                  required
                  value={incidentDate}
                  onChange={e => setIncidentDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Incident Narrative & Medical Summary</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                  placeholder="Describe the medical admission or involuntary retrenchment details..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Evidence Document (Hospital / Employer Certificate)</label>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300 truncate">{evidenceFileName}</span>
                  <button
                    type="button"
                    onClick={() => setEvidenceFileName('Medical-Discharge-Summary-2026.pdf')}
                    className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 text-[10px]"
                  >
                    Select File
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300">
                Notice: Claim will be directly submitted to Curacel Underwriting desk. Oskayi does not approve or deny claims.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowClaimModal(false)}
                  className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingClaim}
                  className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider"
                >
                  {submittingClaim ? 'Transmitting...' : 'Submit Claim'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
