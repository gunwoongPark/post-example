import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
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
  // signUp
  const { mutate: signUp, isLoading } = useMutation(
    () => userApi.signUp({ email, password, username }),
    {
      onSuccess: (response) => {
        if (isNotBlank(response.token) && isNotBlank(response.result)) {
          alert("회원가입 성공");
          router.push("/sign-in");
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
  const onSubmitSingUpForm = useCallback(
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
    <S.Container>
      <form onSubmit={onSubmitSingUpForm}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="username">이름</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button className="sign-up-container" type="submit">
          회원가입
        </button>
      </form>
    </S.Container>
  );
};

export default SignUpPage;

const S = {
  Container: styled.div`
    width: 600px;
    margin: 0 auto;

    form {
      display: flex;
      flex-direction: column;

      div {
        margin: 16px 0 16px;
        display: flex;
        flex-direction: column;
      }
    }
  `,
};
