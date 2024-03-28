/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import Button from "@components/widgets/Button";
import { scrollToTop } from "@utils/helper";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";

import { useColors } from "@utils/tenant_configuration";



type Props = {
  q: string;
  formik: any;
  accept: boolean;
  handleLinkChange: () => void;
  disabled?: boolean;
  setOnLoading?: (value: boolean) => void;
  validateOne?: any;
};

export default function ButtonSwitcher({
  q,
  formik,
  accept,
  handleLinkChange,
  setOnLoading,
  validateOne,
}: Props) {
  const { primaryColor, primaryLightColor } = useColors();

  const checked = accept;

  function checkValue() {
    if (formik.values.first_name === "" || formik.values.last_name === "") {
      return false;
    }

    if (
      formik.values.phone_number.length < 10 ||
      formik.values.phone_number.length > 20 ||
      formik.values.phone_number === "" ||
      !formik.values.phone_number.match(/^[0-9+() -]+$/)
    ) {
      return false;
    }

    if (
      formik?.values.medicare_number !== "" &&
      formik?.values.medicare_number !== undefined &&
      (formik.values.medicare_number.length < 10 ||
        formik.values.medicare_number.length > 10)
    ) {
      return false;
    }
    if (
      formik?.values.health_identifier !== undefined &&
      formik?.values?.health_identifier !== "" &&
      formik?.values?.health_identifier?.length < 16
    ) {
      return false;
    }

    // check if dob is not empty and is less than 18 years
    if (formik.values.dob !== "") {
      const today = new Date();
      const birthDate = new Date(formik.values.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        return false;
      }
    }

    return true;
  }

  function checkCredentails() {
    if (
      formik.values.email === "" ||
      formik.values.password === "" ||
      formik.values.confirm_password === ""
    ) {
      return false;
    }
    if (formik.errors.email || formik.errors.password) {
      return false;
    }

    if (formik.values.password !== formik.values.confirm_password) {
      return false;
    }

    return true;
  }

  const checkingCredentials = checkCredentails();
  const checking = checkValue();

  const btnContent = (name: string) => (
    <>
      {q === "Credentials" && (
        <>
          <Button
            id="get-started-btn"
            button="Submit"
            type="submit"
            onClick={() => {
              setOnLoading(true);
              scrollToTop();
            }}
            disabled={!checked}
            style={{
              backgroundColor: checkingCredentials
                ? `${primaryColor}`
                : `${primaryLightColor}`,
              border: checkingCredentials
                ? `"1px solid ${primaryColor}`
                : `1px solid ${primaryLightColor}`,
            }}
          />
        </>
      )}
      {q === "Consent" && (
        <>
          <Button
            id="get-started-btn"
            onClick={() => {
              handleLinkChange();
            }}
            button={name}
            type="button"
            style={{
              backgroundColor: checked
                ? `${primaryColor}`
                : `${primaryLightColor}`,
              border: checked
                ? `"1px solid ${primaryColor}`
                : `1px solid ${primaryLightColor}`,
            }}
          />
        </>
      )}
      {q === "PersonalInformation" && (
        <>
          <Button
            id="get-started-btn"
            onClick={() => {
              handleLinkChange();
            }}
            button="Submit"
            type="submit"
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
    </>
  );

  const buttonMap = {
    Consent: btnContent("Continue"),
    PersonalInformation: btnContent("Next"),
    Credentials: btnContent("Submit"),
  };
  return buttonMap[q] || btnContent("Next");
}
