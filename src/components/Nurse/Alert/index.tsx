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
  bgColor = "bg-danger-50",
  textColor = "danger-900",
}: IAlert) => {
  return (
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
        <span style={style}>{msg}</span>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            crossClick();
          }}
        />
      </div>
    </div>
  );
};

export default Alert;
