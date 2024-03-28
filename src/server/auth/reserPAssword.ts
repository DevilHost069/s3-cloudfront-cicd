import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";

type IResetPassword = {
  password: string;
};

async function passwordResetToken(
  auth: IResetPassword,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  token: string,
  alertStore: any,
  navigate?: any
): Promise<void> {
  try {
    const { data, status } = await axiosInstance({
      method: "POST",
      //   api with tokken in
      url: `api/auth/reset/${token}/`,
      data: auth,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(true);

    if (status === 200) {
      console.log("data", data);
      navigate("/login");
    }
  } catch (error: any) {
    setLoading(false);
    const status = error.response.status;
    if (status === 400) {
      return Toaster({
        status: "error",
        message: "Password reset failed or token is expired.",
      });
    }
    Toaster({
      status: "error",
      message: "Something went wrong. Please try again.",
    });
    throw error;
  }
}

export default passwordResetToken;
