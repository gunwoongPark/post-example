import Link from "next/link";

const MyPage = () => {
  return (
    <>
      <Link href="/my-page/modify">회원 정보 수정</Link>
      <button>회원 탈퇴</button>
    </>
  );
};

export default MyPage;
