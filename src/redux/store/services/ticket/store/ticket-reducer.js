const initialState = {
  active: [],
  history: []
};

export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TICKETS':
      return {
        ...state,
        active: [...state.active, action.ticket],
      };
    case 'DELETE_TICKET_BY_ID':
      return {
        ...state,
        active: [...state.active.filter(i => i.appointmentId !== action.appointmentId)],
      };
    case 'SET_HISTORY_LIST':
      return {
        ...state,
        history: action.tickets.history,
      };
    case 'CLEAR_TICKETS':
      return {
        ...action.tickets
      };
    // Other cases for authentication-related actions
    default:
      return state;
  }
};

export default ticketReducer;
