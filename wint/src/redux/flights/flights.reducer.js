import FlightsActionTypes from "./flights.types";

export const INITIAL_FLIGHT_STATE = {
  allFlights: [],
};

const flightsReducer = (state = INITIAL_FLIGHT_STATE, { type, payload }) => {
  switch (type) {
    case FlightsActionTypes.FETCH_FLIGHTS:
      return { ...state, allFlights: payload };
    default:
      return state;
  }
};

export default flightsReducer;
