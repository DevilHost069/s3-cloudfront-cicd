import SettingPersonalInformation from "@components/AccountSetting/PersonalInformation";
import Security from "@components/AccountSetting/Security";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function AccountSetting() {
  const [title, setTitle] = React.useState("Personal Information");
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    if (!name) {
      setSearchParams({ name: "general" });
    }
  }, [name]);

  useEffect(() => {
    if (name === "general") {
      setTitle("Personal Information");
    }
    if (name === "security") {
      setTitle("Change Password");
    }
  }, [name]);

  /* The `switchComponent` object is a mapping of component names to their corresponding JSX
    components. In this case, it maps the name "general" to the `<General title="General" />`
    component and the name "security" to the `<Security />` component. */
  const switchComponent = {
    general: <SettingPersonalInformation />,
    security: <Security />,
  };
  const component = switchComponent[name];

  const onClickGeneral = () => {
    setSearchParams({ name: "general" });
    setTitle("Personal Information");
  };

  const onClickSecurity = () => {
    setSearchParams({ name: "security" });
    setTitle("Change Password");
  };

  const styler = {
    cursor: "pointer",
    color: "inherit",
    // backgroundColor: `${PRIMARY_COLOR}`,
  };

  const border = {
    fontSize: "24px",
  };

  return (
    <>
      <div className="container-fluid">
        <div
          className="row"
          style={{
            paddingTop: "4.2rem",
          }}
        >
          <div className="col-md-3">
            <div className="mb-md-0 mb-4">
              <div className="card-body">
                <ul className={`list-group`}>
                  {/* className="list-group-item bg-primary-500 text-white" */}
                  <li
                    onClick={onClickGeneral}
                    style={name === "general" ? null : styler}
                    className={
                      name === "general"
                        ? "list-group-item bg-primary-500 text-white"
                        : "list-group-item"
                    }
                  >
                    <span style={styler} className="hover">
                      General
                    </span>
                  </li>
                  <li
                    onClick={onClickSecurity}
                    style={name === "security" ? null : styler}
                    className={
                      name === "security"
                        ? "list-group-item bg-primary-500 text-white"
                        : "list-group-item"
                    }
                  >
                    <span style={styler} className="hover">
                      Password
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-9 col-lg-9 col-md-9 col-sm-9">
            <div className="card">
              <h5
                className="card-header bg-white"
                style={{
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                {title}
              </h5>
              <div className="card-body p-2 p-md-5">{component}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
