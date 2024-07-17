import React, { useRef } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import { Icon, UserAvatar } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
// import { ChatContext } from "./ChatContext";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { ConvertDateToCalendarString } from "../../../shared/convertDateToCalendarString";
import { parseMessageFromStructuralMessage } from "./components/MeChat";

function getHoursAndMinutesFromDate(d) {
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}


export const MeChat = ({ item, chat, onRemoveMessage, className }) => {


  return (
    <div className="chat is-me">
      <div className="chat-content">
        <div className="chat-bubbles">
          <div className="chat-bubble" key={`message-id-${item.id}`}>
            {item.text === "deleted" ? (
              <div className="chat-msg border bg-white text-muted">پیام با موفقیت حذف شد</div>
            ) : (
              <React.Fragment>
                <div className={`chat-msg bg-${chat.chatTheme} ${className}`}>
                  <ul className="chat-meta">
                    {item.text}
                    <li>{item.user ? item.user.userfirstname : ""}</li>
                    <li>{!item.createdAt ? "-" : toFarsiNumber(getHoursAndMinutesFromDate(new Date(item.createdAt)))}</li>
                  </ul>
                </div>
              </React.Fragment>
            )}
          </div>
          {/*End chat-bubble*/}
        </div>
        {/*End chat-bubbles*/}

        {/*<div className="chat-bubbles">
          {item.chat.map((msg, idx) => {
            return (
              <div className="chat-bubble" key={idx}>
                {msg === "deleted" ? (
                  <div className="chat-msg border bg-white text-muted">پیام با موفقیت حذف شد</div>
                ) : (
                  <React.Fragment>
                    <div className={`chat-msg bg-${chat.chatTheme}`}>{msg}</div>
                    <ul className="chat-msg-more">
                      <li className="d-none d-sm-block">
                        <a
                          href="#delete"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onRemoveMessage(idx, item.id);
                          }}
                          className="btn btn-icon btn-sm btn-trigger"
                        >
                          <Icon name="trash-fill"></Icon>
                        </a>
                      </li>
                    </ul>
                  </React.Fragment>
                )}
              </div>
            );
          })}
        </div>*/}
      </div>
    </div>
  );
};

export const YouChat = ({ item, chat, className }) => {
  return (
    <div className="chat is-you">
      {/*<div className="chat-avatar">*/}
      {/*  {chat.group ? (*/}
      {/*    <UserAvatar image={item.user.image} theme={item.user.theme} text={findUpper(item.user.name)}>*/}
      {/*      {" "}*/}
      {/*      {chat.active === true ? (*/}
      {/*        <span className="status dot dot-lg dot-success"></span>*/}
      {/*      ) : (*/}
      {/*        <span className="status dot dot-lg dot-gray"></span>*/}
      {/*      )}*/}
      {/*    </UserAvatar>*/}
      {/*  ) : (*/}
      {/*    <UserAvatar image={chat.image} theme={chat.theme} text={findUpper(chat.name)}>*/}
      {/*      {" "}*/}
      {/*      {chat.active === true ? (*/}
      {/*        <span className="status dot dot-lg dot-success"></span>*/}
      {/*      ) : (*/}
      {/*        <span className="status dot dot-lg dot-gray"></span>*/}
      {/*      )}*/}
      {/*    </UserAvatar>*/}
      {/*  )}*/}
      {/*</div>*/}
      <div className="chat-content">
        <div className="chat-bubbles">
          <div className="chat-bubble" key={`message-id-${item.id}`}>
            <div className={`chat-msg ${className}`}>
              <ul className="chat-meta">
                <li>{item.user ? item.user.userfirstname : ""}</li>
                <li>{!item.createdAt ? "-" : toFarsiNumber(getHoursAndMinutesFromDate(new Date(item.createdAt)))}</li>
                {item.text}
              </ul>
            </div>
          </div>
        </div>
        {/*<div className="chat-bubbles">
          {item.chat.map((msg, idx) => {
            return (
              <div className="chat-bubble" key={idx}>
                <div className="chat-msg">{msg}</div>
              </div>
            );
          })}
        </div>*/}
      </div>
    </div>
  );
};

export const MetaChat = ({ item }) => {
  return (
    <div className="chat-sap">
      <div className="chat-sap-meta">
        <span>{item}</span>
      </div>
    </div>
  );
};

export const ChatItemHeader = ({ item }) => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/app-chat`} className="chat-link">
      {item.group === true ? (
        <div className="chat-media user-avatar user-avatar-multiple">
          {item.user.slice(0, 2).map((user, idx) => {
            return (
              <UserAvatar
                key={idx}
                theme={user.theme}
                text={findUpper(user.name)}
                image={user.image}
                className="chat-media"
              ></UserAvatar>
            );
          })}
          <span className={"status dot dot-lg dot-success"}></span>
        </div>
      ) : (
        <UserAvatar theme={item.theme} text={findUpper(item.name)} image={item.image} className="chat-media">
          <span className={`status dot dot-lg dot-${item.active === true ? "success" : "gray"}`}></span>
        </UserAvatar>
      )}
      <div className="chat-info">
        <div className="chat-from">
          <div className="name">{item.nickname ? item.nickname : item.name}</div>
          <span className="time">{item.date}</span>
        </div>
        <div className="chat-context">
          <div className="text">
            <p>{item.conversations.length !== 0 && item.conversations[item.conversations.length - 1].chat[0]}</p>
          </div>
          <div className="status delivered">
            ۱۶۲
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ChatItem = ({ item, chatItemClick, setSelectedId, selectedId }) => {
  // const { deleteConvo, propAction } = useContext(ChatContext);
  const dropdownRef = useRef(null);

  const checkBeforeDelete = (id) => {
    // deleteConvo(id);
    if (selectedId === id) {
      setSelectedId(null);
    }
  };


  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent default right-click behavior
    if (dropdownRef.current) {
      dropdownRef.current.toggle(); // Open the dropdown menu
    }
  };


  function messageseeder(message) {
    const msg = parseMessageFromStructuralMessage(item.lastMessage);

    if (msg) {
      return msg;
    } else {
      return message;
    }
  }

  return (
    <li className={`chat-item ${item.unread ? "is-unread" : ""}`}>
      <a
        className="chat-link"
        href="#chat-link"
        onClick={(ev) => {

          ev.preventDefault();
          chatItemClick(item.id, item.fullname ? item.fullname : (item.user2fullname ? item.user2fullname : "-"), item.avatar);
        }}
      >
        {/*
            "id": 7,
            "name": "kirian",
            "avatar": false,
            "unreadCount": 1,
            "muted": false,
            "type": "PRIVATE",
            "lastMessage": "mooshhh",
            "lastMessageAt": "2023-08-24T13:31:15.516Z"
        */}
        {item.group === true ? (
          <div key={`chat-${item.id}`} className="chat-media user-avatar user-avatar-multiple">
            {item.user.slice(0, 2).map((user, idx) => {
              return (
                <UserAvatar
                  key={idx}
                  theme={user.theme}
                  text={findUpper(user.name)}
                  image={user.image}
                  className="chat-media"
                ></UserAvatar>
              );
            })}
            <span className={"status dot dot-lg dot-success"}></span>
          </div>
        ) : (
          <UserAvatar theme={item.theme} text={findUpper(`${item.fullname}`)} image={item.image} className="chat-media">
            <span className={`status dot dot-lg dot-${item.active === true ? "success" : "gray"}`}></span>
          </UserAvatar>
        )}
        <div className="chat-info">
          <div className="chat-from">
            <div
              className="name">{`${item.fullname ? item.fullname : (item.user2fullname ? item.user2fullname : "نا شناس")}`}</div>
            <span className="time">{
              !item.lastMessageAt ? "-" :
                toFarsiNumber(ConvertDateToCalendarString(item.lastMessageAt.split(".")[0]))
              // toFarsiNumber(ConvertGregorianToJalali(item.lastMessageAt.split('.')[0], itemConfig.showDateTime ? itemConfig.showDateTime : false))
            }</span>
          </div>
          <div className="chat-context">
            <div className="text">
              <p>{messageseeder(item.lastMessage)}</p>
            </div>
            <div className="status delivered">
              {item.unreadCount}
            </div>
          </div>
        </div>
      </a>
      {/*<div className="chat-actions">*/}
      {/*  <UncontrolledDropdown innerRef={dropdownRef}>*/}
      {/*    <DropdownToggle tag="a" onContextMenu={handleContextMenu}*/}
      {/*                    className="btn btn-icon btn-sm btn-trigger dropdown-toggle">*/}
      {/*      <Icon name="more-h"></Icon>*/}
      {/*    </DropdownToggle>*/}
      {/*    <DropdownMenu end>*/}
      {/*      <ul className="link-list-opt no-bdr">*/}
      {/*        <li onClick={() => checkBeforeDelete(item.id)}>*/}
      {/*          <DropdownItem*/}
      {/*            tag="a"*/}
      {/*            href="#delete"*/}
      {/*            disabled={true}*/}
      {/*            onClick={(ev) => {*/}
      {/*              ev.preventDefault();*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            حذف چت*/}
      {/*          </DropdownItem>*/}
      {/*        </li>*/}
      {/*        <li onClick={() => propAction(item.id, "unread")}>*/}
      {/*          <DropdownItem*/}
      {/*            tag="a"*/}
      {/*            href="#unread"*/}
      {/*            disabled={true}*/}
      {/*            className={item.unread ? "disabled" : ""}*/}
      {/*            onClick={(ev) => {*/}
      {/*              ev.preventDefault();*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            نشان گذاری به عنوان خوانده نشده*/}
      {/*          </DropdownItem>*/}
      {/*        </li>*/}
      {/*        <li onClick={() => propAction(item.id, "archive")}>*/}
      {/*          <DropdownItem*/}
      {/*            tag="a"*/}
      {/*            href="#archive"*/}
      {/*            disabled={true}*/}
      {/*            className={item.archive ? "disabled" : ""}*/}
      {/*            onClick={(ev) => {*/}
      {/*              ev.preventDefault();*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            ارسال چت به بایگانی*/}
      {/*          </DropdownItem>*/}
      {/*        </li>*/}
      {/*      </ul>*/}
      {/*    </DropdownMenu>*/}
      {/*  </UncontrolledDropdown>*/}
      {/*</div>*/}
    </li>
  );
};

export const ContactItem = ({ item, setTab, setSelectedId }) => {
  return (
    <ul className="contacts-list">
      <li>
        <h6 className="title overline-title-alt">{item.contacts.length > 0 && item.title}</h6>
      </li>
      {item.contacts.map((contact, idx) => {
        return (
          <li
            key={idx}
            onClick={() => {
              setTab("Chats");
              setSelectedId(contact.id);
            }}
          >
            <div className="user-card">
              <a href="#card" onClick={(ev) => ev.preventDefault()}>
                <UserAvatar text={findUpper(contact.name)} theme={contact.theme} image={contact.image}></UserAvatar>
                <div className="user-name">{contact.name}</div>
              </a>
              <div className="user-actions">
                <Link to={`${process.env.PUBLIC_URL}/app-chat`}>Start Chat</Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
