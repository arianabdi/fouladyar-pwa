import React, {useEffect, useRef, useState} from "react";
import {Button, Icon, UserAvatar} from "../../../../components/Component";
import {findUpper} from "../../../../utils/Utils";
// import { ChatContext } from "./ChatContext";
import classNames from "classnames";
import {toFarsiNumber} from "../../../../shared/toFarsiNumber";
import {ImAttachment} from "react-icons/im";
import {LuSendHorizonal} from "react-icons/lu";
import {ConvertGregorianToJalali} from "../../../../shared/convertGregorianToJalali";
import {MeChat, parseCustomFormat, parseMessageFromStructuralMessage} from "./MeChat";
import {EmptyState} from "../../../../components/fouladyar/empty-state/emptyState";
import {IoMdClose} from "react-icons/io";
import ModalHelper from "../../../../components/fouladyar/modal-helper/modalHelper";
import {YouChat} from "../../chat/components/YouChat";
import {useDispatch, useSelector} from "react-redux";
import {
    selectActiveChatMessages,
    selectScrollPosition
} from "../../../../redux/store/services/socket/store/socket-selector";
import {setScrollPosition} from "../../../../redux/store/services/socket/store/socket-actions";

const ChatBody = ({
      id,
      name,
      avatar,
      replyMsg,
      onSendMessage,
      onReplyMessage,
      onReplyMessageClose,
      onForwardMessage,
      chat
  }) => {
    // const { deleteConvo, propAction, chatState } = useContext(ChatContext);
    // const [chat, setChat] = chatState;

    const dispatch = useDispatch();
    const [Uchat, setUchat] = useState({});
    const [messageInput, setMessageInput] = useState("");
    const [chatOptions, setChatOptions] = useState(false);
    const [replymsg, setreplymsg] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);
    const activeChatMessages = useSelector(selectActiveChatMessages);

    const scrollPosition = useSelector(selectScrollPosition);
    const messageEndRef = useRef(null);

    useEffect(() => {
        // console.log('scrollPosition', scrollPosition);
        if (messageEndRef.current) {
            messageEndRef.current.scrollTop = scrollPosition;
        }
    }, [scrollPosition]);

    useEffect(() => {
        // scrollToBottom();
    }, [Uchat]);


    useEffect(() => {
        setreplymsg(parseCustomFormat(replyMsg)[0] || "");
    }, [replyMsg]);


    useEffect(() => {
        chat.forEach((item) => {
            if (item.id === id) {
                setUchat(item);
            }
        });
    }, [id, chat]);


    const onChatOptions = () => {
        setChatOptions(!chatOptions);
    };

    const onInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleScroll = (e) => {
        console.log('scroll', e, e.target.scrollTop)
        dispatch(setScrollPosition(e.target.scrollTop));
    };

    const onRemoveMessage = (idx, id) => {
        // let allChat = chat;
        // let cindex = allChat.find((item) => item.id === id);
        // let defaultChat = Uchat;
        // let newConvo = defaultChat.conversations;
        // let index = newConvo.findIndex((item) => item.id === id);
        // newConvo[index].chat[idx] = "deleted";
        //
        // allChat[cindex] = defaultChat;
        // setChat([...allChat]);
    };

    const chatBodyClass = classNames({
        "nk-chat-body": true,
    });


    function formatDateToYYYYMMDD(d) {
        const date = new Date(d);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}/${month}/${day}`;
    }

    function DateMessageChecker({current, previous}) {
        const currentMessageDate = formatDateToYYYYMMDD(current);
        const previousMessageDate = formatDateToYYYYMMDD(previous);


        if (new Date(currentMessageDate) > new Date(previousMessageDate)) {
            return (
                <div className="d-flex justify-content-center align-items-center date-seeder">
                    <div>{toFarsiNumber(ConvertGregorianToJalali(currentMessageDate, false))}</div>
                </div>);
        }
        // const dayOfMonth = date.getDate();
    }

    function MeChatMessageStylesheet(prevMsg, currMsg, nextMsg) {


        if (!prevMsg?.isMine && currMsg?.isMine && !nextMsg?.isMine)
            return "me-chat-msg-single";

        if (!prevMsg?.isMine && currMsg?.isMine && nextMsg?.isMine)
            return "me-chat-msg-first";

        if (prevMsg?.isMine && currMsg?.isMine && nextMsg?.isMine)
            return "me-chat-msg-middle";

        if (prevMsg?.isMine && currMsg?.isMine && !nextMsg?.isMine)
            return "me-chat-msg-last";


    }

    function YouChatMessageStylesheet(prevMsg, currMsg, nextMsg) {


        if (prevMsg?.isMine && !currMsg?.isMine && nextMsg?.isMine)
            return "you-chat-msg-single";

        if (prevMsg?.isMine && !currMsg?.isMine && !nextMsg?.isMine)
            return "you-chat-msg-first";

        if (!prevMsg?.isMine && !currMsg?.isMine && !nextMsg?.isMine)
            return "you-chat-msg-middle";

        if (!prevMsg?.isMine && !currMsg?.isMine && nextMsg?.isMine)
            return "you-chat-msg-last";


    }

    // Inside your component
    const textareaRef = useRef(null);
    useEffect(() => {
        // Focus on the textarea when the component mounts or when messageInput changes
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [messageInput]); // Add messageInput as a dependency

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };
        const handleScrollOutside = () => {
            setMenuVisible(false);
        };
        // Adding scroll event listener to the document
        document.addEventListener("scroll", handleScrollOutside, true);
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("scroll", handleScrollOutside, true);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [menuWidth, setMenuWidth] = useState(200);
    const [menuHeight, setMenuHeight] = useState(0);
    const [selectedMessage, setSelectedMessage] = useState();
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        if (menuRef.current) {
            const height = menuRef.current.getBoundingClientRect().height;
            setMenuHeight(height);
        }
    }, [menuWidth, menuPosition]);

    const handleContextMenu = (position, item) => {
        setMenuPosition(position);
        setMenuVisible(true);
        setSelectedMessage(item);
    };
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeChatMessages]);

    const menuRef = useRef(null);

    function forwardMessage(e) {
        const {chatId, name, message} = e;

        onForwardMessage(
            chatId,
            `
<^>
{"type":"forward","name":"${name}"}
<^>
${parseMessageFromStructuralMessage(message)}
`
        );

        setMenuVisible(false);
    }

    function copyMessage() {

    }

    function replyMessage() {
        onReplyMessage(
            `
<^>
{"type":"reply","name":"${selectedMessage.user.fullName}","message":"${parseMessageFromStructuralMessage(selectedMessage.text).replace(/\n/g, "")}"}
<^>`
        );

        setMenuVisible(false);
    }

    function openForwardMessageModal() {
        setModalComponent(<>empty</>
            // <ForwardMessageModal
            //     onSendMessageUsingForward={async (e) => {
            //         forwardMessage({
            //             chatId: e,
            //             name: selectedMessage.user.fullName,
            //             message: selectedMessage.text
            //         });
            //     }}
            //     onSendMessageUsingForwardCustomer={async (e) => {
            //
            //         forwardMessageCustomer({
            //             chatId: e,
            //             name: selectedMessage.user.fullName,
            //             message: selectedMessage.text
            //         });
            //     }}
            // />
        );
        setIsModalOpen(true);
    }

    function MessageActionMenu() {

        return (
            <>
                {menuVisible && (
                    <div ref={menuRef} className="context-menu message-action-menu"
                         style={{width: menuWidth, top: menuPosition.y, left: menuPosition.x}}>
                        <ul>
                            <li onClick={() => {
                                openForwardMessageModal();
                            }}>ارسال پیام
                            </li>
                            <li onClick={() => {
                                replyMessage();
                            }}>پاسخ به پیام
                            </li>
                            <li onClick={() => {
                                copyMessage();
                            }}>کپی
                            </li>
                        </ul>
                    </div>
                )}
            </>
        );
    }


    function replyClose() {
        onReplyMessageClose();
    }

    function ReplayMessageBox() {

        if (replymsg) {
            return (
                <div className="nk-chat-editor-2 d-flex flex-row justify-content-between">
                    <button className={`reply-close-btn`} onClick={async () => {
                        replyClose();
                    }}>
                        <IoMdClose size={20} color={"#1c1c1c"}/>
                    </button>
                    <div className="reply-context align-right ">
                        <div className="reply-title">{replymsg?.name || "-"}</div>
                        <div className="reply-content">{replymsg?.message || "-"}</div>
                    </div>
                </div>
            );
        }
    }


    return (
        <React.Fragment>
            <ModalHelper
                open={isModalOpen}
                onOpen={() => setIsModalOpen(true)}
                onClose={() => setIsModalOpen(false)}
                component={modalComponent}
            />
            <MessageActionMenu/>
            {(
                <div className={chatBodyClass}>
                    <div className="bordered-element chat-body-base">
                        <div className="nk-chat-head">
                            <ul className="nk-chat-head-info">
                                <li className="nk-chat-body-close">
                                    <a
                                        href="src/pages/fouladyar/chatMessages/components/ChatBody#hide-chat"
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                        }}
                                        className="btn btn-icon btn-trigger nk-chat-hide ms-n1"
                                    >
                                        <Icon name="arrow-left"></Icon>
                                    </a>
                                </li>
                                <li className="nk-chat-head-user">
                                    <div className="user-card">
                                        {Uchat.group ? (
                                            <div className="chat-media user-avatar user-avatar-multiple">
                                                {Uchat.user.map((user, index) => {
                                                    return (
                                                        <UserAvatar
                                                            theme={user.theme}
                                                            text={findUpper(user.name)}
                                                            image={user.image}
                                                            className="chat-media"
                                                            key={index}
                                                        ></UserAvatar>
                                                    );
                                                })}
                                                <span className={"status dot dot-lg dot-success"}></span>
                                            </div>
                                        ) : (

                                            <UserAvatar image={avatar} theme={Uchat.theme} text={findUpper(name)}>
                                                {Uchat.active === true ? (
                                                    <span className="status dot dot-lg dot-success"></span>
                                                ) : (
                                                    <span className="status dot dot-lg dot-gray"></span>
                                                )}
                                            </UserAvatar>
                                        )}
                                        <div className="user-info">
                                            <div className="lead-text">{name || "-"}</div>
                                            {/*<div className="sub-text">*/}
                                            {/*  <span className="d-none d-sm-inline me-1">Active </span>{" "}*/}
                                            {/*  /!*{Uchat.active === true ? "آنلاین" : `${Uchat.active} قبل `}*!/*/}
                                            {/*  /!*toFarsiNumber(ConvertDateToCalendarString(item.lastMessageAt.split('.')[0]))*!/*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className=" chat-message-rail">
                            <div className="nk-chat-panel chat-message-container"  onScroll={handleScroll} ref={messageEndRef}>

                                {
                                    chat?.length > 0 ?
                                        chat.map((item, index) => {
                                            let output = <div></div>;
                                            if (item.text) {
                                                if (item.isMine) {
                                                    output = <div>
                                                        <DateMessageChecker
                                                            current={item.createdAt}
                                                            previous={index > 0 ? chat[index - 1].createdAt : null}
                                                        />
                                                        <MeChat
                                                            onContextMenu={handleContextMenu}
                                                            menuWidth={menuWidth}
                                                            menuHeight={menuHeight}
                                                            isSelected={selectedMessage?.id === item.id && menuVisible}
                                                            key={`${item.id}-${index}`} item={item}
                                                            chat={Uchat}
                                                            className={MeChatMessageStylesheet(index === 0 ? null : chat[index - 1], chat[index], index === chat?.length ? "" : chat[index + 1])}
                                                        />
                                                    </div>;
                                                } else {
                                                    output = <div>
                                                        <DateMessageChecker
                                                            current={item.createdAt}
                                                            previous={index > 0 ? chat[index - 1].createdAt : null}
                                                        />
                                                        <YouChat
                                                            onContextMenu={handleContextMenu}
                                                            menuWidth={menuWidth}
                                                            menuHeight={menuHeight}
                                                            isSelected={selectedMessage?.id === item.id && menuVisible}
                                                            key={item.id}
                                                            item={item}
                                                            chat={Uchat}
                                                            className={YouChatMessageStylesheet(index === 0 ? null : chat[index - 1], chat[index], index === chat?.length ? "" : chat[index + 1])}
                                                        />


                                                    </div>;
                                                }
                                            }
                                            return output;
                                        }) :
                                        <EmptyState
                                            title={"پیامی یافت نشد"}
                                            content={"لطفا از طریق باکس پیام، پیام خود را برای این کاربر ارسال کنید."}
                                        />
                                }
                            </div>
                        </div>
                        <ReplayMessageBox/>
                        <div className="nk-chat-editor">
                            <div className="nk-chat-editor-upload  ms-n1">
                                <Button
                                    size="sm"
                                    className={`btn-icon btn-trigger text-primary attach-btn`}
                                    onClick={() => {
                                        onChatOptions();
                                    }}
                                >
                                    <ImAttachment size={20} color={"#000"}/>
                                </Button>

                            </div>
                            <div className="nk-chat-editor-form">
                                <div className="form-control-wrap">
                <textarea
                    ref={textareaRef} // Attach the ref to the textarea
                    className="form-control form-control-simple no-resize"
                    rows="1"
                    id="default-textarea"
                    onChange={(e) => onInputChange(e)}
                    value={messageInput}
                    placeholder="پیام خود را وارد کنید"

                    // onBlur={e => e.target.focus()}
                    onKeyDown={(e) => {

                        if (e.code === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            // Handle "Enter" key press logic here
                            onSendMessage(id, messageInput);
                        }

                    }}
                ></textarea>
                                </div>
                            </div>
                            <ul className="nk-chat-editor-tools g-2">
                                {/*<li>*/}
                                {/*  <Button size="sm" className="btn-icon btn-trigger text-primary">*/}
                                {/*    <Icon name="happyf-fill"></Icon>*/}
                                {/*  </Button>*/}
                                {/*</li>*/}
                                <li>
                                    <Button disabled={messageInput === "" || messageInput === null}
                                            onClick={(e) => {
                                                onSendMessage(id, messageInput);
                                            }}
                                            className="btn-round btn-icon"
                                    >
                                        <LuSendHorizonal size={25} color={"#000"}/>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default ChatBody;
