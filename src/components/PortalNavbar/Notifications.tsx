import "@assets/css/notification.css";
import { useNotifications } from "@contexts/NotificationContext";
import { useMarkAllNotificationAsRead } from "@server/notifications/useMarkAllNotificationAsRead";
import NotificationItem from "./NotificationItem";
import Loader from "@components/shared/Loader";

const Notifications = () => {
  const {
    notifications,
    unreadCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotifications();
  const markAllAsRead = useMarkAllNotificationAsRead();
  return (
    <ul
      className="dropdown-menu dropdown-menu-end notification-list custom-scrollbar overflow-x-auto py-0"
      onClick={(e) => e.stopPropagation()}
      style={{ maxHeight: notifications.length ? 483 : "auto" }}
    >
      <li className="px-3 py-2 notification-header z-10 d-flex justify-content-between position-sticky top-0 bg-white">
        <span className="notification-title">Notifications</span>
        {unreadCount ? (
          <span
            className="mark-as-read cursor-pointer"
            onClick={() => markAllAsRead.mutate()}
          >
            Mark All as Read
          </span>
        ) : (
          ""
        )}
      </li>
      {notifications.length ? (
        <>
          {notifications?.map((item, index) => (
            <NotificationItem notification={item} key={index} />
          ))}
          {hasNextPage ? (
            <li className="px-3 py-2 notification-header z-10 d-flex justify-content-center bg-white">
              <>
                {isFetchingNextPage ? (
                  <Loader
                    loaderContainerClass={"small-loader"}
                    width={"24"}
                    strokeWidth={"5"}
                  />
                ) : (
                  <span
                    className="notification-title cursor-pointer"
                    onClick={() => fetchNextPage()}
                  >
                    See more
                  </span>
                )}
              </>
            </li>
          ) : (
            ""
          )}
        </>
      ) : (
        <li className="px-3 py-2 notification-header z-10 d-flex justify-content-center bg-white">
          <span className="notification-title">No new notifications</span>
        </li>
      )}
    </ul>
  );
};

export default Notifications;
