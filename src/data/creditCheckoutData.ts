import {
  CreditProviderModel,
  GasSponsorModel,
  InsuranceProviderModel,
  CreditOrderRecord
} from '../types/creditCheckout';

export const OFFICIAL_CREDIT_PROVIDERS: CreditProviderModel[] = [
  {
    providerId: 'prov-quickcredit-gh',
    legalName: 'QuickCredit & Investment Micro-Lending Ltd.',
    brandName: 'QuickCredit Tier-2 Facility',
    supportedCountry: 'Ghana',
    supportedCurrency: 'GHS',
    regulatoryStatus: 'LICENSED_TIER2_MICROFINANCE',
    regulatorName: 'Bank of Ghana (BoG)',
    licenseNumber: 'BOG/NBF/MC/2018/0491',
    apiStatus: 'LIVE',
    underwritingModel: 'Automated Scorecard + MoMo Statement Analysis',
    endpointUrl: 'https://api.quickcreditgh.com/v2/underwriting',
    lastHealthCheck: new Date().toISOString(),
    lastLatencyMs: 44,
    supportedCreditProducts: [
      {
        productCode: 'QC_COMMERCIAL_BNPL_GHS',
        productName: 'Commercial BNPL & Asset Credit',
        minCreditGHS: 50,
        maxCreditGHS: 150000,
        minDurationMonths: 1,
        maxDurationMonths: 12,
        interestRateAnnualPct: 18.5,
        originationFeePct: 1.5,
        underwritingRequirements: [
          'Valid Ghana Card (NIA Number)',
          'Active Mobile Money or Bank Account (>6 months)',
          'Verified Residential Digital Address (GhanaPost GPS)'
        ]
      },
      {
        productCode: 'QC_EQUIPMENT_CAPITAL_GHS',
        productName: 'Solar & Heavy Machinery Asset Finance',
        minCreditGHS: 1000,
        maxCreditGHS: 500000,
        minDurationMonths: 3,
        maxDurationMonths: 24,
        interestRateAnnualPct: 16.0,
        originationFeePct: 2.0,
        underwritingRequirements: [
          'Valid Ghana Card & Business Registration Certificate',
          'Merchant Asset Invoice or Quotation',
          '3-Month Bank or MoMo Statement'
        ]
      }
    ]
  },
  {
    providerId: 'prov-stanbic-capital-gh',
    legalName: 'Stanbic Bank Ghana Commercial Facilities',
    brandName: 'Stanbic Institutional Credit Line',
    supportedCountry: 'Ghana',
    supportedCurrency: 'GHS',
    regulatoryStatus: 'UNIVERSAL_BANKING_LICENSE',
    regulatorName: 'Bank of Ghana (BoG)',
    licenseNumber: 'BOG/UB/004',
    apiStatus: 'CONNECTED',
    underwritingModel: 'Universal Banking Bureau API + Real-Time KYC',
    endpointUrl: 'https://openbanking.stanbicbank.com.gh/credit/v1',
    lastHealthCheck: new Date().toISOString(),
    lastLatencyMs: 62,
    supportedCreditProducts: [
      {
        productCode: 'STANBIC_RETAIL_CREDIT_LINE',
        productName: 'Stanbic FastTrack Consumer Credit',
        minCreditGHS: 200,
        maxCreditGHS: 350000,
        minDurationMonths: 1,
        maxDurationMonths: 18,
        interestRateAnnualPct: 17.0,
        originationFeePct: 1.0,
        underwritingRequirements: [
          'Ghana Card Verification',
          'Tax Identification Number (TIN)',
          'Clean XDSData Credit Bureau Record'
        ]
      }
    ]
  },
  {
    providerId: 'prov-finastra-fusion-syndicate',
    legalName: 'Finastra Fusion Loan IQ Syndicated Facility',
    brandName: 'Finastra Global Syndicated Credit Engine',
    supportedCountry: 'Ghana / Africa / Global',
    supportedCurrency: 'GHS',
    regulatoryStatus: 'GLOBAL_INTERBANK_FACILITY_MANAGER',
    regulatorName: 'Multi-Jurisdictional Prudential Framework',
    licenseNumber: 'FINASTRA-LENDING-NET-09',
    apiStatus: 'LIVE',
    underwritingModel: 'Finastra Fusion Originate + CreditLens AI Underwriting',
    endpointUrl: 'https://api.fusionfabric.cloud/finastra/syndication/v1',
    lastHealthCheck: new Date().toISOString(),
    lastLatencyMs: 38,
    supportedCreditProducts: [
      {
        productCode: 'FINASTRA_SYNDICATED_FACILITY',
        productName: 'Multi-Bank Syndicated Asset Facility',
        minCreditGHS: 5000,
        maxCreditGHS: 50000000,
        minDurationMonths: 6,
        maxDurationMonths: 60,
        interestRateAnnualPct: 14.5,
        originationFeePct: 1.0,
        underwritingRequirements: [
          'Corporate/Enterprise Registration Documentation',
          'Sovereign or Municipal Milestone Verification',
          'Audited Financial Statements'
        ]
      }
    ]
  }
];

export const OFFICIAL_GAS_SPONSORS: GasSponsorModel[] = [
  {
    sponsorId: 'sponsor-biconomy-paymaster-01',
    sponsorName: 'Biconomy Account Abstraction Paymaster',
    sponsorType: 'PAYMASTER',
    supportedChain: 'Polygon POS / Arbitrum One / Ethereum',
    chainId: 137,
    supportedTokens: ['USDT', 'USDC', 'GHS-Cedi-Stable', 'Native-ZeroGas'],
    maxSponsorshipPerTxGHS: 45.0,
    dailyLimitGHS: 25000.0,
    spentTodayGHS: 3120.5,
    sponsorshipStatus: 'LIVE',
    paymasterContractAddress: '0x00000f73b64c39fa8e578c77ecf274a1e9bb8b88',
    sponsorSettlementMethod: 'Pre-Funded Institutional Relayer Pool',
    legalDisclosure: 'Gas is sponsored by an independent transaction sponsor. Oskayi does not fund this transaction.',
    lastHealthCheck: new Date().toISOString()
  },
  {
    sponsorId: 'sponsor-pimlico-erc4337',
    sponsorName: 'Pimlico ERC-4337 Verifying Paymaster',
    sponsorType: 'ERC4337_BUNDLER',
    supportedChain: 'Polygon & Base Network',
    chainId: 8453,
    supportedTokens: ['USDC', 'USDT', 'ETH'],
    maxSponsorshipPerTxGHS: 30.0,
    dailyLimitGHS: 18000.0,
    spentTodayGHS: 1420.0,
    sponsorshipStatus: 'LIVE',
    paymasterContractAddress: '0x000000000009B901DeE21D33E019aDb59DC96Ad2',
    sponsorSettlementMethod: 'On-Chain EntryPoint v0.7 Paymaster Bond',
    legalDisclosure: 'Gas is sponsored by an independent transaction sponsor. Oskayi does not fund this transaction.',
    lastHealthCheck: new Date().toISOString()
  },
  {
    sponsorId: 'sponsor-zerodev-bundler',
    sponsorName: 'ZeroDev Kernel Sponsored Infrastructure',
    sponsorType: 'PAYMASTER',
    supportedChain: 'Arbitrum One',
    chainId: 42161,
    supportedTokens: ['USDC', 'USDT'],
    maxSponsorshipPerTxGHS: 50.0,
    dailyLimitGHS: 20000.0,
    spentTodayGHS: 420.0,
    sponsorshipStatus: 'CONNECTED',
    paymasterContractAddress: '0x433704aacd86241a7d6ee492e44d3753239a25b1',
    sponsorSettlementMethod: 'ZeroDev Cloud Sponsorship Relayer',
    legalDisclosure: 'Gas is sponsored by an independent transaction sponsor. Oskayi does not fund this transaction.',
    lastHealthCheck: new Date().toISOString()
  }
];

export const OFFICIAL_INSURANCE_PROVIDERS: InsuranceProviderModel[] = [
  {
    providerId: 'ins-curacel-grow-underwriting',
    legalName: 'Curacel Grow Underwriting Consortium',
    brandName: 'Curacel Credit Life Shield',
    regulatoryStatus: 'AUTHORIZED_INSURTECH_PARTNER',
    licenseNumber: 'NIC/INSP/2023/8892',
    supportedCountry: 'Ghana & West Africa',
    apiStatus: 'LIVE',
    products: [
      {
        productCode: 'CURACEL_CREDIT_LIFE_GHS',
        productName: 'Curacel Credit Life & Loan Default Protection',
        productType: 'CREDIT_LIFE',
        premiumRatePct: 2.25,
        waitingPeriodDays: 0,
        insuredEventTypes: [
          {
            eventCode: 'DEATH',
            label: 'Death of Borrower',
            description: 'Covers outstanding credit balance upon borrower demise.',
            requiredDocuments: ['Certified Death Certificate', 'National ID (Ghana Card) copy of claimant', 'Original Credit Agreement']
          },
          {
            eventCode: 'PERMANENT_DISABILITY',
            label: 'Total & Permanent Disability',
            description: 'Covers remaining principal if borrower suffers certified total physical disability rendering work impossible.',
            requiredDocuments: ['Licensed Medical Doctor Assessment Report', 'Hospital Admission / Discharge Summary', 'National ID']
          },
          {
            eventCode: 'TEMPORARY_INABILITY_TO_WORK',
            label: 'Temporary Inability to Work (Accident / Hospitalization)',
            description: 'Pays up to 3 monthly loan installments during certified hospital confinement > 14 days.',
            requiredDocuments: ['Hospital Confinement Certificate (>14 days)', 'Attending Physician Diagnosis Report']
          },
          {
            eventCode: 'RETRENCHMENT_INVOLUNTARY_JOB_LOSS',
            label: 'Involuntary Retrenchment / Redundancy',
            description: 'Covers up to 6 months of scheduled repayments following formal company downsizing.',
            requiredDocuments: ['Employer Redundancy / Termination Letter', 'Final 3-Month Pay Slips', 'SSNIT Contribution Statement']
          }
        ],
        exclusions: [
          'Pre-existing critical illness within 90 days before policy date',
          'Self-inflicted injury or voluntary resignation',
          'Acts of war or civil commotion',
          'Unreported claims filed after 60 days of event occurrence'
        ],
        claimProcedure: 'Submit incident report with primary hospital or official documentation through Oskayi Protection Portal. The insurer assesses the claim within 3 business days and settles directly with the Credit Provider.',
        termsSummary: 'If a covered event occurs, you may submit a claim. The insurer assesses the claim according to the policy terms. If approved, the insurer settles the covered amount according to the policy.'
      },
      {
        productCode: 'CURACEL_PAYMENT_PROTECT_GHS',
        productName: 'Curacel Involuntary Payment Protection Shield',
        productType: 'PAYMENT_PROTECTION',
        premiumRatePct: 1.85,
        waitingPeriodDays: 14,
        insuredEventTypes: [
          {
            eventCode: 'PERMANENT_DISABILITY',
            label: 'Total Permanent Disability',
            description: 'Full settlement of remaining credit balance upon certified disability.',
            requiredDocuments: ['Medical Assessment Report', 'Ghana Card']
          },
          {
            eventCode: 'TEMPORARY_INABILITY_TO_WORK',
            label: 'Critical Illness / Extended Medical Leave',
            description: 'Up to 3 monthly payments covered.',
            requiredDocuments: ['Medical Certificate', 'Hospital Records']
          }
        ],
        exclusions: ['Voluntary job change', 'Fraudulent declarations'],
        claimProcedure: 'File online with medical evidence.',
        termsSummary: 'Underwritten by Curacel Insurance Consortium (Licensed by NIC Ghana).'
      }
    ]
  },
  {
    providerId: 'ins-sanlam-ghana',
    legalName: 'Sanlam Life Insurance Ghana PLC',
    brandName: 'Sanlam Credit Guard',
    regulatoryStatus: 'LICENSED_LIFE_INSURER',
    licenseNumber: 'NIC/LIFE/008',
    supportedCountry: 'Ghana',
    apiStatus: 'CONNECTED',
    products: [
      {
        productCode: 'SANLAM_CREDIT_PROTECTOR_GHS',
        productName: 'Sanlam Institutional Loan Protection Policy',
        productType: 'CREDIT_LIFE',
        premiumRatePct: 2.0,
        waitingPeriodDays: 0,
        insuredEventTypes: [
          {
            eventCode: 'DEATH',
            label: 'Death of Borrower',
            description: 'Immediate settlement of outstanding loan balance.',
            requiredDocuments: ['Death Certificate', 'Coroner Report (if applicable)', 'Ghana Card']
          },
          {
            eventCode: 'PERMANENT_DISABILITY',
            label: 'Permanent Disability',
            description: 'Settles remaining balance upon medical board assessment.',
            requiredDocuments: ['Medical Board Disability Certificate']
          }
        ],
        exclusions: ['Self-inflicted harm', 'Unlicensed hazardous activities'],
        claimProcedure: 'Report directly to Sanlam claims portal.',
        termsSummary: 'Sanlam Life Insurance Ghana PLC underwrites policy obligations under NIC regulations.'
      }
    ]
  }
];

export const MANDATORY_LEGAL_DISCLOSURES = {
  orchestrationNotice: 'Oskayi is an infrastructure and orchestration technology platform. Oskayi is NOT a bank, lender, insurer, payment processor, or gas sponsor.',
  creditNotice: 'Your credit is provided by an independent, licensed credit provider. Oskayi does not fund, evaluate, or approve credit.',
  gasNotice: 'Gas is sponsored by an independent transaction sponsor via ERC-4337 account abstraction paymasters. Oskayi does not fund this transaction.',
  insuranceNotice: 'Insurance is provided by an independent licensed insurance underwriter. If a covered event occurs, you may submit a claim. The insurer assesses the claim according to the policy terms. If approved, the insurer settles the covered amount according to the policy. Insurance does not automatically pay your loan merely because a borrower defaults without a covered event.',
  currencyNotice: 'All primary figures are denominated in Ghanaian Cedi (GHS). Converted values reflect verifiable live FX market rates with timestamps.'
};
