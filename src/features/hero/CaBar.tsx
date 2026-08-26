import { useEffect, useState } from "react";
import { CA_PLACEHOLDER, external, isSet } from "../../config.ts";

function truncate(address: string): string {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export default function CaBar() {
  const address = external.contractAddress;
  const live = isSet(address);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 rounded-sm border border-edge bg-surface px-3 py-2">
      <span className="text-label font-bold uppercase text-teal">CA</span>
      <span className="font-mono text-ui text-steel" title={live ? address : undefined}>
        {live ? truncate(address) : CA_PLACEHOLDER}
      </span>
      <button
        type="button"
        disabled={!live}
        onClick={() => {
          if (live) void navigator.clipboard.writeText(address);
          setCopied(true);
        }}
        title={live ? "Copy contract address" : "Copy enables when the token deploys"}
        className="hit rounded-sm border border-edge px-2.5 py-1 text-ui text-steel transition-colors duration-100 enabled:hover:border-steel/40 enabled:hover:text-ice enabled:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      {!live && <span className="text-label uppercase text-teal">not live yet</span>}
      <span role="status" className="sr-only">
        {copied ? "Contract address copied" : ""}
      </span>
    </div>
  );
}
