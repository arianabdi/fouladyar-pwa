import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icon, LinkItem, UserAvatar } from "../../components/Component";
import User from "../../images/avatar/b-sm.jpg";
import { FiCalendar, FiCreditCard, FiHelpCircle, FiMapPin, FiPhone, FiShield } from "react-icons/fi";
import { LuGift, LuLogOut, LuSettings } from "react-icons/lu";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { TbBrandPocket, TbReport } from "react-icons/tb";
import axios from "axios";
import { convertToTitleCase } from "../../shared/textTools";
import { useTranslation } from "react-i18next";
import {
  MdClose,
  MdOutlineAccountBalanceWallet,
  MdOutlinePrivacyTip,
  MdSupportAgent,
  MdTranslate
} from "react-icons/md";
import toast from "react-hot-toast";
import { IoChevronBack } from "react-icons/io5";
import { GrAchievement } from "react-icons/gr";
import { BottomNavBar } from "../../layout/Index-layout";
import { IoMdExit } from "react-icons/io";
import { clearToken } from "../../redux/store/services/auth/store";
import { clearProfile } from "../../redux/store/services/patient/store/profile-actions";

const ProfileInDoctorDashboard = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);

  const handleSignout =async () => {
    localStorage.removeItem("accessToken");
    dispatch(clearToken())
    dispatch(clearProfile())
    navigate(`/login`);
  };

  function ProfileInformationItem({ icon, value, isBadge }) {
    return (
      <div className="row search-item-location pb-3">
        <div className="col-sm-auto w-auto padding-right-1">
          {icon}
        </div>
        {
          !isBadge ? <p className="col p-0 ps-1 profile-info-text">{value}</p> : (
            Array.isArray(value) ? value.map(item => {
              return(
                <div className="data-badge">{item}</div>
              )
            }) : '-'
          )

        }
      </div>
    );
  }


  function MenuItem({text, link, icon, onClick}){
    return(
      <div className="profile-menu-item" onClick={onClick}>
        <Link className="p-2 d-flex flex-row justify-content-between align-content-center" to={process.env.PUBLIC_URL + link}>
          <div className="d-flex flex-row align-content-center">
            <div>
              {icon}
            </div>
            <div className="menu-item-text me-1">
              {text}
            </div>
          </div>
          <IoChevronBack size={13} color={"#CACACA"} />
        </Link>
      </div>
    )
  }

  function HorizontalMenuItem({text, link, icon}){
    return(
      <div className="profile-horizontal-menu">

        <Link className="p-2 d-flex flex-column justify-content-center align-content-center" to={link}>
          <div className=" d-flex flex-column justify-content-center profile-horizontal-menu-icon">
            {icon}
          </div>
          <div className="menu-item-text me-1">
            {text}
          </div>
        </Link>
      </div>
    )
  }

  return (

    <React.Fragment>

      <ModalHelper
        size={"sm"}
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
        component={modalComponent}
      />


      <HeaderDoctor title={"Profil"} />
      <div className="nk-content ">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container p-3 m-0">
                  <div className="row ">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5 mb-3 p-5 profile-container">
                      <div className="row">
                        <div className="blue-background"></div>
                        <div className="col-sm-12 col-md-12 col-lg-4 mb-5">





                          <div className="d-flex flex-row profile-segment">
                            <div className="">
                              <div style={{ paddingLeft: 0, width: "auto" }}>
                                <UserAvatar className="profile-avatar" image={`${process.env.REACT_APP_S3_BUCKET}/${profile.avatar}` || User}></UserAvatar>
                              </div>
                            </div>
                            <div className="me-3">
                              <div className="profile-name">آرین عبدی</div>
                              <div className="profile-email">julian@gmail.com</div>
                            </div>
                          </div>




                          <div className="profile-segment">
                            <div className='profile-menu-card'>
                              <MenuItem icon={""} text={"درباره رامین فرزادی"} link={"/post?postId=650a01e04dd3497f56b1d5a9"}/>
                              <div className="d-flex flex-row justify-content-evenly">
                                <HorizontalMenuItem link={"/wallet"} text={"کیف پول"} icon={<MdOutlineAccountBalanceWallet size={22} color={"#001A72"} />}/>
                                <HorizontalMenuItem link={""} text={"اهداف"} icon={<GrAchievement  size={22} color={"#001A72"} />}/>
                                <HorizontalMenuItem link={""} text={"پروفایل"} icon={<HiOutlineUser  size={22} color={"#001A72"} />}/>
                              </div>
                            </div>
                          </div>



                          <div className="profile-segment-1">
                            <div className='profile-menu-card'>
                              <MenuItem icon={<MdSupportAgent size={22} color={"#001A72"} />} text={"پشتیبانی"} link={""}/>
                              {/*<MenuItem icon={<TbReport size={22} color={"#001A72"} />} text={"گزارشات"} link={""}/>*/}
                              <MenuItem icon={<LuSettings size={22} color={"#001A72"} />} text={"تنظیمات"} link={"/settings"}/>
                              <MenuItem icon={<LuGift size={22} color={"#001A72"} />} text={"دعوت از دوستان"} link={""}/>
                              <MenuItem icon={<MdOutlinePrivacyTip size={22} color={"#001A72"} />} text={"قوانین و مقررات"} link={"/post?postId=650aa8c84dd3497f56b1d5bf"}/>
                              <MenuItem icon={<IoMdExit size={22} color={"#001A72"} />} text={"خروج از اپلیکیشن"} onClick={async ()=>{
                                await handleSignout()
                              }}/>
                            </div>
                          </div>






                        </div>
                      </div>
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

export default ProfileInDoctorDashboard;
