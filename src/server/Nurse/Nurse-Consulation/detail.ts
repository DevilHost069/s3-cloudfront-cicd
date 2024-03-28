import { Toaster } from "@components/shared/Toaster";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { axiosInstance } from "../../../axiosInstance";
import { IPrescriberConsulationDetail } from "@server/prescriber/useGetSingleDetailResponseOfPrescriberConsulation";

export type INurseConsulationDetail = {
  id: number;
  oid: string;
  patient_oid: string;
  nurse_oid: string;
  nurse_full_name: string;
  patient_full_name: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  booked_date_time: string;
  nurse_approved: boolean;
  consultation_status: string;
  prescriber_consultation: IPrescriberConsulationDetail;
  payment_status?: string;
};

export type INurseResponse = {
  response: IResponseMeta;
  data: INurseConsulationDetail;
};

async function getNurseConsulationDetailByOID(
  oid: string
): Promise<INurseResponse | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/nurse-consultation/${oid}/`,
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

export function useGetNurseConsulationDetailByOID(oid: string) {
  const fallback: INurseResponse | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<INurseResponse, Error>({
    queryKey: [queryKeys.getNurseConsulationDetailByOID, "oid"],
    queryFn: () => getNurseConsulationDetailByOID(oid),
    // onSuccess
  });
  return { data, isError, isLoading, refetch };
}
