import { SuccessIcon } from "@assets/index";
import Alert from "@components/Alert";
import { useLocalStorageAlert } from "@hooks/useAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useColors } from "@utils/tenant_configuration";


export default function BookPatientSuccess() {
  const { alerted, crossClick } = useLocalStorageAlert();
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      {alerted === "true" ? (
        <Alert
          crossClick={crossClick}
          style={{}}
          msg="Your booking has been successfully placed. You can track your update on your dashboard."
        />
      ) : null}
      <div
        className="row"
        style={{
          paddingTop: "10rem",
        }}
      >
        <div
          className="card text-center"
          style={{
            height: "408px",
            width: "710px",
            // center content
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="card-body p-5">
            <img
              src={SuccessIcon}
              alt="booking"
              className="img-fluid"
              style={{
                width: "160px",
                height: "160px",
                objectFit: "cover",
                marginBottom: "4rem",
              }}
            />

            <div className="">
              <button
                className=""
                onClick={goToDashboard}
                style={{
                  height: "48px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "4px",
                  backgroundColor: `${primaryColor}`,
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {" "}
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
