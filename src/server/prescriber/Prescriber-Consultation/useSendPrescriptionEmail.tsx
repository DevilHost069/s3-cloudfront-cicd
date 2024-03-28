import { axiosInstance } from "../../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";


async function sendPrescriptionEmailList({
  prescription_oid,
  email_list,
  msg,
}) {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "POST",
        url: `prescription/${prescription_oid}/sendPrescriptionToEmail/`,
        data: {
          email_list,
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

export function useSendPrescriptionEmailList({ msg }) {
  const queryClient = useQueryClient();
  const fallback:  [] = [];
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.markConsultationAsRejected],
    mutationFn: ({ prescription_oid, email_list }: any) =>
        sendPrescriptionEmailList({
        prescription_oid,
        email_list,
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
