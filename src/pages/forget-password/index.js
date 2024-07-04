import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../components/Component";
import { Field } from "../../components/fouladyar/field/field";


const DoctorForgetPassword = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();


  function ForgetPasswordForm({}){
    return(
      <div className="container">


        <div className="row d-flex">
          <h6 className="profile-title p-1 text-center" >{'Mot de passe oublié'}</h6>
        </div>

        <div className="row  mb-4">
          <p className="text-center">
            Veuillez saisir votre E-mail de connexion afin de recevoir
            <b> le lien de réinitialisation de votre mot de passe.</b>
          </p>
        </div>


        <div className="row mb-2">
          <Field
            id={"email"}
            name={"email"}
            label={"E-mail de connexion"}
            type={"text"}
            value={''}
            onChange={(e) => { }}
          />
        </div>


      </div>
    )
  }


  function Header() {
    return (
      <>
        <div className="container">
          <div className="row d-flex justify-end align-end p-0 pb-2 pt-2 close">
            <Link to={`${process.env.PUBLIC_URL}/login`}>
              <Icon name="cross" className="p-0 text-end" style={{ fontSize: 24 }}></Icon>
            </Link>
          </div>
        </div>
      </>
    );
  }


  return (
    <div className="nk-content-auth pt-5">
      <div className="container-fluid-doctor">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block d-flex justify-center align-center">

              <div className="container ">
                <Header />

                <div className="ps-3 pe-3">
                  <ForgetPasswordForm />

                  <Link to={`${process.env.PUBLIC_URL}/email-sent`}>
                    <div className="container mb-4">
                      <div className={`btn blue-button`} onClick={() => {
                      }}>
                        Recevoir le lien
                      </div>
                    </div>
                  </Link>

                  <div className="row d-flex">
                    <div className="p-1 text-center" >Si vous avez besoin d'assistance</div>
                  </div>

                  <div className="row d-flex justify-center">
                    <Link to={`${process.env.PUBLIC_URL}/email-sent`}>
                      <div  className="col-sm-auto pt-0 pt-0 p-1 m-0  d-flex justify-center" >veuillez nous contacter</div>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorForgetPassword;
