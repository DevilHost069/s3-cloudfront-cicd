import Alert from "@components/Alert";
import { Booking } from "@components/GetStartedForm";
import { IListPrescriber } from "@components/Nurse/NurseDetail/ModalContent/AssignDoctor";
import PortalNavbar from "@components/PortalNavbar";
import PortalSidebar from "@components/PortalSidebar";
import SessionExpired from "@components/Session";
import Loader from "@components/shared/Loader";
import AlertProvider from "@contexts/AlertContext";
import NotificationsProvider from "@contexts/NotificationContext";
import ProfileProvider from "@contexts/ProfileContext";
import { useLocalStorageAlert } from "@hooks/useAlert";
import useAuth from "@hooks/useAuth";
import useExpirationCheck from "@hooks/useExpiration";
import { useMarkConsultationAsPaid } from "@server/Nurse/Nurse-Consulation/usePaymentAsPaid";

import { useProfiles } from "@server/auth/ProfileDetails";
import { useGetPAtientDtailByOID } from "@server/patient/getPatientDetailByOID";
import { useGetPrescriberWithRespectToTenant } from "@server/prescriber/useGetAllPrescriberOfSameConsulation";
import { IProfileDetails } from "@shared/types/Profile";
import { ONBOARDING_STATUS } from "@utils/constants";
import React, { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

const Content = ({ children, alerted, alertFor, crossClick, styler }: any) => {
  return (
    <div className="d-block d-sm-flex">
      <PortalSidebar />
      <div className="flex-grow-1">
        <PortalNavbar />
        {alerted === "true" && alertFor === "login" ? (
          <div className="container-fluid px-0">
            <Alert crossClick={crossClick} style={styler} msg="" />
          </div>
        ) : null}
        <div
          className="container-fluid bg-slate-100"
          style={{ minHeight: "92vh" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const PrivateLayout = ({ children, ctx, role }) => {
  const [hasSelected, setHasSelected] = React.useState(false);
  const [selectedvalue, setSelectedValue] = React.useState(null);
  const [activeButton, setActiveButton] = React.useState(false);
  const { alerted, alertFor, crossClick } = useLocalStorageAlert();
  const styler = {};




  const { data: patientDeatail, isLoading } = useGetPAtientDtailByOID(
    ctx,
  ) as any;

  const listPrescriber =
    useGetPrescriberWithRespectToTenant() as IListPrescriber;



  const content = (
    <div className="d-block d-sm-flex">
      <PortalSidebar />
      <div className="flex-grow-1">
        <PortalNavbar />
        {alerted === "true" && alertFor === "login" ? (
          <div className="container-fluid px-0">
            <Alert crossClick={crossClick} style={styler} msg="" />
          </div>
        ) : null}
        <div
          className="container-fluid bg-slate-100"
          style={{ minHeight: "92vh" }}
        >
          {children}
        </div>
      </div>
    </div>
  );

  const Switcher = () => {
    switch (patientDeatail?.onboarding_status) {
      case ONBOARDING_STATUS.PATIENT_ONBOARDING_NOT_STARTED:
      case ONBOARDING_STATUS.PATIENT_ONBOARDING_QUESTIONARIES_FILLED:
      case ONBOARDING_STATUS.PATIENT_ONBOARDING_QUESTIONARIES_SKIPPED:
        return (
          <div
            className="auth"
            style={{
              height: "100vh",
              overflowY: "scroll",
            }}
          >
            <div className="form">
              <Booking
                hasSelected={hasSelected}
                setHasSelected={setHasSelected}
                selectedvalue={selectedvalue}
                setSelectedValue={setSelectedValue}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                title="Book a Nurse"
                listPrescriber={listPrescriber}
              />
            </div>
          </div>
        );
      case ONBOARDING_STATUS.PATIENT_ONBOARDING_BOOKING_DONE:
        return content;
      default:
        return null;
    }
  };
  const switched = Switcher();

  return (
    <>
      {role !== "patient" ? (
        <Content
          alerted={alerted}
          alertFor={alertFor}
          crossClick={crossClick}
          styler={styler}
          children={children}
        />
      ) : (
        switched
      )}
    </>
  );
};

type PrivateRouteProps = {
  data: IProfileDetails;
  isError?: boolean;
  isLoading?: boolean;
  refetch?: any;
};
const PrivateRoute = () => {
  const [isAuth] = useAuth();
  const hasAUth = useExpirationCheck();
  const { data, isLoading } = useProfiles() as PrivateRouteProps;

  if (isLoading) {
    return <Loader />;
  }

  return hasAUth.isExpired ? (
    <SessionExpired />
  ) : (
    <>
      <AlertProvider>
        <ProfileProvider>
          <NotificationsProvider>
            <PrivateLayout ctx={data?.profile_id} role={data.user_role}>
              <Outlet />
            </PrivateLayout>
          </NotificationsProvider>
        </ProfileProvider>
      </AlertProvider>
    </>
  );
};

export default PrivateRoute;
