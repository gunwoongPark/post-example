import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import userApi from "../../lib/api/user";
import { queryKeys } from "../../react-query/queryKeys";

const useUser = () => {
  const queryClient = useQueryClient();

  const { data: userInfo, isLoading } = useQuery(
    queryKeys.user,
    async () => {
      const response = await userApi.userInfo();
      return response.data;
    },
    {
      // 비회원이 error 잡힘
      retry: 0,
      onError: () => {
        clearUser();
      },
    }
  );

  const clearUser = useCallback(() => {
    queryClient.setQueryData(queryKeys.user, null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, [queryClient]);

  return { userInfo, clearUser, isLoading };
};

export default useUser;
