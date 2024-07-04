import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import { Field } from "../../components/fouladyar/field/field";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ErrorToaster } from "../../shared/toaster";
import toast from "react-hot-toast";

const ContactUs = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [data, setData] = useState({
    "email": "",
    "pattern": "",
    "name": "",
    "message": "",

  });







  async function onSubmitForm() {

    try {

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/contactus`, data, {
        headers: { authorization: `bearer ${auth.token}` }
      });

      if (res.status === 200) {
        toast.success('Votre message a été envoyé avec succès. \nMerci d\'avoir contacté!\n Nous vous répondrons dans les plus brefs délais.', )
        navigate(`/home`);
      }

    } catch (e) {
      ErrorToaster(e);
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

      <HeaderDoctor title={"Contacter le support"} />
      <div className="nk-content ">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container">
                  <div className="row ps-4 pe-4">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5 mb-5 p-5 profile-container">
                      <div className="d-flex justify-content-center">
                        <div className="col-sm-12 col-md-6 col-xxl-6">
                          <div className="">
                            <Field
                              className="mb-2"
                              id={"select-pattern"}
                              name={"select-pattern"}
                              label={t('Sélectionner un motif')}
                              type={"select"}
                              options={[
                                { label: "Retour", value: "Feedback" },
                                { label: "Rapport d'erreur", value: "Bug report" },
                                { label: "Demande de fonctionnalité", value: "Feature request" },
                                { label: "Problème technique", value: "Technical issue" },
                              ]}
                              value={data.pattern}
                              onChange={(e) => {
                                setData(prevState => ({
                                  ...prevState,
                                  pattern: e
                                }));
                              }}
                            />
                          </div>
                          <div className="">
                            <Field
                              className="mb-2"
                              id={"email"}
                              name={"email"}
                              label={t('Votre adresse E-mail')}
                              type={"text"}
                              value={data.email}
                              onChange={(e) => {
                                setData(prevState => ({
                                  ...prevState,
                                  email: e
                                }));
                              }}
                            />
                          </div>
                          <div className="">
                            <Field
                              className="mb-2"
                              id={"name"}
                              name={"name"}
                              label={t('Votre nom')}
                              type={"text"}
                              value={data.name}
                              onChange={(e) => {
                                setData(prevState => ({
                                  ...prevState,
                                  name: e
                                }));
                              }}
                            />
                          </div>
                          <div className="">
                            <Field
                              className="mb-2"
                              id={"message"}
                              name={"message"}
                              label={"Message"}
                              type={"textarea"}
                              value={data.message}
                              onChange={(e) => {
                                setData(prevState => ({
                                  ...prevState,
                                  message: e
                                }));
                              }}
                            />
                          </div>
                          <div className="mt-3">
                            <Field
                              id={"resterconnect"}
                              name={"resterconnect"}
                              label={"En utilisant ce formulaire, j'accepte les conditions d'utilisation et la politique de confidentialité de CLICONSULT pour collecter mes données."}
                              type={"checkbox"}
                              value={termsAndConditions}
                              onChange={(e) => {
                                setTermsAndConditions(e)
                              }}
                            />
                          </div>
                          <div className="mt-3 mb-3">
                            <div className="col-sm-12">
                              <div className={`btn blue-button ${!termsAndConditions ? 'disabled' : ''}`} onClick={async () => {
                                if(termsAndConditions)
                                  await onSubmitForm();
                              }}>
                                Soumettre
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
      </div>
    </React.Fragment>

  );
};

export default ContactUs;
