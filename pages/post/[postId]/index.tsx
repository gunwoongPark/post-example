import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import { dehydrate, QueryClient, useMutation } from "react-query";
import styled from "styled-components";
import useDetailPost from "../../../hooks/react-query/useDetailPost";
import useUser from "../../../hooks/react-query/useUser";
import postApi from "../../../lib/api/post";
import { queryKeys } from "../../../react-query/queryKeys";
import dateFormat from "../../../util/date";
import { isNotNil } from "../../../util/nil";

const PostDetailPage = () => {
  // router
  const router = useRouter();

  const { userInfo } = useUser();
  const { post, isLoading } = useDetailPost();

  // state
  const [comment, setComment] = useState<string>("");

  // mutation
  // deletePost
  const { mutate: deletePost } = useMutation(
    () => postApi.deletePost({ boardId: router.query.postId as string }),
    {
      onSuccess: () => {
        alert("게시글을 삭제했습니다.");
        router.replace("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          // TODO :: 추후 에러 핸들링
          console.log(error);
        }
      },
    }
  );

  // saveComment

  // function
  const onSubmitComment = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <S.Container>
      <div>
        <h1>{post.data.post.name}</h1>
        <div>
          {isNotNil(userInfo) && userInfo.id === post.data.post.usersId && (
            <>
              <Link href={`/post/modify/${post.data.post.id}`}>
                <button>수정</button>
              </Link>
              <button onClick={() => deletePost()}>삭제</button>
            </>
          )}
          <span className="created-date">
            {dateFormat(post.data.post.created_at)}
          </span>
        </div>
      </div>

      <hr />

      <span className="content">{post.data.post.content}</span>

      <hr />
      <span className="comment-count">댓글수 ({post.data.comment.length})</span>

      <form className="write-comment-container" onSubmit={onSubmitComment}>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">등록</button>
      </form>
    </S.Container>
  );
};

export default PostDetailPage;

type PostDetailParamsType = { postId: string };

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { postId } = context.params as PostDetailParamsType;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([queryKeys.post, postId], () =>
    postApi.fetchDetailPost({ boardId: postId })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await postApi.fetchPost({ skip: 0, take: 3 });

  const paths = res.data.map((post: any) => ({ params: { postId: post.id } }));

  return {
    paths,
    fallback: true,
  };
};

const S = {
  Container: styled.div`
    width: 90%;
    margin: 0 auto;

    div {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      h1 {
        margin: 16px 0 8px 0;
        font-size: 24px;
      }

      div {
        .created-date {
          margin-left: 8px;
        }
      }
    }

    .content {
      display: inline-block;
      margin: 8px 0 24px;
      white-space: break-spaces;
    }

    .comment-count {
      display: inline-block;
      margin-top: 8px;
    }

    .write-comment-container {
      display: flex;
      align-items: unset;
      margin-top: 8px;
      textarea {
        width: 100%;
      }
    }
  `,
};
