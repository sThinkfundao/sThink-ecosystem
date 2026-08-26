import type { MarketData } from "../lib/dexscreener/types.ts";

/**
 * Sample values for preview mode. Deterministic per symbol, so a token
 * always looks the same across reloads, and spread across magnitudes —
 * sub-cent through double digits, both signs, market caps far enough apart
 * to make sorting legible. Never reachable from a production build; see
 * previewMode.ts.
 */

interface Profile {
  priceUsd: number;
  change24hPct: number;
  marketCapUsd: number;
  liquidityUsd: number;
  volume24hUsd: number;
}

const PROFILES: Profile[] = [
  { priceUsd: 0.00000412, change24hPct: 18.4, marketCapUsd: 412_000, liquidityUsd: 38_400, volume24hUsd: 96_200 },
  { priceUsd: 0.0731, change24hPct: -6.2, marketCapUsd: 7_310_000, liquidityUsd: 241_000, volume24hUsd: 1_140_000 },
  { priceUsd: 1.94, change24hPct: 2.1, marketCapUsd: 194_000_000, liquidityUsd: 3_420_000, volume24hUsd: 12_600_000 },
  { priceUsd: 12.6, change24hPct: -14.8, marketCapUsd: 1_260_000_000, liquidityUsd: 22_800_000, volume24hUsd: 61_400_000 },
  { priceUsd: 0.0000091, change24hPct: 142.7, marketCapUsd: 91_000, liquidityUsd: 12_300, volume24hUsd: 47_800 },
  { priceUsd: 0.418, change24hPct: -0.4, marketCapUsd: 41_800_000, liquidityUsd: 894_000, volume24hUsd: 2_070_000 },
  { priceUsd: 3.07, change24hPct: 7.9, marketCapUsd: 307_000_000, liquidityUsd: 6_150_000, volume24hUsd: 18_900_000 },
  { priceUsd: 0.00241, change24hPct: -31.5, marketCapUsd: 2_410_000, liquidityUsd: 104_000, volume24hUsd: 738_000 },
];

function hash(input: string, salt = 0): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

/** Spreads two symbols that land on the same profile so no row is a twin. */
function jitter(seed: number, spread: number): number {
  return 1 + ((seed % 1000) / 1000 - 0.5) * spread;
}

function round(value: number): number {
  if (value >= 1000) return Math.round(value / 100) * 100;
  if (value >= 1) return Number(value.toFixed(2));
  return Number(value.toPrecision(3));
}

const TILE_COLORS = ["#85d3f6", "#6fabb4", "#ccf2fd", "#a6c1cc"];

/**
 * A stand-in for the artwork the data layer supplies for a real token.
 * Inline SVG so preview mode makes no network requests. Only some symbols
 * get one, so both TokenMark registers — image and monogram — appear.
 */
function sampleImage(symbol: string, seed: number): string | null {
  if ((seed >>> 3) % 2 !== 0) return null;
  const color = TILE_COLORS[seed % TILE_COLORS.length];
  const letter = symbol.charAt(0).toUpperCase();
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">` +
    `<rect width="40" height="40" fill="#0b151b"/>` +
    `<circle cx="20" cy="20" r="13" fill="none" stroke="${color}" stroke-width="3"/>` +
    `<text x="20" y="26" font-family="monospace" font-size="15" font-weight="700" ` +
    `fill="${color}" text-anchor="middle">${letter}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function sampleMarket(symbol: string, quoteSymbol: string): MarketData {
  const seed = hash(symbol);
  const drift = hash(symbol, 7);
  // High bits pick the profile; the low bits are too clustered across short
  // ticker strings and would hand several rows the same magnitude.
  const profile = PROFILES[(seed >>> 23) % PROFILES.length]!;
  const scale = jitter(drift, 0.9);
  return {
    baseSymbol: symbol,
    quoteSymbol,
    priceUsd: round(profile.priceUsd * scale),
    marketCapUsd: round(profile.marketCapUsd * scale),
    liquidityUsd: round(profile.liquidityUsd * jitter(seed, 0.7)),
    volume24hUsd: round(profile.volume24hUsd * jitter(drift, 1.1)),
    change24hPct: Number((profile.change24hPct * jitter(seed, 0.5)).toFixed(1)),
    imageUrl: sampleImage(symbol, seed),
    pairUrl: "",
    fetchedAt: Date.now(),
  };
}

/** Stand-in mint address so the CA bar's live state can be reviewed. */
export const SAMPLE_ADDRESS = "SAMPLEonly1111111111111111111111111111pump";
