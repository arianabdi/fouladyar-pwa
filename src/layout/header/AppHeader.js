import React from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import User from "./dropdown/user/User";
import Notification from "./dropdown/notification/Notification";
import ChatDropdown from "./dropdown/chat/Chat";
import AppDropdown from "./dropdown/app/App";
import { Icon } from "../../components/Component";

import { useTheme, useThemeUpdate } from '../provider/Theme';
import headerLogo from "../../assets/images/fouladyar/headerLogo.png";

const AppHeader = ({ fixed, className, app }) => {

  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme.header === "white",
    [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
    [`${className}`]: className,
  });

  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <Toggle className="nk-nav-toggle nk-quick-nav-icon" icon="menu" click={themeUpdate.sidebarVisibility} />
          </div>

          <div className="nk-header-app-name">
            <div className="nk-header-app-logo">
              <img src={headerLogo} alt="" />
            </div>
          </div>


          {/*<div className="nk-header-app-name">*/}
          {/*  <div className="nk-header-app-logo">*/}
          {/*    <Icon name={app.icon} className={app.theme}></Icon>*/}
          {/*  </div>*/}
          {/*  <div className="nk-header-app-info">*/}
          {/*    <span className="sub-text">Apps</span>*/}
          {/*    <span className="lead-text">{app.text}</span>*/}
          {/*  </div>*/}
          {/*</div>*/}



          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              {/*<li className="chats-dropdown hide-mb-xs" onClick={themeUpdate.sidebarVisibility}>*/}
              {/*  <ChatDropdown />*/}
              {/*</li>*/}
              <li className="notification-dropdown me-n1" onClick={themeUpdate.sidebarVisibility}>
                <Notification />
              </li>
              <li className="list-apps-dropdown d-lg-none" onClick={themeUpdate.sidebarVisibility}>
                <AppDropdown />
              </li>
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
export default AppHeader;
