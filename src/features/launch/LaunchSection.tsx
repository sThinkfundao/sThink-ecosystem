import { useState, type FormEvent } from "react";
import { ChevronSingle } from "../../brand/Chevron.tsx";
import { PairStackVertical } from "../../brand/PairStack.tsx";
import Button from "../../components/Button.tsx";
import Modal from "../../components/Modal.tsx";
import { QUOTE_KIND_LABELS, type QuoteKind } from "../tokens/fixtures.ts";

const QUOTE_OPTIONS: { symbol: string; label: string; kind: QuoteKind }[] = [
  { symbol: "XAU", label: "Gold", kind: "commodity" },
  { symbol: "XAG", label: "Silver", kind: "commodity" },
  { symbol: "TSLA", label: "Tesla", kind: "stock" },
  { symbol: "SPY", label: "S&P 500", kind: "stock" },
  { symbol: "EUR", label: "Euro", kind: "currency" },
  { symbol: "JPY", label: "Yen", kind: "currency" },
  { symbol: "SOL", label: "Solana", kind: "coin" },
  { symbol: "WIF", label: "dogwifhat", kind: "coin" },
];

interface FormErrors {
  name?: string;
  symbol?: string;
  quote?: string;
}

function validate(name: string, symbol: string, quote: string | null): FormErrors {
  const errors: FormErrors = {};
  if (name.trim().length === 0) errors.name = "Give the token a name.";
  else if (name.trim().length > 32) errors.name = "Keep the name under 32 characters.";
  if (symbol.trim().length < 2) errors.symbol = "Symbol needs 2 to 10 characters.";
  else if (!/^[A-Z0-9]{2,10}$/.test(symbol.trim())) {
    errors.symbol = "Uppercase letters and digits only.";
  }
  if (!quote) errors.quote = "Pick what the token trades against.";
  return errors;
}

export default function LaunchSection() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [quote, setQuote] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const quoteOption = QUOTE_OPTIONS.find((q) => q.symbol === quote) ?? null;
  const previewSymbol = symbol.trim() || "TOKEN";

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validate(name, symbol, quote);
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  return (
    <section id="launch" className="border-b border-edge">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="flex items-center gap-2.5">
          <ChevronSingle className="h-2.5 w-auto text-sky" />
          <span className="font-display text-label text-steel">Launch</span>
        </h2>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_minmax(280px,360px)]">
          <form onSubmit={onSubmit} noValidate className="max-w-xl">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="launch-name" className="text-label font-bold uppercase text-teal">
                  Name
                </label>
                <input
                  id="launch-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={48}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "launch-name-error" : undefined}
                  className="mt-1.5 block min-h-11 w-full rounded-sm border border-edge bg-surface px-3 text-ui text-steel outline-none placeholder:text-teal focus:border-steel/40"
                  placeholder="Example token"
                />
                {errors.name && (
                  <p id="launch-name-error" className="mt-1.5 text-ui text-fall">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="launch-symbol" className="text-label font-bold uppercase text-teal">
                  Symbol
                </label>
                <input
                  id="launch-symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  maxLength={10}
                  aria-invalid={Boolean(errors.symbol)}
                  aria-describedby={errors.symbol ? "launch-symbol-error" : undefined}
                  className="mt-1.5 block min-h-11 w-full rounded-sm border border-edge bg-surface px-3 font-mono text-ui text-steel outline-none placeholder:font-sans placeholder:text-teal focus:border-steel/40"
                  placeholder="EXMPL"
                />
                {errors.symbol && (
                  <p id="launch-symbol-error" className="mt-1.5 text-ui text-fall">
                    {errors.symbol}
                  </p>
                )}
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="text-label font-bold uppercase text-teal">Quote</legend>
              <p className="mt-1 text-ui text-teal">What the token trades against.</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {QUOTE_OPTIONS.map((option) => {
                  const active = quote === option.symbol;
                  return (
                    <button
                      key={option.symbol}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setQuote(option.symbol)}
                      className={`group flex min-h-11 flex-col items-start rounded-sm border px-3 py-2 text-left transition-colors duration-100 active:translate-y-px ${
                        active
                          ? "border-sky/60 bg-panel"
                          : "border-edge bg-surface hover:border-steel/40"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-mono text-ui font-bold text-sky">
                        <ChevronSingle
                          className={`h-[7px] w-auto transition-transform duration-100 group-hover:-translate-y-px ${
                            active ? "text-sky" : "text-teal"
                          }`}
                        />
                        {option.symbol}
                      </span>
                      <span className="mt-0.5 text-label text-teal">
                        {option.label} · {QUOTE_KIND_LABELS[option.kind]}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.quote && <p className="mt-2 text-ui text-fall">{errors.quote}</p>}
            </fieldset>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button variant="primary" type="submit">
                Review launch
              </Button>
              <p className="text-ui text-teal">Nothing deploys from this preview build.</p>
            </div>
          </form>

          <aside aria-label="Launch preview" className="lg:border-l lg:border-edge lg:pl-10">
            <h3 className="text-label font-bold uppercase text-teal">Your pair</h3>
            <div className="mt-5 flex justify-center rounded-sm border border-edge bg-surface px-6 py-8">
              <PairStackVertical base={previewSymbol} quote={quote ?? "?"} />
            </div>
            <dl className="mt-5 space-y-2.5 text-ui">
              <div className="flex justify-between gap-4">
                <dt className="text-teal">Pool</dt>
                <dd className="text-right text-steel">
                  {quoteOption
                    ? `${previewSymbol} quoted in ${quoteOption.symbol}`
                    : "opens quoted in your pick"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-teal">Supply</dt>
                <dd className="text-right text-steel">fixed, minted at launch</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-teal">Parameters</dt>
                <dd className="text-right text-steel">set at deployment</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>

      <Modal open={submitted} onClose={() => setSubmitted(false)} labelledBy="launch-review-title">
        <div className="p-5">
          <h2 id="launch-review-title" className="text-title font-bold text-ice">
            Ready to launch
          </h2>
          <p className="mt-1.5 text-ui text-teal">
            This is what would happen when deployment goes live:
          </p>
          <div className="mt-5 flex justify-center rounded-sm border border-edge bg-surface px-6 py-7">
            <PairStackVertical base={previewSymbol} quote={quote ?? "?"} />
          </div>
          <ul className="mt-5 space-y-2 text-ui text-steel">
            <li>
              {name.trim() || "Your token"} mints with symbol{" "}
              <span className="font-mono text-ice">{previewSymbol}</span>.
            </li>
            <li>
              A pool opens quoted in{" "}
              <span className="font-mono text-sky">{quoteOption?.symbol ?? "your pick"}</span>; the
              pair trades from its first block.
            </li>
            <li>The token appears in the index with live market data.</li>
          </ul>
          <p className="mt-4 border-t border-edge pt-4 text-ui text-teal">
            Deployment is not wired in this preview build, so nothing was created.
          </p>
          <Button variant="primary" onClick={() => setSubmitted(false)} className="mt-5 w-full">
            Back to the form
          </Button>
        </div>
      </Modal>
    </section>
  );
}
