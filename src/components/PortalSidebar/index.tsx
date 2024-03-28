import "@assets/css/sidebar.css";
import { FunctionComponent, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SVG from "react-inlinesvg";
import Natura from "@assets/img/natura.svg";
import HannahMedLogo from "@assets/img/hannahmed_logo.png";
import {
  ADMIN_NAVIGATION_ITEMS_TOP,
  NAVIGATION_ITEMS_BOTTOM,
  NURSE_NAVIGATION_ITEMS_TOP,
  PATIENT_NAVIGATION_ITEMS_TOP,
  PHARMACY_NAVIGATION_ITEMS_TOP,
  PRESCRIBER_NAVIGATION_ITEMS_TOP,
} from "@utils/constants";
import { INavItem } from "@shared/types/Constant";
import { useProfile } from "@contexts/ProfileContext";
import { IUserRole } from "@shared/types/Profile";
import { Close, LogoutIcon } from "@assets/index";
import { useResolution } from "@hooks/useResolution";
import useSideBarState from "../../store/aside";
import BasicModal from "@components/Modal";
import LogoutModal from "@components/AccountSetting/LogoutModal";
import * as bootstrap from "bootstrap";
import { useConfiguration } from "@contexts/ConfigurationContext";

const PortalSidebar: FunctionComponent = () => {
  const [navItems, setNavItems] = useState<INavItem[]>([]);
  const profileContext = useProfile();
  const { opened, setOpened } = useSideBarState();
  const { height, width } = useResolution();
  const location = useLocation();
  const isActivePath = location.pathname;

  const url = window.location.href

  const modalOpen = () => {
    const myModal = new bootstrap.Modal(document.getElementById("logOut"));
    myModal.show();
  };

  const onClose = () => {
    setOpened(false);
  };
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (profileContext?.profile?.user_role) {
      switch (profileContext?.profile?.user_role as IUserRole) {
        case "patient":
          setNavItems(PATIENT_NAVIGATION_ITEMS_TOP);
          break;
        case "nurse":
          setNavItems(NURSE_NAVIGATION_ITEMS_TOP);
          break;
        case "pharmacist":
          setNavItems(PHARMACY_NAVIGATION_ITEMS_TOP);
          break;
        case "prescriber":
          setNavItems(PRESCRIBER_NAVIGATION_ITEMS_TOP);
          break;
        case "tenant_admin":
          setNavItems(ADMIN_NAVIGATION_ITEMS_TOP);
          break;

        default:
          break;
      }
    }
  }, [profileContext]);

  const { configurations } = useConfiguration();

  // Assuming configurationData is structured correctly
  const logoUrl = configurations?.data?.branding?.logo || HannahMedLogo;

  return (
    <>
      <div className={opened && width < 1000 ? "new_sider" : "sider"}>
        <div className="d-flex bg-slate-100">
          <a
            href="/"
            className="d-flex align-items-center p-3 mx-auto text-white text-decoration-none"
          >
            <img src={
              logoUrl
            } alt="" height={100} />
          </a>

          <span className="a_label text-primary-900">
            <SVG
              src={Close}
              width={24}
              height={"auto"}
              title={"Close sidebar"}
              onClick={onClose}
            />
          </span>
        </div>

        <hr className="mt-0" />
        <ul className="nav nav-pills flex-column mb-auto px-3 pt-3">
          {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              <NavLink className="nav-link" to={item.to} onClick={onClose}>
                <SVG
                  src={item.icon}
                  width={18}
                  height={"auto"}
                  title={item.title}
                  className={
                    isActivePath === item.to
                      ? "me-3 text-primary-900"
                      : "me-3 text-white"
                  }
                />
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <hr />
        <ul className="nav nav-pills flex-column px-3 pb-5">
          {NAVIGATION_ITEMS_BOTTOM.map((item: any, index: any) => (
            <li className="nav-item" key={index}>
              <NavLink className="nav-link" to={item.to} onClick={onClose}>
                <SVG
                  src={item.icon}
                  width={18}
                  height={"auto"}
                  title={item.title}
                  className={
                    isActivePath === item.to ? "me-3 text-primary-900" : "me-3 svg1"
                  }
                />
                {item.title}
              </NavLink>
            </li>
          ))}
          <li className="nav-item">
            <button className="nav-link" onClick={modalOpen}>
              <SVG
                src={LogoutIcon}
                width={18}
                height={"auto"}
                title={"Logout"}
                className={"me-3 svg1"}
              />
              Logout
            </button>
          </li>
        </ul>
      </div>

      <BasicModal
        title={"Logout"}
        extraStyle={{}}
        modalSize=""
        modalId="logOut"
      >
        <LogoutModal />
      </BasicModal>
    </>
  );
};

export default PortalSidebar;
