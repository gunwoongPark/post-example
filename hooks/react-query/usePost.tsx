import axios from "axios";
import { useInfiniteQuery } from "react-query";
import postApi from "../../lib/api/post";
import { queryKeys } from "../../react-query/queryKeys";
import { isBlank } from "../../util/blank";

const usePost = () => {
  const {
    data: postList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery(
    queryKeys.post,
    ({ pageParam = undefined }) =>
      postApi.fetchPost({ skip: pageParam * 5, take: 5 }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (isBlank(lastPage.data)) {
          return undefined;
        }

        return allPages.length;
      },
      onError(error) {
        if (axios.isAxiosError(error)) {
          // TODO :: 추후 에러 핸들링
          console.log(error);
        }
      },
    }
  );

  return { postList, fetchNextPage, hasNextPage, isLoading, isFetching };
};

export default usePost;
