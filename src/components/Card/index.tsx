
import React from "react";
import { useColors } from "@utils/tenant_configuration";



type ICard = {
  title: string | React.ReactNode;
  src?: string;
  onClick?: () => void;
  children: React.ReactNode;
  bodyStyle?: any;
  editable?: boolean;
  display?: string;
  onCancelClick?: () => void;
  onCloseMedications?: () => void;
};

const CustomCard = ({
  title,
  src = "",
  children,
  onClick,
  bodyStyle,
  editable = true,
  display = "d-none",
  onCancelClick,
  onCloseMedications,
}: ICard) => {
  const { primaryColor, primaryLightColor } = useColors();

  const cardStyle = {
    display: "flex",
    padding: "10px 20px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  };

  return (
    <div className="card w-100 card_space ">
      <div
        className="card-header bg-white text-primary-500 sticky"
        style={cardStyle}
      >
        <span
          className="card-title pt-2 flex-grow-1"
          style={{
            color: `${primaryColor}`,
            fontSize: "18px",
            fontWeight: "700",
            lineHeight: "27px",
          }}
        >
          {title}
        </span>
        {editable ? (
          <>
            {display === "d-none" ? (
              <>
                <span className="card-icon">
                  <img
                    onClick={onClick}
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    src={src}
                    alt=""
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </span>
              </>
            ) : (
              <>
                {/* <span className={display}>
                  <button
                    data-bs-toggle="modal"
                    onClick={onCancelClick}
                    data-bs-target="#cancelScript"
                    className="btn btn-outline-danger btn-sm me-3"
                  >
                    Cancel Script
                  </button>
                </span> */}
              </>
            )}
          </>
        ) : null}
      </div>
      <div className="card-body custom-scrollbar" style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export default CustomCard;
