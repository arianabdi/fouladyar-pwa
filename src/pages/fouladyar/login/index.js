import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
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
import {setToken} from "../../../redux/store/services/auth/store";
import {setProfile} from "../../../redux/store/services/profile/store";


const Login = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    async function onLogin() {
        try {

            // Perform your login logic to obtain the token
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                userNumber: form.username,
                password: form.password,
            });


            if(res.status === 200 || res.status === 201){

                const userData = res.data.user;
                dispatch(setToken(res.data.accessToken));
                dispatch(setProfile({
                    id: userData.id,
                    fullName: userData.fullName,
                    email: userData.email || '',
                    birthDate: userData.birthDate,
                    username: userData.username,
                    gender: userData.gender,
                    jobTitle: userData.jobTitle,
                    privileges: userData.privileges,
                }))
                navigate('/chat-list')
            }

        } catch (e) {
            ErrorToaster(e)
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
                                        <div className="login-form">
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
                                            <button className="fouladyar-blue-button w-100 mt-4" onClick={async () => {
                                                await onLogin()
                                            }}>
                                                ورود به سیستم
                                            </button>
                                        </div>
                                        <Divider/>
                                        <div className='forgot-password' onClick={() => {
                                            // navigate('/chat-list')
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
