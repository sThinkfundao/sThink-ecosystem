import { useEffect, useState } from "react";
import { external, isSet } from "../../config.ts";
import { fetchMarketData, type MarketResult } from "./client.ts";

export type MarketState = { status: "not-configured" } | { status: "loading" } | MarketResult;

/**
 * Market data for one token. Short-circuits to "not-configured" while the
 * address is null — no request leaves the page, and the UI renders its
 * designed placeholder state.
 */
export function useTokenMarket(address: string | null): MarketState {
  const [state, setState] = useState<MarketState>(
    isSet(address) ? { status: "loading" } : { status: "not-configured" },
  );

  useEffect(() => {
    if (!isSet(address)) return;
    let cancelled = false;
    void fetchMarketData(address).then((result) => {
      if (!cancelled) setState(result);
    });
    return () => {
      cancelled = true;
    };
  }, [address]);

  return state;
}

/** Market data for the platform token itself. */
export function useMarketData(): MarketState {
  return useTokenMarket(external.contractAddress);
}
