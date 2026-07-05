import type { Step as StepType } from "../../types/catalog";
import { catalog, productById } from "../../lib/catalog";
import { useBundleStore } from "../../store/bundleStore";
import { useStepSelectedCount } from "../../store/selectors";
import { Icon } from "../ui/Icon";
import { Chevron } from "../ui/Chevron";
import { ProductCard } from "./ProductCard";

interface StepProps {
  step: StepType;
}

export function Step({ step }: StepProps) {
  const open = useBundleStore((s) => s.openStepId === step.id);
  const toggleStep = useBundleStore((s) => s.toggleStep);
  const goToNextStep = useBundleStore((s) => s.goToNextStep);
  const selectedCount = useStepSelectedCount(step.id);

  const nextStep = catalog.steps.find((s) => s.index === step.index + 1);
  const products = step.productIds.map((id) => productById[id]).filter(Boolean);

  return (
    <section
      className={[
        "border-t border-[#E6EBF0]",
        open ? "rounded-[10px] border-transparent bg-[#EDF4FF] pt-[15px] pb-[15px]" : "py-4",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => toggleStep(step.id)}
        aria-expanded={open}
        className="flex w-full flex-col gap-[5px] text-left cursor-pointer"
      >
        <div className="flex w-full h-[12px] px-[15px] items-center">
          <span className="w-full text-[12px] font-medium uppercase tracking-[1.6px] leading-[100%] text-[#484848]">
            Step {step.index} of {catalog.steps.length}
          </span>
        </div>
        
        <div className="w-full h-[1px] bg-[#000000] opacity-20" />

        <div className="flex w-full items-center justify-between px-[15px] pt-[5px] pb-[5px]">
          <span className="flex items-center gap-2.5">
            <Icon name={step.icon} className="h-[26px] w-[26px] text-ink" />
            <span className="font-display text-[22px] font-semibold text-[#0B0D10]">{step.title}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-primary">
            {open && <span>{selectedCount} selected</span>}
            <Chevron direction={open ? "up" : "down"} />
          </span>
        </div>
      </button>

      {open && (
        <div className="px-[15px] pt-[10px] pb-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {products.map((product, index) => {
              const isLastOdd = index === products.length - 1 && products.length % 2 !== 0;
              return (
                <div 
                  key={product.id} 
                  className={isLastOdd ? "sm:col-span-2 sm:justify-self-center sm:w-[calc(50%-8px)]" : ""}
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          {nextStep && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => goToNextStep(step.id)}
                className="flex items-center justify-center w-[242px] h-[39px] gap-[10px] rounded-[7px] border border-[#4E2FD2] bg-white px-[24px] py-[5px] text-sm font-semibold text-[#4E2FD2] transition-colors hover:bg-[#EDF4FF] cursor-pointer"
              >
                Next: {nextStep.title}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
