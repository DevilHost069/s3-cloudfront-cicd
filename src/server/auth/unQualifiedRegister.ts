import { ISignUpFormValues } from "@shared/types/Auth";
import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";

async function unqualifedRegiter(
  body: ISignUpFormValues,
): Promise<ISignUpFormValues | void> {
  try {
    const { data, status } = await axiosInstance({
      method: "POST",
      url: "/api/patient/",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (status === 201) {
      return data?.data;
    }
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 400) {
      return Toaster({
        status: "error",
        message: error?.response?.data?.data?.errors[0].detail,
      });
    }
    Toaster({
      status: "error",
      message: "Something went wrong, please try again",
    });
    throw error;
  }
}

export function usePostUnQualifiedUser() {
  const queryClient = useQueryClient();
  const fallback: any = undefined;
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.unqualified],
    mutationFn: (body: any) => unqualifedRegiter(body),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.changePassword],
      });
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
}
