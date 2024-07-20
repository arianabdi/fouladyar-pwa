// src/redux/actions/socketActions.js
export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SWITCH_CHAT = 'SWITCH_CHAT';
export const RECEIVE_ALL_CHATS = 'RECEIVE_ALL_CHATS';
export const RECEIVE_ALL_MESSAGES = 'RECEIVE_ALL_MESSAGES';
export const RECEIVE_NEW_CHAT = 'RECEIVE_NEW_CHAT';
export const SET_SCROLL_POSITION = 'SET_SCROLL_POSITION';
export const CLEAR_SOCKET = 'CLEAR_SOCKET';



export const connectSocket = (socket) => ({
    type: CONNECT_SOCKET,
    payload: socket
});

export const disconnectSocket = () => ({
    type: DISCONNECT_SOCKET,
});

export const receiveMessage = (chatId, message) => ({
    type: RECEIVE_MESSAGE,
    payload: { chatId, message },
});

export const sendMessage = (chatId, message) => ({
    type: SEND_MESSAGE,
    payload: { chatId, message },
});

export const switchChat = (chatId) => ({
    type: SWITCH_CHAT,
    payload: chatId,
});

export const receiveAllChats = (chats) => ({
    type: RECEIVE_ALL_CHATS,
    payload: chats,
});

export const receiveAllMessages = (messages) => ({
    type: RECEIVE_ALL_MESSAGES,
    payload: messages,
});

export const receiveNewChat = (chat) => ({
    type: RECEIVE_NEW_CHAT,
    payload: chat,
});


export const setScrollPosition = (position) => ({
    type: SET_SCROLL_POSITION,
    payload: position ,
});

export const clearSocket = (position) => ({
    type: CLEAR_SOCKET,
    payload: position ,
});