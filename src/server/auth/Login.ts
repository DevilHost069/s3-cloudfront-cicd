import { ILoginValues } from "@shared/types/Auth";
import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { getAxiosconfig } from "@utils/helpers/axiosConfig";

async function login(
  auth: ILoginValues,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: any,
): Promise<void> {
  try {
    const { data, status } = await axiosInstance(
      getAxiosconfig({
        method: "POST",
        url: "auth/login/",
        data: auth,
      }),
    );

    if (status === 200) {
      setLoading(true);
      localStorage.setItem("alert", "true");
      localStorage.setItem("alertFor", "login");
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("expiry", data.data.expiry);
      setTimeout(() => {
        navigate("/dashboard");
        setLoading(false);
      }, 50);
    }
  } catch (error: any) {
    setLoading(false);
    Toaster({
      status: "error",
      message: error?.response?.data?.data?.errors[0].detail,
    });
    throw error;
  }
}

export default login;
