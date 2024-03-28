import { ILoginValues } from "@shared/types/Auth";
import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";

type IBody = {
  email: string;
};

async function passwordReset(
  auth: IBody,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  try {
    const { data, status } = await axiosInstance({
      method: "POST",
      url: "api/auth/reset/",
      data: auth,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(true);
    if (status === 200) {
      Toaster({
        status: "success",
        message: "Password reset instructions sent to your email.",
      });
    }
  } catch (error: any) {
    setLoading(false);
    Toaster({
      status: "error",
      message: "Something went wrong. Please try again.",
    });
    throw error;
  }
}

export default passwordReset;
