import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, {
  forwardRef,
  useImperativeHandle,
  createRef,
  useState,
} from "react";
import Button from "../resuable/button";
import Modal, { ModalRefHandler } from "../resuable/modal";
import { useBalance } from "./hooks";
import { getErrorMessage } from "./utils";

export interface WalletDetailsModalProps {}
export interface WalletDetailsModalRefsHandler {
  modalRef: React.RefObject<ModalRefHandler>;
}

const WalletDetailsModal = forwardRef<
  WalletDetailsModalRefsHandler,
  WalletDetailsModalProps
>((props: WalletDetailsModalProps, ref) => {
  useImperativeHandle(ref, () => ({
    modalRef: modalRef,
  }));
  const modalRef = createRef<ModalRefHandler>();
  const {
    activate,
    account,
    active,
    chainId,
    deactivate,
    error: connectError,
  } = useWeb3React();
  const { balance, loading, error, loadBalance } = useBalance();
  const [state, setState] = useState({
    copiedText: "",
  });
  console.log("connectError", connectError);

  const onClickConnectWallet = () => {
    activate(new InjectedConnector({}));
  };

  const onClickDisconnectConnectWallet = () => {
    deactivate();
  };

  const onClickCopyAccount = () => {
    if (!account) return;
    navigator.clipboard.writeText(account || "");
    setState({
      ...state,
      copiedText: "Copied!",
    });
    setTimeout(() => {
      setState({
        ...state,
        copiedText: "",
      });
    }, 1000);
  };

  const renderWalletNotConnectedView = () => {
    return (
      <div>
        <p className="text-lg text-red-500">
          {connectError
            ? getErrorMessage(connectError)
            : `Wallet not connected, Please click the "Connect" button below`}
        </p>
        <div
          className={["flex items-center p-6 space-x-2 rounded-b "].join(" ")}
        >
          <Button onClick={onClickConnectWallet}>
            {connectError ? "Connect Again" : "Connect"}
          </Button>
          <Button
            varient="light"
            onClick={() => {
              modalRef.current?.hide?.();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  const renderBalance = () => {
    if (error) {
      return (
        <span title="Reload" className="text-red-500 cursor-pointer">
          Error
          <i
            onClick={loadBalance}
            className="fa-solid fa-rotate align-middle text-md ml-1"
            aria-hidden="true"
          ></i>
        </span>
      );
    }
    if (loading) {
      return (
        <span>
          <svg
            aria-hidden="true"
            className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600 float-right"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </span>
      );
    }
    return <span>{`Ξ${balance}`}</span>;
  };

  const renderWalletConnectedView = () => {
    return (
      <div>
        <div>
          <table className="w-full text-gray-500">
            <thead>
              <tr>
                <th className="text-left px-6 py-3">KEY</th>
                <th className="text-right px-6 py-3">VALUE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="text-left px-6 py-3">Account</td>
                <td className="text-right px-6 py-3 relative">
                  <span
                    title={account || ""}
                    className="align-middle cursor-pointer"
                  >
                    {account?.substring(0, 4)}...
                    {account?.substring(account?.length - 4)}
                  </span>
                  <i
                    onClick={onClickCopyAccount}
                    title="Copy"
                    className="fa fa-clone align-middle text-sm ml-2 font-thin cursor-pointer"
                    aria-hidden="true"
                  ></i>
                  {state.copiedText && (
                    <span className="align-middle absolute -right-1 -top-0.5 text-sky-400">
                      {state.copiedText}
                    </span>
                  )}
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="text-left px-6 py-3">Chain ID</td>
                <td className="text-right px-6 py-3">{chainId}</td>
              </tr>
              <tr className="bg-white border-b">
                <td className="text-left px-6 py-3">Balance</td>
                <td className="text-right px-6 py-3">{renderBalance()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center py-5 text-gray-500">
          <p>Wallet Details</p>
        </div>
        <div className={["flex items-center  space-x-2 rounded-b "].join(" ")}>
          <Button
            onClick={onClickDisconnectConnectWallet}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300"
            varient="custom"
          >
            Disconnect
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Modal
      ref={modalRef}
      showCloseIcon
      hideFooter
      title={
        <span>
          Wallet Details{" "}
          <span
            title={
              active ? "Connected" : connectError ? "Error" : "Disconnected"
            }
            className="text-xl align-middle cursor-pointer"
          >
            {active ? "🟢" : connectError ? "🔴" : "🟠"}
          </span>
        </span>
      }
    >
      <div>
        {active ? renderWalletConnectedView() : renderWalletNotConnectedView()}
      </div>
    </Modal>
  );
});
export default WalletDetailsModal;
