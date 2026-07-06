import type { Variant } from "../../types/catalog";
import { cn } from "../../lib/cn";

interface VariantSelectorProps {
  variants: Variant[];
  activeVariantId?: string;
  onSelect: (variantId: string) => void;
}

/** Row of colour chips; selecting one makes it the card's active variant. */
export function VariantSelector({ variants, activeVariantId, onSelect }: VariantSelectorProps) {
  return (
    <div className="flex gap-[6px]" role="radiogroup" aria-label="Colour">
      {variants.map((variant) => {
        const active = variant.id === activeVariantId;
        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(variant.id)}
            className={cn(
              "inline-flex shrink-0 items-center justify-center gap-1 rounded-[2px] border-[0.5px] py-px px-[3px] h-[26px] transition-colors cursor-pointer",
              active
                ? "border-savings bg-[#1DF0BB]/[0.04]"
                : "border-[#CCCCCC] bg-white hover:border-heading",
            )}
          >
            {variant.image ? (
              <img src={variant.image} alt="" className="h-[16px] w-[16px] object-contain rounded-[2px] shrink-0" />
            ) : (
              <span
                className="h-[12px] w-[12px] rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: variant.swatch }}
              />
            )}
            <span className="text-[10px] font-medium tracking-[0.6px] leading-[100%] text-heading shrink-0">{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
