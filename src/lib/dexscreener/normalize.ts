import type { DexPair, MarketData } from "./types.ts";

function parseNumeric(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const n = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(n) ? n : null;
}

/**
 * A token can trade in several pools; report the deepest one, which is the
 * price the aggregators quote.
 */
export function pickPrimaryPair(pairs: DexPair[]): DexPair | null {
  if (pairs.length === 0) return null;
  return pairs.reduce((best, pair) =>
    (pair.liquidity?.usd ?? 0) > (best.liquidity?.usd ?? 0) ? pair : best,
  );
}

export function normalizePair(pair: DexPair): MarketData {
  return {
    baseSymbol: pair.baseToken.symbol,
    quoteSymbol: pair.quoteToken.symbol,
    priceUsd: parseNumeric(pair.priceUsd),
    marketCapUsd: parseNumeric(pair.marketCap ?? pair.fdv),
    liquidityUsd: parseNumeric(pair.liquidity?.usd),
    volume24hUsd: parseNumeric(pair.volume?.h24),
    change24hPct: parseNumeric(pair.priceChange?.h24),
    imageUrl: pair.info?.imageUrl ?? null,
    pairUrl: pair.url,
    fetchedAt: Date.now(),
  };
}
