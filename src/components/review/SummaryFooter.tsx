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
    <div className="flex flex-col gap-[10px] mt-[4px]">
      <div className="flex items-center justify-between gap-[8px] h-[78px]">
        <GuaranteeBadge className="h-[78px] w-[78px] shrink-0" />
        <div className="flex flex-col items-end justify-center gap-[8px] h-[78px]">
          <div className="flex items-center justify-center bg-[#4E2FD2] rounded-[3px] px-[8px] py-[5px] h-[18px]">
            <span className="text-[12px] font-medium text-white leading-[15px] tracking-[-0.05em] translate-y-[1px]">
              as low as {formatPrice(financingMonthly)}/mo
            </span>
          </div>
          <div className="flex items-baseline gap-[8px] h-[32px]">
            {savings > 0 && (
              <span className="text-[18px] text-[#6F7882] font-medium leading-[20px] tracking-[0.0025em] line-through">
                {formatPrice(compareTotal)}
              </span>
            )}
            <span className="font-display text-[24px] font-bold leading-[32px] text-[#4E2FD2] tracking-[-0.00125em]">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[4px] pt-[10px] min-h-[74px]">
        {savings > 0 && (
          <p className="w-full text-center text-[12px] font-semibold text-[#0AA288] leading-[100%] tracking-[-0.056px]">
            Congrats! You&apos;re saving {formatPrice(savings)} on your security bundle!
          </p>
        )}

        <button
          type="button"
          onClick={() => setCheckedOut(true)}
          className="mt-[4px] w-full rounded-[4px] bg-[#4E2FD2] py-[13px] px-[16px] h-[48px] flex items-center justify-center text-[17px] font-bold text-white transition-colors hover:bg-[#3D22A6] cursor-pointer"
        >
          <span className="leading-[22px] translate-y-[1px]">{checkedOut ? "✓ Order confirmed — thank you!" : "Checkout"}</span>
        </button>

        <div className="mt-[2px] w-full text-center">
          <button
            type="button"
            onClick={handleSave}
            className="text-[14px] italic text-[#484848] underline leading-[120%] tracking-[-0.016px] hover:text-[#0B0D10] cursor-pointer"
          >
            Save my system for later
          </button>
          {saved && <p className="mt-[4px] text-[12px] font-medium text-[#0AA288]">✓ System saved — it&apos;ll be here when you return.</p>}
        </div>
      </div>
    </div>
  );
}
