import axios from "axios";
import ActivitiesActionTypes from "./activities.types";

export const fetchAllFlights = (payload) => {
  return {
    type: FlightsActionTypes.FETCH_FLIGHTS,
    payload: payload,
  };
};
