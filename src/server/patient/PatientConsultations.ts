import { queryKeys } from "@shared/queryKeys";
import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { IConsultationDetails } from "@shared/types/Consultation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";

async function patientConsultations(
  patientId: string,
): Promise<IConsultationDetails[]> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: `patient/${patientId}/consultations`,
      }),
    );
    if (status === 200) {
      return data.data;
    }
  } catch (error: any) {
    Toaster({
      status: "error",
      message: error?.response?.data?.data?.non_field_errors[0],
    });
    throw error;
  }
}

export default patientConsultations;

export function useGetPAtientConsulation(prescriber_oid: any) {
  const queryClient = useQueryClient();
  const fallback: any | [] = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.patientConsultations, "prescriber_oid"],
    queryFn: () => patientConsultations(prescriber_oid),
  });
  return { data, isError, isLoading, refetch };
}
