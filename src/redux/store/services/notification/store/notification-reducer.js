const initialState = {
  recentNotifications: null,
};

export const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RECENT_NOTIFICATIONS':
      return {
        ...state,
        recentNotifications: action.notifications
      };
    // Other cases for authentication-related actions
    default:
      return state;
  }
};

export default NotificationReducer;
