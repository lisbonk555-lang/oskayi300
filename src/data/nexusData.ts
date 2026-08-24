export interface NexusStackLayer {
  id: string;
  layerNumber: string;
  name: string;
  tagline: string;
  role: string;
  accentColor: string;
  borderColor: string;
  bgGradient: string;
  features: string[];
  summaryNote: string;
}

export interface NexusApp {
  id: string;
  number: string;
  name: string;
  valuation: string;
  category: string;
  badge: string;
  description: string;
  integrationCall: string;
  capabilities: string[];
}

export interface NexusApiEndpoint {
  id: string;
  stepNumber: string;
  action: 'SYNDICATE' | 'INSURE' | 'DISBURSE' | 'COMPLY';
  method: 'POST' | 'GET';
  path: string;
  summary: string;
  description: string;
  requestPayload?: Record<string, any>;
  responsePayload: Record<string, any>;
}

export interface NexusRoadmapMilestone {
  phase: string;
  period: string;
  title: string;
  targetScale: string;
  revenueOrFee: string;
  milestones: string[];
  status: 'In Pilot Execution' | 'Phase 2 Scale' | 'Global Horizon';
}

export const NEXUS_CORE_METRICS = {
  capacity: "70% World Syndicated Loans Powered",
  underManagement: "$5.4T Global Syndication Market",
  connectedBanks: "200+ Finastra Fusion APIs Active",
  reinsuranceCoverage: "100% Insured Settlement",
  countriesServed: "180+ Countries",
  africanMarkets: "Ghana → Africa → Global",
  aggregationPools: "Loan IQ • LenderComm • CreditQuest • Payments To Go"
};

export const NEXUS_3_LAYER_STACK: NexusStackLayer[] = [
  {
    id: "layer-3-insurance-shield",
    layerNumber: "LAYER 3 - TOP",
    name: "INSURANCE SHIELD - The Seatbelt",
    tagline: "100% Sales Risk & Construction Risk Wrapped via Global Reinsurers",
    role: "Zero Risk Lending Multiplier",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/50",
    bgGradient: "from-emerald-950/80 via-slate-900 to-emerald-950/40",
    features: [
      "100% Sales Risk + Construction Completion Risk fully insured via tier-1 global reinsurers",
      "Institutional Bank Risk = 0% across all syndicated tranches",
      "If 0 homes or units sell, institutional reinsurers pay syndicating banks full principal + accrued interest",
      "Cryptographically bound insurance binders attached directly to smart disbursement tokens",
      "Zero-risk lending architecture unlocks unrestricted institutional capital pools from global tier-1 desks"
    ],
    summaryNote: "This shield is why global banks deploy institutional capital without reservation — transforming high-yield sovereign & municipal development into zero-risk debt."
  },
  {
    id: "layer-2-nexus-brain",
    layerNumber: "LAYER 2 - MIDDLE (CORE IP)",
    name: "NEXUS CLOUD - The OS of Global Finance",
    tagline: "The Operating System Powering Syndicated Lending Across Ghana, Africa & The World",
    role: "Proprietary Core IP (Finastra Powered)",
    accentColor: "text-amber-400",
    borderColor: "border-amber-400/80 shadow-amber-400/10",
    bgGradient: "from-purple-950/80 via-slate-900 to-indigo-950/90",
    features: [
      "Built on Finastra's world-leading infrastructure powering 70% of world's syndicated loans",
      "End-to-End 200+ Finastra Fusion APIs unifying Loan IQ, LenderComm, CreditQuest & Payments To Go",
      "Syndication OS: Multi-bank book-building, lender position management & real-time data sharing",
      "Ghana Housing Finance Revolution & African Commercial Lending Gap acceleration",
      "Glass-Box Compliance Engine: Real-time dashboard for governments: 'Your $10B: $2B disbursed, 15,000 homes built, 0% leakage'"
    ],
    summaryNote: "This OS unifies origination, multi-bank syndication, cross-border payments, and regulatory compliance into one end-to-end API."
  },
  {
    id: "layer-1-foundation-rails",
    layerNumber: "LAYER 1 - BOTTOM",
    name: "FOUNDATION RAILS - Finastra Fusion Infrastructure",
    tagline: "Invisible, Deeply Integrated Liquidity Rails Across 180+ Jurisdictions",
    role: "Global Banking Backbone",
    accentColor: "text-sky-400",
    borderColor: "border-sky-500/50",
    bgGradient: "from-sky-950/80 via-slate-900 to-indigo-950/50",
    features: [
      "5,000+ Global Commercial & Central Banking Rails Interconnected via Finastra",
      "Automated Commercial Lending Origination & Syndication Engine (Loan IQ & LenderComm)",
      "Real-time Settlement Rails across 180+ countries and 35+ African currencies (GHS, NGN, KES, USD, EUR, GBP)",
      "BaaS Compliance Proofs, ISO 20022 messaging, automated KYC/AML and sanction screening",
      "15 International Aggregation Platforms Pooled: If one rail experiences downtime, 14 other rails auto-route instantly"
    ],
    summaryNote: "The underlying institutional plumbing that powers trillions in global flow, fully abstracted into a single unified protocol."
  }
];

export const NEXUS_8_APPS: NexusApp[] = [
  {
    id: "app-1-smart-cities",
    number: "01",
    name: "193 Smart Cities Master Rollout",
    valuation: "$1.93 Trillion Pipeline",
    category: "Sovereign Urban Development",
    badge: "Flagship App #1",
    description: "Orchestrating $10B syndicated funding tranches per city across 193 developing metropolitan hubs, featuring 100% insured sales escrow and verifiable construction milestone disbursals.",
    integrationCall: "POST /v1/lending/syndicate -> { asset: 'SmartCity_Accra_01', pool: '$10,000,000,000' }",
    capabilities: [
      "Automated $10B syndication across 10-25 Tier-1 global institutions",
      "100% homebuyer pre-sale and default reinsurance wrap",
      "Milestone-based contractor drawdown with computer-vision verification",
      "Live parliamentary & ministerial oversight portal"
    ]
  },
  {
    id: "app-2-syndicated-lending",
    number: "02",
    name: "Syndicated Infrastructure Lending Platform",
    valuation: "$500B Pipeline (Roads, Bridges, Ports)",
    category: "Infrastructure Concession Debt",
    badge: "Sovereign Rails",
    description: "Consortium-based debt origination for trans-national highways, energy grids, and deep-sea maritime ports with multi-currency local debt structuring.",
    integrationCall: "POST /v1/syndicate/originate -> { sector: 'Energy_Grid', amount: '$500,000,000' }",
    capabilities: [
      "Multi-jurisdiction syndicate allocation engine",
      "Concessionary debt structuring with sovereign guarantee wraps",
      "Local currency tranche hedging (GHS, KES, NGN, ZAR)",
      "Automated debt service coverage ratio (DSCR) monitoring"
    ]
  },
  {
    id: "app-3-insurance-wrap",
    number: "03",
    name: "Auto & Home Insurance Wrap Platform",
    valuation: "Continuous Premium Cash Flow",
    category: "Embedded Risk Shield",
    badge: "Reinsurance Rails",
    description: "Binds point-of-origination insurance on every financed vehicle, commercial building, and residential property, pooling institutional reinsurance backing.",
    integrationCall: "POST /v1/insurance/wrap -> { policy_type: 'Comprehensive_All_Risk', coverage: '100%' }",
    capabilities: [
      "Instant policy generation upon credit approval",
      "Automated reinsurance treaty allocation (London & Zurich syndicates)",
      "Cryptographic digital certificate issuance to lenders",
      "Real-time claims escrow & instant payout triggers"
    ]
  },
  {
    id: "app-4-corporate-treasury",
    number: "04",
    name: "Corporate Treasury Autopilot",
    valuation: "Institutional Liquidity Optimization",
    category: "Enterprise Cash Management",
    badge: "Auto-Sweep Engine",
    description: "Automated cash concentration, cross-border multi-currency liquidity pooling, and overnight yield sweeps for Ghanaian and multinational corporations.",
    integrationCall: "POST /v1/treasury/sweep -> { source_accounts: 12, target: 'Overnight_Yield_Pool' }",
    capabilities: [
      "Multi-bank account aggregation across GTBank, Standard Chartered & global accounts",
      "Automated rule-based liquidity sweeping across 35+ African markets",
      "Real-time FX hedging and spot execution at wholesale interbank rates",
      "Predictive cashflow analytics & automated payroll clearing"
    ]
  },
  {
    id: "app-5-escrow-settlement",
    number: "05",
    name: "Escrow & Settlement as a Service",
    valuation: "White-label B2B Fintech Rails",
    category: "Institutional Custody",
    badge: "Trust Infrastructure",
    description: "Provides tier-1 banks, public procurement boards, and emerging fintechs with institutional-grade conditional escrow and automated milestone releases.",
    integrationCall: "POST /v1/escrow/disburse -> { escrow_id: 'ESC_9842', milestone_status: 'VERIFIED' }",
    capabilities: [
      "Multi-signature governance with independent engineering signoff",
      "Sub-second settlement into commercial bank and mobile money accounts",
      "Real-time audit trails with verifiable cryptographic proofs",
      "Custom dispute resolution and programmatic refund triggers"
    ]
  },
  {
    id: "app-6-ai-liquidity-routing",
    number: "06",
    name: "AI Liquidity Routing Engine",
    valuation: "Arbitrage & Cost Optimization",
    category: "Algorithmic Capital Pricing",
    badge: "Real-Time Pricing",
    description: "Continuously polls 5,000+ interconnected institutions to determine real-time spreads, interbank lending rates, and currency swap fees to deliver lowest financing costs.",
    integrationCall: "GET /v1/liquidity/optimal-route -> { amount: '$250M', tenor: '5Y', currency: 'USD' }",
    capabilities: [
      "Dynamic cost-of-capital comparison across 15 liquidity hubs",
      "Automated tranche splitting across multiple willing balance sheets",
      "Zero-latency route failover if capital caps are reached",
      "Historical spread analysis for predictive project refinancing"
    ]
  },
  {
    id: "app-7-cross-border-payments",
    number: "07",
    name: "Cross-Border Payment Orchestration",
    valuation: "Pan-African & Global Settlement",
    category: "High-Volume Transaction Rails",
    badge: "180+ Countries",
    description: "Unified API gateway delivering instant settlement across African mobile money networks (MTN, Telecel, M-Pesa, Orange), local RTGS systems, and international SWIFT rails.",
    integrationCall: "POST /v1/payments/orchestrate -> { corridors: ['GHS', 'NGN', 'USD'], rail: 'INSTANT' }",
    capabilities: [
      "Single API connection covering 35+ African markets",
      "Direct-to-bank, direct-to-mobile wallet, and institutional account routing",
      "Integrated AML, sanctions screening, and central bank reporting",
      "Guaranteed delivery with automated retries across redundant aggregation pools"
    ]
  },
  {
    id: "app-8-future-ideas-hub",
    number: "08",
    name: "Future Finance & Innovation Sandbox",
    valuation: "Unlimited Modular Expansion",
    category: "Modular Extensibility",
    badge: "1-Call Integration",
    description: "Universal plug-and-play architecture where any new sovereign finance idea, green energy bond, or digital asset protocol connects in a single API call.",
    integrationCall: "POST /v2/finastra/nexus-os/register-module -> { module_type: 'Carbon_Credit_Token' }",
    capabilities: [
      "Inherits all 5,000+ bank connections, compliance proofs, and insurance wraps instantly",
      "Zero redevelopment of underlying rails — builds instantly on the NEXUS Finastra OS",
      "Standardized security envelope with SOC2 and ISO compliance inheritance",
      "Rapid prototyping from conceptual mandate to live capital deployment in weeks"
    ]
  }
];

export const NEXUS_API_FLOWS: NexusApiEndpoint[] = [
  {
    id: "flow-1-syndicate",
    stepNumber: "01",
    action: "SYNDICATE",
    method: "POST",
    path: "/v1/lending/syndicate",
    summary: "Instant Multi-Bank Syndicate Allocation",
    description: "Submits a project financing mandate. NEXUS AI analyzes 5,000+ balance sheets, splits the $10B requirement across 10 syndicating institutions, and locks in the cheapest weighted average cost of capital.",
    requestPayload: {
      project_id: "GH-ACCRA-SMARTCITY-01",
      total_facility_usd: 10000000000,
      tenor_years: 10,
      currency: "USD",
      syndicate_target_banks: 10,
      collateral_type: "REINSURANCE_WRAPPED_REVENUE_ESCROW",
      purpose: "Accra Metropolitan Smart City Phase 1"
    },
    responsePayload: {
      status: "SYNDICATE_CONFIRMED",
      facility_id: "FAC_NEXUS_99812_ACCRA",
      total_committed_usd: 10000000000,
      syndicate_split: [
        { bank_tier: "Tier 1 Global A", allocation_usd: 2000000000, rate_pct: 4.25 },
        { bank_tier: "Tier 1 Global B", allocation_usd: 1500000000, rate_pct: 4.20 },
        { bank_tier: "Regional Consortium", allocation_usd: 6500000000, rate_pct: 4.35 }
      ],
      blended_annual_rate: "4.28%",
      escrow_vault_allocated: "VAULT_SECURE_NEXUS_01"
    }
  },
  {
    id: "flow-2-insure",
    stepNumber: "02",
    action: "INSURE",
    method: "POST",
    path: "/v1/insurance/wrap",
    summary: "100% Sales & Construction Reinsurance Wrap",
    description: "Attaches a binding comprehensive reinsurance policy across the syndicated facility. Covers 100% of construction default risk and 100% of end-user sales risk, eliminating all credit risk for syndicating banks.",
    requestPayload: {
      facility_id: "FAC_NEXUS_99812_ACCRA",
      coverage_scope: ["CONSTRUCTION_ALL_RISK", "SALES_DEFICIT_GUARANTEE", "POLITICAL_RISK"],
      coverage_percentage: 100,
      syndicate_protection_level: "ZERO_BANK_LOSS_GUARANTEE",
      syndicate_reinsurers: "GLOBAL_TIER1_REINSURANCE_CONSORTIUM"
    },
    responsePayload: {
      status: "SHIELD_BOUND_ACTIVE",
      policy_id: "INS_WRAP_NEXUS_7749",
      bank_credit_risk_exposure: "0.00%",
      sales_shortfall_reimbursement_guarantee: "100.00% Principal + Accrued Interest",
      reinsurance_treaty_binding: "ZURICH_LONDON_UNDERWRITING_POOL",
      premium_rate: "5.00% amortized across disbursement milestones"
    }
  },
  {
    id: "flow-3-disburse",
    stepNumber: "03",
    action: "DISBURSE",
    method: "POST",
    path: "/v1/escrow/disburse",
    summary: "Milestone-Verified Escrow Release",
    description: "Holds the $10B syndicated capital in vault custody. Programmatically releases tranches (e.g. $1B) to master contractors only upon computer vision satellite and verified independent engineer signoff.",
    requestPayload: {
      facility_id: "FAC_NEXUS_99812_ACCRA",
      milestone_id: "MLS_PHASE_1_FOUNDATION_15000_HOMES",
      requested_disbursement_usd: 1000000000,
      verification_proof: {
        satellite_imagery_hash: "0x89f2a71...93c",
        drone_lidar_audit_pass: true,
        supervising_engineer_license: "ENG_GH_55401",
        completion_milestone_pct: 10.00
      }
    },
    responsePayload: {
      status: "DISBURSEMENT_SETTLED",
      disbursement_ref: "DISB_NEXUS_TX_88192",
      amount_settled_usd: 1000000000,
      recipient_escrow: "ACCRA_SMART_CITY_CONSTRUCTION_POOL",
      settlement_channels: ["LOCAL_CLEARING_GHS", "DIRECT_CONTRACTOR_RTGS"],
      remaining_escrow_vault_balance: 9000000000,
      leakage_detected: 0.00
    }
  },
  {
    id: "flow-4-comply",
    stepNumber: "04",
    action: "COMPLY",
    method: "GET",
    path: "/v1/compliance/dashboard?facility_id=FAC_NEXUS_99812_ACCRA",
    summary: "Glass-Box Government Audit & Real-Time Tracking",
    description: "Generates an unalterable transparency feed for sovereign governments, parliamentary oversight committees, central banks, and development finance institutions.",
    responsePayload: {
      timestamp: "2026-08-23T18:30:00Z",
      government_partner: "Republic of Ghana - Ministry of Works & Housing",
      facility_id: "FAC_NEXUS_99812_ACCRA",
      total_facility: "$10,000,000,000 USD",
      total_disbursed: "$2,000,000,000 USD (20%)",
      physical_progress: "30,000 Smart Residential Units Completed, 15,000 in Foundation",
      capital_leakage_audit: "0.00% (Cryptographic Escrow Enforced)",
      insurance_shield_status: "ACTIVE - 100% Reinsurance Guarantee In Force",
      regulatory_clearance: "Compliant with Act 151, Bank of Ghana Guidelines, and FATF Standards"
    }
  }
];

export const NEXUS_ROADMAP: NexusRoadmapMilestone[] = [
  {
    phase: "Phase 1: Pilot & Proof",
    period: "Months 1 - 3",
    title: "NEXUS v1 (Ghana Sovereign Pilot)",
    targetScale: "$10M Pilot • 100 Smart Homes",
    revenueOrFee: "$2M Platform Fee Proof",
    milestones: [
      "Deploy NEXUS v1 core routing, reinsurance shield, and milestone escrow in Ghana",
      "Execute $10M pilot across 100 initial smart residential units in Greater Accra",
      "Demonstrate 0% bank credit risk and computer-vision escrow releases",
      "Validate real-time Glass-Box ministerial compliance dashboard"
    ],
    status: "In Pilot Execution"
  },
  {
    phase: "Phase 2: Continental Expansion",
    period: "Months 6 - 12",
    title: "NEXUS v2 (10 African Sovereign Jurisdictions)",
    targetScale: "$500M First Slum Redevelopment City",
    revenueOrFee: "$100M Fee Capture",
    milestones: [
      "Scale NEXUS v2 to 10 African partner nations across West, East, and Southern Africa",
      "Launch first $500M comprehensive urban transformation city tranche",
      "Expand AI liquidity routing across 25+ regional & global banking balance sheets",
      "Onboard secondary syndication partners and automated corporate treasury sweeping"
    ],
    status: "Phase 2 Scale"
  },
  {
    phase: "Phase 3: Global Scale",
    period: "Years 2 - 5",
    title: "NEXUS v3 (The OS of Global Finance)",
    targetScale: "50 Smart Cities • $500B Under Management",
    revenueOrFee: "Institutional Market Benchmark",
    milestones: [
      "Deploy NEXUS v3 globally across 50 international metropolitan smart developments",
      "Orchestrate $500B+ active asset & infrastructure portfolio under management",
      "Standardize NEXUS Escrow & Insurance Wrap as the global sovereign finance standard",
      "Enable 100+ third-party institutional apps via the Future Ideas Hub"
    ],
    status: "Global Horizon"
  }
];

export const INSTITUTIONAL_BANKERS = [
  {
    id: "gtbank",
    name: "Guaranty Trust Bank (Ghana) Ltd",
    shortName: "GTBank",
    description: "Leading African international banking institution providing corporate treasury, correspondent banking, and high-volume settlement rails.",
    role: "Official Corporate & Settlement Banker",
    tagline: "Orange Square of African Financial Excellence",
    accentColor: "from-orange-500 to-amber-600",
    badge: "Tier-1 Corporate Banking",
    features: [
      "Corporate Accounts & Treasury Management",
      "Multi-Currency Settlement (GHS, USD, EUR, GBP)",
      "High-Volume Commercial Clearing & Collections",
      "Real-time Enterprise Banking Integration"
    ]
  },
  {
    id: "standard-chartered",
    name: "Standard Chartered Bank (Ghana) PLC",
    shortName: "Standard Chartered",
    description: "Premier multinational British financial services company connecting African trade, global institutional markets, and cross-border treasury.",
    role: "Global Institutional & Trade Finance Banker",
    tagline: "Here for good • Connecting Africa with Global Markets",
    accentColor: "from-sky-500 to-blue-700",
    badge: "International Clearing & Trade",
    features: [
      "Cross-Border Institutional Settlement",
      "Correspondent Banking & Global Trade Finance",
      "FX Hedging & Interbank Liquidity Access",
      "Sovereign & Multilateral Custody Clearance"
    ]
  }
];
