import { catalog } from "../../lib/catalog";
import { Icon } from "../ui/Icon";
import { PriceTag } from "../ui/PriceTag";
import { SummaryRow } from "./SummaryRow";

/** Non-product shipping summary row (display only). */
export function ShippingRow() {
  const shipping = catalog.extras.find((e) => e.id === "fast-shipping");
  if (!shipping) return null;

  return (
    <div className="border-t border-divider pt-[15px] pb-1">
      <SummaryRow
        thumbnail={
          <span className="grid h-[41px] w-[41px] shrink-0 place-items-center rounded-[5px] bg-white text-savings">
            <Icon name={shipping.icon} className="h-[29px] w-[29px]" />
          </span>
        }
        label={
          <span className="min-w-0 flex-1 text-[14px] text-label font-medium leading-[16px] tracking-[0.005em]">
            {shipping.label}
          </span>
        }
        price={<PriceTag price={shipping.price} compareAt={shipping.compareAt} variant="review" size="sm" />}
        priceColWidth="w-[33px]"
      />
    </div>
  );
}
