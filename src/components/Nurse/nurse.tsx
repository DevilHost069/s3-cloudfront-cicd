import "@assets/css/nurse_dashboard.css";

import Loader from "@components/shared/Loader";
import Pagination from "@components/widgets/Pagination";
import { useProfile } from "@contexts/ProfileContext";
import usePagination from "@hooks/usePagination";
import { useGetNurseConsultations } from "@server/Nurse/Nurse-Consulation/useGetNurseConsultations";
import { useMarkConsultationAsMissed } from "@server/Nurse/Nurse-Consulation/useMarkConsultationAsMissed";
import { useQueryClient } from "@tanstack/react-query";

import {
  consultation_doctor_assigned_value,
  consultation_missed_value,
  consultation_nurse_approved_status_value,
  consultation_pending_status_value,
  consultation_under_review_status_value,
  getConsultationStatus,
} from "@utils/constants";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import MobileNurseListItem from "./MobileNurseListItem";
import { Tooltip } from "@assets/index";

const NurseDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  /* The line `const profileContext = useProfile();` is using the `useProfile` hook to access the
  profile context. The profile context contains information about the currently logged-in user's
  profile. By calling `useProfile()`, the `profileContext` variable is assigned the value of the
  profile context, which can then be used to access the profile data. */
  const profileContext = useProfile();

  /* The line `const { data, refetch, isLoading } =
  useGetNurseConsultations(profileContext?.profile?.profile_id);` is using the
  `useGetNurseConsultations` hook to fetch nurse consultations data. */
  const { data, refetch, isLoading } = useGetNurseConsultations(
    profileContext?.profile?.profile_id,
  );
  console.log("data", JSON.stringify(data, null, 2));


  /* The line `const { paginatedData, currentPage, totalPages, onPageChange } = usePagination({ data
  });` is using the `usePagination` hook to handle pagination functionality. */
  const { paginatedData, currentPage, totalPages, onPageChange } =
    usePagination({ data, isLoading });

  /* The `markAsMissed` variable is created using the `useMarkConsultationAsMissed` hook. This hook is
  used to mark a consultation as missed. It takes an object as an argument with the
  `consultation_status` set to `consultation_missed_value` and the `msg` set to "Consultation marked
  as missed". This hook is used to update the status of a consultation to "missed" when the
  corresponding action is triggered. */
  const markAsMissed = useMarkConsultationAsMissed({
    consultation_status: consultation_missed_value,
    msg: "Consultation marked as missed",
  });

  /* The `markAsUnderReview` variable is created using the `useMarkConsultationAsMissed` hook. This hook
  is used to mark a consultation as "under review". It takes an object as an argument with the
  `consultation_status` set to `consultation_under_review_status_value` and the `msg` set to
  "Consultation marked as under review". This hook is used to update the status of a consultation to
  "under review" when the corresponding action is triggered. */
  const markAsUnderReview = useMarkConsultationAsMissed({
    consultation_status: consultation_under_review_status_value,
    msg: "Consultation marked as under review",
  });

  /**
   * The function `onReviewClick` navigates to a specific URL based on the provided parameters.
   * @param {any} oid - The `oid` parameter represents the consultation OID (Object ID).
   * @param {any} patient_oid - The `patient_oid` parameter is the unique identifier for the patient.
   * @param {any} nurse_oid - The `nurse_oid` parameter is the unique identifier for the nurse.
   * @param {any} id - The `id` parameter is a unique identifier for the consultation.
   */
  const onReviewClick = (
    oid: any,
    patient_oid: any,
    nurse_oid: any,
    id: any,
    prescriber_oid: any,
  ) => {
    queryClient.resetQueries();
    navigate(
      `/nurse/consultation/?nurse_oid=${nurse_oid}&patient_oid=${patient_oid}&consultation_oid=${oid}&c_id=${id}&prescriber_oid=${prescriber_oid}`,
    );
  };

  /* The code block `if (profileContext.isLoading || isLoading) {
      return <Loader />;
    }` is checking if the profile context is still loading or if the nurse consultations data is
  still loading. If either of them is still loading, it returns a `Loader` component, which is
  typically used to display a loading spinner or animation to indicate that the data is being
  fetched. This ensures that the loader is displayed until the necessary data is loaded and ready to
  be rendered on the page. */
  if (profileContext.isLoading || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className="col-12"
        style={{
          padding: "40px 24px",
        }}
      >
        <table className="table table-striped table-bordered border-slate-400 rounded-2 overflow-hidden d-none d-md-table">
          <thead>
            <tr>
              <th className="bg-primary-900 text-white th-font">Patient Id</th>
              <th className="bg-primary-900 text-white th-font">
                Patient Full Name
              </th>
              <th className="bg-primary-900 text-white th-font">
                Assigned Prescriber
              </th>
              <th className="bg-primary-900 text-white th-font">
                Consultation Date/Time
              </th>
              <th className="bg-primary-900 text-white th-font">
                Application Status
              </th>
              <th className="bg-primary-900 text-white text-center th-font">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item, index) => (
              <tr key={index} className="">
                <td
                  style={{
                    color: "#374151",
                  }}
                >
                  {" "}
                  #{item.patient_internal_id}
                </td>
                <td>
                  <div className="d-flex flex-column ">
                    <div className="td-font">
                      {item.patient_full_name} &nbsp;
                      {
                        item.is_qualified ?
                          null :
                          <img
                            className="cursor_pointer"
                            src={Tooltip}
                            alt="plus"
                            height="20px"
                            width="20px"

                            title="Unqualified Patient" />
                      }
                    </div>
                    <div className=" td-sm-font">{item.patient_email}</div>
                    {/*  className="td-font pill" */}
                    {/* <div className={
                      item.is_qualified
                        ? "td-font"
                        : "td-font pill"

                    }>{item.is_qualified ? null : "Unqualified"}</div> */}
                  </div>
                </td>
                <td>
                  {item?.prescriber_consultation !== null
                    ? item?.prescriber_consultation.prescriber_full_name
                    : "-"}
                </td>
                <td>
                  <div className="d-flex flex-column">
                    <div className="td-font">
                      {item?.prescriber_consultation?.start_time !== undefined
                        ? moment(
                          item?.prescriber_consultation?.start_time,
                        ).format("DD MMMM YYYY")
                        : moment(item?.start_time).format("DD MMMM YYYY")}
                    </div>
                    <div className="td-sm-font">
                      {item?.prescriber_consultation?.start_time !== undefined
                        ? moment(
                          item?.prescriber_consultation?.start_time,
                        ).format("h:mm A")
                        : moment(item?.start_time).format("h:mm A")}
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <span
                    className={`application_status_badge badge text-${getConsultationStatus(item)?.class
                      }-700 bg-${getConsultationStatus(item)?.class}-50  `}
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {getConsultationStatus(item)?.displayText}
                  </span>
                </td>
                <td>
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

                            item.consultation_status ===
                              consultation_pending_status_value
                              ? markAsUnderReview.mutate(item.oid)
                              : null;
                          }}
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
                              onClick={() => {
                                markAsMissed.mutate(item.oid);
                                if (markAsMissed.isSuccess) {
                                  refetch();
                                }
                              }}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-block d-md-none">
          {paginatedData?.map((item, index) => (
            <MobileNurseListItem
              key={index}
              item={item}
              markAsMissed={() => {
                markAsMissed.mutate(item.oid);
                if (markAsMissed.isSuccess) {
                  refetch();
                }
              }}
              onReviewClick={() => {
                onReviewClick(
                  item?.oid,
                  item?.patient_oid,
                  item?.nurse_oid,
                  item?.id,
                  item?.prescriber_consultation !== null
                    ? item?.prescriber_consultation?.oid
                    : "null",
                );

                item.consultation_status === consultation_pending_status_value
                  ? markAsUnderReview.mutate(item.oid)
                  : null;
              }}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default NurseDashboard;
