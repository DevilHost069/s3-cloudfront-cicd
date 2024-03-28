import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { IResponseMeta } from "@shared/types/common";

interface IAdminProfile {
  username: string;
  user_role: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_id: string;
  phone_number: string;
}

async function getConsultationAdminProfile(): Promise<
  IAdminProfile | undefined
> {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/auth/profile`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
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

export function useGetConsultationAdminProfile() {
  const fallback: IAdminProfile = {
    username: "",
    user_role: "",
    first_name: "",
    last_name: "",
    email: "",
    profile_id: "",
    phone_number: "",
  };
  const {
    data = fallback,
    isError,
    isLoading,
  } = useQuery<IAdminProfile, Error>({
    queryKey: [queryKeys.allConsultationAdmin],
    queryFn: () => getConsultationAdminProfile(),
  });
  return { data, isError, isLoading };
}
