import { CompanyVerificationInfo, ServicePillar, Web3IndustryArchitecture } from '../types';

export const OFFICIAL_COMPANY_INFO: CompanyVerificationInfo = {
  status: "OFFICIALLY REGISTERED",
  companyName: "OSKAYI CONSULT",
  registrationNumber: "BN248851025",
  tin: "P0000590118",
  jurisdiction: "Republic of Ghana",
  issuingAuthority: "Office of the Registrar of Companies (ROC), Republic of Ghana",
  act: "The Registration of Business Names Act, 1962 (Act 151)",
  registrationDate: "01-Oct-2025",
  startDate: "29-Sep-2025",
  founderAndCEO: "Listowel Sarsah Adentwi-Edzii",
  digitalAddress: "GA-183-8165",
  postalDigitalAddress: "GA-103-01G5",
  physicalAddress: "House Number 352, McCarthy Hill, Unknown Street near Presby Church, Accra, Greater Accra, Ghana",
  postalAddress: "P.O. Box 119989, Accra North, Ghana",
  isicCode: "8299",
  isicDescription: "Other business support service activities n.e.c.",
  principalActivity: "Information and Communication Technology Services, Project Development, Management, and Financial Consultancy Services.",
  contactPhone: "+233 24 490 5505",
  primaryEmail: "integrationpartners@oskayi.com",
  secondaryEmail: "oskayi@giideatg.com"
};

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "credit-sponsored-checkout",
    title: "Oskayi Credit Sponsored Checkout",
    category: "Fintech",
    badge: "Zero Gas • Regulated Credit",
    summary: "Get credit. Get protected. Transact without holding blockchain gas. Orchestrated credit checkout for customers with GH₵0 balances.",
    description: "Production-grade credit-sponsored checkout orchestration. Third-party Bank of Ghana licensed credit providers evaluate and fund purchases instantly, independent paymasters sponsor ERC-4337 blockchain gas, and Curacel underwrites credit life protection. Merchants receive 100% upfront settlement while customers repay over 1 to 12 months.",
    keyCapabilities: [
      "Zero-Balance Customer Flow: Transact with GH₵0 in bank, 0 USDT & 0 native gas",
      "Regulated Third-Party Underwriting: QuickCredit Tier-2, Stanbic & Finastra Loan IQ",
      "ERC-4337 Account Abstraction Paymasters: Biconomy, Pimlico & ZeroDev sponsored gas",
      "Curacel Credit Life Protection: Covers loan in covered medical/disability events",
      "Transparent Line-Item Ledger: Total separation of credit, gas, insurance & merchant payout"
    ],
    targetAudience: "E-commerce Platforms, Retail Merchants, Renewable Energy Buyers & Point of Sale Consortia",
    partnerDeliveryModel: "Orchestrated by Oskayi • Funded by Licensed Credit Providers & Insurers",
    status: "Active"
  },
  {
    id: "credit-facility-provision",
    title: "Credit Facility Provision & Capital Disbursement",
    category: "Fintech",
    badge: "$100 to Billions • Flexible Terms",
    summary: "Facilitating credit facilities from $100 to Billions of Dollars with disbursement timelines ranging from instant approval, 24 hours, 7 days, 1 month, to 3 months.",
    description: "Through our network of regulated international partners, Oskayi Consult facilitates tailored credit facilities and financing solutions. Whether for micro-credit needs or multi-billion dollar capital pools, we support Individuals, Groups, Organizations, Municipalities, Governments, Corporations, and Continental Development Blocks with custom disbursement structures.",
    keyCapabilities: [
      "Flexible Disbursal Timelines: Instant Approval, 24 Hours, 7 Days, 1 Month & 3 Months",
      "Tiered Funding Scale: Amounts Ranging from $100 to Billions of Dollars",
      "Broad Eligibility: Individuals, Groups, SMEs, Municipalities, Governments & Continental Blocks",
      "Regulated International Partner Underwriting & Treasury Management"
    ],
    targetAudience: "Individuals, Small Groups, Corporations, Municipalities, Governments & Continental Blocks",
    partnerDeliveryModel: "Facilitated through Regulated International Partners & Capital Consortia",
    status: "Active"
  },
  {
    id: "exclusive-insurance",
    title: "Exclusive Insurance for Individuals, Homes, Auto, Projects & Travel",
    category: "Insurance",
    badge: "Licensed Underwriting",
    summary: "Tailored individual and corporate insurance solutions covering Individuals, Homes, Auto/Fleet, Infrastructure Projects, Commercial Loans, and International Travel.",
    description: "Protecting assets, investments, and life across all spectrums. Delivered in partnership with top International Licensed Insurance and Reinsurance Partners, our policies provide comprehensive risk coverage, rapid automated claims processing, and multi-currency premium settlement.",
    keyCapabilities: [
      "Exclusive Auto, Fleet, Home & Individual Personal Policies",
      "Project & Construction All-Risk Insurance Underwriting",
      "Commercial Loan Guarantee & Non-Payment Protection",
      "International Travel Medical & Emergency Escrow"
    ],
    targetAudience: "Individuals, Homeowners, Project Developers, Lenders & Global Travelers",
    partnerDeliveryModel: "Underwritten by International Licensed Insurance & Reinsurance Partners",
    status: "Active"
  },
  {
    id: "fintech-fleet-development",
    title: "Fleet of Fintech Applications & Multi-Sector Software Development",
    category: "Fintech",
    badge: "Custom Industry Solutions",
    summary: "Custom software engineering solving critical needs across Telecom, Health, Education, Banking, Finance, and Public Sectors.",
    description: "Accelerating digital growth with specialized software suites tailored specifically to your industry. Our engineering teams build high-performance mobile apps, web portals, payment gateways, and automated collection systems custom-tailored for telecom operators, health providers, educational institutions, and financial entities.",
    keyCapabilities: [
      "Custom Solutions Tailored to Suit Any Specific Industry Need",
      "Telecom Mobile Money Integration & Airtime Credit Engines",
      "Health & Education Fee Processing & Micro-Subscription Portals",
      "Banking & Microfinance Custom Mobile/Web Applications"
    ],
    targetAudience: "Telecom Operators, Health Tech, Universities, Banks & Enterprises",
    partnerDeliveryModel: "Engineered by Oskayi Consult & Certified International Tech Partners",
    status: "Active"
  },
  {
    id: "project-financing",
    title: "Sovereign & Corporate Project Financing",
    category: "Project Financing",
    badge: "Concessionary Debt",
    summary: "Structuring multi-million dollar concessionary loans, debt-equity frameworks, and project financing guarantees for national infrastructure.",
    description: "Oskayi Consult connects public and private sector projects with international funding consortia and institutional debt pools. We manage feasibility assessments, risk mitigate project insurance requirements, and coordinate cross-border financial engineering for energy, transport, healthcare, and real estate assets.",
    keyCapabilities: [
      "Structured Debt & Equity Capital Origination",
      "Public-Private Partnership (PPP) Financial Modeling",
      "Cross-Border Sovereign & Commercial Guarantees",
      "Project Risk Mitigation & Escrow Architecture"
    ],
    targetAudience: "Government Ministries, Infrastructure Developers & Commercial Enterprise Projects",
    partnerDeliveryModel: "Coordinated with International Licensed Partners & Capital Consortia",
    status: "Active"
  },
  {
    id: "web3-enterprise",
    title: "Web3 & Blockchain Application Development",
    category: "Web3 & Blockchain",
    badge: "Enterprise Web3",
    summary: "Industry-tailored decentralized applications, asset tokenization protocols, and smart contracts for banking, agriculture, and supply chains.",
    description: "Bridging real-world business operations with cryptographic efficiency. Oskayi Consult designs customized Web3 applications that eliminate settlement delays, establish immutable audit trails, and enable tokenized asset finance without sacrificing regulatory compliance.",
    keyCapabilities: [
      "Tokenized Real-World Asset (RWA) Finance Protocols",
      "Custom Enterprise Smart Contract Architecture & Auditing",
      "Cross-Border Liquidity Rails & Web3 Escrow Vaults",
      "Supply Chain Traceability & Proof-of-Origin Verification"
    ],
    targetAudience: "Financial Institutions, Trade Corporations, Agricultural Cooperatives & Web3 Ventures",
    partnerDeliveryModel: "Engineered via specialized international Web3 protocol partners",
    status: "Active"
  },
  {
    id: "ict-consultancy",
    title: "ICT Services & Strategic Project Management",
    category: "ICT & Advisory",
    badge: "ISIC 8299 Support",
    summary: "Full-spectrum Information and Communication Technology consultancy, system integration, and management support.",
    description: "Grounding modern business transformations in sound technology strategy. As registered under ISIC 8299 in Ghana, Oskayi Consult provides comprehensive project oversight, enterprise IT architecture, cybersecurity frameworks, and operational advisory.",
    keyCapabilities: [
      "Enterprise Systems Architecture & Cloud Integration",
      "Cybersecurity Auditing & Resilience Frameworks",
      "ICT Project Management & Quality Assurance",
      "Digital Transformation Roadmapping for Institutions"
    ],
    targetAudience: "Government Agencies, Enterprises & Medium-to-Large Corporations",
    partnerDeliveryModel: "Delivered directly by Oskayi Consult senior consultants & tech partners",
    status: "Active"
  },
  {
    id: "cross-border-payment-orchestration",
    title: "Cross-Border Payment & Mobile Money Orchestration",
    category: "Fintech",
    badge: "Unified African & Global Rails",
    summary: "Unified disbursement and collection across all major African mobile networks, banking rails, and instant cross-border corridors.",
    description: "Direct-to-wallet and direct-to-bank settlement rails across 35+ African markets and global liquidity hubs. Oskayi Consult orchestrates instant collections, automated payroll, supplier payouts, and multi-currency treasury aggregation without vendor fragmentation.",
    keyCapabilities: [
      "Coverage Across 35+ African Markets & Global Financial Centers",
      "Mobile Money Aggregation (MTN, Telecel, M-Pesa, AirtelTigo, Orange Money)",
      "Automated Payroll, Supplier Payouts & Bulk Merchant Disbursals",
      "Multi-Currency Settlement (GHS, NGN, KES, ZAR, USD, EUR, GBP)"
    ],
    targetAudience: "Commercial Banks, Telcos, E-Commerce, Corporations & DFIs",
    partnerDeliveryModel: "Delivered via Integrated Regulated Financial & Telco Partners",
    status: "Active"
  },
  {
    id: "institutional-due-diligence",
    title: "Institutional Due Diligence, Compliance & RegTech",
    category: "ICT & Advisory",
    badge: "RegTech & Risk Auditing",
    summary: "End-to-end KYC, AML, audit, and regulatory reporting frameworks for financial institutions, corporations, and public bodies.",
    description: "Providing robust regulatory compliance ledgers, automated identity verification, transaction monitoring, and risk management architecture aligned with Bank of Ghana, Act 151, FATF, and international standards.",
    keyCapabilities: [
      "Automated KYC / AML Onboarding & Real-time Sanction Screening",
      "Regulatory Compliance Audit Trails & Instant Reporting Engines",
      "ISO 27001 & Cybersecurity Risk Resilience Assessments",
      "Institutional Due Diligence for Cross-Border Capital Flows"
    ],
    targetAudience: "Financial Institutions, Regulators, Fintechs & Sovereign Entities",
    partnerDeliveryModel: "Delivered directly by Oskayi Consult Senior Advisory Team & Tech Partners",
    status: "Active"
  }
];

export const WEB3_INDUSTRY_SOLUTIONS: Web3IndustryArchitecture[] = [
  {
    id: "banking-vaults",
    industry: "Banking & Financial Services",
    solutionTitle: "Institutional Web3 Vaults & Cross-Border Clearing",
    customDesign: "Multi-signature smart contract vaults with time-lock controls, automated regulatory reporting triggers, and liquidity pool connectors.",
    smartContractStandard: "ERC-4626 / Multi-Sig Gnosis-type Architecture",
    complianceFramework: "ISO20022 Data Mapping + On-Chain KYC Proofs",
    keyFeatures: [
      "Real-time liquidity monitoring",
      "Automated reserve ratio compliance checks",
      "Cross-currency atomic swap capability",
      "Role-based multi-tier approval keys"
    ],
    deploymentStatus: "Enterprise Custom Build"
  },
  {
    id: "agri-commodities",
    industry: "Agriculture & Commodity Trade",
    solutionTitle: "Tokenized Crop Yield & Warehouse Receipt Protocol",
    customDesign: "Digitizing physical agricultural warehouse receipts into tradable, verifiable tokens for instant collateralized loans.",
    smartContractStandard: "ERC-1155 Multi-Token / ERC-721 Receipt Token",
    complianceFramework: "Ghana Commodity Exchange (GCX) & International Trade Standards",
    keyFeatures: [
      "IoT sensor telemetry integration for warehouse condition tracking",
      "Instant collateralized loan drawdown via smart escrow",
      "Transparent farmer payout automation",
      "Export traceability proof-of-origin"
    ],
    deploymentStatus: "Live Partner Rail"
  },
  {
    id: "project-insurance-web3",
    industry: "Insurance & Risk Underwriting",
    solutionTitle: "Parametric Weather & Project Delay Insurance",
    customDesign: "Automated claim settlement based on verified satellite weather data and project milestone timestamps.",
    smartContractStandard: "Chainlink Oracle-Integrated Parametric Escrow",
    complianceFramework: "National Insurance Commission (NIC) Guidelines Compatible",
    keyFeatures: [
      "Zero-friction claims payout within seconds of oracle trigger",
      "Transparent policy condition auditability",
      "Automated premium pooling and yield generation",
      "Reinsurance risk distribution tokens"
    ],
    deploymentStatus: "Enterprise Custom Build"
  },
  {
    id: "supply-chain-logistics",
    industry: "Logistics & Bulk Freight",
    solutionTitle: "Customs Clearance & Bill of Lading Web3 Chain",
    customDesign: "Encrypted document verification protocol ensuring tamper-proof trade documentation for international shipping.",
    smartContractStandard: "ERC-721 Non-Fungible Document Tokens with Zero-Knowledge Proofs",
    complianceFramework: "World Customs Organization (WCO) Data Model",
    keyFeatures: [
      "Instant verification of shipping bills by customs authorities",
      "Elimination of paper bill-of-lading fraud",
      "Integrated letter of credit payment releases",
      "Immutable timestamping of port arrivals"
    ],
    deploymentStatus: "Coming Soon"
  }
];

export const INTEGRATED_PARTNERS_NETWORK = [
  {
    name: "Global Financial Infrastructure Network",
    type: "Banking & Payment Rails",
    region: "Europe & Middle East",
    description: "High-volume cross-border transaction engines and ISO20022 swift message bridges."
  },
  {
    name: "International Capital Consortia",
    type: "Project Finance & Equity",
    region: "UK, USA & Asia-Pacific",
    description: "Multi-billion dollar debt originators for energy, transport, and real estate projects."
  },
  {
    name: "Enterprise Web3 Protocol Alliance",
    type: "Blockchain & Smart Contracts",
    region: "Global Decentralized Networks",
    description: "Tier-1 security-audited smart contract systems and tokenization protocols."
  },
  {
    name: "Global Reinsurance & Risk Syndicate",
    type: "Insurance Underwriting",
    region: "London & Zurich Reinsurance Markets",
    description: "Comprehensive risk coverage for major capital works and institutional assets."
  }
];
