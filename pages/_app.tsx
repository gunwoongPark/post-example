import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider, useQueryClient } from "react-query";
import queryClient from "../react-query";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ReactQueryDevtools } from "react-query/devtools";
import { PropsWithChildren } from "react";
import useUser from "../hooks/react-query/useUser";
import { isNil } from "lodash";
import { useRouter } from "next/router";
import LayoutView from "../components/LayoutView";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppSelector>
            <LayoutView>
              <Component {...pageProps} />
            </LayoutView>
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
    return <></>;
  }

  // TODO :: path 관련 함수화로 리팩토링 예정
  if (
    !isLoading &&
    isNil(userInfo) &&
    ["/my-page", "/post/write", "/post/modify/[postId]"].some(
      (pathname) => pathname === router.pathname
    )
  ) {
    router.replace("/sign-in");
    return <></>;
  }

  return <>{props.children}</>;
};
