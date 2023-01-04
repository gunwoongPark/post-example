export interface SaveCommentReq {
  boardId: string;
  comment: string;
}

export interface DeleteCommentReq {
  commentId: string;
}

export interface ModifyCommentReq {
  commentId: string;
  comment: string;
}
