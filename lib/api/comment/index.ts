import apiBase from "..";
import { SaveCommentReq } from "./schema";

const commentApi = {
  /**
   * 댓글 작성
   * @param  {} {boardId
   * @param  {SaveCommentReq} comment}
   * @returns Promise
   */
  saveComment: ({ boardId, comment }: SaveCommentReq): Promise<any> =>
    apiBase.post("/comments", { boardId, comment }),
};

export default commentApi;
