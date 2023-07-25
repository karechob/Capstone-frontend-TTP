import TripsActionTypes from "./trips.types";

export const INITIAL_TRIP_STATE = {
  allTrips: [],
  singleTrip: {},
  weather: {},
  image: {},
};

const tripsReducer = (state = INITIAL_TRIP_STATE, action) => {
  switch (action.type) {
    case TripsActionTypes.FETCH_TRIPS:
      return { ...state, allTrips: action.payload };
    case TripsActionTypes.FETCH_SINGLE_TRIP:
      return { ...state, singleTrip: action.payload };
    case TripsActionTypes.FETCH_WEATHER:
      return { ...state, weather: action.payload };
    case TripsActionTypes.FETCH_IMAGE:
      return{...state, image: action.payload};
    case TripsActionTypes.ADD_TRIP:
      return { ...state, singleTrip: action.payload };
    case TripsActionTypes.UPDATE_TRIP:
      return { ...state, singleTrip: action.payload };
    case TripsActionTypes.DELETE_TRIP:
      return { ...state, singleTrip: null };
    default:
      return state;
  }
};

export default tripsReducer;
