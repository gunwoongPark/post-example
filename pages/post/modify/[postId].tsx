import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { dehydrate, QueryClient, useMutation } from "react-query";
import styled from "styled-components";
import useDetailPost from "../../../hooks/react-query/useDetailPost";
import postApi from "../../../lib/api/post";
import { queryKeys } from "../../../react-query/queryKeys";
import { isBlank } from "../../../util/blank";

const PostModifyPage = () => {
  // router
  const router = useRouter();

  const { post, isLoading } = useDetailPost();

  // state
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // useEffect
  useEffect(() => {
    setTitle(post.data.post.name);
    setContent(post.data.post.content);
  }, [post]);

  // mutation
  const { mutate: modifyPost } = useMutation(
    () =>
      postApi.modifyPost({ boardId: post.data.post.id, name: title, content }),
    {
      onSuccess: (response) => {
        console.log(response);
        alert("게시글이 수정됐습니다.");
        router.replace(`/post/${post.data.post.id}`);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          alert("세션이 만료됐습니다. 다시 로그인 해주세요.");
          router.replace("/sign-in");
        }
      },
    }
  );

  // function
  const onSubmitPostModify = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isBlank(title) || isBlank(content)) {
        alert("제목과 내용은 꼭 입력해주세요.");
      }

      modifyPost();
    },
    [title, content, modifyPost]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <S.Container>
      <form onSubmit={onSubmitPostModify}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            rows={7}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit">작성하기</button>
      </form>
    </S.Container>
  );
};

export default PostModifyPage;

type PostModifyParamsType = { postId: string };

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { postId } = context.params as PostModifyParamsType;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([queryKeys.post, postId], () =>
    postApi.fetchDetailPost({ boardId: postId })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const S = {
  Container: styled.div`
    form {
      display: flex;
      flex-direction: column;
      width: 600px;
      margin: 0 auto;

      div {
        margin: 16px 0 16px;
        display: flex;
        flex-direction: column;
      }
    }
  `,
};
