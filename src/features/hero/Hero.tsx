import { useEffect, useState } from "react";
import { ChevronMark } from "../../brand/Chevron.tsx";
import TokenMark from "../../brand/TokenMark.tsx";
import Button, { buttonClasses } from "../../components/Button.tsx";
import { useReducedMotion } from "../../lib/useReducedMotion.ts";
import type { QuoteKind } from "../../lib/quoteKinds.ts";
import CaBar from "./CaBar.tsx";
import SocialLinks from "./SocialLinks.tsx";
import MarketStrip from "./MarketStrip.tsx";
import HowPairingWorks from "./HowPairingWorks.tsx";

/* One pass through the quote categories, then rest back on the first. */
const QUOTES: { symbol: string; kind: QuoteKind | null }[] = [
  { symbol: "ANYTHING", kind: null },
  { symbol: "XAU", kind: "commodity" },
  { symbol: "TSLA", kind: "stock" },
  { symbol: "EUR", kind: "currency" },
  { symbol: "WIF", kind: "coin" },
];

/* The rail ends where it began, so the rest state needs no jump back. */
const RAIL = [...QUOTES, QUOTES[0]!];
const ROW_HEIGHT_REM = 3.25;

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [howOpen, setHowOpen] = useState(false);

  useEffect(() => {
    if (reducedMotion || step >= QUOTES.length) return;
    const delay = step === 0 ? 2400 : 1900;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step, reducedMotion]);

  const active = RAIL[step] ?? QUOTES[0]!;

  return (
    <section className="border-b border-edge">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div>
          <h1 className="font-display max-w-xl text-display-sm text-ice sm:text-display">
            Launch a coin against anything
          </h1>
          <p className="mt-5 max-w-md text-body text-teal">
            A token on sThink names its own quote: a stock, a currency, a commodity, another
            coin. The pair is the product.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#launch" className={buttonClasses("primary")}>
              Launch a token
            </a>
            <Button variant="quiet" onClick={() => setHowOpen(true)}>
              How pairing works
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CaBar />
            <SocialLinks />
          </div>
          <div className="mt-4 max-w-xl">
            <MarketStrip />
          </div>
        </div>

        <div className="justify-self-center">
          <p className="sr-only">
            Launch a coin and pair it with gold, stocks, currencies, or other coins.
          </p>
          <div
            aria-hidden="true"
            className="raised-2 flex w-[19rem] flex-col items-center rounded-md px-8 pb-2 pt-8"
          >
            <span className="inline-flex items-center gap-3 animate-[settle-in_0.5s_ease-out_both]">
              <TokenMark symbol="EXAMPLE" kind={active.kind} size="lg" />
              <span className="font-mono text-3xl font-bold leading-none tracking-tight text-ice">
                EXAMPLE
              </span>
            </span>
            <ChevronMark className="my-5 h-12 w-auto animate-[mark-in_0.6s_ease-out_0.15s_both] text-steel" />
            <div
              className="w-full overflow-hidden animate-[rise-in_0.45s_ease-out_0.3s_both] [mask-image:linear-gradient(to_bottom,black_45%,transparent_96%)]"
              style={{ height: `${ROW_HEIGHT_REM * 2.5}rem` }}
            >
              <ul
                className="transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${step * ROW_HEIGHT_REM}rem)` }}
              >
                {RAIL.map((quote, i) => (
                  <li
                    key={`${quote.symbol}-${i}`}
                    className={`flex items-center justify-center gap-3 transition-opacity duration-500 ${
                      i === step ? "opacity-100" : "opacity-35"
                    }`}
                    style={{ height: `${ROW_HEIGHT_REM}rem` }}
                  >
                    <TokenMark symbol={quote.symbol} kind={quote.kind} size="md" />
                    <span
                      className={`font-mono text-3xl font-bold leading-none tracking-tight ${
                        i === step ? "text-sky" : "text-teal"
                      }`}
                    >
                      {quote.symbol}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <HowPairingWorks open={howOpen} onClose={() => setHowOpen(false)} />
    </section>
  );
}
