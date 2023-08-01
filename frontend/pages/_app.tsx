import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthLayout from "../src/layout/AuthLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <AuthLayout> */}
      <Component {...pageProps} />
      {/* </AuthLayout> */}
    </>
  );
}
