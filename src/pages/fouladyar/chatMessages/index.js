import React, {useEffect, useRef, useState} from "react";

import {Button, Icon, UserAvatar} from "../../../components/Component";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthToken} from "../../../redux/store/services/auth/store/auth-selectors";
import {selectUserProfile} from "../../../redux/store/services/profile/store/profile-selectors";

import {clearToken} from "../../../redux/store/services/auth/store";
import {clearProfile} from "../../../redux/store/services/profile/store/profile-actions";
import {useNavigate} from "react-router-dom";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {MeChat, parseCustomFormat, parseMessageFromStructuralMessage} from "./components/MeChat";
import {
    selectActiveChatGroupName,
    selectActiveChatId, selectActiveChatMessages
} from "../../../redux/store/services/socket/store/socket-selector";
import {findUpper} from "../../../utils/Utils";
import {YouChat} from "../chat/components/YouChat";
import {EmptyState} from "../../../components/fouladyar/empty-state/emptyState";
import {ImAttachment} from "react-icons/im";
import {LuSendHorizonal} from "react-icons/lu";
import classNames from "classnames";
import {toFarsiNumber} from "../../../shared/toFarsiNumber";
import {ConvertGregorianToJalali} from "../../../shared/convertGregorianToJalali";
import {IoMdClose} from "react-icons/io";
import avatar from "../../components/Avatar";


const ChatMessages = () => {
    // Redux Selector

    const [Uchat, setUchat] = useState({});
    const [messageInput, setMessageInput] = useState();
    const socket = useSelector((state) => state.socket.socket);

    const [replyMsg, setReplyMsg] = useState(``);
    const [replyFormattedMsg, setReplyFormattedMsg] = useState(``);

    const token = useSelector(selectAuthToken);
    const profile = useSelector(selectUserProfile)
    // const activeChatMessages = useSelector(selectActiveChatMessages);
    const activeChatGroupName = useSelector(selectActiveChatGroupName);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const messagesEndRef = useRef(null)
    const activeChatId = useSelector(selectActiveChatId);
    const lastMessage = useSelector((state) => state.socket.lastMessage);
    const prevMessages = useSelector(selectActiveChatMessages);
    const [activeChatMessages, setActiveChatMessages] = useState([])
    const lastMessageRef = useRef(null);
    const menuRef = useRef(null);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [chatOptions, setChatOptions] = useState(false);
    const [selectedId, setSelectedId] = useState(2232);
    const [selectedName, setSelectedName] = useState("");
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [menuWidth, setMenuWidth] = useState(200);
    const [menuHeight, setMenuHeight] = useState(0);
    const [selectedMessage, setSelectedMessage] = useState();
    const [menuVisible, setMenuVisible] = useState(false);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }


    const handleScroll = (e) => {
        // console.log('scroll', e, e.target.scrollTop)
        // dispatch(setScrollPosition(e.target.scrollTop));
    };
    useEffect(() => {
        console.log('lastMessage', lastMessage)
        if (lastMessage)
            setActiveChatMessages(prevState => {
                return ([
                    ...prevState,
                    lastMessage
                ])
            })
        scrollToBottom();
    }, [lastMessage]);


    useEffect(() => {
        console.log('replyMsg', replyMsg)
        console.log('replyMsg', parseCustomFormat(replyMsg)[0])
        // setReplyMsg(parseCustomFormat(replyMsg)[0] || "");
    }, [replyMsg]);

    useEffect(() => {
        console.log('prevMessage', prevMessages)
        if(prevMessages)
            setActiveChatMessages([...prevMessages])
    }, [prevMessages]);

    useEffect(() => {


        console.log("chatMessage useEffect!")
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



    useEffect(() => {
        console.log('activeChatId', activeChatId)
        if (activeChatId) {
            if (socket) {
                socket.emit('paginateMessages', {
                    conversationId: parseInt(activeChatId.toString()),
                    pageOptionsDto: {
                        page: 1,
                        take: 20,
                    },
                });
            }
        }
    }, [activeChatId])


    const onSendMessage = async (message) => {

        console.log('onSendMessage', activeChatId, message);

        if (replyFormattedMsg.length > 0) {
            const messageWithReply = `
<^>
{"type":"reply","name":"${replyMsg.name}","message":"${replyMsg.message}"}
<^>
${message}
<^>
`;

            socket.emit("addMessage", {
                "conversationId": parseInt(activeChatId),
                "text": messageWithReply
            });
            setReplyMsg([])
            setReplyFormattedMsg('');
            setMessageInput('')
            setMenuVisible(false);
        } else {
            if (message !== "" || message !== null) {
                if (socket) {
                    console.log('socket connected!', socket)
                    socket.emit("addMessage", {
                        "conversationId": parseInt(activeChatId),
                        "text": message
                    });
                    setMessageInput('')
                    setReplyFormattedMsg('');
                    setMenuVisible(false);
                }
            }
        }
    };

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

    function openProfile() {
        setModalComponent(<div>test profile</div>)
        setIsModalOpen(true)
    }

    const handleSignout = () => {
        localStorage.removeItem("accessToken");
        dispatch(clearToken())
        dispatch(clearProfile())
        navigate(`login`);
    };


    function NoChat() {
        return (
            <div className="nk-chat-body">
                <div className="nk-chat-blank">
                    <div className="nk-chat-blank-icon">
                        <Icon name="chat" className="icon-circle icon-circle-xxl bg-white"></Icon>
                    </div>

                    <h3 className="no-chat-found-title">چت انتخاب شده وجود ندارد</h3>
                    <h5 className="no-chat-found-content">لطفا از منوی سمت راست یکی از چت ها را انتخاب کنید. در این صفحه
                        تنها مشتریان قادر به ایجاد چت خواهند بود.</h5>
                </div>
            </div>
        );
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
        const msgStr =             `
<^>
{"type":"reply","name":"${selectedMessage.user.fullName}","message":"${parseMessageFromStructuralMessage(selectedMessage.text).replace(/\n/g, "")}"}
<^>`;
        setReplyMsg(parseCustomFormat(msgStr)[0])
        setReplyFormattedMsg(msgStr);
        setMenuVisible(false);
    }

    // Inside your component
    const textareaRef = useRef(null);
    useEffect(() => {
        // Focus on the textarea when the component mounts or when messageInput changes
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [messageInput]); // Add messageInput as a dependency

    const onChatOptions = () => {
        setChatOptions(!chatOptions);
    };

    const onInputChange = (e) => {
        setMessageInput(e.target.value);
    };

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




    function replyClose() {
        setReplyFormattedMsg(``)
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

    function ReplayMessageBox() {

        if (replyFormattedMsg) {
            return (
                <div className="nk-chat-editor-2 d-flex flex-row justify-content-between">
                    <button className={`reply-close-btn`} onClick={async () => {
                        replyClose();
                    }}>
                        <IoMdClose size={20} color={"#1c1c1c"}/>
                    </button>
                    <div className="reply-context align-right ">
                        <div className="reply-title">{replyMsg?.name || "-"}</div>
                        <div className="reply-content">{replyMsg?.message || "-"}</div>
                    </div>
                </div>
            );
        }
    }



    // function forwardMessage(chatId, message) {
    //     if (message !== "" || message !== null) {
    //         socket.emit("suppAddMessage", {
    //             "conversationId": parseInt(chatId),
    //             "text": message
    //         });
    //     }
    // }
    const chatBodyClass = classNames({
        "nk-chat-body": true,
    });






    return (
        <React.Fragment>

            <MessageActionMenu />
            <FixedHeader title={activeChatGroupName || 'چت'} useBack={true} onTitleClick={() =>{
                // navigate('/chat-detail/sssss')
            }}/>

            {
                selectedId !== null ? (
                    <>
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
                                    <div className="nk-chat-panel chat-message-container" onScroll={handleScroll}>

                                        {
                                            activeChatMessages?.length > 0 ?
                                                activeChatMessages.map((item, index) => {
                                                    let output = <div></div>;
                                                    if (item.text) {
                                                        if (item.isMine) {
                                                            output = <div key={`${item.id}-key`}>
                                                                <DateMessageChecker
                                                                    current={item.createdAt}
                                                                    previous={index > 0 ? activeChatMessages[index - 1].createdAt : null}
                                                                />
                                                                <MeChat
                                                                    onContextMenu={handleContextMenu}
                                                                    menuWidth={menuWidth}
                                                                    menuHeight={menuHeight}
                                                                    isSelected={selectedMessage?.id === item.id && menuVisible}
                                                                    key={`${item.id}-${index}`} item={item}
                                                                    chat={Uchat}
                                                                    className={MeChatMessageStylesheet(index === 0 ? null : activeChatMessages[index - 1], activeChatMessages[index], index === activeChatMessages?.length ? "" : activeChatMessages[index + 1])}
                                                                />
                                                            </div>;
                                                        } else {
                                                            output = <div key={`${item.id}-key`}>
                                                                <DateMessageChecker
                                                                    current={item.createdAt}
                                                                    previous={index > 0 ? activeChatMessages[index - 1].createdAt : null}
                                                                />
                                                                <YouChat
                                                                    onContextMenu={handleContextMenu}
                                                                    menuWidth={menuWidth}
                                                                    menuHeight={menuHeight}
                                                                    isSelected={selectedMessage?.id === item.id && menuVisible}
                                                                    key={item.id}
                                                                    item={item}
                                                                    chat={Uchat}
                                                                    className={YouChatMessageStylesheet(index === 0 ? null : activeChatMessages[index - 1], activeChatMessages[index], index === activeChatMessages?.length ? "" : activeChatMessages[index + 1])}
                                                                />


                                                            </div>;
                                                        }
                                                    }
                                                    return output;
                                                })
                                                :

                                                <EmptyState
                                                    title={"پیامی یافت نشد"}
                                                    content={"لطفا از طریق باکس پیام، پیام خود را برای این کاربر ارسال کنید."}
                                                />
                                        }
                                        {/* This div will be used to scroll into view */}
                                        <div ref={messagesEndRef}/>
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
                                        onKeyDown={async (e) => {
                                            if (e.code === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                // Handle "Enter" key press logic here
                                                await onSendMessage(messageInput);
                                            }

                                        }}
                                    ></textarea>
                                        </div>
                                    </div>
                                    <ul className="nk-chat-editor-tools g-2">
                                        {/*<li>*/}
                                        <li>
                                            <Button disabled={messageInput === "" || messageInput === null}
                                                    onClick={async (e) => {
                                                        if (messageInput)
                                                            await onSendMessage(messageInput);
                                                        // setActiveChatMessages(prevstate => {
                                                        //     return([
                                                        //         ...prevstate,
                                                        //
                                                        //         {
                                                        //             id: prevstate.length+2,
                                                        //             text: '===== 1 =======',
                                                        //             group: '',
                                                        //             isMine: true,
                                                        //             createdAt: '',
                                                        //             user: {
                                                        //                 theme: '',
                                                        //                 name: 'آرین عبدی',
                                                        //                 image: '',
                                                        //                 userfirstname: '233333xcsdf'
                                                        //             }
                                                        //         },
                                                        //     ])
                                                        // })
                                                        scrollToBottom();

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
                    </>
                ) : <NoChat/>
            }
        </React.Fragment>
    );
};

export default ChatMessages;
