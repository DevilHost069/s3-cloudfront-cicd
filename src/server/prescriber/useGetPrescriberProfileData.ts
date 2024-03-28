import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IPrescriberProfile, IResponseMeta } from "@shared/types/common";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";

export type IPrescriberProfileResponse = {
  response: IResponseMeta;
  data: IPrescriberProfile;
};

async function getPrescriberProfileDetail({
  prescriber_oid,
}): Promise<IPrescriberProfileResponse | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: `prescriber/${prescriber_oid}/`,
      }),
    );

    return data;
  } catch (error: any) {
    throw error;
  }
}

export function useGetProfileDetail(prescriber_oid: any) {
  const queryClient = useQueryClient();
  const fallback: IPrescriberProfile | {} = {};
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.getPrescriberProfileData],
    queryFn: () => getPrescriberProfileDetail({ prescriber_oid }),
  });
  return { data, isError, isLoading, refetch };
}
