const initialState = {
  firstName: null,
  lastName: null,
  note: null,
  logo: null,
  email: null,
  dateOfBirth: null,
  avatar: null,
  mobileNumber: null
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        email: action.user.email,
        note: action.user.note,
        logo: action.user.logo,
        dateOfBirth: action.user.dateOfBirth,
        avatar: action.user.avatar,
        mobileNumber: action.user.mobileNumber
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
