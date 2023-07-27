import axios from "axios";
import FlightsActionTypes from "./flights.types";

// getting random flight data no particular values yet
// need to pass our own values for parameters (all required)

export const fetchAirports = (payload) => {
  return {
    type: FlightsActionTypes.FETCH_AIRPORT_SUCCESS,
    payload: payload,
  };
};

export const fetchItineraries = (payload) => {
  return {
    type: FlightsActionTypes.FETCH_ITINERARY_SUCCESS,
    payload: payload,
  };
};


export const fetchAirportsThunk = (name) => async (dispatch) => {
  try {
    console.log("FETCH AIRPORT THUNK IS FIRING UP");
    console.log("this is name", name);
    const response = await axios.post(`http://localhost:8080/api/flights/departure`, {name: name}, {withCredentials : true},);
    console.log("this is response data", response.data)
    dispatch(fetchAirports(response.data));
  } catch (error) {
    console.error(error);
  }
};


export const fetchFlights = (departureAirport, returnAirport, departureDate, returnDate) => async (dispatch) => {
  try {
    const departureAndReturnDates = `${departureDate},${returnDate}`;
    const origin = `${departureAirport},${returnAirport}`;
    const destination = `${returnAirport},${departureAirport}`;
    const response = await axios.post(`http://localhost:8080/api/flights/allflights`, 
    {departure_date: departureAndReturnDates}, {origin_airport_code: origin}, {destination_airport_code: destination}, {withCredentials : true},);
    dispatch(fetchItineraries(response.data));
  } catch (error) {
    console.error(error);
  }
};
