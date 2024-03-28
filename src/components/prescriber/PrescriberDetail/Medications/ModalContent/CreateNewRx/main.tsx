import { IProduct } from "@components/prescriber/PrescriberDetail/ModalContent/CreatePrescription/ArrayField";
import { IPatientDetailsBYOid } from "@components/prescriber/PrescriberDetail/main";
import { useGetProducts } from "@server/prescriber/useGetProducts";
import { IProducts } from "@shared/types/product";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SelectProduct from "./SelectProduct";
import SelectedProductDetails from "./SelectedProductDetails";
import { useCreatePrescription } from "@server/prescriber/Prescriber-Consultation/createPrescription";
import { useFormik } from "formik";
import { usePostSentPrescriptionToPharmacy } from "@server/prescriber/useSentPrescriptionToPharmacy";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useProductOptions } from "@contexts/ProductOptionsContext";
import * as Yup from "yup";

type ICreateNewRx = {
  patientDetail: IPatientDetailsBYOid;
};
const initValues = {
  prescribed_recipe: "",
  dose: "",
  frequency: "",
  food: "",
  instruction: "",
  extra_instruction: "",
  prescription_duration: "long_term",
  script_date: moment().format("YYYY-MM-DD"),
  private: "Private",
  print_script: "Print Script",
  quantity: 0,
  repeats: "",
  days_btw_repeats: 0,
  start_date: moment().format("YYYY-MM-DD"),
  end_date: moment().add(6, "months").format("YYYY-MM-DD"),
  purpose: "",
  regulation_24: false,
  my_health_record_consent: false,
  brand_substitution: false,
  include_your_brand_name: false,
  ctg_pbs_co_payment: false,
  no_compliance_checking: false,
  urgent_supply: false,
  inpatient_service: false,
  confidential: false,
  new_prescribed_consultation: 0,
};
const validationSchema = Yup.object({
  days_btw_repeats: Yup.number().required("Repeat Interval is required"),
  script_date: Yup.date().min(
    moment().format("YYYY-MM-DD"),
    "Date cannot be in the past"
  ),
  start_date: Yup.date().min(
    moment().format("YYYY-MM-DD"),
    "Date cannot be in the past"
  ),
  end_date: Yup.date().min(
    moment().format("YYYY-MM-DD"),
    "Date cannot be in the past"
  ),
  quantity: Yup.number()
    .required("Quantity is required")
    .test("quantity", "Quantity must be greater than 0", (value: any) => {
      return parseInt(value) > 0;
    }),
  repeats: Yup.number()
    .required("Repeats is required")
    .test(
      // must be betw 0-6
      "repeats",
      "Repeats must be between 0 and 6",
      (value: any) => {
        return parseInt(value) >= 0 && parseInt(value) <= 6;
      }
    ),
  extra_instruction: Yup.string().max(220, "Max 250 characters"),
});

const CreateNewRx = ({ patientDetail }: ICreateNewRx) => {
  const products = useGetProducts() as IProduct;
  const [pharmacyOID, setPharmacyOID] = useState("");
  const [prescription_id, setPrescription_id] = useState("");
  const [sendToPharmacy, setSendToPharmacy] = useState(false);
  const [step, setStep] = useState(0);
  const { data, isLoading } = products as any;
  const [selectedData, setSelectedData] = useState(null);
  const [searchquery, setSearchquery] = useState("");
  const [pType, setPType] = useState("");
  const closeBtnRef = useRef(null);
  const [params, setParams] = useSearchParams();
  const {
    productOptions: {
      dosage_options,
      frequency_options,
      food_options,
      instructions_options,
    },
  } = useProductOptions();
  const filteredProducts: IProducts[] = useMemo(() => {
    if (!data) return [];
    if (searchquery)
      return data.filter((p: IProducts) =>
        p.name.toLowerCase().includes(searchquery.toLowerCase())
      );
    else return data;
  }, [searchquery, data]);
  const nextStep = () => {
    setStep((step) => step + 1);
  };
  const prevStep = () => {
    if (step !== 0) setStep((step) => step - 1);
  };
  const checkDisabled = () => {
    if (!selectedData?.name) return true;
    return false;
  };
  const createPrescription = useCreatePrescription(pType);
  const sendPdfToPharmacy = usePostSentPrescriptionToPharmacy();
  const formik = useFormik({
    initialValues: initValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const create = await createPrescription.mutateAsync(values);
      setPrescription_id(create.oid);
      if (sendToPharmacy)
        await sendPdfToPharmacy.mutateAsync({
          body: {
            pharmacy_profile_oid: pharmacyOID,
          },
          oid: create.oid,
        });
      setSelectedData({});
      setSearchquery("");
      formik.resetForm({ values: initValues });
      formik.setFieldValue("new_prescribed_consultation", params.get("c_id"));
      formik.setFieldValue("dose", "");
      formik.setFieldValue("frequency", frequency_options[0]);
      formik.setFieldValue("food", food_options[0]);
      formik.setFieldValue("instruction", instructions_options[0]);
      setStep(0);
      closeBtnRef.current?.click();
    },
  });

  console.log("valers", formik.values.extra_instruction);

  const onPaperOrElectronicPrescriptionClicked = useCallback(() => {
    formik.submitForm();
  }, []);

  useEffect(() => {
    if (selectedData) {
      formik.setFieldValue("prescribed_recipe", selectedData.id);
      formik.setFieldValue("quantity", selectedData.quantity);
      formik.setFieldValue("private", selectedData.share);
      formik.setFieldValue("repeats", selectedData.repeats);
    }
  }, [selectedData]);
  useEffect(() => {
    formik.setFieldValue("new_prescribed_consultation", params.get("c_id"));
  }, [params]);
  useEffect(() => {
    if (
      frequency_options.length &&
      food_options.length &&
      instructions_options.length
    ) {
      formik.setFieldValue("frequency", frequency_options[0]);
      formik.setFieldValue("food", food_options[0]);
      formik.setFieldValue("instruction", instructions_options[0]);
    }
  }, [frequency_options, food_options, instructions_options]);
  const getBackProps = () => {
    return step === 0
      ? {
          "data-bs-dismiss": "modal",
        }
      : {};
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="details ps-3">
            <div className="row mb-2">
              <div className="col-6 card-key text-gray-500">Patient Id:</div>
              <div className="col-6 card-item-value text-gray-950">
                {patientDetail.data.patient_internal_id}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6 card-key text-gray-500">Patient Name:</div>
              <div className="col-6 card-item-value text-gray-950">
                {`${patientDetail.data.first_name} ${patientDetail.data.last_name}`}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6 card-key text-gray-500">DOB</div>
              <div className="col-6 card-item-value text-gray-950">
                {patientDetail.data.dob}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`row bg-light rounded-3 p-md-3 ${step === 0 ? "" : "d-none"}`}
        >
          <SelectProduct
            data={data}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            filteredProducts={filteredProducts}
            isLoading={isLoading}
            searchquery={searchquery}
            setSearchquery={setSearchquery}
          />
        </div>
        <div
          className={`row bg-light rounded-3 p-md-3 ${step === 1 ? "" : "d-none"}`}
        >
          <SelectedProductDetails
            data={data}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            isLoading={isLoading}
            searchquery={searchquery}
            setSearchquery={setSearchquery}
            formik={formik}
            sendToPharmacy={sendToPharmacy}
            setSendToPharmacy={setSendToPharmacy}
            setPharmacyOID={setPharmacyOID}
          />
        </div>
        <div className="row">
          <div className="col-md-12 pt-3 d-flex justify-content-end">
            <button
              className="btn btn-outline-primary me-3"
              {...getBackProps()}
              onClick={prevStep}
              type="button"
            >
              Back
            </button>
            {step === 0 ? (
              <button
                className="btn btn-primary"
                onClick={nextStep}
                disabled={checkDisabled()}
                type="button"
              >
                Next
              </button>
            ) : (
              <>
                <div
                  className="btn-group dropup"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <button
                    className="btn btn-primary w-full"
                    type="button"
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    Prescribe
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>

                  <ul
                    className="dropdown-menu dropdown-menu-end min-w-full border-primary border-bottom-0"
                    style={{
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                  >
                    <li>
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#newRx"
                        className="dropdown-item"
                        style={{
                          cursor: "pointer",
                          textAlign: "left",
                          fontWeight: "400",
                          lineHeight: "150%",
                          padding: "12px 9px",
                        }}
                        onClick={() => {
                          setPType("paper");
                          setTimeout(() => {
                            onPaperOrElectronicPrescriptionClicked();
                          }, 1000);
                        }}
                      >
                        Paper Prescription
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        style={{
                          cursor: "pointer",
                          textAlign: "left",
                          fontWeight: "400",
                          lineHeight: "150%",
                          padding: "12px 9px",
                        }}
                        onClick={() => {
                          setPType("electronic");
                          setTimeout(() => {
                            onPaperOrElectronicPrescriptionClicked();
                          }, 1000);
                        }}
                      >
                        E-Prescription
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
      <button
        className="d-none"
        // data-bs-toggle="modal"
        // data-bs-target="#myModal"
        data-bs-dismiss="modal"
        ref={closeBtnRef}
      >
        close
      </button>
    </>
  );
};

export default CreateNewRx;
