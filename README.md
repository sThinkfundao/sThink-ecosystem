# sThink

Token launchpad front-end for Solana. Tokens launched here name their own
quote — a stock, a currency, a commodity, another coin — and the interface
is built around that pairing.

## Run it

```bash
npm install
npm run dev
```

`npm run build` produces a static site in `dist/`.

## Configuration

Every identifier that points outside the repository lives in
[`src/config.ts`](src/config.ts): the contract address, social links, the
repository URL. A value of `null` means not yet available, and the UI
renders a placeholder state for it instead of a dead link.

The one that matters at deployment is `contractAddress`. While it is
`null`:

- the CA bar shows `xxxxxxxxxxxxpump` with copying disabled and a visible
  "not live yet" reason,
- the market data strip and table cells render their empty states,
- no market data requests leave the page.

Paste the deployed mint address into `contractAddress` and rebuild: the CA
bar shows and copies the real address, and market data (DexScreener public
API, no key required) fills the strip.

## Deploy

Static output, no server, no secrets. For Cloudflare Pages: build command
`npm run build`, output directory `dist`.
