import { 
  Building2, 
  Coins, 
  ShieldAlert, 
  Zap, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Cpu, 
  Lock, 
  Globe2, 
  TrendingUp, 
  Layers, 
  Radio, 
  Terminal, 
  Sparkles,
  ShoppingBag,
  CreditCard,
  LineChart,
  BadgeDollarSign,
  Users,
  Wallet,
  Clock,
  Briefcase,
  FileText,
  Scale,
  Award,
  Layers3,
  Server,
  DollarSign
} from 'lucide-react';

export interface OrchestrationModule {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  icon: any;
  accentColor: string;
  badgeBg: string;
  simpleExplanation: string;
  whyItMatters: string;
  coreRails: string[];
  targetUserTypes: string[];
  keyFeatures: string[];
  defaultConfig: Record<string, any>;
  sampleMetrics: { label: string; value: string; change: string }[];
}

export const USER_TYPES = [
  {
    id: 'sme_owner',
    title: 'SME / Business Owner',
    description: 'Operating cross-border commerce, importing/exporting goods, managing multi-currency suppliers and local sales.',
    recommendedModules: ['sme-treasury', 'digital-treasury', 'marketplace-lending']
  },
  {
    id: 'marketplace_operator',
    title: 'Marketplace Operator',
    description: 'Running multi-vendor platforms, e-commerce stores, gig-economy marketplaces with mass seller payouts.',
    recommendedModules: ['marketplace-payouts', 'marketplace-lending', 'digital-treasury']
  },
  {
    id: 'insurer_admin',
    title: 'Insurer / Benefits Admin',
    description: 'Underwriters, insurance brokers, and corporate employee benefits administrators managing embedded policies & claims.',
    recommendedModules: ['insurance-distribution', 'benefits-insurance']
  },
  {
    id: 'investment_advisor',
    title: 'Investment Client / Advisor',
    description: 'Wealth managers, fintech savings apps, and micro-investment advisors routing capital into T-Bills and equities.',
    recommendedModules: ['micro-investment', 'capital-markets', 'clearing-settlement']
  },
  {
    id: 'payroll_admin',
    title: 'Payroll / HR Admin',
    description: 'Human resources and operations leaders coordinating distributed remote talent across African and international corridors.',
    recommendedModules: ['distributed-payroll', 'benefits-insurance']
  },
  {
    id: 'treasury_admin',
    title: 'Treasury Admin (Enterprise)',
    description: 'Corporate treasurers and chief financial officers managing multi-PSP balances, sweeps, and high-volume cash pooling.',
    recommendedModules: ['digital-treasury', 'sme-treasury', 'clearing-settlement']
  }
];

export const ORG_ROLES = [
  {
    id: 'owner_admin',
    label: 'Owner / Admin',
    badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
    description: 'Full organization authority: Invite & remove team members, manage API credentials, configure modules, approve sweeps, and initiate capital requests.',
    canExecuteSweeps: true,
    canManageTeam: true,
    canEditSettings: true,
    canViewLedger: true
  },
  {
    id: 'finance_manager',
    label: 'Finance Manager',
    badgeColor: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40',
    description: 'Operational treasury execution: Execute scheduled batch disbursements, trigger auto-sweeps, request working-capital facilities, and manage balance rules.',
    canExecuteSweeps: true,
    canManageTeam: false,
    canEditSettings: false,
    canViewLedger: true
  },
  {
    id: 'viewer_analyst',
    label: 'Viewer / Analyst',
    badgeColor: 'bg-sky-400/20 text-sky-300 border-sky-400/40',
    description: 'Read-only financial visibility: Monitor unified ledgers, generate analytics reports, inspect connector status, and track cash-flow forecasts without execution permissions.',
    canExecuteSweeps: false,
    canManageTeam: false,
    canEditSettings: false,
    canViewLedger: true
  }
];

export const FLEET_CONNECTORS_CONFIG = [
  {
    id: 'paystack',
    name: 'Paystack',
    category: 'Payment Processor (African Flow Core)',
    endpoint: 'https://api.paystack.co',
    authType: 'API Secret Key & Public Key',
    description: 'Core clearing rail for African flows, mobile money aggregation, dedicated virtual accounts, and instant bulk transfers.',
    docsUrl: 'https://paystack.com/docs/api/',
    iconColor: 'text-sky-400'
  },
  {
    id: 'mono',
    name: 'Mono Direct Banking',
    category: 'Bank / Open Banking API',
    endpoint: 'https://api.withmono.com/v1',
    authType: 'Secret Key & OAuth Token',
    description: 'Direct open-banking connectivity into commercial banks across Nigeria and Ghana for account balances and direct debits.',
    docsUrl: 'https://docs.mono.co',
    iconColor: 'text-indigo-400'
  },
  {
    id: 'okra',
    name: 'Okra Open Finance',
    category: 'Bank / Open Banking API',
    endpoint: 'https://api.okra.co/v2',
    authType: 'App-ID & Secret Token',
    description: 'Real-time bank ledger streaming, automated income verification, and transaction auditing across West Africa.',
    docsUrl: 'https://docs.okra.co',
    iconColor: 'text-emerald-400'
  },
  {
    id: 'stitch',
    name: 'Stitch Money',
    category: 'Open Banking (Southern/East Africa)',
    endpoint: 'https://api.stitch.money/graphql',
    authType: 'OAuth 2.0 / Client Credentials',
    description: 'Instant bank pay-ins and pay-outs across South Africa, Kenya, and regional commercial banking rails.',
    docsUrl: 'https://stitch.money/docs',
    iconColor: 'text-purple-400'
  },
  {
    id: 'shopify',
    name: 'Shopify Storefront & Admin',
    category: 'E-Commerce Marketplace',
    endpoint: 'https://{shop}.myshopify.com/admin/api/2025-10',
    authType: 'Admin Access Token',
    description: 'Continuous order sync, gross merchandise volume (GMV) telemetry, customer ledger tracking, and seller settlement.',
    docsUrl: 'https://shopify.dev/docs/api/admin-rest',
    iconColor: 'text-lime-400'
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce Regional Store',
    category: 'E-Commerce Marketplace',
    endpoint: 'https://{site}.com/wp-json/wc/v3',
    authType: 'Consumer Key & Consumer Secret',
    description: 'REST API v3 connector for self-hosted e-commerce stores, automated order retrieval, and supplier split payouts.',
    docsUrl: 'https://woocommerce.github.io/woocommerce-rest-api-docs/',
    iconColor: 'text-amber-400'
  },
  {
    id: 'coingecko',
    name: 'CoinGecko Price Oracles',
    category: 'Market Data / Crypto Oracles',
    endpoint: 'https://api.coingecko.com/api/v3',
    authType: 'Public REST / Demo API Key',
    description: 'Live cryptographic asset valuation, cross-rate verification, and decentralized liquidity pool telemetry.',
    docsUrl: 'https://www.coingecko.com/en/api/documentation',
    iconColor: 'text-emerald-300'
  },
  {
    id: 'exchangerate',
    name: 'Exchangerate.host & Central Bank FX',
    category: 'Market Data (Live FX)',
    endpoint: 'https://api.exchangerate.host',
    authType: 'Open Access REST',
    description: 'Sub-second real-time foreign exchange spot rates, central bank reference rates, and currency conversion matrices.',
    docsUrl: 'https://exchangerate.host',
    iconColor: 'text-teal-300'
  }
];

export const ORCHESTRATION_MODULES: OrchestrationModule[] = [
  {
    id: 'sme-treasury',
    number: '01',
    title: 'Cross-Border SME Treasury Orchestrator',
    tagline: 'Multi-currency cash pooling, bank feeds, and automated working capital',
    category: 'Treasury & Liquidity',
    icon: Building2,
    accentColor: 'border-amber-400/80 bg-amber-400/10 text-amber-300',
    badgeBg: 'bg-amber-400/20 text-amber-300',
    simpleExplanation: 'Connects your African bank accounts, Paystack balances, and online stores into a single dashboard. It automatically sweeps local profits into stable currencies and predicts when you need cash advances.',
    whyItMatters: 'Eliminates trapped local currency liquidity and automates FX hedging across African borders without expensive traditional bank wire fees.',
    coreRails: ['Paystack', 'Mono', 'Okra', 'Stitch', 'Shopify', 'WooCommerce', 'Exchangerate.host'],
    targetUserTypes: ['sme_owner', 'treasury_admin'],
    keyFeatures: [
      'Unified multi-currency balance ledger (USD, GHS, NGN, ZAR, KES)',
      'Automated FX auto-sweeps to base currency when threshold is exceeded',
      'Scheduled recurring batches for suppliers, payroll, and statutory tax (GRA/FIRS)',
      'Instant standardized cash-flow packs for partner working-capital lenders'
    ],
    defaultConfig: {
      baseCurrency: 'USD',
      autoSweepThresholdUsd: 50000,
      payrollSchedule: 'Monthly 25th',
      targetCurrency: 'USD'
    },
    sampleMetrics: [
      { label: 'Normalized Cash', value: '$168,920.45', change: '+14.2% MoM' },
      { label: 'Auto-Swept Volume', value: '$84,500.00', change: 'Sub-3s Netting' },
      { label: 'Approved Capital', value: '$35,000.00', change: '13.8% Blended APR' }
    ]
  },
  {
    id: 'marketplace-payouts',
    number: '02',
    title: 'Global Marketplace Treasury & Payout Orchestrator',
    tagline: 'Multi-seller split settlement, escrow release, and mass contractor payouts',
    category: 'Marketplaces & Payouts',
    icon: ShoppingBag,
    accentColor: 'border-emerald-400/80 bg-emerald-400/10 text-emerald-300',
    badgeBg: 'bg-emerald-400/20 text-emerald-300',
    simpleExplanation: 'Handles payments for marketplaces. When a buyer pays, it splits the money automatically—sending the platform fee to you, the vendor payout to the seller, and withholding local tax.',
    whyItMatters: 'Removes the manual burden of calculating seller cuts, handling escrow conditions, and making individual bank transfers across multiple countries.',
    coreRails: ['Paystack Bulk Transfers', 'Shopify Admin API', 'WooCommerce', 'Mono Virtual NUBAN'],
    targetUserTypes: ['marketplace_operator', 'treasury_admin'],
    keyFeatures: [
      'Subaccount automated split settlement with custom take-rate rules',
      'Multi-rail escrow holding with milestone release triggers',
      'Mass bulk payouts to mobile money and bank accounts in seconds',
      'Automated vendor 1099/W-8BEN and withholding tax ledgers'
    ],
    defaultConfig: {
      payoutFrequency: 'DAILY_BATCH',
      feeCutPct: 2.5,
      supportedRegions: ['West Africa', 'East Africa', 'Southern Africa']
    },
    sampleMetrics: [
      { label: 'Active Sellers', value: '1,280 Vendors', change: '+34 this week' },
      { label: '30D Disbursed', value: '$524,000.00', change: '99.8% Success' },
      { label: 'Avg Payout Speed', value: '2.4 Seconds', change: 'Direct to MoMo' }
    ]
  },
  {
    id: 'insurance-distribution',
    number: '03',
    title: 'Global Insurance Distribution & Claims Payment Orchestrator',
    tagline: 'Embedded micro-insurance at checkout with instant automated claims payout',
    category: 'InsurTech & Protection',
    icon: ShieldAlert,
    accentColor: 'border-sky-400/80 bg-sky-400/10 text-sky-300',
    badgeBg: 'bg-sky-400/20 text-sky-300',
    simpleExplanation: 'Lets businesses offer protection (like transit insurance or product warranties) at checkout. If something goes wrong, claims are verified automatically and paid out in seconds.',
    whyItMatters: 'Replaces weeks of paper claim forms with automated, parameterized adjudication backed by London and Curacel reinsurance syndicates.',
    coreRails: ['Paystack Charges & Transfers', 'Curacel Grow Underwriting', 'Mono Identity KYC'],
    targetUserTypes: ['insurer_admin', 'sme_owner'],
    keyFeatures: [
      'One-click embedded micro-premium collection at e-commerce checkout',
      'Algorithmic claims adjudication for sub-$500 incident claims',
      'Instant direct disbursement to claimant mobile money or bank',
      'Full reinsurance treaty ledger and loss-ratio analytics'
    ],
    defaultConfig: {
      autoAdjudicateLimit: 500,
      payoutRail: 'Paystack Mobile Money & Bank Direct',
      premiumRatePct: 3.5
    },
    sampleMetrics: [
      { label: 'Active Policies', value: '4,890 Underwritten', change: '+22.5% MoM' },
      { label: 'Loss Ratio', value: '18.4%', change: 'Target < 30%' },
      { label: 'Instant Claims Time', value: '< 10 Seconds', change: 'Zero Paperwork' }
    ]
  },
  {
    id: 'micro-investment',
    number: '04',
    title: 'Global Investment & Savings Product Orchestrator',
    tagline: 'Micro-Investment Router with spare-change roundups and automated DCA',
    category: 'WealthTech & Savings',
    icon: TrendingUp,
    accentColor: 'border-purple-400/80 bg-purple-400/10 text-purple-300',
    badgeBg: 'bg-purple-400/20 text-purple-300',
    simpleExplanation: 'Rounds up daily card or bank transactions and routes the spare change into yield-bearing Treasury Bills, local mutual funds, or digital assets according to risk preferences.',
    whyItMatters: 'Democratizes wealth creation by enabling fractional investing and automated dollar-cost averaging for everyday African consumers and businesses.',
    coreRails: ['Paystack Subscriptions', 'Mono Direct Debit', 'CoinGecko', 'Exchangerate.host'],
    targetUserTypes: ['investment_advisor', 'sme_owner'],
    keyFeatures: [
      'Automated transaction roundup engine (1x, 2x, 5x spare change multipliers)',
      'Smart router into high-yield sovereign T-Bills, global equities, and assets',
      'Dynamic risk rebalancing based on client investment horizon',
      'Daily NAV calculations synced with licensed custodian ledgers'
    ],
    defaultConfig: {
      defaultSavingsFrequency: 'WEEKLY',
      riskTier: 'MODERATE',
      targetAssetClasses: 'Treasury Bills, Pan-African ETFs'
    },
    sampleMetrics: [
      { label: 'AUM Under Router', value: '$2,140,000.00', change: '+38% YTD' },
      { label: 'Avg Client Yield', value: '18.2% APY', change: 'T-Bill Weighted' },
      { label: 'Daily Roundups', value: '14,200 Trans.', change: 'Automated' }
    ]
  },
  {
    id: 'digital-treasury',
    number: '05',
    title: 'Global Treasury & Cash Management for Digital Businesses',
    tagline: 'Multi-PSP liquidity consolidation, intelligent routing, and payroll automation',
    category: 'Corporate Cash Management',
    icon: Cpu,
    accentColor: 'border-cyan-400/80 bg-cyan-400/10 text-cyan-300',
    badgeBg: 'bg-cyan-400/20 text-cyan-300',
    simpleExplanation: 'Combines all your payment gateways (Paystack, Stripe) and corporate bank accounts into one master treasury. Automatically picks the cheapest and fastest rail for every transaction.',
    whyItMatters: 'Cuts transaction fees by up to 45% and ensures finance teams have single-pane-of-glass visibility across all legal entities and regional subsidiaries.',
    coreRails: ['Paystack', 'Stripe', 'Ecobank RTGS', 'Mono', 'QuickBooks/Xero API'],
    targetUserTypes: ['treasury_admin', 'sme_owner'],
    keyFeatures: [
      'Intelligent Least-Cost Routing (LCR) engine for cards vs mobile money vs ACH',
      'Automated end-of-day cash sweep into high-yield master operating accounts',
      'Single-click automated payroll and vendor disbursement batches',
      '30-day predictive cash-flow forecasting with shortfall alerting'
    ],
    defaultConfig: {
      baseCurrency: 'USD',
      primaryRail: 'Paystack Mobile Money & Bank Direct',
      sweepTimeUtc: '23:00'
    },
    sampleMetrics: [
      { label: 'Cash Consolidated', value: '$890,400.00', change: 'Across 12 Accounts' },
      { label: 'Fee Reduction', value: '42.8% Saved', change: 'Vs Unoptimized' },
      { label: 'Burn Horizon', value: '18.4 Months', change: 'Healthy Runway' }
    ]
  },
  {
    id: 'distributed-payroll',
    number: '06',
    title: 'Global Remittance & Payroll for Distributed Workforces',
    tagline: 'Cross-border contractor payroll, local FX netting, and tax compliance',
    category: 'Payroll & Remittances',
    icon: Users,
    accentColor: 'border-rose-400/80 bg-rose-400/10 text-rose-300',
    badgeBg: 'bg-rose-400/20 text-rose-300',
    simpleExplanation: 'Enables global companies to pay remote employees and contractors across Africa in local currency without intermediary bank delays or punishing currency markups.',
    whyItMatters: 'Guarantees on-time contractor compensation with direct mobile wallet receipt and automatic withholding tax compliance in each worker’s country.',
    coreRails: ['Paystack Bulk Transfers', 'Stitch Instant Pay', 'Mono Direct', 'Exchangerate.host'],
    targetUserTypes: ['payroll_admin', 'sme_owner'],
    keyFeatures: [
      'Disburse to local mobile wallets and bank accounts across 35+ countries in one batch',
      'Live FX corridor lock-in with zero hidden bank exchange margins',
      'Automated statutory tax deduction & local revenue authority compliance receipts',
      'Contractor digital portal with instant payment confirmation receipts'
    ],
    defaultConfig: {
      payoutCycle: 'MONTHLY_25TH',
      defaultPayoutRail: 'Direct Mobile Money & Instant Bank',
      primaryCorridors: ['Ghana', 'Nigeria', 'Kenya', 'South Africa']
    },
    sampleMetrics: [
      { label: 'Contractors Paid', value: '342 Engineers', change: '14 Countries' },
      { label: 'Settlement Speed', value: 'Under 15 Sec', change: 'Instant MoMo' },
      { label: 'FX Cost Avoided', value: '$18,400 / mo', change: 'Spread Elimination' }
    ]
  },
  {
    id: 'marketplace-lending',
    number: '07',
    title: 'Global Marketplace Lending & Revenue-Based Financing',
    tagline: 'Real-time GMV sales underwriting and daily split-settlement repayment',
    category: 'Alternative Lending',
    icon: BadgeDollarSign,
    accentColor: 'border-amber-500/80 bg-amber-500/10 text-amber-300',
    badgeBg: 'bg-amber-500/20 text-amber-300',
    simpleExplanation: 'Offers working-capital loans to e-commerce merchants based on their actual sales history. Repayment happens smoothly as a small percentage of daily sales, so merchants only pay back when they sell.',
    whyItMatters: 'Solves the working capital crisis for African e-commerce sellers who lack traditional physical collateral but have thriving digital sales.',
    coreRails: ['Shopify Orders API', 'WooCommerce', 'Paystack Split Settlement', 'Partner Lenders'],
    targetUserTypes: ['sme_owner', 'marketplace_operator'],
    keyFeatures: [
      'Algorithmic underwriting analyzing store order volume, refund rates, and repeat buyers',
      'Pre-approved capital advances from $5,000 to $250,000',
      'Seamless automated repayment via daily 10-20% split settlement deduction',
      'Multi-lender bidding consortium to ensure lowest cost of capital'
    ],
    defaultConfig: {
      preferredFinancingUsd: 35000,
      repaymentSplitPct: 15,
      maxAprPct: 14.5
    },
    sampleMetrics: [
      { label: 'Capital Originated', value: '$1,450,000.00', change: '48 Advances' },
      { label: 'Default Rate', value: '0.8%', change: 'Real-Time Splitting' },
      { label: 'Avg Turnaround', value: 'Under 4 Hours', change: 'Zero Paperwork' }
    ]
  },
  {
    id: 'clearing-settlement',
    number: '08',
    title: 'Global Clearing & Settlement for Digital Asset & Fiat Flows',
    tagline: 'Atomic delivery-versus-payment (DvP) bridging fiat banks and digital liquidity',
    category: 'Clearing & Settlements',
    icon: Layers,
    accentColor: 'border-indigo-400/80 bg-indigo-400/10 text-indigo-300',
    badgeBg: 'bg-indigo-400/20 text-indigo-300',
    simpleExplanation: 'Provides guaranteed instant settlement between fiat currencies (like USD, GHS, NGN) and digital assets, ensuring that currency exchange occurs without counterparty settlement risk.',
    whyItMatters: 'Enables high-volume institutions and digital businesses to settle cross-border obligations instantly using tamper-proof pricing oracles.',
    coreRails: ['CoinGecko Oracles', 'Exchangerate.host', 'Paystack Virtual Accounts', 'Stitch'],
    targetUserTypes: ['treasury_admin', 'investment_advisor'],
    keyFeatures: [
      'Atomic dual-leg DvP settlement eliminating delivery risk',
      'Real-time price feed oracles verified against CoinGecko and central bank rates',
      'Automated multi-currency netting windows with minimum collateral buffers',
      'Cryptographically signed audit receipts for regulatory inspection'
    ],
    defaultConfig: {
      settlementMode: 'ATOMIC_REALTIME',
      collateralBufferPct: 10,
      oracleProvider: 'COINGECKO_EXCHANGERATE'
    },
    sampleMetrics: [
      { label: 'Daily Cleared Volume', value: '$4,800,000.00', change: '+52% QoQ' },
      { label: 'Settlement Latency', value: 'Sub-Second', change: 'Deterministic' },
      { label: 'Counterparty Risk', value: 'Zero (DvP)', change: 'Escrowed' }
    ]
  },
  {
    id: 'benefits-insurance',
    number: '09',
    title: 'Global Benefits & Payroll-Linked Insurance Orchestrator',
    tagline: 'Group life, accident, and healthcare micro-deductions linked to payroll',
    category: 'Employee Benefits & InsurTech',
    icon: Award,
    accentColor: 'border-pink-400/80 bg-pink-400/10 text-pink-300',
    badgeBg: 'bg-pink-400/20 text-pink-300',
    simpleExplanation: 'Integrates group healthcare, transit accident insurance, and life coverage directly into worker payrolls, deducting small micro-premiums each pay cycle.',
    whyItMatters: 'Brings high-quality social safety nets to African employees and gig-economy workers without administrative overhead for HR.',
    coreRails: ['Paystack Dedicated Accounts', 'Curacel Underwriting', 'Mono Payroll API'],
    targetUserTypes: ['payroll_admin', 'insurer_admin'],
    keyFeatures: [
      'Automated payroll cycle micro-deductions with automatic net pay adjustments',
      'Digital insurance ID cards issued directly to employee smartphones',
      'Direct provider clinic billing and instant verification network',
      'Grace-period handling so policies remain active during employer payroll delays'
    ],
    defaultConfig: {
      payrollIntegration: 'Active Netting',
      deductionCycle: 'Monthly 25th',
      coverTypes: ['Group Life', 'Transit Accident', 'Telemedicine']
    },
    sampleMetrics: [
      { label: 'Workers Covered', value: '12,450 Staff', change: '85 Companies' },
      { label: 'Claims Satisfaction', value: '98.6%', change: 'Direct Clinic Pay' },
      { label: 'Monthly Premium Pooled', value: '$112,000.00', change: 'Continuous' }
    ]
  },
  {
    id: 'capital-markets',
    number: '10',
    title: 'Global Capital-Market Data & Execution Orchestrator',
    tagline: 'Real-time order routing, advisor client allocation, and omnibus custody',
    category: 'Capital Markets & Advisory',
    icon: LineChart,
    accentColor: 'border-teal-400/80 bg-teal-400/10 text-teal-300',
    badgeBg: 'bg-teal-400/20 text-teal-300',
    simpleExplanation: 'Provides investment advisors and retail brokerages with institutional data feeds, execution routing, and omnibus account management across African and global exchanges.',
    whyItMatters: 'Enables wealth managers to manage hundreds of client accounts with automated compliance checks and fractional order routing.',
    coreRails: ['Exchangerate.host', 'CoinGecko', 'Stitch Open Banking', 'Paystack Transfers'],
    targetUserTypes: ['investment_advisor', 'treasury_admin'],
    keyFeatures: [
      'Real-time market feeds for African Eurobonds, sovereign debt, and international equities',
      'Automated omnibus portfolio rebalancing across hundreds of sub-accounts',
      'Mandate compliance engine with risk threshold alerts',
      'Audited tax-lot reporting and white-label client statements'
    ],
    defaultConfig: {
      executionVenue: 'Direct Market Access',
      marketRefreshRateSec: 5,
      complianceRuleSet: 'Standard Wealth Mandate'
    },
    sampleMetrics: [
      { label: 'Advisory Portfolios', value: '380 Accounts', change: '$8.4M AUM' },
      { label: 'Execution Speed', value: '45 Milliseconds', change: 'Direct Rail' },
      { label: 'Mandate Violations', value: '0 Detected', change: 'Real-Time Rule Guard' }
    ]
  }
];
