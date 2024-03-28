import "@assets/css/dashboard_new.css";
import { useProfile } from "@contexts/ProfileContext";
import { FunctionComponent, useEffect, useState } from "react";
import PatientDashboard from "@components/Patient/patient";
import { USER_ROLES } from "@utils/constants";
import NurseDashboard from "@components/Nurse/nurse";
import Prescibers from "@components/prescriber/prescibers";
import Admin from "@components/Admin";

import { useSearchParams } from "react-router-dom";
import { useMarkConsultationAsPaid } from "@server/Nurse/Nurse-Consulation/usePaymentAsPaid";
import AdminDashboard from "@components/Admin";


const Dashboard: FunctionComponent = () => {
  const profileContext = useProfile();
  const [dashboardComponent, setDashboardComponent] = useState(<></>);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const params = searchParams.get("status");
  // const oid = searchParams.get("consultation_oid");

  // const paid = useMarkConsultationAsPaid(oid);

  // useEffect(() => {
  //   if (params === "error") {
  //     // setSearchParams({ status: "" });
  //     paid.mutate({ payment_status: 'error' }, {
  //       onSuccess: () => {
  //         setSearchParams({ status: "" });
  //       }
  //     });

  //   } else if (params === "success") {
  //     paid.mutate({ payment_status: 'paid' }, {
  //       onSuccess: () => {
  //         setSearchParams({ status: "" });
  //       }
  //     });
  //   }
  // }, [params]);

  useEffect(() => {
    if (profileContext?.profile?.user_role) {
      switch (profileContext?.profile?.user_role) {
        case USER_ROLES.patient:
          setDashboardComponent(<PatientDashboard />);
          break;
        case USER_ROLES.nurse:
          setDashboardComponent(<NurseDashboard />);
          break;
        case USER_ROLES.prescriber:
          setDashboardComponent(<Prescibers />);
          break;
        case USER_ROLES.tenantadmin:
          setDashboardComponent(<AdminDashboard />);
          break;
        default:
          break;
      }
    }
  }, [profileContext]);

  return (
    <div
      className="row g-3 dash_padding"
      style={{
        overflowX: "scroll",
        overflowY: "clip",
        scrollBehavior: "smooth",
      }}
    >
      {dashboardComponent}
    </div>
  );
};

export default Dashboard;