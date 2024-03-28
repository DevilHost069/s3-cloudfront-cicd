import { Eye, Pencil } from "@assets/index";
import CustomCard from "@components/Card";
import { INurseConsulationDetails, IPatientDetailsBYOid } from "./main";
import {
  consultation_doctor_assigned_value,
  consultation_missed_value,
  consultation_nurse_approved_status_value,
  consultation_under_review_status_value,
} from "@utils/constants";
import { usePlacesWidget } from "react-google-autocomplete";

type IProps = {
  setTitle: (title: string) => void;
  setModalContent: (content: string) => void;
  patientDetail: IPatientDetailsBYOid;
  editable?: boolean;
  details?: INurseConsulationDetails;
};

export default function PersonalDetail({
  setTitle,
  setModalContent,
  patientDetail,
  editable = true,
  details,
}: IProps) {
  const { data } = patientDetail;

  const status = details?.data?.consultation_status;
  const isDoctorAssigned = status === consultation_doctor_assigned_value;
  const isConsultationMissed = status === consultation_missed_value;
  const isUnderReview = status === consultation_under_review_status_value;
  const isNurseApproved = status == consultation_nurse_approved_status_value;

  function switchLogo() {
    switch (true) {
      case isConsultationMissed:
        return null;
      case isDoctorAssigned:
        return null;
      case editable:
        return Pencil;
      case isUnderReview:
        return Pencil;
      case isNurseApproved:
        return Pencil;
      default:
        return null;
    }
  }

  /**
   * The function "openCloseModal" sets the title to "Personal Details" and the modal content to
   * "personal_detail".
   */
  const openCloseEditModal = () => {
    setTitle("Personal Details");
    setModalContent("personal_detail");
  };

  const openCloseViewModal = () => {
    setTitle("Personal Details");
    setModalContent("personal_detail_view");
  };
  return (
    <>
      <div className="main-detail">
        <CustomCard
          title={"Personal Details"}
          src={switchLogo()}
          onClick={
            isConsultationMissed || isDoctorAssigned
              ? openCloseViewModal
              : openCloseEditModal
          }
        >
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">Patient Name:</div>
            <div className="col-6 card-value text-gray-950">
              {data?.first_name} {data?.last_name}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">Phone Number:</div>
            <div className="col-6 card-value text-gray-950">
              {data?.phone_number || "N/A"}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">Medicare No:</div>
            <div className="col-6 card-value text-gray-950">
              {
                // data?.medicare_number?.replace(/(\d{4})(\d{5})(\d{1})/, '$1 $2 $3').trim() || "N/A"
                data?.medicare_number === null
                  ? "N/A"
                  : data?.medicare_number
                    ?.replace(/(\d{4})(\d{5})(\d{1})/, "$1 $2 $3")
                    .trim()
              }
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">IHI Number:</div>
            <div className="col-6 card-value text-gray-950">
              {data?.health_identifier === null
                ? "N/A"
                : data?.health_identifier.replace(/(.{4})/g, "$1 ")}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">
              Medicare Reference No:
            </div>
            <div className="col-6 card-value text-gray-950">
              {
                // data?.medicare_reference_number || "N/A"
                data?.medicare_reference_number === null
                  ? "N/A"
                  : data?.medicare_reference_number
              }
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">
              Medicare Expiry Date:
            </div>
            <div className="col-6 card-value text-gray-950">
              {
                // data?.medicare_expiry_date || "N/A"
                data?.medicare_expiry_date === null
                  ? "N/A"
                  : data?.medicare_expiry_date
              }
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">Previous GP:</div>
            <div className="col-6 card-value text-gray-950">
              {
                data?.previous_gp === null || data?.previous_gp === ""
                  ? "N/A"
                  : data?.previous_gp
              }
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">Date of Birth:</div>
            <div className="col-6 card-value text-gray-950">
              {data?.dob ? new Date(data?.dob).toLocaleDateString() : "N/A"}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">Gender:</div>
            <div className="col-6 card-value text-gray-950 text-capitalize">
              {data?.gender || "N/A"}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">Email:</div>
            <div className="col-6 card-value text-gray-950">
              {data?.email || "N/A"}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6 card-key text-gray-500">Address:</div>
            <div className="col-6 card-value text-gray-950">
              {data?.address || "N/A"}
            </div>
          </div>
        </CustomCard>
      </div>
    </>
  );
}
