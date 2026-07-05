import { create } from "zustand";
import type { SeedState } from "../types/catalog";
import { catalog, lineKey, parseLineKey, productById } from "../lib/catalog";
import { loadSystem, saveSystem, clearSystem } from "../lib/storage";

interface BundleState {
  /** Quantity per line key (`productId` or `productId:variantId`). */
  quantities: Record<string, number>;
  /** Currently selected variant per product (drives the card stepper binding). */
  activeVariant: Record<string, string>;
  /** Open accordion step, or null when all collapsed. */
  openStepId: string | null;
  /** Transient flag toggled after a successful "Save my system for later". */
  justSaved: boolean;

  setQuantity: (productId: string, variantId: string | undefined, qty: number) => void;
  increment: (productId: string, variantId?: string) => void;
  decrement: (productId: string, variantId?: string) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  toggleStep: (stepId: string) => void;
  goToNextStep: (currentStepId: string) => void;
  saveForLater: () => void;
  clearSaved: () => void;
}

/** Deep-clone the seed so the imported JSON is never mutated. */
function cloneSeed(seed: SeedState): SeedState {
  return {
    quantities: { ...seed.quantities },
    activeVariant: { ...seed.activeVariant },
    openStepId: seed.openStepId,
  };
}

/** Prefer a previously saved system; otherwise fall back to the seeded design. */
function initialState(): SeedState {
  return loadSystem() ?? cloneSeed(catalog.seed);
}

export const useBundleStore = create<BundleState>((set, get) => {
  const init = initialState();

  /** Guard: required products (e.g. the hub) have a locked, unchangeable quantity. */
  function isLocked(productId: string): boolean {
    return productById[productId]?.required ?? false;
  }

  function writeQuantity(productId: string, variantId: string | undefined, qty: number) {
    if (isLocked(productId)) return;
    const key = lineKey(productId, variantId);
    const next = Math.max(0, Math.floor(qty));
    set((state) => ({ quantities: { ...state.quantities, [key]: next } }));
  }

  return {
    quantities: init.quantities,
    activeVariant: init.activeVariant,
    openStepId: init.openStepId,
    justSaved: false,

    setQuantity: (productId, variantId, qty) => writeQuantity(productId, variantId, qty),

    increment: (productId, variantId) => {
      const key = lineKey(productId, variantId);
      writeQuantity(productId, variantId, (get().quantities[key] ?? 0) + 1);
    },

    decrement: (productId, variantId) => {
      const key = lineKey(productId, variantId);
      writeQuantity(productId, variantId, (get().quantities[key] ?? 0) - 1);
    },

    setActiveVariant: (productId, variantId) =>
      set((state) => ({ activeVariant: { ...state.activeVariant, [productId]: variantId } })),

    toggleStep: (stepId) =>
      set((state) => ({ openStepId: state.openStepId === stepId ? null : stepId })),

    goToNextStep: (currentStepId) => {
      const current = catalog.steps.find((s) => s.id === currentStepId);
      const next = catalog.steps.find((s) => s.index === (current?.index ?? 0) + 1);
      set({ openStepId: next ? next.id : null });
    },

    saveForLater: () => {
      const { quantities, activeVariant, openStepId } = get();
      saveSystem({ quantities, activeVariant, openStepId: openStepId ?? catalog.seed.openStepId });
      set({ justSaved: true });
    },

    clearSaved: () => {
      clearSystem();
      set({ justSaved: false });
    },
  };
});

export { parseLineKey };
