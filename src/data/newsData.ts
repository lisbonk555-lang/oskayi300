export interface NewsArticle {
  id: string;
  hourIndex: number;
  title: string;
  slug: string;
  category: 'Infrastructure Financing' | 'Modern Fintech Solutions' | 'Global & African Growth' | 'Sovereign Markets & Yields';
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  summary: string;
  fullContent: {
    lead: string;
    sections: {
      heading: string;
      body: string;
    }[];
    marketImpact: string;
    keyTakeaways: string[];
    telemetry: { label: string; value: string; trend: string }[];
    sources: string[];
  };
  tags: string[];
  featured?: boolean;
}

// Hourly Article Generator Engine
// Produces 10 unique, high-caliber analytical articles per hour based on current hour seed
export function generateHourlyNewsArticles(): {
  articles: NewsArticle[];
  currentHourNumber: number;
  nextHourlyRefreshSeconds: number;
} {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDateStr = now.toISOString().split('T')[0];
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const nextHourlyRefreshSeconds = 3600 - (minutes * 60 + seconds);

  // Seed pool of 10 comprehensive institutional topics
  const TOPIC_TEMPLATES = [
    {
      category: 'Infrastructure Financing' as const,
      title: (h: number) => `Pan-African Port Expansion Syndication: Accelerating $1.85B Deepwater Logistics Across West & Central Corridors`,
      summary: `Consortium of regional commercial lenders and sovereign wealth funds close first tranche for automated container terminals at Tema and Lekki, reducing shipping dwell times by 44%.`,
      lead: `In a landmark acceleration of intra-African maritime trade under the AfCFTA framework, an international banking syndicate has finalized the first $650M drawdown of a $1.85B multi-port concession facility.`,
      sections: [
        {
          heading: `Multi-Tier Debt Architecture & Concessionary Wraps`,
          body: `The transaction leverages blended commercial debt paired with political risk guarantees, enabling project companies to access 18-year tenors at sub-7% interest margins. Deepwater berth automation will quadruple TEU throughput across the Gulf of Guinea corridor.`
        },
        {
          heading: `Cross-Border Customs Integration with Real-Time Port Telemetry`,
          body: `By interconnecting port terminal operating systems with central bank trade settlement engines, clearance velocity has improved from 11 days to under 36 hours, unlocking working capital for regional FMCG and agro-commodity exporters.`
        }
      ],
      marketImpact: `Reduces container demurrage expenses by an estimated $420M annually across coastal West African shipping routes.`,
      keyTakeaways: [
        `18-year concessionary loan tenors structured with multilateral credit wraps`,
        `Direct integration with national single-window customs APIs`,
        `Expected 4x throughput capacity expansion by Q4 2027`
      ],
      telemetry: [
        { label: 'Facility Size', value: '$1.85 Billion', trend: '+12% Over-Subscribed' },
        { label: 'Dwell Time Reduction', value: '-44.2%', trend: 'Target Met' },
        { label: 'Corridor TEU Cap', value: '3.4M TEU/yr', trend: 'Expanding' }
      ],
      sources: ['Afreximbank Project Finance Desk', 'West Africa Ports Association', 'Maritime Commercial Review'],
      tags: ['Ports & Logistics', 'Infrastructure Debt', 'AfCFTA', 'West Africa']
    },
    {
      category: 'Modern Fintech Solutions' as const,
      title: (h: number) => `Autonomous Treasury Systems: AfriTreasury OS Deploys Real-Time Sovereign Yield & FX Netting Across 14 African Corridors`,
      summary: `Institutional multi-rail engines combine Paystack settlement, direct open-banking APIs, and central bank telemetry to eliminate trapped local liquidity and high FX spreads.`,
      lead: `Corporate treasurers operating cross-border digital platforms across Ghana, Nigeria, Kenya, and South Africa are adopting autonomous algorithmic routers to compress payment clearing latencies and capture cross-currency sovereign yield differentials.`,
      sections: [
        {
          heading: `Programmatic Clearing & Sub-3-Second Sweep Architecture`,
          body: `Modern digital businesses encounter severe friction from fragmented banking rails. AfriTreasury OS aggregates live API feeds from central banks and open banking providers, executing atomic netting sweeps whenever operating balances exceed configurable risk limits.`
        },
        {
          heading: `Sovereign Yield Arbitrage & Yield-Bearing Smart Treasury Vaults`,
          body: `By routing surplus operating cash into high-yielding Treasury Bills (such as Ghana 91-day T-bills yielding over 25% APR) during off-peak settlement cycles, corporate finance teams generate non-dilutive treasury alpha while preserving instant liquidity.`
        }
      ],
      marketImpact: `Lowers enterprise FX conversion friction by 38% while automating compliance reporting with regional tax and central bank regulators.`,
      keyTakeaways: [
        `Real-time multi-rail aggregation across Paystack, Mono, Okra, and Stitch`,
        `Automated end-of-day liquidity auto-sweeping to base USD or local target accounts`,
        `Continuous yield optimization capturing local sovereign interest rate spreads`
      ],
      telemetry: [
        { label: 'Avg Sweep Latency', value: '2.1 Seconds', trend: 'Sub-3s Guaranteed' },
        { label: 'FX Margin Savings', value: '38.4%', trend: 'Spread Eliminated' },
        { label: 'Active Corridors', value: '14 Markets', trend: '+3 This Quarter' }
      ],
      sources: ['Global Treasury Management Journal', 'Central Bank Clearing Telemetry', 'Fintech Infrastructure Institute'],
      tags: ['Treasury OS', 'Open Banking', 'Paystack Rails', 'Yield Arbitrage']
    },
    {
      category: 'Infrastructure Financing' as const,
      title: (h: number) => `Renewable Grid Transition: $940M Structured Green Bond Facility Accelerates Commercial Solar & Battery Storage IPPs`,
      summary: `Clean industrial energy projects in Sub-Saharan manufacturing hubs achieve commercial bankability through local-currency power purchase guarantees and sovereign de-risking vehicles.`,
      lead: `A new sovereign-backed green credit vehicle has officially opened for syndication, offering senior debt to distributed solar-plus-storage independent power producers (IPPs) powering regional industrial parks.`,
      sections: [
        {
          heading: `Mitigating Foreign Exchange Mismatch for Clean Power IPPs`,
          body: `Historically, energy developers borrowed hard currency (USD/EUR) but earned revenues in local currencies (GHS/NGN/KES). The new facility utilizes local-currency dual tranche bonds backed by multilateral first-loss guarantees, eliminating balance sheet currency risk.`
        },
        {
          heading: `Decentralized Microgrids Powering Industrial Export Processing Zones`,
          body: `Over 48 industrial parks in Accra, Tema, Ikeja, and Nairobi will transition from expensive diesel gensets to 24/7 commercial microgrids, slashing industrial production costs by an average of 31%.`
        }
      ],
      marketImpact: `Expected to displace 1.8M metric tons of CO2 annually while adding 420MW of reliable baseload solar capacity to African production hubs.`,
      keyTakeaways: [
        `Dual-tranche local currency green bond structure`,
        `Multilateral credit enhancement providing 40% first-loss risk mitigation`,
        `Commercial tariffs indexed to regional inflation adjustments`
      ],
      telemetry: [
        { label: 'Facility Cap', value: '$940 Million', trend: 'Tranche A Active' },
        { label: 'Capacity Added', value: '420 MW', trend: 'Solar + Storage' },
        { label: 'Energy Cost Drop', value: '-31.5%', trend: 'For Manufacturers' }
      ],
      sources: ['African Development Bank Energy Bulletin', 'Climate Finance Facility', 'Sovereign Debt Registry'],
      tags: ['Green Energy', 'Solar IPP', 'Bonds', 'Industrial Growth']
    },
    {
      category: 'Modern Fintech Solutions' as const,
      title: (h: number) => `Account Abstraction (EIP-4337) & Zero-Gas Credit Checkout: Transforming Institutional Merchant Settlements`,
      summary: `Smart contract wallet infrastructure enables non-custodial enterprise payouts and gas-free consumer credit purchases underwritten by real-time transit insurance.`,
      lead: `The convergence of institutional smart contracts and consumer digital checkout has achieved a major milestone with the deployment of Zero-Gas credit sponsorship rails for merchants across emerging markets.`,
      sections: [
        {
          heading: `Paymaster Gas Sponsorship for Frictionless Onboarding`,
          body: `Using EIP-4337 paymaster smart accounts, enterprises sponsor gas fees on behalf of retail buyers and vendors, removing the barrier of holding native cryptocurrency tokens while preserving cryptographic security and instant finality.`
        },
        {
          heading: `Embedded Curacel Underwriting & Proof-of-Delivery Escrow`,
          body: `Every credit-sponsored transaction automatically embeds point-of-sale cargo and defect coverage, releasing funds from multi-signature escrow only upon verifiable mobile courier delivery confirmation.`
        }
      ],
      marketImpact: `Eliminates cart abandonment caused by crypto gas fees and merchant payment failure rates, driving digital checkout conversions up by 42%.`,
      keyTakeaways: [
        `Zero blockchain gas friction for end-users via institutional paymaster sponsorship`,
        `Automatic integration of Curacel Grow underwriting at point of order creation`,
        `Programmatic milestone escrows tied to verified courier APIs`
      ],
      telemetry: [
        { label: 'Cart Conversion', value: '+42.1%', trend: 'Post Deployment' },
        { label: 'Gas Cost To User', value: '$0.00', trend: 'Sponsor Subsidized' },
        { label: 'Settlement Time', value: 'Sub-10s', trend: 'Instant Escrow' }
      ],
      sources: ['Ethereum Enterprise Alliance', 'Fintech Security Standard', 'E-Commerce Trade Analytics'],
      tags: ['EIP-4337', 'Zero-Gas', 'Credit Checkout', 'Smart Contracts']
    },
    {
      category: 'Global & African Growth' as const,
      title: (h: number) => `AfCFTA Intra-Continental Trade Growth: Digital Settlement Systems Surge 68% in Cross-Border Clearing Volume`,
      summary: `PAPSS and commercial bank payment hubs interconnect 35 national payment switches, bypassing intermediary offshore correspondent banks for regional trade settlement.`,
      lead: `Trade data for the current fiscal cycle indicates an exponential surge in intra-African bilateral transactions cleared in domestic currencies without mandatory conversion into USD or EUR.`,
      sections: [
        {
          heading: `Bypassing US & European Correspondent Bank Bottlenecks`,
          body: `Prior to modern digital settlement integration, trade between neighboring African nations frequently routed through correspondent banks in New York or London, taking up to 5 business days and deducting 4-7% in intermediary fees. Direct local switch routing now settles in minutes.`
        },
        {
          heading: `SME Inclusion & Simplified Cross-Border Documentation`,
          body: `Cross-border logistics operators now settle regional duties, freight charges, and supplier disbursements directly in local currencies like GHS, NGN, KES, and ZAR through unified API gateways.`
        }
      ],
      marketImpact: `Saves an estimated $5 billion in annual offshore currency clearing costs across the 54 signatory AfCFTA member states.`,
      keyTakeaways: [
        `68% year-over-year increase in intra-African local currency digital clearing`,
        `Settlement latency compressed from 5 days to real-time gross settlement`,
        `Direct participation by over 120 commercial banks and pan-African payment switches`
      ],
      telemetry: [
        { label: 'Volume Surge', value: '+68.4% YoY', trend: 'Record High' },
        { label: 'Offshore Fee Saving', value: '$5.0B/yr', trend: 'Retained Locally' },
        { label: 'Connected Banks', value: '124 Entities', trend: 'Pan-African' }
      ],
      sources: ['AfCFTA Secretariat Policy Brief', 'Pan-African Payment Review', 'African Central Bank Forum'],
      tags: ['AfCFTA', 'Cross-Border Clearing', 'SME Growth', 'Economic Sovereignty']
    },
    {
      category: 'Sovereign Markets & Yields' as const,
      title: (h: number) => `African Eurobond Secondary Market Dynamics: Sovereign Yield Compression & Strategic Domestic Refinancing`,
      summary: `Institutional asset managers deploy algorithmic portfolio rebalancing across African sovereign debt as secondary market yields tighten amid debt restructuring successes.`,
      lead: `Sovereign debt markets in Sub-Saharan Africa are witnessing renewed institutional capital inflows as key benchmark Eurobonds experience secondary yield tightening following successful bilateral debt realignments.`,
      sections: [
        {
          heading: `Yield Normalization in Ghana, Zambia, and Kenya Sovereign Debt`,
          body: `Following completed external debt treatment and strict adherence to fiscal targets, Ghana sovereign Eurobonds have rallied, tightening spreads significantly against US Treasuries. Institutional liquidity managers are actively recalibrating portfolio allocations.`
        },
        {
          heading: `Domestic Debt Market Deepening & Primary Dealer Automation`,
          body: `Central banks are modernizing primary dealer auctions by providing open API connectivity for institutional asset managers, allowing algorithmic bidding and direct custodian settlement for short-term sovereign paper.`
        }
      ],
      marketImpact: `Lowers future sovereign refinancing costs while restoring foreign direct investment confidence in regional commercial banking systems.`,
      keyTakeaways: [
        `Secondary Eurobond spread compression of 240-380 bps across sovereign benchmarks`,
        `Automated institutional bidding interfaces for domestic Treasury auctions`,
        `Increased offshore institutional participation in local currency sovereign paper`
      ],
      telemetry: [
        { label: 'Spread Compression', value: '-310 bps', trend: 'Rally Sustained' },
        { label: 'Domestic Auction Bid', value: '2.4x Cover', trend: 'Strong Demand' },
        { label: 'Institutional Inflow', value: '+$1.2B QTD', trend: 'Capital Return' }
      ],
      sources: ['African Bond Markets Initiative', 'London Stock Exchange Emerging Debt', 'Central Bank Registrars'],
      tags: ['Sovereign Debt', 'Eurobonds', 'Yield Curve', 'Capital Markets']
    },
    {
      category: 'Modern Fintech Solutions' as const,
      title: (h: number) => `Algorithmic Revenue-Based Financing: Powering $320M in Working Capital Advances for Regional E-Commerce Sellers`,
      summary: `Automated underwriting models analyze real-time GMV, refund rates, and return metrics to disburse working capital advances with daily split-settlement repayments.`,
      lead: `E-commerce merchants on Shopify and WooCommerce across West and East Africa are obtaining credit lines in hours rather than months, powered by automated cash-flow telemetry from Paystack and marketplace APIs.`,
      sections: [
        {
          heading: `Real-Time Data Underwriting Over Collateral-Based Lending`,
          body: `Traditional commercial banks require fixed property collateral and 3 years of audited financials. Revenue-based financing engines inspect 90-day transaction history, customer churn, and historical chargeback frequency to establish immediate risk-adjusted credit limits.`
        },
        {
          heading: `Daily Split-Settlement Deduction Mechanism`,
          body: `Instead of fixed monthly loan installments that strain seasonal cash flows, repayment occurs programmatically as a 10-15% deduction from gross daily merchant credit card and mobile money collections, aligning debt servicing with merchant sales.`
        }
      ],
      marketImpact: `Slashes SME loan origination turnaround from 6 weeks to under 4 hours, lowering default rates below 1.2% through continuous split repayment.`,
      keyTakeaways: [
        `Automated underwriting analyzing real-time Shopify & WooCommerce GMV feeds`,
        `Repayment dynamically indexed to daily sales receipts via Paystack split settlements`,
        `Lowers default rates to sub-1.2% through continuous micro-repayment`
      ],
      telemetry: [
        { label: 'Disbursed Volume', value: '$320 Million', trend: '4,200 Advances' },
        { label: 'Origination Speed', value: '3.5 Hours', trend: 'Zero Paperwork' },
        { label: 'Default Rate', value: '0.94%', trend: 'Lowest in Class' }
      ],
      sources: ['Global SME Financing Forum', 'African Digital Commerce Council', 'Alternative Lending Quarterly'],
      tags: ['Revenue Financing', 'SME Credit', 'Shopify Telemetry', 'Paystack Split']
    },
    {
      category: 'Infrastructure Financing' as const,
      title: (h: number) => `Subsea Telecom Backbone Expansion: 2Africa & Equiano Cable Landings Fuel $1.2B Data Center Infrastructure Boom`,
      summary: `Massive international bandwidth additions trigger sovereign hyperscale data center development across Accra, Lagos, Nairobi, and Johannesburg.`,
      lead: `The operational activation of next-generation subsea fiber cables along the Atlantic and Indian Ocean coastlines is catalyzing institutional investment in tier-3 and tier-4 carrier-neutral data centers.`,
      sections: [
        {
          heading: `Terabit-Per-Second Transit Capacity & Latency Optimization`,
          body: `With subsea systems providing over 180 Tbps of combined design capacity, international cloud latency to Europe has fallen below 95ms. This performance breakthrough enables local hosting of core banking engines and AI inference clusters.`
        },
        {
          heading: `Sovereign Data Protection & Colocation Facility Syndication`,
          body: `Institutional real estate and infrastructure funds are syndicating $1.2B in development facilities for edge data centers equipped with dedicated renewable microgrids, ensuring uninterrupted uptime despite national grid variability.`
        }
      ],
      marketImpact: `Drives domestic cloud data hosting costs down by 62% while satisfying regional data sovereignty compliance requirements for financial institutions.`,
      keyTakeaways: [
        `180+ Tbps total international bandwidth landing across key maritime hubs`,
        `62% reduction in regional cloud connectivity and transit pricing`,
        `100% renewable-backed microgrid integration for tier-3/4 colocation centers`
      ],
      telemetry: [
        { label: 'Bandwidth Added', value: '180 Tbps', trend: 'Operational' },
        { label: 'Latency to Europe', value: '92 ms', trend: '-38ms Drop' },
        { label: 'Data Center Cap', value: '$1.2 Billion', trend: 'Syndicated' }
      ],
      sources: ['International Telecommunications Union', 'Africa Data Centers Association', 'Digital Infrastructure Review'],
      tags: ['Subsea Fiber', 'Data Centers', 'Tech Infrastructure', 'Cloud Banking']
    },
    {
      category: 'Modern Fintech Solutions' as const,
      title: (h: number) => `Embedded Micro-Insurance & Parametric Claims: Sub-10-Second Payouts for Regional Courier Freight Loss`,
      summary: `Point-of-sale cargo and transit coverage underwritten by licensed syndicates uses automated courier webhook telemetry to approve claims without paper forms.`,
      lead: `Logistics operators and e-commerce platforms in Ghana and Nigeria are integrating automated claim engines that disburse compensation directly into mobile wallets in seconds following courier transit incidents.`,
      sections: [
        {
          heading: `Point-of-Sale Micro-Premium Underwriting`,
          body: `By embedding 2.5-3.5% cargo protection into checkout flows, digital merchants protect equipment and consumer goods against loss, handling damage, and theft with zero upfront policy overhead.`
        },
        {
          heading: `Algorithmic Claims Adjudication & Instant Mobile Money Disbursements`,
          body: `When courier telemetry flags severe transit loss or water damage, claims below $500 are evaluated algorithmically against GPS and dispatch logs, disbursing instant mobile money reimbursement within 10 seconds.`
        }
      ],
      marketImpact: `Cuts claims processing overhead by 88% and eliminates traditional 30-day payout waiting periods for cross-border SME traders.`,
      keyTakeaways: [
        `Point-of-sale micro-premiums embedded at e-commerce checkout`,
        `Sub-10 second automated claim reimbursement direct to claimant MoMo wallet`,
        `Reinsurance treaty backing from Curacel Grow and London market syndicates`
      ],
      telemetry: [
        { label: 'Claim Payout Speed', value: '8.4 Seconds', trend: 'Automated' },
        { label: 'Loss Ratio', value: '19.2%', trend: 'Actuarial Target' },
        { label: 'Active Policies', value: '48,000 / mo', trend: '+28% Growth' }
      ],
      sources: ['InsurTech Global Summit', 'Curacel Underwriting Registry', 'African Logistics Observatory'],
      tags: ['InsurTech', 'Parametric Claims', 'Micro-Insurance', 'Mobile Money']
    },
    {
      category: 'Global & African Growth' as const,
      title: (h: number) => `Agricultural Supply Chain Tokenization & Commodity Warehousing: Unlocking $750M in Trade Receivables Liquidity`,
      summary: `Decentralized electronic warehouse receipts bridge smallholder cocoa, coffee, and cashew aggregators with institutional commercial liquidity pools.`,
      lead: `African agricultural commodity exporters are deploying electronic warehouse receipt protocols that convert verified physical crop stores into liquid, collateralized working capital instruments.`,
      sections: [
        {
          heading: `Cryptographic Inspection Verification & Commodity Oracles`,
          body: `Licensed collateral management firms inspect physical grain and cash crop stores, minting audited digital warehouse receipts backed by real-time quality grading, humidity telemetry, and market spot prices.`
        },
        {
          heading: `Pre-Export Financing with Institutional Liquidity Providers`,
          body: `Exporters use digital warehouse receipts to obtain instant pre-export credit lines from regional commercial banks at competitive commercial interest rates, mitigating harvest-time price dumping.`
        }
      ],
      marketImpact: `Provides fair harvest financing to over 180,000 agrarian producers while reducing post-harvest commodity financing losses by 34%.`,
      keyTakeaways: [
        `Digitally audited warehouse receipts backed by physical collateral managers`,
        `Instant pre-export commercial credit lines pegged to verified crop stores`,
        `Protection for smallholder cooperatives against predatory seasonal discounting`
      ],
      telemetry: [
        { label: 'Facility Liquidated', value: '$750 Million', trend: 'Full Deployment' },
        { label: 'Farmers Impacted', value: '185,000 Cooperatives', trend: 'Across 6 Nations' },
        { label: 'Collateral Security', value: '100% Insured', trend: 'Tier-1 Syndicated' }
      ],
      sources: ['African Commodities Exchange', 'Agro-Fintech Alliance', 'Trade Finance Global Review'],
      tags: ['Agri-Finance', 'Warehouse Receipts', 'Trade Liquidity', 'AfCFTA Growth']
    }
  ];

  // Generate 10 articles for current hour, with progressive timestamps and metadata
  const articles: NewsArticle[] = TOPIC_TEMPLATES.map((tmpl, index) => {
    // Generate publication timestamp inside the current hour (e.g. 5m, 12m, 24m, 40m ago)
    const minutesAgo = Math.max(1, Math.min(58, Math.floor(index * 5.5) + (minutes % 5)));
    const articleTime = new Date(now.getTime() - minutesAgo * 60 * 1000);

    const authors = [
      { name: 'Dr. Kwame Asante-Poku', role: 'Head of Infrastructure Finance & Sovereign Syndications', avatarInitials: 'KA' },
      { name: 'Amara Diallo, CFA', role: 'Chief Treasury Architect & Cross-Border Clearing Lead', avatarInitials: 'AD' },
      { name: 'Dr. Fatima El-Mansouri', role: 'Director of InsurTech & Algorithmic Underwriting', avatarInitials: 'FE' },
      { name: 'Tendai Moyo', role: 'Senior Macroeconomist & Capital Markets Strategist', avatarInitials: 'TM' },
      { name: 'Kofi Mensah', role: 'Principal Systems Engineer & EIP-4337 Architect', avatarInitials: 'KM' }
    ];

    const author = authors[index % authors.length];

    return {
      id: `art-hr-${currentHour}-${index + 1}-${currentDateStr}`,
      hourIndex: currentHour,
      title: tmpl.title(currentHour),
      slug: tmpl.title(currentHour).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: tmpl.category,
      publishedAt: articleTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ` (Hour ${currentHour}:00 UTC Update #${index + 1})`,
      readTime: `${4 + (index % 3)} min read`,
      author,
      summary: tmpl.summary,
      fullContent: {
        lead: tmpl.lead,
        sections: tmpl.sections,
        marketImpact: tmpl.marketImpact,
        keyTakeaways: tmpl.keyTakeaways,
        telemetry: tmpl.telemetry,
        sources: tmpl.sources
      },
      tags: tmpl.tags,
      featured: index === 0 || index === 1
    };
  });

  return {
    articles,
    currentHourNumber: currentHour,
    nextHourlyRefreshSeconds
  };
}
