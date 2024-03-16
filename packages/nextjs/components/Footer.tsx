import React from "react";
import Link from "next/link";
import { Button } from "react95";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

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
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/clippy-animation.gif" alt="clippy" className="w-[115px] m-4 mb-0" />
      </div>
    </div>
  );
};
