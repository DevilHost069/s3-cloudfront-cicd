import Loader from "@components/shared/Loader";
import Pagination from "@components/widgets/Pagination";
import usePagination from "@hooks/usePagination";
import { useGetunQualifiedPatients } from "@server/patient/unQualifiedPatient";
import moment from "moment";

export default function UnQualifiedPatient() {
  const { data, isLoading } = useGetunQualifiedPatients();

  const { paginatedData, currentPage, totalPages, onPageChange } =
    usePagination({ data, isLoading });

  if (isLoading) {
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
                Phone_number
              </th>
              <th className="bg-primary-900 text-white th-font">Created At</th>
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
                      {item.first_name} {item.last_name}
                    </div>
                    <div className=" td-sm-font">{item.email}</div>
                  </div>
                </td>

                <td>
                  <div className="d-flex flex-column">
                    <div className="td-font">{item.phone_number}</div>
                  </div>
                </td>

                <td>
                  <div className="d-flex flex-column">
                    <div className="td-font">
                      {moment(item?.created_at).format("DD MMMM YYYY")}
                    </div>
                    <div className="td-sm-font">
                      {moment(item?.created).format("h:mm A")}
                    </div>
                  </div>
                </td>
                {/* <td className="align-middle">
                                    <span
                                        className={`application_status_badge badge text-${getConsultationStatus(
                                            item
                                        )?.class}-700 bg-${getConsultationStatus(item)
                                            ?.class}-50  `}
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        {getConsultationStatus(item)?.displayText}
                                    </span>
                                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="d-block d-md-none">
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
                                        : "null"
                                );

                                item.consultation_status === consultation_pending_status_value
                                    ? markAsUnderReview.mutate(item.oid)
                                    : null;
                            }}
                        />
                    ))}
                </div> */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
