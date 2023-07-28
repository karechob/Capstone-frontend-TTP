import HotelsActionTypes from "./hotels.types";

const INITIAL_HOTEL_STATE = {
  hotels: [],
  error: null,
};

const hotelsReducer = (state = INITIAL_HOTEL_STATE, { type, payload }) => {
  switch (type) {
    case HotelsActionTypes.FETCH_HOTELS:
      return { ...state, hotels: [...state.hotels, payload] };
    default:
      return state;
  }
};

export default hotelsReducer;
