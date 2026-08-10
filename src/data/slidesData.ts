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
    title: "Sovereign & Municipal Infrastructure Financing",
    category: "Project Financing",
    badge: "Concessionary Debt",
    executiveNote: "Structuring multi-decade concessionary loan facilities, municipal green bonds, and sovereign credit enhancements for critical national transport, bridge, and civil infrastructure projects.",
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
    id: 2,
    title: "Core Interbank Banking & Cross-Border Payment Rails",
    category: "Fintech",
    badge: "ISO 20022 Compliant",
    executiveNote: "Orchestrating high-throughput interbank clearing engines, real-time gross settlement (RTGS) connectors, and automated SWIFT messaging bridges for commercial banks and central monetary hubs.",
    metric: "10,000+ TPS",
    metricLabel: "Transaction Throughput Capacity",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "ISO 20022 Financial Data Standard Translation",
      "Automated Interbank Liquidity Buffer Monitoring",
      "Tier-1 Financial Gateway & API Bridge Security"
    ]
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    title: "Institutional Reinsurance & Sovereign Risk Underwriting",
    category: "Infrastructure & Trade",
    badge: "Risk Syndication",
    executiveNote: "Structuring multi-layered reinsurance syndication, political risk insurance (PRI), and sovereign default guarantees through tier-1 global insurance syndicates.",
    metric: "$500M",
    metricLabel: "Underwriting Risk Capacity",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Lloyd's & Zurich Reinsurance Syndicate Alignment",
      "Political Risk & Non-Honoring Debt Protection",
      "Automated Claims Verification & Escrow Triggers"
    ]
  },
  {
    id: 6,
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
    id: 7,
    title: "Central Bank Digital Currency (CBDC) & Sovereign Ledgers",
    category: "Fintech",
    badge: "Sovereign Ledger",
    executiveNote: "Consultancy and custom ledger architecture for central bank digital currency pilots, multi-currency offline payment wallets, and interbank settlement resilience.",
    metric: "Sub-Second",
    metricLabel: "Settlement Finality Speed",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Hierarchical Cryptographic Key Governance",
      "Offline Mesh Transaction Security Rules",
      "Central Monetary Authority Oversight Dashboard"
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
