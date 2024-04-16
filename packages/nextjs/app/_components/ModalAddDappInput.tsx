import { useState } from "react";
import { Button, TextInput, Window, WindowHeader } from "react95";
import { useLocalStorage } from "usehooks-ts";
import { isValidUrl } from "~~/utils/isValidUrl";
import { notification } from "~~/utils/scaffold-eth";

type ModalNewDappInputProps = {
  setModalIsOpen: (isOpen: boolean) => void;
};
export const ModalAddDappInput = ({ setModalIsOpen }: ModalNewDappInputProps) => {
  const [, setDapps] = useLocalStorage<{ name: string; url: string }[]>("custom-dapps", [], {
    initializeWithValue: false,
  });

  const [name, setName] = useState("");
  const [dappUrl, setDappUrl] = useState("");

  const addDapp = () => {
    if (!name || !dappUrl) return;
    if (!isValidUrl(dappUrl)) return notification.error("Please enter valid URL");
    setDapps(prevDapps => [...prevDapps, { name, url: dappUrl }]);
    setModalIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-3 md:p-0 z-10">
      <Window className="window w-96">
        <WindowHeader className="window-title flex justify-between">
          <span>Add new Dapp</span>
          <Button
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            <span className="close-icon" />X
          </Button>
        </WindowHeader>
        <div className="flex flex-col gap-2 px-4" onClick={e => e.stopPropagation()}>
          <div className="gap-1">
            <p className="m-0">Name</p>
            <TextInput value={name} onChange={e => setName(e.target.value)} placeholder="Enter dapp name" fullWidth />
          </div>
          <div className="gap-1">
            <p className="m-0">URL</p>
            <TextInput value={dappUrl} onChange={e => setDappUrl(e.target.value)} placeholder="Enter url" fullWidth />
          </div>
          <Button onClick={addDapp}>Add</Button>
        </div>
      </Window>
    </div>
  );
};
