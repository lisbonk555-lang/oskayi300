export interface CountryDebtMetric {
  code: string;
  name: string;
  total_debt_usd: number;
  gdp_usd: number;
  debt_to_gdp_pct: number;
  debt_per_citizen_usd: number;
  population: number;
  interest_payments_annual_usd: number;
  average_interest_rate_pct: number;
  maturity_schedule: {
    within_1y_pct: number;
    from_1_to_5y_pct: number;
    from_5_to_10y_pct: number;
    over_10y_pct: number;
  };
  flag_emoji: string;
  currency: string;
}

export class OskayiDebtClockService {
  // Baseline global public & private debt benchmark ($315.4 Trillion USD)
  private baselineGlobalDebt = 315482910450000;
  private baselineTimestamp = Date.now();
  // Global debt grows at ~$640,000 USD per second
  private growthPerSecond = 642850;

  private countries: CountryDebtMetric[] = [
    {
      code: 'USA',
      name: 'United States',
      total_debt_usd: 35840000000000,
      gdp_usd: 28780000000000,
      debt_to_gdp_pct: 124.5,
      debt_per_citizen_usd: 106200,
      population: 337500000,
      interest_payments_annual_usd: 1140000000000,
      average_interest_rate_pct: 3.25,
      maturity_schedule: { within_1y_pct: 28, from_1_to_5y_pct: 34, from_5_to_10y_pct: 22, over_10y_pct: 16 },
      flag_emoji: '🇺🇸',
      currency: 'USD'
    },
    {
      code: 'JPN',
      name: 'Japan',
      total_debt_usd: 9850000000000,
      gdp_usd: 4110000000000,
      debt_to_gdp_pct: 239.6,
      debt_per_citizen_usd: 79400,
      population: 124000000,
      interest_payments_annual_usd: 72000000000,
      average_interest_rate_pct: 0.75,
      maturity_schedule: { within_1y_pct: 19, from_1_to_5y_pct: 38, from_5_to_10y_pct: 27, over_10y_pct: 16 },
      flag_emoji: '🇯🇵',
      currency: 'JPY'
    },
    {
      code: 'CHN',
      name: 'China',
      total_debt_usd: 15420000000000,
      gdp_usd: 18530000000000,
      debt_to_gdp_pct: 83.2,
      debt_per_citizen_usd: 10940,
      population: 1409000000,
      interest_payments_annual_usd: 395000000000,
      average_interest_rate_pct: 2.56,
      maturity_schedule: { within_1y_pct: 22, from_1_to_5y_pct: 42, from_5_to_10y_pct: 24, over_10y_pct: 12 },
      flag_emoji: '🇨🇳',
      currency: 'CNY'
    },
    {
      code: 'GBR',
      name: 'United Kingdom',
      total_debt_usd: 3450000000000,
      gdp_usd: 3490000000000,
      debt_to_gdp_pct: 98.8,
      debt_per_citizen_usd: 50800,
      population: 67900000,
      interest_payments_annual_usd: 124000000000,
      average_interest_rate_pct: 3.60,
      maturity_schedule: { within_1y_pct: 14, from_1_to_5y_pct: 28, from_5_to_10y_pct: 26, over_10y_pct: 32 },
      flag_emoji: '🇬🇧',
      currency: 'GBP'
    },
    {
      code: 'ITA',
      name: 'Italy',
      total_debt_usd: 3120000000000,
      gdp_usd: 2280000000000,
      debt_to_gdp_pct: 136.8,
      debt_per_citizen_usd: 53100,
      population: 58800000,
      interest_payments_annual_usd: 94000000000,
      average_interest_rate_pct: 3.10,
      maturity_schedule: { within_1y_pct: 16, from_1_to_5y_pct: 36, from_5_to_10y_pct: 32, over_10y_pct: 16 },
      flag_emoji: '🇮🇹',
      currency: 'EUR'
    },
    {
      code: 'FRA',
      name: 'France',
      total_debt_usd: 3480000000000,
      gdp_usd: 3130000000000,
      debt_to_gdp_pct: 111.2,
      debt_per_citizen_usd: 51200,
      population: 68000000,
      interest_payments_annual_usd: 58000000000,
      average_interest_rate_pct: 1.70,
      maturity_schedule: { within_1y_pct: 15, from_1_to_5y_pct: 35, from_5_to_10y_pct: 30, over_10y_pct: 20 },
      flag_emoji: '🇫🇷',
      currency: 'EUR'
    },
    {
      code: 'DEU',
      name: 'Germany',
      total_debt_usd: 2840000000000,
      gdp_usd: 4590000000000,
      debt_to_gdp_pct: 61.9,
      debt_per_citizen_usd: 33800,
      population: 84000000,
      interest_payments_annual_usd: 44000000000,
      average_interest_rate_pct: 1.55,
      maturity_schedule: { within_1y_pct: 18, from_1_to_5y_pct: 34, from_5_to_10y_pct: 28, over_10y_pct: 20 },
      flag_emoji: '🇩🇪',
      currency: 'EUR'
    },
    {
      code: 'IND',
      name: 'India',
      total_debt_usd: 3250000000000,
      gdp_usd: 3940000000000,
      debt_to_gdp_pct: 82.5,
      debt_per_citizen_usd: 2280,
      population: 1428000000,
      interest_payments_annual_usd: 132000000000,
      average_interest_rate_pct: 4.10,
      maturity_schedule: { within_1y_pct: 12, from_1_to_5y_pct: 32, from_5_to_10y_pct: 36, over_10y_pct: 20 },
      flag_emoji: '🇮🇳',
      currency: 'INR'
    },
    {
      code: 'GHA',
      name: 'Ghana',
      total_debt_usd: 54800000000,
      gdp_usd: 76200000000,
      debt_to_gdp_pct: 71.9,
      debt_per_citizen_usd: 1610,
      population: 34000000,
      interest_payments_annual_usd: 4200000000,
      average_interest_rate_pct: 7.80,
      maturity_schedule: { within_1y_pct: 24, from_1_to_5y_pct: 46, from_5_to_10y_pct: 22, over_10y_pct: 8 },
      flag_emoji: '🇬🇭',
      currency: 'GHS'
    },
    {
      code: 'NGA',
      name: 'Nigeria',
      total_debt_usd: 114000000000,
      gdp_usd: 252000000000,
      debt_to_gdp_pct: 45.2,
      debt_per_citizen_usd: 510,
      population: 223000000,
      interest_payments_annual_usd: 9800000000,
      average_interest_rate_pct: 8.60,
      maturity_schedule: { within_1y_pct: 20, from_1_to_5y_pct: 40, from_5_to_10y_pct: 28, over_10y_pct: 12 },
      flag_emoji: '🇳🇬',
      currency: 'NGN'
    }
  ];

  public getLiveGlobalDebt(): {
    current_global_debt_usd: number;
    growth_per_second_usd: number;
    global_gdp_usd: number;
    global_debt_to_gdp_pct: number;
    as_of: string;
  } {
    const elapsedSeconds = (Date.now() - this.baselineTimestamp) / 1000;
    const currentDebt = Math.round(this.baselineGlobalDebt + elapsedSeconds * this.growthPerSecond);
    const globalGdp = 105000000000000; // ~$105T global GDP

    return {
      current_global_debt_usd: currentDebt,
      growth_per_second_usd: this.growthPerSecond,
      global_gdp_usd: globalGdp,
      global_debt_to_gdp_pct: Math.round((currentDebt / globalGdp) * 1000) / 10,
      as_of: new Date().toISOString()
    };
  }

  public getCountries(): CountryDebtMetric[] {
    return this.countries;
  }

  public getCountry(code: string): CountryDebtMetric | undefined {
    return this.countries.find(c => c.code.toUpperCase() === code.toUpperCase());
  }

  public compareCountries(codeA: string, codeB: string): {
    countryA: CountryDebtMetric;
    countryB: CountryDebtMetric;
    debt_difference_usd: number;
    debt_to_gdp_spread_pct: number;
    higher_per_citizen: string;
  } {
    const a = this.getCountry(codeA) || this.countries[0];
    const b = this.getCountry(codeB) || this.countries[2];

    return {
      countryA: a,
      countryB: b,
      debt_difference_usd: Math.abs(a.total_debt_usd - b.total_debt_usd),
      debt_to_gdp_spread_pct: Math.round(Math.abs(a.debt_to_gdp_pct - b.debt_to_gdp_pct) * 10) / 10,
      higher_per_citizen: a.debt_per_citizen_usd > b.debt_per_citizen_usd ? a.name : b.name
    };
  }

  public generateEmbedWidgetCode(countryCode?: string): string {
    const code = countryCode || 'GLOBAL';
    return `<iframe src="https://oskayi.com/embed/debt-clock?country=${code}" width="420" height="220" frameborder="0" scrolling="no" style="border-radius:12px;border:1px solid #dc2626;"></iframe>`;
  }
}

export const oskayiDebtClockService = new OskayiDebtClockService();
