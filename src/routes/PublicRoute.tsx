import useAuth from "@hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const [isAuth] = useAuth();

  return isAuth > -1 ? (
    <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>
  ) : (
    <></>
  );
};

export default PublicRoute;
