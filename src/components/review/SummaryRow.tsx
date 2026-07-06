import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface SummaryRowProps {
  /** Leading thumbnail / icon. */
  thumbnail: ReactNode;
  /** Product or row label. */
  label: ReactNode;
  /** Optional quantity stepper column. */
  stepper?: ReactNode;
  /** Trailing price node. */
  price: ReactNode;
  /** Width of the trailing price column (Tailwind class). */
  priceColWidth?: string;
}

/**
 * Shared layout for a single review-panel row: thumbnail + label on the left,
 * an optional stepper, and a right-aligned price. Used by both product lines
 * and the shipping row so the row skeleton lives in one place.
 */
export function SummaryRow({ thumbnail, label, stepper, price, priceColWidth = "w-[41px]" }: SummaryRowProps) {
  return (
    <div className="flex items-center gap-4 h-[41px]">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {thumbnail}
        {label}
      </div>
      {stepper && <div className="w-[72px] shrink-0 flex items-center">{stepper}</div>}
      <div className={cn(priceColWidth, "shrink-0 text-right flex items-center justify-end")}>
        {price}
      </div>
    </div>
  );
}
