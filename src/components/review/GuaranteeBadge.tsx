/** Circular "100% satisfaction guarantee" seal image. */
export function GuaranteeBadge({ className }: { className?: string }) {
  return (
    <img
      src="/icons/100%_badge.png"
      alt="100% Wyze satisfaction guarantee"
      className={`${className ?? ""} object-contain`}
    />
  );
}
