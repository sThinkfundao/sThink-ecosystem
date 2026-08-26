import { useState } from "react";
import { ChevronMark } from "../../brand/Chevron.tsx";
import Modal from "../../components/Modal.tsx";
import Button from "../../components/Button.tsx";
import { external, isSet } from "../../config.ts";

type LegalDoc = "terms" | "privacy";

const LEGAL: Record<LegalDoc, { title: string; paragraphs: string[] }> = {
  terms: {
    title: "Terms of use",
    paragraphs: [
      "sThink is an interface for launching and browsing tokens on Solana. It does not custody funds, execute trades on your behalf, or give financial advice.",
      "Tokens launched through the platform are created by their launchers, not by sThink. A pairing is a market structure, not an endorsement of either side of the pair.",
      "Market data is read from public sources and can lag or be wrong. Verify anything that matters against the chain.",
      "Final terms ship with deployment. Until then this build creates nothing on chain and holds nothing of yours.",
    ],
  },
  privacy: {
    title: "Privacy",
    paragraphs: [
      "This site keeps no accounts, sets no tracking cookies, and stores nothing you type beyond the current page session.",
      "Market data requests go to the DexScreener public API; those requests carry your IP address, as any web request does.",
      "A full policy ships with deployment.",
    ],
  },
};

export default function Footer() {
  const [doc, setDoc] = useState<LegalDoc | null>(null);
  const open = doc ? LEGAL[doc] : null;

  return (
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-10 sm:px-6">
      <ChevronMark className="h-5 w-auto text-teal" />
      <nav aria-label="External links" className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {isSet(external.social.x) && (
          <a
            href={external.social.x}
            target="_blank"
            rel="noopener noreferrer"
            className="hit py-1 text-ui text-teal transition-colors hover:text-ice"
          >
            X
          </a>
        )}
        {isSet(external.repo) && (
          <a
            href={external.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="hit py-1 text-ui text-teal transition-colors hover:text-ice"
          >
            GitHub
          </a>
        )}
        <button
          type="button"
          onClick={() => setDoc("terms")}
          className="hit py-1 text-ui text-teal transition-colors hover:text-ice"
        >
          Terms
        </button>
        <button
          type="button"
          onClick={() => setDoc("privacy")}
          className="hit py-1 text-ui text-teal transition-colors hover:text-ice"
        >
          Privacy
        </button>
      </nav>
      <p className="ml-auto text-label uppercase text-teal">Launch coins · pair with everything</p>

      <Modal open={doc !== null} onClose={() => setDoc(null)} labelledBy="legal-title">
        {open && (
          <div className="p-5">
            <h2 id="legal-title" className="text-title font-bold text-ice">
              {open.title}
            </h2>
            <div className="mt-4 space-y-3">
              {open.paragraphs.map((text) => (
                <p key={text.slice(0, 24)} className="text-ui text-steel">
                  {text}
                </p>
              ))}
            </div>
            <Button onClick={() => setDoc(null)} className="mt-5 w-full">
              Close
            </Button>
          </div>
        )}
      </Modal>
    </footer>
  );
}
