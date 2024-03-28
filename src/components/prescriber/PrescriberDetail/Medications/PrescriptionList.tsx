import { Option } from "@assets/index";
import Loader from "@components/shared/Loader";
import { useGetPrescriptionsByPCOID } from "@server/prescriber/useGetPrescriptionsByPCOID";
import { IPrescriptionDetail } from "@shared/types/prescriber";
import moment from "moment";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SVG from "react-inlinesvg";
import BasicModal from "@components/Modal";
import CancelScriptModal from "@components/Nurse/NurseDetail/ModalContent/cancelScriptModal";
import PrescriptionDetail from "../ModalContent/PrescriptionDetail";
import usePagination from "@hooks/usePagination";
import Pagination from "@components/widgets/Pagination";
import QRAndBArCodeGenerate from "./ModalContent/QrBarCodeGen";
import { useGetPrescriptionDetailByOID } from "@server/prescriber/useGetPrescriptionByOID";
import SendPrescriptionEmail from "../ModalContent/SendPrescriptionEmail";

const PrescriptionList = ({ activeTab }) => {
  const [prescriptionOID, setPrescriptionOID] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetPrescriptionsByPCOID(
    searchParams.get("patient_oid"),
    activeTab.includes("current") ? "new" : "old"
  );


  const { paginatedData, currentPage, totalPages, onPageChange } =
    usePagination({ data, isLoading });

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="table table-striped table-bordered border-slate-400 rounded-2 overflow-hidden">
          <thead>
            <tr>
              <th className="bg-primary-900 text-white th-font">Type</th>
              <th className="bg-primary-900 text-white th-font">Drug Name</th>
              {/* <th className="bg-primary-900 text-white th-font">Strength</th> */}
              <th className="bg-primary-900 text-white th-font">Dose</th>
              <th className="bg-primary-900 text-white th-font">Qty</th>
              <th className="bg-primary-900 text-white th-font">Rpts</th>
              <th className="bg-primary-900 text-white th-font">Long Term</th>
              <th className="bg-primary-900 text-white th-font">End Date</th>
              <th className="bg-primary-900 text-white th-font text-center">
                Status
              </th>
              <th className="bg-primary-900 text-white th-font text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  <Loader
                    loaderContainerClass="h-50"
                    strokeWidth="4"
                    width="40"
                  />
                </td>
              </tr>
            ) : (
              <>
                {data.length > 0 ? (
                  paginatedData.map(
                    (prescription: IPrescriptionDetail, index) => (
                      <tr key={index}>
                        <td>
                          {prescription.prescription_type === "e_prescription"
                            ? "Electronic"
                            : "Paper"}
                        </td>
                        <td>{prescription.prescribed_recipe.name}</td>
                        {/* <td>
                      {prescription.prescribed_recipe.ingredients.length
                        ? prescription.prescribed_recipe.ingredients[0].strength
                        : ""}
                    </td> */}
                        <td>{prescription.dose}</td>
                        <td>{prescription.quantity}</td>
                        <td>{prescription.repeats}</td>
                        <td>
                          {prescription.prescription_duration === "once_only"
                            ? "No"
                            : "Yes"}
                        </td>
                        <td>
                          {moment(prescription.end_date).format("DD MMMM YYYY")}
                        </td>
                        <td className="align-middle text-center">
                          <span
                            className={`application_status_badge text-capitalize badge text-${prescription.prescription_status === "canceled" ? "danger" : "success"}-700 bg-${prescription.prescription_status === "canceled" ? "danger" : "success"}-50  `}
                            style={{
                              fontSize: "14px",
                              fontWeight: "700",
                            }}
                          >
                            {prescription.prescription_status}
                          </span>
                        </td>
                        <td className="text-center align-middle">
                          <SVG
                            src={Option}
                            className="cursor-pointer"
                            data-bs-toggle="dropdown"
                          />
                          <ul className="dropdown-menu hide-caret dropdown-menu-end">
                            {prescription.prescription_status !== "canceled" ? (
                              <li>
                                <a
                                  className="dropdown-item"
                                  style={{
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    lineHeight: "150%",
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#cancelScript"
                                  onClick={() =>
                                    setPrescriptionOID(prescription.oid)
                                  }
                                >
                                  Cancel
                                </a>
                              </li>
                            ) : (
                              ""
                            )}

                            <li>
                              <a
                                className="dropdown-item"
                                style={{
                                  cursor: "pointer",
                                  textAlign: "left",
                                  fontWeight: "600",
                                  lineHeight: "150%",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#prescriptionDetail"
                                onClick={() =>
                                  setPrescriptionOID(prescription.oid)
                                }
                              >
                                Paper script
                              </a>
                            </li>
                            {

                              import.meta.env.VITE_APP_ENV.includes("dev") ? <><li>
                                <a
                                  className="dropdown-item"
                                  style={{
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    lineHeight: "150%",
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#prescriptionQRCode"
                                  onClick={() =>
                                    setPrescriptionOID(prescription.oid)
                                  }
                                >
                                  QR script
                                </a>
                              </li></> : null
                            }
                            <li>
                            <a
                                className="dropdown-item"
                                style={{
                                  cursor: "pointer",
                                  textAlign: "left",
                                  fontWeight: "600",
                                  lineHeight: "150%",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#prescriptionSendScript"
                                onClick={() =>
                                  setPrescriptionOID(prescription.oid)
                                }
                              >
                                Send script
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      No Data
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>

      <BasicModal
        modalId="cancelScript"
        title={"Cancel Prescription?"}
        extraStyle={{}}
        refresh={false}
      >
        <CancelScriptModal
          p_oid={prescriptionOID}
          resetP_oid={() => {
            setPrescriptionOID("");
          }}
        />
      </BasicModal>
      <BasicModal
        modalId="prescriptionDetail"
        title={"Prescription"}
        extraStyle={{}}
        refresh={false}
        modalSize={"modal-lg"}
        onClose={() => setPrescriptionOID("")}
      >
        <PrescriptionDetail
          oid={prescriptionOID}
          setModalContent={() => { }}
          onClose={() => setPrescriptionOID("")}
          refresh={false}
        />
      </BasicModal>

      <BasicModal
        modalId="prescriptionQRCode"
        title={"E-Prescription"}
        extraStyle={{}}
        refresh={false}
        modalSize={"modal-lg"}
        onClose={() => setPrescriptionOID("")}
      >
        <QRAndBArCodeGenerate oid={prescriptionOID} />
      </BasicModal>

      <BasicModal
        modalId="prescriptionSendScript"
        title={"Send Prescription Email"}
        extraStyle={{}}
        refresh={false}
        modalSize={"modal-lg"}
        onClose={() => setPrescriptionOID("")}
      >
        <SendPrescriptionEmail
          oid={prescriptionOID}
        />
      </BasicModal>
    </>
  );
};

export default PrescriptionList;
