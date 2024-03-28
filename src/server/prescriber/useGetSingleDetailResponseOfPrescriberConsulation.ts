// useGetSingleDetailResponseOfPrescriberConsulation

import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";

//          id": 1,
//         "oid": "8abd18ce-bf0b-4f2d-a49e-8e61315c1a94",
//         "nurse_consultation_oid": "d41ca9b0-fd7a-410d-9ac1-43d2e6961c66",
//         "patient_internal_id": "P0065",
//         "prescriber_oid": "768bf938-bc75-410f-b298-75123d451694",
//         "patient_oid": "3e1ad8db-b562-463a-98b5-43087060a739",
//         "nurse_full_name": "Nurse Nurse",
//         "patient_full_name": "kkk kkk",
//         "prescriber_full_name": "prescriber prescriber",
//         "patient_email": "atombombmt@gmail.com",
//         "created_at": "2023-12-21T15:17:41.193922Z",
//         "updated_at": "2023-12-21T15:50:30.370690Z",
//         "booked_date_time": "2023-12-21T15:17:21Z",
//         "consultation_status": "prescriber_consultation_pending"

export type IPrescriberConsulationDetail = {
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
  booked_date_time: string;
  consultation_status: string;
  reject_reason: string;
  start_time: string;
  end_time?: string;
  created_at: string;
};

export type IPrescriberDetailResponse = {
  response: IResponseMeta;
  data: IPrescriberConsulationDetail;
};

async function getPrescriberDetailsByPrescriberConsulationOID(
  prescriber_consultation_oid: string,
): Promise<IPrescriberDetailResponse | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/prescriber-consultation/${prescriber_consultation_oid}/`,
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

export function useGetSingleDetailResponseOfPrescriberConsulation(
  prescriber_consultation_oid: string,
) {
  const fallback: IPrescriberDetailResponse | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<IPrescriberDetailResponse, Error>({
    queryKey: [queryKeys.getPrescriberDetailsByPrescriberConsulationOID],
    queryFn: () =>
      getPrescriberDetailsByPrescriberConsulationOID(
        prescriber_consultation_oid,
      ),
  });
  return { data, isError, isLoading, refetch };
}
