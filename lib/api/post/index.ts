import apiBase from "..";
import {
  DeletePostReq,
  FetchDetailPostReq,
  FetchPostReq,
  ModifyPostReq,
  SavePostReq,
} from "./schema";

const postApi = {
  /**
   * 게시판 조회
   * @param  {} {skip
   * @param  {FetchPostReq} take}
   * @returns Promise
   */
  fetchPost: ({ skip, take }: FetchPostReq): Promise<any> =>
    apiBase.get(`/boards?skip=${skip}&take=${take}`),

  /**
   * 게시글 작성
   * @param  {} {name
   * @param  {SavePostReq} content}
   * @returns Promise
   */
  savePost: ({ name, content }: SavePostReq): Promise<any> =>
    apiBase.post("/boards", { name, content }),

  /**
   * 게시글 삭제
   * @param  {DeletePostReq} {boardId}
   * @returns Promise
   */
  deletePost: ({ boardId }: DeletePostReq): Promise<any> =>
    apiBase.delete(`/boards/${boardId}`),

  /**
   * 게시글 상세 조회
   * @param  {FetchDetailPostReq} {boardId}
   * @returns Promise
   */
  fetchDetailPost: ({ boardId }: FetchDetailPostReq): Promise<any> =>
    apiBase.get(`/boards/${boardId}`),

  /**
   * 게시글 수정
   * @param  {ModifyPostReq} {boardId}
   * @returns Promise
   */
  modifyPost: ({ boardId, name, content }: ModifyPostReq): Promise<any> =>
    apiBase.patch(`/boards/${boardId}`, { name, content }),
};

export default postApi;
