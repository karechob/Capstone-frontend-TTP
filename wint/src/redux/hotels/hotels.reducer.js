import HotelsActionTypes from "./hotels.types";

export const INITIAL_HOTEL_STATE = {
  allHotels: [],
  singleHotel: {},
};

const hotelsReducer = (state = INITIAL_HOTEL_STATE, { type, payload }) => {
  switch (type) {
    case HotelsActionTypes.FETCH_ALL_HOTELS:
      return { ...state, allHotels: payload };
    case HotelsActionTypes.FETCH_SINGLE_HOTEL:
      return { ...state, singleHotel: payload };
    case HotelsActionTypes.DELETE_HOTEL:
      return { ...state, singleHotel: null };
    case HotelsActionTypes.ADD_HOTEL:
      return { ...state, allHotels: [...state.allHotels, payload] };
    case HotelsActionTypes.UPDATE_HOTEL:
      return { ...state, singleHotel: payload };
    default:
      return state;
  }
};

export default hotelsReducer;
