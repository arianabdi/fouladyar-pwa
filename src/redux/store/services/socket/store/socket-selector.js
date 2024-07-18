// src/redux/selectors/socketSelectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectSocketState = (state) => state.socket;

export const selectChats = createSelector(
    [selectSocketState],
    (socketState) => socketState.chats
);

export const selectActiveChatId = createSelector(
    [selectSocketState],
    (socketState) => socketState.activeChatId
);

export const selectActiveChatMessages = createSelector(
    [selectChats, selectActiveChatId],
    (chats, activeChatId) => {
        if(activeChatId){
            return chats[activeChatId]?.messages || []
        }else{
            return []
        }
    }
);
