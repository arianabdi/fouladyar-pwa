

import {
  SET_UPLOADER_PENDING,
} from './uploader-actions';
import {RESET_STORE} from "../../general/store/general-actions";

const initialState = {
  pending: {
    all: true,
    list: false,
  },
};

export default function categoryReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_STORE:
      return initialState;
    case SET_UPLOADER_PENDING:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.payload.section]: action.payload.status,
        },
      };
    default:
      return state;
  }
}
