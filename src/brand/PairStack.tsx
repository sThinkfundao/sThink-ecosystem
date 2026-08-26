import { ChevronMark } from "./Chevron.tsx";
import TokenMark from "./TokenMark.tsx";
import type { QuoteKind } from "../lib/quoteKinds.ts";

interface PairStackProps {
  base: string;
  quote: string;
  /** The pair's class; drives both tiles' treatment. */
  kind?: QuoteKind | null;
  baseImageUrl?: string | null;
}

/**
 * A pair set the way the logo is built: base over the mark over quote.
 * Two registers share the same color roles — the vertical stack for the
 * hero and narrow-screen cards, the inline row for dense table cells.
 * The quote gets equal weight on purpose; it is the product.
 */
export function PairStackVertical({ base, quote, kind = null, baseImageUrl }: PairStackProps) {
  const quoteEmpty = quote === "?";
  return (
    <span className="flex flex-col items-center gap-2">
      <span className="inline-flex items-center gap-2">
        <TokenMark symbol={base} kind={kind} imageUrl={baseImageUrl} size="sm" />
        <span className="font-mono text-xl font-bold leading-none tracking-tight text-ice">
          {base}
        </span>
      </span>
      <ChevronMark className="h-6 w-auto text-steel" />
      <span className="inline-flex items-center gap-2">
        <TokenMark symbol={quote} kind={kind} size="sm" empty={quoteEmpty} />
        <span className="font-mono text-xl font-bold leading-none tracking-tight text-sky">
          {quote}
        </span>
      </span>
    </span>
  );
}

export function PairInline({ base, quote, kind = null, baseImageUrl }: PairStackProps) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[13px] font-bold">
      <TokenMark symbol={base} kind={kind} imageUrl={baseImageUrl} size="sm" />
      <span className="text-ice">{base}</span>
      <ChevronMark className="h-[11px] w-auto min-w-[9px] text-steel" />
      <span className="text-sky">{quote}</span>
    </span>
  );
}
