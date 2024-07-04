import React from "react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import Menu, { FloorMenu } from "../menu/Menu";

import { useTheme, useThemeUpdate } from "../provider/Theme";
import headerLogo from "../../assets/images/cliconsult/headerLogo.png";
import { FiHelpCircle } from "react-icons/fi";

const Sidebar = ({ fixed, className }) => {

  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const classes = classNames({
    "nk-sidebar": true,
    "nk-sidebar-fixed": fixed,
    "nk-sidebar-active": theme.sidebarVisibility,
    "nk-sidebar-mobile": theme.sidebarMobile,
    [`is-light`]: theme.sidebar === "white",
    [`is-${theme.sidebar}`]: theme.sidebar !== "white" && theme.sidebar !== "light",
    [`${className}`]: className
  });


  function SidebarLogo() {
    return (
      <div className="col-sm-auto nk-header-app-name mb-5">
        <div className="nk-header-app-logo">
          <img src={headerLogo} alt="" />
        </div>
      </div>
    );
  }


  return (
    <>
      <div className={`${classes} d-flex flex-`}>
        <SimpleBar className="nk-sidebar-inner d-flex justify-content-between align-content-between  flex-grow-1">
          <div>
            <SidebarLogo />
            <Menu />
          </div>
          <div className="mb-2">
            <FloorMenu />
          </div>

        </SimpleBar>
      </div>
      {theme.sidebarVisibility && <div
        onClick={themeUpdate.sidebarVisibility}
        className="nk-sidebar-overlay"></div>}
    </>
  );
};
export default Sidebar;
