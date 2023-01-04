import { FormEvent, useCallback, useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { isBlank } from "../../../util/blank";
import postApi from "../../../lib/api/post";
import axios from "axios";
import { useRouter } from "next/router";

const PostWritePage = () => {
  // router
  const router = useRouter();

  // state
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // mutation
  // savePost
  const { mutate: savePost, isLoading } = useMutation(
    () => postApi.savePost({ name: title, content }),
    {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          // TODO :: 추후 에러 핸들링
          console.log(error);
        }
      },
    }
  );

  // function
  const onSubmitPost = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isBlank(title) || isBlank(content)) {
        alert("제목과 내용은 꼭 입력해주세요.");
      }

      savePost();
    },
    [title, content, savePost]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <S.Container>
      <form onSubmit={onSubmitPost}>
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

export default PostWritePage;

const S = {
  Container: styled.div`
    form {
      display: flex;
      flex-direction: column;
      width: 600px;
      margin: 0 auto;

      div {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
      }
    }
  `,
};
