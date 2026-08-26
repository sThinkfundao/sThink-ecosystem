import { ChevronSingle } from "./Chevron.tsx";

/**
 * The mark assembling in place; motion collapses under reduced motion.
 * Decorative by default — call sites that need an announcement render
 * their own single live region rather than one per loader.
 */
export default function ChevronLoader() {
  return (
    <span aria-hidden="true" className="inline-flex flex-col items-center gap-[3px]">
      <ChevronSingle className="h-2 w-auto animate-[loader-drop_1.1s_ease-in-out_infinite] text-steel" />
      <ChevronSingle className="h-2 w-auto animate-[loader-rise_1.1s_ease-in-out_infinite] text-steel" />
    </span>
  );
}
