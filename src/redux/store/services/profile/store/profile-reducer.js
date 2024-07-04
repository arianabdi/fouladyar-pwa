const initialState = {
  firstName: null,
  lastName: null,
  note: null,
  logo: null,
  email: null,
  dateOfBirth: null,
  doctorOrProfessor: null,
  gender: null,
  avatar: null,
  mobileNumber: null,
  subjectId: null
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
        subjectId: action.user.subjectId,
        doctorOrProfessor: action.user.doctorOrProfessor,
        gender: action.user.gender,
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
