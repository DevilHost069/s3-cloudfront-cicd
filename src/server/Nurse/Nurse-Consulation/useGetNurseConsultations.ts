import { axiosInstance } from "../../../axiosInstance";
import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";

type IPrescriberConsulation = {
  id: number;
  oid: string;
  nurse_consultation_oid: string;
  patient_internal_id: string;
  prescriber_oid: string;
  prescriber_full_name: string;
  booked_date_time: string;
  consultation_status: string;
};

type INurseConsultationData = {
  booked_date_time: string;
  consultation_status: string;
  created_at: string;
  id: number;
  nurse_approved: boolean;
  nurse_full_name: string;
  nurse_oid: string;
  oid: string;
  patient_full_name: string;
  patient_oid: string;
  updated_at: string;
  patient_email: string;
  patient_internal_id: string;
  prescriber_consultation: IPrescriberConsulation | null;
};

export type INurseConsultationResponse = {
  response: IResponseMeta;
  data: INurseConsultationData;
};

async function getNurseConsultations(
  nurse_profile_oid
): Promise<INurseConsultationData[] | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: `nurse/${nurse_profile_oid}/consultations/`,
      })
    );
    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message: error?.response?.data?.data?.non_field_errors[0],
    });
    return [];
  }
}

export function useGetNurseConsultations(nurse_profile_oid) {
  const fallback: INurseConsultationData[] | [] = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<INurseConsultationData[], Error>({
    queryKey: [queryKeys.getNurseConsultationsForEachTenant],
    queryFn: () => getNurseConsultations(nurse_profile_oid),
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
}
