import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import useUser from "../../hooks/react-query/useUser";
import userApi from "../../lib/api/user";
import { queryKeys } from "../../react-query/queryKeys";
import { isBlank } from "../../util/blank";

type ModifyType = "EMAIL" | "USERNAME" | "PASSWORD";

const MyPage = () => {
  // router
  const router = useRouter();

  // queryClient
  const queryClient = useQueryClient();

  // userInfo
  const { userInfo, clearUser } = useUser();

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
  // modifyUser
  const { mutate: modifyUser, isLoading: isModifyLoading } = useMutation(
    (modifyType: ModifyType) => {
      switch (modifyType) {
        case "EMAIL":
          return userApi.modifyUser({ email });
        case "USERNAME":
          return userApi.modifyUser({ username });
        case "PASSWORD":
          return userApi.modifyUser({ password });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.user);
        alert("업데이트 완료");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          alert("세션이 만료됐습니다. 다시 로그인 해주세요.");
          router.replace("/sign-in");
        }
      },
    }
  );

  // deleteUser
  const { mutate: deleteUser, isLoading: isDeleteLoading } = useMutation(
    () => userApi.deleteUser(),
    {
      onSuccess: () => {
        clearUser();
        alert("회원탈퇴 완료됐습니다.");
        router.replace("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          alert("세션이 만료됐습니다. 다시 로그인 해주세요.");
          router.replace("/sign-in");
        }
      },
    }
  );

  // function
  const onClickModifyButton = useCallback(
    (modifyType: ModifyType) => {
      if (confirm("회원정보를 수정하시겠습니까?")) {
        modifyUser(modifyType);
      } else {
        switch (modifyType) {
          case "EMAIL":
            setEmail(userInfo.email);
            break;
          case "USERNAME":
            setUsername(userInfo.username);
            break;
          case "PASSWORD":
            setPassword("");
            break;
        }
      }
    },
    [modifyUser, userInfo]
  );

  if (isModifyLoading || isDeleteLoading) {
    <p>Loading...</p>;
  }

  return (
    <S.Container>
      <div className="row">
        <label htmlFor="email">아이디(이메일)</label>
        <div className="input-container">
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={() => onClickModifyButton("EMAIL")}
            disabled={isBlank(email)}
          >
            변경
          </button>
        </div>
      </div>

      <div className="row">
        <label htmlFor="username">이름</label>
        <div className="input-container">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => onClickModifyButton("USERNAME")}
            disabled={isBlank(username)}
          >
            변경
          </button>
        </div>
      </div>

      <div className="row">
        <label htmlFor="password">비밀번호</label>
        <div className="input-container">
          <input
            id="password"
            type="password"
            value={password}
            placeholder="변경할 비밀번호를 입력해주세요."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => onClickModifyButton("PASSWORD")}
            disabled={isBlank(password)}
          >
            변경
          </button>
        </div>
      </div>

      <div className="withdrawal-container">
        <button onClick={() => deleteUser()}>회원 탈퇴</button>
      </div>
    </S.Container>
  );
};

export default MyPage;

const S = {
  Container: styled.div`
    width: 600px;
    margin: 0 auto;

    .row {
      display: flex;
      justify-content: space-between;
      margin: 16px 0;
    }

    .withdrawal-container {
      text-align: right;
    }
  `,
};
