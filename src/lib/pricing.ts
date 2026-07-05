import type { LineItem } from "../types/catalog";

/** Round to whole cents to avoid floating-point drift in sums. */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Active price for a single line: unit price × quantity. */
export function lineTotal(item: LineItem): number {
  return round2(item.unitPrice * item.quantity);
}

/** "Compare at" price for a single line (falls back to the active price). */
export function lineCompareTotal(item: LineItem): number {
  const unit = item.unitCompareAt ?? item.unitPrice;
  return round2(unit * item.quantity);
}

export interface Totals {
  /** Discounted grand total. */
  total: number;
  /** Pre-discount grand total (struck through in the UI). */
  compareTotal: number;
  /** compareTotal − total. */
  savings: number;
  /** Derived "as low as $X/mo" financing figure. */
  financingMonthly: number;
}

/**
 * Totals are derived purely from the selected line items. Display-only extras
 * (e.g. free shipping) are intentionally excluded from the total and savings,
 * matching the design's headline figures.
 */
export function computeTotals(items: LineItem[], financingMonths: number): Totals {
  let total = 0;
  let compareTotal = 0;
  for (const item of items) {
    total += lineTotal(item);
    compareTotal += lineCompareTotal(item);
  }
  total = round2(total);
  compareTotal = round2(compareTotal);
  return {
    total,
    compareTotal,
    savings: round2(compareTotal - total),
    financingMonthly: round2(financingMonths > 0 ? total / financingMonths : total),
  };
}
