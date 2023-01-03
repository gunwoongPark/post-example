import apiBase from "..";
import { SignUpReq } from "./schema";

/**
 * 회원가입
 * @param  {} {email
 * @param  {} password
 * @param  {SignUpReq} username}
 * @returns Promise
 */
const userApi = {
  signUp: ({ email, password, username }: SignUpReq): Promise<any> =>
    apiBase.post("/users/signup", {
      email,
      password,
      username,
    }),
};

export default userApi;
