import { Flag } from "@assets/index";
import { IPatientDetailsBYOid } from "@components/Nurse/NurseDetail/main";
import Button from "@components/widgets/Button";
import ErrorText from "@components/widgets/Error";
import RadioBtn from "@components/widgets/Radio";
import TextInput from "@components/widgets/TextInput";

import { useFormik } from "formik";
import { usePlacesWidget } from "react-google-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import * as Yup from "yup";

import { useColors } from "@utils/tenant_configuration";



type Props = {
  title: string;
  patientDetail: IPatientDetailsBYOid;
  upd: any;
};

export default function General({
  title = "General",
  patientDetail,
  upd,
}: Props) {
  const { primaryColor, primaryLightColor } = useColors();

  const { data } = patientDetail;

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    phone_number: Yup.string()
      .matches(/^[\d\s()+-]+$/, "The number you have entered is not valid")
      .required("Phone Number is required")
      .max(20, "The number you have entered is not valid")
      .min(10, "The number you have entered is not valid"),
    dob: Yup.date()
      .nullable()
      .test("dob", "Date of Birth cannot be in the future.", (value) => {
        if (value) {
          const date = new Date(value);
          const currentDate = new Date();
          if (date > currentDate) {
            return false;
          }
        }
        return true;
      })
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old or above."
      )
      .typeError("Date of Birth is required"),
    gender: Yup.string().nullable(),
    address: Yup.string().nullable(),
  });

  const initialValues = {
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    phone_number: data?.phone_number || "",
    // medicare_number: data?.medicare_number || "",
    dob: data?.dob || "",
    gender: data.gender || "",
    address: data?.address || "",
    raw_address: data.raw_address || "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: initialValues,
    onSubmit: (values) => {
      const propertiesToDelete = ["medicare_number", "dob", "address"];
      for (const property of propertiesToDelete) {
        if (values[property] === "") {
          delete values[property];
        }
      }
      upd.mutate(values);
    },
  });

  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
    onPlaceSelected: (place: any) => {
      formik.setFieldValue("address", place.formatted_address);
      formik.setFieldValue("raw_address", place.address_components);
    },
    options: {
      types: ["geocode"],
      componentRestrictions: { country: "AU" },
    },
  });

  const validateValues = () => {
    if (!formik.values.first_name) {
      return true;
    }
    if (!formik.values.last_name) {
      return true;
    }
    if (!formik.values.phone_number) {
      return true;
    }
    if (
      formik.values.phone_number.length < 10 ||
      formik.values.phone_number.length > 20
    ) {
      return true;
    }
    // if (formik.values.medicare_number && formik.values.medicare_number.length < 10) {
    //     return true;
    // }
    return false;
  };
  const isValidated = validateValues();
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="inputs mb-3">
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
            {/* {validateOne?.first_name && disabled && (
                        <ErrorText message={formik.errors.first_name} />
                    )} */}

            {formik.touched.first_name && (
              <ErrorText message={formik.errors.first_name} />
            )}
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
            {formik.touched.last_name && (
              <ErrorText message={formik.errors.last_name} />
            )}
          </div>
        </div>
        <div className="inputs mb-3">
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
            {formik.touched.phone_number && (
              <ErrorText message={formik.errors.phone_number} />
            )}
          </div>
          <div className="input dir">
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
            {formik.touched.dob && <ErrorText message={formik.errors.dob} />}
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
                      
                        {formik.touched.medicare_number && (
                            <ErrorText message={formik.errors.medicare_number} />
                        )}
                    </div> */}
        </div>

        <div className="radios btn-group form-check p-0 pb-3" role="group">
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
              label="Other"
              radioBorder="1px solid var(--color-gray)"
              labelColor="#1f2937"
              value="others"
              onChange={(e) => {
                formik.setFieldValue("gender", e.target.value);
              }}
              checked={formik.values.gender === "others" ? true : false}
            />
          </div>
        </div>

        <div className="input4">
          <div className="label_name">Address</div>
          <div
            className=""
            style={{
              width: "100%",
            }}
          >
            {/* <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY as string}
                            selectProps={{
                                isClearable: true,
                                placeholder: formik.values.address,
                                defaultInputValue: formik.values.address,

                onChange: (val) => {
                  formik.setFieldValue("address", val?.label);
                },

                styles: {
                  control: (provided, state) => ({
                    ...provided,
                    textAlign: "left",

                    width: "100%",
                    outline: "none",
                    borderColor: "#E5E7EB",
                    boxShadow: "none",

                    "&:hover": {
                      borderColor: "",
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? "var(--color-gray)" : "#1f2937",
                    textAlign: "left",
                    backgroundColor: state.isSelected
                      ? `${PRIMARY_COLOR}`
                      : "#fff",
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
                                        color: "#1f2937",
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
                        /> */}
            <input
              ref={ref}
              defaultValue={formik.values.address}
              type="text"
              className="input4 input_wrapper w-full"
              placeholder="Enter Address Information"
              style={{
                width: "100%",
                cursor: "text",
                outline: "none",
              }}
              onChange={(e) => {
                formik.setFieldValue("address", e.target.value);
              }}
            />
          </div>
        </div>
        <Button
          id="get-started-btn"
          button={"Save Changes"}
          type="submit"
          style={{
            marginTop: "2.5rem",
            backgroundColor: !isValidated
              ? "var(--bs-primary-500)"
              : "var(--bs-primary-400)",
            border: !isValidated
              ? "1px solid var(--bs-primary-500)"
              : "1px solid var(--bs-primary-400)",
            // backgroundColor: "var(--bs-primary-500)",
            // border: "1px solid var(--bs-primary-500)",
          }}
        />
      </form>
    </>
  );
}
