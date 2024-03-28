import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@shared/queryKeys";
import { IResponseMeta } from "@shared/types/common";

export type ITimelineData = {
    id?: number;
    model_name: string;
    consultation_type: string;
    duration: string;
    consultor_first_name: string;
    consultor_last_name: string;
    booked_date_time: string;
};

export type ITimelineResponse = {
    response: IResponseMeta;
    data: ITimelineData;
};

async function getTPatientTimelineData(oid: string): Promise<
    ITimelineResponse | undefined
> {
    try {
        const { data, status } = await axiosInstance({
            method: "GET",
            url: `/api/patient/${oid}/timeline`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return data.data;
    } catch (error: any) {
        // Toaster({
        //   status: "error",
        //   message: "Something went wrong!",
        // });
        throw error;
    }
}

export function useGetPatientTimelineData(oid: string) {
    const fallback: ITimelineResponse | unknown = [];
    const {
        data = fallback,
        isError,
        isLoading,
        refetch,
    } = useQuery<ITimelineResponse, Error>({
        queryKey: [queryKeys.getTPatientTimelineData, "oid"],
        queryFn: () => getTPatientTimelineData(oid),
        refetchOnWindowFocus: false,
    });
    return { data, isError, isLoading, refetch };
}
