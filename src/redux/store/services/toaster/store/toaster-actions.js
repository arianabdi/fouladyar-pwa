
export const runToast = () => ({
    type: 'ACTIVE_TOASTER'
});
export const setToaster = (toaster) => ({
    type: 'SET_TOASTER',
    toaster: toaster
});

export const clearToaster = () => ({
    type: 'CLEAR_TOASTER'
});
