import { ISignUpFormValues } from "@shared/types/Auth";
import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";

export type INurseData = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  oid: string;
  created_at: string;
  updated_at: string;
  booking_id: string;
  auth_user: number;
};

export type INurseResponse = {
  response: IResponseMeta;
  data: INurseData;
};

async function getNursesWithRespectToTenant(): Promise<
  INurseResponse | undefined
> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: "/api/nurse/",
      headers: {
        "Content-Type": "application/json",
      },
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

export function useGetgetNursesWithRespectToTenant() {
  const fallback: INurseResponse | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<INurseResponse, Error>({
    queryKey: [queryKeys.getConsent],
    queryFn: () => getNursesWithRespectToTenant(),
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
}
