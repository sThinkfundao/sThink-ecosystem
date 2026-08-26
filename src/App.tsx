import { useState } from "react";
import Header from "./features/header/Header.tsx";
import WalletModal, { type WalletName } from "./features/wallet/WalletModal.tsx";

export default function App() {
  const [walletOpen, setWalletOpen] = useState(false);
  const [connectedAs, setConnectedAs] = useState<WalletName | null>(null);

  return (
    <div id="top" className="min-h-screen">
      <Header
        connectedAs={connectedAs ? `${connectedAs} · demo` : null}
        onWalletClick={() => setWalletOpen(true)}
      />
      <main className="mx-auto max-w-6xl px-4 sm:px-6" />
      <WalletModal
        open={walletOpen}
        connectedAs={connectedAs}
        onConnect={(wallet) => {
          setConnectedAs(wallet);
          setWalletOpen(false);
        }}
        onDisconnect={() => {
          setConnectedAs(null);
          setWalletOpen(false);
        }}
        onClose={() => setWalletOpen(false)}
      />
    </div>
  );
}
