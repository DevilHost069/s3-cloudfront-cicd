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
  style?: CSSProperties;
};

const DisabledButton: FunctionComponent<IButton> = ({
  button,
  type = "button",
  id = "button",
  onClick,
  style,
}) => {
  return (
    <button
      type={type}
      id={id}
      className="button"
      onClick={onClick}
      disabled
      style={style}
    >
      {button}
    </button>
  );
};

export default DisabledButton;
