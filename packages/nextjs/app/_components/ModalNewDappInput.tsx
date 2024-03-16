import { Button, TextInput, Window, WindowHeader } from "react95";

type ModalNewDappInputProps = {
  setModalIsOpen: (isOpen: boolean) => void;
  appUrl: string;
  setAppUrl: (url: string) => void;
  onClick: () => void;
};
export const ModalNewDappInput = ({ appUrl, setAppUrl, setModalIsOpen, onClick }: ModalNewDappInputProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-3 md:p-0 z-10">
      <Window className="window w-96 space-y-3">
        <WindowHeader className="window-title flex justify-between">
          <span>Sign into custom dapp</span>
          <Button
            onClick={() => {
              setAppUrl("");
              setModalIsOpen(false);
            }}
          >
            <span className="close-icon" />X
          </Button>
        </WindowHeader>
        <div className="flex flex-col gap-3" onClick={e => e.stopPropagation()}>
          <TextInput value={appUrl} placeholder="Type url..." onChange={e => setAppUrl(e.target.value)} fullWidth />
          <Button onClick={onClick}>Load</Button>
        </div>
      </Window>
    </div>
  );
};
