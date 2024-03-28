import { Field, FieldArray } from "formik";

type IProps = {
  inititalValues: any;
  values?: any;
  setDisabled?: any;
};

export default function QuestionnaireArrayField({
  inititalValues,
  values,
  setDisabled,
}: IProps) {
  const isFilled = values?.response_json?.some(
    (item: any) => item.answer !== "",
  );

  if (isFilled) {
    setDisabled(false);
  } else {
    setDisabled(true);
  }

  return (
    <>
      <FieldArray name="response_json">
        {(arrayHelpers) => (
          <div
            style={{
              width: "100%",
            }}
          >
            {inititalValues.response_json.map((question, index) => (
              <div
                className="input"
                key={index}
                style={{
                  width: "100%",
                  marginBottom: "2rem",
                }}
              >
                <div className="reasoning-for-seeking">{question.question}</div>
                <Field
                  autoComplete="off"
                  type="textarea"
                  name={`response_json.${index}.answer`}
                  placeholder={question.placeholder}
                  className="text-area type-your-message"
                />
              </div>
            ))}
          </div>
        )}
      </FieldArray>
    </>
  );
}
