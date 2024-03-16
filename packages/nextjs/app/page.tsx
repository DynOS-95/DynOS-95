"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ModalIframe } from "./_components/ModalIframe";
import { useImpersonatorIframe } from "@impersonator/iframe";
import type { NextPage } from "next";
import { useDebounceValue } from "usehooks-ts";
import { useAccount } from "wagmi";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const targetNetworks = getTargetNetworks();

const Home: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNetwork] = useState(targetNetworks[0]);
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
      <div className="flex items-center flex-row">
        <div>
          <Image
            src="/assets/uniswap.png"
            className="cursor-pointer"
            alt="uniswap"
            width={100}
            height={100}
            onDoubleClick={() => {
              setAppUrl("https://app.uniswap.org/swap");
              setModalIsOpen(true);
            }}
          />
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
