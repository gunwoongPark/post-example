import { isNil } from "lodash";
import { GetServerSideProps } from "next";
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
import dateFormat from "../util/date";
import { isNotNil } from "../util/nil";

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
      {userInfo && (
        <Link href="/post/write">
          <button>글쓰기</button>
        </Link>
      )}
      <ul>
        {postList?.pages?.map((pageData: any) => {
          if (isNotBlank(pageData.data)) {
            return pageData.data.map((post: any, index: number) => (
              <li key={`post-${post.id}-${index}`}>
                <div className="row-1">
                  <span className="post-title">{post.name}</span>
                  <span className="post-create-time">
                    생성일 : {dateFormat(post.created_at)}
                  </span>
                </div>

                <div className="row-2">
                  {isNotNil(userInfo) && userInfo.id === post.usersId && (
                    <>
                      <Link href={`/post/modify/${post.id}`}>
                        <button>수정</button>
                      </Link>
                      <button>삭제</button>
                    </>
                  )}
                </div>
              </li>
            ));
          }
        })}
      </ul>

      <div ref={targetRef} />
    </S.Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
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
    text-align: right;
    li {
      height: 200px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      border: 1px solid black;

      .row-1 {
        display: flex;
        justify-content: space-between;
        margin: 16px 16px 0;
      }

      .row-2 {
        margin: 0 16px 16px 0;
      }

      span {
        display: inline-block;

        &.post-title {
          font-size: 24px;
        }
      }
    }
  `,
};
