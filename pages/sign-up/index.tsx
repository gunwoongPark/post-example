import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import { useMutation } from "react-query";
import userApi from "../../lib/api/user";
import { isBlank, isNotBlank } from "../../util/blank";

const SignUpPage = () => {
  // router
  const router = useRouter();

  // state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  // mutation
  const { mutate: signUp, isLoading } = useMutation(
    () => userApi.signUp({ email, password, username }),
    {
      onSuccess: (data) => {
        if (isNotBlank(data.token) && isNotBlank(data.result)) {
          alert("회원가입 성공");
          router.replace("/sign-in");
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          // TODO :: 추후 에러 핸들링
          console.log(error);
        }
      },
    }
  );

  // function
  const onSaveSignUp = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isBlank(email) || isBlank(password) || isBlank(username)) {
        alert("모든 데이터를 입력해주세요.");
        return;
      }

      signUp();
    },
    [signUp, email, password, username]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={onSaveSignUp}>
        <label htmlFor="email">이메일</label>
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

        <label htmlFor="username">이름</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">회원가입</button>
      </form>
    </>
  );
};

export default SignUpPage;
