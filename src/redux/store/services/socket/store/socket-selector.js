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
        console.log('اینجا داره فعال میشه', activeChatId, chats)
        if(activeChatId){
            return chats[activeChatId]?.messages || []
        }else{
            return []
        }
    }
);
export const selectActiveChatGroupName = createSelector(
    [selectChats, selectActiveChatId],
    (chats, activeChatId) => {
        if(activeChatId){
            return chats[activeChatId]?.groupname || []
        }else{
            return []
        }
    }
);
export const selectScrollPosition  = createSelector(
    [selectChats, selectActiveChatId],
    (chats, activeChatId) => {
        if(activeChatId){
            return chats[activeChatId]?.scrollPositions || 0
        }else{
            return []
        }
    }
);
