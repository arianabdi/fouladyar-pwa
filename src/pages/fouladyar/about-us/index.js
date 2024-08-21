import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide2 from "../../../assets/images/fouladyar/about.jpg";
import Divider from "../../../shared/divider";


const AboutUs = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const {t, i18n} = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const {state} = location;


    return (

        <React.Fragment>
            <FixedHeader title={"درباره ما"} useBack={true}/>
            <div className="nk-content forgot-password-container">

                <div className="login-banner-image">
                    <img src={slide2} alt=""/>
                </div>

                <div className="forgot-password-context">
                    <div className="forgot-password-description">
                        این مجموعه در سال 1382 آغاز فعالیت نموده است و در زمینه تولید
                        مصنوعات فلزی از ورق های رنگی، سرد و گالوانیزه با ظرفیت بیشت از
                        120.000 تن انواع فرمینگ و 47.000 تن برش های طولی و عرضی در سال با100
                        نفر پرسنل تحت فعالیت می باشد. این گروه در قالب مجموعه های پروتو صنعت
                        جنوب، آوا تجارت و شرکت تولیدی و صنعتی فولادیار کوروش برای پاسخگویی
                        به نیاز های بازار فعالیت می نماید.
                    </div>
                    <h2>گروه فولادیار کوروش</h2>
                    <Divider/>
                    <div className="forgot-password-description">
                        شرکت تولیدی و صنعتی گروه فولادیار کوروش در سال 1395 به دلیل نیاز
                        بازار به محصولات فولادی تولید شده از ورق های سرد و گالوانیزه و رنگی
                        در زمینی به مساحت 30.000 متر مربع و سالن تولیدی به وسعت 10.000 متر
                        مربع با نصب تجهیزات کامل از جمله 19 خط تولید ماشین آلات برش طولی و
                        عرضی و ماشین آلات شکل دهی (فرمینگ) ورق با طرح های مختلف، تحت شماره
                        ثبت 495418 و با اخذ مجوز پروانه بهره برداری به شماره 78572 وزارت
                        محترم صنعت و معدن و تجارت با ظرفیت تولیدی 120.000 تن انواع فرمینگ و
                        47.000 تن برش های طولی و عرضی در سال، توسط شرکت های پرتو صنعت جنوب و
                        آوا تجارت زرین تاسیس گردید.
                    </div>
                </div>


            </div>
        </React.Fragment>

    );
};

export default AboutUs;
