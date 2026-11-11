export interface InvestorProfile {
  age: number;
  risk_profile: 'conservative' | 'moderate' | 'growth' | 'aggressive';
  goal: 'retirement' | 'wealth_accumulation' | 'home_purchase' | 'education';
  initial_amount_usd: number;
  monthly_contribution_usd: number;
  time_horizon_years: number;
}

export interface PortfolioAssetClass {
  ticker: string;
  name: string;
  asset_type: 'Global Equities' | 'Bonds & Treasuries' | 'Commodities / Gold' | 'Emerging Markets';
  weight_pct: number;
  expected_return_pct: number;
  expense_ratio_pct: number;
}

export interface WealthProjectionYear {
  year: number;
  total_contributed_usd: number;
  expected_balance_usd: number;
  conservative_balance_usd: number;
  bull_balance_usd: number;
}

export interface WealthPortfolioRecommendation {
  portfolio_name: string;
  risk_score: number; // 1 to 10
  annualized_expected_return_pct: number;
  estimated_tax_loss_harvesting_savings_annual_usd: number;
  advisory_fee_pct: number;
  assets: PortfolioAssetClass[];
  projections: WealthProjectionYear[];
}

export class OskayiWealthService {
  public generatePortfolio(profile: InvestorProfile): WealthPortfolioRecommendation {
    const { risk_profile, initial_amount_usd, monthly_contribution_usd, time_horizon_years } = profile;

    let assets: PortfolioAssetClass[] = [];
    let expectedReturn = 7.5;
    let riskScore = 6;
    let portfolioName = 'Oskayi Global Core Growth';

    if (risk_profile === 'conservative') {
      portfolioName = 'Oskayi Capital Preservation & Income';
      riskScore = 3;
      expectedReturn = 4.8;
      assets = [
        { ticker: 'BND', name: 'Vanguard Total Bond Market ETF', asset_type: 'Bonds & Treasuries', weight_pct: 50, expected_return_pct: 4.2, expense_ratio_pct: 0.03 },
        { ticker: 'VT', name: 'Vanguard Total World Stock ETF', asset_type: 'Global Equities', weight_pct: 30, expected_return_pct: 7.8, expense_ratio_pct: 0.07 },
        { ticker: 'TIP', name: 'iShares TIPS Bond ETF', asset_type: 'Bonds & Treasuries', weight_pct: 10, expected_return_pct: 3.5, expense_ratio_pct: 0.19 },
        { ticker: 'GLD', name: 'SPDR Gold Shares', asset_type: 'Commodities / Gold', weight_pct: 10, expected_return_pct: 5.0, expense_ratio_pct: 0.40 }
      ];
    } else if (risk_profile === 'moderate') {
      portfolioName = 'Oskayi Balanced Global Wealth';
      riskScore = 5;
      expectedReturn = 6.8;
      assets = [
        { ticker: 'URTH', name: 'iShares MSCI World ETF', asset_type: 'Global Equities', weight_pct: 50, expected_return_pct: 8.0, expense_ratio_pct: 0.24 },
        { ticker: 'AGG', name: 'iShares Core U.S. Aggregate Bond ETF', asset_type: 'Bonds & Treasuries', weight_pct: 30, expected_return_pct: 4.4, expense_ratio_pct: 0.03 },
        { ticker: 'GLD', name: 'SPDR Gold Shares', asset_type: 'Commodities / Gold', weight_pct: 10, expected_return_pct: 5.2, expense_ratio_pct: 0.40 },
        { ticker: 'VWO', name: 'Vanguard Emerging Markets ETF', asset_type: 'Emerging Markets', weight_pct: 10, expected_return_pct: 8.5, expense_ratio_pct: 0.08 }
      ];
    } else if (risk_profile === 'growth') {
      portfolioName = 'Oskayi Global Long-Term Growth';
      riskScore = 7;
      expectedReturn = 8.4;
      assets = [
        { ticker: 'URTH', name: 'iShares MSCI World ETF', asset_type: 'Global Equities', weight_pct: 60, expected_return_pct: 8.5, expense_ratio_pct: 0.24 },
        { ticker: 'BND', name: 'Vanguard Total Bond Market ETF', asset_type: 'Bonds & Treasuries', weight_pct: 20, expected_return_pct: 4.2, expense_ratio_pct: 0.03 },
        { ticker: 'VWO', name: 'Vanguard FTSE Emerging Markets ETF', asset_type: 'Emerging Markets', weight_pct: 12, expected_return_pct: 9.1, expense_ratio_pct: 0.08 },
        { ticker: 'IAU', name: 'iShares Gold Trust', asset_type: 'Commodities / Gold', weight_pct: 8, expected_return_pct: 5.5, expense_ratio_pct: 0.25 }
      ];
    } else {
      portfolioName = 'Oskayi Maximum Equity Accumulator';
      riskScore = 9;
      expectedReturn = 9.8;
      assets = [
        { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', asset_type: 'Global Equities', weight_pct: 55, expected_return_pct: 10.2, expense_ratio_pct: 0.03 },
        { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', asset_type: 'Global Equities', weight_pct: 25, expected_return_pct: 8.8, expense_ratio_pct: 0.07 },
        { ticker: 'VWO', name: 'Vanguard Emerging Markets ETF', asset_type: 'Emerging Markets', weight_pct: 15, expected_return_pct: 9.5, expense_ratio_pct: 0.08 },
        { ticker: 'IAU', name: 'iShares Gold Trust', asset_type: 'Commodities / Gold', weight_pct: 5, expected_return_pct: 5.5, expense_ratio_pct: 0.25 }
      ];
    }

    // Build 20-30 year compounding projections
    const yearsToProject = Math.max(time_horizon_years || 20, 10);
    const projections: WealthProjectionYear[] = [];

    let balanceExpected = initial_amount_usd;
    let balanceConservative = initial_amount_usd;
    let balanceBull = initial_amount_usd;
    let totalContributed = initial_amount_usd;

    const rateExpected = expectedReturn / 100;
    const rateConservative = Math.max(expectedReturn - 2.8, 3.2) / 100;
    const rateBull = (expectedReturn + 2.5) / 100;

    for (let yr = 1; yr <= yearsToProject; yr++) {
      const annualAddition = monthly_contribution_usd * 12;
      totalContributed += annualAddition;

      balanceExpected = (balanceExpected + annualAddition) * (1 + rateExpected);
      balanceConservative = (balanceConservative + annualAddition) * (1 + rateConservative);
      balanceBull = (balanceBull + annualAddition) * (1 + rateBull);

      if (yr % 5 === 0 || yr === 1 || yr === yearsToProject) {
        projections.push({
          year: yr,
          total_contributed_usd: Math.round(totalContributed),
          expected_balance_usd: Math.round(balanceExpected),
          conservative_balance_usd: Math.round(balanceConservative),
          bull_balance_usd: Math.round(balanceBull)
        });
      }
    }

    // Annual tax loss harvesting simulation: typically saves ~0.45% of portfolio value annually
    const tlhSavings = Math.round(initial_amount_usd * 0.0045 + (monthly_contribution_usd * 12 * 0.002));

    return {
      portfolio_name: portfolioName,
      risk_score: riskScore,
      annualized_expected_return_pct: expectedReturn,
      estimated_tax_loss_harvesting_savings_annual_usd: tlhSavings,
      advisory_fee_pct: 0.25,
      assets,
      projections
    };
  }
}

export const oskayiWealthService = new OskayiWealthService();
