// src/redux/reducers/socketReducer.js
import {
    CONNECT_SOCKET,
    DISCONNECT_SOCKET,
    RECEIVE_ALL_CHATS,
    RECEIVE_ALL_MESSAGES,
    RECEIVE_MESSAGE,
    RECEIVE_NEW_CHAT,
    SEND_MESSAGE,
    SET_SCROLL_POSITION,
    CLEAR_SOCKET,
    SWITCH_CHAT, INCREASE_UNREAD_MESSAGE, RESET_UNREAD_MESSAGE,
} from './socket-actions';
import {transformChatsArrayToObject} from '../utils/transformChats';

const initialState = {
    socket: null,
    activeChatId: null,
    lastMessage: null,
    chats: {}, // { chatId: { messages: [] } }
};

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECT_SOCKET:
            return {
                ...state,
                socket: action.payload,
            };
        case DISCONNECT_SOCKET:
            return {
                ...state,
                socket: null,
            };
        case CLEAR_SOCKET:
            return initialState;
        case RECEIVE_MESSAGE: {
            const {chatId, message} = action.payload;
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...state.chats[chatId],
                        messages: [...(state.chats[chatId]?.messages || []), message],
                    }
                },

            };
        }
        case SEND_MESSAGE: {
            const {chatId, message} = action.payload;
            state.socket.emit('message', {chatId, message});
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...state.chats[chatId],
                        messages: [...(state.chats[chatId]?.messages || []), message],
                    },
                },
            };
        }
        case SWITCH_CHAT:
            return {
                ...state,
                activeChatId: action.payload,
            };
        case RECEIVE_ALL_CHATS:
            return {
                ...state,
                chats: transformChatsArrayToObject(action.payload),
            };
        case RECEIVE_ALL_MESSAGES: {
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [state.activeChatId]: {
                        ...state.chats[state.activeChatId],
                        messages: action.payload,
                    },
                },
            };
        }
        case RECEIVE_NEW_CHAT: {
            const newChat = action.payload;
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [newChat.id]: {
                        ...newChat,
                        messages: state.chats[newChat.id].messages,
                        unreadmessages: state.chats[newChat.id].unreadmessages || 0
                    },
                },
            };
        }
        case SET_SCROLL_POSITION: {
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [state.activeChatId]: {
                        ...state.chats[state.activeChatId],
                        scrollPosition: action.payload
                    },
                },
            };
        }
        case INCREASE_UNREAD_MESSAGE: {
            const {chatId, count} = action.payload;
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...state.chats[chatId],
                        unreadmessages: parseInt(state.chats[chatId].unreadmessages) + count
                    },
                },
            };
        }
        case RESET_UNREAD_MESSAGE: {
            const {chatId} = action.payload;
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...state.chats[chatId],
                        unreadmessages: 0
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default socketReducer;
