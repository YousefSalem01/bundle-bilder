import type { PriceUnit } from "../types/catalog";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** "$27.98" */
export function formatPrice(value: number): string {
  return currency.format(value);
}

/** "$27.98" or "$9.99/mo" depending on the price unit. */
export function formatPriceWithUnit(value: number, unit: PriceUnit): string {
  return unit === "mo" ? `${currency.format(value)}/mo` : currency.format(value);
}
