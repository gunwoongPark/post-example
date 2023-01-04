import apiBase from "..";
import { DeleteCommentReq, ModifyCommentReq, SaveCommentReq } from "./schema";

const commentApi = {
  /**
   * 댓글 작성
   * @param  {} {boardId
   * @param  {SaveCommentReq} comment}
   * @returns Promise
   */
  saveComment: ({ boardId, comment }: SaveCommentReq): Promise<any> =>
    apiBase.post("/comments", { boardId, comment }),

  /**
   * 댓글 삭제
   * @param  {DeleteCommentReq} {commentId}
   * @returns Promise
   */
  deleteComment: ({ commentId }: DeleteCommentReq): Promise<any> =>
    apiBase.delete(`/comments/${commentId}`),

  /**
   * 댓글 수정
   * @param  {} {commentId
   * @param  {ModifyCommentReq} comment}
   * @returns Promise
   */
  modifyComment: ({ commentId, comment }: ModifyCommentReq): Promise<any> =>
    apiBase.patch(`/comments/${commentId}`, { comment }),
};

export default commentApi;
