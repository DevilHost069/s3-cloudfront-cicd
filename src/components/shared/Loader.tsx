import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { RotatingLines } from "react-loader-spinner";

export default function Loader({
  loaderContainerClass = "loading",
  width = "96",
  strokeWidth = "5",
}) {
  return (
    <>
      {/* loading center */}
      <div className={loaderContainerClass}>
        <RotatingLines
          strokeColor={PRIMARY_LIGHT_COLOR}
          strokeWidth={strokeWidth}
          animationDuration="0.75"
          width={width}
          visible={true}
        />
      </div>
    </>
  );
}
