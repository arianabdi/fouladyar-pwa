import React, { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/Component";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import { Calendar, momentLocalizer } from 'react-big-calendar'

import { HiOutlineTrash, HiPencil } from "react-icons/hi";
import axios from "axios";
import { MdAdd, MdClose } from "react-icons/md";
import { Field } from "../../components/fouladyar/field/field";
import { LuCalendar, LuLogOut, LuMinus } from "react-icons/lu";
require('react-big-calendar/lib/css/react-big-calendar.css');

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { ErrorToaster } from "../../shared/toaster";
import { LoadingState } from "../../components/fouladyar/loading-state/loadingState";
const localizer = momentLocalizer(moment)
export let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}
const CURRENT_DATE = moment().toDate();
const ColoredDateCellWrapper = ({children, value}) =>
  React.cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
    },
  });


class CustomToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screenWidth: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    const { onView } = this.props;
    const { screenWidth } = this.state;

    // Check if screenWidth has changed
    if (prevState.screenWidth !== screenWidth) {
      // Set the view based on screenWidth
      const newView = screenWidth < 600 ? 'day' : 'week';

      // Call onView with the new view
      onView(newView);
    }
  }


  handleResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
    });
  };


  render() {
    let { localizer: { messages }, label, views, view, onView, onSelectSlot,    } = this.props
    const { screenWidth } = this.state;

    return(
      <div className="rbc-toolbar">
        <div className={`d-flex  ${screenWidth < 600 ? "flex-column" : "flex-row"} w-100 justify-content-between pt-4 pb-2`}>

          {
            screenWidth > 600 ? '' :
              <span className="calendar-mobile-title pt-2 pb-3 w-100">Votre Agenda</span>
          }

          <div className={`d-flex flex-row flex-wrap ${screenWidth < 600 ? "justify-content-center w-100" : "justify-content-start"}  align-center`}>
            <div className="col-sm-auto circle-button "  onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
              <BiChevronLeft size={19} color={"#000"} />
            </div>
            <div className="col-sm-auto date-range-text ps-2 pe-2">
              {label}
            </div>
            <div className="col-sm-auto circle-button" onClick={this.navigate.bind(null, navigate.NEXT)}>
              <BiChevronRight size={19} color={"#000"} />
            </div>
          </div>

          <div class="btn-group d-none d-sm-inline-flex" role="group" aria-label="Basic example">
            {views.map(v => {
              return (
                <div
                  className={`btn btn-group-fixed-width ${v === view ? "blue-button" : "white-button"}`}
                  onClick={() => onView(v)}
                >
                  {messages[v]}
                </div>
              )
            })}
          </div>

        </div>

      </div>
    )
  }
  navigate = action => {
    this.props.onNavigate(action)
  }
}

const CalendarInDoctorDashboard = () => {
  // const localizer = momentLocalizer(moment);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [calendarMode, setCalendarMode] = useState(screenWidth < 600 ? 'day' : "week");
  const [myEvents, setMyEvents] = useState([])


  // Helper function to get the ISO week number
  const getISOWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  const getDateInfo = (date) => {
    // Create a Date object from the provided date string or use the current date if not provided
    const currentDate = date ? new Date(date) : new Date();

    // Get the year
    const year = currentDate.getFullYear();

    // Get the month name in uppercase
    const monthNames = [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    const monthName = monthNames[currentDate.getMonth()].toUpperCase();

    // Get the number of the week in the year
    const weekNumber = getISOWeek(currentDate);

    return {
      year,
      monthName,
      weekNumber
    };
  };

  const isDatePast = (inputDate) => {
    // Create a Date object from the provided date string
    const targetDate = new Date(inputDate);

    // Get the current date and time
    const currentDate = new Date();

    // Compare the target date with the current date
    return targetDate < currentDate;
  };

  async function loadSessions(){
    try {

      const dateInfo = getDateInfo(moment().format('YYYY-MM-DD')); // Replace with your desired date


      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/provider/calendar/weekly/${dateInfo.year}/${dateInfo.monthName}/${dateInfo.weekNumber}`,{
      // const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/session/${moment().format('YYYY-MM-DD')}`,{
        headers: {authorization: `bearer ${auth.token}`}
      });

      if (res.status === 200) {
        console.log("ــــــــــــــــــــــ", res);

        setMyEvents(res.data.map(i=>{
          const start = i.start.split(':');
          const end = i.end.split(':');

          return {
            start: moment(i.date).set({ hour: start[0], minute: start[1] }).toDate(),
            end: moment(i.date).set({ hour: end[0], minute: end[1] }).toDate(),
            title: `${i.start} - ${i.end}`,
            id: i.id,
            length: i.length
          }
        }))
      }
      // setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      ErrorToaster(e);
    }
  }


  useEffect(() => {

    loadSessions()

  }, [auth.token]);

  useEffect(() => {
    if(screenWidth < 600)
      setCalendarMode("day")
    else
      setCalendarMode("week")
  }, [screenWidth]);

  const FloatingButton = () => {
    return (
      <div className="floating-button-container">
        <button className="floating-button" onClick={()=>{
          setModalComponent(
            <AddSessionModal
              start={new Date()}
              end={new Date()}
              date={new Date()}
              editMode={false}
              onClose={()=>{
                setIsModalOpen(false);
              }}
            />
          )
          setIsModalOpen(true)
        }}>+</button>
      </div>
    );
  };

  function AddSessionModal({start, end, date, editMode, id, length, onClose, onSubmit, onDelete, onUpdate}) {
    const [isLoading, setIsLoading] = useState(false);
    async function FetchByDelay(){
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 3000));
      await loadSessions()
      setIsModalOpen(false);
      setIsLoading(false)

    }
    const [newSession, setNewSession] = useState({
      "date": "",
      "start": "",
      "end": "",
      "length": 10
    });
    useEffect(()=>{
      setNewSession({
        "date": date || moment().format('YYYY-MM-DD'),
        "start": start || "20:00",
        "end": end || "23:59",
        "length": 10
      })
    },[])

    async function onCreateSession() {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/session`, {
          "date": newSession.date,
          "start": newSession.start,
          "end": newSession.end,
          "length": newSession.length
        },{
          headers: { "authorization": `bearer ${auth.token}`}
        });

        if (res.status === 201) {
          await FetchByDelay();
          toast.success('La tâche a été créée avec succès')
        }
      } catch (e) {
        ErrorToaster(e);
      }
    }

    async function onUpdateSession(id) {
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/session`, {
          "sessionId": id,
          "start": newSession.start,
          "end": newSession.end,
          "length": newSession.length
        },{
          headers: { "authorization": `bearer ${auth.token}`}
        });

        if (res.status === 200) {
          await FetchByDelay();
          toast.success('La tâche a été mise à jour avec succès')
        }
      } catch (e) {
        ErrorToaster(e);
      }
    }

    async function onDeleteSession(date, id) {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/session/${id}/${moment(date).format('YYYY-MM-DD')}`, {
          headers: { "authorization": `bearer ${auth.token}`}
        });

        if (res.status === 200) {
          await FetchByDelay();
          toast.success('La tâche a été supprimée avec succès')
        }
      } catch (e) {
        ErrorToaster(e);
      }
    }

    return (
      <div>

        {
          isLoading ? <div className={'modal-loading-state'}><LoadingState/></div> :  ''
        }

        <div className="d-flex flex-row justify-between">
          <div className="align-center">
            <h4 style={{ padding: "0px 20px", fontSize: 15 }}>Supprimez votre compte</h4>
          </div>
          <div className="">
            <div className="btn" onClick={onClose}>
              <MdClose  size={22} color={"#555555"} />
            </div>
          </div>
        </div>
        <li className="divider" style={{ margin: 0 }}></li>

        <div className={`p-3 pt-2 pb-2 `}>
          <div className="d-flex flex-column g-2 p-1 ">
            <div className="col-sm-12 add-session-date-title">
              Date
            </div>
            <div className="col-sm-12 add-session-date">
              <Field
                className="col-sm-2"
                id={"date"}
                name={"date"}
                type={"date"}
                value={newSession.date}
                onChange={(e) => {
                  setNewSession(prevState => ({
                    ...newSession,
                    date: moment(e).format('YYYY-MM-DD')
                  }))
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-row g-2 p-1 ">
            <div className="w-50 ps-0">
              <Field
                id={"start"}
                name={"start"}
                placeholder={"Heure de début"}
                type={"time"}
                value={newSession.start}
                onChange={(e) => {
                  setNewSession(prevState => ({
                    ...newSession,
                    start: `${e.hour}:${e.minute}`
                  }))
                }}
              />
            </div>
            <div className="w-50 pe-0">
              <Field
                id={"end"}
                name={"end"}
                placeholder={"Heure de fin"}
                type={"time"}
                value={newSession.end}
                onChange={(e) => {
                  setNewSession(prevState => ({
                    ...newSession,
                    end: `${e.hour}:${e.minute}`
                  }))
                }}
              />
            </div>
          </div>



          <div className="d-flex flex-row g-2 p-1" style={{justifyContent: 'center', lineHeight: "5px", fontFamily: 'Nunito', fontSize: "0.9rem", fontWeight: '500'}}>
            Durée du rdv (Minutes)
          </div>
          <div className="d-flex flex-row g-2 p-1">
            <div className="w-auto ps-0 pe-1">
              <div className={`btn blue-button ticker-button ${editMode ? 'disabled' : ''}`} onClick={() => {
                if(!editMode)
                  setNewSession(prevState => ({
                    ...prevState,
                    length: prevState.length > 1 ? prevState.length - 1 : prevState.length
                  }))
              }}>
                <LuMinus size={19} color={"#fff"} />
              </div>
            </div>
            <div className="w-100 pe-0 ps-0">
              <Field
                disabled={editMode}
                className={`text-center ${editMode ? 'disabled' : ''}`}
                id={"duration"}
                name={"duration"}
                placeholder={"Durée du rdv"}
                type={"number"}
                value={editMode ? length : newSession.length}
                onChange={(e) => {
                }}
              />
            </div>
            <div className="w-auto ps-1 pe-0  ">
              <div className={`btn blue-button ticker-button ${editMode ? 'disabled' : ''}`} onClick={() => {
                if(!editMode)
                  setNewSession(prevState => ({
                    ...prevState,
                    length: prevState.length + 1
                  }))
              }}>
                <MdAdd  size={19} color={"#fff"} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-center align-center">
            {
              editMode ?
                <>
                  <div className={`w-50 btn blue-button me-1`} onClick={() => {
                    onUpdateSession(id)
                  }}>
                    Valider
                  </div>
                  <div className={`w-50 d-flex flex-row justify-content-center btn ms-0`} onClick={() => {
                    onDeleteSession(date, id)
                  }}>
                    <HiOutlineTrash className={"me-2"} size={22} color={"#F73030"} />
                    <span className={`delete-text-with-trash ${isLoading ? 'disabled' :''}`}>Supprimer</span>

                  </div>
                </> :
                <>
                  <div className={`col-sm-6 btn white-button me-1`} onClick={() => {
                    setIsModalOpen(false);
                  }}>
                    Annuler
                  </div>
                  <div className={`col-sm-6 btn blue-button ms-0`} onClick={() => {
                    if(!isLoading)
                      onCreateSession()
                  }}>
                    Soumettre
                  </div>
                </>


            }


          </div>
        </div>
      </div>
    );
  }


  function eventStyleGetter(event, start, end, isSelected) {
    let style = {
      backgroundColor: '#fff',
      borderRadius: '6px',
      color: `${isDatePast(event.end) ?"#A6A6A6": "#22247D"}`,
      border: `1px solid ${isDatePast(event.end) ?"#A6A6A6": "#22247D"}`,
      display: 'block',
      padding: "0px 10px !important",
      fontSize: "13px",
    };
    return {
      style: style
    };
  }


  function Event({ event }) {

    const startTime = new Date(event.start);
    const endTime = new Date(event.end);
    const startHour = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const endHour = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12: false});

    return (
      <div className={`d-flex flex-row w-100 justify-content-between `}>
        <div className="calendar-event-time" >{startHour} — {endHour}</div>
        <div className=""> <HiPencil size={15} color={isDatePast(event.end) ?"#A6A6A6": "#22247D"} /></div>
      </div>
    )
  }

  function formatTimeFromDate(date) {
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure two digits
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits

    return `${hours}:${minutes}`;
  }


  const onSelectEvent = (slotInfo) => {
    if(!isDatePast(slotInfo.end)){
      setModalComponent(
        <AddSessionModal
          start={formatTimeFromDate(slotInfo.start)}
          end={formatTimeFromDate(slotInfo.end)}
          date={moment(slotInfo.start).format('YYYY-MM-DD')}
          id={slotInfo.id}
          length={slotInfo.length}
          editMode={true}
          onClose={()=>{
            setIsModalOpen(false);
          }}
          onSubmit={async () => {
            await loadSessions()
          }}
          onDelete={async () => {
            await loadSessions()
          }}
          onUpdate={async () => {
            await loadSessions()
          }}
        />)
      setIsModalOpen(true)
    }
  };

  const handleSelectSlot = (slotInfo) => {
    // slotInfo object contains information about the selected slot

    setModalComponent(
      <AddSessionModal
        start={formatTimeFromDate(slotInfo.start)}
        end={formatTimeFromDate(slotInfo.end)}
        date={moment(slotInfo.start).format('YYYY-MM-DD')}
        editMode={false}
        onClose={()=>{
          setIsModalOpen(false);
        }}
      />
    )
    setIsModalOpen(true)
  };
  const customWeekdayFormat = (date, culture, localizer) => {
    // Customize the format of the weekday names as needed
    return localizer.format(date, 'dddd', culture); // Display the full day name
  };
  const messages = {
    allDay: 'Celý den',
    previous: '<',
    next: '>',
    today: 'Dnes',
    month: 'Měsíc',
    week: 'Týden',
    day: 'Den',
    agenda: 'Agenda',
    date: 'Datum',
    time: 'Čas',
    event: 'Událost',
    showMore: total => `+ Zobrazit další (${total})`
  };

  const dayPropGetter = (date) => {
    const isToday = moment(date).isSame(moment(), 'day');

    return {
      style: {
        backgroundColor: isToday ? '#EDEDF0' : 'inherit', // Set the background color for the current day
      },
    };
  };
  return (

    <React.Fragment>

      <ModalHelper
        size={"sm"}
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => {
          setIsModalOpen(false);
        }}
        component={modalComponent}
      />
      <FloatingButton/>
      <HeaderDoctor title={"Analyse de la patientèle"} />
      <div className="nk-content ">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container" style={{maxWidth: "unset"}}>




                  <div className="pb-4 ">
                    <div style={{ height: 1000 }}>
                      <Calendar
                        messages={{
                          month: 'Mois',
                          week: 'Semaine',
                          day: 'Jour',
                          agenda: 'List',
                        }}
                        localizer={localizer}
                        events={myEvents}
                        startAccessor="start"
                        endAccessor="end"
                        defaultView={calendarMode} // Set the default view to 'week'
                        eventPropGetter={eventStyleGetter}
                        onSelectEvent={onSelectEvent}
                        dayPropGetter={dayPropGetter}
                        selectable
                        onSelectSlot={handleSelectSlot}

                        components={{
                          event: Event,
                          // timeGutterHeader: ColoredDateCellWrapper, // Add the custom day header component
                          toolbar: CustomToolbar,

                        }}

                        formats={{ weekdayFormat: customWeekdayFormat }}
                        showMultiDayTimes={true}
                      />
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

export default CalendarInDoctorDashboard;
