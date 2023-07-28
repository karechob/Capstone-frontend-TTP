import axios from "axios";
import HotelsActionTypes from "./hotels.types";

export const fetchHotels = (payload) => {
  return {
    type: HotelsActionTypes.FETCH_HOTELS,
    payload: payload,
  };
};

export const fetchHotelsThunk = (newTripData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/hotels/information`,
      newTripData,
      { withCredentials: true }
    );
    console.log("this is response data", response.data);
    dispatch(fetchHotels(response.data));
  } catch (error) {
    console.log(error);
  }
};
