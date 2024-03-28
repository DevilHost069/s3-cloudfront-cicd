import React, { useContext, useMemo, useState } from "react";
import { useGetAllNotifications } from "@server/notifications/useGetAllNotifications";

const NotificationsContext = React.createContext<any>(null);

export function useNotifications() {
  return useContext(NotificationsContext);
}

function NotificationsProvider({ children }: any) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [size, setSize] = useState(10);
  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetAllNotifications(size);

  const notifications = useMemo(() => {
    if (data?.pages?.length) {
      setUnreadCount(data.pages[0].unread_count);
      return data.pages?.map((page: any) => page.data.results).flat(1);
    }
    return [];
  }, [data]);

  const value = {
    notifications,
    unreadCount,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export default NotificationsProvider;
