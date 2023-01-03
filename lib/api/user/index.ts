import apiBase from "..";
import { SignUpReq } from "./schema";

const userApi = {
  signUp: ({ email, password, username }: SignUpReq): Promise<any> =>
    apiBase.post("/users/signup", {
      email,
      password,
      username,
    }),
};

export default userApi;
