import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SlickArrowLeft, SlickArrowRight } from "../../../components/partials/slick/SlickComponents";
import Slider from "react-slick";
import "./login-rtl.css";
import { makeStyles } from "@material-ui/styles";
import Footer from "../../../layout/footer/Footer";
import { Field } from "../../../components/fouladyar/field/field";
import Logo from "../../assets/images/fouladyar/logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setToken } from "../../../redux/store/services/auth/store";
import { validateToken } from "./index";
import { setProfile } from "../../../redux/store/services/profile/store";
import { useNavigate } from "react-router-dom";


const LoginV2 = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const auth = useSelector((state) => state.auth);
  const [IS_TOKEN_VALID, SET_IS_TOKEN_VALID] = useState(true);
  const dispatch = useDispatch();



  useEffect(() => {
    async function validateAccessToken(){
      const tokenValidation = await validateToken(auth.token);

      if(tokenValidation){
        navigate(`${process.env.PUBLIC_URL}/`)
      }else{
        SET_IS_TOKEN_VALID(false);
      }
    }
    validateAccessToken()

  }, [auth.token]);


  const onFormSubmit = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        "userNumber": form.username,
        "password": form.password
      });


      // userId: action.user.id,
      //   email: action.user.email,
      //   fullname: action.user.userNumber,
      //   groupName: action.user.groupName
      if (res.status === 200 || res.status === 201) {
        dispatch(setToken(res.data.accessToken));
        dispatch(setProfile({
          id: res.data.user.id,
          email: 'test@gmail.com', //res.data.user.email,
          userNumber: `${res.data.user.userfirstname} ${res.data.user.userlastname}`,
          group: res.data.user.group ,
        }))

        navigate(`${process.env.PUBLIC_URL}/`);

      }

    } catch (e) {
      console.log("error", e);
    }

  };

  const { register, handleSubmit, formState: { errors } } = useForm();


  const settings = {
    className: "slider-init plan-list",
    slidesToShow: 1,
    centerMode: false,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      { breakpoint: 1539, settings: { slidesToShow: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ],
    slide: "li",
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />
  };

  const sliderItems = [
    {
      image: "https://drive.google.com/uc?id=19PH17vioHMsVY37D961crnS6VbQki7Sz&export=download",
      title: "کارخانه فولادیار",
      content: "خوش آمدید به داشبورد ادمین شرکت فولادیار. در اینجا می‌توانید به بهترین شکل ممکن مدیریت و کنترل عملیات شرکت خود را انجام دهید."
    },
    {
      image: "https://drive.google.com/uc?id=10edrOKiyryldn_hcjka5Xx7GJdrw0SOP&export=download",
      title: "کارخانه فولادیار",
      content: "خوش آمدید به داشبورد ادمین شرکت فولادیار. در اینجا می‌توانید به بهترین شکل ممکن مدیریت و کنترل عملیات شرکت خود را انجام دهید."
    },
    {
      image: "https://drive.google.com/uc?id=1ITMGWA-KwiLc-Xi7bQ-wYH3g-NLYJRtK&export=download",
      title: "کارخانه فولادیار",
      content: "خوش آمدید به داشبورد ادمین شرکت فولادیار. در اینجا می‌توانید به بهترین شکل ممکن مدیریت و کنترل عملیات شرکت خود را انجام دهید."
    },
    {
      image: "https://drive.google.com/uc?id=1kuMRSZV8tPiEAXXKV0KsA_S7tPtE2GtI&export=download",
      title: "کارخانه فولادیار",
      content: "خوش آمدید به داشبورد ادمین شرکت فولادیار. در اینجا می‌توانید به بهترین شکل ممکن مدیریت و کنترل عملیات شرکت خود را انجام دهید."
    },
    {
      image: "https://drive.google.com/uc?id=1TABba-o7sppqvI28IP1sAGS6ksbkOzPA&export=download",
      title: "کارخانه فولادیار",
      content: "خوش آمدید به داشبورد ادمین شرکت فولادیار. در اینجا می‌توانید به بهترین شکل ممکن مدیریت و کنترل عملیات شرکت خود را انجام دهید."
    }
  ];


  return (
    <>
      {
        IS_TOKEN_VALID ? <></> :
          <>
            <div className="login-box">
              <div className="nk-split nk-split-page nk-split-lg">
                <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                  <div className="absolute-top-right d-lg-none p-3 p-sm-5">
                    <a href="#" className="toggle btn-white btn btn-icon btn-light" data-target="athPromo"><em
                      className="icon ni ni-info"></em></a>
                  </div>
                  <div className="nk-block nk-block-middle nk-auth-body">
                    {/*<img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />*/}

                    <div className="brand-logo pb-5" style={{ width: "175px" }}>
                      <img src={Logo} alt="" />
                    </div>
                    <div className="nk-block-head">
                      <div className="nk-block-head-content">
                        <h5 className="nk-block-title" style={{ fontSize: "30px" }} className={`${classes.danaFont}`}>ورود به
                          سیستم</h5>
                        <div className="nk-block-des">
                          <p className={classes.danaFont}>خوش آمدید به داشبورد ادمین شرکت فولادیار. با استفاده از نام کاربری و
                            رمز عبور به حساب خود وارد شوید.</p>
                        </div>
                      </div>
                    </div>
                    <form action="#" className="form-validate is-alter" autoComplete="off">
                      <Field
                        className={classes.danaFont}
                        labelClassName={classes.danaFont}
                        id={"username"}
                        name={"username"}
                        label={"نام کاربری"}
                        placeholder={"لطفا نام کاربری خود را وارد کنید"}
                        type={"text"}
                        value={form.username}
                        onChange={(e) => {
                          setForm({ ...form, email: e });
                        }}
                      />
                      <Field
                        className={classes.danaFont}
                        labelClassName={classes.danaFont}
                        id={"password"}
                        name={"password"}
                        label={"رمز عبور"}
                        placeholder={"لطفا رمز عبور خود را وارد کنید"}
                        type={"password"}
                        value={form.password}
                        onChange={(e) => {
                          setForm({ ...form, password: e });
                        }}
                      />
                      <div className="form-group">
                        <div className={`btn btn-lg btn-primary btn-block ${classes.danaFont}`} onClick={async () => {
                          await onFormSubmit();
                        }}>ورود
                        </div>
                      </div>
                    </form>
                    <div className={`form-note-s2 pt-4 ${classes.danaFont}`}> عضو جدید هستید؟ <a href="#">ایجاد حساب </a>
                    </div>
                    <div className="text-center pt-4 pb-3">
                      <h6 className={`overline-title overline-title-sap ${classes.danaFont}`}>
                        <span>ورود از طریق شبکه های اجتماعی</span></h6>
                    </div>
                    <ul className="nav justify-center gx-4">
                      <li className="nav-item"><a className={`nav-link ${classes.danaFont}`} href="#">ورود با گوگل</a></li>
                    </ul>
                    {/*<div className="text-center mt-5">*/}
                    {/*  <span className="fw-500">I don't have an account? <a href="#">Try 15 days free</a></span>*/}
                    {/*</div>*/}
                  </div>
                  <Footer />
                </div>


                <div
                  className="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right"
                  data-toggle-body="true" data-content="athPromo" data-toggle-screen="lg" data-toggle-overlay="true">


                  <div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
                    <Slider {...settings}>
                      {sliderItems.map((item, index) => (
                        <div key={`slider-images-${index}`} className="slider-item">
                          <div className="nk-feature nk-feature-center">
                            <div className="nk-feature-img">
                              <img src={item.image} alt=""></img>
                            </div>
                            <div className="nk-feature-content py-4 p-sm-5">
                              <h4 className={classes.sliderTitle}>{item.title}</h4>
                              <p className={classes.sliderContent}>{item.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                    <div className="slider-dots"></div>
                    <div className="slider-arrows"></div>
                  </div>
                </div>


              </div>
            </div>


          </>
      }
    </>
  );
};


const useStyles = makeStyles((theme) => ({
    sliderTitle: {
      fontFamily: "dana !important"
    },
    sliderContent: {
      fontFamily: "dana !important"
    },
    danaFont: {
      fontFamily: "dana !important"
    }
  })
);

export default LoginV2;
