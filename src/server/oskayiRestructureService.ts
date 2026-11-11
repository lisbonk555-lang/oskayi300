export interface CreditorClaim {
  id: string;
  creditor_name: string;
  category: 'BILATERAL_CHINA' | 'PARIS_CLUB' | 'PRIVATE_EUROBONDS' | 'MULTILATERAL_SENIOR' | 'DOMESTIC_BANKS';
  principal_outstanding_usd: number;
  original_interest_rate_pct: number;
  original_maturity_year: number;
  voted_approval_pct: number;
  cac_eligible: boolean;
}

export interface RestructuringProposal {
  id: string;
  proposal_title: string;
  proposed_by: string;
  haircut_pct: number; // e.g. 30%
  maturity_extension_years: number; // e.g. 10 years
  new_coupon_pct: number; // e.g. 4.0%
  grace_period_years: number; // e.g. 3 years
  npv_debt_relief_pct: number; // calculated relief at 5% discount rate
  total_debt_relief_usd: number;
  cac_aggregate_voted_pct: number;
  cac_threshold_met: boolean;
  comparability_of_treatment_passed: boolean;
  status: 'NEGOTIATION_DRAFT' | 'CREDITOR_REVIEW' | 'VOTED_RATIFIED' | 'REJECTED';
  created_at: string;
}

export class OskayiRestructureService {
  private claims: CreditorClaim[] = [
    {
      id: 'claim-china-exim',
      creditor_name: 'Export-Import Bank of China & China Development Bank',
      category: 'BILATERAL_CHINA',
      principal_outstanding_usd: 1900000000,
      original_interest_rate_pct: 2.85,
      original_maturity_year: 2028,
      voted_approval_pct: 72.5,
      cac_eligible: false
    },
    {
      id: 'claim-paris-club',
      creditor_name: 'Paris Club Sovereign Creditors (France, UK, Japan, Germany)',
      category: 'PARIS_CLUB',
      principal_outstanding_usd: 1450000000,
      original_interest_rate_pct: 2.20,
      original_maturity_year: 2027,
      voted_approval_pct: 85.0,
      cac_eligible: false
    },
    {
      id: 'claim-eurobonds-commercial',
      creditor_name: 'Steering Committee of International Private Eurobond Holders',
      category: 'PRIVATE_EUROBONDS',
      principal_outstanding_usd: 13100000000,
      original_interest_rate_pct: 8.65,
      original_maturity_year: 2029,
      voted_approval_pct: 78.4,
      cac_eligible: true
    },
    {
      id: 'claim-multilateral-imf-wb',
      creditor_name: 'World Bank (IDA/IBRD) & IMF (Preferred Creditor Status)',
      category: 'MULTILATERAL_SENIOR',
      principal_outstanding_usd: 4800000000,
      original_interest_rate_pct: 1.25,
      original_maturity_year: 2042,
      voted_approval_pct: 100.0,
      cac_eligible: false
    }
  ];

  private proposals: RestructuringProposal[] = [
    {
      id: 'PROP-G20-COMMON-001',
      proposal_title: 'Sovereign Debt Operations Term Sheet (Comprehensive NPV Relief)',
      proposed_by: 'Ministry of Finance & International Advisory Consortium',
      haircut_pct: 37,
      maturity_extension_years: 10,
      new_coupon_pct: 5.0,
      grace_period_years: 4,
      npv_debt_relief_pct: 44.2,
      total_debt_relief_usd: 4847000000,
      cac_aggregate_voted_pct: 78.4,
      cac_threshold_met: true, // >= 75% for single-limb aggregate
      comparability_of_treatment_passed: true,
      status: 'VOTED_RATIFIED',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ];

  public getClaims(): CreditorClaim[] {
    return this.claims;
  }

  public getProposals(): RestructuringProposal[] {
    return this.proposals;
  }

  public calculateRestructuringRelief(params: {
    haircutPct: number;
    maturityExtensionYears: number;
    newCouponPct: number;
    gracePeriodYears: number;
  }): {
    npvDebtReliefPct: number;
    totalReliefUsd: number;
    comparabilityScore: string;
  } {
    const totalRestructurableDebt = 16450000000; // ~$16.45B eligible debt
    const haircutFactor = params.haircutPct / 100;
    const maturityFactor = Math.min(params.maturityExtensionYears * 0.015, 0.20);
    const couponSavingsFactor = Math.max((8.65 - params.newCouponPct) * 0.02, 0);

    const npvReliefPct = Math.round((haircutFactor * 0.65 + maturityFactor + couponSavingsFactor) * 1000) / 10;
    const totalReliefUsd = Math.round(totalRestructurableDebt * (npvReliefPct / 100));

    return {
      npvDebtReliefPct: Math.min(npvReliefPct, 65),
      totalReliefUsd,
      comparabilityScore: npvReliefPct >= 35
        ? 'COMPLIANT: G20 Common Framework Comparability of Treatment satisfied across all creditor buckets.'
        : 'NON-COMPLIANT: Relief insufficient under IMF Debt Sustainability Framework target threshold.'
    };
  }

  public createProposal(params: {
    proposalTitle: string;
    proposedBy: string;
    haircutPct: number;
    maturityExtensionYears: number;
    newCouponPct: number;
    gracePeriodYears: number;
  }): RestructuringProposal {
    const relief = this.calculateRestructuringRelief(params);

    const proposal: RestructuringProposal = {
      id: `PROP-${Date.now().toString(36).toUpperCase()}`,
      proposal_title: params.proposalTitle,
      proposed_by: params.proposedBy || 'Sovereign Legal Counsel & Debt Office',
      haircut_pct: params.haircutPct,
      maturity_extension_years: params.maturityExtensionYears,
      new_coupon_pct: params.newCouponPct,
      grace_period_years: params.gracePeriodYears,
      npv_debt_relief_pct: relief.npvDebtReliefPct,
      total_debt_relief_usd: relief.totalReliefUsd,
      cac_aggregate_voted_pct: 76.5,
      cac_threshold_met: true,
      comparability_of_treatment_passed: relief.npvDebtReliefPct >= 30,
      status: 'NEGOTIATION_DRAFT',
      created_at: new Date().toISOString()
    };

    this.proposals.unshift(proposal);
    return proposal;
  }
}

export const oskayiRestructureService = new OskayiRestructureService();
