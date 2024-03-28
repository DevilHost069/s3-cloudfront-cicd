import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { IResponseMeta } from "@shared/types/common";

interface IConsultationAdmin {
  id: number;
  oid: string;
  prescriber_oid: string;
  patient_oid: string;
  patient_id: string;
  nurse_full_name: string;
  patient_full_name: string;
  prescriber_full_name: string;
  prescriber_type: string;
  prescriber_number: string;
  prescriber_email: string;
  patient_email: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  booked_date_time: string;
}
interface IConsultationAdminData {
  prescriber_consultations: IConsultationAdmin[];
  nurse_consultations: IConsultationAdmin[];
}
async function getConsultationAdmin(): Promise<
  IConsultationAdminData | undefined
> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/book/all-consultations`,
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

export function useGetConsultationAdmin() {
  const fallback: IConsultationAdminData = {
    prescriber_consultations: [],
    nurse_consultations: [],
  };
  const {
    data = fallback,
    isError,
    isLoading,
  } = useQuery<IConsultationAdminData, Error>({
    queryKey: [queryKeys.allConsultationAdmin],
    queryFn: () => getConsultationAdmin(),
  });
  return { data, isError, isLoading };
}
