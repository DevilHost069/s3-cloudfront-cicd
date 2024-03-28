import { Flag } from "@assets/index";
import { Header } from "@components/GetStartedForm";
import { Toaster } from "@components/shared/Toaster";
import Button from "@components/widgets/Button";
import ErrorText from "@components/widgets/Error";

import TextInput from "@components/widgets/TextInput";
import { useGetConsent } from "@server/auth/Consent";
import { usepostQuestionnaire } from "@server/auth/Questionnaire";
import register from "@server/auth/Register";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { usePostUnQualifiedUser } from "@server/auth/unQualifiedRegister";
import { ONBOARDING_STATUS } from "@utils/constants";
import { useFormik } from "formik";
import useScreenQuestion from "../../store/onboardingScreening";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useColors } from "@utils/tenant_configuration";


export default function UnQualifiedForm() {
  const { data, isLoading } = useGetConsent() as any;
  const register = usePostUnQualifiedUser();
  const postQuestionnaire = usepostQuestionnaire();
  const screen = useScreenQuestion();
  const sceenVal = screen.getScreeningState();
  const navigate = useNavigate();

  const initialValues = {
    signed_consent_form_id: data?.id,
    first_name: "",
    last_name: "",
    phone_number: "",
    // medicare_number: "",
    // dob: "",
    // gender: "",
    // address: "",
    email: "",
    password: "Test@123",
    // confirm_password: "",
    onboarding_status: ONBOARDING_STATUS.PATIENT_ONBOARDING_NOT_STARTED,
    // health_identifier: "",
    is_qualified: false,
    auto_location: false,
  } as any;

  const validationSchemas = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    phone_number: Yup.string()
      .matches(/^[\d\s()+-]+$/, "The number you have entered is not valid")
      .required("Phone Number is required")
      .min(10, "The number you have entered is not valid")
      .max(20, "The number you have entered is not valid"),
    email: Yup.string().email().required("Email is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchemas,
    onSubmit: async (values) => {
      register.mutate(values, {
        onSuccess: (data: any) => {
          // Toaster({
          //     status: "success",
          //     message: "Registration Successful",
          // })

          const vall = {
            response_type: "patient_onboarding_response",
            patient_id: data?.oid,
            nurse: "",
            response_json: sceenVal.response_json,
          };
          postQuestionnaire.mutate(vall, {
            onSuccess: (data) => {
              screen.resetInitialValues();
              navigate("/screening/success");
            },
            onError: (error) => {},
          });
        },
        onError: (error) => {},
      });
    },
  });
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <div className="auth">
        <Header />
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="personal-information">Personal Information</div>
          <div className="inputs">
            <div className="input">
              <div className="label_name">
                First name <strong className="asteriek">*</strong>
              </div>
              <div
                className={
                  formik.touched.first_name && formik.errors.first_name
                    ? " input_wrapper-outline-error"
                    : "input_wrapper"
                }
              >
                <TextInput
                  className="input_wrapper-outline"
                  placeholder="Enter your First Name"
                  formik={formik.getFieldProps("first_name")}
                  value={formik.values.first_name}
                  onChange={(e) => {
                    formik.setFieldValue("first_name", e.target.value);
                  }}
                />
              </div>
              {formik.errors.first_name && formik.touched.first_name && (
                <ErrorText message={formik.errors.first_name as string} />
              )}

              {/* {formik.touched.first_name && !disabled && (
            <ErrorText message={formik.errors.first_name} />
          )} */}
            </div>
            <div className="input">
              <div className="label_name">
                Last name <strong className="asteriek">*</strong>
              </div>
              <div
                className={
                  formik.touched.last_name && formik.errors.last_name
                    ? " input_wrapper-outline-error"
                    : "input_wrapper"
                }
              >
                <TextInput
                  className="input_wrapper-outline"
                  placeholder="Enter your Last Name"
                  formik={formik.getFieldProps("last_name")}
                  value={formik.values.last_name}
                  onChange={(e) => {
                    formik.setFieldValue("last_name", e.target.value);
                  }}
                />
              </div>
              {formik.errors.last_name && formik.touched.last_name && (
                <ErrorText message={formik.errors.last_name as string} />
              )}
              {/* {formik.touched.last_name && !disabled && (
            <ErrorText message={formik.errors.last_name} />
          )} */}
            </div>
          </div>
          <div className="input">
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
                placeholder="Enter your Email"
                formik={formik.getFieldProps("email")}
                value={formik.values.email}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <ErrorText message={formik.errors.email as string} />
            )}
            {/* {formik.touched.last_name && !disabled && (
            <ErrorText message={formik.errors.last_name} />
          )} */}
          </div>
          <div className="inputs">
            <div className="input">
              <div className="label_name">
                Phone number <strong className="asteriek">*</strong>
              </div>
              <div
                className={
                  formik.touched.phone_number && formik.errors.phone_number
                    ? "123 input_wrapper-outline-error"
                    : "input_wrapper"
                }
              >
                <img src={Flag} alt="" className="icon_svg" />
                <TextInput
                  placeholder="Enter your Phone Number"
                  type="tel"
                  className="input_wrapper-outline"
                  formik={formik.getFieldProps("phone_number")}
                  value={formik.values.phone_number}
                  onChange={(e) => {
                    const inputValuewithoutAlphabet = e.target.value.replace(
                      /[a-zA-Z]/g,
                      ""
                    );
                    formik.setFieldValue(
                      "phone_number",
                      inputValuewithoutAlphabet
                    );
                  }}
                />
              </div>
              {formik.touched.phone_number && formik.errors.phone_number && (
                <ErrorText message={formik.errors.phone_number as string} />
              )}
              {/* {formik.touched.phone_number && !disabled && (
            <ErrorText message={formik.errors.phone_number} />
          )} */}
            </div>

            {/* <div className="input dir">
          <div className="label_tooltip">
            <div className="label_name">Medicare Number</div>
          </div>

          <div
            className={
              formik.touched.medicare_number && formik.errors.medicare_number
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              placeholder="Enter Medicare Number"
              type="tel"
              className="input_wrapper-outline"
              formik={formik.getFieldProps("medicare_number")}
              value={formik.values.medicare_number}
              onChange={
                // allow user to input only numbers
                (e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    if (e.target.value.length > 10) {
                      return;
                    }
                    formik.setFieldValue("medicare_number", e.target.value);
                  }

                }
              }
            />
          </div>
          {validateOne?.medicare_number && disabled && (
            <ErrorText message={formik.errors.medicare_number} />
          )}
          {formik.touched.medicare_number && (
            <ErrorText message={formik.errors.medicare_number} />
          )}
        </div> */}
          </div>
          {/* <div className="input">
        <div className="label_name">IHI number</div>
        <div
          className={
            (validateOne?.health_identifier && disabled) ||
              (formik.touched.health_identifier && formik.errors.health_identifier)
              ? " input_wrapper-outline-error"
              : "input_wrapper"
          }
        >
          <TextInput
            className="input_wrapper-outline"
            placeholder="Enter your IHI Number"
            formik={formik.getFieldProps("health_identifier")}
            value={formik.values.health_identifier}
            onChange={(e) => {
              //  allow user to input only numbers and 16 digits only, no spaces or dashes allowed
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                if (e.target.value.length > 16) {
                  return;
                }
                formik.setFieldValue("health_identifier", e.target.value);
              }
            }}
          />
        </div>
        {validateOne?.health_identifier && disabled && (
          <ErrorText message={formik.errors.health_identifier} />
        )}
        {formik.touched.health_identifier && !disabled && (
          <ErrorText message={formik.errors.health_identifier} />
        )}
      </div> */}
          {/* <div className="input">
                        <div className="label_name">Date of Birth</div>
                        <div className="input_wrapper">
                            <input
                                className="input_wrapper-outline"
                                placeholder="Select your Birthdate"
                                type="text"
                                onFocus={(e) => (e.currentTarget.type = "date")}
                                id="date"
                                style={{
                                    width: "100%",
                                    cursor: "text",
                                }}
                                  {...formik.getFieldProps("dob")}
                                onChange={(e) => {
                                    // check if date is in future then set it to default
                                    const date = new Date(e.target.value);
                                    const currentDate = new Date();
                                    if (date > currentDate) {
                                        return;
                                    }

                                    formik.setFieldValue("dob", e.target.value);
                                }}
                            />
                        </div>
                        {
            formik.touched.dob && formik.errors.dob && (
              <ErrorText message={formik.errors.dob} />
            )
          }
                    </div> */}

          {/* <div className="unqualified_radios " role="group">
                        <div className="gender">Gender</div>
                        <div className="column">
                            <RadioBtn
                                value="male"
                                label="Male"
                                radioBorder="1px solid var(--color-gray)"
                                labelColor="#1f2937"
                            onChange={(e) => {
                              formik.setFieldValue("gender", e.target.value);
                            }}
                            checked={formik.values.gender === "male" ? true : false}
                            />
                            <RadioBtn
                                label="Female"
                                value="female"
                                radioBorder="1px solid var(--color-gray)"
                                labelColor="#1f2937"
                            onChange={(e) => {
                              formik.setFieldValue("gender", e.target.value);
                            }}
                            checked={formik.values.gender === "female" ? true : false}
                            />
                            <RadioBtn
                                label="Others"
                                radioBorder="1px solid var(--color-gray)"
                                labelColor="#1f2937"
                                value="others"
                            onChange={(e) => {
                              formik.setFieldValue("gender", e.target.value);
                            }}
                            checked={formik.values.gender === "others" ? true : false}
                            />
                        </div>
                    </div> */}

          {/* <div className="input4">
                        <div className="label_name">Address</div>
                        <div
                            className=""
                            style={{
                                width: "100%",
                            }}
                        >
                            <GooglePlacesAutocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY as string}
                                autocompletionRequest={{
                                    componentRestrictions: {
                                        country: ["au"],
                                    },
                                }}
                                selectProps={{
                                    isClearable: true,
                                    placeholder: "Enter Address Information",
                                    defaultInputValue: formik.values.address,

                                    onChange: (val) => {
                                        formik.setFieldValue("address", val?.label);
                                    },

                                    styles: {
                                        control: (provided, state) => ({
                                            ...provided,

                                            width: "100%",
                                            outline: "none",
                                            borderColor: "#E5E7EB",
                                            boxShadow: "none",
                                            "&:hover": {
                                                borderColor: "#4D6D68",
                                            },
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            color: state.isSelected ? "var(--color-gray)" : "#1f2937",

                                            backgroundColor: state.isSelected ? `${PRIMARY_COLOR}` : "#fff",
                                            "&:hover": {
                                                backgroundColor: "#E5E7EB",
                                                color: "var(--color-gray)",
                                            },
                                        }),
                                        menu: (provided, state) => ({
                                            ...provided,
                                            outline: "none",
                                            borderColor: "#E5E7EB",
                                            boxShadow: "none",
                                            border: "0.1px solid #E5E7EB",
                                            borderRadius: "0.5rem",

                                            width: "100%",
                                        }),

                                        singleValue: (provided, state) => ({
                                            ...provided,
                                            color: "#1f2937",
                                        }),
                                        placeholder: (provided, state) => ({
                                            ...provided,
                                            color: "#9ca3af",

                                            fontSize: "16px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            fontFamily: "Nunito Sans",
                                            lineHeight: "150%",
                                        }),
                                        indicatorsContainer: (provided, state) => ({
                                            ...provided,
                                            color: "#1f2937",
                                            height: "3rem",
                                        }),
                                    },
                                }}

                            />
                        </div>
                    </div> */}
          <Button
            id="get-started-btn"
            button="Submit"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            // onClick={onclicked}
            style={{
              marginTop: "1rem",
              backgroundColor:
                formik.isValid && !formik.isSubmitting
                  ? `${primaryColor}`
                  : `${primaryLightColor}`,
              border: `1px solid ${primaryLightColor}`,
            }}
          />
        </form>
      </div>
    </>
  );
}
