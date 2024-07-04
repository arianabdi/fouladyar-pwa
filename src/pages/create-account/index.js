import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../components/Component";
import { Field } from "../../components/fouladyar/field/field";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { blobToBase64 } from "../../shared/convertBlobToBase64";
import { deleteAndReturnRemaining } from "../../shared/textTools";
import { FiUser } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { setToaster } from "../../redux/store/services/toaster/store/toaster-actions";
import toast from "react-hot-toast";
import { ErrorToaster } from "../../shared/toaster";


const DoctorCreateAccount = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [youAre, setYouAre] = useState('doctor')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [termsAndConditions, setTermsAndConditions] = useState(false)
  const [profileImage, setProfileImage] = useState();
  const [location, setLocation] = useState('initialization')
  const [data, setData] = useState({
    "email": "",
    "gender": "MALE",
    "firstName": "",
    "lastName": "",
    "dateOfBirth": "",
    "mobileNumber": "",
    "officePhoneNumber": "",
    "specialization": "",
    "rppsNumber": null,
    "adeliNumber": null,
    "password": "",
    "image": "",
    "address": "",
    "city": "",
    "longitude":  null,
    "latitude": null,
    "paymentTypes": [
    ],
    "zipCode": "",
    "note": '',
    "acceptVitalCard": false,
    "canDoPediatrics": false,
    "canDoAbortion": false,
    "canDoUltrasound": false,
    "doctorOrProfessor": "DOCTOR",
    "languages": [
      { value: "FRENCH", label: "Français" }
    ],
  })




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

  const getAddressCoordinates = async (address) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);


      if (!response.ok) {
        throw new Error('Failed to fetch geocoding data');
      }

      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        const address_components = data.results[0].address_components;
        const city = address_components.find(item => item.types.find(i=> i === 'locality' || i === 'political'))
        const postal_code = address_components.find(item => item.types.find(i=> i === 'postal_code' ))
        const loc = data.results[0].geometry.location;
        setLocation(loc)
        setData(prevState => ({
          ...prevState,
          longitude:  loc.lng,
          latitude: loc.lat,
          zipCode: postal_code?.long_name || '',
          city: city?.long_name || ''
        }))

      } else {
        setLocation(null)
        setData(prevState => ({
          ...prevState,
          longitude:  null,
          latitude: null,
        }))
        throw new Error('No results found for the given address');
      }
    } catch (e) {
      ErrorToaster(e);
      return null;
    }
  };
  async function uploadProfileImage(){
    try {
      if(profileImage){
        const formData = new FormData();
        formData.append('img', profileImage);

        const imageUpload = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/s3/img/upload`,formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (imageUpload.status === 200) {
          toast.success('Votre photo de profil a été téléchargée avec succès')
          setData(prevState => ({
            ...prevState,
            image: imageUpload.data.imageId,
          }))

          return imageUpload.data.imageId;
        }
      }
      return  data.image
    }catch (e){
      ErrorToaster(e);
    }
  }

  function selectUrl(){
    switch (youAre){
      case "doctor":
        return "/api/v1/doctor/account";
      case "nurse":
        return "/api/v1/nurse/account";
      case "midwife":
        return "/api/v1/midwife/account";
      default:
        return "/api/v1/doctor/account";
    }
  }

  const [validationMessages, setValidationMessages] = useState([])
  function validateForm() {
    setValidationMessages([])

    if(!data.image)
      setValidationMessages(prevState => ([...prevState, "Image est obligatoire"]))
    if(!data.email)
      setValidationMessages(prevState => ([...prevState, "E-mail est obligatoire"]))
    if(!data.firstName)
      setValidationMessages(prevState => ([...prevState, "Nom est obligatoire"]))
    if(!data.lastName)
      setValidationMessages(prevState => ([...prevState, "Prénom est obligatoire"]))
    if(!data.dateOfBirth)
      setValidationMessages(prevState => ([...prevState, "Date de naissance est obligatoire"]))
    if(!data.mobileNumber)
      setValidationMessages(prevState => ([...prevState, "Téléphone portable est obligatoire"]))
    if(!youAre)
      setValidationMessages(prevState => ([...prevState, "Vous êtes est obligatoire"]))
    if(!data.specialization)
      setValidationMessages(prevState => ([...prevState, "Spécialité est obligatoire"]))
    if(!data.rppsNumber)
      setValidationMessages(prevState => ([...prevState, "Numéro RPPS est obligatoire"]))
    if(!data.address)
      setValidationMessages(prevState => ([...prevState, "Adresse du cabinet est obligatoire"]))
    if(!data.city)
      setValidationMessages(prevState => ([...prevState, "Ville est obligatoire"]))
    if(!data.zipCode)
      setValidationMessages(prevState => ([...prevState, "Code postal est obligatoire"]))
    if(!data.password)
      setValidationMessages(prevState => ([...prevState, "Mot de passe est obligatoire"]))
    if(data.password !== passwordConfirmation)
      setValidationMessages(prevState => ([...prevState, "le mot de passe ne correspond pas"]))


  }

  async function onSubmitForm() {
    try {
      validateForm()
      if(validationMessages.length > 0)
        dispatch(setToaster({
          title: "Form Validation",
          message: validationMessages.join('\n'),
          duration: validationMessages.length > 0  ? (validationMessages.length * 3) : 3
        }))


      const res = await axios.post(`${process.env.REACT_APP_API_URL}${selectUrl()}`, {
        ...data,
        languages: data.languages.map(i=>{
          return i.value
        }),
        image: await uploadProfileImage(),
      });
      console.log("res", res);
      if (res.status === 201) {
        navigate(`/login`);
      }

    } catch (e) {
      console.log("error", e);
    }
  }

  return (
    <div className="nk-content-auth pt-5 pb-5">
      <div className="container-fluid-doctor">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block d-flex justify-center align-center">

              <div className="container ">
                <Header />

                <div className="ps-3 pe-3">
                  <div className="container">


                    <div className="row d-flex">
                      <h6 className="profile-title p-1 text-center" >{'S’enregistrer'}</h6>
                    </div>

                    <div className="row  mb-4">
                      <p className="text-center">{''}</p>
                    </div>

                    <div className="row mb-2 d-flex flex-grow-1 justify-content-center align-center mb-4 pb-3">
                      <Field
                        className={'create-profile-image-upload d-flex justify-content-center align-center'}
                        id={"image"}
                        name={"image"}
                        type={"file-upload"}
                        value={data.image}
                        fileUploadType={'post'}
                        multiple={false}
                        onChange={(e) => {
                          if(e[0]) {
                            setProfileImage( e[0].file)
                          }
                        }}
                        onCancel={(e) => {
                          setProfileImage(null)
                        }}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"email"}
                        name={"email"}
                        label={"E-mail"}
                        type={"text"}
                        isRequired={true}
                        value={data.email}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          email: e
                        }))}}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"gender"}
                        name={"gender"}
                        label={""}
                        isRequired={true}
                        type={"radiobox"}
                        options={[
                          {label: 'M.', value: 'MALE'},
                          {label: 'Mme', value: 'FEMALE'},
                          {label: 'Inconnu', value: 'UNKNOWN'},
                        ]}
                        value={data.gender}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          gender: e
                        }))}}
                      />
                    </div>


                    <div className="row mb-2">
                      <Field
                        id={"firstname"}
                        name={"firstname"}
                        label={"Prénom"}
                        type={"text"}
                        isRequired={true}
                        value={data.firstName}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          firstName: e
                        }))}}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"lastName"}
                        name={"lastName"}
                        label={"Nom"}
                        type={"text"}
                        isRequired={true}
                        value={data.lastName}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          lastName: e
                        }))}}
                      />
                    </div>
                    <div className="row mb-2">
                      <Field
                        id={"Date de naissance"}
                        name={"Date de naissance"}
                        label={"Date de naissance"}
                        type={"date"}
                        isRequired={true}
                        value={data.dateOfBirth}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          dateOfBirth: e
                        }))}}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"mobileNumber"}
                        name={"mobileNumber"}
                        label={"Téléphone portable"}
                        type={"text"}
                        isRequired={true}
                        value={data.mobileNumber}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          mobileNumber: e
                        }))}}
                      />
                    </div>
                    <div className="row mb-2">
                      <Field
                        id={"you_are"}
                        name={"you_are"}
                        label={"Vous êtes"}
                        isRequired={true}
                        type={"select"}
                        options={[
                          {label: 'Médecin', value: 'doctor'},
                          {label: 'Infirmier', value: 'nurse'},
                          {label: 'Sage femme', value: 'midwife'},
                        ]}
                        value={youAre}
                        onChange={(e) => { setYouAre(e)}}
                      />
                    </div>


                    <div className="row mb-2">
                      <Field
                        id={"doctorOrProfessor"}
                        name={"doctorOrProfessor"}
                        label={""}
                        type={"radiobox"}
                        options={[
                          {label: 'Docteur', value: 'DOCTOR'},
                          {label: 'Professeur', value: 'PROFESSOR'},
                        ]}
                        value={data.doctorOrProfessor}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          doctorOrProfessor: e
                        }))}}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"specialization"}
                        name={"specialization"}
                        label={"Spécialité"}
                        isRequired={true}
                        type={"select"}
                        options={[
                          {label: 'Médecine générale', value: 'GENERAL_PRACTITIONER'},
                          {label: 'Gynécologie', value: 'GYNECOLOGY'},
                          {label: 'Pédiatrie', value: 'PEDIATRICS'},
                          {label: 'Dentiste', value: 'DENTIST'},
                          {label: 'Radiologie', value: 'RADIOLOGY'},
                          {label: 'Cardiologie', value: 'CARDIOLOGY'},
                          {label: 'Gastro-enterologie', value: 'GASTROENTEROLOGY'},
                          {label: 'Endocrinologie/Diabétologie', value: 'ENDOCRINOLOGY_DIABETOLOGY'},
                        ]}
                        value={data.specialization}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          specialization: e
                        }))}}
                      />
                    </div>

                    <div className="  d-flex flex-row  justify-start align-center">
                      <Field
                        id={"canDoAbortion"}
                        name={"canDoAbortion"}
                        label={"IVG"}
                        type={"checkbox"}
                        value={data.canDoAbortion}
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            canDoAbortion: !data.canDoAbortion
                          }))
                        }}
                      />
                      <Field
                        id={"canDoPediatrics"}
                        name={"canDoPediatrics"}
                        label={"Pédiatrie"}
                        type={"checkbox"}
                        value={data.canDoPediatrics}
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            canDoPediatrics: !data.canDoPediatrics
                          }))
                        }}
                      />
                      <div style={{marginBottom: "1.25rem"}}>
                        <Field
                          id={"canDoUltrasound"}
                          name={"canDoUltrasound"}
                          label={"Échographie"}
                          type={"checkbox"}
                          value={data.canDoUltrasound }
                          onChange={(e) => {
                            setData(prevState => ({
                              ...prevState,
                              canDoUltrasound: !data.canDoUltrasound
                            }))
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"rpps_number"}
                        name={"rpps_number"}
                        label={"Numéro RPPS"}
                        type={"text"}
                        isRequired={true}
                        value={data.rppsNumber }
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            rppsNumber: e
                          }))
                        }}
                      />
                    </div>


                    <div className="row mb-2">
                      <Field
                        id={"adeli_number"}
                        name={"adeli_number"}
                        label={"Numéro ADELI"}
                        type={"text"}
                        value={data.adeliNumber }
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            adeliNumber: e
                          }))
                        }}
                      />
                    </div>

                    <div className="d-flex flex-row  justify-start align-center">
                      <div className={`form-label-group bold`}>
                        <label >
                          Paiement :
                        </label>
                      </div>
                    </div>
                    <div className="d-flex flex-row  justify-start align-center">


                      <Field
                        id={"CHECK"}
                        name={"CHECK"}
                        label={"Chèque"}
                        type={"checkbox"}
                        value={data.paymentTypes.includes('CHECK')}
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            paymentTypes: data.paymentTypes.includes('CHECK') ? deleteAndReturnRemaining(data.paymentTypes, "CHECK") : [...data.paymentTypes, 'CHECK']
                          }))
                        }}
                      />
                      <Field
                        id={"BANK_CARD"}
                        name={"BANK_CARD"}
                        label={"Carte bancaire"}
                        type={"checkbox"}
                        value={data.paymentTypes.includes('BANK_CARD')}
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            paymentTypes: data.paymentTypes.includes('BANK_CARD') ? deleteAndReturnRemaining(data.paymentTypes, "BANK_CARD") : [...data.paymentTypes, 'BANK_CARD']
                          }))
                        }}
                      />
                      <div style={{marginBottom: "1.25rem"}}>
                        <Field
                          className={""}
                          id={"SPECIES"}
                          name={"SPECIES"}
                          label={"Espèces"}
                          type={"checkbox"}
                          value={data.paymentTypes.includes('SPECIES')}
                          onChange={(e) => {
                            setData(prevState => ({
                              ...prevState,
                              paymentTypes: data.paymentTypes.includes('SPECIES') ? deleteAndReturnRemaining(data.paymentTypes, "SPECIES") : [...data.paymentTypes, 'SPECIES']
                            }))
                          }}
                        />
                      </div>
                    </div>


                    <div className="row mb-2 ">
                      <Field
                        id={"acceptVitalCard"}
                        name={"acceptVitalCard"}
                        label={"Carte vitale :"}
                        type={"radiobox"}
                        options={[
                          {label: 'Oui', value: true},
                          {label: 'Non', value: false},
                        ]}
                        value={data.acceptVitalCard }
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            acceptVitalCard: e
                          }))
                        }}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"languages"}
                        name={"languages"}
                        label={"Les langues que vous parlez avec les patients :"}
                        type={"multiselect"}
                        options={[
                          {label: 'Français', value: 'FRENCH', disabled: true},
                          {label: 'Arabe', value: 'ARABIC'},
                          {label: 'Anglais', value: 'ENGLISH'},
                          {label: 'portugais', value: 'PORTUGUESE'},
                          {label: 'Espagnol', value: 'SPANISH'},
                          {label: 'Allemand', value: 'GERMAN'},
                          {label: 'Roumain', value: 'ROMANIAN'},
                          {label: 'Italien', value: 'ITALIAN'},
                          {label: 'Turc', value: 'TURKISH'},
                          {label: 'Persan', value: 'PERSIAN'},
                          {label: 'Chinese', value: 'CHINESE'},
                        ]}
                        value={data.languages}
                        onChange={(e) => {
                          console.log('multiselect',e);
                          setData(prevState => ({
                            ...prevState,
                            languages: e
                          }))
                        }}
                      />
                    </div>


                    <div className="row mb-2 p-2">
                      {
                        data.languages.map(item=>{
                          return(
                            <div className="cancelable-data-badge d-flex flex-row mb-1">
                              <div>
                                {item.label}
                              </div>
                              <div onClick={()=>{
                                if(item.value !== "FRENCH")
                                  setData(prevState => ({
                                    ...prevState,
                                    languages: data.languages.filter(i=> i.value !== item.value)
                                  }))
                              }}>
                                <MdClose  size={18} color={item.value === "french" ? "#a8a7a7" : "#555555"} />
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="row mb-2">
                      <Field
                        id={"address"}
                        name={"address"}
                        label={"Adresse du cabinet"}
                        placeholder={"l’adresse complète du cabinet (commune et code postal)"}
                        type={"textarea"}
                        isRequired={true}
                        value={data.address }
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            address: e
                          }))

                        }}
                        onBlur={async (e)=>{
                          console.log('onblur', e)
                          await getAddressCoordinates(e)
                        }}
                      />
                    </div>
                    {
                      location === 'initialization' ? "" :
                        !location ?
                          <div className={"d-flex flex-row"}>
                            <IoCloseSharp  size={16} color={"#c04747"} />
                            <div style={{color: "#c04747"}}>l'adresse n'est pas valide</div>
                          </div>
                          :
                          <div className={"d-flex flex-row"}>
                            <FaCheck  size={16} color={"#5ea95c"} />
                            <div style={{color: "#5ea95c"}}>l'adresse est valide</div>
                          </div>
                    }
                    <div className="row mb-2">
                      <Field
                        id={"officePhoneNumber"}
                        name={"officePhoneNumber"}
                        label={"Téléphone du cabinet (visible sur votre profil)"}
                        type={"text"}
                        value={data.officePhoneNumber}
                        onChange={(e) => { setData(prevState => ({
                          ...prevState,
                          officePhoneNumber: e
                        }))}}
                      />
                    </div>
                    <div className="row mb-2">
                      <Field
                        id={"city"}
                        name={"city"}
                        label={"Ville"}
                        type={"text"}
                        disabled={true}
                        isRequired={true}
                        value={data.city }
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            city: e
                          }))
                        }}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"zipCode"}
                        name={"zipCode"}
                        label={"Code postal"}
                        type={"text"}
                        disabled={true}
                        isRequired={true}
                        value={data.zipCode }
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            zipCode: e
                          }))
                        }}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"note"}
                        name={"note"}
                        label={"Note"}
                        placeholder={"Des informations pratiques visibles sur votre profil par les patients."}
                        type={"textarea"}
                        value={data.note }
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            note: e
                          }))
                        }}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"password"}
                        name={"password"}
                        label={"Mot de passe"}
                        type={"password"}
                        isRequired={true}
                        value={data.password }
                        onChange={(e) => {
                          setData(prevState => ({
                            ...prevState,
                            password: e
                          }))
                        }}
                      />
                    </div>

                    <div className="row mb-2">
                      <Field
                        id={"password-confirmation"}
                        name={"password-confirmation"}
                        label={"Confirmer le mot de passe"}
                        type={"password"}
                        isRequired={true}
                        value={passwordConfirmation }
                        onChange={(e) => {
                          setPasswordConfirmation(e)
                        }}
                      />
                    </div>
                    <div className="row mb-4">
                      <Field
                        id={"accept_terms"}
                        name={"accept_terms"}
                        label={"J'accepte que CLICONSULT mémorise mes informations personnelles pour enregistrer et traiter mes données conformément aux conditions d'utilisation et à la politique de confidentialité."}
                        type={"checkbox"}
                        value={termsAndConditions }
                        onChange={(e) => {
                          setTermsAndConditions(e)
                        }}
                      />
                    </div>
                  </div>


                    <div className="container mb-2">
                      <div className={`btn blue-button ${!termsAndConditions ? "disabled" : ""}`}  onClick={async () => {
                        if(termsAndConditions)
                          await onSubmitForm()
                      }}>
                        Créer
                      </div>
                    </div>



                  <div className=" d-flex flex-row justify-center align-center mb-3">
                    <div className="p-1 text-center" >vous avez déjà un compte?</div>
                    <Link to={`${process.env.PUBLIC_URL}/login`}>
                      <div  className="col-sm-auto p-0 m-0  d-flex justify-center" >Se connecter</div>
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

export default DoctorCreateAccount;
