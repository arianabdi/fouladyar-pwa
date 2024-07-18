import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {useSelector} from "react-redux";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {parseCustomFormat} from "../chatMessages/components/MeChat";
import {selectAuthToken} from "../../../redux/store/services/auth/store/auth-selectors";


const Socket = () => {
    const profile = useSelector((state) => state.profile);
    const token = useSelector(selectAuthToken);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(true);
    const [isOperatorChat, setIsOperatorChat] = useState(false);
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

    return (<></>);
};

export default Socket;
