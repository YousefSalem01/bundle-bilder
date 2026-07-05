interface ChevronProps {
  direction: "up" | "down";
  className?: string;
}

/** Simple chevron used by the accordion headers. */
export function Chevron({ direction, className }: ChevronProps) {
  const src = direction === "up" ? "/icons/carrot-up.svg" : "/icons/carrot-down.svg";
  
  return (
    <img 
      src={src} 
      alt="" 
      aria-hidden 
      className={className || "w-3 h-3"} 
    />
  );
}
