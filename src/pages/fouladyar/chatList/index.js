import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {BottomNavBar} from "../../../layout/Index-layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {ErrorToaster, SuccessToaster} from "../../../shared/toaster";
import {toFarsiNumber} from "../../../shared/toFarsiNumber";
import {ConvertDateToCalendarString} from "../../../shared/convertDateToCalendarString";
import {UserAvatar} from "../../../components/Component";
import {IoAddSharp} from "react-icons/io5";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import {
    selectActiveChatId,
    selectActiveChatMessages,
    selectChats
} from "../../../redux/store/services/socket/store/socket-selector";
import {resetUnreadMessage, switchChat} from "../../../redux/store/services/socket/store/socket-actions";
import checkAuthToken from "../../../shared/checkAuthToken";
import {clearToken} from "../../../redux/store/services/auth/store";


export function parseMessageFromStructuralMessage(customString) {
    // Regular expression to match the custom format
    if (customString) {
        const elements = customString.split('<^>');
        if (elements.length > 1)
            return elements[2];

        return customString
    }
    return '';
}

function ChatItem({item, onClick}) {

    useEffect(() => {
        // console.log('unreadMessage', item, parseInt(item.unreadmessages))
    }, [])

    function MessageSeeder(message) {
        const msg = parseMessageFromStructuralMessage(item.lastMessage);

        if (msg) {
            return msg;
        } else {
            return message;
        }
    }

    return (
        <div className="chat-item-container" onClick={() => {
            onClick()
        }}>
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
                <UserAvatar theme={item.theme} image={item.image} className="chat-media">
                    <span className={`status dot dot-lg dot-${item.active === true ? "success" : "gray"}`}></span>
                </UserAvatar>
            )}
            <div className="chat-info">
                <div className="chat-from">
                    <div
                        className={`name ${parseInt(item.unreadmessages) > 0 ? 'unreadmessage' : ''}`}>{`${item.groupname ? item.groupname : "نا شناس"}`}</div>
                    <span className="time">{
                        !item.lastMessageAt ? "-" :
                            toFarsiNumber(ConvertDateToCalendarString(item.lastMessageAt.split(".")[0]))
                        // toFarsiNumber(ConvertGregorianToJalali(item.lastMessageAt.split('.')[0], itemConfig.showDateTime ? itemConfig.showDateTime : false))
                    }</span>
                </div>
                <div className="chat-context">
                    <div className={`text ${parseInt(item.unreadmessages) > 0 ? 'unreadmessage' : ''}`}>
                        <p>{MessageSeeder(item.lastMessage)}</p>
                    </div>
                    {
                        parseInt(item.unreadmessages) > 0 ?
                            <div className="status delivered unreadcount">
                                {toFarsiNumber(parseInt(item.unreadmessages))}
                            </div> :
                            ''
                    }
                </div>
            </div>
        </div>
    );
}

function DepartmentListModal({closeModal, onDepartmentClicked}) {


    const {t, i18n} = useTranslation();
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        async function loadDepartmentList() {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/group`);

                if (res.status === 200) {
                    setDepartments(res.data);
                }
            } catch (e) {
                ErrorToaster.error(e, t);
            }
        }

        loadDepartmentList();
    }, []);


    return (
        <div className="department-list-modal">
            <div className="department-list-title">لطفا یکی از گروه های زیر را جهت ارسال پیام بزنید. شما قادر خواهید بود
                به اعضای هر گروه پیغام دهید و اعضا در اسرع وقت به شمام پساخت خواهند داد
            </div>
            <div className='department-list'>

                {departments.map((item) => {
                    return (
                        <div key={item.id} className="department-item" onClick={async () => {
                            await onDepartmentClicked(item.id)
                        }}>{item.name}</div>
                    )
                })}
            </div>

            <button className="fouladyar-blue-button w-100 mt-4" onClick={() => {
                closeModal()
            }}>
                بستن پنجره
            </button>
        </div>
    )
}

const ChatList = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);

    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [sliderFeedItems, setSliderFeedItems] = useState([]);
    const [newsFeedItems, setNewsFeedItems] = useState([]);
    const [eventFeedItems, setEventFeedItems] = useState([]);


    const dispatch = useDispatch();

    // Redux Selector
    const socket = useSelector((state) => state.socket.socket);
    const chats = useSelector(selectChats);
    const activeChatId = useSelector(selectActiveChatId);
    const activeChatMessages = useSelector(selectActiveChatMessages);

    useEffect(() => {
        async function checkToken(){
            const res = await checkAuthToken(auth.token);

            if(!res){
                dispatch(clearToken())
                navigate('/login')
            }
        }
        checkToken()
    }, [])

    useEffect(() => {
        console.log('chats', chats)
    }, [chats])


    useEffect(() => {
        console.log('activeChatMessages', activeChatMessages)
    }, [activeChatMessages])


    useEffect(() => {
        console.log('socketsocket', socket)
    }, [socket])


    // useEffect(()=>{
    //     console.log('activeChatId', activeChatId)
    //     if(activeChatId){
    //         if(socket){
    //             socket.emit('paginateMessages', {
    //                 conversationId: parseInt(activeChatId.toString()),
    //                 pageOptionsDto: {
    //                     page: 1,
    //                     take: 20,
    //                 },
    //             });
    //
    //         }
    //     }
    // },[activeChatId])


    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [chatList, setChatList] = useState([
        {
            lastMessage: 'عرض سلام و ادب',
            lastMessageAt: '2023-11-26T10:29:07',
            unreadCount: 0,
            id: '',
            fullname: 'شکایت مشتری',
            user2fullname: '',
            avatar: ''
        },
        {
            lastMessage: 'خوبی؟',
            lastMessageAt: '2023-11-26T10:29:07',
            unreadCount: 1,
            id: '',
            fullname: 'واحد مدیریت',
            user2fullname: '',
            avatar: ''
        }
    ])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);


    function onChatSelect({chatId}) {
        console.log('selectedChatId', chatId)
        if (socket) {
            dispatch(switchChat(chatId.toString()))
            dispatch(resetUnreadMessage(chatId));
            navigate('/chat-messages')
        } else {
            ErrorToaster({message: 'Your session has expired. Please log in again'})
            navigate('/login')
        }
    }

    async function onDepartmentClicked(groupId) {
        SuccessToaster({message: groupId}, t)
        await createNewChat(groupId);
        setIsModalOpen(false)
    }

    async function createNewChat(groupId) {
        try {
            console.log('createNewChat', groupId, profile.id)
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/conversation`,
                {
                    groupId: groupId,
                    userId: profile.id,
                },
                {headers: {authorization: `bearer ${auth.token}`}},
            );

            if (res.status === 200 || res.status === 201) {

                console.log('createNewChat', res.data)
                dispatch(switchChat(res.data.id.toString()))
                navigate('/chat-messages')
            }
        } catch (e) {
            ErrorToaster(e)
        }
    }


    return (

        <React.Fragment>
            <ModalHelper
                size={"sm"}
                open={isModalOpen}
                onOpen={() => setIsModalOpen(true)}
                onClose={() => setIsModalOpen(false)}
                component={modalComponent}
            />
            <FixedHeader title={"پشتیبانی"}/>
            <div className="nk-content news-page">
                <div className="container-fluid-doctor">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block">
                                <div className="floating-button" onClick={() => {
                                    setModalComponent(
                                        <DepartmentListModal
                                            onDepartmentClicked={async (groupId) => {
                                                await onDepartmentClicked(groupId)

                                                // onChatSelect({ chatId: key })
                                            }}
                                            closeModal={() => {
                                                setIsModalOpen(false)
                                            }}
                                        />
                                    )
                                    setIsModalOpen(true)
                                }}>
                                    <IoAddSharp size={22} color={"#fff"}/>
                                </div>
                                <div className="container  m-0 p-0" style={{paddingBottom: "6rem"}}>
                                    {
                                        Object.entries(chats)
                                            .sort(([, a], [, b]) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))
                                            .map(([key, value]) => {
                                                return (
                                                    <ChatItem
                                                        key={key} // Add a unique key prop
                                                        item={value}
                                                        onClick={() => {
                                                            onChatSelect({chatId: key})
                                                        }}
                                                    />
                                                )
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavBar/>
        </React.Fragment>

    );
};

export default ChatList;
