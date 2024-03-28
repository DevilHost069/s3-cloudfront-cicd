import { Toaster } from "@components/shared/Toaster";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { axiosInstance } from "../../../axiosInstance";

export type IPrescriberConsulationDetail = {
  id: number;
  oid: string;
  patient_oid: string;
  nurse_oid: string;
  nurse_full_name: string;
  patient_full_name: string;
  created_at: string;
  updated_at: string;
  booked_date_time: string;
  nurse_approved: boolean;
  consultation_status: string;
  prescriber_consultation: IPrescriberConsulationDetail;
};

export type IPrescriberResponse = {
  response: IResponseMeta;
  data: IPrescriberConsulationDetail;
};

async function getPrescriberConsulationDetailByOID(
  oid: string,
): Promise<IPrescriberResponse | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/prescriber-consultation/${oid}/`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message: "Something went wrong!",
    });
    throw error;
  }
}

export function useGetPrescriberConsulationDetailByOID(oid: string) {
  const fallback: IPrescriberResponse | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<IPrescriberResponse, Error>({
    queryKey: [queryKeys.getPrescriberConsulationDetailByOID, "oid"],
    queryFn: () => getPrescriberConsulationDetailByOID(oid),
    // onSuccess
  });
  return { data, isError, isLoading, refetch };
}
