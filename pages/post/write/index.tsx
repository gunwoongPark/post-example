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
    <form>
      <label>제목</label>
    </form>
  );
};

export default PostWritePage;
