import { useAlert } from "@contexts/AlertContext";

type IAlert = {
  msg: string;
  style: any;
  crossClick: () => void;
  bgColor?: string;
  textColor?: string;
};

const Alert = ({
  msg = "",
  style,
  crossClick,
  bgColor = "bg-success-50",
  textColor = "text-success-900",
}: IAlert) => {
  const alertContext = useAlert();
  return alertContext.message ? (
    <div
      className={`
        alert alert-dismissible fade show ${bgColor} text-${textColor} px-0
        `}
      role="alert"
      style={{
        marginBottom: "-4rem",
      }}
    >
      <div className="container-fluid text-center">
        <span style={style}>{msg !== "" ? msg : alertContext.message}</span>
        <button
          type="button"
          className="btn-close me-4"
          onClick={() => {
            localStorage.removeItem("alert");
            crossClick();
          }}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default Alert;
