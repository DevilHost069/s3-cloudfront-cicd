import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";
import { queryKeys } from "@shared/queryKeys";
import { axiosInstance } from "../../axiosInstance";

async function getNotifications({ pageParam }): Promise<any | undefined> {
  const { data, status } = await axiosInstance(
    getAuthenticatedAxiosconfig({
      method: "GET",
      url: `notification/?page=${pageParam}`,
    }),
  );
  return data.data;
}

export function useGetAllNotifications(size: number) {
  const fallback: any = [];
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: getNotifications,
    initialPageParam: 1,
    refetchInterval: 5000,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data?.next) {
        const urlParams = new URL(lastPage.data?.next).searchParams;
        return parseInt(urlParams.get("page"));
      } else return null;
    },
  });
  // const {
  //   status,
  //   data = fallback,
  //   error,
  //   isFetching,
  // } = useQuery({
  //   queryKey: [queryKeys.notifications, size],
  //   queryFn: () => getNotifications(size),
  //   refetchInterval: 5000,
  // });
  return {
    status,
    data,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
