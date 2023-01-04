import apiBase from "..";
import { ModifyUserReq, SignInReq, SignUpReq } from "./schema";

const userApi = {
  /**
   * 회원가입
   * @param  {} {email
   * @param  {} password
   * @param  {SignUpReq} username}
   * @returns Promise
   */
  signUp: ({ email, password, username }: SignUpReq): Promise<any> =>
    apiBase.post("/users/signup", {
      email,
      password,
      username,
    }),

  /**
   * 로그인
   * @param  {} {email
   * @param  {SignInReq} password}
   * @returns Promise
   */
  signIn: ({ email, password }: SignInReq): Promise<any> =>
    apiBase.post("/users/signin", {
      email,
      password,
    }),

  /**
   * 유저 정보 조회
   * @returns Promise
   */
  userInfo: (): Promise<any> => apiBase.get("/users/userInfo"),

  /**
   * 유저 정보 수정
   * @param  {} {email
   * @param  {} password
   * @param  {ModifyUserReq} username}
   * @returns Promise
   */
  modifyUser: ({ email, password, username }: ModifyUserReq): Promise<any> =>
    apiBase.patch("/users", { email, password, username }),

  /**
   * 유저 삭제
   * @param  {} =>apiBase.delete("/users"
   */
  deleteUser: () => apiBase.delete("/users"),
};

export default userApi;
