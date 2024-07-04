import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../components/Component";
import { Field } from "../../components/fouladyar/field/field";

import { validateToken } from "../old/auth";
import axios from "axios";
import { setToken } from "../../redux/store/services/auth/store";
import { setProfile } from "../../redux/store/services/profile/store";
import toast from "react-hot-toast";
import { ErrorToaster } from "../../shared/toaster";
import PhnoeImage from "../../assets/images/fitness-academic/phone.png"
const LoginOTP = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    phoneNumber: "",
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


  async function onLogin(){


    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/otp`, {
        phoneNumber: data.phoneNumber.replace(/\s/g, '')
      });

      console.log('res___________________', res);
      if (res.status === 200) {
        navigate(`/verify-otp?number=${data.phoneNumber}`)
      }
    }catch (e){
      ErrorToaster(e)
    }
  }




  async function onSubmitForm() {

    try {

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login/provider`, {
        email: data.email,
        password: data.password
      });
      if (res.status === 200) {
        dispatch(setToken(res.data.accessToken));



        dispatch(setProfile({
          firstName: res.data.firstName,
          lastName: res.data.lastName ,
          email: res.data.email ,
          dateOfBirth: res.data.dateOfBirth ,
          avatar: res.data.avatar ,
          doctorOrProfessor: res.data.doctorOrProfessor,
          gender: res.data.gender,
          mobileNumber: res.data.mobileNumber,
          subjectId: res.data.subjectId
        }))

        navigate(`/home`);
      }

    } catch (e) {
      ErrorToaster(e);
      // toast.error(e.response.data.error || (e.response.data.message || e.message))
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
                    <div className="w-auto p-0 m-0 otp-form-title">ورود با شماره تماس</div>
                  </div>

                  <div className=" mb-4">
                    <div className="w-auto p-0 m-0 otp-form-description">لطفا شماره تماس خود را وارد کنید. اپلیکیشن به شما کد OTP جهت احراز هویت ارسال خواهد کرد.</div>
                  </div>


                  <div className="login-otp-container w-100">
                    <div className=" w-100">
                      <Field
                        id={"email"}
                        name={"email"}
                        placeholder={"شماره تماس"}
                        type={"text"}
                        value={data.phoneNumber}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          phoneNumber: e
                        }))}}
                      />

                    </div>
                    <div className={`btn blue-button`} onClick={async () => {
                      await onLogin()
                    }}>
                      ارسال شماره تماس
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

export default LoginOTP;
