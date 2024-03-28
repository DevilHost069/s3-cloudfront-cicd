import { queryKeys } from "@shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { axiosInstance } from "../../axiosInstance";

async function cancelPrescriptions(body: any, oid: string): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const { data, status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "PUT",
        url: `prescription/${oid}/`,
        data: body,
      }),
    );

    return data.data;
  } catch (error: any) {
    // Toaster({
    //   status: "error",
    //   message: "Something went wrong!",
    // });
    throw error;
  }
}

export function useCancelPrescriptions(oid: string) {
  const queryClient = useQueryClient();
  const fallback: any = undefined;
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.cancelledPrescriptions],
    mutationFn: (body: any) => cancelPrescriptions(body, oid),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getPrescriptionsByPCOID],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.patientConsultations],
      });
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
}
