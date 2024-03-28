import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { axiosInstance } from "../../axiosInstance";
import { IPrescriptionResponse } from "@shared/types/prescriber";

async function getPrescriptionByOID(
  oid: string
): Promise<IPrescriptionResponse | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/prescription/${oid}/`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.data;
  } catch (error: any) {
    // Toaster({
    //   status: "error",
    //   message: "Something went wrong!",
    // });
    throw error;
  }
}

export function useGetPrescriptionDetailByOID(oid: string) {
  const fallback: IPrescriptionResponse | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<IPrescriptionResponse, Error>({
    queryKey: [queryKeys.getPrescriptionByOID],
    queryFn: () => getPrescriptionByOID(oid),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  return { data, isError, isLoading, refetch };
}
