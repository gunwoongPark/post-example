import Link from "next/link";
import useUser from "../../hooks/react-query/useUser";

const PostPage = () => {
  const { userInfo } = useUser();

  return <>{userInfo && <Link href="/post/write">글쓰기</Link>}</>;
};

export default PostPage;
