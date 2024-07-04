
export const setActiveTickets = (ticket) => ({
    type: 'SET_ACTIVE_TICKETS',
    ticket: ticket
});


export const setHistoryTickets = (tickets) => ({
    type: 'SET_HISTORY_LIST',
    tickets: {
        history: tickets,
    },
});

export const clearTickets = () => ({
    type: 'CLEAR_TICKETS',
    tickets: {
        active: [],
        history: []
    },
});

export const deleteTicketByAppointmentId = (AppointmentId) => {
    return({
        type: 'DELETE_TICKET_BY_ID',
        appointmentId: AppointmentId
    })
};
