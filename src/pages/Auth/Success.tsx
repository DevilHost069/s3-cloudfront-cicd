import React from "react";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useColors } from "@utils/tenant_configuration";


export default function Success() {
  const onLinkClick = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <div
        className="div_center "
        style={{
          height: "100vh",
          backgroundColor: `${primaryColor}`,
        }}
      >
        <div className="card_div">
          <div className="auth__content__title">
            <h2 className="auth__content">
              Thank you for your interest in our services
            </h2>
          </div>
          <div className="auth__content__body">
            <p className="auth__content__text">
              You have successfully submitted your request. Our team will get
              back to you shortly.
            </p>
          </div>
          {/* back to home */}
          <div className="a_link">
            <a onClick={onLinkClick} href="/" className="link_back">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
