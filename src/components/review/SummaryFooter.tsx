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
    <div className="flex flex-col gap-2.5 mt-1">
      <div className="hidden tall-desktop:flex items-center gap-4 mb-4">
        <GuaranteeBadge className="h-[80px] w-[80px] shrink-0" />
        <div className="flex flex-col gap-1">
          <span className="font-display text-[16px] font-semibold text-heading leading-[100%]">30-day hassle-free returns</span>
          <span className="text-[14px] text-heading/75 leading-[130%]">If you're not totally in love with the product, we will refund you 100%.</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 h-[78px] tall-desktop:h-auto tall-desktop:pt-2">
        <GuaranteeBadge className="h-[78px] w-[78px] shrink-0 tall-desktop:hidden" />
        <div className="flex flex-col items-end justify-center gap-2 h-[78px] tall-desktop:flex-row tall-desktop:items-center tall-desktop:justify-between tall-desktop:w-full tall-desktop:h-auto">
          <div className="flex items-center justify-center bg-primary rounded-[3px] px-2 py-[5px] h-[18px]">
            <span className="text-[12px] font-medium text-white leading-[15px] tracking-[-0.05em] translate-y-[1px]">
              as low as {formatPrice(financingMonthly)}/mo
            </span>
          </div>
          <div className="flex items-baseline gap-2 h-[32px] tall-desktop:h-auto">
            {savings > 0 && (
              <span className="text-[18px] text-[#6F7882] font-medium leading-[20px] tracking-[0.0025em] line-through">
                {formatPrice(compareTotal)}
              </span>
            )}
            <span className="font-display text-[24px] font-bold leading-[32px] text-primary tracking-[-0.00125em]">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-2.5 min-h-[74px]">
        {savings > 0 && (
          <p className="w-full text-center text-[12px] font-semibold text-savings leading-[100%] tracking-[-0.056px]">
            Congrats! You&apos;re saving {formatPrice(savings)} on your security bundle!
          </p>
        )}

        <button
          type="button"
          onClick={() => setCheckedOut(true)}
          className="mt-1 w-full rounded-[4px] bg-primary py-[13px] px-4 h-[48px] flex items-center justify-center text-[17px] font-bold text-white transition-colors hover:bg-primary-strong cursor-pointer"
        >
          <span className="leading-[22px] translate-y-[1px]">{checkedOut ? "✓ Order confirmed — thank you!" : "Checkout"}</span>
        </button>

        <div className="mt-0.5 w-full text-center">
          <button
            type="button"
            onClick={handleSave}
            className="text-[14px] italic text-subtle underline leading-[120%] tracking-[-0.016px] hover:text-label cursor-pointer"
          >
            Save my system for later
          </button>
          {saved && <p className="mt-1 text-[12px] font-medium text-savings">✓ System saved — it&apos;ll be here when you return.</p>}
        </div>
      </div>
    </div>
  );
}
