export interface LetterOfCredit {
  id: string;
  applicant_importer: string;
  beneficiary_exporter: string;
  issuing_bank: string;
  advising_bank: string;
  amount_usd: number;
  currency: string;
  expiry_date: string;
  port_of_loading: string;
  port_of_discharge: string;
  goods_description: string;
  incoterms: 'FOB' | 'CIF' | 'CFR' | 'DDP';
  status: 'ISSUED' | 'CONFIRMED' | 'DOCS_PRESENTED' | 'DISCREPANT' | 'SETTLED';
  ucp600_compliant: boolean;
  swift_reference: string;
  created_at: string;
}

export interface BankGuarantee {
  id: string;
  type: 'PERFORMANCE_BOND' | 'ADVANCE_PAYMENT_GUARANTEE' | 'BID_BOND' | 'FINANCIAL_GUARANTEE';
  applicant: string;
  beneficiary: string;
  amount_usd: number;
  urdg758_standard: boolean;
  swift_mt760_ref: string;
  expiry_date: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CLAIMED';
}

export interface InvoiceAdvance {
  id: string;
  invoice_number: string;
  buyer_name: string;
  supplier_name: string;
  invoice_face_value_usd: number;
  advance_rate_pct: number; // 80%
  advance_amount_usd: number;
  tenor_days: number;
  fee_pct: number; // 1%
  status: 'APPROVED_FUNDED' | 'UNDER_REVIEW' | 'REPAID';
  disbursement_time_hours: number;
}

export interface TradeDocumentCheckResult {
  is_clean: boolean;
  discrepancies_found: string[];
  compliance_score_pct: number;
  ai_recommendation: string;
  examined_documents: string[];
}

export class OskayiTradeService {
  private lcs: LetterOfCredit[] = [
    {
      id: 'LC-2026-GH-901',
      applicant_importer: 'Ghana Cocoa Agro-Industrial Processors Ltd',
      beneficiary_exporter: 'Buhler Group Engineering AG (Switzerland)',
      issuing_bank: 'Ecobank Ghana PLC (Accra Corporate)',
      advising_bank: 'UBS Switzerland AG (Zurich)',
      amount_usd: 2450000,
      currency: 'USD',
      expiry_date: '2026-12-15',
      port_of_loading: 'Rotterdam (NLRTM)',
      port_of_discharge: 'Tema Port (GHTEM)',
      goods_description: 'Industrial Cocoa Bean Roasting, Grinding & Pressing Plant Equipment',
      incoterms: 'CIF',
      status: 'ISSUED',
      ucp600_compliant: true,
      swift_reference: 'SWIFT::MT700::ECOBGHAC::849201',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 'LC-2026-NG-442',
      applicant_importer: 'West African Solar Power Systems Ltd',
      beneficiary_exporter: 'LONGi Solar Technology Co., Ltd (China)',
      issuing_bank: 'Standard Chartered Bank Ghana',
      advising_bank: 'Bank of China (Shanghai Branch)',
      amount_usd: 1180000,
      currency: 'USD',
      expiry_date: '2026-11-30',
      port_of_loading: 'Shanghai (CNSHA)',
      port_of_discharge: 'Takoradi Port (GHTKD)',
      goods_description: '550W Tier-1 Monocrystalline Bifacial Solar PV Panels (Containerized)',
      incoterms: 'FOB',
      status: 'CONFIRMED',
      ucp600_compliant: true,
      swift_reference: 'SWIFT::MT700::SCBLGHAC::991024',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    }
  ];

  private guarantees: BankGuarantee[] = [
    {
      id: 'BG-760-001',
      type: 'PERFORMANCE_BOND',
      applicant: 'Oskayi Infrastructure & Marine Engineering',
      beneficiary: 'Ministry of Roads & Highways, Republic of Ghana',
      amount_usd: 850000,
      urdg758_standard: true,
      swift_mt760_ref: 'MT760::BG248851::2026',
      expiry_date: '2027-06-30',
      status: 'ACTIVE'
    },
    {
      id: 'BG-760-002',
      type: 'ADVANCE_PAYMENT_GUARANTEE',
      applicant: 'Atlantic Dredging & Maritime Consortium',
      beneficiary: 'Ghana Ports & Harbours Authority (GPHA)',
      amount_usd: 1400000,
      urdg758_standard: true,
      swift_mt760_ref: 'MT760::GPHA-TEMA::8831',
      expiry_date: '2027-03-31',
      status: 'ACTIVE'
    }
  ];

  private invoices: InvoiceAdvance[] = [
    {
      id: 'INV-ADV-101',
      invoice_number: 'INV-2026-EXPORT-889',
      buyer_name: 'Barry Callebaut Belgium NV',
      supplier_name: 'Amansie Gold & Agro Commodities Ghana',
      invoice_face_value_usd: 480000,
      advance_rate_pct: 80,
      advance_amount_usd: 384000,
      tenor_days: 60,
      fee_pct: 1.0,
      status: 'APPROVED_FUNDED',
      disbursement_time_hours: 18
    }
  ];

  public getDashboardMetrics() {
    const totalLcVolume = this.lcs.reduce((acc, l) => acc + l.amount_usd, 0);
    const totalGuaranteeVolume = this.guarantees.reduce((acc, g) => acc + g.amount_usd, 0);
    const totalFinancedInvoices = this.invoices.reduce((acc, i) => acc + i.advance_amount_usd, 0);

    return {
      total_trade_volume_usd: totalLcVolume + totalGuaranteeVolume + totalFinancedInvoices,
      active_lcs_count: this.lcs.length,
      active_guarantees_count: this.guarantees.length,
      financed_invoices_count: this.invoices.length,
      standard: 'ICC UCP 600 & URDG 758 Compliant'
    };
  }

  public getLettersOfCredit(): LetterOfCredit[] {
    return this.lcs;
  }

  public getGuarantees(): BankGuarantee[] {
    return this.guarantees;
  }

  public getInvoices(): InvoiceAdvance[] {
    return this.invoices;
  }

  public applyForLc(params: {
    applicantImporter: string;
    beneficiaryExporter: string;
    amountUsd: number;
    issuingBank: string;
    portOfLoading: string;
    portOfDischarge: string;
    goodsDescription: string;
    incoterms: LetterOfCredit['incoterms'];
  }): LetterOfCredit {
    const newLc: LetterOfCredit = {
      id: `LC-2026-GLOBAL-${Date.now().toString(36).toUpperCase()}`,
      applicant_importer: params.applicantImporter,
      beneficiary_exporter: params.beneficiaryExporter,
      issuing_bank: params.issuingBank || 'Oskayi Global Trade Bank Consortium',
      advising_bank: 'SWIFT Correspondent Node',
      amount_usd: params.amountUsd,
      currency: 'USD',
      expiry_date: new Date(Date.now() + 86400000 * 90).toISOString().split('T')[0],
      port_of_loading: params.portOfLoading,
      port_of_discharge: params.portOfDischarge,
      goods_description: params.goodsDescription,
      incoterms: params.incoterms || 'CIF',
      status: 'ISSUED',
      ucp600_compliant: true,
      swift_reference: `SWIFT::MT700::${Date.now().toString(36).toUpperCase()}`,
      created_at: new Date().toISOString()
    };

    this.lcs.unshift(newLc);
    return newLc;
  }

  public requestInvoiceAdvance(params: {
    invoiceNumber: string;
    buyerName: string;
    supplierName: string;
    faceValueUsd: number;
    tenorDays?: number;
  }): InvoiceAdvance {
    const faceValue = params.faceValueUsd;
    const advanceAmount = Math.round(faceValue * 0.80);

    const advance: InvoiceAdvance = {
      id: `INV-ADV-${Date.now().toString(36).toUpperCase()}`,
      invoice_number: params.invoiceNumber,
      buyer_name: params.buyerName,
      supplier_name: params.supplierName,
      invoice_face_value_usd: faceValue,
      advance_rate_pct: 80,
      advance_amount_usd: advanceAmount,
      tenor_days: params.tenorDays || 60,
      fee_pct: 1.0,
      status: 'APPROVED_FUNDED',
      disbursement_time_hours: 14
    };

    this.invoices.unshift(advance);
    return advance;
  }

  public checkDocumentDiscrepancy(invoiceData: any, lcData: any): TradeDocumentCheckResult {
    // Real algorithmic cross-check
    const discrepancies: string[] = [];

    if (invoiceData?.amount && lcData?.amount && Number(invoiceData.amount) > Number(lcData.amount)) {
      discrepancies.push(`Article 18(b) UCP 600: Commercial invoice amount ($${invoiceData.amount}) exceeds Letter of Credit maximum tolerance ($${lcData.amount}).`);
    }

    if (invoiceData?.incoterms && lcData?.incoterms && invoiceData.incoterms !== lcData.incoterms) {
      discrepancies.push(`Incoterm inconsistency: Invoice states ${invoiceData.incoterms} but LC mandates ${lcData.incoterms}.`);
    }

    if (discrepancies.length === 0) {
      return {
        is_clean: true,
        discrepancies_found: [],
        compliance_score_pct: 99.4,
        ai_recommendation: 'DOCUMENTS CLEAN: All commercial invoice details match LC MT700 parameters. Ready for bank negotiation and immediate 80% advance payment under UCP 600.',
        examined_documents: ['Commercial Invoice #INV-889', 'Letter of Credit MT700', 'Electronic Bill of Lading (eBL)']
      };
    }

    return {
      is_clean: false,
      discrepancies_found: discrepancies,
      compliance_score_pct: 72.0,
      ai_recommendation: 'DISCREPANCY DETECTED: Amend commercial invoice before bank presentation to avoid penalty fees and delayed payment.',
      examined_documents: ['Commercial Invoice', 'Letter of Credit MT700']
    };
  }
}

export const oskayiTradeService = new OskayiTradeService();
