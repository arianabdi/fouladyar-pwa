import React, { useState } from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import User from "./dropdown/user/User";

import { useTheme, useThemeUpdate } from "../provider/Theme";

const HeaderDoctor = ({ title, fixed, className }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme.header === "white",
    [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
    [`${className}`]: className
  });
  let currentUrl;

  if (window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }


  const [activeButton, setActiveButton] = useState("Sage femme");

  const handleButtonClick = (buttonText) => {
    setActiveButton(buttonText);
  };

  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <Toggle className="nk-nav-toggle nk-quick-nav-icon" icon="menu" click={themeUpdate.sidebarVisibility} />
          </div>

          <div
            className="col-sm-auto nk-header-tools d-flex flex-row justify-content-between align-content-between ml-0 flex-sm-grow-1">
            <h3 className="header-title">{title}</h3>
            <ul className="nk-quick-nav" style={{ marginLeft: "auto" }}>
              <li className="user-dropdown" onClick={themeUpdate.sidebarVisibility}>
                <User />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderDoctor;
