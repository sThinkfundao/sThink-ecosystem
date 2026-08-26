import type { QuoteKind } from "../lib/quoteKinds.ts";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "h-5 w-5 rounded-[3px] text-[8px]",
  md: "h-7 w-7 rounded-sm text-[10px]",
  lg: "h-10 w-10 rounded-sm text-[13px]",
};

/*
 * One tint per pair class, all from the existing palette, so a symbol's
 * tile is deterministic and reads as system, not as a missing image.
 */
const KIND_TINTS: Record<QuoteKind, string> = {
  stock: "text-sky border-sky/35 bg-sky/10",
  currency: "text-teal border-teal/40 bg-teal/10",
  commodity: "text-ice border-ice/30 bg-ice/10",
  coin: "text-steel border-steel/35 bg-steel/10",
};

const NEUTRAL_TINT = "text-ice border-edge2 bg-panel";

function monogram(symbol: string): string {
  const clean = symbol.trim().toUpperCase();
  return clean.length <= 3 ? clean : clean.slice(0, 2);
}

interface TokenMarkProps {
  symbol: string;
  kind?: QuoteKind | null;
  imageUrl?: string | null;
  size?: Size;
  /** Renders a dashed vacant tile — for a slot not yet filled. */
  empty?: boolean;
}

export default function TokenMark({
  symbol,
  kind = null,
  imageUrl = null,
  size = "md",
  empty = false,
}: TokenMarkProps) {
  const base = `inline-flex shrink-0 items-center justify-center ${SIZES[size]}`;

  if (empty) {
    return (
      <span
        aria-hidden="true"
        className={`${base} border border-dashed border-edge2 bg-transparent`}
      />
    );
  }

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        loading="lazy"
        className={`${base} border border-edge object-cover shadow-[inset_0_1px_0_rgba(204,242,253,0.06)]`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${base} font-display border leading-none shadow-[inset_0_1px_0_rgba(204,242,253,0.06)] ${
        kind ? KIND_TINTS[kind] : NEUTRAL_TINT
      }`}
    >
      {monogram(symbol)}
    </span>
  );
}
