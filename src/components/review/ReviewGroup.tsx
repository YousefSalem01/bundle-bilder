import type { ReviewCategory, LineItem } from "../../types/catalog";
import { ReviewLine } from "./ReviewLine";

const CATEGORY_LABEL: Record<ReviewCategory, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
  plan: "plan",
};

interface ReviewGroupProps {
  category: ReviewCategory;
  items: LineItem[];
}

export function ReviewGroup({ category, items }: ReviewGroupProps) {
  return (
    <div className="border-t border-[#CED6DE] pt-[15px] pb-[4px] flex flex-col gap-[8px]">
      <h4 className="text-[12px] font-normal uppercase tracking-[0.03em] text-[#A8B2BD] leading-[16px]">
        {CATEGORY_LABEL[category]}
      </h4>
      <div className="flex flex-col gap-[12px]">
        {items.map((item) => (
          <ReviewLine key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}
