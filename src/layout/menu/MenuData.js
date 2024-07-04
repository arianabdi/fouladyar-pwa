import { FiActivity, FiHelpCircle, FiHome, FiPenTool, FiShield, FiUserCheck } from "react-icons/fi";
import React from "react";
import { LuCalendar, LuLogOut } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { RiProfileLine } from "react-icons/ri";

const fontSize = 20;
const color = "#555555"

const menu = [
  {
    icon: <FiHome size={fontSize} color={color} />,
    text: "Page d’accueil",
    link: "/home",
  },
  {
    icon: <FiUserCheck size={fontSize} color={color} />,
    text: "Patients",
    link: "/patients",
  },
  {
    icon: <LuCalendar size={fontSize} color={color} />,
    text: "Calendrier",
    link: "/calendar",
  },
  {
    isDivider: true,
  },
  {
    icon: <FiPenTool size={fontSize} color={color} />,
    text: "Thème",
    link: "/theme",
  },
  {
    icon: <FiActivity size={fontSize} color={color} />,
    text: "Analyses",
    link: "/analyses",
  },
  {
    icon: <RxDashboard size={fontSize} color={color} />,
    text: "QR Code / URL",
    link: "/qr-code",
  },
];

export const floorMenuItems = [
  {
    link: '/contact-us',
    text: "Contacter le support",
    icon: <FiHelpCircle size={20} color={"#555555"} />
  },
  {
    link: '/account/terms-and-conditions',
    text: "Conditions généralesales",
    icon: <FiShield size={20} color={"#555555"} />
  },
  {
    link: '/account/privacy-policy',
    text: "Politique de confidentialité",
    icon: <FiShield size={20} color={"#555555"} />
  },
  {
    // link: '/login',
    text: "Se déconnecter",
    isSignout: true,
    icon: <LuLogOut size={20} color={"#555555"} />
  },
]
export default menu;
