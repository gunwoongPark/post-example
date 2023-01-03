import { isNil } from "lodash";
import Link from "next/link";
import useUser from "../hooks/react-query/useUser";

const HomePage = () => {
  const { userInfo, signOut } = useUser();

  return (
    <>
      {isNil(userInfo) ? (
        <>
          <Link href="sign-in">로그인</Link>
          <Link href="sign-up">회원가입</Link>
        </>
      ) : (
        <>
          <button onClick={signOut}>로그아웃</button>
          <Link href="/my-page">마이페이지</Link>
        </>
      )}

      <Link href="sign-up">회원가입</Link>
      <Link href="/post">Post</Link>
    </>
  );
};

export default HomePage;
