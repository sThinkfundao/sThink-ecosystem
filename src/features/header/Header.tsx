import { ChevronMark } from "../../brand/Chevron.tsx";
import Button from "../../components/Button.tsx";
import { useScrolled } from "../../lib/useScrolled.ts";

interface HeaderProps {
  connectedAs: string | null;
  onWalletClick: () => void;
}

export default function Header({ connectedAs, onWalletClick }: HeaderProps) {
  const scrolled = useScrolled();

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-200 ${
        scrolled
          ? "border-b border-edge bg-ground/85 shadow-[0_4px_16px_rgba(2,6,9,0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-ground"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center gap-2 px-4 transition-[height] duration-200 sm:gap-9 sm:px-6 ${
          scrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"
        }`}
      >
        {/* The mark reads top-heavy, so it sits a hair low of true center. */}
        <a
          href="#top"
          className="hit flex items-center gap-3 text-steel transition-colors hover:text-ice"
        >
          <ChevronMark className="h-8 w-auto translate-y-[1px]" />
          <span className="mt-px text-[17px] font-black leading-none tracking-tight text-ice">
            sThink
          </span>
        </a>

        <nav aria-label="Sections" className="flex items-center gap-2 sm:gap-4">
          <a
            href="#tokens"
            className="hit px-1 py-2 text-ui text-teal transition-colors hover:text-ice sm:px-1.5"
          >
            Tokens
          </a>
          <a
            href="#launch"
            className="hit px-1 py-2 text-ui text-teal transition-colors hover:text-ice sm:px-1.5"
          >
            Launch
          </a>
        </nav>

        {/* The row must never push past the gutter, so the button cannot shrink
            and its label shortens before the layout would break. */}
        <Button
          variant={connectedAs ? "secondary" : "primary"}
          onClick={onWalletClick}
          className="ml-auto shrink-0 max-sm:px-3"
        >
          {connectedAs ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-rise" aria-hidden="true" />
              <span className="max-w-[6rem] truncate font-mono font-normal sm:max-w-none">
                {connectedAs}
                <span className="hidden sm:inline"> · demo</span>
              </span>
            </>
          ) : (
            <>
              <span className="sm:hidden">Connect</span>
              <span className="hidden sm:inline">Connect wallet</span>
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
