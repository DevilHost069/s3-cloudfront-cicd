import * as bootstrap from "bootstrap";

import { IQuestionnaireProps } from "@components/GetStartedForm/Questionnaire-Booking/Questionnaire";
import { Field, FieldArray, Form, Formik, getIn } from "formik";
import { IPatientDetailsBYOid } from "../../main";
import Button from "@components/widgets/Button";
import {
  additionalQuestionsandAnswers,
  screeningQuestionsValidationSchema,
} from "@shared/data/screening";
import { useEffect, useState } from "react";

import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useColors } from "@utils/tenant_configuration";


type IProps = {
  patientDetail: IPatientDetailsBYOid;
  updPatientResponse: any;
};

export default function MedicalDetailContent({
  patientDetail,
  updPatientResponse,
}: IProps) {
  const { data } = patientDetail;
  const [isPrescriberAdded, setIsPrescriberAdded] = useState(false);
  /**
   * The function `resp` returns an array of objects containing specific properties from the `data`
   * object if it exists, otherwise it returns an empty array.
   * @returns The function `resp` is returning an array of objects. Each object in the array has the
   * properties `slug`, `placeholder`, `input_type`, `question`, and `answer`. If `data` and
   * `data.patient_responses` exist, the function will map over `data.patient_responses[0].response_json`
   * and return an array of objects with the specified properties. If `data` or
   */
  const resp = () => {
    if (data && data.patient_responses) {
      return (
        data?.patient_responses[0]?.response_json?.map((item: any) => {
          return {
            slug: item.slug,
            placeholder: item.placeholder,
            input_type: item.input_type,
            question: item.question,
            answer: item.answer,
            options: item.options,
          };
        }) ?? []
      );
    } else {
      return [];
    }
  };
  const res = resp();

  /**
   * The function appends additional questions and answers to an existing array.
   * @returns The function `appendQuestionsandAnswers` is returning the concatenated array `newResp`.
   */
  const appendQuestionsandAnswers = () => {
    const newResp = resp().concat(additionalQuestionsandAnswers);
    return newResp;
  };
  const append = appendQuestionsandAnswers();

  /* The `inititalValues` constant is an object that is used as the initial values for the Formik form.
  It contains the initial values for the form fields. */
  const inititalValues = {
    response_type: "nurse_screening_response",
    patient_id: data?.patient_responses[0]?.patient_id || "",
    nurse: "",
    response_json: res.length === 6 ? append : res,
  } as IQuestionnaireProps;

  const inpuTypes = ["radio", "checkbox"];
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <Formik
        initialValues={inititalValues}
        validationSchema={screeningQuestionsValidationSchema}
        onSubmit={(values) => {
          updPatientResponse.mutate(values, {
            onSuccess: () => { },
            onError: (error) => { },
          });
        }}
      >
        {({ values, errors, touched, isValid, setFieldValue }: any) => (
          // console.log("values", JSON.stringify(values, null, 2)),
          <>
            <Form className="">
              <FieldArray name="response_json">
                {(
                  arrayHelpers: any,

                ) => (
                  <div
                    className="custom-scrollbar"
                    style={{
                      width: "100%",
                    }}
                  >
                    {values.response_json.map((question, index) => (
                      <div
                        className="input"
                        key={index}
                        style={{
                          width: "100%",
                          marginBottom: "2rem",
                        }}
                      >
                        <div
                          className="arrayField "
                          style={{
                            textAlign: "left",
                          }}
                        >
                          {index + 1}. {question.question}{" "}
                          <strong className="asteriek">*</strong>
                        </div>

                        {question.input_type === "textfield" && (
                          <>
                            <Field
                              autocomplete="off"
                              type={
                                question.input_type === "textfield"
                                  ? "textarea"
                                  : "select"
                              }
                              name={`response_json.${index}.answer`}
                              placeholder={question.placeholder}
                              className="input_wrapper-outline text-area type-your-message"
                              style={{

                                borderColor:
                                  errors.response_json &&
                                    touched.response_json &&
                                    errors.response_json[index] &&
                                    touched.response_json[index] &&
                                    errors.response_json[index].answer &&
                                    touched.response_json[index].answer
                                    ? "#FF0000"
                                    : "#E4E4E4",
                              }}
                            />
                            <ErrorMessage
                              name={`response_json.${index}.answer`}
                            />
                          </>
                        )}
                        {question.input_type === "select" && (
                          <>
                            <Field
                              as="select"
                              name={`response_json.${index}.answer`}
                              placeholder={"Select"}
                              className="input_wrapper-outline text-area type-your-message"
                              style={{
                                borderColor:
                                  errors.response_json &&
                                    touched.response_json &&
                                    errors.response_json[index] &&
                                    touched.response_json[index] &&
                                    errors.response_json[index].answer &&
                                    touched.response_json[index].answer
                                    ? "#FF0000"
                                    : "#E4E4E4",
                              }}
                            >
                              <option
                                value=""
                                disabled
                                label="Select an option..."
                              />
                              {question?.options?.map(
                                (option: any, index: any) => (
                                  <option key={index} value={option.value}>
                                    {option.label}
                                  </option>
                                )
                              )}
                            </Field>
                            <ErrorMessage
                              name={`response_json.${index}.answer`}
                            />
                          </>
                        )}
                        {inpuTypes.includes(question.input_type) && (
                          <>
                            <div
                              className="d-flex"
                              role="group"
                              aria-labelledby="my-radio-group"
                            >
                              <div className="d-flex me-2">
                                <Field
                                  type="radio"
                                  value="yes"
                                  name={`response_json.${index}.answer`}
                                  placeholder={question.placeholder}
                                  className="input_wrapper radio-wrapper"
                                  onClick={
                                    (e: any) => {
                                      console.log("e", e.target.value);
                                      if (e.target.value === "yes" && values.response_json[index].slug === "previous_current_use") {
                                        // check sluug: previous_prescriber_name exists
                                        if (values.response_json.some((item) => item.slug === "previous_prescriber_name")) {
                                          console.log("slug exists");
                                        } else {
                                          arrayHelpers.push({
                                            slug: "previous_prescriber_name",
                                            options: [],
                                            question:
                                              "If yes, previous clinic or prescriber's name?",
                                            placeholder:
                                              "Enter Clinic or prescriber's name",
                                            required: false,
                                            answer: "",
                                            data_type: "string",
                                            input_type: "textfield",
                                          });
                                        }

                                      }
                                    }
                                  }
                                />
                                &nbsp;
                                <label className="">Yes </label>
                              </div>
                              &nbsp;&nbsp;&nbsp;
                              <div className="d-flex">
                                <Field
                                  type="radio"
                                  name={`response_json.${index}.answer`}
                                  placeholder={question.placeholder}
                                  className="input_wrapper radio-wrapper"
                                  value="no"
                                  onClick={(e: any) => {
                                    console.log("e", e.target.value);
                                    if (e.target.value === "no" && values.response_json[index].slug === "previous_current_use") {
                                      // check sluug: previous_prescriber_name exists
                                      if (values.response_json.some((item) => item.slug === "previous_prescriber_name")) {
                                        arrayHelpers.remove(
                                          arrayHelpers.form.values.response_json.findIndex(
                                            (item: any) =>
                                              item.slug === "previous_prescriber_name"
                                          )
                                        );
                                      }
                                    }
                                  }}
                                />
                                &nbsp;
                                <label className="">No </label>
                              </div>
                            </div>

                            <ErrorMessage
                              name={`response_json.${index}.answer`}
                            />
                          </>
                        )}

                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
              <Button
                id=""
                disabled={!isValid}
                button="Save Changes"
                dataBsDismiss={
                  values.response_json.some((item) => !item.answer)
                    ? ""
                    : "modal"
                }
                type="submit"
                className=""
                style={{
                  height: "48px",
                  width: "100%",
                  color: "#fff",
                  borderRadius: "4px",
                  border: "none",
                  marginTop: "5px",
                  backgroundColor: !isValid
                    ? `${primaryLightColor}`
                    : `${primaryColor}`,
                }}
              />
            </Form>
          </>
        )}
      </Formik>
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
