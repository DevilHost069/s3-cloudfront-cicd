import SVG from "react-inlinesvg";
import {
  formatNotificationLabel,
  getNotificationDateFormatted,
} from "@utils/helper";
import React, { useState } from "react";
import {
  ApplicationStatus,
  CheckMark,
  Lock,
  ThumbsUp,
  Trash,
} from "@assets/index";
import { useMarkNotificationAsRead } from "@server/notifications/useMarkAsRead";
import { useDeleteNotification } from "@server/notifications/useDeleteNotification";
import {
  NOT_DEFINED_LABEL,
  PASSWORD_RESET,
  WELCOME_LABEL,
} from "@utils/constants";

const NotificationItem = ({ notification }) => {
  const [hovered, setHovered] = useState(false);
  const markAsRead = useMarkNotificationAsRead();
  const deleteNotification = useDeleteNotification();
  return (
    <li
      className={`position-relative p-3 d-flex notification-item ${
        notification.is_read ? " bg-white" : " bg-success-50"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SVG
        src={
          WELCOME_LABEL.includes(notification.label)
            ? ThumbsUp
            : notification.label === PASSWORD_RESET
              ? Lock
              : ApplicationStatus
        }
        width={20}
        height={20}
        style={{ minWidth: "20px", marginRight: "0.35rem" }}
      />
      <div className="d-flex flex-column flex-grow-1">
        <span className="notification-title mb-2 text-gray-800 text-capitalize">
          {notification.label !== NOT_DEFINED_LABEL
            ? formatNotificationLabel(notification.label)
            : "Cannabize elite"}
          {!notification.is_read && (
            <span className="new-badge ms-3 text-gray-50 bg-primary-500 text-gray-50">
              New
            </span>
          )}
        </span>
        <span className="notification-body mb-2 text-gray-700">
          {notification.notification_message}
        </span>
        <span className="notification-time text-gray-500">
          {getNotificationDateFormatted(notification.created_at)}
        </span>
        {hovered ? (
          <>
            {!notification.is_read ? (
              <SVG
                width={20}
                height={20}
                className="cursor-pointer position-absolute bottom-0 mark-as-read-single mb-2"
                src={CheckMark}
                onClick={() => markAsRead.mutate(notification.id)}
              />
            ) : (
              ""
            )}
            <SVG
              width={20}
              height={20}
              className="cursor-pointer position-absolute bottom-0 end-0 me-2 mb-2"
              src={Trash}
              onClick={() => deleteNotification.mutate(notification.oid)}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

export default NotificationItem;
