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
    <div className="flex items-center gap-3 py-2.5">
      <ProductImage
        src={item.image}
        alt={item.name}
        className="h-9 w-9 shrink-0 rounded-md"
      />
      <span className="min-w-0 flex-1 truncate text-sm text-ink">{item.name}</span>

      {!isPlan && (
        <QuantityStepper
          value={item.quantity}
          onIncrement={() => increment(productId, variantId)}
          onDecrement={() => decrement(productId, variantId)}
          disabled={item.required}
          size="sm"
          label={`${item.name} quantity`}
        />
      )}

      <div className="w-[70px] text-right">
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
