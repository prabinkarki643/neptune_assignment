import Head from "next/head";
import CryptoConverterForm from "../components/cryptoconverterform";
import Logo from "../components/logo";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-sky-900 h-screen flex-col">
      <Head>
        <title>NEPTUNE MUTUAL | Crypto Converter | Wallet Details</title>
      </Head>
      <Logo withName containerClassName="mb-14" />
      <CryptoConverterForm />
    </div>
  );
}
