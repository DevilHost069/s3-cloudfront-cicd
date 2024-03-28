import { Flag } from "@assets/index";
import RadioBtn from "@components/widgets/Radio";
import TextInput from "@components/widgets/TextInput";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";

import { useColors } from "@utils/tenant_configuration";



export default function NonQualifiedForm() {
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <>
        <div className="personal-information">Personal Information</div>
        <div className="inputs">
          <div className="input">
            <div className="label_name">
              First name <strong className="asteriek">*</strong>
            </div>
            <div
            // className={
            //   formik.touched.first_name && formik.errors.first_name
            //     ? " input_wrapper-outline-error"
            //     : "input_wrapper"
            // }
            >
              <TextInput
                className="input_wrapper-outline"
                placeholder="Enter your First Name"
                //   formik={formik.getFieldProps("first_name")}
                //   value={formik.values.first_name}
                //   onChange={(e) => {
                //     formik.setFieldValue("first_name", e.target.value);
                //   }}
              />
            </div>
            {/* {validateOne?.first_name && disabled && (
            <ErrorText message={formik.errors.first_name} />
          )}

          {formik.touched.first_name && !disabled && (
            <ErrorText message={formik.errors.first_name} />
          )} */}
          </div>
          <div className="input">
            <div className="label_name">
              Last name <strong className="asteriek">*</strong>
            </div>
            <div
            // className={
            //   (validateOne?.last_name && disabled) ||
            //     (formik.touched.last_name && formik.errors.last_name)
            //     ? " input_wrapper-outline-error"
            //     : "input_wrapper"
            // }
            >
              <TextInput
                className="input_wrapper-outline"
                placeholder="Enter your Last Name"
                //   formik={formik.getFieldProps("last_name")}
                //   value={formik.values.last_name}
                //   onChange={(e) => {
                //     formik.setFieldValue("last_name", e.target.value);
                //   }}
              />
            </div>
            {/* {validateOne?.last_name && disabled && (
            <ErrorText message={formik.errors.last_name} />
          )}
          {formik.touched.last_name && !disabled && (
            <ErrorText message={formik.errors.last_name} />
          )} */}
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <div className="label_name">
              Phone number <strong className="asteriek">*</strong>
            </div>
            <div
            // className={
            //   (validateOne?.phone_number && disabled) ||
            //     (formik.touched.phone_number && formik.errors.phone_number)
            //     ? "123 input_wrapper-outline-error"
            //     : "input_wrapper"
            // }
            >
              <img src={Flag} alt="" className="icon_svg" />
              <TextInput
                placeholder="Enter your Phone Number"
                type="tel"
                className="input_wrapper-outline"
                //   formik={formik.getFieldProps("phone_number")}
                //   value={formik.values.phone_number}
                //   onChange={(e) => {
                //     const inputValuewithoutAlphabet = e.target.value.replace(
                //       /[a-zA-Z]/g,
                //       "",
                //     );
                //     formik.setFieldValue("phone_number", inputValuewithoutAlphabet);
                //   }}
              />
            </div>
            {/* {validateOne?.phone_number && disabled && (
            <ErrorText message={formik.errors.phone_number} />
          )}
          {formik.touched.phone_number && !disabled && (
            <ErrorText message={formik.errors.phone_number} />
          )} */}
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
                //   {...formik.getFieldProps("dob")}
                onChange={(e) => {
                  // check if date is in future then set it to default
                  const date = new Date(e.target.value);
                  const currentDate = new Date();
                  if (date > currentDate) {
                    return;
                  }

                  // formik.setFieldValue("dob", e.target.value);
                }}
              />
            </div>
            {/* {
            formik.touched.dob && formik.errors.dob && (
              <ErrorText message={formik.errors.dob} />
            )
          } */}
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
              // onChange={(e) => {
              //   formik.setFieldValue("gender", e.target.value);
              // }}
              // checked={formik.values.gender === "male" ? true : false}
            />
            <RadioBtn
              label="Female"
              value="female"
              radioBorder="1px solid var(--color-gray)"
              labelColor="#1f2937"
              // onChange={(e) => {
              //   formik.setFieldValue("gender", e.target.value);
              // }}
              // checked={formik.values.gender === "female" ? true : false}
            />
            <RadioBtn
              label="Others"
              radioBorder="1px solid var(--color-gray)"
              labelColor="#1f2937"
              value="others"
              // onChange={(e) => {
              //   formik.setFieldValue("gender", e.target.value);
              // }}
              // checked={formik.values.gender === "others" ? true : false}
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
                //   defaultInputValue: formik.values.address,

                //   onChange: (val) => {
                //     formik.setFieldValue("address", val?.label);
                //   },

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
                    backgroundColor: state.isSelected
                      ? `${primaryColor}`
                      : "#fff",
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
                    // font-size: 16px;
                    // font-style: normal;
                    // font-weight: 400;
                    // font-family: Nunito Sans;
                    // line-height: 150%; /* 24px */
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
        </div>
      </>
    </>
  );
}
