import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { FixedHeader } from "../../layout/header/Fixed-Header";
import { BottomNavBar } from "../../layout/Index-layout";
import { ErrorToaster } from "../../shared/toaster";
import { EmptyState } from "../../components/fouladyar/empty-state/emptyState";
import { toFarsiNumber } from "../../shared/toFarsiNumber";
import { ConvertGregorianToJalali } from "../../shared/convertGregorianToJalali";

const Programs = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [programs, setPrograms] = useState([]);


  async function loadAllMyProgram() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/program`, {
        headers: { authorization: `bearer ${auth.token}` }
      });
      console.log("getAllMyProgram", res);

      if (res.status === 200)
        setPrograms(res.data.data);

    } catch (error) {
      ErrorToaster(error);
    }
  }

  useEffect(() => {
    loadAllMyProgram();
  }, []);

  function ProfileInformationItem({ icon, value, isBadge }) {
    return (
      <div className="row search-item-location pb-3">
        <div className="col-sm-auto w-auto padding-right-1">
          {icon}
        </div>
        {
          !isBadge ? <p className="col p-0 ps-1 profile-info-text">{value}</p> : (
            Array.isArray(value) ? value.map(item => {
              return (
                <div className="data-badge">{item}</div>
              );
            }) : "-"
          )

        }
      </div>
    );
  }


  function FloatingButton({ text, link }) {
    return (
      <div className="floating-button-green">
        <Link className="d-flex flex-row justify-center align-center white" to={link}>
          {text}
        </Link>
      </div>
    );
  }


  function ProgramItem({ item }) {
    return (
      <div className="program-item-card mb-4 pt-3 pb-3">

        <div className="p-2 d-flex flex-row justify-content-between align-content-center">
          <div className=" d-flex flex-row">
            <div className=" ">
              <LiaClipboardCheckSolid size={30} color={"#001A72"} />
            </div>
            <div className="program-item-title me-1">
              {item.full_name || "نام ثبت نشده"}
            </div>
          </div>
          <div
            className={`program-item-status me-1 ${item.status === "active" ? "program-status-success" : "program-status-pending"}`}>
            {t(item.status)}
          </div>
        </div>

        <div className="p-2 d-flex flex-row  align-content-center">
          <div className="program-item-date me-1">
            {toFarsiNumber(ConvertGregorianToJalali(new Date(item.createdAt), false))}
          </div>
        </div>

        <div className="p-2 d-flex flex-row justify-content-center align-content-center">
          <div className="program-item-description me-1">
            {`${item.description || "ورزش کنید و به تن خود اهمیت دهید. سلامتی برای زندگی بهتر اساسی است! 💪🏋️‍♀️🧘‍♂️ #ورزش #سلامتی"}`}          </div>
        </div>

        <div className="p-2 d-flex flex-column justify-content-center align-content-center">
          <div className="program-item-type-title me-1">
            نوع برنامه
          </div>
          <div className="program-item-type-value me-1">
            {item.name}
          </div>
        </div>

        <div className={`btn ${(item.status === "active" || item.status === "pending") ? "blue-button" : "white-button"} ${item.status === "pending" ? 'disabled' : ''}`} style={{ borderRadius: 50 }}
             onClick={async () => {
               if(item.status === "active" || item.status === "fill_info")
                  navigate(item.status === "active" ? `/exercise-list?programId=${item._id}` : `/user-specification?programId=${item._id}`);
             }}>
          {item.status === "active" ? "مشاهده" : (item.status === "fill_info" ? "تکمیل اطلاعات" : (item.status === "pending" ? "مشاهده" : "مشاهده"))}
        </div>

      </div>
    );
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
      <FixedHeader title={"برنامه ها"} />
      <FloatingButton text={"ایجاد برنامه جدید"} link={"/packages"} />
      <div className="nk-content">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container p-3 pt-5 m-0">
                  <div className="row ">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5 mb-3 p-5 profile-container">
                      <div className="row p-2">

                        {
                          programs.length === 0 ?
                            <EmptyState
                              title={"برنامه یافت نشد"}
                              content={"هیچ برنامه ای برای نمایش وجود ندارد. لطفا در صورت تمایل از طریق دکمه ایجاد برنامه جدید اقدام به خرید برنامه کنید"}
                              image={""}
                            /> :
                            programs.map(item => {
                              return (
                                <ProgramItem item={item} />
                              );
                            })
                        }
                      </div>
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

export default Programs;
