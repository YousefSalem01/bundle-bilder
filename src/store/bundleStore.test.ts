import { describe, it, expect, beforeEach } from "vitest";
import { useBundleStore } from "./bundleStore";
import { catalog } from "../lib/catalog";

const store = useBundleStore;

beforeEach(() => {
  // Reset to the seeded design state before each test.
  store.setState({
    quantities: { ...catalog.seed.quantities },
    activeVariant: { ...catalog.seed.activeVariant },
    openStepId: catalog.seed.openStepId,
    justSaved: false,
  });
});

describe("quantity actions", () => {
  it("increments a variant line independently", () => {
    store.getState().increment("wyze-cam-v4", "white");
    expect(store.getState().quantities["wyze-cam-v4:white"]).toBe(2);
    // A different variant of the same product is untouched.
    expect(store.getState().quantities["wyze-cam-v4:black"] ?? 0).toBe(0);
  });

  it("clamps quantities at zero", () => {
    store.getState().setQuantity("wyze-cam-v4", "white", 0);
    store.getState().decrement("wyze-cam-v4", "white");
    expect(store.getState().quantities["wyze-cam-v4:white"]).toBe(0);
  });

  it("ignores changes to required (locked) products", () => {
    store.getState().increment("wyze-sense-hub");
    expect(store.getState().quantities["wyze-sense-hub"]).toBe(1);
    store.getState().decrement("wyze-sense-hub");
    expect(store.getState().quantities["wyze-sense-hub"]).toBe(1);
  });
});

describe("variant + accordion actions", () => {
  it("sets the active variant per product", () => {
    store.getState().setActiveVariant("wyze-cam-v4", "black");
    expect(store.getState().activeVariant["wyze-cam-v4"]).toBe("black");
  });

  it("toggles a step open and closed", () => {
    expect(store.getState().openStepId).toBe("cameras");
    store.getState().toggleStep("cameras");
    expect(store.getState().openStepId).toBeNull();
    store.getState().toggleStep("plan");
    expect(store.getState().openStepId).toBe("plan");
  });

  it("advances to the next step", () => {
    store.getState().goToNextStep("cameras");
    expect(store.getState().openStepId).toBe("plan");
  });
});
