import { FunctionComponent } from "react";
import Banner from "./Banner";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";

import IconOutlinePlus from "../../assets/img/landing/iconoutlineplus.svg";
import Button from "@components/widgets/Button";
import { useColors } from "@utils/tenant_configuration";


const Hero: FunctionComponent = () => {
  const onClickRedirectto = () => {
    window.location.href = "/screening";
  };
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <div className="info-banner">
      <div className="ctx d-flex">
        <div className="get-access-to">
          Get access to Booking and Consults from the doctors for cannabiz
          within a portal.
        </div>
        {/* <Banner iconOutlineplus={IconOutlinePlus} cTABtn="Redirect to Portal" /> */}
        <Button
          id=""
          className=" me-5"
          onClick={onClickRedirectto}
          button={"Redirect to Portal"}
          type="button"
          style={{
            display: "flex",
            padding: "12px 24px",
            height: "48px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "4px",
            backgroundColor: `${primaryColor}`,

            fontWeight: 600,
            outline: "none",
            border: "none",
            color: "#fff",
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
