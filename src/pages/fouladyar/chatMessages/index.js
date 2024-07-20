import React, {useEffect, useState} from "react";

import {Icon} from "../../../components/Component";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthToken} from "../../../redux/store/services/auth/store/auth-selectors";
import {selectUserProfile} from "../../../redux/store/services/profile/store/profile-selectors";

import {clearToken} from "../../../redux/store/services/auth/store";
import {clearProfile} from "../../../redux/store/services/profile/store/profile-actions";
import {useNavigate} from "react-router-dom";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {parseCustomFormat} from "./components/MeChat";
import {
    selectActiveChatGroupName,
    selectActiveChatId,
    selectActiveChatMessages
} from "../../../redux/store/services/socket/store/socket-selector";
import ChatBody from "./components/ChatBody";


const ChatMessages = () => {
    // Redux Selector
    const socket = useSelector((state) => state.socket.socket);
    const token = useSelector(selectAuthToken);
    const profile = useSelector(selectUserProfile)
    const activeChatId = useSelector(selectActiveChatId);
    const activeChatMessages = useSelector(selectActiveChatMessages);
    const activeChatGroupName = useSelector(selectActiveChatGroupName);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [modalComponent, setModalComponent] = useState(<div>empty</div>);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [selectedId, setSelectedId] = useState(2232);
    const [selectedName, setSelectedName] = useState("");
    const [replyMessage, setReplyMessage] = useState(``);



    useEffect(()=>{
        console.log('activeChatId', activeChatId)
        if(activeChatId){
            if(socket){
                socket.emit('paginateMessages', {
                    conversationId: parseInt(activeChatId.toString()),
                    pageOptionsDto: {
                        page: 1,
                        take: 20,
                    },
                });
            }
        }
    },[activeChatId])


    const onSendMessage = async (id, message) => {
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


    function forwardMessage(chatId, message) {
        if (message !== "" || message !== null) {
            socket.emit("suppAddMessage", {
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
                        chat={activeChatMessages}
                        name={selectedName}
                        id={selectedId}
                        onSendMessage={async (id, message) => {
                            await onSendMessage(id, message);
                        }}
                        onReplyMessage={async (e) => {
                            await setReplyMessage(e);
                        }}
                        onReplyMessageClose={async (e) => {
                            await setReplyMessage([]);
                        }}
                        onForwardMessage={(chatId, message) => {
                            forwardMessage(chatId, message);
                        }}
                        replyMsg={replyMessage}
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
            <FixedHeader title={activeChatGroupName || 'چت'} useBack={true}/>
            <ChatView/>
        </React.Fragment>
    );
};

export default ChatMessages;
