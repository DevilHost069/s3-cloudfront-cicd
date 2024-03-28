import {
  consultation_doctor_assigned_value,
  consultation_missed_value,
  consultation_nurse_approved_status_value,
  getConsultationStatus,
} from "@utils/constants";
import moment from "moment";

const MobileNurseListItem = ({ item, onReviewClick, markAsMissed }) => {
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
          <div className="col-6 fw-bold">Assigned Prescriber:</div>
          <div className="col-6">
            {item?.prescriber_consultation !== null
              ? item?.prescriber_consultation.prescriber_full_name
              : "-"}
          </div>
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
              {item.consultation_status !== consultation_missed_value ? (
                <>
                  <div
                    className={
                      item.consultation_status ===
                        consultation_nurse_approved_status_value ||
                      item.consultation_status ===
                        consultation_doctor_assigned_value
                        ? " w-full"
                        : "btn-group w-full"
                    }
                  >
                    <button
                      className="btn btn-outline-primary w-full"
                      type="button"
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                      onClick={onReviewClick}
                    >
                      {item?.prescriber_consultation?.consultation_status
                        ? "View"
                        : "Review"}{" "}
                      Application
                    </button>
                    {item.consultation_status !==
                      consultation_nurse_approved_status_value &&
                    item.consultation_status !==
                      consultation_doctor_assigned_value ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{
                            cursor: "pointer",
                            textAlign: "center",
                            fontWeight: "600",
                          }}
                        >
                          <span className="visually-hidden">
                            Toggle Dropdown
                          </span>
                        </button>
                      </>
                    ) : null}

                    <ul className="dropdown-menu min-w-full">
                      <li>
                        <a
                          className="dropdown-item"
                          style={{
                            cursor: "pointer",
                            textAlign: "left",
                            fontWeight: "600",
                            lineHeight: "150%",
                          }}
                          onClick={markAsMissed}
                        >
                          Mark as Missed
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-primary w-full"
                  style={{
                    // cursor: "not-allowed",
                    fontWeight: "600",
                    lineHeight: "150%",
                  }}
                  onClick={() => {
                    onReviewClick(
                      item?.oid,
                      item?.patient_oid,
                      item?.nurse_oid,
                      item?.id,
                      item?.prescriber_consultation !== null
                        ? item?.prescriber_consultation?.oid
                        : "null",
                    );
                  }}
                >
                  {item?.prescriber_consultation?.consultation_status ||
                  item.consultation_status === consultation_missed_value
                    ? "View"
                    : "Review"}
                  Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNurseListItem;
