import "@assets/css/GetStarted/Signin.css";
import { SigninSideImage, SigninSideImageHana } from "@assets/index";
import Header from "@components/GetStartedForm/Header";
import DisabledButton from "@components/shared/DisabledButton";
import Button from "@components/widgets/Button";
import ErrorText from "@components/widgets/Error";
import TextInput from "@components/widgets/TextInput";
import login from "@server/auth/Login";
import { ILoginValues, loginSchema } from "@shared/types/Auth";
import { useFormik } from "formik";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useState } from "react";
import { EyeClosed, EyeOpen } from "../../assets";
import { useNavigate } from "react-router-dom";
import Alert from "@components/Alert";
import { useLocalStorageAlert } from "@hooks/useAlert";
import useAlertStoreMessage from "../../store/alert";
import { useScrollToTopOnRouteChange } from "@hooks/useScrollToTop";
import { useColors, getBackgroundImage } from "@utils/tenant_configuration";


const initialValues = {
  username: "",
  password: "",
} as ILoginValues;

export const alertStyler = {
  color: "#006C3C",
  fontWeight: "400",
};

export default function Logger() {
  useScrollToTopOnRouteChange();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const alertStore = useAlertStoreMessage().getMessage() as string;
  const onClickpasswordIconShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { alerted, alertFor, crossClick } = useLocalStorageAlert();

  /* The `useFormik` hook is used to create a formik instance, which handles form state, validation,
  and submission. */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values, setLoading, navigate);
    },
  });

  function validateUsername() {
    if (!formik.values.username || formik.values.username === "") {
      return "Email is required";
    }
    return "";
  }
  const validateUserNameHasError = validateUsername();

  function checkValue() {
    if (formik.values.username === "" || formik.values.password === "") {
      return false;
    }
    return true;
  }
  const checking = checkValue();
  const styler = {
    color: "#006C3C",
    fontWeight: "400",
  };
  const { primaryColor, primaryLightColor } = useColors();
  const backgroundImageUrl = getBackgroundImage();

  return (
    <>
      <Header />

      {/* two col with one image and form with responsive mobile view in bootstrap5 */}
      <div
        className="main_login"
        style={{
          minHeight: "100%",
          height: "100vh",
          overflowX: "clip",
          // paddingTop: "3rem",
          backgroundColor: "#F1F5F9",
        }}
      >
        {alerted ? (
          <>
            <div
              className=" pt-5 w-full"
              style={{
                width: "100%",
                margin: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "-2rem",
                marginTop: "-1rem",
                color: "#006C3C",
                backgroundColor: "#F1F5F9",
              }}
            >
              <Alert msg={alertStore} style={styler} crossClick={crossClick} />
            </div>
          </>
        ) : null}

        <section
          className="container-fluid login_section w-full"
          style={{
            backgroundColor: "#F1F5F9",
            backgroundImage: `url(${backgroundImageUrl})`
          }}
        >
          <div
            className="row w-full"
            style={{
              minHeight: "100%",
              height: "100vh",
            }}
          >
            <div className="col-12 col-md-6  px-0 d-none d-lg-block d-sm-none img_col">
              <img
                src={SigninSideImageHana}
                alt="SigninSideImage"
                className="img-responsive sign-in-hero"
              />
            </div>

            <div
              className="col-12 col-lg-6 col-md-12 d-flex  justify-content-center bg_img"
              style={{
                minHeight: "100%",
                height: "100vh",
              }}
            >
              <form
                className="form_signin w-full shadow"
                style={{ backgroundColor: "#fff" }}
                onSubmit={formik.handleSubmit}
              >
                <h1 className="header_text text-center w-full">Login</h1>
                <div className="input4 mb-3">
                  <div className="label_name">
                    Email Address <strong className="asteriek">*</strong>
                  </div>
                  <div
                    className={
                      formik.touched.username && formik.errors.username
                        ? "input_wrapper input_wrapper-outline-error"
                        : "input_wrapper"
                    }
                  >
                    <TextInput
                      type="text"
                      formik={formik.getFieldProps("username")}
                      className="input_wrapper-outline"
                      placeholder="Enter your Email Address"
                    />
                    {/* <img src={Mail} alt="" className="icon_svg img-fluid" /> */}
                  </div>
                  {formik.errors.username && formik.touched.username && (
                    <ErrorText message={formik.errors.username} />
                  )}
                </div>
                <div className="input4">
                  <div className="label_name">
                    Password <strong className="asteriek">*</strong>
                  </div>
                  <div
                    className={
                      formik.touched.password && formik.errors.password
                        ? "input_wrapper input_wrapper-outline-error"
                        : "input_wrapper"
                    }
                  >
                    <TextInput
                      type={showPassword ? "text" : "password"}
                      formik={formik.getFieldProps("password")}
                      className="input_wrapper-outline"
                      placeholder="Enter your Password"
                    />
                    <img
                      onClick={onClickpasswordIconShowPassword}
                      src={showPassword ? EyeOpen : EyeClosed}
                      alt=""
                      className="icon_svg"
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <ErrorText message={formik.errors.password} />
                  )}

                  <p className="small mb-5 pt-3 forgot_pass">
                    <a
                      className="text-muted text-decoration-none"
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </a>
                  </p>
                </div>

                <div className="mt-3 w-full">
                  {Loading ? (
                    <>
                      <DisabledButton
                        id="get-started-btn"
                        type="button"
                        button="Login"
                        style={{
                          backgroundColor: `${primaryColor}`,
                          border: `"1px solid ${primaryColor}`,
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        id="get-started-btn"
                        type="submit"
                        button="Login"
                        disabled={!checking}
                        style={{
                          backgroundColor: checking
                            ? `${primaryColor}`
                            : `${primaryLightColor}`,
                          border: checking
                            ? `"1px solid ${primaryColor}`
                            : `1px solid ${primaryLightColor}`,
                        }}
                      />
                    </>
                  )}
                </div>

                <p
                  style={{
                    color: "var(--primary-500)",
                    fontFamily: "Nunito Sans",
                    fontWeight: 400,
                    fontSize: "16px",
                    textAlign: "left",
                    marginTop: "20px",
                  }}
                >
                  Don't have an account?{" "}
                  <a
                    href="/screening"
                    className="link_color"
                    style={{
                      color: "var(--primary-500)",
                      fontFamily: "Nunito Sans",
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  >
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
