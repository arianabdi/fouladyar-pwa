import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { TransactionItem } from "../transactions/components/transactionItem";

const Wallet = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [data, setData] = useState({
    "email": "",
    "gender": "",
    "firstName": "",
    "lastName": "",
    "dateOfBirth": "",
    "mobileNumber": "",
    "specialization": "",
    "rppsNumber": null,
    "adeliNumber": null,
    "officeAddress": "",
    "officePhoneNumber": "",
    "city": "",
    "longitude": null,
    "latitude": null,
    "paymentTypes": [],
    "zipCode": "zipCode_2795505c12ee",
    "note": "note_f1f09ccafe63",
    "acceptVitalCard": null,
    "canDoPediatrics": null,
    "canDoAbortion": null,
    "canDoUltrasound": null,
    "doctorOrProfessor": ""
  })

  useEffect(()=>{
    async function loadProfile(){
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/provider/account`, {
          headers: { "authorization": `bearer ${auth.token}` }
        });

        if (res.status === 200) {
          setData(prevState =>({
            ...prevState,
            ...res.data
          }))
        }

      }catch (e){

        toast.error(e.message)
      }
    }

    loadProfile()
  }, [])


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



      <div className="nk-content ">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container p-3 m-0">
                  <div className="row ">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5 mb-3 p-5 profile-container">
                      <div className="row">
                        <div className="blue-background" style={{height: '15rem'}}></div>
                        <div className="col-sm-12 col-md-12 col-lg-4 mb-5">



                          <div className="profile-segment">
                            <div className='profile-menu-card wallet-container p-3'>
                              <div className="wallet-credit">۶۲۰,۰۰۰ ریال</div>
                              <div className="wallet-title mt-3 mb-5">موجودی کیف پول</div>
                              <div className={`btn blue-button m-0`} onClick={async () => {

                              }}>
                                افزایش موجودی
                              </div>
                            </div>
                          </div>



                          <div className="profile-segment-1">
                            <div className="d-flex flex-row justify-content-between mb-2">
                              <div className="wallet-title">تراکنش های اخیر</div>
                              <Link to={'/transactions'} >
                                مشاهده همه
                              </Link>
                            </div>
                            <div className='transaction-container'>
                              <TransactionItem title={"خرید برنامه حرفه ای"} amount={1500000} date={new Date()} status={"paid"} transactionId={""}/>
                              <TransactionItem title={"خرید برنامه حرفه ای"} amount={1500000} date={new Date()} status={"paid"} transactionId={""}/>
                              <TransactionItem title={"خرید برنامه حرفه ای"} amount={1500000} date={new Date()} status={"paid"} transactionId={""}/>
                              <TransactionItem title={"خرید برنامه حرفه ای"} amount={1500000} date={new Date()} status={"paid"} transactionId={""}/>
                              <TransactionItem title={"خرید برنامه حرفه ای"} amount={1500000} date={new Date()} status={"paid"} transactionId={""}/>
                              <TransactionItem title={"خرید برنامه حرفه ای"} amount={1500000} date={new Date()} status={"paid"} transactionId={""}/>
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
    </React.Fragment>

  );
};

export default Wallet;
