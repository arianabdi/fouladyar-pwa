import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FixedHeader } from "../../layout/header/Fixed-Header";
import ExerciseComponent from "./components/exercisesComponent";
import DietComponent from "./components/dietComponent";
import { ErrorToaster } from "../../shared/toaster";
import { EmptyState } from "../../components/fouladyar/empty-state/emptyState";


const ProgramDetail = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);


  const { t, i18n } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState('')
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [diet, setDiet] = useState([]);
  const [fullname, setFullname] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const queryParams = new URLSearchParams(location.search);
  const programId = queryParams.get('programId');

  useEffect(() => {
    async function _getProgramSpecificationById(){

     try {
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/program/exercise-and-diet/${programId}`,{
         headers: {authorization: `bearer ${auth.token}`}
       });


       console.log('getProgramExerciseAndDietById', res.data.data)
       if(res.status === 200){
         if(res.data.data.exercises){
           setExercises(res.data.data.exercises);
         }

         if(res.data.data.diet){
           setDiet(res.data.data.diet);
         }
         if(res.data.data.full_name){
           setFullname(res.data.data.full_name);
         }
       }

     }catch (e) {
       ErrorToaster(e)
     }
    }


    _getProgramSpecificationById();
  }, []);



  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const [activeTab, setActiveTab] = useState('tab1');

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  return (

    <React.Fragment>
      <style>
        {`
         
        `}
      </style>

      <ModalHelper
        size={"sm"}
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
        component={modalComponent}
      />
      <FixedHeader title={fullname || '-'} useBack={true} />

      <div className="nk-content exercise-tab-container" style={{background: '#fff', marginTop: '4rem'}}>
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="container p-0 m-0">

                  {/* Tab buttons */}
                  <div style={{ display: 'flex', borderBottom: "1px solid #d7d7d7" }}>
                    <button
                      onClick={() => handleTabClick('tab1')}
                      className={`tabButton ${activeTab === 'tab1' ? 'active' : ''}`}
                    >
                      تمرین
                    </button>
                    <button
                      onClick={() => handleTabClick('tab2')}
                      className={`tabButton ${activeTab === 'tab2' ? 'active' : ''}`}
                    >
                      غذایی و مکمل
                    </button>
                  </div>

                  {/* Content for each tab */}
                  <div>
                    {activeTab === 'tab1' && (exercises.length === 0 ? <EmptyState title={"هیچ تمرینی یافت نشد"}/> : <ExerciseComponent items={exercises}/>)}
                    {activeTab === 'tab2' && (diet.length === 0 ? <EmptyState title={"هیچ برنامه غذایی یافت نشد"}/> : <DietComponent items={diet}/>)}
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

export default ProgramDetail;
