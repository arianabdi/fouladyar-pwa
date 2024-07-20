import { FiActivity, FiHelpCircle, FiHome, FiPenTool, FiShield, FiUserCheck } from "react-icons/fi";
import React from "react";
import { LuCalendar, LuLogOut } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import {RiPagesLine, RiProfileLine} from "react-icons/ri";
import {IoVideocamSharp} from "react-icons/io5";
import {MdInfoOutline, MdNewspaper, MdOutlineStoreMallDirectory} from "react-icons/md";
import {IoMdHome} from "react-icons/io";
import {PiSignOut} from "react-icons/pi";

const fontSize = 20;
const color = "#555555"

const menu = [
  {
    icon: <IoMdHome size={fontSize} color={color} />,
    text: "خانه",
    link: "/home",
  },
  {
    icon: <MdNewspaper size={fontSize} color={color} />,
    text: "اخبار",
    link: "/news",
  },
  {
    icon: <RiPagesLine size={fontSize} color={color} />,
    text: "مقالات",
    link: "/posts",
  },
  {
    icon: <MdInfoOutline size={fontSize} color={color} />,
    text: "درباره ما",
    link: "/about-us",
  },
  {
    icon: <MdOutlineStoreMallDirectory size={fontSize} color={color} />,
    text: "محصولات",
    link: "/products",
  },
  {
    icon: <IoVideocamSharp size={fontSize} color={color} />,
    text: "ویدیوها",
    link: "/videos",
  },
  {
    icon: <PiSignOut size={fontSize} color={color} />,
    text: "خروج از حساب",
    authGuard: true,
    link: "/login",
  },
];


export default menu;
