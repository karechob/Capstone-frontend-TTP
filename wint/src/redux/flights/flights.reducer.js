import FlightsActionTypes from "./flights.types";

export const INITIAL_FLIGHT_STATE = {
  allFlights: [],
  singleFlight: {},
};

const flightsReducer = (state = INITIAL_FLIGHT_STATE, { type, payload }) => {
  switch (type) {
    case FlightsActionTypes.FETCH_FLIGHTS:
      return { ...state, allFlights: payload };
    case FlightsActionTypes.FETCH_SINGLE_FLIGHT:
      return { ...state, singleFlight: payload };
    case FlightsActionTypes.DELETE_FLIGHT:
      return { ...state, singleFlight: null };
    case FlightsActionTypes.ADD_FLIGHT:
      return { ...state, allFlights: [...state.allFlights, payload] };
    case FlightsActionTypes.UPDATE_FLIGHT:
      return { ...state, singleFlight: payload };
    default:
      return state;
  }
};

export default flightsReducer;
