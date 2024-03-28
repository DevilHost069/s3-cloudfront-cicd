import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IPrescriberProfile, IResponseMeta } from "@shared/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { precriber_missed_status } from "@utils/constants";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";

export type IPrescriberProfileResponse = {
  response: IResponseMeta;
  data: IPrescriberProfile;
};

async function postSentPrecriptionToPharmacy({
  body,
}): Promise<IPrescriberProfile | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "POST",
        url: `prescription/${body.oid}/sendprescription/`,
        data: body.body,
      }),
    );

    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message:
        error?.response?.data?.data?.errors[0]?.detail ||
        "Something went wrong...",
    });
    throw error;
  }
}

export function usePostSentPrescriptionToPharmacy() {
  const queryClient = useQueryClient();
  const fallback: IPrescriberProfile | {} = {};
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
    mutateAsync,
  } = useMutation({
    mutationKey: [queryKeys.postSentPrecriptionToPharmacy],
    mutationFn: (body: any) => postSentPrecriptionToPharmacy({ body }),

    // onSettled: () => {
    //   //  invalidate all the queries
    //   queryClient.clear();
    // },
  });
  return { data, isError, mutate, mutateAsync, isPending, isSuccess };
}
