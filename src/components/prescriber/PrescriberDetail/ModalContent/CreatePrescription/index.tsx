import "@assets/css/prescriprion.css";

import { Formik } from "formik";
import ProductArrayField from "./ArrayField";
import { useCreatePrescription } from "@server/prescriber/Prescriber-Consultation/createPrescription";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";

type IProps = {
  setTitle?: (title: string) => void;
  setModalContent?: (content: string) => void;
};

export default function CreatePrescription({
  setTitle,
  setModalContent,
}: IProps) {
  const [params, setParams] = useSearchParams();

  const initialValues = {
    new_prescribed_consultation: 0,
    prescribed_items: [
      {
        product_id: 0,
        product_name: "",
        repeat: 0,
        dosage_value: "",
        unit: "mg",
        dosage: "",
        patient_instruction: "",
        quantity: 0,
        quantity_extended: "",
        product_pricing: 0,
        cancelled: false,
      },
    ],
    send_script: "",
  };
  // const create = useCreatePrescription();

  const validteSchema = Yup.object({
    prescribed_items: Yup.array().of(
      Yup.object({
        product_id: Yup.number().required("Required"),
        product_name: Yup.string().required("Please select the product"),
        repeat: Yup.number().required("Required"),
        dosage_value: Yup.string().required("Dosage unit is required"),
        unit: Yup.string().required("Required"),
        patient_instruction: Yup.string().required(
          "Dosage instruction is required",
        ),
        quantity: Yup.number()
          .required("Required")
          .min(1, "Quantity must be greater than 0"),
        product_pricing: Yup.number().required("Required"),
      }),
    ),
    send_script: Yup.string().required("Please select the option"),
  });
  return (
    <>
      <div
        className="custom-scrollbar"
        style={{
          overflowX: "scroll",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validteSchema}
          onSubmit={(values, reset) => {
            const combine = values.prescribed_items.map((item, index) => {
              return {
                product_id: index + 1,
                product_name: item.product_name,
                repeat: item.repeat,
                dosage: item.dosage_value + item.unit,
                quantity: item.quantity,
                quantity_extended: item.quantity_extended,
                patient_instruction: item.patient_instruction,
                product_pricing: item.product_pricing,
                cancelled: item.cancelled,
              };
            });

            const data = {
              new_prescribed_consultation: params.get("c_id"),
              prescribed_items: combine,
            };

            // create.mutate(data, {
            //   onSuccess: (data: any) => {
            //     reset.resetForm();
            //     setTimeout(() => {
            //       params.set("prescription_oid", data?.oid);
            //       setParams(params);
            //       setTitle("Prescription Details");
            //       setModalContent("prescription");
            //     }, 1000);
            //   },
            // });
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            isValid,
            isSubmitting,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <ProductArrayField
                  inititalValues={values}
                  setFieldValue={setFieldValue}
                  handleSubmit={handleSubmit}
                  setTitle={setTitle}
                  setModalContent={setModalContent}
                  errors={errors}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                />
              </form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
}
