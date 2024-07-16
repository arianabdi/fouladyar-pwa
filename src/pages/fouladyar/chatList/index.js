import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {BottomNavBar} from "../../../layout/Index-layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {ErrorToaster} from "../../../shared/toaster";
import {toFarsiNumber} from "../../../shared/toFarsiNumber";
import {ConvertDateToCalendarString} from "../../../shared/convertDateToCalendarString";
import {UserAvatar} from "../../../components/Component";
import {MdClose} from "react-icons/md";
import {IoAddSharp} from "react-icons/io5";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";


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

function ChatItem({item}) {
    function MessageSeeder(message) {
        const msg = parseMessageFromStructuralMessage(item.lastMessage);

        if (msg) {
            return msg;
        } else {
            return message;
        }
    }

    return (
        <Link className="chat-item-container" to={`${process.env.PUBLIC_URL}/post?postId=${item._id}`}>
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
                <UserAvatar theme={item.theme}  image={item.image} className="chat-media">
                    <span className={`status dot dot-lg dot-${item.active === true ? "success" : "gray"}`}></span>
                </UserAvatar>
            )}
            <div className="chat-info">
                <div className="chat-from">
                    <div className="name">{`${item.fullname ? item.fullname : (item.user2fullname ? item.user2fullname : "نا شناس")}`}</div>
                    <span className="time">{
                        !item.lastMessageAt ? "-" :
                            toFarsiNumber(ConvertDateToCalendarString(item.lastMessageAt.split(".")[0]))
                        // toFarsiNumber(ConvertGregorianToJalali(item.lastMessageAt.split('.')[0], itemConfig.showDateTime ? itemConfig.showDateTime : false))
                    }</span>
                </div>
                <div className="chat-context">
                    <div className="text">
                        <p>{MessageSeeder(item.lastMessage)}</p>
                    </div>
                    {
                        item.unreadCount > 0 ?
                            <div className="status delivered">
                                {item.unreadCount}
                            </div> :
                            ''
                    }
                </div>
            </div>
        </Link>
    );
}

function DepartmentListModal({closeModal}){
    return(
        <div className="department-list-modal">
            <div className="department-list-title">لطفا یکی از گروه های زیر را جهت ارسال پیام بزنید. شما قادر خواهید بود به اعضای هر گروه پیغام دهید و اعضا در اسرع وقت به شمام پساخت خواهند داد</div>
            <div className='department-list'>
                <div className="department-item">واحد مدیریت</div>
                <div className="department-item">واحد واحد فروش</div>
                <div className="department-item">واحد تخلیه و بارگیری</div>
                <div className="department-item">واحد مطالبات</div>
                <div className="department-item">واحد مشتری</div>
                <div className="department-item">واحد CRM</div>
                <div className="department-item">تیم پشتیبانی</div>
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

    async function _getHomePosts() {

        console.log('token ', auth)
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/application/home`, {
                headers: {authorization: `bearer ${auth.token}`}
            });
            console.log('_getHomePosts', res.data)
            if (res.status === 200) {
                setNewsFeedItems(res.data.data.news);
                setEventFeedItems(res.data.data.events);
            }

            return res
        } catch (error) {
            ErrorToaster(error)
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
                                        <DepartmentListModal closeModal={() => {
                                            setIsModalOpen(false)
                                        }}/>
                                    )
                                    setIsModalOpen(true)
                                }}>
                                    <IoAddSharp size={22} color={"#fff"} />
                                </div>
                                <div className="container  m-0 p-0" style={{paddingBottom: "6rem"}}>
                                    {
                                        chatList.map(item => {
                                            return(
                                                <ChatItem
                                                    item={item}
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
