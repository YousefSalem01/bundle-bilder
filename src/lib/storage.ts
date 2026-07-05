import type { SeedState } from "../types/catalog";

const STORAGE_KEY = "bundle-builder:saved-system:v1";

/** The persisted shape mirrors the seed so it can hydrate the store directly. */
export type PersistedState = SeedState;

/** Persist the shopper's current configuration ("Save my system for later"). */
export function saveSystem(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable (private mode / quota) — fail silently */
  }
}

/** Load a previously saved configuration, or null if none / unreadable. */
export function loadSystem(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (parsed && typeof parsed === "object" && parsed.quantities) return parsed;
    return null;
  } catch {
    return null;
  }
}

/** Remove any saved configuration. */
export function clearSystem(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}
