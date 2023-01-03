export interface SignUpReq {
  email: string;
  password: string;
  username: string;
}

export interface SignInReq {
  email: string;
  password: string;
}

export interface UpdateUserReq {
  email?: string;
  password?: string;
  username?: string;
}
