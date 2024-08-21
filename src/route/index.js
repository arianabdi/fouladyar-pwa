import React, {useLayoutEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {ArcElement, BarElement, CategoryScale, Chart, Filler, Legend, LinearScale, Tooltip} from "chart.js";
import Layout from "../layout/Index-layout";
import Packages from "../pages/packages";
import Home from "../pages/fouladyar/home";
import Payment from "../pages/payment";
import News from "../pages/fouladyar/news";
import Products from "../pages/fouladyar/products";
import ProductDetail from "../pages/fouladyar/productDetail";
import Tracking from "../pages/fouladyar/tracking";
import Login from "../pages/fouladyar/login";
import ChatList from "../pages/fouladyar/chatList";
import ChatMessages from "../pages/fouladyar/chatMessages";
import "../assets/scss/doctor-layout.scss";
import ChatDetail from "../pages/fouladyar/chatDetail";
import Posts from "../pages/fouladyar/posts";
import SinglePost from "../pages/fouladyar/singlePost";
import Videos from "../pages/fouladyar/videos";
import ForgotPassword from "../pages/fouladyar/forgotPassword";
import AboutUs from "../pages/fouladyar/about-us";

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
                    <Route path="/chat-list" element={<ChatList/>}></Route>
                    <Route path="/chat-detail/:chatId" element={<ChatDetail/>}></Route>
                    <Route path="/news" element={<News/>}></Route>
                    <Route path="/posts" element={<Posts/>}></Route>
                    <Route path="/videos" element={<Videos/>}></Route>
                    <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
                    <Route path="/single-post/:postId" element={<SinglePost/>}></Route>
                    <Route path="/products" element={<Products/>}></Route>
                    <Route path="/product-detail/:productId" element={<ProductDetail/>}></Route>
                    <Route path="/tracking" element={<Tracking/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/about-us" element={<AboutUs/>}></Route>
                    <Route path="/chat-messages" element={<ChatMessages/>}></Route>


                    <Route path="/payment-method/:packageId" element={<Payment/>}></Route>
                    <Route path="/packages" element={<Packages/>}></Route>

                </Route>
            </Routes>
        </div>
    );
};
export default Pages;
