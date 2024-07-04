import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icon, UserAvatar } from "../../components/Component";
import User from "../../images/avatar/b-sm.jpg";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import { Field } from "../../components/fouladyar/field/field";
import { blobToBase64 } from "../../shared/convertBlobToBase64";
import { deleteAndReturnRemaining } from "../../shared/textTools";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { setProfile } from "../../redux/store/services/profile/store";
import { ErrorToaster } from "../../shared/toaster";

const EditProfileInDoctorDashboard = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [profileImage, setProfileImage] = useState();
  const [youAre, setYouAre] = useState('doctor')
  const [location, setLocation] = useState('initialization')
  const [data, setData] = useState({
    "email": "",
    "gender": "",
    "firstName": "",
    "lastName": "",
    "dateOfBirth": "",
    "mobileNumber": "",
    "officePhoneNumber": "",
    "specialization": "",
    "rppsNumber": '',
    "adeliNumber": '',
    "image": '',
    "officeAddress": "",
    "city": "",
    "paymentTypes": [],
    "languages": [
      { value: "FRENCH", label: "Français" }
    ],
    "zipCode": "",
    "note": "",
    "acceptVitalCard": false,
    "canDoPediatrics": true,
    "canDoAbortion": false,
    "canDoUltrasound": false,
    "doctorOrProfessor": ""
  })



  const specializationItems =[
    {label: 'Médecine générale', value: 'GENERAL_PRACTITIONER'},
    {label: 'Gynécologie', value: 'GYNECOLOGY'},
    {label: 'Pédiatrie', value: 'PEDIATRICS'},
    {label: 'Dentiste', value: 'DENTIST'},
    {label: 'Radiologie', value: 'RADIOLOGY'},
    {label: 'Cardiologie', value: 'CARDIOLOGY'},
    {label: 'Gastro-enterologie', value: 'GASTROENTEROLOGY'},
    {label: 'Endocrinologie/Diabétologie', value: 'ENDOCRINOLOGY_DIABETOLOGY'},
  ]

  const languageItems =[
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
  ]
  function validateForm() {
    let messages = []

    if(!data.email)
      messages.push("E-mail est obligatoire")
    if(!data.firstName)
      messages.push("Nom est obligatoire")
    if(!data.lastName)
      messages.push("Prénom est obligatoire")
    if(!data.dateOfBirth)
      messages.push("Date de naissance est obligatoire")
    if(!data.mobileNumber)
      messages.push("Téléphone portable est obligatoire")
    if(!youAre)
      messages.push("Vous êtes est obligatoire")
    if(!data.specialization)
      messages.push("Spécialité est obligatoire")
    if(!data.rppsNumber)
      messages.push("Numéro RPPS est obligatoire")
    // if(!data.address)
    //   messages.push("Adresse du cabinet est obligatoire")
    if(!data.city)
      messages.push("Ville est obligatoire")
    if(!data.zipCode)
      messages.push("Code postal est obligatoire")

    if(messages.length > 0){
      toast(
        messages.join('\n\n'),
        {
          duration: messages.length * 1000,
        }
      );
      return false
    }
    return  true
  }

  useEffect(() => {
    async function loadProfile(){
      try {

        let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/provider/account`,{
          headers: {authorization: `bearer ${auth.token}`}
        });

        delete res.data.subjectId;
        if (res.status === 200) {
          setData(prevState => ({
            ...prevState,
            ...res.data,
            languages: languageItems.filter(i=>{
              if(res.data.languages?.find(j=> i.value === j))
                return i
            }),
            image: null
          }))
        }

      } catch (e) {
        ErrorToaster(e);
      }
    }
    loadProfile()

  }, [auth.token]);

  function filterEmail(obj) {
    // Create a new object to store the filtered key-value pairs
    let filteredData = {};

    // Iterate through the keys of the original object
    for (let key in obj) {
      // Check if the key is not 'email'
      if (key !== 'email') {
        // Add the key-value pair to the filtered object
        filteredData[key] = obj[key];
      }
    }

    // Return the filtered object
    return filteredData;
  }


  async function onUpdateProfile() {
    try {
      if(!validateForm())
        return ''
      const s3ObjectName = await uploadProfileImage();
      setData(prevState => ({
        ...prevState,
        image: s3ObjectName
      }))
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/doctor/account`, {
        ...filterEmail(data),
        image: s3ObjectName,
        dateOfBirth: new Date(data.dateOfBirth),
        languages: data.languages.map(i=>{
          return i.value
        })
      },{
        headers: {authorization: `bearer ${auth.token}`}
      });


      if (res.status === 200) {
        toast.success('votre profil a été mis à jour avec succès')
        dispatch(setProfile({
          firstName: data.firstName,
          lastName: data.lastName ,
          email: data.email ,
          dateOfBirth: data.dateOfBirth ,
          avatar: s3ObjectName || profile.avatar ,
          doctorOrProfessor: data.doctorOrProfessor,
          gender: data.gender,
          mobileNumber: data.mobileNumber,
          subjectId: profile.subjectId
        }))

        navigate(`/profile`);
      }
    } catch (e) {

      ErrorToaster(e);

    }
  }
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
      <div className="nk-content ">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container">
                  <div className="row ps-4 pe-4">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5 mb-3 p-5 profile-container">
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-2 mb-5">
                          <div className="row  d-flex flex-row  justify-center align-center">

                              {
                                profile.avatar ?
                                  <>
                                      {
                                        !profileImage ?
                                          <div className="mb-2" style={{ paddingLeft: 0, width: "auto" }}>
                                            <UserAvatar className="profile-avatar" image={`${process.env.REACT_APP_S3_BUCKET}/${profile.avatar}` || User}></UserAvatar>
                                          </div> :
                                          ''
                                      }
                                      <Field
                                        className={!profileImage ? 'btn blue-button w-auto' : "update-profile-image-upload d-flex justify-content-center align-center"}
                                        id={"image"}
                                        name={"image"}
                                        type={"file-upload"}
                                        placeholder={"Télécharger"}
                                        value={data.image}
                                        fileUploadType={'post'}
                                        multiple={false}
                                        onChange={(e) => {
                                          if(e[0]) {
                                            setProfileImage( e[0].file)
                                          }
                                        }}
                                        onCancel={(e) => {
                                          setData(prevState => ({
                                            ...prevState,
                                            image: profile.image
                                          }))
                                        }}
                                      />


                                  </>
                                  :
                                  <Field
                                    className={'update-profile-image-upload d-flex justify-content-center align-center'}
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
                                      setData(prevState => ({
                                        ...prevState,
                                        image: profile.image
                                      }))
                                    }}
                                  />
                              }



                          </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-10">
                          <div className="row">
                            <div className="col-sm-12 col-md-6 col-xxl-6 ">

                              <Field
                                className="mb-2"
                                id={"email"}
                                name={"email"}
                                label={"E-mail"}
                                type={"text"}
                                disabled={true}
                                isRequired={true}
                                value={data.email}
                                onChange={(e) => { setData(prevState => ({
                                  ...prevState,
                                  email: e
                                }))}}
                              />


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

                              <div className="row">
                                <div className="col-sm-6">
                                  <Field
                                    className="mb-2"
                                    id={"firstname"}
                                    name={"firstName"}
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
                                <div className="col-sm-6">
                                  <Field
                                    className="mb-2"
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
                              </div>
                              <div className="row">
                                <div className="col-sm-6">
                                  <Field
                                    className="mb-2"
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
                                <div className="col-sm-6">
                                  <Field
                                    className="mb-2"
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
                              </div>
                              <div className="mb-2">
                                <Field
                                  disabled={true}
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

                              <div className="mb-2">
                                <Field
                                  id={"doctorOrProfessor"}
                                  name={"doctorOrProfessor"}
                                  label={""}
                                  isRequired={true}
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

                              <div className="mb-2">
                                <Field
                                  className="mb-2"
                                  id={"specialization"}
                                  name={"specialization"}
                                  label={"Spécialité*"}
                                  isRequired={true}
                                  type={"select"}
                                  options={specializationItems}
                                  // defaultValue={  }
                                  value={data.specialization}
                                  onChange={(e) => {

                                    setData(prevState => ({
                                    ...prevState,
                                    specialization: e
                                  }))}}
                                />
                              </div>

                              <div className="d-flex flex-row search-form-container mb-2">
                                <div className="w-auto">
                                  <Field
                                    className="mb-2"
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
                                </div>
                                <div className="w-auto">
                                  <Field
                                    className="mb-2"
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
                                </div>
                                <div className="w-auto">
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
                              <div className="mb-2">
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
                                      rppsNumber: e || ''
                                    }))
                                  }}
                                />
                              </div>

                              <div className="mb-2">
                                <Field
                                  id={"adeli_number"}
                                  name={"adeli_number"}
                                  label={"Numéro ADELI"}
                                  type={"text"}
                                  value={data.adeliNumber }
                                  onChange={(e) => {
                                    setData(prevState => ({
                                      ...prevState,
                                      adeliNumber: e || ''
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
                              <div className="row search-form-container">
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
                              </div>

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
                            <div className="col-sm-12 col-md-6 col-xxl-6 remove-cancel-selection">


                              <Field
                                id={"languages"}
                                name={"languages"}
                                label={"Les langues que vous parlez avec les patients :"}
                                type={"multiselect"}
                                options={languageItems}
                                value={data.languages}
                                onChange={(e) => {

                                  setData(prevState => ({
                                    ...prevState,
                                    languages: e
                                  }))
                                }}
                              />
                              {/*<div className="row mb-2 p-2">*/}
                              {/*  {*/}
                              {/*    data.languages.map(item=>{*/}
                              {/*      return(*/}
                              {/*        <div className="cancelable-data-badge d-flex flex-row mb-1">*/}
                              {/*          <div>*/}
                              {/*            {item.label}*/}
                              {/*          </div>*/}
                              {/*          <div onClick={()=>{*/}
                              {/*            if(item.value !== "french")*/}
                              {/*              setData(prevState => ({*/}
                              {/*                ...prevState,*/}
                              {/*                // languages: data.languages.filter(i=> i.value !== item.value)*/}
                              {/*              }))*/}
                              {/*          }}>*/}
                              {/*            <MdClose  size={18} color={item.value === "french" ? "#a8a7a7" : "#555555"} />*/}
                              {/*          </div>*/}
                              {/*        </div>*/}
                              {/*      )*/}
                              {/*    })*/}
                              {/*  }*/}
                              {/*</div>*/}
                              <Field
                                id={"officeAddress"}
                                name={"officeAddress"}
                                label={"Adresse du cabinet"}
                                type={"textarea"}
                                isRequired={true}
                                value={data.officeAddress }
                                onChange={async (e) => {
                                  setData(prevState => ({
                                    ...prevState,
                                    officeAddress: e
                                  }))
                                }}
                                onBlur={async (e)=>{
                                  await getAddressCoordinates(e)
                                }}
                              />

                              {
                                location === "initialization" ? "" : (
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
                                )
                              }

                              <Field
                                id={"officePhoneNumber"}
                                name={"officePhoneNumber"}
                                label={"Téléphone du cabinet (visible sur votre profil)"}
                                type={"text"}
                                value={data.officePhoneNumber }
                                onChange={async (e) => {
                                  setData(prevState => ({
                                    ...prevState,
                                    officePhoneNumber: e
                                  }))

                                }}
                              />

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
                              <Field
                                id={"note"}
                                name={"note"}
                                label={"Note"}
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12  col-md-12 col-lg-12 mb-3">
                      <div className="container ps-0 pe-0">
                        <div className="row  align-end justify-end">
                          <div className="col-sm-12 col-md-6 col-lg-4 ps-0 pe-0">
                            <div className="row">
                              <div className="col-sm-6">
                                <Link to={`${process.env.PUBLIC_URL}/profile`}>
                                  <div className={`btn white-button`} >
                                    Annuler
                                  </div>
                                </Link>
                              </div>
                              <div className="col-sm-6">
                                <div className={`btn blue-button`} onClick={async () => {await onUpdateProfile()}}>
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default EditProfileInDoctorDashboard;
