interface DiscountBadgeProps {
  label: string;
}

/** Small violet discount pill, e.g. "Save 22%". */
export function DiscountBadge({ label }: DiscountBadgeProps) {
  return (
    <span className="inline-block rounded-[10px] bg-primary px-1.5 py-0.5 text-[12px] font-semibold leading-[15px] text-white">
      {label}
    </span>
  );
}
