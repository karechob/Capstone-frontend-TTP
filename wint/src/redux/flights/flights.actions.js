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
    const options = {
      method: 'GET',
      url: 'http://localhost:8080/api/flights/departure', 
      params: { name: name }, 
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_FLIGHT_API_KEY,
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    dispatch({
      type: FlightsActionTypes.FETCH_AIRPORT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FlightsActionTypes.FETCH_ERROR,
      payload: error.message,
    });
  }
};


export const fetchFlights = (departureAirport, returnAirport, departureDate, returnDate) => async (dispatch) => {
  try {
    const departureAndReturnDates = `${departureDate},${returnDate}`;
    const origin = `${departureAirport},${returnAirport}`;
    const destination = `${returnAirport},${departureAirport}`;

    const options = {
      method: 'GET',
      url: 'http://localhost:8080/api/flights/allflights', 
      params: {
        departure_date: departureAndReturnDates,
        adults: '1',
        sid: 'iSiX639',
        origin_airport_code: origin,
        destination_airport_code: destination,
        number_of_itineraries: '4',
        currency: 'USD',
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_FLIGHT_API_KEY,
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    dispatch({
      type: FlightsActionTypes.FETCH_ITINERARY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FlightsActionTypes.FETCH_ERROR,
      payload: error.message,
    });
  }
};



// export const fetchAllFlightsThunk = () => {
//   return async (dispatch) => {
//     const options = {
//       method: 'GET',
//       url: 'https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip',
//       params: {
//         departure_date: '2023-12-21,2023-12-25',
//         adults: '1',
//         sid: 'iSiX639',
//         origin_airport_code: 'YWG,JFK',
//         destination_airport_code: 'JFK,YWG'
//       },
//       headers: {
//         'X-RapidAPI-Key': process.env.REACT_APP_X_FLIGHT_API_KEY,
//         'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
//       }
//     };
    
//     try {
//       const response = await axios.request(options);
//       console.log("this is fligths", response.data)
//       dispatch(fetchAllFlights(response.data));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
