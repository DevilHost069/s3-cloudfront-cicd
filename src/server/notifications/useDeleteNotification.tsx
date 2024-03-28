import { queryKeys } from "@shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";

async function deleteNotification(oid: number): Promise<any> {
  const { data, status } = await axiosInstance(
    getAuthenticatedAxiosconfig({
      method: "DELETE",
      url: `notification/${oid}/`,
    }),
  );

  return data.data;
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  //  mutation function
  const { isError, isSuccess, mutate } = useMutation({
    onMutate: (id: number) => deleteNotification(id),
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
