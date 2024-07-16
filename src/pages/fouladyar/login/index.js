import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {BottomNavBar} from "../../../layout/Index-layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide2 from "../../../images/fouladyar/slide2.jpg"
import {ErrorToaster} from "../../../shared/toaster";
import {Field} from "../../../components/fouladyar/field/field";
import Divider from "../../../shared/divider";


const Login = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);

    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    async function _getHomePosts() {

        console.log('token ', auth)
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/application/home`, {
                headers: {authorization: `bearer ${auth.token}`}
            });
            console.log('_getHomePosts', res.data)
            if (res.status === 200) {
            }

            return res
        } catch (error) {
            ErrorToaster(error)
        }

    }


    return (

        <React.Fragment>

            <FixedHeader title={"خانه"}/>
            <div className="nk-content news-page">
                <div className="container-fluid-doctor">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block">
                                <div className="container  m-0 p-0" style={{paddingBottom: "6rem"}}>

                                    <div className="login-banner-image">
                                        <img src={slide2} alt=""/>
                                    </div>

                                    <div className="login-context">
                                        <div className="login-title">چت فولادیار</div>
                                        <div className="login-description">با استفاده از چت فولادیار با دپارتمان های
                                            مختلف این سازمان ارتباط برقرار کرده و درخواست های خود را مدیریت کنید.
                                        </div>
                                        <form className="login-form">
                                            <Field
                                                id={"username"}
                                                name={"username"}
                                                label={t('نام کاربری')}
                                                type={"text"}
                                                value={form.username}
                                                onChange={(e) => {
                                                    setForm(prevState => ({
                                                        ...prevState,
                                                        username: e
                                                    }));
                                                }}
                                            />
                                            <Field
                                                id={"password"}
                                                name={"password"}
                                                label={t('رمز عبور')}
                                                type={"password"}
                                                value={form.password}
                                                onChange={(e) => {
                                                    setForm(prevState => ({
                                                        ...prevState,
                                                        password: e
                                                    }));
                                                }}
                                            />
                                            <button className="fouladyar-blue-button w-100 mt-4" onClick={() => {
                                                navigate('/chat-list')
                                            }}>
                                                ورود به سیستم
                                            </button>
                                        </form>
                                        <Divider/>
                                        <div className='forgot-password' onClick={() => {
                                            navigate('/chat-list')
                                        }}>
                                            رمز عبور خود را فراموش کرده اید؟
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavBar/>
        </React.Fragment>

    );
};

export default Login;
