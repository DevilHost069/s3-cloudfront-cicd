import { Toaster } from "@components/shared/Toaster";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { axiosInstance } from "../../axiosInstance";
import { IChangePassword } from "@shared/types/Auth";

async function changePassword(
  body: IChangePassword,
  changed?: boolean
): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const { data, status } = await axiosInstance.put(
      `api/auth/change-password/`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );
    if (status === 202) {
      Toaster({
        status: "success",
        message: "Password changed successfully.",
      });
    }

    return data.data;
  } catch (error: any) {
    throw error;
  }
}

export function useChangePassword() {
  const queryClient = useQueryClient();
  const fallback: any = undefined;
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.changePassword],
    mutationFn: (body: IChangePassword) => changePassword(body),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.changePassword],
      });
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
}
