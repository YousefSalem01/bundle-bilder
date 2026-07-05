import { catalog } from "../../lib/catalog";
import { Icon } from "../ui/Icon";
import { PriceTag } from "../ui/PriceTag";

/** Non-product shipping summary row (display only). */
export function ShippingRow() {
  const shipping = catalog.extras.find((e) => e.id === "fast-shipping");
  if (!shipping) return null;

  return (
    <div className="flex items-center gap-3 border-t border-hairline/70 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white text-primary">
        <Icon name={shipping.icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1 text-sm text-ink">{shipping.label}</span>
      <div className="w-[70px] text-right">
        <PriceTag price={shipping.price} compareAt={shipping.compareAt} variant="review" size="sm" />
      </div>
    </div>
  );
}
