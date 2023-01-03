import { isNil } from "lodash";
import { GetServerSideProps } from "next";
import Link from "next/link";
import useUser from "../hooks/react-query/useUser";

const HomePage = () => {
  // userInfo
  const { userInfo, clearUser } = useUser();

  return (
    <>
      {isNil(userInfo) ? (
        <>
          <Link href="sign-in">로그인</Link>
          <Link href="sign-up">회원가입</Link>
        </>
      ) : (
        <>
          <button onClick={() => clearUser()}>로그아웃</button>
          <Link href="/my-page">마이페이지</Link>
        </>
      )}

      <Link href="/post">Post</Link>
    </>
  );
};

export default HomePage;
