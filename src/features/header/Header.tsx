import { ChevronMark } from "../../brand/Chevron.tsx";

interface HeaderProps {
  connectedAs: string | null;
  onWalletClick: () => void;
}

export default function Header({ connectedAs, onWalletClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-ground/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-5 px-4 sm:gap-8 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 text-steel transition-colors hover:text-ice">
          <ChevronMark className="h-6 w-auto" />
          <span className="text-[15px] font-black tracking-tight text-ice">sThink</span>
        </a>

        <nav aria-label="Sections" className="flex items-center gap-4 text-[13px] sm:gap-6">
          <a href="#tokens" className="text-teal transition-colors hover:text-ice">
            Tokens
          </a>
          <a href="#launch" className="text-teal transition-colors hover:text-ice">
            Launch
          </a>
        </nav>

        <button
          type="button"
          onClick={onWalletClick}
          className="ml-auto rounded-sm border border-edge bg-surface px-3 py-1.5 text-[13px] text-steel transition-colors hover:border-steel/40 hover:text-ice"
        >
          {connectedAs ? (
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rise" aria-hidden="true" />
              <span className="font-mono">{connectedAs}</span>
            </span>
          ) : (
            "Connect wallet"
          )}
        </button>
      </div>
    </header>
  );
}
