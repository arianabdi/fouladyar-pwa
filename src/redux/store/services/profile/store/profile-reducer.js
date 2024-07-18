import {CLEAR_PROFILE, SET_PROFILE} from "./profile-actions";


const initialState = {
    id: null,
    fullName: null,
    email: null,
    birthDate: null,
    username: null,
    gender: null,
    jobTitle: null,
    privileges: null,
};


export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                ...initialState
            };
        case 'SET_RECENT_MESSAGE':
            return {
                ...state,
                recentMessage: action.recentMessage,
            };
        // Other cases for authentication-related actions
        default:
            return state;
    }
};

export default ProfileReducer;
