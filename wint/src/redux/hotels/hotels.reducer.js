import HotelsActionTypes from "./hotels.types";

export const INITIAL_HOTEL_STATE = {
  allHotels: [],
  // singleHotel: {},
};

const hotelsReducer = (state = INITIAL_HOTEL_STATE, { type, payload }) => {
  switch (type) {
    case HotelsActionTypes.FETCH_HOTELS:
      return { ...state, allHotels: payload };
    default:
      return state;
  }
};

export default hotelsReducer;
