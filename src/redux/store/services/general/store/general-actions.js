
import { createAction } from 'redux-actions';


export const RESET_STORE = 'GENERAL/RESET_STORE';
export const SET_PENDING = 'GENERAL/SET_PENDING';
export const PUSH_MESSAGE = 'GENERAL/PUSH_MESSAGE';
export const TOGGLE_MESSAGE = 'GENERAL/TOGGLE_MESSAGE';

export const resetStore = createAction(RESET_STORE);

export const setPending = (service = 'general', entity = 'all', status = true) => ({
  type: SET_PENDING,
  payload: {
    service,
    entity,
    status,
  },
});

export const pushMessage = (text, type = 'info', service = 'general', duration = 6000) => ({
  type: PUSH_MESSAGE,
  payload: {
    text,
    type,
    service,
    duration,
    isVisible: true,
  },
});

export const toggleMessage = (messageId, isVisible = false) => ({
  type: TOGGLE_MESSAGE,
  payload: {
    messageId,
    isVisible,
  },
});


