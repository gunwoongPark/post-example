import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useIntersectionObserver from "../hooks/custom/useIntersectionObserver";
import usePost from "../hooks/react-query/usePost";
import useUser from "../hooks/react-query/useUser";
import { isNotBlank } from "../util/blank";

const HomePage = () => {
  // ref
  const targetRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useUser();

  const { postList, isLoading, hasNextPage, fetchNextPage } = usePost();

  useEffect(() => {
    console.log(postList);
  }, [postList]);

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
        {postList?.pages.map((pageData: any) => {
          if (isNotBlank(pageData.data)) {
            return pageData.data.map((post: any, index: number) => (
              <li key={`post-${post.id}-${index}`}>{post.name}</li>
            ));
          }
        })}
      </ul>

      <div ref={targetRef} />
    </S.Container>
  );
};

export default HomePage;

const S = {
  Container: styled.div`
    li {
      height: 200px;
    }
  `,
};
