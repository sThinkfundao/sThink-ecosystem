import { useEffect, useState } from "react";
import { external, isSet } from "../../config.ts";
import { fetchMarketData, type MarketResult } from "./client.ts";

export type MarketState = { status: "not-configured" } | { status: "loading" } | MarketResult;

/**
 * Market data for a set of token addresses, keyed by address. Null
 * addresses are skipped — no request leaves the page for them — and the
 * caller renders "not-configured". Entries are "loading" until resolved.
 */
export function useMarketMap(addresses: (string | null)[]): Map<string, MarketResult> {
  const [results, setResults] = useState<Map<string, MarketResult>>(new Map());
  const key = addresses.filter(isSet).join(",");

  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    for (const address of key.split(",")) {
      void fetchMarketData(address).then((result) => {
        if (!cancelled) setResults((prev) => new Map(prev).set(address, result));
      });
    }
    return () => {
      cancelled = true;
    };
  }, [key]);

  return results;
}

export function resolveMarketState(
  address: string | null,
  results: Map<string, MarketResult>,
): MarketState {
  if (!isSet(address)) return { status: "not-configured" };
  return results.get(address) ?? { status: "loading" };
}

/** Market data for the platform token itself. */
export function useMarketData(): MarketState {
  const address = external.contractAddress;
  const results = useMarketMap([address]);
  return resolveMarketState(address, results);
}
