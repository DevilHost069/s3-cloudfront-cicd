import { queryKeys } from "@shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";
async function markAllNotificationAsRead(): Promise<any> {
  const { data, status } = await axiosInstance(
    getAuthenticatedAxiosconfig({
      method: "GET",
      url: `notification/mark_all_as_read/`,
    }),
  );

  return data.data;
}

export function useMarkAllNotificationAsRead() {
  const queryClient = useQueryClient();
  //  mutation function
  const { isError, isSuccess, mutate } = useMutation({
    onMutate: () => markAllNotificationAsRead(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.notifications] });
    },
  });
  return {
    isError,
    isSuccess,
    mutate,
  };
}
