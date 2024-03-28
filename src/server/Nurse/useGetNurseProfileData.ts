import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IPrescriberProfile, IResponseMeta } from "@shared/types/common";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";

export type INurseProfileResponse = {
  response: IResponseMeta;
  data: IPrescriberProfile;
};

async function getNurseProfileDetail({
  nurse_oid,
}): Promise<INurseProfileResponse | undefined> {
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "GET",
        url: `nurse/${nurse_oid}/`,
      }),
    );

    return data;
  } catch (error: any) {
    throw error;
  }
}

export function useGetNurseProfileDetail(nurse_oid: string) {
  const queryClient = useQueryClient();
  const fallback: IPrescriberProfile | {} = {};
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.getPrescriberProfileData],
    queryFn: () => getNurseProfileDetail({ nurse_oid }),
  });
  return { data, isError, isLoading, refetch };
}
