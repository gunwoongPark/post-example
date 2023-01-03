import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import userApi from "../../lib/api/user";

import { isBlank, isNotBlank } from "../../util/blank";

const SignInPage = () => {
  // router
  const router = useRouter();

  // state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // mutation
  // signIn
  const { mutate: signIn, isLoading } = useMutation(
    () => userApi.signIn({ email, password }),
    {
      onSuccess: (response) => {
        if (isNotBlank(response.data)) {
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("refreshToken", response.data.refToken);

          alert("로그인 성공");
          router.replace("/");
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          switch (error.response?.status) {
            case 404:
              alert("존재하지 않는 아이디입니다.");
              return;

            case 400:
              alert("비밀번호를 잘못 입력하셨습니다.");
              return;

            default:
              return;
          }
        }
      },
    }
  );

  // function
  const onSubmitSignInForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isBlank(email) || isBlank(password)) {
        alert("모든 데이터를 입력해주세요.");
        return;
      }

      signIn();
    },
    [signIn, email, password]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={onSubmitSignInForm}>
      <label htmlFor="email">아이디(이메일)</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">로그인</button>
    </form>
  );
};

export default SignInPage;
