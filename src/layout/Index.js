import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import {useSelector} from "react-redux";

const Layout = ({title, app, ...props}) => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [IS_TOKEN_VALID, SET_IS_TOKEN_VALID] = useState(false);

    useEffect(() => {


    }, [auth.token]);

    return (
        <AppMain>
            <AppWrap>
                <Outlet/>
            </AppWrap>
        </AppMain>
    );
};
export default Layout;
