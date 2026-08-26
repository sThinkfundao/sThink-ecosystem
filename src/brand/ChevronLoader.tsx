import { ChevronSingle } from "./Chevron.tsx";

/** The mark assembling in place; the motion collapses under reduced motion. */
export default function ChevronLoader({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex flex-col items-center gap-[3px]">
      <ChevronSingle className="h-2 w-auto animate-[loader-drop_1.1s_ease-in-out_infinite] text-steel" />
      <ChevronSingle className="h-2 w-auto animate-[loader-rise_1.1s_ease-in-out_infinite] text-steel" />
    </span>
  );
}
