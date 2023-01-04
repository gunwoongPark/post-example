import { FormEvent, useCallback, useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { queryKeys } from "../../../react-query/queryKeys";
import { isBlank } from "../../../util/blank";

const PostWritePage = () => {
  // state
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // function
  const onSubmitPost = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      if (isBlank(title) || isBlank(content)) {
        alert("제목과 내용은 꼭 입력해주세요.");
      }

      e.preventDefault();
    },
    [title, content]
  );

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
