/**
 * Seed data so the index is reviewable before any token exists. Deliberately
 * synthetic — placeholder names, no addresses, no market numbers. Real rows
 * replace these when launches go live; order is newest first.
 */

import type { QuoteKind } from "../../lib/quoteKinds.ts";

export interface IndexToken {
  symbol: string;
  name: string;
  quote: string;
  quoteKind: QuoteKind;
  /** Mint address once the token is real; null renders "not live yet". */
  address: string | null;
}

export const INDEX_TOKENS: IndexToken[] = [
  { symbol: "EXMPL", name: "Example token", quote: "XAU", quoteKind: "commodity", address: null },
  { symbol: "SMPL", name: "Sample token", quote: "TSLA", quoteKind: "stock", address: null },
  { symbol: "DEMO", name: "Demo token", quote: "EUR", quoteKind: "currency", address: null },
  { symbol: "TESTT", name: "Test token", quote: "WIF", quoteKind: "coin", address: null },
  { symbol: "MOCK", name: "Mock token", quote: "SPY", quoteKind: "stock", address: null },
  { symbol: "PLCHLD", name: "Placeholder token", quote: "JPY", quoteKind: "currency", address: null },
  { symbol: "TRIAL", name: "Trial token", quote: "SOL", quoteKind: "coin", address: null },
  { symbol: "SPCMN", name: "Specimen token", quote: "XAG", quoteKind: "commodity", address: null },
];
