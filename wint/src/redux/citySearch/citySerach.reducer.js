import citiesActionTypes from "./citySearch.types";

const initialState = {
  cities: [],
};

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case citiesActionTypes.FETCH_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    default:
      return state;
  }
};

export default citiesReducer;
