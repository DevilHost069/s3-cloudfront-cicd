import NotificationBell from "@assets/icons/notification-bell.svg";
import { Hamburger } from "@assets/index";
import { useProfile } from "@contexts/ProfileContext";
import { useResolution } from "@hooks/useResolution";
import { PATH_TITLES } from "@utils/constants";
import { useEffect } from "react";
import SVG from "react-inlinesvg";
import { useLocation } from "react-router-dom";
import useSideBarState from "../../store/aside";
import Notifications from "./Notifications";
import { useNotifications } from "@contexts/NotificationContext";
const PortalNavbar = () => {
  const profileContext = useProfile();
  const location = useLocation();
  const activePatientSummaryName = profileContext?.activePatientSummaryName;
  const user_role = profileContext?.profile?.user_role;
  const initial = profileContext?.profile?.first_name[0] || " ";

  const { height, width } = useResolution();
  const { setOpened } = useSideBarState();
  const { unreadCount } = useNotifications();

  const openSidebar = () => {
    setOpened(true);
  };

  return (
    <>
      {" "}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-slate-100 w-full"
        style={{
          paddingBottom: "1.1rem",
        }}
      >
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse d-flex justify-content-between"
            id="navbarNav"
          >
            <ul
              className="navbar-nav"
              style={{
                paddingTop: "0.5rem",
              }}
            >
              <li
                className={
                  width <= 1000
                    ? "nav-item me-2 me-md-4 sidebar-icon mt-1"
                    : "d-none"
                }
              >
                <img onClick={openSidebar} src={Hamburger} alt="" />
              </li>
              <li
                className="nav-item d-none d-md-block"
                style={{
                  paddingRight: "10px",
                }}
              >
                <a
                  className="nav-link ps-0 text-capitalize"
                  aria-current="page"
                  href="#"
                  style={{
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "#6B7280",
                  }}
                >
                  {user_role} Portal
                </a>
              </li>
              <li className="border-end d-none d-md-block"></li>
              {location.pathname === "/prescriber/consultation/" &&
              profileContext?.showMedications &&
              profileContext?.activePatientSummaryName ? (
                <li
                  className="nav-item"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <a
                    className="nav-link active text-capitalize"
                    href="#"
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#1F2937",
                    }}
                  >
                    {profileContext?.activePatientSummaryName}
                  </a>
                </li>
              ) : (
                <li
                  className="nav-item"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <a
                    className="nav-link active text-capitalize"
                    href="#"
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#1F2937",
                    }}
                  >
                    {PATH_TITLES[location.pathname] || "Dashboard"}
                  </a>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center mx-md-4 mt-2">
              <div className=" position-relative">
                <SVG
                  src={NotificationBell}
                  width={24}
                  height={24}
                  className="me-3 dropdown-toggle cursor-pointer"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                {unreadCount ? (
                  <span className="unread-count text-white">{unreadCount}</span>
                ) : (
                  ""
                )}
                <Notifications />
              </div>
              <span
                className="bg-primary-900 text-uppercase text-white rounded-circle text-center"
                style={{
                  height: 40,
                  width: 40,
                  fontSize: 24,
                  lineHeight: 1.7,
                }}
              >
                {initial}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PortalNavbar;

// PN:
