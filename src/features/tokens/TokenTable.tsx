import { PairInline, PairStackVertical } from "../../brand/PairStack.tsx";
import ChevronLoader from "../../brand/ChevronLoader.tsx";
import Delta from "../../components/Delta.tsx";
import type { MarketState } from "../../lib/dexscreener/useMarketData.ts";
import { formatUsdCompact, formatUsdPrice } from "../../lib/format.ts";
import type { IndexToken } from "./fixtures.ts";

const COLUMNS = [
  { label: "Pair", numeric: false },
  { label: "Name", numeric: false },
  { label: "Price", numeric: true },
  { label: "24h", numeric: true },
  { label: "Market cap", numeric: true },
  { label: "Liquidity", numeric: true },
] as const;

const MARKET_COLUMNS = COLUMNS.slice(2);

export interface TokenRow {
  token: IndexToken;
  market: MarketState;
}

function CellLabel({ text }: { text: string }) {
  return (
    <span aria-hidden="true" className="cell-label text-label uppercase text-teal">
      {text}
    </span>
  );
}

function EmptyCell({ text = "not live yet" }: { text?: string }) {
  return <span className="text-label uppercase text-teal">{text}</span>;
}

function MarketCells({ market }: { market: MarketState }) {
  if (market.status === "ready") {
    const { priceUsd, change24hPct, marketCapUsd, liquidityUsd } = market.data;
    return (
      <>
        {/* Price is the second voice after the pair, so it carries weight. */}
        <td role="cell" data-num="" className="font-mono text-ui font-bold text-ice">
          <CellLabel text="Price" />
          {priceUsd === null ? <EmptyCell text="—" /> : formatUsdPrice(priceUsd)}
        </td>
        <td role="cell" data-num="" className="text-ui">
          <CellLabel text="24h" />
          {change24hPct === null ? <EmptyCell text="—" /> : <Delta value={change24hPct} />}
        </td>
        <td role="cell" data-num="" className="font-mono text-ui text-steel">
          <CellLabel text="Market cap" />
          {marketCapUsd === null ? <EmptyCell text="—" /> : formatUsdCompact(marketCapUsd)}
        </td>
        <td role="cell" data-num="" className="font-mono text-ui text-steel">
          <CellLabel text="Liquidity" />
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
          <CellLabel text={column.label} />
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
            <td role="cell" data-span="">
              <span className="hidden sm:inline-flex">
                <PairInline
                  base={token.symbol}
                  quote={token.quote}
                  kind={token.quoteKind}
                  baseImageUrl={market.status === "ready" ? market.data.imageUrl : null}
                />
              </span>
              <span className="flex justify-center py-1 sm:hidden">
                <PairStackVertical
                  base={token.symbol}
                  quote={token.quote}
                  kind={token.quoteKind}
                  baseImageUrl={market.status === "ready" ? market.data.imageUrl : null}
                />
              </span>
            </td>
            <td role="cell" data-span="" className="text-center text-ui text-teal sm:text-left">
              <CellLabel text="Name" />
              {token.name}
              <span className="mt-0.5 block text-label uppercase text-teal sm:hidden">
                {token.quoteKind} pair
              </span>
            </td>
            <MarketCells market={market} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
