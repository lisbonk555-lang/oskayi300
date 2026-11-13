import { jsPDF } from "jspdf";
import type { GeneratedHousePlan, SmartCityPlanResult } from "../server/oskayiSuiteService";

function addOskayiPdfFooter(doc: jsPDF) {
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setDrawColor(197, 155, 39);
  doc.line(14, pageHeight - 22, 196, pageHeight - 22);
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "OSKAYI CONSULT | Reg: BN248851025 | TIN: P0000590118 | Registration of Business Names Act, 1962 (Act 151)",
    14,
    pageHeight - 16
  );
  doc.text(
    "McCarthy Hill, Accra, Ghana | info@oskayi.com | +233 24 490 5505 | All values denominated in USD ($)",
    14,
    pageHeight - 11
  );
}

export function downloadHousePlanPdf(plan: GeneratedHousePlan) {
  const doc = new jsPDF();
  doc.setFillColor(197, 155, 39);
  doc.rect(0, 0, 210, 24, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("OSKAYI HOUSE GENERATED — ARCHITECTURAL DOSSIER", 14, 15);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.text(plan.title, 14, 36);

  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Plan ID: ${plan.id}   |   Configuration: ${plan.rooms} Bedrooms (${plan.isDuplex ? "Duplex" : "Single-Level"})`, 14, 44);
  doc.text(`Plot Area: ${plan.plotSizeSqft.toLocaleString()} sq.ft   |   Built-Up Area: ${plan.builtAreaSqft.toLocaleString()} sq.ft`, 14, 51);
  doc.text(`Target Budget: $${plan.budgetUsd.toLocaleString()} USD   |   Estimated Cost: $${plan.estimatedCostUsd.toLocaleString()} USD`, 14, 58);

  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("Room Allocation Schedule", 14, 72);
  let y = 80;
  doc.setFontSize(9);
  plan.roomLayout.forEach((r) => {
    doc.text(`- ${r.name}: ${r.dimensionsFt} (${r.areaSqft} sq.ft)`, 18, y);
    y += 6;
  });

  y += 6;
  doc.setFontSize(11);
  doc.text("Bill of Quantities (BOQ) Summary (USD)", 14, y);
  y += 8;
  doc.setFontSize(9);
  plan.boq.forEach((item) => {
    if (y > 255) {
      addOskayiPdfFooter(doc);
      doc.addPage();
      y = 20;
    }
    doc.text(`${item.category}: ${item.item}`, 14, y);
    doc.text(`${item.quantity} — $${item.totalUsd.toLocaleString()} USD`, 140, y);
    y += 7;
  });

  y += 6;
  doc.setFontSize(11);
  doc.setTextColor(161, 98, 7);
  doc.text(`TOTAL ESTIMATED CONSTRUCTION COST: $${plan.estimatedCostUsd.toLocaleString()} USD`, 14, y);

  addOskayiPdfFooter(doc);
  doc.save(`${plan.id}-Oskayi-House-Plan.pdf`);
}

export function downloadCostKillerPdf(report: {
  auditId: string;
  totalQuotedUsd: number;
  totalCheapestUsd: number;
  totalSavingsUsd: number;
  savingsPct: number;
  lineComparisons: any[];
}) {
  const doc = new jsPDF();
  doc.setFillColor(185, 28, 28);
  doc.rect(0, 0, 210, 24, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("OSKAYI HOUSE COST KILLER — PROCUREMENT SAVINGS REPORT", 14, 15);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text(`Audit Reference: ${report.auditId}`, 14, 36);
  doc.setFontSize(10);
  doc.text(`Market / Contractor Quote: $${report.totalQuotedUsd.toLocaleString()} USD`, 14, 44);
  doc.text(`Cheapest Verified Direct Supplier Total: $${report.totalCheapestUsd.toLocaleString()} USD`, 14, 51);

  doc.setTextColor(185, 28, 28);
  doc.setFontSize(13);
  doc.text(`TOTAL SAVINGS IDENTIFIED: $${report.totalSavingsUsd.toLocaleString()} USD (${report.savingsPct}%)`, 14, 62);

  let y = 76;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.text("Material & Verified Cheapest Supplier Breakdown", 14, y);
  y += 8;
  doc.setFontSize(8.5);
  report.lineComparisons.forEach((line) => {
    if (y > 255) {
      addOskayiPdfFooter(doc);
      doc.addPage();
      y = 20;
    }
    doc.text(`${line.materialName} (${line.quantity} ${line.unit})`, 14, y);
    doc.text(`Market: $${line.quotedTotalUsd} -> Best: $${line.cheapestTotalUsd} (Save $${line.savingsUsd})`, 14, y + 4.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Supplier: ${line.cheapestSupplierName} (${line.supplierLocation})`, 14, y + 9);
    doc.setTextColor(15, 23, 42);
    y += 16;
  });

  addOskayiPdfFooter(doc);
  doc.save(`${report.auditId}-Oskayi-Cost-Killer-Savings.pdf`);
}

export function downloadRenovationQuotePdf(data: {
  planId: string;
  selectedDesign: {
    title: string;
    estimatedCostUsd: number;
    projectedValueUsd: number;
    durationWeeks: number;
    scopeSummary: string;
  };
  contractors: any[];
}) {
  const doc = new jsPDF();
  doc.setFillColor(17, 24, 39);
  doc.rect(0, 0, 210, 24, "F");
  doc.setTextColor(234, 179, 8);
  doc.setFontSize(15);
  doc.text("OSKAYI BEFORE & AFTER RENOVATION — OFFICIAL QUOTE", 14, 15);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text(`Quote ID: ${data.planId}`, 14, 36);
  doc.text(data.selectedDesign.title, 14, 44);

  doc.setFontSize(10);
  doc.text(`Renovation Investment: $${data.selectedDesign.estimatedCostUsd.toLocaleString()} USD`, 14, 54);
  doc.text(`Projected Post-Renovation Valuation: $${data.selectedDesign.projectedValueUsd.toLocaleString()} USD`, 14, 61);
  doc.text(`Execution Timeline: ${data.selectedDesign.durationWeeks} Weeks`, 14, 68);

  doc.setFontSize(9);
  const splitScope = doc.splitTextToSize(`Scope of Works: ${data.selectedDesign.scopeSummary}`, 180);
  doc.text(splitScope, 14, 78);

  let y = 104;
  doc.setFontSize(11);
  doc.text("Pre-Vetted Specialist Contractors", 14, y);
  y += 8;
  doc.setFontSize(9);
  data.contractors.forEach((c) => {
    doc.text(`- ${c.name} | ${c.specialty} | License: ${c.verifiedLicense} | ${c.contactEmail}`, 14, y);
    y += 7;
  });

  addOskayiPdfFooter(doc);
  doc.save(`${data.planId}-Oskayi-Renovation-Quote.pdf`);
}

export function downloadSmartCityPdf(plan: SmartCityPlanResult) {
  const doc = new jsPDF();
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, 210, 24, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.text("OSKAYI SMART CITY PLANNER — MUNICIPAL MASTER PLAN DOSSIER", 14, 15);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text(`Master Plan ID: ${plan.id}  |  Total Land Area: ${plan.landAcres} Acres (${plan.landSqm.toLocaleString()} sqm)`, 14, 36);

  doc.setFontSize(10);
  doc.text(`Serviced Residential Plots: ${plan.residentialPlotsCount}  |  Commercial Hubs: ${plan.commercialPlotsCount}`, 14, 46);
  doc.text(`Road Network: ${plan.roadNetworkKm} km  |  Storm Drainage Channels: ${plan.drainageChannelsKm} km`, 14, 53);
  doc.text(`Civic Facilities: ${plan.schoolsCount} School(s), ${plan.hospitalsCount} Hospital(s), ${plan.marketsCount} Market(s)`, 14, 60);
  doc.text(`Clean Energy Grid: ${plan.solarGridMw} MW Microgrid Solar Array`, 14, 67);
  doc.text(`Estimated Civil Infrastructure Budget: $${plan.estimatedInfraCostUsd.toLocaleString()} USD`, 14, 74);

  let y = 88;
  doc.setFontSize(11);
  doc.text("Statutory Zoning & Land Use Schedule", 14, y);
  y += 8;
  doc.setFontSize(9);
  plan.zoningBlocks.forEach((b) => {
    doc.text(`${b.zone} (${b.allocationPct}% / ${b.acres} Acres): ${b.details}`, 14, y);
    y += 7;
  });

  y += 8;
  const splitSummary = doc.splitTextToSize(`Approval Compliance Note: ${plan.approvalReadinessSummary}`, 180);
  doc.text(splitSummary, 14, y);

  addOskayiPdfFooter(doc);
  doc.save(`${plan.id}-Smart-City-Master-Plan.pdf`);
}
