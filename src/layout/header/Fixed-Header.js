import React from "react";
import {IoArrowForwardSharp, IoMenuOutline} from "react-icons/io5";
import {useTheme, useThemeUpdate} from '../provider/Theme';
import classNames from "classnames";
import headerLogo from "../../assets/images/fouladyar/headerLogo.png";

export function FixedHeader({title, useBack, fixed, className}) {
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
        <div className="fixed-header d-flex flex-row justify-content-between align-content-center">


            {
                !useBack ?
                    <div className="nk-menu-trigger d-xl-none ms-n1">
                        {/*<Toggle className="nk-nav-toggle nk-quick-nav-icon" icon="menu" click={() => {}} />*/}
                        <div onClick={themeUpdate.sidebarVisibility} style={{padding: "0px 10px"}}>
                            <IoMenuOutline size={30} color={"#000"}/>
                        </div>
                    </div> :
                    <div className="fixed-header-back" onClick={() => {
                        history.back()
                    }}>
                        <IoArrowForwardSharp size={22} color={"#4f5050"}/>
                    </div>
            }
            <div className="fixed-header-title">
                {title}
            </div>


            <div className="nk-header-app-name">
                <div className="nk-header-app-logo">
                    <img src={headerLogo} alt=""/>
                </div>
            </div>

        </div>
    )
}
