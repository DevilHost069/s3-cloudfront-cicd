import { FunctionComponent, useMemo, type CSSProperties } from "react";

type TextAreaType = {
  line1?: string;
  line2?: string;
  showTypeYourMessage?: boolean;
  placeholder?: string;
  formik?: any;
  /** Style props */
  textAreaBorder?: CSSProperties["border"];
  textAreaHeight?: CSSProperties["height"];
  className: string;
  onFocus?: (event: any) => void;
  autoComplete?: string;
  onChange?: (event: any) => void;
  value?: string;
  maxLength?: number;
};

const TextArea: FunctionComponent<TextAreaType> = ({
  textAreaBorder = 0,
  textAreaHeight,
  className = " text-area type-your-message",
  placeholder,
  formik,
  onFocus,
  onChange,
  value,
  maxLength,
}) => {
  const textAreaStyle: CSSProperties = useMemo(() => {
    return {
      border: textAreaBorder,
      height: textAreaHeight,
    };
  }, [textAreaBorder, textAreaHeight]);

  return (
    <textarea
      style={textAreaStyle}
      placeholder={placeholder}
      className={className}
      onFocus={onFocus}
      {...formik}
      {...(onChange && { onChange })}
      value={value}
      maxLength={maxLength}
    />
  );
};

export default TextArea;
