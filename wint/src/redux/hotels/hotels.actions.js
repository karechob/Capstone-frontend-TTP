//redux calls here
import axios from "axios";
import HotelsActionTypes from "./hotels.types";

export const fetchAllHotels = (payload) => {
    return {
      type: HotelsActionTypes.FETCH_HOTELS,
      payload: payload,
    };
  };

  export const fetchAllHotelsThunk = () => {
    return async (dispatch) => {
      try {
        const options = {
            method: "GET",
            url: "https://booking-com.p.rapidapi.com/v2/hotels/search-filters",
            params: {
              units: "metric",
              order_by: "popularity",
              dest_type: "city",
              filter_by_currency: "AED",
              adults_number: "2",
              checkout_date: "2023-09-28",
              dest_id: "-553173",
              room_number: "1",
              locale: "en-gb",
              checkin_date: "2023-09-27",
              children_ages: "5,0",
              children_number: "2",
              page_number: "0",
              categories_filter_ids: "class::2,class::4,free_cancellation::1",
              include_adjacency: "true"
            },
            headers: {
              "X-RapidAPI-Key": process.env.HOTEL_API_KEY,
              "X-RapidAPI-Host": process.env.FLIGHT_API_HOST
            }
          };
  
        const response = await axios(options);
  
        dispatch({
          type: HotelsActionTypes.FETCH_HOTELS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          payload: error.message,
        });
      }
    };
  };