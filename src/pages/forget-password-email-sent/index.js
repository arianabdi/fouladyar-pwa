import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../components/Component";
import { Field } from "../../components/fouladyar/field/field";

import ImageContainer from "../../components/partials/gallery/GalleryImage";
import Email from "../../assets/images/cliconsult/icons/email-sent.png";

const DoctorForgetPasswordEmailSent = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();


  function ForgetPasswordForm({}) {
    return (
      <div className="container">


        <div className="row d-flex justify-center align-center pb-5 pt-5">
          <div style={{width: '110px'}}>
            <ImageContainer img={Email} />
          </div>
        </div>

        <div className="row  mb-4">
          <p className="text-center email-sent-text">
            <b> Nous vous avons envoyé un e-mail avec un lien pour réinitialiser votre mot de passe.</b>
          </p>
        </div>

        <div className="row  mb-4">
          <p className="text-center email-sent-text">
            Si le mail de réinitialisation n'apparait pas dans votre boite de réception, pensez à verifier dans vos spams.
          </p>
        </div>

      </div>
    );
  }


  function Header() {
    return (
      <>
        <div className="container">
          <div className="row d-flex justify-end align-end p-0 pb-2 pt-2 close">
            <Link to={`${process.env.PUBLIC_URL}/forget-password`}>
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

                  <div className="row d-flex justify-center ">
                    <Link to={`${process.env.PUBLIC_URL}/`}>
                      <div className="col-sm-auto pt-0 pt-0 p-1 m-0  d-flex justify-center">Vous n'avez pas reçu l'e-mail ?</div>
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

export default DoctorForgetPasswordEmailSent;
