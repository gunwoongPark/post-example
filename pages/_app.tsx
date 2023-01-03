import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider } from "react-query";
import queryClient from "../react-query";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
