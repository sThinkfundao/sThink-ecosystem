import { useMemo, useState } from "react";
import { ChevronSingle } from "../../brand/Chevron.tsx";
import Button from "../../components/Button.tsx";
import { resolveMarketState, useMarketMap } from "../../lib/dexscreener/useMarketData.ts";
import { QUOTE_KIND_LABELS, type QuoteKind } from "../../lib/quoteKinds.ts";
import { PREVIEW_AVAILABLE, usePreviewActive } from "../../preview/previewMode.ts";
import { sampleMarket } from "../../preview/sampleMarket.ts";
import TokenTable, { type TokenRow } from "./TokenTable.tsx";
import { INDEX_TOKENS } from "./fixtures.ts";

type Sort = "newest" | "name" | "mcap";
type KindFilter = QuoteKind | "all";

const SORTS: { id: Sort; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "name", label: "Name" },
  { id: "mcap", label: "Market cap" },
];

const KINDS: KindFilter[] = ["all", "stock", "currency", "commodity", "coin"];

function mcapOf(row: TokenRow): number {
  return row.market.status === "ready" ? (row.market.data.marketCapUsd ?? -1) : -1;
}

export default function TokenIndex() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const marketResults = useMarketMap(INDEX_TOKENS.map((token) => token.address));
  const previewActive = usePreviewActive();
  const preview = PREVIEW_AVAILABLE && previewActive;

  const rows = useMemo<TokenRow[]>(() => {
    const q = query.trim().toLowerCase();
    const filtered = INDEX_TOKENS.filter((token) => {
      if (kind !== "all" && token.quoteKind !== kind) return false;
      if (!q) return true;
      return [token.symbol, token.name, token.quote]
        .some((field) => field.toLowerCase().includes(q));
    }).map<TokenRow>((token) => ({
      token,
      market: preview
        ? { status: "ready", data: sampleMarket(token.symbol, token.quote) }
        : resolveMarketState(token.address, marketResults),
    }));
    if (sort === "name") {
      return [...filtered].sort((a, b) => a.token.symbol.localeCompare(b.token.symbol));
    }
    if (sort === "mcap") {
      // Stable sort: rows without market data keep fixture order below
      // ranked ones, which is the whole list until tokens deploy.
      return [...filtered].sort((a, b) => mcapOf(b) - mcapOf(a));
    }
    return filtered;
  }, [query, kind, sort, marketResults, preview]);

  const anyRanked = rows.some((row) => mcapOf(row) >= 0);

  const counts = useMemo(() => {
    const byKind = new Map<KindFilter, number>([["all", INDEX_TOKENS.length]]);
    for (const token of INDEX_TOKENS) {
      byKind.set(token.quoteKind, (byKind.get(token.quoteKind) ?? 0) + 1);
    }
    return byKind;
  }, []);

  return (
    <section id="tokens" className="border-b border-edge">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="flex items-center gap-2.5">
          <ChevronSingle className="h-2.5 w-auto text-sky" />
          <span className="font-display text-label text-steel">Tokens</span>
        </h2>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="well flex min-h-11 w-full max-w-sm items-center gap-2 rounded-sm px-3 focus-within:border-steel/40">
            <span className="sr-only">Search tokens</span>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-teal" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, symbol, or quote"
              className="w-full bg-transparent py-2 text-ui text-steel outline-none placeholder:text-teal"
            />
          </label>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <div role="group" aria-label="Filter by quote type" className="flex flex-wrap gap-1.5">
              {KINDS.map((k) => {
                const active = kind === k;
                const label = k === "all" ? "All" : QUOTE_KIND_LABELS[k];
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setKind(k)}
                    className={`hit group rounded-sm px-2.5 py-1.5 text-ui transition-colors duration-100 active:translate-y-px ${
                      active
                        ? "raised-2 text-ice outline outline-1 -outline-offset-1 outline-sky/60"
                        : "raised text-teal hover:border-steel/40 hover:text-ice"
                    }`}
                  >
                    <ChevronSingle
                      className={`mr-1.5 inline h-[7px] w-auto transition-transform duration-100 group-hover:-translate-y-px ${
                        active ? "text-sky" : "text-teal"
                      }`}
                    />
                    {label}
                    <span className="ml-1.5 font-mono text-label text-teal">
                      {counts.get(k) ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>

            <div role="group" aria-label="Sort" className="flex items-center gap-1">
              <span className="mr-1 text-label uppercase text-teal">Sort</span>
              {SORTS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={sort === id}
                  onClick={() => setSort(id)}
                  className={`hit rounded-sm px-2 py-1.5 text-ui transition-colors duration-100 active:translate-y-px ${
                    sort === id ? "bg-panel text-ice" : "text-teal hover:text-ice"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {sort === "mcap" && !anyRanked && (
          <p className="mt-3 text-label uppercase text-teal">
            No live market data yet — order unchanged
          </p>
        )}

        <div className="mt-6">
          {rows.length > 0 ? (
            <div className="token-surface">
              <TokenTable rows={rows} />
            </div>
          ) : (
            <div className="raised flex flex-col items-center gap-4 rounded-sm px-6 py-14 text-center">
              <p className="text-body text-steel">
                No tokens match{query.trim() ? ` "${query.trim()}"` : " this combination"}.
              </p>
              <Button
                onClick={() => {
                  setQuery("");
                  setKind("all");
                }}
              >
                Show all tokens
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
