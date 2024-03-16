import { ImpersonatorIframe } from "@impersonator/iframe";
import { Button, Window, WindowHeader } from "react95";
import { isAddress } from "viem";
import { isValidUrl } from "~~/utils/isValidUrl";

type ModalIframeProps = {
  setModalIsOpen: (isOpen: boolean) => void;
  appUrl: string;
  address: string;
  selectedNetwork: any;
};

export const ModalIframe = ({ setModalIsOpen, appUrl, address, selectedNetwork }: ModalIframeProps) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-3 md:p-0 z-10"
      onClick={() => setModalIsOpen(false)}
    >
      <Window className="window w-[95%] md:w-10/12 h-[80%]">
        <WindowHeader className="window-title flex justify-between">
          {appUrl && <span>{appUrl}</span>}
          <Button onClick={() => setModalIsOpen(false)}>
            <span className="close-icon" />X
          </Button>
        </WindowHeader>
        {address && isAddress(address) && isValidUrl(appUrl) ? (
          <div className="flex items-center flex-col flex-grow p-4 rounded-md h-full">
            <div className="border-2 border-gray-200 rounded-md w-full h-full">
              <div className="w-full rounded-md p-1 h-full">
                <ImpersonatorIframe
                  key={selectedNetwork.name + address + appUrl}
                  height={"95%"}
                  width={"100%"} //set it to the browser width
                  src={appUrl}
                  address={address}
                  rpcUrl={selectedNetwork.rpcUrls.default.http[0]}
                />
              </div>
            </div>
            {/* <div className="p-4 max-w-md">
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
                </div> */}
          </div>
        ) : null}
      </Window>
    </div>
  );
};
