import SVG from "react-inlinesvg";
import NoData from "@assets/icons/no-data-card.svg";

const CardEmptyData = ({ dataTitle }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <SVG
        src={NoData}
        width={80}
        height={80}
        title={`No ${dataTitle} found`}
        className="mb-2"
      />
      <span>{`No ${dataTitle} found`}</span>
    </div>
  );
};

export default CardEmptyData;
