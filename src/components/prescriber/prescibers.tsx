import Loader from "@components/shared/Loader";
import Pagination from "@components/widgets/Pagination";
import { useProfile } from "@contexts/ProfileContext";
import usePagination from "@hooks/usePagination";
import { useMarkConsultationAsMissedPrescriber } from "@server/prescriber/Prescriber-Consultation/useMarkConsultationAsMissed";
import {
  IConsulationPrescriberList,
  UseGetPrescriberWithRespectToTenantByConsulationPrescriberOid,
} from "@server/prescriber/UseGetPrescriberWithRespectToTenantByConsulationPrescriberOid";
import { useQueryClient } from "@tanstack/react-query";

import {
  getConsultationStatus,
  precriber_missed_status,
  prescriber_prescribed_status,
  prescriber_rejected_status,
  prescriber_under_review_status,
} from "@utils/constants";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobilePrescribersListItem from "./MobilePrescribersListItem";

type IPrescribersRes = {
  data: IConsulationPrescriberList[] | undefined;
  isError: boolean | undefined;
  isLoading: boolean | undefined;
  refetch: () => Promise<any>;
};
type IListType = "all" | "rejected" | "prescribed";
export default function Prescibers() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [listType, setListType] = useState<IListType>("all");
  const [paddingTop, setPAddingTOp] = useState("2.5rem");
  const location = useLocation();
  const path = location.pathname;
  const profileContext = useProfile();
  var preciber_oid = profileContext.profile.profile_id;

  const prescribers =
    UseGetPrescriberWithRespectToTenantByConsulationPrescriberOid(
      preciber_oid
    ) as IPrescribersRes;

  const { data, isLoading } = prescribers;

  const onReviewClick = (
    oid: any,
    patient_oid: any,
    nurse_oid: any,
    id: any,
    prescriber_oid: any,
    prescription_oid: any
  ) => {
    queryClient.resetQueries();
    navigate(
      `/prescriber/consultation/?nurse_oid=${nurse_oid}&patient_oid=${patient_oid}&consultation_oid=${oid}&c_id=${id}&prescriber_oid=${prescriber_oid}&prescription_oid=${prescription_oid}`
    );
  };

  const markAsMissed = useMarkConsultationAsMissedPrescriber({
    msg: "Consultation marked as missed",
  });
  const markAsUnderReview = useMarkConsultationAsMissedPrescriber({
    consultation_status: prescriber_under_review_status,
    msg: "",
  });
  const onMarkAsMissedClick = (oid: string) => {
    markAsMissed.mutate(oid);
  };

  const getFilteredConsultations = useMemo(() => {
    switch (path) {
      case "/dashboard": {
        return data.filter(
          (i) =>
            ![
              prescriber_rejected_status,
              prescriber_prescribed_status,
            ].includes(i.consultation_status)
        );
      }
      case "/rejected-patients": {
        return data.filter(
          (i) => i.consultation_status === prescriber_rejected_status
        );
      }
      case "/prescribed-patients": {
        return data.filter(
          (i) => i.consultation_status === prescriber_prescribed_status
        );
      }

      default:
        return [];
    }
  }, [data, path]);

  useEffect(() => {
    if (
      ["/dashboard", "/rejected-patients", "/prescribed-patients"].includes(
        path
      )
    ) {
      switch (path) {
        case "/dashboard": {
          setListType("all");
          setPAddingTOp("2.5rem");
          break;
        }
        case "/rejected-patients": {
          setListType("rejected");
          setPAddingTOp("3.225rem");
          break;
        }
        case "/prescribed-patients": {
          setListType("prescribed");
          setPAddingTOp("3.225rem");
          break;
        }
      }
    }
  }, [path]);

  /* The line `const { paginatedData, currentPage, totalPages, onPageChange } = usePagination({ data
});` is using the `usePagination` hook to handle pagination functionality. */
  const { paginatedData, currentPage, totalPages, onPageChange } =
    usePagination({ data: getFilteredConsultations });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div
        className={`col-12 p-md-30-24 ${listType === "all" ? "pt-prescriber-assigned-list" : "pt-prescriber-list"}`}
      >
        <table className="table table-striped table-bordered border-slate-400 rounded-2 overflow-hidden d-none d-md-table">
          <thead>
            <tr>
              <th className="bg-primary-900 text-white th-font">Patient Id</th>
              <th className="bg-primary-900 text-white th-font">
                Patient Full Name
              </th>
              <th className="bg-primary-900 text-white th-font">
                Approved By (Nurse)
              </th>
              <th className="bg-primary-900 text-white th-font">
                Consultation Date/Time
              </th>
              {!["prescribed", "rejected"].includes(listType) ? (
                <th className="bg-primary-900 text-white th-font">
                  Application Status
                </th>
              ) : (
                ""
              )}
              <th className="bg-primary-900 text-white text-center th-font">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item: any, index) => (
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
                    <div className="td-font">{item.patient_full_name}</div>
                    <div className=" td-sm-font">{item.patient_email}</div>
                  </div>
                </td>
                <td> {item.nurse_full_name}</td>
                <td>
                  <div className="d-flex flex-column">
                    <div className="td-font">
                      {moment(item?.start_time).format("DD MMMM YYYY")}
                    </div>
                    <div className="td-sm-font">
                      {moment(item?.start_time).format("h:mm A")}
                    </div>
                  </div>
                </td>
                {!["prescribed", "rejected"].includes(listType) ? (
                  <td className="align-middle">
                    <span
                      className={`application_status_badge badge text-${
                        getConsultationStatus(item)?.class
                      }-700 bg-${getConsultationStatus(item)?.class}-50  `}
                    >
                      {getConsultationStatus(item)?.displayText}
                    </span>
                  </td>
                ) : (
                  ""
                )}
                <td>
                  <div className="btn-group w-full">
                    {![
                      precriber_missed_status,
                      prescriber_rejected_status,
                      prescriber_prescribed_status,
                    ].includes(item?.consultation_status) ? (
                      <>
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
                              "null",
                              item?.id,
                              item?.prescriber_oid,
                              item?.prescriptions?.oid
                            );
                            markAsUnderReview.mutate(item?.oid);
                          }}
                        >
                          Review Application
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary  dropdown-toggle dropdown-toggle-split"
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
                        <ul className="dropdown-menu min-w-full">
                          <li>
                            <a
                              className="dropdown-item "
                              style={{
                                cursor: "pointer",
                                textAlign: "left",
                                fontWeight: "600",
                                lineHeight: "150%",
                              }}
                              onClick={() => onMarkAsMissedClick(item?.oid)}
                            >
                              Mark as Missed
                            </a>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          onReviewClick(
                            item?.oid,
                            item?.patient_oid,
                            "null",
                            item?.id,
                            item?.prescriber_oid,
                            item?.prescriptions?.oid
                          );
                          markAsUnderReview;
                        }}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-block d-md-none">
          {paginatedData.map((item, index) => (
            <MobilePrescribersListItem
              item={item}
              key={index}
              onClick={() => {
                onReviewClick(
                  item?.oid,
                  item?.patient_oid,
                  "null",
                  item?.id,
                  item?.prescriber_oid,
                  item?.prescriptions?.oid
                );
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
}
