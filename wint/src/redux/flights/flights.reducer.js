import FlightsActionTypes from "./flights.types";

export const INITIAL_FLIGHT_STATE = {
  allFlights: [],
  singleFlight: {},
};

const flightsReducer = (state = INITIAL_FLIGHT_STATE, { type, payload }) => {
  //   console.log("FLIGHTREDUCER IS HANDLING FETCH ALL FLIGHT ACTION");
  switch (type) {
    case FlightsActionTypes.FETCH_FLIGHTS:
      // console.log(state)
      return { ...state, allFlights: payload };
    case FlightsActionTypes.FETCH_SINGLE_FLIGHT:
      // console.log("this is the payload for single flights")
      // console.log(payload)
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
