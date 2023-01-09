import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider
      getLibrary={(provider: any) => new Web3Provider(provider)}
    >
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}
