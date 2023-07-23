import TripsActionTypes from "./trips.types";

export const INITIAL_TRIP_STATE = {
  allTrips: [],
  singleTrip: {},
};

const tripsReducer = (state = INITIAL_TRIP_STATE,  action ) => {
  switch (action.type) {
    case TripsActionTypes.FETCH_TRIPS:
      return { ...state, allTrips: action.payload };
    case TripsActionTypes.FETCH_SINGLE_TRIP:
      return { ...state, singleTrip: action.payload };
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
