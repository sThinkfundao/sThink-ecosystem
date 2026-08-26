import { useEffect, useState } from "react";
import { ChevronMark } from "../../brand/Chevron.tsx";
import Button, { buttonClasses } from "../../components/Button.tsx";
import { useReducedMotion } from "../../lib/useReducedMotion.ts";
import CaBar from "./CaBar.tsx";
import SocialLinks from "./SocialLinks.tsx";
import MarketStrip from "./MarketStrip.tsx";
import HowPairingWorks from "./HowPairingWorks.tsx";

/* One pass through the quote categories, then rest back on the first. */
const QUOTES = ["ANYTHING", "XAU", "TSLA", "EUR", "WIF"];

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

  const quote = QUOTES[step % QUOTES.length] ?? QUOTES[0];
  const quoteAnimation =
    step === 0
      ? "animate-[rise-in_0.45s_ease-out_0.3s_both]"
      : "animate-[rise-in_0.35s_ease-out_both]";

  return (
    <section className="border-b border-edge">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
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

        <div className="justify-self-center lg:pr-6">
          <p className="sr-only">
            Launch a coin and pair it with gold, stocks, currencies, or other coins.
          </p>
          <div aria-hidden="true" className="flex flex-col items-center gap-5">
            <span
              className="animate-[settle-in_0.5s_ease-out_both] font-mono text-4xl font-bold leading-none tracking-tight text-ice sm:text-5xl"
            >
              EXAMPLE
            </span>
            <ChevronMark className="h-14 w-auto animate-[mark-in_0.6s_ease-out_0.15s_both] text-steel sm:h-16" />
            <span
              key={quote}
              className={`inline-block min-w-[8ch] text-center font-mono text-4xl font-bold leading-none tracking-tight text-sky sm:text-5xl ${quoteAnimation}`}
            >
              {quote}
            </span>
          </div>
        </div>
      </div>

      <HowPairingWorks open={howOpen} onClose={() => setHowOpen(false)} />
    </section>
  );
}
