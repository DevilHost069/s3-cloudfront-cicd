import Button from "@components/widgets/Button";
import ErrorText from "@components/widgets/Error";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextInput from "@components/widgets/TextInput";
// import { useMarkConsultationAsRejectedPrescriber } from "@server/prescriber/Prescriber-Consultation/useRejectConsultation";
import "react-quill/dist/quill.snow.css";
import { useColors } from "@utils/tenant_configuration";
import { useSendPrescriptionEmailList } from "@server/prescriber/Prescriber-Consultation/useSendPrescriptionEmail";
import { useConfiguration } from "@contexts/ConfigurationContext";


export default function SendPrescriptionEmail (oid) {
    const { configurations } = useConfiguration();
    const initialValue = {
        email_list: configurations?.data?.branding?.support_email || "scripts@hanamed.com.au",
        prescription_oid: "",
    };
    
      
//   const [searchParams, setSearchParams] = useSearchParams();
  const cOId = oid;  

  const email_send = useSendPrescriptionEmailList({
    msg: "Email Sent",
  });

  const validateNotesSchema = Yup.object().shape({
    email_list: Yup.string()
    .required("Email is required.")
    .matches(
      // Regular expression to validate email format
      /^\s*[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\s*(,\s*[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\s*)*$/i,
      "Invalid email format. Please enter valid email addresses separated by commas."
    ),
  });
  const validatenoteTitle = (value: string) => {
    if (!value || formik.errors.email_list || (formik.touched.email_list && formik.errors.email_list)) {
      return true;
    }
    return false;
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validateNotesSchema,
    initialValues: initialValue,
    onSubmit: (values, reset) => {
      email_send.mutate({
        email_list: values.email_list,
        prescription_oid: cOId.oid,
      });
      reset.resetForm();
    },
  });
  const validate = validatenoteTitle(formik.values.email_list);
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="input">
          <div
            className={
              formik.touched.email_list && formik.errors.email_list
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline w-full no-border-focus border-0"
              placeholder="Input Emails in comma-seperated format"
              formik={formik.getFieldProps("email_list")}
              value={formik.values.email_list}
              onChange={
                formik.handleChange as (
                  e: React.ChangeEvent<HTMLInputElement>,
                ) => void
              }
            />
          </div>

          {formik.errors.email_list ||
          (formik.touched.email_list && formik.errors.email_list) ||
          validate ? (
            <ErrorText message={formik.errors.email_list as string} />
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
