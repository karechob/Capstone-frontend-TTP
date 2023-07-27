import HotelsActionTypes from "./hotels.types";

const INITIAL_HOTEL_STATE = {
  destination: {},
  information: {},
  error: null,
};

const hotelsReducer = (state = INITIAL_HOTEL_STATE, { type, payload }) => {
  switch (type) {
    case HotelsActionTypes.FETCH_DESTINATION:
      return { ...state, destination: payload, error: null };
    case HotelsActionTypes.FETCH_INFORMATION:
      return { ...state, information: payload, error: null };
    case HotelsActionTypes.FETCH_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default hotelsReducer;
