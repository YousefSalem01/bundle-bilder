import { useState } from "react";
import { useTotals } from "../../store/selectors";
import { useBundleStore } from "../../store/bundleStore";
import { formatPrice } from "../../lib/format";
import { GuaranteeBadge } from "./GuaranteeBadge";

/** Financing, totals, savings, checkout and save-for-later. */
export function SummaryFooter() {
  const { total, compareTotal, savings, financingMonthly } = useTotals();
  const saveForLater = useBundleStore((s) => s.saveForLater);

  const [saved, setSaved] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const handleSave = () => {
    saveForLater();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mt-4">
      <div className="flex items-end justify-between gap-3">
        <GuaranteeBadge className="h-[72px] w-[72px] shrink-0" />
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">
            as low as {formatPrice(financingMonthly)}/mo
          </span>
          <div className="flex items-baseline gap-2">
            {savings > 0 && (
              <span className="text-base text-strike line-through">{formatPrice(compareTotal)}</span>
            )}
            <span className="font-display text-[28px] font-extrabold leading-none text-primary">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {savings > 0 && (
        <p className="mt-3 text-center text-sm font-medium text-savings">
          Congrats! You&apos;re saving {formatPrice(savings)} on your security bundle!
        </p>
      )}

      <button
        type="button"
        onClick={() => setCheckedOut(true)}
        className="mt-4 w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-strong cursor-pointer"
      >
        {checkedOut ? "✓ Order confirmed — thank you!" : "Checkout"}
      </button>

      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={handleSave}
          className="text-sm italic text-muted underline underline-offset-2 hover:text-ink cursor-pointer"
        >
          Save my system for later
        </button>
        {saved && <p className="mt-1 text-xs font-medium text-savings">✓ System saved — it&apos;ll be here when you return.</p>}
      </div>
    </div>
  );
}
