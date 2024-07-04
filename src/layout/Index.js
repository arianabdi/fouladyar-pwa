import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "./appbar/Appbar";
import Sidebar from "./sidebar/Sidebar";
import Head from "./head/Head";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import { useSelector } from "react-redux";

const Layout = ({title, app, ...props}) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [IS_TOKEN_VALID, SET_IS_TOKEN_VALID] = useState(false);

  useEffect(() => {




  }, [auth.token]);

  return (
    <AppMain>
      <AppWrap>
        <Outlet />
      </AppWrap>
    </AppMain>
  );
};
export default Layout;
