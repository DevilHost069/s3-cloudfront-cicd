import FirstScreenForm from "./FirstScreenForm";
import SecondScreenForm from "./SecondScreenForm";
import React from "react";
import { useFormik } from "formik";
import { ISignUpFormValues, signUpSchema } from "../../shared/types/Auth";

const initialValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  medicare_number: "",
  dob: "",
  gender: "",
  address: "",
  email: "",
  password: "",
  confirm_password: "",
} as ISignUpFormValues;

export default function SignUpForm() {
  const [step, setStep] = React.useState<string>("first");

  const [agree, setAgree] = React.useState<boolean>(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {},
  });
  const onClickNext = () => {
    setStep("second");
  };

  const { getFieldProps, touched, errors } = formik;

  function getStep() {
    if (step === "first") {
      return (
        <FirstScreenForm
          getFieldProps={getFieldProps}
          touched={touched}
          errors={errors}
        />
      );
    } else if (step === "second") {
      return (
        <SecondScreenForm
          getFieldProps={getFieldProps}
          touched={touched}
          errors={errors}
          agree={agree}
          setAgree={setAgree}
        />
      );
    } else {
      return (
        <FirstScreenForm
          getFieldProps={getFieldProps}
          touched={touched}
          errors={errors}
        />
      );
    }
  }

  return (
    <>
      <div className="form">
        <div className="left-side">
          <div className="left-heading">
            <img className="register_img" src="" />
            <h3 className="text-center">Cannabizelite</h3>
          </div>
        </div>
        <div className="right-side">
          <div className="main active">
            <small>
              <i className="fa fa-smile-o"></i>
            </small>
            <div className="text">
              <h2>
                Create your <span className="text-primary">Account</span>
              </h2>
              <p>Enter your personal information to get closer to copanies.</p>
            </div>
            {/* <FirstScreenForm
              getFieldProps={getFieldProps}
              touched={touched}
              errors={errors}
            /> */}
            {getStep()}
            <div className="buttons">
              <button
                onClick={() => {
                  onClickNext();
                }}
                className="next_button"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
