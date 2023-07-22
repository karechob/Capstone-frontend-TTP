import TripsActionTypes from "./trips.types";

export const INITIAL_TRIP_STATE = {
  allTrips: [],
  singleTrip: {},
};

const tripsReducer = (state = INITIAL_TRIP_STATE, { type, payload }) => {
  switch (type) {
    case TripsActionTypes.FETCH_TRIPS:
      return { ...state, allTrips: payload };
    case TripsActionTypes.FETCH_SINGLE_TRIP:
      return { ...state, singleTrip: payload };
    case TripsActionTypes.ADD_TRIP:
      return { ...state, singleTrip: [...state.allTrips, payload] };
    case TripsActionTypes.UPDATE_TRIP:
      return { ...state, singleTrip: payload };
    case TripsActionTypes.DELETE_TRIP:
      return { ...state, singleTrip: null };
    default:
      return state;
  }
};

export default tripsReducer;
