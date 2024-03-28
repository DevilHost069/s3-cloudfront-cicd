import { FunctionComponent, useMemo, type CSSProperties } from "react";

type TextInputType = {
  /** Style props */
  id?: string;
  textInputBorder?: CSSProperties["border"];
  type?:
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "textarea"
  placeholder?: string;
  formik?: any;
  className?: string;
  onFocus?: (event: any) => void;
  autoComplete?: string;
  onChange?: (event: any) => void;
  value?: string;
  maxLength?: number;
  max?: number;
};

const handleFocus = (event: any) => {
  const { target } = event;
  setTimeout(() => target.select(), 0);
};

const TextInput: FunctionComponent<TextInputType> = ({
  textInputBorder,
  type = "text",
  placeholder = "",
  className = "text-input mb-4",
  onFocus = handleFocus,
  formik,
  autoComplete = "off",
  onChange,
  value,
  id,
  maxLength,
  max,
}) => {
  const textInputStyle: CSSProperties = useMemo(() => {
    return {
      border: textInputBorder,
      width: "100%",
      cursor: "text",
    };
  }, [textInputBorder]);

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      style={textInputStyle}
      onFocus={onFocus}
      {...formik}
      autoComplete={autoComplete}
      {...(onChange && { onChange })}
      value={value}
      id={id}
      maxLength={maxLength}
      max={max}
    />
  );
};

export default TextInput;
