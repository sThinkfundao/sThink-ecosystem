import type { ReactNode } from "react";
import ChevronLoader from "../../brand/ChevronLoader.tsx";
import { useMarketData } from "../../lib/dexscreener/useMarketData.ts";
import { formatPct, formatUsdCompact } from "../../lib/format.ts";

const CELLS = ["Market cap", "Liquidity", "Volume 24h", "24h"] as const;

export default function MarketStrip() {
  const market = useMarketData();

  const values: Record<(typeof CELLS)[number], ReactNode> | null =
    market.status === "ready"
      ? {
          "Market cap":
            market.data.marketCapUsd === null ? "—" : formatUsdCompact(market.data.marketCapUsd),
          Liquidity:
            market.data.liquidityUsd === null ? "—" : formatUsdCompact(market.data.liquidityUsd),
          "Volume 24h":
            market.data.volume24hUsd === null ? "—" : formatUsdCompact(market.data.volume24hUsd),
          "24h": (
            <span
              className={
                market.data.change24hPct === null
                  ? undefined
                  : market.data.change24hPct >= 0
                    ? "text-rise"
                    : "text-fall"
              }
            >
              {market.data.change24hPct === null ? "—" : formatPct(market.data.change24hPct)}
            </span>
          ),
        }
      : null;

  const placeholder =
    market.status === "loading" ? (
      <ChevronLoader />
    ) : market.status === "unavailable" ? (
      "unavailable"
    ) : market.status === "no-pairs" ? (
      "no market yet"
    ) : (
      "not live yet"
    );

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-edge bg-edge sm:grid-cols-4">
      {CELLS.map((cell) => (
        <div key={cell} className="bg-surface px-3 py-2.5">
          <dt className="text-label uppercase text-teal">{cell}</dt>
          <dd className="mt-0.5 font-mono text-ui text-steel">
            {values ? values[cell] : <span className="text-label uppercase text-teal">{placeholder}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
