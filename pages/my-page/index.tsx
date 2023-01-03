import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import useUser from "../../hooks/react-query/useUser";
import userApi from "../../lib/api/user";
import { isBlank } from "../../util/blank";

type UpdateType = "EMAIL" | "USERNAME" | "PASSWORD";

const MyPage = () => {
  const queryClient = useQueryClient();

  const { userInfo } = useUser();

  // state
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // useEffect
  useEffect(() => {
    setEmail(userInfo?.email ?? "");
    setUsername(userInfo?.username ?? "");
  }, [userInfo]);

  // mutation
  // updateUser
  const { mutate: updateUser, isLoading } = useMutation(
    (updateType: UpdateType) => {
      switch (updateType) {
        case "EMAIL":
          return userApi.updateUser({ email });
        case "USERNAME":
          return userApi.updateUser({ username });
        case "PASSWORD":
          return userApi.updateUser({ password });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <>
      <label htmlFor="email">아이디(이메일)</label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => updateUser("EMAIL")}>변경</button>

      <label htmlFor="username">이름</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => updateUser("USERNAME")}>변경</button>

      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        value={password}
        placeholder="변경할 비밀번호를 입력해주세요."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => updateUser("PASSWORD")}
        disabled={isBlank(password)}
      >
        변경
      </button>

      <button>회원 탈퇴</button>
    </>
  );
};

export default MyPage;
