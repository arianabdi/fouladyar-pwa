import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FixedHeader } from "../../layout/header/Fixed-Header";
import { IoIosFitness } from "react-icons/io";
import { Field } from "../../components/fouladyar/field/field";
import { FixedFooter } from "../../layout/footer/Fixed-footer";
import { toFarsiNumber } from "../../shared/toFarsiNumber";

const Packages = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);


  const { t, i18n } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState('')
  const [packages, setPackages] = useState([])
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/package`, {
          headers: {authorization: `bearer ${auth.token}`}
        } );

        console.log("res", res)
        if (res.status === 200) {
          setPackages(res.data.data);
        }

      } catch (e) {
        toast.error(e.message);
      }
    }

    loadPackages();
  }, []);




  const style = {
    buttons: {
      padding: "0.5em"
    },
    danaFont: {
      fontFamily: "dana !important",
      margin: "auto"
    },
    divider: {
      height: 1,
      background: "#cecece",
      width: "100%"
    }
  }

  function Divider(){
    return(
      <div className="mt-4 mb-4" style={style.divider}></div>
    )
  }






  function PackageItem({ item }) {
    return (
      <div className={`package-item-card mb-4 pt-3 pb-3 ${item._id === selectedPackage ? 'selected-package' : ''}`} onClick={()=>{
        setSelectedPackage(item._id)
      }}>

        <div className="p-2 d-flex flex-row justify-content-between align-content-center">
          <div className=" d-flex flex-row">
            <div className=" ">
              <IoIosFitness size={30} color={"#001A72"} />
            </div>
            <div className="program-item-title me-1">
              {item.name}
            </div>
          </div>
          <Field
            id={"gender"}
            name={"gender"}
            label={""}
            isRequired={true}
            type={"radiobox"}
            options={[
              {label: '', value: item._id},
            ]}
            value={selectedPackage}
          />
        </div>

        <div className="p-2 pb-0 d-flex flex-row justify-content-between  align-content-center">
          <div className="program-item-date me-1">
            نوع پکیج
          </div>
          <div className="program-item-date me-1">
            {item.name}
          </div>
        </div>

        <div className="p-2 pb-0 d-flex flex-row justify-content-between  align-content-center">
          <div className="program-item-date me-1">
            مدت دوره
          </div>
          <div className="program-item-date me-1">
            {item.duration} ماهه
          </div>
        </div>

        <div className="p-2 d-flex flex-row justify-content-center align-content-center">
          <div className="program-item-description me-1">
            {item.description}
          </div>
        </div>

        <Divider />

        <div className="package-price mb-3 pe-2 ps-2">
          {toFarsiNumber(item.price)} تومان
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
      <FixedHeader title={"پکیج ها"} useBack={true} />
      <FixedFooter component={
        <div className={`btn blue-button ${selectedPackage ? "" : "disabled"}`} style={{height: '2.3rem', borderRadius: "20rem", marginTop: '1rem'}} onClick={async () => {
          navigate(`/payment-method/${selectedPackage}`)
        }}>
          مرحله بعد
        </div>
      }/>
      <div className="nk-content " style={{background: '#fff'}}>
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container p-3 pt-5 m-0">
                  <div className="row ">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5 mb-3 p-5 profile-container">
                      <div className="row p-2">

                        {
                          packages.map(item => {
                            return(
                              <PackageItem item={item}/>
                            )
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
    </React.Fragment>

  );
};

export default Packages;
