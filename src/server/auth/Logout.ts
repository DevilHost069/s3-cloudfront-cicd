import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { getAuthenticatedAxiosconfig } from "@utils/helpers/axiosConfig";

type IProps = {
  navigate?: any;
};

async function logout({ navigate }: IProps): Promise<void> {
  try {
    const { status } = await axiosInstance(
      getAuthenticatedAxiosconfig({
        method: "POST",
        url: "auth/logout/",
      }),
    );
    if (status === 204) {
      localStorage.clear();
      navigate("/login");
      Toaster({
        status: "success",
        message: "Logout successful",
      });
    }
  } catch (error: any) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    Toaster({
      status: "error",
      message: error?.response?.data?.data?.non_field_errors[0],
    });
    throw error;
  }
}

export default logout;
