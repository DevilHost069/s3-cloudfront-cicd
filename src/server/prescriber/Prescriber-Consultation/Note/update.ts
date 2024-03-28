/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "../../../../axiosInstance";
import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";

type IUpdateNote = {
  oid: string;
  note_title: string;
  note_body: string;
  prescriber_consultation_id: string;
  created_at?: string;
};
async function updateNote({
  oid,
  note_title,
  note_body,
  prescriber_consultation_id,
}: IUpdateNote): Promise<IUpdateNote | undefined> {
  const token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }
  if (!oid) {
    return undefined;
  }
  try {
    const { data, status } = await axiosInstance.put(
      `/api/prescriber-consultation/notes/${oid}/`,
      {
        note_title,
        note_body,
        prescriber_consultation_id,
      },
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

export function useUpdateNotePrescriber(oid: string) {
  const queryClient = useQueryClient();
  const { isError, isPending, isSuccess, mutate, error } = useMutation({
    onMutate: async ({
      note_title,
      note_body,
      prescriber_consultation_id,
    }: IUpdateNote) =>
      updateNote({ oid, note_title, note_body, prescriber_consultation_id }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.notes],
      });
      Toaster({
        status: "success",
        message: "Note has been updated successfully.",
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
