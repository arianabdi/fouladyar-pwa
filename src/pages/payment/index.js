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
import { MdAdd } from "react-icons/md";
import { ErrorToaster } from "../../shared/toaster";
import { Button } from "reactstrap";
import { useMoneySeparator } from "../../shared/shared";

const Payment = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);


  const { t, i18n } = useTranslation();
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [useWallet, setUseWallet] = useState(false)
  const [walletAmount, setWalletAmount] = useState(13000000)
  const [amount, setAmount] = useState(20000000)
  const [cost, setCost] = useState(20000000)
  const [paymentGateway, setPaymentGateway] = useState([])
  const navigate = useNavigate();

  const { packageId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);

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




  const style = {
    buttons: {
      padding: "0.5em"
    },
    danaFont: {
      fontFamily: "dana !important",
      margin: "auto"
    }
  }

  function Divider(){
    return(
      <div className="mt-2 mb-2 payment-gateway-item-divider" ></div>
    )
  }




  function ProductSummary() {
    return (
      <div className={`package-item-card mb-4 p-2`} >

        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="payment-gateway-key-value">
            جزئیات
          </div>
          <div className="payment-gateway-key-value">
            خرید برنامه حرفه ای
          </div>
        </div>

        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="payment-gateway-key-value">
            کسر از کیف پول
          </div>
          <div className="payment-gateway-key-value">
            {useWallet ? toFarsiNumber(useMoneySeparator(walletAmount)) : toFarsiNumber(0)} ریال
          </div>
        </div>

        <Divider />

        <div className="p-0 d-flex flex-row justify-content-between align-content-center last-price">
          <div className="payment-gateway-key-value">
            مبلغ نهایی
          </div>
          <div className="payment-gateway-key-value">
            {toFarsiNumber(useMoneySeparator(useWallet ? (walletAmount > cost ? 0  : (cost - walletAmount)) : cost))} ریال
          </div>
        </div>
      </div>
    );
  }

  function UseWalletForPayment() {
    return (
      <div className={`package-item-card mb-4 p-2`} >

        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="payment-gateway-title">
            استفاده از کیف پول
          </div>
        </div>

        <div className="p-0 d-flex flex-row justify-content-between align-content-center">
          <div className="payment-gateway-key-value">
            {toFarsiNumber(useMoneySeparator(walletAmount))} ریال
          </div>
          <div className="">
            <Field
              name={"use-wallet"}
              type={"switch"}
              value={useWallet}
              onChange={(e) => {
                console.log('switcher', e)
                setUseWallet(e);
              }}
            />
          </div>
        </div>
      </div>
    );
  }



  function AmountSelector() {
    function AmountItem({value}){
      return(
        <div className={`amount-selector mb-4 p-1 ps-1 pe-1 ${value === amount ? 'selected-package' : ''}`} style={{width: "100px", textAlign: "center"}} onClick={()=>{
          setAmount(value)
        }}>
          <div className="amount-selector-text">
            {toFarsiNumber(useMoneySeparator(value))} ریال
          </div>
        </div>
      )
    }
    return (
      <div className={`d-flex flex-row justify-content-between`} >
        <AmountItem value={10000000}/>
        <AmountItem value={20000000}/>
        <AmountItem value={30000000}/>
      </div>
    );
  }




  function PaymentGatewayItem({ item }) {
    return (
      <div className={`package-item-card mb-4 pt-2 pb-2 ${item._id === selectedPaymentGateway ? 'selected-package' : ''}`} onClick={()=>{
        setSelectedPaymentGateway(item._id)
      }}>

        <div className="p-2 pt-0 pb-0 d-flex flex-row justify-content-between align-content-center" disabled={item.status === 'active'}>
          <div className=" d-flex flex-row">
            <div style={{width: '30px'}}>
              <img src={item.image}  alt={'image'}/>
            </div>
            <div className="payment-gateway-item-title me-1">
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
            value={selectedPaymentGateway}
          />
        </div>
      </div>
    );
  }

  function AmountTicker(){
    return(
      <div className="d-flex flex-row g-2 p-1">
        <Button
          outline
          color="light"
          style={{margin: '6px 0px 12px 9px'}}
          className="dana-fontd-flex justify-content-center diet-cancel-btn"
          onClick={(e)=>{
            if(amount > 10000000)
              setAmount(amount - 10000000)
          }}>
          <LuMinus size={22} color={"#575757"} />
        </Button>
        <div className="w-100 pe-0 ps-0">
          <Field
            className={`text-center `}
            id={"duration"}
            name={"duration"}
            placeholder={"Durée du rdv"}
            type={"number"}
            value={amount}
            onChange={(e) => {
              setAmount(e)
            }}
          />
        </div>
        <Button
          outline
          color="light"
          style={{margin: '6px 9px 12px 0px'}}
          className="dana-font  d-flex justify-content-center diet-cancel-btn"
          onClick={(e)=>{
            if(amount < 50000000)
              setAmount(amount + 10000000)
          }}>
          <MdAdd  size={22} color={"#575757"} />
        </Button>
      </div>
    )
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
      <FixedHeader title={"انتخاب درگاه پرداخت"} useBack={true} />
      <FixedFooter component={
        <div className={`btn blue-button ${selectedPaymentGateway ? "" : "disabled"}`} style={{height: '2.3rem', borderRadius: "20rem", marginTop: '1rem'}} onClick={async () => {
          await onPayment()
        }}>
          مرحله بعد
        </div>
      }/>
      <div className="nk-content " style={{background: '#fff', height: "100vh"}}>
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container p-3 pt-5 m-0">
                  <div className="row ">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5 mb-3 p-5 profile-container">
                      <ProductSummary/>
                      <UseWalletForPayment/>
                      <AmountSelector/>
                      <AmountTicker/>



                      <div className="p-0 d-flex flex-row justify-content-between align-content-center">
                        <div className="payment-gateway-title">
                          انتخاب درگاه پرداخت
                        </div>
                      </div>

                      {
                        paymentGateway.map(item => {
                          return(
                            <PaymentGatewayItem item={item}/>
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
    </React.Fragment>

  );
};

export default Payment;
