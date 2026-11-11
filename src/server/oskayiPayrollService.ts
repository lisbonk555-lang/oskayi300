export interface PayrollEmployee {
  id: string;
  name: string;
  role: string;
  country: string;
  type: 'CONTRACTOR' | 'FULL_TIME_EMPLOYEE';
  salary_base_usd: number;
  local_currency: string;
  exchange_rate_to_usd: number;
  tax_statutory_deduction_pct: number;
  net_payout_local: number;
  last_paid_date: string;
  compliance_status: 'COMPLIANT' | 'MISCLASSIFICATION_RISK' | 'AUDIT_REQUIRED';
}

export interface TreasuryBalance {
  currency: 'USD' | 'EUR' | 'GBP';
  balance: number;
  allocated_to_payroll: number;
  available: number;
}

export class OskayiPayrollService {
  private treasury: TreasuryBalance[] = [
    { currency: 'USD', balance: 485000, allocated_to_payroll: 125000, available: 360000 },
    { currency: 'EUR', balance: 220000, allocated_to_payroll: 45000, available: 175000 },
    { currency: 'GBP', balance: 180000, allocated_to_payroll: 38000, available: 142000 }
  ];

  private employees: PayrollEmployee[] = [
    {
      id: 'emp-01',
      name: 'Kwame Asante',
      role: 'Lead Systems Architect',
      country: 'Ghana',
      type: 'FULL_TIME_EMPLOYEE',
      salary_base_usd: 5500,
      local_currency: 'GHS',
      exchange_rate_to_usd: 15.60,
      tax_statutory_deduction_pct: 17.5, // GRA PAYE + 5.5% Tier 1 SSNIT
      net_payout_local: 70785.00,
      last_paid_date: '2026-02-28',
      compliance_status: 'COMPLIANT'
    },
    {
      id: 'emp-02',
      name: 'Chioma Adebayo',
      role: 'Principal Mobile Engineer',
      country: 'Nigeria',
      type: 'FULL_TIME_EMPLOYEE',
      salary_base_usd: 5200,
      local_currency: 'NGN',
      exchange_rate_to_usd: 1490.0,
      tax_statutory_deduction_pct: 19.0, // FIRS PAYE + Pension Act
      net_payout_local: 6275840.0,
      last_paid_date: '2026-02-28',
      compliance_status: 'COMPLIANT'
    },
    {
      id: 'emp-03',
      name: 'Lucas Van Der Merwe',
      role: 'DevOps & Site Reliability',
      country: 'South Africa',
      type: 'CONTRACTOR',
      salary_base_usd: 4800,
      local_currency: 'ZAR',
      exchange_rate_to_usd: 18.25,
      tax_statutory_deduction_pct: 0, // Direct B2B invoice with W-8BEN equivalent
      net_payout_local: 87600.0,
      last_paid_date: '2026-02-28',
      compliance_status: 'COMPLIANT'
    },
    {
      id: 'emp-04',
      name: 'Elena Rostova',
      role: 'Senior Cryptography Analyst',
      country: 'United Kingdom',
      type: 'FULL_TIME_EMPLOYEE',
      salary_base_usd: 7500,
      local_currency: 'GBP',
      exchange_rate_to_usd: 0.79,
      tax_statutory_deduction_pct: 28.0, // HMRC PAYE + National Insurance Class 1
      net_payout_local: 4266.0,
      last_paid_date: '2026-02-28',
      compliance_status: 'COMPLIANT'
    },
    {
      id: 'emp-05',
      name: 'David Omondi',
      role: 'Growth Marketing Specialist',
      country: 'Kenya',
      type: 'CONTRACTOR',
      salary_base_usd: 3200,
      local_currency: 'KES',
      exchange_rate_to_usd: 129.5,
      tax_statutory_deduction_pct: 5.0, // KRA Withholding Tax 5% on Professional Services
      net_payout_local: 393680.0,
      last_paid_date: '2026-02-28',
      compliance_status: 'MISCLASSIFICATION_RISK'
    }
  ];

  public getTreasury() {
    return this.treasury;
  }

  public getEmployees(): PayrollEmployee[] {
    return this.employees;
  }

  public getOverview() {
    const totalPayrollUsd = this.employees.reduce((sum, e) => sum + e.salary_base_usd, 0);
    const contractorCount = this.employees.filter(e => e.type === 'CONTRACTOR').length;
    const employeeCount = this.employees.filter(e => e.type === 'FULL_TIME_EMPLOYEE').length;
    return {
      supported_countries: 100,
      active_headcount: this.employees.length,
      monthly_payroll_run_usd: totalPayrollUsd,
      contractor_count: contractorCount,
      employee_count: employeeCount,
      compliance_score_pct: 94.2,
      pricing_per_worker_monthly_usd: 10.00,
      fx_provider: 'ExchangeRate.host Institutional Feed (T+0 Wire Settlement)'
    };
  }

  public runComplianceAudit(params: {
    worker_name: string;
    country: string;
    hours_per_week: number;
    exclusive_working_relationship: boolean;
    company_provides_equipment: boolean;
    fixed_monthly_retainer: boolean;
  }) {
    // Audit algorithm based on IRS 20-factor test, UK IR35, and Ghana Labour Act (Act 651)
    let riskPoints = 0;
    const flags: string[] = [];

    if (params.hours_per_week >= 35) {
      riskPoints += 30;
      flags.push('Full-time schedule (>35 hrs/wk) strongly suggests employee status');
    }
    if (params.exclusive_working_relationship) {
      riskPoints += 25;
      flags.push('Exclusivity clause limits genuine independent contractor autonomy');
    }
    if (params.company_provides_equipment) {
      riskPoints += 20;
      flags.push('Company hardware provision triggers statutory employment presumption');
    }
    if (params.fixed_monthly_retainer) {
      riskPoints += 20;
      flags.push('Fixed periodic retainer rather than milestone invoice resembles salary');
    }

    const classification = riskPoints >= 50 ? 'FULL_TIME_EMPLOYEE' : 'CONTRACTOR';
    const auditStatus = riskPoints >= 70 ? 'HIGH_MISCLASSIFICATION_PENALTY_RISK' : riskPoints >= 40 ? 'MODERATE_EXPOSURE' : 'LOW_RISK_COMPLIANT';

    return {
      worker_name: params.worker_name,
      country: params.country,
      risk_score_0_to_100: riskPoints,
      recommended_classification: classification,
      audit_status: auditStatus,
      statutory_flags: flags,
      remediation_recommendation: riskPoints >= 50 
        ? `Transition ${params.worker_name} to Oskayi Employer of Record (EOR) in ${params.country} to withhold local taxes and avoid back-tax penalties.`
        : `Current contractor agreement is defensible under local commercial contract law.`
    };
  }

  public executePayrollBatch() {
    const timestamp = new Date().toISOString().split('T')[0];
    this.employees.forEach(e => {
      e.last_paid_date = timestamp;
    });
    return {
      success: true,
      batch_id: `PAY-BATCH-${Date.now().toString().slice(-6)}`,
      timestamp,
      total_workers_paid: this.employees.length,
      status: 'EXECUTED_VIA_LOCAL_CLEARING_ACH_SEPA_GHIPSS'
    };
  }
}

export const oskayiPayrollService = new OskayiPayrollService();
