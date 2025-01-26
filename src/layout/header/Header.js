import React, { useState } from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import { Link, useNavigate } from "react-router-dom";

import { useTheme, useThemeUpdate } from "../provider/Theme";
import headerLogo from "../../assets/images/cliconsult/headerLogo.png";
import { FiUser } from "react-icons/fi";
import { GrHistory } from "react-icons/gr";
import { TbTicket } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchMode } from "../../redux/store/services/search/store/search-actions";

const Header = ({ fixed, className }) => {
  const mode = useSelector((state) => state.search.mode);
  const theme = useTheme();
  const navigate = useNavigate();
  const themeUpdate = useThemeUpdate();
  const dispatch = useDispatch();
  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme.header === "white",
    [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
    [`${className}`]: className
  });
  let currentUrl;

  const { t, i18n } = useTranslation();
  if (window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }


  const [activeButton, setActiveButton] = useState("Sage femme");

  const handleButtonClick = (mode) => {
    dispatch(changeSearchMode(mode))
    navigate(`/home`)
  };

  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">

          <div className="col-sm-auto nk-header-app-name" style={{height: "50px"}}>
            <div className="nk-header-app-logo">
              <Link to={`${process.env.PUBLIC_URL}/home`} className=" w-auto p-0 m-0">
                <img src={headerLogo} alt="" />
              </Link>
            </div>
          </div>

          <div className="col-sm-auto nk-header-app-name" style={{height: "50px"}}>
            <div className={`btn button-no-color mt-0 `} style={{backgroundColor: "#008BB9"}} onClick={() => {

              window.location.replace(process.env.REACT_APP_DOCTOR_URL);

            }}>
              Vous êtes professionnel de santé ?
            </div>
          </div>


          <div className="col-sm d-flex flex-row align-center justify-center header-menu-mobile">
            <div className="nk-header-menu2">
              <div className="nk-header-menu-inner">
                <div
                  className={`menu-item doctor ${mode === "doctor" ? "active" : ""}`}
                  onClick={() => handleButtonClick("doctor")}
                >
                  Médecin
                </div>
                <div
                  className={`menu-item nurse ${mode === "nurse" ? "active" : ""}`}
                  onClick={() => handleButtonClick("nurse")}
                >
                  Infirmier
                </div>
                <div
                  className={`menu-item midwife ${mode === "midwife" ? "active" : ""}`}
                  onClick={() => handleButtonClick("midwife")}
                >
                  Sage femme
                </div>
              </div>
              <div className="menu-indicator"
                   style={{ left: `calc(33.33% * ${["Médecin", "Infirmier", "Sage femme"].indexOf(activeButton)})` }} />
            </div>
          </div>


          <div className="col-sm-auto nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="history me-n1" onClick={themeUpdate.sidebarVisibility}>
                <Link to={`${process.env.PUBLIC_URL}/history`} className="header-icon p-0 m-0">
                  <TbTicket size={28} color={"#555555"} /> {t('e-ticket')}
                </Link>
              </li>
              <li className="user-dropdown" onClick={themeUpdate.sidebarVisibility}>
                <Link to={`${process.env.PUBLIC_URL}/my-profile`} className="header-icon p-0 m-0">
                  <FiUser size={28} color={"#555555"} /> {t('profile')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
