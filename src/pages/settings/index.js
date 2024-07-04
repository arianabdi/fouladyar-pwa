import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FixedHeader } from "../../layout/header/Fixed-Header";
import { IoIosFitness } from "react-icons/io";
import { Field } from "../../components/fouladyar/field/field";
import { FixedFooter } from "../../layout/footer/Fixed-footer";
import { toFarsiNumber } from "../../shared/toFarsiNumber";
import { LuMinus } from "react-icons/lu";
import { MdAdd, MdClose } from "react-icons/md";
import { ErrorToaster } from "../../shared/toaster";
import { Button } from "reactstrap";
import { useMoneySeparator } from "../../shared/shared";
import moment from "moment";
import { LoadingState } from "../../components/fouladyar/loading-state/loadingState";
import { HiOutlineTrash } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RiCheckLine } from "react-icons/ri";

const Settings = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);


  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  const [useWallet, setUseWallet] = useState(false)
  const [walletAmount, setWalletAmount] = useState(13000000)
  const [paymentGateway, setPaymentGateway] = useState([])
  const navigate = useNavigate();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div></div>);
  const [settings, setSettings] = useState({
    language: 'en',
    font: 'yekan-bakh',
    fontSize: '12',
    theme: 'light',
    eventsAndNewsNotification: true,
    updateApplicationNotification: false,
    programChangesNotification: false
  })



  function SelectLanguageModal({ onClose}) {
    const [isLoading, setIsLoading] = useState(false);
    const [languages, setLanguages] = useState([
      {
        title: 'انگلیسی',
        slug: 'en',
        isSelected: true
      },
      {
        title: 'آلمانی',
        slug: 'de',
        isSelected: false
      },
      {
        title: 'فارسی',
        slug: 'fa',
        isSelected: false
      }
    ]);




    return (
      <div>

        <div className="d-flex flex-row justify-between">
          <div className="align-center">
            <h4 className="setting-options-title p-3" >انتخاب زبان اپلیکیشن</h4>
          </div>
        </div>
        <li className="divider" style={{ margin: 0 }}></li>

        <div className={`p-3 `}>
          <div className="d-flex flex-column g-2 p-1 ">


            <div className={`accordion setting-options-container`} key={`accordion-1`}  >
              {
                languages.map((languageItem, languageItemIndex) => {
                  return(
                    <div className="accordion-item"  key={`accordion-item-${languageItem.slug}`}  >
                      <div   className={`d-flex flex-row justify-content-between accordion-head ${languageItem.isSelected ? 'setting-options-selected' : ''}`} >
                        <h6 className={`title setting-options-text ${languageItem.isSelected ? 'setting-options-selected-text' : ''}`} >{languageItem.title}</h6>
                        {
                          !languageItem.isSelected ? '' :
                            <span className={`icon ${languageItem.isSelected ? 'setting-options-selected-text' : ''}`} >
                              <RiCheckLine size={18} color={"#fff"}/>
                            </span>
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>
        <li className="divider mt-3 mb-3 m-0 p-0" ></li>
        <div className={`p-3 pt-2 pb-2 `}>
          <div className="d-flex p-0 flex-row justify-between w-100">

            <div className=" p-0 w-100">
              <Button
                color="secondary"
                style={{borderRadius: '8px'}}
                className="justify-content-center setting-options-text m-0 p-0 w-100 pt-2 pb-2"
                onClick={(e)=>{
                  onClose()
                }}>
                بستن پنجره
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }



  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/payment-gateway`, {
          headers: {authorization: `bearer ${auth.token}`}
        } );

        console.log("res", res)
        if (res.status === 200) {
          setPaymentGateway(res.data.data);
        }

      } catch (e) {
        toast.error(e.message);
      }
    }

    loadPackages();
  }, []);





  function ApplicationLanguage() {
    return (
      <div  >

        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="settings-title">
            زبان اپلیکیشن
          </div>
        </div>

        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="settings-key-value">
            انگلیسی
          </div>
          <div className="settings-key-value" onClick={()=>{
            setModalComponent(
              <SelectLanguageModal
                onClose={()=>{
                  setIsModalOpen(false);
                }}
              />
            )
            setIsModalOpen(true)
          }}>
            تغییر
          </div>
        </div>
      </div>
    );
  }


  function Version() {
    return (
      <div className="application-version">
        ورژن اپلکیشن 1.1.1
      </div>
    );
  }


  function ApplicationTheme() {
    return (
      <div  >

        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="settings-title">
            قالب اپلیکیشن
          </div>
        </div>




        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="settings-key-value">
            فونت اپلیکیشن
          </div>
          <div className="settings-key-value" onClick={()=>{

          }}>
            یکان بخ
          </div>
        </div>

        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="settings-key-value">
            اندازه فونت
          </div>
          <div className="settings-key-value" onClick={()=>{

          }}>
            ۱۲
          </div>
        </div>



        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="settings-key-value">
            رنگ قالب
          </div>
          <div className="settings-key-value" onClick={()=>{

          }}>
            روشن
          </div>
        </div>

      </div>
    );
  }




  async function onPayment() {
    try {
      setIsLoading(true)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/program`,
        {packageId: packageId},
        {
          headers: {authorization: `bearer ${auth.token}`}
        }
        );
      console.log('createSpecification', res)
      if(res.status === 200){
        toast.success('برنامه شما با موفقیت خریداری شد. لطفا نسبت مشخصات مورد نیاز را در برنامه خود وارد کنید')
        navigate(`/programs`)
        setIsLoading(false)
      }

      setIsLoading(false)
    } catch (error) {
      ErrorToaster(error)
      console.log(error.message);
      setIsLoading(false)
    }
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
      <FixedHeader title={"تنظیمات"} useBack={true} />
      <div className="nk-content " style={{background: '#fff', height: "100vh"}}>
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container p-3 pt-5 m-0">
                  <div className="row ">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5 mb-3 p-5 profile-container">
                      <ApplicationLanguage/>
                      <ApplicationTheme/>
                      <div  >

                        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
                          <div className="settings-title">
                            اطلاع رسانی ها
                          </div>
                        </div>

                        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
                          <div className="settings-key-value">
                            رویداد ها و اخبار جدید
                          </div>
                          <div className="">
                            <Field
                              name={"eventsAndNewsNotification"}
                              type={"switch"}
                              value={settings.eventsAndNewsNotification}
                              onChange={(e) => {
                                setSettings(prevState => ({
                                  ...prevState,
                                  eventsAndNewsNotification: e
                                }))
                              }}
                            />
                          </div>
                        </div>

                        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
                          <div className="settings-key-value">
                            تغییرات برنامه ورزشی
                          </div>
                          <div className="">
                            <Field
                              name={"programChangesNotification"}
                              type={"switch"}
                              value={settings.programChangesNotification}
                              onChange={(e) => {
                                setSettings(prevState => ({
                                  ...prevState,
                                  programChangesNotification: e
                                }))
                              }}
                            />
                          </div>
                        </div>

                        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
                          <div className="settings-key-value">
                            آپدیت برنامه
                          </div>
                          <div className="">
                            <Field
                              name={"updateApplicationNotification"}
                              type={"switch"}
                              value={settings.updateApplicationNotification}
                              onChange={(e) => {
                                setSettings(prevState => ({
                                  ...prevState,
                                  updateApplicationNotification: e,
                                }))
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Version/>
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

export default Settings;
