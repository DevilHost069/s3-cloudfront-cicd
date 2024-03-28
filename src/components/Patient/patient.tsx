import CustomCard from "@components/Card";
import { useProfile } from "@contexts/ProfileContext";
import { useEffect, useMemo, useState } from "react";
import { useGetPAtientConsulation } from "@server/patient/PatientConsultations";
import { IConsultationDetails } from "@shared/types/Consultation";
import moment from "moment";
import {
  findPrescriberTYpe,
  getConsultationStatus,
  prescriber_prescribed_status,
  prescriber_rejected_status,
} from "@utils/constants";

import BasicModal from "@components/Modal";
import CardInformation from "@components/Nurse/NurseDetail/ModalContent/makePayment/cardInformation";
import usePaymentSkip from "../../store/paymentSkip";
import useBookState from "../../store/patientBookingState";
import RejectionDetail from "@components/prescriber/PrescriberDetail/RejectionDetail";
import { usePrescriberData } from "@contexts/PrescriberDataContext";
import { IPrescriberData } from "@server/prescriber/useGetAllPrescriberOfSameConsulation";

import "@assets/css/patient.css";
import Loader from "@components/shared/Loader";
import CancelScriptModal from "@components/Nurse/NurseDetail/ModalContent/cancelScriptModal";
import { useSearchParams } from "react-router-dom";

type IConsultationObj = {
  id: number;
  oid: string;
  patient_internal_id: string;
  patient_oid: string;
  nurse_oid: string;
  nurse_full_name: string;
  patient_full_name: string;
  prescriber_consultation: null;
  patient_email: string;
  created_at: string;
  updated_at: string;
  booked_date_time: string;
  nurse_approved: boolean;
  consultation_status: string;
  is_ongoing_consultation: boolean;
};

const PatientDashboard = () => {
  const [title, setTitle] = useState("");
  const [prescriptionOID, setPrescriptionOID] = useState("");
  const [params, setParams] = useSearchParams();
  const [assignedPrescriber, setAssignedPrescriber] = useState<
    IPrescriberData | undefined
  >();
  const [modalContent, setModalContent] = useState("");
  const profileContext = useProfile();
  const [styler, setStyler] = useState({});
  const isSkipped = usePaymentSkip().getSkipped();
  const book = useBookState();
  const { prescriberData } = usePrescriberData();
  const openPaymentInformation = () => {
    setTitle("Payment Details");
    setModalContent("payment_details");
  };

  /* The `contentName` constant is an object that maps a key (`payment_details`) to a React component
  (`<CardInformation />`). This is used in the `PatientDashboard` component to determine the content
  to be rendered inside the `BasicModal` component when the `payment_details` modal is opened. */
  const contentName = {
    payment_details: <CardInformation />,
  };

  const { data, isLoading } = useGetPAtientConsulation(
    profileContext?.profile?.profile_id
  );

  /**
   * The function `convertDate` takes a string representing a date and returns a formatted date string
   * in the format "DD MMM, h:mm A" using the moment library.
   * @param {string} date - The `date` parameter is a string representing a date and time.
   * @returns The function `convertDate` returns a formatted date string in the format "DD MMM, h:mm A"
   * if the input `date` is not empty. If the input `date` is empty, it returns a dash ("-").
   */

  const convertDate = (date: string, format = "DD MMM, h:mm A") => {
    if (date) {
      return moment(date).format(format);
    }
    return "-";
  };

  /**
   * The function checks if all consultations in the given array have a status of "consultation_missed".
   * @param {IConsultationDetails[]} consultations - An array of objects representing consultation
   * details. Each object in the array should have a property called "consultation_status" which
   * represents the status of the consultation.
   * @returns The function `checkConsultationStatusIsConsultationMissed` returns a boolean value. It
   * returns `true` if all consultations in the `consultations` array have a `consultation_status` of
   * "consultation_missed". Otherwise, it returns `false`.
   */
  const checkConsultationStatusIsConsultationMissed = (
    consultations: IConsultationDetails[]
  ) => {
    if (consultations.length > 0) {
      return consultations.every((consultation) => {
        if (consultation.consultation_status === "consultation_missed") {
          return consultation.consultation_status === "consultation_missed";
        }
      });
    }
    return false;
  };

  const isConsultationMissed = useMemo(
    () => checkConsultationStatusIsConsultationMissed(data),
    [data]
  );

  /**
   * The function `checkLatestDate` takes in a list of consultation details and returns the consultation
   * with the latest date and time.
   * @param {IConsultationDetails[]} consultations - An array of consultation details objects. Each
   * object should have a property called "booked_date_time" which represents the date and time of the
   * consultation.
   * @returns The function `checkLatestDate` returns the consultation object with the latest date and
   * time from the given list of consultations. If the list is empty, it returns an empty object.
   */
  const checkLatestDate = (consultations: IConsultationDetails[]) => {
    if (consultations.length > 0) {
      const latestDate = consultations.reduce((prev, current) =>
        prev.booked_date_time > current.booked_date_time ? prev : current
      );
      return latestDate;
    }
    return {};
  };
  const latestDate = useMemo(() => checkLatestDate(data), [data]);

  /**
   * The function filters an array of consultation details to find the first consultation with the
   * property "is_ongoing_consultation" set to true.
   * @param {IConsultationDetails[]} consultations - The "consultations" parameter is an array of
   * objects that represent consultation details.
   * @returns The function `filterConsulationByIsOnGoingConsultationIsTrue` returns either the
   * consultation object with `is_ongoing_consultation` set to `true` or an empty object.
   */
  const filterConsulationByIsOnGoingConsultationIsTrue = (
    consultations: IConsultationDetails[]
  ) => {
    if (consultations.length > 0) {
      return consultations.reduce((prev, current) =>
        prev.is_ongoing_consultation === true ? prev : current
      );
    }
    return {};
  };
  const isOnGoingConsultation = useMemo(
    () => filterConsulationByIsOnGoingConsultationIsTrue(data),
    [data]
  );

  /* The  code defines a constant variable called
  `switchDataMapping`. The value of `switchDataMapping` is determined based on the condition
  `isConsultationMissed`. If `isConsultationMissed` is true, then `latestDate` is assigned to
  `switchDataMapping`. Otherwise, if `isOnGoingConsultation` is true, then `isOnGoingConsultation`
  is casted to `any` and assigned to `switchDataMapping`. */
  const switchDataMapping = latestDate as any;

  /* The above code is a useEffect hook in a TypeScript React component. It is used to perform side
  effects in the component, such as updating the state or making API calls. */
  useEffect(() => {
    if (switchDataMapping.id !== undefined) {
      if (switchDataMapping?.prescriber_consultation?.prescriber_oid) {
        const assignedPrescriber = prescriberData.data.find(
          (i) =>
            i.oid === switchDataMapping?.prescriber_consultation?.prescriber_oid
        );
        setAssignedPrescriber(assignedPrescriber);
      }
    }
  }, [switchDataMapping, prescriberData]);

  const pData =
    switchDataMapping?.prescriber_consultation !== null
      ? switchDataMapping?.prescriber_consultation
      : null;
  const prescriptions = pData !== null ? pData?.prescriptions : null;
  // const prescriptions = resp !== null ? resp?.prescribed_items : null;

  const prescriptionItems = () => {
    if (prescriptions !== null) {
      return prescriptions?.map((i) => {
        return {
          product_id: i?.product_id,
          oid: i?.oid,
          product_name: i?.prescribed_recipe?.name,
          dosage: i?.dose,
          repeat: i?.repeats,
          quantity: i?.quantity,
          patient_instruction: i?.instruction,
          get_nurse_or_doctor_status: i?.get_nurse_or_doctor_status,
          cancelled: i?.prescription_status !== "active",
          start_time: i?.start_date,
          end_time: i?.end_date,
          created_at: i?.created_at,
          long_term: i?.prescription_duration === "long_term" ? "Yes" : "No",
          type:
            i?.prescription_type === "e_prescription" ? "Electronic" : "Paper",
        };
      });
    }
    return [];
  };
  const pList = prescriptionItems();

  const allCancelled = pList?.every((item: any) => item?.cancelled === true);

  const onCancelClicked = () => {
    params.set("canceled", "all");
    params.set("prescription_oid", pData?.prescriptions?.oid);
    setParams(params);
  };

  const onEachCancelClicked = (oid: string) => {
    setPrescriptionOID(oid);
  };

  const checkerStatus = () => {
    if (pList !== undefined) {
      if (pList.length === 1) {
        if (pList.length === 1 && pList[0].cancelled === false) {
          return "d-block";
        } else {
          return "d-none";
        }
      } else if (pList.length > 1) {
        if (allCancelled) {
          return "d-none";
        }
        return "d-block";
      } else {
        if (allCancelled) {
          return "d-none";
        }
      }
    }
    return "d-none";
  };
  const stats = checkerStatus();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className="col-12"
        style={{
          marginTop: "55px",
        }}
      >
        <CustomCard title={"Consultation Details"}>
          <div className="d-flex flex-column flex-sm-row justify-content-between">
            <div>
              <div className="d-flex mb-2">
                <div
                  className="card-item-titled text-gray-500"
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {switchDataMapping?.prescriber_consultation
                    ? "Prescriber"
                    : "Nurse"}{" "}
                  Booked:
                </div>
                <div className="card-item-value text-gray-950">
                  {switchDataMapping?.prescriber_consultation
                    ? switchDataMapping?.prescriber_consultation
                        .prescriber_full_name
                    : switchDataMapping?.nurse_full_name || "-"}
                </div>
              </div>
              <div className="d-flex mb-2">
                <div
                  className="card-item-titled text-gray-500"
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Appointment Date/Time
                </div>
                <div className="card-item-value text-gray-950">
                  {convertDate(
                    switchDataMapping?.prescriber_consultation
                      ? switchDataMapping?.prescriber_consultation?.start_time
                      : switchDataMapping?.start_time,
                    "h:mm A, DD MMM"
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex  flex-row flex-sm-column justify-content-between justify-content-sm-center align-items-center">
              <span className="d-none d-sm-block app-status-title text-gray-500 mb-1">
                Application Status
              </span>
              <div
                className="d-block d-sm-none card-item-titled text-gray-500"
                style={{
                  fontWeight: "600",
                }}
              >
                Application Status
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "150%",
                }}
                className={
                  `application_status_badge badge text-${
                    getConsultationStatus(switchDataMapping)?.class
                  }-700 bg-${
                    getConsultationStatus(switchDataMapping)?.class
                  }-50` || ""
                }
              >
                {getConsultationStatus(switchDataMapping)?.displayText || "-"}
              </span>
            </div>
          </div>
        </CustomCard>
      </div>
      <div className="col-12 col-md-6 col-lg-6 d-flex">
        <CustomCard title={"Prescription Details"} display={stats}>
          {!pList?.length ? (
            <>
              <div className="d-flex mb-2">
                <div className="card-item-titled text-gray-500 ">
                  Product Details:
                </div>
                <div className="card-item-value text-gray-950">-</div>
              </div>
              <div className="d-flex mb-2">
                <div className="card-item-titled text-gray-500">Type:</div>
                <div className="card-item-value text-gray-950">-</div>
              </div>
              <div className="d-flex mb-2">
                <div className="card-item-titled text-gray-500">Repeat:</div>
                <div className="card-item-value text-gray-950">-</div>
              </div>
              <div className="d-flex mb-2">
                <div className="card-item-titled text-gray-500">Dosage:</div>
                <div className="card-item-value text-gray-950">-</div>
              </div>

              <div className="d-flex mb-2">
                <div className="card-item-titled text-gray-500">Quantity:</div>
                <div className="card-item-value text-gray-950">-</div>
              </div>
              <div className="d-flex mb-2">
                <div className="card-item-titled text-gray-500">
                  Dosage Instruction:
                </div>
                <div className="card-item-value text-gray-950">-</div>
              </div>
              <div className="d-flex mb-2">
                <div className="card-item-titled text-gray-500">Long Term:</div>
                <div className="card-item-value text-gray-950">-</div>
              </div>
              <div className="d-flex mb-2">
                <div className="card-item-titled text-gray-500">End Date:</div>
                <div className="card-item-value text-gray-950">-</div>
              </div>
              <div className="d-flex mb-2">
                <div className="card-item-titled text-gray-500">
                  Prescription Date:
                </div>
                <div className="card-item-value text-gray-950">-</div>
              </div>
            </>
          ) : (
            ""
          )}
          <>
            {pList !== null ? (
              <>
                <div className=" main_body w-full">
                  {pList?.map((item, index) => {
                    return (
                      <>
                        <div className="main_body inner_body" key={index}>
                          {/* {pList.length > 1 ? (
                            <>
                              <div className="d-flex justify-content-end w-full">
                                <span
                                  className="d-flex "
                                  style={{
                                    cursor: "pointer",
                                    color: `${PRIMARY_COLOR}`,
                                    fontSize: "16px",
                                  }}
                                  onClick={() => {
                                    onEachCancelClicked(item.oid);
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#cancelScript"
                                >
                                  {item.cancelled ? "" : "X"}
                                </span>
                              </div>
                            </>
                          ) : null} */}
                          {item.cancelled ? (
                            <span className="d-flex w-full">
                              <label className="text-gray-500 card_spacing"></label>
                              <label className="text-gray-950 card_val d-flex justify-content-end flex-grow-1">
                                <label className="text-danger bg-danger-50 application_status_badge mx-ms-3 text-center">
                                  Cancelled
                                </label>
                              </label>
                            </span>
                          ) : (
                            ""
                          )}
                          <span className="d-flex w-full">
                            <label className="text-gray-500 card_spacing">
                              Product Details:
                            </label>
                            <label className="text-gray-950 card_val d-flex justify-content-between flex-grow-1">
                              <span>{item.product_name}</span>
                            </label>
                          </span>
                          <span className="d-flex w-full">
                            <label className="text-gray-500 card_spacing">
                              Type:
                            </label>
                            <label className="text-gray-950 card_val">
                              {item.type}
                            </label>
                          </span>
                          <span className="d-flex w-full">
                            <label className="text-gray-500 card_spacing">
                              Repeat:
                            </label>
                            <label className="text-gray-950 card_val">
                              {item.repeat}
                            </label>
                          </span>

                          <span className="d-flex w-full">
                            <label className="text-gray-500 card_spacing">
                              Dosage:
                            </label>
                            <label className="text-gray-950 card_val">
                              {item.dosage}
                            </label>
                          </span>
                          <span className="d-flex w-full">
                            <label className="text-gray-500 card_spacing">
                              Quantity:
                            </label>
                            <label className="text-gray-950 card_val">
                              {item.quantity}
                            </label>
                          </span>
                          <span className="d-flex w-full">
                            <label className="text-gray-500 card_spacing">
                              Dosage Instruction:
                            </label>
                            <label className="text-gray-950 card_val">
                              {item.patient_instruction}
                            </label>
                          </span>
                          <span className="d-flex w-full">
                            <label className="text-gray-500 card_spacing">
                              Long Term:
                            </label>
                            <label className="text-gray-950 card_val">
                              {item.long_term}
                            </label>
                          </span>
                          <span className="d-flex w-full">
                            <label className="text-gray-500 card_spacing">
                              Prescription Date:
                            </label>
                            <label className="text-gray-950 card_val">
                              {moment(item.created_at).format("DD MMMM YYYY")}
                            </label>
                          </span>
                          <span className="d-flex w-full">
                            <label className="text-gray-500 card_spacing">
                              End Date:
                            </label>
                            <label className="text-gray-950 card_val">
                              {moment(item.end_date).format("DD MMMM YYYY")}
                            </label>
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              ""
            )}
          </>
        </CustomCard>
      </div>
      <div
        className="col-12 col-md-6 col-lg-6 d-flex"
        style={{
          height: "350px",
        }}
      >
        <CustomCard title={"Prescriber Consultation Details"}>
          <div className="d-flex mb-2">
            <div className="card-spacing text-gray-500">Prescriber Name:</div>
            <div className="card-item-value text-gray-950">
              {switchDataMapping?.prescriber_consultation
                ?.prescriber_full_name || "-"}
            </div>
          </div>
          <div className="d-flex mb-2">
            <div className="card-spacing text-gray-500">
              Appointment Date/Time:
            </div>
            <div className="card-item-value text-gray-950">
              {switchDataMapping?.prescriber_consultation !== null
                ? convertDate(
                    switchDataMapping?.prescriber_consultation?.start_time
                  )
                : "-"}
            </div>
          </div>
          <div className="d-flex mb-2">
            <div className="card-spacing text-gray-500">Email:</div>
            <div className="card-item-value text-gray-950">
              {switchDataMapping?.prescriber_consultation?.prescriber_email ||
                "-"}
            </div>
          </div>
          <div className="d-flex mb-2">
            <div className="card-spacing text-gray-500">Prescriber Types:</div>
            <div className="card-item-value text-gray-950">
              {findPrescriberTYpe(
                switchDataMapping?.prescriber_consultation?.prescriber_type
              ) || "-"}
            </div>
          </div>
          <div className="d-flex mb-2">
            <div className="card-spacing text-gray-500">Provider Number:</div>
            <div className="card-item-value text-gray-950">
              {switchDataMapping?.prescriber_consultation?.prescriber_number ||
                "-"}
            </div>
          </div>
        </CustomCard>
      </div>
      {switchDataMapping?.prescriber_consultation?.consultation_status ===
      prescriber_rejected_status ? (
        <div className="col-12 col-md-6 col-lg-6 d-flex">
          <RejectionDetail
            details={switchDataMapping?.prescriber_consultation}
          />
        </div>
      ) : (
        ""
      )}
      {/* <div className="col-12 col-md-6 col-lg-4 d-flex">
        <CustomCard title={"Billing History"}>
          <CardEmptyData dataTitle={"History"} />
        </CustomCard>
      </div> */}
      <BasicModal
        modalId="cancelScript"
        title={"Cancel Script?"}
        extraStyle={{}}
      >
        <CancelScriptModal
          p_oid={prescriptionOID}
          resetP_oid={() => {
            setPrescriptionOID("");
          }}
        />
      </BasicModal>
      <BasicModal title={title} extraStyle={styler}>
        {contentName[modalContent]}
      </BasicModal>
    </>
  );
};

export default PatientDashboard;
