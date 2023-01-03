import { useCallback, useState } from "react";

const UserInfoModifyPage = () => {
  // state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  // function
  const onSubmitUpdatedForm = useCallback(() => {}, []);

  return (
    <form onSubmit={onSubmitUpdatedForm}>
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
    </form>
  );
};

export default UserInfoModifyPage;
