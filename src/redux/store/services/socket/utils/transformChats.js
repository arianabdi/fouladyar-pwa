// src/utils/transformChats.js
export const transformChatsArrayToObject = (chatsArray) => {
    return chatsArray.reduce((acc, chat) => {
        acc[chat.id] = {
            ...chat,
            messages: chat.messages || [],
            unreadmessages: 0
        };
        return acc;
    }, {});
};