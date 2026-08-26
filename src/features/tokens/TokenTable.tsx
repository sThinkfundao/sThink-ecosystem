import { PairInline, PairStackVertical } from "../../brand/PairStack.tsx";
import ChevronLoader from "../../brand/ChevronLoader.tsx";
import { useTokenMarket } from "../../lib/dexscreener/useMarketData.ts";
import { formatPct, formatUsdCompact, formatUsdPrice } from "../../lib/format.ts";
import { QUOTE_KIND_LABELS, type IndexToken } from "./fixtures.ts";

const COLUMNS = ["Pair", "Name", "Price", "24h", "Market cap", "Liquidity"] as const;

function EmptyCell({ text = "not live yet" }: { text?: string }) {
  return <span className="text-label uppercase text-teal">{text}</span>;
}

function MarketCells({ token }: { token: IndexToken }) {
  const market = useTokenMarket(token.address);

  if (market.status === "ready") {
    const { priceUsd, change24hPct, marketCapUsd, liquidityUsd } = market.data;
    const changeColor =
      change24hPct === null ? "text-steel" : change24hPct >= 0 ? "text-rise" : "text-fall";
    return (
      <>
        <td role="cell" className="font-mono text-ui text-steel">
          <span className="cell-label text-label uppercase text-teal">Price</span>
          {priceUsd === null ? <EmptyCell text="—" /> : formatUsdPrice(priceUsd)}
        </td>
        <td role="cell" className={`font-mono text-ui ${changeColor}`}>
          <span className="cell-label text-label uppercase text-teal">24h</span>
          {change24hPct === null ? <EmptyCell text="—" /> : formatPct(change24hPct)}
        </td>
        <td role="cell" className="font-mono text-ui text-steel">
          <span className="cell-label text-label uppercase text-teal">Market cap</span>
          {marketCapUsd === null ? <EmptyCell text="—" /> : formatUsdCompact(marketCapUsd)}
        </td>
        <td role="cell" className="font-mono text-ui text-steel">
          <span className="cell-label text-label uppercase text-teal">Liquidity</span>
          {liquidityUsd === null ? <EmptyCell text="—" /> : formatUsdCompact(liquidityUsd)}
        </td>
      </>
    );
  }

  const placeholder =
    market.status === "loading" ? (
      <ChevronLoader />
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
          <span className="cell-label text-label uppercase text-teal">{column}</span>
          {placeholder}
        </td>
      ))}
    </>
  );
}

export default function TokenTable({ tokens }: { tokens: IndexToken[] }) {
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
        {tokens.map((token) => (
          <tr role="row" key={token.symbol}>
            <td role="cell" data-span="">
              <span className="hidden sm:inline-flex">
                <PairInline base={token.symbol} quote={token.quote} />
              </span>
              <span className="flex justify-center py-1 sm:hidden">
                <PairStackVertical base={token.symbol} quote={token.quote} />
              </span>
            </td>
            <td role="cell" data-span="" className="text-center text-ui text-steel sm:text-left">
              <span className="cell-label text-label uppercase text-teal">Name</span>
              {token.name}
              <span className="mt-0.5 block text-label uppercase text-teal sm:hidden">
                quoted in {QUOTE_KIND_LABELS[token.quoteKind].toLowerCase()}
              </span>
            </td>
            <MarketCells token={token} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
