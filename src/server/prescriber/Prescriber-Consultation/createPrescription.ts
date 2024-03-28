/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "../../../axiosInstance";
import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { attr_format } from "@utils/helper";

async function createPrescription(
  body: any,
  p_type: string
): Promise<any | undefined> {
  const token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }
  try {
    const { data, status } = await axiosInstance.post(
      `/api/prescription/?p_type=${p_type}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );

    if (status === 200) {
      Toaster({
        status: "success",
        message: "Prescription created successfully!",
      });
      return data.data;
    }
  } catch (error: any) {
    if (error.response.status === 400) {
      const err = error?.response?.data?.data?.errors[0].detail;
      const field = error?.response?.data?.data?.errors[0].attr;
      Toaster({
        status: "error",
        message: err ? attr_format(field) + err : "Something went wrong!",
      });
    } else {
      Toaster({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
}

export function useCreatePrescription(p_type: string) {
  const queryClient = useQueryClient();
  const { isError, isPending, isSuccess, mutate, error, mutateAsync } =
    useMutation({
      mutationKey: [queryKeys.createPrescription],
      mutationFn: (body: any) => createPrescription(body, p_type),
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getPrescriptionsByPCOID],
        });
      },
    });
  return {
    isError,
    isPending,
    isSuccess,
    mutate,
    mutateAsync,
    error,
  };
}
