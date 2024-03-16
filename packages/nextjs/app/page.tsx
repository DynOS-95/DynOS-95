"use client";

import { useEffect, useState } from "react";
import { ModalIframe } from "./_components/ModalIframe";
import { useImpersonatorIframe } from "@impersonator/iframe";
import type { NextPage } from "next";
import { Button } from "react95";
import { useDebounceValue } from "usehooks-ts";
import { useAccount } from "wagmi";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const targetNetworks = getTargetNetworks();

const Home: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(() => {
    return targetNetworks[0];
  });
  const [appUrl, setAppUrl] = useState("");
  const [debounceAppUrl] = useDebounceValue(appUrl, 500);

  const { address: connectedAddress } = useAccount();

  const writeTxn = useTransactor();

  const { latestTransaction, onUserTxConfirm, onTxReject } = useImpersonatorIframe();

  useEffect(() => {
    const makeTransaciton = async () => {
      try {
        if (!connectedAddress || !latestTransaction?.id) return;
        const txHash = await writeTxn({
          // @ts-expect-error
          to: latestTransaction.to,
          // @ts-expect-error
          value: latestTransaction.value,
          // @ts-expect-error
          data: latestTransaction.data,
          chain: targetNetworks[0],
          account: connectedAddress,
        });
        if (!txHash) return;
        onUserTxConfirm(txHash, latestTransaction?.id);
        console.log("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ test", txHash);
      } catch (e: any) {
        console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
        onTxReject(latestTransaction?.id);
      }
    };
    makeTransaciton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAddress, latestTransaction?.id]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="mb-6">
          <select
            className="select select-bordered w-full max-w-xs "
            onChange={e => {
              setSelectedNetwork(targetNetworks[e.target.selectedIndex]);
            }}
          >
            {targetNetworks.map(network => {
              return (
                <option key={network.id} value={network.rpcUrls.default.http[0]}>
                  {network.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="px-5 mb-4">
          <Button
            onDoubleClick={() => {
              setAppUrl("https://app.uniswap.org/swap");
              setModalIsOpen(true);
            }}
          >
            Uniswap
          </Button>
        </div>
      </div>

      {connectedAddress && modalIsOpen && (
        <ModalIframe
          appUrl={debounceAppUrl}
          selectedNetwork={selectedNetwork}
          setModalIsOpen={setModalIsOpen}
          address={connectedAddress}
        />
      )}
    </>
  );
};

export default Home;
