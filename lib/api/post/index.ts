import apiBase from "..";
import { FetchPostReq, SavePostReq } from "./schema";

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
};

export default postApi;
