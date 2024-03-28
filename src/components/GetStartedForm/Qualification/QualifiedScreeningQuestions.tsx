import RadioBtn from "@components/widgets/Radio";
import { useProfile } from "@contexts/ProfileContext";
import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import ArrayField from "./ArrayField";
import Button from "@components/widgets/Button";

import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import * as Yup from "yup";
import useScreenQuestion from "../../../store/onboardingScreening";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "../TermsAndConditions";
import { useColors } from "@utils/tenant_configuration";


export default function QualifiedScreeningQuestions() {
  const { primaryColor, primaryLightColor } = useColors();

  const [qualification, setQualification] = React.useState(false);
  const ctx = useProfile();
  const screen = useScreenQuestion();
  const navigate = useNavigate();

  const inititalValues = {
    response_type: "patient_onboarding_response",
    patient_id: ctx?.profile?.profile_id || "",
    nurse: "",
    response_json: [
      {
        slug: "age",
        options: [],
        question: "Are you over 18 ?",
        placeholder: "",
        required: false,
        answer: "",
        data_type: "string",
        input_type: "radio",
      },
      {
        slug: "medical-conditions",
        options: [],
        question: "Have you been diagnosed with a medical condition ?",
        placeholder: "",
        required: false,
        answer: "",
        data_type: "string",
        input_type: "radio",
      },
      {
        slug: "medical-condition-duration",
        options: [],
        question: "Have you had this condition for more than three months? ?",
        placeholder: "",
        required: false,
        answer: "",
        data_type: "string",
        input_type: "radio",
      },
      {
        slug: "medical_condition",
        options: [],
        question: "Have you tried standard medication without benefit ?",
        placeholder: "",
        required: false,
        answer: "",
        data_type: "string",
        input_type: "radio",
      },
      {
        slug: "medical_condition",
        options: [],
        question: "Do you have a history of psychosis ?",
        placeholder: "",
        required: false,
        answer: "",
        data_type: "string",
        input_type: "radio",
      },
      {
        slug: "medical_condition",
        options: [],
        question: "Are you pregnant ?",
        placeholder: "",
        required: false,
        answer: "",
        data_type: "string",
        input_type: "radio",
      },
    ],
  } as any;

  const intitalOnbaordingSchemaValidation = Yup.object().shape({
    response_json: Yup.array().of(
      Yup.object().shape({
        answer: Yup.string().required("Options is required"),
      }),
    ),
  });

  const onclicked = () => { };

  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleTermsAndConditionsChange = (isChecked: boolean) => {
    // Handle the state of the "I agree" checkbox
    setTermsAccepted(isChecked);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={inititalValues}
        validationSchema={intitalOnbaordingSchemaValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            screen.setScreeningState(values);
            navigate("/register");
          }, 200);
        }}
      >
        {({ values, handleSubmit, setFieldValue, isValid, isSubmitting }) => (
          <>
            <Form className="form" onSubmit={handleSubmit}>
              <div className="let-us-know">Let us get to know you better</div>
              <ArrayField
                initialValues={values}
                setFieldValue={setFieldValue}
                isValid={isValid}
                isSubmitting={isSubmitting}
                screen={screen}
              />
              <TermsAndConditions onCheckboxChange={handleTermsAndConditionsChange} />
              {/* <TermsAndConditions /> */}
              <div
                className="d-flex w-full d-flex-btn"
                style={{
                  gap: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  id="get-started-btn"
                  button="Continue"
                  type="submit"
                  disabled={!isValid || isSubmitting || !termsAccepted}
                  onClick={onclicked}
                  style={{
                    backgroundColor:
                      isValid && !isSubmitting && termsAccepted
                        ? `${primaryColor}`
                        : `${primaryLightColor}`,
                    border: `1px solid ${primaryLightColor}`,
                  }}
                />
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
