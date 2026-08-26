import type { ReactNode } from "react";
import ChevronLoader from "../../brand/ChevronLoader.tsx";
import Delta from "../../components/Delta.tsx";
import { useMarketData } from "../../lib/dexscreener/useMarketData.ts";
import { formatUsdCompact } from "../../lib/format.ts";

const CELLS = ["Market cap", "Liquidity", "Volume 24h", "Change 24h"] as const;

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
          "Change 24h":
            market.data.change24hPct === null ? (
              "—"
            ) : (
              <Delta value={market.data.change24hPct} emphasis />
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
    <>
      <span role="status" className="sr-only">
        {market.status === "loading" ? "Loading market data" : ""}
      </span>
      <div className="raised overflow-hidden rounded-sm">
        <dl className="grid grid-cols-2 gap-px bg-edge sm:grid-cols-4">
          {CELLS.map((cell) => (
            <div key={cell} className="bg-surface px-3 py-2.5">
              <dt className="text-label uppercase text-teal">{cell}</dt>
              <dd className="mt-0.5 font-mono text-ui text-steel">
                {values ? (
                  values[cell]
                ) : (
                  <span className="text-label uppercase text-teal">{placeholder}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
