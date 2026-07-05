import { useReviewGroups } from "../../store/selectors";
import { ReviewGroup } from "./ReviewGroup";
import { ShippingRow } from "./ShippingRow";
import { SummaryFooter } from "./SummaryFooter";

/** Right column: the live "Your security system" summary. */
export function ReviewPanel() {
  const groups = useReviewGroups();

  return (
    <aside className="rounded-[10px] bg-[#EDF4FF] pt-[20px] pb-[31px] px-[20px] flex flex-col gap-[10px] w-full lg:w-[390px] shrink-0">
      <p className="text-[12px] font-normal uppercase tracking-[1.6px] text-[#484848] leading-[100%]">Review</p>
      <h2 className="font-display text-[22px] font-semibold text-[#1F1F1F] leading-[100%] tracking-[0.6px]">Your security system</h2>
      <p className="text-[14px] leading-[130%] text-[#1F1F1F]/75 tracking-[0.6px]">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      <div className="flex flex-col gap-[10px]">
        {groups.length === 0 ? (
          <p className="border-t border-hairline/70 py-6 text-center text-sm text-muted">
            Your system is empty — add products on the left to get started.
          </p>
        ) : (
          groups.map((group) => (
            <ReviewGroup key={group.category} category={group.category} items={group.items} />
          ))
        )}
        <ShippingRow />
      </div>

      <SummaryFooter />
    </aside>
  );
}
