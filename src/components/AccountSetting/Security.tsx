import { EyeClosed, EyeOpen } from "@assets/index";
import BasicModal from "@components/Modal";
import { Toaster } from "@components/shared/Toaster";
import ErrorText from "@components/widgets/Error";
import TextInput from "@components/widgets/TextInput";
import { useChangePassword } from "@server/auth/changePassword";
import { IChangePassword, passwordChangeSchema } from "@shared/types/Auth";
import { useFormik } from "formik";
import { useState } from "react";
import { useColors } from "@utils/tenant_configuration";




export default function Security() {
  const { primaryColor, primaryLightColor } = useColors();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* The line `const changePassword = useChangePassword();` is creating a variable `changePassword`
    and assigning it the value returned by the `useChangePassword` hook. This hook is likely a
    custom hook that handles the logic for changing the user's password. The `changePassword`
    variable can then be used to call the `mutate` function, which is likely responsible for making
    the API request to change the password. */
  const changePassword = useChangePassword();

  /**
   * The  code defines three functions that toggle the visibility of different password fields.
   */
  const onClickpasswordIconShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const onClickOldPasswordIconShowPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const onClickConfirmPasswordIconShowPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  /* The `const initialValues` is defining an object of type `IChangePassword` with three properties:
    `old_password`, `password`, and `password_confirm`. The initial values for these properties are
    set to empty strings. This object is used as the initial values for the formik form in the
    component. */
  const initialValues: IChangePassword = {
    old_password: "",
    password: "",
    password_confirm: "",
  };

  /* The code is using the `useFormik` hook from the Formik library to create a formik form. */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: passwordChangeSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      changePassword.mutate(values, {
        onSuccess: (data) => {
          resetForm();
          resetAll;
          setSubmitting(false);
          // const myModal = new bootstrap.Modal(document.getElementById('myModal'))
          // myModal.show()
          localStorage.clear();
        },
        onError: (error: any) => {
          Toaster({
            status: "error",
            message:
              error.response.data.data.errors[0].detail ??
              "Something went wrong",
          });
          resetAll;
          setSubmitting(false);
        },
      });
    },
  });

  /**
   * The function "resetAll" sets the values of "showOldPassword", "showNewPassword", and
   * "showConfirmPassword" to false.
   */
  const resetAll = () => {
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  /**
   * The function checks if all the required fields are filled and if the new password matches the
   * confirmation password.
   * @returns The function `validateALL` is returning a boolean value. If any of the conditions in
   * the function are true, it will return `true`. Otherwise, it will return `false`.
   */
  const validateALL = () => {
    if (formik.values.old_password === "") return true;
    if (formik.values.password === "") return true;
    if (formik.values.password_confirm === "") return true;
    if (formik.values.password !== formik.values.password_confirm) return true;
    if (formik.values.old_password === formik.values.password) return true;
    return false;
  };
  const isValidated = validateALL();

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="input mb-4">
          <div className="label_name">
            Old Password <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik.touched.old_password && formik.errors.old_password
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline"
              placeholder="Enter your Old Password"
              type={showOldPassword ? "text" : "password"}
              formik={formik.getFieldProps("old_password")}
              value={formik.values.old_password}
              onChange={(e) => {
                formik.setFieldValue("old_password", e.target.value);
              }}
            />
            <img
              onClick={onClickOldPasswordIconShowPassword}
              src={showOldPassword ? EyeOpen : EyeClosed}
              alt=""
              className="icon_svg"
            />
          </div>
          {/* {validateOne?.last_name && disabled && (
                        <ErrorText message={formik.errors.last_name} />
                    )} */}
          {formik.touched.old_password && isValidated && (
            <ErrorText message={formik.errors.old_password} />
          )}
        </div>

        <div className="input mb-4">
          <div className="label_name">
            New Password <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik.touched.password && formik.errors.password
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline"
              placeholder="Enter your New Password"
              type={showNewPassword ? "text" : "password"}
              formik={formik.getFieldProps("password")}
              value={formik.values.password}
              onChange={(e) => {
                formik.setFieldValue("password", e.target.value);
              }}
            />
            <img
              onClick={onClickpasswordIconShowNewPassword}
              src={showNewPassword ? EyeOpen : EyeClosed}
              alt=""
              className="icon_svg"
            />
          </div>

          {formik.touched.password && isValidated && (
            <ErrorText message={formik.errors.password} />
          )}
        </div>
        <div className="input">
          <div className="label_name">
            Confirm New Password <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik.touched.password_confirm && formik.errors.password_confirm
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline"
              placeholder="Enter your Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              formik={formik.getFieldProps("password_confirm")}
              value={formik.values.password_confirm}
              onChange={(e) => {
                formik.setFieldValue("password_confirm", e.target.value);
              }}
            />
            <img
              onClick={onClickConfirmPasswordIconShowPassword}
              src={showConfirmPassword ? EyeOpen : EyeClosed}
              alt=""
              className="icon_svg"
            />
          </div>
          {/* {validateOne?.first_name && disabled && (
                        <ErrorText message={formik.errors.first_name} />
                    )} */}

          {formik.touched.password_confirm && isValidated && (
            <ErrorText message={formik.errors.password_confirm} />
          )}
        </div>

        <button
          className="btn btn-primary"
          style={{
            padding: "12px 24px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1.5rem",
            borderRadius: "4px",
            outline: "none",
            backgroundColor: !isValidated
              ? `${primaryColor}`
              : `${primaryLightColor}`,
            border: !isValidated
              ? `"1px solid ${primaryColor}`
              : `1px solid ${primaryLightColor}`,
            width: "100%",
            // backgroundColor: `${PRIMARY_COLOR}`,
            // border: `"1px solid ${PRIMARY_COLOR}`,
          }}
          disabled={formik.isSubmitting || isValidated}
        >
          Save Changes
        </button>
      </form>

      {/* <Button
                id="get-started-btn"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                button={"Save Changes"}
                type="button"

                style={{
                    marginTop: "1.5rem",
                    backgroundColor: !isValidated ? `${PRIMARY_COLOR}` : `${PRIMARY_LIGHT_COLOR}`,
                    border: !isValidated ? `"1px solid ${PRIMARY_COLOR}` : `1px solid ${PRIMARY_LIGHT_COLOR}`,
                    // backgroundColor: `${PRIMARY_COLOR}`,
                    // border: `"1px solid ${PRIMARY_COLOR}`,
                }}
                disabled={formik.isSubmitting || isValidated}
            /> */}
      {/* <BasicModal title={"Logout?"} extraStyle={{}} modalSize="">
                <LogoutModal />
            </BasicModal> */}
    </>
  );
}
