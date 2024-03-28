import { IConsentData, useGetConsent } from "@server/auth/Consent";
import { useScrollToTopOnQueryParamChange } from "@hooks/useScrollToTopOnQueryParamChange";
import BasicModal from "@components/Modal";
import { useState } from "react";


type IConsentsProps = {
  data: IConsentData;
  isLoading: boolean;
};

const TermsAndConditions = ({ onCheckboxChange }) => {
  const { data, isLoading } = useGetConsent() as IConsentsProps;
  const [isChecked, setIsChecked] = useState(false);



  useScrollToTopOnQueryParamChange();
  const htmlString = data?.consent_form;

  return (
    <>
      <div className="checkbox d-flex">
        <input
          type="checkbox"
          id="checker"
          className="checkbox1"
          onChange={(e) => {
            setIsChecked(e.target.checked);
            onCheckboxChange(e.target.checked);
          }}
        />
        <div
          className="label"
          onClick={() => {
          }}
        >
          {`I accept the `}
          <span className="terms"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            style={{
              width: "45%",
              lineHeight: "1",
            }}
          >Terms and Conditions</span>
        </div>
        <BasicModal
          title=""
          modalSize="modal-lg"
        >
          <div className="consent-text-container" dangerouslySetInnerHTML={{ __html: htmlString }}></div>
        </BasicModal>
      </div>
    </>
  );
};

export default TermsAndConditions;
