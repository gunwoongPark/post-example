import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import postApi from "../../lib/api/post";
import { queryKeys } from "../../react-query/queryKeys";

const useDetailPost = () => {
  // router
  const router = useRouter();

  const { data: post, isLoading } = useQuery(
    [queryKeys.post, router.query.postId],
    () => postApi.fetchDetailPost({ boardId: router.query.postId as string }),
    {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          // TODO :: 추후 에러 핸들링
          console.log(error);
        }
      },
    }
  );

  return { post, isLoading };
};

export default useDetailPost;
