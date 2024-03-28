import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { precriber_missed_status } from "@utils/constants";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";
import { IIngredientsRes } from "@shared/types/product";

export type IIngredientsResResponse = {
  response: IResponseMeta;
  data: IIngredientsRes;
};

async function postIngredient({ body }): Promise<IIngredientsRes | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "POST",
        url: `ingredient/`,
        data: body,
      }),
    );
    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message:
        error?.response?.data?.data?.errors[0]?.detail ||
        "Something went wrong...",
    });
    throw error;
  }
}

export function usePostIngredient() {
  const queryClient = useQueryClient();
  const fallback: IIngredientsRes | {} = {};
  const {
    data = fallback,
    isError,
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.postIngredient],
    mutationFn: (body: any) => postIngredient({ body }),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ingredients],
      });
    },
  });
  return { data, isError, mutate, mutateAsync, isPending, isSuccess };
}
