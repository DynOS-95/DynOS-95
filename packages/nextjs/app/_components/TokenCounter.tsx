import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import { Button, Counter, Frame } from "react95";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const TokenCounter = () => {
  const userWallets = useUserWallets();

  const { data: balance } = useScaffoldContractRead({
    contractName: "DynOSToken",
    functionName: "balanceOf",
    args: [userWallets?.[0]?.address],
    enabled: userWallets.length > 0,
  });

  const { writeAsync: mint } = useScaffoldContractWrite({
    contractName: "DynOSToken",
    functionName: "mint",
    args: [userWallets?.[0]?.address, 5n],
  });

  return (
    <Frame className="p-6 mr-6">
      <p className="font-bold text-center">DynOSToken count</p>
      <div className="flex flex-col gap-4">
        <Counter value={Number(balance || 0)} minLength={6} />
        <Button primary onClick={() => mint()}>
          Claim (gasless)
        </Button>
      </div>
    </Frame>
  );
};
