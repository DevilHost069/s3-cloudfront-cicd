import { Header } from "@components/GetStartedForm";
import TextInput from "@components/widgets/TextInput";
import { useState } from "react";
import Button from "@components/widgets/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "@components/widgets/Error";
import passwordReset from "@server/auth/forgotPassword";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useColors } from "@utils/tenant_configuration";


type IProps = {
  email: string;
  fe_base_url: string;
};


const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPAssword() {
  const [Loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const onClickpasswordIconShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const current_url = window.location.href.split("/")[2];


  const initialValues = {
    email: "",
    fe_base_url: current_url || "",
  } as IProps;


  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setTimeout(() => {
        passwordReset(values, setLoading);
        resetForm();
        setSubmitting(false);
      }, 50);
    },
  });

  const validate = () => {
    // must be in this format a@a.com
    if (
      formik.values.email === "" ||
      !formik.values.email.includes("@") ||
      !formik.values.email.includes(".")
    ) {
      return true;
    }
    return false;
  };

  const validateField = validate();
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <div
        className="auth"
        style={{
          height: "100vh",
        }}
      >
        <Header />

        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="personal-information">
            <div className="sub-title">
              <div className="personal-information">Reset your Password</div>
            </div>
          </div>
          <div className="input4">
            <div className="label_name">Email *</div>
            <div
              className={
                formik.touched.email && formik.errors.email
                  ? "input_wrapper input_wrapper-outline-error"
                  : "input_wrapper"
              }
            >
              <TextInput
                type="email"
                className="input_wrapper-outline"
                placeholder="Enter your email"
                formik={formik.getFieldProps("email")}
              />
            </div>
            <ErrorText message={formik.touched.email && formik.errors.email} />
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
// validate ? `${PRIMARY_LIGHT_COLOR}` : `${PRIMARY_COLOR}`,
