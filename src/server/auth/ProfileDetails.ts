import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IProfileDetails } from "@shared/types/Profile";
import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";

export default async function profileDetails(
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<IProfileDetails> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: "auth/profile/",
      }),
    );
    setLoading(true);
    if (status === 200) {
      setLoading(false);
      return data.data;
    }
  } catch (error: any) {
    setLoading(false);
    Toaster({
      status: "error",
      message: error?.response?.data?.data?.non_field_errors[0],
    });
    throw error;
  }
}

async function getNurseConsultations(): Promise<any | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: `auth/profile/`,
      }),
    );
    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message: error?.response?.data?.data?.non_field_errors[0],
    });
    throw error;
  }
}

export function useProfiles() {
  const fallback: IProfileDetails | unknown = {};
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.profiles],
    queryFn: () => getNurseConsultations(),
  });
  return { data, isError, isLoading, refetch };
}
