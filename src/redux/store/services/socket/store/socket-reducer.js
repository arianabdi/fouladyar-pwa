// src/redux/reducers/socketReducer.js
import {
    CONNECT_SOCKET,
    DISCONNECT_SOCKET,
    RECEIVE_MESSAGE,
    SEND_MESSAGE,
    SWITCH_CHAT,
    RECEIVE_ALL_CHATS,
    RECEIVE_ALL_MESSAGES,
    RECEIVE_NEW_CHAT,
} from './socket-actions';
import { transformChatsArrayToObject } from '../utils/transformChats';

const initialState = {
    socket: null,
    activeChatId: null,
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
        case RECEIVE_MESSAGE: {
            const { chatId, message } = action.payload;
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
        case SEND_MESSAGE: {
            const { chatId, message } = action.payload;
            state.socket.emit('message', { chatId, message });
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
                    [state.activeChatId]: {
                        ...state.chats[state.activeChatId],
                        messages: [
                            ...state.chats[state.activeChatId].messages,
                            newChat
                        ],
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default socketReducer;
