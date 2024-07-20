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
    case 'CLEAR_TOKEN':
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};

export default AuthReducer;
