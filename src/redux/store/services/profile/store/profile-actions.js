// actions/authActions.js

export const SET_PROFILE = 'SET_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';


export const setProfile = (user) => ({
    type: SET_PROFILE,
    payload: user,
});

export const clearProfile = () => ({
    type: CLEAR_PROFILE
})

