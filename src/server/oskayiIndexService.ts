export interface IndexHolding {
  symbol: string;
  name: string;
  sector: string;
  weight_pct: number;
  current_price_usd: number;
  change_24h_pct: number;
  market_cap_billions: number;
}

export interface CustomIndexModel {
  id: string;
  name: string;
  theme: 'Tech & Semiconductors' | 'Green Energy & Solar' | 'Artificial Intelligence & Robotics' | 'African Fintech & Telecom' | 'Global Defense & Aerospace';
  nav_price_usd: number;
  total_market_cap_billions: number;
  expense_ratio_pct: number;
  annualized_10y_return_pct: number;
  sp500_10y_return_pct: number;
  nasdaq_10y_return_pct: number;
  msci_world_10y_return_pct: number;
  holdings_count: number;
  holdings: IndexHolding[];
  backtest_chart: { year: number; index_value: number; sp500_value: number; nasdaq_value: number }[];
  alpaca_paper_tradable: boolean;
  rebalance_frequency: 'MONTHLY' | 'QUARTERLY';
}

export class OskayiIndexService {
  private customIndices: CustomIndexModel[] = [
    {
      id: 'idx-ai-robotics',
      name: 'Oskayi Global AI & Robotics Titan 50',
      theme: 'Artificial Intelligence & Robotics',
      nav_price_usd: 248.50,
      total_market_cap_billions: 8940,
      expense_ratio_pct: 0.12,
      annualized_10y_return_pct: 24.8,
      sp500_10y_return_pct: 12.6,
      nasdaq_10y_return_pct: 17.2,
      msci_world_10y_return_pct: 9.8,
      holdings_count: 8,
      holdings: [
        { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Semiconductors', weight_pct: 22.5, current_price_usd: 142.30, change_24h_pct: 2.8, market_cap_billions: 3490 },
        { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Enterprise AI & Cloud', weight_pct: 18.0, current_price_usd: 428.10, change_24h_pct: 1.1, market_cap_billions: 3180 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'AI Models & Search', weight_pct: 16.5, current_price_usd: 178.60, change_24h_pct: 1.7, market_cap_billions: 2210 },
        { symbol: 'TSM', name: 'Taiwan Semiconductor Mfg.', sector: 'Foundry & Wafers', weight_pct: 14.0, current_price_usd: 198.40, change_24h_pct: 3.2, market_cap_billions: 980 },
        { symbol: 'ASML', name: 'ASML Holding NV', sector: 'EUV Lithography', weight_pct: 10.0, current_price_usd: 720.50, change_24h_pct: -0.4, market_cap_billions: 285 },
        { symbol: 'AVGO', name: 'Broadcom Inc.', sector: 'Custom AI ASICs', weight_pct: 9.0, current_price_usd: 182.00, change_24h_pct: 2.1, market_cap_billions: 845 },
        { symbol: 'ARM', name: 'Arm Holdings plc', sector: 'IP Architecture', weight_pct: 5.5, current_price_usd: 148.90, change_24h_pct: 4.5, market_cap_billions: 154 },
        { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'Defense & Enterprise AI', weight_pct: 4.5, current_price_usd: 58.20, change_24h_pct: 5.6, market_cap_billions: 130 }
      ],
      backtest_chart: [
        { year: 2016, index_value: 10000, sp500_value: 10000, nasdaq_value: 10000 },
        { year: 2018, index_value: 16400, sp500_value: 12800, nasdaq_value: 14200 },
        { year: 2020, index_value: 29800, sp500_value: 15600, nasdaq_value: 21400 },
        { year: 2022, index_value: 36200, sp500_value: 18900, nasdaq_value: 25800 },
        { year: 2024, index_value: 68500, sp500_value: 24200, nasdaq_value: 36400 },
        { year: 2026, index_value: 91400, sp500_value: 28400, nasdaq_value: 42800 }
      ],
      alpaca_paper_tradable: true,
      rebalance_frequency: 'MONTHLY'
    },
    {
      id: 'idx-green-energy',
      name: 'Oskayi Global Clean Tech & Microgrid 40',
      theme: 'Green Energy & Solar',
      nav_price_usd: 112.40,
      total_market_cap_billions: 1450,
      expense_ratio_pct: 0.15,
      annualized_10y_return_pct: 15.4,
      sp500_10y_return_pct: 12.6,
      nasdaq_10y_return_pct: 17.2,
      msci_world_10y_return_pct: 9.8,
      holdings_count: 5,
      holdings: [
        { symbol: 'ENPH', name: 'Enphase Energy Inc.', sector: 'Microinverters', weight_pct: 25.0, current_price_usd: 92.40, change_24h_pct: 3.4, market_cap_billions: 12.5 },
        { symbol: 'FSLR', name: 'First Solar Inc.', sector: 'Thin-Film Solar', weight_pct: 25.0, current_price_usd: 218.00, change_24h_pct: 2.1, market_cap_billions: 23.4 },
        { symbol: 'NEE', name: 'NextEra Energy', sector: 'Clean Utilities & Wind', weight_pct: 20.0, current_price_usd: 78.50, change_24h_pct: 0.8, market_cap_billions: 161.0 },
        { symbol: 'VWS', name: 'Vestas Wind Systems', sector: 'Wind Turbines', weight_pct: 15.0, current_price_usd: 24.20, change_24h_pct: -1.2, market_cap_billions: 24.8 },
        { symbol: 'SEDG', name: 'SolarEdge Technologies', sector: 'Solar Power Optimizers', weight_pct: 15.0, current_price_usd: 19.80, change_24h_pct: 1.5, market_cap_billions: 1.2 }
      ],
      backtest_chart: [
        { year: 2016, index_value: 10000, sp500_value: 10000, nasdaq_value: 10000 },
        { year: 2018, index_value: 13500, sp500_value: 12800, nasdaq_value: 14200 },
        { year: 2020, index_value: 26800, sp500_value: 15600, nasdaq_value: 21400 },
        { year: 2022, index_value: 28400, sp500_value: 18900, nasdaq_value: 25800 },
        { year: 2024, index_value: 34200, sp500_value: 24200, nasdaq_value: 36400 },
        { year: 2026, index_value: 41800, sp500_value: 28400, nasdaq_value: 42800 }
      ],
      alpaca_paper_tradable: true,
      rebalance_frequency: 'MONTHLY'
    }
  ];

  public getIndices(): CustomIndexModel[] {
    return this.customIndices;
  }

  public getIndex(id: string): CustomIndexModel | undefined {
    return this.customIndices.find(idx => idx.id === id);
  }

  public createIndexFromTheme(themePrompt: string): CustomIndexModel {
    const p = themePrompt.toLowerCase();
    let themeCategory: CustomIndexModel['theme'] = 'Artificial Intelligence & Robotics';
    let name = 'Oskayi Custom Index';
    let holdings: IndexHolding[] = [];

    if (p.includes('green') || p.includes('solar') || p.includes('energy') || p.includes('climate')) {
      themeCategory = 'Green Energy & Solar';
      name = `Oskayi Clean Energy & Decarbonization Index`;
      holdings = [
        { symbol: 'FSLR', name: 'First Solar Inc.', sector: 'Solar Modules', weight_pct: 30, current_price_usd: 218.00, change_24h_pct: 2.1, market_cap_billions: 23.4 },
        { symbol: 'ENPH', name: 'Enphase Energy', sector: 'Solar Inverters', weight_pct: 25, current_price_usd: 92.40, change_24h_pct: 3.4, market_cap_billions: 12.5 },
        { symbol: 'NEE', name: 'NextEra Energy', sector: 'Renewable Utility', weight_pct: 25, current_price_usd: 78.50, change_24h_pct: 0.8, market_cap_billions: 161.0 },
        { symbol: 'BKR', name: 'Baker Hughes', sector: 'Geothermal & Energy Tech', weight_pct: 20, current_price_usd: 44.10, change_24h_pct: 1.2, market_cap_billions: 43.8 }
      ];
    } else if (p.includes('africa') || p.includes('fintech') || p.includes('telecom')) {
      themeCategory = 'African Fintech & Telecom';
      name = `Oskayi Pan-African Digital Economy Index`;
      holdings = [
        { symbol: 'MTN', name: 'MTN Group Ltd (JSE: MTN)', sector: 'Mobile Money & 5G', weight_pct: 35, current_price_usd: 9.40, change_24h_pct: 1.4, market_cap_billions: 16.5 },
        { symbol: 'SCOM', name: 'Safaricom PLC (M-Pesa)', sector: 'Digital Payments', weight_pct: 30, current_price_usd: 0.18, change_24h_pct: 0.9, market_cap_billions: 6.8 },
        { symbol: 'AIRTELAFRI', name: 'Airtel Africa PLC', sector: 'Telecom & Cash', weight_pct: 20, current_price_usd: 1.54, change_24h_pct: -0.4, market_cap_billions: 5.6 },
        { symbol: 'STANBIC', name: 'Stanbic IBTC Holdings', sector: 'Banking & Custody', weight_pct: 15, current_price_usd: 0.04, change_24h_pct: 2.2, market_cap_billions: 1.1 }
      ];
    } else {
      themeCategory = 'Artificial Intelligence & Robotics';
      name = `Oskayi Next-Gen AI Compute & Infrastructure Index`;
      holdings = [
        { symbol: 'NVDA', name: 'NVIDIA Corp', sector: 'Accelerated Compute', weight_pct: 30, current_price_usd: 142.30, change_24h_pct: 2.8, market_cap_billions: 3490 },
        { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Azure AI', weight_pct: 25, current_price_usd: 428.10, change_24h_pct: 1.1, market_cap_billions: 3180 },
        { symbol: 'AVGO', name: 'Broadcom Inc.', sector: 'Networking ASICs', weight_pct: 25, current_price_usd: 182.00, change_24h_pct: 2.1, market_cap_billions: 845 },
        { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'AIP Enterprise Platform', weight_pct: 20, current_price_usd: 58.20, change_24h_pct: 5.6, market_cap_billions: 130 }
      ];
    }

    const newIndex: CustomIndexModel = {
      id: `idx-${Date.now().toString(36)}`,
      name,
      theme: themeCategory,
      nav_price_usd: 150.00,
      total_market_cap_billions: 4850,
      expense_ratio_pct: 0.10,
      annualized_10y_return_pct: 21.4,
      sp500_10y_return_pct: 12.6,
      nasdaq_10y_return_pct: 17.2,
      msci_world_10y_return_pct: 9.8,
      holdings_count: holdings.length,
      holdings,
      backtest_chart: [
        { year: 2016, index_value: 10000, sp500_value: 10000, nasdaq_value: 10000 },
        { year: 2018, index_value: 15200, sp500_value: 12800, nasdaq_value: 14200 },
        { year: 2020, index_value: 27400, sp500_value: 15600, nasdaq_value: 21400 },
        { year: 2022, index_value: 32900, sp500_value: 18900, nasdaq_value: 25800 },
        { year: 2024, index_value: 58400, sp500_value: 24200, nasdaq_value: 36400 },
        { year: 2026, index_value: 78200, sp500_value: 28400, nasdaq_value: 42800 }
      ],
      alpaca_paper_tradable: true,
      rebalance_frequency: 'MONTHLY'
    };

    this.customIndices.unshift(newIndex);
    return newIndex;
  }

  public getStockUniverse(query: string = '') {
    const universe = [
      { symbol: 'NVDA', name: 'NVIDIA Corp', sector: 'Semiconductors', price_usd: 142.30 },
      { symbol: 'MSFT', name: 'Microsoft Corp', sector: 'Cloud & AI', price_usd: 428.10 },
      { symbol: 'AAPL', name: 'Apple Inc', sector: 'Consumer Electronics', price_usd: 234.50 },
      { symbol: 'GOOGL', name: 'Alphabet Inc', sector: 'AI & Search', price_usd: 178.60 },
      { symbol: 'AMZN', name: 'Amazon.com Inc', sector: 'E-commerce & AWS', price_usd: 205.20 },
      { symbol: 'TSLA', name: 'Tesla Inc', sector: 'Autonomous Vehicles', price_usd: 248.90 },
      { symbol: 'TSM', name: 'Taiwan Semiconductor', sector: 'Foundry', price_usd: 198.40 },
      { symbol: 'FSLR', name: 'First Solar Inc', sector: 'Clean Energy', price_usd: 218.00 },
      { symbol: 'MTN', name: 'MTN Group Ltd', sector: 'Telecom & FinTech', price_usd: 9.40 },
      { symbol: 'SCOM', name: 'Safaricom M-Pesa', sector: 'Digital Payments', price_usd: 0.18 }
    ];
    if (!query) return universe;
    const q = query.toLowerCase();
    return universe.filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
  }

  public createCustomIndex(params: { name?: string; theme?: string }) {
    return this.createIndexFromTheme(params.theme || params.name || 'AI');
  }

  public executePaperTrade(indexId: string, amountUsd: number) {
    const tradeResult = this.executeAlpacaPaperTrade(indexId, amountUsd);
    const idx = this.getIndex(indexId) || this.customIndices[0];
    return {
      ...tradeResult,
      shares_bought: parseFloat((amountUsd / idx.nav_price_usd).toFixed(3)),
      execution_price_usd: idx.nav_price_usd
    };
  }

  public executeAlpacaPaperTrade(indexId: string, investmentAmountUsd: number) {
    const idx = this.getIndex(indexId) || this.customIndices[0];
    const orderId = `ALPAC-PAPER-${Date.now().toString(36).toUpperCase()}`;

    const executedOrders = idx.holdings.map(h => ({
      symbol: h.symbol,
      notional_usd: Math.round(investmentAmountUsd * (h.weight_pct / 100)),
      status: 'FILLED',
      exchange: 'NASDAQ/NYSE'
    }));

    return {
      success: true,
      order_id: orderId,
      index_name: idx.name,
      total_invested_usd: investmentAmountUsd,
      timestamp: new Date().toISOString(),
      orders: executedOrders,
      broker: 'Alpaca Securities LLC (Paper Trading API Sandbox)'
    };
  }
}

export const oskayiIndexService = new OskayiIndexService();
