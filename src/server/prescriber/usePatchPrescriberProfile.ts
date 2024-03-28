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

async function patchPrescriberProfile({
  body,
}): Promise<IPrescriberProfile | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "PATCH",
        url: `auth/profile/`,
        data: body,
      }),
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

export function usePatchProfile() {
  const queryClient = useQueryClient();
  const fallback: IPrescriberProfile | {} = {};
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.prescriberProfilePatch],
    mutationFn: (body: any) => patchPrescriberProfile({ body }),

    onSettled: () => {
      //  invalidate all the queries
      queryClient.clear();
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
}
