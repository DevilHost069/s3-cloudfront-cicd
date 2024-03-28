import { axiosInstance } from "../../axiosInstance";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";

export type IConsulationPrescriberList = {
  id?: number;
  oid: string;
  nurse_consultation_oid: string;
  patient_internal_id: string;
  prescriber_oid: string;
  patient_oid: string;
  nurse_full_name: string;
  patient_full_name: string;
  prescriber_full_name: string;
  patient_email: string;
  created_at: string;
  updated_at: string;
  booked_date_time: string;
  consultation_status: string;
};

export type IConsulationPrescriberListResponse = {
  response: IResponseMeta;
  data: IConsulationPrescriberList[];
};

async function getPrescriberWithRespectToTenantByConsulationPrescriberOid(
  prescriber_oid: string,
): Promise<IConsulationPrescriberListResponse | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/prescriber/${prescriber_oid}/consultations`,
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

export function UseGetPrescriberWithRespectToTenantByConsulationPrescriberOid(
  prescriber_oid: string,
) {
  const fallback: IConsulationPrescriberListResponse | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<IConsulationPrescriberListResponse, Error>({
    queryKey: [
      queryKeys.getPrescriberWithRespectToTenantByConsulationPrescriberOid,
      prescriber_oid,
    ],
    queryFn: () =>
      getPrescriberWithRespectToTenantByConsulationPrescriberOid(
        prescriber_oid,
      ),
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
}
