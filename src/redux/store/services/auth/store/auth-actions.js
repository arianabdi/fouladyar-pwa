// actions/authActions.js
export const setToken = (token) => ({
    type: 'SET_TOKEN',
    token,
});

export const clearToken = () => ({
    type: 'SET_TOKEN',
    token: null,
});
