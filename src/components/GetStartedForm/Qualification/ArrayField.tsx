import Button from "@components/widgets/Button";
import RadioBtn from "@components/widgets/Radio";
import { Field, FieldArray, getIn } from "formik";
import React, { useEffect } from "react";

type IArrayFieldsProps = {
  initialValues: any;
  setFieldValue: any;
  isValid: boolean;
  isSubmitting: boolean;
  screen: any;
};

export default function ArrayField({
  initialValues,
  setFieldValue,
  isValid,
  isSubmitting,
  screen,
}: IArrayFieldsProps) {
  const initVal = initialValues.response_json.map(
    (question: any, index: number) => ({
      ...question,
    })
  );

  useEffect(() => {
    function checkIfAllQuestionsAnswered(values: any) {
      const seq = ["yes", "yes", "yes", "yes", "no", "no"];
      const allQuestionsAnswered = values.response_json.every(
        (question: any) =>
          question.answer === seq[values.response_json.indexOf(question)]
      );
      return allQuestionsAnswered;
    }

    const allQuestionsAnswered = checkIfAllQuestionsAnswered(initialValues);
    if (allQuestionsAnswered) {
      screen.setIsQualified(true);
    } else {
      screen.setIsQualified(false);
    }
  }, [initialValues]);

  return (
    <>
      <FieldArray name="response_json">
        {(arrayHelpers) => (
          <div
            style={{
              width: "100%",
            }}
          >
            {initialValues.response_json.map((question, index) => (
              <div
                className="input"
                key={index}
                style={{
                  width: "100%",
                  marginBottom: "2rem",
                }}
              >
                <div className="reasoning-for-seeking">
                  {question.question} <strong className="asteriek">*</strong>
                </div>
                <div
                  className="d-flex"
                  role="group"
                  aria-labelledby="my-radio-group"
                >
                  <label
                    className="d-flex me-2"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Field
                      type="radio"
                      value="yes"
                      name={`response_json.${index}.answer`}
                      placeholder={question.placeholder}
                      className="input_wrapper radio-wrapper"
                    />
                    &nbsp;
                    <div className="">Yes </div>
                  </label>
                  &nbsp;&nbsp;&nbsp;
                  <label
                    className="d-flex"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Field
                      type="radio"
                      name={`response_json.${index}.answer`}
                      placeholder={question.placeholder}
                      className="input_wrapper radio-wrapper"
                      value="no"
                    />
                    &nbsp;
                    <div className="">No </div>
                  </label>
                </div>
                <ErrorMessage name={`response_json.${index}.answer`} />
              </div>
            ))}
          </div>
        )}
      </FieldArray>
    </>
  );
}

export const ErrorMessage = ({ name }) => (
  <div
    style={{
      color: "red",
    }}
  >
    <Field
      render={({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? error : null;
      }}
    />
  </div>
);
