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
  oid: string;
  first_name?: string;
  last_name?: string;
  phone_number: string;
  medicare_number: string;
  dob: string;
  address: string;
  gender: string;
  health_identifier: string;
  medicare_expiry_date?: string;
  medicare_reference_number?: string;
  previous_gp?: string;
  raw_address?: string;
};

async function updatePatient({
  oid,
  phone_number,
  medicare_number,
  dob,
  address,
  gender,
  health_identifier,
  medicare_expiry_date,
  medicare_reference_number,
  previous_gp,
  raw_address,
}: IUpdatePatient): Promise<IUpdatePatient | undefined> {
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
      {
        phone_number,
        medicare_number,
        dob,
        address,
        gender,
        health_identifier,
        medicare_expiry_date,
        medicare_reference_number,
        previous_gp,
        raw_address,
      },
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
        message: "Personal details updated successfully!",
      });
    }

    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message: "Something went wrong!",
    });
  }
}

export function useUpdatePatient(oid: string) {
  const queryClient = useQueryClient();
  const { isError, isPending, isSuccess, mutate, error } = useMutation({
    onMutate: async ({
      phone_number,
      medicare_number,
      dob,
      address,
      gender,
      health_identifier,
      medicare_expiry_date,
      medicare_reference_number,
      previous_gp,
      raw_address,
    }: IUpdatePatient) =>
      updatePatient({
        oid,
        phone_number,
        medicare_number,
        dob,
        address,
        gender,
        health_identifier,
        medicare_expiry_date,
        medicare_reference_number,
        previous_gp,
        raw_address,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getSinglePatientDetail, "oid"],
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
