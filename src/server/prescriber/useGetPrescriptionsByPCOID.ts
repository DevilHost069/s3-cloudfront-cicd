import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { IPrescriptionDetail } from "@shared/types/prescriber";

async function getPrescriptionsByPCOID(
  p_oid,
  type,
): Promise<IPrescriptionDetail[] | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: `prescription/getprescriptions?patient_oid=${p_oid}&rx_type=${type}`,
      })

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

export function useGetPrescriptionsByPCOID(p_oid, type) {
  const fallback: IPrescriptionDetail[] | any = [];
  const {
    data = fallback,
    isError,
    isLoading,
  } = useQuery<IPrescriptionDetail[], Error>({
    queryKey: [queryKeys.getPrescriptionsByPCOID, type, p_oid],
    queryFn: () => getPrescriptionsByPCOID(p_oid, type),
  });
  return { data, isError, isLoading };
}
