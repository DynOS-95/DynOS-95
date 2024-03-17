import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "react95";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

const erc4337Facts = [
  "ERC-4337 enables 'smart accounts' without needing private key management.",
  "ERC-4337 accounts feature social recovery to prevent access loss from lost keys.",
  "'User Operation' standardizes account and smart contract interactions.",
  "Supports native multi-signature capabilities for controlled account access.",
  "Allows paying transaction fees in tokens other than ETH for broader usability.",
  "Supports batched transactions for cost reduction and improved efficiency.",
  "Simplifies new user onboarding by abstracting blockchain complexities.",
  "Designed for compatibility with existing Ethereum infrastructure.",
];

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;
  const [tooltipText, setTooltipText] = useState(erc4337Facts[0]);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % erc4337Facts.length;
      setTooltipText(erc4337Facts[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0 flex justify-end">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div>
                <Button>
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>{nativeCurrencyPrice}</span>
                </Button>
              </div>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />

                <Link href="/blockexplorer" passHref className="gap-1">
                  <Button>
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <span>Block Explorer</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/clippy-animation.gif"
          alt="clippy"
          className="w-[115px] m-4 mb-0 cursor-pointer"
          onClick={() => setIsTooltipVisible(prev => !prev)}
        />
        {isTooltipVisible && (
          <div className="max-w-[200px] absolute -left-[152px] -top-[117px] bg-gray-300 p-4 rounded-sm shadow-xl">
            <span className="absolute top-1 right-2 cursor-pointer" onClick={() => setIsTooltipVisible(false)}>
              X
            </span>
            <p className="m-0">{tooltipText}</p>
          </div>
        )}
      </div>
    </div>
  );
};
