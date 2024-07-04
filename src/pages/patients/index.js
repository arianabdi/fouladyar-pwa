import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/Component";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { LuCalendar, LuHistory, LuPlus } from "react-icons/lu";
import axios from "axios";
import { Field } from "../../components/fouladyar/field/field";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../../components/fouladyar/empty-state/emptyState";
import EmptyStateImage from "../../assets/images/cliconsult/empty-states/patient-empty-state.png";
import { getCurrentFormattedDate, updateCurrentTime } from "../../shared/shared";
import MultiDatePicker from "react-multi-date-picker";
import toast from "react-hot-toast";
import { ErrorToaster } from "../../shared/toaster";


const DoctorPatients = () => {
  // const localizer = momentLocalizer(moment);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();


  const [onHold, setOnHold] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [todaysSessions, setTodaysSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [frDate, setFrDate] = useState({
    day: "-",
    month: "-",
    year: "-",
    dayOfWeek: "-",
    time: `-`
  });
  const [appointments, setAppointments] = useState([
    // {
    //   "sessionId": 513743151976390907,
    //   "appointmentId": 513745227473342564,
    //   "turnNumber": 1,
    //   "turnsToAwait": 0,
    //   "visitTime": "18:00",
    //   "status": "WAITING",
    //   "fullName": "Hesam Abdollahi",
    //   "age": 28,
    //   "mobileNumber": "1221421132",
    //   "clientSubjectId": "",
    //   "numOfPersons": 1
    // },
    // {
    //   "sessionId": 513743151976390907,
    //   "appointmentId": 513761362046242590,
    //   "turnNumber": 2,
    //   "turnsToAwait": 1,
    //   "visitTime": "18:10",
    //   "status": "WAITING",
    //   "fullName": "Reza Mohaseni",
    //   "age": 28,
    //   "mobileNumber": "1221421132",
    //   "clientSubjectId": "",
    //   "numOfPersons": 1
    // },
    // {
    //   "sessionId": 513743151976390907,
    //   "appointmentId": 513761408825805339,
    //   "turnNumber": 3,
    //   "turnsToAwait": 2,
    //   "visitTime": "18:20",
    //   "status": "WAITING",
    //   "fullName": "Simin Daneshvaran",
    //   "age": 28,
    //   "mobileNumber": "1221421132",
    //   "clientSubjectId": "",
    //   "numOfPersons": 1
    // }
  ]);

  useEffect(()=>{
  },[onHold])

  async function getAllSessions() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/session/${moment(selectedDate).format("YYYY-MM-DD")}`, {
        headers: { authorization: `bearer ${auth.token}` }
      });

      if (res.status === 200) {
        setTodaysSessions(res.data);
      }

    } catch (e) {
      setTodaysSessions([]);
      ErrorToaster(e);
    }
  }

  useEffect(() => {
    getAllSessions();

    // Function to update screenWidth when the window is resized
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', updateScreenWidth);

    // Cleanup the interval on component unmount
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };

  }, []);

  useEffect(() => {

    setFrDate(getCurrentFormattedDate());
    function changeTime() {
      setFrDate(prevState => ({
        ...prevState,
        time: updateCurrentTime()
      }));
    }

    const intervalId = setInterval(onHold ? '' : changeTime, 6000);


    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };

  }, [onHold])

  function checkIfTheFirstAppointmentQueue(appointmentId){
    const waitingQueue = appointments.filter(i=> i.status === "WAITING");
    return waitingQueue[0]?.appointmentId === appointmentId
  }

  function isThereAnyPatientInOffice() {
    return !!appointments.find(i => i.status === "VISITING");
  }

  useEffect(() => {
    getAllSessions();
  }, [selectedDate]);

  useEffect(() => {
    let intervalId;

    const fetchData = () => {
      if (todaysSessions.length > 0 && !onHold) {
        getAppointmentsBySessionId();
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval only if there are sessions
    if (todaysSessions.length > 0 ) {
      intervalId = setInterval(fetchData, 10000); // 30 seconds
    }

    return () => {
      // Clear the interval when the component is unmounted or when selectedSession changes
      clearInterval(intervalId);
    };

  }, [selectedSession, onHold]);

  async function getAppointmentsBySessionId() {
    try {

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/appointment/${selectedSession}`, {
        headers: { authorization: `bearer ${auth.token}` }
      });

      if (res.status === 200) {
        setAppointments(res.data);
      }

    } catch (e) {
      ErrorToaster(e);
    }
  }

  async function onCancelAppointment({ appointmentId, fullName }) {
    try {

      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/provider/appointment/cancel`, {
        "appointmentId": appointmentId,
        "fullName": fullName
      }, {
        headers: { "authorization": `bearer ${auth.token}` }
      });

      if (res.status === 200) {
        await getAppointmentsBySessionId();
        setIsModalOpen(false);
      }

    } catch (e) {
      ErrorToaster(e);
    }
  }
  async function onMakeAppointment(newPatient) {
    try {

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/provider/appointment/make`, newPatient, {
        headers: { "authorization": `bearer ${auth.token}` }
      });

      if (res.status === 200) {
        await getAppointmentsBySessionId();
        setIsModalOpen(false);
        setOnHold(false)
      }

    } catch (e) {
      ErrorToaster(e);
      setIsModalOpen(false);
      setOnHold(false)
    }
  }


  function CustomTableRow({ item }) {
    async function changeStatus(status) {
      try {
        setIsChangingStatus(true);

        const data = status === "done" ? {
            "appointmentId": item.appointmentId,
            "clientSubjectId": item.clientSubjectId,
            "fullName": item.fullName
          } :
          {
            "appointmentId": item.appointmentId,
            "clientSubjectId": item.clientSubjectId
          };


        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/appointment/${status}`, data,
          {
            headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${auth.token}`
            }
          }
        );

        if (res.status === 200) {
          await getAppointmentsBySessionId();
        }

        setIsChangingStatus(false);
      } catch (e) {
        setIsChangingStatus(false);
        ErrorToaster(e);

      }
    }
    return (
      <tr>
        <td>
          {
            item.status === "CANCELED_BY_PROVIDER" || item.status === "VISITED" || item.status === "CANCELED" ? "" :
              <span className={"btn"} onClick={async () => {
                await onCancelAppointment({
                  appointmentId: item.appointmentId,
                  fullName: item.fullName
                });
              }}>
              <IoMdCloseCircleOutline size={20} color={"#555555"} />
            </span>
          }
        </td>
        <td>
          <span className={"btn"} onClick={() => {

          }}>
            <LuHistory size={20} color={"#555555"} />
          </span>
        </td>
        <td>{item.fullName}</td>
        <td>{item.age}</td>
        <td>{item.visitTime}</td>
        <td>{item.mobileNumber}</td>
        <td>{item.turnNumber}</td>
        <td>
          <div className={`status-text ${
            (
              item.status === "CANCELED_BY_PROVIDER" || item.status === "CANCELED") ? "red-status" : (
              item.status === "WAITING" ? "blue-status" : (
                item.status === "BLOCK" ? "gray-status" : (
                  item.status === "ON_HOLD" ? "purple-status" : (
                    item.status === "VISITED" ? "green-status" : (
                      item.status === "VISITING" ? "yellow-status" : ""
                    )
                  )
                )
              )
            )
          }`}>{t(item.status)}</div>
        </td>
        <td>
          {
            (item.status === "WAITING" && checkIfTheFirstAppointmentQueue(item.appointmentId) && !isThereAnyPatientInOffice()) ?
              <div disabled={isChangingStatus} className={"btn status-btn status-btn-checkin"} onClick={async () => {await changeStatus("checkIn", item.fullName);}}>{t("check-in")}</div> : (
                item.status === "ON_HOLD" ?
                  <div disabled={isChangingStatus} className={"btn status-btn status-btn-resume"} onClick={async () => {await changeStatus("resume", item.fullName);}}>{t("resume")}</div> : (
                    item.status === "VISITING" ?
                      <div disabled={isChangingStatus} className={"btn status-btn status-btn-done"} onClick={async () => {await changeStatus("done", item.fullName);}}>{t("done")}</div> : (
                        (item.status === "VISITED" || item.status === "CANCELED_BY_PROVIDER" || item.status === "CANCELED") ? '' :
                          !isThereAnyPatientInOffice() ? <div disabled={isChangingStatus} className={"btn status-btn status-btn-urgent"} onClick={async () => {await changeStatus("urgent", item.fullName);}}>{t("urgent")}</div> : ''
                      )
                  )
              )

          }
        </td>
        <td>
          <div disabled={isChangingStatus} onClick={async () => {
            if (item.status === "VISITING")
              await changeStatus("onhold");
          }}>
            {
              (item.status === "VISITING" || item.status === "ON_HOLD") ?
                (
                  <svg
                    className={item.status === "VISITING" ? "status-hourglass-pause" : (item.status === "ON_HOLD" ? "status-hourglass-resume" : "")}
                    width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.987 3.0585V2.0255H17.2145C17.2845 2.0255 17.341 1.969 17.341 1.899V0.1265C17.341 0.0565 17.2845 0 17.2145 0H0.1265C0.0565001 0 0 0.0565 0 0.1265V1.899C0 1.969 0.0565001 2.0255 0.1265 2.0255H1.354V3.0585C1.354 6.4485 2.9645 9.5375 5.466 10.9625C5.637 11.185 6.04 11.772 5.983 12.3125C5.957 12.5575 5.8345 12.7685 5.6085 12.9575C3.022 14.344 1.354 17.471 1.354 20.9415V21.9745H0.1265C0.0565001 21.9745 0 22.031 0 22.1005V23.8735C0 23.9435 0.0565001 24 0.1265 24H17.2145C17.2845 24 17.341 23.9435 17.341 23.8735V22.1005C17.341 22.031 17.2845 21.9745 17.2145 21.9745H15.987V20.9415C15.987 17.472 14.319 14.3445 11.732 12.957C11.5065 12.768 11.384 12.557 11.358 12.3125C11.3015 11.774 11.7045 11.185 11.876 10.962C14.377 9.5375 15.987 6.4495 15.987 3.0585ZM10.353 12.4185C10.409 12.951 10.6735 13.408 11.138 13.777C11.1625 13.796 11.189 13.8135 11.216 13.828C13.5 15.03 14.976 17.822 14.976 20.942V21.5965H2.365V20.942C2.365 17.8225 3.8405 15.0305 6.1245 13.8285C6.152 13.8145 6.178 13.797 6.202 13.7775C6.6675 13.4095 6.932 12.952 6.988 12.4185C7.0895 11.453 6.4625 10.5785 6.188 10.2475C6.147 10.1975 6.0975 10.157 6.042 10.1265C3.8075 8.9005 2.365 6.1265 2.365 3.0585V2.4045H14.9765V3.059C14.9765 6.1275 13.5335 8.9015 11.3 10.1265C11.2445 10.158 11.1945 10.1985 11.154 10.247C10.879 10.5795 10.2515 11.4555 10.353 12.4185Z" />
                    <path
                      d="M12.6098 6.19913C12.6288 6.15363 12.6203 6.10113 12.5868 6.06413C12.5538 6.02863 12.5028 6.01363 12.4543 6.03013L6.18729 8.06513C6.14479 8.07813 6.11279 8.11363 6.10279 8.15713C6.09279 8.20063 6.10679 8.24663 6.13929 8.27663C6.42129 8.54463 6.71379 8.76263 7.00829 8.92363L7.37779 9.12713L7.63379 9.43563C8.05779 9.94663 8.36579 10.4861 8.55029 11.0371C8.56779 11.0891 8.61629 11.1236 8.67029 11.1236C8.72429 11.1236 8.77279 11.0891 8.79029 11.0371C8.97479 10.4856 9.28329 9.94613 9.70879 9.43363L9.96429 9.12613L10.3333 8.92363C11.2598 8.41563 12.0893 7.42263 12.6098 6.19913Z" />
                    <path
                      d="M10.0994 14.9506L9.92743 14.8146C9.38693 14.3876 9.00393 13.8751 8.78893 13.2926C8.75293 13.1941 8.58893 13.1941 8.55243 13.2926C8.33743 13.8741 7.95443 14.3866 7.41293 14.8156L7.26093 14.9391L7.06293 15.0431C5.55693 15.8361 4.42093 17.7861 4.16893 20.0121C4.16443 20.0481 4.17593 20.0836 4.20043 20.1106C4.22443 20.1371 4.25843 20.1526 4.29443 20.1526H13.0479C13.0839 20.1526 13.1184 20.1371 13.1419 20.1106C13.1664 20.0831 13.1774 20.0481 13.1734 20.0121C12.9209 17.7846 11.7844 15.8346 10.2789 15.0426L10.0994 14.9506Z" />
                  </svg>
                ) : ""
            }
          </div>
        </td>
        <td>{item.numOfPersons}</td>
      </tr>
    );
  }

  function CardItem({ item }) {
    async function changeStatus(status) {
      try {
        setIsChangingStatus(true);

        const data = status === "done" ? {
            "appointmentId": item.appointmentId,
            "clientSubjectId": item.clientSubjectId,
            "fullName": item.fullName
          } :
          {
            "appointmentId": item.appointmentId,
            "clientSubjectId": item.clientSubjectId
          };


        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/appointment/${status}`, data,
          {
            headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${auth.token}`
            }
          }
        );

        if (res.status === 200) {
          await getAppointmentsBySessionId();
        }

        setIsChangingStatus(false);
      } catch (e) {
        ErrorToaster(e);
        setIsChangingStatus(false);
      }
    }

    return (
      <div className={"patient-card-mobile mb-2"}>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <span className={"btn"} onClick={() => {

            }}>
              <LuHistory size={24} color={"#555555"} />
            </span>
          </div>
          <div className="d-flex align-center">
            <div className={`status-text ${
              (
                item.status === "CANCELED_BY_PROVIDER" || item.status === "CANCELED") ? "red-status" : (
                item.status === "WAITING" ? "blue-status" : (
                  item.status === "BLOCK" ? "gray-status" : (
                    item.status === "ON_HOLD" ? "purple-status" : (
                      item.status === "VISITED" ? "green-status" : (
                        item.status === "VISITING" ? "yellow-status" : ""
                      )
                    )
                  )
                )
              )
            }`}>{t(item.status)}</div>
          </div>
          <div>
            {
              item.status === "CANCELED_BY_PROVIDER" || item.status === "VISITED" || item.status === "CANCELED" ? "" :
                <span className={"btn"} onClick={async () => {
                  await onCancelAppointment({
                    appointmentId: item.appointmentId,
                    fullName: item.fullName
                  });
                }}>
              <IoMdCloseCircleOutline size={25} color={"#555555"} />
            </span>
            }
          </div>
        </div>
        <div className="patient-fullname pt-2 pb-2">{item.fullName}</div>
        <div className="container">
          <div className="row patient-card-data">
            <div className="col-7 key p-0">Âge :</div>
            <div className="col-5 value p-0">{item.age}</div>
          </div>
          <div className="row patient-card-data">
            <div className="col-7 key p-0">Heure de passage :</div>
            <div className="col-5 value p-0">{item.visitTime}</div>
          </div>
          <div className="row patient-card-data">
            <div className="col-7 key p-0">Téléphone portable :</div>
            <div className="col-5 value p-0">{item.mobileNumber}</div>
          </div>
          <div className="row patient-card-data">
            <div className="col-7 key p-0">Numéro :</div>
            <div className="col-5 value p-0">{item.turnNumber}</div>
          </div>
          <div className="row patient-card-data">
            <div className="col-7 key p-0">Nb. de patient :</div>
            <div className="col-5 value p-0">{item.numOfPersons}</div>
          </div>
        </div>


        <div className={`d-flex flex-row justify-content-between ${ (item.status === "VISITING" || item.status === "ON_HOLD") ? "g-3" : ""} ps-3 pt-2 pe-3`}>

          <div className="d-flex flex-grow-1">
            {
              (item.status === "WAITING" && checkIfTheFirstAppointmentQueue(item.appointmentId) && !isThereAnyPatientInOffice()) ?
                <div disabled={isChangingStatus} className={"w-100 btn status-btn status-btn-checkin"} onClick={async () => {await changeStatus("checkIn");}}>{t("check-in")}</div> : (
                  item.status === "ON_HOLD" ?
                    <div disabled={isChangingStatus} className={"w-100 btn status-btn status-btn-resume"} onClick={async () => {await changeStatus("resume");}}>{t("resume")}</div> : (
                      item.status === "VISITING" ?
                        <div disabled={isChangingStatus} className={"w-100 btn status-btn status-btn-done"} onClick={async () => {await changeStatus("done");}}>{t("done")}</div> : (
                          (item.status === "VISITED" || item.status === "CANCELED_BY_PROVIDER" || item.status === "CANCELED") ? '' :
                            !isThereAnyPatientInOffice() ? <div disabled={isChangingStatus} className={"w-100 btn status-btn status-btn-urgent"} onClick={async () => {await changeStatus("urgent");}}>{t("urgent")}</div> : ''
                        )
                    )
                )
            }
          </div>
          <div style={{display: (item.status === "VISITING" || item.status === "ON_HOLD") ? 'block' : "none" }}>
            {
              <div disabled={isChangingStatus} className="on-hold-btn d-flex align-center "  onClick={async () => {
                if (item.status === "VISITING")
                  await changeStatus("onhold");
              }}>
                {
                  (item.status === "VISITING" || item.status === "ON_HOLD") ?
                    (
                      <svg
                        className={item.status === "VISITING" ? "status-hourglass-pause" : (item.status === "ON_HOLD" ? "status-hourglass-resume" : "")}
                        width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.987 3.0585V2.0255H17.2145C17.2845 2.0255 17.341 1.969 17.341 1.899V0.1265C17.341 0.0565 17.2845 0 17.2145 0H0.1265C0.0565001 0 0 0.0565 0 0.1265V1.899C0 1.969 0.0565001 2.0255 0.1265 2.0255H1.354V3.0585C1.354 6.4485 2.9645 9.5375 5.466 10.9625C5.637 11.185 6.04 11.772 5.983 12.3125C5.957 12.5575 5.8345 12.7685 5.6085 12.9575C3.022 14.344 1.354 17.471 1.354 20.9415V21.9745H0.1265C0.0565001 21.9745 0 22.031 0 22.1005V23.8735C0 23.9435 0.0565001 24 0.1265 24H17.2145C17.2845 24 17.341 23.9435 17.341 23.8735V22.1005C17.341 22.031 17.2845 21.9745 17.2145 21.9745H15.987V20.9415C15.987 17.472 14.319 14.3445 11.732 12.957C11.5065 12.768 11.384 12.557 11.358 12.3125C11.3015 11.774 11.7045 11.185 11.876 10.962C14.377 9.5375 15.987 6.4495 15.987 3.0585ZM10.353 12.4185C10.409 12.951 10.6735 13.408 11.138 13.777C11.1625 13.796 11.189 13.8135 11.216 13.828C13.5 15.03 14.976 17.822 14.976 20.942V21.5965H2.365V20.942C2.365 17.8225 3.8405 15.0305 6.1245 13.8285C6.152 13.8145 6.178 13.797 6.202 13.7775C6.6675 13.4095 6.932 12.952 6.988 12.4185C7.0895 11.453 6.4625 10.5785 6.188 10.2475C6.147 10.1975 6.0975 10.157 6.042 10.1265C3.8075 8.9005 2.365 6.1265 2.365 3.0585V2.4045H14.9765V3.059C14.9765 6.1275 13.5335 8.9015 11.3 10.1265C11.2445 10.158 11.1945 10.1985 11.154 10.247C10.879 10.5795 10.2515 11.4555 10.353 12.4185Z" />
                        <path
                          d="M12.6098 6.19913C12.6288 6.15363 12.6203 6.10113 12.5868 6.06413C12.5538 6.02863 12.5028 6.01363 12.4543 6.03013L6.18729 8.06513C6.14479 8.07813 6.11279 8.11363 6.10279 8.15713C6.09279 8.20063 6.10679 8.24663 6.13929 8.27663C6.42129 8.54463 6.71379 8.76263 7.00829 8.92363L7.37779 9.12713L7.63379 9.43563C8.05779 9.94663 8.36579 10.4861 8.55029 11.0371C8.56779 11.0891 8.61629 11.1236 8.67029 11.1236C8.72429 11.1236 8.77279 11.0891 8.79029 11.0371C8.97479 10.4856 9.28329 9.94613 9.70879 9.43363L9.96429 9.12613L10.3333 8.92363C11.2598 8.41563 12.0893 7.42263 12.6098 6.19913Z" />
                        <path
                          d="M10.0994 14.9506L9.92743 14.8146C9.38693 14.3876 9.00393 13.8751 8.78893 13.2926C8.75293 13.1941 8.58893 13.1941 8.55243 13.2926C8.33743 13.8741 7.95443 14.3866 7.41293 14.8156L7.26093 14.9391L7.06293 15.0431C5.55693 15.8361 4.42093 17.7861 4.16893 20.0121C4.16443 20.0481 4.17593 20.0836 4.20043 20.1106C4.22443 20.1371 4.25843 20.1526 4.29443 20.1526H13.0479C13.0839 20.1526 13.1184 20.1371 13.1419 20.1106C13.1664 20.0831 13.1774 20.0481 13.1734 20.0121C12.9209 17.7846 11.7844 15.8346 10.2789 15.0426L10.0994 14.9506Z" />
                      </svg>
                    ) : ""
                }
              </div>
            }
          </div>

        </div>

      </div>
    );
  }
  return (
    <React.Fragment>
      <ModalHelper
        size={"sm"}
        open={isModalOpen}
        onOpen={() => {
          setOnHold(true)
          setIsModalOpen(true);
        }}
        onClose={() => {

          setOnHold(false)
          setIsModalOpen(false);
        }}
        component={modalComponent}
      />

      <HeaderDoctor title={""} />
      <div className="nk-content patient-nk-content">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="containe nk-block-card m-0 p-0">
                  <div className="dashboard-summary mb-4">
                    <div className="row">
                      <div className="col-sm pb-3 pt-3 p-0">
                        <div className="container mh-130 d-flex flex-column justify-center align-center"
                             style={{ borderRight: "2px solid #fff" }}>
                          <div className="row dashboard-summary-row dashboard-summary-thin"
                               style={{ fontWeight: "500" }}>Les horaires du cabinet
                            aujourd’hui :
                          </div>
                          <div className="row dashboard-summary-row dashboard-summary-current-session">
                            <Field
                              id={"session"}
                              name={"session"}
                              type={"select"}
                              placeholder={"sélectionner"}
                              options={todaysSessions.length > 0 ? todaysSessions.map(i => {
                                return { label: `${i.start} - ${i.end}`, value: i.id };
                              }) : []}
                              value={selectedSession}
                              onChange={(e) => {
                                setSelectedSession(e);
                              }}
                            />
                          </div>
                          <div className="pb-4"></div>
                          <div className="row dashboard-summary-row dashboard-summary-thin"
                               style={{ fontWeight: "500" }}>Durée des séances :
                          </div>
                          <div
                            className="row dashboard-summary-row dashboard-summary-bold">{todaysSessions.find(i => i.id === selectedSession)?.length || 0} minutes
                          </div>
                        </div>
                      </div>
                      <div className="col-sm pb-3 pt-3 p-0 d-none d-sm-block ">
                        <div className="container p-0 mh-130 d-flex flex-column justify-center align-center"
                             style={{ borderRight: "2px solid #fff" }}>
                          <div className="row dashboard-summary-row dashboard-summary-thin">
                            <div className="dashboard-summary-number-big">{frDate.day}</div>
                            <div className="w-auto pt-1"
                                 style={{ fontWeight: "500" }}>  {t(frDate.month)} {frDate.year}</div>
                          </div>
                          <div className="pb-2"></div>
                          <div className="row dashboard-summary-row dashboard-summary-thin">

                            <div className="dashboard-summary-number-big">{frDate.time}</div>
                            <div className="w-auto pt-1" style={{ fontWeight: "500" }}> {t(frDate.dayOfWeek)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm pb-3 pt-3 p-0 d-none d-sm-block ">
                        <div className="container p-0 mh-130 d-flex flex-column justify-center align-center">
                          <div className="row dashboard-summary-row dashboard-summary-thin">
                            <div className="dashboard-summary-number-big">0</div>
                            <div className="w-auto pt-1" style={{ fontWeight: "500" }}> Total de patients</div>
                          </div>
                          <div className="pb-2"></div>
                          <div className="row   w-80-2">
                            <div className="col">
                              <div className="row dashboard-summary-row dashboard-summary-thin"
                                   style={{ fontWeight: "500" }}>En attente
                              </div>
                              <div className="row dashboard-summary-row dashboard-summary-bold"
                                   style={{ fontWeight: "500" }}>0
                              </div>
                            </div>
                            <div className="col">
                              <div className="row dashboard-summary-row dashboard-summary-thin"
                                   style={{ fontWeight: "500" }}>Vu
                              </div>
                              <div className="row dashboard-summary-row dashboard-summary-bold"
                                   style={{ fontWeight: "500" }}>0
                              </div>
                            </div>
                            <div className="col">
                              <div className="row dashboard-summary-row dashboard-summary-thin"
                                   style={{ fontWeight: "500" }}>Annulé
                              </div>
                              <div className="row dashboard-summary-row dashboard-summary-bold"
                                   style={{ fontWeight: "500" }}>0
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {
                    screenWidth > 768 ?
                      <div className="patient-card p-3">
                        <div className="row mt-2 mb-2">
                          <div className="col-sm-8">
                            <div className="d-flex flex-row">
                              <div className="patient-title w-auto">Liste des patients</div>
                              <div className={`btn blue-button w-auto ms-2 ${!selectedSession ? 'disabled' : ''}`} onClick={() => {

                                if(selectedSession) {
                                  setModalComponent(
                                    <AddPatientModal
                                      onClose={()=>{
                                        setIsModalOpen(false);
                                        setOnHold(false)
                                      }}
                                      onSubmit={async (e)=>{
                                        await onMakeAppointment(e)
                                      }}
                                    />);
                                  setIsModalOpen(true);
                                  setOnHold(true)
                                }
                              }}>
                                <LuPlus size={19} color={"#ffff"} className={"me-2"} />
                                <span>Ajouter un nouveau patient</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm justify-end align-end">
                            <div className={`btn blue-button button-timepicker w-auto`} onClick={() => {
                            }}>

                              <MultiDatePicker
                                placeholder={""}
                                format="DD MMMM YYYY"
                                value={selectedDate}
                                onChange={event => {
                                  setSelectedDate(new Date(event?.toDate?.().toString()));
                                }
                                } />

                              <LuCalendar size={19} color={"#ffff"} />
                            </div>


                          </div>
                        </div>

                        {
                          (todaysSessions.length === 0 || appointments.length === 0) ?
                            <EmptyState title={"Vous pouvez voir la liste de vos patients sur cette page \n" +
                              "mais personne n'a encore pris de rendez-vous."} image={EmptyStateImage} /> :
                            <div className="dashboard-table mt-0">
                              <table className="table ">
                                <thead className="table-light">
                                <tr className="pt-1 pb-1">
                                  <th scope="col">Annuler</th>
                                  <th scope="col">Historique</th>
                                  <th scope="col">nom et prénom</th>
                                  <th scope="col">Âge</th>
                                  <th scope="col">Heure de passage</th>
                                  <th scope="col">Téléphone portable</th>
                                  <th scope="col">Numéro</th>
                                  <th scope="col">Statut</th>
                                  <th scope="col">Action</th>
                                  <th scope="col">En Pause</th>
                                  <th scope="col">Nb. de patient</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                  appointments.map(item => {
                                    return (
                                      <CustomTableRow item={item} />
                                    );
                                  })
                                }
                                </tbody>
                              </table>
                            </div>
                        }


                      </div> :
                      <div>
                        <div className="patient-title w-100">Liste des patients</div>
                        <div className={`btn blue-button w-auto mb-2 w-100`} onClick={() => {
                          setIsModalOpen(true);
                          setOnHold(true)
                        }}>
                          <LuPlus size={19} color={"#ffff"} className={"me-2"} />
                          <span>Ajouter un nouveau patient</span>
                        </div>
                        {
                          appointments.map(item => {
                            return (
                              <CardItem item={item} />
                            );
                          })
                        }
                      </div>
                  }



                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};



export const AddPatientModal = ({onClose, onSubmit}) => {

  const [newPatient, setNewPatient] = useState({
    "firstName": "",
    "lastName": "",
    "dateOfBirth": "",
    "mobileNumber": "",
    "numOfPersons": 1
  });



  return (
    <div>
      <div className="row d-flex flex-row justify-between">
        <div className="col-sm-auto align-center">
          <h4 style={{ padding: "0px 20px", fontSize: 15 }}>Ajouter un nouveau patient</h4>
        </div>
        <div className="col-sm-auto">
          <div className="btn" onClick={() => {
          }}>
            <a href="#cancel" className="close" style={{ fontSize: "1.1em" }}>
              <Icon style={{ color: "#000" }} name="cross-sm" onClick={(ev) => {
                ev.preventDefault();
                onClose()
              }}
              ></Icon>
            </a>
          </div>
        </div>
      </div>
      <li className="divider" style={{ margin: 0 }}></li>

      <div className="p-3 pt-2 pb-2">
        <div className="col-sm-12 mb-2">
          <Field
            id={"firstName"}
            name={"firstName"}
            placeholder={"Nom"}
            type={"text"}
            value={newPatient.firstName}
            onChange={(e) => {
              setNewPatient(prevState => ({
                ...prevState,
                firstName: e
              }));
            }}
          />
        </div>
        <div className="col-sm-12 mb-2">
          <Field
            id={"lastName"}
            name={"lastName"}
            placeholder={"Prénom"}
            type={"text"}
            value={newPatient.lastName}
            onChange={(e) => {
              setNewPatient(prevState => ({
                ...prevState,
                lastName: e
              }));
            }}
          />
        </div>
        <div className="col-sm-12 mb-2">
          <Field
            id={"mobileNumber"}
            name={"mobileNumber"}
            placeholder={"Téléphone portable"}
            type={"number"}
            value={newPatient.mobileNumber}
            onChange={(e) => {
              setNewPatient(prevState => ({
                ...prevState,
                mobileNumber: e
              }));
            }}
          />
        </div>
        <div className="col-sm-12 mb-2">
          <Field
            id={"dateOfBirth"}
            name={"dateOfBirth"}
            placeholder={"Date de naissance"}
            type={"date"}
            value={newPatient.dateOfBirth}
            onChange={(e) => {
              setNewPatient(prevState => ({
                ...prevState,
                dateOfBirth: e
              }));
            }}
          />
        </div>
        <div className="d-flex justify-center align-center">
          <div className={`col-sm-6 btn white-button me-1`} onClick={() => {
            onClose()
          }}>
            Annuler
          </div>
          <div className={`col-sm-6 btn blue-button ms-0`} onClick={async () => {
            onSubmit(newPatient)
          }}>
            Soumettre
          </div>
        </div>
      </div>


    </div>
  );
}

export default DoctorPatients;
