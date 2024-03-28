import { queryKeys } from "@shared/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { IProductOptionsRes } from "@shared/types/product";

async function getProductOptions(): Promise<IProductOptionsRes | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/product/options/`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.data;
  } catch (error: any) {
    // Toaster({
    //   status: "error",
    //   message: error?.response?.data?.data?.non_field_errors[0],
    // });
    throw error;
  }
}

export function useGetProductOptions() {
  const fallback: IProductOptionsRes | any = [];
  const {
    data = fallback,
    isError,
    isLoading,
  } = useQuery<IProductOptionsRes, Error>({
    queryKey: [queryKeys.productOptions],
    queryFn: () => getProductOptions(),
  });
  return { data, isError, isLoading };
}
