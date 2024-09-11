import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide2 from "../../../images/fouladyar/slide3.jpg";
import Divider from "../../../shared/divider";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import {Field} from "../../../components/fouladyar/field/field";

function SendEmailForm({closeModal}) {


    const {t, i18n} = useTranslation();
    const [data, setData] = useState({
        fullname: '',
        code: '',
        email: '',
        phone: ''
    });

    return (
        <div className="department-list-modal">
            <div className="department-list-title">
                لطفا تنها اقدام به پردکردن فرم زیر کرده و سپس روی دکمه ارسال ایمیل بزنید تا متن ایمیل برای شما ایجاد
                شود. دقت کنید لطفا از تغییر در متن ایمیل اکیدا خودداری کنید تا ایمیل شما به پشتیبان مورد نظر ارسال شود.
            </div>
            <div className='department-list'>

                <Field
                    id={"fullname"}
                    name={"fullname"}
                    placeholder={"نام و نام خانوادگی"}
                    type={"text"}
                    label={"نام و نام خانوادگی"}
                    value={data.fullname}
                    onChange={(e) => {
                        setData(prevState => ({
                            ...prevState,
                            fullname: e
                        }))
                    }}
                />
                <Field
                    id={"code"}
                    name={"code"}
                    placeholder={"کد مشتری"}
                    label={"کد مشتری"}
                    type={"text"}
                    value={data.code}
                    onChange={(e) => {
                        setData(prevState => ({
                            ...prevState,
                            code: e
                        }))
                    }}
                />
                <Field
                    id={"email"}
                    name={"email"}
                    placeholder={"ایمیل"}
                    label={"ایمیل"}
                    type={"text"}
                    value={data.email}
                    onChange={(e) => {
                        setData(prevState => ({
                            ...prevState,
                            email: e
                        }))
                    }}
                />
                <Field
                    id={"phone"}
                    name={"phone"}
                    placeholder={"شماره تماس"}
                    label={"شماره تماس"}
                    type={"text"}
                    value={data.phone}
                    onChange={(e) => {
                        setData(prevState => ({
                            ...prevState,
                            phone: e
                        }))
                    }}
                />
            </div>

            <button className="fouladyar-blue-button w-100 mt-4" onClick={() => {
                const mailtoLink = `mailto:support@fouladyargroup.com?subject=فراموشی رمز عبور&body={code:${data.code},name:${data.fullname},phone:${data.phone},email:${data.email}}`;
                console.log('form', mailtoLink);
                window.location.href = mailtoLink;
            }}>
                ارسال ایمیل
            </button>
        </div>
    )
}

const ForgotPassword = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const {t, i18n} = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const {state} = location;



    const callPhoneNumber = () => {
        const phoneNumber = '02172125'; // Replace with your phone number
        const telLink = `tel:${phoneNumber}`;

        window.location.href = telLink; // This will open the phone dialer or default app on mobile devices
    };

    return (

        <React.Fragment>
            <ModalHelper
                size={"sm"}
                open={isModalOpen}
                onOpen={() => setIsModalOpen(true)}
                onClose={() => setIsModalOpen(false)}
                component={<SendEmailForm

                    closeModal={() => {
                        setIsModalOpen(false);
                    }}
                />}
            />
            <FixedHeader title={"فراموشی رمز عبور"} useBack={true}/>
            <div className="nk-content forgot-password-container">

                <div className="login-banner-image">
                    <img src={slide2} alt=""/>
                </div>

                <div className="forgot-password-context">
                    <div className="forgot-password-description">
                        در صورت فراموشی رمز عبور، لطفا با تیم پشتیبانی فولادیار تماس بگیرید تا در فرآیند بازیابی رمز
                        عبور شما را هدایت کنند. تماس با تیم پشتیبانی به شما کمک خواهد کرد تا به سرعت و به سهولت به حساب
                        کاربری خود دوباره دسترسی پیدا کنید. برای اطمینان از امنیت حساب خود، لطفا اطلاعات شخصی خود را در
                        تماس با پشتیبانی اعلام فرمایید.
                    </div>
                    <Divider/>
                    <div className={"buttonWrapper flex-column"}>
                        <button
                            className={"w-100"}
                            onClick={callPhoneNumber}
                        >
                            تماس با پشتیبانی
                        </button>
                        <button
                            className={"w-100"}
                            onClick={() => {
                                setIsModalOpen(true)
                            }}
                        >
                            ارسال ایمیل به پشتیبانی
                        </button>
                    </div>
                </div>


            </div>
        </React.Fragment>

    );
};

export default ForgotPassword;
