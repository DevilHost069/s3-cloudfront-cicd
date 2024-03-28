import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { IProductRes } from "@shared/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";

export type IProductResResponse = {
  response: IResponseMeta;
  data: IProductRes;
};

async function postProduct({ body }): Promise<IProductRes | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "POST",
        url: `product/`,
        data: body,
      }),
    );

    Toaster({
      status: "success",
      message: "Product added successfully",
    });

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

export function usePostProduct() {
  const queryClient = useQueryClient();
  const fallback: IProductRes | {} = {};
  const {
    data = fallback,
    isError,
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.postProduct],
    mutationFn: (body: any) => postProduct({ body }),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.products],
      });
    },
  });
  return { data, isError, mutate, mutateAsync, isPending, isSuccess };
}
