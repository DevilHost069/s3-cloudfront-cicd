/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { axiosInstance } from "../../axiosInstance";

type IUpdatePatient = {
  oid?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  medicare_number: string;
  dob: string;
  address: string;
  gender: string;
};

async function updatePatientProfile(
  oid: string,
  body: IUpdatePatient,
): Promise<IUpdatePatient | undefined> {
  const token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }
  if (!oid) {
    return undefined;
  }
  try {
    const { data, status } = await axiosInstance.patch(
      `/api/patient/${oid}/`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      },
    );

    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message: "Something went wrong!",
    });
  }
}

export function useUpdatePatientProfile(oid: string) {
  const queryClient = useQueryClient();
  const { isError, isPending, isSuccess, mutate, error } = useMutation({
    onMutate: async (body: IUpdatePatient) => updatePatientProfile(oid, body),
    onSettled: () => {
      queryClient.clear();
      Toaster({
        status: "success",
        message: "Personal information updated successfully!",
      });
    },
  });
  return {
    isError,
    isPending,
    isSuccess,
    mutate,
    error,
  };
}
