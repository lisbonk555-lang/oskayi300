export interface TechnicalBenefit {
  title: string;
  description: string;
  metric: string;
}

export interface ApiProvider {
  name: string;
  category: string;
  protocol: string;
  liveEndpoint: string;
  realtimeRole: string;
  verificationStatus: string;
}

export interface AutomatedLoop {
  fetch: string;
  monitor: string;
  update: string;
}

export interface OperationalArchitecture {
  consensusOrValidation: string;
  custodyOrEscrow: string;
  settlementSpeed: string;
  regulatoryBacking: string;
}

export interface EngineItem {
  id: string;
  number: number;
  slug: string;
  tag: string;
  domain: string;
  field: string;
  marketSize: string;
  title: string;
  headline: string;
  summary: string;
  iconName: string;
  accentColor: string;
  badgeBg: string;
  badgeColor: string;
  technicalBenefits: TechnicalBenefit[];
  apiProviders: ApiProvider[];
  automatedLoop: AutomatedLoop;
  operationalArchitecture: OperationalArchitecture;
  defaultParams: Record<string, any>;
  paramDescriptions: { key: string; label: string; type: 'number' | 'text' | 'select'; options?: string[]; defaultVal: any }[];
  deepDiveArchitecture: string;
  impactQuote: string;
}

export const MULTI_TRILLION_ENGINES: EngineItem[] = [
  {
    id: 'engine1',
    number: 1,
    slug: 'sblc-syndication',
    tag: 'ENGINE 01',
    domain: 'SWIFT & SBLC Rails',
    field: 'SWIFT / SBLC (Standby Letters of Credit) Live Endpoints',
    marketSize: '$1.8 Trillion Annual Deficit',
    title: 'Autonomous Sovereign SBLC Syndication & SWIFT MT760 Router',
    headline: 'Multi-Bank Infrastructure Syndicator & Contractor Escrow',
    summary: 'Replaces 9-month manual investment banking syndications with automated 100-bank MT760 SBLC aggregation, automatically reserving a $1.155B escrow for certified EPC builders.',
    iconName: 'Building2',
    accentColor: 'border-amber-400',
    badgeBg: 'bg-amber-400/20',
    badgeColor: 'text-amber-300',
    impactQuote: 'By decomposing $1.5B sovereign credit facilities into 100 bilateral MT760 tranches, institutions eliminate single-bank balance sheet concentration while locking 77% directly into LiDAR-verified builder escrow.',
    deepDiveArchitecture: 'Integrates with SWIFT gpi via Bottomline Business Connect, converting incoming MT760 guarantees and MT799 pre-advice notifications into atomic smart escrow reserves. An independent FIDIC engineer inspection protocol verifies milestone completions before dispatching ISO 20022 pacs.008 wires.',
    technicalBenefits: [
      {
        title: 'Automated 100-Bank SBLC Tranche Aggregation',
        description: 'Orchestrates $15M credit tranches per participating tier-1 institution into a unified $1.5B sovereign syndicated loan without bilateral balance-sheet strain.',
        metric: '100 Banks Aggregated'
      },
      {
        title: 'Cryptographic 4-Milestone Contractor Escrow ($1.155B)',
        description: '77% of facility capital is locked in an irrevocable institutional escrow account disbursed strictly upon certified FIDIC engineer LiDAR signoffs.',
        metric: '$1.155B Locked'
      },
      {
        title: 'Comprehensive Insurance Wrap Structuring',
        description: 'Includes a pre-underwritten $1.155B project insurance wrap covering political risk, non-payment, and sovereign debt moratorium events.',
        metric: 'AAA-Equivalent Wrap'
      },
      {
        title: 'Tri-Jurisdictional SPV Capital Architecture',
        description: 'Combines Ghana IP operational holding, Mauritius Double Taxation Avoidance Treaty neutrality, and Dubai DIFC capital security under English Common Law.',
        metric: 'Zero Withholding Leakage'
      }
    ],
    apiProviders: [
      {
        name: 'Bottomline Business Connect',
        category: 'SWIFT & ISO 20022 Financial Messaging Gateway',
        protocol: 'MT760 (Guarantees) & MT799 (Pre-Advice)',
        liveEndpoint: 'https://api.bottomline.com/financial-messaging/swift-net/mt760/v2',
        realtimeRole: 'Executes automated issuance, authentication, and Swift gpi tracking of SBLC tranches.',
        verificationStatus: 'CERTIFIED ISO 20022'
      },
      {
        name: 'Finastra Fusion Fabric Syndications',
        category: 'Global Core Banking Syndication Engine',
        protocol: 'REST / Open Banking Webhooks',
        liveEndpoint: 'https://api.fusionfabric.cloud/corporate-lending/syndications/v1',
        realtimeRole: 'Distributes multi-bank participations, calculates facility interest spreads, and syncs borrower ledgers.',
        verificationStatus: 'ENTERPRISE PRODUCTION'
      },
      {
        name: 'Standard Chartered & Ecobank Interbank Settlement',
        category: 'Institutional Custodian & Escrow Agent',
        protocol: 'Host-to-Host (H2H) SFTP & REST API',
        liveEndpoint: 'https://api.sc.com/v1/corporate/escrow-disbursement',
        realtimeRole: 'Holds construction reserves and executes verified contractor milestone wires.',
        verificationStatus: 'REGULATED TIER-1 AGENT'
      }
    ],
    automatedLoop: {
      fetch: 'Polls incoming SWIFT MT760 guarantee messages and MT799 pre-advice notices across participating syndicate banks every 60 seconds.',
      monitor: 'Verifies cryptographic BIC signatures, calculates aggregated tranche amounts against the $1.5B threshold, and verifies FIDIC engineer milestones.',
      update: 'Automatically issues ISO 20022 pacs.008 disbursement instructions to contractor accounts and locks 77% construction reserves in irrevocable escrow.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'Dual Cryptographic Key Ceremony + Independent FIDIC LiDAR Audit',
      custodyOrEscrow: 'Segregated Institutional Bankruptcy-Remote Escrow Vault',
      settlementSpeed: 'Real-time Swift gpi tracking with <24h final settlement',
      regulatoryBacking: 'ROC Ghana Act 151, BoG Guidelines, and DIFC Regulatory Authority'
    },
    defaultParams: {
      facilityAmountUsd: 1500000000,
      participatingBanksCount: 100
    },
    paramDescriptions: [
      { key: 'facilityAmountUsd', label: 'Syndicated Facility Amount (USD)', type: 'number', defaultVal: 1500000000 },
      { key: 'participatingBanksCount', label: 'Participating Syndicate Banks Count', type: 'number', defaultVal: 100 }
    ]
  },
  {
    id: 'engine2',
    number: 2,
    slug: 'rwa-tokenized-grid',
    tag: 'ENGINE 02',
    domain: 'Real-World Asset (RWA)',
    field: 'Programmable Money & Real-World Asset (RWA) Securities',
    marketSize: '$16 Trillion Global RWA Market by 2030 (BCG / Citigroup)',
    title: 'Real-World Asset (RWA) Infrastructure Yield & Tokenized Grid',
    headline: 'Industrial Cashflow & Solar Micro-Grid Tokenization',
    summary: 'Wraps physical energy grids, pipelines, and telecom spines into digital securities with per-second automated cashflow streaming backed by 25-year sovereign PPAs.',
    iconName: 'Coins',
    accentColor: 'border-emerald-500',
    badgeBg: 'bg-emerald-500/20',
    badgeColor: 'text-emerald-400',
    impactQuote: 'Transforming illiquid 25-year sovereign power purchase agreements into fractionalized, compliant digital securities paying continuous per-second yield to international capital.',
    deepDiveArchitecture: 'Underwritten with permissioned ERC-3643 standards to ensure built-in KYC/AML whitelist enforcement. Real-time inverter generation data streams from SCADA IoT nodes via Chainlink Proof-of-Reserve into Superfluid smart payment streams.',
    technicalBenefits: [
      {
        title: 'Permissioned ERC-3643 Institutional Token Standard',
        description: 'Enforces automated on-chain compliance, investor whitelist KYC/AML, and jurisdictional transfer restrictions directly in smart contract bytecode.',
        metric: '100% Compliant Securities'
      },
      {
        title: 'Continuous Streaming Yield Vaults',
        description: 'Project off-taker revenue (e.g. solar kilowatt-hour tariffs) streams per second to token holders, eliminating 6-month bond coupon delays.',
        metric: 'Real-Time Streaming APY'
      },
      {
        title: 'Bankruptcy-Remote SPV Ring-Fencing',
        description: 'Legal title of underlying solar arrays, transformers, and land concessions is held by an independent trustee, immune from sponsor insolvency.',
        metric: 'Tier-1 Asset Insolvency Shield'
      },
      {
        title: 'Multi-Chain Liquidity & Fractionalization',
        description: 'Enables high-yield infrastructure investment starting from $100 units, opening institutional-grade 12-15% yields to global diaspora capital.',
        metric: '$100 Minimum Denomination'
      }
    ],
    apiProviders: [
      {
        name: 'Cloudflare Public Ethereum Gateway',
        category: 'Distributed Open RPC Blockchain Infrastructure',
        protocol: 'JSON-RPC 2.0 (eth_blockNumber, eth_call)',
        liveEndpoint: 'https://cloudflare-eth.com',
        realtimeRole: 'Verifies on-chain contract states, block timestamps, and state proof validity in real time.',
        verificationStatus: 'LIVE OPEN PROVER'
      },
      {
        name: 'Chainlink Decentralized Oracle Network',
        category: 'Off-Chain IoT & Financial Proof-of-Reserve',
        protocol: 'Chainlink Data Feeds & Proof of Reserve (PoR)',
        liveEndpoint: 'https://data.chain.link/feeds/ethereum/mainnet/por-reserves',
        realtimeRole: 'Streams certified solar inverter power output (kWh) from Scada IoT devices onto the smart contract ledger.',
        verificationStatus: 'DECENTRALIZED ORACLE'
      },
      {
        name: 'Superfluid Protocol Streaming Framework',
        category: 'Real-time Money Streaming Smart Contracts',
        protocol: 'Superfluid CFA (Constant Flow Agreement)',
        liveEndpoint: 'https://api.superfluid.finance/subgraphs/name/superfluid-root',
        realtimeRole: 'Splits monthly sovereign PPA payments into per-second continuous balance distributions.',
        verificationStatus: 'ON-CHAIN STREAMING'
      }
    ],
    automatedLoop: {
      fetch: 'Pulls smart meter inverter telemetry (kilowatt-hours generated) and proof-of-reserve balances continuously via public RPC and Chainlink nodes.',
      monitor: 'Compares power output against 25-year sovereign Power Purchase Agreement (PPA) take-or-pay tariff schedules.',
      update: 'Dispatches per-second streaming yield distributions directly into investor wallets via ERC-3643 smart contracts with GH₵0 gas overhead.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'EVM State Machine Proofs + IoT Smart Meter Oracles',
      custodyOrEscrow: 'Multi-Signature Qualified Digital Custodian (Fireblocks / Copper)',
      settlementSpeed: 'Sub-second Continuous Real-Time Streaming',
      regulatoryBacking: 'Mauritius FSC Regulatory Sandbox & Dubai VARA Securities Framework'
    },
    defaultParams: {
      assetValueUsd: 450000000,
      projectedAnnualYieldPct: 12.8
    },
    paramDescriptions: [
      { key: 'assetValueUsd', label: 'Underlying Asset Value (USD)', type: 'number', defaultVal: 450000000 },
      { key: 'projectedAnnualYieldPct', label: 'Projected Annual Yield (%)', type: 'number', defaultVal: 12.8 }
    ]
  },
  {
    id: 'engine3',
    number: 3,
    slug: 'parametric-climate-cargo',
    tag: 'ENGINE 03',
    domain: 'Parametric Insurance & Port Risk',
    field: 'Marine Port Risk, AIS Telemetry & Parametric Insurance',
    marketSize: '$2.5 Trillion Protection Gap',
    title: 'Parametric Climate & Maritime Cargo Risk Oracles',
    headline: 'Autonomous Zero-Paperwork Parametric Insurance',
    summary: 'Replaces 12-month claims adjusters with satellite radar and maritime AIS beacons, triggering automated smart contract escrow liquidity payouts in under 120 seconds.',
    iconName: 'ShieldAlert',
    accentColor: 'border-blue-500',
    badgeBg: 'bg-blue-500/20',
    badgeColor: 'text-blue-400',
    impactQuote: 'Eliminating manual loss adjusters and adversarial claims friction through satellite earth observation and AIS marine beacons, releasing liquidity to supply chains in <120 seconds.',
    deepDiveArchitecture: 'Monitors real-time European Space Agency Copernicus radar and MarineTraffic AIS feeds. Binary deterministic rules activate smart escrow releases via Curacel underwriting capacity directly into enterprise bank accounts.',
    technicalBenefits: [
      {
        title: 'Deterministic Binary Trigger Conditions',
        description: 'Payouts activate mathematically when verifiable external data thresholds are crossed (e.g. rainfall >85mm in 24h or port queue delays >72h).',
        metric: 'Zero Human Loss Adjuster'
      },
      {
        title: 'Instant Under-120-Second Liquidity Payout',
        description: 'Claims are disbursed automatically from pre-funded capital vaults directly to the insured enterprise wallet or bank IBAN in under two minutes.',
        metric: '< 120 Seconds Payout'
      },
      {
        title: 'Direct Satellite Earth Observation Feeds',
        description: 'Pulls synthetic aperture radar data from European Space Agency (ESA) Copernicus Sentinel satellites, preventing claims manipulation.',
        metric: '10m Spatial Resolution'
      },
      {
        title: '65% Operational Cost Reduction',
        description: 'Eliminating manual claims inspectors, paperwork filings, and adversarial legal arbitrations drastically lowers policy premiums.',
        metric: '0.85% Ultra-Low Premium'
      }
    ],
    apiProviders: [
      {
        name: 'Copernicus Earth Observation (ESA)',
        category: 'Earth Observation & Satellite Synthetic Aperture Radar',
        protocol: 'Copernicus Data Space Ecosystem REST API',
        liveEndpoint: 'https://dataspace.copernicus.eu/api/v1/radar/hydro',
        realtimeRole: 'Supplies real-time precipitation, drought indices, and flood inundation vectors.',
        verificationStatus: 'SOVEREIGN SCIENTIFIC'
      },
      {
        name: 'MarineTraffic & AIS Satellite Tracking',
        category: 'Global Maritime & Port Telemetry',
        protocol: 'AIS Open Ship Position Feed',
        liveEndpoint: 'https://services.marinetraffic.com/api/exportvessels/v:8',
        realtimeRole: 'Monitors container vessels, canal transit times, and port berthing delays along African trade lanes.',
        verificationStatus: 'GLOBAL SATELLITE'
      },
      {
        name: 'Curacel Grow Underwriting Consortium',
        category: 'Pan-African Embedded Insurance Engine',
        protocol: 'Curacel Underwriting & Claims API',
        liveEndpoint: 'https://api.curacel.co/v2/grow/parametric/quote',
        realtimeRole: 'Underwrites risk capacity with Lloyd’s and Munich Re reinsurance consortiums.',
        verificationStatus: 'LICENSED UNDERWRITER'
      }
    ],
    automatedLoop: {
      fetch: 'Continuously ingests satellite radar rainfall vectors, flood indices, and AIS vessel coordinates at Tema, Takoradi, and Mombasa deepwater berths.',
      monitor: 'Evaluates binary deterministic triggers: e.g., precipitation > 85mm/24h or vessel berth dwell times > 72 hours.',
      update: 'Bypasses manual claims adjusters; executes instant payout disbursements (<120 seconds) from pre-funded collateral vaults via Paystack and local bank ACH.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'Multi-Oracle Medianizer (Copernicus + NOAA + AIS Beacons)',
      custodyOrEscrow: 'Smart Contract Collateralized Vault with Reinsurance Backstop',
      settlementSpeed: 'Under 120 seconds upon verified threshold breach',
      regulatoryBacking: 'National Insurance Commission (NIC) Ghana Act 1061 & African Reinsurance'
    },
    defaultParams: {
      insuredVolumeUsd: 12500000,
      perilType: 'Port Bottleneck & Extreme Flash Flood'
    },
    paramDescriptions: [
      { key: 'insuredVolumeUsd', label: 'Insured Cargo Volume (USD)', type: 'number', defaultVal: 12500000 },
      { key: 'perilType', label: 'Peril Trigger Condition', type: 'select', options: ['Port Bottleneck & Extreme Flash Flood', 'AIS Maritime Berth Delay > 72h', 'Drought Agricultural Soil Index Breach'], defaultVal: 'Port Bottleneck & Extreme Flash Flood' }
    ]
  },
  {
    id: 'engine4',
    number: 4,
    slug: 'zero-gas-eip4337',
    tag: 'ENGINE 04',
    domain: 'Programmable Money & EIP-4337',
    field: 'Programmable Money (ERC-4337 Account Abstraction & AfCFTA Rails)',
    marketSize: '$1.2 Trillion Intra-African Trade Flows',
    title: 'Zero-Gas Pan-African Interoperability & EIP-4337 Rails',
    headline: 'Account-Abstraction Mobile Money & AfCFTA Native Rails',
    summary: 'ERC-4337 Account Abstraction paymaster bridging GHS, KES, NGN, and mobile money networks with GH₵0 in native blockchain gas tokens required from customers.',
    iconName: 'Zap',
    accentColor: 'border-purple-500',
    badgeBg: 'bg-purple-500/20',
    badgeColor: 'text-purple-300',
    impactQuote: 'Removing the final onboarding friction of Web3 payments: customers transact with local currencies without ever needing ETH or crypto gas tokens, clearing in 4.8 seconds across Africa.',
    deepDiveArchitecture: 'Bundler mempools parse UserOperations, verify sanctions compliance, and route settlements directly across PAPSS and mobile money rails (MTN MoMo, M-Pesa). The paymaster contract sponsors all network gas transparently.',
    technicalBenefits: [
      {
        title: 'ERC-4337 Sponsored Transactions (Zero-Gas)',
        description: 'Customers hold GH₵0 in native ETH or crypto gas tokens. Independent paymaster contracts sponsor on-chain execution transparently.',
        metric: 'GH₵0 Customer Gas'
      },
      {
        title: 'AfCFTA Local-to-Local Currency Netting',
        description: 'Settles transactions directly between African currencies (e.g. GHS to KES) without routing through intermediary USD or EUR correspondent banks.',
        metric: 'Saves 5.5% Conversion Loss'
      },
      {
        title: 'Direct Telco Mobile Money Interoperability',
        description: 'Instant bilateral clearing between MTN MoMo, Airtel Money, Safaricom M-Pesa, Telebirr, and commercial bank ACH networks.',
        metric: '4.8s Settlement Velocity'
      },
      {
        title: 'Automated Sanctions & AML Screening',
        description: 'Every transaction is screened against real-time OFAC, UN, and regional African sanctions databases prior to paymaster authorization.',
        metric: '100% Real-Time AML Check'
      }
    ],
    apiProviders: [
      {
        name: 'Frankfurter European Central Bank Open FX',
        category: 'Real-Time Interbank Currency Exchange Feed',
        protocol: 'Frankfurter Open API (ECB Reference Data)',
        liveEndpoint: 'https://api.frankfurter.app/latest?from=USD',
        realtimeRole: 'Provides unmanipulated, open central bank reference exchange rates for international pricing.',
        verificationStatus: 'OPEN PUBLIC ORACLE'
      },
      {
        name: 'PAPSS (Pan-African Payment & Settlement System)',
        category: 'African Union & Afreximbank Central Rail',
        protocol: 'ISO 20022 Cross-Border Clearing API',
        liveEndpoint: 'https://api.papss.com/v1/clearing/instant-netting',
        realtimeRole: 'Enables instant cross-border multilateral local currency netting under AfCFTA treaties.',
        verificationStatus: 'CONTINENTAL SOVEREIGN'
      },
      {
        name: 'ERC-4337 Decentralized Paymaster Infrastructure',
        category: 'Smart Contract Account Abstraction Rail',
        protocol: 'ERC-4337 UserOperation JSON-RPC',
        liveEndpoint: 'https://bundler.oskayiconsult.com/rpc/v1/paymaster',
        realtimeRole: 'Validates policy constraints and injects paymasterAndData signatures to sponsor blockchain gas fees.',
        verificationStatus: 'ZERO-GAS RAIL'
      }
    ],
    automatedLoop: {
      fetch: 'Ingests user transaction operations and checks bilateral African currency exchange rates (GHS/KES/NGN).',
      monitor: 'Screens transactions against automated AML/OFAC sanctions lists; verifies sponsor contract balance and gas allowance rules.',
      update: 'Paymaster contract signs and injects gas sponsorship, settling transfers in under 5 seconds across MTN MoMo, M-Pesa, and PAPSS without end users holding native crypto gas.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'ERC-4337 Bundler Mempool Validation + PAPSS Central Bank Clearing',
      custodyOrEscrow: 'Self-Custodial Smart Contract Wallet + Regulated Bank Trust Account',
      settlementSpeed: 'Under 5 seconds point-to-point',
      regulatoryBacking: 'Bank of Ghana FinTech Sandbox, AfCFTA Financial Protocol'
    },
    defaultParams: {
      amountGhs: 50000,
      targetCurrency: 'KES'
    },
    paramDescriptions: [
      { key: 'amountGhs', label: 'Amount (GHS)', type: 'number', defaultVal: 50000 },
      { key: 'targetCurrency', label: 'Target Destination Currency', type: 'select', options: ['KES', 'NGN', 'ZAR', 'USD'], defaultVal: 'KES' }
    ]
  },
  {
    id: 'engine5',
    number: 5,
    slug: 'open-banking-working-capital',
    tag: 'ENGINE 05',
    domain: 'Open Banking',
    field: 'Open Banking (Account Aggregation, Balances & Real-Time Statements)',
    marketSize: '$3.4 Trillion Global SME Deficit',
    title: 'Open Banking Sovereign SME Working Capital Router',
    headline: 'Autonomous Aggregation Across Mono, Okra, Stitch & Paystack',
    summary: 'Normalizes multi-bank transactions into a single corporate ledger, monitoring cash-burn velocity to trigger automated working-capital top-ups via Paystack rails.',
    iconName: 'Activity',
    accentColor: 'border-cyan-500',
    badgeBg: 'bg-cyan-500/20',
    badgeColor: 'text-cyan-300',
    impactQuote: 'SMEs no longer suffer liquidity crunches waiting 60 days for bank loans. Our algorithm forecasts payroll gaps 14 days ahead and triggers zero-touch working capital via Paystack bulk disbursements.',
    deepDiveArchitecture: 'Connects to Mono, Okra, and Stitch open banking gateways to continuously evaluate operating account velocities. Standardized credit packs are syndicated to partner balance-sheet lenders, and repayments are micro-deducted from daily Paystack card settlements.',
    technicalBenefits: [
      {
        title: 'Unified Multi-Banking Telemetry',
        description: 'Aggregates bank balances, transaction histories, and statements across Nigeria, Ghana, Kenya, and South Africa via Open Banking OAuth.',
        metric: '4-Rail Aggregation'
      },
      {
        title: 'Predictive Cashflow Shortfall Detector',
        description: 'Calculates 30-day cash burn and upcoming payroll/supplier liabilities to predict shortfalls 14 days before liquidity strains occur.',
        metric: '14-Day Advance Alert'
      },
      {
        title: 'Plug-and-Play Lender Syndicate Protocol',
        description: 'Standardized cash-flow credit packs are automatically broadcast to partner balance-sheet lenders for instant automated underwriting.',
        metric: 'Zero Manual Underwriting'
      },
      {
        title: 'Paystack Automated Debt Sweeper',
        description: 'Repayments are deducted on a micro-basis from daily incoming Paystack merchant payouts without manual wire reconciliation.',
        metric: 'Micro-Split Repayment'
      }
    ],
    apiProviders: [
      {
        name: 'Mono Open Banking',
        category: 'Account & Transaction Open Banking API',
        protocol: 'REST JSON / OAuth 2.0',
        liveEndpoint: 'https://api.withmono.com/v1/accounts',
        realtimeRole: 'Syncs accounts, balances, and real-time bank statements from GTBank, Ecobank, Zenith.',
        verificationStatus: 'REGULATED OPEN BANKING'
      },
      {
        name: 'Okra Real-Time Telemetry',
        category: 'Financial Data & Account Aggregation API',
        protocol: 'REST v2 / Webhook Callbacks',
        liveEndpoint: 'https://api.okra.co/v2/balance/check',
        realtimeRole: 'Monitors real-time account balances and verifies corporate KYC records.',
        verificationStatus: 'ENTERPRISE PRODUCTION'
      },
      {
        name: 'Paystack Core African Rail',
        category: 'Payment Processor & Transfer Mesh',
        protocol: 'REST / Transfers & Bulk Settlement',
        liveEndpoint: 'https://api.paystack.co/transfer/bulk',
        realtimeRole: 'Disburses instant working capital loans and executes automatic repayment sweeps.',
        verificationStatus: 'LIVE PUBLIC CONNECTOR'
      }
    ],
    automatedLoop: {
      fetch: 'Ingests open banking webhooks every 60 minutes across all linked commercial bank accounts (GTBank, Ecobank, Zenith, Stanbic).',
      monitor: 'Runs cashflow burn-rate predictive models; flags liquidity shortfalls 14 days before payroll or supplier maturities occur.',
      update: 'Automatically prepares a standardized credit pack, issues instant working capital drawdowns via Paystack bulk rails, and schedules micro-split repayments from incoming settlements.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'Bank Statement Hash Verification + Automated KYC Cross-Check',
      custodyOrEscrow: 'Lender Trust Account with Automated Payout Authorization',
      settlementSpeed: 'Instant disbursement in <15 seconds via Paystack',
      regulatoryBacking: 'Open Banking Nigeria Standards & Bank of Ghana Open API Guidelines'
    },
    defaultParams: {
      monthlyVolumeGhs: 350000
    },
    paramDescriptions: [
      { key: 'monthlyVolumeGhs', label: 'SME Monthly Aggregate Volume (GHS)', type: 'number', defaultVal: 350000 }
    ]
  },
  {
    id: 'engine6',
    number: 6,
    slug: 'global-debt-sovereign-arbitrage',
    tag: 'ENGINE 06',
    domain: 'Global Debt & Sovereign Yield',
    field: 'Global Debt & Sovereign Yield Spreads',
    marketSize: '$100 Trillion Global Debt Market',
    title: 'Global Debt & Sovereign Yield Curve Arbitrage Engine',
    headline: 'Cross-Border Treasury Arbitrage Across Eurobonds & T-Bills',
    summary: 'Continuously monitors sovereign yield curves and macroeconomic debt indices to identify yield divergence and trigger automated portfolio rebalancing via SWIFT.',
    iconName: 'TrendingUp',
    accentColor: 'border-yellow-400',
    badgeBg: 'bg-yellow-400/20',
    badgeColor: 'text-yellow-300',
    impactQuote: 'Harnessing the $100T sovereign debt ocean: automated oracles capture basis point spreads between emerging market Eurobonds and G10 benchmarks with zero-latency ISO 20022 trade execution.',
    deepDiveArchitecture: 'Pulls external debt data from the World Bank API and benchmark rates from the St. Louis Fed FRED API. When sovereign spreads diverge beyond 250 basis points, automated ISO 20022 camt.053 tickets route rebalancing orders through custodian desks.',
    technicalBenefits: [
      {
        title: 'Multi-Sovereign Debt Index Telemetry',
        description: 'Pulls external debt stocks, maturity schedules, and bond yields from the World Bank, Federal Reserve FRED, and central banks.',
        metric: '100% Macro Public Data'
      },
      {
        title: 'Real-Time Yield Spread Divergence Detector',
        description: 'Identifies basis point divergences across African sovereign debt (Ghana, Kenya, Nigeria) versus benchmark US Treasuries.',
        metric: '>250 bps Trigger Threshold'
      },
      {
        title: 'Automated Currency Hedging Integration',
        description: 'Combines cross-currency yield calculation with Non-Deliverable Forwards (NDFs) to lock in currency-hedged real returns.',
        metric: 'Zero Unhedged Exposure'
      },
      {
        title: 'SWIFT ISO 20022 Execution Dispatch',
        description: 'Generates compliant camt.053 and MT103 instructions to interbank desks for immediate portfolio allocation.',
        metric: 'Interbank Ready'
      }
    ],
    apiProviders: [
      {
        name: 'World Bank Open Data API',
        category: 'Multilateral Sovereign Debt & Financial Indicators',
        protocol: 'RESTful Public Open Data API',
        liveEndpoint: 'https://api.worldbank.org/v2/country/all/indicator/DT.DOD.DECT.CD?format=json',
        realtimeRole: 'Fetches sovereign debt-to-GDP ratios, external debt stocks, and debt service schedules.',
        verificationStatus: 'GLOBAL PUBLIC OPEN ENDPOINT'
      },
      {
        name: 'Federal Reserve Bank of St. Louis (FRED)',
        category: 'Macroeconomic & Interest Rate Benchmark API',
        protocol: 'FRED Economic Data REST API',
        liveEndpoint: 'https://api.stlouisfed.org/fred/series/observations?series_id=IR3TIB01GHA156N',
        realtimeRole: 'Streams 3-month interbank rates, US Treasury 10Y benchmarks, and inflation indices.',
        verificationStatus: 'OFFICIAL CENTRAL BANK DATA'
      },
      {
        name: 'U.S. Treasury Fiscal Data API',
        category: 'Government Debt & Daily Treasury Yield Curve',
        protocol: 'RESTful Open Endpoint',
        liveEndpoint: 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates',
        realtimeRole: 'Supplies official daily average interest rates on marketable sovereign debt.',
        verificationStatus: 'LIVE PUBLIC ENDPOINT'
      }
    ],
    automatedLoop: {
      fetch: 'Polls macroeconomic debt indicators, sovereign debt service schedules, and bond yield curves every 15 minutes.',
      monitor: 'Detects sovereign yield spread divergences exceeding 250 basis points between African Eurobonds (Ghana, Kenya, Nigeria) and US Treasuries.',
      update: 'Generates automated rebalancing instructions via SWIFT ISO 20022 camt.053 and dispatches trade execution tickets to institutional custodian desks.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'Central Bank Verified Rate Oracles + Bloomberg Index Fallback',
      custodyOrEscrow: 'Tier-1 International Custody (Euroclear / Clearstream)',
      settlementSpeed: 'T+1 for Sovereign Bonds / Real-Time for Money Market Funds',
      regulatoryBacking: 'SEC Regulated Broker-Dealer Framework & ISDA Master Agreements'
    },
    defaultParams: {
      sovereignIssuer: 'Ghana 2029 8.125% / Kenya 2031 7.25% Eurobonds'
    },
    paramDescriptions: [
      { key: 'sovereignIssuer', label: 'Sovereign Debt Issue / Basket', type: 'text', defaultVal: 'Ghana 2029 8.125% / Kenya 2031 7.25% Eurobonds' }
    ]
  },
  {
    id: 'engine7',
    number: 7,
    slug: 'global-liquidity-sweeper',
    tag: 'ENGINE 07',
    domain: 'Global Liquidity & Sweeping',
    field: 'Global Liquidity & Multi-Currency Treasury Management',
    marketSize: '$7.5 Trillion Daily FX Volume',
    title: 'Global Liquidity & Multi-Rail Automated Sweeper',
    headline: 'Intraday Cash Concentration & Stablecoin Yield Router',
    summary: 'Aggregates fragmented cash balances across bank accounts, crypto liquidity pools, and payment processors, auto-sweeping idle funds into higher-yielding base accounts.',
    iconName: 'RefreshCw',
    accentColor: 'border-indigo-400',
    badgeBg: 'bg-indigo-400/20',
    badgeColor: 'text-indigo-300',
    impactQuote: 'Eliminating dead corporate capital across fragmented multi-currency subsidiaries: automated sweeps consolidate cash into 5.15% T-bill vaults before foreign exchange depreciation strikes.',
    deepDiveArchitecture: 'Monitors real-time interbank FX rates via Exchangerate.host and institutional stablecoin depth via CoinGecko/Kraken. Programmatic sweep triggers execute atomic transfers via Paystack, Circle, and SWIFT.',
    technicalBenefits: [
      {
        title: 'Sub-Second Global Liquidity Depth Monitoring',
        description: 'Monitors order book depth and exchange rates across major fiat pairs (USD, EUR, GHS, KES, NGN) and institutional stablecoins (USDT, USDC).',
        metric: 'Sub-Second Feed'
      },
      {
        title: 'Threshold-Based Auto-Sweep Execution',
        description: 'Automatically sweeps balances exceeding pre-configured thresholds into a designated primary base currency to eliminate idle capital.',
        metric: 'Zero Idle Balances'
      },
      {
        title: 'Smart Slippage & FX Route Optimization',
        description: 'Calculates optimal routing between direct bank FX, PAPSS multilateral clearing, and crypto rails to minimize conversion drag.',
        metric: 'Saves 2.8% FX Drag'
      },
      {
        title: 'Real-Time Normalized Treasury Ledger',
        description: 'Maintains an immutable unified ledger of all multi-currency inflows, outflows, and net positions accessible via API.',
        metric: 'Single Source of Truth'
      }
    ],
    apiProviders: [
      {
        name: 'Exchangerate.host Open FX Feed',
        category: 'Real-Time & Historical Forex API',
        protocol: 'RESTful Public JSON API',
        liveEndpoint: 'https://api.exchangerate.host/latest?base=USD',
        realtimeRole: 'Supplies real-time interbank currency exchange rates across 170+ global currencies.',
        verificationStatus: 'LIVE PUBLIC FREE ENDPOINT'
      },
      {
        name: 'CoinGecko Institutional API',
        category: 'Cryptocurrency & Stablecoin Market Data',
        protocol: 'REST v3 Public Endpoints',
        liveEndpoint: 'https://api.coingecko.com/api/v3/simple/price?ids=tether,usd-coin&vs_currencies=usd,eur,gbp',
        realtimeRole: 'Monitors stablecoin peg stability, liquidity volume, and decentralized yield rates.',
        verificationStatus: 'LIVE PUBLIC ENDPOINT'
      },
      {
        name: 'Kraken Public Market Depth',
        category: 'Exchange Order Book & Liquidity API',
        protocol: 'REST Public Market Data',
        liveEndpoint: 'https://api.kraken.com/0/public/Depth?pair=USDTUSD',
        realtimeRole: 'Streams real-time market depth and liquidity spreads for zero-slippage rebalancing.',
        verificationStatus: 'LIVE OPEN ORDER BOOK'
      }
    ],
    automatedLoop: {
      fetch: 'Queries sub-second currency tick data and order book depth across fiat accounts, payment rails, and institutional stablecoins.',
      monitor: 'Checks balances against company auto-sweep rules (e.g., idle funds exceeding $50,000 across regional operating entities).',
      update: 'Programmatically sweeps excess balances into primary base currencies and high-yield overnight sovereign vaults, eliminating idle cash drag.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'Multi-Exchange Median Price Oracles with Slippage Caps',
      custodyOrEscrow: 'Multi-Party Computation (MPC) Treasury Vault (Fireblocks)',
      settlementSpeed: 'Instant (<3 seconds) via blockchain rails / Same-day via ACH',
      regulatoryBacking: 'FinCEN MSB Registration & Bank of Ghana Payment Systems Act'
    },
    defaultParams: {
      sweepThresholdUsd: 50000
    },
    paramDescriptions: [
      { key: 'sweepThresholdUsd', label: 'Idle Balance Auto-Sweep Threshold (USD)', type: 'number', defaultVal: 50000 }
    ]
  },
  {
    id: 'engine8',
    number: 8,
    slug: 'land-validation-cadastre',
    tag: 'ENGINE 08',
    domain: 'Land Validation & Cadastre',
    field: 'Land Validation & Cadastral Survey Verification',
    marketSize: '$14 Trillion Dead Capital in Emerging Markets',
    title: 'Cryptographic Land Validation & Cadastral Title Oracle',
    headline: 'Decentralized Cadastral Registry & Title Conflict Engine',
    summary: 'Solves the systemic African property dead-capital crisis by linking open geospatial cadastre APIs to cryptographic smart deeds, eliminating double-sale fraud.',
    iconName: 'MapPin',
    accentColor: 'border-rose-400',
    badgeBg: 'bg-rose-400/20',
    badgeColor: 'text-rose-300',
    impactQuote: 'Hernando de Soto identified $14 Trillion in dead capital locked in undocumented land across developing nations. Our oracle verifies survey polygons down to the centimeter and anchors deeds immutably to IPFS.',
    deepDiveArchitecture: 'Queries OpenStreetMap Overpass and OGC Feature services to retrieve survey coordinates. A spatial polygon intersection engine identifies overlapping claims and encumbrances before minting a Soulbound ERC-721 deed certificate.',
    technicalBenefits: [
      {
        title: 'Cadastral Polygon Coordinate Verification',
        description: 'Parses boundary coordinates from OpenStreetMap and national survey data to verify exact parcel boundaries down to centimeter precision.',
        metric: 'Centimeter Precision'
      },
      {
        title: 'Algorithmic Boundary Conflict Detection',
        description: 'Performs geometric intersection checks against all registered neighboring parcels to detect overlaps and fraudulent double allocations.',
        metric: 'Zero Double-Sale Risk'
      },
      {
        title: 'Statutory Encumbrance & Caveat Verification',
        description: 'Cross-checks land records against official gazettes, bank court mortgage registries, and protected forest reserves.',
        metric: '100% Lien Verification'
      },
      {
        title: 'Soulbound NFT Title Anchor (ERC-721)',
        description: 'Mints a non-transferable cryptographic title certificate hash anchored to IPFS, creating an immutable property identity.',
        metric: 'Tamper-Proof Title'
      }
    ],
    apiProviders: [
      {
        name: 'OpenStreetMap Overpass API',
        category: 'Open Geospatial & Cadastral Feature Engine',
        protocol: 'Overpass QL / REST JSON',
        liveEndpoint: 'https://overpass-api.de/api/interpreter?data=[out:json];way["cadastre"];out;',
        realtimeRole: 'Retrieves public land parcel boundary polygons, cadastral ways, and survey points.',
        verificationStatus: 'GLOBAL OPEN GEOSPATIAL ENDPOINT'
      },
      {
        name: 'OpenGeospatial OGC Features API',
        category: 'International Cadastral & GIS Standards',
        protocol: 'OGC API Features / GeoJSON',
        liveEndpoint: 'https://opengeospatial.github.io/ogcapi-features/',
        realtimeRole: 'Standardizes property coordinates across national datum projections and GPS standards.',
        verificationStatus: 'OPEN STANDARD CONSORTIUM'
      },
      {
        name: 'OpenAerialMap Satellite & Drone Imagery',
        category: 'Open High-Resolution Earth Observation',
        protocol: 'RESTful Imagery Metadata API',
        liveEndpoint: 'https://api.openaerialmap.org/meta?limit=10',
        realtimeRole: 'Supplies satellite imagery to verify ground conditions and structures on the parcel.',
        verificationStatus: 'LIVE PUBLIC IMAGERY ENDPOINT'
      }
    ],
    automatedLoop: {
      fetch: 'Queries cadastral polygon coordinates, boundary vertices, and spatial geometry from open GIS registries and survey maps.',
      monitor: 'Runs geometric intersection algorithms against neighboring parcels to identify overlaps, duplicate allocations, gazetted reserves, or liens.',
      update: 'Anchors verified title hashes to IPFS and issues a Soulbound cryptographic title deed (ERC-721 credential) for mortgage lending collateralization.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'Spatial Polygon Geometry Proofs + Digital Survey Stamp Verification',
      custodyOrEscrow: 'Immutable Decentralized Storage (IPFS) + Land Registry Integration',
      settlementSpeed: 'Instant verification in <2 seconds',
      regulatoryBacking: 'Lands Commission Ghana Land Act 2020 (Act 1036) Alignment'
    },
    defaultParams: {
      parcelNumber: 'GAR-ACC-09482-2026'
    },
    paramDescriptions: [
      { key: 'parcelNumber', label: 'Cadastral Parcel Identification Number', type: 'text', defaultVal: 'GAR-ACC-09482-2026' }
    ]
  },
  {
    id: 'engine9',
    number: 9,
    slug: 'land-valuation-spatial-yield',
    tag: 'ENGINE 09',
    domain: 'Land Valuation & Spatial AVM',
    field: 'Land Valuation Live Endpoints (Spatial Automated Valuation Models)',
    marketSize: '$326 Trillion Global Real Estate Asset Class',
    title: 'Automated Land Valuation & Spatial Yield Engine (AVM)',
    headline: 'Algorithmic Property Appraisal & Infrastructure Proximity AVM',
    summary: 'Uses elevation data, flood risk models, and spatial proximity to major infrastructure to calculate accurate, real-time market valuations for land collateral.',
    iconName: 'Scale',
    accentColor: 'border-orange-400',
    badgeBg: 'bg-orange-400/20',
    badgeColor: 'text-orange-300',
    impactQuote: 'Instant mathematical property appraisals: by indexing topographical slope, flood plain risks, and proximity to ports and airports, lenders update collateral limits in real-time.',
    deepDiveArchitecture: 'Ingests digital elevation models from OpenTopography USGS, population density indices from the World Bank, and spatial vectors from Nominatim. The algorithmic valuation model generates an instant appraisal certificate for mortgage syndicate ledgers.',
    technicalBenefits: [
      {
        title: 'Infrastructure Proximity Value Indexing',
        description: 'Calculates Euclidean and transit distances to ports, highways, airports, and power substations to compute location premium scores.',
        metric: 'Spatial Distance Model'
      },
      {
        title: 'Digital Elevation & Flood Inundation Modeling',
        description: 'Integrates USGS digital elevation models to assess topography slope, water drainage, and 100-year flood inundation risks.',
        metric: 'Hydrological Risk Scoring'
      },
      {
        title: 'Dynamic Commercial Rental Yield Forecasting',
        description: 'Combines local economic density with demographic growth indices to model projected 10-year rental cashflows.',
        metric: '10-Year Cashflow Model'
      },
      {
        title: 'Instant Collateral Re-Indexing for Banks',
        description: 'Enables commercial banks and mortgage lenders to update borrowing limits automatically as regional infrastructure expands.',
        metric: 'Real-Time LTV Updating'
      }
    ],
    apiProviders: [
      {
        name: 'OpenTopography USGS Elevation API',
        category: 'High-Resolution Digital Elevation & Terrain Data',
        protocol: 'RESTful Public API',
        liveEndpoint: 'https://portal.opentopography.org/API/usgsDem',
        realtimeRole: 'Retrieves terrain elevation points to analyze slope gradient and drainage viability.',
        verificationStatus: 'US SCIENTIFIC PUBLIC ENDPOINT'
      },
      {
        name: 'World Bank Population Density API',
        category: 'Urbanization & Economic Density Metrics',
        protocol: 'RESTful Open Data API',
        liveEndpoint: 'https://api.worldbank.org/v2/indicator/EN.POP.DNST?format=json',
        realtimeRole: 'Supplies population density and urbanization rate indicators for regional growth forecasting.',
        verificationStatus: 'LIVE PUBLIC OPEN ENDPOINT'
      },
      {
        name: 'Nominatim OpenStreetMap Geocoding API',
        category: 'Spatial Proximity & Point-of-Interest Search',
        protocol: 'RESTful Public Geocoding API',
        liveEndpoint: 'https://nominatim.openstreetmap.org/search?q=Airport+Accra&format=json',
        realtimeRole: 'Calculates distance vectors to major economic hubs, transport corridors, and commercial centres.',
        verificationStatus: 'LIVE PUBLIC OPEN ENDPOINT'
      }
    ],
    automatedLoop: {
      fetch: 'Ingests elevation, flood plain drainage risks, and transit distance vectors to ports, highways, and commercial hubs.',
      monitor: 'Feeds spatial parameters into automated regressive valuation models (AVM) to determine location premium scores and commercial yield projections.',
      update: 'Issues real-time collateral appraisal certificates and automatically re-indexes maximum loan-to-value (LTV) credit limits across institutional lending books.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'Regressive Machine Learning Valuation Models + Statistical Confidence Scores',
      custodyOrEscrow: 'Digital Appraisal Certificate with Cryptographic Integrity Hash',
      settlementSpeed: 'Instant calculation in <1.5 seconds',
      regulatoryBacking: 'Ghana Institution of Surveyors (GhIS) Standards & IVS Compliance'
    },
    defaultParams: {
      landAreaSqMeters: 4047
    },
    paramDescriptions: [
      { key: 'landAreaSqMeters', label: 'Land Parcel Surface Area (Square Meters)', type: 'number', defaultVal: 4047 }
    ]
  },
  {
    id: 'engine10',
    number: 10,
    slug: 'open-license-lei-kyb',
    tag: 'ENGINE 10',
    domain: 'Open License & Entity Identity',
    field: 'Open License & Regulatory Corporate Registry APIs',
    marketSize: '$4.5 Trillion Compliance & Trade Verification',
    title: 'Open License & Corporate Entity Identity Oracle (LEI / KYB)',
    headline: 'Global Corporate Verification & Regulatory License Registry',
    summary: 'Verifies corporate registration, legal entity identifiers (LEI), and business licenses in real-time across open international registries to eliminate trade fraud.',
    iconName: 'ShieldCheck',
    accentColor: 'border-teal-400',
    badgeBg: 'bg-teal-400/20',
    badgeColor: 'text-teal-300',
    impactQuote: 'Instant cross-border trust: our oracle verifies entity legal standing and beneficial ownership across 200M+ international companies, issuing verifiable credentials that unlock trade lines in seconds.',
    deepDiveArchitecture: 'Connects directly to the Global Legal Entity Identifier Foundation (GLEIF), OpenCorporates, and UK Companies House open endpoints. Evaluates corporate active standing, winding-up orders, and sanctions before minting a W3C Verifiable Corporate Credential.',
    technicalBenefits: [
      {
        title: 'GLEIF Global Legal Entity Identifier (LEI) Sync',
        description: 'Pulls verified legal existence, corporate structure, and ownership trees from the Global Legal Entity Identifier Foundation database.',
        metric: 'Global Standard'
      },
      {
        title: 'OpenCorporates Worldwide Registry Query',
        description: 'Searches across 200+ million corporate entities in 140+ jurisdictions to confirm legal standing and director appointments.',
        metric: '200M+ Companies Indexed'
      },
      {
        title: 'Continuous Regulatory Standing Auditing',
        description: 'Monitors corporate active/inactive status, winding-up orders, and statutory license renewals across registries.',
        metric: 'Continuous Monitoring'
      },
      {
        title: 'W3C Verifiable Corporate Credential Issuance',
        description: 'Issues cryptographic corporate identity credentials allowing businesses to onboard to international banks in minutes.',
        metric: 'Instant KYB Clearance'
      }
    ],
    apiProviders: [
      {
        name: 'GLEIF Global LEI Foundation Open API',
        category: 'International Corporate Identity & Legal Status',
        protocol: 'RESTful Public JSON API',
        liveEndpoint: 'https://api.gleif.org/api/v1/lei-records?filter[entity.legalName]=OSKAYI',
        realtimeRole: 'Verifies Level 1 (who is who) and Level 2 (who owns whom) corporate entity records.',
        verificationStatus: 'INTERNATIONAL PUBLIC STANDARD'
      },
      {
        name: 'OpenCorporates Public Search API',
        category: 'Open Worldwide Corporate Database',
        protocol: 'RESTful JSON API',
        liveEndpoint: 'https://api.opencorporates.com/v0.4/companies/search?q=FINTECH',
        realtimeRole: 'Accesses verified statutory registration numbers, incorporation dates, and registered addresses.',
        verificationStatus: 'WORLDWIDE OPEN REGISTRY'
      },
      {
        name: 'UK Companies House Public Data API',
        category: 'Official Government Corporate Registry',
        protocol: 'RESTful Public API',
        liveEndpoint: 'https://api.company-information.service.gov.uk/advanced-search/companies',
        realtimeRole: 'Cross-checks overseas parent companies, UK holding SPVs, and beneficial ownership structures.',
        verificationStatus: 'OFFICIAL GOVERNMENT OPEN API'
      }
    ],
    automatedLoop: {
      fetch: 'Ingests corporate registration status, registered address, director identity, and beneficial ownership structures across 200M+ corporate entities.',
      monitor: 'Performs continuous auditing for corporate good standing, revoked licenses, winding-up orders, and international sanctions hits.',
      update: 'Issues a cryptographic W3C Verifiable Corporate Credential, enabling businesses to unlock cross-border banking rails and multi-million-dollar lines of credit in minutes.'
    },
    operationalArchitecture: {
      consensusOrValidation: 'Cross-Registry Triangulation (GLEIF + National Registrars + Sanctions Lists)',
      custodyOrEscrow: 'Decentralized W3C Verifiable Credential Vault',
      settlementSpeed: 'Verification completed in <3 seconds',
      regulatoryBacking: 'Financial Action Task Force (FATF) Recommendation 16 & ISO 17442 LEI Standard'
    },
    defaultParams: {
      entityName: 'OSKAYI CONSULT'
    },
    paramDescriptions: [
      { key: 'entityName', label: 'Company / Legal Entity Name', type: 'text', defaultVal: 'OSKAYI CONSULT' }
    ]
  }
];
