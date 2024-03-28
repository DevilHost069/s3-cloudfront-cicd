import { X } from "@assets/index";
import SVG from "react-inlinesvg";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useSearchParams } from "react-router-dom";
import { useColors } from "@utils/tenant_configuration";


const MedicationsHeader = ({
  title,
  onCloseMedications,
  setActiveTab,
  activeTab,
  setModalContent,
  setTitle,
  newAllowed,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cardStyle = {
    display: "flex",
    padding: "10px 20px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    gap: "12px",
  };
  const { primaryColor, primaryLightColor } = useColors();

  const tabs = ["current rx", "past rx"];
  return (
    <div className="card w-100 card_space ">
      <div
        className="card-header bg-white text-primary-500 sticky flex-wrap"
        style={cardStyle}
      >
        <div className="d-flex align-items-center medications-title-container">
          <span
            className="card-title pt-2 me-2"
            style={{
              color: `${primaryColor}`,
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: "27px",
            }}
          >
            {title}
          </span>

          {newAllowed ? (
            <div className="d-md-none d-flex align-items-center new-rx">
              <button
                className="btn btn-outline-primary me-2 btn-sm px-3"
                data-bs-toggle="modal"
                data-bs-target="#newRx"
                onClick={() => {
                  setTitle("New Rx");
                  setModalContent("newRx");
                }}
              >
                New Rx
              </button>
              <SVG
                src={X}
                className="cursor-pointer"
                onClick={onCloseMedications}
              />
            </div>
          ) : (
            <div className="d-md-none d-block">
              <SVG
                src={X}
                className="cursor-pointer"
                onClick={onCloseMedications}
              />
            </div>
          )}
        </div>
        <div className="btn-group" role="group" aria-label="Basic example">
          {tabs.map((tab, index) => (
            <button
              type="button"
              key={index}
              className={`btn btn-sm px-4 btn${activeTab === tab ? "" : "outline"}-primary text-capitalize rounded-2`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {newAllowed ? (
          <div className="d-none d-md-flex align-items-center new-rx">
            <button
              className="btn btn-outline-primary me-2 btn-sm px-3"
              data-bs-toggle="modal"
              data-bs-target="#newRx"
              onClick={() => {
                setTitle("New Rx");
                setModalContent("newRx");
              }}
            >
              New Rx
            </button>
            <SVG
              src={X}
              className="cursor-pointer"
              onClick={onCloseMedications}
            />
          </div>
        ) : (
          <div className="d-none d-md-block">
            <SVG
              src={X}
              className="cursor-pointer"
              onClick={onCloseMedications}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationsHeader;
