import type { Product } from "../../types/catalog";
import { useBundleStore } from "../../store/bundleStore";
import { useCardQuantity } from "../../store/selectors";
import { hasVariants } from "../../lib/catalog";
import { cn } from "../../lib/cn";
import { ProductImage } from "../ui/ProductImage";
import { QuantityStepper } from "../ui/QuantityStepper";
import { PriceTag } from "../ui/PriceTag";
import { DiscountBadge } from "../ui/DiscountBadge";
import { VariantSelector } from "./VariantSelector";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const withVariants = hasVariants(product);

  const activeVariantId = useBundleStore((s) => s.activeVariant[product.id]);
  const setActiveVariant = useBundleStore((s) => s.setActiveVariant);
  const increment = useBundleStore((s) => s.increment);
  const decrement = useBundleStore((s) => s.decrement);

  const quantity = useCardQuantity(product);
  const selected = quantity > 0;

  // For variant products the stepper edits the active variant's line.
  const effectiveVariantId = withVariants
    ? activeVariantId ?? product.variants[0]?.id
    : undefined;
  const activeVariant = product.variants.find((v) => v.id === effectiveVariantId);
  const image = activeVariant?.image ?? product.image;

  return (
    <div
      className={cn(
        "relative flex w-full h-full items-start tall-desktop:flex-col tall-desktop:justify-center tall-desktop:items-center gap-[19px] bg-white rounded-[10px] border-[2px] p-[11px] tall-desktop:py-[15px] transition-colors min-h-[159px] tall-desktop:min-h-[331px]",
        selected
          ? "border-primary/70 shadow-[0px_4px_14px_0px_rgba(78,47,210,0.15)]"
          : "border-transparent shadow-none hover:border-primary/30",
      )}
    >
      <div className="relative shrink-0 self-center tall-desktop:self-stretch tall-desktop:flex tall-desktop:justify-center">
        {product.badge && (
          <div className="absolute left-0 top-0 z-10">
            <DiscountBadge label={product.badge} />
          </div>
        )}
        <ProductImage
          src={image}
          alt={product.name}
          className="h-[137px] w-[101px] tall-desktop:w-auto tall-desktop:h-[120px] object-contain rounded-[5px] bg-white"
        />
      </div>

      <div className="flex flex-1 min-w-0 flex-col gap-[10px] tall-desktop:w-full tall-desktop:flex-none">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-display text-[16px] tall-desktop:text-[18px] font-semibold text-heading tracking-[0.6px] leading-[100%]">{product.name}</h3>
          {product.description && (
            <div className="text-[10px] tall-desktop:text-[14px] leading-[130%] text-heading/75 tracking-normal">
              {product.description}
              {product.learnMoreUrl && (
                <>
                  {" "}
                  <a
                    href={product.learnMoreUrl}
                    className="inline text-[10px] tall-desktop:text-[14px] leading-[130%] tracking-normal font-medium text-primary hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Learn More
                  </a>
                </>
              )}
            </div>
          )}
        </div>

        {withVariants && (
          <div className="w-full min-h-[26px]">
            <VariantSelector
              variants={product.variants}
              activeVariantId={effectiveVariantId}
              onSelect={(id) => setActiveVariant(product.id, id)}
            />
          </div>
        )}

        <div className="flex items-center justify-between w-full h-[35px]">
          <QuantityStepper
            value={quantity}
            onIncrement={() => increment(product.id, effectiveVariantId)}
            onDecrement={() => decrement(product.id, effectiveVariantId)}
            disabled={product.required}
            label={`${product.name} quantity`}
          />
          <PriceTag
            price={product.price}
            compareAt={product.compareAt}
            priceUnit={product.priceUnit}
            variant="card"
          />
        </div>
      </div>
    </div>
  );
}
