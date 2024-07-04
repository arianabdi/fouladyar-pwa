const initialState = {
  mode: 'doctor',
  searchBy: 'name',
  text: "", //search text
  paymentTypes: [],
  languages: [
    { value: "FRENCH", label: "Français" }
  ],
  specialization: "ALL",
  acceptVitalCard: false,
  canDoPediatrics: false,
  canDoAbortion: false,
  canDoUltrasound: false,
  items: [],
  selectedItem: null
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return {
        ...initialState,
        mode: action.mode,
      };
    case 'SET_SEARCH_RESULT':
      return {
        ...state,
        items: action.items,
      };
    case 'SET_SEARCH_SELECTED_ITEM':
      return {
        ...state,
        selectedItem: action.selectedItem,
      };
    case 'SET_SEARCH_OPTIONS':
      return {
        ...state,
        searchBy: action.filter.searchBy || 'name',
        text: action.filter.text || '',
        paymentTypes: action.filter.paymentTypes || [],
        languages:  action.filter.languages || [
          { value: "FRENCH", label: "Français" }
        ],
        specialization: action.filter.specialization || "GENERAL_PRACTITIONER",
        acceptVitalCard: action.filter.acceptVitalCard || false,
        canDoPediatrics: action.filter.canDoPediatrics || false,
        canDoAbortion: action.filter.canDoAbortion || false,
        canDoUltrasound: action.filter.canDoUltrasound || false,
      };
    case 'CLEAR_SEARCH_OPTIONS':
      return {
        ...state,
        mode: "doctor",
        searchBy: 'name',
        text: null, //search text
        paymentTypes: [],
        languages: [
          { value: "FRENCH", label: "Français" }
        ],
        specialization: "GENERAL_PRACTITIONER",
        acceptVitalCard: false,
        canDoPediatrics: true,
        canDoAbortion: false,
        canDoUltrasound: false,
      };
    // Other cases for authentication-related actions
    default:
      return state;
  }
};

export default searchReducer;
