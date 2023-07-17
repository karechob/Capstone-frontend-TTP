import axios from "axios";
import FlightsActionTypes from "./flights.types";


// getting random flight data no particular values yet
// need to pass our own values for parameters (all required)

export const fetchAllFlights = (payload) => {
    console.log("FETCH ALL FLIGHTS ACTION");
    return {
      type: FlightsActionTypes.FETCH_ALL_FLIGHTS,
      payload: payload,
    };
  };

export const fetchAllFlightsThunk = () => {
    return async (dispatch) => {
      try {
        const options = {
          method: 'GET',
          url: 'https://priceline-com-provider.p.rapidapi.com/v1/flights/search',
          params: {
            location_arrival: 'NYC',
            itinerary_type: 'ONE_WAY',
            sort_order: 'PRICE',
            class_type: 'ECO',
            location_departure: 'LAX',
            date_departure: '2023-10-18',
            duration_max: '2051',
            number_of_passengers: '1',
            date_departure_return: '2023-10-19',
            number_of_stops: '1',
            price_min: '100',
            price_max: '20000'
          },
          headers: {
            'X-RapidAPI-Key': process.env.FLIGHT_API_KEY,
            'X-RapidAPI-Host': process.env.FLIGHT_API_HOST
          }
        };
  
        const response = await axios(options);
  
        dispatch({
          type: FlightsActionTypes.FETCH_FLIGHTS,
          payload: response.data
        });
      } catch (error) {
        dispatch({
          payload: error.message
        });
      }
    };
  };