import { axiosInstance } from "../../../axiosInstance";
import { getAuthenticatedAxiosconfig } from "../../../utils/helpers/axiosConfig";
import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type IDebit = {
  success: boolean;
  uuid: string;
  purchaseId: string;
  returnType: string;
  redirectUrl: string;
  paymentMethod: string;
};

export type IDebitResponse = {
  response: IResponseMeta;
  data: IDebit;
};

async function useDebit(body: any): Promise<IDebitResponse | any> {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const { data, status } = await axiosInstance.post(`api/debit`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    // if (status === 202) {
    //   Toaster({
    //     status: "success",
    //     message: "Password changed successfully.",
    //   });
    // }

    return data.data;
  } catch (error: any) {
    throw error;
  }
}

export function usePostDebit() {
  const queryClient = useQueryClient();
  const fallback: any = undefined;
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.debit],
    mutationFn: (body: any) => useDebit(body),
    onSettled: () => {
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.getNurseConsulationDetailByOID],
      // });
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
}
