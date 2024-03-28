import { FunctionComponent } from "react";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";

import Button from "../widgets/Button";
import { useColors } from "@utils/tenant_configuration";


type SizeMDIconNoStateDefaulType = {
  iconOutlineplus?: string;
  cTABtn?: string;
};

const onClickRedirectto = () => {
  window.location.href = "/screening";
};

const Banner: FunctionComponent<SizeMDIconNoStateDefaulType> = ({ cTABtn }) => {
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <Button
      id=""
      onClick={onClickRedirectto}
      button={cTABtn}
      type="button"
      style={{
        display: "flex",
        padding: "12px 24px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        borderRadius: "4px",
        backgroundColor: `${primaryColor}`,
        marginTop: "4px",
        borderColor: `${primaryColor}`,
      }}
    />
  );
};

export default Banner;
