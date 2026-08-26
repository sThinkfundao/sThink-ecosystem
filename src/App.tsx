import { useState } from "react";
import Header from "./features/header/Header.tsx";
import Hero from "./features/hero/Hero.tsx";
import TokenIndex from "./features/tokens/TokenIndex.tsx";
import LaunchSection from "./features/launch/LaunchSection.tsx";
import Footer from "./features/footer/Footer.tsx";
import PreviewBanner from "./preview/PreviewBanner.tsx";
import { PREVIEW_AVAILABLE } from "./preview/previewMode.ts";
import WalletModal, { type WalletName } from "./features/wallet/WalletModal.tsx";

export default function App() {
  const [walletOpen, setWalletOpen] = useState(false);
  const [connectedAs, setConnectedAs] = useState<WalletName | null>(null);

  return (
    <div id="top" className="min-h-screen">
      <Header
        connectedAs={connectedAs}
        onWalletClick={() => setWalletOpen(true)}
      />
      <main>
        <Hero />
        <TokenIndex />
        <LaunchSection />
      </main>
      <Footer />
      {PREVIEW_AVAILABLE && <div aria-hidden="true" className="h-16" />}
      <PreviewBanner />
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
