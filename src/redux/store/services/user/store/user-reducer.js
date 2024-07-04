

import {
  SET_USER_PENDING,
  SET_TOKEN,
  SET_PROFILE,
  SET_USERS_LIST,
  SET_USERS_PAGINATION,
  SET_USER, SET_USER_PARTITIONS,
} from './user-actions';
import {RESET_STORE} from "../../general/store/general-actions";

const initialState = {
  pending: {
    all: true,
    list: false,
    auth: false,
    profile: false,
    users: true,
  },
  error: false,
  token: null,
  profile: null,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_STORE:
      return initialState;
    case SET_USER_PENDING:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.payload.section]: action.payload.status,
        },
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_USERS_LIST:
      return {
        ...state,
        users: {
          ...state.users,
          list: action.payload,
        },
      };
    case SET_USERS_PAGINATION:
      return {
        ...state,
        users: {
          ...state.users,
          pagination: action.payload,
        },
      };
    case SET_USER:
      return {
        ...state,
        users: {
          ...state.users,
          single: action.payload,
        },
      };
    case SET_USER_PARTITIONS:
      return {
        ...state,
        users: {
          ...state.users,
          partitions: action.payload,
        },
      };
    default:
      return state;
  }
}
