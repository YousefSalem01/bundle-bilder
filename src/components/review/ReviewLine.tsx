import type { LineItem } from "../../types/catalog";
import { useBundleStore, parseLineKey } from "../../store/bundleStore";
import { ProductImage } from "../ui/ProductImage";
import { QuantityStepper } from "../ui/QuantityStepper";
import { PriceTag } from "../ui/PriceTag";
import { SummaryRow } from "./SummaryRow";

interface ReviewLineProps {
  item: LineItem;
}

/** One line in the review panel: thumbnail, name, synced stepper, price. */
export function ReviewLine({ item }: ReviewLineProps) {
  const increment = useBundleStore((s) => s.increment);
  const decrement = useBundleStore((s) => s.decrement);

  const { productId, variantId } = parseLineKey(item.key);
  const isPlan = item.product.reviewCategory === "plan";

  // Plan names render two-tone (first word neutral, remainder in brand colour),
  // derived from the name itself rather than hard-coded to a specific product.
  const [planLead, ...planRest] = item.name.split(" ");

  const price = (
    <PriceTag
      price={item.unitPrice * item.quantity}
      compareAt={item.unitCompareAt != null ? item.unitCompareAt * item.quantity : undefined}
      priceUnit={item.priceUnit}
      variant="review"
      size="sm"
    />
  );

  if (isPlan) {
    return (
      <SummaryRow
        thumbnail={<ProductImage src={item.image} alt={item.name} className="h-[23.7px] w-[20px] shrink-0" />}
        label={
          <span className="min-w-0 flex-1 text-[16px] text-black leading-[100%] tracking-[-0.002em] font-display font-bold">
            {planLead} <span className="text-primary">{planRest.join(" ")}</span>
          </span>
        }
        price={price}
      />
    );
  }

  return (
    <SummaryRow
      thumbnail={<ProductImage src={item.image} alt={item.name} className="h-[41px] w-[41px] shrink-0 rounded-[5px] bg-white" />}
      label={
        <span className="min-w-0 flex-1 text-[14px] text-label font-medium leading-[16px] tracking-[0.005em]">
          {item.name}
        </span>
      }
      stepper={
        <QuantityStepper
          value={item.quantity}
          onIncrement={() => increment(productId, variantId)}
          onDecrement={() => decrement(productId, variantId)}
          disabled={item.required}
          size="sm"
          label={`${item.name} quantity`}
        />
      }
      price={price}
    />
  );
}
