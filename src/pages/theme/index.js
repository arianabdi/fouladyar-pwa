import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, UserAvatar } from "../../components/Component";
import User from "../../images/avatar/b-sm.jpg";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import { Field } from "../../components/fouladyar/field/field";
import { makeStyles } from "@material-ui/styles";


import AEdit from "../../assets/images/cliconsult/icons/a-edit.png";
import ImageContainer from "../../components/partials/gallery/GalleryImage";
import axios from "axios";
import toast from "react-hot-toast";
import { ErrorToaster } from "../../shared/toaster";

const EditThemeInDoctorDashboard = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [theme, setTheme] = useState({
    backgroundColor: "#f2f2fb",
    textColor: "#4D516B",
    buttonColor: "#2A2A6D",
    navbarColor: "#39a498",
    title: `Bienvenue au RDV du Dr. ${profile.firstName || ''} ${profile.lastName || ''}`,
    subtitle: "Cliquez sur commencer pour prendre un RDV d'urgence",
    logo: "",
  })

  useEffect(() => {
    async function loadTheme(){
      try {
        setIsLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/provider/theme`,{
          headers: {authorization: `bearer ${auth.token}`}
        });

        if (res.status === 200 && res.data) {
          setTheme(res.data)
        }

        setIsLoading(false)

      } catch (e) {

        setIsLoading(false)
        toast.error(e.message)
      }
    }
    loadTheme()

  }, []);



  function ProfilePreview() {
    return(
      <div style={{overflow: 'hidden'}} className="row-sm d-flex flex-row  justify-center align-center profile-preview">
        <div className="col-sm pt-5 d-flex flex-column justify-start align-center p-0 pb-2">

          <div  className={`${classes.aeditContainer} mb-3`}>
            <div className={classes.aeditImage}><ImageContainer img={theme.logo ? `${process.env.REACT_APP_S3_BUCKET}/${theme.logo}` : AEdit}  /></div>
            <div className={`row-sm p-0 ${classes.profilePreviewDoctorName}`}>
              Création de logo
            </div>
          </div>

          <div className="row-sm justify-center align-center ">
            <div style={{ paddingLeft: 0, width: "auto" }}>
              <UserAvatar className="profile-avatar-theme" image={profile.avatar ?`${process.env.REACT_APP_S3_BUCKET}/${profile.avatar}` : User}></UserAvatar>
            </div>
          </div>

          <div className={`row-sm ${classes.profilePreviewDoctorName}`} style={{color: theme.textColor}}>
            {theme.title}
          </div>

          <div className={`row-sm ${classes.profilePreviewBio}`} style={{color: theme.textColor}}>
            {theme.subtitle}
          </div>

          <div className="row-sm justify-center align-center m-0 w-100">
            <div className={`btn button-theme-style m-0`} style={{
              justifyContent: "center",
              textTransform: "uppercase",
              backgroundColor: theme.buttonColor,
              color: "#fff",
            }} onClick={() => {
            }}>
              Commencer
            </div>
          </div>

        </div>
      </div>
    )
  }

  function TicketPreview() {

    return(
      <div style={{overflow: 'hidden'}} className="row-sm d-flex flex-row  justify-center align-center w-100">
        <div className="col-sm pt-5 d-flex flex-column justify-start align-center p-0 pb-2">

          <div className={classes.aeditImage}>
            <ImageContainer img={theme.logo ? `${process.env.REACT_APP_S3_BUCKET}/${theme.logo}` : AEdit} />
          </div>

          <div className={`row-sm ${classes.profilePreviewBio} p-0 m-0`} style={{color: theme.textColor}}>
            Merci de votre enregistrement
          </div>
          <div className={`row-sm ${classes.profilePreviewDoctorName}  p-0 m-0`} style={{color: theme.textColor}}>
            Raya Sa’afi
          </div>

          <div className="row-sm justify-center align-center" style={{padding: "0px 12px", position: 'relative'}}>
            <span class="ticket">
              <span className="ticket-container">
                <div className="ticket-text">Votre numéro</div>
                <div className="ticket-number">3</div>
                <div className="p-0 pt-2 pb-2"></div>
                <div className="ticket-text">Heure approximative du rdv</div>
                <div className="ticket-time">20:38</div>
              </span>
            </span>

            <svg width="200" height="200" viewBox="0 0 200 200" fill={theme.navbarColor} xmlns="http://www.w3.org/2000/svg">
              <path d="M199.333 109.283V8.28117C199.332 6.21877 198.512 4.24109 197.053 2.78275C195.594 1.32442 193.615 0.504755 191.552 0.503906H8.44687C6.38352 0.504755 4.40492 1.32442 2.94591 2.78275C1.4869 4.24109 0.666865 6.21877 0.666016 8.28117V109.283C5.16566 109.283 9.481 111.07 12.6627 114.25C15.8445 117.43 17.6319 121.744 17.6319 126.241C17.6319 130.739 15.8445 135.052 12.6627 138.232C9.481 141.413 5.16566 143.199 0.666016 143.199V191.882C0.666866 193.944 1.48701 195.921 2.94611 197.379C4.40521 198.837 6.38381 199.656 8.44687 199.656H191.552C193.615 199.656 195.593 198.837 197.053 197.379C198.512 195.921 199.332 193.944 199.333 191.882V143.199C194.833 143.199 190.518 141.413 187.336 138.232C184.154 135.052 182.367 130.739 182.367 126.241C182.367 121.744 184.154 117.43 187.336 114.25C190.518 111.07 194.833 109.283 199.333 109.283ZM27.8685 130.359C27.0449 130.356 26.2407 130.109 25.5575 129.649C24.8742 129.189 24.3425 128.538 24.0295 127.776C23.7165 127.015 23.6363 126.178 23.7989 125.371C23.9615 124.564 24.3597 123.823 24.9432 123.242C25.5267 122.661 26.2693 122.266 27.0774 122.106C27.8854 121.947 28.7226 122.03 29.4832 122.346C30.2438 122.662 30.8938 123.196 31.351 123.88C31.8083 124.565 32.0523 125.37 32.0523 126.193C32.0523 126.741 31.944 127.284 31.7335 127.791C31.5231 128.297 31.2147 128.757 30.826 129.144C30.4372 129.531 29.9759 129.838 29.4684 130.046C28.9609 130.255 28.4172 130.361 27.8685 130.359ZM39.9069 130.359C39.0826 130.359 38.2768 130.115 37.5914 129.657C36.9061 129.199 36.3719 128.548 36.0564 127.787C35.741 127.026 35.6584 126.188 35.8192 125.38C35.9801 124.572 36.377 123.83 36.9599 123.247C37.5427 122.665 38.2854 122.268 39.0938 122.107C39.9023 121.947 40.7403 122.029 41.5018 122.344C42.2634 122.66 42.9143 123.194 43.3723 123.879C43.8302 124.564 44.0747 125.369 44.0747 126.193C44.0747 127.298 43.6356 128.357 42.8539 129.139C42.0723 129.92 41.0123 130.359 39.9069 130.359ZM51.9421 130.359C51.1178 130.359 50.312 130.115 49.6266 129.657C48.9412 129.199 48.407 128.548 48.0916 127.787C47.7761 127.026 47.6936 126.188 47.8544 125.38C48.0152 124.572 48.4122 123.83 48.995 123.247C49.5779 122.665 50.3205 122.268 51.129 122.107C51.9375 121.947 52.7754 122.029 53.537 122.344C54.2985 122.66 54.9495 123.194 55.4074 123.879C55.8654 124.564 56.1098 125.369 56.1098 126.193C56.1098 127.298 55.6707 128.357 54.8891 129.139C54.1075 129.92 53.0474 130.359 51.9421 130.359ZM63.9772 130.359C63.1529 130.359 62.3471 130.115 61.6618 129.657C60.9764 129.199 60.4422 128.548 60.1267 127.787C59.8113 127.026 59.7288 126.188 59.8896 125.38C60.0504 124.572 60.4473 123.83 61.0302 123.247C61.6131 122.665 62.3557 122.268 63.1641 122.107C63.9726 121.947 64.8106 122.029 65.5721 122.344C66.3337 122.66 66.9846 123.194 67.4426 123.879C67.9005 124.564 68.145 125.369 68.145 126.193C68.145 127.298 67.7059 128.357 66.9243 129.139C66.1427 129.92 65.0826 130.359 63.9772 130.359ZM76.0124 130.359H75.9931C74.8844 130.359 73.821 129.919 73.037 129.135C72.253 128.351 71.8126 127.288 71.8126 126.18C71.8126 125.072 72.253 124.009 73.037 123.225C73.821 122.442 74.8844 122.002 75.9931 122.002H76.0124C77.1211 122.002 78.1845 122.442 78.9685 123.225C79.7525 124.009 80.1929 125.072 80.1929 126.18C80.1929 127.288 79.7525 128.351 78.9685 129.135C78.1845 129.919 77.1211 130.359 76.0124 130.359ZM88.0475 130.359H88.0283C86.9195 130.359 85.8562 129.919 85.0722 129.135C84.2882 128.351 83.8477 127.288 83.8477 126.18C83.8477 125.072 84.2882 124.009 85.0722 123.225C85.8562 122.442 86.9195 122.002 88.0283 122.002H88.0475C89.1563 122.002 90.2196 122.442 91.0036 123.225C91.7877 124.009 92.2281 125.072 92.2281 126.18C92.2281 127.288 91.7877 128.351 91.0036 129.135C90.2196 129.919 89.1563 130.359 88.0475 130.359ZM100.063 130.359C99.2392 130.359 98.4334 130.115 97.748 129.657C97.0626 129.199 96.5284 128.548 96.213 127.787C95.8975 127.026 95.815 126.188 95.9758 125.38C96.1366 124.572 96.5335 123.83 97.1164 123.247C97.6993 122.665 98.4419 122.268 99.2504 122.107C100.059 121.947 100.897 122.029 101.658 122.344C102.42 122.66 103.071 123.194 103.529 123.879C103.987 124.564 104.231 125.369 104.231 126.193C104.231 127.298 103.792 128.357 103.011 129.139C102.229 129.92 101.169 130.359 100.063 130.359ZM112.099 130.359C111.274 130.359 110.469 130.115 109.783 129.657C109.098 129.199 108.564 128.548 108.248 127.787C107.933 127.026 107.85 126.188 108.011 125.38C108.172 124.572 108.569 123.83 109.152 123.247C109.734 122.665 110.477 122.268 111.286 122.107C112.094 121.947 112.932 122.029 113.694 122.344C114.455 122.66 115.106 123.194 115.564 123.879C116.022 124.564 116.266 125.369 116.266 126.193C116.266 127.298 115.827 128.357 115.046 129.139C114.264 129.92 113.204 130.359 112.099 130.359ZM124.224 130.359C123.399 130.359 122.593 130.115 121.908 129.657C121.223 129.199 120.688 128.548 120.373 127.787C120.058 127.026 119.975 126.188 120.136 125.38C120.297 124.572 120.694 123.83 121.277 123.247C121.859 122.665 122.602 122.268 123.41 122.107C124.219 121.947 125.057 122.029 125.818 122.344C126.58 122.66 127.231 123.194 127.689 123.879C128.147 124.564 128.391 125.369 128.391 126.193C128.391 127.298 127.952 128.357 127.171 129.139C126.389 129.92 125.329 130.359 124.224 130.359ZM136.259 130.359C135.434 130.359 134.629 130.115 133.943 129.657C133.258 129.199 132.724 128.548 132.408 127.787C132.093 127.026 132.01 126.188 132.171 125.38C132.332 124.572 132.729 123.83 133.312 123.247C133.895 122.665 134.637 122.268 135.446 122.107C136.254 121.947 137.092 122.029 137.854 122.344C138.615 122.66 139.266 123.194 139.724 123.879C140.182 124.564 140.426 125.369 140.426 126.193C140.426 127.298 139.987 128.357 139.206 129.139C138.424 129.92 137.364 130.359 136.259 130.359ZM148.294 130.359C147.47 130.359 146.664 130.115 145.978 129.657C145.293 129.199 144.759 128.548 144.443 127.787C144.128 127.026 144.045 126.188 144.206 125.38C144.367 124.572 144.764 123.83 145.347 123.247C145.93 122.665 146.672 122.268 147.481 122.107C148.289 121.947 149.127 122.029 149.889 122.344C150.65 122.66 151.301 123.194 151.759 123.879C152.217 124.564 152.462 125.369 152.462 126.193C152.462 127.298 152.022 128.357 151.241 129.139C150.459 129.92 149.399 130.359 148.294 130.359ZM160.329 130.359H160.31C159.201 130.359 158.138 129.919 157.354 129.135C156.57 128.351 156.129 127.288 156.129 126.18C156.129 125.072 156.57 124.009 157.354 123.225C158.138 122.442 159.201 122.002 160.31 122.002H160.329C161.438 122.002 162.501 122.442 163.285 123.225C164.069 124.009 164.51 125.072 164.51 126.18C164.51 127.288 164.069 128.351 163.285 129.135C162.501 129.919 161.438 130.359 160.329 130.359ZM172.364 130.359H172.345C171.236 130.359 170.173 129.919 169.389 129.135C168.605 128.351 168.164 127.288 168.164 126.18C168.164 125.072 168.605 124.009 169.389 123.225C170.173 122.442 171.236 122.002 172.345 122.002H172.364C173.473 122.002 174.536 122.442 175.32 123.225C176.104 124.009 176.545 125.072 176.545 126.18C176.545 127.288 176.104 128.351 175.32 129.135C174.536 129.919 173.473 130.359 172.364 130.359Z"/>
            </svg>

          </div>

          <div className={`row-sm ${classes.profilePreviewBio} p-0 m-0`} style={{color: theme.textColor}}>
            Nombre de personnes devant vous
          </div>

          <div className={`row-sm ${classes.profilePreviewDoctorName} p-0 m-0`} style={{color: theme.textColor}}>
            25
          </div>

          <div className="row-sm justify-center align-center m-0 w-100">
            <div className={`btn button-theme-style m-0`} style={{
              justifyContent: "center",
              textTransform: "uppercase",
              backgroundColor: theme.buttonColor,
              color: "#fff",
            }} onClick={() => {
            }}>
              Annuler
            </div>
          </div>
        </div>
      </div>
    )
  }

  function Iphone({content}){
    return(
      <div class="iphone-wrapper">
        <div class="iphone" style={{backgroundColor: theme.backgroundColor}}>
          <div class="front-camera"></div>
          <div className="w-100">
            {content}
          </div>
        </div>
      </div>
    )
  }

  async function uploadLogo(){
    try {
      if(logoImage){
        const formData = new FormData();
        formData.append('img', logoImage);

        const imageUpload = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/s3/img/upload`,formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (imageUpload.status === 200) {
          // setTheme(res.data)

          toast.success('Le nouveau logo a été téléchargé avec succès')
          setTheme(prevState => ({
            ...prevState,
            logo: imageUpload.data.imageId,
          }))

          return imageUpload.data.imageId;
        }
      }
      return  theme.logo
    }catch (e) {
      ErrorToaster(e);
    }
  }

  async function submitThemeForm(){
    try {
      setIsLoading(true)



      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/provider/theme`,{
        ...theme,
        logo: await uploadLogo(),
      },{
        headers: {authorization: `bearer ${auth.token}`}
      });


      if (res.status === 200) {
        toast.success('votre thème a été mis à jour avec succès')
      }

      setIsLoading(false)

    } catch (e) {

      setIsLoading(false)
      toast.error(e.response.data.error || (e.response.data.message || e.message))
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




      <HeaderDoctor title={"Modifier le profil"} />
      <div className="nk-content patient-nk-content">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container">
                  <div className="row ps-0 pe-0">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="row">


                        <div className="col-sm-12 col-md-12 col-lg p-0 pe-lg-2 mb-sm-2 mb-lg-0">
                          <div className="row-sm setting-container-item p-2 mb-2">
                            <div className="col-sm-12">
                              <div className="row-sm-auto mb-2 mt-2 p-2 setting-container-item">
                                <div className="col">
                                  <div className="row  mb-1">
                                    <div className="col-sm-4 align-center">
                                      Titre
                                    </div>
                                    <div className="col-sm-8">
                                      <Field
                                        id={"title"}
                                        name={"title"}
                                        isRequired={true}
                                        type={"text"}
                                        value={theme.title}
                                        onChange={(e) => {
                                          setTheme(prevState => ({
                                            ...prevState,
                                            title: e
                                          }))
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-4 align-center">
                                      Sous-titre
                                    </div>
                                    <div className="col-sm-8">
                                      <Field
                                        id={"subtitle"}
                                        name={"subtitle"}
                                        isRequired={true}
                                        type={"text"}
                                        value={theme.subtitle}
                                        onChange={(e) => {
                                          setTheme(prevState => ({
                                            ...prevState,
                                            subtitle: e
                                          }))
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row-sm-auto mb-2 mt-2 p-2 setting-container-item">
                                <div className="col">
                                  <div className="row">
                                    <div className="col-sm-4 align-center">
                                      Télécharger le logo
                                    </div>
                                    <div className="col-sm-8 logo-container">
                                      <Field
                                        id={"logo"}
                                        name={"logo"}
                                        type={"file-upload"}
                                        value={theme.logo}
                                        fileUploadType={'post'}
                                        multiple={false}
                                        onChange={(e) => {
                                          if(e[0]) {
                                            setLogoImage( e[0].file)
                                          }
                                        }}
                                        onCancel={(e) => {
                                          setTheme(prevState => ({
                                            ...prevState,
                                            logo: null
                                          }))
                                        }}
                                      />
                                    </div>
                                  </div>

                                </div>
                              </div>
                              <div className="row-sm-auto mb-2 p-2">
                                <div className="col">
                                  <div className="row  align-end justify-end">
                                    <div className="col-sm-12 col-md-10 col-lg-8 ps-0 pe-0">
                                      <div className="row">
                                        <div className="col-sm-6 pe-0">
                                          <div className={`btn white-button`} onClick={() => {
                                            navigate('/home')
                                          }}>
                                            Annuler
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className={`btn blue-button ${isLoading ? 'disabeld' : ''}`} onClick={async () => {
                                            if(!isLoading)
                                              await submitThemeForm()
                                          }}>
                                            Valider
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


                        <div className="col-sm-12 col-md-12 col-lg-auto p-0">

                          <div className="row-sm setting-container-item p-2 mb-2">
                            <div className="col-sm-12">
                              <div className="row ">
                                <div className={`col-sm-12 col-md-12 ${classes.colorSelectorFlexBox}`}>
                                  {/*<ProfilePreview/>*/}
                                  <Iphone content={<><ProfilePreview/></>}/>
                                </div>
                                <div className={`col-sm-12 col-md-12 ${classes.colorSelectorFlexBox}`}>
                                  <Iphone content={<><TicketPreview/></>}/>
                                </div>
                              </div>
                              <div className="row">


                                <div className={`${classes.cardContainer} ${classes.t2Container}`}>
                                  {/*<ColorItem text={"Arrière-plan"} color={"#D6D6D6"} />*/}
                                  <Field
                                    id={"background"}
                                    name={"background"}
                                    label={"Arrière-plan"}
                                    type={"color"}
                                    value={theme.backgroundColor}
                                    onChange={(e) => {
                                      setTheme(prevState => ({
                                        ...prevState,
                                        backgroundColor: e
                                      }))
                                    }}
                                  />
                                  <Field
                                    id={"text"}
                                    name={"text"}
                                    label={"Texte"}
                                    type={"color"}
                                    value={theme.textColor}
                                    onChange={(e) => {
                                      setTheme(prevState => ({
                                        ...prevState,
                                        textColor: e
                                      }))
                                    }}
                                  />


                                  <Field
                                    id={"button"}
                                    name={"button"}
                                    label={"Bouton"}
                                    type={"color"}
                                    value={theme.buttonColor}
                                    onChange={(e) => {
                                      setTheme(prevState => ({
                                        ...prevState,
                                        buttonColor: e
                                      }))
                                    }}
                                  />

                                  <Field
                                    id={"ticket"}
                                    name={"text"}
                                    label={"Barre de menu"}
                                    type={"color"}
                                    value={theme.navbarColor}
                                    onChange={(e) => {
                                      setTheme(prevState => ({
                                        ...prevState,
                                        navbarColor: e
                                      }))
                                    }}
                                  />
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

export default EditThemeInDoctorDashboard;


const useStyles = makeStyles((theme) => ({

    flagItemImage: {
      width: 30,
      height: 30
    },
    aeditImage: {
      width: "30px",
      height: "30px",
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    aeditContainer: {
      width: "90%",
      height: "50px",
      backgroundColor: "#FFFFFF",
      border: "2.08021px solid rgba(67, 29, 91, 0.16)",
      borderRadius: "10px",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    profilePreviewDoctorName:{
      fontFamily: 'Nunito',
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "13px",
      textAlign: "center",
      lineHeight: "18px",
      padding: "10px 5px"
    },
    profilePreviewBio:{
      fontFamily: 'Nunito',
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "10px",
      color: "#4D516B",
      textAlign: "center",
      lineHeight: "18px",
      padding: "10px 5px"
    },
    flagItemContainer: {
      width: 38,
      height: 38,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      margin: 4,
      borderWidth: 3,
      padding: 0,
      borderRadius: 40,
      borderColor: "#fff"
    },
    colorSelectorFlexBox:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
    selectView: {
      top: 0,
      left: 0,
      width: "38px",
      height: "38px",
      position: "absolute",
      alignItems: "center",
      borderRadius: "40px",
      justifyContent: "center",
      backgroundColor: "#D9D9D999",
      zIndex: "30",
      display: "flex",
      border: "2px solid #106C88"
    },
    colorItemIcon: {
      fontSize: 16,
      fontWeight: "700",
      color: "#ffffff"
    },
    languagePreviewContainer: {
      backgroundColor: "#431D5B",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      display: 'flex'
    },
    langPrevItemContainer: {
      display: 'flex',
      borderRightWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: '20px 0px',
    },
    langFlag: {
      width: 15,
      height: 15
    },
    langText: {
      color: "#fff",
      fontSize: 9
    },
    rowContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 10,
      zIndex: 100
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      borderRadius: 120,
      overflow: "hidden",
      resizeMode: "cover"
    },
    avatarTitle: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "700",
      color: "#22247D"
    },
    rowItems: {
      width: "49%"
    },
    demoTitle: {
      color: "#4D516B",
      fontSize: 15,
      fontWeight: "700",
      textAlign: "center"
    },
    demoContent: {
      color: "#4D516B",
      fontSize: 12,
      fontWeight: "400",
      textAlign: "center"
    },
    demoButton: {
      backgroundColor: "#C5A470",
      borderRadius: 10,
      paddingVertical: 7,
      width: "80%",
      alignItems: "center",
      justifyContent: "center"
    },
    t1Container: {
      width: "59%",
      height: 380,
      borderRadius: 30,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "space-between",
      overflow: "hidden",
      borderColor: "#000000"
    },
    avatarContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: 170
    },
    avatar: {
      width: 120,
      height: 120,
      marginBottom: 10
    },
    avatarSafeArea: {
      alignItems: "center",
      justifyContent: "center",
      width: 150
    },
    cardContainer: {
      padding: 20,
      borderRadius: 8,
      width: "100%",
      borderWidth: 1,
      borderColor: "#D6D6D6",
      alignContent: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    inputField: {
      width: "80%",
      textAlign: "left",
      fontWeight: "700",
      color: "#4D516B",
      fontSize: 14,
      paddingHorizontal: 10,
      marginTop: 2,
      marginBottom: 4
    },
    inputStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 2,
      marginTop: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "rgba(204,204,204,0.51)"
    },
    inputIcon: {
      width: "15%",
      fontSize: 20,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      paddingTop: 10,
      paddingHorizontal: 10
    },
    ColorItemBoxOuter: {
      width: 40,
      height: 40,
      borderRadius: 40,
      alignItems: "center",
      justifyContent: "center",
      display: 'flex',
      border: "1px solid #979797",

    },
    ColorItemBoxInner: {
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      borderRadius: 40
    },
    colorItem: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column"
    },
    ColorItemText: {
      fontFamily: 'Nunito',
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      color: "#555555",
      padding: '10px 0px',
      paddingTop: "20px",
      lineHeight: "14px",
      textAlign: "center",
    },
    boxTitleContainer: {},
    boxTitle: {
      fontSize: 17,
      fontWeight: "600",
      color: "#0E1726"
    }
  })
);
