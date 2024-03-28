import "@assets/css/GetStarted/GetStartedNav.css";
import Logo from "@assets/img/logo.png";
import HannahMedLogo from "@assets/img/hannahmed_logo.png";
import Natura from "@assets/img/natura.svg";
import Alert from "@components/Alert";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConfigurationOptionsProvider, { useConfiguration } from "@contexts/ConfigurationContext";

export default function Header() {
  const location = useLocation();
  const { configurations } = useConfiguration();
  
  // Assuming configurationData is structured correctly
  const logoUrl = configurations?.data?.branding?.logo || HannahMedLogo;

  const [siteLogo, setSiteLogo] = useState(logoUrl);

  useEffect(() => {
    setSiteLogo(logoUrl);
  }, [logoUrl]);

  return (
    <>
      <nav
        id="get-started-nav"
        className={`navbar sticky-top ${location.pathname === "/login" ? "bg-transparent" : "bg-slate-100"}`}
      >
        <img className="cannabiz" src={siteLogo} alt="logo" loading="lazy" />
      </nav>
    </>
  );
}
