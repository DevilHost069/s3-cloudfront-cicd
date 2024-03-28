import { Tooltip as BsTooltip } from "bootstrap";
import React, { useEffect, useRef, forwardRef } from "react";

type ITooltip = {
  tooltip?: string;
  children?: React.ReactNode;
  title?: string;
  disabled?: boolean;
};

const Tooltip = forwardRef((props: ITooltip) => {
  const tooltipRef = useRef(null);
  useEffect(() => {
    const tooltip = new BsTooltip(tooltipRef.current, {
      trigger: "hover",
      placement: "top",
    });
    return () => {
      tooltip.dispose();
    };
  }, []);
  return (
    <div
      ref={tooltipRef}
      className="w-full"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={props.title}
    >
      {props.children}
    </div>
  );
});

export default Tooltip;
