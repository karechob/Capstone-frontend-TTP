import FlightsActionTypes from "./flights.types";

export const INITIAL_FLIGHT_STATE = {
  itineraryData: [],
};

const flightsReducer = (state = INITIAL_FLIGHT_STATE, { type, payload }) => {
  switch (type) {
    case FlightsActionTypes.FETCH_ITINERARIES:
      return { ...state, itineraryData: [...state.itineraryData, payload] };
    default:
      return state;
  }
};

export default flightsReducer;
