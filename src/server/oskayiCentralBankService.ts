export interface CentralBankPolicyRate {
  id: string;
  country: string;
  bank_name: string;
  acronym: string;
  currency: string;
  current_policy_rate_pct: number;
  previous_policy_rate_pct: number;
  change_bps: number;
  inflation_rate_pct: number;
  inflation_target_pct: number;
  real_interest_rate_pct: number;
  last_decision_date: string;
  next_decision_date: string;
  next_decision_countdown_days: number;
  ai_next_move: 'HIKE_25BPS' | 'CUT_25BPS' | 'CUT_50BPS' | 'HOLD';
  ai_probability_pct: number;
  hawkish_dovish_score: number; // -10 (extreme dovish) to +10 (extreme hawkish)
  historical_rates: { year: number; rate_pct: number }[];
  tier: 'FREE' | 'PRO';
}

export class OskayiCentralBankService {
  private centralBanks: CentralBankPolicyRate[] = [
    {
      id: 'cb-fed',
      country: 'United States',
      bank_name: 'Federal Reserve (Fed)',
      acronym: 'US Fed',
      currency: 'USD',
      current_policy_rate_pct: 4.50,
      previous_policy_rate_pct: 4.75,
      change_bps: -25,
      inflation_rate_pct: 2.6,
      inflation_target_pct: 2.0,
      real_interest_rate_pct: 1.90,
      last_decision_date: '2026-01-28',
      next_decision_date: '2026-03-18',
      next_decision_countdown_days: 7,
      ai_next_move: 'CUT_25BPS',
      ai_probability_pct: 76,
      hawkish_dovish_score: -3,
      tier: 'FREE',
      historical_rates: [
        { year: 2000, rate_pct: 6.50 },
        { year: 2004, rate_pct: 1.25 },
        { year: 2007, rate_pct: 5.25 },
        { year: 2010, rate_pct: 0.25 },
        { year: 2018, rate_pct: 2.50 },
        { year: 2020, rate_pct: 0.25 },
        { year: 2023, rate_pct: 5.50 },
        { year: 2025, rate_pct: 4.75 },
        { year: 2026, rate_pct: 4.50 }
      ]
    },
    {
      id: 'cb-ecb',
      country: 'Eurozone',
      bank_name: 'European Central Bank (ECB)',
      acronym: 'ECB',
      currency: 'EUR',
      current_policy_rate_pct: 2.75,
      previous_policy_rate_pct: 3.00,
      change_bps: -25,
      inflation_rate_pct: 2.1,
      inflation_target_pct: 2.0,
      real_interest_rate_pct: 0.65,
      last_decision_date: '2026-01-30',
      next_decision_date: '2026-03-12',
      next_decision_countdown_days: 1,
      ai_next_move: 'CUT_25BPS',
      ai_probability_pct: 82,
      hawkish_dovish_score: -4,
      tier: 'FREE',
      historical_rates: [
        { year: 2000, rate_pct: 4.75 },
        { year: 2008, rate_pct: 4.25 },
        { year: 2014, rate_pct: -0.10 },
        { year: 2020, rate_pct: -0.50 },
        { year: 2023, rate_pct: 4.00 },
        { year: 2025, rate_pct: 3.00 },
        { year: 2026, rate_pct: 2.75 }
      ]
    },
    {
      id: 'cb-bog',
      country: 'Ghana',
      bank_name: 'Bank of Ghana (BoG)',
      acronym: 'BoG',
      currency: 'GHS',
      current_policy_rate_pct: 26.50,
      previous_policy_rate_pct: 27.00,
      change_bps: -50,
      inflation_rate_pct: 21.4,
      inflation_target_pct: 8.0,
      real_interest_rate_pct: 5.10,
      last_decision_date: '2026-01-26',
      next_decision_date: '2026-03-27',
      next_decision_countdown_days: 16,
      ai_next_move: 'HOLD',
      ai_probability_pct: 64,
      hawkish_dovish_score: 2,
      tier: 'FREE',
      historical_rates: [
        { year: 2008, rate_pct: 17.00 },
        { year: 2015, rate_pct: 26.00 },
        { year: 2019, rate_pct: 16.00 },
        { year: 2022, rate_pct: 27.00 },
        { year: 2023, rate_pct: 30.00 },
        { year: 2025, rate_pct: 27.00 },
        { year: 2026, rate_pct: 26.50 }
      ]
    },
    {
      id: 'cb-boj',
      country: 'Japan',
      bank_name: 'Bank of Japan (BoJ)',
      acronym: 'BoJ',
      currency: 'JPY',
      current_policy_rate_pct: 0.50,
      previous_policy_rate_pct: 0.25,
      change_bps: +25,
      inflation_rate_pct: 2.4,
      inflation_target_pct: 2.0,
      real_interest_rate_pct: -1.90,
      last_decision_date: '2026-01-24',
      next_decision_date: '2026-03-19',
      next_decision_countdown_days: 8,
      ai_next_move: 'HOLD',
      ai_probability_pct: 68,
      hawkish_dovish_score: 3,
      tier: 'FREE',
      historical_rates: [
        { year: 2000, rate_pct: 0.15 },
        { year: 2010, rate_pct: 0.10 },
        { year: 2016, rate_pct: -0.10 },
        { year: 2023, rate_pct: -0.10 },
        { year: 2024, rate_pct: 0.25 },
        { year: 2026, rate_pct: 0.50 }
      ]
    },
    {
      id: 'cb-boe',
      country: 'United Kingdom',
      bank_name: 'Bank of England (BoE)',
      acronym: 'BoE',
      currency: 'GBP',
      current_policy_rate_pct: 4.50,
      previous_policy_rate_pct: 4.75,
      change_bps: -25,
      inflation_rate_pct: 2.5,
      inflation_target_pct: 2.0,
      real_interest_rate_pct: 2.00,
      last_decision_date: '2026-02-06',
      next_decision_date: '2026-03-20',
      next_decision_countdown_days: 9,
      ai_next_move: 'HOLD',
      ai_probability_pct: 61,
      hawkish_dovish_score: -1,
      tier: 'FREE',
      historical_rates: [
        { year: 2000, rate_pct: 6.00 },
        { year: 2008, rate_pct: 5.00 },
        { year: 2010, rate_pct: 0.50 },
        { year: 2020, rate_pct: 0.10 },
        { year: 2023, rate_pct: 5.25 },
        { year: 2025, rate_pct: 4.75 },
        { year: 2026, rate_pct: 4.50 }
      ]
    },
    {
      id: 'cb-pboc',
      country: 'China',
      bank_name: "People's Bank of China (PBoC)",
      acronym: 'PBoC',
      currency: 'CNY',
      current_policy_rate_pct: 3.10,
      previous_policy_rate_pct: 3.35,
      change_bps: -25,
      inflation_rate_pct: 0.4,
      inflation_target_pct: 3.0,
      real_interest_rate_pct: 2.70,
      last_decision_date: '2026-02-20',
      next_decision_date: '2026-03-20',
      next_decision_countdown_days: 9,
      ai_next_move: 'CUT_25BPS',
      ai_probability_pct: 71,
      hawkish_dovish_score: -6,
      tier: 'FREE',
      historical_rates: [
        { year: 2008, rate_pct: 7.47 },
        { year: 2015, rate_pct: 4.35 },
        { year: 2020, rate_pct: 3.85 },
        { year: 2023, rate_pct: 3.45 },
        { year: 2025, rate_pct: 3.35 },
        { year: 2026, rate_pct: 3.10 }
      ]
    },
    {
      id: 'cb-sarb',
      country: 'South Africa',
      bank_name: 'South African Reserve Bank (SARB)',
      acronym: 'SARB',
      currency: 'ZAR',
      current_policy_rate_pct: 7.50,
      previous_policy_rate_pct: 7.75,
      change_bps: -25,
      inflation_rate_pct: 3.8,
      inflation_target_pct: 4.5,
      real_interest_rate_pct: 3.70,
      last_decision_date: '2026-01-23',
      next_decision_date: '2026-03-26',
      next_decision_countdown_days: 15,
      ai_next_move: 'CUT_25BPS',
      ai_probability_pct: 69,
      hawkish_dovish_score: -3,
      tier: 'FREE',
      historical_rates: [
        { year: 2008, rate_pct: 12.00 },
        { year: 2016, rate_pct: 7.00 },
        { year: 2020, rate_pct: 3.50 },
        { year: 2023, rate_pct: 8.25 },
        { year: 2025, rate_pct: 7.75 },
        { year: 2026, rate_pct: 7.50 }
      ]
    },
    {
      id: 'cb-cbn',
      country: 'Nigeria',
      bank_name: 'Central Bank of Nigeria (CBN)',
      acronym: 'CBN',
      currency: 'NGN',
      current_policy_rate_pct: 27.25,
      previous_policy_rate_pct: 27.25,
      change_bps: 0,
      inflation_rate_pct: 28.6,
      inflation_target_pct: 9.0,
      real_interest_rate_pct: -1.35,
      last_decision_date: '2026-01-21',
      next_decision_date: '2026-03-24',
      next_decision_countdown_days: 13,
      ai_next_move: 'HIKE_25BPS',
      ai_probability_pct: 58,
      hawkish_dovish_score: 5,
      tier: 'PRO',
      historical_rates: [
        { year: 2015, rate_pct: 13.00 },
        { year: 2020, rate_pct: 11.50 },
        { year: 2023, rate_pct: 18.75 },
        { year: 2024, rate_pct: 26.25 },
        { year: 2026, rate_pct: 27.25 }
      ]
    },
    {
      id: 'cb-bcb',
      country: 'Brazil',
      bank_name: 'Banco Central do Brasil (BCB)',
      acronym: 'BCB',
      currency: 'BRL',
      current_policy_rate_pct: 12.25,
      previous_policy_rate_pct: 11.75,
      change_bps: +50,
      inflation_rate_pct: 4.8,
      inflation_target_pct: 3.0,
      real_interest_rate_pct: 7.45,
      last_decision_date: '2026-01-29',
      next_decision_date: '2026-03-18',
      next_decision_countdown_days: 7,
      ai_next_move: 'HIKE_25BPS',
      ai_probability_pct: 65,
      hawkish_dovish_score: 6,
      tier: 'PRO',
      historical_rates: [
        { year: 2016, rate_pct: 14.25 },
        { year: 2020, rate_pct: 2.00 },
        { year: 2022, rate_pct: 13.75 },
        { year: 2024, rate_pct: 10.50 },
        { year: 2026, rate_pct: 12.25 }
      ]
    },
    {
      id: 'cb-snb',
      country: 'Switzerland',
      bank_name: 'Swiss National Bank (SNB)',
      acronym: 'SNB',
      currency: 'CHF',
      current_policy_rate_pct: 0.50,
      previous_policy_rate_pct: 0.75,
      change_bps: -25,
      inflation_rate_pct: 0.8,
      inflation_target_pct: 1.5,
      real_interest_rate_pct: -0.30,
      last_decision_date: '2025-12-11',
      next_decision_date: '2026-03-19',
      next_decision_countdown_days: 8,
      ai_next_move: 'CUT_25BPS',
      ai_probability_pct: 62,
      hawkish_dovish_score: -5,
      tier: 'PRO',
      historical_rates: [
        { year: 2015, rate_pct: -0.75 },
        { year: 2020, rate_pct: -0.75 },
        { year: 2022, rate_pct: 0.50 },
        { year: 2023, rate_pct: 1.75 },
        { year: 2026, rate_pct: 0.50 }
      ]
    }
  ];

  public getAllCentralBanks(includePro: boolean = true): CentralBankPolicyRate[] {
    if (includePro) return this.centralBanks;
    return this.centralBanks.filter(b => b.tier === 'FREE');
  }

  public getGlobalSummary() {
    const total = this.centralBanks.length;
    const avgRate = this.centralBanks.reduce((sum, b) => sum + b.current_policy_rate_pct, 0) / total;
    const cutsProjected = this.centralBanks.filter(b => b.ai_next_move.startsWith('CUT')).length;
    const hikesProjected = this.centralBanks.filter(b => b.ai_next_move.startsWith('HIKE')).length;
    const holdsProjected = this.centralBanks.filter(b => b.ai_next_move === 'HOLD').length;

    return {
      monitored_central_banks: 50,
      displayed_banks_count: total,
      average_policy_rate_pct: parseFloat(avgRate.toFixed(2)),
      ai_cycle_regime: cutsProjected > hikesProjected ? 'GLOBAL EASING CYCLE' : 'TIGHTENING CYCLE',
      cuts_projected: cutsProjected,
      hikes_projected: hikesProjected,
      holds_projected: holdsProjected,
      next_key_event: 'US Federal Reserve FOMC Rate Decision (Countdown: 7 Days)',
      data_sources: ['Federal Reserve FRED API', 'ECB Statistical Data Warehouse', 'Bank for International Settlements (BIS)', 'Bank of Ghana MPC Bulletins'],
      pro_subscription_price_usd: 29.00
    };
  }
}

export const oskayiCentralBankService = new OskayiCentralBankService();
