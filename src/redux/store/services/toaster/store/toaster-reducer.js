const initialState = {
  isOpen: false,
  title: '',
  message: '',
  duration: 5000
};

export const ToasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOASTER':
      return {
        ...state,
        isOpen: true,
        title: action.toaster.title,
        message: action.toaster.message,
        duration: (action.toaster.duration || 5) * 1000
      };
    case 'ACTIVE_TOASTER':
      return {
        ...state,
        // isOpen: true
      };
    case 'CLEAR_TOASTER':
      return {
        isOpen: false,
        title: '',
        message: '',
        duration: 5000
      };
    // Other cases for authentication-related actions
    default:
      return state;
  }
};

export default ToasterReducer;
