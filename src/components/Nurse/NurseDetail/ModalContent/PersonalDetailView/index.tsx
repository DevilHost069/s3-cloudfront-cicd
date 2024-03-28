import "@assets/css/personal_detail_view_label.css";
import { IPatientDetailsBYOid } from "../../main";

type IProps = {
  patientDetail: IPatientDetailsBYOid;
};

export default function PersonalDetailView({ patientDetail }: IProps) {
  const { data } = patientDetail as IPatientDetailsBYOid;

  const styler = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties;
  return (
    <>
      <div className="medical_view">
        <div
          className=" custom-scrollbar"
          style={{
            display: "flex",
            padding: "10px",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "10px",
            alignSelf: "stretch",
            overflowX: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          <div className="" style={styler}>
            <span className="personal_detail_view_name">Patient Name:</span>
            <span className="text-gray-900 personal_detail_view_label">
              {data?.first_name} {data?.last_name}
            </span>
          </div>
          <div className="" style={styler}>
            <span className="personal_detail_view_name">Phone Number:</span>
            <span className="text-gray-900 personal_detail_view_label">
              {data?.phone_number}
            </span>
          </div>
          <div className="" style={styler}>
            <span className="personal_detail_view_name">Medicare Num:</span>
            <span className="text-gray-900 personal_detail_view_label">
              {data?.medicare_number}
            </span>
          </div>
          <div className="" style={styler}>
            <span className="personal_detail_view_name">DOB:</span>
            <span className="text-gray-900 personal_detail_view_label">
              {data?.dob ? new Date(data?.dob).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <div className="" style={styler}>
            <span className="personal_detail_view_name">Gender:</span>
            <span className="text-gray-900 personal_detail_view_label text-capitalize">
              {data?.gender}
            </span>
          </div>
          <div className="" style={styler}>
            <span className="personal_detail_view_name">Email:</span>
            <span className="text-gray-900 personal_detail_view_label">
              {data?.email}
            </span>
          </div>
          <div className="" style={styler}>
            <span className="personal_detail_view_name">Address:</span>
            <span className="text-gray-900 personal_detail_view_label">
              {data?.address}
            </span>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        data-bs-dismiss="modal"
        style={{ float: "right", marginTop: "10px", height: "48px" }}
      >
        Close
      </button>
    </>
  );
}
