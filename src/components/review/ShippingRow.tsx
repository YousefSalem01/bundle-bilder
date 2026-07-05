import { catalog } from "../../lib/catalog";
import { Icon } from "../ui/Icon";
import { PriceTag } from "../ui/PriceTag";

/** Non-product shipping summary row (display only). */
export function ShippingRow() {
  const shipping = catalog.extras.find((e) => e.id === "fast-shipping");
  if (!shipping) return null;

  return (
    <div className="border-t border-[#CED6DE] pt-[15px] pb-[4px]">
      <div className="flex items-center gap-[16px] h-[41px]">
        <div className="flex items-center gap-[12px] flex-1 min-w-0">
          <span className="grid h-[41px] w-[41px] shrink-0 place-items-center rounded-[5px] bg-white text-[#0AA288]">
            <Icon name={shipping.icon} className="h-[29px] w-[29px]" />
          </span>
          <span className="min-w-0 flex-1 text-[14px] text-[#0B0D10] font-medium leading-[16px] tracking-[0.005em]">
            {shipping.label}
          </span>
        </div>
        <div className="w-[33px] shrink-0 text-right flex items-center justify-end">
          <PriceTag price={shipping.price} compareAt={shipping.compareAt} variant="review" size="sm" />
        </div>
      </div>
    </div>
  );
}
