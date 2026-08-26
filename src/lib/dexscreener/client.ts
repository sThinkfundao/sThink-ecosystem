import type { DexPair, MarketData } from "./types.ts";
import { normalizePair, pickPrimaryPair } from "./normalize.ts";

const BASE_URL = "https://api.dexscreener.com";
const CHAIN_ID = "solana";
const CACHE_TTL_MS = 30_000;
const REQUEST_TIMEOUT_MS = 8_000;
const RETRIES = 2;

export type MarketResult =
  | { status: "ready"; data: MarketData }
  | { status: "no-pairs" }
  | { status: "unavailable" };

interface CacheEntry {
  at: number;
  result: MarketResult;
}

const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<MarketResult>>();

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestPairs(address: string): Promise<DexPair[]> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    if (attempt > 0) {
      await sleep(300 * 2 ** (attempt - 1) + Math.random() * 200);
    }
    try {
      const res = await fetch(`${BASE_URL}/token-pairs/v1/${CHAIN_ID}/${address}`, {
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        headers: { accept: "application/json" },
      });
      if (res.status === 429) {
        lastError = new Error("rate limited");
        continue;
      }
      if (!res.ok) throw new Error(`dexscreener ${res.status}`);
      return (await res.json()) as DexPair[];
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

/**
 * Market data for a token, newest pool by liquidity. Degrades to
 * "unavailable" instead of throwing; callers render that state.
 */
export function fetchMarketData(address: string): Promise<MarketResult> {
  const cached = cache.get(address);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return Promise.resolve(cached.result);
  }

  const pending = inflight.get(address);
  if (pending) return pending;

  const promise = (async (): Promise<MarketResult> => {
    try {
      const pairs = await requestPairs(address);
      const primary = pickPrimaryPair(pairs);
      const result: MarketResult = primary
        ? { status: "ready", data: normalizePair(primary) }
        : { status: "no-pairs" };
      cache.set(address, { at: Date.now(), result });
      return result;
    } catch {
      return { status: "unavailable" };
    } finally {
      inflight.delete(address);
    }
  })();

  inflight.set(address, promise);
  return promise;
}
