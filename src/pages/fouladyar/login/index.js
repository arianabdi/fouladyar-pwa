import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { FixedHeader } from "../../../layout/header/Fixed-Header";
import { BottomNavBar } from "../../../layout/Index-layout";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import postTest from "../../../assets/images/fitness-academic/post-test.png"
import slide1 from "../../../images/fouladyar/slide1.jpg"
import slide2 from "../../../images/fouladyar/slide2.jpg"
import slide3 from "../../../images/fouladyar/slide3.jpg"
import slide4 from "../../../images/fouladyar/slide4.jpg"
import slide5 from "../../../images/fouladyar/slide5.jpg"
import news1 from "../../../images/fouladyar/news1.png"
import { MdClose } from "react-icons/md";
import { TbClockHour4 } from "react-icons/tb";
import { ErrorToaster } from "../../../shared/toaster";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { ConvertGregorianToJalali } from "../../../shared/convertGregorianToJalali";
import StatusInquery from "../StatusInquery/statusInquery";
import {IoMenuOutline} from "react-icons/io5";
import {FaArrowLeft} from "react-icons/fa";
import {Field} from "../../../components/fouladyar/field/field";
import Icon from "../../../components/icon/Icon";
import Divider from "../../../shared/divider";

function NewsItem({item}) {
  const TruncatedText = ({ text, maxLength = 40 }) => {
    const truncatedText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    return <span>{truncatedText}</span>;
  };

  return (

    <Link to={`${process.env.PUBLIC_URL}/post?postId=${item._id}`} >
      <div className="news-item-container">
        <div className="news-item-image">
          <img src={item.image} alt="" />
        </div>
      </div>
    </Link>
  );
}

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [sliderFeedItems, setSliderFeedItems] = useState([]);
  const [newsFeedItems, setNewsFeedItems] = useState([]);
  const [eventFeedItems, setEventFeedItems] = useState([]);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);

  async function _getHomePosts() {

    console.log('token ', auth)
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/application/home`, {
        headers: {authorization: `bearer ${auth.token}`}
      });
      console.log('_getHomePosts', res.data)
      if (res.status === 200) {
        setNewsFeedItems(res.data.data.news);
        setEventFeedItems(res.data.data.events);
      }

      return res
    } catch (error) {
      ErrorToaster(error)
    }

  }




  return (

    <React.Fragment>

      <FixedHeader title={"خانه"} />
      <div className="nk-content news-page" >
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="container  m-0 p-0"  style={{paddingBottom: "6rem"}}>

                  <div className="login-banner-image">
                    <img src={slide2} alt="" />
                  </div>

                  <div className="login-context">
                    <div className="login-title">چت فولادیار</div>
                    <div className="login-description">با استفاده از چت فولادیار با دپارتمان های مختلف این سازمان ارتباط برقرار کرده و درخواست های خود را مدیریت کنید.</div>
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

                      }}>
                        ورود به سیستم
                      </button>
                    </form>
                    <Divider />
                    <div className='forgot-password' onClick={() => {

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
      <BottomNavBar />
    </React.Fragment>

  );
};

export default Login;
