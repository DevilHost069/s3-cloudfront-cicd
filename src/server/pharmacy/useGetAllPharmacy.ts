import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { IResponseMeta } from "@shared/types/common";

export type IPharmacy = {
  id: number;
  oid: string;
  created_at: string;
  updated_at: string;
  work_email: string;
  pharmacy_name: string;
  address: string;
};

export type IPharmacyRes = {
  response: IResponseMeta;
  data: IPharmacy[];
};

async function getPharmacy(): Promise<IPharmacyRes | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/pharmacist/`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.data;
  } catch (error: any) {
    // Toaster({
    //   status: "error",
    //   message: error?.response?.data?.data?.non_field_errors[0],
    // });
    throw error;
  }
}

export function useGetPharmacy() {
  const fallback: IPharmacyRes | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
  } = useQuery<IPharmacyRes, Error>({
    queryKey: [queryKeys.allPharmacy],
    queryFn: () => getPharmacy(),
  });
  return { data, isError, isLoading };
}
