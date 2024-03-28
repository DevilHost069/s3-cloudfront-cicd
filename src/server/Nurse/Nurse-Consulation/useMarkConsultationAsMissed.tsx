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

async function markConsultationAsMissed({
  consultation_oid,
  consultation_status,
  msg,
}): Promise<INurseConsultationData[] | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "PATCH",
        url: `nurse-consultation/${consultation_oid}/`,
        data: { consultation_status },
      }),
    );
    Toaster({
      status: "success",
      message: msg,
    });
    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message: error?.response?.data?.data?.non_field_errors[0],
    });
    throw error;
  }
}

export function useMarkConsultationAsMissed({
  consultation_status = consultation_missed_value,
  msg,
}) {
  const queryClient = useQueryClient();
  const fallback: INurseConsultationData[] | [] = [];
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.markConsultationAsMissed],
    mutationFn: (consultation_oid: string) =>
      markConsultationAsMissed({ consultation_oid, consultation_status, msg }),

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
