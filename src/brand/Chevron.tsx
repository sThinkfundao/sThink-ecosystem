/**
 * The sThink mark, traced from the 2000px brand PNG: two stacked chevrons
 * with tapered tails, the lower one slightly narrower (0.87 x 0.925), the
 * way the source art draws it. Filled paths so the shape holds at small
 * sizes; inherits currentColor.
 */
const CHEVRON =
  "M418.5 0 L36 402 C20 420 1 465 0 527 C2 585 30 660 73 708 " +
  "C120 660 200 570 315 462 C365 430 400 340 418.5 296 " +
  "C437 340 472 430 522 462 C637 570 717 660 764 708 " +
  "C807 660 835 585 837 527 C836 465 817 420 801 402 Z";

const LOWER_TRANSFORM = "translate(54.4 564) scale(0.87 0.925)";

interface MarkProps {
  className?: string;
  label?: string;
}

export function ChevronMark({ className, label }: MarkProps) {
  return (
    <svg
      viewBox="0 0 837 1219"
      fill="currentColor"
      className={className}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
    >
      {label ? <title>{label}</title> : null}
      <path d={CHEVRON} />
      <path d={CHEVRON} transform={LOWER_TRANSFORM} />
    </svg>
  );
}

/** Single chevron, for the loader and motion states that assemble the mark. */
export function ChevronSingle({ className, label }: MarkProps) {
  return (
    <svg
      viewBox="0 0 837 708"
      fill="currentColor"
      className={className}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
    >
      {label ? <title>{label}</title> : null}
      <path d={CHEVRON} />
    </svg>
  );
}
