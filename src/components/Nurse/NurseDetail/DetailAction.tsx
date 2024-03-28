import CustomCard from "@components/Card";
import Button from "@components/widgets/Button";
import { INurseConsulationDetails, IPatientDetailsBYOid } from "./main";
import {
  consultation_doctor_assigned_value,
  consultation_missed_value,
  convertDate,
  getConsultationStatus,
} from "@utils/constants";
import { Toaster } from "@components/shared/Toaster";
import { usePostDebit } from "@server/Nurse/Nurse-Consulation/useDebit";
import { useSearchParams } from "react-router-dom";
import useRedirectURL from "../../../store/redirectUrl";

type IDetailAction = {
  details: INurseConsulationDetails;
  missed: any;
  patientDetail: IPatientDetailsBYOid;
  nurseApproved: any;
  setTitle: (title: string) => void;
  setModalContent: (content: string) => void;
  checkDataofPersonalDetail: boolean;
  checkDataofMedicalDetail: boolean;
  setDetailFilled: (value: boolean) => void;
};

export default function DetailAction({
  details,
  missed,
  patientDetail,
  nurseApproved,
  setTitle,
  setModalContent,
  checkDataofPersonalDetail,
  checkDataofMedicalDetail,
  setDetailFilled,
}: IDetailAction) {
  const { data } = details;
  const [params, setParams] = useSearchParams();
  const consulationOid = params.get("consultation_oid");
  const url = window.location.host;
  const successURL = `http://${url}/dashboard?status=success`;
  const cancelURL = `http://${url}/dashboard?status=cancel`;
  const errorURL = `http://${url}/dashboard?status=error`;

  const debit = usePostDebit();
  const addURL = useRedirectURL();

  const paymentStatus = ["unpaid", "failed", "pending"];

  const onProceedClicked = () => {
    debit.mutate(
      {
        success_url: successURL,
        cancel_url: cancelURL,
        error_url: errorURL,
        consulation_id: consulationOid,
      },
      {
        onSuccess: (data: any) => {
          // setRedirectUrl(data.redirectUrl);
          addURL.setUrl(data.redirectUrl);
        },
        onError: (error: any) => {
          Toaster({
            status: "error",
            message: "Error in payment. Please try again.",
          });
        },
      }
    );
  };

  const onPaymentClick = () => {
    setTitle("Proceed to Payment");
    setModalContent("make_payment");
    onProceedClicked();
  };

  const onAssignDoctorClick = () => {
    setTitle("Assign Doctor");
    setModalContent("assign_doctor");
  };

  const notAssignable = () => {
    setDetailFilled(true);
  };

  const approved = (oid: string) => {
    nurseApproved.mutate(oid);
    details.refetch();
  };

  const onApproveClick = (oid: string) => {
    return checkDataofPersonalDetail || checkDataofMedicalDetail
      ? notAssignable()
      : approved(oid);
  };

  console.log("data", data?.payment_status);

  return (
    <>
      <CustomCard title={"Detail & Actions"}>
        <div className="row ">
          <div className="col-12 col-md-12 col-xl-6 w-full">
            <div className="d-flex justify-content-between justify-content-md-start mb-2">
              <div className="card-key text-gray-500 me-2">Patient Id:</div>
              <div className="card-item-value text-gray-950">
                {patientDetail?.data?.patient_internal_id}
              </div>
            </div>
            <div className="d-flex justify-content-between justify-content-md-start mb-2">
              <div className="card-key text-gray-500 me-2">
                Appointment Date/Time :
              </div>
              <div className="">
                <div className="card-item-value text-gray-950">
                  {data?.prescriber_consultation?.start_time !== undefined
                    ? convertDate(data.prescriber_consultation.start_time).date
                    : convertDate(data.start_time).date}
                </div>
                <div className="card-item-value text-gray-500 text-end text-md-start">
                  {/* {convertDate(data.created_at).time} */}
                  {data?.prescriber_consultation?.start_time !== undefined
                    ? convertDate(data.prescriber_consultation.start_time).time
                    : convertDate(data.start_time).time}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between justify-content-md-start d-md-none mb-2 align-items-center">
              <div
                className="card-item-title text-gray-500 me-2"
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  lineHeight: "150%",
                }}
              >
                Application Status :
              </div>
              <div
                className={`badge text-${
                  getConsultationStatus(data)?.class
                }-700 bg-${getConsultationStatus(data)?.class}-50 application_status_badge  `}
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
          <div className="col-12 col-md-12 col-lg-12 col-xl-6 w-full">
            <div className="row w-full">
              <div className="col d-flex justify-content-end">
                <div className="d-flex flex-column align-items-center text-gray-500 d-none d-md-block">
                  <div
                    className="mt-3 mb-1"
                    style={{
                      fontWeight: "600",
                      fontSize: "12px",
                      gap: "5px",
                      textAlign: "center",
                      lineHeight: "150%",
                    }}
                  >
                    Application Status
                  </div>
                  <div
                    className={
                      [
                        consultation_missed_value,
                        consultation_doctor_assigned_value,
                      ].includes(data.consultation_status)
                        ? "d-flex justify-content-end"
                        : ""
                    }
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        lineHeight: "150%",
                      }}
                      className={`application_status_badge badge text-${
                        getConsultationStatus(data)?.class
                      }-700 bg-${getConsultationStatus(data)?.class}-50 `}
                    >
                      {getConsultationStatus(data)?.displayText}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  [
                    consultation_missed_value,
                    consultation_doctor_assigned_value,
                  ].includes(data.consultation_status)
                    ? "col-12"
                    : "col"
                }
              >
                {data.consultation_status ===
                  "consultation_nurse_approved_status" &&
                data?.payment_status == "paid" ? (
                  <>
                    {" "}
                    <div className="mt-3 w-full">
                      <button
                        // data-bs-toggle="modal"
                        data-bs-toggle={
                          checkDataofPersonalDetail || checkDataofMedicalDetail
                            ? ""
                            : "modal"
                        }
                        data-bs-target="#myModal"
                        onClick={
                          checkDataofPersonalDetail || checkDataofMedicalDetail
                            ? notAssignable
                            : onAssignDoctorClick
                        }
                        className="detail-button primary-button px-2 px-md-3 max-w-md-full"
                      >
                        Assign Doctor
                      </button>
                    </div>
                  </>
                ) : null}
                {data.consultation_status ===
                  "consultation_nurse_approved_status" &&
                ["unpaid", "failed", "pending"].includes(
                  data?.payment_status
                ) ? (
                  <>
                    {" "}
                    <div className="mt-3 w-full">
                      <button
                        // data-bs-toggle="modal"
                        data-bs-toggle={
                          checkDataofPersonalDetail || checkDataofMedicalDetail
                            ? ""
                            : "modal"
                        }
                        data-bs-target="#myModal"
                        onClick={() => {
                          onPaymentClick();
                        }}
                        className="detail-button primary-button px-2 px-md-3 max-w-md-full"
                      >
                        Make Payment
                      </button>
                    </div>
                  </>
                ) : null}
                {data.consultation_status ===
                "consultation_under_review_status" ? (
                  <>
                    <div
                      className="w-full d-flex"
                      style={{
                        paddingTop: "18px",
                      }}
                    >
                      <Button
                        id=""
                        button="Missed"
                        type="submit"
                        className="detail-button danger-button"
                        onClick={() => {
                          missed.mutate(data?.oid);
                          details.refetch();
                        }}
                        style={{
                          height: "48px",
                        }}
                      />
                      <span className="me-3" />
                      <Button
                        id=""
                        button="Approve Application"
                        type="submit"
                        className=" detail-button primary-button"
                        onClick={() => onApproveClick(data?.oid)}
                        style={{
                          lineHeight: "1",
                          height: "48px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* END OF DETAIL AND SECTION */}
      </CustomCard>
    </>
  );
}
