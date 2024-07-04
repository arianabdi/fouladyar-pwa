import { LuHome } from "react-icons/lu";
import { TbTicket } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export const NavItem = ({icon, text, link}) => {

  const location = useLocation();
  return(
    <Link to={`${process.env.PUBLIC_URL}${link}`}>
      <div className={`nav-item ${location.pathname === link ? 'active-item' : ''}`}>
        <div className="icon"> {icon}</div>
        <span className="text">{text}</span>
      </div>
    </Link>
  )
}
export const BottomNavBar = ({  ...props }) => {

  const { t, i18n } = useTranslation();


  return(
    <div className="bottom-nav-bar">
      <NavItem link={'/home'} icon={<LuHome size={22} color={"#060606"}/>} text={t('patient-home')}/>
      <NavItem link={'/filter'} icon={<IoSearch   size={22} color={"#060606"}/>} text={t('search')}/>
      <NavItem link={'/history'} icon={<TbTicket  size={22} color={"#060606"}/>} text={t('e-ticket')}/>
      <NavItem link={'/my-profile'} icon={<FiUser   size={22} color={"#060606"}/>} text={t('profile')}/>
    </div>
  )
}
