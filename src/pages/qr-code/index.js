import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/Component";
import { LuCalendar, LuDownload, LuPrinter } from "react-icons/lu";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import QRCode from "../../assets/images/cliconsult/icons/qr-code.png";
import ImageContainer from "../../components/partials/gallery/GalleryImage";
import { Field } from "../../components/fouladyar/field/field";
import { BiLink } from "react-icons/bi";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { convertToTitleCase } from "../../shared/textTools";
const QrCode = () => {
  const profile = useSelector((state) => state.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [data, setData]= useState(`${process.env.REACT_APP_PATIENT_URL}/doctor-profile/${profile.subjectId || ''}`)
  const qrCodeRef = useRef();

  useEffect(()=>{

  }, [])


  const printQRCode = () => {

  };

  const downloadQRCode = () => {
    const canvas = document.querySelector("#qrcode-canvas")
    if (!canvas) throw new Error("<canvas> not found in the DOM")

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = "QR code.png"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  function copyToClipboard(text) {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
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

      <HeaderDoctor title={"QR Code / URL"} />
      <div className="nk-content ">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container">
                  <div className="row ps-4 pe-4">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5 mb-3 p-5 profile-container">
                      <div className="row d-flex justify-center align-start">
                        <div className="col-sm-12 col-md-10 col-lg-8 mb-5 ">


                          <div className="row d-flex justify-center align-center qr-title pb-4">QR Code unique du
                            {`
                              ${profile.gender === "MALE" ? "M." : (profile.gender === "FEMALE" ? "Mme" : "Inconnu")} 
                              ${profile.doctorOrProfessor === "DOCTOR" ? 'Dr.' : (profile.doctorOrProfessor === "PROFESSOR" ? "Prof." : "")}
                              ${convertToTitleCase(profile.firstName)} ${convertToTitleCase(profile.lastName)}
                            `}
                          </div>
                          <div className="row">
                            <div className="qr-code-container pt-3">
                              {/*<ImageContainer img={QRCode} />*/}
                              <QRCodeCanvas
                                id="qrcode-canvas"
                                level="H"
                                value={data}
                                size={400}
                                style={{width: "100%", height: "100%"}}
                              />
                            </div>
                          </div>
                          <div className="row d-flex justify-center align-center  qr-description pt-4 pb-4">
                            Présentez ce QR code ou ce lien URL aux patients pour la prise de rendez-vous!
                          </div>
                          <div className="row d-flex justify-center align-center">
                            <div className="col" style={{ maxWidth: "550px" }}>

                              <div className="row">
                                <div className="col pe-0">
                                  <div className={`btn-sm blue-button`} onClick={() => {copyToClipboard(data)}}>
                                    <BiLink size={20} color={"#fff"} className="me-1" />
                                    Copier le lien
                                  </div>
                                </div>
                                <div className="col pe-0">
                                  <div className={`btn-sm blue-button`} onClick={downloadQRCode}>
                                    <LuDownload size={20} color={"#fff"} className="me-1" />
                                    Télécharger
                                  </div>
                                </div>
                                <div className="col pe-0">
                                  <div className={`btn-sm blue-button`} onClick={printQRCode}>
                                    <LuPrinter size={20} color={"#fff"} className="me-1" />
                                    Imprimer
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-5 d-flex justify-center align-center">
                            <div className="col" style={{ maxWidth: "550px" }}>
                              <div className="row">
                                <div className="col pe-0 ">
                                  <Field
                                    id={"email"}
                                    name={"email"}
                                    isRequired={true}
                                    disabled={true}
                                    type={"text"}
                                    value={data}
                                    onChange={(e) => {
                                    }}
                                  />
                                </div>
                                <div className="col-sm-auto ps-1 pe-0">
                                  <div className={`btn blue-button`} onClick={() => {copyToClipboard(data)}}>
                                    <BiLink size={20} color={"#fff"} className="me-1" />
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
        </div>
      </div>
    </React.Fragment>

  );
};

export default QrCode;
