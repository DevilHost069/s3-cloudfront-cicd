import { axiosInstance } from "../../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { useMutation } from "@tanstack/react-query";
import { consultation_missed_value } from "@utils/constants";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { useQueryClient } from "@tanstack/react-query";

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
  msg?: string;
};

export type INurseConsultationResponse = {
  response: IResponseMeta;
  data: INurseConsultationData;
};

async function markConsultationAsPaid({
  consultation_oid,
  body,
}: any): Promise<INurseConsultationData[] | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "PATCH",
        url: `nurse-consultation/${consultation_oid}/`,
        data: body,
      })
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

export function useMarkConsultationAsPaid(consultation_oid) {
  const queryClient = useQueryClient();
  const fallback: INurseConsultationData[] | [] = [];
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.paid],
    mutationFn: (body: any) =>
      markConsultationAsPaid({ body, consultation_oid }),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getNurseConsultationsForEachTenant],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getNurseConsulationDetailByOID],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getPatientDetailByOID],
      });
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
}
