import { queryKeys } from "@shared/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { IIngredientsRes } from "@shared/types/product";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";

async function getIngredients(): Promise<IIngredientsRes[] | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: `ingredient/`,
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

export function useGetIngredients() {
  const fallback: IIngredientsRes[] | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
  } = useQuery<IIngredientsRes[], Error>({
    queryKey: [queryKeys.ingredients],
    queryFn: () => getIngredients(),
  });
  return { data, isError, isLoading };
}
