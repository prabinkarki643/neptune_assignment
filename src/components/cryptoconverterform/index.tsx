import Image from "next/image";
import React, { ReactElement, useState, createRef } from "react";
import Button from "../resuable/button";
import Card from "../resuable/card";
import Input from "../resuable/input";
import WalletDetailsModal, {
  WalletDetailsModalRefsHandler,
} from "../walletdetailsmodal";
import { AVAILABLECRYPTOCURRENCY } from "./typings.d";
interface CryptoConverterFormProps {}
interface CryptoConverterFormState {
  crypto: {
    [key in AVAILABLECRYPTOCURRENCY]: {
      value: number | null;
    };
  };
}
export default function CryptoConverterForm({}: CryptoConverterFormProps): ReactElement {
  const walletDetailsModalRef = createRef<WalletDetailsModalRefsHandler>();
  const [state, setState] = useState<CryptoConverterFormState>({
    crypto: {
      [AVAILABLECRYPTOCURRENCY.NEP]: {
        value: 1,
      },

      [AVAILABLECRYPTOCURRENCY.BUSD]: {
        value: 3,
      },
    },
  });

  const onChangeNepValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    var nepValue = Number(e.target.value);
    const convertedBusdValue = nepValue * 3;
    setState({
      ...state,
      crypto: {
        ...state.crypto,
        [AVAILABLECRYPTOCURRENCY.NEP]: {
          value: Number(nepValue.toFixed(2)),
        },

        [AVAILABLECRYPTOCURRENCY.BUSD]: {
          value: Number(convertedBusdValue.toFixed(2)),
        },
      },
    });
  };

  const onChangeBusdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const busdValue = Number(e.target.value);
    const convertedNepValue = (busdValue * 1) / 3;
    setState({
      ...state,
      crypto: {
        ...state.crypto,
        [AVAILABLECRYPTOCURRENCY.NEP]: {
          value: Number(convertedNepValue.toFixed(2)),
        },

        [AVAILABLECRYPTOCURRENCY.BUSD]: {
          value: Number(busdValue.toFixed(2)),
        },
      },
    });
  };

  const onClickCheckWalletDetails = () => {
    walletDetailsModalRef.current?.modalRef?.current?.show?.();
  };
  return (
    <Card className="p-3 w-[350px] md:w-[400px]">
      <div className="p-6">
        <h5 className="text-gray-900 text-2xl font-medium mb-2 text-center ">
          Crypto Converter
        </h5>
        <div className="flex flex-col gap-y-3">
          <Input
            label="NEP"
            labelProps={{ htmlFor: "nepInput" }}
            type="number"
            id="nepInput"
            placeholder=""
            value={state.crypto.NEP.value || ""}
            onChange={onChangeNepValue}
          />
          <div className="flex justify-center">
            <Image
              src="/images/loop.png"
              height="35"
              width="35"
              alt="loop"
              className="rotate-90"
            />
          </div>
          <Input
            label="BUSD"
            labelProps={{ htmlFor: "busdInput" }}
            type="number"
            id="busdInput"
            placeholder=""
            value={state.crypto.BUSD.value || ""}
            onChange={onChangeBusdValue}
          />
        </div>
        <div className="text-center mt-2 hover:scale-105">
          <Button varient="text" onClick={onClickCheckWalletDetails}>
            Check Wallet Details
          </Button>
        </div>
      </div>
      <WalletDetailsModal ref={walletDetailsModalRef} />
    </Card>
  );
}
