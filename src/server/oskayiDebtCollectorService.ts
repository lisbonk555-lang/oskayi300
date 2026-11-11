export interface DefaultedDebtCase {
  id: string;
  debtor_name: string;
  debtor_type: 'SOVEREIGN' | 'STATE_OWNED_ENTERPRISE' | 'CORPORATE' | 'SUB_NATIONAL';
  country: string;
  face_value_usd: number;
  original_currency: string;
  maturity_year: number;
  coupon_rate_pct: number;
  governing_law: 'NEW_YORK' | 'ENGLISH_LAW' | 'OHADA_AFRICA' | 'SINGAPORE_ICMA';
  creditor_institution: string;
  status: 'PENDING_TRIAGE' | 'RESTRUCTURE_ACTIVE' | 'LISTED_FOR_SALE' | 'LITIGATION_FILED' | 'SWAP_EXECUTED' | 'RECOVERED';
  recovery_target_pct: number;
  estimated_recovery_value_usd: number;
  created_at: string;
  world_bank_ids_risk_rating: 'SUSTAINABLE' | 'MODERATE' | 'HIGH_RISK_OF_DISTRESS' | 'IN_DEBT_DISTRESS';
  imf_article_iv_summary: string;
  recommended_pathway: 'RESTRUCTURE' | 'SECONDARY_SALE' | 'LITIGATION' | 'DEBT_FOR_NATURE_SWAP';
  pathway_reasoning: string;
  action_plan_steps: string[];
}

export interface DistressedMarketListing {
  id: string;
  case_id: string;
  title: string;
  country: string;
  debtor_type: 'SOVEREIGN' | 'CORPORATE';
  face_value_usd: number;
  asking_price_cents_on_dollar: number;
  total_asking_price_usd: number;
  accrued_interest_usd: number;
  lma_lsta_standard: boolean;
  kyc_verified_buyer_only: boolean;
  success_fee_pct: number;
  bids_count: number;
  highest_bid_cents: number;
}

export class OskayiDebtCollectorService {
  private cases: DefaultedDebtCase[] = [
    {
      id: 'case-sov-gha-01',
      debtor_name: 'Republic of Ghana 2029 Eurobond Tranche B',
      debtor_type: 'SOVEREIGN',
      country: 'Ghana',
      face_value_usd: 125000000,
      original_currency: 'USD',
      maturity_year: 2029,
      coupon_rate_pct: 8.125,
      governing_law: 'ENGLISH_LAW',
      creditor_institution: 'Apex Emerging Markets Sovereign Credit Fund II',
      status: 'RESTRUCTURE_ACTIVE',
      recovery_target_pct: 63.5,
      estimated_recovery_value_usd: 79375000,
      created_at: '2026-01-14T08:00:00Z',
      world_bank_ids_risk_rating: 'IN_DEBT_DISTRESS',
      imf_article_iv_summary: 'Targeting 37% nominal haircut with step-up coupons (5.0% to 6.5%) in alignment with OCC / G20 Common Framework parameters and CAC 75% consent threshold.',
      recommended_pathway: 'RESTRUCTURE',
      pathway_reasoning: 'G20 Common Framework restructuring yields maximal recovery of 63-65c without high litigation friction or asset attachment hurdles.',
      action_plan_steps: [
        'Deposit claims with G20 Official Creditor Committee (OCC) Secretariat',
        'Enroll in CAC (Collective Action Clause) aggregation pool (75% threshold)',
        'Issue exchange instrument instruction under English Law ICMA standards',
        'Verify new benchmark Eurobonds crediting to Euroclear/Clearstream account'
      ]
    },
    {
      id: 'case-corp-zam-02',
      debtor_name: 'Copperbelt Consolidated Mining SOE Syndicated Facility',
      debtor_type: 'STATE_OWNED_ENTERPRISE',
      country: 'Zambia',
      face_value_usd: 48000000,
      original_currency: 'USD',
      maturity_year: 2024,
      coupon_rate_pct: 9.75,
      governing_law: 'ENGLISH_LAW',
      creditor_institution: 'Standard African Trade Finance Ltd',
      status: 'LISTED_FOR_SALE',
      recovery_target_pct: 54.0,
      estimated_recovery_value_usd: 25920000,
      created_at: '2026-02-02T11:30:00Z',
      world_bank_ids_risk_rating: 'IN_DEBT_DISTRESS',
      imf_article_iv_summary: 'SOE copper output up 18% YoY, copper prices robust at $9,650/MT; mining off-taker rights serve as collateral enforceable in London arbitration.',
      recommended_pathway: 'SECONDARY_SALE',
      pathway_reasoning: 'Vetted institutional resource funds are actively purchasing distressed copper receivables at 52-55c on the dollar with instant liquidity.',
      action_plan_steps: [
        'Execute LMA secondary distressed debt transfer documentation',
        'Publish redacted teasers to vetted global distressed asset buyers',
        'Collect competing electronic bids with 5% Oskayi institutional escrow',
        'Execute assignment of claim and wire proceeds via SWIFT MT103'
      ]
    },
    {
      id: 'case-corp-arg-03',
      debtor_name: 'Pampa Petrochemical Holdings 2025 Secured Notes',
      debtor_type: 'CORPORATE',
      country: 'Argentina',
      face_value_usd: 35000000,
      original_currency: 'USD',
      maturity_year: 2025,
      coupon_rate_pct: 11.25,
      governing_law: 'NEW_YORK',
      creditor_institution: 'Highland Distressed Opportunities Fund',
      status: 'LITIGATION_FILED',
      recovery_target_pct: 82.0,
      estimated_recovery_value_usd: 28700000,
      created_at: '2026-02-18T14:15:00Z',
      world_bank_ids_risk_rating: 'HIGH_RISK_OF_DISTRESS',
      imf_article_iv_summary: 'Debtor diverted export proceeds through offshore BVI special purpose vehicle while denying coupon payment to NY trustee.',
      recommended_pathway: 'LITIGATION',
      pathway_reasoning: 'SDNY jurisdiction with clear acceleration clause and identified trade receivables in Delaware and Rotterdam maritime terminals.',
      action_plan_steps: [
        'File summary judgment motion in US District Court (SDNY)',
        'Issue Rule 69 discovery orders targeting offshore affiliate bank accounts',
        'Enforce maritime attachment under Rule B on export cargoes in port',
        'Reach structured consent judgment with guarantor pledge'
      ]
    },
    {
      id: 'case-sov-gab-04',
      debtor_name: 'Gabonese Republic Marine Habitat Sovereign Bond',
      debtor_type: 'SOVEREIGN',
      country: 'Gabon',
      face_value_usd: 90000000,
      original_currency: 'USD',
      maturity_year: 2031,
      coupon_rate_pct: 7.00,
      governing_law: 'ENGLISH_LAW',
      creditor_institution: 'Global ESG Sovereign Debt Mandate',
      status: 'SWAP_EXECUTED',
      recovery_target_pct: 78.0,
      estimated_recovery_value_usd: 70200000,
      created_at: '2026-03-01T09:00:00Z',
      world_bank_ids_risk_rating: 'MODERATE',
      imf_article_iv_summary: 'US DFC / TNC political risk insurance backstop enables Debt-for-Nature conversion into 15-year marine conservation endowment.',
      recommended_pathway: 'DEBT_FOR_NATURE_SWAP',
      pathway_reasoning: 'Debt-for-Nature conversion provides guaranteed refinance at par-discount blend with international development bank credit enhancement.',
      action_plan_steps: [
        'Model Blue Bond refinancing package backed by credit insurance',
        'Execute tripartite swap protocol with Ministry of Economy and Conservation Fund',
        'Refinance $90M defaulted paper into AAA-rated marine conservation paper',
        'Audit 2026 conservation milestone deliverables'
      ]
    }
  ];

  private marketplaceListings: DistressedMarketListing[] = [
    {
      id: 'dist-01',
      case_id: 'case-corp-zam-02',
      title: 'Zambian Copper SOE Commercial Claim - Syndicated Tranche',
      country: 'Zambia',
      debtor_type: 'SOVEREIGN',
      face_value_usd: 48000000,
      asking_price_cents_on_dollar: 52.5,
      total_asking_price_usd: 25200000,
      accrued_interest_usd: 4680000,
      lma_lsta_standard: true,
      kyc_verified_buyer_only: true,
      success_fee_pct: 5.0,
      bids_count: 4,
      highest_bid_cents: 51.8
    },
    {
      id: 'dist-02',
      case_id: 'case-dist-02',
      title: 'Sub-Saharan Infrastructure Port Concession Guaranteed Note',
      country: 'Kenya',
      debtor_type: 'CORPORATE',
      face_value_usd: 22000000,
      asking_price_cents_on_dollar: 68.0,
      total_asking_price_usd: 14960000,
      accrued_interest_usd: 1850000,
      lma_lsta_standard: true,
      kyc_verified_buyer_only: true,
      success_fee_pct: 5.0,
      bids_count: 6,
      highest_bid_cents: 67.2
    },
    {
      id: 'dist-03',
      case_id: 'case-dist-03',
      title: 'LatAm Telecom Fiber Backbone 2027 Unsecured High-Yield',
      country: 'Colombia',
      debtor_type: 'CORPORATE',
      face_value_usd: 15500000,
      asking_price_cents_on_dollar: 44.0,
      total_asking_price_usd: 6820000,
      accrued_interest_usd: 1240000,
      lma_lsta_standard: true,
      kyc_verified_buyer_only: true,
      success_fee_pct: 5.0,
      bids_count: 2,
      highest_bid_cents: 43.5
    }
  ];

  public getCases(): DefaultedDebtCase[] {
    return this.cases;
  }

  public getMarketplace(): DistressedMarketListing[] {
    return this.marketplaceListings;
  }

  public getRecoveryMetrics() {
    const totalFace = this.cases.reduce((sum, c) => sum + c.face_value_usd, 0);
    const totalEst = this.cases.reduce((sum, c) => sum + c.estimated_recovery_value_usd, 0);
    const avgRecoveryRate = totalFace > 0 ? (totalEst / totalFace) * 100 : 0;
    return {
      total_managed_face_value_usd: totalFace,
      total_projected_recovery_usd: totalEst,
      overall_recovery_rate_pct: parseFloat(avgRecoveryRate.toFixed(1)),
      active_cases_count: this.cases.length,
      marketplace_listings_count: this.marketplaceListings.length,
      standard_success_fee_pct: 5.0,
      compliance_standard: 'LMA & LSTA Distressed Trading / ICMA Sovereign CAC / UNCITRAL Model Law'
    };
  }

  public submitDebtClaim(claim: {
    debtor_name: string;
    debtor_type: 'SOVEREIGN' | 'STATE_OWNED_ENTERPRISE' | 'CORPORATE' | 'SUB_NATIONAL';
    country: string;
    face_value_usd: number;
    original_currency: string;
    maturity_year: number;
    coupon_rate_pct: number;
    governing_law: 'NEW_YORK' | 'ENGLISH_LAW' | 'OHADA_AFRICA' | 'SINGAPORE_ICMA';
    creditor_institution: string;
  }): DefaultedDebtCase {
    // Determine AI recovery pathway based on debtor type and governing law
    let pathway: 'RESTRUCTURE' | 'SECONDARY_SALE' | 'LITIGATION' | 'DEBT_FOR_NATURE_SWAP' = 'RESTRUCTURE';
    let targetPct = 65;
    let wbRating: 'SUSTAINABLE' | 'MODERATE' | 'HIGH_RISK_OF_DISTRESS' | 'IN_DEBT_DISTRESS' = 'IN_DEBT_DISTRESS';

    if (claim.debtor_type === 'CORPORATE') {
      if (claim.governing_law === 'NEW_YORK' || claim.governing_law === 'ENGLISH_LAW') {
        pathway = 'LITIGATION';
        targetPct = 78;
        wbRating = 'HIGH_RISK_OF_DISTRESS';
      } else {
        pathway = 'SECONDARY_SALE';
        targetPct = 52;
      }
    } else if (claim.debtor_type === 'SOVEREIGN') {
      if (claim.face_value_usd > 50000000) {
        pathway = 'DEBT_FOR_NATURE_SWAP';
        targetPct = 72;
      } else {
        pathway = 'RESTRUCTURE';
        targetPct = 62;
      }
    }

    const estRecovery = (claim.face_value_usd * targetPct) / 100;

    const newCase: DefaultedDebtCase = {
      id: `case-${Date.now().toString().slice(-6)}`,
      debtor_name: claim.debtor_name,
      debtor_type: claim.debtor_type,
      country: claim.country,
      face_value_usd: Number(claim.face_value_usd),
      original_currency: claim.original_currency || 'USD',
      maturity_year: Number(claim.maturity_year) || 2027,
      coupon_rate_pct: Number(claim.coupon_rate_pct) || 7.5,
      governing_law: claim.governing_law,
      creditor_institution: claim.creditor_institution,
      status: 'PENDING_TRIAGE',
      recovery_target_pct: targetPct,
      estimated_recovery_value_usd: estRecovery,
      created_at: new Date().toISOString(),
      world_bank_ids_risk_rating: wbRating,
      imf_article_iv_summary: `AI Audit for ${claim.country}: Macro debt burden cross-referenced with IMF Article IV monitor and Paris Club / Common Framework debt registries.`,
      recommended_pathway: pathway,
      pathway_reasoning: `AI Legal Engine recommends ${pathway.replace(/_/g, ' ')} under ${claim.governing_law} jurisdiction to maximize institutional net recovery.`,
      action_plan_steps: [
        'Institutional KYC verification of claimant entity',
        'Verification of original credit agreements, indentures, and proof of claim',
        `Initiation of ${pathway} protocol under ${claim.governing_law}`,
        'Drafting LMA/LSTA standard settlement assignment'
      ]
    };

    this.cases.unshift(newCase);
    return newCase;
  }
}

export const oskayiDebtCollectorService = new OskayiDebtCollectorService();
