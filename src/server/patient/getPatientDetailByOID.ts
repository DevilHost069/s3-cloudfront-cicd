import { Toaster } from "@components/shared/Toaster";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { axiosInstance } from "../../axiosInstance";

export type IPatientDetailByOID = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  username: string;
  signed_consent_form: {
    id: number;
    version: string;
    consent_type: string;
    consent_form: string;
    is_active: boolean;
  };
  oid: string;
  created_at: string;
  updated_at: string;
  medicare_number: string;
  patient_internal_id: string;
  dob: string;
  address: string;
  raw_address?: string;
  consent_signed_at: string;
  auth_user: number;
  last_updated_by: string;
  patient_responses: any;
  gender: string;
  health_identifier: string;
  medicare_expiry_date: string;
  medicare_reference_number: string;
  previous_gp: string;
};

export type IPatientResponse = {
  response: IResponseMeta;
  data: IPatientDetailByOID;
};

async function getPatientDetailByOID(
  oid: string
): Promise<IPatientResponse | undefined> {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/patient/${oid}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
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

export function useGetPAtientDtailByOID(oid: string) {
  const fallback: IPatientResponse | unknown = {};
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<IPatientResponse, Error>({
    queryKey: [queryKeys.getPatientDetailByOID],
    queryFn: () => getPatientDetailByOID(oid),
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
}
