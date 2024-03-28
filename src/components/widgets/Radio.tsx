import { FunctionComponent, useMemo, type CSSProperties } from "react";

type IRadio = {
  label?: string;
  radioBorder?: CSSProperties["border"];
  labelColor?: CSSProperties["color"];
  formik?: any;
  value?: string | number | readonly string[] | undefined;
  onChange?: (event: any) => void;
  checked?: boolean;
};

const RadioBtn: FunctionComponent<IRadio> = ({
  label,
  radioBorder,
  labelColor,
  formik,
  value,
  onChange,
  checked = false,
}) => {
  const radioStyle: CSSProperties = useMemo(() => {
    return {
      border: radioBorder,
    };
  }, [radioBorder]);

  const labelStyle: CSSProperties = useMemo(() => {
    return {
      color: labelColor,
      fontFamily: "Nunito Sans",
    };
  }, [labelColor]);

  return (
    <label
      className="selectedfalse form-check"
      style={{
        cursor: "pointer",
      }}
    >
      <input
        className="form-check-input radio"
        type="radio"
        name="flexRadioDefault"
        value={value}
        style={radioStyle}
        onChange={onChange}
        checked={checked}
        {...formik}
      ></input>
      <div className="label form-check-label" style={labelStyle}>
        {label}
      </div>
    </label>
  );
};

export default RadioBtn;
