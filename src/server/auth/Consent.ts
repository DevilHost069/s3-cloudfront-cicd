// Consent deprecated, Fetching Terms and Conditions from here.
// #TODO Variable Naming to Terms and Conditions

import { ISignUpFormValues } from "@shared/types/Auth";
import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";

export type IConsentData = {
  id?: number;
  version: string;
  consent_type: string;
  consent_form: string;
  is_active?: boolean;
};

export type IConsents = {
  response: IResponseMeta;
  data: IConsentData;
};

async function getConsent(): Promise<IConsents | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: "/api/patient/terms_and_conditions",
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

export function useGetConsent() {
  const fallback: IConsents | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<IConsents, Error>({
    queryKey: [queryKeys.getConsent],
    queryFn: () => getConsent(),
    refetchOnWindowFocus: false,
  });
  return { data, isError, isLoading, refetch };
}

export default getConsent;
