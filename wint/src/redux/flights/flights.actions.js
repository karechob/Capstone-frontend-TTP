import axios from "axios";
import FlightsActionTypes from "./flights.types";

// getting random flight data no particular values yet
// need to pass our own values for parameters (all required)

export const fetchAllFlights = (payload) => {
  return {
    type: FlightsActionTypes.FETCH_FLIGHTS,
    payload: payload,
  };
};

export const fetchAllFlightsThunk = () => {
  return async (dispatch) => {
    const options = {
      method: 'GET',
      url: 'https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip',
      params: {
        departure_date: '2023-12-21,2023-12-25',
        adults: '1',
        sid: 'iSiX639',
        origin_airport_code: 'YWG,JFK',
        destination_airport_code: 'JFK,YWG'
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_FLIGHT_API_KEY,
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log("this is fligths", response.data)
      dispatch(fetchAllFlights(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};
