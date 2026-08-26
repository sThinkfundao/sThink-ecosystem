import { useSyncExternalStore } from "react";

/**
 * Preview mode fills the interface with sample values so the layout can be
 * reviewed before anything is deployed. It is a review aid, never a feature:
 * `import.meta.env.DEV` is replaced with `false` at build time, so in a
 * production bundle the flag is constant-folded, every call site below
 * collapses, and the sample data is dropped by tree shaking.
 */
export const PREVIEW_AVAILABLE = import.meta.env.DEV;

let active = PREVIEW_AVAILABLE;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setPreviewActive(next: boolean): void {
  active = PREVIEW_AVAILABLE && next;
  for (const listener of listeners) listener();
}

export function usePreviewActive(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => active,
    () => false,
  );
}
