import React, {useLayoutEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
// import Error404Modern from "../pages/error/404-modern";
// import Error504Modern from "../pages/error/504-modern";
import ProfileInDoctorDashboard from "../pages/profile";

import "../assets/scss/doctor-layout.scss";


import {ArcElement, BarElement, CategoryScale, Chart, Filler, Legend, LinearScale, Tooltip} from "chart.js";
import Layout from "../layout/Index-layout";
import Wallet from "../pages/wallet";
import Programs from "../pages/programs";
import Packages from "../pages/packages";
import ProgramDetail from "../pages/program-detail";
import Home from "../pages/fouladyar/home";
import Post from "../pages/post";
import UserSpecificationForm from "../pages/userSpecificationForm";
import Payment from "../pages/payment";
import Settings from "../pages/settings";
import News from "../pages/fouladyar/news";
import Products from "../pages/fouladyar/products";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Filler, Legend);


const Pages = () => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (

        <div className="doctor-layout">
            <Routes>

                {/*/!*fitness academic*!/*/}
                {/*<Route index element={<LoginOTP />}></Route>*/}
                {/*<Route index path="/login" element={<LoginOTP />}></Route>*/}
                {/*<Route path="/verify-otp" element={<VerifyOtp />}></Route>*/}

                <Route path="" element={<Layout/>}>
                    {/*Fouladyar*/}
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/profile" element={<ProfileInDoctorDashboard/>}></Route>
                    <Route path="/chat" element={<Programs/>}></Route>
                    <Route path="/news" element={<News/>}></Route>
                    <Route path="/products" element={<Products/>}></Route>
                    <Route path="/wallet" element={<Wallet/>}></Route>
                    <Route path="/payment-method/:packageId" element={<Payment/>}></Route>
                    <Route path="/packages" element={<Packages/>}></Route>
                    <Route path="/exercise-list" element={<ProgramDetail/>}></Route>
                    <Route path="/settings" element={<Settings/>}></Route>

                    {/*/!*cliconsult*!/*/}
                    {/*<Route path="/patients" element={<DoctorPatients />}></Route>*/}
                    {/*<Route path="/edit-profile" element={<EditProfileInDoctorDashboard />}></Route>*/}
                    {/*<Route path="/qr-code" element={<QrCode />}></Route>*/}
                    {/*<Route path="/contact-us" element={<ContactUs />}></Route>*/}
                    {/*<Route path="/account/terms-and-conditions" element={<TermsAndConditions />}></Route>*/}
                    {/*<Route path="/account/privacy-policy" element={<PrivacyPolicy />}></Route>*/}
                    {/*<Route path="/theme" element={<EditThemeInDoctorDashboard />}></Route>*/}
                    {/*<Route path="/analyses" element={<Analyses />}></Route>*/}
                    {/*<Route path="/calendar" element={<CalendarInDoctorDashboard />}></Route>*/}
                </Route>


                {/*/!*cliconsult*!/*/}
                {/*<Route path="/forget-password" element={<DoctorForgetPassword />}></Route>*/}
                {/*<Route path="/password-confirmation" element={<PasswordConfirmation />}></Route>*/}
                {/*<Route path="/email-sent" element={<DoctorForgetPasswordEmailSent />}></Route>*/}
                {/*<Route path="/create-account" element={<DoctorCreateAccount />}></Route>*/}
                {/*<Route path="/terms-and-conditions" element={<TermsAndConditions />}></Route>*/}
                {/*<Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>*/}

            </Routes>
        </div>
    );
};
export default Pages;
