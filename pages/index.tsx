import { GetStaticProps } from "next";
import Link from "next/link";
import { useRef } from "react";
import { dehydrate, QueryClient } from "react-query";
import styled from "styled-components";
import useIntersectionObserver from "../hooks/custom/useIntersectionObserver";
import usePost from "../hooks/react-query/usePost";
import useUser from "../hooks/react-query/useUser";
import postApi from "../lib/api/post";
import { queryKeys } from "../react-query/queryKeys";
import { isNotBlank } from "../util/blank";

const HomePage = () => {
  // ref
  const targetRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useUser();
  const { postList, isLoading, hasNextPage, fetchNextPage } = usePost();

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (!hasNextPage) {
      return;
    }

    if (entries[0].isIntersecting) {
      fetchNextPage();
    }
  };
  useIntersectionObserver({ callback: handleObserver, ref: targetRef });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <S.Container>
      {userInfo && <Link href="/post/write">글쓰기</Link>}
      <ul>
        {postList?.pages?.map((pageData: any) => {
          if (isNotBlank(pageData.data)) {
            return pageData.data.map((post: any, index: number) => (
              <li key={`post-${post.id}-${index}`}>
                <span>{post.name}</span>
              </li>
            ));
          }
          // eslint-disable-next-line react/jsx-key
          return <div>none data</div>;
        })}
      </ul>

      <div ref={targetRef} />
    </S.Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.post, () =>
    postApi.fetchPost({ skip: 0, take: 5 })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;

const S = {
  Container: styled.div`
    li {
      height: 200px;
      cursor: pointer;
    }
  `,
};
