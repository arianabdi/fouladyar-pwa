import React, {useEffect, useState} from "react";
import ChatBody from "./ChatBody";
import {Button, Icon} from "../../../components/Component";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {chatData} from "./ChatData";
// import { socket } from "../../../socket";
import ChatSideBar from "./ChatSideBar";
import {useDispatch, useSelector} from "react-redux";
import {io} from "socket.io-client";
// import { socket } from "../../../socket";
import {selectAuthToken} from "../../../redux/store/services/auth/store/auth-selectors";
import {selectUserProfile} from "../../../redux/store/services/profile/store/profile-selectors";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import {parseCustomFormat} from "./components/MeChat";
import headerLogo from "../../../assets/images/fouladyar/headerLogo.png";
import {FiUser} from "react-icons/fi";
import {clearToken} from "../../../redux/store/services/auth/store";
import {clearProfile} from "../../../redux/store/services/profile/store/profile-actions";
import {useNavigate} from "react-router-dom";
import {FixedHeader} from "../../../layout/header/Fixed-Header";


const Chat = () => {

    const token = useSelector(selectAuthToken);
    const profile = useSelector(selectUserProfile)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const socket = io(process.env.REACT_APP_WEBSOCKET_URL, {
    //   autoConnect: false,
    //   // transports: ['websocket'],
    //   extraHeaders: {
    //     authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJzIiwiaWF0IjoxNjk2ODM3MjE4LCJleHAiOjE2OTY4NDA4MTh9.MjYTdQaaOqNq_Gu66P71FsWOaau95Uy2Vsw68QTWSTY'
    //   },
    // });

    const [mainTab, setMainTab] = useState("Chats");
    const [filteredChatList, setFilteredChatList] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [favState, setFavState] = useState(false);
    const [favFilter, setFavFilter] = useState([]);
    const [favFilterText, setFavFilterText] = useState("");
    const [mobileView, setMobileView] = useState(false);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [isOperatorChat, setIsOperatorChat] = useState(false);
    const [selectedId, setSelectedId] = useState(2232);
    const [selectedName, setSelectedName] = useState("");
    const [filterTab, setFilterTab] = useState("messages"); //["messages", "archive", "unread"]
    const [customerConversations, setCustomerConversations] = useState([]);
    const [supportConversations, setSupportConversations] = useState([]);
    const [chatMessages, setChatMessages] = useState([
        {
            id: '1',
            text: '===== 1 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین عبدی',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '2',
            text: '===== 2 =======',
            group: '',
            isMine: false,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '3',
            text: '===== 3 =======',
            group: '',
            isMine: false,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '4',
            text: '===== 4 =======',
            group: '',
            isMine: false,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            "id": 18,
            "text": "salam zibaye man",
            "createdAt": "2023-04-24T17:35:15.367Z",
            "user": {
                "id": 3,
                "fullName": "کاظم فاضلی",
                "userNumber": "support"
            },
            "isMine": true
        },
        {
            "id": 18,
            "text": "salam zibaye man",
            "createdAt": "2023-06-24T17:35:15.367Z",
            "user": {
                "id": 3,
                "fullName": "کاظم فاضلی",
                "userNumber": "support"
            },
            "isMine": true
        },
        {
            "id": 18,
            "text": "salam zibaye man",
            "createdAt": "2023-08-24T17:35:15.367Z",
            "user": {
                "id": 3,
                "fullName": "کاظم فاضلی",
                "userNumber": "support"
            },
            "isMine": false
        },
        {
            id: '5',
            text: '===== 5 =======',
            group: '',
            isMine: false,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '6',
            text: '===== 6 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '7',
            text: '===== 7 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '8',
            text: '===== 8 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '9',
            text: '===== 9 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '10',
            text: '===== 10 =======',
            group: '',
            isMine: false,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '11',
            text: '===== 11 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '12',
            text: '===== 12 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '13',
            text: '===== 13 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '14',
            text: '===== 14 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '15',
            text: '===== 15 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '16',
            text: '===== 16 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '17',
            text: '===== 17 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        },
        {
            id: '18',
            text: '===== 18 =======',
            group: '',
            isMine: true,
            createdAt: '',
            user: {
                theme: '',
                name: 'آرین sdfsdfsd',
                image: '',
                userfirstname: '233333xcsdf'
            }
        }
    ]);
    const [replyMessage, setReplyMessage] = useState(``);
    const [sidebar, setsidebar] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [socket, setSocket] = useState(null);


    useEffect(() => {
        // Check if the token is available

        if (token) {
            // Use the token to set up the socket connection
            const _socket = io(process.env.REACT_APP_WEBSOCKET_URL, {
                autoConnect: false,
                secure: true,
                // transports: ['websocket'],
                extraHeaders: {
                    authorization: token
                },
            });


            _socket.connect()

            function onConnect() {
                // console.log("onConnect");
                setIsConnected(true);
            }

            function onConversationsLoad(e) {
                console.log('onConversations', e);
                setCustomerConversations(e.items);
            }

            function onSupportConversationsLoad(e) {
                console.log('onSuppConversations', e);
                setSupportConversations(e.items);
            }


            function onConversationMessages(e) {
                console.log('conversationMessages', e);
                setIsOperatorChat(false)
                // setChatMessages(e.items);
                setMobileView(true);
                // setConversations(e.items);
            }

            function onSuppConversationMessages(e) {
                console.log('onSuppConversationMessages', e);
                setIsOperatorChat(true)
                // setChatMessages(e.items);
                setMobileView(true);
                // setConversations(e.items);
            }


            function onAddMessage(message, chmsg) {

                console.log("onAddMessage", chmsg);

                delete message.conversationId;
                // setChatMessages([...chmsg, { ...message, isMine: message.userId === myUserId }]);
                console.log("chatMessages", chatMessages);
                // setChatMessages(msgs => [
                //     ...msgs,
                //     {...message, isMine: message.user.id === profile.userId}
                // ])
            }


            function onUpdateConversations(newConversation) {
                console.log("onUpdateConversations", newConversation);
                console.log("conversation", customerConversations);
                let targetConversation = customerConversations.find(item => item.id === newConversation.id);

                setCustomerConversations(prevState => ([
                        newConversation,
                        ...prevState.filter(item => item.id !== newConversation.id)

                    ])
                )
            }


            function onSuppUpdateConversations(newConversation) {
                console.log("suppUpdateConversation", newConversation);
                // let targetConversation = supportConversations.find(item => item.id === newConversation.id);
                //
                setSupportConversations(prevState => {
                    const targetItem = prevState.find(item => item.id === newConversation.conversationId);
                    return (
                        [
                            {
                                "id": newConversation.conversationId,
                                "avatar": newConversation.avatar,
                                "muted": newConversation.muted,
                                "lastMessage": newConversation.lastMessage,
                                "lastMessageAt": newConversation.lastMessageAt || '-',
                                "user2fullname": newConversation.fullname2,
                                "user2username": newConversation.username2,
                                "user2id": targetItem.user2id,
                                "user1id": targetItem.user2id,
                                "user1fullname": newConversation.fullname,
                                "user1username": newConversation.username,
                                "unreadmessages": newConversation.unreadmessages
                            },
                            ...prevState.filter(item => item.id !== newConversation.conversationId)

                        ])
                })


            }

            _socket.once("connect", onConnect);
            _socket.on("conversations", onConversationsLoad);
            _socket.on("addMessage", (e) => {
                onAddMessage(e, chatMessages)
            });
            _socket.on("conversationMessages", onConversationMessages);
            _socket.on("updateConversation", onUpdateConversations);


            //Support
            _socket.on("suppConversations", onSupportConversationsLoad);
            _socket.on("suppAddMessage", (e) => {
                onAddMessage(e, chatMessages)
            });
            _socket.on("suppConversationMessages", onSuppConversationMessages);
            _socket.on("suppUpdateConversation", onSuppUpdateConversations);
            setSocket(_socket);
            // initializeSocket(socket);
        }

    }, [token]);


    useEffect(() => {
        // search user
        if (filterText !== "") {
            const filteredObject = chatData.filter((item) => {
                return item.name.toLowerCase().includes(filterText.toLowerCase());
            });
            setFilteredChatList([...filteredObject]);
        } else {
            setFilteredChatList([...chatData]);
        }
    }, [filterText, setFilteredChatList]);


    useEffect(() => {
        if (socket)
            loadSupportChatList();
    }, [socket]);


    useEffect(() => {

        // console.log('chat', chat)
        window.addEventListener("resize", resizeFunc);
        resizeFunc();
        return () => {
            window.removeEventListener("resize", resizeFunc);
        };


    }, []);


    const onInputChange = (e) => {
        setFilterText(e.target.value);
    };

    const favInputSearchChange = (e) => {
        setFavFilterText(e.target.value);
    };

    const onFilterClick = (prop) => {
        setFilterTab(prop);
    };

    const chatItemClick = (id, name, avatar) => {
        console.log('chatItemClick', id, name)

        socket.emit("paginateMessages", {
            "conversationId": parseInt(id),
            "pageOptionsDto": {
                "page": 1,
                "take": 50
            }
        });
        setSelectedId(id);
        setSelectedName(name);
    };

    const suppChatItemClick = (id, name, avatar) => {
        console.log('suppChatItemClick', id, name)

        setChatMessages(msgs => [])
        socket.emit("suppPaginateMessages", {
            "suppConversationId": parseInt(id),
            "pageOptionsDto": {
                "page": 1,
                "take": 50
            }
        });
        setSelectedId(id);
        setSelectedName(name);
    };

    const onSendMessage = async (id, message) => {
        if (isOperatorChat) {
            if (message !== "" || message !== null)
                if (replyMessage.length > 0) {
                    const replyMsgContent = parseCustomFormat(replyMessage)[0];
                    const messageWithReply = `
<^>
{"type":"reply","name":"${replyMsgContent.name}","message":"${replyMsgContent.message}"}
<^>
${message}
<^>
`;

                    socket.emit("suppAddMessage", {
                        "conversationId": parseInt(id),
                        "text": messageWithReply
                    });
                    setReplyMessage([])
                } else {
                    socket.emit("suppAddMessage", {
                        "conversationId": parseInt(id),
                        "text": message
                    });
                }
        } else {
            if (replyMessage.length > 0) {
                const replyMsgContent = parseCustomFormat(replyMessage)[0];
                const messageWithReply = `
<^>
{"type":"reply","name":"${replyMsgContent.name}","message":"${replyMsgContent.message}"}
<^>
${message}
<^>
`;

                socket.emit("addMessage", {
                    "conversationId": parseInt(id),
                    "text": messageWithReply
                });
                setReplyMessage([])
            } else {
                if (message !== "" || message !== null) {
                    socket.emit("addMessage", {
                        "conversationId": parseInt(id),
                        "text": message
                    });
                }
            }


        }
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

    function ProfileAndMarkedUsers() {
        return (
            <div className="nk-chat-aside-head">
                <div className="nk-chat-aside-user group-profile">
                    {/*<div onClick={() => {*/}
                    {/*  openProfile()*/}
                    {/*}}>*/}
                    {/*  <UserAvatar className="avatar-border" image={User}></UserAvatar>*/}
                    {/*</div>*/}

                    <img src={headerLogo} alt="" className="logo-sidebar"/>
                    <div className="title">{profile.group.name}</div>
                </div>

                <ul className="nk-chat-aside-tools g-2">
                    {mainTab === "Chats" || mainTab === "Channel" ? (
                        <React.Fragment>
                            <li>
                                <UncontrolledDropdown>
                                    <DropdownToggle tag="a"
                                                    className=" profile-icon btn btn-round btn-icon btn-light dropdown-toggle">
                                        <FiUser color="#000" size={18}/>
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        <ul className="link-list-opt no-bdr">
                                            <li>
                                                <DropdownItem
                                                    disabled={true}
                                                    tag="a"
                                                    href="#dropdown"
                                                >
                                                    <span>{profile.fullname}</span>
                                                </DropdownItem>
                                            </li>
                                            <li className="divider"></li>
                                            <li onClick={handleSignout}>
                                                <DropdownItem
                                                    tag="a"
                                                    href="#dropdown"
                                                >
                                                    <span>خروج از حساب</span>
                                                </DropdownItem>
                                            </li>
                                            {/*<li*/}
                                            {/*  onClick={() => onFilterClick("group")}*/}
                                            {/*  className={filterTab === "group" ? "active" : ""}*/}
                                            {/*>*/}
                                            {/*  <DropdownItem*/}
                                            {/*    tag="a"*/}
                                            {/*    href="#dropdown"*/}
                                            {/*    disabled={true}*/}
                                            {/*    onClick={(ev) => {*/}
                                            {/*      ev.preventDefault();*/}
                                            {/*    }}*/}
                                            {/*  >*/}
                                            {/*    <span>چت های گروهی</span>*/}
                                            {/*  </DropdownItem>*/}
                                            {/*</li>*/}
                                        </ul>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </li>
                            {/*<li>*/}
                            {/*  <Button color="light" className="btn-round btn-icon">*/}
                            {/*    <Icon name="edit-alt-fill"></Icon>*/}
                            {/*  </Button>*/}
                            {/*</li>*/}
                        </React.Fragment>
                    ) : (
                        <li>
                            <Button color="light" className="btn-round btn-icon">
                                <Icon name="user-add-fill"></Icon>
                            </Button>
                        </li>
                    )}
                </ul>

            </div>
        );
    }

    const FloatingButton = ({onClick}) => {
        return (
            <button className="floating-button" onClick={onClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-plus"
                >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </button>
        );
    }


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

    const resizeFunc = () => {
        if (window.innerWidth > 1362) {
            setsidebar(true);
        } else {
            setsidebar(false);
        }
    };

    const toggleMenu = () => {
        setsidebar(!sidebar);
    };


    function loadSupportChatList() {
        socket.emit("suppPaginateConversations", {
            "pageOptionsDto": {
                "page": 1,
                "take": 100
            }
        });
    }


    function forwardMessage(chatId, message) {
        if (message !== "" || message !== null) {
            socket.emit("suppAddMessage", {
                "conversationId": parseInt(chatId),
                "text": message
            });
        }
    }

    function forwardMessageCustomer(chatId, message) {
        if (message !== "" || message !== null) {
            socket.emit("addMessage", {
                "conversationId": parseInt(chatId),
                "text": message
            });
        }
    }

    function ChatView() {
        if (selectedId !== null) {
            return (
                <>
                    <ChatBody
                        chat={chatMessages}
                        name={selectedName}
                        id={selectedId}
                        sidebar={sidebar}
                        onSendMessage={async (id, message) => {
                            await onSendMessage(id, message);
                        }}
                        onReplyMessage={async (e) => {
                            console.log('))))))))<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', e)
                            await setReplyMessage(e);
                        }}
                        onReplyMessageClose={async (e) => {
                            await setReplyMessage([]);
                        }}
                        onForwardMessage={(chatId, message) => {
                            forwardMessage(chatId, message);
                        }}
                        onForwardMessageCustomer={(chatId, message) => {
                            forwardMessageCustomer(chatId, message);
                        }}
                        replyMsg={replyMessage}
                        onToggleMenu={() => {
                            toggleMenu()
                        }}
                        setSelectedId={setSelectedId}
                        setMobileView={setMobileView}
                        mobileView={mobileView}
                    />
                </>
            );
        }

        return (
            <NoChat/>
        );

    }

    return (
        <React.Fragment>
            <FixedHeader title={"چت"} />
            <ChatView/>
        </React.Fragment>
    );
};

export default Chat;
