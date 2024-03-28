/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "../../../../axiosInstance";
import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";

type IPostNoteBYConsulationId = {
  oid: string;
};

async function deleteNote({
  oid,
}: IPostNoteBYConsulationId): Promise<any | undefined> {
  const token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }
  try {
    const { data, status } = await axiosInstance.delete(`/api/notes/${oid}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
  } catch (error) {
    Toaster({
      status: "error",
      message: "Something went wrong!",
    });
  }
}

export function useDeletNote() {
  const queryClient = useQueryClient();
  const { isError, isPending, isSuccess, mutate, error } = useMutation({
    onMutate: async ({ oid }: IPostNoteBYConsulationId) => deleteNote({ oid }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.notes],
      });
      Toaster({
        status: "success",
        message: "Note has been deleted successfully.",
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
