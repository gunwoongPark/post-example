import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import userApi from "../../lib/api/user";
import { queryKeys } from "../../react-query/queryKeys";

const useUser = () => {
  const queryClient = useQueryClient();

  const { data: userInfo } = useQuery(
    queryKeys.user,
    async () => {
      const response = await userApi.userInfo();
      return response.data;
    },
    {
      retry: 0,
      onError: () => {
        signOut();
      },
    }
  );

  const signOut = useCallback(() => {
    queryClient.setQueryData(queryKeys.user, null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, [queryClient]);

  return { userInfo, signOut };
};

export default useUser;
