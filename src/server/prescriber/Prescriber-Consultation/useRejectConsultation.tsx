import { axiosInstance } from "../../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";

type IPrescriberConsultationData = {
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

export type IPrescriberConsultationResponse = {
  response: IResponseMeta;
  data: IPrescriberConsultationData;
};

async function markConsultationAsRejected({
  consultation_oid,
  reject_reason,
  msg,
}): Promise<IPrescriberConsultationData[] | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "POST",
        url: `prescriber-consultation/${consultation_oid}/reject/`,
        data: {
          reject_reason,
        },
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

export function useMarkConsultationAsRejectedPrescriber({ msg }) {
  const queryClient = useQueryClient();
  const fallback: IPrescriberConsultationData[] | [] = [];
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.markConsultationAsRejected],
    mutationFn: ({ consultation_oid, reject_reason }: any) =>
      markConsultationAsRejected({
        consultation_oid,
        reject_reason,
        msg,
      }),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getNurseConsultations],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getPrescriberConsulationDetailByOID],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getPatientDetailByOID],
      });
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
}
