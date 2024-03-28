import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";

export type IPrescriberData = {
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
  prescriber_type: string;
  prescriber_number: string;
  prescriber_email: string;
};

export type IPrescriberResponse = {
  response: IResponseMeta;
  data: IPrescriberData;
};

async function getPrescriberWithRespectToTenant(): Promise<
  IPrescriberResponse | undefined
> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: "/api/prescriber/",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error: any) {
    // Toaster({
    //   status: "error",
    //   message: "Something went wrong!",
    // });
    throw error;
  }
}

export function useGetPrescriberWithRespectToTenant() {
  const fallback: IPrescriberResponse | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<IPrescriberResponse, Error>({
    queryKey: [queryKeys.getPrescriberWithRespectToTenant],
    queryFn: () => getPrescriberWithRespectToTenant(),
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
}
