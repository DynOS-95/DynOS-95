"use client";

import { useState } from "react";
import { ImpersonatorIframe, useImpersonatorIframe } from "@impersonator/iframe";
import type { NextPage } from "next";
import { useDebounceValue } from "usehooks-ts";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import { Address, InputBase } from "~~/components/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { getTargetNetworks, notification } from "~~/utils/scaffold-eth";

const targetNetworks = getTargetNetworks();

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { latestTransaction } = useImpersonatorIframe();
  const impersonateAddress = connectedAddress;

  const [selectedNetwork, setSelectedNetwork] = useState(() => {
    return targetNetworks[0];
  });
  const [appUrl, setAppUrl] = useState("");

  const [debounceImpersonateAddress] = useDebounceValue(impersonateAddress, 1000);
  const [debounceAppUrl] = useDebounceValue(appUrl, 500);

  const writeTxn = useTransactor();
  /* const { writeAsync } = useContractWrite({
    address: YourContract?.address,
    abi: YourContract?.abi,
    functionName: "setGreeting",
    args: ["Hello world"],
    chainId: sepolia.id,
  }); */

  const handleWrite = async () => {
    if (!latestTransaction || !connectedAddress) {
      return notification.error("Please make a transaction");
    }
    try {
      /* const makeWriteWithParams = () => writeAsync();
        await writeTxn(makeWriteWithParams); */
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
      console.log("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ test", txHash);
    } catch (e: any) {
      console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <button className="btn btn-primary btn-m" onClick={handleWrite}>
            Set Greetings
          </button>
        </div>
        <div className="w-[400px]">
          <InputBase placeholder="https://app.uniswap.org/swap" value={appUrl} onChange={setAppUrl} />
        </div>
        <h1 className="text-2xl font-bold">on</h1>
        <div>
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
        <div className="space-y-4">
          {!debounceImpersonateAddress && <h1 className="text-xl font-bold text-center">Please Connect you wallet</h1>}
          {debounceAppUrl && !isValidUrl(debounceAppUrl) && (
            <h1 className="text-xl font-bold text-center">Please enter a valid URL</h1>
          )}
        </div>
        {debounceImpersonateAddress && isAddress(debounceImpersonateAddress) && isValidUrl(debounceAppUrl) ? (
          <div className="flex items-center flex-col flex-grow p-4 rounded-md w-5/6">
            <div className="border-2 border-gray-200 rounded-md  w-full h-full">
              <div>
                <div className="w-full rounded-md p-1">
                  <ImpersonatorIframe
                    key={selectedNetwork.name + debounceImpersonateAddress + debounceAppUrl}
                    height={"1200px"}
                    width={"100%"} //set it to the browser width
                    src={debounceAppUrl}
                    address={debounceImpersonateAddress}
                    rpcUrl={selectedNetwork.rpcUrls.default.http[0]}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 max-w-md">
              {latestTransaction ? (
                <>
                  <h1 className="text-xl font-bold mb-2">Latest transaction:</h1>
                  <div className="p-2 bg-gray-800 text-white rounded-md overflow-auto">
                    <pre className="font-mono text-sm">
                      <code>{JSON.stringify(latestTransaction, null, 2)}</code>
                    </pre>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
