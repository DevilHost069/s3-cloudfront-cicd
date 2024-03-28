import logout from "@server/auth/Logout";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    logout({ navigate }).finally(() => {
      queryClient.clear();
    });
  }, []);

  return <></>;
};

export default Logout;
