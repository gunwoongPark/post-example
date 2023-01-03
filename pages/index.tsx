import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <Link href="sign-in">로그인</Link>
      <Link href="sign-up">회원가입</Link>
      <Link href="/post">Post</Link>
    </>
  );
};

export default HomePage;
