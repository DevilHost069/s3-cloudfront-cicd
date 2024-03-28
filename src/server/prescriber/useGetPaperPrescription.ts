import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IPrescriberProfile, IResponseMeta } from "@shared/types/common";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";

export type IPrescriberProfileResponse = {
  response: IResponseMeta;
  data: IPrescriberProfile;
};

async function getPAperPrescription({
  prescriber_oid,
}): Promise<any | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `/api/prescription/${prescriber_oid}/getpaperprescription/`,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export function useGetPAperPrescription(prescriber_oid: any) {
  const queryClient = useQueryClient();
  const fallback: any | {} = {};
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.getPAperPrescriptions, "prescriber_oid"],
    queryFn: () => getPAperPrescription({ prescriber_oid }),
  });
  return { data, isError, isLoading, refetch };
}
