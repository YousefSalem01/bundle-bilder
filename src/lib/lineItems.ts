import { catalog, hasVariants, lineKey } from "./catalog";
import type { LineItem, Product, Variant } from "../types/catalog";

/** Resolve the active image for a product/variant, falling back to the product image. */
function resolveImage(product: Product, variant?: Variant): string | undefined {
  return variant?.image ?? product.image;
}

/**
 * Build every selected line (qty > 0) from a quantity map. Pure and
 * framework-free so it can be unit-tested and reused by the store selectors.
 *
 * When more than one variant of the same product is selected, the colour label
 * is appended so the lines stay distinguishable; a single selection stays clean.
 */
export function buildLineItems(quantities: Record<string, number>): LineItem[] {
  const items: LineItem[] = [];
  for (const product of catalog.products) {
    if (hasVariants(product)) {
      const selectedVariants = product.variants.filter(
        (v) => (quantities[lineKey(product.id, v.id)] ?? 0) > 0,
      );
      const disambiguate = selectedVariants.length > 1;
      for (const variant of selectedVariants) {
        const key = lineKey(product.id, variant.id);
        items.push({
          key,
          product,
          variant,
          name: disambiguate ? `${product.name} — ${variant.label}` : product.name,
          image: resolveImage(product, variant),
          quantity: quantities[key] ?? 0,
          unitPrice: product.price,
          unitCompareAt: product.compareAt,
          priceUnit: product.priceUnit,
          required: product.required,
        });
      }
    } else {
      const key = product.id;
      const quantity = quantities[key] ?? 0;
      if (quantity <= 0) continue;
      items.push({
        key,
        product,
        name: product.name,
        image: resolveImage(product),
        quantity,
        unitPrice: product.price,
        unitCompareAt: product.compareAt,
        priceUnit: product.priceUnit,
        required: product.required,
      });
    }
  }
  return items;
}
