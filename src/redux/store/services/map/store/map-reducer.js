const initialState = {
  distance: 10,
  longitude: 2.3522,
  latitude:48.8566,
};

export const MapReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_GEO_CENTER':
      return {
        ...state,
        longitude: action.geo.lng,
        latitude: action.geo.lat,
      };
    case 'SET_GEO_DISTANCE':
      return {
        ...state,
        distance: action.distance ,
      };
    case 'RESET_GEO':
      return {
        distance: 10,
        longitude: 2.3522,
        latitude:48.8566,
      };
    // Other cases for authentication-related actions
    default:
      return state;
  }
};

export default MapReducer;
