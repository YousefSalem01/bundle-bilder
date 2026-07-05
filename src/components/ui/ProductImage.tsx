import { useState, useEffect } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

/**
 * Renders a product image with a graceful neutral fallback, so the app builds
 * and looks tidy from a clean clone even before Figma assets are dropped in.
 */
export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showFallback = !src || failed;

  if (showFallback) {
    return (
      <div
        className={`grid place-items-center bg-neutral-100 text-neutral-300 ${className ?? ""}`}
        role="img"
        aria-label={alt}
      >
        <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="12" cy="12" r="3.2" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`object-contain ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}
