import { useEffect, useRef, useState } from "react";

const WALLETS = ["Phantom", "Solflare", "Backpack", "Ledger"] as const;
export type WalletName = (typeof WALLETS)[number];

interface WalletModalProps {
  open: boolean;
  connectedAs: WalletName | null;
  onConnect: (wallet: WalletName) => void;
  onDisconnect: () => void;
  onClose: () => void;
}

export default function WalletModal({
  open,
  connectedAs,
  onConnect,
  onDisconnect,
  onClose,
}: WalletModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<WalletName | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setSelected(connectedAs);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, connectedAs]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close();
      }}
      aria-labelledby="wallet-modal-title"
      className="m-auto w-[min(92vw,360px)] rounded-md border border-edge bg-panel p-0 text-steel backdrop:bg-ground/70"
    >
      <div className="p-5">
        <h2 id="wallet-modal-title" className="text-[15px] font-bold text-ice">
          {connectedAs ? "Wallet" : "Connect a wallet"}
        </h2>
        <p className="mt-1 text-[13px] leading-5 text-teal">
          {connectedAs
            ? `Connected with ${connectedAs} in demo mode.`
            : "Connection is simulated in this preview build. No wallet extension is contacted."}
        </p>

        <ul className="mt-4 space-y-2">
          {WALLETS.map((wallet) => {
            const isSelected = selected === wallet;
            return (
              <li key={wallet}>
                <button
                  type="button"
                  onClick={() => setSelected(wallet)}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center gap-3 rounded-sm border px-3 py-2.5 text-left text-[13px] transition-colors ${
                    isSelected
                      ? "border-sky/60 bg-surface text-ice"
                      : "border-edge bg-surface/50 hover:border-steel/40 hover:text-ice"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-sm border border-edge bg-ground font-mono text-[12px] text-sky"
                  >
                    {wallet[0]}
                  </span>
                  {wallet}
                  {connectedAs === wallet && (
                    <span className="ml-auto text-[11px] text-rise">connected</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            disabled={!selected || selected === connectedAs}
            onClick={() => {
              if (selected) onConnect(selected);
            }}
            className="flex-1 rounded-sm bg-steel px-3 py-2 text-[13px] font-bold text-ground transition-colors enabled:hover:bg-ice disabled:cursor-not-allowed disabled:opacity-40"
          >
            {connectedAs ? "Switch" : "Connect"}
          </button>
          {connectedAs && (
            <button
              type="button"
              onClick={onDisconnect}
              className="rounded-sm border border-edge px-3 py-2 text-[13px] transition-colors hover:border-fall/60 hover:text-fall"
            >
              Disconnect
            </button>
          )}
        </div>
        {!selected && !connectedAs && (
          <p className="mt-2 text-[11px] text-teal/80">Pick a wallet to continue.</p>
        )}
      </div>
    </dialog>
  );
}
