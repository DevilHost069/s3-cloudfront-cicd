import { Flag } from "@assets/index";
import { Toaster } from "@components/shared/Toaster";
import Button from "@components/widgets/Button";
import ErrorText from "@components/widgets/Error";
import TextInput from "@components/widgets/TextInput";
import { usePatchProfile } from "@server/prescriber/usePatchPrescriberProfile";
import { IPrescriberProfile } from "@shared/types/common";


import { useFormik } from "formik";
import { usePlacesWidget } from "react-google-autocomplete";
import * as Yup from "yup";

import { useColors } from "@utils/tenant_configuration";


type Props = {
  data?: IPrescriberProfile | any;
};

export default function commonForm({ data }: Props) {
  const { primaryColor, primaryLightColor } = useColors();

  const updProfile = usePatchProfile();

  const initialValues = {
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    phone_number: data.phone_number || "",
    email: data.email || "",
    // address: data.address || "",
    // raw_address: data.raw_address || "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone_number: Yup.string()
      .matches(/^[\d\s()+-]+$/, "The number you have entered is not valid")
      .required("Phone Number is required")
      .min(10, "The number you have entered is not valid")
      .max(20, "The number you have entered is not valid"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string().nullable(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      updProfile.mutate(values, {
        onSuccess: () => {
          Toaster({
            status: "success",
            message: "Personal Information Updated Successfully.",
          });
        },
        onError: () => { },
      });
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
    if (
      !formik.values.email ||
      !formik.values.email.includes("@") ||
      !formik.values.email.includes(".")
    ) {
      return true;
    }
    return false;
  };
  const isValidated = validateValues();

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


            {formik.touched.first_name && (
              <ErrorText message={formik.errors.first_name as string} />
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
              <ErrorText message={formik.errors.last_name as string} />
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
              <ErrorText message={formik.errors.phone_number as string} />
            )}
          </div>
        </div>
        <div className="inputs mb-3">
          <div className="input">
            <div className="label_name">
              Email <strong className="asteriek">*</strong>
            </div>
            <div
              className={
                formik.touched.email && formik.errors.email
                  ? "123 input_wrapper-outline-error"
                  : "input_wrapper"
              }
            >
              <TextInput
                placeholder="Enter your Email"
                type="tel"
                className="input_wrapper-outline"
                formik={formik.getFieldProps("email")}
                value={formik.values.email}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
              />
            </div>

            {formik.touched.email && (
              <ErrorText message={formik.errors.phone_number as string} />
            )}
          </div>
        </div>
        <Button

          id="get-started-btn"
          button={"Save Changes"}
          type="submit"
          style={{
            marginTop: "2.5rem",
            backgroundColor: `${primaryColor}`,
            border: !isValidated
              ? `"1px solid ${primaryColor}`
              : `1px solid ${primaryLightColor}`,
          }}
        />
      </form >
    </>
  );
}
