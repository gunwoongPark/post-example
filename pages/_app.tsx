import type { AppProps } from "next/app";
import { Fragment } from "react";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  );
}
