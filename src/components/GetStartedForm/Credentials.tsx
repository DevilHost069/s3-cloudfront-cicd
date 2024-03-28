import TextInput from "../../components/widgets/TextInput";
import { EyeClosed, EyeOpen, Mail } from "../../assets";
import { useState } from "react";
import ErrorText from "@components/widgets/Error";

type Props = {
  formik: any;
};

export default function Credentials({ formik }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onClickpasswordIconShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onClickConfirmPasswordIconShowPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="personal-information">
        <div className="sub-title">
          <div className="personal-information">Account Information</div>
        </div>
      </div>
      <div className="input4">
        <div className="label_name">
          Email <strong className="asteriek">*</strong>
        </div>
        <div
          className={
            formik.touched.email && formik.errors.email
              ? " input_wrapper-outline-error"
              : "input_wrapper"
          }
        >
          <TextInput
            type="email"
            className="input_wrapper-outline"
            placeholder="Enter your email"
            formik={formik.getFieldProps("email")}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <ErrorText message={formik.touched.email && formik.errors.email} />
      </div>
      <div className="input4">
        <div className="label_name">
          Password <strong className="asteriek">*</strong>
        </div>
        <div
          className={
            formik.touched.password && formik.errors.password
              ? " input_wrapper-outline-error"
              : "input_wrapper"
          }
        >
          <TextInput
            type={showPassword ? "text" : "password"}
            className="input_wrapper-outline"
            placeholder="Enter your password"
            formik={formik.getFieldProps("password")}
            value={formik.values.password}
            onChange={formik.handleChange}
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
        <div className="label_name">
          Re-enter Password <strong className="asteriek">*</strong>
        </div>
        <div
          className={
            formik.touched.confirm_password && formik.errors.confirm_password
              ? " input_wrapper-outline-error"
              : "input_wrapper"
          }
        >
          <TextInput
            type={showConfirmPassword ? "text" : "password"}
            className="input_wrapper-outline"
            placeholder="Re-enter your password"
            formik={formik.getFieldProps("confirm_password")}
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
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
            formik.touched.confirm_password && formik.errors.confirm_password
          }
        />
      </div>
    </>
  );
}
