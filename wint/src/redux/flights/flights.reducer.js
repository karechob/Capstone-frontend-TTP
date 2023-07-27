import FlightsActionTypes from "./flights.types";

export const INITIAL_FLIGHT_STATE = {
  airportData: {},
  itineraryData: {},
  error: null,
};

const flightsReducer = (state = INITIAL_FLIGHT_STATE, { type, payload }) => {
  switch (type) {
    case FlightsActionTypes.FETCH_AIRPORT_SUCCESS:
      return { ...state, airportData: payload, error: null };
      case FlightsActionTypes.FETCH_INFORMATION_SUCCESS:
        return { ...state, itineraryData: payload, error: null };
        case FlightsActionTypes.FETCH_ERROR:
          return { ...state, error: payload };
    default:
      return state;
  }
};

export default flightsReducer;
