/**
 * Response shapes for the DexScreener public API, current as of the
 * /token-pairs/v1 endpoint docs. Only the fields this app reads.
 */

export interface DexToken {
  address: string;
  name: string;
  symbol: string;
}

export interface DexPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: DexToken;
  quoteToken: DexToken;
  priceNative: string;
  priceUsd?: string | null;
  marketCap?: number | null;
  fdv?: number | null;
  liquidity?: {
    usd?: number | null;
    base?: number | null;
    quote?: number | null;
  } | null;
  volume?: Record<string, number> | null;
  priceChange?: Record<string, number> | null;
}

/** What the UI consumes; one place normalizes the API shape into this. */
export interface MarketData {
  baseSymbol: string;
  quoteSymbol: string;
  priceUsd: number | null;
  marketCapUsd: number | null;
  liquidityUsd: number | null;
  volume24hUsd: number | null;
  change24hPct: number | null;
  pairUrl: string;
  fetchedAt: number;
}
