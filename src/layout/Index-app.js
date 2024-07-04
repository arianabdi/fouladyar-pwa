import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "./appbar/Appbar";
import Sidebar from "./sidebar/Sidebar";
import Head from "./head/Head";
import AppHeader from "./header/AppHeader";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";

import { useTheme } from "./provider/Theme";
import FileManagerProvider from "../pages/app/file-manager/components/Context";
import { useSelector } from "react-redux";
import { validateToken } from "../pages/old/auth";

const Layout = ({title, app, ...props}) => {
  const theme = useTheme();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [IS_TOKEN_VALID, SET_IS_TOKEN_VALID] = useState(false);

  useEffect(() => {

    async function validateAccessToken(){
      const tokenValidation = await validateToken(auth.token);


      if(!tokenValidation){
        navigate(`${process.env.PUBLIC_URL}/login`)
      }else{
        SET_IS_TOKEN_VALID(true);
      }

    }
    validateAccessToken()


  }, [auth.token]);


  return (
    <>
      {
        !IS_TOKEN_VALID ? <></> :
          <FileManagerProvider>
            <Head title={!title && 'Loading'} />
            <AppRoot className="npc-apps apps-only">
              <Appbar />
              <AppMain>
                {theme.sidebarMobile && <Sidebar fixed />}
                <AppWrap>
                  <AppHeader app={app} fixed />
                  <Outlet />
                </AppWrap>
              </AppMain>
            </AppRoot>
          </FileManagerProvider>
      }
    </>

  );
};
export default Layout;
