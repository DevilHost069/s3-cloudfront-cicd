import { ISignUpFormValues } from "@shared/types/Auth";
import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { removeStorage } from "@utils/helper";
import login from "./Login";

async function register(
  body: ISignUpFormValues,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  setOnLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  navigate?: any,
): Promise<ISignUpFormValues | void> {
  try {
    const { data, status } = await axiosInstance({
      method: "POST",
      url: "/api/patient/",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    setOnLoading(true);
    if (status === 201) {
      localStorage.setItem("pid", data.data.oid);
      removeStorage("accept");
      const resp = {
        email: data?.data?.email,
        password: body.password,
      };
      login(
        { username: resp.email, password: resp.password },
        setLoading,
        navigate,
      );
      setLoading(false);
    }
    return data?.data;
  } catch (error: any) {
    setLoading(false);
    // get status code
    const status = error?.response?.status;
    if (status === 400) {
      return Toaster({
        status: "error",
        message: error?.response?.data?.data?.errors[0].detail,
      });
    }
    Toaster({
      status: "error",
      message: "Something went wrong, please try again",
    });
    throw error;
  }
}

export default register;
