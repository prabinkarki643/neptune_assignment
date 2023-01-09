import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

export function useBalance() {
  const { account, library } = useWeb3React();
  const [state, setState] = useState({
    balance: '',
    loading: true,
    error: false,
  });
  const loadBalance = () => {
    setState({ ...state, loading: true, error: false });
    library
      ?.getBalance?.(account)
      .then((val: any) => setState({ ...state, balance: formatEther(val), loading: false }))
      .catch(() => {
        setState({ ...state, loading: false, error: true });
      });
  };
  useEffect(() => {
    loadBalance();
  }, [account, library]);

  return {
    ...state,
    loadBalance
  };
}
