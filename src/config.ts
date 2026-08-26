/**
 * Deployment configuration.
 *
 * `contractAddress` is empty until the token is deployed. While it is empty
 * the site renders placeholder state everywhere market data would appear:
 * the CA bar shows a placeholder with copying disabled, and no market
 * requests are made. Paste the deployed mint address here to go live —
 * the CA bar, copy button and market data cells pick it up on the next build.
 */
export const config = {
  contractAddress: "",
  caPlaceholder: "xxxxxxxxxxxxpump",
  links: {
    x: "https://x.com/sThinkfun",
    github: "https://github.com/sThinkfun/sThink-ecosystem",
  },
} as const;

export function isLive(): boolean {
  return config.contractAddress.length > 0;
}
