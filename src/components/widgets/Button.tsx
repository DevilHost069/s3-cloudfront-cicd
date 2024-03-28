import { FunctionComponent, type CSSProperties } from "react";

type IButton = {
  button?: string;
  /** Style props */
  stylePrimarySmallFalseDaBackgroundColor?: CSSProperties["backgroundColor"];
  stylePrimarySmallFalseDaBorder?: CSSProperties["border"];
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  formik?: any;
  id: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  dataBsDismiss?: string;
};

const Button: FunctionComponent<IButton> = ({
  button,
  type = "button",
  id = "button",
  onClick,
  disabled = false,
  style,
  className = "button",
  dataBsDismiss = "",
}) => {
  return (
    <button
      type={type}
      id={id}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={style}
      data-bs-dismiss={dataBsDismiss}
    >
      {button}
    </button>
  );
};

export default Button;
