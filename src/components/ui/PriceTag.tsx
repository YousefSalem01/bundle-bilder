import type { PriceUnit } from "../../types/catalog";
import { formatPrice, formatPriceWithUnit } from "../../lib/format";

interface PriceTagProps {
  price: number;
  compareAt?: number;
  priceUnit?: PriceUnit;
  /** Card = red strike + dark price; review = grey strike + violet price. */
  variant?: "card" | "review";
  size?: "sm" | "md";
}

/** Struck-through compare-at price stacked above the active (or FREE) price. */
export function PriceTag({
  price,
  compareAt,
  priceUnit = "once",
  variant = "card",
  size = "md",
}: PriceTagProps) {
  const showCompare = compareAt != null && compareAt > price;
  const isFree = price === 0;

  const compareColor = variant === "card" ? "text-[#D8392B]" : "text-strike";
  const priceColor = variant === "card" ? "text-[#575757]" : "text-primary font-semibold";
  const priceSize = variant === "card" ? "text-[16px] tracking-[0.6px]" : (size === "md" ? "text-[15px]" : "text-sm");
  const compareSize = variant === "card" ? "text-[16px] tracking-[0.6px]" : "text-xs";

  return (
    <div className="flex flex-col items-end justify-center leading-tight gap-[3px] h-[35px]">
      {showCompare && (
        <span className={`${compareColor} ${compareSize} line-through`}>
          {formatPriceWithUnit(compareAt, priceUnit)}
        </span>
      )}
      <span className={`${priceColor} ${priceSize}`}>
        {isFree ? "FREE" : formatPriceWithUnit(price, priceUnit)}
      </span>
    </div>
  );
}

/** Inline single price (no compare), used where a plain figure is needed. */
export function InlinePrice({ price, priceUnit = "once" }: { price: number; priceUnit?: PriceUnit }) {
  return <span className="text-[15px] font-semibold text-ink">{formatPrice(price)}{priceUnit === "mo" ? "/mo" : ""}</span>;
}
