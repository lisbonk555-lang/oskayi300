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
    executiveNote: "Structuring multi-decade concessionary loan facilities, municipal green bonds, and sovereign credit enhancements for critical national transport, bridge, and civil infrastructure.",
    metric: "$250M+",
    metricLabel: "Capital Allocation Capacity",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Sovereign Guarantee Engineering",
      "Public-Private Partnership (PPP) Models",
      "Long-Term Debt Amortization Structuring"
    ]
  },
  {
    id: 2,
    title: "Core Interbank Banking & Cross-Border Payment Rails",
    category: "Fintech",
    badge: "ISO 20022 Compliant",
    executiveNote: "Orchestrating high-throughput interbank clearing engines, real-time gross settlement (RTGS) connectors, and automated SWIFT messaging bridges for commercial banks.",
    metric: "10,000+ TPS",
    metricLabel: "Transaction Throughput",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "ISO 20022 Data Format Translation",
      "Automated Liquidity Buffer Monitoring",
      "Tier-1 Interbank Gateway Bridging"
    ]
  },
  {
    id: 3,
    title: "Agriculture & Smallholder Supply Chain Tokenization",
    category: "Web3 & Digital Assets",
    badge: "Real-World Assets (RWA)",
    executiveNote: "Digitizing cocoa, grain, and timber warehouse receipts into verifiable cryptographic tokens to provide instant pre-export financing and warehouse liquidity.",
    metric: "100% Verifiable",
    metricLabel: "Proof-of-Origin Traceability",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "ERC-1155 Multi-Token Receipt Standard",
      "IoT Sensor Quality Telemetry",
      "Automated Farmer Payout Escrow"
    ]
  },
  {
    id: 4,
    title: "Maritime Port & Deepwater Logistics Infrastructure",
    category: "Infrastructure & Trade",
    badge: "Trade Corridor",
    executiveNote: "Financing container terminal berth expansions, automated crane systems, and digital port clearance platforms for West African trade hubs.",
    metric: "2.5M TEU",
    metricLabel: "Annual Handling Capacity",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Port Terminal Concession Structuring",
      "Digital Bill of Lading (e-BoL) Verification",
      "Customs Duty Automated Settlement"
    ]
  },
  {
    id: 5,
    title: "Central Bank Digital Currency (CBDC) Architecture",
    category: "Fintech",
    badge: "Sovereign Ledger",
    executiveNote: "Consultancy and custom ledger architecture for central bank digital currency pilots, multi-currency offline wallets, and interbank settlement resilience.",
    metric: "Sub-Second",
    metricLabel: "Settlement Finality",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Hierarchical Cryptographic Key Governance",
      "Offline Mesh Transaction Security",
      "Central Bank Regulatory Dashboard"
    ]
  },
  {
    id: 6,
    title: "Utility-Scale Solar & Renewable Energy Facilities",
    category: "Project Financing",
    badge: "Green Energy",
    executiveNote: "Arranging non-recourse project debt, Power Purchase Agreement (PPA) underwriting, and green bond syndication for 50MW+ solar grid projects.",
    metric: "150 MW+",
    metricLabel: "Combined Project Pipeline",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Bankable PPA Contract Engineering",
      "ESG Green Bond Certification",
      "Off-Grid Tariff Risk Mitigation"
    ]
  },
  {
    id: 7,
    title: "Telecommunications Fiber Backbone & 5G Securitization",
    category: "Infrastructure & Trade",
    badge: "Digital Connectivity",
    executiveNote: "Syndicated capital raising and asset-backed securitization for national fiber-optic backbones, cross-border subsea landing stations, and 5G tower networks.",
    metric: "5,000+ KM",
    metricLabel: "Fiber Optic Network Reach",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "TowerCo Asset Revenue Securitization",
      "Cross-Border Fiber Transit Leasing",
      "Spectrum Licensing Debt Facilities"
    ]
  },
  {
    id: 8,
    title: "Institutional Reinsurance & Project Risk Underwriting",
    category: "Infrastructure & Trade",
    badge: "Risk Syndication",
    executiveNote: "Providing multi-layered reinsurance syndication, political risk insurance (PRI), and sovereign default guarantees through tier-1 global insurance syndicates.",
    metric: "$500M",
    metricLabel: "Underwriting Risk Capacity",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Lloyd's & Zurich Syndicate Alignment",
      "Force Majeure & Non-Honoring Debt Insurance",
      "Escrow Reinsurance Release Triggers"
    ]
  },
  {
    id: 9,
    title: "Mining Concession & Mineral Streaming Capital",
    category: "Project Financing",
    badge: "Resources & ESG",
    executiveNote: "Structuring gold, bauxite, and lithium streaming debt facilities for regulated mining concessions adhering to ESG and local value-addition mandates.",
    metric: "$120M",
    metricLabel: "Pre-Export Commodity Facility",
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Pre-Export Finance (PXF) Structuring",
      "Local Value-Addition Processing Guarantees",
      "Environmental Compliance Escrow"
    ]
  },
  {
    id: 10,
    title: "Trade Credit Guarantee & Export-Import Escrow",
    category: "Fintech",
    badge: "Trade Finance",
    executiveNote: "Multi-currency Letter of Credit (LC) issuance, automated escrow smart contracts, and trade credit insurance for international merchant import-export.",
    metric: "24-Hour",
    metricLabel: "LC Verification & Issuance",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Multi-Currency Escrow Accounts (USD/EUR/GHS)",
      "Automated Trade Document Verification",
      "Correspondent Banking Guarantees"
    ]
  },
  {
    id: 11,
    title: "Institutional Cold Storage Vaults & Custody Infrastructure",
    category: "Web3 & Digital Assets",
    badge: "Cyber Vaults",
    executiveNote: "Multi-signature cryptographic key management, Hardware Security Module (HSM) deployment, and audited digital asset vaulting for institutional treasuries.",
    metric: "FIPS 140-3",
    metricLabel: "Military-Grade Hardware Security",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Shamir Secret Sharing Key Management",
      "Geographically Distributed HSM Vaults",
      "Real-Time Reserve Ratio Auditing"
    ]
  },
  {
    id: 12,
    title: "Healthcare Infrastructure & Pharma Supply Chains",
    category: "Infrastructure & Trade",
    badge: "Healthcare & Life",
    executiveNote: "Concessionary capital and track-and-trace blockchain ledgers for regional hospital construction, medical oxygen plants, and pharmaceutical distribution.",
    metric: "50+ Facilities",
    metricLabel: "Hospital & Clinic Coverage",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Medical Asset Leasing & Concession Loans",
      "Pharma Counterfeit Mitigation Serialization",
      "Group Health Scheme Underwriting"
    ]
  },
  {
    id: 13,
    title: "Aviation Fleet Financing & Regional Airport Expansion",
    category: "Project Financing",
    badge: "Aviation Capital",
    executiveNote: "Arranging aircraft lease financing, regional airport terminal debt, and automated passenger fee settlement systems for aviation authorities.",
    metric: "$80M",
    metricLabel: "Aviation Equipment Facility",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Cape Town Convention Aircraft Leasing",
      "Passenger Facility Charge (PFC) Securitization",
      "Aviation Fuel Hedging Escrow"
    ]
  },
  {
    id: 14,
    title: "Commercial Real Estate RWA Tokenization Protocols",
    category: "Web3 & Digital Assets",
    badge: "Real Estate RWA",
    executiveNote: "Fractionalizing prime commercial office towers and industrial logistics parks into compliant security tokens to attract global institutional capital.",
    metric: "$45M",
    metricLabel: "Tokenized Commercial Asset Value",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "ERC-3643 Compliant Security Token Standard",
      "Automated Rental Yield Distribution Smart Contracts",
      "International Accredited Investor Onboarding"
    ]
  },
  {
    id: 15,
    title: "Carbon Credit Verification & Sovereign Asset Registries",
    category: "Web3 & Digital Assets",
    badge: "Climate Web3",
    executiveNote: "Blockchain-anchored carbon credit registries, forest conservation tokenization, and Article 6 Paris Agreement compliant climate finance platforms.",
    metric: "100% Immutable",
    metricLabel: "Double-Counting Prevention",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Satellite Canopy Cover Telemetry Verification",
      "Article 6.2 Internationally Transferred Mitigation Outcomes",
      "Transparent Corporate Carbon Offset Trading"
    ]
  },
  {
    id: 16,
    title: "Micro-Lending & SME Credit Syndicate Protocols",
    category: "Fintech",
    badge: "Financial Inclusion",
    executiveNote: "AI-driven algorithmic credit scoring engines and digital liquidity pools disbursing micro and macro loans directly to SME commercial accounts.",
    metric: "50,000+",
    metricLabel: "SMEs Funded Across West Africa",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Mobile Money Transaction Behavior Scoring",
      "Automated Repayment Webhooks & Recovery",
      "Credit Guarantee Fund Protection"
    ]
  },
  {
    id: 17,
    title: "Municipal Green Bond Underwriting & Urban Transit",
    category: "Project Financing",
    badge: "Urban Transit",
    executiveNote: "Structuring ESG green bonds for electric bus rapid transit (BRT) fleets, urban waste-to-energy conversion plants, and municipal water purification.",
    metric: "$60M",
    metricLabel: "Municipal Green Bond Placement",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Municipal Farebox Revenue Escrow",
      "Carbon Reduction Impact Certification",
      "Urban Development Finance Guarantees"
    ]
  },
  {
    id: 18,
    title: "Cross-Border Remittance & Mobile Money Interoperability",
    category: "Fintech",
    badge: "Mobile Rails",
    executiveNote: "Interconnecting Mobile Money wallets (MTN, Telecel, AirtelTigo) with global banking networks to enable instant low-cost diaspora remittances.",
    metric: "< 1%",
    metricLabel: "Average Remittance Fee Ratio",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Real-Time Mobile Wallet API Connectors",
      "Direct Bank Liquidity Settlement Escrow",
      "Anti-Fraud Pattern Recognition Engine"
    ]
  },
  {
    id: 19,
    title: "Clean Water Treatment & Desalination Concessions",
    category: "Infrastructure & Trade",
    badge: "Water & Utility",
    executiveNote: "Financing municipal water treatment plants, pipeline distribution networks, and IoT-metered billing systems for expanding industrial zones.",
    metric: "100K M³",
    metricLabel: "Daily Clean Water Capacity",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Build-Own-Operate-Transfer (BOOT) Concessions",
      "Automated Revenue Metering & Clearing",
      "Environmental & Health Compliance Certification"
    ]
  },
  {
    id: 20,
    title: "Institutional Governance & Regulatory Technology (RegTech)",
    category: "Infrastructure & Trade",
    badge: "RegTech & Compliance",
    executiveNote: "Automated real-time regulatory compliance reporting modules, central bank oversight portals, and audited governance frameworks for financial institutions.",
    metric: "100% Compliant",
    metricLabel: "Central Bank & FATF Standards",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    deliveryFramework: [
      "Automated Statutory Returns Submission",
      "Sanctions & PEP Real-Time Screening",
      "Immutable Audit Log Verification"
    ]
  }
];
