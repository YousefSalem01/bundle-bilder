import { useMemo } from "react";
import { useBundleStore } from "./bundleStore";
import { catalog, hasVariants, lineKey, productById } from "../lib/catalog";
import { buildLineItems } from "../lib/lineItems";
import { computeTotals, type Totals } from "../lib/pricing";
import type { LineItem, Product, ReviewCategory } from "../types/catalog";

/** All selected line items, recomputed when quantities change. */
export function useLineItems(): LineItem[] {
  const quantities = useBundleStore((s) => s.quantities);
  return useMemo(() => buildLineItems(quantities), [quantities]);
}

/** Selected line items grouped by review category, in a fixed display order. */
const CATEGORY_ORDER: ReviewCategory[] = ["cameras", "sensors", "accessories", "plan"];

export interface ReviewGroupData {
  category: ReviewCategory;
  items: LineItem[];
}

export function useReviewGroups(): ReviewGroupData[] {
  const items = useLineItems();
  return useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        items: items.filter((i) => i.product.reviewCategory === category),
      })).filter((g) => g.items.length > 0),
    [items],
  );
}

/** Grand totals + savings + financing, recomputed on any quantity change. */
export function useTotals(): Totals {
  const items = useLineItems();
  return useMemo(() => computeTotals(items, catalog.financingMonths), [items]);
}

/** Number of distinct products (not variants) with qty > 0 in a step. */
export function useStepSelectedCount(stepId: string): number {
  const quantities = useBundleStore((s) => s.quantities);
  return useMemo(() => {
    const step = catalog.steps.find((s) => s.id === stepId);
    if (!step) return 0;
    let count = 0;
    for (const productId of step.productIds) {
      const product = productById[productId];
      if (!product) continue;
      const selected = hasVariants(product)
        ? product.variants.some((v) => (quantities[lineKey(productId, v.id)] ?? 0) > 0)
        : (quantities[productId] ?? 0) > 0;
      if (selected) count += 1;
    }
    return count;
  }, [quantities, stepId]);
}

/**
 * Quantity bound to a product's card stepper: for variant products this tracks
 * the currently selected variant; otherwise the product's own quantity.
 */
export function useCardQuantity(product: Product): number {
  const activeVariantId = useBundleStore((s) => s.activeVariant[product.id]);
  return useBundleStore((s) => {
    const key = hasVariants(product) ? lineKey(product.id, activeVariantId) : product.id;
    return s.quantities[key] ?? 0;
  });
}
