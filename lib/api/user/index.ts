import apiBase from "..";
import { SignInReq, SignUpReq, UpdateUserReq } from "./schema";

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
   * @param  {UpdateUserReq} username}
   * @returns Promise
   */
  updateUser: ({ email, password, username }: UpdateUserReq): Promise<any> =>
    apiBase.patch("/users", { email, password, username }),

  /**
   * 유저 삭제
   * @param  {} =>apiBase.delete("/users"
   */
  deleteUser: () => apiBase.delete("/users"),
};

export default userApi;
