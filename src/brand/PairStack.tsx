import { ChevronMark } from "./Chevron.tsx";

interface PairStackProps {
  base: string;
  quote: string;
}

/**
 * A pair set the way the logo is built: base over the mark over quote.
 * Two registers share the same color roles — the vertical stack for the
 * hero and narrow-screen cards, the inline row for dense table cells.
 * The quote gets equal weight on purpose; it is the product.
 */
export function PairStackVertical({ base, quote }: PairStackProps) {
  return (
    <span className="flex flex-col items-center gap-2">
      <span className="font-mono text-xl font-bold leading-none tracking-tight text-ice">
        {base}
      </span>
      <ChevronMark className="h-6 w-auto text-steel" />
      <span className="font-mono text-xl font-bold leading-none tracking-tight text-sky">
        {quote}
      </span>
    </span>
  );
}

export function PairInline({ base, quote }: PairStackProps) {
  return (
    <span className="inline-flex items-baseline gap-1.5 font-mono text-[13px] font-bold">
      <span className="text-ice">{base}</span>
      <ChevronMark className="h-[11px] w-auto min-w-[9px] self-center text-steel" />
      <span className="text-sky">{quote}</span>
    </span>
  );
}
