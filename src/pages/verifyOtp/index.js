import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../components/Component";
import { Field } from "../../components/fouladyar/field/field";

import { validateToken } from "../old/auth";
import axios from "axios";
import { setToken } from "../../redux/store/services/auth/store";
import { setProfile } from "../../redux/store/services/profile/store";
import toast from "react-hot-toast";
import { ErrorToaster } from "../../shared/toaster";
import PhnoeImage from "../../assets/images/fitness-academic/phone-message.png"
const VerifyOTP = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Access specific query parameters
  const number = queryParams.get('number');
  const [data, setData] = useState({
    otpCode: "",
  });
  const auth = useSelector((state) => state.auth);
  const [IS_TOKEN_VALID, SET_IS_TOKEN_VALID] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function validateAccessToken(){
      const tokenValidation = await validateToken(auth.token);


      if(tokenValidation){
        navigate(`/home`)
      }else{
        SET_IS_TOKEN_VALID(false);
      }
    }
    validateAccessToken()

  }, [auth.token]);






  async function onVerifyOtp() {

    try {

      console.log('numb', number)
      const loginCredentials = await axios.post(`${process.env.REACT_APP_API_URL}/otp/verify`, {
        phoneNumber: number,
        otpCode: data.otpCode,
      });

      console.log('loginCredentials', loginCredentials)
      if(loginCredentials.status === 200){

        dispatch(setToken(loginCredentials.data.accessToken));
        navigate(`/home`)
      }


    } catch (error) {
      ErrorToaster(error)
    }
  }

  return (
    <>
      {
        IS_TOKEN_VALID ? <></> :
          <>
            <div className="nk-content-auth pt-5">
              <div className="container-fluid-doctor">
                <div className=" d-flex flex-column justify-content-center align-content-center">

                  <div className="d-flex justify-content-center mb-4">
                    <div className=" otp-form-image">
                      <img src={PhnoeImage} alt=""></img>
                    </div>
                  </div>

                  <div className=" mb-4">
                    <div className="w-auto p-0 m-0 otp-form-title">کد احراز هویت</div>
                  </div>

                  <div className=" mb-4">
                    <div className="w-auto p-0 m-0 otp-form-description">لطفا کد پیامک شده به شماره تماسي در مرحله قبل وارد کردید را در فیلد زیر وارد کنید </div>
                  </div>


                  <div className="login-otp-container w-100">
                    <div className=" w-100">
                      <Field
                        id={"email"}
                        name={"email"}
                        placeholder={"کد"}
                        type={"text"}
                        value={data.otpCode}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          otpCode: e
                        }))}}
                      />

                    </div>
                    <div className={`btn blue-button`} onClick={async () => {
                      await onVerifyOtp()
                    }}>
                      ورود
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </>
      }
    </>




  );
};

export default VerifyOTP;
