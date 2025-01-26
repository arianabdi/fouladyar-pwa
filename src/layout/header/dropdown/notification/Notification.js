import React, { useEffect, useState } from "react";
import Icon from "../../../../components/icon/Icon";
import data from "./NotificationData";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import { toFarsiNumber } from "../../../../shared/toFarsiNumber";
import { ConvertDateToCalendarString } from "../../../../shared/convertDateToCalendarString";
import axios from "axios";
import { convertDate } from "../../../../shared/shared";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const NotificationItem = (props) => {
  const { icon, iconStyle, text, createdAt, id } = props;
  return (
    <div className="nk-notification-item" key={id} id={id}>
      <div className="nk-notification-icon">
        <Icon name={icon} className={[`icon-circle ${iconStyle ? " " + iconStyle : ""}`]} />
      </div>
      <div className="nk-notification-content">
        <div className="nk-notification-text">{text}</div>
        <div className="nk-notification-time">{
          toFarsiNumber(ConvertDateToCalendarString(createdAt.split('.')[0]))
        }</div>
      </div>
    </div>
  );
};

const Notification = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const path = '/Notifications/GetData/Notification';
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "curve-down-right",
      iconStyle: "bg-warning-dim",
      text: "نسخه جدید داشبورد بروز شد",
      createdAt: "2023-10-10T10:33:57.450Z",
    },
  ])


  useEffect(()=>{
    console.log('notifications', notifications)
  }, [notifications])

  useEffect(() => {
    // Fetch notifications initially when the component mounts
    async function fetchNotifications(){


      try {
        console.log('notifications called!')
        const res = await axios.get(`${process.env.REACT_APP_API_URL}${path}`,
          {
            headers: {
              "authorization": `bearer ${auth.token}`
            }
          }
        );

        console.log('notifications', res)

        if(res.data.statusCode === 200){
          setNotifications(res.data.data.notifications.slice(0, 5))
        }
      }catch (e){

        toast.error(e.message)
      }

    }


    //
    // fetchNotifications();
    //
    // // Schedule notifications fetch every 4 minutes (4 * 60 * 1000 milliseconds)
    // const fetchInterval = setInterval(fetchNotifications, 4 * 60 * 1000);
    //
    // // Clean up the interval when the component unmounts
    // return () => {
    //   clearInterval(fetchInterval);
    // };
  }, []);



  return (
    <UncontrolledDropdown className="user-dropdown">
      <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
        <div className="icon-status icon-status-info">
          <Icon name="bell" />
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-xl dropdown-menu-s1">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">اطلاع رسانی</span>
          <a href="#markasread" onClick={(ev) => ev.preventDefault()}>
             مشاهد کردم!
          </a>
        </div>
        <div className="dropdown-body">
          <div className="nk-notification">
            {notifications.map((item) => {
              return (
                <NotificationItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  iconStyle={item.iconStyle}
                  text={item.text}
                  createdAt={item.createdAt}
                />
              );
            })}
          </div>
        </div>
        <div className="dropdown-foot center">
          <a href="#viewall" onClick={(ev) => {
            ev.preventDefault();
            navigate(`${process.env.PUBLIC_URL}/notifications`);
          }}>
            مشاهده همه
          </a>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;
