import { queryKeys } from "@shared/queryKeys";
import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { IUnQualifiedPatient } from "@shared/types/patient";

async function unQualifiedPatientConsultations(): Promise<
  IUnQualifiedPatient[]
> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: `patient/unqualified`,
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

export function useGetunQualifiedPatients() {
  const fallback: any | [] = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.unqualifiedPatients],
    queryFn: () => unQualifiedPatientConsultations(),
  });
  return { data, isError, isLoading, refetch };
}
