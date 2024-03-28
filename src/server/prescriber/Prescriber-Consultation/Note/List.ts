import { Toaster } from "@components/shared/Toaster";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../axiosInstance";

export type INoteData = {
  oid: string;
  note_title: string;
  note_body: string;
  consultation_id: string;
  created_at: string;
};

export type IListNote = {
  response: IResponseMeta;
  data: INoteData[];
};

async function getNoteList(c_id: string): Promise<IListNote | undefined> {
  try {
    const { data, status } = await axiosInstance({
      method: "GET",
      url: `api/prescriber-consultation/${c_id}/notes/`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.data;
  } catch (error: any) {
    Toaster({
      status: "error",
      message: error?.response?.data?.data?.non_field_errors[0],
    });
    throw error;
  }
}

export function useGetNoteListPrescriber(c_id: string) {
  const fallback: IListNote | unknown = [];
  const {
    data = fallback,
    isError,
    isLoading,
  } = useQuery<IListNote, Error>({
    queryKey: [queryKeys.notes],
    queryFn: () => getNoteList(c_id),
  });
  return { data, isError, isLoading };
}
