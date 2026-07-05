import catalogJson from "../data/catalog.json";
import type { Catalog, Product } from "../types/catalog";

export const catalog = catalogJson as Catalog;

/** Fast lookup of a product by id. */
export const productById: Record<string, Product> = Object.fromEntries(
  catalog.products.map((p) => [p.id, p]),
);

/** True when a product exposes a variant selector. */
export function hasVariants(product: Product): boolean {
  return product.variants.length > 0;
}

/**
 * Stable key for a (product, variant) selection used across the store and the
 * review panel. Variant-less products key on their id alone.
 */
export function lineKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}:${variantId}` : productId;
}

/** Inverse of {@link lineKey}. */
export function parseLineKey(key: string): { productId: string; variantId?: string } {
  const idx = key.indexOf(":");
  if (idx === -1) return { productId: key };
  return { productId: key.slice(0, idx), variantId: key.slice(idx + 1) };
}
