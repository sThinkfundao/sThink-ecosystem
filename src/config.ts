/**
 * Every identifier that points outside this repository lives here: the
 * deployed contract address, social links, repository URLs. They all change
 * late in the project, so nothing else in the codebase hard-codes one.
 *
 * `null` means not yet available. UI reading one of these must check
 * `isSet` and render its placeholder state — a disabled control with a
 * visible reason, a "not live yet" cell — never a dead link.
 */

export type Maybe<T> = T | null;

export function isSet<T>(value: Maybe<T>): value is T {
  return value !== null;
}

export interface ExternalConfig {
  /** Deployed token mint. Fills the CA bar and unlocks market data. */
  contractAddress: Maybe<string>;
  social: {
    x: Maybe<string>;
  };
  repo: Maybe<string>;
  docs: Maybe<string>;
}

export const external: ExternalConfig = {
  contractAddress: null,
  social: {
    x: "https://x.com/sThinkfun",
  },
  repo: "https://github.com/sThinkfundao/sThink-ecosystem",
  docs: null,
};

/** Rendered in the CA bar while `contractAddress` is null. */
export const CA_PLACEHOLDER = "xxxxxxxxxxxxpump";
