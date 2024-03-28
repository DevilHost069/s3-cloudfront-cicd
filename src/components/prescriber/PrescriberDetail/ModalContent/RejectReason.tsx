import Button from "@components/widgets/Button";
import ErrorText from "@components/widgets/Error";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextArea from "@components/widgets/TextArea";
import { useMarkConsultationAsRejectedPrescriber } from "@server/prescriber/Prescriber-Consultation/useRejectConsultation";
import "react-quill/dist/quill.snow.css";
import { useSearchParams } from "react-router-dom";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useColors } from "@utils/tenant_configuration";


const initialValue = {
  reject_reason: "",
  consultation_oid: "",
};
export default function RejectReason() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cOId = searchParams.get("consultation_oid");

  const reject = useMarkConsultationAsRejectedPrescriber({
    msg: "Consultation rejected",
  });

  const validateNotesSchema = Yup.object().shape({
    reject_reason: Yup.string().required("Reason discription is required."),
  });
  const validatenoteTitle = (value: string) => {
    if (!value) {
      return true;
    }
    return false;
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validateNotesSchema,
    initialValues: initialValue,
    onSubmit: (values, reset) => {
      reject.mutate({
        reject_reason: values.reject_reason,
        consultation_oid: cOId,
      });
      reset.resetForm();
    },
  });
  const validate = validatenoteTitle(formik.values.reject_reason);
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="input">
          <div
            className={
              formik.touched.reject_reason && formik.errors.reject_reason
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextArea
              className="input_wrapper-outline w-full no-border-focus t-area"
              placeholder="Enter the reason for rejection"
              formik={formik.getFieldProps("reject_reason")}
              value={formik.values.reject_reason}
              onChange={
                formik.handleChange as (
                  e: React.ChangeEvent<HTMLInputElement>,
                ) => void
              }
            />
          </div>

          {formik.errors.reject_reason ||
          (formik.touched.reject_reason && formik.errors.reject_reason) ||
          validate ? (
            <ErrorText message={formik.errors.reject_reason as string} />
          ) : null}
        </div>
        <Button
          id=""
          button={"Submit"}
          type="submit"
          className="btn"
          dataBsDismiss={validate ? "" : "modal"}
          disabled={validate}
          style={{
            height: "48px",
            width: "100%",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            marginTop: "30px",
            backgroundColor: validate
              ? `${primaryLightColor}`
              : `${primaryColor}`,
          }}
        />
      </form>
    </>
  );
}
