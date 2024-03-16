"use client";

import { useEffect } from "react";
import { Header } from "./Header";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { ImpersonatorIframeProvider } from "@impersonator/iframe";
import { Toaster } from "react-hot-toast";
import { Footer } from "~~/components/Footer";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  /* const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false); */

  /* useEffect(() => {
    setMounted(true);
  }, []); */

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "b64bda72-3b45-4d12-bf90-7b2591df405e",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <DynamicWagmiConnector>
        <ImpersonatorIframeProvider>
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </ImpersonatorIframeProvider>
      </DynamicWagmiConnector>
    </DynamicContextProvider>
  );
};
