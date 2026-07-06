import { useReviewGroups } from "../../store/selectors";
import { ReviewGroup } from "./ReviewGroup";
import { ShippingRow } from "./ShippingRow";
import { SummaryFooter } from "./SummaryFooter";

/** Right column: the live "Your security system" summary. */
export function ReviewPanel() {
  const groups = useReviewGroups();

  return (
    <aside className="rounded-[10px] bg-panel pt-5 pb-[31px] px-5 flex flex-col gap-2.5 w-full lg:w-[390px] tall-desktop:w-full tall-desktop:grid tall-desktop:grid-cols-[1fr_390px] tall-desktop:gap-[60px] tall-desktop:items-start shrink-0">
      <div className="flex flex-col w-full tall-desktop:col-start-1">
        <div className="flex flex-col gap-2.5">
          <p className="text-[12px] font-normal uppercase tracking-[1.6px] text-subtle leading-[100%]">Review</p>
          <h2 className="font-display text-[22px] font-semibold text-heading leading-[100%] tracking-[0.6px]">Your security system</h2>
          <p className="text-[14px] leading-[130%] text-heading/75 tracking-[0.6px]">
            Review your personalized protection system designed to keep what matters most safe.
          </p>

          <div className="flex flex-col gap-2.5">
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
        </div>
      </div>

      <div className="hidden lg:block tall-desktop:hidden h-[1px] bg-heading/10 w-full mt-2.5" />


      <div className="tall-desktop:col-start-2 tall-desktop:row-start-1">
        <SummaryFooter />
      </div>
    </aside>
  );
}
