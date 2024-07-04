
export const changeSearchMode = (mode) => ({
    type: 'CHANGE_MODE',
    mode: mode,
});

export const setSearchOptions = (filter) => ({
    type: 'SET_SEARCH_OPTIONS',
    filter: filter,
});
export const setSelectedItem = (selectedItem) => ({
    type: 'SET_SEARCH_SELECTED_ITEM',
    selectedItem: selectedItem,
});

export const setSearchResult = (items) => ({
    type: 'SET_SEARCH_RESULT',
    items: items,
});
export const clearSearchOptions = (filter) => ({
    type: 'CLEAR_SEARCH_OPTIONS'
});

