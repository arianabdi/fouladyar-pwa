// actions/authActions.js
export const setProfile = (user) => ({
    type: 'SET_PROFILE',
    user,
});

export const clearProfile = () => ({
    type: 'SET_PROFILE',
    user: {
        firstName: null,
        lastName: null,
        note: null,
        logo: null,
        email: null,
        dateOfBirth: null,
        avatar: null,
        mobileNumber: null
    },
});

export const setRecentMessages = (recentMessage) => ({
    type: 'SET_RECENT_MESSAGE',
    recentMessage: recentMessage
});
