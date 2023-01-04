import { useState } from "react";
import { useMutation } from "react-query";
import { queryKeys } from "../../../react-query/queryKeys";

const PostWritePage = () => {
  // state
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // mutation
  // savePost
  // const {} = useMutation();

  return (
    <form onSubmit={() => console.log("submit!!")}>
      <label htmlFor="title">제목</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="content">내용</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">작성하기</button>
    </form>
  );
};

export default PostWritePage;
