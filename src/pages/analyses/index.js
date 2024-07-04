import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/Component";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import moment from "moment";
import axios from "axios";
import { getIndexOfWeek } from "../../shared/shared";
import toast from "react-hot-toast";

const Analyses = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [selectedChart, setSelectedChart] = useState("month");

  const daysObject = {
    "sunday": "SUNDAY",
    "monday": "MONDAY",
    "tuesday": "TUESDAY",
    "wednesday": "WEDNESDAY",
    "thursday": "THURSDAY",
    "friday": "FRIDAY",
    "saturday": "SATURDAY"
  };
  const monthsObject = {
    "january": "JANUARY",
    "february": "FEBRUARY",
    "march": "MARCH",
    "april": "APRIL",
    "may": "MAY",
    "june": "JUNE",
    "july": "JULY",
    "august": "AUGUST",
    "september": "SEPTEMBER",
    "october": "OCTOBER",
    "november": "NOVEMBER",
    "december": "DECEMBER"
  };

  const week = {
    labels: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    datasets: [
      {
        label: "visited",
        // data: [26, 36, 16, 30, 10, 0, 0],
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#1AA0B4",
        barThickness: 30
      },
      {
        label: "canceled",
        // data: [8, 3, 6, 8, 2, 0, 0],
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#016FC4",
        barThickness: 30
      },
      {
        label: "cancelledByProvider",
        // data: [10, 20, 3, 10, 1, 0, 0],
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#00589C",
        barThickness: 30
      }
    ]
  };
  const month = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
    datasets: [
      {
        label: "visited",
        backgroundColor: "#1AA0B4",
        // data: [26, 36, 16, 30, 34, 21, 14, 8, 27, 10, 0, 0, 22, 15, 11, 24, 45, 22, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        barThickness: 15
      },
      {
        label: "canceled",
        // data: [26, 24, 11, 24, 45, 34, 21, 14, 8, 27, 45, 34, 21, 14, 8, 27, 22, 5, 0, 0, 0, 22, 15, 0, 0, 0, 0, 0, 0, 0, 0],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#016FC4",
        barThickness: 15
      },
      {
        label: "cancelledByProvider",
        // data: [26, 24, 45, 34, 21, 14, 8, 27, 22, 5, 0, 0, 0, 22, 15, 11, 24, 45, 34, 21, 14, 8, 27, 0, 0, 0, 0, 0, 0, 0, 0],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#00589C",
        barThickness: 15
      }
    ]
  };
  const year = {
    labels: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    datasets: [
      {
        label: "visited",
        // data: [26, 30, 36, 26, 36, 26, 30, 36, 26, 26, 0, 0],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#1AA0B4",
        barThickness: 30
      },
      {
        label: "canceled",
        // data: [8, 8, 10, 8, 10, 8, 8, 10, 8, 16, 0, 0],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#016FC4",
        barThickness: 30
      },
      {
        label: "cancelledByProvider",
        // data: [10, 10, 12, 10, 10, 12, 12, 10, 8, 12, 0, 0],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#00589C",
        barThickness: 30
      }
    ]
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked"
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };
  const [data, setData] = useState(month);


  async function getChartData({props}){
    try {

      if(selectedChart === "week"){
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/statistics/week/${props.year}/${props.indexOfWeek}`,{
          headers: {authorization: `bearer ${auth.token}`}
        });

        if (res.status === 200) {

          setData(week);
          setData(prevState => ({
            labels: prevState.labels.map(i=> {
              return t(i);
            }),
            datasets: prevState.datasets.map(dataset => {
              return {
                ...dataset,
                label: t(dataset.label),
                data: prevState.labels.map(day => {
                  const dataFound = res.data.find(item => item.dayOfWeek === daysObject[day]);

                  if(dataFound)
                    return dataFound[dataset.label]

                  return 0;
                })
              }
            })
          }))

        }
      }
      if(selectedChart === "month"){
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/statistics/month/${props.year}/${props.nameOfMonth}`,{
          headers: {authorization: `bearer ${auth.token}`}
        });

        if (res.status === 200) {
          setData(month);
          setData(prevState => ({
            labels: prevState.labels.map(i=> {
              return t(i);
            }),
            datasets: prevState.datasets.map(dataset => {
              return {
                ...dataset,
                label: t(dataset.label),
                data: prevState.labels.map(day => {
                  const dataFound = res.data.find(item => item.dayOfMonth === parseInt(day));

                  if(dataFound)
                    return dataFound[dataset.label]

                  return 0;
                })
              }
            })
          }))

        }
      }
      if(selectedChart === "year"){
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/statistics/year/${props.year}`,{
          headers: {authorization: `bearer ${auth.token}`}
        });
        console.log("year", res);
        if (res.status === 200) {

          setData(year);
          setData(prevState => ({
            labels: prevState.labels.map(i=>{
              return t(i);
            }),
            datasets: prevState.datasets.map(dataset => {
              return {
                ...dataset,
                label: t(dataset.label),
                data: prevState.labels.map(month => {
                  const dataFound = res.data.find(item => item.month === monthsObject[month]);

                  if(dataFound)
                    return dataFound[dataset.label]

                  return 0;
                })
              }
            })
          }))

        }
      }


    } catch (e) {
      console.log("error", e);
      toast.error(e.message)
    }
  }

  function getCurrentMonthName() {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();

    return year.labels[currentMonthIndex].toUpperCase();
  }


  useEffect(()=>{
    getChartData({props: {year: '2023', indexOfWeek: '47'}})
  }, [])


  useEffect(()=>{
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const weekNumber = getIndexOfWeek()
    let props = selectedChart === 'week' ?
      {year: currentYear, indexOfWeek: weekNumber} : (
        selectedChart === 'month' ? {year: currentYear, nameOfMonth: getCurrentMonthName()} :
          {year: currentYear}
      )

    console.log('weekNumber', weekNumber)
    getChartData({
      type: selectedChart,
      props: props
    })
  }, [selectedChart])
  const ButtonGroup = ({ onButtonClick }) => {
    return (
      <div class="btn-group" role="group" aria-label="Basic example">
        <div
          className={`btn btn-group-fixed-width ${selectedChart === "year" ? "blue-button" : "white-button"}`}
          onClick={() => setSelectedChart("year")}
        >
          {t('year')}
        </div>
        <div
          className={`btn btn-group-fixed-width ${selectedChart === "month" ? "blue-button" : "white-button"}`}
          onClick={() => setSelectedChart("month")}
        >
          {t('month')}
        </div>
        <div
          className={`btn btn-group-fixed-width ${selectedChart === "week" ? "blue-button" : "white-button"}`}
          onClick={() => setSelectedChart("week")}
        >
          {t('week')}
        </div>
      </div>
    );
  };


  const DateRangeComponent = ({ startDate, endDate }) => {
    return (
      <div className="row switcher-container">
        <div className="col-sm-auto circle-button">
          <BiChevronLeft size={19} color={"#000"} />
        </div>
        <div className="col-sm-auto date-range-text">
          <span>{startDate} - {endDate}</span>
        </div>
        <div className="col-sm-auto circle-button">
          <BiChevronRight size={19} color={"#000"} />
        </div>
      </div>
    );
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

      <HeaderDoctor title={"Analyse de la patientèle"} />
      <div className="nk-content ">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="container" style={{maxWidth: 'unset'}}>
                  <div className="row pt-5 pb-5 ps-2 pe-2">
                    <div className="col">
                      <DateRangeComponent startDate="30 Oct" endDate="5 Nov, 2023" />
                    </div>
                    <div className="col d-flex justify-end">
                      <ButtonGroup />
                    </div>
                  </div>
                  <div className="pb-4 ">
                    <Bar
                      data={data}
                      options={options}
                    />
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

export default Analyses;
