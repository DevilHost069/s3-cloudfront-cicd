import * as Yup from "yup";
import { Header } from "@components/GetStartedForm";
import TextInput from "@components/widgets/TextInput";
import { EyeClosed, EyeOpen } from "../../assets";
import { use, useState } from "react";
import Button from "@components/widgets/Button";
import { useFormik } from "formik";
import passwordResetToken from "@server/auth/reserPAssword";
import { useNavigate, useParams } from "react-router-dom";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import ErrorText from "@components/widgets/Error";

import useAlertStoreMessage from "../../store/alert";
import { useColors } from "@utils/tenant_configuration";


type IResetPassword = {
  password: string;
  re_enter_new_password: string;
};

const initialValues = {
  password: "",
  re_enter_new_password: "",
} as IResetPassword;

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password must be at least 8 characters long with at least one number and one special character"
    ),
  re_enter_new_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

export default function ResetPassword() {
  const [Loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const onClickpasswordIconShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onClickConfirmPasswordIconShowPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // get token from url
  const token = useParams<{ token: string }>().token;

  const alertStore = useAlertStoreMessage();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      alertStore.setMessage("Your password has been changed successfully.");
      setTimeout(() => {
        passwordResetToken(values, setLoading, token, alertStore, navigate);
        setSubmitting(false);
        resetForm();
        if (!Loading) {
          localStorage.setItem("alert", "true");
        }
      }, 50);
    },
  });

  const validate = () => {
    if (
      formik.values.password === "" ||
      formik.values.re_enter_new_password === ""
    ) {
      return true;
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(formik.values.password)) {
      return true;
    }
    if (formik.values.password !== formik.values.re_enter_new_password) {
      return true;
    }
    return false;
  };
  const validateField = validate();
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <div className="auth">
        <Header />

        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="personal-information">
            <div className="sub-title">
              <div className="personal-information">Reset your Password</div>
            </div>
          </div>

          <div className="input4">
            <div className="label_name">New Password *</div>
            <div
              className={
                formik.touched.password && formik.errors.password
                  ? "input_wrapper input_wrapper-outline-error"
                  : "input_wrapper"
              }
            >
              <TextInput
                type={showPassword ? "text" : "password"}
                className="input_wrapper-outline"
                placeholder="Enter your password"
                formik={formik.getFieldProps("password")}
              />
              <img
                onClick={onClickpasswordIconShowPassword}
                src={showPassword ? EyeOpen : EyeClosed}
                alt=""
                className="icon_svg"
              />
            </div>
            <ErrorText
              message={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className="input4">
            <div className="label_name">Re-enter New Password *</div>
            <div
              className={
                formik.touched.re_enter_new_password &&
                  formik.errors.re_enter_new_password
                  ? "input_wrapper input_wrapper-outline-error"
                  : "input_wrapper"
              }
            >
              <TextInput
                type={showConfirmPassword ? "text" : "password"}
                className="input_wrapper-outline"
                placeholder="Re-enter your password"
                formik={formik.getFieldProps("re_enter_new_password")}
              />
              <img
                onClick={onClickConfirmPasswordIconShowPassword}
                src={showConfirmPassword ? EyeOpen : EyeClosed}
                alt=""
                className="icon_svg"
              />
            </div>
            <ErrorText
              message={
                formik.touched.re_enter_new_password &&
                formik.errors.re_enter_new_password
              }
            />
          </div>
          <Button
            disabled={validateField || formik.isSubmitting}
            id="get-started-btn"
            style={{
              backgroundColor:
                validateField || formik.isSubmitting
                  ? `${primaryLightColor}`
                  : `${primaryColor}`,
              border: "none",
            }}
            button="Reset Password"
            type="submit"
          />
        </form>
      </div>
    </>
  );
}
