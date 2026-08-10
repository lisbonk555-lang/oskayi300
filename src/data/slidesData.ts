export interface SlideItem {
  id: number;
  title: string;
  category: 'Fintech' | 'Project Financing' | 'Web3 & Digital Assets' | 'Infrastructure & Trade';
  badge: string;
  executiveNote: string;
  metric: string;
  metricLabel: string;
  imageUrl: string;
  deliveryFramework: string[];
}

export const SHOWCASE_SLIDES: SlideItem[] = [
  {
    id: 1,
    title: "Credit Facility Provision ($100 to Billions)",
    category: "Fintech",
    badge: "Instant to 3-Month Disbursal",
    executiveNote: "Facilitating structured credit facilities ranging from $100 to Billions of Dollars with disbursement timelines tailored from instant approval, 24 hours, 7 days, 1 month, up to 3 months for individuals, groups, companies, municipalities, governments, and continental blocks.",
    metric: "$100 to $Billion+",
    metricLabel: "Flexible Funding Scale",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Timelines: Instant, 24 Hours, 7 Days, 1 Month, 3 Months",
      "Clients: Individuals, SMEs, Municipalities, Governments & Continental Blocks",
      "Underwritten via Regulated International Partners"
    ]
  },
  {
    id: 2,
    title: "Sovereign & Institutional Project Financing",
    category: "Project Financing",
    badge: "Concessionary Capital",
    executiveNote: "Arranging long-term concessionary loan facilities, green bonds, and capital project debt for national energy, transportation, telecom, and healthcare infrastructure via our International Licensed Partners.",
    metric: "$250M+",
    metricLabel: "Capital Allocation Capacity",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Sovereign Guarantee Engineering & Syndication",
      "Public-Private Partnership (PPP) Concession Models",
      "Long-Term Debt Amortization & Escrow Structuring"
    ]
  },
  {
    id: 3,
    title: "Exclusive Insurance Solutions for Individuals, Homes, Auto, Projects & Travel",
    category: "Infrastructure & Trade",
    badge: "Exclusive Underwriting",
    executiveNote: "Comprehensive insurance coverage tailored for Individuals, Homes, Auto/Fleet, Commercial Projects, Loans, and International Travel underwritten through our International Licensed Insurance & Reinsurance Partners.",
    metric: "100% Covered",
    metricLabel: "Tailored Risk Underwriting",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Individual & Group Auto, Home & Travel Policies",
      "Project & Construction All-Risk Coverage",
      "Commercial Loan Protection & Reinsurance Syndication"
    ]
  },
  {
    id: 4,
    title: "Fleet of Fintech Applications for Telecom, Health, Education & Banking",
    category: "Fintech",
    badge: "Cross-Industry Apps",
    executiveNote: "Engineering custom-built fintech applications and enterprise digital platforms that accelerate growth across Telecom, Healthcare, Education, Agriculture, and Banking sectors.",
    metric: "Multi-Industry",
    metricLabel: "Custom Digital Solutions Fleet",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Telecom Mobile Money & Airtime Loan Engines",
      "Health & Education Fee Collection Gateways",
      "Core Banking & Merchant Payment Rails"
    ]
  },
  {
    id: 5,
    title: "Instant Lending & Automated Credit Scoring Engines",
    category: "Fintech",
    badge: "Instant Credit Pools",
    executiveNote: "Engineering algorithmic liquidity pools and micro-macro credit scoring engines that disburse instant working capital to individuals, SMEs, and commercial entities.",
    metric: "50,000+",
    metricLabel: "SME & Individual Loans Funded",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Real-Time Mobile Wallet & Cashflow Scoring",
      "Automated Repayment Webhooks & Default Protection",
      "Sovereign Credit Guarantee Fund Escrow"
    ]
  },
  {
    id: 6,
    title: "Web3 Real-World Asset (RWA) & Supply Chain Tokenization",
    category: "Web3 & Digital Assets",
    badge: "RWA Smart Contracts",
    executiveNote: "Digitizing agricultural commodities, mineral warehouse receipts, and commercial real estate into verifiable cryptographic smart tokens for instant pre-export financing.",
    metric: "100% Verifiable",
    metricLabel: "Proof-of-Origin & Reserve Traceability",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "ERC-1155 Multi-Token Receipt Standard",
      "IoT Sensor & Satellite Quality Telemetry",
      "Automated Smart Escrow Settlement Rules"
    ]
  },
  {
    id: 7,
    title: "Maritime Port & Deepwater Cargo Logistics Infrastructure",
    category: "Infrastructure & Trade",
    badge: "Trade Corridor",
    executiveNote: "Financing container terminal berth expansions, automated crane systems, and digital port clearance platforms for strategic West African trade hubs.",
    metric: "2.5M TEU",
    metricLabel: "Annual Cargo Handling Capacity",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Port Terminal Concession & Lease Structuring",
      "Digital Bill of Lading (e-BoL) Verification",
      "Customs Duty Automated Tariff Clearing"
    ]
  },
  {
    id: 8,
    title: "Utility-Scale Solar & Renewable Energy Facilities",
    category: "Project Financing",
    badge: "Green Energy",
    executiveNote: "Arranging non-recourse project debt, Power Purchase Agreement (PPA) underwriting, and green bond syndication for 50MW+ grid-connected solar installations.",
    metric: "150 MW+",
    metricLabel: "Combined Renewable Energy Pipeline",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Bankable PPA Contract & Revenue Engineering",
      "ESG Green Bond Certification Compliance",
      "Off-Grid Tariff & Currency Risk Mitigation"
    ]
  },
  {
    id: 9,
    title: "Telecommunications Fiber Backbone & 5G Securitization",
    category: "Infrastructure & Trade",
    badge: "Digital Connectivity",
    executiveNote: "Syndicated capital raising and asset-backed securitization for national fiber-optic backbones, cross-border subsea landing stations, and 5G tower networks.",
    metric: "5,000+ KM",
    metricLabel: "Fiber Optic Network Reach",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "TowerCo Asset Revenue Securitization",
      "Cross-Border Fiber Transit Leasing Agreements",
      "Spectrum Licensing Concession Debt Facilities"
    ]
  },
  {
    id: 10,
    title: "Institutional Regulatory Technology & Compliance Ledgers",
    category: "Infrastructure & Trade",
    badge: "RegTech & Compliance",
    executiveNote: "Automated real-time regulatory compliance reporting modules, central bank oversight portals, and audited governance frameworks for financial institutions.",
    metric: "100% Compliant",
    metricLabel: "Central Bank & FATF Global Standards",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Automated Statutory Returns Submission Engine",
      "Sanctions & PEP Real-Time Screening API",
      "Immutable Audit Log Verification System"
    ]
  }
];
