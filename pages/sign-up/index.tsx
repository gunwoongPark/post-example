import { FormEvent, useCallback, useState } from "react";

const SignUpPage = () => {
  // state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  // function
  const onSaveSignUp = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <form onSubmit={onSaveSignUp}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="username">이름</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">회원가입</button>
      </form>
    </>
  );
};

export default SignUpPage;
