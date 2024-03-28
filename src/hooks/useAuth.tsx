import moment from "moment";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(-1);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("expiry")) {
      const expiryDate = moment(localStorage.getItem("expiry"));
      if (moment().isBefore(expiryDate)) {
        setIsAuthenticated(1);
      } else setIsAuthenticated(0);
    } else setIsAuthenticated(0);
  }, [localStorage.getItem("token"), localStorage.getItem("expiry")]);

  return [isAuthenticated];
};

export default useAuth;
