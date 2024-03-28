import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { IProductRes } from "@shared/types/product";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";

async function getProducts(): Promise<IProductRes | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: `product/`,
      }),
    );

    return data.data;
  } catch (error: any) {
    // Toaster({
    //   status: "error",
    //   message: error?.response?.data?.data?.non_field_errors[0],
    // });
    throw error;
  }
}

export function useGetProducts() {
  const fallback: IProductRes | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
  } = useQuery<IProductRes, Error>({
    queryKey: [queryKeys.products],
    queryFn: () => getProducts(),
  });
  return { data, isError, isLoading };
}
