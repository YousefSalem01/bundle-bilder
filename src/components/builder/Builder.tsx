import { catalog } from "../../lib/catalog";
import { Step } from "./Step";

/** Left column: the 4-step vertical accordion. */
export function Builder() {
  return (
    <div className="flex flex-col">
      {catalog.steps.map((step) => (
        <Step key={step.id} step={step} />
      ))}
    </div>
  );
}
