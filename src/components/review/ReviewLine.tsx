import type { LineItem } from "../../types/catalog";
import { useBundleStore, parseLineKey } from "../../store/bundleStore";
import { ProductImage } from "../ui/ProductImage";
import { QuantityStepper } from "../ui/QuantityStepper";
import { PriceTag } from "../ui/PriceTag";

interface ReviewLineProps {
  item: LineItem;
}

/** One line in the review panel: thumbnail, name, synced stepper, price. */
export function ReviewLine({ item }: ReviewLineProps) {
  const increment = useBundleStore((s) => s.increment);
  const decrement = useBundleStore((s) => s.decrement);

  const { productId, variantId } = parseLineKey(item.key);
  const isPlan = item.product.reviewCategory === "plan";

  return (
    <div className="flex items-center gap-[16px] h-[41px]">
      <div className="flex items-center gap-[12px] flex-1 min-w-0">
        {isPlan && item.name === "Cam Unlimited" ? (
          <>
            <img
              src={item.image}
              alt={item.name}
              className="h-[23.7px] w-[20px] shrink-0 object-contain"
            />
            <span className="min-w-0 flex-1 text-[16px] text-black leading-[100%] tracking-[-0.002em] font-display font-bold">
              Cam <span className="text-[#4E2FD2]">Unlimited</span>
            </span>
          </>
        ) : (
          <>
            <ProductImage
              src={item.image}
              alt={item.name}
              className="h-[41px] w-[41px] shrink-0 rounded-[5px] bg-white object-contain"
            />
            <span className="min-w-0 flex-1 text-[14px] text-[#0B0D10] font-medium leading-[16px] tracking-[0.005em]">
              {item.name}
            </span>
          </>
        )}
      </div>

      {!isPlan && (
        <div className="w-[72px] shrink-0 flex items-center">
          <QuantityStepper
            value={item.quantity}
            onIncrement={() => increment(productId, variantId)}
            onDecrement={() => decrement(productId, variantId)}
            disabled={item.required}
            size="sm"
            label={`${item.name} quantity`}
          />
        </div>
      )}

      <div className="w-[41px] shrink-0 text-right flex items-center justify-end">
        <PriceTag
          price={item.unitPrice * item.quantity}
          compareAt={item.unitCompareAt != null ? item.unitCompareAt * item.quantity : undefined}
          priceUnit={item.priceUnit}
          variant="review"
          size="sm"
        />
      </div>
    </div>
  );
}
