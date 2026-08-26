import { useEffect, useState } from "react";
import Modal from "../../components/Modal.tsx";
import Button from "../../components/Button.tsx";

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
  const [selected, setSelected] = useState<WalletName | null>(null);

  useEffect(() => {
    if (open) setSelected(connectedAs);
  }, [open, connectedAs]);

  return (
    <Modal open={open} onClose={onClose} labelledBy="wallet-modal-title">
      <div className="p-5">
        <h2 id="wallet-modal-title" className="text-title font-bold text-ice">
          {connectedAs ? "Wallet" : "Connect a wallet"}
        </h2>
        <p className="mt-1.5 text-ui text-teal">
          {connectedAs
            ? `Connected with ${connectedAs} in demo mode.`
            : "Connection is simulated in this preview build. No wallet extension is contacted."}
        </p>

        <ul className="mt-5 space-y-2">
          {WALLETS.map((wallet) => {
            const isSelected = selected === wallet;
            return (
              <li key={wallet}>
                <button
                  type="button"
                  onClick={() => setSelected(wallet)}
                  aria-pressed={isSelected}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-sm border px-3 py-2 text-left text-ui transition-colors duration-100 active:translate-y-px ${
                    isSelected
                      ? "border-sky/60 bg-surface text-ice"
                      : "border-edge bg-surface/50 text-steel hover:border-steel/40 hover:text-ice"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-sm border border-edge bg-ground font-mono text-ui text-sky"
                  >
                    {wallet[0]}
                  </span>
                  {wallet}
                  {connectedAs === wallet && (
                    <span className="ml-auto text-label uppercase text-rise">connected</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex gap-2">
          <Button
            variant="primary"
            disabled={!selected || selected === connectedAs}
            onClick={() => {
              if (selected) onConnect(selected);
            }}
            className="flex-1"
          >
            {connectedAs ? "Switch" : "Connect"}
          </Button>
          {connectedAs && (
            <Button
              onClick={onDisconnect}
              className="enabled:hover:border-fall/60 enabled:hover:text-fall"
            >
              Disconnect
            </Button>
          )}
        </div>
        {!selected && !connectedAs && (
          <p className="mt-2.5 text-label uppercase text-teal">Pick a wallet to continue</p>
        )}
      </div>
    </Modal>
  );
}
