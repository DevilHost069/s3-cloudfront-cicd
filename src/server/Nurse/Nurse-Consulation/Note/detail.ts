/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "../../../../axiosInstance";
import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";

// "data": {
//     "oid": "e2ab455a-2d7f-4888-a810-db1ae0ee6069",
//     "note_title": "hello",
//     "note_body": "<p>hello</p>",
//     "consultation_id": "3",
//     "created_at": "2023-12-11T15:52:20.726779Z"
//   }

type IGetNoteBYOid = {
  oid: string;
  note_title: string;
  note_body: string;
  consultation_id: string;
  created_at: string;
};
async function getNoteBYOid(
  note_oid: string
): Promise<IGetNoteBYOid | undefined> {
  const token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }
  if (!note_oid) {
    return undefined;
  }
  try {
    const { data, status } = await axiosInstance.get(
      `/api/notes/${note_oid}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );

    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message: "Something went wrong!",
    });
  }
}

export function useGetNote(oid: string) {
  const queryClient = useQueryClient();
  const fallback: unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
    refetch,
  } = useQuery<IGetNoteBYOid, Error>({
    queryKey: [queryKeys.note, oid],
    queryFn: () => getNoteBYOid(oid),
    enabled: !!oid,
  });
  return { data, isError, isLoading, refetch };
}
