import { PairInline } from "../../brand/PairStack.tsx";
import ChevronLoader from "../../brand/ChevronLoader.tsx";
import Delta from "../../components/Delta.tsx";
import type { MarketState } from "../../lib/dexscreener/useMarketData.ts";
import { formatUsdCompact, formatUsdPrice } from "../../lib/format.ts";
import type { IndexToken } from "./fixtures.ts";

const COLUMNS = [
  { label: "Pair", numeric: false, short: "Pair" },
  { label: "Name", numeric: false, short: "Name" },
  { label: "Price", numeric: true, short: "Price" },
  { label: "24h", numeric: true, short: "24h" },
  // Phone cards carry the footer labels inline, where the full words wrap.
  { label: "Market cap", numeric: true, short: "MCAP" },
  { label: "Liquidity", numeric: true, short: "LIQ" },
] as const;

const MARKET_COLUMNS = COLUMNS.slice(2);

export interface TokenRow {
  token: IndexToken;
  market: MarketState;
}

/* Only ever visible in the phone card; the desktop table has real headers. */
function CellLabel({ text }: { text: string }) {
  return (
    <span aria-hidden="true" className="cell-label text-label uppercase text-teal">
      {text}
    </span>
  );
}

function EmptyCell({ text = "not live yet" }: { text?: string }) {
  // Kept on one line: a wrapped "not live / yet" reads as a broken value
  // rather than a deliberate state, and it made empty rows taller than live ones.
  return <span className="whitespace-nowrap text-label uppercase text-teal">{text}</span>;
}

function MarketCells({ market }: { market: MarketState }) {
  if (market.status === "ready") {
    const { priceUsd, change24hPct, marketCapUsd, liquidityUsd } = market.data;
    return (
      <>
        {/* Price is the second voice after the pair, so it carries weight. */}
        <td role="cell" data-num="" className="font-mono text-base font-bold text-ice sm:text-ui">
          <CellLabel text="Price" />
          {priceUsd === null ? <EmptyCell text="—" /> : formatUsdPrice(priceUsd)}
        </td>
        <td role="cell" data-num="" className="text-ui">
          <CellLabel text="24h" />
          {change24hPct === null ? <EmptyCell text="—" /> : <Delta value={change24hPct} />}
        </td>
        <td role="cell" data-num="" className="font-mono text-ui text-steel">
          <CellLabel text="MCAP" />
          {marketCapUsd === null ? <EmptyCell text="—" /> : formatUsdCompact(marketCapUsd)}
        </td>
        <td role="cell" data-num="" className="font-mono text-ui text-steel">
          <CellLabel text="LIQ" />
          {liquidityUsd === null ? <EmptyCell text="—" /> : formatUsdCompact(liquidityUsd)}
        </td>
      </>
    );
  }

  const placeholder =
    market.status === "loading" ? (
      <>
        <ChevronLoader />
        <span className="sr-only">loading</span>
      </>
    ) : market.status === "unavailable" ? (
      <EmptyCell text="unavailable" />
    ) : market.status === "no-pairs" ? (
      <EmptyCell text="no market yet" />
    ) : (
      <EmptyCell />
    );

  return (
    <>
      {MARKET_COLUMNS.map((column) => (
        <td role="cell" data-num="" key={column.label}>
          <CellLabel text={column.short} />
          {placeholder}
        </td>
      ))}
    </>
  );
}

export default function TokenTable({ rows }: { rows: TokenRow[] }) {
  return (
    <table role="table" className="token-table">
      <thead role="rowgroup">
        <tr role="row">
          {COLUMNS.map((column) => (
            <th
              key={column.label}
              role="columnheader"
              scope="col"
              data-num={column.numeric ? "" : undefined}
              className="text-label font-bold uppercase text-teal"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map(({ token, market }) => (
          <tr role="row" key={token.symbol}>
            <td role="cell">
              <PairInline
                base={token.symbol}
                quote={token.quote}
                kind={token.quoteKind}
                baseImageUrl={market.status === "ready" ? market.data.imageUrl : null}
              />
            </td>
            <td role="cell" className="truncate text-ui text-teal">
              <CellLabel text="Name" />
              {token.name}
            </td>
            <MarketCells market={market} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
