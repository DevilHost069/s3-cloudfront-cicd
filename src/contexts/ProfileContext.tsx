import profileDetails from "@server/auth/ProfileDetails";
import { IProfileDetails } from "@shared/types/Profile";
import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "./AlertContext";
import { ALERT_MESSAGES } from "@utils/constants";

const ProfileContext = React.createContext<any>(null);

export function useProfile() {
  return useContext(ProfileContext);
}

function ProfileProvider({ children }: any) {
  const alertContext = useAlert();
  const [loading, setLoading] = useState(false);
  const [showMedications, setShowMedications] = useState(false);
  const [activePatientSummaryName, setActivePatientSummaryName] =
    useState(false);
  const [profile, setProfile] = useState<IProfileDetails>({
    username: "",
    user_role: "",
    first_name: "",
    last_name: "",
    email: "",
    profile_id: null,
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      profileDetails(setLoading).then((res) => {
        setProfile(res);
        if (res.user_role) {
          alertContext.setShow(true);
          alertContext.setMessage(ALERT_MESSAGES.welcome(res.user_role));
          alertContext.setVariant("success");
        }
      });
    }
  }, []);

  const value = {
    profile,
    loading,
    setProfile,
    showMedications,
    setShowMedications,
    activePatientSummaryName,
    setActivePatientSummaryName,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileProvider;
