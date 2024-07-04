import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Head from "./head/Head";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import { useSelector } from "react-redux";
import { validateToken } from "../pages/old/auth";
import { useTranslation } from "react-i18next";
import { LuCalendar, LuClipboardList, LuHome } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { NavItem } from "./buttomNavBar/ButtomNavBar";
import { HiOutlineUser } from "react-icons/hi";
import { GrHomeRounded } from "react-icons/gr";
import { MdPersonOutline } from "react-icons/md";
import { TbHome } from "react-icons/tb";

const Layout = ({ title, app, ...props }) => {


  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [IS_TOKEN_VALID, SET_IS_TOKEN_VALID] = useState(true);



  useEffect(() => {
    async function validateAccessToken(){
      const tokenValidation = await validateToken(auth.token);


      if(!tokenValidation){
        navigate(`/login`)
      }else{
        SET_IS_TOKEN_VALID(true);
      }
    }
    // validateAccessToken()


  }, [auth.token]);


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    // Function to update screenWidth when the window is resized
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };


    // Add event listener for window resize
    window.addEventListener('resize', updateScreenWidth);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);


  function MobileViewRestriction(){
    return(
      <>
        <h2>
          لطفا این صفحه را در موبایل خود باز کنید
        </h2>
      </>
    )
  }

  return (
    <>
      {
        !IS_TOKEN_VALID ? <></> :
        <>
          {
            screenWidth > 450 ?
              <MobileViewRestriction/>:
              <>
                <Head title={!title && "Loading"} />
                <AppRoot >
                  <AppMain>
                    <AppWrap>
                      <Outlet />
                    </AppWrap>
                  </AppMain>
                </AppRoot>
              </>
          }
        </>
      }
    </>

  );
};
export default Layout;
export const BottomNavBar = ({  ...props }) => {

  const { t, i18n } = useTranslation();


  return(
    <div className="bottom-nav-bar">
      <NavItem link={'/home'} icon={<TbHome  size={28} color={"#060606"}/>} text={t('خانه')}/>
      <NavItem link={'/programs'} icon={<LuClipboardList    size={28} color={"#060606"}/>} text={t('برنامه ها')}/>
      <NavItem link={'/profile'} icon={<MdPersonOutline    size={28} color={"#060606"}/>} text={t('پروفایل')}/>
    </div>
  )
}

