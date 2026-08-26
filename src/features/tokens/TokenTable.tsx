import { PairInline, PairStackVertical } from "../../brand/PairStack.tsx";
import ChevronLoader from "../../brand/ChevronLoader.tsx";
import Delta from "../../components/Delta.tsx";
import type { MarketState } from "../../lib/dexscreener/useMarketData.ts";
import { formatUsdCompact, formatUsdPrice } from "../../lib/format.ts";
import type { IndexToken } from "./fixtures.ts";

const COLUMNS = ["Pair", "Name", "Price", "24h", "Market cap", "Liquidity"] as const;

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
        <td role="cell" className="font-mono text-ui text-steel">
          <CellLabel text="Price" />
          {priceUsd === null ? <EmptyCell text="—" /> : formatUsdPrice(priceUsd)}
        </td>
        <td role="cell" className="text-ui">
          <CellLabel text="24h" />
          {change24hPct === null ? <EmptyCell text="—" /> : <Delta value={change24hPct} />}
        </td>
        <td role="cell" className="font-mono text-ui text-steel">
          <CellLabel text="Market cap" />
          {marketCapUsd === null ? <EmptyCell text="—" /> : formatUsdCompact(marketCapUsd)}
        </td>
        <td role="cell" className="font-mono text-ui text-steel">
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
      {COLUMNS.slice(2).map((column) => (
        <td role="cell" key={column}>
          <CellLabel text={column} />
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
              key={column}
              role="columnheader"
              scope="col"
              className="text-left text-label font-bold uppercase text-teal"
            >
              {column}
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
            <td role="cell" data-span="" className="text-center text-ui text-steel sm:text-left">
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
