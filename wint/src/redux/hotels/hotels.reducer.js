import HotelsActionTypes from "./hotels.types";

const INITIAL_HOTEL_STATE = {
  allHotels: [],
  error: null,
};

const hotelsReducer = (state = INITIAL_HOTEL_STATE, action) => {
  switch (action.type) {
    case HotelsActionTypes.FETCH_HOTELS:
      return {
        ...state,
        allHotels: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default hotelsReducer;
