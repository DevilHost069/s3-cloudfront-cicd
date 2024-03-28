/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { axiosInstance } from "../../axiosInstance";

type IUpdatePatientResponse = {
  body: any;
  oid: string;
};

async function updatePatient({
  oid,
  body,
}: IUpdatePatientResponse): Promise<IUpdatePatientResponse | undefined> {
  const token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }
  if (!oid) {
    return undefined;
  }
  try {
    const { data, status } = await axiosInstance.put(
      `api/patient/response/${oid}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      },
    );

    if (status === 200) {
      Toaster({
        status: "success",
        message: "Medical details updated successfully!",
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

// export function useUpdatePatientResponse(oid: string) {
//   const queryClient = useQueryClient();
//   const { isError, isPending, isSuccess, mutate, error } = useMutation({
//     onMutate: async (body: any) => updatePatient({ oid, body }),
//     onSettled: () => {
//       queryClient.invalidateQueries({
//         queryKey: [queryKeys.getSinglePatientDetail, "oid"],
//       });
//     },
//   });
//   return {
//     isError,
//     isPending,
//     isSuccess,
//     mutate,
//     error,
//   };
// }

export function useUpdatePatientResponse(oid: string) {
  const queryClient = useQueryClient();
  const fallback: any = undefined;
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.changePassword],
    mutationFn: (body: any) =>
      updatePatient({
        oid,
        body,
      }),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getSinglePatientDetail, "oid"],
      });
    },
  });
  return { data, isError, mutate, isPending, isSuccess };
}
