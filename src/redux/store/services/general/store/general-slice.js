/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { PUSH_MESSAGE, RESET_STORE, SET_PENDING, TOGGLE_MESSAGE } from './general-actions';

const initialState = {
  pending: {
    general: {},
    group: {},
  },
  messages: {},
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  extraReducers: {
    [RESET_STORE]: (state, action) => initialState,
    [SET_PENDING]: (state, { payload }) => {
      state.pending[payload.service][payload.entity] = payload.status;
    },
    [PUSH_MESSAGE]: (state, { payload }) => {
      state.messages[payload.id] = payload;
    },
    [TOGGLE_MESSAGE]: (state, { payload }) => {
      state.messages[payload.messageId].isVisible = payload.isVisible;
    },
  },
});

export const { reducer } = generalSlice;
