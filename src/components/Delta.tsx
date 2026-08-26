import { formatPct } from "../lib/format.ts";

/**
 * A signed change. The sign glyph carries the meaning; rise/fall color
 * reinforces it. `emphasis` adds the tinted chip for standalone contexts.
 */
export default function Delta({ value, emphasis = false }: { value: number; emphasis?: boolean }) {
  const positive = value >= 0;
  const color = positive ? "text-rise" : "text-fall";
  if (!emphasis) return <span className={`font-mono ${color}`}>{formatPct(value)}</span>;
  return (
    <span
      className={`inline-block rounded-[3px] px-1.5 py-0.5 font-mono ${color} ${
        positive ? "bg-rise/10" : "bg-fall/10"
      }`}
    >
      {formatPct(value)}
    </span>
  );
}
