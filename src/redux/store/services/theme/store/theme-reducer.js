

import {
  SET_RTL,
  SET_SKIN,
  SET_LANGUAGE,
  SET_HEADER_COLOR,
  SET_THEME_PENDING,
  SET_MOBILE_VIEW,
} from './theme-actions';
import {RESET_STORE} from "../../general/store/general-actions";

const initialState = {
  pending: {
    all: true,
    auth: false,
    profile: false,
    users: true,
  },
  main: "default",
  header: "white",
  skin: "blue",
  lng: "en",
  mobileView: false,
  rtl: true,
};

export default function themeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_STORE:
      return initialState;
    case SET_THEME_PENDING:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.payload.section]: action.payload.status,
        },
      };
    case SET_HEADER_COLOR:
      return {
        ...state,
        header: action.payload,
      };
    case SET_SKIN:
      return {
        ...state,
        skin: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        lng: action.payload,
        rtl: action.payload === 'fa' ,
      };
    case SET_MOBILE_VIEW:
      return {
        ...state,
        mobileView: action.payload
      };
    default:
      return state;
  }
}
