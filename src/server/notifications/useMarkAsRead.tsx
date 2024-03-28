import { queryKeys } from "@shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";

async function markNotificationAsRead(id: number): Promise<any> {
  const { data, status } = await axiosInstance(
    getAuthenticatedAxiosconfig({
      method: "POST",
      url: `notification/mark_as_read/`,
      data: { ids: [id] },
    }),
  );

  return data.data;
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  //  mutation function
  const { isError, isSuccess, mutate } = useMutation({
    onMutate: (id: number) => markNotificationAsRead(id),
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
