export interface CountrySovereignInfo {
  name: string;
  code: string;
  flag?: string;
  rating: string;
  spreadPct: number; // e.g. 7.8%
  defaultAPR: number;
  region: string;
}

export interface AutoRouteResult {
  approved: boolean;
  score: number;
  scoreTier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  amount: number;
  requestedAmount: number;
  apr: string;
  source: string;
  tvl: string;
  fee: number;
  currency: string;
  note: string;
  warning?: string;
  disbursalChannel: string;
  decisionTimeMinutes: number;
}

// Sovereign Risk Spreads for top representative and 195 countries
export const SOVEREIGN_RATINGS_MAP: Record<string, { rating: string; spreadPct: number }> = {
  GH: { rating: 'B-', spreadPct: 7.8 },
  NG: { rating: 'B-', spreadPct: 8.1 },
  KE: { rating: 'B', spreadPct: 6.9 },
  ZA: { rating: 'BB-', spreadPct: 4.8 },
  EG: { rating: 'B-', spreadPct: 7.5 },
  US: { rating: 'AA+', spreadPct: 0.5 },
  GB: { rating: 'AA', spreadPct: 1.1 },
  DE: { rating: 'AAA', spreadPct: 0.2 },
  FR: { rating: 'AA', spreadPct: 0.9 },
  JP: { rating: 'A+', spreadPct: 0.4 },
  CN: { rating: 'A+', spreadPct: 1.2 },
  IN: { rating: 'BBB-', spreadPct: 3.2 },
  BR: { rating: 'BB', spreadPct: 4.5 },
  AE: { rating: 'AA', spreadPct: 1.0 },
  SA: { rating: 'A+', spreadPct: 1.4 },
  RW: { rating: 'B+', spreadPct: 5.5 },
  CI: { rating: 'BB-', spreadPct: 4.9 },
  SN: { rating: 'B+', spreadPct: 5.8 },
  TZ: { rating: 'B', spreadPct: 6.2 },
  UG: { rating: 'B+', spreadPct: 5.9 }
};

export const DEFAULT_SOVEREIGN_RATING = { rating: 'B', spreadPct: 6.5 };

export function getCountryRating(countryCode: string) {
  return SOVEREIGN_RATINGS_MAP[countryCode.toUpperCase()] || DEFAULT_SOVEREIGN_RATING;
}

// Core Auto-Routing Logic as specified in prompt
export function autoRouteOIL(
  countryCode: string,
  bankScore: number,
  amount: number,
  hasCollateral: boolean,
  collateralAssetValue: number = 0
): AutoRouteResult {
  const sovereign = getCountryRating(countryCode);
  const countryRisk = sovereign.spreadPct; // e.g. 7.8% for Ghana
  const baseRate = 6.5;

  // blendedAPR = countryRisk*0.4 + (1000-bankScore)/1000*0.6 + baseRate (~14% for Ghana Gold)
  const blendedAPR = (countryRisk * 0.4) + (((1000 - bankScore) / 1000) * 0.6 * 10) + baseRate;

  let routeTo = '';
  let tvl = '';
  let warning = '';
  let disbursalChannel = '';

  if (!hasCollateral && amount <= 15000) {
    routeTo = 'Kiva Field Partner - Predisbursed TODAY before Kiva funding';
    tvl = '$1.6B Kiva Open Community Pool';
    disbursalChannel = 'Direct Mobile Money (Yellow Card / MoMo API) or Local Bank Wire';
  } else if (!hasCollateral && amount > 15000) {
    routeTo = 'Syndicated Private Micro-Credit & Kiva Tier-2 Consortium';
    tvl = '$1.6B Kiva + $50M Regional Micro-Credit';
    warning = 'Uncollateralized credit capped at $15,000 for individual zero-dollar users. Enterprise bank authorization required for larger uncollateralized drawdowns.';
    disbursalChannel = 'Plaid Direct Wire / Corporate Bank Mandate';
  } else if (hasCollateral && amount <= 800) {
    routeTo = 'Aave Pool 80% LTV ($1,000 collateral deposit → $800 borrow)';
    tvl = '$30.46B Aave v3 Global Pool';
    warning = 'Net worth stays $1,000 not $1,980. Debt balance is $800.';
    disbursalChannel = 'Instant Smart Contract Transfer (USDT/USDC to MoMo or Bank)';
  } else if (hasCollateral && amount <= 930) {
    routeTo = 'Aave E-Mode 93% LTV ($1,000 collateral deposit → $930 borrow)';
    tvl = '$32M cap $21M per pool';
    warning = 'High LTV Alert: 93% max LTV with 95% liquidation threshold. Narrow volatility buffer.';
    disbursalChannel = 'Aave Flash/E-Mode Protocol Execution';
  } else if (amount >= 50000) {
    routeTo = 'Private Credit $1.8T + LendingClub $100B Institutional';
    tvl = '$1.8T Apollo/Morpho + $100B LendingClub';
    warning = 'AI cuts corporate loans from weeks to minutes, multinationals from months to weeks — Deutsche Bank benchmark.';
    disbursalChannel = 'Plaid Transfer API / Swift MT103 Corporate Clearing';
  } else {
    routeTo = 'Global Open Liquidity Syndicate (Aave + LendingClub Open Rail)';
    tvl = '$30.46B + $100B Open Pools';
    disbursalChannel = 'Automated Cross-Border Liquidity Bridge';
  }

  // 10% scoring fee
  const fee = amount * 0.10;

  // Approved amount scaled by bank score
  // If score is 520, approved = amount * 520/1000
  const normalizedApproved = Math.max(50, Math.round((amount * bankScore) / 1000));

  let scoreTier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond' = 'Bronze';
  if (bankScore >= 1000) scoreTier = 'Diamond';
  else if (bankScore >= 300) scoreTier = 'Gold';
  else if (bankScore >= 100) scoreTier = 'Silver';
  else scoreTier = 'Bronze';

  return {
    approved: true,
    score: bankScore,
    scoreTier,
    amount: normalizedApproved,
    requestedAmount: amount,
    apr: blendedAPR.toFixed(1),
    source: routeTo,
    tvl,
    fee,
    currency: 'USD',
    note: 'Net worth NOT double. $1000 deposit + $800 borrow = $1000 net worth.',
    warning: warning || undefined,
    disbursalChannel,
    decisionTimeMinutes: 14 // AI decisioning time
  };
}

export const SOURCES_OF_FUNDS_METRICS = [
  {
    name: 'Aave Protocol v3',
    headline: '$30.46B Supplied • $12.14B Borrowed',
    tvlBadge: '$14.4B Active TVL',
    description: 'Decentralized non-custodial liquidity market. $3T cumulative volume, $950B originated, 61.5% global DeFi lending market share. Pool caps: $32M supply / $21M borrow.',
    type: 'Decentralized Liquidity Pool',
    collateralType: 'Collateralized (80% - 93% LTV E-Mode)',
    link: 'https://aave.com'
  },
  {
    name: 'Kiva Open Capital Rail',
    headline: '$1.6B Cumulative • 96.9% Repayment',
    tvlBadge: '80 Countries Active',
    description: 'Global micro-credit network. Field Partners predisburse loans to borrowers TODAY before campaigns are finalized on Kiva. Zero borrower interest from lenders.',
    type: 'Predisbursed Field Partner Rail',
    collateralType: 'Uncollateralized / Zero Dollar MoMo',
    link: 'https://kiva.org'
  },
  {
    name: 'LendingClub Institutional',
    headline: '$100B Loan Volume • 5M Members',
    tvlBadge: 'Largest US Credit Engine',
    description: 'Peer-to-portfolio algorithmic credit platform. Automated consumer and small business lending with automated institutional loan syndication.',
    type: 'Algorithmic Credit Syndicate',
    collateralType: 'Credit History & Bank Cash Flow',
    link: 'https://lendingclub.com'
  },
  {
    name: 'Private Credit Pools',
    headline: '$1.8T Global AUM • Apollo & Morpho',
    tvlBadge: 'Institutional Bespoke Vaults',
    description: 'Direct institutional debt financing for middle-market and multi-million dollar corporate requirements. Apollo ($940B) and Morpho bespoke vaults.',
    type: 'Institutional Private Debt',
    collateralType: 'Balance Sheet & Corporate Cash Flow',
    link: '#'
  },
  {
    name: 'Plaid Open Banking Network',
    headline: '12,000 Institutions • 100M+ Users',
    tvlBadge: '20+ Global Corridors',
    description: 'Data-blind open banking infrastructure powering consent-driven bank transaction reading and automated account-to-account Transfer API clearing.',
    type: 'Open Banking Data Conduit',
    collateralType: 'Cash Flow Authentication',
    link: 'https://plaid.com'
  },
  {
    name: 'World Bank IDA Facility',
    headline: '$230.8B Commitment • Ghana $16.6B',
    tvlBadge: 'Sovereign Benchmark',
    description: 'Concessionary development finance and sovereign debt sustainability tracking benchmarked by World Bank CPIA metrics.',
    type: 'Multilateral Benchmark Rail',
    collateralType: 'Sovereign Debt Capacity',
    link: 'https://worldbank.org'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'One Bank Auth or MoMo',
    desc: 'Connect Mobile Money number (055/024) or authenticate your bank account via Plaid Link (12,000 institutions, secure OAuth, zero passwords shared).',
    badge: 'Zero Passwords Stored'
  },
  {
    step: '02',
    title: 'Data-Blind AI Credit Score',
    desc: 'Our AI analyzes transaction cadence, regular inflow velocity, and sovereign risk spread. Compresses traditional 9-day underwriting to 14 minutes.',
    badge: '14-Minute Decision'
  },
  {
    step: '03',
    title: 'Pay 10% Evaluation Fee',
    desc: 'Pay the mandatory 10% credit scoring and routing fee via Paystack (Ghana Cedis / MoMo) or Plaid Transfer. OIL is a scoring marketplace, not a lender.',
    badge: '10% Scoring Revenue'
  },
  {
    step: '04',
    title: 'Instant Open Pool Disbursal',
    desc: 'Funds auto-disburse from third-party pools (Kiva predisbursed, Aave, LendingClub, Private Credit) straight to your MoMo or bank account.',
    badge: 'Direct to MoMo / Bank'
  }
];
