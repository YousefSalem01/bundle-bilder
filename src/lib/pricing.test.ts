import { describe, it, expect } from "vitest";
import { round2, lineTotal, lineCompareTotal, computeTotals } from "./pricing";
import { buildLineItems } from "./lineItems";
import { catalog } from "./catalog";
import type { LineItem, PriceUnit, Product } from "../types/catalog";

function makeLine(
  unitPrice: number,
  quantity: number,
  unitCompareAt?: number,
  priceUnit: PriceUnit = "once",
): LineItem {
  const product: Product = {
    id: "test",
    name: "Test",
    price: unitPrice,
    priceUnit,
    stepId: "cameras",
    reviewCategory: "cameras",
    variants: [],
  };
  return { key: "test", product, name: "Test", quantity, unitPrice, unitCompareAt, priceUnit };
}

describe("round2", () => {
  it("rounds to whole cents and avoids float drift", () => {
    expect(round2(0.1 + 0.2)).toBe(0.3);
    expect(round2(1.236)).toBe(1.24);
    expect(round2(1.234)).toBe(1.23);
  });
});

describe("line totals", () => {
  it("multiplies unit price by quantity", () => {
    expect(lineTotal(makeLine(23.99, 2))).toBe(47.98);
  });

  it("falls back to the active price when there is no compare-at", () => {
    expect(lineCompareTotal(makeLine(29.99, 2))).toBe(59.98);
  });

  it("uses the compare-at price when present", () => {
    expect(lineCompareTotal(makeLine(23.99, 2, 28.99))).toBe(57.98);
  });
});

describe("computeTotals", () => {
  it("sums totals, savings and derives financing", () => {
    const items = [makeLine(27.98, 1, 35.98), makeLine(0, 1, 29.92)];
    const totals = computeTotals(items, 10);
    expect(totals.total).toBe(27.98);
    expect(totals.compareTotal).toBe(65.9);
    expect(totals.savings).toBe(37.92);
    expect(totals.financingMonthly).toBe(2.8);
  });

  it("matches the design's headline figures for the seeded bundle", () => {
    const items = buildLineItems(catalog.seed.quantities);
    const totals = computeTotals(items, catalog.financingMonths);
    expect(totals.total).toBe(187.89);
    expect(totals.compareTotal).toBe(238.81);
    expect(totals.savings).toBe(50.92);
  });
});
