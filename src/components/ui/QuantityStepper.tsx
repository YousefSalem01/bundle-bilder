interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  /** Locks the whole control (e.g. required products). */
  disabled?: boolean;
  size?: "sm" | "md";
  label?: string;
}

/** Shared −/+ quantity control used by product cards and review lines. */
export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  disabled = false,
  size = "md",
  label = "Quantity",
}: QuantityStepperProps) {
  const minusDisabled = disabled || value <= 0;
  const number = size === "md" ? "w-[12px] text-[16px]" : "w-[10px] text-[14px]";

  const buttonMinusClass = (isDisabled: boolean) =>
    [
      "grid place-items-center rounded-[4px] border-2 border-[#E6EBF0] bg-white leading-none select-none transition-colors h-[20px] w-[20px] text-[12px]",
      isDisabled
        ? "text-neutral-300 cursor-not-allowed"
        : "text-ink hover:border-primary hover:text-primary cursor-pointer",
    ].join(" ");

  const buttonPlusClass = (isDisabled: boolean) =>
    [
      "grid place-items-center rounded-[4px] bg-[#F0F4F7] leading-none select-none transition-colors h-[20px] w-[20px] text-[12px]",
      isDisabled
        ? "text-neutral-300 cursor-not-allowed opacity-50"
        : "text-ink hover:bg-[#e0e5e9] cursor-pointer",
    ].join(" ");

  const sizeClasses = size === "md"
    ? "gap-[10px] py-[4px] px-0 w-[80px] h-[35px]"
    : "gap-[10px] py-[4px] px-0 w-[72px] h-[28px]";

  return (
    <div className={`inline-flex items-center justify-center ${sizeClasses}`} role="group" aria-label={label}>
      <button
        type="button"
        aria-label="Decrease quantity"
        className={buttonMinusClass(minusDisabled)}
        onClick={onDecrement}
        disabled={minusDisabled}
      >
        −
      </button>
      <span className={`${number} text-center font-medium text-[#0B0D10] tabular-nums`}>{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={buttonPlusClass(disabled)}
        onClick={onIncrement}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
}
