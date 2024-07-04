const initialState = {
  token: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    // Other cases for authentication-related actions
    default:
      return state;
  }
};

export default AuthReducer;
