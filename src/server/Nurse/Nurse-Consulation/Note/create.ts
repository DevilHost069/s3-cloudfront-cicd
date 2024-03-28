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
  note_title: string;
  note_body: string;
  consultation_id: string;
};

async function postNoteByConsulationOID({
  note_title,
  note_body,
  consultation_id,
}: IPostNoteBYConsulationId): Promise<any | undefined> {
  const token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }
  try {
    const { data, status } = await axiosInstance.post(
      `/api/notes/`,
      {
        note_title,
        note_body,
        consultation_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      },
    );

    return data.data;
  } catch (error) {
    Toaster({
      status: "error",
      message: "Something went wrong!",
    });
  }
}

export function usePostNote() {
  const queryClient = useQueryClient();
  const { isError, isPending, isSuccess, mutate, error } = useMutation({
    onMutate: async ({
      note_title,
      note_body,
      consultation_id,
    }: IPostNoteBYConsulationId) =>
      postNoteByConsulationOID({ note_title, note_body, consultation_id }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.notes],
      });
      Toaster({
        status: "success",
        message: "Note has been created successfully.",
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
