export interface CompanyVerificationInfo {
  status: string;
  companyName: string;
  registrationNumber: string;
  tin: string;
  jurisdiction: string;
  issuingAuthority: string;
  act: string;
  registrationDate: string;
  startDate: string;
  founderAndCEO: string;
  digitalAddress: string;
  postalDigitalAddress: string;
  physicalAddress: string;
  postalAddress: string;
  isicCode: string;
  isicDescription: string;
  principalActivity: string;
  contactPhone: string;
  primaryEmail: string;
  secondaryEmail: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  category: 'Fintech' | 'Project Financing' | 'Insurance' | 'Web3 & Blockchain' | 'ICT & Advisory';
  badge: string;
  summary: string;
  description: string;
  keyCapabilities: string[];
  targetAudience: string;
  partnerDeliveryModel: string;
  status: 'Active' | 'Under Partnership' | 'Coming Soon';
}

export interface FinancingCalculationResult {
  principalUSD: number;
  loanTermYears: number;
  interestRateAnnual: number;
  gracePeriodMonths: number;
  monthlyPaymentUSD: number;
  totalInterestUSD: number;
  totalRepaymentUSD: number;
  structureRecommendation: string;
  schedule: Array<{
    periodMonth: number;
    paymentUSD: number;
    principalPaidUSD: number;
    interestPaidUSD: number;
    remainingBalanceUSD: number;
  }>;
}

export interface Web3IndustryArchitecture {
  id: string;
  industry: string;
  solutionTitle: string;
  customDesign: string;
  smartContractStandard: string;
  complianceFramework: string;
  keyFeatures: string[];
  deploymentStatus: 'Live Partner Rail' | 'Enterprise Custom Build' | 'Coming Soon';
}

export interface FXRatesResponse {
  source: string;
  base: string;
  rates: {
    GHS: number;
    EUR: number;
    GBP: number;
    EUR_GHS: string;
    GBP_GHS: string;
  };
  lastUpdated: string;
}

export interface RPCCheckResponse {
  success: boolean;
  network: string;
  rpcEndpoint: string;
  latencyMs: number;
  blockHeight: number;
  rawHex: string;
  status: string;
  error?: string;
}

export interface ContactSubmissionState {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  projectBudget: string;
  message: string;
}
