/** Category used to group line items in the review panel. */
export type ReviewCategory = "cameras" | "sensors" | "accessories" | "plan";

/** How a price should be read: a one-off charge or a monthly subscription. */
export type PriceUnit = "once" | "mo";

/** Icon keys rendered by the shared <Icon> component (inline SVG). */
export type IconKey = "camera" | "shield" | "sensor" | "grid" | "truck" | "plan";

export interface Variant {
  id: string;
  label: string;
  /** CSS colour for the swatch dot. */
  swatch: string;
  /** Optional product image for this variant, served from /public. */
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  learnMoreUrl?: string;
  /** Optional discount badge text, e.g. "Save 22%". */
  badge?: string;
  /** Active unit price. */
  price: number;
  /** Optional struck-through "compare at" unit price. */
  compareAt?: number;
  priceUnit: PriceUnit;
  /** Which accordion step this product belongs to. */
  stepId: string;
  /** Which review-panel group this product appears under. */
  reviewCategory: ReviewCategory;
  /** Required items (e.g. the hub) are always included; their stepper is locked. */
  required?: boolean;
  /** Fallback image when a product has no variants (or variants lack images). */
  image?: string;
  variants: Variant[];
}

export interface Step {
  id: string;
  index: number;
  title: string;
  icon: IconKey;
  /** Ordered product ids rendered inside this step. */
  productIds: string[];
}

/** A non-product summary row (e.g. Fast Shipping). */
export interface ExtraRow {
  id: string;
  label: string;
  icon: IconKey;
  price: number;
  compareAt?: number;
}

export interface SeedState {
  quantities: Record<string, number>;
  activeVariant: Record<string, string>;
  openStepId: string;
}

export interface Catalog {
  steps: Step[];
  products: Product[];
  extras: ExtraRow[];
  /** Financing term (months) used to derive the "as low as $X/mo" line. */
  financingMonths: number;
  seed: SeedState;
}

/** A resolved line shown in the review panel. */
export interface LineItem {
  /** `${productId}` or `${productId}:${variantId}`. */
  key: string;
  product: Product;
  variant?: Variant;
  name: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  unitCompareAt?: number;
  priceUnit: PriceUnit;
  required?: boolean;
}
