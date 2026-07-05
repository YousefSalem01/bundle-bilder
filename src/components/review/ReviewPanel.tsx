import { useReviewGroups } from "../../store/selectors";
import { ReviewGroup } from "./ReviewGroup";
import { ShippingRow } from "./ShippingRow";
import { SummaryFooter } from "./SummaryFooter";

/** Right column: the live "Your security system" summary. */
export function ReviewPanel() {
  const groups = useReviewGroups();

  return (
    <aside className="rounded-2xl bg-panel p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Review</p>
      <h2 className="mt-1 font-display text-2xl font-bold text-ink">Your security system</h2>
      <p className="mt-1 text-sm leading-snug text-muted">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      <div className="mt-3">
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
