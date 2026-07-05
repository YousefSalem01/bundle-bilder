interface DiscountBadgeProps {
  label: string;
}

/** Small violet discount pill, e.g. "Save 22%". */
export function DiscountBadge({ label }: DiscountBadgeProps) {
  return (
    <span className="inline-block rounded-[10px] bg-[#4E2FD2] px-[6px] py-[2px] text-[12px] font-semibold leading-[15px] text-white">
      {label}
    </span>
  );
}
