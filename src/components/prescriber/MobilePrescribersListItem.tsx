import {
  getConsultationStatus,
  precriber_missed_status,
  prescriber_prescribed_status,
  prescriber_rejected_status,
} from "@utils/constants";
import moment from "moment";

const MobilePrescribersListItem = ({ item, onClick }) => {
  const cardStyle = {
    display: "flex",
    padding: "10px 20px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  };
  return (
    <div className="card w-100 card_space mb-2">
      <div className="card-body custom-scrollbar">
        <div className="row mb-1">
          <div className="col-6 fw-bold">Patient Number:</div>
          <div className="col-6">#{item.patient_internal_id}</div>
        </div>
        <div className="row mb-1">
          <div className="col-6 fw-bold">Patient Full Name:</div>
          <div className="col-6">
            {item.patient_full_name}
            <p className="td-sm-font">{item.patient_email}</p>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col-6 fw-bold">Approved By (Nurse):</div>
          <div className="col-6">{item.nurse_full_name}</div>
        </div>
        <div className="row mb-1">
          <div className="col-6 fw-bold">Consultation Date/Time:</div>
          <div className="col-6">
            <div className="d-flex flex-column">
              <div className="td-font">
                {moment(item?.booked_date_time).format("DD MMMM YYYY")}
              </div>
              <div className="td-sm-font">
                {moment(item?.booked_date_time).format("h:mm A")}
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6 fw-bold">Application Status:</div>
          <div className="col-6">
            <div className="align-middle">
              <span
                className={`application_status_badge badge text-${
                  getConsultationStatus(item)?.class
                }-700 bg-${getConsultationStatus(item)?.class}-50  `}
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                {getConsultationStatus(item)?.displayText}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="btn-group w-full d-flex justify-content-end">
              {![
                precriber_missed_status,
                prescriber_rejected_status,
                prescriber_prescribed_status,
              ].includes(item?.consultation_status) ? (
                <>
                  <button
                    onClick={onClick}
                    type="button"
                    className="btn btn-outline-primary w-full"
                    style={{
                      // cursor:"not-allowed",
                      fontWeight: "600",
                      lineHeight: "150%",
                    }}
                  >
                    Reiew Application
                  </button>
                </>
              ) : (
                <button
                  onClick={onClick}
                  type="button"
                  className="btn btn-outline-primary w-full"
                  style={{
                    // cursor:"not-allowed",
                    fontWeight: "600",
                    lineHeight: "150%",
                  }}
                >
                  View Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePrescribersListItem;
