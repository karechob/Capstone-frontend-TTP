import axios from "axios";
import FlightsActionTypes from "./flights.types";

export const fetchItineraries = (payload) => {
  return {
    type: FlightsActionTypes.FETCH_ITINERARIES,
    payload: payload,
  };
};

export const fetchItinerariesThunk = (newTripData) => async (dispatch) => {
  try {
    console.log("FETCH ITINERARIES THUNK IS FIRING UP");
    const response = await axios.post(
      `https://capstone-backend-ttp.vercel.app/api/flights/allflights`,
      newTripData,
      { withCredentials: true }
    );
    console.log(response.data);
    dispatch(fetchItineraries(response.data));
  } catch (error) {
    console.error(error);
  }
};
