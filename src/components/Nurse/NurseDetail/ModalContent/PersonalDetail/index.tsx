import { usePlacesWidget } from "react-google-autocomplete";
import Button from "@components/widgets/Button";
import RadioBtn from "@components/widgets/Radio";
import TextInput from "@components/widgets/TextInput";

import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IPatientDetailsBYOid } from "../../main";
import ErrorText from "@components/widgets/Error";
import moment from "moment";
import { useColors } from "@utils/tenant_configuration";

type IProps = {
  patientDetail: IPatientDetailsBYOid;
  updatePatient: any;
};

const validatePersonalDetailSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^[\d\s()+-]+$/, "The number you have entered is not valid")
    .required("Phone Number is required")
    .min(10, "The number you have entered is not valid")
    .max(20, "The number you have entered is not valid"),
  medicare_number: Yup.string()
    .required("Medicare Number is required")
    .min(10, "The number you have entered is not valid"),

  dob: Yup.date()
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
    .typeError("Date of Birth is required")
    .required("Date of Birth is required"),
  address: Yup.string().required("Address is required"),
  gender: Yup.string().required("Gender is required"),
  health_identifier: Yup.string()
    .required("IHI Number is required")
    .test(
      "is-valid-ihi-number",
      "IHI Number must be 16 digits",
      function (value) {
        const countLength = value.replace(/\s/g, "").length;
        if (countLength === 16) {
          return true;
        }
        return false;
      }
    ),
  // match date if date is less than current year then return error
  medicare_expiry_date: Yup.string()
    .required("Medicare Expiry Date is required")
    .test(
      "is-less-than-current-date",
      "Expiry date must be greater than current date",
      function (value) {
        const { medicare_expiry_date } = this.parent;
        const date = moment(medicare_expiry_date, "MM/YYYY");
        const currentDate = moment();
        if (date.isValid()) {
          if (date.isBefore(currentDate)) {
            return false;
          }
        }
        return true;
      }
    )
    .matches(/^\d{2}\/\d{4}$/, "Not a valid date format ie. 09/2021"),
  medicare_reference_number: Yup.string()
    .required("Medicare Reference Number is required")
    .min(1, "Medicare Reference Number must be 1 digit")
    .max(1, "Medicare Reference Number must be 1 digit"),
});

export default function PersonalDetailContent({
  patientDetail,
  updatePatient,
}: IProps) {
  const { data } = patientDetail as any;
  /* The code is defining an initial value object with properties for phone_number,
  medicare_number, dob, address, and gender. It is using optional chaining (?.) to access these
  properties from a data object. If the data object has a phone_number property, it will be assigned
  to the phone_number property of the initialValue object. If the data object does not have a
  phone_number property, the phone_number property of the initialValue object will be undefined.
  Similarly, if the data object has a medicare_number property, it will be assigned to the
  medicare_number property of the initialValue object. If */
  const initialValue = {
    phone_number: data?.phone_number,
    medicare_number: data?.medicare_number || "",
    dob: data?.dob || "",
    address: data?.address || "",
    raw_address: data?.raw_address || [],
    gender: data?.gender || "",
    health_identifier: data?.health_identifier || "",
    medicare_expiry_date: data?.medicare_expiry_date || "",
    medicare_reference_number: data?.medicare_reference_number || "",
    auto_location: data?.auto_location || null,
    previous_gp: data?.previous_gp || "",
  };

  /* The code is using Formik, a form library for React, to handle form submission and
  validation. */
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validatePersonalDetailSchema,
    initialValues: initialValue,
    onSubmit: (values, reset) => {
      if (values.previous_gp === "") {
        delete values.previous_gp;
      }
      const medicare = values.medicare_number.replace(/\s/g, "");
      const data = {
        ...values,
        health_identifier: removeSpace(values.health_identifier),
        medicare_number: medicare,
      };
      updatePatient.mutate(data);
      reset.resetForm();
    },
  });

  // console.log("val", formik.values);

  function removeSpace(str: string) {
    return str.replace(/\s/g, "");
  }

  /**
   * The function `validateValues` checks if certain form values are missing or have invalid lengths.
   * @returns The function `validateValues` returns a boolean value. It returns `true` if any of the
   * conditions for validating the form values are met, and `false` otherwise.
   */
  function IHIDisplayFormat(str: string): string {
    return str
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function medicareNumberFormatForValue(str: string): string {
    //  remove last digit of medicare number

    return str
      .replace(/[^\dA-Z]/g, "")
      .replace(/(\d{4})(\d{5})(\d{1})/, "$1 $2 $3")
      .trim();
  }

  const checker = () => {
    const values = formik.values;
    // exclude previous_gp if it is empty
    for (const key in values) {
      if (key !== "previous_gp") {
        if (values[key] === "") {
          return true;
        }
        return false;
      }
    }
  };

  /**
   * The function `validateMedicareNumber` checks if the Medicare number is empty or if it has a length
   * other than 10, and returns an error message accordingly.
   * @returns an empty string if the Medicare number is valid. Otherwise, it returns an error message
   * indicating that the Medicare number is required or that the number entered is not valid.
   */
  const validateMedicareNumber = () => {
    if (formik.values.medicare_number === "") {
      return "Medicare Number is required";
    } else if (
      formik.values.medicare_number.length < 10 ||
      formik.values.medicare_number.length > 10
    ) {
      return "The number you have entered is not valid";
    }
    return "";
  };

  /* The line code is declaring two variables, `validateMedicare` and `validate`, and assigning them
  the values returned by two function calls, `validateMedicareNumber()` and `validateValues()`
  respectively. */
  const validateMedicare = validateMedicareNumber();
  const validate = checker();
  const { primaryColor, primaryLightColor } = useColors();

  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
    onPlaceSelected: (place: any) => {
      formik.setFieldValue("address", place.formatted_address);
      formik.setFieldValue("raw_address", place.address_components);
    },
    options: {
      types: ["geocode"],
      componentRestrictions: { country: "au" },
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div
          className="input"
          style={{
            marginBottom: "32px",
          }}
        >
          <div className="label_name">
            Phone Number <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik.touched.phone_number && formik.errors.phone_number
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline"
              placeholder="Enter your Phone Number"
              formik={formik.getFieldProps("phone_number")}
              value={formik.values.phone_number}
              onChange={(e) => {
                const inputValuewithoutAlphabet = e.target.value.replace(
                  /[a-zA-Z]/g,
                  ""
                );
                formik.setFieldValue("phone_number", inputValuewithoutAlphabet);
              }}
            />
          </div>

          {formik.touched.phone_number && formik.errors.phone_number ? (
            <ErrorText message={formik.errors.phone_number as string} />
          ) : null}
        </div>
        <div
          className="input"
          style={{
            marginBottom: "32px",
          }}
        >
          <div className="label_name">
            IHI Number <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik.touched.health_identifier &&
              formik.errors.health_identifier
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline"
              placeholder="Enter your IHI Number"
              formik={formik.getFieldProps("health_identifier")}
              value={IHIDisplayFormat(formik.values.health_identifier)}
              onChange={(e) => {
                // must be in format of 1111 1111 1111 1111
                const cardValuewioutAlphabetAndSpace = e.target.value
                  .replace(/[^\dA-Z]/g, "")
                  .replace(/(.{4})/g, "$1 ")
                  .trim();

                if (cardValuewioutAlphabetAndSpace.length > 19) {
                  return;
                }
                formik.setFieldValue(
                  "health_identifier",
                  cardValuewioutAlphabetAndSpace
                );
              }}
            />
          </div>

          {formik.touched.health_identifier &&
            formik.errors.health_identifier && (
              <ErrorText message={formik.errors.health_identifier as string} />
            )}
        </div>
        <div
          className="input"
          style={{
            marginBottom: "32px",
          }}
        >
          <div className="label_name">
            Medicare Number <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik?.touched?.medicare_number &&
              formik?.errors?.medicare_number
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline"
              placeholder="Enter your Medicare Number"
              formik={formik.getFieldProps("medicare_number")}
              value={medicareNumberFormatForValue(
                formik.values.medicare_number
              )}
              onChange={(e) => {
                // replace regex in format of 4 5 1
                const rRegx = /[^\dA-Z]/g;
                const cardValuewioutAlphabetAndSpace = e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{4})(\d{5})(\d{1})/, "$1 $2 $3")
                  .trim();

                if (cardValuewioutAlphabetAndSpace.length > 12) {
                  return;
                }
                formik.setFieldValue(
                  "medicare_number",
                  String(cardValuewioutAlphabetAndSpace)
                );
              }}
            />
          </div>

          {formik?.touched?.medicare_number &&
            formik?.errors?.medicare_number && (
              <ErrorText message={formik?.errors?.medicare_number as string} />
            )}
          {/* {formik.touched.medicare_number && formik.errors.medicare_number && (
            <ErrorText message={formik.errors.medicare_number as string} />
          )} */}
        </div>
        <div
          className="input"
          style={{
            marginBottom: "32px",
          }}
        >
          <div className="label_name">
            Medicare reference Number <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik?.touched?.medicare_reference_number &&
              formik?.errors?.medicare_reference_number
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline"
              placeholder="Enter your Medicare Number"
              formik={formik.getFieldProps("medicare_reference_number")}
              value={formik.values.medicare_reference_number}
              onChange={(e) => {
                const cardValuewioutAlphabetAndSpace = e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{1})/, "$1")
                  .trim();
                formik.setFieldValue(
                  "medicare_reference_number",
                  String(cardValuewioutAlphabetAndSpace)
                );
              }}
            />
          </div>

          {formik?.touched?.medicare_reference_number &&
            formik?.errors?.medicare_reference_number && (
              <ErrorText
                message={formik?.errors?.medicare_reference_number as string}
              />
            )}
        </div>
        <div
          className="input"
          style={{
            marginBottom: "32px",
          }}
        >
          <div className="label_name">
            Expiry date <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik?.touched?.medicare_expiry_date &&
              formik?.errors?.medicare_expiry_date
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              type="text"
              className="input_wrapper-outline"
              placeholder="02/2025"
              formik={formik.getFieldProps("medicare_expiry_date")}
              value={formik?.values?.medicare_expiry_date}
              onChange={(e) => {
                var code = e.keyCode;
                var allowedKeys = [8];
                if (allowedKeys.indexOf(code) !== -1) {
                  return;
                }

                e.target.value = e.target.value
                  .replace(
                    /^([1-9]\/|[2-9])$/g,
                    "0$1/" // 3 > 03/
                  )
                  .replace(
                    /^(0[1-9]|1[0-2])$/g,
                    "$1/" // 11 > 11/
                  )
                  .replace(
                    /^([0-1])([3-9])$/g,
                    "0$1/$2" // 13 > 01/3
                  )
                  .replace(
                    /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
                    "$1/$2" // 141 > 01/41
                  )
                  .replace(
                    /^([0]+)\/|[0]+$/g,
                    "0" // 0/ > 0 and 00 > 0
                  )
                  .replace(
                    /[^\d\/]|^[\/]*$/g,
                    "" // To allow only digits and `/`
                  )
                  .replace(
                    /\/\//g,
                    "/" // Prevent entering more than 1 `/`
                  );

                if (e.target.value.length > 7) {
                  return;
                }
                // if e.target.value. in first two digits is greater than 12 then return
                const month = e.target.value.split("/")[0];
                if (Number(month) > 12) {
                  return;
                }

                formik.setFieldValue("medicare_expiry_date", e.target.value);
              }}
            />
          </div>

          {formik?.touched?.medicare_expiry_date &&
            formik?.errors?.medicare_expiry_date && (
              <ErrorText
                message={formik?.errors?.medicare_expiry_date as string}
              />
            )}
        </div>

        <div
          className="input"
          style={{
            marginBottom: "32px",
          }}
        >
          <div className="label_name">
            Previous GP <strong className="asteriek"></strong>
          </div>
          <div
            className={
              formik.touched.previous_gp && formik.errors.previous_gp
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline"
              placeholder="Enter your Previous GP"
              formik={formik.getFieldProps("previous_gp")}
              value={formik.values.previous_gp}
            />
          </div>
        </div>

        <div
          className="input"
          style={{
            marginBottom: "32px",
          }}
        >
          <div className="label_name">
            Date of Birth<strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik.touched.dob && formik.errors.dob
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
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

          {formik.touched.dob && formik.errors.dob && (
            <ErrorText message={formik.errors.dob as string} />
          )}
        </div>

        <div
          className="radios btn-group form-check"
          role="group"
          style={{
            width: "100%",
            padding: "0",
            marginBottom: "32px",
          }}
        >
          <div className="gender">
            Gender <strong className="asteriek">*</strong>
          </div>
          <div className="column grid-3-items">
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
          {formik.touched.gender && formik.errors.gender ? (
            <ErrorText message={formik.errors.gender as string} />
          ) : null}
        </div>

        <div
          className="input"
          style={{
            marginBottom: "32px",
            borderColor: "red",
          }}
        >
          <div className="form-check form-switch p-0">
            <div className="d-flex gap-1">
              <label className="form-check-label" htmlFor="switchCheckLabelTop">
                Address
                <strong className="asteriek"> * &nbsp;</strong>
              </label>
            </div>
          </div>
          <div
            className=""
            style={{
              width: "100%",
              border:
                formik.touched.address && formik.errors.address
                  ? "1px solid red"
                  : "",
            }}
          >
            <input
              ref={ref}
              type="text"
              defaultValue={formik.values.address}
              className="input4 input_wrapper w-full"
              placeholder="Enter Address Information"
              style={{
                width: "100%",
                cursor: "text",
                outline: "none",
              }}
              onChange={(e) => {
                formik.setFieldValue("address", e.target.value);
                console.log("address", e.target);
              }}
            />
          </div>
          {formik.touched.address && formik.errors.address && (
            <ErrorText message={formik.errors.address as string} />
          )}
        </div>

        <Button
          id=""
          button="Save Changes"
          dataBsDismiss={!validate ? "modal" : ""}
          type="submit"
          className=""
          disabled={!formik.isValid}
          style={{
            height: "48px",
            width: "100%",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            backgroundColor: !formik.isValid
              ? `${primaryLightColor}`
              : `${primaryColor}`,
          }}
        />
      </form>
    </>
  );
}
