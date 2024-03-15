"use client";

import type { NextPage } from "next";
import { sepolia, useAccount, useContractWrite } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useTransactor } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { data: YourContract } = useDeployedContractInfo("YourContract");

  const writeTxn = useTransactor();
  const { writeAsync } = useContractWrite({
    address: YourContract?.address,
    abi: YourContract?.abi,
    functionName: "setGreeting",
    args: ["Hello world"],
    chainId: sepolia.id,
  });

  const handleWrite = async () => {
    if (writeAsync) {
      try {
        const makeWriteWithParams = () => writeAsync();
        await writeTxn(makeWriteWithParams);
      } catch (e: any) {
        console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
      }
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
      </div>
    </>
  );
};

export default Home;
