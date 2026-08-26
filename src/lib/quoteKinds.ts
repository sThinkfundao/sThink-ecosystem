export type QuoteKind = "stock" | "currency" | "commodity" | "coin";

export const QUOTE_KIND_LABELS: Record<QuoteKind, string> = {
  stock: "Stocks",
  currency: "Currencies",
  commodity: "Commodities",
  coin: "Coins",
};
