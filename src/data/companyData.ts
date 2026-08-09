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
    id: "fintech-banking",
    title: "Fintech Solutions for Banks & Financial Institutions",
    category: "Fintech",
    badge: "Core Rail Integration",
    summary: "Architecting high-concurrency core banking modules, API gateway bridges, and bulk transfer protocols customized for regulated institutions.",
    description: "In partnership with tier-1 international technology providers, Oskayi Consult delivers enterprise-grade fintech infrastructure. From core transaction routing to multi-layered security and automated compliance checks, our solutions empower commercial banks, microfinance institutions, and payment service providers across Africa.",
    keyCapabilities: [
      "Bulk Money Transfer Rails & ISO20022 Messaging",
      "Core Banking System Connectors & Open API Gateways",
      "Automated Anti-Money Laundering (AML) & KYC Verification",
      "Instant Loan Decisioning Engines & Credit Scoring Models"
    ],
    targetAudience: "Commercial Banks, Microfinance Institutions, Credit Unions & Fintech Operators",
    partnerDeliveryModel: "Delivered through certified international integrated technology partners",
    status: "Active"
  },
  {
    id: "project-financing",
    title: "Project Financing & Infrastructure Advisory",
    category: "Project Financing",
    badge: "Capital Structuring",
    summary: "Structuring multi-million dollar capital solutions, debt-equity frameworks, and project financing guarantees for large-scale developments.",
    description: "Oskayi Consult connects public and private sector projects with international funding consortia and institutional debt pools. We manage feasibility assessments, risk mitigate project insurance requirements, and coordinate cross-border financial engineering for energy, transport, healthcare, and real estate assets.",
    keyCapabilities: [
      "Structured Debt & Equity Capital Origination",
      "Public-Private Partnership (PPP) Financial Modeling",
      "Cross-Border Sovereign & Commercial Guarantees",
      "Project Risk Mitigation & Escrow Architecture"
    ],
    targetAudience: "Government Ministries, Infrastructure Developers & Commercial Enterprise Projects",
    partnerDeliveryModel: "Coordinated with global capital partners & development finance institutions",
    status: "Active"
  },
  {
    id: "insurance-payments",
    title: "Insurance & Multi-Currency Payment Solutions",
    category: "Insurance",
    badge: "Underwriting & Escrow",
    summary: "Customized individual, group, and project-specific insurance underwriting paired with high-volume international payment rails.",
    description: "Protecting commercial assets and enabling frictionless cross-border commerce. Our integrated insurance frameworks offer tailored coverage for infrastructure projects, bulk cargo, healthcare groups, and financial assets, fully synchronized with automated multi-currency payment settlement gateways.",
    keyCapabilities: [
      "Project Insurance & Construction Risk Coverage",
      "Individual & Group Corporate Health/Life Schemes",
      "Multi-Currency Settlement Gateways (USD, EUR, GBP, GHS)",
      "Automated Claims Escrow & Insurance Payment Rails"
    ],
    targetAudience: "Corporates, Institutional Developers, Employers & International Traders",
    partnerDeliveryModel: "Underwritten by international reinsurance & licensed insurance partners",
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
    id: "instant-loans",
    title: "Instant Loan & Credit Distribution Infrastructure",
    category: "Fintech",
    badge: "Automated Credit",
    summary: "Turnkey digital lending platforms with real-time risk scoring, automated disbursement, and Mobile Money integration.",
    description: "Enabling banks and authorized non-bank lenders to deploy instant micro and macro loan products. Built with robust algorithmic risk assessment, seamless API integration into telecom money channels, and flexible repayment schedules.",
    keyCapabilities: [
      "Real-Time Credit Decision Engine & Scoring Rules",
      "Mobile Money & Direct Bank Account Disbursement",
      "Automated Collateral Verification & Repayment Webhooks",
      "Regulatory Compliance & Default Analytics Reporting"
    ],
    targetAudience: "Lending Institutions, Telecom Operators & FinTech Lenders",
    partnerDeliveryModel: "Integrated SaaS & On-Premises Partner Deployments",
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
