import { FunctionComponent, useMemo, type CSSProperties } from "react";

type SelectType = {
  iconChevronDown?: string;
  showSelectOne?: boolean;
  /** Style props */
  selectBorder?: CSSProperties["border"];
  selectJustifyContent?: CSSProperties["justifyContent"];
};

const Select: FunctionComponent<SelectType> = ({
  iconChevronDown,
  showSelectOne,
  selectBorder,
  selectJustifyContent,
}) => {
  const selectStyle: CSSProperties = useMemo(() => {
    return {
      border: selectBorder,
      justifyContent: selectJustifyContent,
    };
  }, [selectBorder, selectJustifyContent]);

  return (
    <div className="select" style={selectStyle}>
      {showSelectOne && <div className="select-one">Select one...</div>}
      <img className="icon-chevron-down" alt="" src={iconChevronDown} />
    </div>
  );
};

export default Select;
