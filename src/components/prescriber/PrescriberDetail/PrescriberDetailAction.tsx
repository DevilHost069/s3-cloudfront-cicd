import CustomCard from "@components/Card";
import {
  consultation_doctor_assigned_value,
  convertDate,
  getConsultationStatus,
  precriber_missed_status,
  prescriber_prescribed_status,
  prescriber_rejected_status,
} from "@utils/constants";
import { INurseConsulationDetails, IPatientDetailsBYOid } from "./main";
import { useMarkConsultationAsMissedPrescriber } from "@server/prescriber/Prescriber-Consultation/useMarkConsultationAsMissed";
import { useRef, useState } from "react";
import { PRIMARY_COLOR } from "@utils/color";
import { useColors } from "@utils/tenant_configuration";


type IDetailAction = {
  details: INurseConsulationDetails;
  missed: any;
  patientDetail: IPatientDetailsBYOid;
  nurseApproved: any;
  setTitle: (title: string) => void;
  setModalContent: (content: string) => void;
  setShowMedications: (showMedication: boolean) => void;
  showMedications: boolean;
};

export default function PrescriberDetailAction({
  details,
  missed,
  patientDetail,
  nurseApproved,
  setTitle,
  setModalContent,
  setShowMedications,
  showMedications,
}: IDetailAction) {
  const params = new URLSearchParams(window.location.search);
  const cOid = params.get("consultation_oid");
  const dropdownRef = useRef(null);

  const markAsMissed = useMarkConsultationAsMissedPrescriber({
    msg: "Consultation marked as missed",
  });
  const { data } = details as any;

  const onRejectClick = () => {
    setTitle("Reason for Application Rejection");
    setModalContent("reject_reason");
  };
  const onPrescriptionCreateClick = () => {
    setTitle("Create Prescription");
    setModalContent("create_prescription");
  };
  const onMarkAsMissedClick = () => {
    markAsMissed.mutate(cOid);
  };
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <CustomCard
        title={
          <>
            <div className="d-flex justify-content-between align-items-center">
              <span
                className="card-title pt-2 flex-grow-1"
                style={{
                  color: `${primaryColor}`,
                  fontSize: "18px",
                  fontWeight: "700",
                  lineHeight: "27px",
                }}
              >
                Detail & Actions
              </span>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowMedications(!showMedications)}
              >
                Medications
              </button>
            </div>
          </>
        }
      >
        <div className="row w-full">
          <div className="col-sm-12 col-md-12 col-xl-6 w-full">
            <div className="row mb-2">
              <div className="col-6 card-key text-gray-500">Patient Id:</div>
              <div className="col-6 card-item-value text-gray-950">
                {patientDetail.data.patient_internal_id}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6 card-key text-gray-500">
                Appointment Date/Time:
              </div>
              <div className="col-6">
                <div className="card-item-value text-gray-950">
                  {convertDate(data.start_time).date}
                </div>
                <div className="card-item-value text-gray-500">
                  {convertDate(data.start_time).time}
                </div>
              </div>
            </div>
            <div className="row d-md-none mb-2 align-items-center">
              <div className="col-6 card-item-title text-gray-500">
                Application Status :
              </div>
              <div className="col-6">
                <div
                  className={`application_status_badge badge text-${
                    getConsultationStatus(data)?.class
                  }-700 bg-${getConsultationStatus(data)?.class}-50 `}
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "150%",
                  }}
                >
                  {getConsultationStatus(data)?.displayText}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 w-full">
            <div className="row w-full">
              <div className="col d-flex justify-content-end">
                <div
                  className="mt-3 d-flex flex-column align-items-center d-none d-md-block"
                  style={{
                    fontWeight: "600",
                    fontSize: "12px",
                    gap: "5px",
                    textAlign: "center",
                    lineHeight: "150%",
                    // textAlign: [
                    //   precriber_missed_status,
                    //   prescriber_rejected_status,
                    //   prescriber_prescribed_status,
                    // ].includes(data.consultation_status)
                    //   ? "end"
                    //   : "center",
                  }}
                >
                  <div
                    className="mt-3 justify-content-end text-gray-500 mb-1"
                    style={{
                      fontWeight: "600",
                      fontSize: "12px",
                      gap: "5px",
                      width: "100%",
                      textAlign: [
                        precriber_missed_status,
                        prescriber_rejected_status,
                      ].includes(data.consultation_status)
                        ? "end"
                        : "inherit",
                    }}
                  >
                    Application Status
                  </div>

                  {/*  */}
                  <div
                    className={
                      [
                        precriber_missed_status,
                        prescriber_rejected_status,
                        prescriber_prescribed_status,
                      ].includes(data.consultation_status)
                        ? "d-flex justify-content-end"
                        : ""
                    }
                  >
                    <div
                      className={`application_status_badge badge text-${
                        getConsultationStatus(data)?.class
                      }-700 bg-${getConsultationStatus(data)?.class}-50 `}
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        lineHeight: "150%",
                      }}
                    >
                      {getConsultationStatus(data)?.displayText}
                    </div>
                  </div>
                </div>
              </div>

              {![
                precriber_missed_status,
                prescriber_rejected_status,
                prescriber_prescribed_status,
              ].includes(data.consultation_status) ? (
                <div
                  className={`align-self-end ${
                    data.consultation_status ===
                    consultation_doctor_assigned_value
                      ? "col-12"
                      : "col-12 col-md-6"
                  }`}
                >
                  <div
                    className="btn-group w-full"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <button
                      className="btn btn-outline-primary w-full"
                      type="button"
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Take Action
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                      ref={dropdownRef}
                    >
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </button>

                    <ul
                      className="dropdown-menu dropdown-menu-end min-w-full border-primary border-top-0"
                      style={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                      }}
                    >
                      {/* {data?.prescriptions?.id !== undefined ? null : (
                        <>
                          <li>
                            <a
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                              className="dropdown-item"
                              style={{
                                cursor: "pointer",
                                textAlign: "left",
                                fontWeight: "400",
                                lineHeight: "150%",
                                padding: "12px 9px",
                              }}
                              onClick={onPrescriptionCreateClick}
                            >
                              Create Prescription
                            </a>
                          </li>
                        </>
                      )} */}
                      <li>
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                          className="dropdown-item"
                          style={{
                            cursor: "pointer",
                            textAlign: "left",
                            fontWeight: "400",
                            lineHeight: "150%",
                            padding: "12px 9px",
                          }}
                          onClick={onRejectClick}
                        >
                          Reject Application
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
                          onClick={onMarkAsMissedClick}
                        >
                          Mark as Missed
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* END OF DETAIL AND SECTION */}
      </CustomCard>
    </>
  );
}
