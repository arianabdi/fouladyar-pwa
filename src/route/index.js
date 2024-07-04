import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// import Error404Modern from "../pages/error/404-modern";
// import Error504Modern from "../pages/error/504-modern";
import ProfileInDoctorDashboard from "../pages/profile";
import EditProfileInDoctorDashboard from "../pages/edit-profile";
import QrCode from "../pages/qr-code";
import EditThemeInDoctorDashboard from "../pages/theme";
import Analyses from "../pages/analyses";
import CalendarInDoctorDashboard from "../pages/calendar";


import DoctorForgetPassword from "../pages/forget-password";
import DoctorForgetPasswordEmailSent from "../pages/forget-password-email-sent";
import PasswordConfirmation from "../pages/password-confirmation";
import DoctorCreateAccount from "../pages/create-account";


import DoctorPatients from "../pages/patients";

import "../assets/scss/doctor-layout.scss";


import { ArcElement, BarElement, CategoryScale, Chart, Filler, Legend, LinearScale, Tooltip } from "chart.js";
import ContactUs from "../pages/contact-us";
import TermsAndConditions from "../pages/terms-and-conditions";
import PrivacyPolicy from "../pages/privacy-policy";
import Layout from "../layout/Index-layout";
import LoginOTP from "../pages/loginOtp";
import VerifyOtp from "../pages/verifyOtp";
import Wallet from "../pages/wallet";
import Programs from "../pages/programs";
import Packages from "../pages/packages";
import ProgramDetail from "../pages/program-detail";
import Home from "../pages/home";
import Post from "../pages/post";
import UserSpecificationForm from "../pages/userSpecificationForm";
import Payment from "../pages/payment";
import Settings from "../pages/settings";

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

        <Route path="" element={<Layout />}>
          {/*fitness academic*/}
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element={<ProfileInDoctorDashboard />}></Route>
          <Route path="/programs" element={<Programs />} ></Route>
          <Route path="/post" element={<Post />} ></Route>
          <Route path="/user-specification" element={<UserSpecificationForm />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
          <Route path="/payment-method/:packageId" element={<Payment />}></Route>
          <Route path="/packages" element={<Packages />}></Route>
          <Route path="/exercise-list" element={<ProgramDetail />}></Route>
          <Route path="/settings" element={<Settings />}></Route>

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
