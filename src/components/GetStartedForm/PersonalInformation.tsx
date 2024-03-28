import RadioBtn from "../widgets/Radio";
import TextInput from "../widgets/TextInput";
import { Flag } from "../../assets";
import ErrorText from "@components/widgets/Error";
import { IvalidateOne } from "@pages/Auth/Register";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useScrollToTopOnQueryParamChange } from "@hooks/useScrollToTopOnQueryParamChange";
import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import Credentials from "./Credentials";

import { useColors } from "@utils/tenant_configuration";

type Props = {
  formik: any;
  validateOne: IvalidateOne | any;
  disabled?: boolean;
};

// input_wrapper-outline-error
export default function PersonalInformation({
  formik,
  validateOne,
  disabled,
}: Props) {
  const { primaryColor, primaryLightColor } = useColors();

  useScrollToTopOnQueryParamChange();

  // const { ref } = usePlacesWidget({
  //   apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
  //   onPlaceSelected: (place: any) => {
  //     formik.setFieldValue("address", place.formatted_address);
  //   },
  //   options: {
  //     types: ["geocode"],
  //     componentRestrictions: { country: "AU" },
  //   },
  // });

  const onClickAddAddressManually = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (formik.values.auto_location === false) {
      formik.setFieldValue("auto_location", true);
    } else {
      formik.setFieldValue("auto_location", false);
    }
  };

  return (
    <>
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
          {validateOne?.first_name && disabled && (
            <ErrorText message={formik.errors.first_name} />
          )}

          {formik.touched.first_name && !disabled && (
            <ErrorText message={formik.errors.first_name} />
          )}
        </div>
        <div className="input">
          <div className="label_name">
            Last name <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              (validateOne?.last_name && disabled) ||
              (formik.touched.last_name && formik.errors.last_name)
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
          {validateOne?.last_name && disabled && (
            <ErrorText message={formik.errors.last_name} />
          )}
          {formik.touched.last_name && !disabled && (
            <ErrorText message={formik.errors.last_name} />
          )}
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <div className="label_name">
            Phone number <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              (validateOne?.phone_number && disabled) ||
              (formik.touched.phone_number && formik.errors.phone_number)
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
                formik.setFieldValue("phone_number", inputValuewithoutAlphabet);
              }}
            />
          </div>
          {validateOne?.phone_number && disabled && (
            <ErrorText message={formik.errors.phone_number} />
          )}
          {formik.touched.phone_number && !disabled && (
            <ErrorText message={formik.errors.phone_number} />
          )}
        </div>
        <div className="input">
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
          {formik.touched.dob && formik.errors.dob && (
            <ErrorText message={formik.errors.dob} />
          )}
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

      <div className="radios btn-group form-check" role="group">
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

      {/* <div className="input4">
        <div className="label_name">
          <label className="form-check-label" htmlFor="switchCheckLabelTop">
            Address &nbsp;
          </label>
        </div>
        <div
          className=""
          style={{
            width: "100%",
          }}
        >
          <input
            ref={ref}
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
      </div> */}
      <Credentials formik={formik} />
    </>
  );
}
