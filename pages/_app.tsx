import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider, useQueryClient } from "react-query";
import queryClient from "../react-query";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ReactQueryDevtools } from "react-query/devtools";
import { PropsWithChildren } from "react";
import useUser from "../hooks/react-query/useUser";
import { isNil } from "lodash";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppSelector>
            <Component {...pageProps} />
          </AppSelector>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

const AppSelector = (props: PropsWithChildren<Record<never, any>>) => {
  const router = useRouter();
  const { userInfo, isLoading } = useUser();

  if (isLoading) {
    return <>{props.children}</>;
  }

  if (!isLoading && isNil(userInfo) && router.pathname === "/my-page") {
    router.replace("/sign-in");
    return <></>;
  }

  return <>{props.children}</>;
};
