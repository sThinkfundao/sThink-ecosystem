# sThink — Build Brief

## What this is

A token launchpad front-end for Solana. Users browse tokens that have been launched on the
platform, and launch their own. The product's angle is pairing: a token isn't quoted against
SOL by default — it can be quoted against a stock, a commodity, a currency, another memecoin.
That pairing idea is the whole product, and it should be legible in the first three seconds
on the page.

Ship a working front-end. No contract calls, no RPC writes, no wallet signing. Every control
must be functional in the sense that it responds, changes state, and leads somewhere — but
nothing touches a chain.

## Constraints you cannot move

**Brand is fixed.** The mark is a stacked double chevron, steel blue on near-black. Palette:
`#0d1519` base, `#b0cddb` primary accent. Both come from the supplied logo files — sample them,
don't approximate. Build the rest of the scale from those two.

**Every button works.** This is the client's single stated acceptance criterion. Nothing is a
dead `<button>`. Nothing is `href="#"`. If a control exists, clicking it opens something, filters
something, navigates somewhere, or changes visible state. A control that can't do its real job
yet still does something honest — opens a modal that explains what it will do, shows a disabled
state with a reason, routes to a stub page that looks finished.

**Contract address is not live yet.** The CA bar renders `xxxxxxxxxxxxpump` as a placeholder.
While the value is a placeholder, the copy button is disabled with a visible reason. The moment
a real address is dropped into config, the copy button enables and the market data block fills
itself. Build that transition now; don't leave it as a TODO.

**No fabricated numbers.** Market cap, liquidity, volume, holder count — these are either real
or they show an explicit empty state. Never a plausible-looking placeholder number. A card that
says "not live yet" is correct. A card that says "$1.2M" when nothing is deployed is not.

## Explicit non-goals

- Wallet connection that actually connects. The modal lists wallets, has selection state, and
  closes into a mock connected state. It does not call `window.solana`.
- Any smart contract interaction, transaction building, or signing.
- Backend. This is static, deployed to Cloudflare Pages.
- Auth, accounts, persistence beyond in-memory state.

## Design direction

The functional reference is stonkfun.xyz — same category, same primitives. Look at it to
understand what a launchpad page needs to contain: the token grid, the pairing filters, the sort
and search affordances, the launch flow entry point. Take the information architecture.

Do not take the visual design, the layout, the type treatment, or a single line of copy. The
client explicitly asked for a distinct identity. If someone opens both tabs, they should read as
two different companies who happen to be in the same business.

Research three or four other Solana launchpads and DeFi terminals before you design anything.
Note what they all do the same way — that's the convention users expect, keep it. Note where
they're all equally lazy — that's where the opportunity is. Write down what you found and what
you're doing differently before writing CSS.

The one thing worth spending real effort on: the chevron. It's two arrows stacked, which is
literally two things paired. That's the product thesis sitting in the logo already. Use it as
the structural motif — the pair separator in `TOKEN ⌃ PAIR`, the section markers, the loading
state, the hover affordance on pair chips. One idea, executed everywhere, quietly. Don't add a
second decorative system on top of it.

Type: pick a display face with actual character and a body face that stays readable at 13px in
dense table rows. Not Inter for both. Not a Google Fonts default pairing you'd reach for on any
dashboard. Monospace for addresses, tickers, and numeric columns — real tabular figures, not
`font-variant-numeric` as an afterthought.

Copy: write it yourself, all of it. Plain verbs, sentence case, no crypto-marketing filler. No
"revolutionize", no "seamlessly", no "empowering". A control says what happens when you press it.
An empty state says what to do next. Read every string back and cut the ones that are decoration.

Motion: one orchestrated moment, not scattered effects. Respect `prefers-reduced-motion`.

## Content the page needs

- Header: mark, nav, wallet control
- Hero: the pairing thesis, the CA bar with copy, social row
- Token index: search, pair-type filters, sort, the grid itself
- Launch entry: a form that validates and shows what would happen
- Footer: X (`x.com/sThinkfun`), GitHub (`github.com/sThinkfun/sThink-ecosystem`), the usual legal stubs

The social row pattern to match is the one on creatorfi.trade — inline icon strip directly under
the address bar, not buried in the footer.

## Data

Token market data comes from DexScreener's public API — no key, no auth. Read the current docs
before wiring it; don't write the endpoint from memory.

Wrap it properly: a typed client, one place that normalizes the response shape, sane cache, retry
with backoff, and a degraded state that reports "unavailable" instead of throwing. When no real
contract address is configured, the client short-circuits and the UI renders its empty state.
That path is the one that runs today, so it has to look finished — it's what the client sees first.

Seed the grid from a local fixture so the layout is reviewable before any address exists. Keep the
fixture obviously synthetic — `EXAMPLE`, `SAMPLE`, never a real-looking ticker with a real-looking
number.

## Stack and quality bar

Vite + React + TypeScript, strict mode on. Tailwind. Local dev first — `npm run dev` and it works,
no environment setup, no secrets required.

Structure it like something that will be maintained: feature folders, not a `components/` dump.
Data fetching separated from rendering. Types derived from the API shape, not hand-copied. No
`any`. No commented-out code. No console noise in the committed build.

Responsive down to 360px, and mean it — the token grid is the hard part, solve it properly rather
than hiding columns. Visible keyboard focus on every interactive element. Semantic markup; the
token grid is tabular data, so mark it up as such.

Build clean. Zero warnings.

## Deliverable

A repo that runs locally with `npm i && npm run dev`, builds with `npm run build`, and is ready
to point Cloudflare Pages at. Include a short README covering the config file where the contract
address goes and what flips on when it's filled in.
