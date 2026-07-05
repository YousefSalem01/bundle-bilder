import type { ReviewCategory, LineItem } from "../../types/catalog";
import { ReviewLine } from "./ReviewLine";

const CATEGORY_LABEL: Record<ReviewCategory, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
  plan: "Home monitoring plan",
};

interface ReviewGroupProps {
  category: ReviewCategory;
  items: LineItem[];
}

export function ReviewGroup({ category, items }: ReviewGroupProps) {
  return (
    <div className="border-t border-hairline/70 py-3">
      <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
        {CATEGORY_LABEL[category]}
      </h4>
      <div className="divide-y divide-hairline/50">
        {items.map((item) => (
          <ReviewLine key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}
