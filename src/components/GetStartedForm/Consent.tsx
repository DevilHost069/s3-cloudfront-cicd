import "@assets/css/GetStarted/consentContent.css";
import { IConsentData } from "@server/auth/Consent";
import { FunctionComponent } from "react";

import parse from "html-react-parser";
import { useScrollToTopOnQueryParamChange } from "@hooks/useScrollToTopOnQueryParamChange";

type IConsent = {
  accept: boolean;
  setAccept: (value: boolean) => void;
  formik: any;
  validateTwo: object;
  data: IConsentData;
  isLoading?: boolean;
};

const Consent: FunctionComponent<IConsent> = (consent: IConsent) => {
  useScrollToTopOnQueryParamChange();
  const htmlString = consent?.data?.consent_form;
  const parseStringToHtml = parse(htmlString);
  const checked = consent?.accept;

  return (
    <>
      <div
        className="consent-text-container"
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
      <div className="checkbox d-flex">
        <input
          type="checkbox"
          id="checker"
          className="checkbox1"
          onChange={(e) => {
            consent.setAccept(e.target.checked);
            // formik initialValues
            consent.formik.setFieldValue("accept", e.target.checked);
          }}
          checked={checked}
        />
        <div
          className="label"
          onClick={() => {
            consent.setAccept(!checked);
            // formik initialValues
            consent.formik.setFieldValue("accept", !checked);
          }}
        >
          {`I accept the `}
          <span className="terms">Terms and Conditions</span>
        </div>
      </div>
    </>
  );
};

export default Consent;
