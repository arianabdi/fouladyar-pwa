import React from "react";
import classNames from "classnames";
import Menu, {FloorMenu} from "../menu/Menu";

import {useTheme, useThemeUpdate} from "../provider/Theme";
import {BiChevronLeft} from "react-icons/bi";
import {FaInstagram} from "react-icons/fa";
import {TbBrandTelegram} from "react-icons/tb";
import {IoLogoLinkedin} from "react-icons/io";
import {MdPhone} from "react-icons/md";
import headerLogo from "../../assets/images/fouladyar/headerLogo.png";
import {HiUser} from "react-icons/hi";

const Sidebar = ({fixed, className}) => {

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

    function Profile() {
        return (
            <div className="profile-container d-flex flex-column justify-content-center align-items-center">
                <div className="profile-image-container">
                    <HiUser size={20} color={"#000"}/>
                </div>
                <div className="profile-name">کاربر عادی</div>
            </div>
        )
    }

    function SocialMedia() {

        const openInstagram = () => {
            window.open('https://www.instagram.com/fouladyargroup1382/', '_blank');
        };
        const openLinkedin = () => {
            window.open('https://www.linkedin.com/company/fouladyar/', '_blank');
        };
        const openTelegram = () => {
            window.open('https://t.me/fouladyar', '_blank');
        };
        const openDialPad = () => {
            window.open('tel:021-72125', '_blank');
        };

        return (
            <div className="sidebar-socials-padding d-flex flex-column flex-grow-1  justify-content-center align-items-center">
                <div className="navbar-icons d-flex flex-row-reverse">
                    <div className="icon-item" onClick={() => {openInstagram()}}><FaInstagram size={27} color={"#526484"}/></div>
                    <div className="icon-item" onClick={() => {openTelegram()}}><TbBrandTelegram size={27} color={"#526484"}/></div>
                    <div className="icon-item" onClick={() => {openLinkedin()}}><IoLogoLinkedin size={27} color={"#526484"}/></div>
                    <div className="icon-item" onClick={() => {openDialPad()}}><MdPhone size={27} color={"#526484"}/></div>
                </div>
            </div>
        )
    }

    function FouladyarLogo() {
        return (
            <div className="sidebar-items-padding flex-grow-1 d-flex flex-row justify-content-center align-items-center">
                <div className="nk-header-app-logo">
                    <img src={headerLogo} alt="" />
                </div>
            </div>
        )
    }  // Function to close the sidebar


    return (
        <>
            <div className={`${classes} d-flex flex-column`}>
                <div className="sidebar-container d-flex flex-column justify-content-between">
                    <Profile/>
                    <Menu onClick={themeUpdate.sidebarVisibility}/>
                    <SocialMedia/>
                    <FouladyarLogo/>
                </div>
            </div>
            {theme.sidebarVisibility && <div
                onClick={themeUpdate.sidebarVisibility}
                className="nk-sidebar-overlay"></div>}
        </>
    );
};
export default Sidebar;
